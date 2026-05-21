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
  red:       '#cf6a6a', redGlow:  '#cf6a6a18',
}

const TIER_COLORS = {
  free:       C.muted,
  creator:    C.blue,
  studio_pro: C.green,
  pro:        C.gold,
  agency:     C.violet,
  admin:      C.violet,
}

function AffiliateLink({ router, email }) {
  const [affiliate, setAffiliate] = useState(null)

  useEffect(() => {
    fetch('/api/affiliate/dashboard')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setAffiliate(d.affiliate) })
      .catch(() => {})
  }, [])

  if (!affiliate) return null

  const isApproved = affiliate.affiliateStatus === 'approved' || affiliate.affiliateStatus === 'active'

  return (
    <div style={{
      borderRadius: 10,
      border: `1px solid ${isApproved ? C.goldDim : C.hairline}`,
      background: isApproved ? C.goldGlow : C.surface,
      padding: '20px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: isApproved ? C.gold : C.secondary, marginBottom: 4 }}>
          💰 {isApproved ? 'Partner Program' : 'Application Pending'}
        </div>
        <div style={{ fontSize: 12, color: C.secondary }}>
          {isApproved
            ? `Your referral link is active — ${affiliate.commissionRate}% commission on every subscriber`
            : 'Your application is under review. You will hear back within 48 hours.'}
        </div>
      </div>
      {isApproved && (
        <button
          onClick={() => router.push('/affiliate/dashboard')}
          style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', whiteSpace: 'nowrap' }}
        >
          View Dashboard →
        </button>
      )}
    </div>
  )
}

export default function AccountPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [user,         setUser]         = useState(null)
  const [sub,          setSub]          = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [portalLoading, setPortalLoad]  = useState(false)
  const [upgradeLoad,  setUpgradeLoad]  = useState(null)
  const [error,        setError]        = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      setUser(user)
      fetch('/api/subscription')
        .then(r => r.json())
        .then(d => { if (d.status === 'success') setSub(d) })
        .finally(() => setLoading(false))
    })
  }, [])

  const openBillingPortal = async () => {
    setPortalLoad(true)
    setError('')
    try {
      const res  = await fetch('/api/billing-portal', { method: 'POST' })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else setError(data?.error || 'Could not open billing portal')
    } catch {
      setError('Connection error')
    } finally {
      setPortalLoad(false)
    }
  }

  const handleUpgrade = async (tier) => {
    setUpgradeLoad(tier)
    setError('')
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else setError(data?.error || 'Could not start checkout')
    } catch {
      setError('Connection error')
    } finally {
      setUpgradeLoad(null)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.secondary, fontFamily: 'system-ui, sans-serif' }}>
      Loading…
    </div>
  )

  const tierColor = TIER_COLORS[sub?.tier] || C.muted
  const periodEnd = sub?.periodEnd ? new Date(sub.periodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.deep }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>
          PROMPT CEO
        </button>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => router.push('/prompt-engine-v3')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Open App</button>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer' }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 6px' }}>My Account</h1>
          <div style={{ fontSize: 13, color: C.secondary }}>{user?.email}</div>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 6, background: C.redGlow, border: `1px solid ${C.red}`, color: C.red, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Current Plan */}
        <div style={{ borderRadius: 10, border: `1px solid ${sub?.active ? tierColor + '44' : C.hairline}`, background: sub?.active ? tierColor + '08' : C.surface, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Current Plan</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: tierColor }}>{sub?.tierLabel || 'Free'}</span>
                <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: sub?.active ? tierColor + '22' : C.subtle, border: `1px solid ${sub?.active ? tierColor + '44' : C.hairline}`, color: sub?.active ? tierColor : C.muted }}>
                  {sub?.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {periodEnd && <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>Renews {periodEnd}</div>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {sub?.active && !sub?.isAdmin && (
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  style={{ padding: '8px 16px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary, opacity: portalLoading ? 0.6 : 1 }}
                >
                  {portalLoading ? '…' : 'Manage Billing'}
                </button>
              )}
              {!sub?.active && (
                <button onClick={() => router.push('/pricing')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>

          {/* Usage bars */}
          {!sub?.isAdmin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Images */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 0.5, textTransform: 'uppercase' }}>Image Generations</span>
                  <span style={{ fontSize: 11, color: C.secondary }}>{sub?.imagesUsed || 0} / {sub?.imagesLimit || 0} used</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: C.subtle, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: tierColor, width: `${Math.min(100, ((sub?.imagesUsed || 0) / (sub?.imagesLimit || 1)) * 100)}%`, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub?.imagesRemaining || 0} remaining this period</div>
              </div>

              {/* Music */}
              {(sub?.musicLimit || 0) > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 0.5, textTransform: 'uppercase' }}>Music Licenses</span>
                    <span style={{ fontSize: 11, color: C.secondary }}>{sub?.musicUsed || 0} / {sub?.musicLimit || 0} used</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: C.subtle, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: C.gold, width: `${Math.min(100, ((sub?.musicUsed || 0) / (sub?.musicLimit || 1)) * 100)}%`, transition: 'width 0.3s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub?.musicRemaining || 0} remaining this period</div>
                </div>
              )}
            </div>
          )}

          {sub?.isAdmin && (
            <div style={{ padding: '12px 16px', borderRadius: 6, background: C.violetGlow, border: `1px solid ${C.violetDim}` }}>
              <span style={{ fontSize: 12, color: C.violet, fontWeight: 700 }}>⚡ Admin account — unlimited access to everything</span>
            </div>
          )}
        </div>

        {/* Upgrade options — shown when on a lower tier */}
        {sub?.active && !sub?.isAdmin && sub?.tier !== 'agency' && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Upgrade Your Plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: 'studio_pro', label: 'Studio Pro',  price: '$49/mo', desc: '150 images/month + Photographer Brief + Character DNA',      color: C.green,  show: ['free','creator'] },
                { id: 'pro',        label: 'Pro',          price: '$79/mo', desc: 'Full Ad Studio + 100 images + Client sharing + Brand Voice', color: C.gold,   show: ['free','creator','studio_pro'] },
                { id: 'agency',     label: 'Agency',       price: '$179/mo', desc: '300 images + 10 music licenses + Webhooks + Briefs',        color: C.violet, show: ['free','creator','studio_pro','pro'] },
              ].filter(p => p.show.includes(sub?.tier)).map(plan => (
                <div key={plan.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 8, border: `1px solid ${plan.color}33`, background: plan.color + '08', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: plan.color }}>{plan.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.secondary }}>{plan.price}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{plan.desc}</div>
                  </div>
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={upgradeLoad === plan.id}
                    style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${plan.color}`, background: plan.color + '22', color: plan.color, opacity: upgradeLoad === plan.id ? 0.6 : 1, whiteSpace: 'nowrap' }}
                  >
                    {upgradeLoad === plan.id ? '…' : `Upgrade to ${plan.label}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Music Add-on */}
        {!sub?.musicAddon && sub?.active && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 4 }}>🎵 Music Add-on — $9/month</div>
              <div style={{ fontSize: 12, color: C.secondary }}>Unlimited access to 400+ original tracks licensed for commercial use</div>
            </div>
            <button
              onClick={() => handleUpgrade('music_addon')}
              disabled={upgradeLoad === 'music_addon'}
              style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', opacity: upgradeLoad === 'music_addon' ? 0.6 : 1, whiteSpace: 'nowrap' }}
            >
              {upgradeLoad === 'music_addon' ? '…' : 'Add Music'}
            </button>
          </div>
        )}

        {/* Affiliate dashboard link */}
        <AffiliateLink router={router} email={user?.email} />

        {/* Become a Partner banner — only shown if not already an affiliate */}
        {!sub?.isAdmin && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.green}33`, background: C.greenGlow, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.green, marginBottom: 6 }}>💰 Earn with Prompt CEO</div>
              <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, maxWidth: 440 }}>
                Share your referral link. Earn 30–40% recurring commission every month — for life — on every subscriber you refer. Join the Creator Partner program.
              </div>
            </div>
            <button
              onClick={() => router.push('/partner')}
              style={{ padding: '10px 20px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green, whiteSpace: 'nowrap' }}
            >
              Become a Partner →
            </button>
          </div>
        )}

        {/* Quick links */}
        <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Quick Links</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { label: '🎬 Open App',        action: () => router.push('/prompt-engine-v3') },
              { label: '📋 View Pricing',     action: () => router.push('/pricing') },
              { label: '❓ Help & Tutorials', action: () => router.push('/tutorials') },
            ].map(link => (
              <button key={link.label} onClick={link.action} style={{ padding: '10px 14px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, color: C.secondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
            Sign out of {user?.email}
          </button>
        </div>

      </div>
    </div>
  )
}
