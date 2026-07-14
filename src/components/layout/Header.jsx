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
    <>
      <header
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <Link
            to="/"
            onClick={backToList}
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #3ba7ff, #2ee6a8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            AlphaHunter
          </Link>

          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            <strong>{ticker}</strong> {companyData?.companyName ? `— ${companyData.companyName}` : ''}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <Link to="/" onClick={backToList} className="btn">
              ← All Analyses
            </Link>
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
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--accent-red)', paddingBottom: 8 }}>{memoError}</div>
        )}
      </header>
    </>
  )
}
