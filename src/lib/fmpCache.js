// FMP free-tier daily call budget is tight (target: <=250 calls/day, ~4
// stocks/day). Cache every response in localStorage for the rest of the
// calendar day so re-visiting a ticker, switching tabs, or re-adding a peer
// already looked at costs zero additional API calls.

const PREFIX = 'alphahunter.fmpCache.'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function cacheGet(cacheKey) {
  try {
    const raw = localStorage.getItem(PREFIX + cacheKey)
    if (!raw) return undefined
    const { date, value } = JSON.parse(raw)
    if (date !== todayKey()) return undefined
    return value
  } catch {
    return undefined
  }
}

export function cacheSet(cacheKey, value) {
  try {
    localStorage.setItem(PREFIX + cacheKey, JSON.stringify({ date: todayKey(), value }))
  } catch {
    // localStorage full or unavailable - fail silently, just means no caching this call
  }
}

/** Wraps an async fetcher so repeat calls for the same key hit cache instead of the network. */
export async function withCache(cacheKey, fetcher) {
  const cached = cacheGet(cacheKey)
  if (cached !== undefined) return { value: cached, fromCache: true }
  const value = await fetcher()
  cacheSet(cacheKey, value)
  return { value, fromCache: false }
}

export function clearFmpCache() {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX))
  for (const k of keys) localStorage.removeItem(k)
}
