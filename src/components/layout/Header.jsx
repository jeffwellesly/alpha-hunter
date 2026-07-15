import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useCompanyData } from '../../hooks/useCompanyData'
import { generateMemo } from '../../lib/docxExport'

export default function Header() {
  const { ticker, backToList } = useApp()
  const { data: companyData } = useCompanyData()
  const [generatingMemo, setGeneratingMemo] = useState(false)
  const [memoError, setMemoError] = useState(null)

  const memoReady = Boolean(companyData?.comps?.peers?.length && companyData?.narrative)

  async function handleGenerateMemo() {
    if (!companyData) return
    setMemoError(null)
    setGeneratingMemo(true)
    try {
      await generateMemo(companyData)
    } catch (err) {
      setMemoError(err.message)
    } finally {
      setGeneratingMemo(false)
    }
  }

  return (
    <header style={{ borderBottom: '1px solid var(--rule)', background: 'rgba(12,15,18,0.9)' }}>
      <div className="ah-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link
            to="/"
            onClick={backToList}
            className="mono"
            style={{ fontWeight: 600, fontSize: 13, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--bone)' }}
          >
            <span style={{ width: 7, height: 7, background: 'var(--amber)', display: 'inline-block' }} />
            ALPHAHUNTER
          </Link>
          <div style={{ width: 1, height: 16, background: 'var(--rule)' }} />
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--bone)', fontWeight: 600 }}>{ticker}</strong>
            {companyData?.companyName ? ` — ${companyData.companyName}` : ''}
          </div>
        </div>
        <div className="ah-topbar-right" style={{ display: 'flex', gap: 10 }}>
          <Link to="/" onClick={backToList} className="btn">← All Analyses</Link>
          <button
            className="btn btn-primary"
            onClick={handleGenerateMemo}
            disabled={!memoReady || generatingMemo}
            title={memoReady ? 'Download a Word memo for this analysis' : 'Needs a peer group + narrative data before it can generate'}
          >
            {generatingMemo ? 'Generating…' : 'Download Word Doc'}
          </button>
        </div>
      </div>
      {memoError && (
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--rose)', paddingBottom: 8 }}>{memoError}</div>
      )}
    </header>
  )
}
