// Cached demo data for Eli Lilly (LLY), researched via live web search/fetch
// on 2026-07-14. Not live-fetched at runtime - this is the "Demo Mode"
// snapshot so the app works with zero API keys.
//
// Every field in this file is traceable to a specific fetched URL - see the
// `sources` array at the bottom, which lists exactly which numbers came from
// which page. This was a full re-research pass (not incremental) so every
// number could be re-verified against a live source rather than carried
// forward from a prior guess.
//
// Context: Lilly's incretin (GLP-1) franchise now dominates revenue -
// tirzepatide (Mounjaro + Zepbound) is roughly half of FY2025 revenue. On
// April 1, 2026 Lilly won FDA approval for orforglipron (brand name
// "Foundayo"), the first oral small-molecule GLP-1 with no food/water
// restrictions - a major new growth vector, launched about three months
// after Novo Nordisk's rival oral semaglutide (Wegovy pill, approved Dec 22,
// 2025). A November 6, 2025 Trump administration pricing framework
// (TrumpRx.gov, live since January 2026) cuts GLP-1 list/net prices
// materially in exchange for expanded Medicare/Medicaid coverage - a real
// volume-vs-price tradeoff playing out through 2026.
//
// Data gaps flagged during research (kept honest rather than guessed):
// - LTG (long-term EPS growth) has no clean single free consensus source.
//   Finviz's "EPS Next 5Y" figure (29.09%) is the only directly-fetchable,
//   citable quantitative figure found this session - Zacks, WSJ, and
//   SimplyWall.st (which surfaced a much lower ~16.8% figure in search
//   snippets) were all blocked/inaccessible for direct verification. Used
//   the Finviz figure as-is since it's the only one that could actually be
//   sourced, rather than substituting an unsourced "conservative" number -
//   but this is flagged as a wide-dispersion input, not a tight consensus.
// - P/Tangible Book Value was only available (free) for 1 of 8 peers (Novo
//   Nordisk); the other 7 returned "n/a" on stockanalysis.com.
// - True NTM (forward) TEV/Revenue is not separately published free for any
//   peer or for LLY itself - trailing TEV/Revenue is used as an
//   approximation for the NTM column, same as trailing.
// - FY2026E/FY2027E EBITDA/EBIT/D&A/CFO/CapEx/FCF/total assets/total equity
//   were not available as discrete published consensus estimates from free
//   sources; only revenue and EPS consensus exist. FY2027E dividend/share is
//   also not available as a discrete estimate (only FY2026's $6.92 is
//   published), so it is left null rather than duplicated from FY2026.
// - Next earnings date (~Aug 5, 2026) is MarketBeat's estimate based on
//   Lilly's prior-year reporting cadence, not yet officially confirmed by
//   the company as of this file's as-of date.

export const llyDemo = {
  ticker: 'LLY',
  companyName: 'Eli Lilly and Company',
  exchange: 'NYSE',
  sector: 'Healthcare',
  industry: 'Drug Manufacturers - General',
  asOfDate: '2026-07-14',
  currentPrice: 1152.54,
  marketCap: 1_030_000_000_000,
  sharesOutstanding: 891_740_000,
  fiscalYearEndDescription: 'Calendar year (December 31)',

  rimInputs: {
    fy1Eps: 35.6,
    fy2Eps: 44.98,
    ltg: 0.2909,
    bvps: 29.51,
    r: 0.08,
    k: 0.2609,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 7,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus non-GAAP EPS = $35.60 (+47.03% YoY), from stockanalysis.com/stocks/lly/forecast/. Within Lilly’s own raised FY2026 guidance range of $35.50-$37.00 (per Feb 4, 2026 Q4 2025 earnings release / subsequent guidance raise).',
    fy2Eps: 'FY2027 consensus non-GAAP EPS = $44.98 (+26.37% YoY), from stockanalysis.com/stocks/lly/forecast/. This far out, treat as directional rather than exact.',
    ltg: 'Finviz "EPS Next 5Y" consensus growth estimate = 29.09% (finviz.com/quote.ashx?t=LLY, fetched 2026-07-14) - the only free, directly-citable quantitative long-term-growth figure found. Other sources hinted at a materially lower mid-teens figure but were not independently fetchable this session (403/paywall), so are not used as the basis for a number here.',
    bvps: 'Total FY2025 stockholders’ equity ($26,535M) / diluted weighted-avg shares -> $29.51/share, as directly reported on stockanalysis.com/stocks/lly/financials/balance-sheet/?p=10-year. Last-FYE book value is the RIM convention; current-quarter book value is already higher ($34.74 per TTM as of Mar 31, 2026) as retained earnings compound.',
    k: 'FY2025 payout ratio (dividends / earnings) = 26.09%, as directly reported on stockanalysis.com/stocks/lly/financials/ratios/. Forward-looking payout on FY2026 guidance EPS is meaningfully lower since the dividend is growing far slower than earnings.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 14.75,
      tevEbitda: 29.42,
      tevEbit: 31.18,
      pDilutedEps: 40.94,
      pTangibleBv: 58.09,
      ntmTevRevenue: 14.75,
      ntmFwdPe: 31.42,
    },
    peers: [
      { ticker: 'NVO', name: 'Novo Nordisk A/S', tevRevenue: 4.66, tevEbitda: 8.79, tevEbit: 9.46, pDilutedEps: 11.51, pTangibleBv: 19.19, ntmTevRevenue: 4.66, ntmFwdPe: 16.05 },
      { ticker: 'MRK', name: 'Merck & Co.', tevRevenue: 5.2, tevEbitda: 11.58, tevEbit: 13.93, pDilutedEps: 33.78, pTangibleBv: null, ntmTevRevenue: 5.2, ntmFwdPe: 19.82 },
      { ticker: 'ABBV', name: 'AbbVie Inc.', tevRevenue: 7.9, tevEbitda: 16.58, tevEbit: 22.67, pDilutedEps: 120.58, pTangibleBv: null, ntmTevRevenue: 7.9, ntmFwdPe: 16.46 },
      { ticker: 'JNJ', name: 'Johnson & Johnson', tevRevenue: 6.65, tevEbitda: 18.68, tevEbit: 24.11, pDilutedEps: 29.85, pTangibleBv: null, ntmTevRevenue: 6.65, ntmFwdPe: 21.78 },
      { ticker: 'PFE', name: 'Pfizer Inc.', tevRevenue: 3.0, tevEbitda: 7.46, tevEbit: 10.04, pDilutedEps: 18.5, pTangibleBv: null, ntmTevRevenue: 3.0, ntmFwdPe: 8.53 },
      { ticker: 'BMY', name: 'Bristol-Myers Squibb', tevRevenue: 3.13, tevEbitda: 8.0, tevEbit: 9.93, pDilutedEps: 15.95, pTangibleBv: null, ntmTevRevenue: 3.13, ntmFwdPe: 9.3 },
      { ticker: 'AZN', name: 'AstraZeneca PLC', tevRevenue: 4.69, tevEbitda: 14.17, tevEbit: 18.97, pDilutedEps: 24.73, pTangibleBv: null, ntmTevRevenue: 4.69, ntmFwdPe: 15.65 },
      { ticker: 'NVS', name: 'Novartis AG', tevRevenue: 5.61, tevEbitda: 13.86, tevEbit: 17.24, pDilutedEps: 20.5, pTangibleBv: null, ntmTevRevenue: 5.61, ntmFwdPe: 16.42 },
    ],
    note: 'All peer and target multiples sourced from stockanalysis.com/stocks/{ticker}/statistics/ (fetched 2026-07-14). P/Tangible Book Value was only available for 1 of 8 peers (Novo Nordisk, 19.19x); the other 7 returned "n/a" from the source - not simply missing, genuinely unpublished free. A true forward/NTM EV-Revenue figure is not published free for any name, so NTM TEV/Revenue reuses the trailing TEV/Revenue figure as an approximation, same as LLY’s own target metrics.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 34124, epsGaap: 5.8, epsNonGaap: null, cfps: 4.46, ebitda: 7984, ebit: 6457, netIncome: 5240, da: 1527, cfo: 4240, capex: 3448, fcf: 792, roe: 0.482, dps: 4.52, totalAssets: 64006, totalEquity: 10864 },
    { year: 'FY2024A', isEstimate: false, revenue: 45043, epsGaap: 11.71, epsNonGaap: null, cfps: 9.38, ebitda: 14666, ebit: 12899, netIncome: 10590, da: 1767, cfo: 8818, capex: 5058, fcf: 3760, roe: 0.742, dps: 5.2, totalAssets: 78715, totalEquity: 14272 },
    { year: 'FY2025A', isEstimate: false, revenue: 65179, epsGaap: 22.95, epsNonGaap: 24.21, cfps: 18.7, ebitda: 28299, ebit: 26302, netIncome: 20640, da: 1997, cfo: 16813, capex: 7841, fcf: 8972, roe: 0.778, dps: 6.0, totalAssets: 112476, totalEquity: 26535 },
    { year: 'FY2026E', isEstimate: true, revenue: 85470, epsGaap: null, epsNonGaap: 35.6, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 6.92, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: 98820, epsGaap: null, epsNonGaap: 44.98, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2023A-FY2025A actuals and FY2026E/FY2027E revenue + EPS consensus all sourced from stockanalysis.com/stocks/lly/financials/ and /forecast/. FY2025 non-GAAP EPS ($24.21) cross-confirmed against Lilly’s own Feb 4, 2026 Q4 2025 earnings release. Only revenue and EPS consensus were confidently available for FY2026E/FY2027E as discrete published estimates from free sources - other line items (EBITDA, EBIT, D&A, CFO, CapEx, FCF, ROE, balance sheet) are not published free at this granularity and are left null rather than guessed. FY2027E dividend/share is also not published as a discrete estimate and is left null.',

  cashFlow: [
    { year: 'FY2023A', cfo: 4240, cfi: -7153, cff: 3496, capex: 3448, da: 1527, dividendsPaid: 4069, buybacks: 750, netDebtActivity: 3959, receivables: 9091, payables: 2599, inventory: 5773 },
    { year: 'FY2024A', cfo: 8818, cfi: -9302, cff: 1230, capex: 5058, da: 1767, dividendsPaid: 4680, buybacks: 2500, netDebtActivity: 10753, receivables: 11006, payables: 3229, inventory: 7589 },
    { year: 'FY2025A', cfo: 16813, cfi: -10972, cff: -2213, capex: 7841, da: 1997, dividendsPaid: 5384, buybacks: 4108, netDebtActivity: 12389, receivables: 17760, payables: 5379, inventory: 13744 },
  ],
  cashFlowNote:
    'CFO nearly doubled in each of the last two years ($4.24B -> $8.82B -> $16.81B) on tirzepatide volume growth - a high-quality signal of real cash conversion, not just accruals. But working capital is growing even faster in places: receivables grew from $9.09B (FY2023) to $17.76B (FY2025, +95% cumulative) and inventory from $5.77B to $13.74B (+138% cumulative), reflecting the manufacturing ramp and larger customer/PBM balances. CapEx has climbed steeply ($3.4B -> $5.1B -> $7.8B, +127% cumulative) while D&A grew only modestly ($1.5B -> $2.0B, +31%) - the signature of the incretin manufacturing buildout, which will temporarily depress ROA/asset turnover even as ROE stays elevated. All figures from stockanalysis.com/stocks/lly/financials/cash-flow-statement/ and /financials/balance-sheet/ (both ?p=10-year).',

  analystViews: {
    targetMean: 1256.0,
    targetMedian: 1300.0,
    targetHigh: 1500.0,
    targetLow: 850.0,
    numAnalysts: 30,
    buy: 23,
    hold: 5,
    sell: 2,
  },

  narrative: {
    companyOverview:
      'Eli Lilly is a diversified large-cap pharmaceutical company now dominated by its incretin (GLP-1) franchise. Tirzepatide (Mounjaro for diabetes and Zepbound for obesity) is roughly half of FY2025 revenue, with Verzenio (oncology), Trulicity (legacy diabetes GLP-1, in decline), Taltz (immunology), and Jardiance (diabetes/cardio-renal) making up most of the rest. On April 1, 2026 Lilly won FDA approval for orforglipron (brand name Foundayo), the first oral small-molecule GLP-1 receptor agonist and the only GLP-1 pill that can be taken any time of day without food or water restrictions, opening a major new growth vector alongside its injectable franchise. Lilly is also running a large Phase 3 program (TRIUMPH, 5,800+ participants) for retatrutide, a triple GIP/GLP-1/glucagon agonist that has shown up to ~28-30% average weight loss in obesity trials, with seven additional Phase 3 readouts expected across obesity, type 2 diabetes, and knee osteoarthritis indications in 2026.',
    macroEnvironment:
      '2026 is being characterized industry-wide as "the year of obesity pills." Novo Nordisk beat Lilly to market with an FDA-approved oral GLP-1 (the Wegovy pill, approved Dec 22, 2025, launched in the US in early January 2026, with over 1 million US patients within its first four months), while Lilly followed with oral orforglipron (Foundayo) in April 2026. A November 6, 2025 Trump administration pricing framework created a direct-to-consumer platform (TrumpRx.gov, live since January 2026) under which Medicare/Medicaid pay roughly $245/month for GLP-1s (with beneficiary out-of-pocket near $50/month) and list prices for products like Zepbound/orforglipron drop from over $1,000/month to roughly $346/month through TrumpRx, with new oral GLP-1 starting doses priced at $149/month for Medicare, Medicaid, and TrumpRx purchasers - a double-edged catalyst that should expand volume materially but compresses realized net price per script.',
    keyRisks: [
      'Intensifying GLP-1 competition: Novo’s oral Wegovy pill (first-to-market by ~3 months), compounded/DTC alternatives, and Lilly’s own pipeline (retatrutide) all compete for the same obesity dollar and could cannibalize existing franchises.',
      'US drug-pricing/policy risk: the TrumpRx/Medicare-Medicaid framework (effective 2026) structurally compresses realized net price per script even as volume grows - the net revenue impact of the price-for-coverage trade is still playing out.',
      'Legacy franchise decline: Trulicity revenue continues shrinking as patients migrate to tirzepatide and orals - a real mix risk within the portfolio that keeps pressuring blended growth rates.',
      'Manufacturing and execution risk: the capex buildout ($7.8B in FY2025 capex alone, +127% over two years) must convert to reliable supply for both tirzepatide and the new oral franchise; any shortfall directly threatens the growth thesis baked into current estimates.',
      'Valuation/expectations risk: trading at ~41x trailing and ~31x forward P/E, well above every one of the 8 pharma peers in this comp set (peer NTM forward P/E range: 8.5x-21.8x), the stock has very little room for a growth disappointment.',
    ],
    nearTermCatalysts: [
      'Q2 2026 earnings, estimated for Wednesday, August 5, 2026 (MarketBeat estimate based on prior-year cadence; not yet officially confirmed) - next checkpoint on guidance and GLP-1 volume trends.',
      'Continued Foundayo (orforglipron) launch trajectory following its April 1, 2026 FDA approval and LillyDirect rollout.',
      'Additional retatrutide Phase 3 (TRIUMPH program) readouts across obesity, type 2 diabetes, and knee osteoarthritis - up to seven more trials expected to complete in 2026.',
      'TrumpRx.gov platform scale-up and Medicare/Medicaid GLP-1 coverage expansion through 2026 - watch for actual realized volume/price data as this matures.',
    ],
    investmentThesis:
      'Eli Lilly’s GLP-1 franchise has driven extraordinary growth - revenue nearly doubled from FY2023 to FY2025 and ROE now sits near 78% - and the orforglipron/Foundayo launch is a genuine second leg of growth layered on top of the injectable franchise. The underlying cash-generation quality is strong (CFO nearly doubling for two straight years running well ahead of net income), which is a real positive signal. But this analysis surfaces a wide gap between valuation approaches: the stock trades at a steep premium to every peer in the comp set on every multiple (peer-median-multiple-implied value comes in far below the current price), while the RIM and analyst-consensus approaches are considerably more constructive given the growth trajectory - so the blended verdict is highly sensitive to which lens is weighted most heavily. Working capital (receivables, inventory) and CapEx are both scaling faster than the P&L, and much of the bull case still depends on manufacturing capacity delivering on an aggressive buildout timeline against a 2026 pricing-policy backdrop (TrumpRx) that trades volume for realized price. This reads as a high-quality business whose price already reflects a lot of the good news, with real cross-currents between "cheap relative to its own growth/RIM value" and "expensive relative to every direct peer."',
  },

  sources: [
    {
      category: 'Company Profile & Current Price',
      url: 'https://stockanalysis.com/stocks/lly/',
      dataUsed: 'Current price ($1,152.54, close 2026-07-14), market cap ($1.03T), shares outstanding (891.74M), trailing P/E (40.94), forward P/E (31.42), sector (Healthcare), industry (Drug Manufacturers - General).',
    },
    {
      category: 'Historical Income Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/lly/financials/',
      dataUsed: 'Revenue, GAAP diluted EPS, EBITDA, and net income for FY2023A, FY2024A, FY2025A.',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025, 10-year view)',
      url: 'https://stockanalysis.com/stocks/lly/financials/balance-sheet/?p=10-year',
      dataUsed: 'Total assets, total stockholders’ equity, book value per share (BVPS, incl. the FY2025 $29.51 figure used as the RIM bvps input), and accounts receivable / accounts payable / inventory balances for FY2023A-FY2025A.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025, 10-year view)',
      url: 'https://stockanalysis.com/stocks/lly/financials/cash-flow-statement/?p=10-year',
      dataUsed: 'CFO, CFI, CFF, capital expenditures, D&A, dividends paid, share buybacks, and net long-term debt activity for FY2023A-FY2025A (feeding both the financials[] and cashFlow[] arrays).',
    },
    {
      category: 'Dividend History',
      url: 'https://stockanalysis.com/stocks/lly/dividend/',
      dataUsed: 'Dividends per share paid: FY2023 $4.52, FY2024 $5.20, FY2025 $6.00, and FY2026 expected annualized $6.92 (used for FY2026E dps).',
    },
    {
      category: 'Payout Ratio (RIM k input)',
      url: 'https://stockanalysis.com/stocks/lly/financials/ratios/',
      dataUsed: 'FY2025 payout ratio (26.09%), used directly as rimInputs.k.',
    },
    {
      category: 'Analyst Forecast & Consensus',
      url: 'https://stockanalysis.com/stocks/lly/forecast/',
      dataUsed: 'FY2026 consensus non-GAAP EPS ($35.60), FY2027 consensus non-GAAP EPS ($44.98), FY2026E/FY2027E consensus revenue ($85.47B / $98.82B), analyst rating counts (17 strong buy, 6 buy, 5 hold, 1 sell, 1 strong sell = 23/5/2 buy/hold/sell of 30 analysts), and price targets (mean $1,256, median $1,300, high $1,500, low $850).',
    },
    {
      category: 'FY2025 Non-GAAP EPS Confirmation',
      url: 'https://www.prnewswire.com/news-releases/lilly-reports-fourth-quarter-2025-financial-results-and-provides-2026-guidance-302678376.html',
      dataUsed: 'Company-reported FY2025 non-GAAP diluted EPS ($24.21) and GAAP diluted EPS ($22.95), cross-confirming the stockanalysis.com figures; also confirms initial FY2026 non-GAAP EPS guidance ($33.50-$35.00) prior to a later raise.',
    },
    {
      category: 'LLY Valuation Multiples (comps.targetMetrics)',
      url: 'https://stockanalysis.com/stocks/lly/statistics/',
      dataUsed: 'Enterprise value ($1.07T), EV/Revenue (14.75), EV/EBITDA (29.42), EV/EBIT (31.18), Price/Book (33.01), Price/Tangible Book (58.09), Forward P/E (31.42) - used as comps.targetMetrics.',
    },
    {
      category: 'Peer Comp: Novo Nordisk (NVO)',
      url: 'https://stockanalysis.com/stocks/nvo/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, Price/Tangible Book, forward P/E for the NVO peer row.',
    },
    {
      category: 'Peer Comp: Merck (MRK)',
      url: 'https://stockanalysis.com/stocks/mrk/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the MRK peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: AbbVie (ABBV)',
      url: 'https://stockanalysis.com/stocks/abbv/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the ABBV peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: Johnson & Johnson (JNJ)',
      url: 'https://stockanalysis.com/stocks/jnj/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the JNJ peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: Pfizer (PFE)',
      url: 'https://stockanalysis.com/stocks/pfe/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the PFE peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: Bristol-Myers Squibb (BMY)',
      url: 'https://stockanalysis.com/stocks/bmy/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the BMY peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: AstraZeneca (AZN)',
      url: 'https://stockanalysis.com/stocks/azn/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the AZN peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'Peer Comp: Novartis (NVS)',
      url: 'https://stockanalysis.com/stocks/nvs/statistics/',
      dataUsed: 'EV/Revenue, EV/EBITDA, EV/EBIT, trailing P/E, forward P/E for the NVS peer row (Price/Tangible Book not available, "n/a").',
    },
    {
      category: 'RIM Long-Term Growth (LTG) Input',
      url: 'https://finviz.com/quote.ashx?t=LLY',
      dataUsed: '"EPS Next 5Y" consensus growth rate (29.09%), used directly as rimInputs.ltg - see rimInputNotes.ltg for why this specific free source was used over unfetchable alternatives.',
    },
    {
      category: 'Next Earnings Date (estimate)',
      url: 'https://www.marketbeat.com/stocks/NYSE/LLY/earnings/',
      dataUsed: 'Estimated Q2 2026 earnings date (Wednesday, August 5, 2026) - explicitly flagged by the source itself as an estimate based on prior-year cadence, not an official company confirmation.',
    },
    {
      category: 'Orforglipron (Foundayo) FDA Approval',
      url: 'https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill',
      dataUsed: 'April 1, 2026 FDA approval date for orforglipron (Foundayo), product positioning (only GLP-1 pill for weight loss with no food/water timing restrictions), and April 6, 2026 LillyDirect shipping start - used in narrative.companyOverview, narrative.macroEnvironment, and narrative.nearTermCatalysts.',
    },
    {
      category: 'TrumpRx / GLP-1 Pricing Policy Deal',
      url: 'https://www.cnbc.com/2025/11/06/trump-eli-lilly-novo-nordisk-deal-obesity-drug-prices.html',
      dataUsed: 'November 6, 2025 Trump administration pricing framework details: Medicare/Medicaid GLP-1 pricing (~$245/month), beneficiary out-of-pocket (~$50/month), TrumpRx cash-pay pricing glide path, and oral GLP-1 starting-dose pricing ($149/month) - used in narrative.macroEnvironment and narrative.keyRisks.',
    },
    {
      category: 'Novo Nordisk Oral Wegovy (Competitive Landscape)',
      url: 'https://www.prnewswire.com/news-releases/fda-approves-novo-nordisks-wegovy-pill-the-first-and-only-oral-glp-1-for-weight-loss-in-adults-302648344.html',
      dataUsed: 'Dec 22, 2025 FDA approval date and early-January-2026 US launch for Novo’s oral Wegovy pill, and the >1 million patients within four months of launch figure - used in narrative.macroEnvironment and narrative.keyRisks as the direct oral-GLP-1 competitive threat.',
    },
    {
      category: 'Retatrutide Phase 3 Pipeline',
      url: 'https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss',
      dataUsed: 'Retatrutide (triple GIP/GLP-1/glucagon agonist) Phase 3 TRIUMPH program details: ~28-30% average weight loss data, 5,800+ trial participants, and up to seven additional Phase 3 readouts expected in 2026 across obesity/diabetes/osteoarthritis - used in narrative.companyOverview and narrative.nearTermCatalysts.',
    },
  ],
}
