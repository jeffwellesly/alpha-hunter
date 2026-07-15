import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'Summary', end: true },
  { to: '/comps', label: 'Comps' },
  { to: '/rim', label: 'RIM Valuation' },
  { to: '/financials', label: 'Financial Health' },
  { to: '/scf', label: 'SCF Quality' },
  { to: '/analysts', label: 'Analyst Views' },
  { to: '/about', label: 'About' },
]

export default function TabNav() {
  return (
    <nav style={{ display: 'flex', gap: 0, padding: '0 40px', borderBottom: '1px solid var(--rule)', overflowX: 'auto' }}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          style={({ isActive }) => ({
            fontSize: 14,
            fontWeight: 500,
            color: isActive ? 'var(--bone)' : 'var(--muted)',
            padding: '16px 20px',
            borderBottom: isActive ? '2px solid var(--amber)' : '2px solid transparent',
            whiteSpace: 'nowrap',
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
