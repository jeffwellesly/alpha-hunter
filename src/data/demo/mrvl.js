// Cached demo data for Marvell Technology (MRVL), researched via live web
// search on 2026-07-11. Not live-fetched at runtime - this is the "Demo
// Mode" snapshot so the app works with zero API keys.
//
// Data gaps flagged during research (kept honest rather than guessed):
// - FY2028E EPS is a midpoint of a $5.05-5.83 analyst range, not one clean print.
// - Long-term growth rate (Ltg) has no confidently-sourced consensus figure;
//   used as a decelerating-growth estimate off the FY1->FY2 consensus trajectory.
// - FY2027E/FY2028E EBITDA/EBIT/NI/CFO/CapEx/FCF were not available free;
//   only revenue and EPS consensus exist for those years.

export const mrvlDemo = {
  ticker: 'MRVL',
  companyName: 'Marvell Technology, Inc.',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors',
  asOfDate: '2026-07-11',
  currentPrice: 235.81,
  marketCap: 206_290_000_000,
  sharesOutstanding: 874_800_000,
  fiscalYearEndDescription: 'Saturday closest to January 31',

  rimInputs: {
    fy1Eps: 4.05,
    fy2Eps: 5.6,
    ltg: 0.22,
    bvps: 16.89,
    r: 0.08,
    k: 0.08,
    nextFiscalYearEnd: 2027,
    currentFiscalMonth: 6,
  },
  rimInputNotes: {
    fy2Eps: 'Midpoint of a $5.05-$5.83 analyst range; no single clean FY2028 consensus print found.',
    ltg: 'No confidently-sourced consensus LTG; estimated from decelerating FY1->FY2 growth trajectory (~38%) toward a more conservative long-run rate.',
    bvps: 'Total FY26 stockholders’ equity ($14,308.4M) / shares outstanding at FYE (847.3M). Excludes the $2.0B NVIDIA convertible preferred issued 3/31/26 (post-FYE, not common equity).',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 23.83,
      tevEbitda: 76.59,
      tevEbit: 145.19,
      pDilutedEps: 81.45,
      pTangibleBv: 138.43,
      ntmTevRevenue: 18.01,
      ntmFwdPe: 51.98,
    },
    peers: [
      { ticker: 'AVGO', name: 'Broadcom Inc.', tevRevenue: 25.82, tevEbitda: 46.29, tevEbit: 58.45, pDilutedEps: 66.57, pTangibleBv: null, ntmTevRevenue: 18.39, ntmFwdPe: 25.4 },
      { ticker: 'QCOM', name: 'Qualcomm Inc.', tevRevenue: 4.6, tevEbitda: 15.76, tevEbit: 17.93, pDilutedEps: 20.67, pTangibleBv: 17.41, ntmTevRevenue: 4.81, ntmFwdPe: 19.22 },
      { ticker: 'NXPI', name: 'NXP Semiconductors', tevRevenue: 6.48, tevEbitda: 19.66, tevEbit: 24.01, pDilutedEps: 27.95, pTangibleBv: null, ntmTevRevenue: 5.81, ntmFwdPe: 18.76 },
      { ticker: 'ON', name: 'ON Semiconductor', tevRevenue: 6.3, tevEbitda: 18.65, tevEbit: 27.68, pDilutedEps: 67.9, pTangibleBv: 7.06, ntmTevRevenue: 5.89, ntmFwdPe: 28.4 },
      { ticker: 'MCHP', name: 'Microchip Technology', tevRevenue: 11.35, tevEbitda: 43.89, tevEbit: 100.99, pDilutedEps: 404.93, pTangibleBv: null, ntmTevRevenue: 8.66, ntmFwdPe: 28.02 },
      { ticker: 'ADI', name: 'Analog Devices', tevRevenue: 15.54, tevEbitda: 32.2, tevEbit: 47.3, pDilutedEps: 58.91, pTangibleBv: null, ntmTevRevenue: 13.43, ntmFwdPe: 28.58 },
      { ticker: 'TXN', name: 'Texas Instruments', tevRevenue: 15.86, tevEbitda: 33.75, tevEbit: 44.1, pDilutedEps: 53.23, pTangibleBv: 23.38, ntmTevRevenue: 13.92, ntmFwdPe: 37.74 },
      { ticker: 'MPWR', name: 'Monolithic Power Systems', tevRevenue: 22.02, tevEbitda: 75.96, tevEbit: 81.29, pDilutedEps: 96.8, pTangibleBv: 18.24, ntmTevRevenue: 17.6, ntmFwdPe: 52.95 },
    ],
    note: 'MCHP trailing P/E (404.93x) reflects a depressed TTM GAAP EPS from a recent cyclical downturn - an outlier; its forward P/E is the more meaningful comp. P/Tangible BV unavailable from free sources for AVGO, NXPI, MCHP, ADI.',
  },

  financials: [
    { year: 'FY2024A', isEstimate: false, revenue: 5508, epsGaap: -1.08, epsNonGaap: null, cfps: 1.59, ebitda: 830, ebit: -567.7, netIncome: -933.4, da: 1397.7, cfo: 1371, capex: 336.3, fcf: 1034, roe: -0.063, dps: 0.24, totalAssets: 21228.5, totalEquity: 14831.4 },
    { year: 'FY2025A', isEstimate: false, revenue: 5767, epsGaap: -1.02, epsNonGaap: null, cfps: 1.94, ebitda: 636.6, ebit: -720.3, netIncome: -885, da: 1356.9, cfo: 1681, capex: 284.6, fcf: 1397, roe: -0.066, dps: 0.24, totalAssets: 20204.5, totalEquity: 13427 },
    { year: 'FY2026A', isEstimate: false, revenue: 8195, epsGaap: 3.07, epsNonGaap: 2.84, cfps: 2.01, ebitda: 2614, ebit: 1323, netIncome: 2670.1, da: 1291, cfo: 1750.5, capex: 354.1, fcf: 1396.4, roe: 0.187, dps: 0.24, totalAssets: 22285.3, totalEquity: 14308.4 },
    { year: 'FY2027E', isEstimate: true, revenue: 11530, epsGaap: null, epsNonGaap: 4.05, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.24, totalAssets: null, totalEquity: null },
    { year: 'FY2028E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 5.6, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.24, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2028E revenue omitted: management guided $15-16.5B on the Q1 FY27 call, but that is guidance, not polled analyst consensus. totalAssets/totalEquity sourced separately from Yahoo Finance/SEC 10-K balance sheet data (FY24-26).',

  cashFlow: [
    {
      year: 'FY2024A',
      cfo: 1371,
      cfi: -350.5,
      cff: -980.2,
      capex: 336.3,
      da: 1397.7,
      dividendsPaid: 206.8,
      buybacks: 373.7,
      netDebtActivity: -327.2,
      receivables: null,
      payables: null,
      inventory: null,
    },
    {
      year: 'FY2025A',
      cfo: 1681,
      cfi: -300.7,
      cff: -1383,
      capex: 284.6,
      da: 1356.9,
      dividendsPaid: 207.5,
      buybacks: 999.9,
      netDebtActivity: -109.4,
      receivables: 1028,
      payables: 622.2,
      inventory: 1030,
    },
    {
      year: 'FY2026A',
      cfo: 1750.5,
      cfi: 2098,
      cff: -2158,
      capex: 354.1,
      da: 1291,
      dividendsPaid: 205.1,
      buybacks: 2281,
      netDebtActivity: 408,
      receivables: 2187,
      payables: 1074,
      inventory: 1388,
    },
  ],
  cashFlowNote:
    'FY26 CFI was positive (+$2,098M), likely large net maturities/sales of investments - not a recurring operating signal. AR grew 113% FY25->FY26 vs. revenue +42% (~2.7x faster), worth flagging as a working-capital item to watch (could reflect extended terms to hyperscaler AI customers or a steep Q4 shipment ramp). CapEx has been rising while D&A has been falling as older acquisition-related intangible amortization rolls off.',

  analystViews: {
    targetMean: 252.26,
    targetMedian: 240.0,
    targetHigh: 385.0,
    targetLow: 110.0,
    numAnalysts: 44,
    buy: 38,
    hold: 6,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'Marvell Technology designs semiconductor and infrastructure silicon for data center, networking, carrier, enterprise, automotive, and consumer end markets. Its most consequential growth driver today is custom AI silicon and networking chips for hyperscale data center customers, a category that drove FY2026 revenue up 42% year-over-year to $8.2B after two years of decline. The company also carries a large legacy portfolio from its Inphi, Cavium, and Innovium acquisitions, whose amortization has been rolling off and improving reported profitability. Marvell recently deepened its AI-infrastructure positioning through a $2.0B convertible preferred investment from NVIDIA in March 2026.',
    macroEnvironment:
      'Marvell sits at the center of the AI data center buildout, benefiting from hyperscaler capex growth in custom accelerators, optical/electrical interconnect, and networking silicon. The semiconductor sector broadly is enjoying strong demand for AI infrastructure, though this concentrates cyclical risk: a slowdown in hyperscaler capex, a shift in AI chip architecture preference, or intensifying competition from in-house hyperscaler silicon programs would disproportionately affect Marvell relative to more diversified analog/mixed-signal peers.',
    keyRisks: [
      'Customer concentration in AI/data center: A small number of hyperscaler customers drive an outsized share of growth; any pullback in their capex plans or a shift to alternative suppliers would hit revenue disproportionately.',
      'Receivables growth outpacing revenue: Accounts receivable grew 113% in FY2026 versus 42% revenue growth, worth monitoring for channel timing or extended payment terms.',
      'Cyclicality: Revenue swung from decline (FY2024-25) to a sharp AI-driven rebound (FY2026); the business remains exposed to semiconductor cycle and capex-timing swings.',
      'Elevated valuation: Trading at a premium to most peers on trailing multiples (TEV/EBITDA ~77x vs. peer levels well below that), leaving less room for execution missteps.',
      'Convertible preferred dilution: The NVIDIA preferred stock is convertible into ~21.8M common shares, a modest but real dilution overhang as it converts over time.',
    ],
    nearTermCatalysts: [
      'Q2 FY2027 earnings release (estimated late August 2026) - next checkpoint on AI/data center revenue momentum.',
      'Continued ramp of custom AI silicon programs with hyperscale customers.',
      'Integration and utilization of the NVIDIA strategic partnership announced alongside the March 2026 preferred investment.',
      'Accelerating buyback pace ($2.28B in FY2026, up from $1.0B in FY2025) as a signal of management confidence and capital return.',
    ],
    investmentThesis:
      'Marvell has re-rated sharply as an AI-infrastructure beneficiary, and the market is now pricing in a level of sustained hypergrowth that the RIM and comps analyses both struggle to justify: at $235.81, the stock trades well above every peer multiple in the comp set and above the RIM model\'s implied fair value across every forecast horizon, even with an above-market 51.98x forward P/E baked in. Analyst consensus remains bullish (mean target $252.26, Strong Buy/Buy ratings dominate), reflecting genuine conviction in the AI silicon growth story and the NVIDIA strategic partnership, but that optimism is not corroborated by the RIM\'s residual-income math or by Marvell\'s premium standing versus semiconductor peers on nearly every trailing multiple. The receivables growth outpacing revenue (113% vs. 42%) adds a near-term watch-item on earnings quality. Given the gap between valuation and fundamentals-based fair value, this reads as a name where the growth story is real but the price already assumes flawless execution - a SELL on valuation discipline, not on the business quality.',
  },
}
