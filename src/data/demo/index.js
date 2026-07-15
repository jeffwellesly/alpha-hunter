import { muDemo } from './mu'
import { llyDemo } from './lly'
import { sndkDemo } from './sndk'

export const DEMO_TICKERS = ['MU', 'LLY', 'SNDK']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
  SNDK: sndkDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
