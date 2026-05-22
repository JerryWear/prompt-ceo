'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b12',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a12',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd412',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab412',
}

const TIMELINE = [
  {
    year: '2022',
    title: 'Music starts',
    desc: 'Started producing music seriously. As a creator I needed content, campaigns, and visuals — and every AI tool I tried made me start from scratch every single time. The frustration was real.',
    color: C.violet,
  },
  {
    year: '2023',
    title: 'The first prompt tool',
    desc: 'Built the first version of Prompt CEO as a personal tool — a smarter way to generate prompts for my own content. One image, one world, one afternoon. Shared it. People wanted it.',
    color: C.gold,
  },
  {
    year: '2024',
    title: 'Ad Studio',
    desc: 'Added a complete advertising creative system — angles, hooks, captions, images, video, UGC. Everything connected to one product brief. Fitness coaching gave me the template: brief to result, no wasted reps.',
    color: C.green,
  },
  {
    year: '2024',
    title: 'Director\'s Studio + Music Intelligence',
    desc: 'Added a cinematic scene generation system with 20+ worlds and 11 director styles. Then music intelligence — 400+ original tracks that I produced, each matched to campaign mood and brand voice by AI.',
    color: C.blue,
  },
  {
    year: '2025',
    title: 'Building the full platform',
    desc: 'At 25, went all in. Built the complete marketing OS — landing pages, email sequences, SMS, retargeting, offer builder, testimonial mining, video storyboards, influencer briefs, ad account audits. Everything a marketing team of 10 would produce, from a single brief.',
    color: C.violet,
  },
  {
    year: '2026',
    title: 'Launch — the full vision',
    desc: 'Direct video generation through HeyGen, Synthesia, and Runway. AI avatar videos without leaving the app. The Director\'s Studio, the Ad Studio, and the video stack — all connected. This is what I was building toward.',
    color: C.gold,
  },
]

const VALUES = [
  { icon: '🎯', title: 'Connected, not siloed',     desc: 'Every tool knows about every other tool. Your hook knows the angle. Your landing page knows the campaign. Your SMS sequence knows the email sequence. Nothing exists in isolation.' },
  { icon: '🎬', title: 'Cinematic by default',       desc: 'AI content should look and feel like it was directed, not templated. Every prompt, every scene, every ad is built with visual intelligence — because I\'ve spent years thinking about light, mood, and story.' },
  { icon: '🎵', title: 'Music is part of the work',  desc: 'Music shapes energy, emotion, and pacing. The 400+ tracks in the library are mine — produced specifically for campaign use, not licensed filler. Music intelligence is built into the platform because I know it matters.' },
  { icon: '💪', title: 'Fitness mindset',            desc: 'Consistency beats intensity. Fitness coaching taught me that results come from systems, not moments. Prompt CEO is a system — brief in, campaign out, every time, no wasted reps.' },
  { icon: '⚡', title: 'One brief, everything',      desc: 'The single hardest problem in marketing tools is context loss. You enter your brand once and every output — hooks, landing pages, emails, SMS, retargeting, video briefs — knows everything about it.' },
  { icon: '🔒', title: 'Yours stays yours',          desc: 'I don\'t train on your content. I don\'t sell your data. Your brand, your campaigns, your identity — all private. That\'s how I\'d want it if I were the user.' },
]

export default function AboutPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,   setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>
          PROMPT CEO
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => router.push('/pricing')}      style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/case-studies')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Case Studies</button>
          <button onClick={() => router.push('/partner')}      style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Partner</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')}         style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>My Account</button>
              <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Open App</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Sign In</button>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Start Free Trial</button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.gold}08 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>About Prompt CEO</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 62px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px' }}>
            Music producer.<br />Fitness coach.<br />
            <span style={{ color: C.gold }}>Now building the tool I always needed.</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: C.secondary, lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>
            I'm Zirunas. I make music, I coach fitness, and since 2025 I've been building Prompt CEO — the creative and marketing OS I never had as a creator.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}44, ${C.violet}44)`, border: `2px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
              Z
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>Zirunas Michailovas</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Founder</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              {[
                { icon: '🎵', label: 'Music Producer', sub: 'since 2022' },
                { icon: '💪', label: 'Fitness Coach',  sub: 'all my life'  },
                { icon: '🏗',  label: 'Builder',        sub: 'since 2025'  },
              ].map(t => (
                <div key={t.label} style={{ padding: '7px 10px', borderRadius: 6, background: C.surface, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{t.label}</div>
                    <div style={{ fontSize: 9, color: C.muted }}>{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>The Story</div>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.85, marginBottom: 18 }}>
              I've been a fitness coach my whole life. Fitness isn't something I started — it's something I've always been. Discipline, consistency, systems. You don't get results by doing everything once. You get results by having a process and repeating it.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.85, marginBottom: 18 }}>
              In 2022, I started producing music seriously. Suddenly I was a creator who needed content, campaigns, social media presence, ad copy, hooks — all of it. And I kept hitting the same wall: every AI tool made me start from scratch. No memory. No connection between outputs. No brain behind the generation.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.85, marginBottom: 18 }}>
              That was the frustration that built Prompt CEO. In 2025, at 25, I started building it seriously — not as a side project, but as the tool I actually needed. By 2026, it became what you're using now: a complete marketing and creative operating system that I built because I was the customer who needed it most.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.85, marginBottom: 24 }}>
              The music library in the app is mine. I produced every track specifically for campaign use. The cinematic world system comes from years of thinking about aesthetics, light, and story. The fitness mindset is in the architecture — brief in, results out, no wasted reps.
            </p>
            <div style={{ padding: '18px 22px', borderRadius: 10, border: `1px solid ${C.goldDim}`, background: C.goldGlow }}>
              <p style={{ fontSize: 14, color: C.gold, fontStyle: 'italic', lineHeight: 1.8, margin: 0 }}>
                "I built the tool I always wanted as a creator. I built it honestly, from real frustration, with the same discipline I apply to everything else. If you're using it, you know it works — because I wouldn't release something that didn't."
              </p>
              <div style={{ fontSize: 12, color: C.goldDim, marginTop: 10, fontWeight: 700 }}>— Zirunas</div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>The Build</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>From creator frustration to creative OS.</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 52, top: 0, bottom: 0, width: 1, background: C.hairline }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 80, textAlign: 'right', paddingTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: item.color, fontFamily: 'monospace' }}>{item.year}</span>
                </div>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 5, zIndex: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What We Believe</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Every decision comes from these.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ padding: '24px 20px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 20px' }}>
            Built by a creator.<br />
            <span style={{ color: C.gold }}>For anyone serious about their work.</span>
          </h2>
          <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, marginBottom: 36 }}>
            7-day free trial. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '14px 32px', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: 'pointer', border: 'none', background: C.gold, color: '#000' }}>
              Start Free Trial
            </button>
            <button onClick={() => router.push('/partner')} style={{ padding: '14px 32px', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'transparent', color: C.primary }}>
              Become a Partner →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => router.push('/pricing')}      style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/case-studies')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Case Studies</button>
          <button onClick={() => router.push('/partner')}      style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}        style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
