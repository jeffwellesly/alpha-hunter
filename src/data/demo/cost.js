// Cached demo data for Costco Wholesale Corporation (COST), researched via
// live web search on 2026-07-21. Not live-fetched at runtime - added as a
// fifth bundled analysis alongside MU/LLY/SNDK/WDC.
//
// Context: Costco is the steadiest, most-established name in this bundle -
// a membership warehouse club with a ~92.1% US/Canada renewal rate (89.7%
// worldwide) and 30 years of Kirkland Signature private-label growth (now
// ~28% of net sales). It's opening 35 new warehouses in fiscal 2026 (vs. 27
// in FY2025) and e-commerce grew +22.6% last quarter. Unlike the other
// names in this bundle, there's no hypergrowth-EPS-consensus data-quality
// problem here - trailing and forward figures reconcile cleanly across
// sources. The interesting result instead is on the valuation side: Costco
// trades at a persistent premium multiple (46.7x trailing / 42.4x forward)
// to every peer used here (BJ's Wholesale, Walmart, Target), and the RIM
// model - which assumes some fade off Costco's currently very high ROE -
// also lands well below the current price. Both independent legs (comps
// and RIM) point the same direction here, which is worth noting since nothing
// in the code is set up to make that happen; it's just what a genuinely
// premium-priced compounder looks like run through this methodology.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - FY2024's dividendsPaid ($9,041M, vs. ~$1,251M-$2,183M in the surrounding
//   years) includes a one-time $15/share special dividend paid January
//   2024, not a change in the regular dividend policy - see cashFlowNote.
// - rimInputs.k (payout ratio, 27.87%) is stockanalysis.com's stated ratio
//   off the regular dividend rate; it does NOT include the FY2024 special
//   dividend, which would badly distort a naively-computed multi-year
//   payout ratio.
// - financials[].dps for FY2023A-FY2025A are approximated as aggregate
//   dividends paid ÷ current shares outstanding (443.48M), not a precise
//   historical share-count-weighted figure - same light-estimate approach
//   used for WDC. FY2026E/FY2027E dps left null rather than guessed, since
//   no confirmed forward per-share dividend figure was captured this pass.
// - FY2027E revenue consensus wasn't explicitly available on
//   stockanalysis.com's forecast page (only FY2026E) - left null.
// - Peer NTM TEV/Revenue figures use each peer's own "next fiscal year"
//   consensus revenue, which lands on different calendar timing per peer
//   (COST/BJ/WMT/TGT all have different fiscal year-ends) - approximate by
//   construction, same trade-off already accepted elsewhere in this app's
//   peer-multiple methodology.
// - Analyst rating counts (19 Strong Buy / 3 Buy / 13 Hold / 1 Sell / 1
//   Strong Sell = 37) didn't reconcile exactly with a separately-stated "34
//   analysts" figure on the same page - used the rating-breakdown total
//   (37) since it ties out internally.

export const costDemo = {
  ticker: 'COST',
  companyName: 'Costco Wholesale Corporation',
  exchange: 'NASDAQ',
  sector: 'Consumer Defensive',
  industry: 'Discount Stores (Warehouse Clubs)',
  asOfDate: '2026-07-21',
  currentPrice: 929.22,
  marketCap: 412_090_000_000,
  sharesOutstanding: 443_480_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending the Sunday closest to August 31 (FY2025 ended August 31, 2025; FY2026 ends late August 2026, results due ~September 24, 2026)',

  rimInputs: {
    fy1Eps: 20.57,
    fy2Eps: 22.65,
    ltg: 0.096,
    bvps: 65.57,
    r: 0.08,
    k: 0.2787,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 11,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus diluted EPS (34-37 analysts per stockanalysis.com), consistent with TTM diluted EPS already at $19.88 - no reconciliation issue here, unlike some other names in this bundle.',
    ltg: 'Simply Wall St’s stated long-term EPS growth forecast (9.6%/yr) - the most commonly-cited figure across sources checked (range seen: 8.8%-9.6%).',
    bvps: 'Total FY2025 (ended 8/31/25) stockholders’ equity ($29,164M) / diluted shares, per stockanalysis.com balance sheet ($65.57/share stated directly) - the RIM convention (last completed fiscal year-end).',
    k: 'stockanalysis.com’s stated dividend payout ratio (27.87%), off the regular dividend rate - excludes the FY2024 one-time $15/share special dividend (see top-of-file note).',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 1.36,
      tevEbitda: 29.03,
      tevEbit: 35.66,
      pDilutedEps: 46.74,
      pTangibleBv: 12.30,
      ntmTevRevenue: 1.33,
      ntmFwdPe: 42.44,
    },
    peers: [
      { ticker: 'BJ', name: 'BJ’s Wholesale Club Holdings', tevRevenue: 0.67, tevEbitda: 13.07, tevEbit: 17.76, pDilutedEps: 21.23, pTangibleBv: 11.52, ntmTevRevenue: 0.62, ntmFwdPe: 19.92 },
      { ticker: 'WMT', name: 'Walmart Inc.', tevRevenue: 1.30, tevEbitda: 21.04, tevEbit: 31.25, pDilutedEps: 38.86, pTangibleBv: 13.27, ntmTevRevenue: 1.20, ntmFwdPe: 37.04 },
      { ticker: 'TGT', name: 'Target Corporation', tevRevenue: 0.74, tevEbitda: 9.42, tevEbit: 15.17, pDilutedEps: 18.30, pTangibleBv: 3.84, ntmTevRevenue: 0.72, ntmFwdPe: 16.20 },
    ],
    note: 'Peer set is the direct big-box/warehouse retail comp group: BJ’s is the closest pure-play warehouse-club peer (Sam’s Club, the other true warehouse comp, doesn’t trade separately from Walmart), plus Walmart and Target for scale/general-merchandise context. Costco trades at a persistent, well-known premium to all three on every multiple here except P/Tangible BV - this is a real, durable characteristic of the stock (membership-model moat, best-in-class renewal rates), not a data artifact, but it means peer-median comps will structurally read as "expensive" for this name regardless of period.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 242290, epsGaap: 14.16, epsNonGaap: null, cfps: 24.96, ebitda: 10191, ebit: 8114, netIncome: 6292, da: 2077, cfo: 11068, capex: 4323, fcf: 6745, roe: 0.2511, dps: 2.82, totalAssets: 68994, totalEquity: 25058 },
    { year: 'FY2024A', isEstimate: false, revenue: 254453, epsGaap: 16.56, epsNonGaap: null, cfps: 25.57, ebitda: 11522, ebit: 9285, netIncome: 7367, da: 2237, cfo: 11339, capex: 4710, fcf: 6629, roe: 0.3119, dps: 20.39, totalAssets: 69831, totalEquity: 23622 },
    { year: 'FY2025A', isEstimate: false, revenue: 275235, epsGaap: 18.21, epsNonGaap: null, cfps: 30.07, ebitda: 12809, ebit: 10383, netIncome: 8099, da: 2426, cfo: 13335, capex: 5498, fcf: 7837, roe: 0.2777, dps: 4.92, totalAssets: 77099, totalEquity: 29164 },
    { year: 'FY2026E', isEstimate: true, revenue: 301430, epsGaap: null, epsNonGaap: 20.57, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 22.65, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'Steady, consistent grower - revenue up +52% (FY23A->TTM) and diluted EPS up from $14.16 to a TTM $19.88, with no restatement/spinoff discontinuities to flag (unlike WDC/SNDK elsewhere in this bundle). FY2024A’s dps ($20.39 approximated) is inflated by the one-time $15/share special dividend paid January 2024 - see top-of-file note. FY2027E revenue consensus wasn’t available free on stockanalysis.com as of 2026-07-21 and is left null rather than guessed.',

  cashFlow: [
    { year: 'FY2023A', cfo: 11068, cfi: -4972, cff: -2614, capex: 4323, da: 2077, dividendsPaid: 1251, buybacks: 979, netDebtActivity: -93, receivables: 2285, payables: 17483, inventory: 16651 },
    { year: 'FY2024A', cfo: 11339, cfi: -4409, cff: -10764, capex: 4710, da: 2237, dividendsPaid: 9041, buybacks: 1015, netDebtActivity: -571, receivables: 2721, payables: 19421, inventory: 18647 },
    { year: 'FY2025A', cfo: 13335, cfi: -5311, cff: -3775, capex: 5498, da: 2426, dividendsPaid: 2183, buybacks: 1296, netDebtActivity: -149, receivables: 3203, payables: 19783, inventory: 18116 },
  ],
  cashFlowNote: 'FY2024’s dividendsPaid ($9,041M) and the resulting deeply negative CFF (-$10,764M) reflect a one-time $15/share special dividend paid January 2024, not a change in regular dividend policy - FY2023 ($1,251M) and FY2025 ($2,183M) are more representative of the ongoing regular-dividend cash outflow. CFO has grown every year (+20.5% FY23->FY25) and comfortably funds both CapEx (which is also rising, funding the accelerated 35-warehouse FY2026 opening pace) and shareholder returns without net new debt - net debt activity was negative (net repayment) in all three years shown, an unusually clean financing profile.',

  analystViews: {
    targetMean: 1077.0,
    targetMedian: 1100.0,
    targetHigh: 1315.0,
    targetLow: 740.0,
    numAnalysts: 37,
    buy: 22,
    hold: 13,
    sell: 2,
  },

  narrative: {
    companyOverview:
      'Costco operates membership-only warehouse clubs, generating revenue from a mix of low-margin bulk merchandise sales and high-margin, extremely sticky membership fees (up 14% year-over-year last quarter to $1.329B). Kirkland Signature, its private label, just marked its 30th anniversary and now accounts for roughly 28% of net sales, growing faster than the overall business and helping offset tariff-driven input cost inflation. The company is accelerating store growth, opening 35 new warehouses in fiscal 2026 (including 5 relocations) versus 27 in fiscal 2025, and e-commerce continues to scale quickly, with online sales up 22.6% in the most recent quarter - still a modest share of total revenue relative to Amazon or Walmart’s digital operations, but a clear growth vector.',
    macroEnvironment:
      'Costco’s membership renewal rate sits at 92.1% in the US/Canada and 89.7% worldwide - among the highest in all of retail, and a figure that has held firm through 2026 even after the September 2024 membership fee increase (individual: $60 -> $65/year; executive: $120 -> $130/year), suggesting real pricing power. Management describes navigating tariff pressure "as well as anyone" in the industry, using scale and private-label penetration to blunt the impact, though a tariff-related lawsuit is reportedly still pending. The stock has actually declined slightly over the past 52 weeks (-2.29%) despite the strong operating results, trading at $929.22 - a valuation the market has kept persistently rich (46.7x trailing earnings) through the period.',
    keyRisks: [
      'Persistent valuation premium: Costco trades at 42.4x forward earnings versus 16.2x-37.0x for Target, BJ’s, and Walmart - both this file’s comps analysis and its RIM model (which assumes some fade off Costco’s currently very high ~25-31% ROE) point to significant downside from current levels, a genuinely two-sided signal rather than a near-universal "Buy" case.',
      'Intensifying e-commerce competition from Amazon and an increasingly omnichannel-focused Walmart - Costco’s digital sales are growing fast off a small base but remain a modest share of the business relative to those two.',
      'Tariff uncertainty and a reported pending tariff-related lawsuit add cost and legal-outcome uncertainty on top of already-thin (~12.8%) gross margins.',
      'Membership growth/renewal deceleration risk: renewal rates near 92-93% leave little room to improve and real downside if the recent fee increase or macro pressure eventually dents the trend that has held up so far.',
      'Slowing same-store/comp growth or a broader consumer pullback would hit a business whose entire model depends on high volume moving through thin merchandise margins.',
    ],
    nearTermCatalysts: [
      'Q4/full-year FY2026 earnings expected ~September 24, 2026 - will show whether the accelerated 35-warehouse opening pace and membership fee increase are still translating into comparable growth.',
      'Monthly comparable-sales releases, a Costco-specific disclosure cadence most large retailers don’t provide, giving more frequent read-throughs on the business than a typical quarterly-only name.',
      'Further Kirkland Signature penetration data and e-commerce growth-rate trends as tariff pressure plays out through the back half of calendar 2026.',
      'Any developments in the reported tariff-related litigation.',
    ],
    investmentThesis:
      'Costco is, by a wide margin, the highest-quality business in this bundle - a 92%+ renewal rate, a private-label engine (Kirkland, 28% of sales) still gaining share, accelerating unit growth (35 new warehouses in FY2026), and a financing profile clean enough to fund all of it from operating cash flow while still repaying debt every year. The problem is that none of that is a secret: at $929.22 the stock trades at 46.7x trailing and 42.4x forward earnings, a large and persistent premium to every peer used here (16.2x-37.0x), and running the numbers through both the comps method (peer-median NTM forward P/E, $409.75 implied) and the RIM model ($382.49 implied, which explicitly assumes some fade off Costco’s currently very high ROE) points to real downside from current levels - only the analyst-consensus leg ($1,088.50 mean/median) sees further upside. Blended, that’s a Sell at the current price, not because the business is deteriorating, but because two independent valuation methods agree the price already assumes a very high bar of continued execution. This is less "something is wrong with Costco" and more "a genuinely excellent business priced for perfection" - worth revisiting if the multiple compresses toward peers or if the RIM inputs (particularly the ROE fade assumption) don’t hold up against actual results.',
  },

  sources: [
    {
      category: 'Company Profile & Valuation Multiples (COST)',
      url: 'https://stockanalysis.com/stocks/cost/statistics/',
      dataUsed: 'Current price ($929.22), market cap ($412.09B), enterprise value ($400.33B), shares outstanding (443.48M); comps.targetMetrics: tevRevenue (1.36), tevEbitda (29.03), tevEbit (35.66), pDilutedEps (46.74, trailing P/E), pTangibleBv (12.30), ntmFwdPe (42.44, stated forward P/E); dividend payout ratio (27.87%) used for rimInputs.k.',
    },
    {
      category: 'Historical Income Statement (FY2023-FY2025, TTM)',
      url: 'https://stockanalysis.com/stocks/cost/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2023A/FY2024A/FY2025A; TTM diluted EPS ($19.88) used to cross-check FY2026 consensus EPS (no inconsistency found, unlike other names in this bundle).',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/cost/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($65.57 FY2025, used as rimInputs.bvps); total debt and cash context for narrative.',
    },
    {
      category: 'Balance Sheet Detail - Receivables/Payables/Inventory',
      url: 'https://stockanalysis.com/stocks/cost/financials/balance-sheet/?p=quarterly',
      dataUsed: 'cashFlow[].receivables, payables, inventory for FY2023A/24A/25A.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/cost/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2023A/24A/25A, including the FY2024 special-dividend spike.',
    },
    {
      category: 'Analyst Consensus & Forward Estimates (COST)',
      url: 'https://stockanalysis.com/stocks/cost/forecast/',
      dataUsed: 'rimInputs.fy1Eps (20.57, FY2026) and fy2Eps (22.65, FY2027); FY2026E revenue ($301.43B) used for comps.targetMetrics.ntmTevRevenue; analystViews (37 analysts by rating breakdown, targetMean $1,077/targetMedian $1,100/targetHigh $1,315/targetLow $740, 22 buy/13 hold/2 sell).',
    },
    {
      category: 'Long-Term Growth (LTG) Input',
      url: 'https://simplywall.st/stocks/us/consumer-retailing/nasdaq-cost/costco-wholesale/future',
      dataUsed: 'rimInputs.ltg (0.096) - Simply Wall St’s stated long-term EPS growth forecast (9.6%/yr).',
    },
    {
      category: 'Peer BJ - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/bj/statistics/',
      dataUsed: 'BJ’s Wholesale tevRevenue (0.67), tevEbitda (13.07), tevEbit (17.76), pDilutedEps (21.23), pTangibleBv (11.52), ntmFwdPe (19.92, stated forward P/E), enterprise value ($14.62B).',
    },
    {
      category: 'Peer BJ - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/bj/forecast/',
      dataUsed: 'BJ’s next-fiscal-year revenue consensus ($23.47B), used with EV to compute comps.peers[BJ].ntmTevRevenue (0.62).',
    },
    {
      category: 'Peer WMT - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/wmt/statistics/',
      dataUsed: 'Walmart tevRevenue (1.30), tevEbitda (21.04), tevEbit (31.25), pDilutedEps (38.86), pTangibleBv (13.27), ntmFwdPe (37.04, stated forward P/E), enterprise value ($943.31B).',
    },
    {
      category: 'Peer WMT - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/wmt/forecast/',
      dataUsed: 'Walmart next-fiscal-year revenue consensus ($787.00B), used with EV to compute comps.peers[WMT].ntmTevRevenue (1.20).',
    },
    {
      category: 'Peer TGT - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/tgt/statistics/',
      dataUsed: 'Target tevRevenue (0.74), tevEbitda (9.42), tevEbit (15.17), pDilutedEps (18.30), pTangibleBv (3.84), ntmFwdPe (16.20, stated forward P/E), enterprise value ($78.63B).',
    },
    {
      category: 'Peer TGT - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/tgt/forecast/',
      dataUsed: 'Target next-fiscal-year revenue consensus ($108.90B), used with EV to compute comps.peers[TGT].ntmTevRevenue (0.72).',
    },
    {
      category: 'Warehouse Openings & Kirkland Signature',
      url: 'https://www.msn.com/en-us/money/companies/costco-plans-35-new-warehouses-in-fiscal-2026-as-member-upgrades-and-digital-sales-accelerate/ar-AA1Nkglz',
      dataUsed: 'narrative.companyOverview: 35 new warehouses planned for FY2026 (vs. 27 in FY2025, including 5 relocations), membership fee income growth (+14% YoY to $1.329B), Kirkland Signature 30th anniversary and ~28% of net sales.',
    },
    {
      category: 'Membership Renewal Rates & Fee History',
      url: 'https://blog.mukundmohan.online/cost-costco-membership-renewal-rates-near-93-tell-you-everything-you-need-to-know-about-this-retailers-moat/',
      dataUsed: 'narrative.macroEnvironment/keyRisks: 92.1% US/Canada and 89.7% worldwide renewal rates holding through 2026; September 2024 membership fee increase ($60->$65 individual, $120->$130 executive).',
    },
    {
      category: 'Tariffs, Competition & E-commerce Growth',
      url: 'https://ts2.tech/en/costco-cost-q1-2026-earnings-beat-e-commerce-surges-20-membership-fees-jump-14-as-tariff-lawsuit-looms/',
      dataUsed: 'narrative.macroEnvironment/keyRisks: e-commerce +20-22.6% growth, tariff-related lawsuit reportedly pending, tariff cost-management commentary, Amazon/Walmart competitive framing.',
    },
    {
      category: 'Next Earnings Date Confirmation',
      url: 'https://www.investing.com/equities/costco-whsl-corp-new-earnings',
      dataUsed: 'Q4/FY2026 earnings date (~September 24, 2026) cited in fiscalYearEndDescription and narrative.nearTermCatalysts.',
    },
  ],
}
