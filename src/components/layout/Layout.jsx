import { Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Header from './Header'
import TabNav from './TabNav'
import AnalysisBanner from './AnalysisBanner'
import Home from './Home'

export default function Layout() {
  const { data } = useApp()

  if (!data) return <Home />

  return (
    <>
      <Header />
      <AnalysisBanner />
      <TabNav />
      <main style={{ flex: 1, maxWidth: 1320, width: '100%', margin: '0 auto', padding: '24px' }}>
        <Outlet />
      </main>
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '18px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--text-disabled)',
        }}
      >
        AlphaHunter — Alphanomics-style equity valuation. Not investment advice.
      </footer>
    </>
  )
}
