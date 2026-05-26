'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  bg:      '#040404',
  surface: '#0a0a0a',
  border:  '#1c1c1c',
  gold:    '#c4a45a',
  blue:    '#6a9af0',
  primary: '#f0ede6',
  secondary: '#a09888',
  muted:   '#5a5650',
}

export default function AppGateway() {
  const router   = useRouter()
  const supabase = createClient()
  const [phase, setPhase] = useState('loading') // loading | selecting | saving

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/prompt-engine-v3/login'); return }

      try {
        const res  = await fetch('/api/user-preferences')
        const data = await res.json()
        if (data.preferred_mode === 'instant') { router.replace('/instant'); return }
        if (data.preferred_mode === 'studio')  { router.replace('/prompt-engine-v3'); return }
      } catch {}

      setPhase('selecting')
    }
    init()
  }, [])

  const select = async (mode) => {
    setPhase('saving')
    try {
      await fetch('/api/user-preferences', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ preferred_mode: mode }),
      })
    } catch {}
    router.replace(mode === 'instant' ? '/instant' : '/prompt-engine-v3')
  }

  if (phase !== 'selecting') {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 36, border: `2px solid ${C.gold}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <div style={{
      background: `radial-gradient(800px 400px at 50% 0%, rgba(196,164,90,0.08), transparent 60%), ${C.bg}`,
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 56, textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>
          PromptCEO
        </div>
        <div style={{ fontSize: 30, fontWeight: 300, color: C.primary, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 10 }}>
          Choose Your Creative Experience
        </div>
        <div style={{ fontSize: 13, color: C.muted }}>
          You can switch at any time from inside the app
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: 20, maxWidth: 780, width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
        <ModeCard
          badge="PromptCEO Instant™"
          headline="Fast. Guided. Cinematic."
          description="Four steps to a full campaign. PromptCEO automatically selects worlds, hooks, styles, and structure. You describe what you're building — the system builds the rest."
          features={['4-step guided wizard', 'Auto world + hook selection', 'Full campaign in 60 seconds', 'Zero learning curve']}
          cta="Start Instantly →"
          accent={C.gold}
          onSelect={() => select('instant')}
        />
        <ModeCard
          badge="PromptCEO Studio™"
          headline="Full control. No limits."
          description="The complete AI creative operating system. Story worlds, identity systems, campaign architecture, cinematic progression, and advanced generation — all under one roof."
          features={['Story worlds + identity systems', 'Advanced campaign architecture', 'Cinematic sequencing', 'Professional grade control']}
          cta="Enter Studio →"
          accent={C.blue}
          onSelect={() => select('studio')}
        />
      </div>
    </div>
  )
}

function ModeCard({ badge, headline, description, features, cta, accent, onSelect }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '1 1 320px', maxWidth: 370,
        padding: '32px 28px', borderRadius: 14,
        border: `1px solid ${hover ? accent + '55' : C.border}`,
        background: hover ? `${accent}06` : C.surface,
        cursor: 'pointer', transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, color: accent, textTransform: 'uppercase' }}>
        {badge}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.primary, lineHeight: 1.2 }}>
        {headline}
      </div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>
        {description}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: C.secondary }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent, flexShrink: 0 }} />
            {f}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 4, padding: '11px 0', borderRadius: 8, textAlign: 'center',
        border: `1px solid ${hover ? accent + '77' : accent + '33'}`,
        background: hover ? `${accent}14` : 'transparent',
        fontSize: 13, fontWeight: 700, color: accent,
        transition: 'all 0.2s ease',
      }}>
        {cta}
      </div>
    </div>
  )
}
