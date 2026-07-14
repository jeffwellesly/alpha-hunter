import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MODELS } from '../../lib/storage'

export default function SettingsModal({ onClose }) {
  const { anthropicApiKey, setAnthropicApiKey, model, setModel, resetKeys } = useApp()
  const [anthropicDraft, setAnthropicDraft] = useState(anthropicApiKey)

  function save() {
    setAnthropicApiKey(anthropicDraft.trim())
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 6, 14, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div className="card" style={{ width: 480, maxWidth: '100%' }} onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div>
            <div className="card-title">API Keys & Settings</div>
            <div className="card-subtitle">Stored only in your browser's localStorage. Never sent anywhere but Anthropic.</div>
          </div>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div
          style={{
            margin: '0 22px',
            marginTop: 18,
            padding: '10px 14px',
            fontSize: 11.5,
            lineHeight: 1.6,
            color: 'var(--text-tertiary)',
            background: 'var(--bg-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
          }}
        >
          AlphaHunter has no backend server and no database - your key is never sent to us or stored anywhere except this browser's
          localStorage, and every request goes directly from your browser to Anthropic. That also means: the key doesn't sync
          across devices, clearing browser data removes it, and anyone with access to this browser/device could read it from
          localStorage - don't use this on a shared/public computer. Use "Reset keys" below before walking away from one.
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>
              Anthropic API Key
            </div>
            <input
              className="input"
              type="password"
              value={anthropicDraft}
              onChange={(e) => setAnthropicDraft(e.target.value)}
              placeholder="sk-ant-..."
            />
            <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 6 }}>
              This is the only data source AlphaHunter uses - every number on every tab is researched live via Claude web search,
              which costs real API usage per analysis (multiple search-backed calls per ticker).
            </div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 6 }}>
              Claude Model
            </div>
            <select
              className="input"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginTop: 6 }}>
            <button
              className="btn"
              style={{ color: 'var(--accent-red)' }}
              onClick={() => {
                resetKeys()
                setAnthropicDraft('')
              }}
            >
              Reset keys
            </button>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
