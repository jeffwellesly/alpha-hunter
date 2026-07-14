// Throwaway Node smoke-test for runFullAnalysis - proves the shared module
// actually runs outside a browser before Supabase/CLI infrastructure gets
// built on top of it. Not part of the deployed app or the real admin CLI
// (that's cli/analyze.js, a later build step with Supabase auth wired in).
//
// Usage: ANTHROPIC_KEY=... node src/shared/smoke-test.js MU

import { runFullAnalysis } from './runAnalysis.js'

const ticker = process.argv[2] || 'MU'
const anthropicKey = process.env.ANTHROPIC_KEY

if (!anthropicKey) {
  console.error('Set ANTHROPIC_KEY env var')
  process.exit(1)
}

const result = await runFullAnalysis({
  ticker,
  anthropicKey,
  model: 'claude-haiku-4-5-20251001',
  onProgress: (step, message) => console.log(`[${step}] ${message}`),
})

console.log('\n--- Result summary ---')
console.log('ticker:', result.ticker, result.companyName)
console.log('currentPrice:', result.currentPrice)
console.log('financials years:', result.financials.map((f) => f.year))
console.log('comps peers:', result.comps.peers.map((p) => p.ticker))
console.log('rimInputs:', result.rimInputs)
console.log('valuationSummary.verdict:', result.valuationSummary.verdict)
console.log('valuationSummary.upside:', result.valuationSummary.upside)
console.log('dupont rows:', result.dupont.length)
console.log('scfFlags:', result.scfFlags.map((f) => `${f.key}:${f.status}`))
console.log('factorScore:', result.factorScore.score)
console.log('analystViews:', result.analystViews)
console.log('narrative:', result.narrative ? Object.keys(result.narrative) : null)
console.log('meta.errors:', result.meta.errors)
