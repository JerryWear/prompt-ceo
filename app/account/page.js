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

function AdminPanel() {
  const [stats,      setStats]      = useState(null)
  const [affiliates, setAffiliates] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [acting,     setActing]     = useState(null)
  const [showAll,    setShowAll]    = useState(false)

  const loadData = () => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setStats(d.stats) })
      .finally(() => setLoading(false))
    fetch('/api/admin/affiliates')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setAffiliates(d.affiliates || []) })
  }

  useEffect(() => { loadData() }, [])

  const handleAffiliate = async (id, action) => {
    setActing(id)
    try {
      const res  = await fetch('/api/admin/affiliates', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      const data = await res.json()
      if (data.status === 'success') loadData()
    } finally {
      setActing(null)
    }
  }

  if (loading) return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px', color: C.muted, fontSize: 12 }}>
      Loading admin stats…
    </div>
  )

  if (!stats) return null

  const TIER_LABELS = { creator: 'Creator ($29)', studio_pro: 'Studio Pro ($49)', pro: 'Pro ($79)', agency: 'Agency ($179)' }

  return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.violetDim}`, background: C.violetGlow, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.violetDim}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: C.violet }}>⚡ Admin Overview</span>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
          {[
            { label: 'Total Members',      value: stats.totalUsers,      color: C.primary },
            { label: 'Active Subscribers', value: stats.totalActive,     color: C.green   },
            { label: 'Monthly Revenue',    value: `$${stats.monthlyRevenue.toLocaleString()}`, color: C.gold },
            { label: 'Music Add-ons',      value: stats.musicAddonCount, color: C.gold    },
          ].map(m => (
            <div key={m.label} style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: m.color, letterSpacing: -1 }}>{m.value}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3, letterSpacing: 0.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Subscribers by tier */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Subscribers by Tier</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(stats.tiers).map(([tier, count]) => (
              <div key={tier} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                <span style={{ fontSize: 12, color: C.secondary }}>{TIER_LABELS[tier]}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: count > 0 ? C.primary : C.muted }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate stats */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Affiliate Program</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Pending Applications', value: stats.affiliates.pending, color: C.gold   },
              { label: 'Active Partners',      value: stats.affiliates.active,  color: C.green  },
              { label: 'Total Commissions',    value: `$${stats.affiliates.totalCommissions}`, color: C.primary },
              { label: 'Paid Out',             value: `$${stats.affiliates.paidCommissions}`,  color: C.muted   },
            ].map(m => (
              <div key={m.label} style={{ padding: '10px 12px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </div>
          {stats.affiliates.pending > 0 && (
            <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 6, background: '#1a1408', border: `1px solid ${C.goldDim}`, fontSize: 11, color: C.gold }}>
              ⚠ {stats.affiliates.pending} affiliate application{stats.affiliates.pending !== 1 ? 's' : ''} waiting for review in Supabase → affiliates table
            </div>
          )}
        </div>

        {/* Recent signups */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Recent Signups</div>
          <div style={{ borderRadius: 8, border: `1px solid ${C.hairline}`, overflow: 'hidden' }}>
            {(stats.recentUsers || []).map((u, i) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', background: i % 2 === 0 ? C.base : C.void }}>
                <span style={{ fontSize: 12, color: C.secondary }}>{u.email}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {u.subscription_status === 'active' && (
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: C.greenGlow, border: `1px solid ${C.greenDim}`, color: C.green }}>
                      {u.subscription_tier}
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: C.muted }}>{new Date(u.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate management */}
        {affiliates.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted }}>Affiliate Applications</div>
              <button onClick={() => setShowAll(v => !v)} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 11, cursor: 'pointer' }}>
                {showAll ? 'Show pending only' : `Show all (${affiliates.length})`}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {affiliates
                .filter(a => showAll || a.status === 'pending')
                .map(a => (
                  <div key={a.id} style={{ borderRadius: 8, border: `1px solid ${a.status === 'pending' ? C.goldDim : C.hairline}`, background: a.status === 'pending' ? '#0f0d04' : C.base, padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{a.full_name}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                            background: a.status === 'pending' ? '#1a1408' : a.status === 'approved' || a.status === 'active' ? C.greenGlow : C.surface,
                            border: `1px solid ${a.status === 'pending' ? C.goldDim : a.status === 'approved' || a.status === 'active' ? C.greenDim : C.hairline}`,
                            color: a.status === 'pending' ? C.gold : a.status === 'approved' || a.status === 'active' ? C.green : C.muted,
                          }}>
                            {a.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: C.secondary }}>{a.email}</div>
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{a.platform}{a.audience_size ? ` · ${a.audience_size}` : ''}</div>
                        {a.message && <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontStyle: 'italic', lineHeight: 1.5 }}>"{a.message}"</div>}
                      </div>
                      {a.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button
                            onClick={() => handleAffiliate(a.id, 'approve')}
                            disabled={acting === a.id}
                            style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green, opacity: acting === a.id ? 0.6 : 1 }}
                          >
                            {acting === a.id ? '…' : '✓ Approve'}
                          </button>
                          <button
                            onClick={() => handleAffiliate(a.id, 'reject')}
                            disabled={acting === a.id}
                            style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.muted, opacity: acting === a.id ? 0.6 : 1 }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {(a.status === 'approved' || a.status === 'active') && (
                        <div style={{ fontSize: 10, color: C.muted }}>
                          {a.total_clicks} clicks · {a.total_signups} signups · ${Number(a.total_earned || 0).toFixed(2)} earned
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              {!showAll && affiliates.filter(a => a.status === 'pending').length === 0 && (
                <div style={{ fontSize: 12, color: C.muted, padding: '8px 0' }}>No pending applications.</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
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

        {/* Admin panel — only for admins */}
        {sub?.isAdmin && <AdminPanel />}

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
