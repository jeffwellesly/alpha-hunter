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
import MyAnalyses from './pages/MyAnalyses'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone - reachable regardless of app/session state, no Header/nav chrome */}
          <Route path="about" element={<About />} />
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="comps" element={<Comps />} />
            <Route path="rim" element={<Rim />} />
            <Route path="financials" element={<FinancialHealth />} />
            <Route path="scf" element={<ScfQuality />} />
            <Route path="analysts" element={<AnalystViews />} />
            <Route path="my-analyses" element={<MyAnalyses />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
