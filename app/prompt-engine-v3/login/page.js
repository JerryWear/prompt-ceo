'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace('/prompt-engine-v3')
      }
    }
    checkSession()
  }, [])

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [mode,     setMode]     = useState('login') // 'login' | 'signup'

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      // Send welcome email
      fetch('/api/welcome-email', { method: 'POST' }).catch(() => {})
      router.replace('/prompt-engine-v3')
      router.refresh()
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }

    router.replace('/prompt-engine-v3')
    router.refresh()
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>PROMPT CEO — DIRECTOR'S STUDIO</div>
        <h1 style={styles.title}>{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
        <p style={styles.subtitle}>
          {mode === 'login' ? 'Welcome back. Your studio is waiting.' : 'Start your 7-day free trial. No credit card required.'}
        </p>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['login', 'signup'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              type="button"
              style={{ flex: 1, padding: '10px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', background: mode === m ? '#c8a84b' : 'transparent', color: mode === m ? '#000' : '#8a8680', transition: 'all 0.15s' }}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? '…' : mode === 'login' ? 'Sign In' : 'Create Account — Free'}
          </button>
        </form>
        <div style={styles.note}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ color: '#c8a84b', cursor: 'pointer' }} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign up free →' : 'Sign in →'}
          </span>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(900px 500px at 50% 0%, rgba(200,168,75,0.12), transparent 55%), #040404',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 32,
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
  },
  badge: {
    fontSize: 10,
    letterSpacing: 2.5,
    color: '#c8a84b',
    marginBottom: 14,
    fontWeight: 800,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 24,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  },
  button: {
    marginTop: 8,
    padding: '13px',
    borderRadius: 12,
    border: 'none',
    fontWeight: 800,
    fontSize: 14,
    background: 'linear-gradient(180deg, #c8a84b, #a07830)',
    color: '#000',
    cursor: 'pointer',
    letterSpacing: 0.3,
  },
  error: {
    color: '#f87171',
    fontSize: 13,
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
  },
}