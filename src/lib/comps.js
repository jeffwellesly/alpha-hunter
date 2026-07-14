const METRICS = ['tevRevenue', 'tevEbitda', 'tevEbit', 'pDilutedEps', 'pTangibleBv', 'ntmTevRevenue', 'ntmFwdPe']

export const METRIC_LABELS = {
  tevRevenue: 'TEV/Revenue',
  tevEbitda: 'TEV/EBITDA',
  tevEbit: 'TEV/EBIT',
  pDilutedEps: 'P/Diluted EPS',
  pTangibleBv: 'P/Tangible BV',
  ntmTevRevenue: 'NTM TEV/Revenue',
  ntmFwdPe: 'NTM Fwd P/E',
}

function stats(values) {
  const clean = values.filter((v) => typeof v === 'number' && Number.isFinite(v))
  if (clean.length === 0) return { high: null, low: null, mean: null, median: null }
  const sorted = [...clean].sort((a, b) => a - b)
  const mean = clean.reduce((a, b) => a + b, 0) / clean.length
  const mid = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
  return { high: sorted[sorted.length - 1], low: sorted[0], mean, median }
}

/**
 * Computes High/Low/Mean/Median per multiple across the peer group, and the
 * target company's % discount/premium to peer median for each metric.
 */
export function buildCompsTable(peers, targetMetrics) {
  const summary = {}
  const discountToMedian = {}
  for (const metric of METRICS) {
    const values = peers.map((p) => p[metric])
    const s = stats(values)
    summary[metric] = s
    const targetVal = targetMetrics[metric]
    discountToMedian[metric] =
      s.median && typeof targetVal === 'number' ? targetVal / s.median - 1 : null
  }
  return { metrics: METRICS, summary, discountToMedian }
}

/**
 * Comps-implied price: peer median NTM Forward P/E applied to the company's
 * FY1 EPS (the standard "peer median multiple x company metric" approach).
 */
export function compsImpliedPrice(peers, fy1Eps) {
  const s = stats(peers.map((p) => p.ntmFwdPe))
  if (!s.median || typeof fy1Eps !== 'number') return null
  return s.median * fy1Eps
}

