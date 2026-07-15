import { useEffect, useMemo, useState } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { runRim, solveTargetRoe, horizonTableRows, TERMINAL_EPS_GROWTH_TARGET } from '../lib/rim'
import { fmtPrice, fmtPct, fmtMultiple, upsideClass } from '../lib/format'
import InfoBadge from '../components/ui/InfoBadge'

const FIELD_DEFS = [
  { key: 'fy1Eps', label: 'FY1 EPS (Normalized)', step: 0.01, source: 'Claude web search (consensus)' },
  { key: 'fy2Eps', label: 'FY2 EPS (Normalized)', step: 0.01, source: 'Claude web search (consensus)' },
  { key: 'ltg', label: 'Long-Term Growth Rate (Ltg)', step: 0.001, isPct: true, source: 'Claude web search' },
  { key: 'bvps', label: 'Book Value / Share (last FYE)', step: 0.01, source: 'Claude web search' },
  { key: 'r', label: 'Discount Rate (r)', step: 0.001, isPct: true, source: 'Default 8%, user override' },
  { key: 'k', label: 'Dividend Payout Ratio (k)', step: 0.001, isPct: true, source: 'Claude web search (dividend payout ratio)' },
  { key: 'nextFiscalYearEnd', label: 'Next Fiscal Year End', step: 1, isYear: true, source: 'Fiscal calendar lookup' },
  { key: 'currentFiscalMonth', label: 'Current Fiscal Month', step: 1, source: 'Computed from fiscal calendar' },
]

export default function Rim() {
  const { data, loading, error } = useCompanyData()
  const [inputs, setInputs] = useState(null)
  const [overridden, setOverridden] = useState({})
  const [targetRoeMode, setTargetRoeMode] = useState('solved') // 'solved' | 'manual'
  const [manualTargetRoe, setManualTargetRoe] = useState(null)

  useEffect(() => {
    if (data?.rimInputs) {
      setInputs({ ...data.rimInputs })
      setOverridden({})
      setTargetRoeMode('solved')
      setManualTargetRoe(null)
    }
  }, [data])

  const solved = useMemo(() => {
    if (!inputs) return null
    try {
      return solveTargetRoe(inputs)
    } catch {
      return null
    }
  }, [inputs])

  const effectiveTargetRoe = targetRoeMode === 'manual' && manualTargetRoe != null ? manualTargetRoe : solved?.targetRoe

  const rimResult = useMemo(() => {
    if (!inputs || effectiveTargetRoe == null) return null
    return runRim({ ...inputs, targetRoe: effectiveTargetRoe })
  }, [inputs, effectiveTargetRoe])

  const rows = useMemo(() => {
    if (!rimResult) return []
    return horizonTableRows(rimResult, data?.currentPrice)
  }, [rimResult, data])

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data || !inputs) return <div className="card"><div className="card-body">No data.</div></div>

  function updateField(key, value) {
    setInputs((prev) => ({ ...prev, [key]: value }))
    setOverridden((prev) => ({ ...prev, [key]: true }))
  }

  function resetField(key) {
    setInputs((prev) => ({ ...prev, [key]: data.rimInputs[key] }))
    setOverridden((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="ah-page-grid" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20, alignItems: 'start' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">RIM.512 Inputs</div>
              <div className="card-subtitle">All fields editable, overridden values highlighted in gold</div>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StaticField label="Ticker" value={data.ticker} />
            <StaticField label="As-of Date" value={data.asOfDate} />

            {FIELD_DEFS.map((f) => (
              <EditableField
                key={f.key}
                def={f}
                value={inputs[f.key]}
                overridden={!!overridden[f.key]}
                onChange={(v) => updateField(f.key, v)}
                onReset={() => resetField(f.key)}
                sourceInfo={data.sources?.[f.key]}
              />
            ))}

            <div>
              <div className="label" style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Target ROE (equilibrium)<InfoBadge explainKey="targetRoe" /></span>
                <button
                  className="btn"
                  style={{ padding: '2px 8px', fontSize: 11 }}
                  onClick={() => {
                    setTargetRoeMode('solved')
                    setManualTargetRoe(null)
                  }}
                  disabled={targetRoeMode === 'solved'}
                >
                  Re-solve
                </button>
              </div>
              <input
                className={`input ${targetRoeMode === 'manual' ? 'overridden' : ''}`}
                type="number"
                step={0.001}
                value={effectiveTargetRoe != null ? (effectiveTargetRoe * 100).toFixed(3) : ''}
                onChange={(e) => {
                  setTargetRoeMode('manual')
                  setManualTargetRoe(Number(e.target.value) / 100)
                }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
                {targetRoeMode === 'solved'
                  ? `Solved so terminal implied EPS growth = ${(TERMINAL_EPS_GROWTH_TARGET * 100).toFixed(1)}% (${solved?.iterations ?? 0} iterations)`
                  : `Manual override: terminal implied EPS growth = ${rimResult ? fmtPct(rimResult.terminalImpliedEpsGrowth) : '-'}`}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Implied Price by Forecasting Horizon</div>
                <div className="card-subtitle">RIM.512: 5 years explicit EPS growth, 12-year total forecasting horizon</div>
              </div>
            </div>
            <div className="card-body" style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Cum P/B<InfoBadge explainKey="cumPB" /></th>
                    <th>Implied Price<InfoBadge explainKey="impliedPrice" /></th>
                    <th>Total P/B<InfoBadge explainKey="totalPB" /></th>
                    <th>Upside vs. {fmtPrice(data.currentPrice)}<InfoBadge explainKey="upside" /></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.year} className={i === rows.length - 1 ? 'row-summary' : ''}>
                      <td>{row.year}{i === rows.length - 1 ? ' (Terminal)' : ''}</td>
                      <td>{fmtMultiple(row.cumPB, { decimals: 3 })}</td>
                      <td>{fmtPrice(row.impliedPrice)}</td>
                      <td>{fmtMultiple(row.totalPB, { decimals: 3 })}</td>
                      <td className={upsideClass(row.upside)}>{fmtPct(row.upside)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {data.rimInputNotes && Object.keys(data.rimInputNotes).length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Sourcing Notes</div>
              </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5, color: 'var(--text-tertiary)' }}>
                {Object.entries(data.rimInputNotes).map(([key, note]) => (
                  <div key={key}>
                    <strong style={{ color: 'var(--text-secondary)' }}>{FIELD_DEFS.find((f) => f.key === key)?.label || key}:</strong> {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StaticField({ label, value }) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 6 }}>{label}</div>
      <div className="input" style={{ opacity: 0.7 }}>{value}</div>
    </div>
  )
}

function EditableField({ def, value, overridden, onChange, onReset, sourceInfo }) {
  const displayValue = def.isPct && value != null ? (value * 100).toFixed(3) : value ?? ''
  return (
    <div>
      <div className="label" style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{def.label}<InfoBadge explainKey={def.key} source={sourceInfo} /></span>
        {overridden && (
          <button className="btn" style={{ padding: '2px 8px', fontSize: 11 }} onClick={onReset}>
            Reset
          </button>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          className={`input ${overridden ? 'overridden' : ''}`}
          type="number"
          step={def.isPct ? def.step * 100 : def.step}
          value={displayValue}
          onChange={(e) => {
            const raw = Number(e.target.value)
            onChange(def.isPct ? raw / 100 : raw)
          }}
        />
        {def.isPct && (
          <span style={{ position: 'absolute', right: 10, top: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>%</span>
        )}
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--text-disabled)', marginTop: 3 }}>{def.source}</div>
    </div>
  )
}
