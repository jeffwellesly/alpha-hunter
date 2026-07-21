// Plain-language "how this number is calculated" explanations, keyed by
// field. Always available (unlike source citations, which only exist for
// live-mode Claude-researched data) - this is what makes the InfoBadge work
// identically in demo mode and live mode. Keep each entry to one or two
// short sentences; the full walkthrough lives on the About page.

export const EXPLANATIONS = {
  // Dashboard
  currentPrice: 'The stock’s current market price.',
  meanFairValue: 'Average of the fair-value estimates below (RIM terminal price, comps-implied price, analyst consensus) - whichever are available.',
  medianFairValue: 'Median of the same set of fair-value estimates.',
  upside: '(Mean Fair Value ÷ Current Price) − 1.',
  factorScore: 'Average of three 0-100% scores: SCF Quality, DuPont Health vs. course benchmarks, and Valuation Discount. See About → Factor Score for the full formula.',
  factorScoreScf: 'SCF Quality checklist score: each of the 6 flags scores 2 (green), 1 (yellow), or 0 (red) points out of a possible 12.',
  factorScoreDupont: 'Latest-year ROA and ROE measured against Lee-course benchmarks (ROA 6%, ROE 12%), averaged, capped at 100%.',
  factorScoreValuation: 'Upside/downside to Mean Fair Value, mapped so 0% upside = 50% and the full ±30% range spans 0-100%.',
  verdict: 'Buy if upside > +15%, Sell if upside < −15%, otherwise Hold.',
  rimSource: 'The RIM tab’s 12-year terminal implied price (see RIM Valuation tab).',
  compsSource: 'Based on peer median NTM Forward P/E applied to FY1 consensus EPS. Other multiples shown below are for reference/discount comparison only.',
  analystSource: 'Average of analyst consensus mean and median 12-month price targets.',

  // RIM inputs
  fy1Eps: 'Next fiscal year’s consensus normalized EPS estimate.',
  fy2Eps: 'The fiscal year after that’s consensus normalized EPS estimate.',
  ltg: 'Consensus 3-5 year long-term EPS growth rate. Drives explicit-year EPS growth after FY2.',
  bvps: 'Total shareholders’ equity ÷ diluted shares outstanding, as of the last completed fiscal year-end.',
  r: 'The discount rate (cost of equity) used to present-value future residual income. Defaults to 8%, editable.',
  k: 'Dividend payout ratio (dividends per share ÷ EPS) - determines how much of each year’s earnings are retained to grow book value.',
  nextFiscalYearEnd: 'The calendar year label for the upcoming/current fiscal year-end.',
  currentFiscalMonth: 'Months elapsed since the start of the current fiscal year - used to mid-year-adjust the implied price.',
  targetRoe: 'Solved via bisection so the model’s own 12-year terminal implied EPS growth rate equals 6.5% (a steady-state assumption). Editable - overriding it just changes the assumption, not the formula.',
  cumPB: 'Running sum of each year’s present-valued abnormal-ROE growth, plus 1 (starting book value multiple).',
  impliedPrice: 'Total P/B × Book Value/Share × a mid-year discounting adjustment.',
  totalPB: 'Cumulative P/B plus a perpetuity term for value beyond the explicit horizon.',

  // Comps
  tevRevenue: 'Total Enterprise Value ÷ Revenue. EV = market cap + debt − cash, so this measures price relative to sales independent of capital structure.',
  tevEbitda: 'Total Enterprise Value ÷ EBITDA (earnings before interest, tax, depreciation, amortization).',
  tevEbit: 'Total Enterprise Value ÷ EBIT (operating income) - like TEV/EBITDA but after depreciation/amortization.',
  pDilutedEps: 'Share price ÷ diluted earnings per share - the standard trailing P/E ratio.',
  pTangibleBv: 'Share price ÷ tangible book value per share (book value excluding goodwill/intangibles).',
  ntmTevRevenue: 'TEV/Revenue using next-twelve-months forward consensus revenue instead of trailing revenue.',
  ntmFwdPe: 'Price ÷ next-twelve-months forward consensus EPS - the forward P/E.',
  compsStat: 'Computed directly from the peer group’s own multiples shown in the rows above.',
  discountToMedian: '(This company’s multiple ÷ peer median) − 1. Negative = trading at a discount to peers.',

  // DuPont
  netMargin: 'Net Income ÷ Revenue - how much of every sales dollar becomes profit.',
  assetTurnover: 'Revenue ÷ Total Assets - how efficiently assets generate sales.',
  financialLeverage: 'Total Assets ÷ Total Equity - how much debt amplifies equity returns.',
  roa: 'Net Income ÷ Total Assets.',
  roe: 'Net Income ÷ Total Equity, or equivalently Net Margin × Asset Turnover × Financial Leverage.',

  // SCF flags
  adequacy: 'Checks whether operating cash flow (CFO) has stayed positive and covers CapEx + dividends.',
  quality: 'Compares CFO to Net Income (CFO/NI ≥ 1.0 is strong) - flags earnings running ahead of actual cash.',
  workingCapital: 'Compares receivables growth to revenue growth - fast-outpacing receivables can signal collection or channel-stuffing risk.',
  investment: 'Compares CapEx to depreciation (D&A) - roughly 1:1 suggests steady-state reinvestment.',
  financing: 'Checks whether shareholder returns (dividends/buybacks) are self-funded from operations vs. reliant on new debt.',
  growth: 'Checks the CFO/CFI/CFF sign pattern against the classic mature-growth signature (CFO+, CFI−, CFF−).',

  // Analyst views
  targetMean: 'Mean 12-month analyst price target across covering analysts.',
  targetMedian: 'Median 12-month analyst price target.',
  optimismBias: 'Frankel & Lee (1998) framework: flags when consensus long-term growth (LTG) runs well above the company’s own realized historical EPS growth (CAGR).',
}

export function explain(key) {
  return EXPLANATIONS[key] || null
}
