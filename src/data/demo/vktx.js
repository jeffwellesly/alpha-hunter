// Cached demo data for Viking Therapeutics, Inc. (VKTX), researched via live
// web search on 2026-08-13. Not live-fetched at runtime - added as a tenth
// bundled analysis alongside MU/LLY/SNDK/WDC/COST/LRCX/NVDA/AMD/MSFT.
//
// Context: Viking is a clinical-stage biopharma developing VK2735, a dual
// GLP-1/GIP receptor agonist for obesity (subcutaneous and oral formulations),
// with no approved products and no meaningful revenue. Both pivotal Phase 3
// trials for the subcutaneous formulation - VANQUISH-1 (~4,500 patients) and
// VANQUISH-2 (~1,000 patients) - are fully enrolled (78-week trials), and the
// oral formulation's own Phase 3 program is guided to begin Q4 2026. Cash was
// $705.7M at FY2025 year-end, down to $502M by Q2 2026, which management says
// funds operations into 2028.
//
// IMPORTANT - this file is a genuine stress test of the app's valuation
// pipeline, not a data-quality gap: RIM's residual-income model returns a
// negative implied price (excluded automatically, rimReliable=false) because
// deeply negative EPS relative to a thin book value makes the model
// structurally inapplicable to a pre-revenue biotech - exactly the "known
// edge case" already documented and handled elsewhere in this codebase.
// compsImpliedPrice() ALSO returns null here (a real, distinct edge case,
// not previously seen in this bundle): both selected peers (GPCR, KLRA) are
// themselves unprofitable, so there is no positive peer forward P/E to
// compute a median from, and compsImpliedPrice's own null-median guard
// correctly returns null rather than a nonsensical negative "implied price"
// (positive peer P/E x negative EPS). The practical result: the published
// Buy verdict (+184% upside) is driven ENTIRELY by the analyst-consensus
// source - RIM and comps both cleanly exclude themselves rather than
// polluting the blend, but that also means there is zero independent
// cross-check on the verdict here, unlike every other file in this bundle.
// This is disclosed explicitly in the narrative rather than papered over.
//
// Data gaps and judgment calls flagged during research (kept honest rather
// than guessed):
// - No consensus FY2027 (fy2Eps) estimate exists for a company at this
//   stage. Derived as a rough, low-confidence estimate (-$4.20, narrower
//   than FY2026's -$4.63) reflecting management's own Q2 2026 commentary
//   that current spending is the "heaviest phase" of the VANQUISH studies
//   and is expected to taper - NOT a Wall Street consensus figure, since
//   none is published. rimInputs.ltg (-9.3%) is the rate implied by these
//   two figures, not an independently-sourced growth rate.
// - Revenue is left null (not 0) across all years - not confirmed absent,
//   simply not disclosed as a distinct line by the sources checked.
// - capex is set to 0 based on stockanalysis.com's own stated Free Cash
//   Flow figures being identical to Operating Cash Flow in all three actual
//   years (FCF = CFO implies capex rounds to ~$0M for this asset-light
//   clinical-stage company), not a direct capex line-item confirmation.
// - Two of the most directly comparable clinical-stage obesity peers (Terns
//   Pharmaceuticals, Metsera) were both acquired (by Merck and Pfizer
//   respectively) within the past year and are no longer independently
//   traded - the resulting 2-peer set (down from this bundle's usual 3-5)
//   is a real consequence of sector M&A, not an incomplete search.

export const vktxDemo = {
  ticker: 'VKTX',
  companyName: 'Viking Therapeutics, Inc.',
  exchange: 'NASDAQ',
  sector: 'Healthcare',
  industry: 'Biotechnology',
  asOfDate: '2026-08-13',
  currentPrice: 32.94,
  marketCap: 3_840_000_000,
  sharesOutstanding: 116_650_000,
  fiscalYearEndDescription: 'Calendar fiscal year ending December 31 (FY2025 ended December 31, 2025, already reported)',

  rimInputs: {
    fy1Eps: -4.63,
    fy2Eps: -4.20,
    ltg: -0.093,
    bvps: 5.67,
    r: 0.08,
    k: 0,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 8,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus EPS (loss) per stockanalysis.com forecast page.',
    fy2Eps: 'No FY2027 consensus exists. Derived as a rough estimate (-$4.20, a modest narrowing from FY2026) reflecting management’s Q2 2026 commentary that current spend is the heaviest phase of the VANQUISH studies and is expected to taper - an explicit, low-confidence judgment call, not a Wall Street figure.',
    ltg: 'Not a sourced consensus figure - the rate implied by fy1Eps/fy2Eps above (loss narrowing ~9.3%). Included because the RIM engine requires a numeric ltg input, not because a real long-term EPS growth consensus exists for a pre-revenue biotech.',
    bvps: 'FY2025 (ended 12/31/25) stockholders equity ($639.06M) per stockanalysis.com balance sheet, stated directly as $5.67/share.',
    k: 'Viking pays no dividend.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: null,
      tevEbitda: null,
      tevEbit: null,
      pDilutedEps: null,
      pTangibleBv: 9.53,
      ntmTevRevenue: null,
      ntmFwdPe: null,
    },
    peers: [
      { ticker: 'GPCR', name: 'Structure Therapeutics Inc.', tevRevenue: null, tevEbitda: null, tevEbit: null, pDilutedEps: null, pTangibleBv: 2.88, ntmTevRevenue: null, ntmFwdPe: null },
      { ticker: 'KLRA', name: 'Kailera Therapeutics, Inc.', tevRevenue: null, tevEbitda: null, tevEbit: null, pDilutedEps: null, pTangibleBv: null, ntmTevRevenue: null, ntmFwdPe: null },
    ],
    note: 'Peer set is thinner than usual (2 names, vs. this bundle’s typical 3-5) because two of the most direct comparable clinical-stage obesity peers - Terns Pharmaceuticals and Metsera - were acquired by Merck and Pfizer respectively within the past year and are no longer independently traded. Both remaining peers (Structure Therapeutics, Kailera) are themselves unprofitable, so every earnings-based multiple (P/E, TEV/EBITDA, TEV/EBIT) is null for the whole peer set - compsImpliedPrice() correctly returns null rather than a nonsensical figure. The only usable comparison is book-value-based: Viking trades at 9.53x tangible book vs. Structure’s 2.88x (Kailera’s is unavailable), a large premium reflecting the market pricing in Phase 3 optionality well beyond what’s on the balance sheet - context, not a fair-value input. Eli Lilly and Novo Nordisk are the commercial-stage incumbents in this category but are not included as formal comps - a $1T+ profitable commercial franchise is not a comparable equity-multiple peer for a pre-revenue clinical-stage name.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: null, epsGaap: -0.91, epsNonGaap: null, cfps: -0.78, ebitda: -100.54, ebit: -100.83, netIncome: -85.9, da: 0.29, cfo: -73.38, capex: 0, fcf: -73.38, roe: -0.2465, dps: 0, totalAssets: 368.49, totalEquity: 348.42 },
    { year: 'FY2024A', isEstimate: false, revenue: null, epsGaap: -1.01, epsNonGaap: null, cfps: -0.81, ebitda: -150.57, ebit: -150.92, netIncome: -109.96, da: 0.35, cfo: -87.79, capex: 0, fcf: -87.79, roe: -0.1249, dps: 0, totalAssets: 908.32, totalEquity: 880.28 },
    { year: 'FY2025A', isEstimate: false, revenue: null, epsGaap: -3.19, epsNonGaap: null, cfps: -2.47, ebitda: -392.91, ebit: -393.34, netIncome: -359.64, da: 0.43, cfo: -278.69, capex: 0, fcf: -278.69, roe: -0.5628, dps: 0, totalAssets: 715.73, totalEquity: 639.06 },
    { year: 'FY2026E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: -4.63, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: -4.20, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: null, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'No revenue in any year - this is a pure clinical-stage cost/burn profile, not a growth-margin story. Net loss widened sharply every year, and especially in FY2025A (-$359.64M vs. -$109.96M FY2024A, a 3.3x jump) as both VANQUISH Phase 3 trials ramped simultaneously. Equity more than doubled FY2023A->FY2024A (multiple capital raises) then fell FY2024A->FY2025A ($880.3M -> $639.1M) as the widening loss outpaced new capital - book value per share fell from $8.07 to $5.67 over the same period. FY2026E/FY2027E figures are consensus/derived loss-per-share only (see rimInputNotes) - there is no revenue estimate to show.',

  cashFlow: [
    { year: 'FY2023A', cfo: -73.38, cfi: -179.09, cff: 271.38, capex: 0, da: 0.29, dividendsPaid: 0, buybacks: 7.12, netDebtActivity: 0, receivables: null, payables: null, inventory: null },
    { year: 'FY2024A', cfo: -87.79, cfi: -553.37, cff: 612.46, capex: 0, da: 0.35, dividendsPaid: 0, buybacks: 42.1, netDebtActivity: 0, receivables: null, payables: null, inventory: null },
    { year: 'FY2025A', cfo: -278.69, cfi: 341.39, cff: 76.44, capex: 0, da: 0.43, dividendsPaid: 0, buybacks: 0, netDebtActivity: 0, receivables: null, payables: null, inventory: null },
  ],
  cashFlowNote: 'Operating cash outflow nearly quadrupled FY2023A->FY2025A (-$73.4M -> -$278.7M) as both Phase 3 programs ramped - this is the core risk in this file, not a data anomaly. Financing activity (equity issuance, no debt) has funded the burn every year, most heavily in FY2024A ($612.5M raised). FY2025A’s positive investing cash flow (+$341.4M, vs. deeply negative in FY2023A/24A) reflects maturing short-term investments being converted back to cash rather than new investment purchases, consistent with the company drawing down its investment portfolio to fund operations. Total debt is negligible (under $1.3M) throughout - netDebtActivity is 0 in all years, not a data gap. Cash was $705.7M at FY2025 year-end but had fallen to $502M by Q2 2026 per the company’s own disclosure - management states this funds operations into 2028.',

  analystViews: {
    targetMean: 92.39,
    targetMedian: 95.0,
    targetHigh: 125.0,
    targetLow: 35.0,
    numAnalysts: 20,
    buy: 18,
    hold: 2,
    sell: 0,
  },

  narrative: {
    companyOverview:
      'Viking Therapeutics is a clinical-stage biopharmaceutical company developing VK2735, a dual GLP-1/GIP receptor agonist for obesity, in both subcutaneous and oral formulations. The company has no approved products and generates effectively no revenue - its roughly $3.8 billion market value rests entirely on clinical and commercial expectations for a pipeline still in Phase 3 testing. Phase 2 data was strong: the VENTURE trial showed up to 14.7% mean body-weight reduction after 13 weekly doses with no sign of plateauing, and the drug was safe and well tolerated. Two pivotal Phase 3 trials for the subcutaneous formulation - VANQUISH-1 (~4,500 patients) and VANQUISH-2 (~1,000 patients) - are both fully enrolled and running 78-week courses, with the oral formulation’s own Phase 3 program guided to begin in Q4 2026. If VK2735 succeeds, Viking becomes a genuine third entrant into a GLP-1/GIP obesity market Eli Lilly and Novo Nordisk have already proven can scale to tens of billions in sales; if it fails, there is no revenue base to fall back on.',
    macroEnvironment:
      'Viking operates in the most closely watched drug category in biopharma, which is exactly why a clinical-stage challenger can command a multi-billion-dollar valuation years before any revenue - investors are pricing optionality on a category with proven demand, not speculating on an unproven market. It is also a crowded, consolidating field: two of Viking’s most direct clinical-stage peers, Terns Pharmaceuticals and Metsera, were acquired by Merck and Pfizer respectively within the past year, leaving a thinner set of independent comparable public peers than usual. Management has guided that current cash ($502M as of Q2 2026, down from $705.7M at 2025 fiscal year-end) funds operations into 2028, meaning Viking should not need to raise capital again before the VANQUISH Phase 3 readouts are in hand - a real, disclosed runway constraint rather than an open-ended one.',
    keyRisks: [
      'The valuation here has no independent cross-check: RIM returns a negative implied price (excluded automatically) because deeply negative EPS relative to a thin book value makes the model structurally inapplicable, and peer comps return no signal either because neither Structure Therapeutics nor Kailera has positive earnings. The entire +184% upside figure in this analysis is 100% a function of the $92.39 average analyst price target, unlike every other name in this bundle where multiple methods corroborate each other.',
      'Binary Phase 3 readout risk: VANQUISH-1 and VANQUISH-2 are both fully enrolled 78-week trials; a disappointing efficacy or safety readout on either would remove the entire premise behind the current valuation, since there is no revenue base to cushion the downside.',
      'Cash burn is accelerating, not stabilizing: operating cash outflow nearly quadrupled from -$73.4M (FY2023A) to -$278.7M (FY2025A) as both Phase 3 programs ramped simultaneously; management’s "funded into 2028" guidance assumes no unplanned spending increase.',
      'A thinning peer set from biotech M&A: two of the most direct comparable clinical-stage obesity names (Terns, Metsera) were acquired in the past year - double-edged, since it validates the category’s strategic value but also removes independent read-throughs Viking’s own valuation could otherwise be checked against.',
      'Competitive field led by two giants with approved products: Eli Lilly and Novo Nordisk already generate tens of billions in GLP-1/GIP revenue and have deep next-generation pipelines of their own; Viking’s differentiation (oral formulation potential, dosing profile) has to hold up against incumbents with vastly larger commercial and R&D resources.',
    ],
    nearTermCatalysts: [
      'VANQUISH-1 and VANQUISH-2 Phase 3 topline data - the single largest value-defining event for the stock, expected in the back half of 2027 given both trials’ 78-week duration from their respective enrollment-completion dates.',
      'Oral VK2735 Phase 3 trial initiation, guided for Q4 2026 - the market’s read on whether Viking can credibly compete for the "first oral GLP-1/GIP obesity drug" positioning.',
      'Q3 2026 earnings (expected around November 2026) - the next disclosed cash-runway and burn-rate update against the "funded into 2028" guidance.',
      'Any read-through from Eli Lilly’s or Novo Nordisk’s own oral GLP-1 program updates, given direct competitive relevance to Viking’s oral VK2735 timeline.',
      'Potential partnership or licensing deal announcements - a company at this valuation and pipeline stage is a plausible M&A/partnership candidate, as the Terns and Metsera precedents in the same category demonstrate.',
    ],
    investmentThesis:
      'Running the numbers here lands on a Buy at +184% upside, but that headline needs a large asterisk: it comes entirely from the $92.39 average analyst price target, because neither of this analysis’s other two methodologies produces a usable signal. RIM’s residual-income model returns a negative implied price - unsurprising given deeply negative EPS relative to a thin, shrinking book value - and gets automatically excluded. Peer-multiple comps return no signal either, because Viking’s closest active clinical-stage peers (Structure Therapeutics, Kailera) are themselves unprofitable, leaving no positive peer P/E to apply. That leaves this "Buy" resting entirely on 20 analysts’ collective judgment that Phase 3 VANQUISH data (topline expected in 2027) will validate the strong Phase 2 signal (up to 14.7% weight loss, no plateau) - a real, well-supported view, but a sentiment-based one, not a cross-checked valuation the way this bundle’s profitable names get. Cash funds operations into 2028 per management, so Viking should reach its Phase 3 readouts without needing to raise. This is a name to own only if you have a genuine view on the clinical data itself - the valuation framework here can’t independently tell you whether the market’s optimism is warranted.',
  },

  sources: [
    {
      category: 'Historical Income Statement (FY2022-FY2025)',
      url: 'https://stockanalysis.com/stocks/vktx/financials/',
      dataUsed: 'financials[].epsGaap, ebit (operating income), netIncome for FY2023A/FY2024A/FY2025A; current price ($32.94) as of 2026-08-13. Confirms no revenue/R&D line shown - clinical-stage, pre-revenue.',
    },
    {
      category: 'Balance Sheet (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/vktx/financials/balance-sheet/',
      dataUsed: 'financials[].totalAssets, totalEquity for FY2023A/24A/25A; book value per share ($5.67 FY2025, used as rimInputs.bvps); cash and total debt context for narrative.',
    },
    {
      category: 'Cash Flow Statement (FY2023-FY2025)',
      url: 'https://stockanalysis.com/stocks/vktx/financials/cash-flow-statement/',
      dataUsed: 'cashFlow[].cfo, cfi, cff, da, buybacks for FY2023A/24A/25A; capex inferred as ~0 from FCF figures matching CFO exactly in all three years.',
    },
    {
      category: 'Valuation Multiples (VKTX)',
      url: 'https://stockanalysis.com/stocks/vktx/statistics/',
      dataUsed: 'Market cap ($3.84B), enterprise value ($3.34B), shares outstanding (116.65M diluted); comps.targetMetrics.pTangibleBv (9.53); confirmation that TEV/Revenue, P/E, and forward P/E are not meaningful for this company.',
    },
    {
      category: 'Forward Estimates & Analyst Consensus (VKTX)',
      url: 'https://stockanalysis.com/stocks/vktx/forecast/',
      dataUsed: 'rimInputs.fy1Eps (-4.63, FY2026 consensus); analystViews (targetMean $92.39/targetMedian $95/targetHigh $125/targetLow $35, 20 analysts, 13 strong buy/5 buy/2 hold/0 sell).',
    },
    {
      category: 'Peer Structure Therapeutics (GPCR) - Valuation',
      url: 'https://stockanalysis.com/stocks/gpcr/statistics/',
      dataUsed: 'comps.peers[GPCR]: pTangibleBv (2.88); confirmation of negative EPS/no meaningful P/E, consistent unprofitable-peer profile.',
    },
    {
      category: 'Peer Kailera Therapeutics (KLRA) - Valuation',
      url: 'https://stockanalysis.com/stocks/klra/statistics/',
      dataUsed: 'comps.peers[KLRA]: market cap ($2.33B) for peer-scale context; confirmation of negative earnings and unavailable P/TBV.',
    },
    {
      category: 'VANQUISH-1/VANQUISH-2 Phase 3 Enrollment & Oral Program Timeline',
      url: 'https://ir.vikingtherapeutics.com/2026-03-26-Viking-Therapeutics-Announces-Completion-of-Enrollment-in-Phase-3-VANQUISH-2-Trial-of-VK2735',
      dataUsed: 'narrative: VANQUISH-1 (~4,500 patients, enrolled Nov 2025) and VANQUISH-2 (~1,000 patients, enrolled Q1 2026) both 78-week trials; oral VK2735 Phase 3 initiation guided Q4 2026; Q2 2026 cash position ($502M) and "funded into 2028" guidance.',
    },
    {
      category: 'Phase 2 VENTURE Trial Results',
      url: 'https://www.appliedclinicaltrialsonline.com/view/oral-glp-1-gip-dual-agonist-vk2735-achieves-weight-loss-venture-trial',
      dataUsed: 'narrative.companyOverview: up to 14.7% mean body-weight reduction after 13 weekly doses in the Phase 2 VENTURE trial, no plateau, favorable safety/tolerability.',
    },
    {
      category: 'Terns Pharmaceuticals / Metsera Acquisitions (Peer-Set Context)',
      url: 'https://www.pfizer.com/news/press-release/press-release-detail/pfizer-completes-acquisition-metsera',
      dataUsed: 'comps.note / narrative.macroEnvironment / keyRisks: Terns Pharmaceuticals (acquired by Merck) and Metsera (acquired by Pfizer, closed Nov 2025) both delisted within the past year, explaining the thinner-than-usual peer set.',
    },
  ],
}
