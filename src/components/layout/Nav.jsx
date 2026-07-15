import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/', key: 'home', label: 'Home' },
  { to: '/analyses', key: 'analyses', label: 'Latest Analyses' },
  { to: '/about', key: 'about', label: 'About' },
]

export default function Nav({ active }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 48px',
        background: 'rgba(12,15,18,0.88)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        className="mono"
        style={{
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: '0.14em',
          color: 'var(--bone)',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span style={{ width: 8, height: 8, background: 'var(--amber)', display: 'inline-block', borderRadius: 1 }} />
        ALPHAHUNTER
      </div>
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {LINKS.map((l) => (
          <Link
            key={l.key}
            to={l.to}
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: active === l.key ? 'var(--bone)' : 'var(--muted)',
              padding: '6px 0',
              position: 'relative',
              borderBottom: active === l.key ? '2px solid var(--amber)' : '2px solid transparent',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
