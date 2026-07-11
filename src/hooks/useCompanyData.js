import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { getDemoData } from '../data/demo'

/**
 * Normalizes into the same shape whether the source is cached demo data or
 * the live FMP fetch owned by AppContext. The actual fetch happens ONCE per
 * ticker/key change in AppContext (not per-tab) - this hook just selects
 * and merges, it never triggers a network call itself.
 */
export function useCompanyData() {
  const { ticker, demoMode, liveTarget, livePeers } = useApp()

  return useMemo(() => {
    if (demoMode) {
      const data = getDemoData(ticker)
      return { data, loading: false, error: data ? null : `No demo data for ${ticker}`, source: 'demo' }
    }

    if (!liveTarget.data) {
      return { data: null, loading: liveTarget.loading, error: liveTarget.error, source: 'live' }
    }

    const peers = livePeers.filter((p) => !p.error && p.multiples).map((p) => p.multiples)
    const data = {
      ...liveTarget.data,
      comps: { ...liveTarget.data.comps, peers },
    }
    return { data, loading: false, error: null, source: 'live' }
  }, [demoMode, ticker, liveTarget, livePeers])
}
