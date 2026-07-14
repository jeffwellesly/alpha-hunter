import { useApp } from '../context/AppContext'

/** Thin pass-through to the currently-viewed analysis (demo or published). */
export function useCompanyData() {
  const { data } = useApp()
  return { data, loading: false, error: data ? null : 'No analysis selected.' }
}
