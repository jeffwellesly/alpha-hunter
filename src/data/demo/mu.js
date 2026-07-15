// Cached demo data for Micron Technology (MU), researched via live web
// fetch/search on 2026-07-14. Not live-fetched at runtime - this is the
// "Demo Mode" snapshot so the app works with zero API keys.
//
// Context: Micron is mid-way through an extraordinary AI/HBM-driven
// earnings super-cycle (quarterly revenue: $9.30B Q3 FY25 -> $23.86B Q2
// FY26 -> $41.46B Q3 FY26). The stock jumped +4.92% to $983.12 on July 14,
// 2026, still well off its 52-week high of $1,255 (from $103.38 low) and
// volatile since SK Hynix's July 10, 2026 Nasdaq debut (ticker SKHY) gave
// investors a direct, liquid comp for the first time. In June 2026 Nvidia
// certified Micron (alongside Samsung and SK Hynix) to supply HBM4 for its
// Vera Rubin AI accelerator platform.
//
// Every field below is sourced - see the `sources` array at the bottom for
// the exact URL and data used for each category. Data gaps flagged during
// research (kept honest rather than guessed):
// - LTG has no clean single-source consensus (range ~30%-130%+ depending on
//   source/methodology); used 35%, anchored to Simply Wall St's 35.9%/yr
//   forecast (see sources).
// - FY2027E revenue consensus is paywalled on stockanalysis.com/stocks/mu/
//   forecast/ (marked "Pro" data) - left null rather than estimated. Only
//   FY2027 EPS consensus was available free.
// - FY2026E/FY2027E EBITDA/EBIT/Net Income/CFO/CapEx/FCF/balance sheet were
//   not available as discrete estimates free; only revenue (FY2026 only)
//   and EPS consensus exist.
// - FY2026E/FY2027E dividends-per-share are light estimates built from
//   confirmed quarterly dividend amounts ($0.115/qtr through Q2 FY26,
//   raised to $0.15/qtr from Q3 FY26), not a single stated annual figure.
// - FY2026 fiscal year-end date (~Sep 3, 2026, a 53-week year) is derived
//   arithmetically from confirmed quarter-end dates, not stated verbatim
//   anywhere - moderate rather than full confidence.
// - SK Hynix (SKHY) NTM TEV/Revenue is left null - its forecast page
//   reports revenue in KRW (531.94T KRW) with no clean free USD conversion
//   to match the other peers' methodology.
// - HBM-specific market share estimates for Micron vary widely by source
//   (roughly 5%-21% depending on methodology/quarter) - narrative notes the
//   dispersion rather than picking one number as fact.

export const muDemo = {
  ticker: 'MU',
  companyName: 'Micron Technology, Inc.',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors',
  asOfDate: '2026-07-14',
  currentPrice: 983.12,
  marketCap: 1_110_000_000_000,
  sharesOutstanding: 1_130_000_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending the Thursday closest to August 31 (FY2026 is a 53-week year, ending ~Sep 3, 2026)',

  rimInputs: {
    fy1Eps: 73.32,
    fy2Eps: 149.64,
    ltg: 0.35,
    bvps: 48.15,
    r: 0.08,
    k: 0.055,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 11,
  },
  rimInputNotes: {
    ltg: 'No clean consensus LTG found - estimates ranged from ~30% to a 130%+ outlier (likely a growth-off-depressed-base artifact). Used 35%, near Simply Wall St’s 35.9%/yr EPS growth forecast (simplywall.st/.../future) and broadly consistent with the semiconductor-industry growth backdrop.',
    bvps: 'Total FY2025 (ended 8/28/25) stockholders’ equity ($54,165M) / diluted shares, per stockanalysis.com balance sheet ($48.15/share stated directly). Current-quarter book value is materially higher as equity has kept building through the AI/HBM earnings spike - last-FYE is the RIM convention.',
    k: 'Dividend payout ratio vs. FY2025 non-GAAP EPS ($8.29): $0.46 total FY2025 dividends / $8.29 = 5.5%. Note the "headline" payout ratio on TTM EPS is far lower given how much the AI boom has inflated trailing earnings - 5.5% better reflects the underlying policy as of the last full fiscal year.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 12.04,
      tevEbitda: 15.93,
      tevEbit: 18.33,
      pDilutedEps: 22.19,
      pTangibleBv: 11.20,
      ntmTevRevenue: 8.41,
      ntmFwdPe: 6.85,
    },
    peers: [
      { ticker: 'AVGO', name: 'Broadcom Inc.', tevRevenue: 25.13, tevEbitda: 45.06, tevEbit: 56.90, pDilutedEps: 64.76, pTangibleBv: null, ntmTevRevenue: 11.03, ntmFwdPe: 24.71 },
      { ticker: 'TXN', name: 'Texas Instruments', tevRevenue: 15.57, tevEbitda: 33.12, tevEbit: 43.29, pDilutedEps: 52.22, pTangibleBv: 22.93, ntmTevRevenue: 12.27, ntmFwdPe: 37.02 },
      { ticker: 'ADI', name: 'Analog Devices', tevRevenue: 15.43, tevEbitda: 31.97, tevEbit: 46.97, pDilutedEps: 58.47, pTangibleBv: null, ntmTevRevenue: 11.61, ntmFwdPe: 28.17 },
      { ticker: 'NXPI', name: 'NXP Semiconductors', tevRevenue: 6.32, tevEbitda: 19.15, tevEbit: 23.39, pDilutedEps: 27.15, pTangibleBv: null, ntmTevRevenue: 5.12, ntmFwdPe: 18.12 },
      { ticker: 'QCOM', name: 'Qualcomm Inc.', tevRevenue: 4.34, tevEbitda: 14.86, tevEbit: 16.91, pDilutedEps: 19.46, pTangibleBv: 16.39, ntmTevRevenue: 4.41, ntmFwdPe: 18.07 },
      { ticker: 'ON', name: 'ON Semiconductor', tevRevenue: 6.16, tevEbitda: 18.22, tevEbit: 27.05, pDilutedEps: 66.32, pTangibleBv: 6.90, ntmTevRevenue: 5.18, ntmFwdPe: 27.68 },
      { ticker: 'WDC', name: 'Western Digital Corp.', tevRevenue: 16.36, tevEbitda: 49.05, tevEbit: 52.34, pDilutedEps: 30.85, pTangibleBv: 36.23, ntmTevRevenue: 10.67, ntmFwdPe: 34.83 },
      { ticker: 'SKHY', name: 'SK Hynix (Nasdaq listing)', tevRevenue: 10.55, tevEbitda: 15.19, tevEbit: 18.00, pDilutedEps: 18.98, pTangibleBv: 8.90, ntmTevRevenue: null, ntmFwdPe: 5.06, flag: 'Only listed on Nasdaq July 10, 2026. Forecast page reports revenue in KRW (531.94T KRW next-year consensus) with no clean free USD conversion available, so NTM TEV/Revenue is left blank rather than estimated.' },
    ],
    note: 'P/Tangible BV is "n/a" (not simply missing) for AVGO, ADI, and NXPI - all carry large goodwill/intangibles from M&A, making tangible book value negative or immaterial per stockanalysis.com. MU’s own NTM TEV/Revenue (8.41x) is approximated as current enterprise value (~$1.09T) divided by FY2026 consensus revenue ($129.59B) - the same current-fiscal-year-as-NTM-proxy approach used for peers, since MU’s FY2026 ends in just ~7 weeks from the as-of date. Peer set favors true memory/storage comps (WDC, SK Hynix) alongside broader semis given Micron’s profile.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 15540, epsGaap: -5.34, epsNonGaap: null, cfps: 1.4, ebitda: 2011, ebit: -5745, netIncome: -5835, da: 7756, cfo: 1559, capex: 7676, fcf: -6117, roe: -0.132, dps: 0.46, totalAssets: 64254, totalEquity: 44120 },
    { year: 'FY2024A', isEstimate: false, revenue: 25111, epsGaap: 0.70, epsNonGaap: null, cfps: 7.66, ebitda: 9084, ebit: 1304, netIncome: 789, da: 7780, cfo: 8507, capex: 8386, fcf: 121, roe: 0.017, dps: 0.46, totalAssets: 69416, totalEquity: 45131 },
    { year: 'FY2025A', isEstimate: false, revenue: 37378, epsGaap: 7.59, epsNonGaap: 8.29, cfps: 15.65, ebitda: 18122, ebit: 9770, netIncome: 8530, da: 8352, cfo: 17525, capex: 15857, fcf: 1668, roe: 0.157, dps: 0.46, totalAssets: 82798, totalEquity: 54165 },
    { year: 'FY2026E', isEstimate: true, revenue: 129590, epsGaap: null, epsNonGaap: 73.32, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.53, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 149.64, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.60, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2026 consensus reflects an extraordinary in-year acceleration (Q3 FY26 alone: $41.46B revenue). FY2026 revenue ($129.59B) and both years’ EPS consensus were confidently available free from stockanalysis.com/stocks/mu/forecast/; FY2027 revenue was explicitly paywalled ("Pro" data) on that same page as of 2026-07-14 and is left null rather than guessed. Other FY2026E/FY2027E line items (EBITDA, EBIT, net income, CFO, CapEx, FCF, balance sheet) were not found as discrete published estimates from free sources. FY2026E/FY2027E dps are estimates built from confirmed quarterly dividend amounts, not a single stated annual figure.',

  cashFlow: [
    { year: 'FY2023A', cfo: 1559, cfi: -6191, cff: 4983, capex: 7676, da: 7756, dividendsPaid: 504, buybacks: 425, netDebtActivity: 5955, receivables: 2443, payables: 3958, inventory: 8387 },
    { year: 'FY2024A', cfo: 8507, cfi: -8309, cff: -1842, capex: 8386, da: 7780, dividendsPaid: 513, buybacks: 300, netDebtActivity: -898, receivables: 6615, payables: 7299, inventory: 8875 },
    { year: 'FY2025A', cfo: 17525, cfi: -14087, cff: -850, capex: 15857, da: 8352, dividendsPaid: 522, buybacks: 0, netDebtActivity: -189, receivables: 9265, payables: 9649, inventory: 8355 },
  ],
  cashFlowNote:
    'CapEx has gone from $7.68B (FY23) to $15.86B (FY25, +107%) while D&A stayed nearly flat ($7.76B to $8.35B, +8%) - CapEx now runs ~1.9x D&A, and FY2026 guidance (Q4 FY26 alone guided to ~$50B revenue, ~86% gross margin, ~$31 non-GAAP EPS) points to a materially larger capital program funding the Idaho and New York fab buildout. This means reported EBIT/EBITDA understate true ongoing capital intensity, and free cash flow (despite record CFO) is being suppressed by the buildout. Receivables and payables both roughly quadrupled/tripled FY23->FY25 on the revenue ramp, while inventory stayed roughly flat ($8.4B-$8.9B) - consistent with HBM being effectively sold out rather than stockpiled.',

  analystViews: {
    targetMean: 1486.0,
    targetMedian: 1550.0,
    targetHigh: 2200.0,
    targetLow: 361.0,
    numAnalysts: 45,
    buy: 40,
    hold: 5,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'Micron designs and manufactures memory and storage semiconductors: DRAM, NAND flash, and increasingly High Bandwidth Memory (HBM) for AI accelerators. Reporting segments span Cloud Memory (data center/hyperscaler DRAM+HBM), Core Data Center, Mobile & Client, and Automotive & Embedded. In June 2026, Nvidia confirmed that Samsung, SK Hynix, and Micron had all passed certification to supply HBM4 for its next-generation Vera Rubin AI accelerator platform (entering full production after its June 1, 2026 GTC Taipei announcement). Supply-chain analysts estimate SK Hynix holds roughly 60-70% of that specific Vera Rubin HBM4 allocation, Samsung ~25-30%, and Micron the remainder - within the broader HBM market, Q1 2026 IDC revenue-share data put SK Hynix atop the market at ~56%, with Micron and Samsung’s specific shares varying widely (roughly 5%-21%) depending on source and methodology.',
    macroEnvironment:
      'Memory is in a historic AI-datacenter-driven upcycle: Micron’s quarterly revenue accelerated from $9.30B (Q3 FY25) to $23.86B (Q2 FY26) to $41.46B (Q3 FY26), pushing its market cap past $1 trillion in 2026. The stock jumped +4.92% to $983.12 on July 14, 2026 alone, reflecting continued volatility - it remains well below its 52-week high of $1,255 (set earlier in the cycle) but far above its 52-week low of $103.38. SK Hynix’s July 10, 2026 Nasdaq listing (ticker SKHY) has given investors a new, direct, liquid comp for the first time, adding to recent trading volatility. Micron is simultaneously accelerating its US fab buildout: it poured first concrete at its ~$100B Clay, New York campus on July 9, 2026 (more than a quarter ahead of schedule, less than six months after a January 2026 groundbreaking) and expects first wafer output from Idaho Fab 1 in mid-calendar-2027, backed by up to $6.1B in direct CHIPS Act funding awarded December 2024 for the Idaho and New York projects.',
    keyRisks: [
      'HBM oversupply risk in 2027-2028: Samsung, SK Hynix, and Micron are all racing to add capacity; synchronized fab ramps could flip today’s shortage into a glut, compressing prices and margins from currently extreme peak levels.',
      'New direct comp pressure from SK Hynix’s Nasdaq listing: gives investors an easier substitute, and daily moves in both names (SKHY and MU) have shown correlated volatility since the July 10, 2026 debut.',
      'Customer/platform concentration: HBM revenue is tightly linked to a small number of AI accelerator platforms (e.g. Nvidia Vera Rubin, certified June 2026) - any slowdown in hyperscaler AI capex, or a shift in Vera Rubin HBM4 allocation away from Micron, would hit results disproportionately.',
      'Extreme capital intensity and execution risk: CapEx has already grown to ~1.9x D&A (FY25) and Q4 FY26 guidance implies a further step-up; the Idaho/New York fab buildout must deliver capacity on schedule for the growth thesis to hold, and even the CHIPS Act award has already seen partial funding reallocation between the two sites.',
      'Valuation dispersion / cycle-top risk: the $361-$2,200 analyst price-target range (45 analysts) is unusually wide for a mega-cap, signaling real disagreement about whether current pricing and margins are sustainable or reflect a cyclical peak.',
    ],
    nearTermCatalysts: [
      'Q4/full-year FY2026 earnings expected September 29, 2026 - will show whether the company hits its guided ~$50B quarterly revenue / ~$31 non-GAAP EPS (with ~86% gross margin) and set the FY2027 tone.',
      'Continued New York (Clay) fab construction milestones following the July 9, 2026 first-concrete pour, and Idaho Fab 1 progress toward mid-2027 first wafer output.',
      'HBM4 qualification and shipment ramp for Nvidia’s Vera Rubin platform following the June 2026 supplier certification - a recurring quarter-to-quarter catalyst given how much of the growth story rides on HBM.',
      'Further CHIPS Act funding/reallocation milestones tied to the Idaho and New York fabs (up to $6.1B in direct federal funding awarded December 2024).',
    ],
    investmentThesis:
      'Micron sits at the center of the AI-driven memory super-cycle, with HBM4 newly certified for Nvidia’s Vera Rubin platform and pricing power the strongest it has been in years - yet the RIM and comps analyses both suggest the market has already priced in a significant continuation of that strength: at $983.12, the stock trades at a premium to most semiconductor peers on trailing multiples (trailing P/E 22.2x vs. a peer set spanning ~19x-67x) despite a forward P/E of just ~6.85x on the FY2026/27 EPS spike, and analyst price targets span an unusually wide $361-$2,200 range, reflecting genuine disagreement about durability. The capex build (CapEx already ~1.9x D&A in FY25, guided materially higher for FY26) is the right strategic move if HBM demand holds through 2027-2028, but it also means free cash flow stays suppressed and a chunk of that capacity could be poorly timed if the memory market normalizes as some analysts expect, especially with SK Hynix and Samsung racing to add HBM4 capacity in parallel. This reads as a name where the near-term fundamentals are genuinely excellent, but the valuation already assumes the cycle extends further than history suggests memory cycles usually do - worth sizing with that asymmetry in mind rather than treating the current run-rate as the new steady state.',
  },

  sources: [
    {
      category: 'Company Profile & Current Price',
      url: 'https://stockanalysis.com/stocks/mu/',
      dataUsed: 'Current price ($983.12, +4.92% on 7/14/26), market cap ($1.11T), shares outstanding (1.13B), trailing P/E (22.19), forward P/E (6.85), sector (Technology), industry (Semiconductors), 52-week range ($103.38-$1,255.00).',
    },
    {
      category: 'Historical Income Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/mu/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2023A/FY2024A/FY2025A; also FCF-per-share cross-check.',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/mu/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($48.15 FY2025, used as rimInputs.bvps); cashFlow[].receivables, payables, inventory for FY2023A/24A/25A.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/mu/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2023A/24A/25A; financials[].dps (0.46) for FY2023A-25A.',
    },
    {
      category: 'Analyst Consensus & Forward Estimates',
      url: 'https://stockanalysis.com/stocks/mu/forecast/',
      dataUsed: 'analystViews (45 analysts, targetMean/median/high/low, 40 buy/5 hold/0 sell); rimInputs.fy1Eps (73.32) and fy2Eps (149.64); financials FY2026E revenue (129590) and epsNonGaap (73.32); FY2027E epsNonGaap (149.64). FY2027E revenue confirmed paywalled ("Pro" data) as of 2026-07-14 - left null.',
    },
    {
      category: 'Valuation Multiples / Statistics (MU)',
      url: 'https://stockanalysis.com/stocks/mu/statistics/',
      dataUsed: 'comps.targetMetrics: tevRevenue (12.04), tevEbitda (15.93), tevEbit (18.33), pDilutedEps (22.19, trailing P/E), pTangibleBv (11.20), ntmFwdPe (6.85); enterprise value (~$1.09T) used with FY2026 revenue consensus to derive ntmTevRevenue (8.41).',
    },
    {
      category: 'Peer AVGO - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/avgo/statistics/',
      dataUsed: 'AVGO tevRevenue (25.13), tevEbitda (45.06), tevEbit (56.90), pDilutedEps (64.76), ntmFwdPe (24.71), pTangibleBv (n/a - goodwill-heavy), enterprise value ($1.90T).',
    },
    {
      category: 'Peer AVGO - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/avgo/forecast/',
      dataUsed: 'AVGO next-fiscal-year revenue consensus ($172.21B), used with EV to compute ntmTevRevenue (11.03).',
    },
    {
      category: 'Peer TXN - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/txn/statistics/',
      dataUsed: 'TXN tevRevenue (15.57), tevEbitda (33.12), tevEbit (43.29), pDilutedEps (52.22), pTangibleBv (22.93), ntmFwdPe (37.02), enterprise value ($287.03B).',
    },
    {
      category: 'Peer TXN - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/txn/forecast/',
      dataUsed: 'TXN next-fiscal-year revenue consensus ($23.40B), used with EV to compute ntmTevRevenue (12.27).',
    },
    {
      category: 'Peer ADI - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/adi/statistics/',
      dataUsed: 'ADI tevRevenue (15.43), tevEbitda (31.97), tevEbit (46.97), pDilutedEps (58.47), pTangibleBv (n/a - goodwill-heavy), ntmFwdPe (28.17), enterprise value ($196.57B).',
    },
    {
      category: 'Peer ADI - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/adi/forecast/',
      dataUsed: 'ADI next-fiscal-year revenue consensus ($16.94B), used with EV to compute ntmTevRevenue (11.61).',
    },
    {
      category: 'Peer NXPI - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/nxpi/statistics/',
      dataUsed: 'NXPI tevRevenue (6.32), tevEbitda (19.15), tevEbit (23.39), pDilutedEps (27.15), pTangibleBv (n/a - goodwill-heavy), ntmFwdPe (18.12), enterprise value ($79.68B).',
    },
    {
      category: 'Peer NXPI - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/nxpi/forecast/',
      dataUsed: 'NXPI next-fiscal-year revenue consensus ($15.55B), used with EV to compute ntmTevRevenue (5.12).',
    },
    {
      category: 'Peer QCOM - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/qcom/statistics/',
      dataUsed: 'QCOM tevRevenue (4.34), tevEbitda (14.86), tevEbit (16.91), pDilutedEps (19.46), pTangibleBv (16.39), ntmFwdPe (18.07), enterprise value ($193.19B).',
    },
    {
      category: 'Peer QCOM - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/qcom/forecast/',
      dataUsed: 'QCOM next-fiscal-year revenue consensus ($43.76B), used with EV to compute ntmTevRevenue (4.41).',
    },
    {
      category: 'Peer ON - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/on/statistics/',
      dataUsed: 'ON Semiconductor tevRevenue (6.16), tevEbitda (18.22), tevEbit (27.05), pDilutedEps (66.32), pTangibleBv (6.90), ntmFwdPe (27.68), enterprise value ($37.32B).',
    },
    {
      category: 'Peer ON - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/on/forecast/',
      dataUsed: 'ON next-fiscal-year revenue consensus ($7.20B), used with EV to compute ntmTevRevenue (5.18).',
    },
    {
      category: 'Peer WDC - Trailing Multiples',
      url: 'https://stockanalysis.com/stocks/wdc/statistics/',
      dataUsed: 'Western Digital tevRevenue (16.36), tevEbitda (49.05), tevEbit (52.34), pDilutedEps (30.85), pTangibleBv (36.23), ntmFwdPe (34.83), enterprise value ($192.65B).',
    },
    {
      category: 'Peer WDC - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/wdc/forecast/',
      dataUsed: 'WDC next-fiscal-year revenue consensus ($18.05B), used with EV to compute ntmTevRevenue (10.67).',
    },
    {
      category: 'Peer SKHY - Trailing Multiples & Profile',
      url: 'https://stockanalysis.com/stocks/skhy/',
      dataUsed: 'SK Hynix (Nasdaq listing) current price ($193.92), market cap ($936.83B), trailing P/E (18.98), forward P/E (5.06/ntmFwdPe), IPO/listing date (July 10, 2026).',
    },
    {
      category: 'Peer SKHY - Trailing EV Multiples & NTM Estimate',
      url: 'https://stockanalysis.com/stocks/skhy/statistics/',
      dataUsed: 'SKHY tevRevenue (10.55), tevEbitda (15.19), tevEbit (18.00), pTangibleBv (8.90), enterprise value ($915.03B). (NTM revenue consensus checked at stockanalysis.com/stocks/skhy/forecast/ but reported only in KRW - not converted, ntmTevRevenue left null.)',
    },
    {
      category: 'RIM - Long-Term Growth (LTG) Input',
      url: 'https://simplywall.st/stocks/us/semiconductors/nasdaq-mu/micron-technology/future',
      dataUsed: 'rimInputs.ltg (0.35) - anchored to Simply Wall St’s 35.9%/yr EPS growth forecast, the most credibly-sourced single figure among a wide range of estimates found (~30%-130%+).',
    },
    {
      category: 'RIM - Dividend History (for k / payout ratio and dps estimates)',
      url: 'https://simplywall.st/stocks/us/semiconductors/nasdaq-mu/micron-technology/dividend',
      dataUsed: 'Confirmed quarterly dividend amounts ($0.115/share through Q2 FY26, raised to $0.15/share from Q3 FY26) - used to build financials[].dps estimates for FY2026E (0.53) and FY2027E (0.60).',
    },
    {
      category: 'Fiscal Calendar Cross-Check',
      url: 'https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000015/mu-20260528.htm',
      dataUsed: 'Confirms Q3 FY2026 fiscal quarter-end date (May 28, 2026), used (with the known Aug 28, 2025 FY2025 year-end) to arithmetically derive the FY2026 year-end (~Sep 3, 2026, a 53-week year) and rimInputs.currentFiscalMonth (11).',
    },
    {
      category: 'Q4 FY2026 Guidance & Next Earnings Date',
      url: 'https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000013/a2026q3ex991-pressrelease.htm',
      dataUsed: 'Q4 FY2026 guidance used in narrative.macroEnvironment/nearTermCatalysts: revenue ~$50B ±$1B, gross margin ~86%, non-GAAP EPS ~$31 ±$1.',
    },
    {
      category: 'Next Earnings Date Confirmation',
      url: 'https://www.marketbeat.com/stocks/NASDAQ/MU/earnings/',
      dataUsed: 'Next earnings date (September 29, 2026) cited in narrative.nearTermCatalysts, cross-checked against multiple earnings-calendar trackers.',
    },
    {
      category: 'HBM4 / Nvidia Vera Rubin Certification',
      url: 'https://finance.yahoo.com/sectors/technology/articles/nvidia-certifies-samsung-sk-hynix-133001560.html',
      dataUsed: 'June 2026 Nvidia certification of Samsung, SK Hynix, and Micron for HBM4 supply to the Vera Rubin platform; supply-chain analyst estimates of volume allocation (SK Hynix ~60-70%, Samsung ~25-30%, Micron the remainder) used in narrative.companyOverview and keyRisks.',
    },
    {
      category: 'HBM Market Share (Q1 2026)',
      url: 'https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/',
      dataUsed: 'IDC Q1 2026 HBM revenue-share data (SK Hynix ~56.4%) cited in narrative.companyOverview, alongside a note on the wide dispersion of Micron-specific share estimates across sources.',
    },
    {
      category: 'CHIPS Act Funding',
      url: 'https://www.commerce.gov/news/press-releases/2024/12/department-commerce-awards-chips-incentives-micron-idaho-and-new-york',
      dataUsed: 'Up to $6.1B direct CHIPS Act funding awarded to Micron (Dec 2024) for Idaho and New York fabs, cited in narrative.macroEnvironment/keyRisks/nearTermCatalysts.',
    },
    {
      category: 'New York (Clay) Fab Construction Milestone',
      url: 'https://www.globenewswire.com/news-release/2026/07/09/3324807/14450/en/Micron-Accelerates-U-S-Investments-Pours-First-Concrete-at-New-York-Fab.html',
      dataUsed: 'First-concrete-pour milestone at the Clay, NY campus (July 9, 2026, ahead of schedule) and Idaho Fab 1 first-wafer-output timeline (mid-calendar-2027), used in narrative.macroEnvironment/nearTermCatalysts.',
    },
    {
      category: 'SK Hynix Nasdaq Listing Context',
      url: 'https://stockanalysis.com/stocks/skhy/',
      dataUsed: 'Confirms SK Hynix’s July 10, 2026 Nasdaq debut as its first US-listed, liquid comp for Micron investors, used in narrative.macroEnvironment and keyRisks.',
    },
  ],
}
