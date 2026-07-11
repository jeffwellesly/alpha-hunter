import { mrvlDemo } from './mrvl'
import { nflxDemo } from './nflx'

export const DEMO_TICKERS = ['MRVL', 'NFLX']

export const DEMO_DATA = {
  MRVL: mrvlDemo,
  NFLX: nflxDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
