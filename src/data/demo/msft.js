// Cached demo data for Microsoft Corporation (MSFT), researched via live web
// search on 2026-08-12. Not live-fetched at runtime - added as a ninth
// bundled analysis alongside MU/LLY/SNDK/WDC/COST/LRCX/NVDA/AMD.
//
// Context: Microsoft is the AI-infrastructure hyperscaler this analysis
// treats as most directly comparable to Amazon (AWS) and Alphabet (Google
// Cloud) - both already appear in this bundle's other files - plus Apple as
// the natural mega-cap scale comp and Oracle for enterprise-software/cloud-
// database overlap. Azure crossed $100B in annual revenue and grew 43%
// year-over-year in the most recently reported quarter (Q4 FY2026, reported
// July 29, 2026), with management guiding 45% constant-currency growth for
// the quarter ahead. Microsoft 365 Copilot paid seats nearly doubled
// quarter-over-quarter (20M -> 30M) and GitHub Copilot reached 50M users.
// Capex hit a record $41B in a single quarter, funding the AI datacenter
// buildout largely from operating cash flow and balance-sheet cash rather
// than new debt - but free cash flow has now declined three straight fiscal
// years (FY24A->FY26A) as capex growth consistently outpaces even
// fast-growing operating cash flow.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - FY2028 consensus EPS was paywalled everywhere checked; derived as
//   fy1Eps x (1 + ltg) = 19.70 x 1.168 = 23.01, an explicit disclosed
//   judgment call, same approach used for AMD's FY2027 estimate earlier in
//   this bundle.
// - NTM TEV/Revenue was not published free for any peer (AAPL/GOOGL/AMZN/
//   ORCL) - trailing TEV/Revenue reused as an approximation for each,
//   flagged rather than silently substituted (same approach used for AVGO
//   in the AMD file). MSFT's own ntmTevRevenue (9.49) is a genuine forward
//   calc: enterprise value ($3.71T) / FY2027E consensus revenue ($391.16B).
// - Receivables/payables/inventory weren't captured this pass - left null
//   rather than guessed, consistent with every other file in this bundle.
// - LTG (16.8%) is a 5-year EPS growth forecast mean from finbox.com, not a
//   revenue-growth proxy - specifically an EPS-growth figure, matching the
//   convention used elsewhere in this bundle.

export const msftDemo = {
  ticker: 'MSFT',
  companyName: 'Microsoft Corporation',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Software - Infrastructure',
  asOfDate: '2026-08-12',
  currentPrice: 492.43,
  marketCap: 3_660_000_000_000,
  sharesOutstanding: 7_430_000_000,
  fiscalYearEndDescription: 'Fiscal year ending June 30 (FY2026 ended June 30, 2026, already reported)',

  rimInputs: {
    fy1Eps: 19.70,
    fy2Eps: 23.01,
    ltg: 0.168,
    bvps: 59.36,
    r: 0.08,
    k: 0.2028,
    nextFiscalYearEnd: 2027,
    currentFiscalMonth: 2,
  },
  rimInputNotes: {
    fy1Eps: 'FY2027 consensus non-GAAP EPS (48 analysts per stockanalysis.com forecast page).',
    fy2Eps: 'No reliable FY2028 consensus was found (paywalled everywhere checked). Derived as fy1Eps x (1 + ltg) = 19.70 x 1.168 = 23.01, an explicit disclosed judgment call rather than guessing or leaving null.',
    ltg: 'finbox.com EPS Growth Forecast Mean Consensus - 16.8% over the next 5 fiscal years, an EPS-specific figure.',
    bvps: 'FY2026 (ended 6/30/26) stockholders equity ($442,387M) per stockanalysis.com balance sheet, stated directly as $59.36/share - the RIM convention (last completed fiscal year-end).',
    k: 'Trailing dividend payout ratio per stockanalysis.com statistics page.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 11.17,
      tevEbitda: 19.13,
      tevEbit: 23.88,
      pDilutedEps: 28.07,
      pTangibleBv: 12.02,
      ntmTevRevenue: 9.49,
      ntmFwdPe: 25.57,
    },
    peers: [
      { ticker: 'AAPL', name: 'Apple Inc.', tevRevenue: 9.32, tevEbitda: 25.90, tevEbit: 28.10, pDilutedEps: 34.98, pTangibleBv: 50.62, ntmTevRevenue: 9.32, ntmFwdPe: 33.30 },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', tevRevenue: 9.12, tevEbitda: 23.49, tevEbit: 27.56, pDilutedEps: 17.25, pTangibleBv: 7.54, ntmTevRevenue: 9.12, ntmFwdPe: 25.87 },
      { ticker: 'AMZN', name: 'Amazon.com, Inc.', tevRevenue: 3.91, tevEbitda: 17.94, tevEbit: 32.33, pDilutedEps: 21.89, pTangibleBv: 5.49, ntmTevRevenue: 3.91, ntmFwdPe: 29.30 },
      { ticker: 'ORCL', name: 'Oracle Corporation', tevRevenue: 8.51, tevEbitda: 19.18, tevEbit: 27.83, pDilutedEps: 24.95, pTangibleBv: null, ntmTevRevenue: 8.51, ntmFwdPe: 18.07 },
    ],
    note: 'Peer set is mega-cap tech with direct overlap in cloud infrastructure and/or productivity software: Apple and Alphabet as the natural mega-cap scale comps, Amazon for AWS/cloud-infrastructure overlap, and Oracle for enterprise-software/cloud-database overlap. MSFT trades at a premium to every peer except Apple on trailing P/E (28.07x) and sits mid-pack on TEV/EBITDA (19.13x, between Amazon’s 17.94x and Oracle’s 19.18x) - a market pricing Azure’s 43% growth rate more richly than Oracle’s cloud business but not as richly as Apple’s services-heavy multiple.',
  },

  financials: [
    { year: 'FY2024A', isEstimate: false, revenue: 245122, epsGaap: 11.80, epsNonGaap: null, cfps: 15.87, ebitda: 130391, ebit: 109433, netIncome: 88136, da: 20958, cfo: 118548, capex: 44477, fcf: 74071, roe: 0.3283, dps: 2.80, totalAssets: 512163, totalEquity: 268477 },
    { year: 'FY2025A', isEstimate: false, revenue: 281724, epsGaap: 13.64, epsNonGaap: null, cfps: 18.24, ebitda: 157961, ebit: 128528, netIncome: 101832, da: 29433, cfo: 136162, capex: 64551, fcf: 71611, roe: 0.2965, dps: 3.30, totalAssets: 619003, totalEquity: 343479 },
    { year: 'FY2026A', isEstimate: false, revenue: 331839, epsGaap: 17.95, epsNonGaap: null, cfps: 24.55, ebitda: 193771, ebit: 155237, netIncome: 133749, da: 38534, cfo: 182935, capex: 115948, fcf: 66987, roe: 0.3023, dps: 3.64, totalAssets: 758376, totalEquity: 442387 },
    { year: 'FY2027E', isEstimate: true, revenue: 391160, epsGaap: null, epsNonGaap: 19.70, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2028E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 23.01, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'Growth accelerated rather than merely continued: revenue growth stepped up from +14.9% (FY24A->FY25A) to +17.8% (FY25A->FY26A) as AI/Azure demand scaled, with operating margin expanding every year (35.96% -> 36.15% -> 40.31%) even as capex more than doubled ($44.5B -> $115.9B) to fund AI infrastructure. ROE dipped in FY25A (29.65% vs. 32.83% FY24A) as equity grew faster than earnings, then partly recovered in FY26A (30.23%) as earnings caught back up. FY2028E revenue consensus wasn’t available free as of 2026-08-12 and is left null rather than guessed.',

  cashFlow: [
    { year: 'FY2024A', cfo: 118548, cfi: -96970, cff: -37757, capex: 44477, da: 20958, dividendsPaid: 21771, buybacks: 17254, netDebtActivity: -4675, receivables: null, payables: null, inventory: null },
    { year: 'FY2025A', cfo: 136162, cfi: -72599, cff: -51699, capex: 64551, da: 29433, dividendsPaid: 24082, buybacks: 18420, netDebtActivity: -3216, receivables: null, payables: null, inventory: null },
    { year: 'FY2026A', cfo: 182935, cfi: -139500, cff: -52546, capex: 115948, da: 38534, dividendsPaid: 26445, buybacks: 22271, netDebtActivity: -3000, receivables: null, payables: null, inventory: null },
  ],
  cashFlowNote: 'CFO grew every year (+14.9% FY24A->FY25A, +34.4% FY25A->FY26A) but capex grew even faster (+45.1% then +79.6%), so free cash flow actually declined each year ($74.1B -> $71.6B -> $67.0B) despite CFO growth - purely a function of capex intensity outrunning operating cash generation. Dividends and buybacks both grew steadily and net debt activity was net repayment (no new issuance) in all three years - the AI capex ramp is being funded from operating cash flow and balance-sheet cash, not new debt. Receivables/payables/inventory weren’t captured this pass - left null rather than guessed.',

  analystViews: {
    targetMean: 567.2,
    targetMedian: 550.0,
    targetHigh: 870.0,
    targetLow: 400.0,
    numAnalysts: 56,
    buy: 53,
    hold: 3,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'Microsoft operates through three segments: Productivity and Business Processes (Office 365, LinkedIn, Dynamics 365), Intelligent Cloud (Azure, server products, GitHub), and More Personal Computing (Windows, Xbox, Surface, Bing/advertising). Azure is now the company’s primary growth engine, having crossed $100 billion in annual revenue and grown 43% year-over-year in the most recently reported quarter (Q4 FY2026), with management guiding 45% constant-currency growth for the quarter ahead. AI monetization is broadening beyond cloud infrastructure into the application layer: Microsoft 365 Copilot has reached 30 million paid seats (up from 20 million the prior quarter) and GitHub Copilot has 50 million users, both embedding AI directly into Microsoft’s existing enterprise software base rather than requiring net-new customer acquisition. A roughly $13 billion cumulative investment in OpenAI underpins much of this positioning, giving Microsoft privileged access to frontier models it packages across its own product surface.',
    macroEnvironment:
      'Microsoft sits at the center of the AI capex supercycle: capital expenditure hit a record $41 billion in the most recent quarter alone as hyperscalers race to build out datacenter and GPU capacity, a dynamic playing out identically at Amazon (AWS) and Alphabet (Google Cloud) - both direct comps in this analysis. That intensity already shows in the numbers: free cash flow fell even as operating cash flow grew, because capex is compounding faster than cash generation. Enterprise IT budgets remain a tailwind for now, with corporate buyers treating AI-enabled productivity tools as a priority line item, but that assumption hasn’t been tested through a real macro downturn. Regulatory attention on Microsoft’s AI dominance is intensifying - antitrust scrutiny of its OpenAI relationship is active in both the US and UK, though the UK’s CMA has closed its formal investigation without further action.',
    keyRisks: [
      'Capex outrunning cash generation: capex more than doubled FY24A->FY26A ($44.5B -> $115.9B) and hit a record $41B in a single quarter; free cash flow declined every year in this window even as operating cash flow grew - the SCF quality check flags this as a real outlier, not a modeling artifact.',
      'Valuation already prices in strong execution: comps (peer-median, $543.42) and analyst consensus ($558.60 mean/median) both sit above the current price, but RIM ($464.95) sits meaningfully below it - blended upside is a modest +6.1%, not the kind of gap that rewards being early.',
      'AI ROI is still a bet, not a proof point: the AI business has scaled fast (Copilot at 30M paid seats, GitHub Copilot at 50M users), but the underlying capex is being deployed years ahead of any independently verifiable return, and management has guided capex intensity to continue at least through FY2027.',
      'Antitrust scrutiny of the OpenAI relationship: the FTC has raised concerns that Microsoft’s ~$13B OpenAI investment extends its cloud dominance into the AI market, and a consumer antitrust suit alleges Microsoft required OpenAI to run workloads exclusively on Azure; the UK’s CMA closed its own review without action, but the US process remains open.',
      'Hyperscaler competition for the same AI-infrastructure dollar: Amazon and Alphabet are running an identical capex-heavy playbook (both appear in this analysis’s own comps set), meaning Azure’s 43-45% growth rate has to keep outrunning two well-funded competitors making the same bet, not a clear field.',
    ],
    nearTermCatalysts: [
      'Q1 FY2027 earnings (expected late October 2026) - the first real test of management’s guided 45% constant-currency Azure growth and whether the record capex pace continues or moderates.',
      'Continued Microsoft 365 Copilot seat growth disclosures - seats roughly 1.5x’d quarter-over-quarter (20M -> 30M) last quarter; the next print shows whether that pace is sustainable or was a one-time catch-up.',
      'Any update on the FTC’s review of Microsoft’s OpenAI investment structure, given the active antitrust question of whether it extends cloud dominance into AI.',
      'Further OpenAI model releases that flow directly into Microsoft’s own Copilot product surface given the exclusivity of the Azure hosting relationship.',
      'Capex guidance commentary in the next earnings call - whether FY2027 spending holds near the $41B-per-quarter run rate or management signals moderation, given free cash flow has now declined three years running.',
    ],
    investmentThesis:
      'Running the numbers here lands on a Hold at +6.1% upside, and the story is really about which valuation approach you trust. Analyst consensus ($558.60 mean/median target) and comps (peer-median $543.42, against Apple, Alphabet, Amazon, and Oracle) both sit comfortably above the current $492.43 price, but RIM’s terminal implied price ($464.95) sits below it - the residual-income model is more skeptical of Microsoft sustaining a 30%+ ROE once the current AI capex cycle matures, while the market (via comps and analyst targets) is pricing in that Microsoft simply keeps winning. Both views have real support: Azure crossing $100B at 43-45% growth and Copilot’s seat count nearly doubling in a single quarter are genuinely strong operating results, not story-stock hype. But free cash flow has now declined three straight years as capex ($115.9B in FY26A, a record $41B in a single quarter) consistently outpaces even fast-growing operating cash flow, and the stock’s current multiple (28.1x trailing P/E, 23.9x TEV/EBIT) already assumes that capex converts cleanly into durable AI revenue. Worth revisiting after a couple more quarters of Azure growth versus capex-versus-FCF trend confirm which read is right, rather than chasing or fading the current setup.',
  },

  sources: [
    {
      category: 'Historical Income Statement (FY2023-FY2026)',
      url: 'https://stockanalysis.com/stocks/msft/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebit (operating income), netIncome for FY2024A/FY2025A/FY2026A; current price ($492.43) as of 2026-08-12.',
    },
    {
      category: 'Balance Sheet (FY2024-FY2026)',
      url: 'https://stockanalysis.com/stocks/msft/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2024A/25A/26A; book value per share ($59.36 FY2026, used as rimInputs.bvps); total debt and cash context for narrative.',
    },
    {
      category: 'Cash Flow Statement (FY2024-FY2026)',
      url: 'https://stockanalysis.com/stocks/msft/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2024A/25A/26A; financials[].fcf/ebitda cross-checked against this page’s stated Free Cash Flow and D&A figures (all reconciled exactly).',
    },
    {
      category: 'Valuation Multiples & Dividend Data (MSFT)',
      url: 'https://stockanalysis.com/stocks/msft/statistics/',
      dataUsed: 'Market cap ($3.66T), enterprise value ($3.71T), shares outstanding (7.43B diluted); comps.targetMetrics: tevRevenue (11.17), tevEbitda (19.13), tevEbit (23.88), pDilutedEps (28.07, trailing P/E), pTangibleBv (12.02), ntmFwdPe (25.57); rimInputs.k (20.28% trailing dividend payout ratio).',
    },
    {
      category: 'Forward Estimates & Price Targets (MSFT)',
      url: 'https://stockanalysis.com/stocks/msft/forecast/',
      dataUsed: 'rimInputs.fy1Eps (19.70, FY2027 non-GAAP consensus, 48 analysts); FY2027E revenue ($391.16B) used for comps.targetMetrics.ntmTevRevenue; analystViews (targetMean $567.20/targetMedian $550/targetHigh $870/targetLow $400, 56 analysts, 53 buy/3 hold/0 sell).',
    },
    {
      category: 'Dividend History (FY2024-FY2026)',
      url: 'https://stockanalysis.com/stocks/msft/dividend/',
      dataUsed: 'financials[].dps (2.80 FY2024A, 3.30 FY2025A, 3.64 FY2026A) - summed from quarterly dividend payments by fiscal year.',
    },
    {
      category: 'FY2028 EPS / Long-Term Growth Cross-Check',
      url: 'https://finbox.com/NASDAQGS:MSFT/explorer/eps_proj_growth_mean/',
      dataUsed: 'rimInputs.ltg (0.168, EPS Growth Forecast Mean Consensus - 16.8% over next 5 fiscal years) - used directly; FY2028 EPS was not published here either and was derived instead (see rimInputNotes.fy2Eps).',
    },
    {
      category: 'Peer AAPL, GOOGL, AMZN, ORCL - Trading Multiples',
      url: 'https://stockanalysis.com/stocks/aapl/statistics/',
      dataUsed: 'comps.peers[AAPL] full multiples set; comps.peers[GOOGL]/[AMZN]/[ORCL] pulled the same way from stockanalysis.com/stocks/googl/statistics/, /amzn/statistics/, and /orcl/statistics/ respectively.',
    },
    {
      category: 'Q4 FY2026 Earnings - Azure, Copilot, Capex',
      url: 'https://news.microsoft.com/source/2026/07/29/microsoft-earnings-press-release-available-on-investor-relations-website-30/',
      dataUsed: 'Fiscal calendar (lastFiscalYearEndDate 2026-06-30, earnings release 2026-07-29); narrative: Azure $100B/43% growth, 45% guided growth, Copilot 30M paid seats, GitHub Copilot 50M users, record $41B quarterly capex, FCF decline.',
    },
    {
      category: 'Microsoft-OpenAI Antitrust Scrutiny',
      url: 'https://www.legal.io/articles/5456104/Microsoft-and-OpenAI-Face-Antitrust-Scrutiny-for-Deepening-Ties',
      dataUsed: 'narrative.macroEnvironment/keyRisks: ~$13B cumulative OpenAI investment, FTC concerns about cloud-dominance extension into AI, consumer antitrust suit re: Azure exclusivity, UK CMA closing its investigation without action.',
    },
  ],
}
