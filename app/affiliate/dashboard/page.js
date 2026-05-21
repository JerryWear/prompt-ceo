'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueGlow: '#4a8ab418',
  red:       '#cf6a6a',
}

const TIER_LABELS = {
  partner:       { label: 'Partner',      color: C.blue,   rate: '30%' },
  pro_partner:   { label: 'Pro Partner',  color: C.gold,   rate: '35%' },
  elite_partner: { label: 'Elite Partner', color: C.violet, rate: '40%' },
}

function StatCard({ label, value, sub, color = C.gold }) {
  return (
    <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${color}33`, background: color + '08' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: -1, marginBottom: 2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.muted }}>{sub}</div>}
    </div>
  )
}

export default function AffiliateDashboard() {
  const router   = useRouter()
  const supabase = createClient()

  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      fetch('/api/affiliate/dashboard')
        .then(r => r.json())
        .then(d => {
          if (d.status === 'success') setData(d)
          else if (d.status === 'not_found') setError('not_found')
          else setError(d.error || 'Failed to load')
        })
        .finally(() => setLoading(false))
    })
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(data?.affiliate?.referralLink || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.secondary, fontFamily: 'system-ui, sans-serif' }}>
      Loading…
    </div>
  )

  if (error === 'not_found') return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>🤝</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 8 }}>You are not a partner yet</div>
      <div style={{ fontSize: 14, color: C.secondary, marginBottom: 24 }}>Apply to the Creator Partner program to get your referral link and start earning.</div>
      <button onClick={() => router.push('/partner')} style={{ padding: '12px 28px', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
        Apply Now →
      </button>
    </div>
  )

  const aff  = data?.affiliate
  const tier = TIER_LABELS[aff?.tier] || TIER_LABELS.partner

  if (aff?.affiliateStatus === 'pending' || aff?.affiliateStatus === 'rejected') return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 8 }}>Application under review</div>
      <div style={{ fontSize: 14, color: C.secondary }}>We review every application within 48 hours. You will receive an email when approved.</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.deep }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>PROMPT CEO</button>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => router.push('/account')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Account</button>
          <button onClick={() => router.push('/prompt-engine-v3')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Open App</button>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 6px' }}>Partner Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: C.secondary }}>Welcome, {aff?.name}</span>
              <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: tier.color + '22', border: `1px solid ${tier.color}44`, color: tier.color }}>
                {tier.label} · {tier.rate} commission
              </span>
            </div>
          </div>
        </div>

        {/* Referral link */}
        <div style={{ borderRadius: 10, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>Your Referral Link</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ flex: 1, padding: '10px 14px', borderRadius: 5, background: C.surface, border: `1px solid ${C.hairline}`, fontSize: 13, color: C.primary, fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {aff?.referralLink}
            </code>
            <button onClick={copyLink} style={{ padding: '10px 20px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: copied ? C.gold : C.goldGlow, color: copied ? '#000' : C.gold, whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
              {copied ? '✓ Copied' : 'Copy Link'}
            </button>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
            Share this link. Anyone who subscribes through it earns you {tier.rate} every month — forever.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          <StatCard label="Total Clicks"    value={aff?.totalClicks || 0}    color={C.blue}   />
          <StatCard label="Signups"         value={aff?.totalSignups || 0}   color={C.green}  />
          <StatCard label="Active Subs"     value={aff?.totalActive || 0}    color={C.violet} />
          <StatCard label="Total Earned"    value={`$${Number(aff?.totalEarned || 0).toFixed(2)}`}  color={C.gold} />
          <StatCard label="Pending Payout"  value={`$${aff?.pendingPayout || '0.00'}`} sub="Paid monthly" color={C.green} />
          <StatCard label="Total Paid"      value={`$${Number(aff?.totalPaid || 0).toFixed(2)}`} color={C.muted} />
        </div>

        {/* Tier progress */}
        {aff?.tier !== 'elite_partner' && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Tier Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {aff?.tier === 'partner' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: C.secondary }}>Pro Partner (35%) — 10 active referrals needed</span>
                    <span style={{ fontSize: 12, color: C.gold }}>{aff?.totalActive || 0} / 10</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: C.subtle }}>
                    <div style={{ height: '100%', borderRadius: 999, background: C.gold, width: `${Math.min(100, ((aff?.totalActive || 0) / 10) * 100)}%` }} />
                  </div>
                </div>
              )}
              {(aff?.tier === 'partner' || aff?.tier === 'pro_partner') && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: C.secondary }}>Elite Partner (40%) — 50 active referrals needed</span>
                    <span style={{ fontSize: 12, color: C.violet }}>{aff?.totalActive || 0} / 50</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: C.subtle }}>
                    <div style={{ height: '100%', borderRadius: 999, background: C.violet, width: `${Math.min(100, ((aff?.totalActive || 0) / 50) * 100)}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Commission history */}
        <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>Commission History</div>
          </div>
          {(!data?.commissions || data.commissions.length === 0) ? (
            <div style={{ padding: '32px 24px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
              No commissions yet. Share your link to start earning.
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '10px 24px', background: C.deep, borderBottom: `1px solid ${C.hairline}` }}>
                {['Date', 'Amount', 'Commission', 'Status'].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted }}>{h}</div>
                ))}
              </div>
              {data.commissions.map((c, i) => (
                <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '12px 24px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none' }}>
                  <div style={{ fontSize: 12, color: C.secondary }}>{new Date(c.created_at).toLocaleDateString()}</div>
                  <div style={{ fontSize: 12, color: C.primary }}>${Number(c.amount_charged).toFixed(2)}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>${Number(c.commission_amount).toFixed(2)}</div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: c.status === 'paid' ? C.greenGlow : C.goldGlow, border: `1px solid ${c.status === 'paid' ? C.greenDim : C.goldDim}`, color: c.status === 'paid' ? C.green : C.gold }}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ fontSize: 11, color: C.muted, textAlign: 'center' }}>
          Payouts are processed monthly. Questions? <span style={{ color: C.secondary }}>partners@promptceo.io</span>
        </div>

      </div>
    </div>
  )
}
