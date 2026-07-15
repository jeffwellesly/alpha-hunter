# Publishing a new stock analysis (Claude Code workflow)

Jeff does not hold a personal Anthropic API key, and `ENCRYPTION_SECRET`
(the Edge Function secret used to decrypt one if it were stored in
Supabase) cannot be retrieved via any CLI - `supabase secrets list` only
ever returns a one-way hash of secret values, by design. **Do not ask for
an Anthropic API key or try to set up `.env.cli` per `supabase/README.md`
- that path is for a hypothetical future admin key and is not how this
actually gets done.**

Instead, when asked to "do the analysis for TICKER and publish it":

## 1. Research the raw data yourself (Claude Code's own WebSearch/WebFetch)

You (Claude Code) are the data source, replacing the app's own
`fetchCompanyFundamentals` / `fetchPeerTickers` / `fetchPeerMultiples` /
`fetchFiscalCalendar` / `fetchAnalystConsensus` / `flagAnalystOptimism` /
`generateNarrativeSection` calls in `src/lib/claude.js` - read that file
first, it has the exact JSON schema and system/user prompts each one uses.
Reproduce the same fields, with the same rules (null over guessing, cite
sources, etc), using `stockanalysis.com` as the primary source (financials,
balance sheet, cash flow, statistics, forecast, dividend pages) the same
way the app's own prompts direct it to, cross-checked against SEC filings
/ company press releases / a couple of secondary sources for anything
narrative or judgment-based (peer selection, LTG, recent events).

Use an existing published analysis's raw shape as the template - read
`src/data/demo/mu.js` (or `lly.js`/`sndk.js`) end to end first. Match its
field names and conventions exactly: `rimInputs`, `rimInputNotes`,
`comps.targetMetrics`/`comps.peers`/`comps.note`, `financials[]` (3
actual years + up to 2 estimate years, `isEstimate` flag, forward years
only populate `revenue`/`epsNonGaap`), `cashFlow[]` (3 actual years only),
`financialsNote`/`cashFlowNote` (honest prose about data gaps/anomalies,
not hidden), `analystViews`, `narrative` (5 sections, word counts and
bullet-vs-prose format per the `NARRATIVE_PROMPTS` in `claude.js`).

Write the raw data to a scratch `.mjs` file (not committed to the repo)
exporting a `base` object in this shape, plus a `sources` object (see
step 3).

## 2. Compute derived fields with the REAL library code - never by hand

Import and run the actual, unmodified modules against your raw data:
`src/lib/valuation.js` (`buildValuationSummary`), `src/lib/dupont.js`
(`buildDupontTable`), `src/lib/scf.js` (`buildScfFlags`),
`src/lib/factorScore.js` (`buildFactorScore`), `src/lib/optimismBias.js`
(`computeOptimismBias`) - this is what "exact same methodology" means in
practice. `src/shared/runAnalysis.js` shows the exact call sequence and
the exact final result shape (raw data spread + `dupont` + `scfFlags` +
`factorScore` + `valuationSummary` + `optimismBias` + `meta`) - that
combined shape is what gets published, not just the raw demo-file shape.

Run this via a scratch Node script (ESM, `import()`-ing the lib files by
absolute `pathToFileURL` since it lives outside `alpha-hunter/`), executed
with `node` from inside the `alpha-hunter/` directory if it needs
`@supabase/supabase-js` (Node's ESM resolver looks upward from the
importing file's own path, not `cwd` - `NODE_PATH` does not work for
ESM). Print the computed verdict/upside/factor score and sanity-check them
before publishing.

**Known edge case - RIM implied price can be negative or absurdly large**
if a company's book value per share is thin relative to its EPS (heavy
buybacks, big one-time charges, high-growth-off-low-book names, etc). As
of `4444c7a` (2026-07-15), `buildValuationSummary` already excludes a
non-positive RIM price from the blend and sets `valuationSummary.rim.reliable
= false`, and the Dashboard/docx export both show a visible note instead
of silently including a nonsensical number. This is real, verified
behavior of the shared code - don't manually override a verdict or fudge
inputs (`bvps`, `k`, etc) to force a "nicer" RIM number; if it happens
again, the existing exclusion logic handles it automatically.

## 3. `data.sources` has two different, incompatible shapes in this codebase

- **Live/published shape** (what you must produce): an object keyed by
  field name - `{ bvps: {asOfDate, links}, k: {...}, targetMetrics: {...},
  financials: {...}, cashFlow: {...}, peers: {TICKER: {...}}, fy1Eps:
  {...}, fy2Eps: {...}, ltg: {...}, analystViews: {...},
  nextFiscalYearEnd: {...}, currentFiscalMonth: {...} }` - each value is
  `{asOfDate, links: [{label, url}]}`. This is what `InfoBadge` reads
  throughout Dashboard/Comps/Rim/AnalystViews (see `src/lib/claude.js`
  lines ~104-111 in `runAnalysis.js`, and grep `data.sources?.` in
  `src/pages/`). Group your research links by which field they support
  (fundamentals links get reused across bvps/k/targetMetrics/
  financials/cashFlow; consensus links across fy1Eps/fy2Eps/ltg/
  analystViews; one set of links per peer ticker).
- **Demo-file-only shape**: a flat array of `{category, url, dataUsed}` -
  only consumed by `docxExport.js`'s Word-memo "References & Sources"
  appendix (`sourcesTable()`), and only actually present in
  `src/data/demo/*.js`. If you want the Word export's citation appendix to
  work for a published analysis too, additionally build this array and
  store it under `sourceCitations` (harmless extra key, currently
  unconsumed anywhere - a real gap in the live pipeline, not something to
  silently paper over).

## 4. Publish directly to Supabase - skip the CLI's key-decrypt path entirely

You don't need `ENCRYPTION_SECRET` or an Anthropic key at all for
publishing, since you already have the finished result JSON in hand
(no `get_decrypted_api_key` RPC call needed - that's only for the CLI's
"fetch a stored Anthropic key" mode, which `cli/analyze.js` uses when
*it* does the research; you already did the research).

1. Get the service role key fresh each time (do not save it to a file in
   this repo, do not commit it anywhere - it's a live secret with
   `service_role` DB access):
   ```
   npx --yes supabase projects api-keys --project-ref pvrmqyobzarmzxpbsksr
   ```
   (needs `supabase` CLI login - already authenticated as of 2026-07-15;
   if not, `npx supabase login`). Pull the `service_role` `api_key` value
   from the JSON response.
2. `SUPABASE_URL` = `https://pvrmqyobzarmzxpbsksr.supabase.co`,
   `ADMIN_USER_ID` = `82702adf-a2d1-43c1-9968-cf50bf070cb6` (both fine to
   hardcode in a scratch script, neither is sensitive on its own).
3. Write a scratch script (staged temporarily inside `alpha-hunter/` so
   `@supabase/supabase-js` resolves, then deleted immediately after
   running - never commit it) that does:
   ```js
   const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
   await admin.from('analyses').insert({
     user_id: ADMIN_USER_ID, ticker, company_name,
     status: result.meta.errors ? 'partial' : 'complete',
     is_public: true, results_json: result,
   })
   ```
   Pass the service role key via an env var on the command line, never
   written to a file. To correct an already-published analysis, `.update({
   results_json })` `.eq('id', rowId)` instead of a fresh `insert` (avoids
   duplicate rows for the same ticker).
4. Verify with the *anon* key exactly as the live site queries it:
   ```js
   supabase.from('analyses').select('id, ticker, company_name, created_at,
     results_json->valuationSummary->verdict').eq('is_public', true)
   ```
   (anon key is in `.env.local`, not sensitive - it's shipped to every
   browser already).

## Misc

- Live site alias is `alpha-hunter-six.vercel.app` - the README's
  `alpha-hunter-jeff.vercel.app` 404s (stale/wrong domain as of
  2026-07-15, not something this workflow fixes).
- This whole flow makes real web-search calls but **zero paid API calls**
  (no Anthropic key involved) - the only cost-bearing step in the entire
  pipeline that this workflow deliberately avoids.
