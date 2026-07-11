import Anthropic from '@anthropic-ai/sdk'

// Web search tool + narrative/research calls, made directly from the browser
// using the user's own key. This is the "dangerous direct browser access"
// pattern -- acceptable here because the key is the user's own, entered by
// them and stored only in their own localStorage (same trust model as the
// FMP key), never a shared secret embedded in the app.

function client(apiKey) {
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
}

const WEB_SEARCH_TOOL = { type: 'web_search_20250305', name: 'web_search', max_uses: 5 }

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

async function webSearchQuery({ apiKey, model, systemPrompt, userPrompt, maxTokens = 2000 }) {
  const anthropic = client(apiKey)
  const message = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    tools: [WEB_SEARCH_TOOL],
    messages: [{ role: 'user', content: userPrompt }],
  })
  return extractText(message)
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
