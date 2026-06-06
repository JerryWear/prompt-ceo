'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  void:     '#020202', deep:    '#050505', base:      '#080808',
  surface:  '#0d0d0d', raised:  '#111111', border:    '#1a1a1a',
  subtle:   '#222222', primary: '#ede9e1', secondary: '#ccc8c2',
  muted:    '#9e9a96', ghost:   '#6e6a66',
  gold:     '#c8a84b', goldDim: '#1a1408', goldGlow:  'rgba(200,168,75,0.12)',
  blue:     '#4a8ab4', violet:  '#9b6fd4', green:     '#4a9a6a',
}

const NAV_LINKS = [
  { label: 'Dashboard',   href: '/dashboard' },
  { label: 'Studio',      href: '/prompt-engine-v3' },
  { label: 'Ad Studio',   href: '/prompt-engine-v3?view=ad_studio' },
  { label: 'Edit Studio', href: '/edit-studio/v2' },
  { label: 'Brands',      href: '/brands', active: true },
]

function fmtDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BrandsPage() {
  const router = useRouter()
  const [brands, setBrands]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [authed, setAuthed]     = useState(false)

  useEffect(() => {
    fetch('/api/brand-profiles')
      .then(r => {
        if (r.status === 401) { setAuthed(false); setLoading(false); return null }
        setAuthed(true)
        return r.json()
      })
      .then(data => {
        if (Array.isArray(data)) setBrands(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ background: C.void, minHeight: '100vh', color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: `1px solid ${C.border}`,
        background: `${C.void}ee`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, gap: 24, flexShrink: 0,
      }}>
        <a href="/dashboard" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: C.gold, textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0 }}>
          PromptCEO
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(({ label, href, active }) => (
            <a key={label} href={href} style={{
              fontSize: 12, fontWeight: active ? 600 : 400,
              color: active ? C.primary : C.ghost,
              textDecoration: 'none', padding: '5px 10px', borderRadius: 6,
              background: active ? '#161616' : 'transparent',
            }}>{label}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <a href="/account" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 12px' }}>
          Account
        </a>
      </div>

      {/* ── Page body ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '52px 24px 80px', animation: 'fadeUp 0.4s ease both' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <a href="/dashboard" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            ← Dashboard
          </a>
          <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: -0.5, color: C.primary, marginBottom: 8 }}>
            Brand Profiles
          </div>
          <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
            Your brand DNA — audience, voice, positioning, and visual identity — injected into every campaign.
          </div>
        </div>

        {/* Brand list or states */}
        {loading ? (
          <div style={{ color: C.ghost, fontSize: 13 }}>Loading…</div>
        ) : !authed ? (
          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Sign in to manage your brand profiles.</div>
            <a href="/prompt-engine-v3/login" style={{ padding: '10px 24px', borderRadius: 8, background: C.goldDim, border: `1px solid ${C.gold}44`, color: C.gold, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </a>
          </div>
        ) : brands.length === 0 ? (
          // Empty state — no brands yet
          <div style={{ padding: '48px 32px', borderRadius: 12, border: `1px dashed ${C.border}`, textAlign: 'center', background: C.surface }}>
            <div style={{ fontSize: 24, marginBottom: 16, color: C.ghost }}>◈</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.primary, marginBottom: 8 }}>No brand profiles yet</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, maxWidth: 360, margin: '0 auto 24px' }}>
              Build your first brand profile from the Ad Studio. Once created, your brand DNA is automatically injected into every ad, campaign, and creative.
            </div>
            <a
              href="/prompt-engine-v3?view=ad_studio"
              style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 8, background: C.goldDim, border: `1px solid ${C.gold}44`, color: C.gold, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              Open Ad Studio →
            </a>
          </div>
        ) : (
          // Brand cards
          <div style={{ display: 'grid', gap: 12 }}>
            {brands.map(brand => (
              <div key={brand.id} style={{
                padding: '20px 24px', borderRadius: 10,
                border: `1px solid ${C.border}`, background: C.surface,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: C.gold }}>◈</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.primary }}>{brand.name || 'Unnamed Brand'}</span>
                    {brand.industry && (
                      <span style={{ fontSize: 10, color: C.ghost, padding: '2px 7px', borderRadius: 4, border: `1px solid ${C.border}`, background: C.raised }}>
                        {brand.industry}
                      </span>
                    )}
                  </div>
                  {brand.target_audience && (
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>
                      <span style={{ color: C.ghost }}>Audience: </span>{brand.target_audience}
                    </div>
                  )}
                  {brand.brand_voice && (
                    <div style={{ fontSize: 12, color: C.muted }}>
                      <span style={{ color: C.ghost }}>Voice: </span>{brand.brand_voice}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 11, color: C.ghost, flexShrink: 0, textAlign: 'right' }}>
                  {brand.last_used_at ? `Used ${fmtDate(brand.last_used_at)}` : fmtDate(brand.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming soon section */}
        <div style={{ marginTop: 52, padding: '28px 32px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.ghost, textTransform: 'uppercase', marginBottom: 16 }}>
            Coming to Brand Profiles
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '◈', label: 'Brand DNA Editor',      desc: 'Deep audience, voice, and visual identity settings' },
              { icon: '▣', label: 'Campaign Memory',        desc: 'What worked, what didn't — applied to every new campaign' },
              { icon: '✦', label: 'Jarvis Brand Context',   desc: 'AI Director that knows your brand before you brief it' },
              { icon: '◧', label: 'Multi-Brand Workspace',  desc: 'Agency mode — manage client brands separately' },
            ].map(item => (
              <div key={item.label} style={{ padding: '14px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: C.ghost }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.secondary }}>{item.label}</span>
                </div>
                <div style={{ fontSize: 12, color: C.ghost, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
