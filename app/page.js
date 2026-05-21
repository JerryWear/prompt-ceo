'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab418',
}

const EXAMPLES = [
  {
    world:    'Capri',
    director: 'Malick',
    phase:    'Golden Hour',
    color:    C.gold,
    prompt:   'Villa terrace above the Tyrrhenian as it turns liquid gold. Lemon tree shadow across white linen. She holds a glass, not looking at the camera — just present in the most beautiful light in Italy. Warm backlight separating her from the sea below. The whole frame is warm, still, inevitable.',
  },
  {
    world:    'Tokyo',
    director: 'Fincher',
    phase:    'Neon Night',
    color:    C.violet,
    prompt:   'Shinjuku neon corridor at 11pm. She moves through the electric light with complete ownership — dark structured coat, measured stride, the city bending around her. Mixed pink and blue light on skin. Every frame controlled. The chaos outside the frame makes the stillness inside it magnetic.',
  },
  {
    world:    'Mykonos',
    director: 'Wong Kar-wai',
    phase:    'Afternoon',
    color:    C.blue,
    prompt:   'Nammos luxury daybed, peak Mediterranean heat. Saturated. Slow. She exists in the frame like she has nowhere else to be and no reason to prove it. Time-blurred edges. The Aegean behind her is almost too blue to be real. Everything feels like a memory already.',
  },
]

const WORLDS = [
  { name: 'Tokyo',       desc: 'Neon · Aman suites · Ginza · Golden Gai',    color: C.violet },
  { name: 'Capri',       desc: 'Villa terrace · Faraglioni · La Piazzetta',   color: C.gold   },
  { name: 'Mykonos',     desc: 'Nammos · Little Venice · Windmills',          color: C.blue   },
  { name: 'Marrakech',   desc: 'Riad · Hammam · Djemaa el-Fna · La Mamounia', color: C.gold   },
  { name: 'Swiss Alps',  desc: 'Chalet fireplace · Ski slopes · Alpenglow',   color: C.blue   },
  { name: 'New York',    desc: 'Tribeca loft · Central Park · Rooftop bars',  color: C.green  },
  { name: 'Santorini',   desc: 'Cave suites · Caldera · Oia sunset',          color: C.gold   },
  { name: 'Dubai',       desc: 'Desert · Downtown · Luxury towers',           color: C.violet },
  { name: 'Malibu',      desc: 'Pacific coast · Beach house · Golden cliffs', color: C.blue   },
  { name: 'Paris',       desc: 'Haussmann · Rooftops · Seine · Le Marais',    color: C.gold   },
  { name: 'Bali',        desc: 'Rice terraces · Temple pools · Jungle villas',color: C.green  },
  { name: 'Amalfi',      desc: 'Cliffside · Positano · Lemon groves',         color: C.gold   },
]

const TESTIMONIALS = [
  {
    quote: "I generated my entire October content calendar in one afternoon. 30 cinematic scenes for the Studio, full ad campaign for my skincare brand. I haven't opened another AI tool since.",
    name:  'Sofia M.',
    role:  'Creator · 280k Instagram',
    color: C.gold,
  },
  {
    quote: "The music matching is genuinely insane. It picked the exact track for my luxury campaign without me saying a word. My client thought I had a whole creative team behind me.",
    name:  'James K.',
    role:  'Brand Strategist · Agency',
    color: C.violet,
  },
  {
    quote: "As a model, the Director's Studio changed everything. Tokyo with Fincher? Capri with Malick? I can shoot anywhere in the world from my apartment. My content has never looked this good.",
    name:  'Aria V.',
    role:  'Model & Creator · 190k TikTok',
    color: C.blue,
  },
]

const STEPS = [
  { n: '01', title: 'Upload your face or your product', desc: 'One photo. One brief. The app learns everything it needs about you or your brand.' },
  { n: '02', title: 'Pick a world, director, and mood', desc: '20+ locations. 11 cinematic directors. Every combination generates something you haven\'t seen before.' },
  { n: '03', title: 'Generate everything at once', desc: 'Scenes, hooks, captions, images, campaign, music — all connected to the same brain. In minutes.' },
]

export default function HomePage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,         setUser]         = useState(undefined)
  const [activeExample, setActiveExample] = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveExample(i => (i + 1) % EXAMPLES.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      localStorage.setItem('ref_code', ref)
      fetch('/api/affiliate/track', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: ref, eventType: 'click' }),
      }).catch(() => {})
    }
  }, [])

  const goToApp    = () => router.push('/prompt-engine-v3')
  const goToLogin  = () => router.push('/prompt-engine-v3/login')
  const goToPricing = () => router.push('/pricing')

  const ex = EXAMPLES[activeExample]

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={goToPricing}                        style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')}      style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}        style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>My Account</button>
              <button onClick={goToApp} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Open App</button>
            </>
          ) : (
            <>
              <button onClick={goToLogin} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Sign In</button>
              <button onClick={goToLogin} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Start Free Trial</button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 90% 60% at 50% 20%, ${C.gold}0a 0%, transparent 65%)` }} />

        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 28 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>AI Creative Operating System</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, margin: '0 0 28px', color: C.primary }}>
            Your face.<br />
            <span style={{ color: C.gold }}>20 worlds.</span><br />
            One afternoon.
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: C.secondary, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 44px' }}>
            Upload your photo. Pick Tokyo, Capri, or Marrakech. Choose a director. Generate cinematic scenes, ad campaigns, and music — all connected, all in minutes.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={goToLogin} style={{ padding: '15px 36px', borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3 }}>
              Start Free — No Card Needed
            </button>
            <button onClick={goToPricing} style={{ padding: '15px 28px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
              See Pricing →
            </button>
          </div>

          {/* Social proof micro */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: C.muted }}>✓ 7-day free trial</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ No credit card required</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* ── LIVE EXAMPLE OUTPUT ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>This is what it creates</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              Real prompts. Generated in seconds.
            </h2>
          </div>

          {/* Example card */}
          <div style={{ borderRadius: 12, border: `1px solid ${ex.color}44`, background: ex.color + '06', overflow: 'hidden', transition: 'all 0.4s' }}>
            <div style={{ padding: '16px 24px', borderBottom: `1px solid ${ex.color}22`, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ex.color }}>🌍 {ex.world}</span>
              <span style={{ fontSize: 11, color: C.muted }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>🎬 Director: {ex.director}</span>
              <span style={{ fontSize: 11, color: C.muted }}>·</span>
              <span style={{ fontSize: 11, color: C.secondary }}>⏱ {ex.phase}</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: C.muted }}>Generated in ~3 seconds</span>
            </div>
            <div style={{ padding: '28px 24px' }}>
              <p style={{ fontSize: 15, color: C.primary, lineHeight: 1.9, margin: 0, fontStyle: 'italic' }}>
                "{ex.prompt}"
              </p>
            </div>
          </div>

          {/* Example selector */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            {EXAMPLES.map((e, i) => (
              <button
                key={i}
                onClick={() => setActiveExample(i)}
                style={{ padding: '6px 16px', borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${activeExample === i ? e.color : C.hairline}`, background: activeExample === i ? e.color + '22' : 'transparent', color: activeExample === i ? e.color : C.muted, transition: 'all 0.2s' }}
              >
                {e.world} · {e.director}
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Generate yours free →
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>How It Works</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Three steps. Done.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ padding: '28px 24px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, position: 'relative' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: C.goldDim, letterSpacing: -2, marginBottom: 16, fontFamily: 'monospace' }}>{step.n}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 10 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORLDS GRID ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>20+ Cinematic Worlds</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              Travel anywhere. Shoot everything.
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, maxWidth: 480, margin: '0 auto' }}>
              Every world has phases — wake, morning, golden hour, night. Every phase has locations, lighting, camera angles, and mood. You just pick the world.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {WORLDS.map(w => (
              <div key={w.name} style={{ padding: '16px 18px', borderRadius: 8, border: `1px solid ${w.color}33`, background: w.color + '06', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = w.color + '88'}
                onMouseLeave={e => e.currentTarget.style.borderColor = w.color + '33'}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: w.color, marginBottom: 5 }}>{w.name}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{w.desc}</div>
              </div>
            ))}
            <div style={{ padding: '16px 18px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, color: C.muted, textAlign: 'center', lineHeight: 1.5 }}>+ Desert Queen, Wild Nature, Neon City, Supermodel Life & more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What Creators Say</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
            They tried it once. They never left.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ padding: '24px', borderRadius: 10, border: `1px solid ${t.color}33`, background: t.color + '06' }}>
              <div style={{ fontSize: 24, color: t.color, marginBottom: 12, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.8, margin: '0 0 20px', fontStyle: 'italic' }}>{t.quote}</p>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{t.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOR BRANDS ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.violet, marginBottom: 16 }}>For Brands & Agencies</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Your competitor is running 3 ads.<br />
              <span style={{ color: C.violet }}>You're about to run 300.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 28 }}>
              Enter your product once. Generate angles, hooks, captions, images, video scripts, UGC, 10-stage campaigns, content calendars, and launch sequences — all from the same brief. All connected.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                '15 output types — all connected to one product brief',
                'Brand Voice Fingerprint — your exact tone, not a category',
                'Client sharing — they approve, they never touch the app',
                'Music Intelligence — 400+ tracks matched to your campaign',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: C.violet, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violet}`, background: C.violetGlow, color: C.violet }}>
              Try Ad Studio Free →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['🎯', 'Angles', '10 psychological directions'],
              ['🪝', 'Hooks', '50 hooks, 5 types'],
              ['✍️', 'Captions', '6 caption styles'],
              ['🖼', 'Image Ads', 'Generate directly in app'],
              ['🎬', 'Video Ads', 'With shot-by-shot storyboard'],
              ['📣', 'UGC Scripts', '4 creator styles'],
              ['📅', 'Calendar', '30-day content plan'],
              ['🏆', 'Campaign Score', '8-dimension rating'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MUSIC ── */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Music Intelligence</div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 16px' }}>
          400+ original tracks.<br />
          <span style={{ color: C.gold }}>The AI picks the right one every time.</span>
        </h2>
        <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 32px' }}>
          Every track scored against your campaign mood, platform, and brand voice. Lock it and every hook, caption, and video direction adapts to the music automatically.
        </p>
        <div style={{ display: 'inline-flex', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>🎵 Music Add-on</span>
          <span style={{ fontSize: 13, color: C.secondary }}>—</span>
          <span style={{ fontSize: 13, color: C.secondary }}>Unlimited access to all 400+ tracks for $9/month</span>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Simple Pricing</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>Replaces $270+/month of separate tools.</h2>
          <p style={{ fontSize: 14, color: C.secondary, marginBottom: 36 }}>Starting at $29/month. 7-day free trial on all plans.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { name: 'Creator',    price: '$29', color: C.blue   },
              { name: 'Studio Pro', price: '$49', color: C.green, popular: true },
              { name: 'Pro',        price: '$79', color: C.gold   },
              { name: 'Agency',     price: '$179', color: C.violet },
            ].map(p => (
              <div key={p.name} style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${p.popular ? p.color : C.hairline}`, background: p.popular ? p.color + '10' : C.surface, minWidth: 120, textAlign: 'center', position: 'relative' }}>
                {p.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: p.color, color: '#000', fontSize: 8, fontWeight: 800, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: 1 }}>POPULAR</div>}
                <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.primary, letterSpacing: -1 }}>{p.price}</div>
                <div style={{ fontSize: 10, color: C.muted }}>/month</div>
              </div>
            ))}
          </div>
          <button onClick={goToPricing} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            See Full Pricing →
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${C.gold}07 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px' }}>
            This is not a prompt generator.<br />
            <span style={{ color: C.gold }}>This is your creative OS.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 40 }}>
            Join creators and brands who stopped switching between 10 tools and started doing everything in one place.
          </p>
          <button onClick={goToLogin} style={{ padding: '16px 48px', borderRadius: 6, fontSize: 16, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3, marginBottom: 16 }}>
            Start Free — No Card Needed
          </button>
          <div style={{ fontSize: 12, color: C.muted }}>7-day free trial · Cancel anytime · No credit card required</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={goToPricing}                   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/tutorials')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Tutorials</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
