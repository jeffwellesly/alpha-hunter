// Cached demo data for Advanced Micro Devices, Inc. (AMD), researched via
// live web search on 2026-07-23. Not live-fetched at runtime - added as an
// eighth bundled analysis alongside MU/LLY/SNDK/WDC/COST/LRCX/NVDA.
//
// Context: AMD is NVIDIA's most-watched direct GPU/AI-accelerator
// competitor, positioned as the credible "second supplier" for hyperscalers
// diversifying away from NVIDIA's premium pricing. It holds notable design
// wins - 6-gigawatt GPU deals with both OpenAI and Meta, with MI450
// shipments starting H2 2026 - and the MI400 series is projected to
// generate $7.2B in first-year revenue. Even so, current analyst estimates
// put AMD's share of the AI-accelerator market at just 5-7% versus
// NVIDIA's 70-86%, and AMD's strategy leans on being cheaper for
// inference-heavy workloads (projected to be two-thirds of AI compute
// spend by 2026) rather than displacing NVIDIA in training.
//
// This file directly cross-validates a finding from NVDA’s own file in
// this bundle: NVDA’s narrative noted it trades *cheap* vs. AMD on trailing
// P/E (32.5x vs. AMD’s 184.2x). Running the numbers here from AMD’s own
// side confirms the same thing from the other direction - AMD’s comps
// leg is dragged down hard by NVDA’s much lower peer-median multiples,
// producing a materially bearish comps signal even though the underlying
// AI-accelerator growth story is genuinely strong.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - FY2026 consensus EPS conflicts across sources: stockanalysis.com shows
//   $7.43, while a separate Simply Wall St pass showed $5.28. Used $7.43 -
//   it reconciles much more closely with the ~$8.86 forward EPS implied by
//   stockanalysis.com's own stated forward P/E (62.36) at the current
//   price than $5.28 does - see rimInputNotes.fy1Eps.
// - FY2027 EPS consensus was paywalled everywhere checked; derived as
//   fy1Eps x (1 + ltg) = 7.43 x 1.35 = 10.03, an explicit disclosed
//   judgment call, same approach used for NVDA's FY2028 estimate earlier
//   in this bundle.
// - Peer AVGO's NTM TEV/Revenue is approximated using trailing TEV/Revenue
//   (FY2027 revenue was paywalled) - reused from the NVDA file in this
//   bundle, same caveat noted there.
// - AMD pays no dividend - rimInputs.k is 0, not a data gap.

export const amdDemo = {
  ticker: 'AMD',
  companyName: 'Advanced Micro Devices, Inc.',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors',
  asOfDate: '2026-07-23',
  currentPrice: 552.33,
  marketCap: 900_630_000_000,
  sharesOutstanding: 1_630_000_000,
  fiscalYearEndDescription: 'Calendar fiscal year ending December 31 (FY2025 ended December 31, 2025, already reported)',

  rimInputs: {
    fy1Eps: 7.43,
    fy2Eps: 10.03,
    ltg: 0.35,
    bvps: 38.81,
    r: 0.08,
    k: 0,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 7,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus diluted EPS (47 analysts per stockanalysis.com). A separate Simply Wall St pass showed $5.28 for the same year - used $7.43 instead since it reconciles much more closely with the ~$8.86 forward EPS implied by stockanalysis.com’s own stated forward P/E (62.36) at the current price.',
    fy2Eps: 'No reliable FY2027 consensus was found (paywalled everywhere checked). Derived as fy1Eps x (1 + ltg) = 7.43 x 1.35 = 10.03, an explicit disclosed judgment call rather than guessing or leaving null.',
    ltg: 'Simply Wall St’s stated 3-year consensus EPS growth forecast (35%/yr) - an EPS-specific figure, not a revenue-growth proxy.',
    bvps: 'Total FY2025 (ended 12/31/25) stockholders’ equity ($62,999M) / diluted shares, per stockanalysis.com balance sheet ($38.81/share stated directly) - the RIM convention (last completed fiscal year-end).',
    k: 'AMD pays no dividend.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 23.82,
      tevEbitda: 120.07,
      tevEbit: 202.26,
      pDilutedEps: 184.18,
      pTangibleBv: 39.22,
      ntmTevRevenue: 11.41,
      ntmFwdPe: 62.36,
    },
    peers: [
      { ticker: 'NVDA', name: 'NVIDIA Corporation', tevRevenue: 20.10, tevEbitda: 30.79, tevEbit: 31.40, pDilutedEps: 32.48, pTangibleBv: 29.96, ntmTevRevenue: 12.96, ntmFwdPe: 21.28 },
      { ticker: 'AVGO', name: 'Broadcom Inc.', tevRevenue: 25.62, tevEbitda: 45.94, tevEbit: 58.00, pDilutedEps: 66.04, pTangibleBv: null, ntmTevRevenue: 25.62, ntmFwdPe: 25.18 },
      { ticker: 'INTC', name: 'Intel Corporation', tevRevenue: 9.82, tevEbitda: 37.23, tevEbit: 263.06, pDilutedEps: null, pTangibleBv: 5.85, ntmTevRevenue: 8.96, ntmFwdPe: 94.28 },
    ],
    note: 'Peer set is AMD’s direct competitive triangle: NVIDIA (the AI-accelerator leader AMD is chasing), Broadcom (custom AI silicon competitor), and Intel (the legacy x86 CPU rival, currently trailing-unprofitable so pDilutedEps is left null rather than a meaningless negative multiple). NVDA’s and AVGO’s multiples here are reused from their own demo analyses in this same bundle rather than re-derived. AMD trades at a large premium to this peer group on every multiple except NTM TEV/Revenue, most dramatically on trailing P/E (184.2x vs. a 25.2x-94.3x peer range excluding the unprofitable INTC row) - directly mirroring what NVDA’s own file in this bundle already noted from the other side (NVDA trading cheap vs. AMD).',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 22680, epsGaap: 0.53, epsNonGaap: null, cfps: 1.02, ebitda: 3854, ebit: 401, netIncome: 854, da: 3453, cfo: 1667, capex: 546, fcf: 1121, roe: 0.0153, dps: 0, totalAssets: 67885, totalEquity: 55892 },
    { year: 'FY2024A', isEstimate: false, revenue: 25785, epsGaap: 1.01, epsNonGaap: null, cfps: 1.87, ebitda: 4964, ebit: 1900, netIncome: 1641, da: 3064, cfo: 3041, capex: 636, fcf: 2405, roe: 0.0285, dps: 0, totalAssets: 69226, totalEquity: 57568 },
    { year: 'FY2025A', isEstimate: false, revenue: 34639, epsGaap: 2.67, epsNonGaap: null, cfps: 4.73, ebitda: 6698, ebit: 3694, netIncome: 4335, da: 3004, cfo: 7709, capex: 1012, fcf: 6697, roe: 0.0688, dps: 0, totalAssets: 76926, totalEquity: 62999 },
    { year: 'FY2026E', isEstimate: true, revenue: 49650, epsGaap: null, epsNonGaap: 7.43, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 10.03, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'Steady multi-year recovery: revenue up +52.7% and diluted EPS up 5x (FY23A->FY25A) as the Data Center/AI segment scaled, with FY2026E consensus ($49.65B revenue, $7.43 EPS) continuing that trajectory (+43.3% revenue growth). ROE remains modest by this bundle’s standards (6.88% FY25A) versus NVDA’s 76.3% or COST’s high-20s% - AMD’s profitability is still ramping relative to peers despite the strong top-line growth. FY2027E revenue consensus wasn’t available free as of 2026-07-23 and is left null rather than guessed.',

  cashFlow: [
    { year: 'FY2023A', cfo: 1667, cfi: -1423, cff: -1146, capex: 546, da: 3453, dividendsPaid: 0, buybacks: 1412, netDebtActivity: 0, receivables: null, payables: null, inventory: null },
    { year: 'FY2024A', cfo: 3041, cfi: -1101, cff: -2062, capex: 636, da: 3064, dividendsPaid: 0, buybacks: 1590, netDebtActivity: -750, receivables: null, payables: null, inventory: null },
    { year: 'FY2025A', cfo: 7709, cfi: -5533, cff: -431, capex: 1012, da: 3004, dividendsPaid: 0, buybacks: 1923, netDebtActivity: -950, receivables: null, payables: null, inventory: null },
  ],
  cashFlowNote: 'CFO more than quadrupled FY23A->FY25A ($1,667M -> $7,709M) as the business scaled, comfortably funding both a growing buyback program (no dividend - AMD returns capital exclusively via repurchases) and debt reduction (net repayment in FY24A/FY25A, no new issuance). CapEx nearly doubled FY24A->FY25A but remains modest relative to revenue (~2.9% in FY25A) given AMD’s fabless model - like NVIDIA, it doesn’t carry TSMC’s or MU/WDC’s fab-level capital intensity. Receivables/payables/inventory weren’t captured this pass - left null rather than guessed.',

  analystViews: {
    targetMean: 541.66,
    targetMedian: 540.0,
    targetHigh: 725.0,
    targetLow: 320.0,
    numAnalysts: 51,
    buy: 41,
    hold: 10,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'AMD designs CPUs and GPUs, competing with Intel in traditional x86 computing and with NVIDIA in the far faster-growing AI-accelerator market. Its most credible near-term path against NVIDIA is inference rather than training: inference is projected to represent two-thirds of all AI compute spending by 2026, and AMD’s MI350/MI400 series explicitly target that more price-sensitive workload profile. The company has secured real hyperscaler commitments - 6-gigawatt GPU deals with both OpenAI and Meta - with MI450 shipments beginning in the second half of 2026, and the MI400 series alone is projected to generate roughly $7.2B in first-year revenue (an estimated 258,000 units at an average selling price near $30,926).',
    macroEnvironment:
      'Despite these design wins, AMD remains firmly the "second supplier": current estimates put NVIDIA at 70-86% of 2026 AI-accelerator revenue share versus AMD’s 5-7%, depending on whether hyperscaler custom silicon is counted. The stock has still performed well, but the market’s own pricing shows some hesitation about how quickly that share gap closes - the average analyst price target ($541.66) sits essentially flat to slightly below the current $552.33 price, a notably more muted read than the "Strong Buy" consensus label alone would suggest.',
    keyRisks: [
      'Valuation is rich even relative to a peer group that is itself richly valued: 184.2x trailing earnings and 62.4x forward vs. NVIDIA’s 32.5x/21.3x - the market is already pricing in a great deal of the MI400/MI450 ramp succeeding as planned.',
      'Structural share disadvantage: even bullish design-win narratives (OpenAI, Meta) still leave AMD at an estimated 5-7% of AI-accelerator revenue versus NVIDIA’s 70-86% - the inference-first strategy is a real opportunity but starts from a small base against an entrenched leader with its own aggressive roadmap (Blackwell, Vera Rubin).',
      'Profitability still trails peers on a returns basis - 6.88% ROE (FY25A) is modest next to NVIDIA’s 76.3% or this bundle’s other high-return names, meaning AMD is still earlier in translating revenue growth into the kind of margin/return profile the market is already paying premium multiples for.',
      'Customer concentration in a handful of hyperscaler deals (OpenAI, Meta) - the 6-gigawatt commitments are a real positive, but a small number of very large counterparties also means outsized sensitivity if any one of them slows AI infrastructure spending.',
      'Analyst price targets, while numerous (51 analysts) and skewed "buy," average out essentially flat to the current price - a sign the sell-side is not, in aggregate, pricing significant near-term upside despite the bullish rating labels.',
    ],
    nearTermCatalysts: [
      'MI450 shipment ramp beginning in the second half of 2026, the first real revenue test of the OpenAI/Meta 6-gigawatt commitments.',
      'Further hyperscaler design-win announcements or expansions, particularly among AI labs/cloud providers seeking a credible NVIDIA alternative for inference workloads.',
      'Quarterly Data Center segment results as the clearest read-through on whether AMD is actually gaining AI-accelerator share from the current 5-7% baseline.',
      'Any update on Intel’s competitive positioning in traditional CPU markets, where AMD continues to compete for share independent of the AI story.',
    ],
    investmentThesis:
      'AMD’s AI-accelerator story is real - the OpenAI and Meta 6-gigawatt commitments and the projected $7.2B first-year MI400 revenue are genuine, not speculative - but running the numbers here lands on a Sell at -35.8% upside, and the reasons why matter more than the headline. RIM ($335.78 implied) sits well below the $552.33 price, comps ($187.09, peer-median multiples) sits far below it - dragged down hard because AMD trades at 184.2x trailing earnings against NVIDIA’s own 32.5x, exactly mirroring what NVDA’s file in this same bundle already flagged from the other direction - and even analyst consensus ($540.83 mean/median) is essentially flat to the current price rather than bullish. This is a case where a strong, credible growth narrative (AMD as the AI second-supplier) is already very fully priced in relative to where AMD’s own profitability and peer multiples currently sit, not a case of the market missing something. Worth revisiting once MI450 shipments actually start landing revenue in the second half of 2026 and it becomes clearer whether AMD is closing the share gap with NVIDIA or merely defending its current 5-7% slice.',
  },

  sources: [
    {
      category: 'Historical Income Statement (FY2021-FY2025)',
      url: 'https://stockanalysis.com/stocks/amd/financials/',
      dataUsed: 'financials[].revenue, epsGaap, ebitda, ebit, netIncome for FY2023A/FY2024A/FY2025A.',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/amd/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($38.81 FY2025, used as rimInputs.bvps); total debt and cash context for narrative.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/amd/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, capex, da, buybacks, netDebtActivity for FY2023A/24A/25A. No dividend line - AMD pays none.',
    },
    {
      category: 'Valuation Multiples & Analyst Consensus (AMD)',
      url: 'https://stockanalysis.com/stocks/amd/statistics/',
      dataUsed: 'Current price ($552.33), market cap ($900.63B), enterprise value ($892.15B); comps.targetMetrics: tevRevenue (23.82), tevEbitda (120.07), tevEbit (202.26), pDilutedEps (184.18, trailing P/E), pTangibleBv (39.22), ntmFwdPe (62.36, stated forward P/E). Originally sourced while building the NVDA file in this bundle, reused here as AMD’s own target metrics.',
    },
    {
      category: 'Forward Estimates & Price Targets (AMD)',
      url: 'https://stockanalysis.com/stocks/amd/forecast/',
      dataUsed: 'rimInputs.fy1Eps (7.43, FY2026); FY2026E revenue ($49.65B) used for comps.targetMetrics.ntmTevRevenue; analystViews (targetMean $541.66/targetMedian $540/targetHigh $725/targetLow $320, 51 analysts, 41 buy/10 hold/0 sell).',
    },
    {
      category: 'FY2026 EPS Data-Quality Cross-Check',
      url: 'https://simplywall.st/stocks/us/semiconductors/nasdaq-amd/advanced-micro-devices/future',
      dataUsed: 'Cross-checked FY2026 EPS ($5.28) and rimInputs.ltg (0.35, stated 3-year consensus EPS growth forecast) - the EPS figure was not used (see rimInputNotes.fy1Eps) but the LTG figure was.',
    },
    {
      category: 'Peer NVDA & AVGO Multiples (Reused)',
      url: 'https://stockanalysis.com/stocks/nvda/statistics/',
      dataUsed: 'comps.peers[NVDA] reused directly from the NVDA file in this bundle; comps.peers[AVGO] reused from the same source originally used for the NVDA and LRCX files in this bundle.',
    },
    {
      category: 'Peer INTC - Trailing & Forward Multiples',
      url: 'https://stockanalysis.com/stocks/intc/statistics/',
      dataUsed: 'Intel tevRevenue (9.82), tevEbitda (37.23), tevEbit (263.06), pDilutedEps (null - trailing-unprofitable, -$3.17B TTM net income), pTangibleBv (5.85), ntmFwdPe (94.28, stated forward P/E), enterprise value ($527.69B).',
    },
    {
      category: 'Peer INTC - NTM Revenue Estimate',
      url: 'https://stockanalysis.com/stocks/intc/forecast/',
      dataUsed: 'Intel FY2026 consensus revenue ($58.89B), used with EV to compute comps.peers[INTC].ntmTevRevenue (8.96).',
    },
    {
      category: 'MI400/MI450 Hyperscaler Design Wins & Market Share',
      url: 'https://siliconanalysts.com/analysis/amd-vs-nvidia-ai-gpu-market-share-2026',
      dataUsed: 'narrative.companyOverview/macroEnvironment/keyRisks: OpenAI/Meta 6-gigawatt GPU deals, MI450 H2 2026 shipment start, MI400 $7.2B first-year revenue projection, AMD 5-7% vs. NVIDIA 70-86% AI-accelerator share estimates, inference-first competitive strategy.',
    },
  ],
}
