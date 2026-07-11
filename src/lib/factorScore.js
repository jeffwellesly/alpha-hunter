import { LEE_BENCHMARKS } from './dupont'
import { scfScore } from './scf'

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

/**
 * Combines SCF quality flags, DuPont health vs. Lee course benchmarks, and
 * the valuation discount/premium (mean fair value vs. current price) into a
 * single 0-100 factor score for the dashboard gauge.
 */
export function buildFactorScore({ scfFlags, dupontLatest, upside }) {
  const scf = scfFlags?.length ? scfScore(scfFlags) : null
  const scfPct = scf ? scf.points / scf.max : 0.5

  let dupontPct = 0.5
  if (dupontLatest) {
    const roaScore = dupontLatest.roa != null ? clamp01(dupontLatest.roa / LEE_BENCHMARKS.roa) : null
    const roeScore = dupontLatest.roe != null ? clamp01(dupontLatest.roe / LEE_BENCHMARKS.roe) : null
    const scores = [roaScore, roeScore].filter((v) => v != null)
    if (scores.length) dupontPct = scores.reduce((a, b) => a + b, 0) / scores.length
  }

  // Map upside in [-30%, +30%] linearly onto [0, 1], clamped, 0% upside = 0.5
  let valuationPct = 0.5
  if (upside != null) {
    valuationPct = clamp01(0.5 + upside / 0.6)
  }

  const overall = (scfPct + dupontPct + valuationPct) / 3

  return {
    score: Math.round(overall * 100),
    components: {
      scf: { pct: Math.round(scfPct * 100), detail: scf },
      dupont: { pct: Math.round(dupontPct * 100) },
      valuation: { pct: Math.round(valuationPct * 100) },
    },
  }
}
