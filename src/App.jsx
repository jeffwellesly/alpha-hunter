import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Comps from './pages/Comps'
import Rim from './pages/Rim'
import FinancialHealth from './pages/FinancialHealth'
import ScfQuality from './pages/ScfQuality'
import AnalystViews from './pages/AnalystViews'
import About from './pages/About'
import Analyses from './pages/Analyses'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone - reachable regardless of which analysis (if any) is being viewed, no Header/nav chrome */}
          <Route path="about" element={<About />} />
          <Route path="analyses" element={<Analyses />} />
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="comps" element={<Comps />} />
            <Route path="rim" element={<Rim />} />
            <Route path="financials" element={<FinancialHealth />} />
            <Route path="scf" element={<ScfQuality />} />
            <Route path="analysts" element={<AnalystViews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
