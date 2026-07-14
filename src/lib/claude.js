import Anthropic from '@anthropic-ai/sdk'

// Anthropic is the ONLY data source AlphaHunter uses - there is no FMP or
// other financials API. Every number on every tab (financials, cash flow,
// comps multiples, peer selection, analyst consensus, fiscal calendar) is
// reconstructed via Claude web search. This is a deliberate reliability
// trade-off vs. a structured financials API: web-search-reconstructed
// statements can be internally inconsistent or wrong in ways a real filing
// API wouldn't be, which is exactly why every value needs a visible source
// citation (see the V2 spec's source-citation requirement) once this is
// more than a personal tool.
//
// In the browser these calls are made directly from the client using the
// user's own key - the "dangerous direct browser access" pattern, acceptable
// here because the key is the user's own, entered by them, never a shared
// secret embedded in the app. In Node (admin CLI) that SDK guard doesn't
// apply and the flag is omitted.

function client(apiKey) {
  const isBrowser = typeof window !== 'undefined'
  return new Anthropic({ apiKey, ...(isBrowser ? { dangerouslyAllowBrowser: true } : {}) })
}

function extractText(message) {
  return message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim()
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = fenced ? fenced[1] : text
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON object found in Claude response')
  return JSON.parse(raw.slice(start, end + 1))
}

async function webSearchQuery({ apiKey, model, systemPrompt, userPrompt, maxTokens = 2000, maxUses = 5 }) {
  const anthropic = client(apiKey)
  const message = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: maxUses }],
    messages: [{ role: 'user', content: userPrompt }],
  })
  return extractText(message)
}

/**
 * Fetches company profile, last-5-years financials, cash flow statement, and
 * the target company's own comps multiples - everything that used to come
 * from FMP's 6-call bundle (see git history / lib/fmp.js, retired). This is
 * the single heaviest research call in the pipeline: wide search budget and
 * output budget since it's reconstructing a multi-year financial history.
 */
export async function fetchCompanyFundamentals({ ticker, model, apiKey }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    maxUses: 10,
    maxTokens: 6000,
    systemPrompt:
      'You are an equity research data analyst. Use web search across multiple sources ' +
      '(company 10-K/10-Q filings, investor relations, stockanalysis.com, macrotrends.net, ' +
      'wsj.com/market-data) to reconstruct accurate historical and consensus financial data. ' +
      'Prefer figures you can cross-check across two sources. Use null for any field you ' +
      'cannot find with reasonable confidence - never guess or estimate silently. Always ' +
      'respond with ONLY a single JSON object matching the requested schema, no prose outside the JSON.',
    userPrompt: `Research ${ticker} and return this exact JSON shape:
{
  "companyName": "", "exchange": "", "sector": "", "industry": "",
  "currentPrice": 0, "marketCap": 0, "sharesOutstanding": 0,
  "fiscalYearEndDescription": "",
  "bvps": 0, "dividendPayoutRatio": 0,
  "financials": [
    { "year": "FY2023A", "isEstimate": false, "revenue": 0, "epsGaap": 0, "epsNonGaap": null, "cfps": null, "ebitda": null, "ebit": null, "netIncome": 0, "da": null, "cfo": null, "capex": null, "fcf": null, "roe": null, "dps": null, "totalAssets": null, "totalEquity": null }
  ],
  "cashFlow": [
    { "year": "FY2023A", "cfo": 0, "cfi": 0, "cff": 0, "capex": 0, "da": 0, "dividendsPaid": 0, "buybacks": 0, "netDebtActivity": 0, "receivables": null, "payables": null, "inventory": null }
  ],
  "targetMetrics": { "tevRevenue": null, "tevEbitda": null, "tevEbit": null, "pDilutedEps": null, "pTangibleBv": null, "ntmTevRevenue": null, "ntmFwdPe": null },
  "sources": [{"label": "", "url": ""}]
}

Rules:
- "financials" and "cashFlow": last 3-5 completed fiscal years (isEstimate: false, "revenue"/"netIncome" etc as reported dollar amounts in millions, "roe"/"dps" as reported), plus up to 2 forward years if credible consensus estimates exist (isEstimate: true, only "revenue" and "epsNonGaap" populated, everything else null - do not guess forward-year balance sheet or cash flow figures).
- "bvps": most recent fiscal year-end book value per share.
- "dividendPayoutRatio": dividends per share / EPS, as a decimal (0 if no dividend).
- "targetMetrics": current trading multiples (TEV/Revenue, TEV/EBITDA, TEV/EBIT, Price/Diluted EPS, Price/Tangible Book Value). "ntmTevRevenue"/"ntmFwdPe" are next-twelve-months forward versions if available, else null (do not silently substitute trailing values).
- All dollar figures in millions except per-share figures.

Respond with ONLY the JSON object, no other text.`,
  })
  return extractJson(text)
}

/**
 * Suggests a comps peer set for the target company - closest public
 * competitors by business model and scale. Callers may override/edit this
 * list; it's a starting point, not a locked decision.
 */
export async function fetchPeerTickers({ ticker, model, apiKey }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    maxUses: 5,
    maxTokens: 1500,
    systemPrompt:
      'You are an equity research analyst selecting a comparable-companies (comps) peer set. ' +
      'Respond with ONLY a single JSON object, no other text.',
    userPrompt: `Identify 5-8 of the closest publicly-traded comparable companies to ${ticker} for a comps valuation analysis - similar business model, end markets, and scale where possible. Do not include ${ticker} itself.

Respond with ONLY this JSON object:
{"peers": [{"ticker": "", "name": ""}], "sources": [{"label": "", "url": ""}]}`,
  })
  return extractJson(text)
}

/**
 * Fetches one peer's comps multiples only (no full financial history) -
 * the Claude-web-search equivalent of FMP's old 2-call peer fetch.
 */
export async function fetchPeerMultiples({ ticker, name, model, apiKey }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    maxUses: 5,
    maxTokens: 1200,
    systemPrompt:
      'You are an equity research data analyst finding current trading multiples for a comps ' +
      'table. Use null for anything you cannot find with reasonable confidence. Respond with ' +
      'ONLY a single JSON object, no other text.',
    userPrompt: `Find current trading multiples for ${ticker}${name ? ` (${name})` : ''}:
- tevRevenue: TEV/Revenue
- tevEbitda: TEV/EBITDA
- tevEbit: TEV/EBIT
- pDilutedEps: Price/Diluted EPS (trailing P/E)
- pTangibleBv: Price/Tangible Book Value (null if tangible book value is negative/immaterial)
- ntmTevRevenue: next-twelve-months forward TEV/Revenue (null if not available - do not substitute trailing)
- ntmFwdPe: next-twelve-months forward P/E (null if not available - do not substitute trailing)
- sources: array of {label, url}

Respond with ONLY this JSON object:
{"tevRevenue": null, "tevEbitda": null, "tevEbit": null, "pDilutedEps": null, "pTangibleBv": null, "ntmTevRevenue": null, "ntmFwdPe": null, "sources": []}`,
  })
  const multiples = extractJson(text)
  return { ticker, name: name || ticker, ...multiples }
}

/**
 * Fetches analyst consensus for the RIM inputs + Analyst Views tab:
 * FY1/FY2 EPS, LTG, target price mean/median/#analysts, rating breakdown.
 */
export async function fetchAnalystConsensus({ ticker, model, apiKey }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    systemPrompt:
      'You are a sell-side equity research assistant. Use web search to find current, ' +
      'real analyst consensus data. Always respond with ONLY a single JSON object matching ' +
      'the requested schema, no prose outside the JSON.',
    userPrompt: `Find the current Wall Street analyst consensus for ${ticker}. I need:
- fy1EpsNormalized: consensus non-GAAP/normalized EPS estimate for the next fiscal year (number)
- fy2EpsNormalized: consensus estimate for the fiscal year after that (number)
- longTermGrowthRate: consensus 3-5 year long-term EPS growth rate, as a decimal (e.g. 0.15 for 15%)
- targetPriceMean: mean 12-month analyst price target (number)
- targetPriceMedian: median 12-month analyst price target (number)
- numAnalysts: number of analysts covering the stock for the price target (integer)
- ratingsBuy, ratingsHold, ratingsSell: counts of analysts in each rating bucket (integers)
- sources: array of {label, url} for where these numbers came from

Respond with ONLY this JSON object, no other text:
{"fy1EpsNormalized": 0, "fy2EpsNormalized": 0, "longTermGrowthRate": 0, "targetPriceMean": 0, "targetPriceMedian": 0, "numAnalysts": 0, "ratingsBuy": 0, "ratingsHold": 0, "ratingsSell": 0, "sources": []}`,
    maxTokens: 3000,
  })
  return extractJson(text)
}

/**
 * Fiscal year-end + next earnings release date, for the RIM "Current Fiscal
 * Month" edge case (if today is between FYE and the earnings release,
 * the month count should not wrap back to a low number).
 */
export async function fetchFiscalCalendar({ ticker, model, apiKey }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    systemPrompt:
      'You are a financial data research assistant. Use web search to find accurate fiscal ' +
      'calendar data. Always respond with ONLY a single JSON object, no prose outside the JSON.',
    userPrompt: `Find fiscal calendar facts for ${ticker}:
- lastFiscalYearEndDate: the most recently completed fiscal year end date, ISO format YYYY-MM-DD
- nextFiscalYearEndDate: the upcoming/current fiscal year's end date, ISO format YYYY-MM-DD
- nextFiscalYearEndYear: the calendar year label used for that fiscal year end (integer, e.g. 2026)
- earningsReleaseForLastFiscalYear: the earnings release date (actual if already reported, else estimated) for the annual/Q4 results covering lastFiscalYearEndDate specifically - i.e. the FIRST earnings release after that fiscal year end. This is NOT necessarily the next chronological earnings release from today; if the company is already deep into its new fiscal year, this date is likely in the past. ISO format YYYY-MM-DD, or null if unknown.
- sources: array of {label, url}

Respond with ONLY this JSON object, no other text:
{"lastFiscalYearEndDate": "", "nextFiscalYearEndDate": "", "nextFiscalYearEndYear": 0, "earningsReleaseForLastFiscalYear": null, "sources": []}`,
    maxTokens: 2000,
  })
  return extractJson(text)
}

/**
 * Frankel & Lee (1998) style optimism-bias flag: compares consensus LTG /
 * near-term estimates against the company's own historical realized growth.
 */
export async function flagAnalystOptimism({ ticker, model, apiKey, consensus, historicalEpsGrowthCagr }) {
  const text = await webSearchQuery({
    apiKey,
    model,
    systemPrompt:
      'You are an equity research analyst applying the Frankel & Lee (1998) framework for ' +
      'detecting analyst optimism bias: consensus long-term growth (LTG) estimates that run ' +
      'well above a company\'s own historically realized earnings growth are a red flag for ' +
      'systematic analyst over-optimism. Respond with ONLY a single JSON object, no other text.',
    userPrompt: `Company: ${ticker}
Analyst consensus long-term growth rate (LTG): ${(consensus.longTermGrowthRate * 100).toFixed(1)}%
Consensus FY1 EPS: ${consensus.fy1EpsNormalized}, FY2 EPS: ${consensus.fy2EpsNormalized}
Company's own historical realized EPS growth (CAGR, last few years): ${
      historicalEpsGrowthCagr != null ? (historicalEpsGrowthCagr * 100).toFixed(1) + '%' : 'unknown - use web search to estimate it'
    }

Determine whether consensus estimates look inflated relative to realized historical growth and sector norms.

Respond with ONLY this JSON object:
{"flagged": true, "severity": "low|medium|high", "explanation": "one to two sentence explanation"}`,
    maxTokens: 1500,
  })
  return extractJson(text)
}

const NARRATIVE_PROMPTS = {
  companyOverview: (ctx) =>
    `Write a concise (120-180 word) "Company Overview" section for an equity research memo on ${ctx.ticker} (${ctx.companyName}). Cover: what the business does, key segments/products, competitive position. Use web search for current facts. Plain prose, no headers, no bullet points.`,
  macroEnvironment: (ctx) =>
    `Write a concise (120-180 word) "Macro/Sector Environment" section for an equity research memo on ${ctx.ticker} (${ctx.companyName}), covering the current macro and sector-specific tailwinds/headwinds relevant to this stock. Use web search for current facts. Plain prose, no headers, no bullet points.`,
  keyRisks: (ctx) =>
    `Write a "Key Risks" section for an equity research memo on ${ctx.ticker} (${ctx.companyName}) as 4-6 bullet points, each starting with a bolded 2-4 word risk label followed by a one to two sentence explanation. Use web search for current, company-specific risks. Return as a JSON array of strings, each string being one bullet's full text (label + explanation, no markdown bold syntax, just plain text).`,
  nearTermCatalysts: (ctx) =>
    `Write a "Near-Term Catalysts" section for an equity research memo on ${ctx.ticker} (${ctx.companyName}) as 4-6 bullet points of specific, dated or near-dated catalysts. Use web search for current, real catalysts (earnings dates, product launches, etc). Return as a JSON array of strings, each string being one bullet's full text.`,
  investmentThesis: (ctx) =>
    `Write a concise (150-220 word) "Investment Thesis & Conclusion" section for an equity research memo on ${ctx.ticker} (${ctx.companyName}). Recommendation: ${ctx.verdict}. Fair value range: ${ctx.fairValueRange}. Current price: ${ctx.currentPrice}. Synthesize the valuation approaches (RIM: ${ctx.rimSummary}, comps: ${ctx.compsSummary}, analyst consensus: ${ctx.analystSummary}) into a closing argument. Plain prose, no headers.`,
}

export async function generateNarrativeSection(section, context, { model, apiKey }) {
  const promptFn = NARRATIVE_PROMPTS[section]
  if (!promptFn) throw new Error(`Unknown narrative section: ${section}`)

  const isListSection = section === 'keyRisks' || section === 'nearTermCatalysts'
  const text = await webSearchQuery({
    apiKey,
    model,
    systemPrompt: isListSection
      ? 'You are an equity research analyst writing a client memo. Respond with ONLY a JSON array of strings, no other text.'
      : 'You are an equity research analyst writing a client memo. Respond with ONLY the requested prose paragraph, no headers, no preamble, no markdown.',
    userPrompt: promptFn(context),
    maxTokens: 1500,
  })

  if (isListSection) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const raw = fenced ? fenced[1] : text
    const start = raw.indexOf('[')
    const end = raw.lastIndexOf(']')
    if (start === -1 || end === -1) return [text]
    return JSON.parse(raw.slice(start, end + 1))
  }
  return text
}
