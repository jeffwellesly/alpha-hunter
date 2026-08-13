import { muDemo } from './mu'
import { llyDemo } from './lly'
import { sndkDemo } from './sndk'
import { wdcDemo } from './wdc'
import { costDemo } from './cost'
import { lrcxDemo } from './lrcx'
import { nvdaDemo } from './nvda'
import { amdDemo } from './amd'
import { msftDemo } from './msft'
import { vktxDemo } from './vktx'
import { ktosDemo } from './ktos'

export const DEMO_TICKERS = ['MU', 'LLY', 'SNDK', 'WDC', 'COST', 'LRCX', 'NVDA', 'AMD', 'MSFT', 'VKTX', 'KTOS']

export const DEMO_DATA = {
  MU: muDemo,
  LLY: llyDemo,
  SNDK: sndkDemo,
  WDC: wdcDemo,
  COST: costDemo,
  LRCX: lrcxDemo,
  NVDA: nvdaDemo,
  AMD: amdDemo,
  MSFT: msftDemo,
  VKTX: vktxDemo,
  KTOS: ktosDemo,
}

export function getDemoData(ticker) {
  return DEMO_DATA[ticker?.toUpperCase()] || null
}
