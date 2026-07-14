import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DEMO_DATA } from '../../data/demo'

export default function WelcomeGate() {
  const { setAnthropicApiKey, setDemoMode, setTicker, runAnalysis, dismissWelcome } = useApp()
  const [anthropicDraft, setAnthropicDraft] = useState('')
  const [tickerDraft, setTickerDraft] = useState('')

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

  const canStartLive = anthropicDraft.trim().length > 0 && tickerDraft.trim().length > 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 6, 14, 0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 20,
      }}
    >
      <div className="card" style={{ width: 560, maxWidth: '100%' }}>
        <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #3ba7ff, #2ee6a8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to AlphaHunter
          </span>
          <div className="card-subtitle">Hunt the signal. Find the value.</div>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div className="label" style={{ marginBottom: 10 }}>Analyze any stock — bring your own Anthropic API key</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                className="input"
                type="password"
                value={anthropicDraft}
                onChange={(e) => setAnthropicDraft(e.target.value)}
                placeholder="Anthropic API key (required)"
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
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                Free to get at console.anthropic.com. Every number is researched live via Claude web search — no financials API is
                used, so figures can be wrong; verify anything load-bearing. Keys stay in your browser only — see Settings for
                details.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-disabled)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            not ready to analyze yet?
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          <div>
            <div className="label" style={{ marginBottom: 10 }}>See it in action first — no keys needed</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button className="btn" style={{ padding: '14px', textAlign: 'left' }} onClick={() => viewDemo('MU')}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{DEMO_DATA.MU.ticker} — {DEMO_DATA.MU.companyName}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>AI/HBM memory supercycle</div>
              </button>
              <button className="btn" style={{ padding: '14px', textAlign: 'left' }} onClick={() => viewDemo('LLY')}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{DEMO_DATA.LLY.ticker} — {DEMO_DATA.LLY.companyName}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>GLP-1 franchise dominance</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
