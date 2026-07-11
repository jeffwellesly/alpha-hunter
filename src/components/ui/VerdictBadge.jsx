export default function VerdictBadge({ verdict, size = 'lg' }) {
  if (!verdict) return <span className="badge" style={{ background: 'var(--bg-inset)', color: 'var(--text-tertiary)' }}>—</span>
  const cls = verdict === 'Buy' ? 'badge-buy' : verdict === 'Sell' ? 'badge-sell' : 'badge-hold'
  const fontSize = size === 'lg' ? 16 : 12
  const padding = size === 'lg' ? '8px 22px' : '4px 12px'
  return (
    <span className={`badge ${cls}`} style={{ fontSize, padding }}>
      {verdict}
    </span>
  )
}
