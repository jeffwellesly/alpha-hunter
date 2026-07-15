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
    <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>
      <Header />
      <AnalysisBanner />
      <TabNav />
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '32px 40px 80px' }}>
        <Outlet />
      </main>
    </div>
  )
}
