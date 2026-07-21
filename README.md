# AlphaHunter

**Hunt the signal. Find the value.**

A stock equity-valuation web app that turns a business-school valuation methodology into a working product.

**Live: [https://alpha-hunter-six.vercel.app](https://alpha-hunter-six.vercel.app)** — try Demo mode first, no API keys required.

## What this project does

AlphaHunter analyzes a public company and produces a Buy/Hold/Sell verdict backed by real analysis: a Residual Income Model valuation, comparable-company analysis, DuPont decomposition, statement-of-cash-flows quality scoring, and AI-researched analyst consensus — all in one dashboard, exportable as a Word equity research memo.

Demo mode ships two fully pre-analyzed tickers (**MU**, **LLY**) with real, researched data. Live mode lets you bring your own [Anthropic](https://console.anthropic.com/) key to analyze any ticker.

## Why I built this

To implement the Alphanomics methodology I learned in ACCTG 579 (Charles M.C. Lee, Foster School of Business) as real, working software instead of a one-off spreadsheet — and to go beyond a static data dashboard by using the Claude API as an actual research/writing agent for the qualitative parts of an equity memo (risks, catalysts, investment thesis).

## Tech stack

React + Vite, deployed to Vercel as a fully static site (no backend server). [Anthropic API](https://www.anthropic.com/api) with web search is the sole data source — every number on every tab (financials, cash flow, comps multiples, peer selection, analyst consensus, fiscal calendar) is reconstructed via Claude web search, not pulled from a structured financials API. `docx` for one-click Word memo export.

The API key is entered by the user, stored only in browser `localStorage`, and sent directly from the browser to Anthropic — there is no server in between and nothing is ever stored or logged anywhere else.

## How to run locally

```bash
npm install
npm run dev
```

No `.env` file needed — Demo mode works out of the box; Live mode prompts for API keys in the browser.

## What I learned

- How to reverse-engineer and formula-verify a financial model (the Alphanomics RIM.512 residual income model) cell-for-cell against real Excel workbooks, including writing a numerical bisection solver for the equilibrium Target ROE input that a spreadsheet would normally goal-seek by hand — see `src/lib/rim.js`
- How to use an LLM as a genuine research step, not just a chatbot bolted on top of real data — and the reliability trade-offs of that vs. a structured financials API (web-search-reconstructed statements can be internally inconsistent, which is why every figure needs a visible source citation)
- How to design a fully client-side app (no backend) that still handles user-supplied API keys responsibly
- How to use Git and GitHub to track a project's history and iterate in small, reviewable commits
- How to work with Claude Code as a building partner — describing what I want, reviewing what it changes, and catching issues before they ship

## Next improvements

- Expand beyond two demo tickers to a small rotating set
- Add sensitivity/scenario analysis on the RIM inputs (bull/base/bear)
- Support comparing multiple tickers side by side
- Persist and revisit past analyses instead of only the current session

## License

Portfolio project — not investment advice.
