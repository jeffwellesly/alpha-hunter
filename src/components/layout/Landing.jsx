import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { DEMO_DATA } from '../../data/demo'
import { listPublicAnalyses, getAnalysis } from '../../lib/analysesApi'
import AuthPanel from '../auth/AuthPanel'

export default function Landing() {
  const { setAnthropicApiKey, setDemoMode, setTicker, runAnalysis, viewSavedAnalysis, dismissWelcome, accountsEnabled } = useApp()
  const navigate = useNavigate()
  const [anthropicDraft, setAnthropicDraft] = useState('')
  const [tickerDraft, setTickerDraft] = useState('')
  const [showLiveForm, setShowLiveForm] = useState(false)
  const [authMode, setAuthMode] = useState(null) // null | 'signIn' | 'signUp'
  const [publicAnalyses, setPublicAnalyses] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    if (!accountsEnabled) return
    listPublicAnalyses().then(setPublicAnalyses).catch(() => {})
  }, [accountsEnabled])

  function startLive() {
    const key = anthropicDraft.trim()
    setAnthropicApiKey(key)
    dismissWelcome()
    const t = tickerDraft.trim().toUpperCase()
    if (t) runAnalysis(t)
  }

  function viewDemo(ticker) {
    setDemoMode(true)
    setTicker(ticker)
    dismissWelcome()
  }

  async function viewPublicAnalysis(row) {
    setLoadingId(row.id)
    try {
      const full = await getAnalysis(row.id)
      viewSavedAnalysis(full.results_json, full.ticker)
      dismissWelcome()
    } catch {
      // stays on the landing page, nothing to show if this fails
    } finally {
      setLoadingId(null)
    }
  }

  const canStartLive = anthropicDraft.trim().length > 0 && tickerDraft.trim().length > 0

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
        padding: '80px 20px 60px',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--accent-blue)' }}>ALPHAHUNTER</div>
      <h1
        style={{
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          maxWidth: 720,
          margin: '16px 0 0',
          lineHeight: 1.15,
        }}
      >
        Value any stock the way equity analysts do
      </h1>
      <p style={{ fontSize: 16, color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: 560, margin: '18px 0 0', lineHeight: 1.5 }}>
        Residual income valuation, comps, and financial health — researched live by AI, explained in plain language.{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>Not investment advice.</strong>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          width: '100%',
          maxWidth: 900,
          marginTop: 44,
        }}
      >
        <LandingCard
          icon="📊"
          title="Sample Analysis"
          subtitle="See real output for two companies, no setup"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            {['MU', 'LLY'].map((t) => (
              <button
                key={t}
                className="btn"
                style={{ textAlign: 'left', padding: '10px 12px' }}
                onClick={() => viewDemo(t)}
              >
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{DEMO_DATA[t].ticker} — {DEMO_DATA[t].companyName}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Analyzed as of {DEMO_DATA[t].asOfDate}</div>
              </button>
            ))}
          </div>
        </LandingCard>

        <LandingCard icon="📖" title="About This App" subtitle="Methodology, glossary of every term, and the risk disclosure">
          <Link to="/about" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 10, textDecoration: 'none' }}>
            Read the full guide
          </Link>
        </LandingCard>

        {accountsEnabled && (
          <LandingCard icon="👤" title="Sign In / Account" subtitle="Save analyses and track a portfolio - sign in to see everything under your account">
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setAuthMode('signIn')}>
                Sign in
              </button>
              <button className="btn" style={{ flex: 1 }} onClick={() => setAuthMode('signUp')}>
                Create account
              </button>
            </div>
          </LandingCard>
        )}

        <LandingCard icon="🔎" title="Analyze Your Own Stock" subtitle="Bring your own Anthropic API key, any ticker">
          {!showLiveForm ? (
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => setShowLiveForm(true)}>
              Get started
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              <input
                className="input"
                type="password"
                value={anthropicDraft}
                onChange={(e) => setAnthropicDraft(e.target.value)}
                placeholder="Anthropic API key"
              />
              <input
                className="input"
                value={tickerDraft}
                onChange={(e) => setTickerDraft(e.target.value)}
                placeholder="Ticker (e.g. AAPL)"
                style={{ textTransform: 'uppercase', fontWeight: 700 }}
              />
              <button className="btn btn-primary" onClick={startLive} disabled={!canStartLive}>
                Start Live Analysis
              </button>
              <div style={{ fontSize: 10.5, color: 'var(--text-disabled)', lineHeight: 1.5 }}>
                Free at console.anthropic.com. Researched live via Claude web search, not a financials API — verify anything
                load-bearing. Keys stay in your browser only.
              </div>
            </div>
          )}
        </LandingCard>
      </div>

      {accountsEnabled && publicAnalyses.length > 0 && (
        <div style={{ width: '100%', maxWidth: 900, marginTop: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Published analyses
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {publicAnalyses.map((row) => (
              <button
                key={row.id}
                className="btn"
                style={{ padding: '10px 14px', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => viewPublicAnalysis(row)}
                disabled={loadingId === row.id}
              >
                <span><strong>{row.ticker}</strong> — {row.company_name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{loadingId === row.id ? 'Loading…' : row.created_at?.slice(0, 10)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 50, fontSize: 11.5, color: 'var(--text-disabled)', textAlign: 'center', maxWidth: 560, lineHeight: 1.6 }}>
        AlphaHunter applies established equity-valuation methodology (Alphanomics / residual income model) to publicly
        available information researched by AI. It is a research tool, not investment advice — see{' '}
        <Link to="/about" style={{ color: 'var(--text-tertiary)' }}>About</Link> for the full risk disclosure. Investing carries
        risk; decisions and outcomes are your own.
      </div>

      {authMode && (
        <AuthPanel
          initialMode={authMode}
          onClose={() => setAuthMode(null)}
          onAuthed={() => {
            // After signing in, go straight to "your analyses" rather than
            // leaving them on whatever demo ticker was last shown - this is
            // the whole point of signing in.
            dismissWelcome()
            navigate('/my-analyses')
          }}
        />
      )}
    </div>
  )
}

function LandingCard({ icon, title, subtitle, children }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4, lineHeight: 1.4 }}>{subtitle}</div>
      {children}
    </div>
  )
}
