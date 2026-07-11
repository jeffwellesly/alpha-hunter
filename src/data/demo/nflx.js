// Cached demo data for Netflix (NFLX), researched via live web search on
// 2026-07-11. Not live-fetched at runtime - this is the "Demo Mode" snapshot
// so the app works with zero API keys.
//
// Context: NFLX executed a 10-for-1 forward stock split effective Nov 17,
// 2025 - all figures below are post-split. The stock has fallen from a
// 52-week high of $127.75 to ~$73 after cautious Q2 2026 guidance and Reed
// Hastings' departure as Board Chairman (real market context, not a data error).
//
// Data gaps flagged during research:
// - FY2027E EPS is a synthesized midpoint of a $3.46-$4.32 analyst range.
// - No free source had a full FY2026E/FY2027E income statement build beyond
//   revenue and EPS consensus.
// - NTM TEV/Revenue is approximated using trailing EV/Sales (forward revenue
//   wasn't available per-peer from free sources).

export const nflxDemo = {
  ticker: 'NFLX',
  companyName: 'Netflix, Inc.',
  exchange: 'NASDAQ',
  sector: 'Communication Services',
  industry: 'Movies & Entertainment',
  asOfDate: '2026-07-11',
  currentPrice: 73.37,
  marketCap: 308_950_000_000,
  sharesOutstanding: 4_210_000_000,
  fiscalYearEndDescription: 'Calendar year (December 31)',

  rimInputs: {
    fy1Eps: 3.6,
    fy2Eps: 3.92,
    ltg: 0.126,
    bvps: 6.31,
    r: 0.08,
    k: 0.0,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 7,
  },
  rimInputNotes: {
    fy2Eps: 'Synthesized midpoint of a $3.46-$4.32 analyst range; no single clean FY2027 consensus print found.',
    ltg: '~12.6%/yr EPS growth consensus, down sharply from ~32.6% realized over the trailing 5 years - market is re-rating NFLX from hyper-growth to mature compounder.',
    bvps: 'Total FY2025 stockholders’ equity ($26,616M) / ~4,220M shares outstanding at FYE. Most-recent-quarter (Q1 2026) book value is higher ($7.24/share) but last-FYE is the RIM convention.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 6.63,
      tevEbitda: 9.95,
      tevEbit: 21.9,
      pDilutedEps: 23.71,
      pTangibleBv: 9.93,
      ntmTevRevenue: 6.1,
      ntmFwdPe: 19.13,
    },
    peers: [
      { ticker: 'DIS', name: 'Walt Disney Co.', tevRevenue: 2.2, tevEbitda: 11.01, tevEbit: 15.3, pDilutedEps: 15.3, pTangibleBv: 1.53, ntmTevRevenue: 2.2, ntmFwdPe: 12.79 },
      { ticker: 'WBD', name: 'Warner Bros. Discovery', tevRevenue: 2.61, tevEbitda: 13.03, tevEbit: 46.3, pDilutedEps: null, pTangibleBv: 2.05, ntmTevRevenue: 2.61, ntmFwdPe: null, flag: 'Pending acquisition by Paramount Skydance ($31.00/sh cash, expected close Q3 2026) - multiples reflect deal-arb pricing, not standalone fundamentals.' },
      { ticker: 'PSKY', name: 'Paramount Skydance', tevRevenue: 0.9, tevEbitda: 7.65, tevEbit: 11.1, pDilutedEps: null, pTangibleBv: 0.9, ntmTevRevenue: 0.9, ntmFwdPe: 11.54 },
      { ticker: 'CMCSA', name: 'Comcast Corp.', tevRevenue: 1.35, tevEbitda: 4.76, tevEbit: 8.75, pDilutedEps: 4.64, pTangibleBv: 0.96, ntmTevRevenue: 1.35, ntmFwdPe: 6.38 },
      { ticker: 'SPOT', name: 'Spotify Technology', tevRevenue: 4.39, tevEbitda: 30.66, tevEbit: 31.96, pDilutedEps: 35.26, pTangibleBv: 10.69, ntmTevRevenue: 4.39, ntmFwdPe: 29.6 },
      { ticker: 'ROKU', name: 'Roku Inc.', tevRevenue: 3.82, tevEbitda: 43.96, tevEbit: null, pDilutedEps: 105.6, pTangibleBv: 7.77, ntmTevRevenue: 3.82, ntmFwdPe: 46.5, flag: 'Pending acquisition by Fox Corp. ($160.00/sh, expected close H1 2027) - multiples are deal-arb distorted, not organic.' },
      { ticker: 'FUBO', name: 'fuboTV (incl. Hulu+Live TV)', tevRevenue: 1.86, tevEbitda: null, tevEbit: null, pDilutedEps: 2.13, pTangibleBv: 0.33, ntmTevRevenue: 1.86, ntmFwdPe: null, flag: 'Post 1-for-12 reverse split (Mar 2026); share count/market cap had conflicting sources - treat cautiously.' },
      { ticker: 'STRZ', name: 'Starz Entertainment', tevRevenue: 0.95, tevEbitda: null, tevEbit: null, pDilutedEps: null, pTangibleBv: 0.98, ntmTevRevenue: 0.95, ntmFwdPe: null },
    ],
    note: 'WBD and ROKU are pending-acquisition merger-arb situations; their trading multiples reflect deal pricing, not standalone fundamentals. P/Tangible BV for NFLX is treated ≈ P/B: NFLX’s balance sheet is dominated by content assets, a productive operating asset (like inventory), not a "soft" intangible like goodwill (which is immaterial for NFLX). NTM TEV/Revenue approximated via trailing EV/Sales where forward peer revenue wasn’t available from free sources.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 33723, epsGaap: 1.2, epsNonGaap: null, cfps: 1.62, ebitda: 7311, ebit: 6954, netIncome: 5408, da: 356.9, cfo: 7274.3, capex: 348.6, fcf: 6926, roe: 0.2615, dps: 0, totalAssets: 48732, totalEquity: 20588.3 },
    { year: 'FY2024A', isEstimate: false, revenue: 39001, epsGaap: 1.98, epsNonGaap: null, cfps: 1.68, ebitda: 10747, ebit: 10418, netIncome: 8712, da: 328.9, cfo: 7361.4, capex: 439.5, fcf: 6922, roe: 0.3843, dps: 0, totalAssets: 53630.4, totalEquity: 24743.6 },
    { year: 'FY2025A', isEstimate: false, revenue: 45183, epsGaap: 2.53, epsNonGaap: null, cfps: 2.34, ebitda: 13660, ebit: 13327, netIncome: 10981, da: 333.4, cfo: 10149.3, capex: 688.2, fcf: 9461, roe: 0.4276, dps: 0, totalAssets: 55597, totalEquity: 26615.5 },
    { year: 'FY2026E', isEstimate: true, revenue: 51390, epsGaap: null, epsNonGaap: 3.6, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 3.92, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'EPS figures are diluted GAAP, split-adjusted. No full FY2026E/FY2027E income-statement build was available free - only revenue and EPS consensus.',

  cashFlow: [
    { year: 'FY2023A', cfo: 7274.3, cfi: 541.8, cff: -5950.8, capex: 348.6, da: 356.9, contentAdditions: 12554.7, contentAmortization: 14197.4, dividendsPaid: 0, buybacks: 6045.3, netDebtActivity: 0 },
    { year: 'FY2024A', cfo: 7361.4, cfi: -2181.8, cff: -4074.4, capex: 439.5, da: 328.9, contentAdditions: 16223.6, contentAmortization: 15301.5, dividendsPaid: 0, buybacks: 6263.7, netDebtActivity: 1394.5 },
    { year: 'FY2025A', cfo: 10149.3, cfi: 1041.7, cff: -10345.6, capex: 688.2, da: 333.4, contentAdditions: 17096.6, contentAmortization: 16422.2, dividendsPaid: 0, buybacks: 9127.2, netDebtActivity: -1833.5 },
  ],
  cashFlowNote:
    'Content investment (cash out) has run consistently ahead of content amortization (P&L expense) every year, though the gap narrowed from ~$0.9B (2024) to ~$0.7B (2025) - the content library is still building but content-spend growth is decelerating relative to runoff. CFF is dominated by buybacks (-$9.1B in 2025, accelerating from -$6.0B in 2023), self-funded from FCF rather than leverage - debt activity was minor/opportunistic.',

  analystViews: {
    targetMean: 113.4,
    targetMedian: 115.0,
    targetHigh: 151.4,
    targetLow: 80.0,
    numAnalysts: 52,
    buy: 36,
    hold: 15,
    sell: 1,
  },

  narrative: {
    companyOverview:
      'Netflix is the largest global subscription streaming entertainment service, with roughly 300 million paid memberships across film, television, gaming, and live sports/events content. Following a 10-for-1 stock split in November 2025, the company continues to diversify revenue through an ad-supported tier, password-sharing monetization, and expansion into live programming (including major sports rights). Its content model is capital-intensive: content assets, not property or equipment, are the dominant balance-sheet investment, funded increasingly from internally generated free cash flow rather than debt.',
    macroEnvironment:
      'Streaming competition remains intense from Disney+, Warner Bros. Discovery/HBO Max (itself being acquired by Paramount Skydance), Amazon Prime Video, and Apple TV+, alongside a fragmenting media landscape and continued cord-cutting. Netflix has the scale advantage and has been pivoting toward advertising and live events as incremental growth levers as subscriber growth in mature markets slows. The stock has sold off sharply from its 52-week high after Q1 2026 results showed decelerating revenue growth guidance and the surprise departure of co-founder Reed Hastings as Board Chairman, both of which have weighed on sentiment more than the underlying financial results.',
    keyRisks: [
      'Decelerating growth: Q2 2026 guidance called for ~13% revenue growth versus 16% in Q1, raising questions about the durability of the post-password-sharing growth boost.',
      'Leadership transition: Reed Hastings’ departure as Board Chairman introduces governance uncertainty at a time the stock is already under pressure.',
      'Intensifying competition: Disney, WBD/Paramount Skydance, Amazon, and Apple are all investing heavily in content and live sports rights, raising content costs industry-wide.',
      'Content cost inflation: Content additions have outpaced amortization every year since 2024, meaning cash content spend continues to run ahead of the P&L expense recognizing it.',
      'Valuation still elevated on trailing multiples relative to legacy media peers, despite the recent pullback, leaving limited room for further growth disappointments.',
    ],
    nearTermCatalysts: [
      'Q2 2026 earnings release on July 16, 2026 - next read on whether growth deceleration stabilizes or continues.',
      'Continued ramp of the advertising tier and live sports/events programming as incremental revenue drivers.',
      'Clarity on Board Chairman succession following Reed Hastings’ departure.',
      'Accelerating buyback pace (-$9.1B in 2025, up from -$6.0B in 2023) as a signal of management confidence at depressed valuations.',
    ],
    investmentThesis:
      'Netflix\'s post-earnings selloff has pulled the stock to within a modest premium of its RIM-implied fair value ($69.28 terminal, versus $73.37 current), and analyst consensus (mean target $113.40, dominated by Buy ratings) still sees meaningfully more upside than either the RIM or comps analysis independently supports. The business fundamentals remain strong - CFO quality is high, content investment is running roughly in line with amortization for the first time in years, and buybacks are accelerating on a self-funded basis - but growth is genuinely decelerating (Q2 2026 guidance of ~13% versus 16% in Q1), and the market is right to be repricing NFLX away from its hyper-growth-era multiple. At current levels the stock is close to fairly valued on a blended basis: not table-pounding cheap, but no longer priced for perfection either. This reads as a HOLD - the selloff has removed most of the valuation risk, but the leadership transition and growth deceleration argue for waiting on a clearer signal before adding.',
  },
}
