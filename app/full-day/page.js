'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  void:    '#040404',
  deep:    '#080808',
  surface: '#0e0e0e',
  raised:  '#141414',
  hairline:'#1e1e1e',
  subtle:  '#2a2a2a',
  primary: '#e8e4de',
  secondary:'#ccc8c2',
  muted:   '#9e9a96',
  ghost:   '#6e6a66',
  gold:    '#c8a84b',
  goldDim: '#7a6428',
  blue:    '#4a9eff',
  green:   '#4ecb71',
  violet:  '#a78bfa',
  tension: '#f97316',
  display: '"Georgia", serif',
  mono:    '"SF Mono", "Fira Code", monospace',
}

// ── Day type config ────────────────────────────────────────────────────────────
const DAY_TYPES = [
  { id: 'perfect_day',     label: 'Perfect Day',     icon: '☀', color: C.gold,   description: 'Believable full-day lifestyle story' },
  { id: 'travel_world',    label: 'Travel World',    icon: '✈', color: C.blue,   description: 'Cinematic luxury travel day' },
  { id: 'creator_day',     label: 'Creator Day',     icon: '◧', color: C.violet, description: 'Morning to night creator lifestyle' },
  { id: 'fitness_day',     label: 'Fitness Day',     icon: '⚡', color: C.green,  description: 'Transformation and wellness day' },
  { id: 'ad_campaign_day', label: 'Ad Campaign Day', icon: '◈', color: C.tension, description: 'Product story through a full day' },
]

const WORLDS = [
  { id: 'luxury_penthouse',   name: 'Luxury Penthouse' },
  { id: 'maldives_villa',     name: 'Maldives Villa' },
  { id: 'bali_villa',         name: 'Bali Villa' },
  { id: 'dubai_highrise',     name: 'Dubai High-Rise' },
  { id: 'paris_apartment',    name: 'Paris Apartment' },
  { id: 'greek_islands',      name: 'Greek Islands' },
  { id: 'miami_penthouse',    name: 'Miami Penthouse' },
  { id: 'coastal_house',      name: 'Coastal House' },
  { id: 'ski_chalet',         name: 'Ski Chalet' },
  { id: 'urban_apartment',    name: 'Urban Apartment' },
  { id: 'tokyo_apartment',    name: 'Tokyo Apartment' },
  { id: 'countryside_estate', name: 'Countryside Estate' },
  { id: 'monaco',             name: 'Monaco' },
  { id: 'amalfi',             name: 'Amalfi Coast' },
  { id: 'london_penthouse',   name: 'London Penthouse' },
]

const STYLES = [
  'cinematic', 'luxury', 'aspirational_lifestyle', 'dark_luxury',
  'soft_feminine', 'high_status', 'ugc', 'emotional', 'fitness_motivation', 'high_energy',
]

const PLATFORMS = ['instagram', 'tiktok', 'meta_ads', 'youtube', 'linkedin']

// ── Main component ─────────────────────────────────────────────────────────────
export default function FullDayPage() {
  const router   = useRouter()
  const supabase = createClient()

  // Auth
  const [user, setUser] = useState(null)

  // Identity
  const [identity, setIdentity] = useState(null) // { hasImage, imageDataUrl, identityName, traits }

  // Brand + creator profiles
  const [brandProfiles,   setBrandProfiles]   = useState([])
  const [creatorProfiles, setCreatorProfiles] = useState([])
  const [activeBrand,     setActiveBrand]     = useState(null)
  const [activeCreator,   setActiveCreator]   = useState(null)

  // Controls
  const [dayType,   setDayType]   = useState('perfect_day')
  const [worldId,   setWorldId]   = useState('luxury_penthouse')
  const [style,     setStyle]     = useState('cinematic')
  const [platform,  setPlatform]  = useState('instagram')

  // Generation
  const [result,    setResult]    = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  // Inline image generation per scene
  const [sceneImages,     setSceneImages]     = useState({})
  const [sceneGenerating, setSceneGenerating] = useState({})

  // Projects
  const [projects,       setProjects]       = useState([])
  const [saving,         setSaving]         = useState(false)
  const [savedId,        setSavedId]        = useState(null)
  const [showProjects,   setShowProjects]   = useState(false)
  const [expandedScene,  setExpandedScene]  = useState(null)

  // ── Auth + data load ─────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.replace('/prompt-engine-v3/login'); return }
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    // Load brand + creator profiles
    Promise.all([
      fetch('/api/brand-profiles').then(r => r.json()).catch(() => []),
      fetch('/api/creator-profiles').then(r => r.json()).catch(() => []),
      fetch('/api/full-day-projects').then(r => r.json()).catch(() => []),
    ]).then(([brands, creators, projs]) => {
      if (Array.isArray(brands))   { setBrandProfiles(brands);   if (brands[0])   setActiveBrand(brands[0]) }
      if (Array.isArray(creators)) { setCreatorProfiles(creators); if (creators[0]) setActiveCreator(creators[0]) }
      if (Array.isArray(projs))    setProjects(projs)
    })

    // Load identity from localStorage (shared with Studio)
    try {
      const stored = localStorage.getItem('promptceo_identity')
      if (stored) {
        const id = JSON.parse(stored)
        if (id?.imageDataUrl) setIdentity(id)
      }
    } catch {}
  }, [user])

  // ── Generate ─────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setError('')
    setResult(null)
    setSceneImages({})
    setSavedId(null)

    // Build creator profile with identity traits
    const creatorProfile = {
      ...(activeCreator || {}),
      ...(identity?.traits?.subjectA ? { physical_traits: identity.traits.subjectA } : {}),
      ...(identity?.identityName ? { name: identity.identityName } : {}),
    }

    try {
      // Route to the right API based on day type
      const endpoint = dayType === 'perfect_day' ? '/api/perfect-day'
        : '/api/full-day-generate'

      const isPerfectDay = dayType === 'perfect_day'
      const body = isPerfectDay
        ? { worldId, creatorProfile, brandProfile: activeBrand || null, style, platform, outputMode: 'both' }
        : { world: worldId, dayType, style, platform, creatorProfile, brandProfile: activeBrand || null }

      const res  = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setResult({ ...data, dayType, worldId, style, platform, isPerfectDay })
      setExpandedScene(0)
    } catch (err) {
      setError(err.message || 'Generation failed')
    }
    setLoading(false)
  }, [loading, dayType, worldId, style, platform, identity, activeCreator, activeBrand])

  // ── Inline scene image generation ────────────────────────────────────────
  const generateSceneImage = useCallback(async (prompt, idx) => {
    const key = `scene_${idx}`
    if (sceneGenerating[key]) return
    setSceneGenerating(p => ({ ...p, [key]: true }))
    try {
      const res  = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: 'studio_direct' }),
      })
      const data = await res.json()
      if (data.status === 'complete') {
        setSceneImages(p => ({ ...p, [key]: data.imageUrl }))
        // Auto-save updated images
        if (savedId) autoSave({ generatedImages: { ...sceneImages, [key]: data.imageUrl } })
      } else {
        setSceneImages(p => ({ ...p, [`err_${key}`]: data.message || 'Failed' }))
      }
    } catch (err) {
      setSceneImages(p => ({ ...p, [`err_scene_${idx}`]: err.message }))
    }
    setSceneGenerating(p => ({ ...p, [key]: false }))
  }, [sceneGenerating, sceneImages, savedId])

  // ── Save project ─────────────────────────────────────────────────────────
  const autoSave = useCallback(async (overrides = {}) => {
    if (!result) return
    const scenes = result.isPerfectDay ? result.moments : result.scenes
    await fetch('/api/full-day-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: savedId || undefined,
        worldId: result.worldId,
        dayType:  result.dayType,
        title:    result.dayTitle || result.productionTitle || `${DAY_TYPES.find(d => d.id === result.dayType)?.label} — ${WORLDS.find(w => w.id === result.worldId)?.name}`,
        style:    result.style,
        platform: result.platform,
        creatorName:   identity?.identityName || null,
        creatorTraits: identity?.traits || {},
        scenes,
        dayMeta:       { dayTitle: result.dayTitle, seriesHook: result.seriesHook, productionTitle: result.productionTitle, directorStatement: result.directorStatement },
        postingPlan:   result.postingSchedule || {},
        videoPlan:     result.postingStrategy || {},
        generatedImages: { ...sceneImages, ...overrides.generatedImages },
        brandProfileId: activeBrand?.id || null,
      }),
    }).then(r => r.json()).then(d => { if (d?.id && !savedId) setSavedId(d.id) }).catch(() => {})
  }, [result, savedId, sceneImages, identity, activeBrand])

  const saveProject = useCallback(async () => {
    if (!result || saving) return
    setSaving(true)
    await autoSave()
    setSaving(false)
    // Refresh projects list
    fetch('/api/full-day-projects').then(r => r.json()).then(d => { if (Array.isArray(d)) setProjects(d) }).catch(() => {})
  }, [result, saving, autoSave])

  // ── Load project ──────────────────────────────────────────────────────────
  const loadProject = useCallback(async (proj) => {
    setShowProjects(false)
    // Just navigate back — full load would require re-fetching
    // For now, show a toast and let user regenerate
    setDayType(proj.day_type || 'perfect_day')
    setWorldId(proj.world_id || 'luxury_penthouse')
    setStyle(proj.style || 'cinematic')
    setPlatform(proj.platform || 'instagram')
  }, [])

  // ── Helpers ───────────────────────────────────────────────────────────────
  const activeType  = DAY_TYPES.find(d => d.id === dayType) || DAY_TYPES[0]
  const scenes      = result ? (result.isPerfectDay ? result.moments : result.scenes) || [] : []
  const hasIdentity = !!(identity?.hasImage && identity?.imageDataUrl)

  const copyText = (text) => navigator.clipboard.writeText(text).catch(() => {})

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* ── TOP BAR ── */}
      <div style={{ flexShrink: 0, padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${C.hairline}`, background: C.deep, position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => router.push('/dashboard')} style={{ padding: '4px 10px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'none', color: C.muted }}>← Dashboard</button>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>
          {activeType.icon} {activeType.label}
        </div>
        <div style={{ fontSize: 10, color: C.ghost }}>Life Engine™</div>
        <div style={{ flex: 1 }} />

        {/* Identity badge */}
        {hasIdentity ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 4, border: `1px solid ${C.goldDim}`, background: `${C.gold}0d` }}>
            <img src={identity.imageDataUrl} style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${C.goldDim}` }} />
            <span style={{ fontSize: 9, color: C.gold }}>✓ {identity.identityName || 'Identity'} active</span>
          </div>
        ) : (
          <button onClick={() => router.push('/prompt-engine-v3?view=studio')}
            style={{ padding: '4px 10px', borderRadius: 4, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'none', color: C.muted }}>
            + Add Identity in Studio
          </button>
        )}

        {/* Projects button */}
        <button onClick={() => setShowProjects(!showProjects)}
          style={{ padding: '4px 12px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: showProjects ? C.surface : 'none', color: C.secondary }}>
          ☰ Projects {projects.length > 0 && `(${projects.length})`}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ── LEFT PANEL — Controls ── */}
        <div style={{ width: 280, flexShrink: 0, borderRight: `1px solid ${C.hairline}`, background: C.deep, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          {/* Day Type selector */}
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 8 }}>Day Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {DAY_TYPES.map(dt => (
                <button key={dt.id} onClick={() => setDayType(dt.id)}
                  style={{
                    padding: '8px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', textAlign: 'left',
                    border: `1px solid ${dayType === dt.id ? dt.color + '88' : C.hairline}`,
                    background: dayType === dt.id ? dt.color + '14' : C.surface,
                    color: dayType === dt.id ? dt.color : C.secondary,
                    transition: 'all 0.15s',
                  }}>
                  <span style={{ marginRight: 8 }}>{dt.icon}</span>
                  <span>{dt.label}</span>
                  <div style={{ fontSize: 8, color: dayType === dt.id ? dt.color + 'aa' : C.ghost, fontWeight: 400, marginTop: 2 }}>{dt.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* World */}
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 6 }}>World</div>
            <select value={worldId} onChange={e => setWorldId(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 4, fontSize: 10, background: C.surface, border: `1px solid ${C.subtle}`, color: C.primary, outline: 'none' }}>
              {WORLDS.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>

          {/* Style */}
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 6 }}>Style</div>
            <select value={style} onChange={e => setStyle(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 4, fontSize: 10, background: C.surface, border: `1px solid ${C.subtle}`, color: C.primary, outline: 'none' }}>
              {STYLES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 6 }}>Platform</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  style={{ padding: '4px 8px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${platform === p ? C.blue : C.subtle}`, background: platform === p ? C.blue + '22' : C.surface, color: platform === p ? C.blue : C.muted }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          {brandProfiles.length > 0 && (
            <div style={{ padding: '12px 16px 0' }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 6 }}>Brand</div>
              <select value={activeBrand?.id || ''} onChange={e => setActiveBrand(brandProfiles.find(b => b.id === e.target.value) || null)}
                style={{ width: '100%', padding: '6px 8px', borderRadius: 4, fontSize: 10, background: C.surface, border: `1px solid ${C.subtle}`, color: C.primary, outline: 'none' }}>
                <option value=''>No brand</option>
                {brandProfiles.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          )}

          {/* Identity status */}
          <div style={{ padding: '16px', marginTop: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: C.ghost, marginBottom: 6 }}>Identity</div>
            {hasIdentity ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, border: `1px solid ${C.goldDim}`, background: `${C.gold}0d` }}>
                <img src={identity.imageDataUrl} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${C.goldDim}` }} />
                <div>
                  <div style={{ fontSize: 10, color: C.gold, fontWeight: 700 }}>✓ {identity.identityName || 'Identity'}</div>
                  <div style={{ fontSize: 8, color: C.muted }}>Appears in every scene</div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '8px 10px', borderRadius: 6, border: `1px solid ${C.subtle}`, background: C.surface }}>
                <div style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>No identity uploaded.</div>
                <button onClick={() => router.push('/prompt-engine-v3?view=studio')}
                  style={{ fontSize: 9, color: C.blue, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                  Upload photo in Studio →
                </button>
                <div style={{ fontSize: 8, color: C.ghost, marginTop: 3 }}>Your face will appear in every image prompt.</div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <div style={{ padding: '0 16px 16px', marginTop: 'auto' }}>
            <button onClick={generate} disabled={loading}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 8, fontSize: 12, fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                border: `1px solid ${activeType.color}88`,
                background: loading ? C.raised : `linear-gradient(180deg, ${activeType.color}22, ${activeType.color}0a)`,
                color: loading ? C.muted : activeType.color,
                letterSpacing: 0.5, transition: 'all 0.2s',
                marginBottom: result ? 8 : 0,
              }}>
              {loading ? '⟳ Generating…' : `${activeType.icon} Generate ${activeType.label}`}
            </button>
            {result && (
              <button onClick={saveProject} disabled={saving}
                style={{ width: '100%', padding: '8px 0', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: saving ? C.muted : (savedId ? C.green : C.secondary) }}>
                {saving ? '⟳ Saving…' : savedId ? '✓ Saved' : '↓ Save Project'}
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN AREA ── */}
        <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Projects drawer */}
          {showProjects && (
            <div style={{ borderBottom: `1px solid ${C.hairline}`, background: C.surface, padding: '12px 24px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.secondary, marginBottom: 10 }}>Saved Projects</div>
              {projects.length === 0 ? (
                <div style={{ fontSize: 10, color: C.ghost }}>No saved projects yet.</div>
              ) : (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {projects.map(p => (
                    <button key={p.id} onClick={() => loadProject(p)}
                      style={{ padding: '6px 12px', borderRadius: 5, fontSize: 10, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.raised, color: C.secondary, textAlign: 'left' }}>
                      <div style={{ fontWeight: 700 }}>{p.title}</div>
                      <div style={{ fontSize: 8, color: C.ghost }}>{p.day_type?.replace(/_/g,' ')} · {p.world_id?.replace(/_/g,' ')}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!result && !loading && !error && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
              <div style={{ fontSize: 48 }}>{activeType.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: activeType.color, fontFamily: C.display, textAlign: 'center' }}>
                {activeType.label}
              </div>
              <div style={{ fontSize: 13, color: C.muted, textAlign: 'center', maxWidth: 480, lineHeight: 1.8 }}>
                {activeType.description}.<br />
                14 scenes · image prompts · video direction · hooks · captions · posting plan.
                {hasIdentity ? (
                  <><br /><span style={{ color: C.gold }}>✓ {identity.identityName || 'Your identity'} will appear in every scene.</span></>
                ) : (
                  <><br /><span style={{ color: C.muted }}>Upload your photo in Studio to appear in every image.</span></>
                )}
              </div>
              <button onClick={generate}
                style={{ padding: '12px 32px', borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: 'pointer', border: `1px solid ${activeType.color}88`, background: `${activeType.color}14`, color: activeType.color }}>
                {activeType.icon} Generate {activeType.label}
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ fontSize: 32, animation: 'spin 2s linear infinite', color: activeType.color }}>{activeType.icon}</div>
              <div style={{ fontSize: 14, color: C.secondary }}>Directing your {activeType.label}…</div>
              <div style={{ fontSize: 10, color: C.ghost }}>14 scenes · image prompts · video direction · hooks · captions</div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ margin: 24, padding: 14, borderRadius: 8, border: '1px solid #7f1d1d', background: '#1a0808', color: '#fca5a5', fontSize: 12 }}>
              {error}
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Day header */}
              <div style={{ padding: 20, borderRadius: 10, border: `1px solid ${activeType.color}44`, background: `${activeType.color}08` }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: activeType.color, fontFamily: C.display, marginBottom: 4 }}>
                  {result.dayTitle || result.productionTitle}
                </div>
                {(result.seriesHook || result.directorStatement) && (
                  <div style={{ fontSize: 12, color: C.secondary, fontStyle: 'italic', marginBottom: result.lightingArc ? 12 : 0 }}>
                    {result.seriesHook || result.directorStatement}
                  </div>
                )}
                {(result.lightingArc || result.wardrobeArc) && (
                  <div style={{ display: 'flex', gap: 20, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.hairline}` }}>
                    {result.lightingArc && (
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.gold, marginBottom: 3 }}>Lighting Arc</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{result.lightingArc}</div>
                      </div>
                    )}
                    {result.wardrobeArc && (
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.violet, marginBottom: 3 }}>Wardrobe Arc</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{result.wardrobeArc}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Scene cards */}
              {scenes.map((scene, idx) => {
                const imgKey   = `scene_${idx}`
                const imgUrl   = sceneImages[imgKey]
                const imgErr   = sceneImages[`err_${imgKey}`]
                const isGenImg = sceneGenerating[imgKey]
                const isOpen   = expandedScene === idx

                // Normalize field names between perfect-day and full-day-generate formats
                const sceneTime   = scene.time
                const sceneLabel  = scene.label || scene.title
                const sceneMood   = scene.mood || scene.emotion
                const imagePrompt = scene.imagePrompt || scene.videoPrompt?.slice(0, 200)
                const videoPrompt = scene.videoPrompt || scene.videoInstruction
                const hook        = scene.hook
                const caption     = scene.caption || scene.captionLine
                const camera      = scene.cameraMove
                const lens        = scene.lensType
                const wardrobe    = scene.wardrobe
                const lighting    = scene.lightingNote || scene.lighting
                const action      = scene.action || scene.scene
                const clipLength  = scene.clipLength

                return (
                  <div key={idx} style={{ borderRadius: 8, border: `1px solid ${isOpen ? activeType.color + '44' : C.hairline}`, background: C.surface, overflow: 'hidden', transition: 'border-color 0.15s' }}>

                    {/* Scene header — always visible */}
                    <div onClick={() => setExpandedScene(isOpen ? null : idx)}
                      style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: isOpen ? C.raised : C.surface, transition: 'background 0.15s' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: activeType.color, minWidth: 44 }}>{sceneTime}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, flex: 1 }}>{sceneLabel}</span>
                      {sceneMood && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, border: `1px solid ${C.subtle}`, color: C.muted }}>{typeof sceneMood === 'string' ? sceneMood.split(',')[0] : sceneMood}</span>}
                      {clipLength && <span style={{ fontSize: 9, color: C.ghost }}>{clipLength}</span>}
                      {imgUrl && <span style={{ fontSize: 9, color: C.green }}>✓ img</span>}
                      <span style={{ fontSize: 10, color: C.ghost }}>{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {/* Scene body — expanded */}
                    {isOpen && (
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: `1px solid ${C.hairline}` }}>

                        {/* Action + setting row */}
                        {action && (
                          <div>
                            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.muted, marginBottom: 3 }}>Scene</div>
                            <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.6 }}>{action}</div>
                          </div>
                        )}

                        {/* Camera / Lens / Lighting row */}
                        {(camera || lens || lighting) && (
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {camera && <div><span style={{ fontSize: 8, fontWeight: 700, color: C.tension, textTransform: 'uppercase' }}>Camera </span><span style={{ fontSize: 10, color: C.secondary }}>{camera}</span></div>}
                            {lens   && <div><span style={{ fontSize: 8, fontWeight: 700, color: C.tension, textTransform: 'uppercase' }}>Lens </span><span style={{ fontSize: 10, color: C.secondary }}>{lens}</span></div>}
                            {lighting && <div style={{ flex: 1 }}><span style={{ fontSize: 8, fontWeight: 700, color: C.gold, textTransform: 'uppercase' }}>Lighting </span><span style={{ fontSize: 10, color: C.muted }}>{lighting}</span></div>}
                          </div>
                        )}

                        {/* Wardrobe */}
                        {wardrobe && (
                          <div>
                            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.violet, marginBottom: 3 }}>Wardrobe</div>
                            <div style={{ fontSize: 10, color: C.secondary }}>{wardrobe}</div>
                          </div>
                        )}

                        {/* Hook */}
                        {hook && (
                          <div>
                            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.gold, marginBottom: 3 }}>Hook</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, fontFamily: C.display, lineHeight: 1.5 }}>"{hook}"</div>
                            <button onClick={() => copyText(hook)} style={{ marginTop: 5, padding: '2px 8px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: `${C.gold}11`, color: C.gold }}>copy</button>
                          </div>
                        )}

                        {/* Image Prompt + inline generation */}
                        {imagePrompt && (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.blue }}>Image Prompt</div>
                              {hasIdentity && <span style={{ fontSize: 8, color: C.gold, padding: '1px 5px', borderRadius: 3, border: `1px solid ${C.goldDim}`, background: `${C.gold}11` }}>✓ with your identity</span>}
                            </div>
                            <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.7, fontFamily: C.mono, marginBottom: 8 }}>{imagePrompt}</div>

                            {/* Inline image result */}
                            {imgUrl ? (
                              <div>
                                <img src={imgUrl} alt="Generated scene" style={{ width: '100%', borderRadius: 6, display: 'block', marginBottom: 6 }} onClick={() => window.open(imgUrl, '_blank')} />
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <a href={`/api/download-image?url=${encodeURIComponent(imgUrl)}&name=scene_${idx + 1}.jpg`}
                                    style={{ flex: 1, padding: '6px 0', borderRadius: 4, fontSize: 9, fontWeight: 700, textDecoration: 'none', textAlign: 'center', color: C.gold, background: '#1a1408', border: `1px solid ${C.goldDim}`, display: 'block' }}>↓ Download</a>
                                  <button onClick={() => setSceneImages(p => { const n = {...p}; delete n[imgKey]; return n })}
                                    style={{ padding: '6px 10px', borderRadius: 4, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'none', color: C.muted }}>✕</button>
                                </div>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', gap: 6 }}>
                                <button
                                  onClick={() => generateSceneImage(imagePrompt, idx)}
                                  disabled={isGenImg}
                                  style={{ padding: '7px 16px', borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: isGenImg ? 'not-allowed' : 'pointer', border: `1px solid ${C.goldDim}`, background: isGenImg ? C.raised : 'linear-gradient(180deg,#1a1408,#0c0a04)', color: isGenImg ? C.muted : C.gold }}>
                                  {isGenImg ? '⟳ Generating…' : (hasIdentity ? '🎨 Generate Image' : '🎨 Generate Image')}
                                </button>
                                <button onClick={() => copyText(imagePrompt)} style={{ padding: '7px 10px', borderRadius: 5, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: 'none', color: C.muted }}>copy prompt</button>
                              </div>
                            )}
                            {imgErr && <div style={{ marginTop: 4, fontSize: 9, color: C.tension }}>{imgErr}</div>}
                          </div>
                        )}

                        {/* Video Prompt */}
                        {videoPrompt && (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.green }}>Video Direction</div>
                              {hasIdentity && <span style={{ fontSize: 8, color: C.gold, padding: '1px 5px', borderRadius: 3, border: `1px solid ${C.goldDim}`, background: `${C.gold}11` }}>✓ identity-driven</span>}
                            </div>
                            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 6 }}>{videoPrompt}</div>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button onClick={() => copyText(videoPrompt)} style={{ padding: '3px 9px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.green}44`, background: `${C.green}11`, color: C.green }}>copy script</button>
                            </div>
                          </div>
                        )}

                        {/* Caption */}
                        {caption && (
                          <div>
                            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.violet, marginBottom: 3 }}>Caption</div>
                            <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.7 }}>{caption}</div>
                            <button onClick={() => copyText(caption)} style={{ marginTop: 5, padding: '2px 8px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.violet}44`, background: `${C.violet}11`, color: C.violet }}>copy</button>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )
              })}

              {/* Posting schedule */}
              {(result.postingSchedule?.length > 0 || result.postingStrategy) && (
                <div style={{ padding: 16, borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.raised, marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: activeType.color, marginBottom: 10 }}>Posting Plan</div>
                  {result.postingStrategy && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {result.postingStrategy.fullCut && <div><span style={{ fontSize: 9, color: C.muted, fontWeight: 700 }}>FULL CUT </span><span style={{ fontSize: 10, color: C.secondary }}>{result.postingStrategy.fullCut}</span></div>}
                      {result.postingStrategy.shortFormCuts && <div><span style={{ fontSize: 9, color: C.muted, fontWeight: 700 }}>SHORT CUTS </span><span style={{ fontSize: 10, color: C.secondary }}>{result.postingStrategy.shortFormCuts}</span></div>}
                      {result.postingStrategy.reelOrder && <div><span style={{ fontSize: 9, color: C.muted, fontWeight: 700 }}>REEL ORDER </span><span style={{ fontSize: 10, color: C.secondary }}>{result.postingStrategy.reelOrder}</span></div>}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box }
        ::-webkit-scrollbar { width: 4px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px }
        select option { background: #0e0e0e }
      `}</style>
    </div>
  )
}
