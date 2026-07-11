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

/**
 * Derives the 7 comps multiples from a cheap 2-call peer fetch (ratios +
 * key-metrics), rather than fetching each multiple individually. FMP's free
 * tier has no forward/NTM data, so NTM columns fall back to trailing values
 * as an approximation (same convention used in the demo datasets), flagged
 * via `approximated`.
 */
export function peerMetricsToMultiples({ ticker, ratios, keyMetrics, name }) {
  const tevRevenue = keyMetrics?.evToSales ?? null
  const tevEbitda = keyMetrics?.evToEBITDA ?? null
  const tevEbit =
    keyMetrics?.evToEBITDA && ratios?.ebitdaMargin && ratios?.ebitMargin
      ? keyMetrics.evToEBITDA * (ratios.ebitdaMargin / ratios.ebitMargin)
      : null
  const pDilutedEps = ratios?.priceToEarningsRatio ?? null
  // Guard against a negative/near-zero tangible book value, which would
  // otherwise produce a nonsensical multiple.
  const pTangibleBv =
    ratios?.priceToBookRatio && ratios?.bookValuePerShare && ratios?.tangibleBookValuePerShare > 0.01
      ? ratios.priceToBookRatio * (ratios.bookValuePerShare / ratios.tangibleBookValuePerShare)
      : null

  return {
    ticker,
    name: name || ticker,
    tevRevenue,
    tevEbitda,
    tevEbit,
    pDilutedEps,
    pTangibleBv,
    ntmTevRevenue: tevRevenue,
    ntmFwdPe: pDilutedEps,
    approximated: ['ntmTevRevenue', 'ntmFwdPe'],
  }
}
