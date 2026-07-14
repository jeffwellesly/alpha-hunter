import { useMemo } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { computeOptimismBias } from '../lib/optimismBias'
import { fmtPrice, fmtNumber } from '../lib/format'

export default function AnalystViews() {
  const { data, loading, error } = useCompanyData()

  const analystViews = data?.analystViews

  const localBias = useMemo(() => {
    if (!data) return null
    return computeOptimismBias({ financials: data.financials, ltg: data.rimInputs?.ltg })
  }, [data])

  // Live-mode runs compute this via Claude as part of the analysis pipeline
  // (shared/runAnalysis.js); demo data has no equivalent, so fall back to
  // the local client-side computation there.
  const claudeBias = data?.optimismBias?.flagged !== undefined ? data.optimismBias : null

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data) return <div className="card"><div className="card-body">No data.</div></div>

  const totalRatings = analystViews ? (analystViews.buy || 0) + (analystViews.hold || 0) + (analystViews.sell || 0) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {!analystViews ? (
        <div className="card">
          <div className="card-body">
            <div className="card-title" style={{ marginBottom: 8 }}>No analyst data yet</div>
            <div className="card-subtitle">The analysis run didn't find analyst consensus data for this ticker.</div>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Analyst Price Targets</div>
                <div className="card-subtitle">{fmtNumber(analystViews.numAnalysts)} analysts covering {data.ticker}</div>
              </div>
            </div>
            <div className="card-body" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <Stat label="Mean Target" value={fmtPrice(analystViews.targetMean)} accent="var(--accent-blue)" />
              <Stat label="Median Target" value={fmtPrice(analystViews.targetMedian)} />
              {analystViews.targetHigh != null && <Stat label="High" value={fmtPrice(analystViews.targetHigh)} accent="var(--accent-green)" />}
              {analystViews.targetLow != null && <Stat label="Low" value={fmtPrice(analystViews.targetLow)} accent="var(--accent-red)" />}
              <Stat label="Current Price" value={fmtPrice(data.currentPrice)} />
            </div>
          </div>

          {totalRatings > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Rating Breakdown</div>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
                  {analystViews.buy > 0 && (
                    <div style={{ width: `${(analystViews.buy / totalRatings) * 100}%`, background: 'var(--accent-green)' }} />
                  )}
                  {analystViews.hold > 0 && (
                    <div style={{ width: `${(analystViews.hold / totalRatings) * 100}%`, background: 'var(--accent-gold)' }} />
                  )}
                  {analystViews.sell > 0 && (
                    <div style={{ width: `${(analystViews.sell / totalRatings) * 100}%`, background: 'var(--accent-red)' }} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
                  <span><span style={{ color: 'var(--accent-green)' }}>●</span> Buy: {analystViews.buy}</span>
                  <span><span style={{ color: 'var(--accent-gold)' }}>●</span> Hold: {analystViews.hold}</span>
                  <span><span style={{ color: 'var(--accent-red)' }}>●</span> Sell: {analystViews.sell}</span>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <div className="card-title">Optimism-Bias Flag</div>
              <div className="card-subtitle">Frankel &amp; Lee (1998) style: consensus LTG vs. realized historical EPS growth</div>
            </div>
            <div className="card-body">
              {claudeBias ? (
                <BiasCard flagged={claudeBias.flagged} severity={claudeBias.severity} explanation={claudeBias.explanation} />
              ) : localBias?.available ? (
                <BiasCard flagged={localBias.flagged} severity={localBias.severity} explanation={localBias.explanation} />
              ) : (
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{localBias?.reason || 'Not enough data to assess.'}</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: accent || 'var(--text-primary)', marginTop: 2 }}>
        {value}
      </div>
    </div>
  )
}

function BiasCard({ flagged, severity, explanation }) {
  const color = !flagged ? 'var(--accent-green)' : severity === 'high' ? 'var(--accent-red)' : 'var(--accent-gold)'
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span className={`flag-dot flag-${!flagged ? 'green' : severity === 'high' ? 'red' : 'yellow'}`} style={{ marginTop: 5, flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: 700, color, marginBottom: 4 }}>{flagged ? `Optimism bias flagged (${severity})` : 'No optimism bias flagged'}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{explanation}</div>
      </div>
    </div>
  )
}
