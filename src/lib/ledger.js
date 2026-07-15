import { DEMO_TICKERS, DEMO_DATA } from '../data/demo'
import { buildValuationSummary } from './valuation'

/**
 * Groups the two bundled demo analyses and any published Supabase rows into
 * one ledger: one entry per ticker, each carrying its full history (a
 * ticker analyzed more than once shows every dated entry, most recent
 * first). Used by both the Home preview and the full Analyses list.
 */
export function buildLedger(publishedRows) {
  const byTicker = new Map()

  for (const t of DEMO_TICKERS) {
    const d = DEMO_DATA[t]
    let verdict = null
    try {
      verdict = buildValuationSummary({
        rimInputs: d.rimInputs,
        comps: d.comps,
        analystViews: d.analystViews,
        currentPrice: d.currentPrice,
      }).verdict
    } catch {
      // leave verdict null if it can't be computed
    }
    byTicker.set(t, {
      ticker: t,
      companyName: d.companyName,
      entries: [{ date: d.asOfDate, verdict, kind: 'demo', raw: d }],
    })
  }

  for (const row of publishedRows || []) {
    const entry = { date: row.created_at?.slice(0, 10), verdict: row.verdict, kind: 'published', id: row.id }
    if (byTicker.has(row.ticker)) {
      byTicker.get(row.ticker).entries.push(entry)
    } else {
      byTicker.set(row.ticker, { ticker: row.ticker, companyName: row.company_name, entries: [entry] })
    }
  }

  const list = [...byTicker.values()].map((stock) => ({
    ...stock,
    entries: stock.entries.sort((a, b) => (a.date < b.date ? 1 : -1)),
  }))

  list.sort((a, b) => (a.entries[0].date < b.entries[0].date ? 1 : -1))
  return list
}
