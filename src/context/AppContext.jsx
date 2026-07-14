import { createContext, useContext, useMemo, useState, useCallback, useRef, useEffect } from 'react'
import {
  getAnthropicApiKey,
  setAnthropicApiKey as persistAnthropicApiKey,
  getModel,
  setModel as persistModel,
  resetKeys as clearStoredKeys,
} from '../lib/storage'
import { supabaseConfigured } from '../lib/supabaseClient'
import { getSession, onAuthStateChange, saveApiKeys, getMyKeys, signOut as authSignOut } from '../lib/auth'
import { saveAnalysis } from '../lib/analysesApi'
import { DEMO_TICKERS } from '../data/demo'
import { runFullAnalysis } from '../shared/runAnalysis'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Key storage strategy: signed-in users (once a Supabase project exists)
  // get server-side encrypted storage via save-api-keys/get-my-keys;
  // everyone else (today: everyone, since no project exists yet) gets the
  // original localStorage-only behavior. Never both at once, to avoid
  // dual-write bugs between the two stores.
  const [anthropicApiKey, setAnthropicApiKeyState] = useState(getAnthropicApiKey)
  const [model, setModelState] = useState(getModel)
  const [ticker, setTicker] = useState(DEMO_TICKERS[0])
  const [demoMode, setDemoMode] = useState(true)
  // Shown on load when no Anthropic key is saved yet - asks for a key up
  // front, with a clear "skip to demo" path. Returning users who already
  // have a key saved aren't nagged with it again.
  const [showWelcome, setShowWelcome] = useState(!getAnthropicApiKey())

  const [session, setSession] = useState(null)
  const [keysLoading, setKeysLoading] = useState(false)

  useEffect(() => {
    if (!supabaseConfigured) return
    getSession()
      .then((s) => setSession(s))
      .catch(() => {})
    return onAuthStateChange((s) => setSession(s))
  }, [])

  useEffect(() => {
    if (!session) return
    setKeysLoading(true)
    getMyKeys()
      .then(({ anthropicKey, model: savedModel }) => {
        if (anthropicKey) setAnthropicApiKeyState(anthropicKey)
        if (savedModel) setModelState(savedModel)
        setShowWelcome(!anthropicKey)
      })
      .catch(() => {})
      .finally(() => setKeysLoading(false))
  }, [session])

  // Live-mode target company: populated by an explicit runAnalysis() call,
  // not fetched automatically on ticker change - a full analysis is a
  // multi-step, multi-call Claude web-search pipeline (see
  // shared/runAnalysis.js), not a cheap single request.
  const [liveTarget, setLiveTarget] = useState({ data: null, loading: false, error: null })
  const [analysisProgress, setAnalysisProgress] = useState(null) // { step, message } | null
  const runTokenRef = useRef(0)

  const setAnthropicApiKey = useCallback(
    (value) => {
      setAnthropicApiKeyState(value)
      if (session) {
        saveApiKeys({ anthropicKey: value, model }).catch(() => {})
      } else {
        persistAnthropicApiKey(value)
      }
    },
    [session, model]
  )

  const setModel = useCallback(
    (value) => {
      setModelState(value)
      if (session) {
        saveApiKeys({ anthropicKey: anthropicApiKey, model: value }).catch(() => {})
      } else {
        persistModel(value)
      }
    },
    [session, anthropicApiKey]
  )

  const resetKeys = useCallback(() => {
    clearStoredKeys()
    setAnthropicApiKeyState('')
  }, [])

  const signOut = useCallback(async () => {
    await authSignOut()
    setSession(null)
    resetKeys()
  }, [resetKeys])

  const runAnalysis = useCallback(
    async (targetTicker, peerTickers) => {
      if (!anthropicApiKey) return
      const t = (targetTicker || ticker).trim().toUpperCase()
      const token = ++runTokenRef.current
      setDemoMode(false)
      setTicker(t)
      setLiveTarget({ data: null, loading: true, error: null })
      setAnalysisProgress({ step: 'start', message: `Starting analysis for ${t}...` })
      try {
        const result = await runFullAnalysis({
          ticker: t,
          peerTickers,
          anthropicKey,
          model,
          onProgress: (step, message) => {
            if (runTokenRef.current === token) setAnalysisProgress({ step, message })
          },
        })
        if (runTokenRef.current !== token) return
        setLiveTarget({ data: result, loading: false, error: null })
        if (session) {
          // Best-effort: a save failure shouldn't hide a perfectly good
          // analysis result from the person who just waited for it.
          saveAnalysis({
            userId: session.user.id,
            ticker: t,
            companyName: result.companyName,
            status: result.meta.errors ? 'partial' : 'complete',
            resultsJson: result,
          }).catch(() => {})
        }
      } catch (err) {
        if (runTokenRef.current !== token) return
        setLiveTarget({ data: null, loading: false, error: err.message })
      } finally {
        if (runTokenRef.current === token) setAnalysisProgress(null)
      }
    },
    [anthropicApiKey, model, ticker, session]
  )

  /** Loads a previously-saved or public analysis read-only, no re-fetch. */
  const viewSavedAnalysis = useCallback((resultsJson, targetTicker) => {
    runTokenRef.current++ // invalidate any in-flight run
    setDemoMode(false)
    setTicker(targetTicker)
    setLiveTarget({ data: resultsJson, loading: false, error: null })
  }, [])

  const dismissWelcome = useCallback(() => setShowWelcome(false), [])

  const value = useMemo(
    () => ({
      anthropicApiKey,
      setAnthropicApiKey,
      model,
      setModel,
      resetKeys,
      ticker,
      setTicker,
      demoMode,
      setDemoMode,
      hasAnthropicKey: Boolean(anthropicApiKey),
      liveTarget,
      analysisProgress,
      runAnalysis,
      viewSavedAnalysis,
      showWelcome,
      dismissWelcome,
      accountsEnabled: supabaseConfigured,
      session,
      keysLoading,
      signOut,
    }),
    [
      anthropicApiKey,
      model,
      ticker,
      demoMode,
      setAnthropicApiKey,
      setModel,
      resetKeys,
      liveTarget,
      analysisProgress,
      runAnalysis,
      viewSavedAnalysis,
      showWelcome,
      dismissWelcome,
      session,
      keysLoading,
      signOut,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
