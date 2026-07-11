import { Outlet } from 'react-router-dom'
import Header from './Header'
import TabNav from './TabNav'
import DemoBanner from './DemoBanner'

export default function Layout() {
  return (
    <>
      <Header />
      <DemoBanner />
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
