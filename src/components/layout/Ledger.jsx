import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { getAnalysis } from '../../lib/analysesApi'
import VerdictBadge from '../ui/VerdictBadge'

export default function Ledger({ stocks, limit }) {
  const { viewAnalysis } = useApp()
  const navigate = useNavigate()
  const [openTicker, setOpenTicker] = useState(null)
  const [loadingId, setLoadingId] = useState(null)

  const list = limit ? stocks.slice(0, limit) : stocks

  // Layout.jsx shows the dashboard instead of Home whenever context `data`
  // is set, but only for the index route - the standalone /analyses page
  // isn't wrapped by Layout, so selecting an analysis there needs an
  // explicit navigate to actually land on the dashboard.
  async function open(entry, ticker) {
    if (entry.kind === 'demo') {
      viewAnalysis(entry.raw, ticker)
      navigate('/')
      return
    }
    setLoadingId(entry.id)
    try {
      const full = await getAnalysis(entry.id)
      viewAnalysis(full.results_json, full.ticker)
      navigate('/')
    } catch {
      // stays on the list if this fails
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div style={{ borderTop: '1px solid var(--rule)' }}>
      {list.map((stock) => {
        const latest = stock.entries[0]
        const hasHistory = stock.entries.length > 1
        const isOpen = openTicker === stock.ticker
        return (
          <div key={stock.ticker}>
            <div
              className="ah-ledger-row"
              onClick={() => (hasHistory ? setOpenTicker(isOpen ? null : stock.ticker) : open(latest, stock.ticker))}
              style={{
                display: 'grid',
                gridTemplateColumns: '92px 1fr auto auto',
                alignItems: 'center',
                gap: 20,
                padding: '20px 4px',
                borderBottom: '1px solid var(--rule)',
                cursor: 'pointer',
              }}
            >
              <div className="mono" style={{ fontWeight: 600, fontSize: 19, color: 'var(--bone)' }}>{stock.ticker}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 15, color: 'var(--bone)' }}>{stock.companyName}</span>
                <span className="mono" style={{ fontSize: 11.5, color: 'var(--muted-dim)' }}>
                  {loadingId === latest.id ? 'Loading…' : `Published ${latest.date}`}
                </span>
              </div>
              <div className="mono ah-ledger-history-count" style={{ fontSize: 11, color: 'var(--muted-dim)', whiteSpace: 'nowrap' }}>
                {hasHistory ? `${stock.entries.length} analyses` : ''}
              </div>
              {latest.verdict && <VerdictBadge verdict={latest.verdict} size="md" />}
            </div>

            {hasHistory && isOpen && (
              <div style={{ padding: '0 4px 24px 112px', borderBottom: '1px solid var(--rule)' }}>
                {stock.entries.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--rule)',
                      fontSize: 14,
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--muted)', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 10 }}>
                      {e.date}
                      <VerdictBadge verdict={e.verdict} size="sm" />
                    </span>
                    <button
                      className="mono"
                      style={{ background: 'none', border: 'none', color: 'var(--amber)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
                      onClick={(evt) => {
                        evt.stopPropagation()
                        open(e, stock.ticker)
                      }}
                      disabled={loadingId === e.id}
                    >
                      {loadingId === e.id ? 'Loading…' : 'View analysis →'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
