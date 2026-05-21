'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

const PLANS = [
  {
    id:       'creator',
    name:     'Creator',
    price:    '$29',
    period:   '/month',
    tagline:  'For creators just getting started',
    color:    C.blue,
    colorDim: C.blueDim,
    colorGlow:C.blueGlow,
    features: [
      '20 image generations per month',
      "Director's Studio — full access",
      '20+ cinematic worlds — Tokyo, Capri, Mykonos, Marrakech, Swiss Alps + more',
      '11 director styles — Kubrick, Fincher, Wong Kar-wai + more',
      'Shot Director AI after every scene — free',
      'Layer swap, variation engine, visual anchor',
      'Export to Midjourney, Runway, Kling',
      'Music library preview',
    ],
    cta: 'Start Creating',
    popular: false,
  },
  {
    id:       'studio_pro',
    name:     'Studio Pro',
    price:    '$49',
    period:   '/month',
    tagline:  'For creators who live in the Studio',
    color:    C.green,
    colorDim: C.greenDim,
    colorGlow:C.greenGlow,
    features: [
      '150 image generations per month',
      'Everything in Creator',
      'Full Sequence — 30-scene cinematic arc',
      'Photographer Brief export',
      'Character DNA — save and load full setups',
      'Custom Worlds — build your own location',
      'Session Timeline and Prompt Library',
      '3 music licenses per month included',
    ],
    cta: 'Go Studio Pro',
    popular: true,
  },
  {
    id:       'pro',
    name:     'Pro',
    price:    '$79',
    period:   '/month',
    tagline:  'For brands and serious content creators',
    color:    C.gold,
    colorDim: C.goldDim,
    colorGlow:C.goldGlow,
    features: [
      '100 image generations per month',
      "Full Ad Studio + Full Director's Studio",
      'Unlimited hooks, captions, angles, campaigns, UGC',
      'Brand Voice Fingerprint',
      'Visual Brand DNA',
      'Campaign score across 8 dimensions',
      'Client sharing — send a review link, they approve',
      'Export briefs — Campaign, Creator, Media Buyer',
      '3 music licenses per month included',
    ],
    cta: 'Go Pro',
    popular: false,
  },
  {
    id:       'agency',
    name:     'Agency',
    price:    '$179',
    period:   '/month',
    tagline:  'For agencies running multiple client campaigns',
    color:    C.violet,
    colorDim: C.violetDim,
    colorGlow:C.violetGlow,
    features: [
      '300 image generations per month',
      'Everything in Pro',
      '10 music licenses per month included',
      'Webhook integration — Zapier / Make.com',
      'Multiple saved projects',
      'Photographer Brief export',
      'Priority access to new features',
    ],
    cta: 'Go Agency',
    popular: false,
  },
]

const MUSIC_ADDON = {
  id:       'music_addon',
  name:     'Music Add-on',
  price:    '$9',
  period:   '/month',
  tagline:  'Add to any plan',
  color:    C.gold,
  features: [
    'Unlimited access to 400+ original tracks',
    'Every track licensed for commercial use',
    'AI matches the perfect track to your campaign mood',
    'Timing plan mapped to your ad structure',
    'Campaign stage music — cold awareness through winback',
    'New tracks added regularly',
  ],
}

export default function PricingPage() {
  const router   = useRouter()
  const [loading, setLoading] = useState(null)
  const [error,   setError]   = useState('')

  const handleSubscribe = async (tierId) => {
    setLoading(tierId)
    setError('')
    try {
      const refCode = typeof window !== 'undefined' ? localStorage.getItem('ref_code') : null
      const res  = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ tier: tierId, refCode }),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else if (data?.error === 'Not authenticated') {
        router.push('/prompt-engine-v3/login?redirect=/pricing')
      } else {
        setError(data?.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
            PROMPT CEO
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, margin: '0 0 16px', letterSpacing: -1, lineHeight: 1.1 }}>
            One tool. Every piece of content.
          </h1>
          <p style={{ fontSize: 16, color: C.secondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Ad campaigns, cinematic scenes, music, client delivery — all connected. Pick the plan that fits how you work.
          </p>
        </div>

        {/* Plans grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              style={{
                borderRadius: 12,
                border: `1px solid ${plan.popular ? plan.color : C.hairline}`,
                background: plan.popular ? `${plan.color}0a` : C.surface,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'border-color 0.2s',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: plan.color, color: '#000', fontSize: 10, fontWeight: 800,
                  letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 14px', borderRadius: 999,
                  whiteSpace: 'nowrap',
                }}>
                  Most Popular
                </div>
              )}

              {/* Plan name + price */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: plan.color, marginBottom: 8 }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: C.primary, letterSpacing: -1 }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: C.muted }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.5 }}>{plan.tagline}</div>
              </div>

              {/* Features */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: plan.color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 12, color: C.secondary, lineHeight: 1.55 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                style={{
                  width: '100%', padding: '12px 0', borderRadius: 6,
                  fontSize: 13, fontWeight: 700, cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                  border: `1px solid ${plan.color}`,
                  background: plan.popular ? plan.color : plan.colorGlow,
                  color: plan.popular ? '#000' : plan.color,
                  opacity: loading === plan.id ? 0.7 : 1,
                  transition: 'all 0.15s',
                  letterSpacing: 0.3,
                }}
              >
                {loading === plan.id ? '…' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Music Add-on */}
        <div style={{
          borderRadius: 12, border: `1px solid ${C.goldDim}`,
          background: C.goldGlow, padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 32,
          flexWrap: 'wrap', marginBottom: 64,
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>🎵</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>{MUSIC_ADDON.name}</div>
                <div style={{ fontSize: 11, color: C.secondary }}>{MUSIC_ADDON.tagline}</div>
              </div>
              <div style={{ marginLeft: 8, display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: C.gold }}>{MUSIC_ADDON.price}</span>
                <span style={{ fontSize: 11, color: C.muted }}>{MUSIC_ADDON.period}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
              {MUSIC_ADDON.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: C.gold, fontSize: 11, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 11, color: C.secondary }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleSubscribe('music_addon')}
            disabled={loading === 'music_addon'}
            style={{
              padding: '12px 28px', borderRadius: 6, fontSize: 13, fontWeight: 700,
              cursor: loading === 'music_addon' ? 'not-allowed' : 'pointer',
              border: `1px solid ${C.gold}`, background: C.gold, color: '#000',
              opacity: loading === 'music_addon' ? 0.7 : 1, whiteSpace: 'nowrap',
            }}
          >
            {loading === 'music_addon' ? '…' : 'Add Music — $9/month'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '10px 16px', borderRadius: 6, background: '#110606', border: '1px solid #2a1010', color: C.red, fontSize: 13, marginBottom: 32 }}>
            {error}
          </div>
        )}

        {/* Comparison note */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 24 }}>
            All plans include a 7-day free trial. Cancel anytime.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              ['Jasper + Copy.ai', '$49–$125/mo'],
              ['AdCreative.ai', '$49–$149/mo'],
              ['Midjourney', '$30/mo'],
              ['Music licensing', '$50+/mo'],
            ].map(([tool, price]) => (
              <div key={tool} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: C.muted }}>{tool}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.secondary }}>{price}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 16 }}>
            Prompt CEO replaces all of the above — starting at $29/month.
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', paddingBottom: 48 }}>
          <button
            onClick={() => router.push('/prompt-engine-v3')}
            style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
          >
            ← Back to the app
          </button>
        </div>
      </div>
    </div>
  )
}
