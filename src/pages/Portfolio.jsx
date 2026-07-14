import { useEffect, useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import {
  listMyPortfolio,
  addPortfolioTicker,
  removePortfolioTicker,
  getLatestVerdictsByTicker,
  startPortfolioRun,
  finishPortfolioRun,
} from '../lib/analysesApi'
import { fmtPct } from '../lib/format'

export default function Portfolio() {
  const { session, accountsEnabled, runAnalysis, hasAnthropicKey } = useApp()
  const [holdings, setHoldings] = useState([])
  const [verdicts, setVerdicts] = useState({})
  const [tickerInput, setTickerInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [running, setRunning] = useState(false)
  const [runStatus, setRunStatus] = useState(null)

  const reload = useCallback(() => {
    if (!session) return
    setLoading(true)
    listMyPortfolio(session.user.id)
      .then(async (rows) => {
        setHoldings(rows)
        const tickers = rows.map((r) => r.ticker)
        const v = await getLatestVerdictsByTicker(session.user.id, tickers)
        setVerdicts(v)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [session])

  useEffect(reload, [reload])

  if (!accountsEnabled) {
    return <div className="card"><div className="card-body">Accounts aren't set up on this deployment yet.</div></div>
  }
  if (!session) {
    return <div className="card"><div className="card-body">Sign in (top right) to track a portfolio.</div></div>
  }

  async function addTicker(e) {
    e.preventDefault()
    const t = tickerInput.trim().toUpperCase()
    if (!t) return
    setTickerInput('')
    try {
      await addPortfolioTicker(session.user.id, t)
      reload()
    } catch (err) {
      setError(err.message)
    }
  }

  async function remove(ticker) {
    try {
      await removePortfolioTicker(session.user.id, ticker)
      reload()
    } catch (err) {
      setError(err.message)
    }
  }

  async function analyzeAll() {
    if (!holdings.length || !hasAnthropicKey) return
    setRunning(true)
    let run = null
    try {
      run = await startPortfolioRun({ userId: session.user.id, tickerList: holdings.map((h) => h.ticker) })
      for (const h of holdings) {
        setRunStatus(`Analyzing ${h.ticker}…`)
        // eslint-disable-next-line no-await-in-loop -- sequential by design, one at a time, same call-budget reasoning as everywhere else in this app
        await runAnalysis(h.ticker)
      }
      await finishPortfolioRun(run.id, 'complete')
      reload()
    } catch (err) {
      if (run) await finishPortfolioRun(run.id, 'partial').catch(() => {})
      setError(err.message)
    } finally {
      setRunning(false)
      setRunStatus(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Portfolio</div>
            <div className="card-subtitle">Tickers you're tracking, with the most recent signal from your saved analyses.</div>
          </div>
          <button className="btn btn-primary" onClick={analyzeAll} disabled={running || !holdings.length || !hasAnthropicKey}>
            {running ? runStatus || 'Analyzing…' : 'Analyze all portfolio stocks'}
          </button>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <form onSubmit={addTicker} style={{ display: 'flex', gap: 8 }}>
            <input
              className="input"
              style={{ maxWidth: 200, textTransform: 'uppercase' }}
              placeholder="Ticker"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
          {error && <div style={{ color: 'var(--accent-red)', fontSize: 12.5 }}>{error}</div>}
          {loading ? (
            <div>Loading…</div>
          ) : holdings.length === 0 ? (
            <div style={{ color: 'var(--text-tertiary)' }}>No holdings yet — add a ticker above.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Added</th>
                  <th>Latest Signal</th>
                  <th>Upside</th>
                  <th>As Of</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => {
                  const v = verdicts[h.ticker]
                  return (
                    <tr key={h.ticker}>
                      <td>{h.ticker}</td>
                      <td>{h.added_at?.slice(0, 10)}</td>
                      <td>{v?.verdict ?? '—'}</td>
                      <td>{v?.upside != null ? fmtPct(v.upside) : '—'}</td>
                      <td>{v?.asOf?.slice(0, 10) ?? '—'}</td>
                      <td>
                        <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => remove(h.ticker)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
