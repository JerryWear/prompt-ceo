'use client'

import { useEffect } from 'react'

export default function JarvisError({ error, reset }) {
  useEffect(() => {
    console.error('[Jarvis Studio error]', error)
  }, [error])

  return (
    <div style={{
      background: '#020202', minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'system-ui, sans-serif', color: '#fff', padding: 24,
    }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, color: '#c84a4a88', textTransform: 'uppercase', marginBottom: 12 }}>
          ✦ Jarvis Studio
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Something went wrong</div>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 24, lineHeight: 1.7 }}>
          {error?.message || 'An unexpected error occurred loading Jarvis Studio.'}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{ padding: '10px 20px', borderRadius: 7, border: '1px solid #c8a84b', background: 'transparent', color: '#c8a84b', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
          >
            Try Again
          </button>
          <a
            href="/dashboard"
            style={{ padding: '10px 20px', borderRadius: 7, border: '1px solid #1a1a1a', background: 'transparent', color: '#666', cursor: 'pointer', fontSize: 12, textDecoration: 'none' }}
          >
            Back to Dashboard
          </a>
        </div>
        {error?.message && (
          <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 6, background: '#0a0a0a', border: '1px solid #1a1a1a', fontSize: 11, color: '#444', fontFamily: 'monospace', textAlign: 'left', wordBreak: 'break-all' }}>
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}
