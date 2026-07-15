import { useMemo } from 'react'
import { useCompanyData } from '../hooks/useCompanyData'
import { buildValuationSummary } from '../lib/valuation'
import { buildScfFlags } from '../lib/scf'
import { buildDupontTable } from '../lib/dupont'
import { buildFactorScore } from '../lib/factorScore'
import { fmtPrice, fmtPct, upsideClass } from '../lib/format'
import VerdictBadge from '../components/ui/VerdictBadge'
import Gauge from '../components/ui/Gauge'
import ProgressBar from '../components/ui/ProgressBar'
import PriceWaterfall from '../components/dashboard/PriceWaterfall'
import InfoBadge from '../components/ui/InfoBadge'

export default function Dashboard() {
  const { data, loading, error } = useCompanyData()

  const summary = useMemo(() => {
    if (!data || !data.comps?.peers?.length) return null
    try {
      return buildValuationSummary({
        rimInputs: data.rimInputs,
        comps: data.comps,
        analystViews: data.analystViews,
        currentPrice: data.currentPrice,
      })
    } catch {
      return null
    }
  }, [data])

  const scfFlags = useMemo(() => (data ? buildScfFlags({ cashFlow: data.cashFlow, financials: data.financials }) : []), [data])
  const dupontTable = useMemo(() => (data ? buildDupontTable(data.financials) : []), [data])
  const factorScore = useMemo(
    () =>
      buildFactorScore({
        scfFlags,
        dupontLatest: dupontTable[dupontTable.length - 1],
        upside: summary?.upside,
      }),
    [scfFlags, dupontTable, summary]
  )

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">Loading…</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="card">
        <div className="card-body">{error || 'No data available.'}</div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title" style={{ marginBottom: 8 }}>
            Not enough data yet to compute a verdict
          </div>
          <div className="card-subtitle">
            The analysis run didn't find enough peer/comps data to aggregate a fair value — check the Comps tab for what came back.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="card" style={{ padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 26 }}>{data.ticker}</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 19, color: 'var(--bone)' }}>{data.companyName}</span>
            <VerdictBadge verdict={summary.verdict} size="md" />
            <InfoBadge explainKey="verdict" />
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted-dim)', marginBottom: 22, textTransform: 'uppercase' }}>
            {[data.sector, data.industry, `as of ${data.asOfDate}`].filter(Boolean).join(' · ')}
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <Stat label="Current Price" value={fmtPrice(data.currentPrice)} explainKey="currentPrice" />
            <Stat label="Mean Fair Value" value={fmtPrice(summary.meanFairValue)} accent="var(--blue)" explainKey="meanFairValue" />
            <Stat label="Median Fair Value" value={fmtPrice(summary.medianFairValue)} explainKey="medianFairValue" />
            <Stat
              label="Upside to Mean"
              value={fmtPct(summary.upside)}
              accent={summary.upside > 0 ? 'var(--green)' : 'var(--rose)'}
              explainKey="upside"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 170 }}>
          <Gauge score={factorScore.score} />
          <div className="label">Factor Score<InfoBadge explainKey="factorScore" /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: '28px 30px' }}>
          <div className="card-title" style={{ marginBottom: 4 }}>Valuation Waterfall</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28 }}>Current price vs. each valuation method vs. mean fair value</div>
          <PriceWaterfall currentPrice={data.currentPrice} sources={summary.sources} meanFairValue={summary.meanFairValue} />
          <div style={{ display: 'flex', gap: 20, marginTop: 18, flexWrap: 'wrap' }}>
            {summary.sources.map((s) => (
              <div key={s.label} style={{ fontSize: 12.5 }}>
                <span style={{ color: 'var(--muted)' }}>{s.label}: </span>
                <span className={`mono ${upsideClass(s.price != null && data.currentPrice ? s.price / data.currentPrice - 1 : null)}`}>
                  {fmtPrice(s.price)}
                  {s.label === 'RIM (terminal)' && (
                    <InfoBadge
                      explainKey="rimSource"
                      source={data.sources?.fy1Eps}
                      components={[
                        { label: 'FY1/FY2 EPS, LTG', value: 'consensus' },
                        { label: 'BVPS, payout ratio', value: 'fundamentals' },
                      ]}
                    />
                  )}
                  {s.label === 'Comps (peer median)' && (
                    <InfoBadge
                      explainKey="compsSource"
                      source={data.sources && { asOfDate: data.asOfDate, links: [] }}
                      components={data.comps?.peers
                        ?.filter((p) => typeof p.ntmFwdPe === 'number')
                        .map((p) => ({ label: p.ticker, value: `${p.ntmFwdPe.toFixed(1)}x` }))}
                    />
                  )}
                  {s.label === 'Analyst consensus' && <InfoBadge explainKey="analystSource" source={data.sources?.analystViews} />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '28px 30px' }}>
          <div className="card-title" style={{ marginBottom: 22 }}>Factor Score Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <ProgressBar label="SCF Quality" pct={factorScore.components.scf.pct} color="var(--green)" explainKey="factorScoreScf" />
            <ProgressBar label="DuPont Health vs. Lee Benchmarks" pct={factorScore.components.dupont.pct} color="var(--blue)" explainKey="factorScoreDupont" />
            <ProgressBar label="Valuation Discount" pct={factorScore.components.valuation.pct} color="var(--amber)" explainKey="factorScoreValuation" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, accent, explainKey }) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 8 }}>{label}{explainKey && <InfoBadge explainKey={explainKey} />}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 23, fontWeight: 500, color: accent || 'var(--bone)' }}>
        {value}
      </div>
    </div>
  )
}
