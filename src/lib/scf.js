// SCF (Statement of Cash Flows) Quality: 6-point green/yellow/red checklist,
// computed from cash flow statement data across the available years.
// `cashFlow` rows use the shape from data/demo/*.js or the Claude-web-search-
// derived equivalent (see shared/runAnalysis.js).

function pctChange(curr, prev) {
  if (curr == null || prev == null || prev === 0) return null
  return curr / prev - 1
}

function flagCashFlowAdequacy(cashFlow) {
  const cfos = cashFlow.map((r) => r.cfo).filter((v) => v != null)
  if (!cfos.length) return { status: 'yellow', explanation: 'Insufficient CFO data to assess.' }
  const allPositive = cfos.every((v) => v > 0)
  const latest = cashFlow[cashFlow.length - 1]
  const coversCapexAndDiv = latest.cfo != null && latest.cfo > (latest.capex || 0) + (latest.dividendsPaid || 0)

  if (allPositive && coversCapexAndDiv) {
    return { status: 'green', explanation: 'CFO has been positive every year and comfortably covers CapEx + dividends.' }
  }
  if (allPositive) {
    return { status: 'yellow', explanation: 'CFO stayed positive every year, but does not fully cover CapEx + dividends in the latest year.' }
  }
  return { status: 'red', explanation: 'CFO was negative in at least one recent year.' }
}

function flagQualityOfEarnings(cashFlow, financials) {
  const latestCf = cashFlow[cashFlow.length - 1]
  const latestFin = financials[financials.length - 1]
  if (!latestCf || !latestFin || latestCf.cfo == null || latestFin.netIncome == null) {
    return { status: 'yellow', explanation: 'Insufficient CFO/net income data to assess.' }
  }
  const { cfo } = latestCf
  const { netIncome } = latestFin

  if (netIncome <= 0 && cfo > 0) {
    return { status: 'green', explanation: `CFO ($${cfo.toFixed(0)}M) was positive despite a GAAP net loss - cash earnings quality stronger than reported earnings.` }
  }
  if (netIncome <= 0) {
    return { status: 'red', explanation: 'Both net income and CFO were negative/weak in the latest year.' }
  }
  const ratio = cfo / netIncome
  if (ratio >= 1.0) return { status: 'green', explanation: `CFO/Net Income = ${ratio.toFixed(2)}x - earnings are well cash-backed.` }
  if (ratio >= 0.7) return { status: 'yellow', explanation: `CFO/Net Income = ${ratio.toFixed(2)}x - earnings are reasonably but not fully cash-backed.` }
  return { status: 'red', explanation: `CFO/Net Income = ${ratio.toFixed(2)}x - earnings are running well ahead of cash generation.` }
}

function flagWorkingCapital(cashFlow, financials) {
  const n = cashFlow.length
  if (n < 2) return { status: 'yellow', explanation: 'Insufficient multi-year data to assess working capital trends.' }
  const latest = cashFlow[n - 1]
  const prior = cashFlow[n - 2]
  const latestFin = financials[financials.length - 1]
  const priorFin = financials[financials.length - 2]
  const revenueGrowth = latestFin && priorFin ? pctChange(latestFin.revenue, priorFin.revenue) : null

  if (latest.receivables != null && prior.receivables != null && revenueGrowth != null && revenueGrowth > 0) {
    const arGrowth = pctChange(latest.receivables, prior.receivables)
    const ratio = arGrowth / revenueGrowth
    if (ratio <= 1.2) {
      return { status: 'green', explanation: `Receivables grew ${(arGrowth * 100).toFixed(0)}% vs. revenue +${(revenueGrowth * 100).toFixed(0)}% - in line, no collection concerns.` }
    }
    if (ratio <= 2.0) {
      return { status: 'yellow', explanation: `Receivables grew ${(arGrowth * 100).toFixed(0)}% vs. revenue +${(revenueGrowth * 100).toFixed(0)}% - modestly outpacing revenue, worth monitoring.` }
    }
    return { status: 'red', explanation: `Receivables grew ${(arGrowth * 100).toFixed(0)}% vs. revenue +${(revenueGrowth * 100).toFixed(0)}% - growing meaningfully faster than revenue, a collection/channel-timing flag.` }
  }

  // Content-asset businesses (e.g. streaming): use content additions vs.
  // amortization gap trend as the working-capital-equivalent signal.
  if (latest.contentAdditions != null && latest.contentAmortization != null && prior.contentAdditions != null && prior.contentAmortization != null) {
    const latestGap = latest.contentAdditions - latest.contentAmortization
    const priorGap = prior.contentAdditions - prior.contentAmortization
    if (latestGap <= priorGap) {
      return { status: 'green', explanation: 'Content spend vs. amortization gap is narrowing - content investment growth is decelerating relative to library runoff.' }
    }
    return { status: 'yellow', explanation: 'Content spend continues to outpace amortization by a widening margin - the content asset base is still building.' }
  }

  return { status: 'yellow', explanation: 'Insufficient receivables/payables or content-spend data to assess.' }
}

function flagInvestment(cashFlow) {
  const latest = cashFlow[cashFlow.length - 1]
  if (!latest) return { status: 'yellow', explanation: 'Insufficient data.' }

  if (latest.contentAdditions != null && latest.contentAmortization) {
    const ratio = latest.contentAdditions / latest.contentAmortization
    if (ratio >= 0.8 && ratio <= 1.3) {
      return { status: 'green', explanation: `Content spend / amortization = ${ratio.toFixed(2)}x - steady-state reinvestment in the content library.` }
    }
    return { status: 'yellow', explanation: `Content spend / amortization = ${ratio.toFixed(2)}x - content library is expanding faster than it's running off.` }
  }

  if (latest.capex == null || !latest.da) return { status: 'yellow', explanation: 'Insufficient CapEx/D&A data to assess.' }
  const ratio = latest.capex / latest.da
  if (ratio >= 0.7 && ratio <= 2.0) {
    return { status: 'green', explanation: `CapEx/D&A = ${ratio.toFixed(2)}x - reinvestment roughly in line with the depreciating asset base.` }
  }
  if ((ratio >= 0.4 && ratio < 0.7) || (ratio > 2.0 && ratio <= 3.0)) {
    return { status: 'yellow', explanation: `CapEx/D&A = ${ratio.toFixed(2)}x - reinvestment pace notably above or below the depreciating asset base.` }
  }
  return { status: 'red', explanation: `CapEx/D&A = ${ratio.toFixed(2)}x - reinvestment pace is a significant outlier vs. the depreciating asset base.` }
}

function flagFinancing(cashFlow) {
  const latest = cashFlow[cashFlow.length - 1]
  if (!latest || latest.cff == null) return { status: 'yellow', explanation: 'Insufficient financing activity data.' }

  const debtReliance = latest.cfo ? Math.abs(latest.netDebtActivity || 0) / latest.cfo : null
  const returningCapital = (latest.dividendsPaid || 0) + (latest.buybacks || 0)

  if (latest.cff < 0 && returningCapital > 0 && (debtReliance == null || debtReliance < 0.3)) {
    return { status: 'green', explanation: 'Capital is being returned to shareholders (dividends/buybacks), largely self-funded from operating cash flow rather than new debt.' }
  }
  if (latest.cff < 0) {
    return { status: 'yellow', explanation: 'Net financing outflow, but with a more meaningful reliance on debt issuance to help fund it.' }
  }
  if (latest.cff > 0 && debtReliance != null && debtReliance > 0.3) {
    return { status: 'red', explanation: 'Financing activities are a net source of cash, driven by meaningful new debt or equity issuance.' }
  }
  return { status: 'yellow', explanation: 'Financing activities are a net source of cash - worth understanding why (growth funding vs. shortfall).' }
}

function flagGrowthDynamics(cashFlow) {
  const latest = cashFlow[cashFlow.length - 1]
  if (!latest) return { status: 'yellow', explanation: 'Insufficient data.' }
  const cfoPos = (latest.cfo || 0) > 0
  const cfiNeg = (latest.cfi || 0) < 0
  const cffNeg = (latest.cff || 0) < 0

  if (cfoPos && cfiNeg && cffNeg) {
    return { status: 'green', explanation: 'Classic mature-growth pattern: CFO+ funds both reinvestment (CFI-) and shareholder returns (CFF-).' }
  }
  if (cfoPos && !cfiNeg && cffNeg) {
    return { status: 'yellow', explanation: 'CFO+ and CFF- (returning capital), but investing activities were a net source of cash this year - check what was divested/matured.' }
  }
  if (!cfoPos) {
    return { status: 'red', explanation: 'Operating cash flow was not positive - the business is not yet self-funding.' }
  }
  return { status: 'yellow', explanation: 'Mixed CFO/CFI/CFF pattern - not the typical steady-state mature-growth signature.' }
}

export function buildScfFlags({ cashFlow, financials }) {
  if (!cashFlow?.length || !financials?.length) return []
  // Financials arrays can carry forward estimate years (e.g. FY2028E) with
  // null actuals appended after real years - flags need actual-year data
  // aligned to the same years cashFlow covers, not just "the last array row".
  const actualFinancials = financials.filter((f) => f.isEstimate !== true && f.netIncome != null)
  const alignedFinancials = actualFinancials.length ? actualFinancials : financials
  return [
    { key: 'adequacy', label: 'Cash Flow Adequacy', ...flagCashFlowAdequacy(cashFlow) },
    { key: 'quality', label: 'Quality of Earnings', ...flagQualityOfEarnings(cashFlow, alignedFinancials) },
    { key: 'workingCapital', label: 'Working Capital Management', ...flagWorkingCapital(cashFlow, alignedFinancials) },
    { key: 'investment', label: 'Key Areas of Investment', ...flagInvestment(cashFlow) },
    { key: 'financing', label: 'Sources of Financing', ...flagFinancing(cashFlow) },
    { key: 'growth', label: 'Company Growth Dynamics', ...flagGrowthDynamics(cashFlow) },
  ]
}

export function scfScore(flags) {
  const points = { green: 2, yellow: 1, red: 0 }
  const total = flags.reduce((sum, f) => sum + (points[f.status] ?? 1), 0)
  return { points: total, max: flags.length * 2 }
}
