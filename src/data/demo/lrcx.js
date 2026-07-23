// Cached demo data for Lam Research Corporation (LRCX), researched via live
// web search on 2026-07-22. Not live-fetched at runtime - added as a sixth
// bundled analysis alongside MU/LLY/SNDK/WDC/COST.
//
// Context: Lam Research makes wafer fabrication equipment (etch and
// deposition tools), a primary beneficiary of the AI-driven semiconductor
// capex supercycle - the same underlying demand driver as MU and SNDK in
// this bundle, one layer up the supply chain. The shift in memory spending
// toward HBM and technology upgrades (rather than raw new capacity) plays
// directly to Lam's highest-value etch/deposition tools. Stock is up
// +219.89% over the past 52 weeks. Next earnings (Q4/full FY2026) are due
// July 29, 2026 - just days after this file's as-of date, with Q4 guidance
// already given (EPS $1.44-$1.82).
//
// Unlike WDC, this ticker's EPS consensus reconciles cleanly across
// sources (trailing P/E of 60.82 implies ~$5.30 trailing EPS, consistent
// with FY2025A's $4.15 plus partial-year FY2026 growth; forward P/E of
// 42.40 implies ~$7.59, consistent with FY2027E's $8.08) - no data-quality
// footnote needed here.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - FY2027E revenue consensus wasn't available free on stockanalysis.com's
//   forecast page (only FY2026E) - left null, same gap pattern seen on
//   several other names in this bundle.
// - financials[].dps for FY2023A-FY2025A are approximated as aggregate
//   dividends paid ÷ current shares outstanding (1.25B) - a light estimate,
//   not a precise historical share-count-weighted figure, same approach
//   used elsewhere in this bundle. Note LRCX completed a 10-for-1 stock
//   split in October 2024 - current shares outstanding reflects the
//   post-split count, which is why this approximation is used rather than
//   a precise historical per-share figure.
// - Peer NTM TEV/Revenue figures use each peer's own "next fiscal year"
//   consensus revenue, which lands on different calendar timing per peer
//   (LRCX/AMAT/KLAC have differing fiscal year-ends; ASML reports in EUR
//   with figures converted/reported in USD by the data source) -
//   approximate by construction, same trade-off accepted elsewhere in this
//   app's peer-multiple methodology.

export const lrcxDemo = {
  ticker: 'LRCX',
  companyName: 'Lam Research Corporation',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductor Equipment & Materials',
  asOfDate: '2026-07-22',
  currentPrice: 322.00,
  marketCap: 402_680_000_000,
  sharesOutstanding: 1_250_000_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending the last Sunday in June (FY2025 ended June 29, 2025); FY2026 ends late June 2026, with Q4/full-year results due July 29, 2026',

  rimInputs: {
    fy1Eps: 5.68,
    fy2Eps: 8.08,
    ltg: 0.199,
    bvps: 7.64,
    r: 0.08,
    k: 0.1964,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 13,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus diluted EPS (35 analysts per stockanalysis.com) - reconciles cleanly with trailing/forward P/E-implied EPS, no data-quality issue here (see top-of-file note).',
    ltg: 'Simply Wall St’s stated long-term EPS growth forecast (19.9%/yr).',
    bvps: 'Total FY2025 (ended 6/29/25) stockholders’ equity ($9,862M) / diluted shares, per stockanalysis.com balance sheet ($7.64/share stated directly) - the RIM convention (last completed fiscal year-end). Very thin relative to the $322 share price (implied P/B ~42x), consistent with a capital-light, buyback-heavy business - worth watching for RIM sensitivity given how thin the book-value base is.',
    k: 'stockanalysis.com’s stated dividend payout ratio (19.64%).',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 18.53,
      tevEbitda: 51.18,
      tevEbit: 54.08,
      pDilutedEps: 60.82,
      pTangibleBv: 46.27,
      ntmTevRevenue: 17.31,
      ntmFwdPe: 42.40,
    },
    peers: [
      { ticker: 'AMAT', name: 'Applied Materials, Inc.', tevRevenue: 15.41, tevEbitda: 48.22, tevEbit: 50.91, pDilutedEps: 53.10, pTangibleBv: 22.69, ntmTevRevenue: 10.50, ntmFwdPe: 37.79 },
      { ticker: 'KLAC', name: 'KLA Corporation', tevRevenue: 21.79, tevEbitda: 48.78, tevEbit: 52.28, pDilutedEps: 61.59, pTangibleBv: 75.96, ntmTevRevenue: 16.58, ntmFwdPe: 45.30 },
      { ticker: 'ASML', name: 'ASML Holding N.V.', tevRevenue: 17.17, tevEbitda: 44.97, tevEbit: 48.47, pDilutedEps: 57.54, pTangibleBv: 36.77, ntmTevRevenue: 12.92, ntmFwdPe: 32.62 },
    ],
    note: 'Peer set is the core wafer fab equipment (WFE) group: Applied Materials (deposition/etch/CMP breadth), KLA (process control/metrology), and ASML (lithography, the EUV monopoly). All three - like LRCX - trade at rich multiples right now (32x-45x forward P/E, 23x-76x P/Tangible BV) since the whole WFE sector is repricing on the same AI capex supercycle, so unlike some other names in this bundle, LRCX’s comps discount/premium to peers is modest on most multiples (single digits) rather than dramatic - the sector is expensive together, not just this one name.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 17429, epsGaap: 3.33, epsNonGaap: null, cfps: 4.14, ebitda: 5517, ebit: 5175, netIncome: 4511, da: 342.43, cfo: 5179, capex: 501.57, fcf: 4677, roe: 0.5494, dps: 0.73, totalAssets: 18782, totalEquity: 8210 },
    { year: 'FY2024A', isEstimate: false, revenue: 14905, epsGaap: 2.90, epsNonGaap: null, cfps: 3.72, ebitda: 4624, ebit: 4264, netIncome: 3828, da: 359.7, cfo: 4652, capex: 396.67, fcf: 4255, roe: 0.4483, dps: 0.82, totalAssets: 18745, totalEquity: 8539 },
    { year: 'FY2025A', isEstimate: false, revenue: 18436, epsGaap: 4.15, epsNonGaap: null, cfps: 4.94, ebitda: 6287, ebit: 5901, netIncome: 5358, da: 386.28, cfo: 6173, capex: 759.19, fcf: 5414, roe: 0.5433, dps: 0.92, totalAssets: 21345, totalEquity: 9862 },
    { year: 'FY2026E', isEstimate: true, revenue: 23200, epsGaap: null, epsNonGaap: 5.68, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 8.08, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2024 was a down year (revenue -14.5%, EPS -12.9% vs. FY2023) amid a broader semiconductor capex digestion period, before FY2025 snapped back sharply (+23.7% revenue, +43.1% EPS) as the AI-driven upcycle took hold - FY2026E consensus ($23.20B revenue, $5.68 EPS) continues that trajectory. FY2027E revenue consensus wasn’t available free on stockanalysis.com as of 2026-07-22 and is left null rather than guessed.',

  cashFlow: [
    { year: 'FY2023A', cfo: 5179, cfi: -534.56, cff: -2831, capex: 501.57, da: 342.43, dividendsPaid: 907.91, buybacks: 2017, netDebtActivity: -23.21, receivables: 2823, payables: 470.7, inventory: 4816 },
    { year: 'FY2024A', cfo: 4652, cfi: -370.61, cff: -3996, capex: 396.67, da: 359.7, dividendsPaid: 1019, buybacks: 2843, netDebtActivity: -256.1, receivables: 2519, payables: 613.97, inventory: 4218 },
    { year: 'FY2025A', cfo: 6173, cfi: -708.09, cff: -4937, capex: 759.19, da: 386.28, dividendsPaid: 1150, buybacks: 3422, netDebtActivity: -507.49, receivables: 3378, payables: 854.21, inventory: 4308 },
  ],
  cashFlowNote: 'CFO dipped in the FY2024 down year (-10.2%) before rebounding +32.7% in FY2025 alongside the revenue recovery. CapEx nearly doubled FY2024->FY2025 ($396.67M -> $759.19M) as the company invests behind the upcycle, though it remains a small fraction of revenue (~4%) versus MU/WDC’s much heavier capital intensity elsewhere in this bundle - Lam is a capital-light equipment maker, not a fab operator. Buybacks have grown every year (+41% FY23->FY24, +20% FY24->FY25) and now dwarf dividends as the primary form of shareholder return, funded entirely from operating cash flow with net debt repayment (not issuance) in all three years shown.',

  analystViews: {
    targetMean: 368.26,
    targetMedian: 380.0,
    targetHigh: 500.0,
    targetLow: 220.0,
    numAnalysts: 35,
    buy: 29,
    hold: 5,
    sell: 1,
  },

  narrative: {
    companyOverview:
      'Lam Research makes wafer fabrication equipment - primarily etch and deposition tools used to manufacture semiconductors - putting it a layer up the supply chain from the memory makers (MU, SNDK) elsewhere in this bundle rather than competing directly with them. Its core competitive position is in etch and deposition process leadership, which matters disproportionately right now: the current memory upcycle is shifting spending toward High Bandwidth Memory (HBM) and technology upgrades rather than raw new wafer capacity, and that mix shift favors exactly the highest-value tools Lam sells. The stock has risen +219.89% over the past 52 weeks and completed a 10-for-1 stock split in October 2024.',
    macroEnvironment:
      'The semiconductor industry expects robust 2026 expansion, driven by AI infrastructure buildout and a memory-market recovery, with global chip sales potentially approaching $1 trillion and wafer fab equipment (WFE) spending growing alongside it. That said, US export restrictions on chip equipment shipments to Chinese customers, tightened further in early June 2026, are expected to cost Lam roughly $600M of 2026 revenue - a manageable hit against an $18B+ revenue base, but a real and recurring headwind as controls have progressively widened to cover advanced logic, HBM, and EUV-adjacent equipment. Next earnings (Q4/full FY2026) are due July 29, 2026, with Q4 guidance already given at $1.44-$1.82 EPS.',
    keyRisks: [
      'China export restrictions are a recurring, escalating overhang - each new control (advanced logic, HBM, EUV) removes a slice of addressable revenue, and further escalation could impair a larger pool than the current ~$600M estimated 2026 impact.',
      'The whole wafer fab equipment sector - not just Lam - is trading at rich multiples right now (peers AMAT/KLAC/ASML all at 32x-45x forward P/E), meaning a sector-wide derating on any AI-capex-cycle disappointment would likely hit LRCX alongside its peers rather than being stock-specific.',
      'Extremely thin book value relative to price (bvps $7.64 vs. a $322 share price, ~42x implied P/B) - a capital-light, buyback-funded balance sheet that leaves little margin if the RIM model’s implied fade assumptions don’t hold.',
      'Semiconductor capital equipment has historically been a cyclical, lumpy-order business - the FY2024 down year (revenue -14.5%) that preceded this recovery is a reminder the current supercycle framing can reverse if AI capex growth decelerates.',
      'Customer concentration risk typical of the WFE industry: a small number of large foundry/memory customers (TSMC, Samsung, SK Hynix, Micron, and now Chinese domestic players where still permitted) drive the bulk of order flow.',
    ],
    nearTermCatalysts: [
      'Q4/full FY2026 earnings on July 29, 2026 - first read on whether guided EPS ($1.44-$1.82) and the China-restriction revenue impact materialized as expected, and sets the FY2027 tone.',
      'Further HBM/AI-driven memory capex announcements from major customers (Micron, SK Hynix, Samsung) that would flow directly into etch/deposition tool orders.',
      'Any additional US export-control developments affecting China shipments, given the pattern of progressively widening restrictions.',
      'WFE industry spending updates from peers (AMAT, KLAC, ASML) as a read-through on the broader capex cycle.',
    ],
    investmentThesis:
      'Lam Research sits in an unusually good structural position within the AI semiconductor supercycle: as memory spending shifts toward HBM and technology upgrades rather than raw capacity, that mix shift favors exactly the etch/deposition tools where Lam has process leadership, and the numbers back it up - FY2025 snapped back +23.7% revenue/+43.1% EPS after a FY2024 down year, with FY2026 consensus continuing that trajectory. But the valuation methods here disagree more than they agree: RIM ($237.85 implied) and comps ($214.65 implied, peer-median forward P/E) both sit meaningfully below the $322 current price, while analyst consensus ($374.13 mean/median) sees further upside - blending to a Hold at -14.4%, just short of this app’s -15% Sell threshold. Unlike Costco elsewhere in this bundle, LRCX’s comps discount to peers is modest (mid-single-digits on most multiples) since the entire WFE peer group - Applied Materials, KLA, ASML - is repricing rich together, so this isn’t "expensive versus cheap peers," it’s "a strong business in an expensive sector," with China export controls as the clearest specific risk to watch alongside the July 29, 2026 earnings print.',
  },

  sources: [
    {
      category: 'Company Profile & Valuation Multiples (LRCX)',
      url: 'https://stockanalysis.com/stocks/lrcx/statistics/',
      dataUsed: 'Current price ($322.00), market cap ($402.68B), enterprise value ($401.67B), shares outstanding (1.25B); comps.targetMetrics: tevRevenue (18.53), tevEbitda (51.18), tevEbit (54.08), pDilutedEps (60.82, trailing P/E), pTangibleBv (46.27), ntmFwdPe (42.40, stated forward P/E); dividend payout ratio (19.64%) used for rimInputs.k.',
    },
    {
      category: 'Historical Income Statement (FY2021-FY2025)',
      url: 'https://stockanalysis.com/stocks/lrcx/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2023A/FY2024A/FY2025A; trailing/forward P/E cross-checked against FY2025A/FY2026E/FY2027E EPS - no inconsistency found (see top-of-file note).',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/lrcx/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($7.64 FY2025, used as rimInputs.bvps); total debt and cash context for narrative.',
    },
    {
      category: 'Balance Sheet Detail - Receivables/Payables/Inventory',
      url: 'https://stockanalysis.com/stocks/lrcx/financials/balance-sheet/?p=quarterly',
      dataUsed: 'cashFlow[].receivables, payables, inventory for FY2023A/24A/25A.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/lrcx/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2023A/24A/25A.',
    },
    {
      category: 'Analyst Consensus & Forward Estimates (LRCX)',
      url: 'https://stockanalysis.com/stocks/lrcx/forecast/',
      dataUsed: 'rimInputs.fy1Eps (5.68, FY2026) and fy2Eps (8.08, FY2027); FY2026E revenue ($23.20B) used for comps.targetMetrics.ntmTevRevenue; analystViews (35 analysts, targetMean $368.26/targetMedian $380/targetHigh $500/targetLow $220, 29 buy/5 hold/1 sell).',
    },
    {
      category: 'Long-Term Growth (LTG) Input',
      url: 'https://simplywall.st/stocks/us/semiconductors/nasdaq-lrcx/lam-research/future',
      dataUsed: 'rimInputs.ltg (0.199) - Simply Wall St’s stated long-term EPS growth forecast (19.9%/yr).',
    },
    {
      category: 'Peer AMAT - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/amat/statistics/',
      dataUsed: 'Applied Materials tevRevenue (15.41), tevEbitda (48.22), tevEbit (50.91), pDilutedEps (53.10), pTangibleBv (22.69), ntmFwdPe (37.79, stated forward P/E), enterprise value ($447.26B).',
    },
    {
      category: 'Peer AMAT - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/amat/forecast/',
      dataUsed: 'Applied Materials next-fiscal-year revenue consensus ($42.59B), used with EV to compute comps.peers[AMAT].ntmTevRevenue (10.50).',
    },
    {
      category: 'Peer KLAC - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/klac/statistics/',
      dataUsed: 'KLA Corporation tevRevenue (21.79), tevEbitda (48.78), tevEbit (52.28), pDilutedEps (61.59), pTangibleBv (75.96), ntmFwdPe (45.30, stated forward P/E), enterprise value ($285.38B).',
    },
    {
      category: 'Peer KLAC - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/klac/forecast/',
      dataUsed: 'KLA next-fiscal-year revenue consensus ($17.21B), used with EV to compute comps.peers[KLAC].ntmTevRevenue (16.58).',
    },
    {
      category: 'Peer ASML - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/asml/statistics/',
      dataUsed: 'ASML Holding tevRevenue (17.17), tevEbitda (44.97), tevEbit (48.47), pDilutedEps (57.54), pTangibleBv (36.77), ntmFwdPe (32.62, stated forward P/E), enterprise value ($691.79B).',
    },
    {
      category: 'Peer ASML - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/asml/forecast/',
      dataUsed: 'ASML next-fiscal-year revenue consensus ($53.54B), used with EV to compute comps.peers[ASML].ntmTevRevenue (12.92).',
    },
    {
      category: 'China Export Restrictions Impact',
      url: 'https://finance.yahoo.com/markets/stocks/articles/u-china-chip-export-curbs-221046034.html',
      dataUsed: 'narrative.macroEnvironment/keyRisks: early June 2026 US export restriction tightening, ~$600M estimated 2026 revenue impact.',
    },
    {
      category: 'HBM / Etch-Deposition Positioning',
      url: 'https://siliconanalysts.com/analysis/china-ai-semiconductor-localization-2026-capex-impact',
      dataUsed: 'narrative.companyOverview/macroEnvironment: memory capex mix shift toward HBM/technology upgrades favoring Lam’s etch/deposition tools; WFE spending and ~$1T industry sales context.',
    },
    {
      category: 'Next Earnings Date Confirmation',
      url: 'https://www.tipranks.com/stocks/lrcx/earnings',
      dataUsed: 'Q4/FY2026 earnings date (July 29, 2026) and Q4 EPS guidance ($1.44-$1.82) cited in fiscalYearEndDescription and narrative.macroEnvironment/nearTermCatalysts.',
    },
  ],
}
