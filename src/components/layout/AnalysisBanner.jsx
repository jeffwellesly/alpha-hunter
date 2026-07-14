import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function AnalysisBanner() {
  const { data } = useApp()
  if (!data) return null

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(59,167,255,0.1), transparent)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: 12.5,
        color: 'var(--text-tertiary)',
        padding: '7px 24px',
        textAlign: 'center',
      }}
    >
      Published {data.asOfDate} · Research tool, not investment advice — <Link to="/about" style={{ color: 'var(--text-tertiary)' }}>see About for methodology</Link>
    </div>
  )
}
