import { useState, useEffect } from 'react'
import { listPublicAnalyses } from '../lib/analysesApi'
import { supabaseConfigured } from '../lib/supabaseClient'
import { buildLedger } from '../lib/ledger'
import Nav from '../components/layout/Nav'
import Ledger from '../components/layout/Ledger'

export default function Analyses() {
  const [published, setPublished] = useState([])

  useEffect(() => {
    if (!supabaseConfigured) return
    listPublicAnalyses().then(setPublished).catch(() => {})
  }, [])

  const stocks = buildLedger(published)

  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', background: 'var(--ink)', zIndex: 200 }}>
      <Nav active="analyses" />
      <main className="ah-page-main" style={{ maxWidth: 920, margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{ padding: '64px 0 32px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 34, marginBottom: 10 }}>Latest analyses</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>
            Every published write-up, most recent first. Tickers revisited more than once show their full history —
            click a row to expand it. <b style={{ color: 'var(--bone)', fontWeight: 500 }}>This is a research log, not investment advice.</b>
          </p>
        </div>
        <Ledger stocks={stocks} />
      </main>
    </div>
  )
}
