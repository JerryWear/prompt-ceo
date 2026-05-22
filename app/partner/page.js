'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:       '#040404', deep:      '#070707', base:      '#0a0a0a',
  raised:     '#0d0d0d', surface:   '#111111', overlay:   '#151515',
  hairline:   '#1a1a1a', subtle:    '#222222',
  primary:    '#e8e4dc', secondary: '#b0aba4', muted:     '#6e6a66',
  gold:       '#c8a84b', goldDim:   '#7a6428', goldGlow:  '#c8a84b18',
  green:      '#4a9a6a', greenDim:  '#1a3a2a', greenGlow: '#4a9a6a18',
  violet:     '#9b6fd4', violetDim: '#4a2a7a', violetGlow:'#9b6fd418',
  blue:       '#4a8ab4', blueDim:   '#1a3a5a', blueGlow:  '#4a8ab418',
  red:        '#cf6a6a',
}

const TIERS = [
  { name: 'Partner',       commission: 30, threshold: 'From day one',             color: C.blue,   glow: C.blueGlow,   perks: ['30% recurring commission — forever', 'Referral link + tracking dashboard', 'Monthly payouts', 'All promo assets included'] },
  { name: 'Pro Partner',   commission: 35, threshold: 'After 10 active referrals', color: C.gold,   glow: C.goldGlow,   popular: true, perks: ['35% recurring commission — forever', 'Everything in Partner', 'Priority support + early feature access', 'Co-marketing opportunities'] },
  { name: 'Elite Partner', commission: 40, threshold: 'After 50 active referrals', color: C.violet, glow: C.violetGlow, perks: ['40% recurring commission — forever', 'Everything in Pro Partner', 'Music library placement', 'Featured on website + in-app', 'Direct line to the founder'] },
]

const STEPS = [
  { n: '01', title: 'Apply',        desc: 'Fill in the form below. Tell us about your audience and how you plan to use the app.' },
  { n: '02', title: 'Get approved', desc: 'We review every application personally. Approved partners hear back within 48 hours with their referral link.' },
  { n: '03', title: 'Show it off',  desc: 'You get free full access to the app. Use it, review it, show your audience what it actually does.' },
  { n: '04', title: 'Get paid',     desc: 'Earn 30–40% of every payment your referrals make — every month, for as long as they stay subscribed.' },
]

const FOR_TYPES = [
  {
    icon: '🎬', title: 'AI Tools YouTubers',
    desc: 'Your audience is already buying AI tools. Show them the one that generates a full ad campaign — hooks, captions, landing page, email sequence, video storyboard — in one session.',
    angle: 'Review angle: "I built a full campaign from one brief"',
  },
  {
    icon: '📣', title: 'Marketing & Ad Channels',
    desc: 'Media buyers, SMMA owners, and performance marketers are your audience. They need hooks, angles, ad copy, and audience targeting done fast. This is the tool they\'ve been waiting for.',
    angle: 'Review angle: "I scored my hooks before running ads"',
  },
  {
    icon: '✨', title: 'Creator Economy Channels',
    desc: 'Your audience creates content for a living. Show them the Director\'s Studio, the UGC brief generator, and the talking head script tool. They\'ll be subscribing before the video ends.',
    angle: 'Review angle: "I made 30 days of content in one hour"',
  },
  {
    icon: '💼', title: 'Business & Side Hustle',
    desc: 'Entrepreneurs and side-hustle creators are always looking for tools that save time and make money. One video showing the full launch package — ads, email, landing page — converts extremely well.',
    angle: 'Review angle: "Complete product launch in 10 minutes"',
  },
]

const PLANS = [
  { label: 'Creator — $29/mo', price: 29 },
  { label: 'Pro — $79/mo',     price: 79 },
  { label: 'Agency — $179/mo', price: 179 },
]

function fmt(n) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`
}

export default function PartnerPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [user,       setUser]      = useState(null)
  const [refs,       setRefs]      = useState(50)
  const [planIdx,    setPlanIdx]   = useState(1)
  const [form,       setForm]      = useState({ name: '', email: '', platform: '', audience: '', message: '' })
  const [submitting, setSub]       = useState(false)
  const [submitted,  setDone]      = useState(false)
  const [error,      setError]     = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user || null))
  }, [])

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const plan        = PLANS[planIdx]
  const rate        = refs >= 50 ? 40 : refs >= 10 ? 35 : 30
  const tierName    = refs >= 50 ? 'Elite' : refs >= 10 ? 'Pro Partner' : 'Partner'
  const tierColor   = refs >= 50 ? C.violet : refs >= 10 ? C.gold : C.blue
  const monthly     = Math.round(refs * plan.price * (rate / 100))
  const annual      = monthly * 12
  const threeYear   = annual * 3

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.platform) { setError('Please fill in name, email, and platform.'); return }
    setSub(true); setError('')
    try {
      const res  = await fetch('/api/affiliate/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, platform: form.platform, audience: form.audience, message: form.message }) })
      const data = await res.json()
      if (res.ok) setDone(true)
      else setError(data?.error || 'Something went wrong. Email partners@promptceo.io')
    } catch { setError('Connection error. Email partners@promptceo.io') }
    finally { setSub(false) }
  }

  return (
    <div style={{ background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${C.hairline}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => router.push('/about')}   style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>About</button>
          {user ? (
            <>
              <button onClick={() => router.push('/affiliate/dashboard')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>My Dashboard</button>
              <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Open App</button>
            </>
          ) : (
            <button onClick={() => router.push('/prompt-engine-v3/login')} style={{ padding: '8px 20px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>Sign In</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${C.gold}0a 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, border: `1px solid ${C.goldDim}`, background: C.goldGlow, marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>Creator Partner Program</span>
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 7vw, 68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px' }}>
            Show your audience a tool<br />they'll actually buy.
            <br /><span style={{ color: C.gold }}>Earn every month. Forever.</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: C.secondary, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 16px' }}>
            One subscriber pays you $9–$72 every month for as long as they stay subscribed.
            No cap. No expiry. Recurring revenue that compounds as your audience grows.
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 40 }}>
            You get free full access to the app — use it yourself, then show it off.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#calculator" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 6, fontSize: 15, fontWeight: 800, textDecoration: 'none', background: C.gold, color: '#000', letterSpacing: 0.3 }}>
              Calculate Your Earnings
            </a>
            <a href="#apply" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 6, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary }}>
              Apply Now →
            </a>
          </div>
        </div>
      </section>

      {/* INCOME CALCULATOR */}
      <section id="calculator" style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Income Calculator</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>What could you earn?</h2>
            <p style={{ fontSize: 14, color: C.secondary, margin: 0 }}>Move the sliders and see your income in real time.</p>
          </div>

          <div style={{ borderRadius: 16, border: `1px solid ${C.hairline}`, background: C.surface, overflow: 'hidden' }}>
            {/* Controls */}
            <div style={{ padding: '32px 32px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Subscribers slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>Subscribers you refer</label>
                  <span style={{ fontSize: 18, fontWeight: 800, color: C.gold }}>{refs}</span>
                </div>
                <input type="range" min={1} max={500} value={refs} onChange={e => setRefs(Number(e.target.value))}
                  style={{ width: '100%', accentColor: C.gold, cursor: 'pointer', height: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: C.muted }}>1</span>
                  <span style={{ fontSize: 10, color: C.muted }}>500</span>
                </div>
              </div>

              {/* Plan selector */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.primary, display: 'block', marginBottom: 10 }}>Subscriber plan</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PLANS.map((p, i) => (
                    <button key={i} onClick={() => setPlanIdx(i)}
                      style={{ padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${planIdx === i ? C.goldDim : C.hairline}`, background: planIdx === i ? C.goldGlow : 'none', color: planIdx === i ? C.gold : C.secondary, transition: 'all 0.15s' }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{ background: C.raised, borderTop: `1px solid ${C.hairline}`, padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted }}>At {refs} referrals you reach</span>
                <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10, fontWeight: 800, background: tierColor + '22', border: `1px solid ${tierColor}44`, color: tierColor }}>{tierName} — {rate}% commission</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { label: 'Per Month', value: fmt(monthly), sub: 'Recurring — every month', color: C.green },
                  { label: 'Per Year',  value: fmt(annual),  sub: '12 months of payments',  color: C.gold },
                  { label: '3 Years',   value: fmt(threeYear), sub: 'If they stay subscribed', color: C.violet },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center', padding: '16px 8px', borderRadius: 8, border: `1px solid ${stat.color}22`, background: stat.color + '08' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>{stat.label}</div>
                    <div style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: stat.color, letterSpacing: -1, marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 8, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 12, color: C.secondary }}>
                <span style={{ color: C.gold, fontWeight: 700 }}>How it compounds: </span>
                Each subscriber you refer pays you every month. Add more subscribers and your income stacks — existing referrals keep paying while new ones join.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREE ACCOUNT CTA */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(60px, 8vw, 80px) 24px', textAlign: 'center' }}>
        <div style={{ borderRadius: 16, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '40px 32px' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🎁</div>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: -0.5, margin: '0 0 12px' }}>You get full access. Free. Before you promote anything.</h2>
          <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 24px' }}>
            Approved partners get a free Pro account — hooks, campaigns, ad images, email sequences, Director's Studio, everything. Use it for your own content. Then show your audience exactly what it does.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, maxWidth: 640, margin: '0 auto' }}>
            {[
              '✦ Full Ad Studio access', '✦ Director\'s Studio', '✦ 50+ generation tools',
              '✦ AI hook scoring', '✦ Campaign builder', '✦ Email sequences',
            ].map(f => (
              <div key={f} style={{ padding: '8px 12px', borderRadius: 6, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 12, fontWeight: 600, color: C.gold, textAlign: 'center' }}>{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Who This Is For</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>Your audience already wants this.</h2>
            <p style={{ fontSize: 14, color: C.secondary, margin: 0 }}>Here's exactly how to position it for each audience type.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {FOR_TYPES.map(type => (
              <div key={type.title} style={{ padding: '24px', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 28 }}>{type.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.primary }}>{type.title}</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.65, flex: 1 }}>{type.desc}</div>
                <div style={{ padding: '8px 12px', borderRadius: 6, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 11, fontWeight: 700, color: C.gold }}>{type.angle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Commission Tiers</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>The more you refer, the more you earn.</h2>
          <p style={{ fontSize: 14, color: C.secondary }}>Tiers are automatic. Hit the threshold and your rate upgrades instantly.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{ padding: '28px 24px', borderRadius: 12, border: `1px solid ${tier.popular ? tier.color : C.hairline}`, background: tier.popular ? tier.glow : C.surface, position: 'relative' }}>
              {tier.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: tier.color, color: '#000', fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>Most Achieved</div>
              )}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: tier.color, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: tier.color, letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}>{tier.commission}%</div>
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

      {/* HOW IT WORKS */}
      <section style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: 0 }}>Four steps to recurring income.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
            {STEPS.map(step => (
              <div key={step.n}>
                <div style={{ fontSize: 36, fontWeight: 800, color: C.goldDim, letterSpacing: -1, marginBottom: 14, fontFamily: 'monospace' }}>{step.n}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.7 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYOUT INFO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px, 6vw, 60px) 24px' }}>
        <div style={{ borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface, padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
          {[
            { icon: '📅', label: 'Monthly Payouts',     desc: 'Paid on the 1st of every month for the previous month\'s commissions' },
            { icon: '💳', label: 'PayPal or Bank',      desc: 'Choose your preferred payout method when you apply' },
            { icon: '💰', label: '$20 Minimum',         desc: 'Commissions accumulate until you hit the $20 threshold' },
            { icon: '♾️', label: 'No Expiry',           desc: 'Referrals pay you forever — as long as they keep their subscription' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ background: C.deep, borderTop: `1px solid ${C.hairline}`, padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Apply</div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 12px' }}>Become a Creator Partner</h2>
            <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7 }}>We review every application personally. If you're a good fit, you'll hear back within 48 hours with your referral link and free Pro account.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 12, border: `1px solid ${C.green}`, background: C.greenGlow }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.green, marginBottom: 8 }}>Application received</div>
              <div style={{ fontSize: 14, color: C.secondary, lineHeight: 1.7, marginBottom: 24 }}>We'll review it and get back to you within 48 hours. Check your email — your approval comes with your referral link and free account access.</div>
              <button onClick={() => router.push('/affiliate/dashboard')} style={{ padding: '10px 28px', borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
                View My Dashboard →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',     label: 'Full Name',        type: 'text',  placeholder: 'Your name',                             req: true },
                { key: 'email',    label: 'Email Address',    type: 'email', placeholder: 'your@email.com',                        req: true },
                { key: 'platform', label: 'Primary Channel',  type: 'text',  placeholder: 'YouTube, TikTok, Instagram, Blog…',    req: true },
                { key: 'audience', label: 'Audience Size',    type: 'text',  placeholder: 'e.g. 45k YouTube, 90k TikTok',          req: false },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.secondary, marginBottom: 6, textTransform: 'uppercase' }}>
                    {field.label}{field.req && <span style={{ color: C.gold }}> *</span>}
                  </label>
                  <input type={field.type} value={form[field.key]} onChange={e => update(field.key, e.target.value)} placeholder={field.placeholder}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 6, border: `1px solid ${C.subtle}`, background: C.surface, color: C.primary, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.secondary, marginBottom: 6, textTransform: 'uppercase' }}>How will you promote Prompt CEO?</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)}
                  placeholder="Tell us about your audience, your content style, and what angle you'd take reviewing or using the app…"
                  rows={4}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 6, border: `1px solid ${C.subtle}`, background: C.surface, color: C.primary, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = C.goldDim}
                  onBlur={e => e.target.style.borderColor = C.subtle} />
              </div>

              {error && <div style={{ padding: '10px 14px', borderRadius: 5, background: '#110606', border: '1px solid #2a1010', color: C.red, fontSize: 13 }}>{error}</div>}

              <button type="submit" disabled={submitting}
                style={{ padding: '14px 0', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer', border: 'none', background: C.gold, color: '#000', opacity: submitting ? 0.7 : 1, letterSpacing: 0.3, marginTop: 6 }}>
                {submitting ? 'Submitting…' : 'Submit Application — Free Account Included'}
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
          {['/', '/pricing', '/about', '/case-studies'].map((path, i) => (
            <button key={path} onClick={() => router.push(path)} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer' }}>
              {['Home', 'Pricing', 'About', 'Case Studies'][i]}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Prompt CEO. All rights reserved.</div>
      </footer>

    </div>
  )
}
