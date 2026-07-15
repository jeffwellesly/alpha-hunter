export function fmtPrice(v, { decimals = 2 } = {}) {
  if (v == null || !Number.isFinite(v)) return '-'
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
}

export function fmtPct(v, { decimals = 1, showSign = true } = {}) {
  if (v == null || !Number.isFinite(v)) return '-'
  const pct = v * 100
  const sign = showSign && pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(decimals)}%`
}

export function fmtMultiple(v, { decimals = 1 } = {}) {
  if (v == null || !Number.isFinite(v)) return '-'
  return `${v.toFixed(decimals)}x`
}

export function fmtNumber(v, { decimals = 0 } = {}) {
  if (v == null || !Number.isFinite(v)) return '-'
  return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function fmtCompactUsd(v) {
  if (v == null || !Number.isFinite(v)) return '-'
  const abs = Math.abs(v)
  if (abs >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (abs >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (abs >= 1e6) return `$${(v / 1e6).toFixed(1)}M`
  return `$${v.toFixed(0)}`
}

export function fmtMillions(v, { decimals = 0 } = {}) {
  if (v == null || !Number.isFinite(v)) return '-'
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}M`
}

export function upsideClass(v) {
  if (v == null) return ''
  if (v > 0.02) return 'positive'
  if (v < -0.02) return 'negative'
  return 'neutral'
}
