import { muDemo } from './mu'
import { llyDemo } from './lly'
import { sndkDemo } from './sndk'
import { wdcDemo } from './wdc'
import { costDemo } from './cost'
import { lrcxDemo } from './lrcx'

export const DEMO_TICKERS = ['MU', 'LLY', 'SNDK', 'WDC', 'COST', 'LRCX']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
  SNDK: sndkDemo,
  WDC: wdcDemo,
  COST: costDemo,
  LRCX: lrcxDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
