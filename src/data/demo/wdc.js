// Cached demo data for Western Digital Corporation (WDC), researched via live
// web search on 2026-07-21. Not live-fetched at runtime - added as a fourth
// bundled analysis alongside MU/LLY/SNDK.
//
// Context: Western Digital is now a pure-play hard disk drive (HDD) company
// - its NAND flash business was spun off as Sandisk (SNDK) on February 21,
// 2025. WDC and Seagate (STX) form a duopoly (~85% combined HDD market
// share) riding the same AI-datacenter storage supercycle as memory names
// like MU and SNDK: 2026 nearline HDD production is reported sold out, 89%
// of revenue now comes from hyperscaler/AI cloud customers (vs. 5%
// consumer), and multi-year supply agreements with top hyperscalers extend
// into 2027-2028. The stock is up ~700%+ over the past 52 weeks
// ($66.04-$799.87 range) and jumped +11.77% to $545.62 on the as-of date
// alone, amid sector-wide storage/memory momentum, a Citi price-target
// raise to $800, and unconfirmed reports (July 9, 2026) of merger talks
// with Kioxia Holdings.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - EPS consensus is materially inconsistent across sources for this
//   ticker. stockanalysis.com's dedicated forecast page shows FY2026
//   non-GAAP EPS of just $9.96 (and an even older pass elsewhere showed
//   ~$8.93) - but this is hard to reconcile with trailing-twelve-month
//   diluted EPS already at $16.67 through Q3 FY2026 alone, or with
//   stockanalysis.com's own statistics-page forward P/E of 30.13 (which
//   implies forward EPS of ~$18.11 at the current price). WallStreetZen's
//   more recently updated estimates ($18.65 FY2026, $18.63 FY2027) agree
//   closely with that implied figure, so those were used for
//   rimInputs.fy1Eps/fy2Eps instead of the stale $9.96/$8.93 figures - see
//   rimInputNotes.fy1Eps.
// - FY2027 revenue consensus is paywalled ("Pro" data) on stockanalysis.com,
//   same gap pattern seen on MU/SNDK - left null rather than estimated.
// - Analyst target median wasn't cleanly reported separately from the mean
//   (only mean/high/low were available) - left null rather than guessed,
//   same as SNDK.
// - FY2025's book value per share ($14.79) is likely still depressed by the
//   February 2025 Sandisk spinoff distribution - TTM book value has since
//   rebounded to $25.71/share as retained earnings rebuilt through the
//   earnings supercycle. Used the last-completed-FYE figure per the
//   documented RIM convention anyway (see rimInputNotes.bvps) rather than
//   override it.
// - Historical per-share dividend figures (financials[].dps) are
//   approximated from stated aggregate dividends-paid ÷ current shares
//   outstanding (344.68M), not a precise historical share-count-weighted
//   figure - a light estimate, same approach MU used for its own forward
//   dps figures.

export const wdcDemo = {
  ticker: 'WDC',
  companyName: 'Western Digital Corporation',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Computer Hardware (Hard Disk Drives)',
  asOfDate: '2026-07-21',
  currentPrice: 545.62,
  marketCap: 188_070_000_000,
  sharesOutstanding: 344_680_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending the last Friday in June (FY2025 ended June 27, 2025); FY2026 ended in late June/early July 2026 but Q4/full-year results are not yet reported (due August 5, 2026)',

  rimInputs: {
    fy1Eps: 18.65,
    fy2Eps: 18.63,
    ltg: 0.2872,
    bvps: 14.79,
    r: 0.08,
    k: 0.0273,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 13,
  },
  rimInputNotes: {
    fy1Eps: 'Used WallStreetZen’s current FY2026/FY2027 consensus ($18.65 / $18.63) rather than stockanalysis.com’s forecast-page FY2026 figure ($9.96), which looks stale - it’s well below trailing-twelve-month diluted EPS ($16.67 through Q3 FY2026 alone) and implies a Q4 loss that contradicts the "sold out 2026 capacity" guidance. The WallStreetZen figures agree closely with the ~$18.11 forward EPS implied by stockanalysis.com’s own statistics-page forward P/E (30.13) at the current price, which is why they were used instead.',
    ltg: 'WallStreetZen’s stated long-term earnings growth forecast (28.72%/yr).',
    bvps: 'Total FY2025 (ended 6/27/25) stockholders’ equity ($5,540M) / diluted shares, per stockanalysis.com balance sheet ($14.79/share stated directly) - the RIM convention (last completed fiscal year-end). Note this is likely still depressed by the February 2025 Sandisk spinoff distribution; TTM book value has since rebounded to $25.71/share.',
    k: 'stockanalysis.com’s stated dividend payout ratio (2.73%), off the current $0.60/share annualized dividend rate.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 15.78,
      tevEbitda: 47.32,
      tevEbit: 50.49,
      pDilutedEps: 26.69,
      pTangibleBv: 34.97,
      ntmTevRevenue: 14.44,
      ntmFwdPe: 30.13,
    },
    peers: [
      { ticker: 'STX', name: 'Seagate Technology Holdings', tevRevenue: 18.63, tevEbitda: 58.36, tevEbit: 63.16, pDilutedEps: 76.00, pTangibleBv: null, ntmTevRevenue: 17.00, ntmFwdPe: 31.64 },
      { ticker: 'MU', name: 'Micron Technology, Inc.', tevRevenue: 12.04, tevEbitda: 15.93, tevEbit: 18.33, pDilutedEps: 22.19, pTangibleBv: 11.20, ntmTevRevenue: 8.41, ntmFwdPe: 6.85 },
      { ticker: 'SNDK', name: 'Sandisk Corporation', tevRevenue: 19.46, tevEbitda: 46.51, tevEbit: 47.78, pDilutedEps: 59.17, pTangibleBv: 19.36, ntmTevRevenue: 12.96, ntmFwdPe: 9.73 },
    ],
    note: 'Peer set is the direct storage/memory comp group (HDD duopoly partner STX, memory makers MU/SNDK) - the same cluster used in SNDK’s own peer set, mirrored back. MU’s and SNDK’s multiples here are reused from their own demo analyses, as-of 2026-07-14 (~1 week older than this file’s 2026-07-21 as-of date), rather than re-derived this pass - same approach SNDK’s own file used when it reused MU’s figures. P/Tangible BV is "n/a" for STX (goodwill-heavy, per stockanalysis.com). WDC’s own NTM TEV/Revenue (14.44x) and STX’s (17.00x) are both approximated as current enterprise value ÷ FY2026 consensus revenue - the same current-fiscal-year-as-NTM-proxy approach MU/SNDK use, since both companies’ FY2026 had just ended (or was about to) as of each file’s as-of date. See top-of-file note on the FY2026 EPS consensus data-quality issue found for this peer group.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 6255, epsGaap: -2.91, epsNonGaap: null, cfps: -1.18, ebitda: 280, ebit: -548, netIncome: -902, da: 828, cfo: -408, capex: 821, fcf: -1229, roe: -0.0762, dps: 0, totalAssets: 24546, totalEquity: 11840 },
    { year: 'FY2024A', isEstimate: false, revenue: 6317, epsGaap: -2.51, epsNonGaap: null, cfps: -0.85, ebitda: 165, ebit: -403, netIncome: -765, da: 568, cfo: -294, capex: 487, fcf: -781, roe: -0.0693, dps: 1.47, totalAssets: 24188, totalEquity: 11047 },
    { year: 'FY2025A', isEstimate: false, revenue: 9520, epsGaap: 4.45, epsNonGaap: null, cfps: 4.91, ebitda: 2785, ebit: 2334, netIncome: 1643, da: 451, cfo: 1691, capex: 412, fcf: 1279, roe: 0.2966, dps: 0.13, totalAssets: 14002, totalEquity: 5540 },
    { year: 'FY2026E', isEstimate: true, revenue: 12870, epsGaap: null, epsNonGaap: 18.65, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.60, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 18.63, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.60, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2023A-FY2025A are post-spinoff HDD-only restated results (Sandisk/Flash carved out February 2025). FY2026E/FY2027E non-GAAP EPS reflect WallStreetZen’s more current consensus ($18.65/$18.63) rather than an older, harder-to-reconcile figure found on stockanalysis.com’s forecast page ($9.96) - see the top-of-file note. FY2027E revenue was paywalled ("Pro" data) on stockanalysis.com as of 2026-07-21 and is left null rather than guessed.',

  cashFlow: [
    { year: 'FY2023A', cfo: -408, cfi: -762, cff: 875, capex: 821, da: 828, dividendsPaid: 0, buybacks: 80, netDebtActivity: 0, receivables: 1598, payables: 1585, inventory: 3698 },
    { year: 'FY2024A', cfo: -294, cfi: -27, cff: 187, capex: 487, da: 568, dividendsPaid: 505, buybacks: 88, netDebtActivity: 896, receivables: 1231, payables: 1054, inventory: 1387 },
    { year: 'FY2025A', cfo: 1691, cfi: 150, cff: -1612, capex: 412, da: 451, dividendsPaid: 44, buybacks: 262, netDebtActivity: 56, receivables: 1486, payables: 1266, inventory: 1291 },
  ],
  cashFlowNote: 'Unlike MU’s expanding fab buildout, WDC’s CapEx actually declined through the ramp ($821M FY23 -> $487M FY24 -> $412M FY25) while revenue grew +52% over the same span - HDD manufacturing is far less capital-intensive per dollar of revenue than leading-edge memory fabs. Inventory collapsed from $3,698M (FY23) to $1,291M (FY25) even as revenue grew, consistent with the "sold out capacity" narrative - product is shipping immediately rather than building up on hand. CFO swung from -$408M (FY23) to +$1,691M (FY25) as the cycle turned. Dividends were cut sharply in FY2025 ($44M vs. $505M in FY2024) before being reset to a new $0.60/share annualized rate more recently.',

  analystViews: {
    targetMean: 633.83,
    targetMedian: null,
    targetHigh: 1050.0,
    targetLow: 415.0,
    numAnalysts: 26,
    buy: 22,
    hold: 3,
    sell: 1,
  },

  narrative: {
    companyOverview:
      'Western Digital is now a pure-play hard disk drive (HDD) manufacturer - its NAND flash business was spun off as Sandisk (SNDK) on February 21, 2025. WDC and Seagate (STX) form a duopoly controlling roughly 85% of the global HDD market, with WDC holding a slight edge (~45% share) in the lucrative high-capacity "nearline" enterprise segment used by cloud data centers. UltraSMR technology - which packs more storage density into a drive at no extra manufacturing cost - now makes up more than half of WDC’s nearline drive mix, and the company has begun shipping 40TB+ drives using energy-assisted magnetic recording, with a roadmap toward 100TB-class drives by the end of the decade. WDC reports it is again in merger discussions with Japan’s Kioxia Holdings (per reports first surfacing July 9, 2026) - a potential deal that would reshape the NAND flash landscape, though this remains unconfirmed and would represent WDC re-entering flash rather than staying HDD-only.',
    macroEnvironment:
      'HDDs remain the default choice for the massive bulk/archive storage AI training and inference workloads require, at roughly one-seventh the cost per terabyte of SSDs. WDC now generates 89% of revenue from hyperscaler/AI cloud customers versus just 5% from consumer, and reports its entire calendar-2026 nearline manufacturing capacity is essentially sold out, with firm purchase orders from its top seven customers secured through 2026 and multi-year agreements with three of its top five hyperscaler customers extending into 2027-2028. The stock has risen roughly 700%+ over the past 52 weeks (range $66.04-$799.87) and jumped +11.77% to $545.62 on the as-of date alone, part of a broader memory/storage sector rally alongside a Citi price-target raise to $800 and the Kioxia merger speculation.',
    keyRisks: [
      'Classic storage-cycle oversupply risk: HDD pricing power today reflects disciplined supply from just two players (WDC/STX) - if either (or new entrants) over-build capacity for 2027-2028 in response to today’s AI demand, the current pricing environment could reverse quickly, as memory/storage cycles historically have.',
      'Extreme customer concentration: 89% of revenue now comes from hyperscaler/AI cloud, and firm orders from just seven customers anchor near-term results - any pullback in hyperscaler AI capex spending, or a shift in allocation away from WDC toward Seagate, would hit results disproportionately.',
      'Technology transition execution risk: the industry’s move to HAMR (heat-assisted magnetic recording) and beyond involves difficult physics; manufacturing yield problems could let Seagate take share in the higher-margin nearline segment.',
      'Kioxia merger discussions (reported July 9, 2026) are unconfirmed and speculative - if pursued, a re-entry into NAND flash would be a significant strategic pivot for a company that just spun flash out 17 months earlier, with associated integration, financing, and execution risk.',
      'Consensus EPS estimates for this ticker conflict significantly across sources (see rimInputNotes.fy1Eps) - a sign sell-side models are still catching up to the pace of the earnings ramp, which cuts both ways and adds real estimation uncertainty on top of the already-wide $415-$1,050 analyst price-target range (26 analysts).',
      'The three valuation approaches disagree sharply here: RIM implies meaningful upside, analyst consensus implies modest upside, but peer-median NTM forward P/E implies a steep discount, because peers MU and SNDK currently trade at much lower forward P/E multiples (6.9x/9.7x) than WDC and Seagate do (30.1x/31.6x) - not obviously a WDC-specific problem, but a real sign the market is pricing memory (MU/SNDK) and HDD (WDC/STX) names very differently within the same "AI storage supercycle" story, which the comps method doesn’t adjust for.',
    ],
    nearTermCatalysts: [
      'Q4/full-year FY2026 earnings expected August 5, 2026 - first full look at how the guided-sold-out capacity translated into actual Q4 results and sets the FY2027 tone.',
      'Any confirmation, denial, or further detail on the reported Kioxia Holdings merger discussions (first reported July 9, 2026).',
      'Additional multi-year supply agreement announcements with hyperscaler customers extending visibility further into 2027-2028.',
      'HAMR technology and roadmap progress toward 100TB-class nearline drives.',
    ],
    investmentThesis:
      'Western Digital is a rare, clean way to play AI-driven storage demand without memory-fab capital intensity: as a pure-play HDD duopoly member with Seagate, it has 2026 nearline capacity sold out, 89% hyperscaler revenue concentration, and multi-year agreements extending into 2027-2028, all while CapEx has actually declined through the ramp (unlike memory peers) and inventory has stayed lean rather than building up. But the three valuation approaches here land in genuinely different places rather than converging: RIM’s terminal price ($709.77) implies solid upside and the analyst consensus mean ($633.83) implies modest upside, while the comps approach - peer median NTM forward P/E ($9.73x, pulled down hard by MU’s 6.9x and SNDK’s 9.7x forward multiples versus WDC’s own 30.1x and Seagate’s 31.6x) - implies a steep discount, since it doesn’t adjust for how differently the market is currently pricing memory names versus HDD names within the same "AI storage" story. Blended, that’s a roughly flat picture (-6.8% to the mean fair value) rather than a clear call either way. At $545.62, after a 700%+ 52-week run and an unusually wide $415-$1,050 analyst target range (26 analysts), this reads less like an obvious mispricing and more like a name where the fundamentals (sold-out capacity, multi-year hyperscaler LTAs, disciplined two-player supply) are genuinely strong but already substantially reflected in the price - worth watching the August 5, 2026 earnings print and any Kioxia developments rather than treating current levels as a clean entry, with classic storage-cycle oversupply the tail risk if new capacity eventually comes online.',
  },

  sources: [
    {
      category: 'Company Profile & Current Price',
      url: 'https://stockanalysis.com/stocks/wdc/',
      dataUsed: 'Current price ($545.62, intraday +11.77%), 52-week range ($66.04-$799.87), sector (Technology), industry (Computer Hardware), employee count context for narrative.',
    },
    {
      category: 'Valuation Multiples / Statistics (WDC)',
      url: 'https://stockanalysis.com/stocks/wdc/statistics/',
      dataUsed: 'comps.targetMetrics: tevRevenue (15.78), tevEbitda (47.32), tevEbit (50.49), pDilutedEps (26.69, trailing P/E), pTangibleBv (34.97), ntmFwdPe (30.13, stated forward P/E); market cap ($188.07B), enterprise value ($185.87B), shares outstanding (344.68M), dividend payout ratio (2.73%) used for rimInputs.k.',
    },
    {
      category: 'Historical Income Statement (FY2023-FY2025, TTM)',
      url: 'https://stockanalysis.com/stocks/wdc/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2023A/FY2024A/FY2025A; TTM diluted EPS ($16.67) used to sanity-check FY2026 consensus EPS figures (see fy1Eps note).',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/wdc/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($14.79 FY2025, used as rimInputs.bvps); TTM book value ($25.71/share) used for the spinoff-distortion note; total debt and cash context for narrative.',
    },
    {
      category: 'Balance Sheet Detail - Receivables/Payables/Inventory',
      url: 'https://stockanalysis.com/stocks/wdc/financials/balance-sheet/?p=quarterly',
      dataUsed: 'cashFlow[].receivables, payables, inventory for FY2023A/24A/25A.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/wdc/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2023A/24A/25A.',
    },
    {
      category: 'Analyst Consensus & Price Targets (WDC)',
      url: 'https://stockanalysis.com/stocks/wdc/forecast/',
      dataUsed: 'analystViews (26 analysts, targetMean $633.83/targetHigh $1,050/targetLow $415, 22 buy/3 hold/1 sell); FY2026E revenue ($12.87B) used for comps.targetMetrics.ntmTevRevenue; FY2026E non-GAAP EPS ($9.96) checked but not used - see fy1Eps note.',
    },
    {
      category: 'More Current EPS/Revenue Estimates (WDC)',
      url: 'https://www.wallstreetzen.com/stocks/us/nasdaq/wdc/stock-forecast',
      dataUsed: 'rimInputs.fy1Eps (18.65, "2026") and fy2Eps (18.63, "2027"); rimInputs.ltg (0.2872, stated long-term earnings growth forecast) - used in place of stockanalysis.com’s forecast-page EPS figures, which appeared stale (see top-of-file note).',
    },
    {
      category: 'Peer STX - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/stx/statistics/',
      dataUsed: 'Seagate tevRevenue (18.63), tevEbitda (58.36), tevEbit (63.16), pDilutedEps (76.00), pTangibleBv (n/a - goodwill-heavy), ntmFwdPe (31.64, stated forward P/E), enterprise value ($205.08B).',
    },
    {
      category: 'Peer STX - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/stx/forecast/',
      dataUsed: 'Seagate FY2026 consensus revenue ($12.06B), used with EV to compute comps.peers[STX].ntmTevRevenue (17.00).',
    },
    {
      category: 'AI Datacenter HDD Demand & Sold-Out 2026 Capacity',
      url: 'https://finance.yahoo.com/news/western-digital-doubles-down-ai-070806616.html',
      dataUsed: 'narrative.macroEnvironment/companyOverview: 89% hyperscaler/AI cloud revenue mix, 2026 nearline capacity sold out, top-7-customer firm orders through 2026, hyperscaler LTAs into 2027-2028, UltraSMR >50% of nearline mix.',
    },
    {
      category: 'HDD Duopoly & Competitive Dynamics',
      url: 'https://www.barchart.com/story/news/1689529/seagate-and-western-digital-are-a-hard-disk-drive-duopoly-barchart-ranks-the-storage-stocks-here',
      dataUsed: 'narrative.companyOverview/keyRisks: WDC/STX ~85% combined HDD market share, WDC’s ~45% share edge in nearline, HAMR technology transition risk framing.',
    },
    {
      category: 'Today’s Price Move, Citi Price Target, Kioxia Merger Reports',
      url: 'https://stockstotrade.com/news/western-digital-corporation-wdc-news-2026_07_20/',
      dataUsed: 'narrative.macroEnvironment/keyRisks/nearTermCatalysts: +4.77%+ sector momentum context, Citi price target raise to $800, Kioxia Holdings merger discussion reports (July 9, 2026).',
    },
    {
      category: 'Next Earnings Date Confirmation',
      url: 'https://investor.wdc.com/news-releases/news-release-details/wd-announce-fourth-quarter-and-fiscal-year-2026-financial',
      dataUsed: 'Q4/FY2026 earnings date (August 5, 2026) cited in fiscalYearEndDescription and narrative.nearTermCatalysts.',
    },
  ],
}
