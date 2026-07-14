// The single "run a full analysis" pipeline, usable from both the browser
// (the web app's "Analyze" flow) and Node (the admin CLI, see /cli). This is
// a pure orchestration layer over existing, already environment-agnostic
// modules - it does NOT reimplement any analytical logic. In particular the
// RIM.512 engine (lib/rim.js, via lib/valuation.js's buildValuationSummary)
// is untouched and must stay that way; if a future change here seems to
// require touching RIM math, stop and flag it instead of editing lib/rim.js.
//
// There is no FMP or other financials API - Anthropic (web search) is the
// only data source, for every number on every tab. This module has no
// knowledge of Supabase or how the Anthropic key was obtained; the caller
// (browser: an Edge Function response; Node: a service-role decrypt) is
// responsible for resolving it before invoking runFullAnalysis.

import {
  fetchCompanyFundamentals,
  fetchPeerTickers,
  fetchPeerMultiples,
  fetchFiscalCalendar,
  fetchAnalystConsensus,
  flagAnalystOptimism,
  generateNarrativeSection,
} from '../lib/claude.js'
import { computeCurrentFiscalMonth } from '../lib/fiscalCalendar.js'
import { buildDupontTable } from '../lib/dupont.js'
import { buildScfFlags } from '../lib/scf.js'
import { buildFactorScore } from '../lib/factorScore.js'
import { computeOptimismBias } from '../lib/optimismBias.js'
import { buildValuationSummary } from '../lib/valuation.js'
import { fmtPrice, fmtPct } from '../lib/format.js'

const NOOP = () => {}

/**
 * @param {object} args
 * @param {string} args.ticker
 * @param {string[]} [args.peerTickers] - comps peer set. If omitted, peers
 *   are auto-discovered via Claude web search (fetchPeerTickers). Pass an
 *   explicit array to override auto-discovery.
 * @param {string} args.anthropicKey
 * @param {string} args.model - Claude model id
 * @param {(step: string, message: string) => void} [args.onProgress]
 * @returns {Promise<object>} full dashboard payload, matching the shape of
 *   data/demo/*.js plus dupont/scfFlags/factorScore/valuationSummary/narrative
 */
export async function runFullAnalysis({ ticker, peerTickers, anthropicKey, model, onProgress = NOOP }) {
  if (!anthropicKey) throw new Error('An Anthropic API key is required - it is the only data source.')
  const errors = {}
  const t = ticker.trim().toUpperCase()

  onProgress('fetch_fundamentals', `Researching ${t} financials, cash flow, and comps multiples...`)
  const fundamentals = await fetchCompanyFundamentals({ ticker: t, model, apiKey: anthropicKey })

  const data = {
    ticker: t,
    companyName: fundamentals.companyName ?? t,
    exchange: fundamentals.exchange ?? null,
    sector: fundamentals.sector ?? null,
    industry: fundamentals.industry ?? null,
    asOfDate: new Date().toISOString().slice(0, 10),
    currentPrice: fundamentals.currentPrice ?? null,
    marketCap: fundamentals.marketCap ?? null,
    sharesOutstanding: fundamentals.sharesOutstanding ?? null,
    fiscalYearEndDescription: fundamentals.fiscalYearEndDescription ?? null,

    rimInputs: {
      fy1Eps: null,
      fy2Eps: null,
      ltg: null,
      bvps: fundamentals.bvps ?? null,
      r: 0.08,
      k: fundamentals.dividendPayoutRatio ?? 0,
      nextFiscalYearEnd: new Date().getFullYear() + 1,
      currentFiscalMonth: 1,
    },
    rimInputNotes: {
      bvps: 'Claude web search',
      k: 'Claude web search (dividend payout ratio)',
    },

    comps: {
      targetMetrics: fundamentals.targetMetrics ?? {},
      peers: [],
      note: 'All figures - target and peer - reconstructed via Claude web search, not a structured financials API. Verify anything load-bearing.',
    },

    financials: fundamentals.financials ?? [],
    financialsNote: null,
    cashFlow: fundamentals.cashFlow ?? [],
    cashFlowNote: null,

    analystViews: null,
    narrative: null,

    fundamentalsSources: fundamentals.sources ?? [],
  }

  onProgress('discover_peers', 'Identifying comps peer set...')
  let resolvedPeerTickers = peerTickers
  let peerSources = []
  if (!resolvedPeerTickers) {
    try {
      const discovered = await fetchPeerTickers({ ticker: t, model, apiKey: anthropicKey })
      resolvedPeerTickers = (discovered.peers || []).map((p) => p.ticker)
      peerSources = discovered.sources || []
    } catch (err) {
      errors.peerDiscovery = err.message
      resolvedPeerTickers = []
    }
  }

  onProgress('fetch_peers', `Pulling comps multiples for ${resolvedPeerTickers.length} peer(s)...`)
  const peerResults = await Promise.all(
    resolvedPeerTickers.map(async (peerTicker) => {
      const p = peerTicker.trim().toUpperCase()
      try {
        const multiples = await fetchPeerMultiples({ ticker: p, model, apiKey: anthropicKey })
        return { ticker: p, multiples, error: null }
      } catch (err) {
        return { ticker: p, multiples: null, error: err.message }
      }
    })
  )
  data.comps.peers = peerResults.filter((p) => !p.error).map((p) => p.multiples)
  const peerErrors = peerResults.filter((p) => p.error)
  if (peerErrors.length) errors.peers = Object.fromEntries(peerErrors.map((p) => [p.ticker, p.error]))
  if (peerSources.length) data.comps.peerDiscoverySources = peerSources

  onProgress('fetch_fiscal_calendar', 'Looking up fiscal calendar...')
  try {
    const calendar = await fetchFiscalCalendar({ ticker: t, model, apiKey: anthropicKey })
    data.rimInputs.nextFiscalYearEnd = calendar.nextFiscalYearEndYear ?? data.rimInputs.nextFiscalYearEnd
    data.rimInputs.currentFiscalMonth = computeCurrentFiscalMonth({
      lastFiscalYearEndDate: calendar.lastFiscalYearEndDate,
      earningsReleaseForLastFiscalYear: calendar.earningsReleaseForLastFiscalYear,
      asOfDate: data.asOfDate,
    })
    data.rimInputNotes.nextFiscalYearEnd = 'Fiscal calendar lookup (Claude web search)'
    data.rimInputNotes.currentFiscalMonth = 'Computed from fiscal calendar lookup'
  } catch (err) {
    errors.fiscalCalendar = err.message
  }

  onProgress('fetch_consensus', 'Researching analyst consensus...')
  let consensus = null
  try {
    consensus = await fetchAnalystConsensus({ ticker: t, model, apiKey: anthropicKey })
    data.rimInputs.fy1Eps = consensus.fy1EpsNormalized ?? data.rimInputs.fy1Eps
    data.rimInputs.fy2Eps = consensus.fy2EpsNormalized ?? data.rimInputs.fy2Eps
    data.rimInputs.ltg = consensus.longTermGrowthRate ?? data.rimInputs.ltg
    data.rimInputNotes.fy1Eps = 'Claude web search (consensus)'
    data.rimInputNotes.fy2Eps = 'Claude web search (consensus)'
    data.rimInputNotes.ltg = 'Claude web search (consensus)'

    data.analystViews = {
      targetMean: consensus.targetPriceMean,
      targetMedian: consensus.targetPriceMedian,
      targetHigh: null,
      targetLow: null,
      numAnalysts: consensus.numAnalysts,
      buy: consensus.ratingsBuy,
      hold: consensus.ratingsHold,
      sell: consensus.ratingsSell,
      longTermGrowthRate: consensus.longTermGrowthRate,
      sources: consensus.sources,
    }
  } catch (err) {
    errors.analystConsensus = err.message
  }

  onProgress('solve_rim', 'Solving RIM residual income model...')
  const valuationSummary = buildValuationSummary({
    rimInputs: data.rimInputs,
    comps: data.comps,
    analystViews: data.analystViews,
    currentPrice: data.currentPrice,
  })

  onProgress('compute_health', 'Computing DuPont decomposition and SCF quality flags...')
  const dupont = buildDupontTable(data.financials)
  const scfFlags = buildScfFlags({ cashFlow: data.cashFlow, financials: data.financials })
  const factorScore = buildFactorScore({
    scfFlags,
    dupontLatest: dupont[dupont.length - 1] ?? null,
    upside: valuationSummary.upside,
  })

  onProgress('check_optimism_bias', 'Checking analyst consensus for optimism bias...')
  const localBias = computeOptimismBias({ financials: data.financials, ltg: data.rimInputs.ltg })
  let bias = localBias
  if (consensus) {
    try {
      bias = await flagAnalystOptimism({
        ticker: t,
        model,
        apiKey: anthropicKey,
        consensus,
        historicalEpsGrowthCagr: localBias.available ? localBias.realizedCagr : null,
      })
    } catch (err) {
      errors.optimismBias = err.message
    }
  }

  onProgress('write_narrative', 'Writing memo narrative sections...')
  let narrative = null
  const narrativeContext = {
    ticker: t,
    companyName: data.companyName,
    verdict: valuationSummary.verdict,
    fairValueRange: `${fmtPrice(valuationSummary.medianFairValue)} - ${fmtPrice(valuationSummary.meanFairValue)}`,
    currentPrice: fmtPrice(data.currentPrice),
    rimSummary: `terminal implied price ${fmtPrice(valuationSummary.rim.terminalPrice)}`,
    compsSummary: `peer-median implied price ${fmtPrice(valuationSummary.compsPrice)}`,
    analystSummary: `mean target ${fmtPrice(data.analystViews?.targetMean)}, upside ${fmtPct(valuationSummary.upside)}`,
  }
  try {
    const [companyOverview, macroEnvironment, keyRisks, nearTermCatalysts, investmentThesis] = await Promise.all([
      generateNarrativeSection('companyOverview', narrativeContext, { model, apiKey: anthropicKey }),
      generateNarrativeSection('macroEnvironment', narrativeContext, { model, apiKey: anthropicKey }),
      generateNarrativeSection('keyRisks', narrativeContext, { model, apiKey: anthropicKey }),
      generateNarrativeSection('nearTermCatalysts', narrativeContext, { model, apiKey: anthropicKey }),
      generateNarrativeSection('investmentThesis', narrativeContext, { model, apiKey: anthropicKey }),
    ])
    narrative = { companyOverview, macroEnvironment, keyRisks, nearTermCatalysts, investmentThesis }
  } catch (err) {
    errors.narrative = err.message
  }
  data.narrative = narrative

  onProgress('assemble', 'Assembling report...')
  return {
    ...data,
    dupont,
    scfFlags,
    factorScore,
    valuationSummary,
    optimismBias: bias,
    meta: {
      generatedAt: new Date().toISOString(),
      peerTickers: resolvedPeerTickers,
      errors: Object.keys(errors).length ? errors : null,
    },
  }
}
