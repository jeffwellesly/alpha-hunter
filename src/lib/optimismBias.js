// Frankel & Lee (1998) style analyst optimism-bias flag: consensus
// long-term growth (LTG) estimates that run well above a company's own
// historically realized earnings growth are a red flag for systematic
// analyst over-optimism. Computed client-side from data already on hand
// (no API call needed) - Analyst Views can optionally enrich this with a
// Claude-generated explanation when a key is available.

function extractPositiveEpsSeries(financials) {
  const actuals = financials.filter((f) => f.isEstimate !== true)
  const nonGaap = actuals.filter((f) => typeof f.epsNonGaap === 'number' && f.epsNonGaap > 0)
  if (nonGaap.length >= 2) return nonGaap.map((f) => f.epsNonGaap)
  const gaap = actuals.filter((f) => typeof f.epsGaap === 'number' && f.epsGaap > 0)
  if (gaap.length >= 2) return gaap.map((f) => f.epsGaap)
  return null
}

export function computeOptimismBias({ financials, ltg }) {
  if (ltg == null) return { available: false, reason: 'No consensus LTG available yet.' }

  const series = extractPositiveEpsSeries(financials)
  if (!series) {
    return {
      available: false,
      reason: 'Insufficient positive-EPS history to compute a realized growth baseline (recent losses or too few actual years).',
    }
  }

  const first = series[0]
  const last = series[series.length - 1]
  const periods = series.length - 1
  const realizedCagr = Math.pow(last / first, 1 / periods) - 1

  const ratio = realizedCagr > 0 ? ltg / realizedCagr : ltg > 0.15 ? Infinity : 1
  let severity = 'low'
  let flagged = false
  if (ratio >= 2 || (realizedCagr <= 0 && ltg > 0.15)) {
    severity = 'high'
    flagged = true
  } else if (ratio >= 1.4) {
    severity = 'medium'
    flagged = true
  }

  return {
    available: true,
    flagged,
    severity,
    realizedCagr,
    ltg,
    explanation: flagged
      ? `Consensus LTG (${(ltg * 100).toFixed(1)}%) runs well ahead of realized historical EPS growth (${(realizedCagr * 100).toFixed(1)}%) - a classic Frankel & Lee-style optimism signal worth discounting.`
      : `Consensus LTG (${(ltg * 100).toFixed(1)}%) is broadly consistent with realized historical EPS growth (${(realizedCagr * 100).toFixed(1)}%) - no strong optimism-bias signal.`,
  }
}
