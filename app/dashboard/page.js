'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  void:      '#020202',
  deep:      '#050505',
  base:      '#080808',
  surface:   '#0d0d0d',
  raised:    '#111111',
  border:    '#1a1a1a',
  subtle:    '#222222',
  primary:   '#ede9e1',
  secondary: '#ccc8c2',
  muted:     '#9e9a96',
  ghost:     '#6e6a66',
  hairline:  '#181818',
  gold:      '#c8a84b',
  goldDim:   '#1a1408',
  goldGlow:  'rgba(200,168,75,0.12)',
  blue:      '#4a8ab4',
  blueGlow:  'rgba(74,138,180,0.1)',
  violet:    '#9b6fd4',
  green:     '#4a9a6a',
  greenDim:  '#0a1a0f',
}

const TOOLS = [
  {
    id:    'ai_director',
    icon:  '✦',
    label: 'AI Director™',
    sub:   'Natural language command',
    desc:  'Type what you want to build. The Director routes to the right engine automatically.',
    color: C.gold,
    glow:  C.goldGlow,
    path:  '/prompt-engine-v3',
    query: 'ai_director',
  },
  {
    id:    'life_engine',
    icon:  '🌍',
    label: 'Life Engine™',
    sub:   '5 day types × 15 worlds',
    desc:  'Perfect Day, Travel World, Creator Day, Fitness Day, Ad Campaign Day. Same brain, different purpose.',
    color: '#7a6fcf',
    glow:  'rgba(122,111,207,0.1)',
    path:  '/full-day',
    query: null,
  },
  {
    id:    'full_campaign',
    icon:  '◈',
    label: 'Life Campaign™',
    sub:   '30 days · 5 phases',
    desc:  'Same world, same character, same timeline — engineered to sell. Awareness → Retargeting.',
    color: C.violet,
    glow:  'rgba(155,111,212,0.1)',
    path:  '/prompt-engine-v3',
    query: 'full_campaign',
  },
  {
    id:    'perfect_day',
    icon:  '☀',
    label: 'Perfect Day™',
    sub:   '14-moment cinematic arc',
    desc:  'Morning to midnight. 14 scenes, 14 hooks, 14 image prompts, 14 video prompts.',
    color: C.gold,
    glow:  C.goldGlow,
    path:  '/prompt-engine-v3',
    query: 'perfect_day',
  },
  {
    id:    'studio',
    icon:  '◧',
    label: 'Studio™',
    sub:   'Identity + cinematic images',
    desc:  'Scan your identity once. 15 worlds, 11 director styles, batch generation — all consistent.',
    color: C.blue,
    glow:  C.blueGlow,
    path:  '/prompt-engine-v3',
    query: 'studio',
  },
  {
    id:    'ad_studio',
    icon:  '▣',
    label: 'Ad Studio™',
    sub:   'Hooks, copy & campaigns',
    desc:  'Hooks across 5 types, CTR-scored. Angles, captions, video scripts, full funnel copy.',
    color: '#c87a4a',
    glow:  'rgba(200,122,74,0.1)',
    path:  '/prompt-engine-v3',
    query: 'ad_studio',
  },
  {
    id:    'instant',
    icon:  '⚡',
    label: 'Instant™',
    sub:   'Full campaign in 60 seconds',
    desc:  'Life Engine-powered image prompts + AI-generated hooks, captions and 30-day schedule.',
    color: C.green,
    glow:  'rgba(74,154,106,0.1)',
    path:  '/instant',
    query: null,
  },
]

const PROJECT_TYPE_COLOR = {
  campaign:  C.gold,
  creator:   C.blue,
  brand:     C.violet,
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const router   = useRouter()
  const supabase = createClient()

  const [user,          setUser]          = useState(null)
  const [brandProfiles, setBrandProfiles] = useState([])
  const [activeBrand,   setActiveBrand]   = useState(null)
  const [brandDropOpen, setBrandDropOpen] = useState(false)
  const [projects,      setProjects]      = useState([])
  const [stats,         setStats]         = useState(null)

  const [chatInput,     setChatInput]     = useState('')
  const [chatLoading,   setChatLoading]   = useState(false)
  const [chatResult,    setChatResult]    = useState(null)
  const [chatError,     setChatError]     = useState('')

  const chatRef = useRef(null)

  // ── Auth + data load ─────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.replace('/prompt-engine-v3/login'); return }
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/brand-profiles').then(r => r.json()),
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/generation-stats').then(r => r.json()).catch(() => null),
    ]).then(([brands, projectsData, statsData]) => {
      if (Array.isArray(brands) && brands.length > 0) {
        setBrandProfiles(brands)
        setActiveBrand(brands[0])
      }
      if (projectsData?.projects) setProjects(projectsData.projects.slice(0, 6))
      if (statsData) setStats(statsData)
    }).catch(() => {})
  }, [])

  // ── AI Chat ──────────────────────────────────────────────────────────────────
  const runChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    setChatLoading(true)
    setChatError('')
    setChatResult(null)
    try {
      const res = await fetch('/api/creative-conversation', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          message:      chatInput.trim(),
          brandProfile: activeBrand || null,
          parseOnly:    true,
        }),
      })
      const data = await res.json()
      if (data.error) { setChatError(data.error); setChatLoading(false); return }
      setChatResult(data)
      // Store intent for the destination page to pick up
      try { sessionStorage.setItem('promptceo_chat_intent', JSON.stringify({ ...data, originalMessage: chatInput.trim() })) } catch {}
      // Navigate to the right tool after a brief moment showing "understood"
      setTimeout(() => {
        const dest = data.output_type === 'perfect_day' ? 'perfect_day' : 'full_campaign'
        router.push(`/prompt-engine-v3?view=${dest}`)
      }, 1400)
    } catch (err) {
      setChatError(err.message || 'Something went wrong')
    }
    setChatLoading(false)
  }

  const openTool = (tool) => {
    if (tool.query) {
      router.push(`${tool.path}?view=${tool.query}`)
    } else {
      router.push(tool.path)
    }
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning.'
    if (h < 17) return 'Good afternoon.'
    return 'Good evening.'
  }

  return (
    <div style={{ background: C.void, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: C.primary }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: `1px solid ${C.border}`, background: `${C.void}ee`, backdropFilter: 'blur(12px)', padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, gap: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: C.gold, textTransform: 'uppercase', flexShrink: 0 }}>PromptCEO</div>
        <div style={{ flex: 1 }} />

        {/* Brand selector */}
        {brandProfiles.length > 0 && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setBrandDropOpen(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6, border: `1px solid ${activeBrand ? C.gold + '44' : C.border}`, background: activeBrand ? C.goldDim : C.surface, cursor: 'pointer', fontSize: 11, color: activeBrand ? C.gold : C.secondary, fontWeight: 600 }}
            >
              <span style={{ fontSize: 10 }}>◈</span>
              <span>{activeBrand?.name || 'No Brand'}</span>
              <span style={{ fontSize: 8, opacity: 0.5 }}>{brandDropOpen ? '▲' : '▾'}</span>
            </button>
            {brandDropOpen && (
              <>
                <div onClick={() => setBrandDropOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: C.raised, border: `1px solid ${C.border}`, borderRadius: 8, minWidth: 200, zIndex: 200, overflow: 'hidden', boxShadow: '0 12px 40px #00000099' }}>
                  <div style={{ padding: '6px 14px 4px', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.ghost, textTransform: 'uppercase' }}>Active Brand</div>
                  {[null, ...brandProfiles].map((b, i) => (
                    <div
                      key={b?.id || 'none'}
                      onClick={() => { setActiveBrand(b); setBrandDropOpen(false) }}
                      style={{ padding: '9px 14px', fontSize: 12, color: (b?.id || null) === (activeBrand?.id || null) ? C.gold : C.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, borderTop: i > 0 ? `1px solid ${C.border}` : 'none', background: (b?.id || null) === (activeBrand?.id || null) ? C.goldDim : 'transparent' }}
                    >
                      <span style={{ width: 12, fontSize: 9, color: C.gold }}>{(b?.id || null) === (activeBrand?.id || null) ? '✓' : ''}</span>
                      <div>
                        <div>{b?.name || 'No Brand Context'}</div>
                        {b?.target_audience && <div style={{ fontSize: 10, color: C.ghost, marginTop: 1 }}>{b.target_audience.slice(0, 48)}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <button onClick={() => router.push('/account')} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 12px', fontSize: 11, color: C.muted, cursor: 'pointer' }}>Account</button>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 0', animation: 'fadeUp 0.5s ease both' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: C.ghost, letterSpacing: 0.5 }}>{greeting()}</div>
        <div style={{ fontSize: 32, fontWeight: 300, color: C.primary, letterSpacing: -0.5, marginBottom: 28, lineHeight: 1.2 }}>
          What are you creating{activeBrand ? ` for ${activeBrand.name}` : ''}?
        </div>

        {/* AI chat input */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', padding: '6px 6px 6px 16px', borderRadius: 12, border: `1px solid ${chatInput.trim() ? C.gold + '44' : C.border}`, background: C.surface, transition: 'border-color 0.2s' }}>
            <span style={{ fontSize: 14, color: C.gold, display: 'flex', alignItems: 'center', flexShrink: 0 }}>✦</span>
            <input
              ref={chatRef}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runChat()}
              placeholder={activeBrand ? `Tell me what to create for ${activeBrand.name}…` : 'Tell me what to create — "A luxury campaign for my skincare brand targeting women 25–35"'}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.primary, fontSize: 14, padding: '8px 0', fontFamily: 'inherit' }}
            />
            <button
              onClick={runChat}
              disabled={!chatInput.trim() || chatLoading}
              style={{ padding: '10px 22px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: chatInput.trim() && !chatLoading ? 'pointer' : 'not-allowed', border: `1px solid ${chatInput.trim() ? C.gold : C.border}`, background: chatInput.trim() ? 'linear-gradient(180deg,#1a1408,#0e0b04)' : 'transparent', color: chatInput.trim() ? C.gold : C.ghost, flexShrink: 0, transition: 'all 0.15s' }}
            >
              {chatLoading ? <span style={{ display: 'inline-block', width: 14, height: 14, border: `2px solid ${C.gold}44`, borderTopColor: C.gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : 'Create →'}
            </button>
          </div>

          {chatResult && (
            <div style={{ marginTop: 8, padding: '9px 14px', borderRadius: 8, background: C.greenDim, border: `1px solid ${C.green}33`, fontSize: 12, color: C.green, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✓</span>
              <span>{chatResult.understood} — routing to {chatResult.output_type?.replace(/_/g, ' ')}…</span>
            </div>
          )}
          {chatError && (
            <div style={{ marginTop: 8, padding: '9px 14px', borderRadius: 8, background: '#110606', border: '1px solid #2a1010', fontSize: 12, color: '#f87171' }}>
              {chatError}
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: C.ghost, paddingLeft: 4 }}>or choose a tool below</div>
      </div>

      {/* ── Tool cards ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '36px auto 0', padding: '0 24px', animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {TOOLS.map(tool => (
            <ToolCard key={tool.id} tool={tool} onOpen={() => openTool(tool)} activeBrand={activeBrand} />
          ))}
        </div>
      </div>

      {/* ── Recent projects ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '40px auto 0', padding: '0 24px', animation: 'fadeUp 0.5s ease 0.2s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.ghost }}>Recent Work</div>
          <button onClick={() => router.push('/prompt-engine-v3')} style={{ background: 'none', border: 'none', fontSize: 11, color: C.muted, cursor: 'pointer' }}>View all →</button>
        </div>

        {projects.length === 0 ? (
          <div style={{ padding: '28px 20px', borderRadius: 10, border: `1px dashed ${C.border}`, textAlign: 'center', color: C.ghost, fontSize: 12 }}>
            No projects yet — create your first campaign above
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {projects.map(p => (
              <div
                key={p.id}
                onClick={() => router.push(`/prompt-engine-v3?projectId=${p.id}`)}
                style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.border}`, background: C.surface, cursor: 'pointer', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.subtle}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: PROJECT_TYPE_COLOR[p.type] || C.muted, flexShrink: 0 }} />
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: PROJECT_TYPE_COLOR[p.type] || C.ghost }}>{p.type}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, lineHeight: 1.4, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.ghost }}>{formatDate(p.updated_at || p.created_at)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      {stats && (
        <div style={{ maxWidth: 860, margin: '32px auto 0', padding: '0 24px', animation: 'fadeUp 0.5s ease 0.3s both' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              ['Campaigns', stats.campaigns || 0, C.gold],
              ['Images Generated', stats.images || 0, C.blue],
              ['Hooks Created', stats.hooks || 0, C.violet],
              ['Days Active', stats.daysActive || 0, C.green],
            ].map(([label, value, color]) => (
              <div key={label} style={{ flex: '1 1 120px', padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: 10, color: C.ghost, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 60 }} />
    </div>
  )
}

// ─── Tool card ────────────────────────────────────────────────────────────────
function ToolCard({ tool, onOpen, activeBrand }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ padding: '18px 18px 16px', borderRadius: 10, border: `1px solid ${hover ? tool.color + '44' : '#181818'}`, background: hover ? tool.glow : '#0a0a0a', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>{tool.icon}</span>
        <span style={{ fontSize: 10, color: hover ? tool.color : '#3a3835', transition: 'color 0.15s' }}>→</span>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: hover ? tool.color : '#ede9e1', transition: 'color 0.15s', marginBottom: 2 }}>{tool.label}</div>
        <div style={{ fontSize: 10, color: '#6e6a66', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{tool.sub}</div>
      </div>
      <div style={{ fontSize: 11, color: '#9e9a96', lineHeight: 1.6 }}>{tool.desc}</div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
