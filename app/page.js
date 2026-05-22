'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b12',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a12',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd412',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab412',
  tension:   '#b4944a',
}

// ── Feature categories — the full marketing OS ──────────────
const FEATURE_GROUPS = [
  {
    id:    'creative',
    icon:  '✦',
    label: 'Creative',
    color: C.gold,
    tagline: 'Ad creative at scale',
    features: ['Angles', 'Hooks (5 types)', 'Captions', 'Image Ads', 'Video Ads', 'UGC Scripts', 'Creator Brief'],
  },
  {
    id:    'campaign',
    icon:  '◈',
    label: 'Campaign',
    color: C.violet,
    tagline: 'Full-funnel sequences',
    features: ['Campaign Sequencer', 'Email Sequence', 'SMS + Push', 'Content Calendar', 'Launch Sequence'],
  },
  {
    id:    'funnel',
    icon:  '▽',
    label: 'Funnel',
    color: C.green,
    tagline: 'Convert cold to paid',
    features: ['Landing Page Copy', 'Offer Builder', 'Retargeting Packs', 'Testimonial Mining', 'Objection Crusher'],
  },
  {
    id:    'intel',
    icon:  '◎',
    label: 'Intelligence',
    color: C.blue,
    tagline: 'Data-driven creative',
    features: ['Trend Intelligence', 'Hook Pre-Score', 'Ad Account Audit', 'Competitor Deconstruct', 'A/B Tests'],
  },
  {
    id:    'production',
    icon:  '▶',
    label: 'Production',
    color: C.tension,
    tagline: 'Production-ready assets',
    features: ['Talking Head Script', 'Video Storyboard + AI Prompts', 'Product Descriptions', 'Influencer Brief', 'Music Intelligence'],
  },
  {
    id:    'studio',
    icon:  '◇',
    label: 'Director\'s Studio',
    color: C.gold,
    tagline: '20 worlds. 12-layer engine.',
    features: ['20+ Cinematic Worlds', '11 Director Styles', 'Story Worlds & Characters', 'Shot Director AI', 'Brand DNA Lock'],
  },
]

// ── What one brief generates ─────────────────────────────────
const OUTPUT_COUNT = [
  { n: '50+',  label: 'Hook variations',        color: C.gold   },
  { n: '30+',  label: 'Ad copy pieces',          color: C.violet },
  { n: '10+',  label: 'Campaign assets',         color: C.green  },
  { n: '1',    label: 'Brief — all connected',   color: C.blue   },
]

// ── Who it's for ─────────────────────────────────────────────
const AUDIENCES = [
  {
    icon:  '📱',
    label: 'Creators & Influencers',
    color: C.gold,
    desc:  'Generate your entire content calendar, ad campaigns, UGC scripts, and hook library in one afternoon. Stop switching between 10 tools.',
    proof: '30-day content calendar in 1 session',
  },
  {
    icon:  '🏢',
    label: 'Brands & DTC',
    color: C.violet,
    desc:  'Enter your product once. Get angles, hooks, landing page copy, email sequences, SMS campaigns, retargeting packs, and an offer structure — all connected to one brief.',
    proof: 'Full campaign stack from a single product brief',
  },
  {
    icon:  '⚡',
    label: 'Media Buyers',
    color: C.blue,
    desc:  'Score hooks before you spend, audit your ad account, generate retargeting creatives for every warm audience stage, and get a naming convention system that keeps your data clean.',
    proof: 'Pre-launch CTR prediction on every hook',
  },
  {
    icon:  '🎯',
    label: 'Agencies',
    color: C.green,
    desc:  'Manage multiple client brands in one workspace. Generate a full delivery package per client. Trend intelligence, influencer briefs, and product descriptions all in one tool.',
    proof: 'Client workspace with 1-click delivery export',
  },
]

// ── Tools this replaces ───────────────────────────────────────
const REPLACES = [
  { tool: 'Jasper / Copy.ai',     use: 'Ad copy & hooks',       price: '$49+/mo' },
  { tool: 'Foreplay',             use: 'Competitor research',   price: '$49+/mo' },
  { tool: 'Klaviyo templates',    use: 'Email sequences',       price: 'Manual'  },
  { tool: 'Canva + ChatGPT',      use: 'Briefs & scripts',      price: '$20+/mo' },
  { tool: 'Postscript / Attentive', use: 'SMS copy',            price: '$100+/mo'},
  { tool: 'TubeBuddy',            use: 'Product descriptions',  price: '$20+/mo' },
]

// ── Testimonials ──────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "I built my entire launch — landing page, email sequence, SMS, UGC brief, offer stack, and retargeting creatives — in one session. Nothing else I've used does this.",
    name:  'Alex R.',
    role:  'DTC Brand Founder',
    color: C.gold,
  },
  {
    quote: "The Hook Scorer alone is worth it. I stopped guessing and started knowing which hooks would convert before spending a dollar. My CTR went up 40% in 3 weeks.",
    name:  'Marcus T.',
    role:  'Media Buyer · $200k/month ad spend',
    color: C.blue,
  },
  {
    quote: "I manage 6 client brands. The client workspace and delivery package feature saves me 8 hours a week. And the cinematic studio content still makes my clients think I have a film crew.",
    name:  'Priya L.',
    role:  'Creative Agency · 6 Clients',
    color: C.violet,
  },
]

export default function HomePage() {
  const router    = useRouter()
  const supabase  = createClient()
  const [user,           setUser]           = useState(undefined)
  const [activeGroup,    setActiveGroup]    = useState('creative')
  const [activeAudience, setActiveAudience] = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveAudience(i => (i + 1) % AUDIENCES.length), 5000)
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

  const goToApp     = () => router.push('/prompt-engine-v3')
  const goToLogin   = () => router.push('/prompt-engine-v3/login')
  const goToPricing = () => router.push('/pricing')

  const currentGroup = FEATURE_GROUPS.find(g => g.id === activeGroup) || FEATURE_GROUPS[0]
  const currentAud   = AUDIENCES[activeAudience]

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>PROMPT CEO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={goToPricing}                          style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')}        style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}          style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 55% at 50% 20%, ${C.gold}09 0%, transparent 65%)` }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>Complete Marketing Operating System</span>
          </div>

          <h1 style={{ fontSize: 'clamp(38px, 7.5vw, 78px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, margin: '0 0 28px', color: C.primary }}>
            One brief.<br />
            <span style={{ color: C.gold }}>Your entire marketing stack.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: C.secondary, lineHeight: 1.8, maxWidth: 580, margin: '0 auto 20px' }}>
            Hooks. Captions. Landing pages. Email sequences. SMS campaigns. UGC briefs. Retargeting packs. Video storyboards. Offer structures. Ad audits. All from a single product brief. All connected.
          </p>

          <p style={{ fontSize: 14, color: C.muted, marginBottom: 44 }}>
            Plus the world's most advanced cinematic prompt engine — 20 worlds, 12-layer AI, 11 director styles.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={goToLogin} style={{ padding: '15px 36px', borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3 }}>
              Start Free — No Card Needed
            </button>
            <button onClick={goToPricing} style={{ padding: '15px 28px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
              See Pricing →
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: C.muted }}>✓ 7-day free trial</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ No credit card required</div>
            <div style={{ fontSize: 12, color: C.muted }}>✓ Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* ── OUTPUT NUMBERS ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '40px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {OUTPUT_COUNT.map((o, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px', borderRight: i < 3 ? `1px solid ${C.hairline}` : 'none' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: o.color, lineHeight: 1, letterSpacing: -1 }}>{o.n}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 6, lineHeight: 1.4 }}>{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE EXPLORER ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Everything You Need</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              6 systems. One platform.
            </h2>
            <p style={{ fontSize: 15, color: C.secondary, maxWidth: 480, margin: '0 auto' }}>
              Every tool talks to the same brief. Change your product name — everything updates. That's the OS difference.
            </p>
          </div>

          {/* Group selector */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {FEATURE_GROUPS.map(g => (
              <button key={g.id} onClick={() => setActiveGroup(g.id)}
                style={{ padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${activeGroup === g.id ? g.color : C.hairline}`,
                  background: activeGroup === g.id ? g.color + '15' : 'transparent',
                  color: activeGroup === g.id ? g.color : C.secondary,
                }}>
                <span style={{ marginRight: 6, fontSize: 10 }}>{g.icon}</span>{g.label}
              </button>
            ))}
          </div>

          {/* Active group detail */}
          <div style={{ borderRadius: 12, border: `1px solid ${currentGroup.color}33`, background: currentGroup.color + '06', padding: 'clamp(28px, 4vw, 48px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', transition: 'all 0.3s' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: currentGroup.color, marginBottom: 12 }}>{currentGroup.label}</div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 16px', color: C.primary }}>{currentGroup.tagline}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentGroup.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentGroup.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: C.secondary }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '16px 20px', borderRadius: 8, background: C.surface, border: `1px solid ${C.hairline}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: currentGroup.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>How it works</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>
                  {currentGroup.id === 'creative' && 'Enter your product once. Generate 10 psychological angles, 50+ hooks across 5 emotional types, 6 caption styles, image prompts, video prompts, and 4 UGC scripts — all from the same brief.'}
                  {currentGroup.id === 'campaign' && 'Map your product to a complete funnel. 7/14/30/60-day campaign arc, matching email sequence, SMS sequence, content calendar, and launch sequence — all timed and emotionally connected.'}
                  {currentGroup.id === 'funnel' && 'Convert the traffic your ads bring. Landing page with hero, benefits, testimonials, and FAQ. Offer builder with value stack and guarantee. Retargeting creatives for 6 warm audience stages.'}
                  {currentGroup.id === 'intel' && 'Know before you spend. Score any hook and get a CTR prediction. Get a real-time trend report. Paste your ad account data and get a creative action plan. Deconstruct any competitor ad visually.'}
                  {currentGroup.id === 'production' && 'Generate content that actually gets filmed. Teleprompter-ready talking head scripts. Scene-by-scene video storyboards with Runway/Kling prompts. Amazon + Shopify product descriptions. Influencer briefs ready to send.'}
                  {currentGroup.id === 'studio' && '20+ cinematic worlds — Tokyo, Capri, Marrakech, Swiss Alps and more. 12-layer prompt engine. 11 director styles from Kubrick to Wong Kar-wai. Story worlds with character persistence. Every prompt is a film scene.'}
                </div>
              </div>
              <button onClick={goToLogin} style={{ padding: '12px 0', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${currentGroup.color}`, background: currentGroup.color + '12', color: currentGroup.color }}>
                Try {currentGroup.label} Free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Built For</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              One tool. Every type of marketer.
            </h2>
          </div>

          {/* Audience tabs */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
            {AUDIENCES.map((a, i) => (
              <button key={i} onClick={() => setActiveAudience(i)}
                style={{ padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${activeAudience === i ? a.color : C.hairline}`,
                  background: activeAudience === i ? a.color + '15' : 'transparent',
                  color: activeAudience === i ? a.color : C.secondary, transition: 'all 0.15s',
                }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>

          <div style={{ borderRadius: 12, border: `1px solid ${currentAud.color}33`, background: currentAud.color + '06', padding: 'clamp(28px, 4vw, 44px)', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{currentAud.icon}</div>
            <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: C.primary, margin: '0 0 16px' }}>{currentAud.label}</h3>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, margin: '0 0 20px' }}>{currentAud.desc}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, border: `1px solid ${currentAud.color}44`, background: currentAud.color + '12' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentAud.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: currentAud.color }}>{currentAud.proof}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── REPLACES ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Replaces</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>
              6 tools. $300+/month.<br />
              <span style={{ color: C.gold }}>Now one.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
            {REPLACES.map((r, i) => (
              <div key={i} style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 2, textDecoration: 'line-through', textDecorationColor: C.muted }}>{r.tool}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{r.use}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#cf6a6a', flexShrink: 0 }}>{r.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontSize: 13, color: C.secondary }}>
              Prompt CEO starts at <span style={{ color: C.gold, fontWeight: 700 }}>$29/month</span> — and does all of this in one place.
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Results</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              They tried it once. They never left.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ padding: '28px 24px', borderRadius: 10, border: `1px solid ${t.color}33`, background: t.color + '06' }}>
                <div style={{ fontSize: 28, color: t.color, marginBottom: 14, lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>
                <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.8, margin: '0 0 20px', fontStyle: 'italic' }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STUDIO (secondary positioning) ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>The Director's Studio</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Your face.<br />
              <span style={{ color: C.gold }}>20 worlds.</span><br />
              One afternoon.
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              The original Prompt CEO magic is still here. 12-layer cinematic prompt engine. 20+ worlds from Tokyo to Capri to Marrakech. 11 director styles. Story worlds with full character persistence. Every prompt is a film scene — not an AI output.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['20+ cinematic worlds — location, sub-location, and phase pools', '11 director styles: Kubrick, Malick, Wong Kar-wai and more', 'Story worlds: Boudoir, Rockstar, Power CEO, After Dark', 'Shot Director AI — cinematographer brief per scene', 'Brand DNA Lock — visual consistency across every generation'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: C.gold, fontSize: 11, flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{ padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Try the Studio Free →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['Tokyo',      'Neon · Aman suites · Shinjuku',     C.violet],
              ['Capri',      'Villa terrace · Faraglioni · Sea',  C.gold],
              ['Marrakech',  'Riad · Hammam · La Mamounia',       C.tension],
              ['Swiss Alps', 'Chalet · Slopes · Alpenglow',       C.blue],
              ['Boudoir',    'Silk · Candlelight · Private',      C.violet],
              ['Rockstar',   'Stage · Tour hotel · 4am',          C.gold],
              ['Power CEO',  'Boardroom · Private jet · Glass',   C.blue],
              ['Mega Yacht', 'Mediterranean · Deck · Sunset',     C.green],
            ].map(([name, desc, color]) => (
              <div key={name} style={{ padding: '13px 15px', borderRadius: 8, border: `1px solid ${color}33`, background: color + '06' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Simple Pricing</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>Replaces $300+/month of separate tools.</h2>
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
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(30px, 5.5vw, 56px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px' }}>
            Stop switching between<br />10 different tools.<br />
            <span style={{ color: C.gold }}>Do it all here.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Hooks, landing pages, email sequences, SMS campaigns, retargeting packs, video storyboards, ad audits, influencer briefs, product descriptions — and the most advanced cinematic prompt engine ever built.
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
          <button onClick={goToPricing}                      style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')}    style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}      style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/tutorials')}  style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Tutorials</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
