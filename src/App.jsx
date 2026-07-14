import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Comps from './pages/Comps'
import Rim from './pages/Rim'
import FinancialHealth from './pages/FinancialHealth'
import ScfQuality from './pages/ScfQuality'
import AnalystViews from './pages/AnalystViews'
import Docs from './pages/Docs'
import MyAnalyses from './pages/MyAnalyses'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="comps" element={<Comps />} />
            <Route path="rim" element={<Rim />} />
            <Route path="financials" element={<FinancialHealth />} />
            <Route path="scf" element={<ScfQuality />} />
            <Route path="analysts" element={<AnalystViews />} />
            <Route path="docs" element={<Docs />} />
            <Route path="my-analyses" element={<MyAnalyses />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
