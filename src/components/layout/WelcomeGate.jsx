import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DEMO_DATA } from '../../data/demo'

export default function WelcomeGate() {
  const { setFmpApiKey, setAnthropicApiKey, setDemoMode, setTicker, dismissWelcome } = useApp()
  const [fmpDraft, setFmpDraft] = useState('')
  const [anthropicDraft, setAnthropicDraft] = useState('')

  function startLive() {
    setFmpApiKey(fmpDraft.trim())
    setAnthropicApiKey(anthropicDraft.trim())
    setDemoMode(false)
    dismissWelcome()
  }

  function viewDemo(ticker) {
    setDemoMode(true)
    setTicker(ticker)
    dismissWelcome()
  }

  const canStartLive = fmpDraft.trim().length > 0

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
            <div className="label" style={{ marginBottom: 10 }}>Analyze any stock — bring your own API keys</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                className="input"
                type="password"
                value={fmpDraft}
                onChange={(e) => setFmpDraft(e.target.value)}
                placeholder="Financial Modeling Prep API key (required)"
              />
              <input
                className="input"
                type="password"
                value={anthropicDraft}
                onChange={(e) => setAnthropicDraft(e.target.value)}
                placeholder="Anthropic API key (optional)"
              />
              <button className="btn btn-primary" onClick={startLive} disabled={!canStartLive}>
                Start Live Analysis
              </button>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                Both are free to get (financialmodelingprep.com, console.anthropic.com). Keys stay in your browser only — see Settings
                for details.
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
