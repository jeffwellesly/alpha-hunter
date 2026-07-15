import { useState } from 'react'
import { explain } from '../../lib/explanations'

/**
 * Small clickable "i" icon shown next to a number, explaining how it was
 * calculated - and, in live mode, where the underlying data came from.
 *
 * `explainKey` looks up a plain-language calculation description from
 * lib/explanations.js - always available, works identically in demo and
 * live mode, since it's a fixed formula description, not researched data.
 *
 * `source` is optional: a live-mode { asOfDate, links } entry from
 * `data.sources` (see shared/runAnalysis.js) - absent for demo data and
 * before a live analysis has run, in which case only the calculation
 * explanation shows.
 *
 * `components` is an optional array of { label, value } for averaged/
 * aggregated figures (e.g. a peer-group median) - the individual values
 * that went into the average.
 */
export default function InfoBadge({ explainKey, explanation, source, components }) {
  const [open, setOpen] = useState(false)
  const calc = explanation || explain(explainKey)
  if (!calc && !source) return null

  return (
    <span style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        style={{
          background: 'none',
          border: '1px solid var(--muted-dim)',
          borderRadius: '50%',
          width: 16,
          height: 16,
          lineHeight: '14px',
          cursor: 'pointer',
          color: 'var(--muted-dim)',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          padding: 0,
        }}
        title="How this is calculated"
        aria-label="How this is calculated"
      >
        i
      </button>
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 60 }}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          />
          <div
            style={{
              position: 'absolute',
              zIndex: 61,
              top: '100%',
              left: 0,
              marginTop: 4,
              background: 'var(--bg-inset)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: 12,
              width: 270,
              fontSize: 11.5,
              lineHeight: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'left',
            }}
          >
            {calc && (
              <div style={{ color: 'var(--text-secondary)', marginBottom: source ? 8 : 0 }}>
                <strong style={{ color: 'var(--text-primary)' }}>How it's calculated: </strong>
                {calc}
              </div>
            )}
            {source && (
              <div style={{ borderTop: calc ? '1px solid var(--border-subtle)' : 'none', paddingTop: calc ? 8 : 0 }}>
                <div style={{ color: 'var(--text-tertiary)', marginBottom: 6 }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>As of:</strong> {source.asOfDate}
                </div>
                {source.links?.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {source.links.map((l, i) => (
                      <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', wordBreak: 'break-word' }}>
                        {l.label || l.url}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)' }}>Claude web search — no specific source URL captured for this figure.</div>
                )}
              </div>
            )}
            {components?.length > 0 && (
              <div style={{ marginTop: 8, borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Underlying values:</div>
                {components.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span>{c.label}</span>
                    <span className="mono">{c.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </span>
  )
}
