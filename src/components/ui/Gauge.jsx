function colorForScore(score) {
  if (score >= 65) return 'var(--green)'
  if (score >= 40) return 'var(--amber)'
  return 'var(--rose)'
}

/** 270°-sweep ring gauge, matching the ledger/editorial theme. */
export default function Gauge({ score, size = 150 }) {
  const clamped = Math.max(0, Math.min(100, score ?? 0))
  const color = colorForScore(clamped)
  const filledDeg = (clamped / 100) * 270
  const strokeWidth = 13
  const mask = `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), #000 calc(100% - ${strokeWidth}px))`

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `conic-gradient(from -225deg at 50% 50%, ${color} 0deg ${filledDeg}deg, var(--rule) ${filledDeg}deg 270deg, transparent 270deg 360deg)`,
          WebkitMask: mask,
          mask,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: size * 0.227,
          fontWeight: 500,
          color: 'var(--bone)',
        }}
      >
        {Math.round(clamped)}
      </div>
    </div>
  )
}
