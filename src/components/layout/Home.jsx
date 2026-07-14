import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { DEMO_TICKERS, DEMO_DATA } from '../../data/demo'
import { listPublicAnalyses, getAnalysis } from '../../lib/analysesApi'
import { supabaseConfigured } from '../../lib/supabaseClient'
import { buildValuationSummary } from '../../lib/valuation'
import VerdictBadge from '../ui/VerdictBadge'

export default function Home() {
  const { viewAnalysis } = useApp()
  const [published, setPublished] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    if (!supabaseConfigured) return
    listPublicAnalyses().then(setPublished).catch(() => {})
  }, [])

  const demoItems = useMemo(
    () =>
      DEMO_TICKERS.map((t) => {
        const d = DEMO_DATA[t]
        let verdict = null
        try {
          verdict = buildValuationSummary({
            rimInputs: d.rimInputs,
            comps: d.comps,
            analystViews: d.analystViews,
            currentPrice: d.currentPrice,
          }).verdict
        } catch {
          // leave verdict null if it can't be computed
        }
        return { key: `demo-${t}`, ticker: t, companyName: d.companyName, date: d.asOfDate, verdict, kind: 'demo', raw: d }
      }),
    []
  )

  const publishedItems = published.map((row) => ({
    key: row.id,
    ticker: row.ticker,
    companyName: row.company_name,
    date: row.created_at?.slice(0, 10),
    verdict: null,
    kind: 'published',
    id: row.id,
  }))

  const items = [...publishedItems, ...demoItems].sort((a, b) => (a.date < b.date ? 1 : -1))

  async function open(item) {
    if (item.kind === 'demo') {
      viewAnalysis(item.raw, item.ticker)
      return
    }
    setLoadingId(item.id)
    try {
      const full = await getAnalysis(item.id)
      viewAnalysis(full.results_json, full.ticker)
    } catch {
      // stays on the list if this fails
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        background: 'var(--bg-base, #05070d)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '70px 20px 60px',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--accent-blue)' }}>ALPHAHUNTER</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 700, margin: '16px 0 0', lineHeight: 1.2 }}>
        Stock analysis, published as I do it
      </h1>
      <p style={{ fontSize: 15.5, color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: 560, margin: '16px 0 0', lineHeight: 1.55 }}>
        Every analysis below uses the same residual income valuation, comps, and financial health methodology.{' '}
        <Link to="/about" style={{ color: 'var(--text-secondary)' }}>Read how it works</Link> —{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>not investment advice.</strong>
      </p>

      <div style={{ width: '100%', maxWidth: 760, marginTop: 44 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Analyses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item) => (
            <button
              key={item.key}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                border: 'none',
                width: '100%',
              }}
              onClick={() => open(item)}
              disabled={loadingId === item.id}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>
                  {item.ticker} <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>— {item.companyName}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-disabled)', marginTop: 2 }}>
                  {loadingId === item.id ? 'Loading…' : `Published ${item.date}`}
                </div>
              </div>
              {item.verdict && <VerdictBadge verdict={item.verdict} />}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 760, marginTop: 40 }}>
        <div
          className="card"
          style={{ padding: '18px 20px', opacity: 0.6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Want an analysis of your own stock?</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Self-serve analysis — coming soon.</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 50, fontSize: 11.5, color: 'var(--text-disabled)', textAlign: 'center', maxWidth: 560, lineHeight: 1.6 }}>
        AlphaHunter applies established equity-valuation methodology (Alphanomics / residual income model) to publicly
        available information researched by AI. It is a research tool, not investment advice — see{' '}
        <Link to="/about" style={{ color: 'var(--text-tertiary)' }}>About</Link> for the full risk disclosure. Investing carries
        risk; decisions and outcomes are your own.
      </div>
    </div>
  )
}
