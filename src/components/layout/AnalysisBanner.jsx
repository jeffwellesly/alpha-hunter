import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function AnalysisBanner() {
  const { data } = useApp()
  if (!data) return null

  return (
    <div
      className="mono"
      style={{
        textAlign: 'center',
        padding: '9px 0',
        fontSize: 11.5,
        color: 'var(--muted-dim)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      Published {data.asOfDate} · Research log, not investment advice — see{' '}
      <Link to="/about" className="link">About</Link> for methodology
    </div>
  )
}
