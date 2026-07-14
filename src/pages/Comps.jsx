import { useMemo } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { buildCompsTable, compsImpliedPrice, METRIC_LABELS } from '../lib/comps'
import { fmtMultiple, fmtPct, fmtPrice, upsideClass } from '../lib/format'
import SourceBadge from '../components/ui/SourceBadge'

const METRIC_KEYS = ['tevRevenue', 'tevEbitda', 'tevEbit', 'pDilutedEps', 'pTangibleBv', 'ntmTevRevenue', 'ntmFwdPe']

export default function Comps() {
  const { data, loading, error } = useCompanyData()

  const table = useMemo(() => {
    if (!data?.comps?.peers?.length) return null
    return buildCompsTable(data.comps.peers, data.comps.targetMetrics)
  }, [data])

  const impliedPrice = useMemo(() => {
    if (!data?.comps?.peers?.length) return null
    return compsImpliedPrice(data.comps.peers, data.rimInputs?.fy1Eps)
  }, [data])

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data) return <div className="card"><div className="card-body">No data.</div></div>

  const upside = impliedPrice != null && data.currentPrice ? impliedPrice / data.currentPrice - 1 : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {!data.comps?.peers?.length ? (
        <div className="card">
          <div className="card-body">
            <div className="card-title" style={{ marginBottom: 8 }}>No peer group yet</div>
            <div className="card-subtitle">
              The analysis run didn't find a usable peer group for this ticker — re-run Analyze from the header.
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Comparable Company Analysis</div>
              <div className="card-subtitle">{data.ticker} vs. {data.comps.peers.length} peers — trading multiples as of {data.asOfDate}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label">Comps-Implied Price</div>
              <div className={`mono ${upsideClass(upside)}`} style={{ fontSize: 20, fontWeight: 700 }}>
                {fmtPrice(impliedPrice)}
                {upside != null && <span style={{ fontSize: 13, marginLeft: 8 }}>({fmtPct(upside)})</span>}
              </div>
            </div>
          </div>
          <div className="card-body" style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  {METRIC_KEYS.map((k) => (
                    <th key={k}>{METRIC_LABELS[k]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comps.peers.map((peer) => (
                  <tr key={peer.ticker}>
                    <td>
                      {peer.name} <span style={{ color: 'var(--text-tertiary)' }}>({peer.ticker})</span>
                      {peer.flag && <span title={peer.flag} style={{ color: 'var(--accent-gold)', marginLeft: 4 }}>⚠</span>}
                      <SourceBadge info={data.sources?.peers?.[peer.ticker]} />
                    </td>
                    {METRIC_KEYS.map((k) => (
                      <td key={k}>{fmtMultiple(peer[k])}</td>
                    ))}
                  </tr>
                ))}

                <tr className="row-highlight">
                  <td>
                    {data.companyName} ({data.ticker}) — Target
                    <SourceBadge info={data.sources?.targetMetrics} />
                  </td>
                  {METRIC_KEYS.map((k) => (
                    <td key={k}>{fmtMultiple(data.comps.targetMetrics[k])}</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Discount / Premium to Median</td>
                  {METRIC_KEYS.map((k) => (
                    <td key={k} className={upsideClass(table.discountToMedian[k] != null ? -table.discountToMedian[k] : null)}>
                      {fmtPct(table.discountToMedian[k])}
                    </td>
                  ))}
                </tr>

                {['high', 'low', 'mean', 'median'].map((stat) => (
                  <tr key={stat} className="row-summary">
                    <td style={{ textTransform: 'capitalize' }}>{stat}</td>
                    {METRIC_KEYS.map((k) => (
                      <td key={k}>
                        {fmtMultiple(table.summary[k][stat])}
                        {(stat === 'mean' || stat === 'median') && data.sources && (
                          <SourceBadge
                            info={{ asOfDate: data.asOfDate, links: [] }}
                            components={data.comps.peers
                              .filter((p) => typeof p[k] === 'number')
                              .map((p) => ({ label: p.ticker, value: fmtMultiple(p[k]) }))}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.comps.note && (
            <div style={{ padding: '0 22px 20px', fontSize: 12.5, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{data.comps.note}</div>
          )}
        </div>
      )}
    </div>
  )
}
