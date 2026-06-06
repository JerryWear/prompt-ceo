'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:    '#020202',
  base:    '#080808',
  surface: '#0d0d0d',
  raised:  '#111111',
  border:  '#1a1a1a',
  subtle:  '#222222',
  primary: '#FFFFFF',
  secondary:'#D0D0D0',
  muted:   '#A0A0A0',
  ghost:   '#888888',
  dim:     '#444444',
  gold:    '#c8a84b',
  goldDim: '#1a1408',
  teal:    '#4aaba0',
  green:   '#4a9a6a',
  red:     '#c84a4a',
}

const GEN_COLORS = { heygen: C.gold, runway: C.teal }
const GEN_LABELS = { heygen: 'Avatar', runway: 'Video' }

// ── Scene card ─────────────────────────────────────────────────────────────────
function SceneCard({ scene, imageUrl }) {
  return (
    <div style={{ flexShrink: 0, width: 116, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{
        width: 116, height: 206, borderRadius: 8, overflow: 'hidden', position: 'relative',
        background: C.raised, border: `1px solid ${C.border}`, flexShrink: 0,
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={scene.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, border: `2px solid ${C.border}`, borderTopColor: C.ghost, borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          </div>
        )}
        <div style={{
          position: 'absolute', top: 5, right: 5, fontSize: 8, padding: '2px 5px', borderRadius: 3,
          background: '#000000bb', color: GEN_COLORS[scene.generator] || C.ghost,
          fontWeight: 700, letterSpacing: 0.5, backdropFilter: 'blur(4px)',
        }}>
          {GEN_LABELS[scene.generator] || scene.generator}
        </div>
        <div style={{
          position: 'absolute', bottom: 5, left: 5, fontSize: 8, padding: '2px 5px', borderRadius: 3,
          background: '#000000bb', color: C.ghost, backdropFilter: 'blur(4px)',
        }}>
          {scene.duration}s
        </div>
      </div>

      <div style={{ fontSize: 9, color: C.dim, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
        {scene.label}
      </div>

      {scene.script && (
        <div style={{ fontSize: 9, color: '#3a3a3a', lineHeight: 1.4, textAlign: 'center' }}>
          "{scene.script.slice(0, 52)}{scene.script.length > 52 ? '…' : ''}"
        </div>
      )}
    </div>
  )
}

// ── Concept row ────────────────────────────────────────────────────────────────
function ConceptRow({ concept, previews, index }) {
  return (
    <div style={{
      borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface,
      overflow: 'hidden', animation: `fadeUp 0.4s ease ${index * 0.1}s both`,
    }}>
      <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid #141414` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>{concept.title}</span>
          <span style={{
            fontSize: 9, padding: '2px 8px', borderRadius: 10,
            background: C.raised, color: C.ghost,
            textTransform: 'uppercase', letterSpacing: 1,
          }}>
            {(concept.angle || '').replace(/_/g, ' ')}
          </span>
          <span style={{ fontSize: 10, color: C.dim }}>·</span>
          <span style={{ fontSize: 10, color: C.ghost }}>{concept.total_duration}s</span>
        </div>
        <div style={{ fontSize: 12, color: C.muted, fontStyle: 'italic', marginTop: 6 }}>
          "{concept.logline}"
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, padding: '14px 20px 16px', overflowX: 'auto' }}>
        {(concept.scenes || []).map(scene => (
          <SceneCard key={scene.id} scene={scene} imageUrl={previews[scene.id]} />
        ))}
      </div>
    </div>
  )
}

// ── Working screen ─────────────────────────────────────────────────────────────
function WorkingScreen({ statusMsg, statusStep }) {
  const steps = ['Scraping', 'Understanding', 'Designing']
  return (
    <div style={{
      maxWidth: 480, margin: '0 auto', padding: '110px 24px', textAlign: 'center',
      animation: 'fadeUp 0.35s ease both',
    }}>
      <div style={{
        width: 44, height: 44, border: `2px solid ${C.border}`, borderTopColor: C.gold,
        borderRadius: '50%', animation: 'spin 0.85s linear infinite',
        margin: '0 auto 28px',
      }} />
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, color: C.gold + '88', textTransform: 'uppercase', marginBottom: 14 }}>
        ✦ Jarvis
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.primary, marginBottom: 8, minHeight: 32 }}>
        {statusMsg || 'Working…'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 28 }}>
        {steps.map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: statusStep > i ? C.gold : statusStep === i ? C.gold : C.subtle,
              animation: statusStep === i ? 'pulse 1s ease-in-out infinite' : 'none',
              transition: 'background 0.3s',
            }} />
            <span style={{
              fontSize: 10, letterSpacing: 0.5,
              color: statusStep > i ? C.ghost : statusStep === i ? C.secondary : C.dim,
              transition: 'color 0.3s',
            }}>{step}</span>
            {i < steps.length - 1 && <span style={{ fontSize: 10, color: C.subtle, marginLeft: 2 }}>—</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function JarvisStudio() {
  const router    = useRouter()
  const supabase  = createClient()
  const fileRef   = useRef(null)
  const blobRef   = useRef(null)

  // inputs
  const [url,           setUrl]           = useState('')
  const [prompt,        setPrompt]        = useState('')
  const [founderFile,   setFounderFile]   = useState(null)
  const [founderPreview,setFounderPreview]= useState(null)

  // flow
  const [phase,         setPhase]         = useState('input') // 'input' | 'working' | 'storyboard'
  const [statusMsg,     setStatusMsg]     = useState('')
  const [statusStep,    setStatusStep]    = useState(0)
  const [error,         setError]         = useState('')

  // data
  const [brandContext,  setBrandContext]  = useState(null)
  const [storyboard,    setStoryboard]    = useState(null)
  const [previews,      setPreviews]      = useState({})
  const [previewsDone,  setPreviewsDone]  = useState(false)
  const [totalScenes,   setTotalScenes]   = useState(25)

  // Auth gate
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace('/prompt-engine-v3/login')
    })
    return () => { if (blobRef.current) URL.revokeObjectURL(blobRef.current) }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (blobRef.current) URL.revokeObjectURL(blobRef.current)
    const objectUrl = URL.createObjectURL(file)
    blobRef.current = objectUrl
    setFounderFile(file)
    setFounderPreview(objectUrl)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    if (blobRef.current) URL.revokeObjectURL(blobRef.current)
    const objectUrl = URL.createObjectURL(file)
    blobRef.current = objectUrl
    setFounderFile(file)
    setFounderPreview(objectUrl)
  }, [])

  const handleCreate = async () => {
    if (!url.trim() && !founderFile && !prompt.trim()) {
      setError('Add a URL, founder photo, or describe your brand to get started')
      return
    }
    setError('')
    setPhase('working')
    setStatusStep(0)
    setStatusMsg('Uploading assets')

    try {
      // 1. Upload founder image
      let founderPublicUrl = null
      if (founderFile) {
        const fd = new FormData()
        fd.append('file', founderFile)
        const upRes  = await fetch('/api/jarvis-studio/upload-asset', { method: 'POST', body: fd })
        const upData = await upRes.json()
        if (upData.publicUrl) founderPublicUrl = upData.publicUrl
      }

      // 2. Understand brand
      setStatusMsg('Reading your brand')
      setStatusStep(1)
      const uRes  = await fetch('/api/jarvis-studio/understand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() || null, founderImageUrl: founderPublicUrl, prompt: prompt.trim() || null }),
      })
      const uData = await uRes.json()
      if (!uData.brandContext) throw new Error(uData.error || 'Brand analysis failed')
      setBrandContext(uData.brandContext)

      // 3. Generate storyboard
      setStatusMsg('Designing 5 ad concepts')
      setStatusStep(2)
      const sRes  = await fetch('/api/jarvis-studio/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandContext: uData.brandContext }),
      })
      const sData = await sRes.json()
      if (!sData.storyboard?.concepts?.length) throw new Error(sData.error || 'Storyboard generation failed')
      setStoryboard(sData.storyboard)

      const total = sData.storyboard.concepts.reduce((s, c) => s + (c.scenes?.length || 0), 0)
      setTotalScenes(total)

      // 4. Transition to storyboard view, generate previews per concept in parallel
      setPhase('storyboard')

      await Promise.all(sData.storyboard.concepts.map(async (concept) => {
        const scenes = (concept.scenes || []).map(s => ({ id: s.id, dalle_prompt: s.dalle_prompt, label: s.label }))
        if (!scenes.length) return
        try {
          const pRes  = await fetch('/api/jarvis-studio/preview-scenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenes }),
          })
          const pData = await pRes.json()
          if (pData.status === 'success') {
            setPreviews(prev => {
              const next = { ...prev }
              pData.previews.forEach(p => { if (p.imageUrl) next[p.id] = p.imageUrl })
              return next
            })
          }
        } catch (e) {
          console.error('Preview error for concept', concept.id, e.message)
        }
      }))

      setPreviewsDone(true)

    } catch (err) {
      setError(err.message || 'Something went wrong')
      setPhase('input')
    }
  }

  const previewCount = Object.keys(previews).length

  return (
    <div style={{ background: C.void, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: C.primary }}>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
        @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes shimmer { 0%,100% { opacity:0.25 } 50% { opacity:0.5 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        .upload-zone:hover { border-color: #333 !important; }
        .create-btn:hover  { filter: brightness(1.12); }
        .create-btn:active { filter: brightness(0.95); }
        .back-link:hover   { color: #9e9a96 !important; }
      `}</style>

      {/* ── Nav ────────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: `1px solid ${C.border}`,
        background: `${C.void}ee`, backdropFilter: 'blur(12px)',
        padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, gap: 10,
      }}>
        <a href="/dashboard" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: C.gold, textTransform: 'uppercase', textDecoration: 'none' }}>
          PromptCEO
        </a>
        <span style={{ fontSize: 12, color: C.subtle }}>|</span>
        <span style={{ fontSize: 12, color: C.ghost, letterSpacing: 0.3 }}>Jarvis Studio</span>
        {brandContext && (
          <>
            <span style={{ fontSize: 11, color: C.dim }}>—</span>
            <span style={{ fontSize: 12, color: C.secondary }}>{brandContext.brandName}</span>
          </>
        )}
        <div style={{ flex: 1 }} />
        {phase !== 'input' && (
          <button
            onClick={() => { setPhase('input'); setStoryboard(null); setBrandContext(null); setPreviews({}); setPreviewsDone(false); setError('') }}
            className="back-link"
            style={{ fontSize: 11, color: C.ghost, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.15s' }}
          >
            ← New Project
          </button>
        )}
        <a href="/dashboard" className="back-link" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none', marginLeft: 8, transition: 'color 0.15s' }}>
          Dashboard
        </a>
      </div>

      {/* ── Error bar ──────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{ background: '#160808', borderBottom: `1px solid #3a1515`, padding: '10px 28px', fontSize: 12, color: '#e07070' }}>
          {error}
        </div>
      )}

      {/* ── INPUT PHASE ────────────────────────────────────────────────────────── */}
      {phase === 'input' && (
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '72px 24px 80px', animation: 'fadeUp 0.4s ease both' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, color: C.gold + '99', textTransform: 'uppercase', marginBottom: 18 }}>
              ✦ Jarvis Studio
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 800, color: C.primary, margin: '0 0 18px', lineHeight: 1.12, letterSpacing: -0.5 }}>
              From reference<br />to ad. Automatically.
            </h1>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, maxWidth: 460, margin: '0 auto' }}>
              Give Jarvis a URL, a founder photo, or a description.
              It reads your brand, designs 5 ad concepts, and generates every scene.
            </p>
          </div>

          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>

            {/* URL */}
            <div style={{ padding: '16px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: C.ghost, textTransform: 'uppercase', marginBottom: 8 }}>
                Brand URL
              </div>
              <input
                type="url"
                placeholder="https://yourbrand.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: C.primary, fontFamily: 'inherit' }}
              />
            </div>

            {/* Founder image */}
            <div
              className="upload-zone"
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              style={{
                padding: '16px 20px', borderRadius: 10, cursor: 'pointer', transition: 'border-color 0.2s',
                border: founderFile ? `1px solid ${C.gold}44` : `1px dashed #2a2a2a`,
                background: founderFile ? '#0b0900' : C.surface,
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: founderFile ? C.gold + '88' : C.ghost, textTransform: 'uppercase', marginBottom: 10 }}>
                Founder / Brand Photo
              </div>
              {founderPreview ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src={founderPreview} alt="Founder" style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover', border: `1px solid ${C.gold}44` }} />
                  <div>
                    <div style={{ fontSize: 13, color: C.secondary }}>{founderFile?.name}</div>
                    <div style={{ fontSize: 11, color: C.ghost, marginTop: 3 }}>Click to change</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#3a3a3a' }}>
                  <span style={{ fontSize: 20, opacity: 0.35 }}>⊕</span>
                  <span>Click or drag to upload a founder or brand image</span>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>

            {/* Prompt */}
            <div style={{ padding: '16px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: C.ghost, textTransform: 'uppercase', marginBottom: 8 }}>
                Describe Your Brand
                <span style={{ marginLeft: 8, fontWeight: 400, letterSpacing: 0, color: C.dim, fontSize: 9 }}>(optional)</span>
              </div>
              <textarea
                placeholder="e.g. Premium skincare for women 30-45 who want visible results without harsh chemicals. Warm, confident tone."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                rows={3}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  resize: 'none', fontSize: 13, color: C.secondary, fontFamily: 'inherit', lineHeight: 1.65,
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCreate}
            className="create-btn"
            style={{
              width: '100%', padding: '15px 24px', borderRadius: 10, border: 'none',
              background: C.gold, color: '#000', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 2, cursor: 'pointer',
              transition: 'filter 0.15s',
            }}
          >
            Create 5 Ad Concepts →
          </button>

          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
            Jarvis scrapes the URL, analyzes your image, and generates a complete visual storyboard with 25 scenes.
          </div>
        </div>
      )}

      {/* ── WORKING PHASE ──────────────────────────────────────────────────────── */}
      {phase === 'working' && (
        <WorkingScreen statusMsg={statusMsg} statusStep={statusStep} />
      )}

      {/* ── STORYBOARD PHASE ───────────────────────────────────────────────────── */}
      {phase === 'storyboard' && storyboard && (
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px', animation: 'fadeUp 0.4s ease both' }}>

          {/* Storyboard header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3.5, color: C.gold + '88', textTransform: 'uppercase', marginBottom: 8 }}>
                ✦ Storyboard
              </div>
              {brandContext && (
                <div style={{ fontSize: 26, fontWeight: 800, color: C.primary, marginBottom: 6 }}>
                  {brandContext.brandName}
                </div>
              )}
              <div style={{ fontSize: 12, color: C.ghost, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span>{storyboard.concepts.length} concepts</span>
                <span style={{ color: C.dim }}>·</span>
                <span>{totalScenes} scenes</span>
                {!previewsDone ? (
                  <>
                    <span style={{ color: C.dim }}>·</span>
                    <span style={{ color: C.gold }}>
                      <span style={{ animation: 'pulse 1s ease-in-out infinite', display: 'inline-block' }}>●</span>
                      {' '}Generating previews ({previewCount}/{totalScenes})
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ color: C.dim }}>·</span>
                    <span style={{ color: C.green }}>✓ All previews ready</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => alert('Sprint 2: Runway + HeyGen production generation — coming next!')}
              disabled={!previewsDone}
              style={{
                padding: '11px 22px', borderRadius: 8, border: 'none',
                background: previewsDone ? C.gold : C.raised,
                color: previewsDone ? '#000' : C.dim,
                fontSize: 12, fontWeight: 800, cursor: previewsDone ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase', letterSpacing: 1.5, transition: 'all 0.2s',
                flexShrink: 0, whiteSpace: 'nowrap',
              }}
            >
              {previewsDone ? 'Launch Production →' : `Previewing… (${previewCount}/${totalScenes})`}
            </button>
          </div>

          {/* Brand context strip */}
          {brandContext && (
            <div style={{
              display: 'flex', gap: 24, marginBottom: 28, padding: '12px 18px',
              borderRadius: 8, border: `1px solid ${C.border}`, background: C.base,
              flexWrap: 'wrap', rowGap: 10,
            }}>
              {[
                { label: 'Industry',  value: brandContext.industry },
                { label: 'Tone',      value: brandContext.toneOfVoice },
                { label: 'Audience',  value: brandContext.targetAudience?.slice(0, 55) },
                { label: 'Platform',  value: (brandContext.platformFocus || '').replace(/_/g, ' ') },
              ].filter(({ value }) => value).map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.ghost, textTransform: 'uppercase' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 11, color: C.secondary }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Concept rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {storyboard.concepts.map((concept, i) => (
              <ConceptRow key={concept.id} concept={concept} previews={previews} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
