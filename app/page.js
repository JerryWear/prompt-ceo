'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase/client'

const C = {
  void:      '#040404',
  deep:      '#070707',
  base:      '#0a0a0a',
  surface:   '#111111',
  hairline:  '#1a1a1a',
  subtle:    '#222222',
  primary:   '#e8e4dc',
  secondary: '#8a8680',
  muted:     '#4a4845',
  gold:      '#c8a84b',
  goldDim:   '#7a6428',
  goldGlow:  '#c8a84b18',
  green:     '#4a9a6a',
  greenGlow: '#4a9a6a18',
  violet:    '#9b6fd4',
  violetGlow:'#9b6fd418',
  blue:      '#4a8ab4',
  blueGlow:  '#4a8ab418',
}

const WORLDS = [
  'Tokyo', 'Mykonos', 'Capri', 'Santorini', 'Marrakech',
  'Swiss Alps', 'New York', 'Dubai', 'Malibu', 'Paris',
  'Tulum', 'Monaco', 'Bali', 'Amalfi', 'Venice',
]

const AD_FEATURES = [
  { icon: '🎯', label: 'Ad Angles', desc: '10 psychological directions to sell any product' },
  { icon: '🪝', label: 'Hook Engine', desc: '50 hooks across 5 types — pain, desire, curiosity, luxury, offer' },
  { icon: '✍️', label: 'Captions', desc: '6 caption styles connected to your angle and hook' },
  { icon: '🖼', label: 'Image Ads', desc: 'Generate professional ad images directly inside the app' },
  { icon: '🎬', label: 'Video Ads', desc: 'TikTok, Meta, UGC, and cinematic ad prompts with storyboards' },
  { icon: '📣', label: 'UGC Scripts', desc: '4 creator script styles — natural, emotional, direct, testimonial' },
  { icon: '📅', label: '30-Day Calendar', desc: 'Full content plan with hooks, captions, and posting times' },
  { icon: '🚀', label: 'Launch Sequence', desc: '5-stage launch from teaser to final push' },
  { icon: '🏆', label: 'Campaign Score', desc: 'Score your campaign across 8 dimensions before you spend' },
  { icon: '🎵', label: 'Music Intelligence', desc: 'AI matches 400+ tracks to your campaign mood and goal' },
]

const STUDIO_FEATURES = [
  { icon: '🎬', label: '20+ Worlds', desc: 'Tokyo, Capri, Marrakech, Swiss Alps, New York + more' },
  { icon: '🎥', label: '11 Directors', desc: 'Kubrick, Fincher, Wong Kar-wai, Malick, Noé + more' },
  { icon: '🤖', label: 'Shot Director AI', desc: 'Fires after every scene — tells you exactly what to do next' },
  { icon: '⚓', label: 'Visual Anchor', desc: 'Set one image as consistency reference for the whole sequence' },
  { icon: '↺',  label: 'Layer Swap', desc: 'Change wardrobe, mood, lighting — one element at a time' },
  { icon: '⚡', label: 'Full Sequence', desc: '30-scene cinematic arc — establishing to aftermath — one button' },
  { icon: '📸', label: 'Photographer Brief', desc: 'Real-world shoot document with shot list, wardrobe, lighting' },
  { icon: '🌍', label: 'Custom Worlds', desc: 'Build your own location — name, atmosphere, lighting, mood' },
]

const PLANS = [
  { name: 'Creator', price: '$29', color: C.blue,   desc: 'Director\'s Studio, 20 images/month' },
  { name: 'Studio Pro', price: '$49', color: C.green, desc: 'Director\'s Studio, 150 images/month', popular: true },
  { name: 'Pro', price: '$79', color: C.gold,   desc: 'Full app — Ad Studio + Director\'s Studio' },
  { name: 'Agency', price: '$179', color: C.violet, desc: '300 images, client sharing, webhooks' },
]


export default function HomePage() {
  const router  = useRouter()
  const supabase = createClient()
  const [worldIndex, setWorldIndex] = useState(0)
  const [user,       setUser]       = useState(undefined) // undefined = loading, null = not logged in

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  useEffect(() => {
    const t = setInterval(() => setWorldIndex(i => (i + 1) % WORLDS.length), 1800)
    return () => clearInterval(t)
  }, [])

  // Store referral code from ?ref= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      localStorage.setItem('ref_code', ref)
      // Track the click
      fetch('/api/affiliate/track', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: ref, eventType: 'click' }),
      }).catch(() => {})
    }
  }, [])

  const goToApp   = () => router.push('/prompt-engine-v3')
  const goToLogin = () => router.push('/prompt-engine-v3/login')
  const goToPricing = () => router.push('/pricing')

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>
          PROMPT CEO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={goToPricing}                   style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Pricing</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Partner</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>About</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>My Account</button>
              <button onClick={goToApp} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Open App
              </button>
            </>
          ) : (
            <>
              <button onClick={goToLogin} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Sign In</button>
              <button onClick={goToLogin} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.gold}08 0%, transparent 70%)` }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>AI Creative Operating System</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px', color: C.primary }}>
            Every piece of content.<br />
            <span style={{ color: C.gold }}>One brain.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: C.secondary, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
            Ad campaigns, cinematic scenes, 400+ music tracks, client delivery — all connected. Enter your product or character once. Everything else builds from it.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={goToLogin}
              style={{ padding: '14px 32px', borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', letterSpacing: 0.3 }}
            >
              Start Free Trial
            </button>
            <button
              onClick={goToPricing}
              style={{ padding: '14px 32px', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}
            >
              See Pricing →
            </button>
          </div>

          {/* World ticker */}
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <span style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>Now in</span>
            <div style={{ padding: '4px 14px', borderRadius: 999, border: `1px solid ${C.hairline}`, background: C.surface, minWidth: 120, textAlign: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, transition: 'all 0.3s' }}>{WORLDS[worldIndex]}</span>
            </div>
            <span style={{ fontSize: 11, color: C.muted }}>and {WORLDS.length - 1} more worlds</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '28px 24px', display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 6vw, 80px)', flexWrap: 'wrap', background: C.deep }}>
        {[
          ['20+', 'Cinematic Worlds'],
          ['11',  'Director Styles'],
          ['400+','Music Tracks'],
          ['15',  'Ad Output Types'],
          ['1',   'Connected Brain'],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.gold, letterSpacing: -1 }}>{num}</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* AD STUDIO SECTION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.violet, marginBottom: 16 }}>Ad Studio</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Your competitor is running 3 ads.<br />
              <span style={{ color: C.violet }}>You're about to run 300.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 32 }}>
              Enter your product once. Every tab — angles, hooks, captions, images, video, UGC, campaign, music — builds from the same brain. Everything connected. Nothing repeated.
            </p>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violet}`, background: C.violetGlow, color: C.violet }}>
              Try Ad Studio Free →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {AD_FEATURES.map(f => (
              <div key={f.label} style={{ padding: '14px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.hairline}, transparent)`, margin: '0 24px' }} />

      {/* DIRECTOR'S STUDIO SECTION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {STUDIO_FEATURES.map(f => (
              <div key={f.label} style={{ padding: '14px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.green, marginBottom: 16 }}>Director's Studio</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Wake up in Tokyo.<br />
              Lunch in Capri.<br />
              <span style={{ color: C.green }}>All in one afternoon.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 32 }}>
              Upload your face once. Pick a world, a director's visual language, and a progression arc. Generate cinematic scenes — then export to Midjourney, Runway, or Kling. Or generate images directly inside the app.
            </p>

            {/* World pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
              {WORLDS.map(w => (
                <span key={w} style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${C.hairline}`, background: C.surface, fontSize: 11, color: C.secondary }}>
                  {w}
                </span>
              ))}
              <span style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${C.greenDim || '#1a3a2a'}`, background: C.greenGlow, fontSize: 11, color: C.green }}>
                + more added regularly
              </span>
            </div>

            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
              Try Director's Studio Free →
            </button>
          </div>
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Music Intelligence</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
            400+ original tracks.<br />
            <span style={{ color: C.gold }}>AI picks the right one every time.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
            Every track is scored against your product, platform, campaign goal, and brand voice. Lock a track and every generation — hooks, captions, video direction — adapts to it automatically.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 40 }}>
            {[
              ['🎵', 'AI Match Score', 'Mood, platform, goal, brand voice'],
              ['⏱', 'Timing Plan', 'BPM and drop mapped to your 30s ad'],
              ['🔒', 'Lock & Inject', 'Every generation adapts to the track'],
              ['📈', 'Stage Music', 'Cold awareness through winback'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ padding: '18px 16px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow, textAlign: 'left' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 20px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow, display: 'inline-block' }}>
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 700 }}>🎵 Music Add-on — $9/month</span>
            <span style={{ fontSize: 12, color: C.secondary, marginLeft: 12 }}>Unlimited access to all 400+ tracks</span>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Pricing</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
          Replaces $270+/month of separate tools.
        </h2>
        <p style={{ fontSize: 15, color: C.secondary, marginBottom: 48 }}>Starting at $29/month.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{ padding: '24px 20px', borderRadius: 10, border: `1px solid ${plan.popular ? plan.color : C.hairline}`, background: plan.popular ? `${plan.color}0a` : C.surface, position: 'relative' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: plan.color, color: '#000', fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                  Most Popular
                </div>
              )}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: plan.color, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.primary, letterSpacing: -1, marginBottom: 4 }}>{plan.price}</div>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 12 }}>/month</div>
              <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{plan.desc}</div>
            </div>
          ))}
        </div>

        <button onClick={goToPricing} style={{ padding: '14px 36px', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
          See Full Pricing →
        </button>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>Start Today</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05, margin: '0 0 20px' }}>
            This is not a prompt generator.<br />
            <span style={{ color: C.gold }}>This is your creative OS.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 40 }}>
            Ad campaigns, cinematic worlds, 400+ music tracks, client delivery. All connected. All in one place.
          </p>
          <button
            onClick={goToLogin}
            style={{ padding: '16px 44px', borderRadius: 6, fontSize: 16, fontWeight: 800, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', letterSpacing: 0.3 }}
          >
            Start Free Trial
          </button>
          <div style={{ marginTop: 16, fontSize: 12, color: C.muted }}>7-day free trial. Cancel anytime. No credit card required to start.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={goToPricing} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={goToApp}     style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>App</button>
          <button onClick={goToLogin}   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Sign In</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
