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

const CORE_SYSTEMS = [
  {
    id: 'director',
    name: 'AI Director™',
    tagline: 'Tell it what you want. It figures out the rest.',
    detail: 'Natural language creative command. Type your intent — "30-day luxury campaign for TikTok in Monaco" — and the Director routes to the right engine, collects what it needs, and builds.',
    color: C.gold,
    icon: '✦',
  },
  {
    id: 'campaign',
    name: 'Campaign Builder™',
    tagline: '30 days. 5 phases. Built in minutes.',
    detail: 'Attention → Story → Desire → Conversion → Retargeting. Full 30-day posting schedule with hooks, scripts, image prompts, and platform-specific versions. One product brief in.',
    color: C.violet,
    icon: '◈',
  },
  {
    id: 'life',
    name: 'Life Engine™',
    tagline: 'One day. Every format. 6 modes.',
    detail: 'Perfect Day (12 cinematic moments, morning to midnight), Creator Day, Travel Day, Fitness Day, Product Day, Campaign Day. Every moment: hook, caption, image prompt, video direction.',
    color: C.tension,
    icon: '☀',
  },
  {
    id: 'adstudio',
    name: 'Ad Studio™',
    tagline: 'Angles, hooks, captions, images, video. All connected.',
    detail: 'Hooks across 5 emotional types, CTR-scored. UGC scripts, captions, video storyboards. Image generation in 4 style modes. Full campaign in one session.',
    color: '#c87a4a',
    icon: '▣',
  },
  {
    id: 'studio',
    name: 'Studio™',
    tagline: '30 cinematic worlds. Character DNA. Shot Director AI.',
    detail: '30+ worlds: Monaco, Maldives, Bali, Tokyo, Capri and more. Shot Director AI generates a cinematographer brief per scene. Character DNA injects identity into every prompt.',
    color: C.blue,
    icon: '◧',
  },
  {
    id: 'distribution',
    name: 'Distribution™',
    tagline: 'One campaign → Every platform.',
    detail: 'Cross-platform adaptation. One campaign becomes Instagram Stories, TikTok videos, Meta Ads, and YouTube versions — automatically, with platform-specific formatting.',
    color: C.green,
    icon: '◎',
  },
]

const BRAIN_PILLARS = [
  {
    name: 'Campaign Brain™',
    desc: 'Tracks every phase you run. Learns which hook types perform, which worlds resonate, which campaign structures convert. Surfaces patterns as recommendations.',
    color: C.gold,
    icon: '◈',
  },
  {
    name: 'Brain Memory™',
    desc: 'Remembers your best worlds, strongest platforms, top-performing angles. Visible on your Home screen. The system knows your creative history so you never start from zero.',
    color: C.violet,
    icon: '◎',
  },
  {
    name: 'Brain Recommendation™',
    desc: 'Tells you exactly what to build next and why. "Your last 3 Desire phase posts outperformed. Build another before moving to Conversion." Not guesswork — pattern recognition.',
    color: C.green,
    icon: '✦',
  },
]

const PRICING_TIERS = [
  { name: 'Creator',    price: '$29',  color: C.blue,   period: '/mo' },
  { name: 'Studio Pro', price: '$49',  color: C.green,  period: '/mo', popular: true },
  { name: 'Pro',        price: '$79',  color: C.gold,   period: '/mo' },
  { name: 'Agency',     price: '$179', color: C.violet, period: '/mo' },
]

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Tell the Director what you\'re building.',
    body: 'Type your intent in plain language. Campaign type, platform, world, product. The AI Director asks what it needs, then routes to the right engine.',
    color: C.gold,
  },
  {
    n: '02',
    title: 'Generate across any system.',
    body: 'Campaign Builder. Life Engine. Ad Studio. Studio. Every system pulls from the same brief, the same Character DNA, the same brand context.',
    color: C.violet,
  },
  {
    n: '03',
    title: 'Brain learns from every output.',
    body: 'Campaign Brain tracks what worked. Which hooks, which worlds, which phases. Memory builds with every session — silently, automatically.',
    color: C.blue,
  },
  {
    n: '04',
    title: 'Recommendations improve every session.',
    body: 'The Brain surfaces what to build next. Each cycle gets tighter. After 5 sessions, PromptCEO knows your creative signature better than you do.',
    color: C.green,
  },
]

export default function HomePage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user || null)
      // Don't auto-redirect — let logged-in users see the website too
    })
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

  const goToLogin   = () => router.push(isLoggedIn ? '/prompt-engine-v3' : '/prompt-engine-v3/login')
  const goToPricing = () => router.push('/pricing')
  const goToApp     = () => router.push('/prompt-engine-v3')

  const [activeSystem, setActiveSystem] = useState('director')
  const currentSystem = CORE_SYSTEMS.find(s => s.id === activeSystem) || CORE_SYSTEMS[0]

  // Always render — never blank. Logged-in users see the website with "Go to App" CTA.
  const isLoggedIn = user !== null && user !== undefined

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: `1px solid ${C.hairline}`,
        background: `${C.void}ee`, backdropFilter: 'blur(12px)',
        padding: '0 32px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>
          PROMPT CEO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>
            Features
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>
            How It Works
          </button>
          <button onClick={goToPricing} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>
            Pricing
          </button>
          <button onClick={goToLogin} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>
            Sign In
          </button>
          <button
            onClick={goToLogin}
            style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            {isLoggedIn ? 'Go to App →' : 'Start Free Trial'}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', position: 'relative', textAlign: 'center',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
          backgroundSize: '60px 60px', opacity: 0.18,
        }} />
        {/* Gold glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 75% 50% at 50% 15%, ${C.gold}0d 0%, transparent 65%)`,
        }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }} className="fade-up">
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px', borderRadius: 999,
            border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 36,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>
              AI Creative Operating System
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 7.5vw, 80px)', fontWeight: 800,
            lineHeight: 1.0, letterSpacing: -3, margin: '0 0 28px', color: C.primary,
          }}>
            The AI Creative<br />
            <span style={{ color: C.gold }}>Operating System.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 19px)', color: C.secondary,
            lineHeight: 1.75, maxWidth: 600, margin: '0 auto 40px', fontWeight: 400,
          }}>
            PromptCEO doesn't generate content — it runs campaigns. One platform that learns, recommends, and creates across every format.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <button
              onClick={goToLogin}
              style={{
                padding: '15px 40px', borderRadius: 6, fontSize: 15, fontWeight: 800,
                cursor: 'pointer', border: 'none', background: C.gold, color: '#000', letterSpacing: 0.3,
              }}>
              {isLoggedIn ? 'Go to App →' : 'Start Free Trial'} →
            </button>
            <button
              onClick={goToPricing}
              style={{
                padding: '15px 28px', borderRadius: 6, fontSize: 15, fontWeight: 600,
                cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary,
              }}>
              See Pricing
            </button>
          </div>

          {/* Trial note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: C.muted }}>✓ 7-day free trial</span>
            <span style={{ fontSize: 12, color: C.muted }}>✓ No credit card required</span>
            <span style={{ fontSize: 12, color: C.muted }}>✓ Cancel anytime</span>
          </div>

          {/* Trust stats */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 0, maxWidth: 520, margin: '0 auto',
            borderRadius: 10, border: `1px solid ${C.hairline}`,
            background: C.surface, overflow: 'hidden',
          }}>
            {[
              { n: '30+',    label: 'Cinematic worlds',    color: C.gold   },
              { n: '5-phase', label: 'Campaign structure',  color: C.violet },
              { n: 'Brain',  label: 'That learns from you', color: C.green  },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: '16px 8px', textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${C.hairline}` : 'none',
              }}>
                <div style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', fontWeight: 800, color: s.color, letterSpacing: -0.5, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 5, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{
        background: C.deep,
        borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`,
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
            The Problem
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 46px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 28px', lineHeight: 1.1 }}>
            Most creators are running<br />
            <span style={{ color: C.gold }}>6 tools, none connected.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            {[
              'Separate tools for hooks.',
              'Separate tools for captions.',
              'Separate tools for images.',
              'No memory. No progression. No system.',
            ].map((line, i) => (
              <div key={i} style={{
                padding: '12px 20px', borderRadius: 7,
                background: C.surface, border: `1px solid ${C.hairline}`,
                fontSize: 14, color: i === 3 ? C.secondary : C.muted,
                fontWeight: i === 3 ? 600 : 400,
                textDecoration: i < 3 ? 'line-through' : 'none',
                textDecorationColor: C.muted,
              }}>
                {line}
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px 32px', borderRadius: 10,
            border: `1px solid ${C.gold}33`, background: C.goldGlow,
            display: 'inline-block',
          }}>
            <span style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700, color: C.gold }}>
              PromptCEO is one system.
            </span>
          </div>
        </div>
      </section>

      {/* ── THE BRAIN ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
              The Moat
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 46px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>
              PromptCEO gets smarter<br />
              <span style={{ color: C.gold }}>every time you generate.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: C.secondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              Other tools forget everything the moment you close the tab. PromptCEO builds a creative intelligence layer that grows with every session.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {BRAIN_PILLARS.map((p, i) => (
              <div key={i} style={{
                padding: '32px 28px', borderRadius: 12,
                border: `1px solid ${p.color}33`, background: p.color + '07',
              }}>
                <div style={{ fontSize: 24, color: p.color, marginBottom: 16, lineHeight: 1 }}>{p.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: C.primary, margin: '0 0 12px', letterSpacing: -0.3 }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE SYSTEMS ── */}
      <section id="features" style={{
        background: C.deep,
        borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`,
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
              Core Systems
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 46px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>
              Six systems.<br />
              <span style={{ color: C.gold }}>One brief.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: C.secondary, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Every system shares the same brief, the same character, the same brain. Change one thing — everything updates.
            </p>
          </div>

          {/* System selector tabs */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {CORE_SYSTEMS.map(s => (
              <button key={s.id} onClick={() => setActiveSystem(s.id)} style={{
                padding: '8px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${activeSystem === s.id ? s.color : C.hairline}`,
                background: activeSystem === s.id ? s.color + '18' : 'transparent',
                color: activeSystem === s.id ? s.color : C.muted,
              }}>
                <span style={{ marginRight: 6 }}>{s.icon}</span>{s.name}
              </button>
            ))}
          </div>

          {/* Active system panel */}
          <div style={{
            borderRadius: 14, border: `1px solid ${currentSystem.color}44`,
            background: currentSystem.color + '07',
            padding: 'clamp(32px, 5vw, 56px)',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: currentSystem.color, marginBottom: 14 }}>
                {currentSystem.name}
              </div>
              <h3 style={{ fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.15, margin: '0 0 20px', color: C.primary }}>
                {currentSystem.tagline}
              </h3>
              <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, margin: '0 0 32px' }}>
                {currentSystem.detail}
              </p>
              <button onClick={goToLogin} style={{
                padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700,
                cursor: 'pointer', border: `1px solid ${currentSystem.color}`,
                background: currentSystem.color + '18', color: currentSystem.color,
              }}>
                Try {currentSystem.name} Free →
              </button>
            </div>

            {/* System visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {currentSystem.id === 'director' && [
                { line: '"Create a 30-day luxury hoodie campaign for TikTok in Monaco."', role: 'You', color: C.primary },
                { line: 'Understood. Routing to Campaign Builder — Monaco world, 5 phases, TikTok format. Building schedule…', role: 'Director', color: C.gold },
                { line: 'Day 1 ready. Attention phase. Hook generated. Image prompt attached.', role: 'Director', color: C.gold },
              ].map((msg, i) => (
                <div key={i} style={{
                  padding: '12px 16px', borderRadius: 8, background: C.surface,
                  border: `1px solid ${i === 0 ? C.hairline : C.gold + '33'}`,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? C.muted : C.gold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{msg.role}</div>
                  <div style={{ fontSize: 13, color: msg.color, lineHeight: 1.6, fontStyle: i > 0 ? 'italic' : 'normal' }}>{msg.line}</div>
                </div>
              ))}

              {currentSystem.id === 'campaign' && [
                { phase: 'Attention',    day: 'Days 1–6',   color: C.gold },
                { phase: 'Story',        day: 'Days 7–12',  color: C.tension },
                { phase: 'Desire',       day: 'Days 13–18', color: C.violet },
                { phase: 'Conversion',   day: 'Days 19–24', color: C.blue },
                { phase: 'Retargeting',  day: 'Days 25–30', color: C.green },
              ].map((ph, i) => (
                <div key={i} style={{
                  padding: '10px 16px', borderRadius: 7,
                  border: `1px solid ${ph.color}33`, background: ph.color + '07',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: ph.color }}>{ph.phase}</span>
                  <span style={{ fontSize: 10, color: C.muted }}>{ph.day}</span>
                </div>
              ))}

              {currentSystem.id === 'life' && [
                { time: '06:30', label: 'Wake · Maldives villa · Soft linen',   color: C.gold },
                { time: '08:00', label: 'Ritual · Espresso · Harbour view',     color: C.tension },
                { time: '12:00', label: 'Peak · Work session · Glass office',   color: C.violet },
                { time: '18:30', label: 'Golden hour · Rooftop · City below',  color: C.gold },
                { time: '23:00', label: 'Wind down · Silk · Candlelight',       color: C.blue },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: '10px 14px', borderRadius: 7, background: C.surface,
                  border: `1px solid ${C.hairline}`, display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: m.color, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{m.time}</span>
                  <span style={{ fontSize: 12, color: C.secondary }}>{m.label}</span>
                </div>
              ))}

              {currentSystem.id === 'adstudio' && [
                { type: 'Hook',     text: '"I\'ve tried every brand. Nothing worked until this."', score: '4.8% CTR', color: C.gold },
                { type: 'Caption',  text: 'The morning that changed how I work (saved 4 hours).', score: 'Desire type', color: C.violet },
                { type: 'Script',   text: 'UGC · 15s · Hook → Problem → Reveal → CTA', score: 'TikTok ready', color: C.blue },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '12px 16px', borderRadius: 8, background: C.surface,
                  border: `1px solid ${item.color}33`,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: item.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{item.type}</div>
                  <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.6, marginBottom: 6, fontStyle: 'italic' }}>{item.text}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: item.color, background: item.color + '18', padding: '2px 8px', borderRadius: 999, display: 'inline-block' }}>{item.score}</div>
                </div>
              ))}

              {currentSystem.id === 'studio' && [
                ['Monaco',     'Casino · Harbour · Grand Hôtel', C.gold  ],
                ['Maldives',   'Overwater villa · Lagoon · Reef', C.blue  ],
                ['Bali',       'Rice terrace · Ubud · Temple',   C.green ],
                ['Tokyo',      'Aman · Shinjuku · Neon night',   C.violet],
                ['Capri',      'Villa terrace · Faraglioni',     C.tension],
                ['New York',   'Penthouse · Park view · Dawn',   C.muted  ],
              ].map(([name, desc, color]) => (
                <div key={name} style={{
                  padding: '10px 14px', borderRadius: 7,
                  border: `1px solid ${color}33`, background: color + '06',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{name}</span>
                  <span style={{ fontSize: 10, color: C.muted }}>{desc}</span>
                </div>
              ))}

              {currentSystem.id === 'distribution' && [
                { platform: 'Instagram',   format: 'Reels · Stories · Feed', color: C.violet },
                { platform: 'TikTok',      format: 'Vertical · 15s / 60s',  color: '#c87a4a' },
                { platform: 'Meta Ads',    format: 'Static · Carousel',      color: C.blue   },
                { platform: 'YouTube',     format: 'Shorts · Pre-roll',      color: C.gold   },
              ].map((p, i) => (
                <div key={i} style={{
                  padding: '12px 16px', borderRadius: 7, background: C.surface,
                  border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.platform}</span>
                  <span style={{ fontSize: 10, color: C.muted }}>{p.format}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHARACTER DNA ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
              Character DNA™
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, margin: '0 0 20px' }}>
              Your character,<br />
              <span style={{ color: C.gold }}>in every scene.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 16 }}>
              Build your character once. Name, age, ethnicity, body, hair. Every Perfect Day scene, every campaign post, every image prompt describes them specifically.
            </p>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.8, marginBottom: 28 }}>
              The AI knows who it's creating for. You never re-enter a description again.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              {[
                'Character flows into every image prompt automatically',
                'Consistent across all 30 campaign posts',
                'Works across all 30+ cinematic worlds',
                'Never break immersion — Sofia is always Sofia',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: C.gold, fontSize: 11, flexShrink: 0, marginTop: 3 }}>✦</span>
                  <span style={{ fontSize: 13, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={goToLogin} style={{
              padding: '12px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold,
            }}>
              Build Your Character →
            </button>
          </div>

          {/* DNA card visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Character card */}
            <div style={{
              padding: '24px', borderRadius: 12,
              border: `1px solid ${C.gold}44`, background: C.goldGlow,
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
                Character DNA · Loaded
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Name',      value: 'Sofia' },
                  { label: 'Age',       value: '29' },
                  { label: 'Ethnicity', value: 'Nordic' },
                  { label: 'Build',     value: 'Athletic' },
                  { label: 'Hair',      value: 'Blonde, wavy' },
                  { label: 'Eyes',      value: 'Ice blue' },
                ].map((f, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderRadius: 6, background: C.surface + 'cc' }}>
                    <div style={{ fontSize: 9, color: C.muted, marginBottom: 2, letterSpacing: 0.5, textTransform: 'uppercase' }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Injected prompt preview */}
            <div style={{
              padding: '18px 20px', borderRadius: 10,
              border: `1px solid ${C.hairline}`, background: C.surface,
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                Applied to: Perfect Day · Scene 03 · Maldives
              </div>
              <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                "Nordic woman, 29, athletic build, blonde wavy hair, ice blue eyes. Overwater villa. Morning light through linen curtains. Turquoise lagoon below. Slow movement. White robe. Privileged calm."
              </p>
            </div>

            {/* Applied count */}
            <div style={{
              display: 'flex', gap: 8,
            }}>
              {[
                { n: '12', label: 'Perfect Day scenes', color: C.gold   },
                { n: '30', label: 'Campaign posts',     color: C.violet },
                { n: '1×', label: 'Entry required',     color: C.green  },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: '12px 8px', borderRadius: 8,
                  border: `1px solid ${s.color}33`, background: s.color + '07', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{
        background: C.deep,
        borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`,
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
              How It Works
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 46px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 16px', lineHeight: 1.1 }}>
              Four steps.<br />
              <span style={{ color: C.gold }}>Infinite output.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{
                padding: '32px 24px', borderRadius: 12,
                border: `1px solid ${step.color}33`, background: step.color + '06',
                position: 'relative',
              }}>
                <div style={{
                  fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, lineHeight: 1,
                  color: step.color + '22', letterSpacing: -2, marginBottom: 16,
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.primary, margin: '0 0 12px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.75, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
            Pricing
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 44px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 12px', lineHeight: 1.1 }}>
            Simple pricing.<br />
            <span style={{ color: C.gold }}>Serious results.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, marginBottom: 12 }}>
            Replaces $300+/month of separate tools.
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 44 }}>
            7-day free trial on every plan. No credit card required.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 40 }}>
            {PRICING_TIERS.map(tier => (
              <div key={tier.name} style={{
                padding: '28px 16px', borderRadius: 10,
                border: `1px solid ${tier.popular ? tier.color : C.hairline}`,
                background: tier.popular ? tier.color + '10' : C.surface,
                position: 'relative', textAlign: 'center',
              }}>
                {tier.popular && (
                  <div style={{
                    position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                    background: tier.color, color: '#000',
                    fontSize: 8, fontWeight: 800, padding: '2px 10px', borderRadius: 999,
                    whiteSpace: 'nowrap', letterSpacing: 1,
                  }}>POPULAR</div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: tier.color, marginBottom: 8 }}>{tier.name}</div>
                <div style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: C.primary, letterSpacing: -1, lineHeight: 1 }}>{tier.price}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{tier.period}</div>
              </div>
            ))}
          </div>

          <button onClick={goToPricing} style={{
            padding: '13px 32px', borderRadius: 6, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold,
          }}>
            See Full Pricing →
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        background: C.deep,
        borderTop: `1px solid ${C.hairline}`,
        padding: 'clamp(80px, 10vw, 140px) 24px',
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${C.gold}08 0%, transparent 70%)`,
        }} />
        <div style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(30px, 5.5vw, 56px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px' }}>
            Stop guessing what to create.<br />
            <span style={{ color: C.gold }}>Start with a system that knows.</span>
          </h2>
          <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, maxWidth: 480, margin: '0 auto 40px' }}>
            PromptCEO learns your creative signature, recommends what to build next, and executes across every format. The longer you use it, the better it gets.
          </p>
          <button onClick={goToLogin} style={{
            padding: '16px 52px', borderRadius: 6, fontSize: 16, fontWeight: 800,
            cursor: 'pointer', border: 'none', background: C.gold, color: '#000',
            letterSpacing: 0.3, display: 'block', margin: '0 auto 16px',
          }}>
            {isLoggedIn ? 'Go to App →' : 'Start Free Trial'} →
          </button>
          <div style={{ fontSize: 12, color: C.muted }}>
            7-day free trial · No credit card required · Cancel anytime
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${C.hairline}`,
        padding: '32px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>
          PROMPT CEO
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <button onClick={goToPricing}                               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/tutorials')}           style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Tutorials</button>
          <button onClick={() => router.push('/partner')}             style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/terms')}               style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Terms</button>
          <button onClick={() => router.push('/privacy')}             style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Privacy</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
