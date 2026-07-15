import InfoBadge from './InfoBadge'

export default function ProgressBar({ pct, color = 'var(--blue)', label, explainKey }) {
  const clamped = Math.max(0, Math.min(100, pct ?? 0))
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: 'var(--bone)', marginBottom: 8 }}>
          <span>{label}{explainKey && <InfoBadge explainKey={explainKey} />}</span>
          <span className="mono" style={{ color: 'var(--muted)' }}>{Math.round(clamped)}%</span>
        </div>
      )}
      <div style={{ height: 6, background: 'var(--rule)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${clamped}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}
