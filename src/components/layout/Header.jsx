import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useCompanyData } from '../../hooks/useCompanyData'
import { DEMO_TICKERS, DEMO_DATA } from '../../data/demo'
import { generateMemo } from '../../lib/docxExport'
import SettingsModal from './SettingsModal'
import AuthPanel from '../auth/AuthPanel'

export default function Header() {
  const { ticker, setTicker, demoMode, setDemoMode, hasAnthropicKey, runAnalysis, analysisProgress, accountsEnabled, session, signOut } = useApp()
  const { data: companyData } = useCompanyData()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [tickerInput, setTickerInput] = useState(ticker)
  const [generatingMemo, setGeneratingMemo] = useState(false)
  const [memoError, setMemoError] = useState(null)

  const memoReady = Boolean(companyData?.comps?.peers?.length && companyData?.narrative)

  async function handleGenerateMemo() {
    if (!companyData) return
    setMemoError(null)
    setGeneratingMemo(true)
    try {
      await generateMemo(companyData)
    } catch (err) {
      setMemoError(err.message)
    } finally {
      setGeneratingMemo(false)
    }
  }

  function submitTicker(e) {
    e.preventDefault()
    const t = tickerInput.trim().toUpperCase()
    if (!t) return
    if (demoMode && DEMO_TICKERS.includes(t)) {
      setTicker(t)
      return
    }
    // typing a ticker while in demo mode, or any ticker in live mode, runs a
    // fresh Claude-web-search analysis - there's no automatic per-ticker
    // fetch anymore, this is the explicit trigger.
    runAnalysis(t)
  }

  return (
    <>
      <header
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexShrink: 0 }}>
            <span
              style={{
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #3ba7ff, #2ee6a8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AlphaHunter
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'none' }} className="tagline">
              Hunt the signal. Find the value.
            </span>
          </div>

          {demoMode ? (
            <div style={{ display: 'flex', gap: 6 }} role="tablist" aria-label="Demo company">
              {DEMO_TICKERS.map((t) => (
                <button
                  key={t}
                  className="btn"
                  onClick={() => setTicker(t)}
                  title={DEMO_DATA[t].companyName}
                  style={
                    ticker === t
                      ? { background: 'linear-gradient(135deg, #2f7fe0, #1c5fc2)', borderColor: 'transparent', color: 'white' }
                      : undefined
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={submitTicker} style={{ display: 'flex', gap: 8, flex: 1, maxWidth: 320 }}>
              <input
                className="input"
                value={tickerInput}
                onChange={(e) => setTickerInput(e.target.value)}
                placeholder="Ticker (e.g. AAPL)"
                style={{ textTransform: 'uppercase', fontWeight: 700 }}
                disabled={!!analysisProgress}
              />
              <button className="btn btn-primary" type="submit" disabled={!hasAnthropicKey || !!analysisProgress}>
                {analysisProgress ? 'Analyzing…' : 'Analyze'}
              </button>
            </form>
          )}
          {analysisProgress && (
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', flexShrink: 0 }}>{analysisProgress.message}</div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <div
              className="badge"
              style={{
                cursor: 'pointer',
                background: demoMode ? 'var(--accent-gold-dim)' : 'var(--accent-green-dim)',
                color: demoMode ? 'var(--accent-gold)' : 'var(--accent-green)',
                border: `1px solid ${demoMode ? 'rgba(245,197,66,0.35)' : 'rgba(46,230,168,0.35)'}`,
              }}
              onClick={() => {
                if (demoMode) setTickerInput(ticker)
                setDemoMode(!demoMode)
              }}
              title="Toggle demo/live mode"
            >
              {demoMode ? 'Demo Data' : 'Live Data'}
            </div>
            <button
              className="btn btn-primary"
              onClick={handleGenerateMemo}
              disabled={!memoReady || generatingMemo}
              title={memoReady ? 'Download a Word memo for this analysis' : 'Needs a peer group + narrative data before it can generate'}
            >
              {generatingMemo ? 'Generating…' : 'Generate Memo'}
            </button>
            <button className="btn" onClick={() => setSettingsOpen(true)}>
              Settings{hasAnthropicKey ? '' : ' •'}
            </button>
            {accountsEnabled && (
              session ? (
                <button className="btn" onClick={signOut}>Sign out</button>
              ) : (
                <button className="btn" onClick={() => setAuthOpen(true)}>Sign in</button>
              )
            )}
          </div>
        </div>
        {memoError && (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--accent-red)', paddingBottom: 8 }}>{memoError}</div>
        )}
      </header>
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
      {authOpen && <AuthPanel onClose={() => setAuthOpen(false)} />}
    </>
  )
}
