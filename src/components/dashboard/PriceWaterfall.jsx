import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell, ResponsiveContainer } from 'recharts'
import { fmtPrice } from '../../lib/format'

const COLORS = {
  current: 'var(--text-tertiary)',
  rim: 'var(--accent-blue)',
  comps: 'var(--accent-gold)',
  analyst: 'var(--accent-green)',
  mean: 'var(--accent-blue)',
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="card" style={{ padding: '8px 12px' }}>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.label}</div>
      <div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{fmtPrice(p.value)}</div>
    </div>
  )
}

export default function PriceWaterfall({ currentPrice, sources, meanFairValue }) {
  const data = [
    { label: 'Current Price', value: currentPrice, key: 'current' },
    ...sources.map((s) => ({
      label: s.label,
      value: s.price,
      key: s.label.startsWith('RIM') ? 'rim' : s.label.startsWith('Comps') ? 'comps' : 'analyst',
    })),
    { label: 'Mean Fair Value', value: meanFairValue, key: 'mean' },
  ].filter((d) => d.value != null)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: 'var(--text-tertiary)', fontSize: 11.5 }} axisLine={{ stroke: 'var(--border-default)' }} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 11.5 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        {currentPrice != null && <ReferenceLine y={currentPrice} stroke="var(--text-disabled)" strokeDasharray="4 4" />}
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.key} fill={COLORS[d.key]} fillOpacity={d.key === 'current' ? 0.5 : 0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
