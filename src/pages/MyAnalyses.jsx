import { useEffect, useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { listMyAnalyses, getAnalysis, setAnalysisPublic } from '../lib/analysesApi'

export default function MyAnalyses() {
  const { session, accountsEnabled, viewSavedAnalysis, runAnalysis } = useApp()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const reload = useCallback(() => {
    if (!session) return
    setLoading(true)
    listMyAnalyses(session.user.id)
      .then(setRows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [session])

  useEffect(reload, [reload])

  if (!accountsEnabled) {
    return <div className="card"><div className="card-body">Accounts aren't set up on this deployment yet.</div></div>
  }
  if (!session) {
    return <div className="card"><div className="card-body">Sign in (top right) to see your saved analyses.</div></div>
  }

  async function view(id) {
    setBusyId(id)
    try {
      const full = await getAnalysis(id)
      viewSavedAnalysis(full.results_json, full.ticker)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  async function togglePublic(row) {
    setBusyId(row.id)
    try {
      await setAnalysisPublic(row.id, !row.is_public)
      reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  function generateLatest(ticker) {
    // Creates a new dated row - save-on-complete in AppContext.runAnalysis
    // handles this automatically. History is preserved, not overwritten.
    runAnalysis(ticker)
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Previous Analyses</div>
          <div className="card-subtitle">Every analysis you've run, saved automatically. Private by default.</div>
        </div>
      </div>
      <div className="card-body" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div style={{ color: 'var(--accent-red)' }}>{error}</div>
        ) : rows.length === 0 ? (
          <div style={{ color: 'var(--text-tertiary)' }}>Nothing yet — run an analysis from the header to see it here.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Company (Ticker)</th>
                <th>Analysis Date</th>
                <th>Status</th>
                <th>Visibility</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.company_name} ({row.ticker})</td>
                  <td>{row.created_at?.slice(0, 10)}</td>
                  <td>{row.status}</td>
                  <td>{row.is_public ? 'Public' : 'Private'}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => view(row.id)} disabled={busyId === row.id}>
                      View
                    </button>
                    <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => generateLatest(row.ticker)}>
                      Generate Latest
                    </button>
                    <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => togglePublic(row)} disabled={busyId === row.id}>
                      {row.is_public ? 'Unpublish' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
