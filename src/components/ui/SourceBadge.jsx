import { useState } from 'react'

/**
 * Small clickable source-citation icon. `info` is a { asOfDate, links }
 * entry from a live-mode result's `data.sources` map (see
 * shared/runAnalysis.js) - demo data has no equivalent, so this renders
 * nothing there, same as it renders nothing before a live analysis has run.
 *
 * `components` is an optional array of { label, value } for averaged/
 * aggregated figures (e.g. a peer-group median) - the individual values
 * that went into the average, per spec Section 6.
 */
export default function SourceBadge({ info, components }) {
  const [open, setOpen] = useState(false)
  if (!info) return null

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
          border: '1px solid var(--border-subtle)',
          borderRadius: '50%',
          width: 15,
          height: 15,
          lineHeight: '13px',
          cursor: 'pointer',
          color: 'var(--text-tertiary)',
          fontSize: 10,
          padding: 0,
        }}
        title="Source"
        aria-label="Show source"
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
              width: 260,
              fontSize: 11.5,
              lineHeight: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'left',
            }}
          >
            <div style={{ color: 'var(--text-tertiary)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--text-secondary)' }}>As of:</strong> {info.asOfDate}
            </div>
            {info.links?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {info.links.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', wordBreak: 'break-word' }}>
                    {l.label || l.url}
                  </a>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--text-tertiary)' }}>Claude web search — no specific source URL captured for this figure.</div>
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
