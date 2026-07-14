// Cached demo data for Micron Technology (MU), researched via live web
// search on 2026-07-13. Not live-fetched at runtime - this is the "Demo
// Mode" snapshot so the app works with zero API keys.
//
// Context: Micron is mid-way through an extraordinary AI/HBM-driven
// earnings super-cycle (quarterly revenue: $9.30B Q3 FY25 -> $23.86B Q2
// FY26 -> $41.46B Q3 FY26). The stock is volatile - down from a 52-week
// high of $1,255 to ~$937, partly on SK Hynix's July 10, 2026 Nasdaq debut
// (ticker SKHY) giving investors a direct, liquid comp for the first time.
//
// Data gaps flagged during research (kept honest rather than guessed):
// - LTG has no clean single-source consensus (range 30%-130%+ depending on
//   source/methodology); used 35% as a documented middle estimate.
// - FY2026E/FY2027E EBITDA/EBIT/Net Income/CFO/CapEx/FCF were not available
//   as discrete estimates free; only revenue and EPS consensus exist.
// - FY2026 fiscal year-end date (Sep 3, 2026, a 53-week year) is derived
//   arithmetically from confirmed quarter-end dates, not stated verbatim
//   anywhere - moderate rather than full confidence.

export const muDemo = {
  ticker: 'MU',
  companyName: 'Micron Technology, Inc.',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors (Memory & Storage)',
  asOfDate: '2026-07-13',
  currentPrice: 937.0,
  marketCap: 1_065_000_000_000,
  sharesOutstanding: 1_145_000_000,
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
    ltg: 'No clean consensus LTG found - estimates ranged from ~30% to a 130%+ outlier (likely a growth-off-depressed-base artifact). Used 35%, near Simply Wall St’s 35.9%/yr forecast and the semiconductor-industry median of ~38%.',
    bvps: 'Total FY2025 (ended 8/28/25) stockholders’ equity ($54,165M) / diluted shares. Current-quarter book value is much higher (~$89/share) as equity roughly doubled intra-year on the AI/HBM earnings spike - last-FYE is the RIM convention.',
    k: 'Dividend payout ratio vs. FY2025 non-GAAP EPS ($8.29). Note the "headline" payout ratio on TTM EPS is near 1.4% given how much the AI boom has inflated trailing earnings - 5.5% better reflects the underlying policy.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 11.46,
      tevEbitda: 15.16,
      tevEbit: 17.45,
      pDilutedEps: 21.15,
      pTangibleBv: 10.68,
      ntmTevRevenue: 4.4,
      ntmFwdPe: 6.53,
    },
    peers: [
      { ticker: 'AVGO', name: 'Broadcom Inc.', tevRevenue: 24.81, tevEbitda: 44.49, tevEbit: 56.18, pDilutedEps: 63.92, pTangibleBv: null, ntmTevRevenue: 10.9, ntmFwdPe: 24.39 },
      { ticker: 'TXN', name: 'Texas Instruments', tevRevenue: 15.22, tevEbitda: 32.39, tevEbit: 42.33, pDilutedEps: 51.03, pTangibleBv: 22.41, ntmTevRevenue: 13.4, ntmFwdPe: 36.17, flag: 'NTM TEV/Revenue approximated using current-fiscal-year (not forward-fiscal-year) consensus revenue - true NTM was paywalled.' },
      { ticker: 'ADI', name: 'Analog Devices', tevRevenue: 15.17, tevEbitda: 31.43, tevEbit: 46.18, pDilutedEps: 57.47, pTangibleBv: null, ntmTevRevenue: 11.4, ntmFwdPe: 27.85 },
      { ticker: 'NXPI', name: 'NXP Semiconductors', tevRevenue: 6.21, tevEbitda: 18.82, tevEbit: 22.98, pDilutedEps: 26.62, pTangibleBv: null, ntmTevRevenue: 5.0, ntmFwdPe: 17.84 },
      { ticker: 'QCOM', name: 'Qualcomm Inc.', tevRevenue: 4.48, tevEbitda: 15.34, tevEbit: 17.45, pDilutedEps: 20.1, pTangibleBv: 16.93, ntmTevRevenue: 4.7, ntmFwdPe: 18.7, flag: 'NTM TEV/Revenue approximated using current-fiscal-year consensus revenue - true NTM was paywalled.' },
      { ticker: 'ON', name: 'ON Semiconductor', tevRevenue: 5.94, tevEbitda: 17.59, tevEbit: 26.1, pDilutedEps: 63.94, pTangibleBv: 6.65, ntmTevRevenue: 5.0, ntmFwdPe: 26.73 },
      { ticker: 'WDC', name: 'Western Digital Corp.', tevRevenue: 16.13, tevEbitda: 48.36, tevEbit: 51.61, pDilutedEps: 30.42, pTangibleBv: 35.73, ntmTevRevenue: 14.8, ntmFwdPe: 34.35, flag: 'NTM TEV/Revenue approximated using current-fiscal-year consensus revenue - true NTM was paywalled.' },
      { ticker: 'SKHY', name: 'SK Hynix (Nasdaq ADR)', tevRevenue: 9.94, tevEbitda: 14.4, tevEbit: 17.08, pDilutedEps: 17.46, pTangibleBv: 8.39, ntmTevRevenue: null, ntmFwdPe: 4.58, flag: 'Only listed on Nasdaq July 10, 2026 - US-side forward consensus coverage is still thin; NTM revenue estimate not found.' },
    ],
    note: 'P/Tangible BV is "n/a" (not simply missing) for AVGO and ADI - both carry large goodwill/intangibles from M&A, making tangible book value negative or immaterial. Peer set favors true memory/storage comps (WDC, SK Hynix) alongside broader semis given Micron’s profile.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 15540, epsGaap: -5.34, epsNonGaap: null, cfps: 1.4, ebitda: 2011, ebit: -5745, netIncome: -5833, da: 7756, cfo: 1559, capex: 7676, fcf: -6117, roe: -0.132, dps: 0.46, totalAssets: 64254, totalEquity: 44120 },
    { year: 'FY2024A', isEstimate: false, revenue: 25111, epsGaap: 0.7, epsNonGaap: null, cfps: 7.66, ebitda: 9084, ebit: 1304, netIncome: 778, da: 7780, cfo: 8507, capex: 8386, fcf: 121, roe: 0.017, dps: 0.46, totalAssets: 69416, totalEquity: 45131 },
    { year: 'FY2025A', isEstimate: false, revenue: 37378, epsGaap: 7.59, epsNonGaap: 8.29, cfps: 15.65, ebitda: 18122, ebit: 9770, netIncome: 8539, da: 8352, cfo: 17525, capex: 15857, fcf: 1668, roe: 0.158, dps: 0.46, totalAssets: 82798, totalEquity: 54165 },
    { year: 'FY2026E', isEstimate: true, revenue: 129590, epsGaap: null, epsNonGaap: 73.32, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.6, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: 234240, epsGaap: null, epsNonGaap: 149.64, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0.6, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2026 consensus reflects an extraordinary in-year acceleration (Q3 FY26 alone: $41.46B revenue, $28.24B GAAP net income) - only revenue and EPS consensus were confidently available for FY2026E/FY2027E; other line items were not found as discrete published estimates.',

  cashFlow: [
    { year: 'FY2023A', cfo: 1559, cfi: -6191, cff: 4983, capex: 7676, da: 7756, dividendsPaid: 504, buybacks: 425, netDebtActivity: 5955, receivables: null, payables: null, inventory: null },
    { year: 'FY2024A', cfo: 8507, cfi: -8309, cff: -1842, capex: 8386, da: 7780, dividendsPaid: 513, buybacks: 300, netDebtActivity: -898, receivables: 6615, payables: 7299, inventory: 8875 },
    { year: 'FY2025A', cfo: 17525, cfi: -14087, cff: -850, capex: 15857, da: 8352, dividendsPaid: 522, buybacks: 0, netDebtActivity: -189, receivables: 9265, payables: 9649, inventory: 8355 },
  ],
  cashFlowNote:
    'CapEx has gone from $7.68B (FY23) to $15.86B (FY25, +107%) while D&A stayed nearly flat ($7.76B to $8.35B, +8%) - CapEx now runs ~1.9x D&A, and FY2026 guidance points to >$25B, widening the gap further. This is the AI/HBM fab buildout (Idaho, New York); it means reported EBIT/EBITDA understate true ongoing capital intensity, and free cash flow (despite record CFO) is being suppressed by the buildout. Inventory actually declined slightly YoY despite revenue growth - consistent with HBM being effectively sold out rather than stockpiled.',

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
      'Micron designs and manufactures memory and storage semiconductors: DRAM, NAND flash, and increasingly High Bandwidth Memory (HBM) for AI accelerators. Reporting segments span Cloud Memory (data center/hyperscaler DRAM+HBM), Core Data Center, Mobile & Client, and Automotive & Embedded. Micron holds roughly 22% DRAM market share, and in HBM specifically is the #2 player (~21% share) behind SK Hynix (~62%) and ahead of Samsung (~17%). The company began volume shipping HBM4 in early 2026, targeting Nvidia’s Vera Rubin platform.',
    macroEnvironment:
      'Memory is in a historic undersupply driven by AI datacenter buildout, with HBM demand projected to grow roughly 30% per year through 2030 and current HBM supply effectively sold out. This has driven extraordinary sequential revenue acceleration (Q2-to-Q3 FY26 revenue +74% quarter over quarter) and pushed Micron’s market cap past $1 trillion in 2026. SK Hynix’s July 2026 Nasdaq listing has introduced a new, direct, liquid comp for investors, adding to recent volatility alongside broader profit-taking off the stock’s 52-week high.',
    keyRisks: [
      'HBM oversupply risk in 2027-2028: Samsung, SK Hynix, and Micron are all racing to add capacity; synchronized fab ramps could flip today’s shortage into a glut, compressing prices and margins from currently extreme peak levels.',
      'New direct comp pressure from SK Hynix’s Nasdaq listing: gives investors an easier substitute, and has already been tied to some of MU’s recent pullback.',
      'Customer/platform concentration: HBM revenue is tightly linked to a small number of AI accelerator platforms (e.g. Nvidia Vera Rubin) - any slowdown in hyperscaler AI capex would hit Micron disproportionately.',
      'Extreme capital intensity and execution risk: >$25B guided FY26 CapEx funds multiple simultaneous fab projects; any execution slip or funding disruption threatens a growth thesis that depends on capacity delivering on schedule.',
      'Valuation dispersion / cycle-top risk: the $361-$2,200 analyst price target range is unusually wide for a mega-cap, signaling real disagreement about whether current pricing and margins are sustainable or reflect a cyclical peak.',
    ],
    nearTermCatalysts: [
      'Q4/full-year FY2026 earnings on September 29, 2026 - will show whether the company hits its ~$50B revenue / $31.00 non-GAAP EPS quarterly guide and set the FY2027 tone.',
      'New York fab construction milestones (first concrete poured July 2026) and Idaho Fab 1 ramp toward mid-2027 first output.',
      'HBM4 qualification and shipment progress for Nvidia’s Vera Rubin platform - a recurring quarter-to-quarter catalyst given how much of the growth story rides on HBM.',
      'CHIPS Act funding milestones tied to the Idaho/New York fabs (up to $6.1B in direct federal funding).',
    ],
    investmentThesis:
      'Micron sits at the center of the AI-driven memory super-cycle, with HBM effectively sold out and pricing power the strongest it has been in years - yet the RIM and comps analyses both suggest the market has already priced in a significant continuation of that strength: at $937, the stock trades at a premium to most semiconductor peers on trailing multiples despite a forward P/E of just ~6.5x on the FY2027 EPS spike, and analyst price targets span an unusually wide $361-$2,200 range, reflecting genuine disagreement about durability. The capex build (>$25B guided for FY2026, running ~1.9x D&A) is the right strategic move if HBM demand holds through 2027-2028, but it also means free cash flow stays suppressed and a chunk of that capacity could be poorly timed if the memory market normalizes as multiple analysts expect. This reads as a name where the near-term fundamentals are genuinely excellent, but the valuation already assumes the cycle extends further than history suggests memory cycles usually do - worth sizing with that asymmetry in mind rather than treating the current run-rate as the new steady state.',
  },
}
