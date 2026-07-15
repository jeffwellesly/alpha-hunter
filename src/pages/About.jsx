import Nav from '../components/layout/Nav'

const METHOD_ITEMS = [
  {
    title: 'Comparable company analysis',
    desc: 'The stock is benchmarked against its closest peers on forward P/E, TEV/EBITDA, TEV/Revenue, and price-to-tangible-book, to see what the market is currently paying for similar businesses.',
    tag: 'Peer NTM multiples',
  },
  {
    title: 'Residual income valuation (RIM)',
    desc: 'A five-year explicit forecast extended to a twelve-year horizon estimates fair value from expected earnings above the cost of equity, rather than from a multiple someone else assigned the stock.',
    tag: 'Fundamentals-based fair value',
  },
  {
    title: 'Financial health & DuPont decomposition',
    desc: 'Return on equity is broken into margin, turnover, and leverage, and checked against long-run norms, to see whether returns are being earned or borrowed.',
    tag: 'ROE decomposition',
  },
  {
    title: 'Cash flow quality',
    desc: 'A six-point checklist covering accrual quality, working capital trends, capex versus depreciation, and financing cash flow coherence, flags earnings that look stronger than the cash backing them.',
    tag: 'Six-point checklist',
  },
  {
    title: 'Analyst views',
    desc: 'Consensus estimates are pulled in and checked for the optimism bias that sell-side forecasts are known to carry, rather than taken at face value.',
    tag: 'Consensus + bias check',
  },
]

const GLOSSARY = [
  ['Enterprise Value (EV / TEV)', 'Market capitalization + total debt − cash & equivalents. The theoretical cost to acquire the whole business regardless of how it’s financed.'],
  ['TEV/Revenue', 'Enterprise Value ÷ Revenue. Useful for companies without positive earnings yet.'],
  ['TEV/EBITDA', 'Enterprise Value ÷ EBITDA (earnings before interest, tax, depreciation, amortization) - a capital-structure-neutral profitability multiple.'],
  ['TEV/EBIT', 'Enterprise Value ÷ EBIT (operating income) - like TEV/EBITDA but after depreciation/amortization.'],
  ['P/E (Price/Diluted EPS)', 'Share price ÷ diluted earnings per share. "Diluted" accounts for options/convertibles that could increase share count.'],
  ['P/Tangible BV', 'Share price ÷ tangible book value per share (book value excluding goodwill/intangibles).'],
  ['NTM (Next Twelve Months)', 'A forward-looking version of a metric using consensus estimates for the coming year, instead of trailing figures.'],
  ['LTG (Long-Term Growth rate)', 'Consensus analyst estimate for annualized EPS growth over the next 3-5 years. Drives the RIM model’s explicit-year EPS growth after FY2.'],
  ['BVPS (Book Value Per Share)', 'Total shareholders’ equity ÷ shares outstanding.'],
  ['EPS (GAAP vs. Non-GAAP/Normalized)', 'GAAP EPS is exactly as reported. Non-GAAP/"normalized" EPS adjusts for one-time items and is usually what consensus estimates target.'],
  ['ROE (Return on Equity)', 'Net Income ÷ Total Equity.'],
  ['ROA (Return on Assets)', 'Net Income ÷ Total Assets.'],
  ['RNOA (Return on Net Operating Assets)', 'A DuPont-family benchmark (course norm ≈ 9%) measuring return on operating assets, excluding financing effects.'],
  ['CFO / CFI / CFF', 'Cash Flow from Operating / Investing / Financing activities - the three sections of the cash flow statement.'],
  ['CapEx', 'Capital Expenditures - money spent on physical/long-term assets. Compared against D&A to gauge reinvestment pace.'],
  ['D&A', 'Depreciation & Amortization - the non-cash expense that spreads an asset’s cost over its useful life.'],
  ['FCF (Free Cash Flow)', 'Roughly CFO minus CapEx.'],
  ['Discount Rate (r)', 'The required rate of return (cost of equity) used to present-value future residual income. Defaults to 8%.'],
  ['Residual Income', 'Net income minus a capital charge (beginning book value × discount rate) - the core quantity the RIM model values.'],
  ['Target ROE', 'The equilibrium ROE the RIM model assumes a company converges to. Solved so the model’s terminal implied EPS growth equals 6.5%.'],
  ['Dividend Payout Ratio (k)', 'Dividends per share ÷ EPS.'],
  ['Fiscal Year End', 'The company’s accounting year-end date, which can differ from the calendar year.'],
  ['Factor Score', 'A single 0-100 summary combining SCF Quality, DuPont health vs. benchmarks, and valuation discount/premium.'],
  ['Optimism Bias', 'A Frankel & Lee (1998) style flag comparing consensus long-term growth against realized historical EPS growth.'],
]

export default function About() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', background: 'var(--ink)', zIndex: 200 }}>
      <Nav active="about" />
      <main className="ah-page-main" style={{ maxWidth: 920, margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{ padding: '80px 0 40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: 22 }}>
            Method
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 40, maxWidth: '16ch', marginBottom: 18 }}>
            How each analysis is built
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '60ch', margin: 0 }}>
            Every ticker on this site is run through the same five-part process, in the same order, before a Buy /
            Hold / Sell read is published. Nothing here is reverse-engineered from a conclusion.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 64 }}>
          {METHOD_ITEMS.map((m, i) => (
            <div key={m.title} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, padding: '34px 0', borderBottom: '1px solid var(--rule)' }}>
              <div className="mono" style={{ color: 'var(--muted-dim)', fontSize: 14, paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 19, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14.5, maxWidth: '62ch', margin: 0 }}>{m.desc}</p>
                <span
                  className="mono"
                  style={{
                    display: 'inline-block',
                    marginTop: 12,
                    fontSize: 11,
                    color: 'var(--muted-dim)',
                    border: '1px solid var(--rule)',
                    padding: '4px 9px',
                    borderRadius: 20,
                  }}
                >
                  {m.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--paper)', borderRadius: 4, padding: '28px 32px', marginBottom: 48, borderLeft: '2px solid var(--amber)' }}>
          <h4 className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--amber)', marginBottom: 12, textTransform: 'uppercase' }}>
            Disclosure
          </h4>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            The Buy / Hold / Sell label reflects where a stock's blended fair value sits relative to its current
            price, using a ±15% band around the average of the methods above. This is a personal research log
            applying a course-based valuation framework with AI assistance. It is not investment advice, and it is
            not a recommendation to buy or sell anything. Do your own work before making any financial decision.
          </p>
        </div>

        <Section title="How data is gathered">
          <p style={{ margin: 0 }}>
            There's no financials API involved - Claude (Anthropic's AI model), using its web search tool, is the
            only data source. Here's what happens when I run an analysis, in order: research the company's
            fundamentals and its own trading multiples; identify and research 5-8 close peer companies; look up the
            fiscal calendar; research analyst consensus; then compute the RIM engine, peer trading multiples aggregation, DuPont
            decomposition, SCF checklist, and Factor Score locally from those researched inputs using fixed formulas
            (not AI); finally write the plain-language narrative sections.
          </p>
          <p>
            This means an analysis can be produced for almost any ticker without a paid data plan, but individual
            researched numbers can occasionally be wrong in ways a licensed filings API wouldn't be. Every number on
            every tab has a small "i" badge explaining how it's calculated; for published analyses it also shows the
            as-of date and source link(s) Claude cited, and for averaged figures, the individual values that fed the
            average.
          </p>
        </Section>

        <Section title="Glossary" subtitle="If a term on any tab isn't clear, it's defined here.">
          <div style={{ columns: '2 280px', columnGap: 32 }}>
            {GLOSSARY.map(([term, def]) => (
              <div key={term} style={{ breakInside: 'avoid', marginBottom: 20 }}>
                <div style={{ fontWeight: 600, color: 'var(--bone)', marginBottom: 3, fontSize: 14 }}>{term}</div>
                <div style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: 13.5 }}>{def}</div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ borderTop: '1px solid var(--rule)', padding: '40px 0' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 22, marginBottom: subtitle ? 4 : 20 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>{subtitle}</p>}
      <div style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  )
}
