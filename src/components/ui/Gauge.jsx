function colorForScore(score) {
  if (score >= 65) return 'var(--accent-green)'
  if (score >= 40) return 'var(--accent-gold)'
  return 'var(--accent-red)'
}

/** Semi-circle 0-100 gauge, matching the deep-navy theme. */
export default function Gauge({ score, size = 180 }) {
  const clamped = Math.max(0, Math.min(100, score ?? 0))
  const color = colorForScore(clamped)
  const strokeWidth = 16
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - strokeWidth / 2 - 4
  const height = size / 2 + strokeWidth / 2 + 4

  const angleForScore = (s) => Math.PI - (s / 100) * Math.PI
  const pointOnArc = (s) => {
    const angle = angleForScore(s)
    return { x: cx + r * Math.cos(angle), y: cy - r * Math.sin(angle) }
  }

  const arcPath = (from, to) => {
    const start = pointOnArc(from)
    const end = pointOnArc(to)
    const largeArc = to - from > 50 ? 1 : 0
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  return (
    <svg width={size} height={height} viewBox={`0 0 ${size} ${height}`}>
      <path d={arcPath(0, 100)} stroke="var(--bg-inset)" strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
      {clamped > 0 && (
        <path
          d={arcPath(0, clamped)}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          style={{ filter: `drop-shadow(0 0 5px ${color}99)` }}
        />
      )}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={34} fontWeight={800} fill={color} fontFamily="var(--font-mono)">
        {Math.round(clamped)}
      </text>
    </svg>
  )
}
