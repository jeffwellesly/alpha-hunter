import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { getDemoData } from '../data/demo'

/**
 * Normalizes into the same shape whether the source is cached demo data or
 * the live analysis result owned by AppContext. The actual analysis run
 * happens ONCE per explicit runAnalysis() call in AppContext (not per-tab,
 * and not automatically on ticker change) - this hook just selects, it
 * never triggers a network call itself.
 */
export function useCompanyData() {
  const { ticker, demoMode, liveTarget } = useApp()

  return useMemo(() => {
    if (demoMode) {
      const data = getDemoData(ticker)
      return { data, loading: false, error: data ? null : `No demo data for ${ticker}`, source: 'demo' }
    }

    return { data: liveTarget.data, loading: liveTarget.loading, error: liveTarget.error, source: 'live' }
  }, [demoMode, ticker, liveTarget])
}
