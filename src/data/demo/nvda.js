// Cached demo data for NVIDIA Corporation (NVDA), researched via live web
// search on 2026-07-22. Not live-fetched at runtime - added as a seventh
// bundled analysis alongside MU/LLY/SNDK/WDC/COST/LRCX.
//
// Context: NVIDIA is the center of the AI buildout this entire bundle
// orbits - MU/SNDK supply its HBM, LRCX/AMAT/KLAC/ASML build the fab tools
// that make its chips, and NVDA itself sells the GPUs everyone is racing to
// buy. Jensen Huang projected $1 trillion in Blackwell/Vera Rubin purchase
// orders through 2027 at GTC 2026, and Evercore ISI projects data-center
// revenue approaching $750B across FY2026-2027. Its fiscal year runs
// February-January - FY2026 already ended (January 25, 2026) and was
// formally reported, so unlike most other names in this bundle, NVDA is
// currently mid-fiscal-year (~6 months into FY2027) rather than near either
// end of its fiscal calendar.
//
// The interesting result here: unlike Costco elsewhere in this bundle
// (expensive vs. cheap peers), NVDA actually trades at a discount to peers
// AMD and Broadcom on trailing P/E (32.5x vs. AMD's 184.2x and AVGO's
// 66.0x) and EV/EBITDA - because NVDA's earnings have already caught up
// with the AI narrative, while AMD/AVGO are earlier in converting AI hype
// into realized GAAP profit. All three valuation legs (RIM, comps, analyst
// consensus) point the same direction here.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - FY2028 EPS consensus found via general web search ($6.44) looks stale/
//   inconsistent - it implies a YoY EPS *decline* from FY2027E ($8.99),
//   which contradicts every other growth signal here (23-25%/yr consensus
//   revenue growth, $1T Blackwell/Rubin order visibility). Not used - see
//   rimInputNotes.fy2Eps for what was used instead.
// - A clean EPS-specific long-term growth consensus wasn't found; used
//   Simply Wall St's revenue-growth forecast range (23-25%/yr) as a proxy,
//   consistent with how thin LTG data was handled for other names in this
//   bundle.
// - Peer AVGO’s and TSM’s NTM TEV/Revenue are approximated using trailing
//   TEV/Revenue rather than a clean forward figure - AVGO’s FY2027 revenue
//   was paywalled ("Pro" data), and TSM reports revenue in TWD with no
//   clean USD forward conversion captured this pass. Same fallback
//   approach used for WDC/STX in an earlier file in this bundle.
// - financials[].dps figures are approximated as aggregate dividends paid
//   ÷ current shares outstanding (24.22B) - a light estimate, not a
//   precise historical share-count-weighted figure, same approach used
//   elsewhere in this bundle.

export const nvdaDemo = {
  ticker: 'NVDA',
  companyName: 'NVIDIA Corporation',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors',
  asOfDate: '2026-07-22',
  currentPrice: 212.06,
  marketCap: 5_140_000_000_000,
  sharesOutstanding: 24_220_000_000,
  fiscalYearEndDescription: 'Fiscal year runs February-January (FY2026 ended January 25, 2026, already reported); FY2027 - the current fiscal year - ends late January 2027',

  rimInputs: {
    fy1Eps: 8.99,
    fy2Eps: 11.15,
    ltg: 0.24,
    bvps: 6.42,
    r: 0.08,
    k: 0.0429,
    nextFiscalYearEnd: 2027,
    currentFiscalMonth: 6,
  },
  rimInputNotes: {
    fy1Eps: 'FY2027 consensus diluted EPS (53 analysts per stockanalysis.com) - reconciles reasonably with the ~$9.97 forward EPS implied by the stated forward P/E (21.28) at the current price.',
    fy2Eps: 'No reliable FY2028 consensus was found - a general web search turned up $6.44, but that implies an EPS *decline* from FY2027E ($8.99), inconsistent with the 23-25%/yr consensus revenue growth and $1T Blackwell/Rubin order visibility through 2027 cited elsewhere in this file. Derived instead as fy1Eps x (1 + ltg) = 8.99 x 1.24 = 11.15, an explicit, disclosed judgment call rather than using the inconsistent figure.',
    ltg: 'No clean EPS-specific long-term growth consensus was found; used Simply Wall St’s stated revenue-growth forecast (23-25%/yr, used 24% as the midpoint) as a proxy.',
    bvps: 'Total FY2026 (ended 1/25/26) stockholders’ equity ($157,293M) / diluted shares, per stockanalysis.com balance sheet ($6.42/share stated directly) - the RIM convention (last completed fiscal year-end). Very thin relative to the $212 share price given NVIDIA’s exceptionally high reported ROE (114.29% per stockanalysis.com).',
    k: 'stockanalysis.com’s stated dividend payout ratio (4.29%).',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 20.10,
      tevEbitda: 30.79,
      tevEbit: 31.40,
      pDilutedEps: 32.48,
      pTangibleBv: 29.96,
      ntmTevRevenue: 12.96,
      ntmFwdPe: 21.28,
    },
    peers: [
      { ticker: 'AVGO', name: 'Broadcom Inc.', tevRevenue: 25.62, tevEbitda: 45.94, tevEbit: 58.00, pDilutedEps: 66.04, pTangibleBv: null, ntmTevRevenue: 25.62, ntmFwdPe: 25.18 },
      { ticker: 'AMD', name: 'Advanced Micro Devices, Inc.', tevRevenue: 23.82, tevEbitda: 120.07, tevEbit: 202.26, pDilutedEps: 184.18, pTangibleBv: 39.22, ntmTevRevenue: 11.41, ntmFwdPe: 62.36 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Company', tevRevenue: 13.20, tevEbitda: 18.46, tevEbit: 23.52, pDilutedEps: 27.54, pTangibleBv: 9.49, ntmTevRevenue: 13.20, ntmFwdPe: 19.45 },
    ],
    note: 'Peer set spans the AI compute stack: AMD (direct GPU/accelerator competitor), Broadcom (custom AI silicon and networking), and TSMC (the foundry manufacturing NVIDIA’s chips, included for how the market prices AI-exposed semis broadly). AVGO’s and TSM’s NTM TEV/Revenue are approximated using trailing TEV/Revenue rather than a clean forward figure (AVGO’s FY2027 revenue was paywalled; TSM reports in TWD with no clean USD forward conversion captured this pass) - see top-of-file note. Notably, NVDA trades at a *discount* to AMD and AVGO on trailing P/E and EV/EBITDA - its earnings have already caught up with the AI narrative, unlike peers still converting hype into realized GAAP profit.',
  },

  financials: [
    { year: 'FY2024A', isEstimate: false, revenue: 60922, epsGaap: 1.19, epsNonGaap: null, cfps: 2.62, ebitda: 34480, ebit: 32972, netIncome: 29760, da: 1508, cfo: 64089, capex: 1069, fcf: 63020, roe: 0.6924, dps: 0.02, totalAssets: 65728, totalEquity: 42978 },
    { year: 'FY2025A', isEstimate: false, revenue: 130497, epsGaap: 2.94, epsNonGaap: null, cfps: 4.24, ebitda: 83317, ebit: 81453, netIncome: 72880, da: 1864, cfo: 102718, capex: 3236, fcf: 99482, roe: 0.9186, dps: 0.03, totalAssets: 111601, totalEquity: 79327 },
    { year: 'FY2026A', isEstimate: false, revenue: 215938, epsGaap: 4.90, epsNonGaap: null, cfps: 5.19, ebitda: 133230, ebit: 130387, netIncome: 120067, da: 2843, cfo: 125648, capex: 6042, fcf: 119606, roe: 0.7633, dps: 0.04, totalAssets: 206803, totalEquity: 157293 },
    { year: 'FY2027E', isEstimate: true, revenue: 393500, epsGaap: null, epsNonGaap: 8.99, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2028E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 11.15, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'Extraordinary, sustained growth: revenue up +254% (FY24A->FY26A) as data-center AI demand scaled, with FY2027E consensus ($393.50B) implying continued +82% growth. Reported ROE swung from 69.2% (FY24A) to a peak 91.9% (FY25A) before settling to 76.3% (FY26A) as the equity base grew faster than net income - still exceptionally high by any standard. FY2028E revenue consensus wasn’t found reliably (see top-of-file note); FY2028E EPS ($11.15) is a disclosed derived estimate, not a sourced consensus figure.',

  cashFlow: [
    { year: 'FY2024A', cfo: 64089, cfi: -20421, cff: -42359, capex: 1069, da: 1508, dividendsPaid: 395, buybacks: 9533, netDebtActivity: -1250, receivables: null, payables: null, inventory: null },
    { year: 'FY2025A', cfo: 102718, cfi: -52228, cff: -48474, capex: 3236, da: 1864, dividendsPaid: 834, buybacks: 33706, netDebtActivity: -1250, receivables: null, payables: null, inventory: null },
    { year: 'FY2026A', cfo: 125648, cfi: -73441, cff: -54204, capex: 6042, da: 2843, dividendsPaid: 974, buybacks: 40086, netDebtActivity: 0, receivables: null, payables: null, inventory: null },
  ],
  cashFlowNote: 'CFO nearly doubled FY24A->FY25A and grew another +22.3% in FY26A, comfortably funding a rapidly escalating buyback program (+254% FY24A->FY25A, +19% FY25A->FY26A) entirely from operations, with no net new debt issuance in any of the three years. CapEx is still small relative to the scale of the business (~2.8% of revenue in FY26A) despite growing +87% YoY, reflecting NVIDIA’s fabless model - it doesn’t carry the fab capital intensity of MU/WDC or the equipment capex of LRCX elsewhere in this bundle. Receivables/payables/inventory weren’t captured this pass - left null rather than guessed.',

  analystViews: {
    targetMean: 302.83,
    targetMedian: 300.0,
    targetHigh: 500.0,
    targetLow: 180.0,
    numAnalysts: 61,
    buy: 58,
    hold: 2,
    sell: 1,
  },

  narrative: {
    companyOverview:
      'NVIDIA designs the GPUs and AI accelerators at the center of the current AI infrastructure buildout, selling primarily through its Data Center segment (Blackwell and the upcoming Rubin architecture) to hyperscalers and enterprises. At GTC 2026, CEO Jensen Huang projected $1 trillion in combined Blackwell and Vera Rubin purchase orders through 2027, and Evercore ISI projects data-center revenue approaching $750B across FY2026-2027 combined. Demand continues to outstrip supply for its most advanced chips, with hyperscalers reportedly scrambling for every available Blackwell and Hopper GPU.',
    macroEnvironment:
      'NVIDIA’s official guidance excludes data-center revenue from China entirely, given US export controls barring sale of its most advanced AI chips there - a real near-term revenue exclusion, but also latent upside if trade conditions ever improve. The restrictions have driven a parallel black market: reporting relayed by Reuters in June 2026 found prices for restricted chips smuggled into China had more than doubled over the prior six months, underscoring how much demand exists even where NVIDIA can’t legally sell. In May 2026 the US moved to close a reported loophole that may have let Rubin/Blackwell-class chips reach Chinese entities via outside intermediaries. The stock is up +23.74% over the past 52 weeks, trading at $212.06.',
    keyRisks: [
      'China export restrictions represent a large, structurally excluded revenue pool (not modeled into guidance at all) - any further tightening adds downside risk, while any loosening would be a clean upside catalyst not currently priced in by the company’s own guidance.',
      'Extreme customer concentration in a handful of hyperscalers (Microsoft, Google, Amazon, Meta, and similar) driving the bulk of data-center GPU demand - any pause or reallocation in AI capex spending by these few buyers would hit NVIDIA disproportionately.',
      'Competitive intensity is rising on two fronts: AMD’s accelerator roadmap (though NVIDIA still commands premium GPU pricing) and hyperscalers’ own custom AI silicon efforts (several built with Broadcom), which could erode NVIDIA’s share of future capacity over time.',
      'Extremely thin book value relative to price (bvps $6.42 vs. a $212 share price) - like other high-ROE compounders in this bundle, this leaves the RIM model’s implied fade assumptions doing a lot of work, and the FY2028 EPS estimate used here is a disclosed derived figure, not a clean sourced consensus (see rimInputNotes.fy2Eps).',
      'The sheer scale of projected demand ($1T in Blackwell/Rubin orders, ~$750B data-center revenue) raises the bar for what "meeting expectations" looks like - any perceived deceleration, even off an enormous base, could trigger an outsized valuation reaction.',
    ],
    nearTermCatalysts: [
      'Continued Blackwell ramp and Vera Rubin architecture rollout progress against the $1T order-visibility figure cited at GTC 2026.',
      'Any developments on US-China export policy, including further tightening or loosening of restrictions on advanced AI chip sales.',
      'Hyperscaler capex guidance updates from major customers, the clearest near-term read-through on data-center GPU demand.',
      'Quarterly earnings updates on data-center revenue run-rate against the ~$750B FY2026-2027 combined estimate.',
    ],
    investmentThesis:
      'Unlike Costco elsewhere in this bundle - a great business priced for perfection - NVIDIA is unusual in that all three valuation approaches here point the same direction, and comps in particular show it trading at a *discount* to AI-exposed peers: 32.5x trailing earnings versus AMD’s 184.2x and Broadcom’s 66.0x, because NVIDIA’s earnings have already caught up with the AI narrative while those peers are still converting hype into realized GAAP profit. RIM ($364.36 implied) and analyst consensus ($301.41 mean/median) both see meaningful upside, and even the more conservative comps approach ($226.37, dragged toward AMD/AVGO’s much richer multiples) still implies a premium to the current $212.06 price - blending to a Buy at +40.2% upside. The China export exclusion is a real, structurally-excluded revenue pool not even reflected in guidance, making it a rare case where a major risk factor also reads as latent optionality rather than pure downside. The clearest weak point in this specific write-up is the FY2028 EPS figure, which had to be derived rather than sourced cleanly (see rimInputNotes.fy2Eps) - worth revisiting once a reliable FY2028 consensus is available.',
  },

  sources: [
    {
      category: 'Company Profile & Valuation Multiples (NVDA)',
      url: 'https://stockanalysis.com/stocks/nvda/statistics/',
      dataUsed: 'Current price ($212.06), market cap ($5.14T), enterprise value ($5.10T), shares outstanding (24.22B); comps.targetMetrics: tevRevenue (20.10), tevEbitda (30.79), tevEbit (31.40), pDilutedEps (32.48, trailing P/E), pTangibleBv (29.96), ntmFwdPe (21.28, stated forward P/E); dividend payout ratio (4.29%) used for rimInputs.k; reported ROE (114.29%) cited in rimInputNotes.bvps.',
    },
    {
      category: 'Historical Income Statement (FY2022-FY2026)',
      url: 'https://stockanalysis.com/stocks/nvda/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2024A/FY2025A/FY2026A; trailing/forward P/E cross-checked against FY2026A/FY2027E EPS.',
    },
    {
      category: 'Balance Sheet (FY2024-FY2026)',
      url: 'https://stockanalysis.com/stocks/nvda/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2024A/25A/26A; book value per share ($6.42 FY2026, used as rimInputs.bvps); total debt and cash context for narrative.',
    },
    {
      category: 'Cash Flow Statement (FY2024-FY2026)',
      url: 'https://stockanalysis.com/stocks/nvda/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, dividendsPaid, buybacks, netDebtActivity for FY2024A/25A/26A.',
    },
    {
      category: 'Analyst Consensus & Forward Estimates (NVDA)',
      url: 'https://stockanalysis.com/stocks/nvda/forecast/',
      dataUsed: 'rimInputs.fy1Eps (8.99, FY2027); FY2027E revenue ($393.50B) used for comps.targetMetrics.ntmTevRevenue; analystViews (61 analysts, targetMean $302.83/targetMedian $300/targetHigh $500/targetLow $180, 58 buy/2 hold/1 sell).',
    },
    {
      category: 'Long-Term Growth (LTG) Input',
      url: 'https://simplywall.st/stocks/us/semiconductors/nasdaq-nvda/nvidia/future',
      dataUsed: 'rimInputs.ltg (0.24) - Simply Wall St’s stated 3-year revenue growth forecast range (23-25%/yr), used as an EPS-growth proxy in the absence of a clean EPS-specific figure.',
    },
    {
      category: 'FY2028 EPS Data-Quality Check (Not Used)',
      url: 'https://www.zacks.com/stock/quote/NVDA/detailed-earning-estimates',
      dataUsed: 'FY2028 EPS figure ($6.44) checked but judged unreliable (implies a YoY decline from FY2027E) - not used; see rimInputNotes.fy2Eps for the derived figure used instead.',
    },
    {
      category: 'Peer AVGO - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/avgo/statistics/',
      dataUsed: 'Broadcom tevRevenue (25.62), tevEbitda (45.94), tevEbit (58.00), pDilutedEps (66.04), pTangibleBv (n/a), ntmFwdPe (25.18, stated forward P/E), enterprise value ($1.93T).',
    },
    {
      category: 'Peer AMD - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/amd/statistics/',
      dataUsed: 'AMD tevRevenue (23.82), tevEbitda (120.07), tevEbit (202.26), pDilutedEps (184.18), pTangibleBv (39.22), ntmFwdPe (62.36, stated forward P/E), enterprise value ($892.15B).',
    },
    {
      category: 'Peer AMD - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/amd/forecast/',
      dataUsed: 'AMD next-fiscal-year revenue consensus ($78.15B), used with EV to compute comps.peers[AMD].ntmTevRevenue (11.41).',
    },
    {
      category: 'Peer TSM - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/tsm/statistics/',
      dataUsed: 'TSMC tevRevenue (13.20), tevEbitda (18.46), tevEbit (23.52), pDilutedEps (27.54), pTangibleBv (9.49), ntmFwdPe (19.45, stated forward P/E), enterprise value ($1.84T).',
    },
    {
      category: 'Blackwell/Vera Rubin Demand & Data Center Revenue',
      url: 'https://stonqly.com/blog/nvidia-nvda-stock-analysis-2026',
      dataUsed: 'narrative.companyOverview/investmentThesis: $1T Blackwell/Vera Rubin order visibility (GTC 2026), Evercore ISI ~$750B FY2026-2027 data-center revenue projection.',
    },
    {
      category: 'China Export Restrictions & Black Market Pricing',
      url: 'https://www.cnbc.com/2026/05/31/us-takes-step-to-halt-nvidia-ai-chip-shipments-to-chinese-firms-outside-china.html',
      dataUsed: 'narrative.macroEnvironment/keyRisks: May 2026 loophole-closure action, guidance excluding China data-center revenue entirely, June 2026 reporting on restricted-chip black-market price doubling.',
    },
  ],
}
