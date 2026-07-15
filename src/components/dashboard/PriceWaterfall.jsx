import { useState } from 'react'
import { fmtCompactUsd, fmtPrice } from '../../lib/format'

const COLORS = {
  current: 'var(--muted-dim)',
  rim: 'var(--amber)',
  comps: 'var(--blue)',
  analyst: 'var(--green)',
  mean: 'var(--blue)',
}

function niceMax(value) {
  if (!value || value <= 0) return 100
  const magnitude = 10 ** Math.floor(Math.log10(value))
  return Math.ceil(value / magnitude) * magnitude
}

export default function PriceWaterfall({ currentPrice, sources, meanFairValue }) {
  const [hovered, setHovered] = useState(null)

  const bars = [
    { label: 'Current Price', value: currentPrice, key: 'current' },
    ...sources.map((s) => ({
      label: s.label.replace(' (terminal)', ' Implied').replace(' (peer median)', ' Implied').replace('Analyst consensus', 'Analyst Consensus'),
      value: s.price,
      key: s.label.startsWith('RIM') ? 'rim' : s.label.startsWith('Comps') ? 'comps' : 'analyst',
    })),
    { label: 'Fair Value', value: meanFairValue, key: 'mean' },
  ].filter((d) => d.value != null)

  const max = niceMax(Math.max(...bars.map((b) => b.value)) * 1.05)
  const steps = [max, max * 0.75, max * 0.5, max * 0.25, 0]

  return (
    // Setting overflowX here implicitly forces overflowY to 'auto' too (a
    // box can't clip one axis and stay open on the other per the CSS
    // overflow spec) - which was silently clipping the hover tooltips
    // popping up above each bar, even though they had correct geometry and
    // colors. paddingTop gives them room to render within this container's
    // own padding box (overflow clips at the padding edge, not the content
    // edge) instead of escaping it.
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingTop: 36 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 260, borderBottom: '1px solid var(--rule)', position: 'relative', paddingLeft: 56, minWidth: 380 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="mono">
          {steps.map((s) => (
            <span key={s} style={{ fontSize: 10.5, color: 'var(--muted-dim)' }}>{fmtCompactUsd(s)}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, flex: 1, height: '100%' }}>
          {bars.map((b) => (
            <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, height: '100%', justifyContent: 'flex-end' }}>
              <div
                onMouseEnter={() => setHovered(b.label)}
                onMouseLeave={() => setHovered((h) => (h === b.label ? null : h))}
                style={{ position: 'relative', width: '100%', height: `${(b.value / max) * 100}%`, background: COLORS[b.key], borderRadius: '3px 3px 0 0', cursor: 'default' }}
              >
                {hovered === b.label && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 6,
                      background: 'var(--bg-inset)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 6,
                      padding: '4px 9px',
                      whiteSpace: 'nowrap',
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                  >
                    {fmtPrice(b.value)}
                  </div>
                )}
              </div>
              {/* Fixed height, not auto-sized to text - every bar's label
                  occupies exactly the same vertical space (up to 2 wrapped
                  lines) regardless of word count, so every bar's baseline
                  lines up. A label that used to force one word per line via
                  split(' ') made 3-word labels one line taller than 2-word
                  ones, which (with justifyContent: flex-end packing bar+
                  label as a unit) shoved that bar's whole block upward -
                  visually "starting above" bars whose labels were shorter. */}
              <div style={{ width: '100%', height: 29, fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3, overflow: 'hidden' }}>
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
