import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { useCompanyData } from '../hooks/useCompanyData'
import { computeOptimismBias } from '../lib/optimismBias'
import { fetchAnalystConsensus, flagAnalystOptimism } from '../lib/claude'
import { fmtPrice, fmtNumber } from '../lib/format'

export default function AnalystViews() {
  const { demoMode, anthropicApiKey, model, hasAnthropicKey } = useApp()
  const { data, loading, error } = useCompanyData()
  const [liveConsensus, setLiveConsensus] = useState(null)
  const [fetchState, setFetchState] = useState({ loading: false, error: null })
  const [claudeBias, setClaudeBias] = useState(null)

  const analystViews = liveConsensus || data?.analystViews

  const localBias = useMemo(() => {
    if (!data) return null
    const ltg = liveConsensus?.longTermGrowthRate ?? data.rimInputs?.ltg
    return computeOptimismBias({ financials: data.financials, ltg })
  }, [data, liveConsensus])

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data) return <div className="card"><div className="card-body">No data.</div></div>

  async function handleFetchConsensus() {
    setFetchState({ loading: true, error: null })
    try {
      const consensus = await fetchAnalystConsensus({ ticker: data.ticker, model, apiKey: anthropicApiKey })
      setLiveConsensus({
        targetMean: consensus.targetPriceMean,
        targetMedian: consensus.targetPriceMedian,
        targetHigh: null,
        targetLow: null,
        numAnalysts: consensus.numAnalysts,
        buy: consensus.ratingsBuy,
        hold: consensus.ratingsHold,
        sell: consensus.ratingsSell,
        longTermGrowthRate: consensus.longTermGrowthRate,
        sources: consensus.sources,
      })
      const bias = await flagAnalystOptimism({
        ticker: data.ticker,
        model,
        apiKey: anthropicApiKey,
        consensus,
        historicalEpsGrowthCagr: null,
      })
      setClaudeBias(bias)
    } catch (err) {
      setFetchState({ loading: false, error: err.message })
      return
    }
    setFetchState({ loading: false, error: null })
  }

  const totalRatings = analystViews ? (analystViews.buy || 0) + (analystViews.hold || 0) + (analystViews.sell || 0) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {!demoMode && (
        <div className="card">
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div className="card-title">Analyst Consensus (Claude Web Search)</div>
              <div className="card-subtitle">
                {hasAnthropicKey ? 'FMP has no analyst-estimate data on the free tier — fetch consensus via Claude.' : 'Add your Anthropic API key in Settings to fetch analyst consensus.'}
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleFetchConsensus} disabled={!hasAnthropicKey || fetchState.loading}>
              {fetchState.loading ? 'Fetching…' : 'Fetch consensus'}
            </button>
          </div>
          {fetchState.error && <div style={{ padding: '0 22px 18px', fontSize: 12.5, color: 'var(--accent-red)' }}>{fetchState.error}</div>}
        </div>
      )}

      {!analystViews ? (
        <div className="card">
          <div className="card-body">
            <div className="card-title" style={{ marginBottom: 8 }}>No analyst data yet</div>
            <div className="card-subtitle">{demoMode ? 'No demo analyst data found.' : 'Fetch consensus above to populate this tab.'}</div>
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
