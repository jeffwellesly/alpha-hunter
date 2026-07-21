import { muDemo } from './mu'
import { llyDemo } from './lly'
import { sndkDemo } from './sndk'
import { wdcDemo } from './wdc'

export const DEMO_TICKERS = ['MU', 'LLY', 'SNDK', 'WDC']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
  SNDK: sndkDemo,
  WDC: wdcDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
