import { useMemo } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { buildDupontTable, LEE_BENCHMARKS } from '../lib/dupont'
import { fmtPrice, fmtPct, fmtMillions } from '../lib/format'
import InfoBadge from '../components/ui/InfoBadge'

const METRIC_ROWS = [
  { key: 'epsGaap', label: 'EPS (GAAP Diluted)', fmt: (v) => fmtPrice(v) },
  { key: 'epsNonGaap', label: 'EPS (Non-GAAP / Consensus)', fmt: (v) => fmtPrice(v) },
  { key: 'cfps', label: 'Cash Flow / Share', fmt: (v) => fmtPrice(v) },
  { key: 'revenue', label: 'Revenue', fmt: (v) => fmtMillions(v) },
  { key: 'ebitda', label: 'EBITDA', fmt: (v) => fmtMillions(v) },
  { key: 'ebit', label: 'EBIT', fmt: (v) => fmtMillions(v) },
  { key: 'netIncome', label: 'Net Income', fmt: (v) => fmtMillions(v) },
  { key: 'da', label: 'D&A', fmt: (v) => fmtMillions(v) },
  { key: 'cfo', label: 'Cash From Operations', fmt: (v) => fmtMillions(v) },
  { key: 'capex', label: 'CapEx', fmt: (v) => fmtMillions(v) },
  { key: 'fcf', label: 'Free Cash Flow', fmt: (v) => fmtMillions(v) },
  { key: 'roe', label: 'ROE %', fmt: (v) => fmtPct(v) },
  { key: 'dps', label: 'DPS', fmt: (v) => fmtPrice(v) },
]

function benchmarkStatus(value, benchmark) {
  if (value == null) return null
  if (value >= benchmark) return 'green'
  if (value >= benchmark * 0.7) return 'yellow'
  return 'red'
}

export default function FinancialHealth() {
  const { data, loading, error } = useCompanyData()

  const dupont = useMemo(() => (data ? buildDupontTable(data.financials) : []), [data])
  const latestDupont = [...dupont].reverse().find((row) => row.roa != null || row.roe != null) ?? null

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data) return <div className="card"><div className="card-body">No data.</div></div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Multi-Year Financial Metrics</div>
            <div className="card-subtitle">{data.ticker}: historical + estimates</div>
          </div>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                {data.financials.map((f) => (
                  <th key={f.year}>{f.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRIC_ROWS.map((row) => (
                <tr key={row.key}>
                  <td>{row.label}</td>
                  {data.financials.map((f) => (
                    <td key={f.year}>{f[row.key] != null ? row.fmt(f[row.key]) : '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.financialsNote && (
          <div style={{ padding: '0 22px 20px', fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{data.financialsNote}</div>
        )}
      </div>

      <div className="ah-page-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, alignItems: 'start' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">DuPont Decomposition</div>
            <div className="card-subtitle">ROE = Net Margin × Asset Turnover × Financial Leverage</div>
          </div>
          <div className="card-body" style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Net Margin<InfoBadge explainKey="netMargin" /></th>
                  <th>Asset Turnover<InfoBadge explainKey="assetTurnover" /></th>
                  <th>Financial Leverage<InfoBadge explainKey="financialLeverage" /></th>
                  <th>ROE (derived)<InfoBadge explainKey="roe" /></th>
                </tr>
              </thead>
              <tbody>
                {dupont.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{fmtPct(row.netMargin)}</td>
                    <td>{row.assetTurnover != null ? row.assetTurnover.toFixed(2) + 'x' : '-'}</td>
                    <td>{row.financialLeverage != null ? row.financialLeverage.toFixed(2) + 'x' : '-'}</td>
                    <td>{fmtPct(row.roeFromComponents ?? row.roe)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">vs. Lee Course Norms</div>
            <div className="card-subtitle">Most recent year</div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BenchmarkRow label="ROA" value={latestDupont?.roa} benchmark={LEE_BENCHMARKS.roa} explainKey="roa" />
            <BenchmarkRow label="ROE" value={latestDupont?.roe} benchmark={LEE_BENCHMARKS.roe} explainKey="roe" />
            <div style={{ fontSize: 11.5, color: 'var(--text-disabled)', lineHeight: 1.5, marginTop: 4 }}>
              Lee course (ACCTG 579) benchmarks: ROA ~6%, RNOA ~9%, ROE ~12%. RNOA requires a net-operating-asset split not available
              from standard financial statement line items shown here.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BenchmarkRow({ label, value, benchmark, explainKey }) {
  const status = benchmarkStatus(value, benchmark)
  const color = status === 'green' ? 'var(--accent-green)' : status === 'yellow' ? 'var(--accent-gold)' : status === 'red' ? 'var(--accent-red)' : 'var(--text-tertiary)'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span className="label">{label}{explainKey && <InfoBadge explainKey={explainKey} />}</span>
        <span className="mono" style={{ color, fontWeight: 700, fontSize: 15 }}>{fmtPct(value)}</span>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>Benchmark: {fmtPct(benchmark, { showSign: false })}</div>
      <div style={{ height: 6, background: 'var(--bg-inset)', borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
        <div
          style={{
            width: `${Math.max(0, Math.min(100, value != null ? (value / (benchmark * 1.5)) * 100 : 0))}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}
