// Financial Modeling Prep client. Free-tier endpoint mapping:
// profile/quote/financial statements/ratios are on the free "stable" API;
// analyst estimates and some NTM/forward data are premium-only on FMP,
// so those are sourced via Claude web search instead (see lib/claude.js).
//
// CALL BUDGET: the free tier caps daily requests, so every call is cached in
// localStorage for the rest of the day (lib/fmpCache.js) and the endpoint
// set is trimmed to the minimum needed per role:
//   - Target company (financials + comps target metrics): 6 calls
//     (profile, income-statement, balance-sheet, cash-flow, ratios, key-metrics)
//   - Each peer (comps multiples only, no multi-year statements): 2 calls
//     (ratios, key-metrics - both already carry EV, EV/Sales, EV/EBITDA,
//     P/E, P/B, tangible book value/share; EV/EBIT and P/TBV are derived
//     from those fields rather than fetched separately)
//   - `quote` and `enterprise-values` are intentionally unused: profile
//     already has price, and key-metrics already has enterpriseValue.
// Budget: 6 + 8*2 = 22 calls per stock analyzed => ~4 stocks/day well
// within a 250/day cap, with headroom for re-adding peers etc. (cached).

import { withCache } from './fmpCache'

const BASE = 'https://financialmodelingprep.com/stable'

export const callLog = { count: 0 }

class FmpError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'FmpError'
    this.status = status
  }
}

async function fmpGet(path, params, apiKey) {
  if (!apiKey) throw new FmpError('No FMP API key configured', 401)
  const url = new URL(`${BASE}${path}`)
  for (const [k, v] of Object.entries(params || {})) {
    if (v !== undefined && v !== null) url.searchParams.set(k, v)
  }
  url.searchParams.set('apikey', apiKey)

  const cacheKey = url.pathname + url.search.replace(/apikey=[^&]+/, 'apikey=x')
  const { value, fromCache } = await withCache(cacheKey, async () => {
    callLog.count++
    const res = await fetch(url.toString())
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new FmpError('FMP API key invalid.', res.status)
      }
      if (res.status === 402) {
        // FMP's free tier gates some symbols (not just some endpoints) behind
        // a paid plan, inconsistently across statement endpoints. E.g. profile
        // works for any symbol, but income-statement 402s for that same
        // symbol even when the same endpoint works fine for others.
        throw new FmpError(
          `This symbol's data for "${path.replace('/', '')}" requires a paid FMP plan (free tier restricts it for this ticker).`,
          402
        )
      }
      throw new FmpError(`FMP request failed (${res.status}) for ${path}`, res.status)
    }
    const data = await res.json()
    if (data && !Array.isArray(data) && data['Error Message']) {
      throw new FmpError(data['Error Message'], 400)
    }
    return data
  })
  return { value, fromCache }
}

export async function getProfile(ticker, apiKey) {
  const { value } = await fmpGet('/profile', { symbol: ticker }, apiKey)
  return value?.[0] || null
}

export async function getIncomeStatement(ticker, apiKey, { period = 'annual', limit = 5 } = {}) {
  const { value } = await fmpGet('/income-statement', { symbol: ticker, period, limit }, apiKey)
  return value
}

export async function getBalanceSheet(ticker, apiKey, { period = 'annual', limit = 5 } = {}) {
  const { value } = await fmpGet('/balance-sheet-statement', { symbol: ticker, period, limit }, apiKey)
  return value
}

export async function getCashFlowStatement(ticker, apiKey, { period = 'annual', limit = 5 } = {}) {
  const { value } = await fmpGet('/cash-flow-statement', { symbol: ticker, period, limit }, apiKey)
  return value
}

export async function getKeyMetrics(ticker, apiKey, { period = 'annual', limit = 5 } = {}) {
  const { value } = await fmpGet('/key-metrics', { symbol: ticker, period, limit }, apiKey)
  return value
}

export async function getRatios(ticker, apiKey, { period = 'annual', limit = 5 } = {}) {
  const { value } = await fmpGet('/ratios', { symbol: ticker, period, limit }, apiKey)
  return value
}

/**
 * Full bundle for the target company: financials, SCF inputs, and comps
 * target-metrics. 6 calls, cached per ticker per day.
 */
export async function getCompanyBundle(ticker, apiKey) {
  const fields = {
    profile: () => getProfile(ticker, apiKey),
    income: () => getIncomeStatement(ticker, apiKey),
    balance: () => getBalanceSheet(ticker, apiKey),
    cashFlow: () => getCashFlowStatement(ticker, apiKey),
    keyMetrics: () => getKeyMetrics(ticker, apiKey),
    ratios: () => getRatios(ticker, apiKey),
  }

  const entries = await Promise.all(
    Object.entries(fields).map(async ([key, fn]) => {
      try {
        return [key, { data: await fn(), error: null }]
      } catch (err) {
        return [key, { data: null, error: err.message }]
      }
    })
  )

  const result = { ticker }
  for (const [key, { data, error }] of entries) {
    result[key] = data
    if (error) {
      result.errors = result.errors || {}
      result.errors[key] = error
    }
  }
  return result
}

/**
 * Lightweight peer fetch for the Comps tab: 2 calls (ratios + key-metrics),
 * both most-recent-period only. Multiples are derived from these fields
 * rather than fetched individually - see comps.js / useCompanyData.js for
 * the derivation (e.g. TEV/EBIT = evToEBITDA * ebitdaMargin/ebitMargin).
 */
export async function getPeerMetrics(ticker, apiKey) {
  try {
    const [ratiosRows, keyMetricsRows] = await Promise.all([
      getRatios(ticker, apiKey, { limit: 1 }),
      getKeyMetrics(ticker, apiKey, { limit: 1 }),
    ])
    return { ticker, ratios: ratiosRows?.[0] || null, keyMetrics: keyMetricsRows?.[0] || null, error: null }
  } catch (err) {
    return { ticker, ratios: null, keyMetrics: null, error: err.message }
  }
}

export { FmpError }
