import InfoBadge from './InfoBadge'

export default function ProgressBar({ pct, color = 'var(--accent-blue)', label, explainKey }) {
  const clamped = Math.max(0, Math.min(100, pct ?? 0))
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>
          <span>{label}{explainKey && <InfoBadge explainKey={explainKey} />}</span>
          <span className="mono">{Math.round(clamped)}%</span>
        </div>
      )}
      <div style={{ height: 6, background: 'var(--bg-inset)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${clamped}%`, height: '100%', background: color, borderRadius: 999, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}
