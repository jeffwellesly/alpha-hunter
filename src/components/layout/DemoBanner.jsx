import { useApp } from '../../context/AppContext'

export default function DemoBanner() {
  const { demoMode, hasFmpKey } = useApp()

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
        Live mode — {hasFmpKey ? 'pulling fresh data from FMP' : 'add your FMP key in Settings to fetch live data'}
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
      Demo mode — showing cached, pre-run analysis for MRVL / NFLX. No API keys required.
    </div>
  )
}
