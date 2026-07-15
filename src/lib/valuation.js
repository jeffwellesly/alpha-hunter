import { solveTargetRoe } from './rim.js'
import { compsImpliedPrice } from './comps.js'

export const VERDICT_THRESHOLD = 0.15

export function verdictFromUpside(upside) {
  if (upside == null) return null
  if (upside > VERDICT_THRESHOLD) return 'Buy'
  if (upside < -VERDICT_THRESHOLD) return 'Sell'
  return 'Hold'
}

function mean(values) {
  const clean = values.filter((v) => typeof v === 'number' && Number.isFinite(v))
  if (!clean.length) return null
  return clean.reduce((a, b) => a + b, 0) / clean.length
}

function median(values) {
  const clean = values.filter((v) => typeof v === 'number' && Number.isFinite(v)).sort((a, b) => a - b)
  if (!clean.length) return null
  const mid = Math.floor(clean.length / 2)
  return clean.length % 2 === 0 ? (clean[mid - 1] + clean[mid]) / 2 : clean[mid]
}

/**
 * Aggregates the three implied-price sources (RIM terminal, comps median,
 * analyst consensus) into the Summary Dashboard verdict.
 */
export function buildValuationSummary({ rimInputs, comps, analystViews, currentPrice }) {
  const solved = solveTargetRoe(rimInputs)
  const rimResult = solved.result
  const rimTerminalPrice = rimResult.impliedPrice[rimResult.impliedPrice.length - 1]
  // A negative (or zero) implied price is not economically meaningful - it
  // means the bisection solver had to reach for an extreme Target ROE to
  // hit the terminal growth target, typically because BVPS is unusually
  // thin relative to EPS (heavy buybacks, depleted equity, etc). Rather
  // than let that pollute the blended fair value, drop RIM from the blend
  // and flag it so the UI can say so explicitly instead of showing it.
  const rimReliable = typeof rimTerminalPrice === 'number' && Number.isFinite(rimTerminalPrice) && rimTerminalPrice > 0

  const compsPrice = compsImpliedPrice(comps.peers, rimInputs.fy1Eps)

  const analystMean = analystViews?.targetMean ?? null
  const analystMedian = analystViews?.targetMedian ?? null
  const analystPrice = mean([analystMean, analystMedian].filter((v) => v != null)) ?? analystMean ?? analystMedian

  const sources = [
    rimReliable ? { label: 'RIM (terminal)', price: rimTerminalPrice } : null,
    { label: 'Comps (peer median)', price: compsPrice },
    { label: 'Analyst consensus', price: analystPrice },
  ].filter(Boolean)

  const validPrices = sources.map((s) => s.price).filter((v) => typeof v === 'number' && Number.isFinite(v))
  const meanFairValue = mean(validPrices)
  const medianFairValue = median(validPrices)

  const upside = meanFairValue != null && currentPrice ? meanFairValue / currentPrice - 1 : null
  const verdict = verdictFromUpside(upside)

  return {
    rim: { solved, result: rimResult, terminalPrice: rimTerminalPrice, reliable: rimReliable },
    compsPrice,
    analystPrice,
    sources,
    meanFairValue,
    medianFairValue,
    upside,
    verdict,
  }
}
