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

// Peers with a `flag` (e.g. SKHY in the MU demo data - newly listed, thin
// trading history, non-USD reporting) are still shown in the comps table
// with their warning tooltip, but are excluded from every median/mean/high/
// low stat and from compsImpliedPrice() below, so one flagged peer can't
// skew the numbers those calculations rely on.
function unflagged(peers) {
  return peers.filter((p) => !p.flag)
}

function stats(values) {
  // Drop non-numeric/non-finite values (missing data) and negative multiples.
  // A negative TEV/EBITDA, TEV/EBIT, or P/E means negative EBITDA/EBIT/EPS,
  // not a "cheap" comp - it's not economically comparable to a positive
  // multiple, so it's excluded rather than dragging the median/mean down.
  const clean = values.filter((v) => typeof v === 'number' && Number.isFinite(v) && v >= 0)
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
 * Flagged peers (see `unflagged`) are excluded from these stats.
 */
export function buildCompsTable(peers, targetMetrics) {
  const summary = {}
  const discountToMedian = {}
  const included = unflagged(peers)
  for (const metric of METRICS) {
    const values = included.map((p) => p[metric])
    const s = stats(values)
    summary[metric] = s
    const targetVal = targetMetrics[metric]
    discountToMedian[metric] =
      s.median && typeof targetVal === 'number' ? targetVal / s.median - 1 : null
  }
  return { metrics: METRICS, summary, discountToMedian }
}

/**
 * P/E-implied price: peer median NTM Forward P/E applied to the company's
 * FY1 EPS (the standard "peer median multiple x company metric" approach).
 * Flagged peers (see `unflagged`) are excluded from the median.
 */
export function compsImpliedPrice(peers, fy1Eps) {
  const s = stats(unflagged(peers).map((p) => p.ntmFwdPe))
  if (!s.median || typeof fy1Eps !== 'number') return null
  return s.median * fy1Eps
}

