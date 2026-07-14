import { useState } from 'react'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../../lib/auth'

export default function AuthPanel({ onClose, onAuthed }) {
  const [mode, setMode] = useState('signIn') // 'signIn' | 'signUp'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signUp') {
        await signUpWithEmail({ email, password, username: username.trim() })
      } else {
        await signInWithEmail({ email, password })
      }
      onAuthed?.()
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function google() {
    setError(null)
    try {
      await signInWithGoogle()
      // Redirect flow - onAuthStateChange in AppContext picks up the session
      // on return, no further action needed here.
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: 'fixed', inset: 0, background: 'rgba(3, 6, 14, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
      onClick={onClose}
    >
      <div className="card" style={{ width: 420, maxWidth: '100%' }} onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div className="card-title">{mode === 'signUp' ? 'Create account' : 'Sign in'}</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <form onSubmit={submit} className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'signUp' && (
            <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          )}
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          {error && <div style={{ fontSize: 12.5, color: 'var(--accent-red)' }}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Working…' : mode === 'signUp' ? 'Sign up' : 'Sign in'}
          </button>
          <button type="button" className="btn" onClick={google}>Continue with Google</button>
          <div style={{ fontSize: 12, textAlign: 'center', color: 'var(--text-tertiary)' }}>
            {mode === 'signUp' ? (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signIn') }}>Sign in</a></>
            ) : (
              <>Need an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signUp') }}>Sign up</a></>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
