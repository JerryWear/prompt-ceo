'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab418',
  red:       '#cf6a6a',
}

const TIERS = [
  {
    name:       'Partner',
    commission: '30%',
    threshold:  'From day one',
    color:      C.blue,
    glow:       C.blueGlow,
    perks: [
      '30% recurring commission — for life',
      'Unique referral link and tracking dashboard',
      'Monthly payouts via Stripe',
      'Access to all promotional assets',
    ],
  },
  {
    name:       'Pro Partner',
    commission: '35%',
    threshold:  'After 10 active referrals',
    color:      C.gold,
    glow:       C.goldGlow,
    popular:    true,
    perks: [
      '35% recurring commission — for life',
      'Everything in Partner',
      'Priority support and early feature access',
      'Co-marketing opportunities',
    ],
  },
  {
    name:       'Elite Partner',
    commission: '40%',
    threshold:  'After 50 active referrals',
    color:      C.violet,
    glow:       C.violetGlow,
    perks: [
      '40% recurring commission — for life',
      'Everything in Pro Partner',
      'Music library placement for your tracks',
      'Featured in app and on website',
      'Direct line to the founder',
    ],
  },
]

const EARNINGS = [
  { referrals: 10,  plan: 'Pro ($79)',    monthly: '$237',  annual: '$2,844'  },
  { referrals: 50,  plan: 'Pro ($79)',    monthly: '$1,580', annual: '$18,960' },
  { referrals: 100, plan: 'Pro ($79)',    monthly: '$3,160', annual: '$37,920' },
  { referrals: 50,  plan: 'Agency ($179)', monthly: '$3,580', annual: '$42,960' },
]

const STEPS = [
  { n: '01', title: 'Apply',        desc: 'Fill in the form below. Tell us who you are, your audience, and how you plan to promote Prompt CEO.' },
  { n: '02', title: 'Get approved', desc: 'We review every application. If you\'re a good fit, you\'ll get your unique referral link and access to the partner dashboard within 48 hours.' },
  { n: '03', title: 'Promote',      desc: 'Share your link. Use the app yourself. Show your audience what it does. Authentic promotion always outperforms generic ads.' },
  { n: '04', title: 'Get paid',     desc: 'Earn 30–40% recurring commission every month for every active subscriber you refer. Paid monthly via Stripe.' },
]

export default function PartnerPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,   setUser]     = useState(null)
  const [form, setForm]       = useState({ name: '', email: '', platform: '', audience: '', message: '' })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])
  const [submitting, setSub]  = useState(false)
  const [submitted, setDone]  = useState(false)
  const [error, setError]     = useState('')

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.platform) {
      setError('Please fill in name, email, and platform.')
      return
    }
    setSub(true)
    setError('')
    try {
      const res  = await fetch('/api/affiliate/apply', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: form.name, email: form.email, platform: form.platform, audience: form.audience, message: form.message }),
      })
      const data = await res.json()
      if (res.ok) {
        setDone(true)
      } else {
        setError(data?.error || 'Something went wrong. Please email partners@promptceo.io')
      }
    } catch {
      setError('Connection error. Please email partners@promptceo.io')
    } finally {
      setSub(false)
    }
  }

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>
          PROMPT CEO
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
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
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.gold}08 0%, transparent 70%)` }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>Creator Partner Program</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px' }}>
            Promote a tool you actually use.<br />
            <span style={{ color: C.gold }}>Earn for life.</span>
          </h1>

          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: C.secondary, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 40px' }}>
            Every subscriber you refer pays you 30–40% every single month — for as long as they stay. No caps. No expiry. Recurring revenue that grows as your audience does.
          </p>

          <a href="#apply" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 6, fontSize: 15, fontWeight: 800, textDecoration: 'none', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', letterSpacing: 0.3 }}>
            Apply Now
          </a>
        </div>
      </section>

      {/* EARNINGS TABLE */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>What You Can Earn</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              Real numbers. Recurring. Forever.
            </h2>
          </div>
          <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: C.surface, padding: '12px 20px', borderBottom: `1px solid ${C.hairline}` }}>
              {['Referrals', 'Plan', 'Monthly Earnings', 'Annual Earnings'].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted }}>{h}</div>
              ))}
            </div>
            {EARNINGS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '14px 20px', borderBottom: i < EARNINGS.length - 1 ? `1px solid ${C.hairline}` : 'none', background: i % 2 === 0 ? C.void : C.deep }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>{row.referrals}</div>
                <div style={{ fontSize: 13, color: C.secondary }}>{row.plan}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.green }}>{row.monthly}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>{row.annual}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 12 }}>
            Based on 30% commission. Pro Partner (35%) and Elite Partner (40%) earn more.
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Commission Tiers</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>
            The more you refer, the more you earn.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{ padding: '28px 24px', borderRadius: 12, border: `1px solid ${tier.popular ? tier.color : C.hairline}`, background: tier.popular ? tier.glow : C.surface, position: 'relative' }}>
              {tier.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: tier.color, color: '#000', fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                  Most Achieved
                </div>
              )}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: tier.color, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: tier.color, letterSpacing: -2, lineHeight: 1, marginBottom: 6 }}>{tier.commission}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 24 }}>{tier.threshold}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tier.perks.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: tier.color, fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 12, color: C.secondary, lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MUSIC PARTNERSHIP */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 80px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Music Partnership</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.15, margin: '0 0 20px' }}>
              You make music?<br />
              <span style={{ color: C.gold }}>Get it in front of thousands of campaigns.</span>
            </h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, marginBottom: 24 }}>
              Elite Partners can submit their original tracks to the Prompt CEO music library. Every time a user licenses your track for their campaign, you earn. Your music works while you sleep.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Submit original tracks to the 400+ library',
                'Earn per license — every campaign that uses your track',
                'Your name and brand attached to every placement',
                'Real usage data — see which industries use your music',
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: C.gold, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.secondary, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🎵', label: 'Track Placement', desc: 'Your music inside an AI creative OS used by brands and creators worldwide' },
              { icon: '💰', label: 'License Revenue',  desc: 'Earn every time someone licenses your track for their campaign' },
              { icon: '📊', label: 'Usage Analytics',  desc: 'See real data — which brands, which industries, which campaigns' },
              { icon: '🌍', label: 'Global Reach',     desc: 'Creators from every industry licensing music for real commercial work' },
            ].map(f => (
              <div key={f.label} style={{ padding: '14px 16px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 3 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>How It Works</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Four steps to recurring income.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {STEPS.map(step => (
            <div key={step.n} style={{ position: 'relative' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.goldDim, letterSpacing: -1, marginBottom: 12, fontFamily: 'monospace' }}>{step.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Apply</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>Become a Creator Partner</h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7 }}>We review every application. If you're a good fit, you'll hear back within 48 hours.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 12, border: `1px solid ${C.green}`, background: C.greenGlow }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.green, marginBottom: 8 }}>Application received</div>
              <div style={{ fontSize: 14, color: C.secondary, marginBottom: 20 }}>We'll review your application and get back to you within 48 hours.</div>
              <button onClick={() => router.push('/affiliate/dashboard')} style={{ padding: '10px 24px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
                View My Dashboard →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',     label: 'Full Name',         type: 'text',  placeholder: 'Your name' },
                { key: 'email',    label: 'Email Address',     type: 'email', placeholder: 'your@email.com' },
                { key: 'platform', label: 'Primary Platform',  type: 'text',  placeholder: 'Instagram, TikTok, YouTube...' },
                { key: 'audience', label: 'Audience Size',     type: 'text',  placeholder: 'e.g. 50k Instagram, 20k TikTok' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.secondary, marginBottom: 6, textTransform: 'uppercase' }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={e => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.surface, color: C.primary, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.secondary, marginBottom: 6, textTransform: 'uppercase' }}>
                  How will you promote Prompt CEO?
                </label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  placeholder="Tell us about your audience, content style, and how you plan to promote the app..."
                  rows={4}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.surface, color: C.primary, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = C.goldDim}
                  onBlur={e => e.target.style.borderColor = C.subtle}
                />
              </div>

              {error && (
                <div style={{ padding: '10px 14px', borderRadius: 5, background: '#110606', border: '1px solid #2a1010', color: C.red, fontSize: 13 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{ padding: '14px 0', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', opacity: submitting ? 0.7 : 1, letterSpacing: 0.3, marginTop: 8 }}
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>

              <div style={{ fontSize: 11, color: C.muted, textAlign: 'center' }}>
                Questions? Email <span style={{ color: C.secondary }}>partners@promptceo.io</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.hairline}`, padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>About</button>
          <button onClick={() => router.push('/partner')} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>Partner</button>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
