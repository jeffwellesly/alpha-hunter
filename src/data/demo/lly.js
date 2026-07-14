// Cached demo data for Eli Lilly (LLY), researched via live web search on
// 2026-07-13. Not live-fetched at runtime - this is the "Demo Mode"
// snapshot so the app works with zero API keys.
//
// Context: Lilly's incretin (GLP-1) franchise now dominates revenue -
// tirzepatide (Mounjaro + Zepbound) is ~56% of FY2025 revenue. In April
// 2026 Lilly won FDA approval for orforglipron ("Foundayo"), the first
// oral small-molecule GLP-1, opening a major new growth vector. A November
// 2025 Trump administration pricing deal (TrumpRx.gov) cuts GLP-1 list
// prices materially starting 2026 - a real volume-vs-price tradeoff.
//
// Data gaps flagged during research (kept honest rather than guessed):
// - LTG has no clean single-source consensus (sources disagreed by ~2.5x);
//   used 17%, inside the more conservative end of the range.
// - P/Tangible Book Value was not available for any of the 8 peers from
//   free sources (all "n/a", not simply missing).
// - FY2026E/FY2027E EBITDA/EBIT/D&A/CFO/CapEx/FCF were not available as
//   discrete estimates free; only revenue and EPS consensus exist.

export const llyDemo = {
  ticker: 'LLY',
  companyName: 'Eli Lilly and Company',
  exchange: 'NYSE',
  sector: 'Healthcare',
  industry: 'Pharmaceuticals',
  asOfDate: '2026-07-13',
  currentPrice: 1181.87,
  marketCap: 1_113_000_000_000,
  sharesOutstanding: 941_700_000,
  fiscalYearEndDescription: 'Calendar year (December 31)',

  rimInputs: {
    fy1Eps: 36.25,
    fy2Eps: 45.34,
    ltg: 0.17,
    bvps: 29.51,
    r: 0.08,
    k: 0.26,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 7,
  },
  rimInputNotes: {
    fy1Eps: 'Midpoint of company FY2026 non-GAAP guidance ($35.50-$37.00), consistent with analyst consensus (~$35.60-$37.13).',
    fy2Eps: 'FY2027 consensus is a wide range ($39.36-$52.24, average ~$45.34) this far out - treat as directional, not exact.',
    ltg: 'No confidently-sourced consensus LTG; estimates ranged from ~17% to 42%+ depending on source/methodology, given how fast the GLP-1 base is moving. Used 17%, the more conservative end.',
    bvps: 'Total FY2025 stockholders’ equity ($26,535M) / diluted weighted-avg shares (899.3M). Current-quarter book value is higher as retained earnings keep compounding - last-FYE is the RIM convention.',
    k: 'FY2025 actual dividends ($6.00/share) / FY2025 GAAP diluted EPS ($22.95). The payout ratio is shrinking as EPS outgrows the dividend - forward-looking payout on FY26 guidance is closer to 19%.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 15.11,
      tevEbitda: 30.14,
      tevEbit: 31.94,
      pDilutedEps: 41.98,
      pTangibleBv: 59.99,
      ntmTevRevenue: 15.11,
      ntmFwdPe: 32.1,
    },
    peers: [
      { ticker: 'NVO', name: 'Novo Nordisk A/S', tevRevenue: 4.71, tevEbitda: 8.87, tevEbit: 9.55, pDilutedEps: 11.64, pTangibleBv: null, ntmTevRevenue: 4.71, ntmFwdPe: 16.29 },
      { ticker: 'MRK', name: 'Merck & Co.', tevRevenue: 5.32, tevEbitda: 11.85, tevEbit: 14.26, pDilutedEps: 34.69, pTangibleBv: null, ntmTevRevenue: 5.32, ntmFwdPe: 20.35 },
      { ticker: 'ABBV', name: 'AbbVie Inc.', tevRevenue: 7.99, tevEbitda: 16.77, tevEbit: 22.93, pDilutedEps: 122.16, pTangibleBv: null, ntmTevRevenue: 7.99, ntmFwdPe: 16.68 },
      { ticker: 'JNJ', name: 'Johnson & Johnson', tevRevenue: 6.78, tevEbitda: 19.04, tevEbit: 24.57, pDilutedEps: 29.85, pTangibleBv: null, ntmTevRevenue: 6.78, ntmFwdPe: 21.78 },
      { ticker: 'PFE', name: 'Pfizer Inc.', tevRevenue: 3.02, tevEbitda: 7.51, tevEbit: 10.11, pDilutedEps: 18.68, pTangibleBv: null, ntmTevRevenue: 3.02, ntmFwdPe: 8.62 },
      { ticker: 'BMY', name: 'Bristol-Myers Squibb', tevRevenue: 3.23, tevEbitda: 8.26, tevEbit: 10.25, pDilutedEps: 16.61, pTangibleBv: null, ntmTevRevenue: 3.23, ntmFwdPe: 9.7 },
      { ticker: 'AZN', name: 'AstraZeneca PLC', tevRevenue: 4.77, tevEbitda: 14.4, tevEbit: 19.28, pDilutedEps: 25.19, pTangibleBv: null, ntmTevRevenue: 4.77, ntmFwdPe: 20.14 },
      { ticker: 'NVS', name: 'Novartis AG', tevRevenue: 5.67, tevEbitda: 13.99, tevEbit: 17.41, pDilutedEps: 20.74, pTangibleBv: null, ntmTevRevenue: 5.67, ntmFwdPe: 16.61 },
    ],
    note: 'P/Tangible Book Value was not available for any of the 8 peers from free sources (returned "n/a"). True NTM EV/Revenue wasn’t published for peers either - only trailing values are shown for NTM TEV/Revenue as an approximation (a peer forward P/S figure for Novo Nordisk was found but looked like a data-extraction error and was discarded rather than used).',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 34124, epsGaap: 5.8, epsNonGaap: null, cfps: 4.46, ebitda: 7984, ebit: 6457, netIncome: 5240, da: 1527, cfo: 4240, capex: 3448, fcf: 792, roe: 0.482, dps: 4.52, totalAssets: 64006, totalEquity: 10864 },
    { year: 'FY2024A', isEstimate: false, revenue: 45043, epsGaap: 11.71, epsNonGaap: null, cfps: 9.38, ebitda: 14666, ebit: 12899, netIncome: 10590, da: 1767, cfo: 8818, capex: 5058, fcf: 3760, roe: 0.742, dps: 5.2, totalAssets: 78715, totalEquity: 14272 },
    { year: 'FY2025A', isEstimate: false, revenue: 65179, epsGaap: 22.95, epsNonGaap: 24.21, cfps: 18.7, ebitda: 28299, ebit: 26302, netIncome: 20640, da: 1997, cfo: 16813, capex: 7841, fcf: 8972, roe: 0.778, dps: 6.0, totalAssets: 112476, totalEquity: 26535 },
    { year: 'FY2026E', isEstimate: true, revenue: 85500, epsGaap: null, epsNonGaap: 36.25, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 6.92, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: 94600, epsGaap: null, epsNonGaap: 45.34, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 6.92, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2026E revenue uses company guidance ($82.0-85.0B) midpoint; only revenue and EPS consensus were confidently available for FY2026E/FY2027E, other line items were not found as discrete published estimates.',

  cashFlow: [
    { year: 'FY2023A', cfo: 4240, cfi: -7153, cff: 3496, capex: 3448, da: 1527, dividendsPaid: 4069, buybacks: 750, netDebtActivity: 3959, receivables: null, payables: null, inventory: null },
    { year: 'FY2024A', cfo: 8818, cfi: -9302, cff: 1230, capex: 5058, da: 1767, dividendsPaid: 4680, buybacks: 2500, netDebtActivity: 10753, receivables: 11006, payables: 3229, inventory: 7589 },
    { year: 'FY2025A', cfo: 16813, cfi: -10972, cff: -2213, capex: 7841, da: 1997, dividendsPaid: 5384, buybacks: 4108, netDebtActivity: 12389, receivables: 17760, payables: 5379, inventory: 13744 },
  ],
  cashFlowNote:
    'CFO nearly doubled in each of the last two years ($4.24B -> $8.82B -> $16.81B) on tirzepatide volume growth - a high-quality signal of real cash conversion, not just accruals. But working capital is growing even faster in places: receivables +61% and inventory +81% YoY in FY2025, reflecting the manufacturing ramp and larger customer/PBM balances. CapEx has climbed steeply ($3.4B -> $5.1B -> $7.8B, +127% cumulative) while D&A grew only modestly ($1.5B -> $2.0B, +31%) - the signature of the incretin manufacturing buildout (including a >$1.2B Puerto Rico facility), which will temporarily depress ROA/asset turnover even as ROE stays elevated.',

  analystViews: {
    targetMean: 1251.0,
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
      'Eli Lilly is a diversified large-cap pharmaceutical company now dominated by its incretin (GLP-1) franchise. FY2025 revenue mix: tirzepatide (Mounjaro for diabetes and Zepbound for obesity) is roughly 56% of revenue, with Verzenio (oncology), Trulicity (legacy diabetes GLP-1, in decline), Taltz (immunology), and Jardiance (diabetes/cardio-renal) making up most of the rest. In April 2026 Lilly won FDA approval for orforglipron (brand name Foundayo), the first oral small-molecule GLP-1 receptor agonist, opening a major new growth vector alongside its injectable franchise.',
    macroEnvironment:
      '2026 is being characterized industry-wide as "the year of obesity pills" - Novo Nordisk beat Lilly to market with an oral semaglutide in January 2026, while Lilly followed with oral orforglipron in April 2026, and has been taking GLP-1 market share from Novo outside the US. A November 2025 Trump administration pricing deal created a direct-to-consumer platform (TrumpRx.gov) launching in 2026 with GLP-1 list prices cut materially and Medicare beginning to cover obesity indications for some patients - a double-edged catalyst that expands volume but pressures realized price and mix.',
    keyRisks: [
      'Intensifying GLP-1 competition: Novo’s oral Wegovy, compounded/DTC alternatives, and emerging next-generation entrants (including Lilly’s own pipeline) all compete for the same obesity dollar.',
      'US drug-pricing/policy risk: TrumpRx and Medicare-linked pricing structurally compress realized net price per script even as volume grows.',
      'Legacy franchise decline: Trulicity revenue is shrinking over 25% in recent quarters as patients migrate to tirzepatide and orals - a real mix risk within the portfolio.',
      'Manufacturing and execution risk: the capex buildout (>$7.8B in FY2025 plus new capacity) must convert to reliable supply; any shortfall directly threatens the growth thesis baked into current estimates.',
      'Valuation/expectations risk: trading at ~42x trailing and ~32x forward P/E, well above all 8 peers, the stock has very little room for a growth disappointment.',
    ],
    nearTermCatalysts: [
      'Q2 2026 earnings on August 5, 2026 - next checkpoint on guidance and GLP-1 volume trends.',
      'Continued orforglipron (Foundayo) launch trajectory following its April 2026 FDA approval.',
      'Ongoing pipeline readouts across the incretin franchise (Taltz + Zepbound combination data, orforglipron switch-studies, retatrutide in obesity and osteoarthritis) through 2026.',
      'TrumpRx.gov platform rollout and Medicare GLP-1 coverage expansion (mid-2026) - watch for volume/price data as this scales.',
    ],
    investmentThesis:
      'Eli Lilly’s GLP-1 franchise has driven extraordinary growth - revenue nearly doubled from FY2023 to FY2025 and ROE now sits above 75% - but the RIM and comps analyses both suggest the current ~$1,182 price already assumes that growth continues at a torrid pace: the stock trades at a meaningful premium to every pharmaceutical peer in the comp set on every multiple, and the valuation leaves little room for disappointment given intensifying oral-GLP-1 competition from Novo Nordisk and real policy-driven pricing pressure from the 2026 TrumpRx framework. The underlying cash-generation quality is genuinely strong (CFO nearly doubling for two straight years, high-quality earnings conversion), and the orforglipron launch is a real second leg of growth, but working capital and CapEx are both scaling faster than the P&L, and much of the bull case depends on manufacturing capacity delivering on an aggressive buildout timeline. This reads as a high-quality business trading at a full price - appropriate for a core long-term holding, but not obviously mispriced to the upside at current levels.',
  },
}
