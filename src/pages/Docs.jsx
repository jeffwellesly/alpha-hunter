const SECTIONS = [
  {
    id: 'rim',
    title: 'RIM Valuation — Residual Income Model',
    body: (
      <>
        <p>
          RIM (Residual Income Model) values a company by asking: how much value does the business create <em>above</em> what
          shareholders could earn elsewhere at the same risk (the discount rate, r)? A company earning exactly its cost of
          equity is worth its book value; a company earning more is worth a premium.
        </p>
        <p>
          AlphaHunter uses the <strong>RIM.512</strong> variant from the Alphanomics methodology (ACCTG 579, Charles M.C.
          Lee): a 12-year forecast horizon, with the first 5 years built from explicit EPS estimates (FY1, FY2, then FY2
          grown at the long-term growth rate) and book value rolled forward year over year. Return on equity (ROE) for
          those 5 years comes straight from EPS ÷ beginning book value; after that, ROE <strong>fades linearly</strong>{' '}
          toward a "Target ROE" — the equilibrium return the model assumes the business converges to as competitive
          pressure erodes any excess return.
        </p>
        <p>
          <strong>Target ROE is solved, not guessed:</strong> AlphaHunter searches for the Target ROE value that makes the
          model's own terminal (year-12) implied EPS growth rate come out to exactly <strong>6.5%</strong> — a steady-state
          growth assumption. Every other input (FY1/FY2 EPS, growth rate, book value, discount rate, dividend payout ratio)
          is visible and editable on the RIM tab; changing any of them and clicking "Re-solve" finds a new Target ROE
          consistent with your override.
        </p>
        <p>
          The <strong>Implied Price by Forecasting Horizon</strong> table shows what the model implies the stock is worth
          at each year of the horizon, converging toward the terminal (12-year) value used elsewhere in the app.
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
          The Comps tab compares the target company's trading multiples against a peer group on seven measures: TEV/Revenue,
          TEV/EBITDA, TEV/EBIT, Price/Diluted EPS, Price/Tangible Book Value, and next-twelve-months (NTM) forward versions
          of TEV/Revenue and P/E where available.
        </p>
        <p>
          For each multiple, the table shows the peer group's High, Low, Mean, and Median, plus the target company's
          discount or premium to the peer median. A <strong>discount</strong> (negative %) means the stock trades cheaper
          than peers on that measure; a <strong>premium</strong> (positive %) means more expensive.
        </p>
        <p>
          The <strong>Comps-Implied Price</strong> applies the peer group's median forward P/E to the company's own FY1 EPS
          — the standard "peer median multiple × company metric" approach — and feeds into the Summary Dashboard's fair
          value alongside RIM and analyst consensus.
        </p>
      </>
    ),
  },
  {
    id: 'dupont',
    title: 'Financial Health — DuPont Decomposition',
    body: (
      <>
        <p>
          DuPont analysis breaks Return on Equity (ROE) into three drivers, so you can see <em>why</em> a company is
          profitable, not just whether it is:
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-inset)', padding: '10px 14px', borderRadius: 8 }}>
          ROE = Net Margin × Asset Turnover × Financial Leverage
        </p>
        <p>
          <strong>Net Margin</strong> (Net Income ÷ Revenue) measures pricing power and cost control. <strong>Asset
          Turnover</strong> (Revenue ÷ Total Assets) measures how efficiently assets generate sales. <strong>Financial
          Leverage</strong> (Total Assets ÷ Total Equity) measures how much debt amplifies equity returns.
        </p>
        <p>
          Each year is benchmarked against Lee-course norms: ROA ≈ 6%, RNOA ≈ 9%, ROE ≈ 12%. These aren't hard cutoffs —
          they're reference points for "is this company earning an above- or below-average return on the capital
          employed."
        </p>
      </>
    ),
  },
  {
    id: 'scf',
    title: 'SCF Quality — Statement of Cash Flows Checklist',
    body: (
      <>
        <p>
          A green/yellow/red checklist across six questions, meant to catch earnings that look good on the income statement
          but aren't backed by real cash generation:
        </p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong>Cash Flow Adequacy</strong> — has operating cash flow (CFO) stayed positive, and does it cover CapEx + dividends?</li>
          <li><strong>Quality of Earnings</strong> — does CFO track net income (CFO/Net Income ≥ 1.0 is strong; well below 0.7 is a flag), or is reported profit running ahead of actual cash?</li>
          <li><strong>Working Capital Management</strong> — are receivables growing in line with revenue, or outpacing it (a possible channel-stuffing or collection-risk signal)?</li>
          <li><strong>Key Areas of Investment</strong> — is CapEx roughly in line with depreciation (steady-state reinvestment), or a significant outlier in either direction?</li>
          <li><strong>Sources of Financing</strong> — is the company returning capital to shareholders self-funded from operations, or leaning on new debt/equity issuance?</li>
          <li><strong>Company Growth Dynamics</strong> — does the CFO/CFI/CFF pattern match a mature, self-funding growth company (CFO+, CFI-, CFF-), or something more mixed?</li>
        </ul>
        <p>
          <span className="flag-dot flag-green" style={{ display: 'inline-block', marginRight: 6 }} /> Green = healthy signal,{' '}
          <span className="flag-dot flag-yellow" style={{ display: 'inline-block', marginRight: 6 }} /> Yellow = worth watching, not alarming,{' '}
          <span className="flag-dot flag-red" style={{ display: 'inline-block', marginRight: 6 }} /> Red = a real concern worth digging into.
        </p>
      </>
    ),
  },
  {
    id: 'analysts',
    title: 'Analyst Views & the Optimism-Bias Flag',
    body: (
      <>
        <p>
          This tab shows Wall Street analyst price targets (mean, median, high/low where available) and a Buy/Hold/Sell
          rating breakdown, researched live via Claude web search.
        </p>
        <p>
          The <strong>Optimism-Bias Flag</strong> applies the Frankel &amp; Lee (1998) framework: it compares the
          consensus long-term growth (LTG) estimate against the company's own historically realized EPS growth rate
          (CAGR). Analysts are systematically prone to over-optimism, especially on growth stocks — when consensus LTG
          runs at <strong>1.4× or more</strong> above realized historical growth, that's flagged medium severity; at{' '}
          <strong>2× or more</strong> (or strong growth assumed despite recent negative realized growth), high severity.
          A flag doesn't mean the estimate is wrong — durable step-changes in growth happen — but it's a reason to look
          closer before taking consensus numbers at face value.
        </p>
      </>
    ),
  },
  {
    id: 'factor-score',
    title: 'Factor Score — the Summary Dashboard gauge',
    body: (
      <>
        <p>
          The single 0–100 number on the Summary Dashboard gauge combines three components, each mapped onto a 0–100%
          scale and averaged equally:
        </p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>
            <strong>SCF Quality (1/3):</strong> the six flags above, scored green = 2 points, yellow = 1, red = 0, out of a
            possible 12 — e.g. all six green = 100%.
          </li>
          <li>
            <strong>DuPont Health (1/3):</strong> the latest year's ROA and ROE measured against the Lee-course benchmarks
            (ROA 6%, ROE 12%) and averaged — meeting the benchmark exactly scores 100% on that measure, capped there (it
            doesn't reward exceeding it further beyond 100%).
          </li>
          <li>
            <strong>Valuation Discount (1/3):</strong> the stock's upside/downside to its blended fair value (see below),
            mapped so that 0% upside sits at 50%, and the full ±30% range maps linearly across 0–100%.
          </li>
        </ul>
        <p>A high score means the SCF checklist is clean, profitability clears course benchmarks, and the stock looks cheap relative to its blended fair value — not a prediction, a summary of the other tabs.</p>
      </>
    ),
  },
  {
    id: 'verdict',
    title: 'Buy / Hold / Sell — how the verdict is derived',
    body: (
      <>
        <p>
          The Summary Dashboard's fair value is the <strong>mean of up to three price estimates</strong>: the RIM
          terminal implied price, the comps peer-median-implied price, and analyst consensus (average of mean and median
          target price) — whichever of the three are available for a given ticker.
        </p>
        <p>
          <strong>Upside</strong> is that mean fair value versus the current price. The verdict thresholds are symmetric
          and fixed at <strong>±15%</strong>: upside above +15% is a <strong>Buy</strong>, below −15% is a{' '}
          <strong>Sell</strong>, and anything in between is a <strong>Hold</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'sources',
    title: 'Source Citations',
    body: (
      <>
        <p>
          Every figure in AlphaHunter — financials, comps multiples, analyst consensus, fiscal calendar dates — is
          reconstructed live via Claude web search rather than pulled from a structured financials API. That's a
          deliberate trade-off: it means AlphaHunter can analyze almost any ticker without being gated behind a paid data
          plan, but it also means individual numbers can occasionally be wrong or inconsistent in ways a filings API
          wouldn't be.
        </p>
        <p>
          Look for the small "i" icon next to a figure on the RIM, Comps, Analyst Views, and Summary Dashboard tabs
          (live-mode analyses only — demo data predates this and has no source metadata). Clicking it shows the as-of
          date and the source links Claude cited when researching that figure. For averaged values — the comps peer
          mean/median, and the RIM tab's blended inputs — it also lists the individual per-peer or per-input values
          that fed the average, not just the final number.
        </p>
        <p>
          Not every figure has a specific captured URL (some come back as general web-search knowledge without a
          single citable source) — those show an honest "no specific source URL captured" note rather than a fake
          link. Treat every number as something to spot-check before relying on it for a real decision, especially
          anything feeding the RIM or comps valuation.
        </p>
      </>
    ),
  },
]

export default function Docs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">How This Works</div>
            <div className="card-subtitle">What every number and term on the dashboard means, and where it comes from.</div>
          </div>
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
    </div>
  )
}
