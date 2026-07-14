import { useApp } from '../../context/AppContext'

export default function DemoBanner() {
  const { demoMode, hasAnthropicKey, analysisProgress } = useApp()

  if (!demoMode) {
    return (
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(46,230,168,0.12), transparent)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: 12.5,
          color: 'var(--accent-green)',
          padding: '7px 24px',
          textAlign: 'center',
        }}
      >
        Live mode — {analysisProgress
          ? analysisProgress.message
          : hasAnthropicKey
            ? 'researched live via Claude web search — verify anything load-bearing'
            : 'add your Anthropic key in Settings, then enter a ticker to analyze'}
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(245,197,66,0.12), transparent)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: 12.5,
        color: 'var(--accent-gold)',
        padding: '7px 24px',
        textAlign: 'center',
      }}
    >
      Demo mode — showing cached, pre-run analysis for MU / LLY. No API keys required.
    </div>
  )
}
