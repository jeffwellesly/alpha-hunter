import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const AppContext = createContext(null)

/**
 * This is a single-publisher content site: Jeff analyzes stocks (via
 * cli/analyze.js, no web login involved) and publishes them; visitors just
 * browse and read - no accounts, no login, no self-serve live analysis
 * trigger in this UI. State here is deliberately small: which analysis (if
 * any) is currently being viewed. Home.jsx is what's shown when nothing is
 * selected; selecting one (from demo data or a published Supabase row)
 * switches to the full tabbed dashboard for it.
 */
export function AppProvider({ children }) {
  const [ticker, setTicker] = useState(null)
  const [data, setData] = useState(null)

  const viewAnalysis = useCallback((analysisData, targetTicker) => {
    setData(analysisData)
    setTicker(targetTicker)
  }, [])

  const backToList = useCallback(() => {
    setData(null)
    setTicker(null)
  }, [])

  const value = useMemo(
    () => ({ ticker, data, viewAnalysis, backToList }),
    [ticker, data, viewAnalysis, backToList]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
