'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export default function LoginPage() {
  const supabase = createSupabaseClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/prompt-v2',
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link.')
    }

    setLoading(false)
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: 12,
          width: 320,
          marginBottom: 12,
          display: 'block',
        }}
      />

      <button onClick={handleLogin} disabled={loading || !email}>
        {loading ? 'Sending...' : 'Send login link'}
      </button>
    </main>
  )
}