import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { useCompanyData } from '../hooks/useCompanyData'
import { buildCompsTable, compsImpliedPrice, METRIC_LABELS } from '../lib/comps'
import { fmtMultiple, fmtPct, fmtPrice, upsideClass } from '../lib/format'

const METRIC_KEYS = ['tevRevenue', 'tevEbitda', 'tevEbit', 'pDilutedEps', 'pTangibleBv', 'ntmTevRevenue', 'ntmFwdPe']

export default function Comps() {
  const { demoMode, livePeers, peerLoading, addPeer, removePeer } = useApp()
  const { data, loading, error } = useCompanyData()
  const [peerInput, setPeerInput] = useState('')

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
      {!demoMode && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Peer Group</div>
              <div className="card-subtitle">Add tickers to build the comp set — each peer costs 2 FMP calls, cached for the day.</div>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (peerInput.trim()) addPeer(peerInput)
                setPeerInput('')
              }}
              style={{ display: 'flex', gap: 8 }}
            >
              <input
                className="input"
                style={{ maxWidth: 200, textTransform: 'uppercase' }}
                placeholder="Peer ticker"
                value={peerInput}
                onChange={(e) => setPeerInput(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={peerLoading}>
                {peerLoading ? 'Fetching…' : 'Add peer'}
              </button>
            </form>
            {livePeers.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {livePeers.map((p) => (
                  <span
                    key={p.ticker}
                    className="badge"
                    style={{ background: p.error ? 'var(--accent-red-dim)' : 'var(--bg-inset)', color: p.error ? 'var(--accent-red)' : 'var(--text-secondary)', cursor: 'pointer' }}
                    title={p.error || 'Click to remove'}
                    onClick={() => removePeer(p.ticker)}
                  >
                    {p.ticker} {p.error ? '(error)' : ''} ✕
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!data.comps?.peers?.length ? (
        <div className="card">
          <div className="card-body">
            <div className="card-title" style={{ marginBottom: 8 }}>No peer group yet</div>
            <div className="card-subtitle">
              {demoMode ? 'No demo peers found for this ticker.' : 'Add at least one peer above to compute comps multiples.'}
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
                    </td>
                    {METRIC_KEYS.map((k) => (
                      <td key={k}>{fmtMultiple(peer[k])}</td>
                    ))}
                  </tr>
                ))}

                <tr className="row-highlight">
                  <td>{data.companyName} ({data.ticker}) — Target</td>
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
                      <td key={k}>{fmtMultiple(table.summary[k][stat])}</td>
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
