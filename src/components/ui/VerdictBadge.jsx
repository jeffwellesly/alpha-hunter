const SIZES = {
  lg: { fontSize: 14, padding: '8px 18px' },
  md: { fontSize: 12, padding: '7px 14px' },
  sm: { fontSize: 10, padding: '3px 9px' },
}

export default function VerdictBadge({ verdict, size = 'md' }) {
  const { fontSize, padding } = SIZES[size] || SIZES.md
  if (!verdict) return <span className="badge" style={{ background: 'var(--paper-raised)', color: 'var(--muted)', fontSize, padding }}>-</span>
  const cls = verdict === 'Buy' ? 'badge-buy' : verdict === 'Sell' ? 'badge-sell' : 'badge-hold'
  return (
    <span className={`badge ${cls}`} style={{ fontSize, padding }}>
      {verdict.toUpperCase()}
    </span>
  )
}
