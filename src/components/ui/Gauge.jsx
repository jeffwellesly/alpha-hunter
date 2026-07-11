function colorForScore(score) {
  if (score >= 65) return 'var(--accent-green)'
  if (score >= 40) return 'var(--accent-gold)'
  return 'var(--accent-red)'
}

/** Semi-circle 0-100 gauge with a needle, matching the deep-navy theme. */
export default function Gauge({ score, size = 180 }) {
  const clamped = Math.max(0, Math.min(100, score ?? 0))
  const color = colorForScore(clamped)
  const cx = size / 2
  const cy = size / 2 + 6
  const r = size / 2 - 18

  const angleForScore = (s) => Math.PI - (s / 100) * Math.PI
  const pointOnArc = (s, radius) => {
    const angle = angleForScore(s)
    return { x: cx + radius * Math.cos(angle), y: cy - radius * Math.sin(angle) }
  }

  const segments = [
    { from: 0, to: 40, color: 'var(--accent-red)' },
    { from: 40, to: 65, color: 'var(--accent-gold)' },
    { from: 65, to: 100, color: 'var(--accent-green)' },
  ]

  const arcPath = (from, to, radius) => {
    const start = pointOnArc(from, radius)
    const end = pointOnArc(to, radius)
    const largeArc = to - from > 50 ? 1 : 0
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  const needle = pointOnArc(clamped, r - 6)

  return (
    <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
      {segments.map((seg) => (
        <path
          key={seg.from}
          d={arcPath(seg.from, seg.to, r)}
          stroke={seg.color}
          strokeWidth={14}
          strokeLinecap="round"
          fill="none"
          opacity={0.35}
        />
      ))}
      <path
        d={arcPath(0, clamped, r)}
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        fill="none"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="var(--text-primary)" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill="var(--text-primary)" />
      <text x={cx} y={cy - r / 2 - 4} textAnchor="middle" fontSize={30} fontWeight={800} fill={color} fontFamily="var(--font-mono)">
        {Math.round(clamped)}
      </text>
    </svg>
  )
}
