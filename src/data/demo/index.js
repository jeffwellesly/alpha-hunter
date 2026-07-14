import { muDemo } from './mu'
import { llyDemo } from './lly'

export const DEMO_TICKERS = ['MU', 'LLY']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
