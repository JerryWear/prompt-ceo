'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueGlow: '#4a8ab418',
}

const TIMELINE = [
  { year: '2023', title: 'The first prompt tool', desc: 'Started as a simple prompt generator for creators who were frustrated with inconsistent AI results. One tool, one purpose.' },
  { year: '2024', title: 'Ad Studio', desc: 'Built a complete advertising creative system — angles, hooks, captions, images, video, UGC. Everything connected to one product brief.' },
  { year: '2024', title: 'Director\'s Studio', desc: 'Added a full cinematic scene generation system. Upload your identity, pick a world and a director. Generate scenes anywhere on earth with 12-layer AI.' },
  { year: '2025', title: 'Music Intelligence', desc: 'Added a music library with AI matching. Every track scored against your campaign goal, mood, and brand voice. 400+ original tracks.' },
  { year: '2025', title: 'Full Funnel Platform', desc: 'Landing page copy, email sequences, SMS campaigns, offer builder, retargeting packs, testimonial mining, video storyboards — the complete marketing funnel in one tool.' },
  { year: '2026', title: 'Marketing OS — Complete', desc: 'Trend intelligence, hook pre-scoring, ad account audit, talking head scripts, product descriptions, influencer briefs, campaign naming conventions, client workspaces. Every marketing output a team of 10 would produce — from a single brief.' },
]

const VALUES = [
  { icon: '🎯', title: 'Connected, not siloed',  desc: 'Every tool knows about every other tool. Your hook knows the angle. Your landing page knows the email sequence. Your SMS knows the campaign arc. Nothing exists in isolation.' },
  { icon: '🎬', title: 'Cinematic by default',   desc: 'We believe AI content should look and feel like it was made by a director, not a template. Every prompt, every scene, every ad is built with visual intelligence.' },
  { icon: '📊', title: 'Data-driven creative',   desc: 'Score hooks before you spend. Audit your ad account. Learn which patterns convert for your specific audience. Creative decisions backed by performance intelligence.' },
  { icon: '🎵', title: 'Music is creative fuel', desc: 'Music shapes everything — energy, emotion, pacing. We built music intelligence into the creative process, not as an afterthought. 400+ original tracks.' },
  { icon: '🔒', title: 'Yours stays yours',       desc: 'We don\'t train on your content. We don\'t sell your data. Your brand, your identity, your campaigns — all private.' },
  { icon: '⚡', title: 'One brief, everything',  desc: 'The single hardest problem in marketing tools is context loss. We solved it. Enter your product once and every output — hooks, landing pages, emails, SMS, retargeting — knows everything.' },
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
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Partner</button>
          {user ? (
            <>
              <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>My Account</button>
              <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Open App
              </button>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Sign In</button>
              <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.gold}08 0%, transparent 70%)` }} />

        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>About Prompt CEO</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 7vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px' }}>
            Built by a creator.<br />
            <span style={{ color: C.gold }}>For every marketer who's serious.</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: C.secondary, lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>
            Prompt CEO started with one question: why does every AI tool make you start from scratch? Everything should be connected. Every output should know every other output. That question became a cinematic studio, then an ad platform, then a complete marketing OS.
          </p>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}33, ${C.violet}33)`, border: `2px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 16 }}>
              🎵
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Zirunas</div>
            <div style={{ fontSize: 12, color: C.muted }}>Founder & Music Producer</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>The Founder</div>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, marginBottom: 20 }}>
              I make music. I create content. I run campaigns. I know what it feels like to spend three hours switching between five different AI tools, losing context every time, starting from scratch every time.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, marginBottom: 20 }}>
              Prompt CEO was built to solve that. One brain. Every output connected. Your brand voice, your visual identity, your campaign goal — injected into everything automatically.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.8, marginBottom: 24 }}>
              The music library is mine. Every track was produced to work inside campaigns — matched to mood, energy, platform, and brand voice by AI. When you license a track, you're licensing music built specifically for this kind of work.
            </p>
            <div style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow }}>
              <div style={{ fontSize: 13, color: C.gold, fontStyle: 'italic', lineHeight: 1.7 }}>
                "I built the tool I always wanted. Then I kept building until it became something I couldn't have imagined."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>The Story</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>From prompt tool to creative OS.</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 52, top: 0, bottom: 0, width: 1, background: C.hairline }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 80, textAlign: 'right', paddingTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.gold, fontFamily: 'monospace' }}>{item.year}</span>
                </div>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: C.gold, flexShrink: 0, marginTop: 5, zIndex: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What We Believe</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>The principles behind every decision.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ padding: '24px 20px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 20px' }}>
            Ready to build something<br />
            <span style={{ color: C.gold }}>worth seeing?</span>
          </h2>
          <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, marginBottom: 36 }}>
            Start your free trial. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '14px 32px', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000' }}>
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
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
