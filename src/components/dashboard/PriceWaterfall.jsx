import { fmtCompactUsd } from '../../lib/format'

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
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 260, borderBottom: '1px solid var(--rule)', position: 'relative', paddingLeft: 56, minWidth: 380 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="mono">
          {steps.map((s) => (
            <span key={s} style={{ fontSize: 10.5, color: 'var(--muted-dim)' }}>{fmtCompactUsd(s)}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, flex: 1, height: '100%' }}>
          {bars.map((b) => (
            <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: `${(b.value / max) * 100}%`, background: COLORS[b.key], borderRadius: '3px 3px 0 0' }} />
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
