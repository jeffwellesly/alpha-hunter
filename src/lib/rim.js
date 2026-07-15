// RIM.512 / RIM.712 residual income model. Formulas verified cell-for-cell
// against a real MU RIM.512 workbook and the FSM_Complete_Stock_Analysis
// reference memo (Table 3/Table 4).

export const TOTAL_HORIZON = 12
export const TERMINAL_EPS_GROWTH_TARGET = 0.065

/**
 * @param {object} inputs
 * @param {number} inputs.fy1Eps
 * @param {number} inputs.fy2Eps
 * @param {number} inputs.ltg - long-term EPS growth rate, decimal (e.g. 0.25)
 * @param {number} inputs.bvps - book value per share, last FYE
 * @param {number} inputs.r - discount rate, decimal
 * @param {number} inputs.k - dividend payout ratio, decimal
 * @param {number} inputs.targetRoe - equilibrium target ROE, decimal
 * @param {number} inputs.nextFiscalYearEnd - e.g. 2026
 * @param {number} inputs.currentFiscalMonth - months elapsed since start of current FY (1-12, or 13+ edge case)
 * @param {number} [inputs.explicitYears] - 5 for rim.512, 7 for rim.712
 * @param {number} [inputs.totalHorizon]
 */
export function runRim(inputs) {
  const {
    fy1Eps,
    fy2Eps,
    ltg,
    bvps,
    r,
    k,
    targetRoe,
    nextFiscalYearEnd,
    currentFiscalMonth,
    explicitYears = 5,
    totalHorizon = TOTAL_HORIZON,
  } = inputs

  const N = totalHorizon

  const years = Array.from({ length: N }, (_, i) => nextFiscalYearEnd + i)

  // Forecasted EPS (row 12) - only meaningful through explicitYears
  const eps = new Array(N).fill(null)
  eps[0] = fy1Eps
  eps[1] = fy2Eps
  for (let i = 2; i < explicitYears; i++) {
    eps[i] = eps[i - 1] * (1 + ltg)
  }

  // Beginning-of-year BV/share (row 13) - only through explicitYears
  const begBV = new Array(N).fill(null)
  begBV[0] = bvps
  for (let i = 1; i < explicitYears; i++) {
    begBV[i] = begBV[i - 1] + eps[i - 1] - k * eps[i - 1]
  }

  // ROE (row 16): explicit years from EPS/BegBV, then linear fade to targetRoe
  const roe = new Array(N).fill(null)
  roe[0] = eps[0] / begBV[0]
  for (let i = 1; i < explicitYears; i++) {
    roe[i] = eps[i] / begBV[i]
  }
  const fadeYears = N - explicitYears
  const lastExplicitRoe = roe[explicitYears - 1]
  for (let i = explicitYears; i < N; i++) {
    roe[i] =
      lastExplicitRoe +
      (i - (explicitYears - 1)) * ((targetRoe - lastExplicitRoe) / fadeYears)
  }

  // Abnormal ROE (row 17)
  const abnormalRoe = roe.map((v) => v - r)

  // Growth rate for B (row 18): prior year's ROE * (1-k)
  const growthForB = new Array(N).fill(0)
  for (let i = 1; i < N; i++) {
    growthForB[i] = roe[i - 1] * (1 - k)
  }

  // Compounded growth (row 19)
  const compoundedGrowth = new Array(N).fill(1)
  for (let i = 1; i < N; i++) {
    compoundedGrowth[i] = compoundedGrowth[i - 1] * (1 + growthForB[i])
  }

  // growth * AROE (row 20)
  const growthAroe = compoundedGrowth.map((cg, i) => cg * abnormalRoe[i])

  // Discount factor (row 22): (1+r)^(i+1)
  const discountFactor = new Array(N).fill(0)
  discountFactor[0] = 1 + r
  for (let i = 1; i < N; i++) {
    discountFactor[i] = discountFactor[i - 1] * (1 + r)
  }

  // PV(growth*AROE) (row 24)
  const pv = growthAroe.map((v, i) => v / discountFactor[i])

  // Cum P/B (row 25)
  const cumPB = new Array(N).fill(0)
  cumPB[0] = 1 + pv[0]
  for (let i = 1; i < N; i++) {
    cumPB[i] = cumPB[i - 1] + pv[i]
  }

  // Perpetuity beyond current year (row 27)
  const perpetuity = growthAroe.map((v, i) => v / r / discountFactor[i])

  // Total P/B (row 28)
  const totalPB = cumPB.map((v, i) => v + perpetuity[i])

  // Implied price (row 29)
  const midPeriodAdj = 1 + (r * currentFiscalMonth) / 12
  const impliedPrice = totalPB.map((v) => v * bvps * midPeriodAdj)

  // --- Check block (rows 32-34): extends BegBV/EPS across full horizon
  // using the same growth logic, to derive terminal implied EPS growth.
  const begBV2 = new Array(N).fill(0)
  begBV2[0] = bvps
  for (let i = 1; i < N; i++) {
    begBV2[i] = begBV2[i - 1] * (1 + roe[i - 1] * (1 - k))
  }

  const impliedEps = new Array(N).fill(0)
  impliedEps[0] = eps[0]
  for (let i = 1; i < N; i++) {
    impliedEps[i] = begBV2[i] * roe[i]
  }

  const impliedEpsGrowth = new Array(N).fill(null)
  for (let i = 1; i < N; i++) {
    impliedEpsGrowth[i] = impliedEps[i] / impliedEps[i - 1] - 1
  }

  const terminalImpliedEpsGrowth = impliedEpsGrowth[N - 1]

  return {
    years,
    eps,
    begBV,
    roe,
    abnormalRoe,
    growthForB,
    compoundedGrowth,
    growthAroe,
    discountFactor,
    pv,
    cumPB,
    perpetuity,
    totalPB,
    impliedPrice,
    impliedEps,
    impliedEpsGrowth,
    terminalImpliedEpsGrowth,
  }
}

/**
 * Solve for the Target ROE (equilibrium) such that the terminal implied
 * EPS growth rate (last-year impliedEpsGrowth, aka "P34") equals the
 * target (default 6.5%). Bisection - terminalImpliedEpsGrowth is monotonic
 * increasing in targetRoe over any sane range.
 *
 * @param {object} inputs - same as runRim, minus targetRoe
 * @param {number} [target] - terminal implied EPS growth target, decimal
 * @returns {{ targetRoe: number, result: ReturnType<typeof runRim>, iterations: number }}
 */
export function solveTargetRoe(inputs, target = TERMINAL_EPS_GROWTH_TARGET) {
  const f = (targetRoe) =>
    runRim({ ...inputs, targetRoe }).terminalImpliedEpsGrowth - target

  let lo = -0.5
  let hi = 2.0
  let fLo = f(lo)
  let fHi = f(hi)

  // Expand the bracket if the target isn't contained, up to a sane limit.
  let expandGuard = 0
  while (fLo * fHi > 0 && expandGuard < 20) {
    lo -= 0.5
    hi += 0.5
    fLo = f(lo)
    fHi = f(hi)
    expandGuard++
  }

  if (fLo * fHi > 0) {
    throw new Error(
      'Could not bracket a Target ROE solution for the given inputs.'
    )
  }

  let mid = (lo + hi) / 2
  let iterations = 0
  const maxIterations = 200
  const tolerance = 1e-9

  while (iterations < maxIterations) {
    mid = (lo + hi) / 2
    const fMid = f(mid)
    if (Math.abs(fMid) < tolerance || (hi - lo) / 2 < 1e-9) break
    if (fLo * fMid < 0) {
      hi = mid
      fHi = fMid
    } else {
      lo = mid
      fLo = fMid
    }
    iterations++
  }

  return {
    targetRoe: mid,
    result: runRim({ ...inputs, targetRoe: mid }),
    iterations,
  }
}

/** Selects the display years/rows matching the reference memo's horizon table. */
export function horizonTableRows(rimResult, currentPrice) {
  const { years, cumPB, totalPB, impliedPrice } = rimResult
  const N = years.length
  const indices = []
  for (let i = 0; i < N - 2; i += 2) indices.push(i)
  indices.push(N - 1)
  return indices.map((i) => ({
    year: years[i],
    cumPB: cumPB[i],
    impliedPrice: impliedPrice[i],
    totalPB: totalPB[i],
    upside: currentPrice ? impliedPrice[i] / currentPrice - 1 : null,
  }))
}
