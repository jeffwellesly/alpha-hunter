// Transforms a raw FMP company bundle (see fmp.js getCompanyBundle) into the
// same shape the app's tabs consume for demo data (data/demo/*.js). Kept
// separate from the AppContext fetch effect so it's easy to unit-test.
//
// FMP returns dollar-denominated fields (revenue, EBITDA, CFO, ...) as raw
// dollars; the app's convention (matching the demo datasets and fmtMillions)
// is millions. Only per-share/ratio fields (EPS, CFPS, ROE, DPS) are left as-is.

function toMillions(v) {
  return v == null ? null : v / 1e6
}

export function bundleToCompanyData(ticker, bundle) {
  const profile = bundle.profile
  const ratios = bundle.ratios?.[0]
  const keyMetrics = bundle.keyMetrics?.[0]
  const income = bundle.income || []
  const balance = bundle.balance || []
  const cashFlow = bundle.cashFlow || []

  const lastIncome = income[0]
  const lastBalance = balance[0]

  const financials = income.map((row, i) => {
    const bal = balance[i]
    const cf = cashFlow[i]
    return {
      year: `FY${row.fiscalYear}A`,
      isEstimate: false,
      revenue: toMillions(row.revenue),
      epsGaap: row.epsDiluted ?? row.eps ?? null,
      epsNonGaap: null,
      cfps: cf && bal ? cf.operatingCashFlow / (row.weightedAverageShsOutDil || row.weightedAverageShsOut || 1) : null,
      ebitda: toMillions(row.ebitda),
      ebit: toMillions(row.operatingIncome ?? row.ebit),
      netIncome: toMillions(row.netIncome),
      da: toMillions(row.depreciationAndAmortization),
      cfo: toMillions(cf?.operatingCashFlow),
      capex: cf ? Math.abs(toMillions(cf.capitalExpenditure) ?? 0) : null,
      fcf: toMillions(cf?.freeCashFlow),
      roe: bal?.totalStockholdersEquity ? row.netIncome / bal.totalStockholdersEquity : null,
      dps: cf ? Math.abs(cf.commonDividendsPaid ?? 0) / (row.weightedAverageShsOut || 1) : null,
      totalAssets: toMillions(bal?.totalAssets),
      totalEquity: toMillions(bal?.totalStockholdersEquity),
    }
  })

  const cashFlowRows = cashFlow.map((cf, i) => {
    const bal = balance[i]
    return {
      year: `FY${cf.fiscalYear}A`,
      cfo: toMillions(cf.operatingCashFlow),
      cfi: toMillions(cf.netCashProvidedByInvestingActivities),
      cff: toMillions(cf.netCashProvidedByFinancingActivities),
      capex: Math.abs(toMillions(cf.capitalExpenditure) ?? 0),
      da: toMillions(cf.depreciationAndAmortization),
      dividendsPaid: Math.abs(toMillions(cf.commonDividendsPaid) ?? 0),
      buybacks: Math.abs(toMillions(cf.commonStockRepurchased) ?? 0),
      netDebtActivity: toMillions(cf.netDebtIssuance),
      receivables: toMillions(bal?.accountsReceivables),
      payables: toMillions(bal?.accountPayables),
      inventory: toMillions(bal?.inventory),
    }
  })

  const tevEbit =
    keyMetrics?.evToEBITDA && ratios?.ebitdaMargin && ratios?.ebitMargin
      ? keyMetrics.evToEBITDA * (ratios.ebitdaMargin / ratios.ebitMargin)
      : null
  // Guard against a negative/near-zero tangible book value (common when
  // operating lease right-of-use assets or other intangibles outweigh
  // tangible equity) - that would otherwise produce a nonsensical multiple.
  const pTangibleBv =
    ratios?.priceToBookRatio && ratios?.bookValuePerShare && ratios?.tangibleBookValuePerShare > 0.01
      ? ratios.priceToBookRatio * (ratios.bookValuePerShare / ratios.tangibleBookValuePerShare)
      : null

  return {
    ticker,
    companyName: profile?.companyName ?? ticker,
    exchange: profile?.exchange ?? null,
    sector: profile?.sector ?? null,
    industry: profile?.industry ?? null,
    asOfDate: new Date().toISOString().slice(0, 10),
    currentPrice: profile?.price ?? null,
    marketCap: profile?.marketCap ?? null,
    sharesOutstanding: keyMetrics ? keyMetrics.marketCap / (profile?.price || 1) : null,
    fiscalYearEndDescription: null,

    // Consensus-sourced fields left null - populate via "Fetch with Claude"
    // actions on the RIM/Analyst Views tabs, or manual override.
    rimInputs: {
      fy1Eps: null,
      fy2Eps: null,
      ltg: null,
      bvps: ratios?.bookValuePerShare ?? (lastBalance ? lastBalance.totalStockholdersEquity / (lastIncome?.weightedAverageShsOut || 1) : null),
      r: 0.08,
      k: ratios?.dividendPayoutRatio ?? 0,
      nextFiscalYearEnd: new Date().getFullYear() + 1,
      currentFiscalMonth: 1,
    },
    rimInputNotes: {},

    comps: {
      targetMetrics: {
        tevRevenue: keyMetrics?.evToSales ?? null,
        tevEbitda: keyMetrics?.evToEBITDA ?? null,
        tevEbit,
        pDilutedEps: ratios?.priceToEarningsRatio ?? null,
        pTangibleBv,
        ntmTevRevenue: keyMetrics?.evToSales ?? null,
        ntmFwdPe: ratios?.priceToEarningsRatio ?? null,
      },
      peers: [], // populated by merging AppContext's livePeers in useCompanyData
      note: 'NTM columns approximate trailing multiples - FMP free tier has no forward/analyst-estimate data.',
    },

    financials,
    financialsNote: bundle.errors?.income ? `Live financials unavailable: ${bundle.errors.income}` : null,

    cashFlow: cashFlowRows,
    cashFlowNote: bundle.errors?.cashFlow ? `Live cash flow unavailable: ${bundle.errors.cashFlow}` : null,

    analystViews: null,
    narrative: null,

    fmpErrors: bundle.errors || null,
  }
}
