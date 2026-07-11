import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
} from 'docx'
import { saveAs } from 'file-saver'
import { buildValuationSummary } from './valuation'
import { buildCompsTable } from './comps'
import { horizonTableRows } from './rim'
import { fmtPrice, fmtPct, fmtMultiple, fmtMillions } from './format'

const NAVY = '0A0F1E'
const ACCENT = '1C5FC2'

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, color: ACCENT, size: 26 })],
  })
}

function subheading(text) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    children: [new TextRun({ text, bold: true, size: 22 })],
  })
}

function body(text) {
  return new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text, size: 22 })] })
}

function bullet(text) {
  return new Paragraph({ bullet: { level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text, size: 22 })] })
}

const CELL_MARGIN = { top: 60, bottom: 60, left: 100, right: 100 }
const CELL_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC' },
  bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC' },
  left: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC' },
  right: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC' },
}

function cell(text, { header = false, align = AlignmentType.RIGHT } = {}) {
  return new TableCell({
    margins: CELL_MARGIN,
    borders: CELL_BORDERS,
    shading: header ? { type: ShadingType.SOLID, color: NAVY, fill: NAVY } : undefined,
    children: [
      new Paragraph({
        alignment: align,
        children: [new TextRun({ text: String(text ?? '—'), bold: header, color: header ? 'FFFFFF' : '000000', size: 19 })],
      }),
    ],
  })
}

function table(headerCells, rows, firstColAlign = AlignmentType.LEFT) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: headerCells.map((h, i) => cell(h, { header: true, align: i === 0 ? firstColAlign : AlignmentType.RIGHT })) }),
      ...rows.map(
        (r) => new TableRow({ children: r.map((v, i) => cell(v, { align: i === 0 ? firstColAlign : AlignmentType.RIGHT })) })
      ),
    ],
  })
}

/** Builds and downloads the AlphaHunter equity research memo as a .docx file. */
export async function generateMemo(data) {
  const summary = buildValuationSummary({
    rimInputs: data.rimInputs,
    comps: data.comps,
    analystViews: data.analystViews,
    currentPrice: data.currentPrice,
  })
  const compsTable = buildCompsTable(data.comps.peers, data.comps.targetMetrics)
  const horizon = horizonTableRows(summary.rim.result, data.currentPrice)
  const n = data.narrative || {}
  const fairLow = Math.min(...summary.sources.map((s) => s.price).filter((v) => v != null))
  const fairHigh = Math.max(...summary.sources.map((s) => s.price).filter((v) => v != null))

  const children = [
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'MEMORANDUM', bold: true, size: 32 })] }),
    new Paragraph({
      spacing: { before: 200 },
      children: [new TextRun({ text: `RE: ${data.companyName} (${data.ticker}) — Complete Stock Analysis`, bold: true, size: 22 })],
    }),
    body(`DATE: ${data.asOfDate}`),
    new Paragraph({
      spacing: { before: 100, after: 200 },
      children: [
        new TextRun({ text: 'RECOMMENDATION: ', bold: true, size: 24 }),
        new TextRun({ text: `${summary.verdict?.toUpperCase() ?? '—'}`, bold: true, size: 24, color: ACCENT }),
        new TextRun({ text: `  |  Fair Value Range: ${fmtPrice(fairLow)}–${fmtPrice(fairHigh)}  |  Current Price: ${fmtPrice(data.currentPrice)}`, size: 24 }),
      ],
    }),

    heading('1. Company Overview'),
    body(n.companyOverview || 'Not available.'),

    heading('2. Macro / Sector Environment'),
    body(n.macroEnvironment || 'Not available.'),

    heading('3. Financial Analysis'),
    subheading('Table 1: Key Financial Metrics'),
    table(
      ['Metric', ...data.financials.map((f) => f.year)],
      [
        ['Revenue', ...data.financials.map((f) => fmtMillions(f.revenue))],
        ['EBITDA', ...data.financials.map((f) => fmtMillions(f.ebitda))],
        ['EBIT', ...data.financials.map((f) => fmtMillions(f.ebit))],
        ['Net Income', ...data.financials.map((f) => fmtMillions(f.netIncome))],
        ['EPS (GAAP)', ...data.financials.map((f) => fmtPrice(f.epsGaap))],
        ['EPS (Non-GAAP)', ...data.financials.map((f) => fmtPrice(f.epsNonGaap))],
        ['CFO', ...data.financials.map((f) => fmtMillions(f.cfo))],
        ['Free Cash Flow', ...data.financials.map((f) => fmtMillions(f.fcf))],
        ['ROE %', ...data.financials.map((f) => fmtPct(f.roe))],
      ]
    ),

    heading('4. Comparable Company Valuation'),
    subheading(`Table 2: Peer Group Trading Multiples (as of ${data.asOfDate})`),
    table(
      ['Company', 'TEV/Rev', 'TEV/EBITDA', 'TEV/EBIT', 'P/EPS', 'P/TBV', 'NTM TEV/Rev', 'NTM Fwd P/E'],
      [
        ...data.comps.peers.map((p) => [
          `${p.name} (${p.ticker})`,
          fmtMultiple(p.tevRevenue),
          fmtMultiple(p.tevEbitda),
          fmtMultiple(p.tevEbit),
          fmtMultiple(p.pDilutedEps),
          fmtMultiple(p.pTangibleBv),
          fmtMultiple(p.ntmTevRevenue),
          fmtMultiple(p.ntmFwdPe),
        ]),
        [
          `${data.companyName} (${data.ticker})`,
          fmtMultiple(data.comps.targetMetrics.tevRevenue),
          fmtMultiple(data.comps.targetMetrics.tevEbitda),
          fmtMultiple(data.comps.targetMetrics.tevEbit),
          fmtMultiple(data.comps.targetMetrics.pDilutedEps),
          fmtMultiple(data.comps.targetMetrics.pTangibleBv),
          fmtMultiple(data.comps.targetMetrics.ntmTevRevenue),
          fmtMultiple(data.comps.targetMetrics.ntmFwdPe),
        ],
        ...['high', 'low', 'mean', 'median'].map((stat) => [
          stat[0].toUpperCase() + stat.slice(1),
          fmtMultiple(compsTable.summary.tevRevenue[stat]),
          fmtMultiple(compsTable.summary.tevEbitda[stat]),
          fmtMultiple(compsTable.summary.tevEbit[stat]),
          fmtMultiple(compsTable.summary.pDilutedEps[stat]),
          fmtMultiple(compsTable.summary.pTangibleBv[stat]),
          fmtMultiple(compsTable.summary.ntmTevRevenue[stat]),
          fmtMultiple(compsTable.summary.ntmFwdPe[stat]),
        ]),
      ]
    ),

    heading('5. Residual Income Model (RIM) Valuation'),
    body(
      `The RIM.512 model uses 5 years of explicit EPS growth followed by a 12-year total forecasting horizon, with the following key assumptions:`
    ),
    subheading('Table 3: RIM Model Parameters'),
    table(
      ['Parameter', 'Value'],
      [
        ['Ticker / As-of Date', `${data.ticker} / ${data.asOfDate}`],
        ['FY1 EPS (Normalized)', fmtPrice(data.rimInputs.fy1Eps)],
        ['FY2 EPS (Normalized)', fmtPrice(data.rimInputs.fy2Eps)],
        ['Long-Term EPS Growth Rate (Ltg)', fmtPct(data.rimInputs.ltg, { showSign: false })],
        ['Book Value per Share (last FYE)', fmtPrice(data.rimInputs.bvps)],
        ['Discount Rate (r)', fmtPct(data.rimInputs.r, { showSign: false })],
        ['Dividend Payout Ratio (k)', fmtPct(data.rimInputs.k, { showSign: false })],
        ['Target ROE (equilibrium)', fmtPct(summary.rim.solved.targetRoe, { showSign: false })],
        ['Next Fiscal Year End', String(data.rimInputs.nextFiscalYearEnd)],
        ['Current Fiscal Month', String(data.rimInputs.currentFiscalMonth)],
      ],
      AlignmentType.LEFT
    ),
    subheading('Table 4: RIM Implied Price by Forecasting Horizon'),
    table(
      ['Year', 'Cum P/B', 'Implied Price', 'Total P/B', `Upside vs. ${fmtPrice(data.currentPrice)}`],
      horizon.map((r) => [
        String(r.year),
        fmtMultiple(r.cumPB, { decimals: 3 }),
        fmtPrice(r.impliedPrice),
        fmtMultiple(r.totalPB, { decimals: 3 }),
        fmtPct(r.upside),
      ])
    ),

    heading('6. Valuation Synthesis & Target Price'),
    subheading('Table 5: Valuation Scenario Summary'),
    table(
      ['Scenario', 'Implied Price', 'Upside'],
      [
        ...summary.sources.map((s) => [s.label, fmtPrice(s.price), fmtPct(data.currentPrice && s.price ? s.price / data.currentPrice - 1 : null)]),
        ['Mean Fair Value', fmtPrice(summary.meanFairValue), fmtPct(summary.upside)],
        ['Fair Value Range', `${fmtPrice(fairLow)}–${fmtPrice(fairHigh)}`, '—'],
      ]
    ),

    heading('7. Key Risks'),
    ...(n.keyRisks?.length ? n.keyRisks.map(bullet) : [body('Not available.')]),

    heading('8. Near-Term Catalysts'),
    ...(n.nearTermCatalysts?.length ? n.nearTermCatalysts.map(bullet) : [body('Not available.')]),

    heading('9. Investment Thesis & Conclusion'),
    body(n.investmentThesis || 'Not available.'),
  ]

  const doc = new Document({
    sections: [{ properties: {}, children }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `AlphaHunter_${data.ticker}_${data.asOfDate}.docx`)
}
