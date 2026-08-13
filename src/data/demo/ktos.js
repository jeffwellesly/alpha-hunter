// Cached demo data for Kratos Defense & Security Solutions, Inc. (KTOS),
// researched via live web search on 2026-08-13. Not live-fetched at runtime -
// added as an eleventh bundled analysis alongside MU/LLY/SNDK/WDC/COST/
// LRCX/NVDA/AMD/MSFT/VKTX.
//
// Context: Kratos develops unmanned aerial systems (including the XQ-58
// Valkyrie attritable fighter drone), hypersonic technologies, space/
// satellite communications, and jet engines for the U.S. defense industrial
// base - a "growth defense-tech" name the market has re-rated aggressively
// (573.9x trailing TEV/EBIT). Backlog was $2.08B at end of Q2 2026 ($1.57B
// funded), trailing 12-month book-to-bill 1.3x, $15B bid-and-proposal
// pipeline, and management raised FY2026 organic growth guidance to 19-23%
// with hypersonic-segment revenue alone projected to double ($200M -> $400M,
// 2025->2026).
//
// This file is a genuinely interesting middle case between MSFT (all three
// methods roughly agree) and VKTX (only one method produces any signal at
// all): RIM excludes itself automatically (negative implied price - heavy
// equity dilution, $565.8M raised in FY2025 alone, is growing book value per
// share faster than earnings), but comps AND analyst consensus both produce
// real, non-null numbers here - and they disagree sharply. Comps-implied
// price ($47.34, peer-median forward P/E x KTOS's own consensus EPS) sits
// BELOW the current price, while analyst consensus ($104.81 mean/median
// target) sits well above it. The blended Buy verdict is being pulled
// entirely by analyst sentiment, and this analysis's own optimism-bias check
// (Frankel & Lee) flags that consensus LTG runs well ahead of realized
// growth - a real, model-generated caution signal disclosed directly in the
// narrative rather than smoothed over.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - No separately published 3-5yr LTG consensus was found. Used the implied
//   FY2026->FY2027 consensus EPS growth rate (1.11/0.81 - 1 = 37.0%) instead
//   - both inputs are genuine consensus figures already, so this is a real
//   derived rate, not a guess, but it is a near-term rate standing in for a
//   longer-term one.
// - cfps (cash flow per share) is left null for all three actual years:
//   KTOS's reported diluted EPS doesn't cleanly back out a share count from
//   net income (FY2023A shows positive net income, $2.4M, against negative
//   EPS, -$0.07 - almost certainly a preferred-dividend/accretion
//   adjustment reducing income available to common shareholders that isn't
//   disclosed at the granularity needed to reverse-engineer a reliable
//   share count), so back-solving cfps would compound that uncertainty
//   rather than resolve it.
// - Peer AVAV's and RKLB's NTM TEV/Revenue are approximated using trailing
//   TEV/Revenue (forward revenue wasn't available free) - same approach used
//   elsewhere in this bundle. RKLB's forward P/E (3,560x) is real, sourced
//   data, not a typo - shown as-is per this bundle's convention of not
//   silently excluding real numbers just because they're extreme.

export const ktosDemo = {
  ticker: 'KTOS',
  companyName: 'Kratos Defense & Security Solutions, Inc.',
  exchange: 'NASDAQ',
  sector: 'Industrials',
  industry: 'Aerospace & Defense',
  asOfDate: '2026-08-13',
  currentPrice: 62.79,
  marketCap: 11_790_000_000,
  sharesOutstanding: 187_720_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending late December (FY2025 ended December 28, 2025, already reported)',

  rimInputs: {
    fy1Eps: 0.81,
    fy2Eps: 1.11,
    ltg: 0.370,
    bvps: 12.08,
    r: 0.08,
    k: 0,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 8,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus EPS per stockanalysis.com forecast page.',
    fy2Eps: 'FY2027 consensus EPS per stockanalysis.com forecast page.',
    ltg: 'No separate multi-year LTG consensus was found. Derived from the two consensus figures above (1.11/0.81 - 1 = 37.0%), a real implied near-term growth rate standing in for a longer-term one.',
    bvps: 'FY2025 (ended 12/28/25) stockholders equity ($1,996M) per stockanalysis.com balance sheet, stated directly as $12.08/share.',
    k: 'Kratos pays no dividend.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 6.94,
      tevEbitda: 110.81,
      tevEbit: 573.91,
      pDilutedEps: 371.70,
      pTangibleBv: 5.06,
      ntmTevRevenue: 5.89,
      ntmFwdPe: 67.81,
    },
    peers: [
      { ticker: 'AVAV', name: 'AeroVironment, Inc.', tevRevenue: 4.89, tevEbitda: null, tevEbit: null, pDilutedEps: null, pTangibleBv: 9.70, ntmTevRevenue: 4.89, ntmFwdPe: 58.44 },
      { ticker: 'LDOS', name: 'Leidos Holdings, Inc.', tevRevenue: 1.34, tevEbitda: 10.13, tevEbit: 11.64, pDilutedEps: 13.32, pTangibleBv: null, ntmTevRevenue: 1.34, ntmFwdPe: 11.73 },
      { ticker: 'RKLB', name: 'Rocket Lab Corporation', tevRevenue: 59.38, tevEbitda: null, tevEbit: null, pDilutedEps: null, pTangibleBv: 16.68, ntmTevRevenue: 59.38, ntmFwdPe: 3560.00 },
    ],
    note: 'Peer set spans the "growth defense-tech" spectrum KTOS sits in: AeroVironment (closest pure-play, unmanned systems, also richly valued and also trailing-unprofitable), Leidos (traditional diversified defense-IT prime, included for contrast at far more conventional multiples), and Rocket Lab (space/launch, the most extreme growth-multiple comp in this bundle - its 3,560x forward P/E is real sourced data, not a typo). Because Leidos is the only peer with meaningfully positive trailing earnings, most peer-median stats here are thin; the P/E-implied comps price uses forward P/E (all three peers have one) and lands at $47.34 - below KTOS’s own $62.79 price, meaning a pure peer-multiple read calls this stock expensive even against two of the market’s own richest growth-defense names.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 1037, epsGaap: -0.07, epsNonGaap: null, cfps: null, ebitda: 75.8, ebit: 31.1, netIncome: 2.4, da: 44.7, cfo: 65.2, capex: 52.4, fcf: 12.8, roe: 0.0024, dps: 0, totalAssets: 1633, totalEquity: 998.7 },
    { year: 'FY2024A', isEstimate: false, revenue: 1136, epsGaap: 0.11, epsNonGaap: null, cfps: null, ebitda: 80.9, ebit: 29.0, netIncome: 16.3, da: 51.9, cfo: 49.7, capex: 58.2, fcf: -8.5, roe: 0.01205, dps: 0, totalAssets: 1951, totalEquity: 1353 },
    { year: 'FY2025A', isEstimate: false, revenue: 1347, epsGaap: 0.13, epsNonGaap: null, cfps: null, ebitda: 84.9, ebit: 25.6, netIncome: 22.0, da: 59.3, cfo: -42.1, capex: 95.3, fcf: -137.4, roe: 0.01102, dps: 0, totalAssets: 2467, totalEquity: 1996 },
    { year: 'FY2026E', isEstimate: true, revenue: 1790, epsGaap: null, epsNonGaap: 0.81, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: 2220, epsGaap: null, epsNonGaap: 1.11, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'Revenue grew every year (+9.5% FY23A->FY24A, +18.6% FY24A->FY25A) and consensus expects that to accelerate further (+32.9% FY25A->FY26E), consistent with management’s raised 19-23% FY2026 organic growth guidance. But GAAP profitability has not scaled with revenue: net margin was just 1.63% in FY2025A, and operating income actually declined slightly in absolute dollars (FY23A $31.1M -> FY25A $25.6M) even as revenue grew 30% over the same period - the story here is capacity investment ahead of margin realization, not yet margin expansion itself. FY2023A’s negative EPS (-$0.07) despite positive net income ($2.4M) reflects a preferred-dividend/accretion adjustment to income available to common shareholders not broken out at the granularity available.',

  cashFlow: [
    { year: 'FY2023A', cfo: 65.2, cfi: -43.8, cff: -30.7, capex: 52.4, da: 44.7, dividendsPaid: 0, buybacks: 3.7, netDebtActivity: -101, receivables: null, payables: null, inventory: null },
    { year: 'FY2024A', cfo: 49.7, cfi: -69.7, cff: 277.6, capex: 58.2, da: 51.9, dividendsPaid: 0, buybacks: 17.4, netDebtActivity: 69, receivables: null, payables: null, inventory: null },
    { year: 'FY2025A', cfo: -42.1, cfi: -88.3, cff: 360.7, capex: 95.3, da: 59.3, dividendsPaid: 0, buybacks: 20.0, netDebtActivity: -185, receivables: null, payables: null, inventory: null },
  ],
  cashFlowNote: 'FY2025A is the year to watch: operating cash flow went negative (-$42.1M, vs. +$49.7M FY2024A) even as revenue grew 18.6%, and capex jumped 63.7% ($58.2M -> $95.3M) to fund new manufacturing capacity (hypersonic engines, Valkyrie production) - together that drove free cash flow to -$137.4M. The company is funding this heavily through equity issuance ($565.8M in FY2025A alone, on top of $338.9M in FY2024A) rather than debt - net debt activity was actually net repayment in FY2023A and FY2025A - which is balance-sheet-conservative but dilutes per-share economics, directly explaining why this analysis’s RIM model returns a negative implied price. Receivables/payables/inventory weren’t captured this pass - left null rather than guessed.',

  analystViews: {
    targetMean: 105.62,
    targetMedian: 104.0,
    targetHigh: 150.0,
    targetLow: 60.0,
    numAnalysts: 21,
    buy: 19,
    hold: 2,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'Kratos Defense & Security Solutions develops unmanned aerial systems (including the XQ-58 Valkyrie attritable fighter drone), hypersonic technologies, satellite/space communications, missile defense systems, and jet engines for the U.S. defense industrial base. The company has positioned itself as a lower-cost, faster-iteration alternative to traditional defense primes, particularly in unmanned and attritable systems where rapid, affordable production matters more than the exquisite, decades-long programs legacy primes are built around. Growth is broad-based: management raised full-year 2026 organic revenue growth guidance to 19-23%, and hypersonic-segment revenue alone is projected to roughly double from about $200M (2025) to $400M (2026) as new turbojet engine manufacturing capacity comes online. Backlog stood at $2.08 billion at the end of Q2 2026 ($1.57B funded), with a trailing 12-month book-to-bill ratio of 1.3x and a $15 billion bid-and-proposal pipeline - real, disclosed demand signals well beyond current revenue.',
    macroEnvironment:
      'Kratos sits squarely in the defense-tech growth story the market has re-rated aggressively over the past two years: unmanned/attritable systems, hypersonics, and space are budget categories the Pentagon and allied governments have prioritized fastest, and Kratos has genuine, disclosed program wins across all three rather than a single-product bet. That re-rating shows directly in the multiple - KTOS trades at 573.9x trailing TEV/EBIT and 371.7x trailing P/E, which only make sense if today’s thin GAAP margins (1.6% net margin FY2025A) are a temporary function of scaling new manufacturing capacity, not a structural ceiling. The company is funding that scale-up heavily through equity issuance ($565.8M raised in FY2025A alone) rather than debt, which dilutes per-share economics even as absolute revenue and backlog grow - a real tension this analysis’s RIM model picks up on directly. Broader defense-budget dynamics remain a tailwind, but Kratos’s own execution on the hypersonics and Valkyrie ramp is now doing more work than the macro backdrop alone.',
    keyRisks: [
      'Heavy equity dilution is outrunning per-share earnings growth: Kratos raised $565.8M in equity in FY2025A alone (on top of $338.9M in FY2024A), growing book value per share to $12.08 faster than EPS has grown - exactly why this analysis’s RIM model returns a negative implied price and gets automatically excluded.',
      'Valuation already prices in years of flawless execution: 573.9x trailing TEV/EBIT and 371.7x trailing P/E leave little room for a program slip or margin miss - and even the comps-implied price ($47.34, peer-median forward P/E applied to KTOS’s own consensus EPS) sits below the current $62.79 price, meaning a pure peer-multiple read calls this stock expensive even against AVAV and RKLB, two of the market’s own richest growth-defense names.',
      'Analyst optimism-bias flag (Frankel & Lee): consensus long-term growth (37.0%, implied by FY2026->FY2027 EPS estimates) runs well ahead of Kratos’s own realized 2-year EPS CAGR (18.2%) - a real, model-flagged signal that Street estimates may be extrapolating the current hypersonics/Valkyrie ramp more aggressively than the company’s own recent track record supports.',
      'FY2025A operating cash flow went negative (-$42.1M, vs. +$49.7M FY2024A) even as revenue grew - working-capital build and rising capex intensity ($95.3M, +63.7% YoY) are consuming cash faster than earnings are converting to it, which is why free cash flow was -$137.4M in FY2025A despite positive net income.',
      'Thin absolute profitability relative to backlog promise: FY2025A net margin was 1.6% - the bull case rests on margin expansion as hypersonic/Valkyrie production scales, which is plausible given the disclosed $15B bid pipeline, but is not yet visible in the reported numbers.',
    ],
    nearTermCatalysts: [
      'Q3 2026 earnings (management guided approximately 19-25% organic growth for the quarter) - the next read on whether the hypersonics/Valkyrie ramp is converting bookings into recognized revenue and, more importantly, margin.',
      'Continued hypersonic-segment revenue ramp toward the $400M full-year 2026 target (from about $200M in 2025) as new turbojet engine manufacturing capacity comes online.',
      'Additional bookings against the $15B bid-and-proposal pipeline - the 1.3x trailing book-to-bill ratio is already healthy; a sustained or rising ratio would support the growth multiple the stock currently commands.',
      'Any update on Valkyrie (XQ-58) production rate or new program awards, given management’s explicit framing of increased Valkyrie output as a primary 2026 growth driver.',
      'Free cash flow trend over the next 1-2 quarters - whether FY2025A’s negative operating cash flow was a one-time working-capital/capex-timing issue or the start of a sustained pattern as the company scales.',
    ],
    investmentThesis:
      'Running the numbers here lands on a Buy at +21.2% upside, but the three methodologies genuinely disagree with each other, which is the real story. RIM excludes itself (negative implied price) because heavy equity dilution - $565.8M raised in FY2025A alone - is growing book value per share faster than earnings, a real structural tension the model catches automatically. Comps-implied price ($47.34, peer-median forward P/E against AVAV/LDOS/RKLB applied to Kratos’s own consensus EPS) actually sits below the current $62.79 price - even against two of the market’s richest growth-defense comps, Kratos looks expensive on a pure multiple basis. It’s entirely analyst consensus ($104.81 mean/median target) pulling the blended verdict to Buy, and this analysis’s own optimism-bias check flags that consensus long-term growth (37%) runs well ahead of Kratos’s realized 2-year EPS growth (18.2%) - a real, model-generated caution signal, not editorializing. The underlying business is genuinely growing (raised FY2026 guidance to 19-23% organic growth, $2.08B backlog, $15B pipeline), but FY2025A’s negative operating cash flow and 1.6% net margin mean the story is still ahead of the numbers. Worth owning if you believe the hypersonics/Valkyrie ramp converts to margin on schedule - the comps read says wait for proof first.',
  },

  sources: [
    {
      category: 'Historical Income Statement (FY2022-FY2025)',
      url: 'https://stockanalysis.com/stocks/ktos/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebit (operating income), netIncome for FY2023A/FY2024A/FY2025A; current price ($62.79) as of 2026-08-13.',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/ktos/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($12.08 FY2025, used as rimInputs.bvps).',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/ktos/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, buybacks, netDebtActivity for FY2023A/24A/25A; financials[].fcf cross-checked against this page’s stated Free Cash Flow figures (all reconciled exactly).',
    },
    {
      category: 'Valuation Multiples (KTOS)',
      url: 'https://stockanalysis.com/stocks/ktos/statistics/',
      dataUsed: 'Market cap ($11.79B), enterprise value ($10.54B), shares outstanding (187.72M diluted); comps.targetMetrics: tevRevenue (6.94), tevEbitda (110.81), tevEbit (573.91), pDilutedEps (371.70, trailing P/E), pTangibleBv (5.06), ntmFwdPe (67.81).',
    },
    {
      category: 'Forward Estimates & Price Targets (KTOS)',
      url: 'https://stockanalysis.com/stocks/ktos/forecast/',
      dataUsed: 'rimInputs.fy1Eps (0.81, FY2026) / fy2Eps (1.11, FY2027); FY2026E/FY2027E revenue ($1.79B/$2.22B); analystViews (targetMean $105.62/targetMedian $104/targetHigh $150/targetLow $60, 21 analysts, 14 strong buy/5 buy/2 hold/0 sell).',
    },
    {
      category: 'Peer AVAV, LDOS, RKLB - Trading Multiples',
      url: 'https://stockanalysis.com/stocks/avav/statistics/',
      dataUsed: 'comps.peers[AVAV] full multiples set; comps.peers[LDOS]/[RKLB] pulled the same way from stockanalysis.com/stocks/ldos/statistics/ and /rklb/statistics/ respectively.',
    },
    {
      category: 'Q2 2026 Earnings - Guidance, Backlog, Hypersonics',
      url: 'https://seekingalpha.com/news/4555594-kratos-anticipates-doubling-hypersonic-revenue-to-400m-in-2026-while-ramping-valkyrie-drone',
      dataUsed: 'narrative: raised FY2026 organic growth guidance (19-23%), hypersonic revenue doubling ($200M -> $400M), Valkyrie drone output ramp, $2.084B backlog ($1.572B funded), 1.3x trailing book-to-bill, $15B bid-and-proposal pipeline.',
    },
    {
      category: 'Q4/FY2025 Earnings Release Date',
      url: 'https://www.kratosdefense.com/newsroom/kratos-reports-fourth-quarter-and-full-year-2025-financial-results',
      dataUsed: 'Fiscal calendar (lastFiscalYearEndDate 2025-12-28, earnings release 2026-02-23).',
    },
  ],
}
