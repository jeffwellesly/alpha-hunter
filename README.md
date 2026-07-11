# AlphaHunter

**Hunt the signal. Find the value.**

A stock equity-valuation web app implementing the Alphanomics methodology (ACCTG 579, Charles M.C. Lee, Foster School of Business) — Residual Income Model, comparable company analysis, DuPont decomposition, statement-of-cash-flows quality scoring, and analyst-consensus research, wrapped in a single dashboard with a Buy/Hold/Sell verdict.

This is a portfolio project demonstrating both financial-analysis rigor and applied use of the Claude API as a research/writing agent — not just a static data dashboard.

## Try it

Demo mode ships two fully pre-analyzed tickers (**MRVL**, **NFLX**) with real, researched data — no API keys required. Toggle to Live mode and bring your own free [Financial Modeling Prep](https://financialmodelingprep.com/) key (+ optional [Anthropic](https://console.anthropic.com/) key) to analyze any ticker.

## Stack

- React + Vite, deployed to Vercel — fully static, no backend server
- [Financial Modeling Prep](https://financialmodelingprep.com/) for hard financials (income statement, balance sheet, cash flow, comps multiples)
- [Anthropic API](https://www.anthropic.com/api) with web search for analyst consensus, fiscal-calendar lookups, and narrative generation (company overview, risks, catalysts, investment thesis)
- `docx` for one-click Word memo export matching a standard equity research memo format

API keys are entered by the user, stored only in browser `localStorage`, and sent directly from the browser to FMP/Anthropic — there is no server in between and nothing is ever stored or logged anywhere else.

## The RIM.512 engine

The core valuation model is a from-scratch implementation of the Alphanomics RIM.512 residual income model, reverse-engineered and formula-verified cell-for-cell against real Excel workbooks, including a numerical bisection solver for the equilibrium Target ROE input (rather than a manual spreadsheet goal-seek). See `src/lib/rim.js`.

## Local development

```bash
npm install
npm run dev
```

## License

Portfolio project — not investment advice.
