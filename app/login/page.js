'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      router.replace('/prompt-v2')
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace('/prompt-v2')
    router.refresh()
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>PROMPT CEO APP</div>

        <h1 style={styles.title}>Enter Your Workspace</h1>

        <p style={styles.subtitle}>
          This login gives you access to the Prompt CEO app.  
          Your credits are shared across Image and Video tools.
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
            {loading ? 'Entering...' : 'Enter App'}
          </button>
        </form>

        <div style={styles.note}>
          You may be asked to log in again because the website and app run on separate domains.
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(900px 500px at 50% 0%, rgba(56,189,248,0.15), transparent 55%), #050608',
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
    border: '1px solid rgba(255,255,255,0.1)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
  },

  badge: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#38bdf8',
    marginBottom: 12,
    fontWeight: 800,
  },

  title: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    lineHeight: 1.5,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  input: {
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
  },

  button: {
    marginTop: 8,
    padding: '12px',
    borderRadius: 12,
    border: 'none',
    fontWeight: 800,
    background:
      'linear-gradient(180deg, rgba(114,208,255,1), rgba(54,175,238,1))',
    color: '#001018',
    cursor: 'pointer',
  },

  error: {
    color: '#f87171',
    fontSize: 13,
  },

  note: {
    marginTop: 20,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
}