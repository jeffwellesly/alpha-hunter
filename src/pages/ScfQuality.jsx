import { useMemo } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { buildScfFlags, scfScore } from '../lib/scf'

export default function ScfQuality() {
  const { data, loading, error } = useCompanyData()

  const flags = useMemo(() => (data ? buildScfFlags({ cashFlow: data.cashFlow, financials: data.financials }) : []), [data])
  const score = useMemo(() => (flags.length ? scfScore(flags) : null), [flags])

  if (loading) return <div className="card"><div className="card-body">Loading…</div></div>
  if (error) return <div className="card"><div className="card-body">{error}</div></div>
  if (!data) return <div className="card"><div className="card-body">No data.</div></div>

  if (!flags.length) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title" style={{ marginBottom: 8 }}>No cash flow data yet</div>
          <div className="card-subtitle">Live mode needs at least two years of cash flow / income statement data to compute SCF quality flags.</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Statement of Cash Flows Quality</div>
            <div className="card-subtitle">{data.ticker} — 6-point checklist computed from cash flow statement data</div>
          </div>
          {score && (
            <div style={{ textAlign: 'right' }}>
              <div className="label">Score</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>
                {score.points} / {score.max}
              </div>
            </div>
          )}
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {flags.map((flag, i) => (
            <div
              key={flag.key}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '16px 4px',
                borderBottom: i < flags.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span className={`flag-dot flag-${flag.status}`} style={{ marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>
                  {i + 1}. {flag.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>{flag.explanation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
