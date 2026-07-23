import { muDemo } from './mu'
import { llyDemo } from './lly'
import { sndkDemo } from './sndk'
import { wdcDemo } from './wdc'
import { costDemo } from './cost'
import { lrcxDemo } from './lrcx'
import { nvdaDemo } from './nvda'
import { amdDemo } from './amd'

export const DEMO_TICKERS = ['MU', 'LLY', 'SNDK', 'WDC', 'COST', 'LRCX', 'NVDA', 'AMD']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
  SNDK: sndkDemo,
  WDC: wdcDemo,
  COST: costDemo,
  LRCX: lrcxDemo,
  NVDA: nvdaDemo,
  AMD: amdDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
