// DuPont decomposition: ROE = Net Margin x Asset Turnover x Financial Leverage
// Benchmarked against Lee course (ACCTG 579) norms: ROA ~6%, RNOA ~9%, ROE ~12%.

export const LEE_BENCHMARKS = { roa: 0.06, rnoa: 0.09, roe: 0.12 }

export function dupontRow(row) {
  if (!row) return null
  const { revenue, netIncome, totalAssets, totalEquity } = row
  const netMargin = revenue && netIncome != null ? netIncome / revenue : null
  const assetTurnover = revenue && totalAssets ? revenue / totalAssets : null
  const financialLeverage = totalAssets && totalEquity ? totalAssets / totalEquity : null
  const roa = totalAssets && netIncome != null ? netIncome / totalAssets : null
  const roe = totalEquity && netIncome != null ? netIncome / totalEquity : row.roe ?? null
  const roeFromComponents =
    netMargin != null && assetTurnover != null && financialLeverage != null
      ? netMargin * assetTurnover * financialLeverage
      : null

  return {
    year: row.year,
    netMargin,
    assetTurnover,
    financialLeverage,
    roa,
    roe,
    roeFromComponents,
  }
}

export function buildDupontTable(financials) {
  return financials.map(dupontRow).filter(Boolean)
}
