import { Link } from 'react-router-dom'

const GLOSSARY = [
  ['Enterprise Value (EV / TEV)', 'Market capitalization + total debt − cash & equivalents. Represents the theoretical cost to acquire the whole business regardless of how it’s financed - unlike price-based multiples, EV isn’t distorted by a company carrying more or less debt/cash than its peers.'],
  ['TEV/Revenue', 'Enterprise Value ÷ Revenue. A valuation multiple useful for companies without positive earnings yet.'],
  ['TEV/EBITDA', 'Enterprise Value ÷ EBITDA (earnings before interest, tax, depreciation, amortization) - a common capital-structure-neutral profitability multiple.'],
  ['TEV/EBIT', 'Enterprise Value ÷ EBIT (operating income) - like TEV/EBITDA but after accounting for depreciation and amortization.'],
  ['P/E (Price/Diluted EPS)', 'Share price ÷ diluted earnings per share. The most familiar valuation multiple; "diluted" means it accounts for stock options/convertibles that could increase share count.'],
  ['P/Tangible BV', 'Share price ÷ tangible book value per share (book value excluding goodwill and other intangible assets). Shown as unavailable when tangible book value is negative or immaterial, which happens for asset-light or acquisition-heavy companies.'],
  ['NTM (Next Twelve Months)', 'A forward-looking version of a metric using consensus estimates for the coming year, instead of trailing (already-reported) figures.'],
  ['LTG (Long-Term Growth rate)', 'Consensus analyst estimate for a company’s annualized EPS growth over the next 3-5 years. Drives the RIM model’s explicit-year EPS growth after FY2.'],
  ['BVPS (Book Value Per Share)', 'Total shareholders’ equity ÷ shares outstanding - what’s left for shareholders per share if the company liquidated at balance-sheet values.'],
  ['EPS (GAAP vs. Non-GAAP/Normalized)', 'GAAP EPS is earnings per share exactly as reported under accounting standards. Non-GAAP/"normalized" EPS adjusts for one-time items (write-offs, restructuring, etc.) and is usually what analyst consensus estimates target.'],
  ['ROE (Return on Equity)', 'Net Income ÷ Total Equity - how much profit a company generates per dollar of shareholder capital.'],
  ['ROA (Return on Assets)', 'Net Income ÷ Total Assets - profit generated per dollar of total assets, regardless of how they’re financed.'],
  ['RNOA (Return on Net Operating Assets)', 'A DuPont-family benchmark (course norm ≈ 9%) measuring return specifically on operating assets, excluding financing effects - referenced as a benchmark, not separately computed in this app’s tables.'],
  ['CFO / CFI / CFF', 'Cash Flow from Operating / Investing / Financing activities - the three sections of the cash flow statement. CFO+ means the core business generates cash; CFI is typically negative (buying assets); CFF captures debt/equity issuance and shareholder returns.'],
  ['CapEx (Capital Expenditures)', 'Money spent acquiring or upgrading physical/long-term assets (factories, equipment). Compared against D&A to gauge reinvestment pace.'],
  ['D&A (Depreciation & Amortization)', 'The non-cash accounting expense that spreads an asset’s cost over its useful life.'],
  ['FCF (Free Cash Flow)', 'Roughly CFO minus CapEx - cash generated after the reinvestment needed to sustain the business.'],
  ['Discount Rate (r)', 'The required rate of return (cost of equity) used to present-value future residual income in the RIM model. Defaults to 8%, user-editable.'],
  ['Residual Income', 'Net income minus a capital charge (beginning book value × the discount rate) - the profit earned above what shareholders required for the risk taken. This is the core quantity the RIM model values.'],
  ['Target ROE', 'The equilibrium return on equity the RIM model assumes a company converges to in the long run, as competitive pressure erodes any excess return above the discount rate. Solved (not guessed) so the model’s own terminal implied EPS growth equals 6.5%.'],
  ['Dividend Payout Ratio (k)', 'Dividends per share ÷ EPS - the fraction of earnings paid out to shareholders rather than retained to grow book value.'],
  ['Fiscal Year End', 'The company’s accounting year-end date, which can differ from the calendar year (e.g. many tech/retail companies).'],
  ['Peer Group / Comps', 'A set of comparable publicly-traded companies used for relative (multiples-based) valuation, as opposed to RIM’s intrinsic/fundamentals-based valuation.'],
  ['Factor Score', 'A single 0-100 summary combining SCF Quality, DuPont health vs. course benchmarks, and valuation discount/premium. See "How the numbers are calculated" below for the exact formula.'],
  ['Verdict (Buy / Hold / Sell)', 'Derived from upside to blended fair value: >+15% Buy, <−15% Sell, otherwise Hold.'],
  ['Optimism Bias', 'A Frankel & Lee (1998) style flag comparing analyst consensus long-term growth against a company’s own realized historical EPS growth - large gaps suggest consensus may be too optimistic.'],
  ['Alphanomics / RIM', 'The overall valuation methodology (Charles M.C. Lee, ACCTG 579) this app implements - a Residual Income Model (RIM) approach to intrinsic equity valuation, specifically the RIM.512 variant (12-year horizon, 5 years of explicit EPS forecasts).'],
]

const SECTIONS = [
  {
    id: 'rim',
    title: 'RIM Valuation — Residual Income Model',
    body: (
      <>
        <p>
          RIM values a company by asking: how much value does the business create <em>above</em> what shareholders could
          earn elsewhere at the same risk (the discount rate, r)? A company earning exactly its cost of equity is worth
          its book value; a company earning more is worth a premium.
        </p>
        <p>
          AlphaHunter uses the <strong>RIM.512</strong> variant from the Alphanomics methodology: a 12-year forecast
          horizon, with the first 5 years built from explicit EPS estimates (FY1, FY2, then FY2 grown at the long-term
          growth rate) and book value rolled forward year over year. ROE for those 5 years comes straight from EPS ÷
          beginning book value; after that, ROE <strong>fades linearly</strong> toward a "Target ROE."
        </p>
        <p>
          <strong>Target ROE is solved, not guessed:</strong> AlphaHunter searches for the value that makes the model's
          own terminal (year-12) implied EPS growth rate come out to exactly <strong>6.5%</strong> - a steady-state
          growth assumption. Every input is visible and editable on the RIM tab; changing one and clicking "Re-solve"
          finds a new Target ROE consistent with your override.
        </p>
      </>
    ),
  },
  {
    id: 'comps',
    title: 'Comps — Comparable Company Analysis',
    body: (
      <>
        <p>
          Compares the target company's trading multiples against a peer group on seven measures (see Glossary for each).
          For each, the table shows the peer group's High/Low/Mean/Median and the target's discount or premium to the
          median.
        </p>
        <p>
          The <strong>Comps-Implied Price</strong> applies the peer group's median forward P/E to the company's FY1
          EPS - the standard "peer median multiple × company metric" approach.
        </p>
      </>
    ),
  },
  {
    id: 'dupont',
    title: 'Financial Health — DuPont Decomposition',
    body: (
      <>
        <p style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-inset)', padding: '10px 14px', borderRadius: 8 }}>
          ROE = Net Margin × Asset Turnover × Financial Leverage
        </p>
        <p>Benchmarked against Lee-course norms: ROA ≈ 6%, RNOA ≈ 9%, ROE ≈ 12% - reference points, not hard cutoffs.</p>
      </>
    ),
  },
  {
    id: 'scf',
    title: 'SCF Quality — Statement of Cash Flows Checklist',
    body: (
      <>
        <p>A green/yellow/red checklist across six questions, meant to catch earnings that look good on the income statement but aren't backed by real cash generation:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong>Cash Flow Adequacy</strong> — has CFO stayed positive and covered CapEx + dividends?</li>
          <li><strong>Quality of Earnings</strong> — does CFO track net income, or is profit running ahead of cash?</li>
          <li><strong>Working Capital Management</strong> — are receivables outpacing revenue growth?</li>
          <li><strong>Key Areas of Investment</strong> — is CapEx roughly in line with depreciation?</li>
          <li><strong>Sources of Financing</strong> — are shareholder returns self-funded or debt-reliant?</li>
          <li><strong>Company Growth Dynamics</strong> — does the CFO/CFI/CFF pattern match mature, self-funding growth?</li>
        </ul>
      </>
    ),
  },
  {
    id: 'analysts',
    title: 'Analyst Views & the Optimism-Bias Flag',
    body: (
      <p>
        Wall Street price targets and rating breakdown, researched live via Claude web search, plus a Frankel &amp; Lee
        (1998) style flag comparing consensus long-term growth against realized historical EPS growth - a large gap is
        a reason to look closer before taking consensus at face value.
      </p>
    ),
  },
  {
    id: 'factor-score',
    title: 'Factor Score — the Summary Dashboard gauge',
    body: (
      <>
        <p>Averages three 0-100% scores equally:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong>SCF Quality (1/3):</strong> the six flags above, green=2/yellow=1/red=0 points out of 12.</li>
          <li><strong>DuPont Health (1/3):</strong> latest-year ROA and ROE vs. Lee-course benchmarks, averaged, capped at 100%.</li>
          <li><strong>Valuation Discount (1/3):</strong> upside/downside to fair value, mapped so 0% = 50% and ±30% spans 0-100%.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'verdict',
    title: 'Buy / Hold / Sell — how the verdict is derived',
    body: (
      <p>
        Fair value is the mean of up to three estimates (RIM terminal price, comps-implied price, analyst consensus).
        Upside is that mean vs. current price. Thresholds are fixed at ±15%: above +15% is <strong>Buy</strong>, below
        −15% is <strong>Sell</strong>, otherwise <strong>Hold</strong>.
      </p>
    ),
  },
]

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base, #05070d)', padding: '40px 20px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #3ba7ff, #2ee6a8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            AlphaHunter
          </Link>
          <Link to="/" className="btn">← Back to app</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">About AlphaHunter</div>
              <div className="card-subtitle">A complete guide to the methodology, the data, and every term used in the app.</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ borderColor: 'var(--accent-gold, #f5c542)' }}>
          <div className="card-header">
            <div className="card-title" style={{ color: 'var(--accent-gold)' }}>Not Investment Advice</div>
          </div>
          <div className="card-body" style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>
              AlphaHunter applies established equity-valuation methodology (the Alphanomics / Residual Income Model
              framework taught in ACCTG 579) to publicly available information. It is a <strong>research and
              education tool</strong>, not a recommendation to buy, hold, or sell any security. Every figure is
              generated by an AI reconstructing data via web search, not a licensed financial data provider or a
              registered investment adviser - numbers can be wrong, outdated, or inconsistent.
            </p>
            <p>
              Nothing in this app should be the sole basis for an investment decision. Investing involves risk,
              including loss of principal. Verify anything load-bearing against primary sources (company filings,
              a licensed broker or advisor) before acting. Decisions you make, and their outcomes, are entirely
              your own responsibility.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">How Data Is Gathered</div>
          </div>
          <div className="card-body" style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: 0 }}>
              AlphaHunter has no financials API - Claude (Anthropic's AI model), using its web search tool, is the
              only data source. Here's what actually happens when I run an analysis, in order:
            </p>
            <ol style={{ paddingLeft: 20, lineHeight: 1.9, margin: 0 }}>
              <li><strong>Financials &amp; fundamentals</strong> - Claude researches the company's profile, ~3-5 years of income statement/balance sheet/cash flow history, and its own trading multiples.</li>
              <li><strong>Peer discovery</strong> - Claude identifies 5-8 of the closest public comparable companies.</li>
              <li><strong>Peer multiples</strong> - Claude researches trading multiples for each peer.</li>
              <li><strong>Fiscal calendar</strong> - Claude looks up the company's fiscal year-end and earnings-release timing.</li>
              <li><strong>Analyst consensus</strong> - Claude researches Wall Street EPS estimates, growth rate, and price targets.</li>
              <li><strong>Calculation</strong> - the RIM engine, comps aggregation, DuPont decomposition, SCF checklist, and Factor Score are then computed locally from those researched inputs using fixed formulas (not AI) - see each section below.</li>
              <li><strong>Narrative</strong> - Claude writes the plain-language overview, risks, and catalysts sections for the exportable memo.</li>
            </ol>
            <p style={{ margin: 0 }}>
              This is a deliberate trade-off: it means an analysis can be produced for almost any ticker without being
              gated behind a paid data plan, but individual researched numbers can occasionally be wrong in ways a
              licensed filings API wouldn't be. Every number on every tab has a small "i" badge explaining how it's
              calculated; for published analyses (not the two sample ones) it also shows the as-of date and source
              link(s) Claude cited, and for averaged figures (peer medians, blended RIM inputs) the individual values
              that fed the average.
            </p>
          </div>
        </div>

        {SECTIONS.map((s) => (
          <div className="card" key={s.id} id={s.id}>
            <div className="card-header">
              <div className="card-title">{s.title}</div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {s.body}
            </div>
          </div>
        ))}

        <div className="card" id="glossary">
          <div className="card-header">
            <div>
              <div className="card-title">Glossary of Every Term Used in the App</div>
              <div className="card-subtitle">If a label on any tab isn't clear, it's defined here.</div>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13.5 }}>
            {GLOSSARY.map(([term, def]) => (
              <div key={term}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{term}</div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{def}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Source Citations</div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>
              Every "i" icon next to a figure explains <em>how that number is calculated</em> (the formula) - this
              works everywhere, including on the two sample analyses. For a published analysis (not the two samples),
              it also shows the as-of date and source links Claude cited when researching that figure, and for
              averaged values, every individual value that fed the average. Not every figure has a specific captured
              URL - those show an honest note rather than a fake link.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
