// Cached demo data for Sandisk Corporation (SNDK), researched via live web
// search on 2026-07-14. Not live-fetched at runtime - added as a third
// "published analysis" sample alongside MU/LLY.
//
// Context: Sandisk was spun off from Western Digital's Flash business on
// February 21, 2025 and now trades independently on Nasdaq. Like Micron,
// it's in the middle of an extraordinary AI-driven memory (NAND) pricing
// supercycle: FY2025 (ended June 27, 2025) was still a $1.6B loss year, but
// trailing-twelve-month results through Q3 FY26 (ended ~March 2026) already
// show $13.18B revenue and $4.51B net income - the inflection happened
// entirely within FY2026, which hasn't been fully reported yet as of this
// writing. Consensus sees EPS climbing from ~$66 (FY26E) to ~$180 (FY27E)
// to a projected peak near $264 (FY28E) before an expected cyclical
// moderation - see Key Risks.
//
// Data gaps flagged during research (kept honest rather than guessed):
// - LTG has no clean single "long-term" consensus rate - near-term
//   consensus growth is extreme and non-linear (FY26->FY27 +171%,
//   FY27->FY28 +47%), not a stable multi-year CAGR. Used 18% as a
//   documented mid-cycle deceleration assumption for RIM.512's years 3-5
//   (see rimInputNotes.ltg).
// - FY2023A/FY2024A predate the spinoff (Flash-segment carve-out results);
//   FY2023's unusually high total equity ($22.9B, vs. $11.1B a year later)
//   likely reflects a large intercompany distribution to Western Digital
//   ahead of separation, not organic value destruction.
// - Analyst target median wasn't cleanly reported separately from the mean
//   across sources checked - left null rather than guessed.
// - FY2026E/FY2027E have consensus EPS and (FY26 only) revenue; other line
//   items weren't available as discrete published estimates.

export const sndkDemo = {
  ticker: 'SNDK',
  companyName: 'Sandisk Corporation',
  exchange: 'NASDAQ',
  sector: 'Technology',
  industry: 'Semiconductors (Memory & Storage)',
  asOfDate: '2026-07-14',
  currentPrice: 1757.82,
  marketCap: 260_320_000_000,
  sharesOutstanding: 148_090_000,
  fiscalYearEndDescription: '52/53-week fiscal year ending the last Friday in June (FY2025 ended June 27, 2025)',

  rimInputs: {
    fy1Eps: 66.41,
    fy2Eps: 180.0,
    ltg: 0.18,
    bvps: 90.79,
    r: 0.08,
    k: 0,
    nextFiscalYearEnd: 2026,
    currentFiscalMonth: 13,
  },
  rimInputNotes: {
    fy1Eps: 'FY2026 consensus non-GAAP EPS, 19 analysts (FY2026 ended ~late June 2026 but has not yet been formally reported).',
    fy2Eps: 'FY2027 consensus EPS estimates ranged $177-$183 across sources; used $180 as a rounded middle estimate.',
    ltg: 'Consensus shows extreme, non-linear near-term acceleration (FY26 $66.41 -> FY27 ~$180 -> FY28 ~$264 projected peak) driven by the NAND/AI supercycle, not a stable long-term rate. Used 18% as a documented mid-cycle deceleration assumption for RIM.512’s explicit years 3-5, given memory markets’ well-documented cyclicality (see Key Risks) rather than extrapolating recent growth forward indefinitely.',
    bvps: 'TTM book value per share (most recent reported), as of the quarter ended ~April 3, 2026.',
    k: 'Sandisk pays no dividend.',
    currentFiscalMonth: 'FY2026 ended ~late June 2026 but full-year results have not yet been reported (last confirmed annual: FY2025, ended June 27, 2025) - per the RIM "between fiscal year-end and earnings release" edge case, the month count keeps climbing from the FY2025 anchor rather than resetting to a low number.',
  },

  comps: {
    targetMetrics: {
      tevRevenue: 19.46,
      tevEbitda: 46.51,
      tevEbit: 47.78,
      pDilutedEps: 59.17,
      pTangibleBv: 19.36,
      ntmTevRevenue: 12.96,
      ntmFwdPe: 9.73,
    },
    peers: [
      { ticker: 'WDC', name: 'Western Digital Corp.', tevRevenue: 16.48, tevEbitda: 49.38, tevEbit: 54.39, pDilutedEps: 30.85, pTangibleBv: null, ntmTevRevenue: 16.48, ntmFwdPe: 34.83, flag: 'NTM TEV/Revenue approximated using trailing revenue - forward consensus revenue wasn’t captured this pass.' },
      { ticker: 'STX', name: 'Seagate Technology Holdings', tevRevenue: 18.05, tevEbitda: 58.97, tevEbit: 64.04, pDilutedEps: 83.18, pTangibleBv: null, ntmTevRevenue: 18.05, ntmFwdPe: 34.85, flag: 'NTM TEV/Revenue approximated using trailing revenue - forward consensus revenue wasn’t captured this pass.' },
      { ticker: 'MU', name: 'Micron Technology, Inc.', tevRevenue: 12.3, tevEbitda: 16.26, tevEbit: 18.74, pDilutedEps: 21.15, pTangibleBv: 10.68, ntmTevRevenue: 4.4, ntmFwdPe: 6.53 },
    ],
    note: 'Peer set is the direct storage/memory comp group (HDD makers WDC/STX, memory maker MU) - no other pure-play NAND flash competitor trades as a standalone US-listed stock. TEV approximated as market cap net of TTM cash (gross of debt); full net-debt schedules weren’t pulled for each peer this pass. MU’s P/Tangible BV and NTM TEV/Revenue reused from MU’s own same-week research (2026-07-13) rather than re-derived.',
  },

  financials: [
    { year: 'FY2023A', isEstimate: false, revenue: 6086, epsGaap: -14.78, epsNonGaap: null, cfps: null, ebitda: -1587, ebit: -2035, netIncome: -2143, da: 448, cfo: -713, capex: 219, fcf: -932, roe: -0.0937, dps: 0, totalAssets: 13820, totalEquity: 22878 },
    { year: 'FY2024A', isEstimate: false, revenue: 6663, epsGaap: -4.63, epsNonGaap: null, cfps: null, ebitda: -244, ebit: -468, netIncome: -672, da: 224, cfo: -309, capex: 166, fcf: -475, roe: -0.0606, dps: 0, totalAssets: 13506, totalEquity: 11082 },
    { year: 'FY2025A', isEstimate: false, revenue: 7355, epsGaap: -11.32, epsNonGaap: null, cfps: 0.57, ebitda: -1214, ebit: -1377, netIncome: -1641, da: 163, cfo: 84, capex: 204, fcf: -120, roe: -0.178, dps: 0, totalAssets: 12985, totalEquity: 9216 },
    { year: 'FY2026E', isEstimate: true, revenue: 19800, epsGaap: null, epsNonGaap: 66.41, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
    { year: 'FY2027E', isEstimate: true, revenue: null, epsGaap: null, epsNonGaap: 180.0, cfps: null, ebitda: null, ebit: null, netIncome: null, da: null, cfo: null, capex: null, fcf: null, roe: null, dps: 0, totalAssets: null, totalEquity: null },
  ],
  financialsNote: 'FY2023A/FY2024A predate the February 2025 spinoff (Flash-segment carve-out results). FY2025A was still a loss year - the supercycle inflection happened entirely within FY2026, which had not yet been formally reported as of this writing (TTM through Q3 FY26 already shows $13.18B revenue and $4.51B net income). FY2027E has EPS consensus only - no discrete revenue estimate was found free.',

  cashFlow: [
    { year: 'FY2023A', cfo: -713, cfi: null, cff: null, capex: 219, da: 448, dividendsPaid: 0, buybacks: 0, netDebtActivity: null, receivables: 605, payables: 626, inventory: 2269 },
    { year: 'FY2024A', cfo: -309, cfi: null, cff: null, capex: 166, da: 224, dividendsPaid: 0, buybacks: 0, netDebtActivity: null, receivables: 1044, payables: 670, inventory: 1955 },
    { year: 'FY2025A', cfo: 84, cfi: 556, cff: 518, capex: 204, da: 163, dividendsPaid: 0, buybacks: 0, netDebtActivity: 2344, receivables: 1068, payables: 766, inventory: 2079 },
  ],
  cashFlowNote: 'FY2023’s total equity ($22.9B) vs. FY2024’s ($11.1B, -52%) most likely reflects a large intercompany distribution to Western Digital ahead of the spinoff, not organic value destruction - not confirmed via a specific disclosure this pass. CFO turned positive only in FY2025 ($84M) after two deeply negative years, well before the FY2026 earnings inflection shows up in the numbers. FY2025’s net debt activity (+$2,344M, from $2,520M issued vs. $176M repaid) funded the transition to a debt-free balance sheet by the most recent reported quarter (TTM total debt: $0).',

  analystViews: {
    targetMean: 2035.05,
    targetMedian: null,
    targetHigh: 3250.0,
    targetLow: 1000.0,
    numAnalysts: 22,
    buy: 18,
    hold: 3,
    sell: 1,
  },

  narrative: {
    companyOverview:
      'Sandisk designs and manufactures NAND flash memory and storage solutions - consumer products (memory cards, USB drives, portable SSDs) and enterprise/data-center SSDs - built on flash technology originally developed within Western Digital, from which it was spun off as an independent public company on February 21, 2025. The company operates as one of the largest NAND flash producers globally, competing directly with Samsung, SK Hynix, Kioxia, and Micron in a highly capital-intensive, cyclical industry now being reshaped by AI-driven demand for high-capacity enterprise storage.',
    macroEnvironment:
      'NAND flash pricing has surged through 2026 as AI infrastructure buildouts drive demand for high-capacity enterprise SSDs far beyond what the industry can currently supply, mirroring the DRAM/HBM shortage benefiting Micron. This dynamic flipped Sandisk from consecutive annual losses (FY2023-FY2025) to a trailing-twelve-month net income of $4.5B in barely a year, and pushed the stock up more than 4,000% from its post-spinoff lows near $40 to above $1,750, briefly touching a 52-week high of $2,354.39. Goldman Sachs and Wedbush have both raised price targets sharply on continued NAND pricing gains, while some analysts flag the guidance-versus-Street gap (Q4 FY26 guidance of $30-33 non-GAAP EPS versus a prior consensus near $21.76) as evidence the market is still catching up to the pace of the inflection.',
    keyRisks: [
      'NAND oversupply / cycle-top risk: memory markets are structurally cyclical, and Samsung, SK Hynix, Kioxia, and Micron are all capacity-constrained in the same way Sandisk is - synchronized capacity additions across the industry could flip today’s shortage into a glut, as has happened in every prior NAND cycle.',
      'Extreme valuation dispersion: the $1,000-$3,250 analyst price target range (more than 3x) signals genuine disagreement about how much of the current earnings run-rate is durable versus a cyclical peak.',
      'Single-product concentration: unlike diversified peers, Sandisk is a pure-play NAND flash producer with no DRAM or HBM exposure to offset a NAND-specific downturn.',
      'Newly independent balance sheet and reporting history: with only about 18 months of standalone public trading and carve-out financials before that, Sandisk has a shorter track record than its peers for assessing management execution through a full cycle.',
      'Guidance credibility: Q4 FY26 guidance ($30-33 non-GAAP EPS) already implies a further sharp sequential acceleration - a moderation in NAND pricing before that quarter reports could produce a meaningful guidance miss relative to how much good news is now priced in.',
    ],
    nearTermCatalysts: [
      'Fiscal Q4/full-year 2026 earnings (expected around late August 2026) - the first full-year report since the supercycle inflection, and the first read on whether Q4 guidance ($30-33 non-GAAP EPS) proves conservative, as Wedbush and others expect.',
      'Continued NAND contract pricing data points through the September quarter, which will shape FY2027 consensus (currently ~$180 EPS) either higher or lower.',
      'Any additional sell-side price target revisions following Goldman Sachs’ and Wedbush’s recent upward moves, given how quickly estimates have been moving in 2026.',
      'Stock-split speculation given the four-figure share price - not confirmed or filed as of this writing, but a frequently discussed catalyst/distraction for the stock.',
    ],
    investmentThesis:
      'Sandisk is a pure-play way to express the same AI-driven memory supercycle thesis as Micron, but concentrated entirely in NAND flash rather than diversified across DRAM/HBM - and the market has re-rated it even more dramatically, up over 4,000% from its post-spinoff lows. At $1,757.82, the stock trades on a trailing P/E of ~59x but a forward P/E of under 10x, reflecting consensus expectations that EPS roughly triples from FY2026 (~$66) to FY2027 (~$180) and climbs further toward a projected FY2028 peak near $264. The RIM and comps analyses both essentially agree with the sell side that near-term earnings power is real and dramatically higher than pre-supercycle levels - the open question is durability, not the current run-rate itself. With a $1,000-$3,250 analyst target range, a debt-free balance sheet as of the most recent quarter, and a single-product (NAND-only) profile that offers no cushion if pricing normalizes, this reads as a high-conviction but high-variance way to play the memory cycle - appropriate only for investors comfortable underwriting genuine cyclical-peak risk alongside the upside.',
  },

  sources: [
    {
      category: 'Company Profile & Current Price',
      url: 'https://stockanalysis.com/stocks/sndk/',
      dataUsed: 'Current price ($1,757.82), market cap, shares outstanding, trailing P/E (59.17), forward P/E (9.73), sector/industry, 52-week range, dividend info (none paid).',
    },
    {
      category: 'Historical Financials (FY2023A-FY2025A, TTM)',
      url: 'https://stockanalysis.com/stocks/sndk/financials/',
      dataUsed: 'FY2025/TTM revenue, net income, operating income (EBIT), EBITDA, diluted EPS, margins, free cash flow.',
    },
    {
      category: 'Historical Financials, 10-year view (FY2023A/FY2024A detail)',
      url: 'https://stockanalysis.com/stocks/sndk/financials/?p=10-year',
      dataUsed: 'FY2023A and FY2024A revenue, net income, diluted EPS, EBITDA, operating income (pre-spinoff carve-out figures).',
    },
    {
      category: 'Balance Sheet (BVPS, equity, assets)',
      url: 'https://stockanalysis.com/stocks/sndk/financials/balance-sheet/',
      dataUsed: 'TTM/FY2025 total assets, total equity, total debt, cash, and book value per share (used as rimInputs.bvps = $90.79).',
    },
    {
      category: 'Balance Sheet, 10-year view (FY2023A/FY2024A detail)',
      url: 'https://stockanalysis.com/stocks/sndk/financials/balance-sheet/?p=10-year',
      dataUsed: 'FY2023A/FY2024A total assets, total equity, receivables, payables, inventory.',
    },
    {
      category: 'Cash Flow Statement',
      url: 'https://stockanalysis.com/stocks/sndk/financials/cash-flow-statement/',
      dataUsed: 'TTM/FY2025 CFO, CFI, CapEx, D&A, financing activities detail (debt issued/repaid, net debt activity).',
    },
    {
      category: 'Cash Flow Statement, 10-year view (FY2023A/FY2024A detail)',
      url: 'https://stockanalysis.com/stocks/sndk/financials/cash-flow-statement/?p=10-year',
      dataUsed: 'FY2023A/FY2024A CFO, CapEx, D&A.',
    },
    {
      category: 'Forward Estimates / Analyst Consensus (EPS, revenue, price target)',
      url: 'https://stockanalysis.com/stocks/sndk/forecast/',
      dataUsed: 'FY2026 consensus EPS ($66.41) and revenue (~$19.8B) from 19 analysts (rimInputs.fy1Eps); consensus price target $2,035.05 (15.77% upside cited at time of research).',
    },
    {
      category: 'Spinoff from Western Digital (fiscal calendar / corporate history)',
      url: 'https://www.sec.gov/Archives/edgar/data/0000106040/000162828026004131/a4ex991-pressreleaseq126.htm',
      dataUsed: 'Confirmation of Sandisk\'s spinoff from Western Digital completing February 21, 2025, used to determine which fiscal years are pre-spinoff carve-out results.',
    },
    {
      category: 'Fiscal Q3 FY2026 Results (most recent reported quarter)',
      url: 'https://www.businesswire.com/news/home/20260430227141/en/Sandisk-Reports-Fiscal-Third-Quarter-2026-Financial-Results',
      dataUsed: 'Q3 FY26 revenue ($5.95B), GAAP EPS ($23.03), non-GAAP EPS ($23.41), and Q4 FY26 guidance ($7.75-8.25B revenue, $30-33 non-GAAP EPS) - used in macroEnvironment and keyRisks narrative.',
    },
    {
      category: 'Analyst Price Target Revision (Goldman Sachs)',
      url: 'https://www.thestreet.com/investing/stocks/sndk-sandisk-stock-price-target-goldman-sachs-july-2026-nand-supply',
      dataUsed: 'Goldman Sachs price target raised to ~$2,200 on NAND supply tightness, cited in nearTermCatalysts/macroEnvironment.',
    },
    {
      category: 'FY2027/FY2028 EPS Estimate Context',
      url: 'https://www.fool.com/investing/2026/06/24/prediction-this-will-be-sandisks-stock-price-by-ye/',
      dataUsed: 'FY2027 EPS estimate (~$183) and FY2028 EPS estimate (~$264) used to cross-check rimInputs.fy2Eps ($180) and describe the projected earnings trajectory in the narrative.',
    },
    {
      category: 'Peer Comps - Western Digital (WDC)',
      url: 'https://stockanalysis.com/stocks/wdc/',
      dataUsed: 'WDC price, trailing/forward P/E, used as inputs to WDC\'s TEV/Revenue, TEV/EBITDA, TEV/EBIT, P/Diluted EPS multiples in the peer comps table.',
    },
    {
      category: 'Peer Comps - Western Digital (WDC) financials',
      url: 'https://stockanalysis.com/stocks/wdc/financials/',
      dataUsed: 'WDC TTM revenue, EBITDA, EBIT used to compute TEV-based multiples in the peer comps table.',
    },
    {
      category: 'Peer Comps - Seagate Technology (STX)',
      url: 'https://stockanalysis.com/stocks/stx/',
      dataUsed: 'STX price, trailing/forward P/E, used as inputs to STX\'s TEV/Revenue, TEV/EBITDA, TEV/EBIT, P/Diluted EPS multiples in the peer comps table.',
    },
    {
      category: 'Peer Comps - Seagate Technology (STX) financials',
      url: 'https://stockanalysis.com/stocks/stx/financials/',
      dataUsed: 'STX TTM revenue, EBITDA, EBIT used to compute TEV-based multiples in the peer comps table.',
    },
    {
      category: 'Peer Comps - Micron (MU) cross-reference',
      url: 'https://stockanalysis.com/stocks/mu/',
      dataUsed: 'MU\'s P/Tangible BV (10.68) and NTM TEV/Revenue (4.4) reused from the same-week MU research (2026-07-13) rather than re-derived, per the comps.note disclosure.',
    },
  ],
}
