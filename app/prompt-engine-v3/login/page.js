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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace('/prompt-engine-v3')
    router.refresh()
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>PROMPT CEO — DIRECTOR'S STUDIO</div>
        <h1 style={styles.title}>Enter Your Studio</h1>
        <p style={styles.subtitle}>
          Your account gives you access to all Prompt CEO tools.<br />
          Credits are shared across Image and Video generation.
        </p>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Entering...' : 'Enter Studio'}
          </button>
        </form>
        <div style={styles.note}>
          Same account works across all Prompt CEO tools.
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