'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

const C = {
  void:     '#040404', deep:     '#070707', base:     '#0a0a0a',
  raised:   '#0d0d0d', surface:  '#111111', hairline: '#1a1a1a',
  subtle:   '#222222', primary:  '#e8e4dc', secondary:'#8a8680',
  muted:    '#4a4845', gold:     '#c8a84b', goldDim:  '#7a6428',
  goldGlow: '#c8a84b18', blue:   '#4a8ab4', blueDim:  '#1a3a5a',
  blueGlow: '#4a8ab418', green:  '#4a9a6a', greenDim: '#1a3a2a',
  greenGlow:'#4a9a6a18', violet: '#9b6fd4', violetDim:'#4a2a7a',
  violetGlow:'#9b6fd418',
}

const QUICK_ACTIONS = [
  { icon: '🪝', label: 'Generate Hooks',      desc: 'Start with 50+ hooks for your product',  tab: 'ad_studio', adTab: 'hooks',     color: C.gold   },
  { icon: '📄', label: 'Landing Page',         desc: 'Full conversion page in your brand voice', tab: 'ad_studio', adTab: 'landing',   color: C.violet },
  { icon: '✉',  label: 'Email Sequence',       desc: '5-email sequence launch-ready',           tab: 'ad_studio', adTab: 'email',     color: C.blue   },
  { icon: '🎬', label: 'Cinematic Studio',     desc: '20+ worlds · 11 directors · Your face',  tab: 'studio',    adTab: null,        color: C.gold   },
  { icon: '🎯', label: 'Retargeting Pack',     desc: '4 ads for every warm audience stage',     tab: 'ad_studio', adTab: 'retarget',  color: C.green  },
  { icon: '📊', label: 'Ad Account Audit',     desc: 'Paste data → get creative action plan',   tab: 'ad_studio', adTab: 'audit',     color: '#cf6a6a'},
  { icon: '📡', label: 'Trend Intelligence',   desc: 'What hook formats are winning right now',  tab: 'ad_studio', adTab: 'trends',    color: C.violet },
  { icon: '🚀', label: 'Launch Package',       desc: 'Meta + TikTok Ads Manager formatted',     tab: 'ad_studio', adTab: 'deploy',    color: C.green  },
]

export default function DashboardPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [user,         setUser]         = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [projects,     setProjects]     = useState([])
  const [credits,      setCredits]      = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [hooksLibrary, setHooksLibrary] = useState([])
  const [music,        setMusic]        = useState([])
  const [perfSummary,  setPerfSummary]  = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      setUser(user)
      fetchAll()
    })
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [projRes, credRes, subRes, hooksRes, perfRes] = await Promise.all([
        fetch('/api/load-ad-projects'),
        fetch('/api/get-credits'),
        fetch('/api/subscription'),
        fetch('/api/hooks-library?limit=5'),
        fetch('/api/performance-logs?type=hook&limit=20'),
      ])
      const [pData, cData, sData, hData, perf] = await Promise.all([
        projRes.json(), credRes.json(), subRes.json(), hooksRes.json(), perfRes.json()
      ])
      if (pData.status === 'success') setProjects(pData.projects || [])
      if (typeof cData.credits === 'number') setCredits(cData.credits)
      if (sData.status === 'success') setSubscription(sData)
      if (hData.status === 'success') setHooksLibrary(hData.hooks || [])
      if (perf.status === 'success') setPerfSummary(perf.summary)

      const musicRes = await supabase.from('music_licenses').select('id, created_at').limit(5)
      if (!musicRes.error) setMusic(musicRes.data || [])
    } catch {}
    finally { setLoading(false) }
  }

  const goTo = (tab, adTab) => {
    if (tab === 'studio') { router.push('/prompt-engine-v3'); return }
    if (adTab) {
      window.__adStudioInitTab = adTab
      router.push('/prompt-engine-v3?view=ad_studio')
    } else {
      router.push('/prompt-engine-v3?view=ad_studio')
    }
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const isNewUser = projects.length === 0 && hooksLibrary.length === 0
  const planLabel = subscription?.tierLabel || 'Free'
  const planColor = subscription?.tier === 'agency' ? C.violet : subscription?.tier === 'pro' ? C.gold : subscription?.tier === 'studio_pro' ? C.green : subscription?.active ? C.blue : C.muted

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 14, color: C.gold, fontWeight: 700 }}>Loading…</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>

      {/* Nav */}
      <div style={{ padding: '14px 24px', borderBottom: `1px solid ${C.hairline}`, background: C.deep, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>PROMPT CEO</div>
          <div style={{ fontSize: 9, color: C.muted, padding: '2px 8px', borderRadius: 3, border: `1px solid ${C.hairline}` }}>Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => router.push('/prompt-engine-v3')} style={{ padding: '7px 14px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
            Studio
          </button>
          <button onClick={() => router.push('/prompt-engine-v3?view=ad_studio')} style={{ padding: '7px 14px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            Ad Studio →
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Welcome */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
              {isNewUser ? `Welcome, ${firstName}. Let's build something.` : `Good to have you back, ${firstName}.`}
            </h1>
            <div style={{ fontSize: 13, color: C.secondary, marginTop: 4 }}>
              {isNewUser ? 'Pick an action below to generate your first campaign.' : `${projects.length} saved project${projects.length !== 1 ? 's' : ''} · ${hooksLibrary.length} saved hooks`}
            </div>
          </div>
          {/* Plan badge */}
          <div style={{ padding: '8px 16px', borderRadius: 6, border: `1px solid ${planColor}44`, background: planColor + '12', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: planColor }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: planColor }}>{planLabel} Plan</div>
            {subscription?.active && subscription?.periodEnd && (
              <div style={{ fontSize: 10, color: C.muted }}>· renews {new Date(subscription.periodEnd).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</div>
            )}
            {!subscription?.active && (
              <button onClick={() => router.push('/pricing')} style={{ fontSize: 10, fontWeight: 700, color: C.gold, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Upgrade →</button>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
          {[
            { label: 'Credits',          value: credits !== null ? credits : '—',                     color: C.gold,   sub: 'remaining' },
            { label: 'Images',           value: subscription ? `${subscription.imagesRemaining ?? '—'}` : '—', color: C.blue,  sub: 'remaining this month' },
            { label: 'Saved Projects',   value: projects.length,                                      color: C.green,  sub: 'campaigns' },
            { label: 'Saved Hooks',      value: hooksLibrary.length,                                  color: C.violet, sub: 'in swipe file' },
            { label: 'Music Licenses',   value: music.length,                                         color: C.gold,   sub: 'tracks licensed' },
            { label: 'Avg CTR',          value: perfSummary?.avgCTR ? `${perfSummary.avgCTR}%` : '—', color: C.green,  sub: 'from logged tests' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '14px 16px', borderRadius: 8, border: `1px solid ${stat.color}22`, background: stat.color + '08' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: -0.5 }}>{stat.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginTop: 5 }}>{stat.label}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
            {isNewUser ? '👋 Start here — pick anything' : 'Quick Actions'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {QUICK_ACTIONS.map(action => (
              <button key={action.label} onClick={() => goTo(action.tab, action.adTab)}
                style={{ padding: '16px', borderRadius: 10, cursor: 'pointer', textAlign: 'left', border: `1px solid ${action.color}22`, background: action.color + '08', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = action.color + '66'; e.currentTarget.style.background = action.color + '14'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = action.color + '22'; e.currentTarget.style.background = action.color + '08'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{action.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{action.label}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{action.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Recent Projects */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Recent Projects</div>
            {projects.length === 0 ? (
              <div style={{ padding: '28px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>No saved projects yet.<br />Generate your first campaign and save it.</div>
                <button onClick={() => goTo('ad_studio', 'creative')} style={{ marginTop: 12, padding: '8px 20px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: C.goldGlow, color: C.gold }}>
                  Start a Campaign →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {projects.slice(0, 5).map(p => (
                  <button key={p.id} onClick={() => goTo('ad_studio', 'creative')}
                    style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.goldDim}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.hairline}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.name || p.product_name || 'Untitled Project'}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      {p.created_at ? new Date(p.created_at).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      {p.outputs && ` · ${Object.keys(p.outputs).length} outputs`}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swipe File + Performance */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Top saved hooks */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Your Hook Swipe File</div>
              {hooksLibrary.length === 0 ? (
                <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>🔖</div>
                  <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6 }}>No hooks saved yet.<br />Tap 🔖 on any hook to save it here.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {hooksLibrary.slice(0, 3).map((h, i) => (
                    <div key={h.id || i} style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.goldDim}`, background: C.goldGlow }}>
                      <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.5, fontStyle: 'italic' }}>"{h.hook_text?.slice(0, 80)}{h.hook_text?.length > 80 ? '…' : ''}"</div>
                      {h.platform && h.platform !== 'all' && <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>{h.platform}</div>}
                    </div>
                  ))}
                  {hooksLibrary.length > 3 && (
                    <button onClick={() => goTo('ad_studio', 'swipe')} style={{ fontSize: 11, color: C.gold, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}>
                      View all {hooksLibrary.length} saved hooks →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Performance summary */}
            {perfSummary && perfSummary.totalLogs > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Your Performance Patterns</div>
                <div style={{ padding: '14px', borderRadius: 10, border: `1px solid ${C.greenDim}`, background: C.greenGlow }}>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{perfSummary.totalLogs}</div>
                      <div style={{ fontSize: 9, color: C.muted }}>Tests logged</div>
                    </div>
                    {perfSummary.avgCTR && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{perfSummary.avgCTR}%</div>
                        <div style={{ fontSize: 9, color: C.muted }}>Avg CTR</div>
                      </div>
                    )}
                  </div>
                  {perfSummary.typeInsights?.[0] && (
                    <div style={{ fontSize: 11, color: C.secondary }}>
                      Best hook type: <span style={{ color: C.green, fontWeight: 700, textTransform: 'capitalize' }}>{perfSummary.typeInsights[0].type}</span>
                      {perfSummary.typeInsights[0].avgCTR && ` at ${perfSummary.typeInsights[0].avgCTR}% CTR`}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What to do next */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Suggested Next Step</div>
              <div style={{ padding: '14px', borderRadius: 10, border: `1px solid ${C.violetDim}`, background: C.violetGlow }}>
                {isNewUser ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.violet, marginBottom: 6 }}>Start with hooks</div>
                    <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, marginBottom: 10 }}>Enter your product name in Ad Studio → Click "Build Full Ad Project" → Get hooks, captions, and UGC scripts in 60 seconds.</div>
                    <button onClick={() => goTo('ad_studio', 'creative')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: 'none', color: C.violet }}>
                      Start now →
                    </button>
                  </>
                ) : hooksLibrary.length === 0 ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.violet, marginBottom: 6 }}>Save your best hooks</div>
                    <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, marginBottom: 10 }}>Go to Hooks tab → tap 🔖 on your strongest hooks → they appear in your Swipe File for reuse across campaigns.</div>
                    <button onClick={() => goTo('ad_studio', 'hooks')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: 'none', color: C.violet }}>
                      Go to Hooks →
                    </button>
                  </>
                ) : perfSummary?.totalLogs === 0 || !perfSummary ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.violet, marginBottom: 6 }}>Log your first CTR result</div>
                    <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, marginBottom: 10 }}>Once you run a hook, log the CTR with the 📊 button. The app learns which hook types work best for your audience.</div>
                    <button onClick={() => goTo('ad_studio', 'score')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: 'none', color: C.violet }}>
                      Go to Score →
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.violet, marginBottom: 6 }}>Try Trend Intelligence</div>
                    <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, marginBottom: 10 }}>See what hook formats are winning on your platform right now — before your competitors discover them.</div>
                    <button onClick={() => goTo('ad_studio', 'trends')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: 'none', color: C.violet }}>
                      Get Trends →
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
