import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from 'react'
import {
  getFmpApiKey,
  setFmpApiKey as persistFmpApiKey,
  getAnthropicApiKey,
  setAnthropicApiKey as persistAnthropicApiKey,
  getModel,
  setModel as persistModel,
  resetKeys as clearStoredKeys,
} from '../lib/storage'
import { DEMO_TICKERS } from '../data/demo'
import { getCompanyBundle, getPeerMetrics, callLog } from '../lib/fmp'
import { peerMetricsToMultiples } from '../lib/comps'
import { bundleToCompanyData } from '../lib/liveCompanyData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [fmpApiKey, setFmpApiKeyState] = useState(getFmpApiKey)
  const [anthropicApiKey, setAnthropicApiKeyState] = useState(getAnthropicApiKey)
  const [model, setModelState] = useState(getModel)
  const [ticker, setTicker] = useState(DEMO_TICKERS[0])
  const [demoMode, setDemoMode] = useState(true)
  // Shown on load when no FMP key is saved yet - asks for keys up front,
  // with a clear "skip to demo" path. Returning users who already have a
  // key saved aren't nagged with it again.
  const [showWelcome, setShowWelcome] = useState(!getFmpApiKey())

  // Live-mode target company data: fetched ONCE per ticker/key change here
  // (not per-tab) to stay within the FMP free-tier daily call budget.
  const [liveTarget, setLiveTarget] = useState({ data: null, loading: false, error: null })
  const [livePeers, setLivePeers] = useState([]) // [{ticker, multiples, error}]
  const [peerLoading, setPeerLoading] = useState(false)
  const fetchTokenRef = useRef(0)

  const setFmpApiKey = useCallback((value) => {
    persistFmpApiKey(value)
    setFmpApiKeyState(value)
  }, [])

  const setAnthropicApiKey = useCallback((value) => {
    persistAnthropicApiKey(value)
    setAnthropicApiKeyState(value)
  }, [])

  const setModel = useCallback((value) => {
    persistModel(value)
    setModelState(value)
  }, [])

  const resetKeys = useCallback(() => {
    clearStoredKeys()
    setFmpApiKeyState('')
    setAnthropicApiKeyState('')
  }, [])

  useEffect(() => {
    setLivePeers([])
    if (demoMode || !fmpApiKey) {
      setLiveTarget({ data: null, loading: false, error: null })
      return
    }
    const token = ++fetchTokenRef.current
    setLiveTarget({ data: null, loading: true, error: null })
    getCompanyBundle(ticker, fmpApiKey)
      .then((bundle) => {
        if (fetchTokenRef.current !== token) return
        setLiveTarget({ data: bundleToCompanyData(ticker, bundle), loading: false, error: null })
      })
      .catch((err) => {
        if (fetchTokenRef.current !== token) return
        setLiveTarget({ data: null, loading: false, error: err.message })
      })
  }, [ticker, demoMode, fmpApiKey])

  const addPeer = useCallback(
    async (peerTicker, name) => {
      const t = peerTicker.trim().toUpperCase()
      if (!t || !fmpApiKey) return
      if (livePeers.some((p) => p.ticker === t)) return
      setPeerLoading(true)
      try {
        const metrics = await getPeerMetrics(t, fmpApiKey)
        const multiples = peerMetricsToMultiples({ ...metrics, name })
        setLivePeers((prev) => [...prev, { ticker: t, multiples, error: metrics.error }])
      } finally {
        setPeerLoading(false)
      }
    },
    [fmpApiKey, livePeers]
  )

  const removePeer = useCallback((peerTicker) => {
    setLivePeers((prev) => prev.filter((p) => p.ticker !== peerTicker))
  }, [])

  const dismissWelcome = useCallback(() => setShowWelcome(false), [])

  const value = useMemo(
    () => ({
      fmpApiKey,
      setFmpApiKey,
      anthropicApiKey,
      setAnthropicApiKey,
      model,
      setModel,
      resetKeys,
      ticker,
      setTicker,
      demoMode,
      setDemoMode,
      hasFmpKey: Boolean(fmpApiKey),
      hasAnthropicKey: Boolean(anthropicApiKey),
      liveTarget,
      livePeers,
      peerLoading,
      addPeer,
      removePeer,
      showWelcome,
      dismissWelcome,
      fmpCallCount: callLog.count,
    }),
    [
      fmpApiKey,
      anthropicApiKey,
      model,
      ticker,
      demoMode,
      setFmpApiKey,
      setAnthropicApiKey,
      setModel,
      resetKeys,
      liveTarget,
      livePeers,
      peerLoading,
      addPeer,
      removePeer,
      showWelcome,
      dismissWelcome,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
