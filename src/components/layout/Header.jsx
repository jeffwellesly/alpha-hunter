import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useCompanyData } from '../../hooks/useCompanyData'
import { generateMemo } from '../../lib/docxExport'

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6" />
      <path d="M9 11h1" />
      <path d="M9 19h6" />
    </svg>
  )
}

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
            title={memoReady ? 'Download the full sourced research memo (.docx) for this analysis, with a References section listing every link used' : 'Needs a peer group + narrative data before it can generate'}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <DocIcon />
            {generatingMemo ? 'Generating…' : 'Detailed Analysis (.docx)'}
          </button>
        </div>
      </div>
      {memoError && (
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--rose)', paddingBottom: 8 }}>{memoError}</div>
      )}
    </header>
  )
}
