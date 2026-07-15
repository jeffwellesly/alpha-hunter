import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listPublicAnalyses } from '../../lib/analysesApi'
import { supabaseConfigured } from '../../lib/supabaseClient'
import { buildLedger } from '../../lib/ledger'
import Nav from './Nav'
import Ledger from './Ledger'

export default function Home() {
  const [published, setPublished] = useState([])

  useEffect(() => {
    if (!supabaseConfigured) return
    listPublicAnalyses().then(setPublished).catch(() => {})
  }, [])

  const stocks = buildLedger(published)

  return (
    <div style={pageStyle}>
      <Nav active="home" />
      <main className="ah-page-main" style={mainStyle}>
        <div style={{ padding: '96px 0 56px', borderBottom: '1px solid var(--rule)' }}>
          <div style={eyebrowStyle}>Research log · not investment advice</div>
          <h1 className="ah-hero-headline" style={headlineStyle}>
            How I actually value a stock, <em style={{ fontStyle: 'italic', color: 'var(--amber)', fontWeight: 300 }}>published</em> as I go.
          </h1>
          <p style={subStyle}>
            Every write-up here follows the same five-step process:{' '}
            <b style={{ color: 'var(--bone)', fontWeight: 500 }}>
              peer trading multiples, residual income valuation, DuPont, cash-flow quality, analyst sentiment
            </b>
            . No shortcuts, no fitting the analysis to a conclusion I already had.
          </p>
          <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
            <Link to="/analyses" className="btn btn-primary">See latest analyses →</Link>
            <Link to="/about" className="btn">Read how it works</Link>
          </div>

          <div className="ah-methods-strip" style={{ display: 'flex', marginTop: 64, borderTop: '1px solid var(--rule)' }}>
            {[
              ['01', 'Peer Trading Multiples'],
              ['02', 'RIM'],
              ['03', 'DuPont'],
              ['04', 'SCF Quality'],
              ['05', 'Analyst Views'],
            ].map(([num, name], i, arr) => (
              <div key={num} style={{ flex: 1, padding: '20px 20px 0', borderRight: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--muted-dim)' }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, marginTop: 6, color: 'var(--bone)' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '56px 0 72px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 22 }}>Latest analyses</h2>
            <Link to="/analyses" className="mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em' }}>
              VIEW ALL →
            </Link>
          </div>
          <Ledger stocks={stocks} limit={2} />
        </div>

        <div
          className="ah-own-card"
          style={{
            margin: '56px 0 96px',
            border: '1px dashed var(--rule)',
            borderRadius: 4,
            padding: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 19, marginBottom: 8 }}>Analyze a stock of your own</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: '46ch', margin: 0 }}>
              Run the same peer trading multiples + RIM + DuPont process on any ticker you pick, using the exact logic used here.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink)', background: 'var(--amber)', padding: '6px 12px', borderRadius: 20, whiteSpace: 'nowrap', fontWeight: 600 }}>
            COMING SOON
          </div>
        </div>

        <footer style={{ borderTop: '1px solid var(--rule)', padding: '32px 0 64px', fontSize: 12.5, color: 'var(--muted-dim)', maxWidth: '70ch', lineHeight: 1.7 }}>
          AlphaHunter applies a fixed equity-valuation methodology (residual income model, peer trading multiples, DuPont, and
          cash-flow quality checks) to publicly available data, researched with AI
          assistance. <b style={{ color: 'var(--muted)' }}>It is a research log, not investment advice.</b> See{' '}
          <Link to="/about" className="link">About</Link> for the full method and disclosure. Investing carries risk;
          decisions and outcomes are your own.
        </footer>
      </main>
    </div>
  )
}

const pageStyle = {
  position: 'fixed',
  inset: 0,
  overflowY: 'auto',
  background: 'var(--ink)',
  zIndex: 200,
  backgroundImage: 'linear-gradient(var(--rule) 1px, transparent 1px)',
  backgroundSize: '100% 88px',
  backgroundPosition: '0 140px',
}

const mainStyle = { maxWidth: 920, margin: '0 auto', padding: '0 48px' }

const eyebrowStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  letterSpacing: '0.16em',
  color: 'var(--amber)',
  textTransform: 'uppercase',
  marginBottom: 22,
}

const headlineStyle = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontSize: 48,
  lineHeight: 1.12,
  letterSpacing: '-0.01em',
  maxWidth: '18ch',
  marginBottom: 26,
}

const subStyle = { fontSize: 17, color: 'var(--muted)', maxWidth: '52ch', marginBottom: 36, lineHeight: 1.55 }
