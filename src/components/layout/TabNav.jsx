import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const TABS = [
  { to: '/', label: 'Summary', end: true },
  { to: '/comps', label: 'Comps' },
  { to: '/rim', label: 'RIM Valuation' },
  { to: '/financials', label: 'Financial Health' },
  { to: '/scf', label: 'SCF Quality' },
  { to: '/analysts', label: 'Analyst Views' },
  { to: '/about', label: 'About' },
]

const ACCOUNT_TABS = [
  { to: '/my-analyses', label: 'Previous Analyses' },
  { to: '/portfolio', label: 'Portfolio' },
]

export default function TabNav() {
  const { session } = useApp()
  const tabs = session ? [...TABS, ...ACCOUNT_TABS] : TABS

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 61,
        zIndex: 15,
        background: 'rgba(10, 15, 30, 0.85)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            style={({ isActive }) => ({
              padding: '12px 16px',
              fontSize: 13.5,
              fontWeight: 600,
              color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
              whiteSpace: 'nowrap',
            })}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
