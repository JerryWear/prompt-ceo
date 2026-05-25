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

  const signInWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
  }

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <button type="button" onClick={signInWithFacebook} style={styles.socialButton('#1877F2')}>
            <FacebookIcon /> Continue with Facebook
          </button>
          <button type="button" onClick={signInWithGoogle} style={styles.socialButton('#fff')}>
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

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

  socialButton: (bg) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '11px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.15)',
    background: bg === '#fff' ? 'rgba(255,255,255,0.95)' : bg,
    color: bg === '#fff' ? '#111' : '#fff',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  }),
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}