const KEYS = {
  fmpApiKey: 'alphahunter.fmpApiKey',
  anthropicApiKey: 'alphahunter.anthropicApiKey',
  model: 'alphahunter.model',
}

export const MODELS = [
  { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5 (fastest, cheapest)' },
  { id: 'claude-sonnet-5', label: 'Claude Sonnet 5 (balanced)' },
  { id: 'claude-opus-4-8', label: 'Claude Opus 4.8 (most capable)' },
]

export function getFmpApiKey() {
  return localStorage.getItem(KEYS.fmpApiKey) || ''
}

export function setFmpApiKey(value) {
  if (value) localStorage.setItem(KEYS.fmpApiKey, value)
  else localStorage.removeItem(KEYS.fmpApiKey)
}

export function getAnthropicApiKey() {
  return localStorage.getItem(KEYS.anthropicApiKey) || ''
}

export function setAnthropicApiKey(value) {
  if (value) localStorage.setItem(KEYS.anthropicApiKey, value)
  else localStorage.removeItem(KEYS.anthropicApiKey)
}

export function getModel() {
  return localStorage.getItem(KEYS.model) || MODELS[1].id
}

export function setModel(value) {
  localStorage.setItem(KEYS.model, value)
}

export function resetKeys() {
  localStorage.removeItem(KEYS.fmpApiKey)
  localStorage.removeItem(KEYS.anthropicApiKey)
}
