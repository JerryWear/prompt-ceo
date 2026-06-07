'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void: '#020202', base: '#060606', surface: '#0c0c0c', raised: '#111',
  border: '#1a1a1a', divide: '#141414', primary: '#FFFFFF', secondary: '#D4D4D4',
  muted: '#9A9A9A', ghost: '#666', dim: '#333',
  gold: '#c8a84b', goldBg: '#0b0900', goldBorder: '#c8a84b44',
  green: '#4a9a6a', greenBg: '#060f09',
  teal: '#4aaba0', tealBg: '#060f0e',
  red: '#c84a4a', redBg: '#120505',
  purple: '#9b6fd4', purpleBg: '#08070f',
}

const INTENT_OPTIONS = [
  { id: 'founder_ad',    label: 'Talking founder ad',      sub: 'Founder speaks to camera — HeyGen avatar' },
  { id: 'product_demo',  label: 'Product demo',            sub: 'Show the product or app in action' },
  { id: 'cinematic',     label: 'Cinematic commercial',    sub: 'Premium visual storytelling with Runway' },
  { id: 'ugc',           label: 'UGC-style ad',            sub: 'Raw, authentic, platform-native feel' },
  { id: 'explainer',     label: 'App explainer',           sub: 'Walk through how the product works' },
  { id: 'social',        label: 'Social ad',               sub: 'Short-form, native to the platform' },
  { id: 'launch',        label: 'Launch campaign',         sub: 'New product or feature announcement' },
]

async function uploadAsset(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res  = await fetch('/api/jarvis-studio/upload-asset', { method: 'POST', body: fd })
  const data = await res.json()
  if (!data.publicUrl) throw new Error(data.error || 'Upload failed')
  return { publicUrl: data.publicUrl, storagePath: data.storagePath, bucket: data.bucket }
}

export default function JarvisStudio() {
  const router   = useRouter()
  const supabase = createClient()

  // ── Input state ──────────────────────────────────────────────────────────
  const [websiteUrl,     setWebsiteUrl]     = useState('')
  const [prompt,         setPrompt]         = useState('')
  const [founderFile,    setFounderFile]    = useState(null)
  const [founderBlobUrl, setFounderBlobUrl] = useState(null)
  const [productFiles,   setProductFiles]   = useState([]) // [{ file, blobUrl }]
  const [videoFiles,     setVideoFiles]     = useState([]) // [{ file }]
  const [musicMode,      setMusicMode]      = useState('ai_choose')
  const [musicFile,      setMusicFile]      = useState(null)
  const [musicTrackId,   setMusicTrackId]   = useState(null)
  const [musicTracks,    setMusicTracks]    = useState([])
  const [musicLoading,   setMusicLoading]   = useState(false)
  const [playingTrackId, setPlayingTrackId] = useState(null)

  const founderInputRef = useRef(null)
  const productInputRef = useRef(null)
  const videoInputRef   = useRef(null)
  const musicInputRef   = useRef(null)
  const audioRef        = useRef(null)
  const founderBlobRef  = useRef(null)
  const pollRef         = useRef(null)

  // ── Flow state ───────────────────────────────────────────────────────────
  const [phase,       setPhase]       = useState('input')
  const [intent,      setIntent]      = useState(null)
  const [error,       setError]       = useState('')
  const [statusItems, setStatusItems] = useState([])

  // ── Data state ───────────────────────────────────────────────────────────
  const [uploadedAssets,      setUploadedAssets]      = useState(null)
  const [understanding,       setUnderstanding]       = useState(null)
  const [assetManifest,       setAssetManifest]       = useState(null)
  const [missingUploaded,     setMissingUploaded]     = useState([])
  const [assessment,          setAssessment]          = useState(null)
  const [creativeBrief,       setCreativeBrief]       = useState(null)
  const [storyboard,      setStoryboard]      = useState(null)
  const [previews,        setPreviews]        = useState({})
  const [previewsDone,    setPreviewsDone]    = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [productionJobs,  setProductionJobs]  = useState(null)
  const [finalAd,         setFinalAd]         = useState(null)

  // ── Auth ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.replace('/prompt-engine-v3/login')
    })
    return () => {
      if (founderBlobRef.current) URL.revokeObjectURL(founderBlobRef.current)
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
      if (pollRef.current)  clearInterval(pollRef.current)
    }
  }, [])

  // ── Load music library on demand ─────────────────────────────────────────
  useEffect(() => {
    if (musicMode !== 'library' || musicTracks.length) return
    setMusicLoading(true)
    fetch('/api/music-studio/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adContext: { type: 'ad', mood: 'energetic' } }),
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.tracks)) setMusicTracks(d.tracks.slice(0, 8)) })
      .catch(() => {})
      .finally(() => setMusicLoading(false))
  }, [musicMode])

  // ── Helpers ───────────────────────────────────────────────────────────────
  const addStatus = useCallback((id, label, status = 'active') => {
    setStatusItems(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx === -1) return [...prev, { id, label, status }]
      const n = [...prev]; n[idx] = { id, label, status }; return n
    })
  }, [])

  const handleFounderFile = useCallback((file) => {
    if (!file?.type.startsWith('image/')) return
    if (founderBlobRef.current) URL.revokeObjectURL(founderBlobRef.current)
    const blob = URL.createObjectURL(file)
    founderBlobRef.current = blob
    setFounderFile(file)
    setFounderBlobUrl(blob)
  }, [])

  const handleProductFiles = useCallback((fileList) => {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/')).slice(0, 6)
    setProductFiles(prev => [...prev, ...files.map(f => ({ file: f, blobUrl: URL.createObjectURL(f) }))].slice(0, 6))
  }, [])

  const handleVideoFiles = useCallback((fileList) => {
    const files = Array.from(fileList).filter(f => f.type.startsWith('video/')).slice(0, 3)
    setVideoFiles(prev => [...prev, ...files.map(f => ({ file: f }))].slice(0, 3))
  }, [])

  const toggleTrack = useCallback((trackId, previewUrl) => {
    if (playingTrackId === trackId) {
      audioRef.current?.pause(); setPlayingTrackId(null)
    } else {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = '' }
      audioRef.current = new Audio(previewUrl)
      audioRef.current.play()
      setPlayingTrackId(trackId)
    }
  }, [playingTrackId])

  const resetAll = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if (pollRef.current)  clearInterval(pollRef.current)
    setPhase('input'); setIntent(null); setError(''); setStatusItems([])
    setUploadedAssets(null); setUnderstanding(null); setAssetManifest(null); setMissingUploaded([])
    setAssessment(null); setCreativeBrief(null)
    setStoryboard(null); setPreviews({}); setPreviewsDone(false)
    setSelectedConcept(null); setProductionJobs(null); setFinalAd(null)
  }, [])

  const hasAnyInput = !!(websiteUrl.trim() || founderFile || productFiles.length || videoFiles.length || prompt.trim())

  // ── Main flow ─────────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    if (!hasAnyInput) { setError('Add at least one input to continue.'); return }
    setError('')
    const hasContext = websiteUrl.trim() || prompt.trim()
    const hasVisual  = founderFile || productFiles.length || videoFiles.length
    if (hasVisual && !hasContext) { setPhase('intent'); return }
    startAnalysis(null)
  }, [hasAnyInput, websiteUrl, prompt, founderFile, productFiles, videoFiles])

  const startAnalysis = useCallback(async (chosenIntent) => {
    const activeIntent = chosenIntent || intent
    setPhase('analyzing')
    setStatusItems([])
    setError('')

    try {
      addStatus('upload', 'Uploading assets', 'active')

      let founderAsset = null
      const productAssets = []
      const videoAssets   = []
      let   musicUploadUrl = null

      await Promise.allSettled([
        founderFile && uploadAsset(founderFile).then(r => { founderAsset = r }),
        ...productFiles.map(p => uploadAsset(p.file).then(r => productAssets.push(r))),
        ...videoFiles.map(v => uploadAsset(v.file).then(r => videoAssets.push(r))),
        (musicMode === 'upload' && musicFile) && uploadAsset(musicFile).then(r => { musicUploadUrl = r.publicUrl }),
      ].filter(Boolean))

      addStatus('upload', 'Assets uploaded', 'done')

      const assets = {
        founderImageUrl:    founderAsset?.publicUrl    || null,
        founderStoragePath: founderAsset?.storagePath  || null,
        founderBucket:      founderAsset?.bucket       || null,
        productImageUrls:   productAssets.map(a => a.publicUrl),
        videoUrls:          videoAssets.map(a => a.publicUrl),
        musicUrl:           musicUploadUrl,
        musicTrackId:       musicMode === 'library' ? musicTrackId : null,
      }
      setUploadedAssets(assets)

      if (websiteUrl.trim())    addStatus('url',     'Crawling website',         'active')
      if (founderAsset)         addStatus('founder', 'Analyzing founder image',  'active')
      if (productAssets.length) addStatus('product', 'Analyzing product images', 'active')
      if (videoAssets.length)   addStatus('video',   'Analyzing video',          'active')
      addStatus('ai', 'Building brand understanding', 'active')

      const uRes  = await fetch('/api/jarvis-studio/understand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl:       websiteUrl.trim() || null,
          founderImageUrl:  assets.founderImageUrl,
          productImageUrls: assets.productImageUrls,
          videoUrl:         assets.videoUrls[0] || null,
          prompt:           prompt.trim() || null,
          intent:           activeIntent,
        }),
      })
      const uData = await uRes.json()
      if (!uData.understanding) throw new Error(uData.error || 'Brand analysis failed')

      if (websiteUrl.trim())    addStatus('url',     'Website analyzed',    'done')
      if (founderAsset)         addStatus('founder', 'Founder analyzed',    'done')
      if (productAssets.length) addStatus('product', 'Products analyzed',   'done')
      if (videoAssets.length)   addStatus('video',   'Video analyzed',      'done')
      addStatus('ai', 'Brand understood', 'done')
      setUnderstanding(uData.understanding)

      addStatus('assess', 'Jarvis is forming an opinion...', 'active')
      const aRes  = await fetch('/api/jarvis-studio/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ understanding: uData.understanding, assets, prompt: prompt.trim() || null, intent: activeIntent }),
      })
      const aData = await aRes.json()
      if (!aData.assessment) throw new Error(aData.error || 'Assessment failed')
      addStatus('assess', 'Assessment ready', 'done')
      setAssessment(aData.assessment)
      setAssetManifest(aData.assetManifest || null)
      setMissingUploaded(aData.missingUploadedAssets || [])
      setPhase('assessment')

    } catch (err) {
      setError(err.message || 'Something went wrong')
      setPhase('input')
    }
  }, [intent, websiteUrl, prompt, founderFile, productFiles, videoFiles, musicMode, musicFile, musicTrackId, addStatus])

  const handleBuildBrief = useCallback(async () => {
    setPhase('analyzing')
    setStatusItems([{ id: 'brief', label: 'Building creative brief...', status: 'active' }])
    setError('')
    try {
      const bRes  = await fetch('/api/jarvis-studio/creative-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ understanding, assets: uploadedAssets, intent, prompt: prompt.trim() || null, assessment }),
      })
      const bData = await bRes.json()
      if (!bData.brief) throw new Error(bData.error || 'Brief generation failed')
      setCreativeBrief(bData.brief)
      setPhase('brief')
    } catch (err) {
      setError(err.message || 'Brief failed')
      setPhase('assessment')
    }
  }, [understanding, uploadedAssets, intent, prompt, assessment])

  const handleApproveBrief = useCallback(async () => {
    setPhase('storyboard')
    setStoryboard(null)
    setPreviews({})
    setPreviewsDone(false)

    try {
      const sRes  = await fetch('/api/jarvis-studio/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creativeBrief, assets: uploadedAssets, intent }),
      })
      const sData = await sRes.json()
      if (!sData.storyboard?.concepts?.length) throw new Error(sData.error || 'Storyboard failed')
      setStoryboard(sData.storyboard)

      await Promise.all(sData.storyboard.concepts.map(async concept => {
        try {
          const pRes  = await fetch('/api/jarvis-studio/preview-scenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenes: concept.scenes.map(s => ({ id: s.id, dalle_prompt: s.dalle_prompt, label: s.label })) }),
          })
          const pData = await pRes.json()
          if (pData.previews) {
            setPreviews(prev => {
              const next = { ...prev }
              pData.previews.forEach(p => { if (p.imageUrl) next[p.id] = p.imageUrl })
              return next
            })
          }
        } catch {}
      }))
      setPreviewsDone(true)

    } catch (err) {
      setError(err.message || 'Storyboard generation failed')
    }
  }, [creativeBrief, uploadedAssets, intent])

  const handleProduce = useCallback(async (concept) => {
    setSelectedConcept(concept)
    setPhase('producing')
    setProductionJobs(null)
    setFinalAd(null)
    setError('')

    const scenePreviews = {}
    concept.scenes.forEach(s => { if (previews[s.id]) scenePreviews[s.id] = previews[s.id] })

    try {
      const res  = await fetch('/api/jarvis-studio/produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept, assets: uploadedAssets, scenePreviews,
          musicTrackId: uploadedAssets?.musicTrackId || null,
          musicUrl:     uploadedAssets?.musicUrl     || null,
        }),
      })
      const data = await res.json()
      if (!data.jobs) throw new Error(data.error || 'Production failed to start')
      setProductionJobs(data.jobs)

      let currentJobs = data.jobs
      if (pollRef.current) clearInterval(pollRef.current)
      pollRef.current = setInterval(async () => {
        try {
          const pRes  = await fetch('/api/jarvis-studio/produce-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobs: currentJobs }),
          })
          const pData = await pRes.json()
          if (pData.jobs) { currentJobs = pData.jobs; setProductionJobs(pData.jobs) }
          if (pData.overallStatus === 'complete') {
            clearInterval(pollRef.current); setFinalAd(pData.finalAd); setPhase('complete')
          } else if (pData.overallStatus === 'failed') {
            clearInterval(pollRef.current)
            setError(pData.error || 'Production failed. Check your HeyGen / Runway integration.')
            setPhase('storyboard')
          }
        } catch {}
      }, 8000)

    } catch (err) {
      setError(err.message || 'Production failed')
      setPhase('storyboard')
    }
  }, [previews, uploadedAssets])

  // ── Render ────────────────────────────────────────────────────────────────
  const previewCount = Object.keys(previews).length

  return (
    <div style={{ background: C.void, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: C.primary }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:.3 } }
        @keyframes shimmer { 0%,100% { opacity:.08 } 50% { opacity:.2 } }
        input, textarea, button { font-family: inherit; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#1e1e1e; border-radius:2px; }
        .drop-zone:hover  { border-color:#2a2a2a !important; }
        .drop-zone.filled { border-style:solid !important; }
        .intent-btn:hover { border-color:${C.goldBorder} !important; background:${C.goldBg} !important; }
        .music-track:hover { background:#0f0f0f !important; }
        .produce-btn:hover { background:${C.goldBg} !important; border-color:${C.gold} !important; color:${C.gold} !important; }
        .link-btn:hover { opacity:.7; }
      `}</style>

      {/* Nav */}
      <div style={{
        position:'sticky', top:0, zIndex:50,
        background:`${C.void}ee`, backdropFilter:'blur(16px)',
        borderBottom:`1px solid ${C.border}`,
        height:50, display:'flex', alignItems:'center', padding:'0 24px', gap:10,
      }}>
        <a href="/dashboard" style={{ fontSize:10, fontWeight:800, letterSpacing:3.5, color:C.gold, textTransform:'uppercase', textDecoration:'none' }}>PromptCEO</a>
        <span style={{ color:C.dim }}>|</span>
        <span style={{ fontSize:12, color:C.ghost }}>Jarvis Studio</span>
        {understanding?.brand?.name && <>
          <span style={{ color:C.dim }}>—</span>
          <span style={{ fontSize:12, color:C.secondary, fontWeight:600 }}>{understanding.brand.name}</span>
        </>}
        <div style={{ flex:1 }} />
        {phase !== 'input' && (
          <button onClick={resetAll} className="link-btn"
            style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:C.ghost, transition:'opacity .15s', padding:'4px 0' }}>
            ← New Project
          </button>
        )}
        <a href="/dashboard" className="link-btn" style={{ fontSize:11, color:C.ghost, textDecoration:'none', transition:'opacity .15s' }}>Dashboard</a>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background:C.redBg, borderBottom:`1px solid #3a1010`, padding:'10px 24px', fontSize:12, color:'#e07070', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{ background:'none', border:'none', color:'#e07070', cursor:'pointer', fontSize:14, lineHeight:1 }}>✕</button>
        </div>
      )}

      {/* ── INPUT ─────────────────────────────────────────────────────────────── */}
      {phase === 'input' && (
        <div style={{ maxWidth:700, margin:'0 auto', padding:'52px 20px 80px', animation:'fadeUp .4s ease both' }}>
          <div style={{ textAlign:'center', marginBottom:38 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:12 }}>✦ Jarvis Studio</div>
            <h1 style={{ fontSize:34, fontWeight:800, letterSpacing:-.5, lineHeight:1.12, marginBottom:12 }}>
              AI Creative Agency.<br />One screen.
            </h1>
            <p style={{ fontSize:13, color:C.muted, lineHeight:1.7, maxWidth:420, margin:'0 auto' }}>
              Give Jarvis your brand. It understands everything, builds a creative brief, designs 5 ad concepts, and produces complete ads using your assets.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

            {/* Website URL */}
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 16px' }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>Website URL</div>
              <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                style={{ width:'100%', background:'transparent', border:'none', outline:'none', fontSize:14, color:C.primary }} />
            </div>

            {/* Visual assets */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>

              {/* Founder */}
              <div className={`drop-zone${founderFile ? ' filled' : ''}`}
                onClick={() => founderInputRef.current?.click()}
                onDrop={e => { e.preventDefault(); handleFounderFile(e.dataTransfer.files[0]) }}
                onDragOver={e => e.preventDefault()}
                style={{
                  borderRadius:10, border: founderFile ? `1px solid ${C.goldBorder}` : `1px dashed #222`,
                  background: founderFile ? C.goldBg : C.surface, cursor:'pointer', padding:'16px 14px',
                  minHeight:110, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'border-color .2s, background .2s',
                }}>
                <input ref={founderInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFounderFile(e.target.files[0])} />
                {founderBlobUrl ? (
                  <>
                    <img src={founderBlobUrl} alt="" style={{ width:48, height:48, borderRadius:6, objectFit:'cover', border:`1px solid ${C.goldBorder}` }} />
                    <span style={{ fontSize:9, color:C.gold, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>Founder ✓</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize:20, opacity:.2 }}>👤</span>
                    <span style={{ fontSize:10, fontWeight:700, color:C.ghost, textTransform:'uppercase', letterSpacing:1 }}>Founder</span>
                    <span style={{ fontSize:9, color:C.dim }}>Click or drag</span>
                  </>
                )}
              </div>

              {/* Product images */}
              <div className={`drop-zone${productFiles.length ? ' filled' : ''}`}
                onClick={() => productInputRef.current?.click()}
                onDrop={e => { e.preventDefault(); handleProductFiles(e.dataTransfer.files) }}
                onDragOver={e => e.preventDefault()}
                style={{
                  borderRadius:10, border: productFiles.length ? `1px solid ${C.teal}44` : `1px dashed #222`,
                  background: productFiles.length ? C.tealBg : C.surface, cursor:'pointer', padding:'16px 14px',
                  minHeight:110, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'border-color .2s, background .2s',
                }}>
                <input ref={productInputRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => handleProductFiles(e.target.files)} />
                {productFiles.length ? (
                  <>
                    <div style={{ display:'flex', gap:3, flexWrap:'wrap', justifyContent:'center' }}>
                      {productFiles.slice(0,4).map((p,i) => (
                        <img key={i} src={p.blobUrl} alt="" style={{ width:32, height:32, borderRadius:4, objectFit:'cover', border:`1px solid ${C.teal}33` }} />
                      ))}
                    </div>
                    <span style={{ fontSize:9, color:C.teal, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>
                      {productFiles.length} Product{productFiles.length > 1 ? 's' : ''} ✓
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize:20, opacity:.2 }}>🖼</span>
                    <span style={{ fontSize:10, fontWeight:700, color:C.ghost, textTransform:'uppercase', letterSpacing:1 }}>Product</span>
                    <span style={{ fontSize:9, color:C.dim }}>Up to 6 images</span>
                  </>
                )}
              </div>

              {/* Video */}
              <div className={`drop-zone${videoFiles.length ? ' filled' : ''}`}
                onClick={() => videoInputRef.current?.click()}
                onDrop={e => { e.preventDefault(); handleVideoFiles(e.dataTransfer.files) }}
                onDragOver={e => e.preventDefault()}
                style={{
                  borderRadius:10, border: videoFiles.length ? `1px solid ${C.purple}44` : `1px dashed #222`,
                  background: videoFiles.length ? C.purpleBg : C.surface, cursor:'pointer', padding:'16px 14px',
                  minHeight:110, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'border-color .2s, background .2s',
                }}>
                <input ref={videoInputRef} type="file" accept="video/*" multiple style={{ display:'none' }} onChange={e => handleVideoFiles(e.target.files)} />
                {videoFiles.length ? (
                  <>
                    <span style={{ fontSize:20 }}>🎬</span>
                    <span style={{ fontSize:9, color:C.purple, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>
                      {videoFiles.length} Video{videoFiles.length > 1 ? 's' : ''} ✓
                    </span>
                    <span style={{ fontSize:9, color:C.dim, maxWidth:90, textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {videoFiles[0].file.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize:20, opacity:.2 }}>🎬</span>
                    <span style={{ fontSize:10, fontWeight:700, color:C.ghost, textTransform:'uppercase', letterSpacing:1 }}>Video</span>
                    <span style={{ fontSize:9, color:C.dim }}>MP4, MOV, WebM</span>
                  </>
                )}
              </div>
            </div>

            {/* Creative direction */}
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 16px' }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>
                Creative Direction
                <span style={{ marginLeft:8, fontWeight:400, fontSize:9, color:C.dim, letterSpacing:0, textTransform:'none' }}>optional</span>
              </div>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3}
                placeholder={`e.g. "Create a direct-response founder ad showing how quickly PromptCEO turns a brief into a complete campaign."`}
                style={{ width:'100%', background:'transparent', border:'none', outline:'none', resize:'none', fontSize:13, color:C.secondary, lineHeight:1.65 }} />
            </div>

            {/* Music */}
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 16px' }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>Music</div>
              <div style={{ display:'flex', gap:6, marginBottom:12 }}>
                {[{ id:'ai_choose', label:'AI Chooses' }, { id:'library', label:'Library' }, { id:'upload', label:'Upload' }].map(opt => (
                  <button key={opt.id} onClick={() => setMusicMode(opt.id)}
                    style={{
                      padding:'5px 13px', borderRadius:6, fontSize:11, fontWeight:600, cursor:'pointer', transition:'all .15s',
                      border:`1px solid ${musicMode === opt.id ? `${C.gold}55` : C.border}`,
                      background: musicMode === opt.id ? C.goldBg : C.raised,
                      color: musicMode === opt.id ? C.gold : C.ghost,
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>

              {musicMode === 'ai_choose' && (
                <div style={{ fontSize:12, color:C.dim }}>Jarvis selects a track that fits the ad's tone and pacing.</div>
              )}

              {musicMode === 'library' && (
                <div>
                  {musicLoading && <div style={{ fontSize:12, color:C.dim }}>Loading tracks...</div>}
                  {!musicLoading && !musicTracks.length && <div style={{ fontSize:12, color:C.dim }}>No tracks available.</div>}
                  {musicTracks.map(track => (
                    <div key={track.id} className="music-track"
                      onClick={() => setMusicTrackId(musicTrackId === track.id ? null : track.id)}
                      style={{
                        display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:7, cursor:'pointer',
                        background: musicTrackId === track.id ? C.goldBg : 'transparent',
                        border: musicTrackId === track.id ? `1px solid ${C.goldBorder}` : '1px solid transparent',
                        transition:'background .15s', marginBottom:3,
                      }}>
                      <button onClick={e => { e.stopPropagation(); track.preview_url && toggleTrack(track.id, track.preview_url) }}
                        style={{ background:'none', border:`1px solid ${C.border}`, borderRadius:4, color:C.ghost, cursor:'pointer', padding:'2px 7px', fontSize:10 }}>
                        {playingTrackId === track.id ? '■' : '▶'}
                      </button>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, color:C.secondary, fontWeight:600 }}>{track.title}</div>
                        <div style={{ fontSize:10, color:C.ghost }}>{track.artist}{track.genre ? ` · ${track.genre}` : ''}</div>
                      </div>
                      {musicTrackId === track.id && <span style={{ fontSize:10, color:C.gold, flexShrink:0 }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}

              {musicMode === 'upload' && (
                <>
                  <input ref={musicInputRef} type="file" accept="audio/*" style={{ display:'none' }} onChange={e => { if (e.target.files[0]) setMusicFile(e.target.files[0]) }} />
                  <button onClick={() => musicInputRef.current?.click()}
                    style={{ padding:'8px 14px', borderRadius:7, background:'transparent', border:`1px dashed #252525`, color: musicFile ? C.gold : C.dim, cursor:'pointer', fontSize:12, transition:'border-color .15s' }}>
                    {musicFile ? `✓ ${musicFile.name}` : '+ Upload audio file'}
                  </button>
                </>
              )}
            </div>
          </div>

          <button onClick={handleStart}
            style={{ width:'100%', marginTop:16, padding:'15px 24px', borderRadius:10, border:'none', background:C.gold, color:'#000', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:2, cursor:'pointer' }}>
            Understand & Create Ads →
          </button>
          <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:C.dim }}>
            Understand → Brief → 5 Concepts → Produce → Download
          </div>
        </div>
      )}

      {/* ── INTENT ────────────────────────────────────────────────────────────── */}
      {phase === 'intent' && (
        <div style={{ maxWidth:560, margin:'0 auto', padding:'68px 20px', animation:'fadeUp .35s ease both' }}>
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:10 }}>✦ One Question</div>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:10 }}>What should Jarvis create?</h2>
            <p style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>
              You've uploaded{founderFile ? ' a founder image' : ''}{productFiles.length ? ` ${productFiles.length} product image${productFiles.length > 1 ? 's' : ''}` : ''}{videoFiles.length ? ' and video' : ''}. What kind of ad?
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {INTENT_OPTIONS.map(opt => (
              <button key={opt.id} className="intent-btn"
                onClick={() => { setIntent(opt.id); startAnalysis(opt.id) }}
                style={{ padding:'14px 16px', borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, cursor:'pointer', textAlign:'left', transition:'border-color .15s, background .15s' }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.secondary, marginBottom:2 }}>{opt.label}</div>
                <div style={{ fontSize:11, color:C.ghost }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ANALYZING ─────────────────────────────────────────────────────────── */}
      {phase === 'analyzing' && (
        <div style={{ maxWidth:420, margin:'0 auto', padding:'88px 20px', textAlign:'center', animation:'fadeUp .35s ease both' }}>
          <div style={{ width:40, height:40, border:`2px solid ${C.border}`, borderTopColor:C.gold, borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 22px' }} />
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:18 }}>✦ Jarvis</div>
          <div style={{ display:'flex', flexDirection:'column', gap:7, maxWidth:300, margin:'0 auto' }}>
            {statusItems.map(item => (
              <div key={item.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 13px', borderRadius:8, background:C.surface, border:`1px solid ${C.border}` }}>
                <div style={{
                  width:6, height:6, borderRadius:'50%', flexShrink:0,
                  background: item.status === 'done' ? C.green : item.status === 'active' ? C.gold : C.dim,
                  animation: item.status === 'active' ? 'pulse .9s ease-in-out infinite' : 'none',
                }} />
                <span style={{ fontSize:12, color: item.status === 'done' ? C.secondary : item.status === 'active' ? C.primary : C.ghost }}>
                  {item.label}
                </span>
                {item.status === 'done' && <span style={{ marginLeft:'auto', fontSize:10, color:C.green }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ASSESSMENT ───────────────────────────────────────────────────────── */}
      {phase === 'assessment' && assessment && (
        <div style={{ maxWidth:740, margin:'0 auto', padding:'32px 20px 80px', animation:'fadeUp .4s ease both' }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:10 }}>✦ Jarvis Assessment</div>
            <div style={{ fontSize:26, fontWeight:800, letterSpacing:-.3, marginBottom:6 }}>
              {understanding?.brand?.name || 'Your Brand'}
            </div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>
              {assessment.whatIUnderstand?.whatTheyDo}
            </div>
          </div>

          {/* Asset Manifest — source of truth used by Jarvis, returned from the route */}
          {assetManifest && (() => {
            const rows = [
              { label:'Website URL',        present: assetManifest.website?.present,       detail: assetManifest.website?.scraped ? 'crawled' : null },
              { label:'Founder Image',      present: assetManifest.founderImage?.present,  detail: null },
              { label:'Product Images',     present: assetManifest.productImages?.present, detail: assetManifest.productImages?.count > 0 ? `${assetManifest.productImages.count} image${assetManifest.productImages.count > 1 ? 's' : ''}` : null },
              { label:'Product Video',      present: assetManifest.productVideo?.present,  detail: assetManifest.productVideo?.transcriptAvailable ? 'transcribed' : assetManifest.productVideo?.present ? 'no transcript' : null },
              { label:'Music Track',        present: assetManifest.music?.present,         detail: null },
              { label:'Creative Direction', present: assetManifest.prompt?.present,        detail: null },
            ]
            return (
              <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 18px', marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase' }}>Asset Manifest Used by Jarvis</div>
                  <div style={{ fontSize:9, color:C.dim, background:C.raised, padding:'1px 6px', borderRadius:3 }}>source of truth</div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {rows.map(({ label, present, detail }) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:11, color: present ? C.green : C.dim, flexShrink:0 }}>{present ? '✓' : '✗'}</span>
                      <span style={{ fontSize:12, color: present ? C.secondary : C.ghost }}>
                        {label}
                        {detail && <span style={{ fontSize:10, color:C.ghost, marginLeft:4 }}>· {detail}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Evidence Used */}
          {assessment.evidenceUsed && (() => {
            const entries = Object.entries(assessment.evidenceUsed).filter(([k, v]) => v && k !== 'summary')
            const labels = { website:'Website', founderImage:'Founder Image', productImages:'Product Images', video:'Video', prompt:'Stated Direction' }
            return entries.length ? (
              <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 18px', marginBottom:10 }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>Evidence Used</div>
                {assessment.evidenceUsed.summary && (
                  <div style={{ fontSize:12, color:C.muted, marginBottom:10, fontStyle:'italic', borderLeft:`2px solid ${C.gold}44`, paddingLeft:10 }}>
                    {assessment.evidenceUsed.summary}
                  </div>
                )}
                {entries.map(([key, value]) => (
                  <div key={key} style={{ marginBottom:8, paddingBottom:8, borderBottom:`1px solid ${C.divide}` }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:3 }}>
                      {labels[key] || key}
                    </div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>{value}</div>
                  </div>
                ))}
              </div>
            ) : null
          })()}

          {/* Video Analysis */}
          {assessment.videoAnalysis && (
            <div style={{ borderRadius:10, border:`1px solid ${C.purple}33`, background:C.purpleBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.purple}99`, textTransform:'uppercase', marginBottom:14 }}>Video Analysis</div>

              {assessment.videoAnalysis.whatIObserved?.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.purple}66`, textTransform:'uppercase', marginBottom:8 }}>What I Observed</div>
                  {assessment.videoAnalysis.whatIObserved.map((item, i) => (
                    <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:5 }}>
                      <span style={{ color:C.purple, fontSize:9, marginTop:3, flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {assessment.videoAnalysis.strongestProofPoints?.length > 0 && (
                  <div>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.green}66`, textTransform:'uppercase', marginBottom:8 }}>Strongest Proof Points</div>
                    {assessment.videoAnalysis.strongestProofPoints.map((item, i) => (
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:5 }}>
                        <span style={{ color:C.green, fontSize:9, marginTop:3, flexShrink:0 }}>✓</span>
                        <span style={{ fontSize:11, color:C.secondary, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {assessment.videoAnalysis.strongestAdMoments?.length > 0 && (
                  <div>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:8 }}>Strongest Ad Moments</div>
                    {assessment.videoAnalysis.strongestAdMoments.map((item, i) => (
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:5 }}>
                        <span style={{ color:C.gold, fontSize:9, marginTop:3, flexShrink:0 }}>✦</span>
                        <span style={{ fontSize:11, color:C.secondary, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {assessment.videoAnalysis.visualOpportunities?.length > 0 && (
                <div style={{ marginTop:12 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.teal}66`, textTransform:'uppercase', marginBottom:8 }}>Visual Opportunities</div>
                  {assessment.videoAnalysis.visualOpportunities.map((item, i) => (
                    <div key={i} style={{ fontSize:12, color:C.muted, marginBottom:4 }}>→ {item}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* What I Understand */}
          <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'16px 18px', marginBottom:10 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:12 }}>What I Understand</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { label:'Who they serve', value:assessment.whatIUnderstand?.whoTheyServe },
                { label:'What stands out', value:assessment.whatIUnderstand?.whatStandsOut },
              ].filter(i => i.value).map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What I Like */}
          {assessment.whatILike?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.green}22`, background:C.greenBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.green}88`, textTransform:'uppercase', marginBottom:10 }}>What I Like</div>
              {assessment.whatILike.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', marginBottom:7 }}>
                  <span style={{ color:C.green, fontSize:10, marginTop:3, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* What Concerns Me */}
          {assessment.whatConcernsMe?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid #c8a84b33`, background:'#0a0800', padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:10 }}>What Concerns Me</div>
              {assessment.whatConcernsMe.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', marginBottom:7 }}>
                  <span style={{ color:C.gold, fontSize:10, marginTop:3, flexShrink:0 }}>⚠</span>
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* What I Would Change */}
          {assessment.whatIWouldChange?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.teal}22`, background:C.tealBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.teal}88`, textTransform:'uppercase', marginBottom:10 }}>What I Would Change</div>
              {assessment.whatIWouldChange.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', marginBottom:7 }}>
                  <span style={{ color:C.teal, fontSize:10, marginTop:3, flexShrink:0 }}>→</span>
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Founder Opportunity */}
          {assessment.founderOpportunity && (
            <div style={{ borderRadius:10, border:`1px solid ${C.goldBorder}`, background:C.goldBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:12 }}>Founder Opportunity</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { label:'How to use', value:assessment.founderOpportunity.howToUse },
                  { label:'Trust angle', value:assessment.founderOpportunity.trustOpportunities },
                  { label:'Authority', value:assessment.founderOpportunity.authorityOpportunities },
                  { label:'Personal story', value:assessment.founderOpportunity.personalStory },
                ].filter(i => i.value).map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Opportunity */}
          {assessment.productOpportunity && (
            <div style={{ borderRadius:10, border:`1px solid ${C.teal}22`, background:C.tealBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.teal}88`, textTransform:'uppercase', marginBottom:12 }}>Product Opportunity</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { label:'What stands out', value:assessment.productOpportunity.whatStandsOut },
                  { label:'What to emphasize', value:assessment.productOpportunity.whatToEmphasize },
                  { label:'Visual moments', value:assessment.productOpportunity.visualMoments },
                ].filter(i => i.value).map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.teal}66`, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What You're Getting Wrong */}
          {assessment.whatYoureGettingWrong?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.red}33`, background:C.redBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.red}99`, textTransform:'uppercase', marginBottom:10 }}>What You're Getting Wrong</div>
              {assessment.whatYoureGettingWrong.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', marginBottom:7 }}>
                  <span style={{ color:C.red, fontSize:11, marginTop:2, flexShrink:0 }}>✕</span>
                  <span style={{ fontSize:12, color:'#e08080', lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* What I Would Test First */}
          {assessment.whatIWouldTestFirst && (
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:12 }}>What I Would Test First</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12 }}>
                {['testA','testB','testC'].map(key => {
                  const test = assessment.whatIWouldTestFirst[key]
                  const label = key.replace('test','Test ')
                  const isPick = assessment.whatIWouldTestFirst.jarvispick === label.replace('Test ','')
                  if (!test) return null
                  return (
                    <div key={key} style={{
                      padding:'12px 14px', borderRadius:8,
                      border: isPick ? `1px solid ${C.goldBorder}` : `1px solid ${C.border}`,
                      background: isPick ? C.goldBg : C.raised,
                      position:'relative',
                    }}>
                      {isPick && <div style={{ position:'absolute', top:8, right:10, fontSize:9, fontWeight:700, color:C.gold, letterSpacing:1 }}>JARVIS PICK</div>}
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color: isPick ? `${C.gold}88` : C.ghost, textTransform:'uppercase', marginBottom:6 }}>{label}</div>
                      <div style={{ fontSize:12, fontWeight:700, color: isPick ? C.gold : C.primary, marginBottom:4 }}>{test.name}</div>
                      <div style={{ fontSize:10, color:C.ghost, marginBottom:6 }}>{test.format}</div>
                      <div style={{ fontSize:11, color:C.muted, lineHeight:1.5 }}>{test.hypothesis}</div>
                    </div>
                  )
                })}
              </div>
              {assessment.whatIWouldTestFirst.whyThisWins && (
                <div style={{ padding:'10px 14px', borderRadius:8, background:C.goldBg, border:`1px solid ${C.goldBorder}`, fontSize:12, color:C.secondary, lineHeight:1.6, fontStyle:'italic' }}>
                  <span style={{ color:`${C.gold}88`, fontSize:9, fontWeight:700, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:4 }}>Why this wins</span>
                  "{assessment.whatIWouldTestFirst.whyThisWins}"
                </div>
              )}
            </div>
          )}

          {/* Missing Uploaded Assets — computed by code from assetManifest, never from GPT */}
          {missingUploaded?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.red}22`, background:C.redBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.red}88`, textTransform:'uppercase', marginBottom:4 }}>Missing Uploaded Assets</div>
              <div style={{ fontSize:11, color:C.ghost, marginBottom:10 }}>Assets you did not upload to Jarvis for this session.</div>
              {missingUploaded.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:9, paddingBottom:9, borderBottom: i < missingUploaded.length - 1 ? `1px solid #2a0808` : 'none' }}>
                  <span style={{ fontSize:9, padding:'2px 7px', borderRadius:4, background:'#200000', color:`${C.red}66`, textTransform:'uppercase', letterSpacing:1, flexShrink:0, marginTop:2, whiteSpace:'nowrap' }}>Not uploaded</span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.secondary, marginBottom:2 }}>{item.asset}</div>
                    <div style={{ fontSize:11, color:C.ghost, lineHeight:1.5 }}>{item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Missing Marketing Assets */}
          {assessment.missingMarketingAssets?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid #c8a84b22`, background:'#0a0800', padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:4 }}>Missing Marketing Assets</div>
              <div style={{ fontSize:11, color:C.ghost, marginBottom:10 }}>Assets the business appears to lack publicly — separate from what you uploaded.</div>
              {assessment.missingMarketingAssets.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:9, paddingBottom:9, borderBottom: i < assessment.missingMarketingAssets.length - 1 ? `1px solid #1a1500` : 'none' }}>
                  <span style={{ fontSize:9, padding:'2px 7px', borderRadius:4, background:'#1a1000', color:`${C.gold}66`, textTransform:'uppercase', letterSpacing:1, flexShrink:0, marginTop:2, whiteSpace:'nowrap' }}>Missing</span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.secondary, marginBottom:2 }}>{item.asset}</div>
                    <div style={{ fontSize:11, color:C.ghost, lineHeight:1.5 }}>{item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* If This Were My Company */}
          {assessment.ifThisWereMyCompany && (
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>If This Were My Company</div>
              {assessment.ifThisWereMyCompany.focus && (
                <div style={{ fontSize:13, fontWeight:700, color:C.primary, marginBottom:14, lineHeight:1.5, borderLeft:`2px solid ${C.gold}55`, paddingLeft:12 }}>
                  {assessment.ifThisWereMyCompany.focus}
                </div>
              )}
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>30-Day Actions</div>
              {(assessment.ifThisWereMyCompany.thirtyDayActions || []).map((item, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:C.raised, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:10, fontWeight:700, color:C.gold }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.primary, marginBottom:2 }}>{item.action}</div>
                    <div style={{ fontSize:11, color:C.ghost, lineHeight:1.5 }}>{item.why}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Competitive Intelligence */}
          {assessment.competitiveIntelligence && (
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:14 }}>Competitive Intelligence</div>

              {/* Competitor cards */}
              {assessment.competitiveIntelligence.competitors?.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.dim, textTransform:'uppercase', marginBottom:8 }}>Key Competitors</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {assessment.competitiveIntelligence.competitors.map((c, i) => (
                      <div key={i} style={{ padding:'10px 13px', borderRadius:8, background:C.raised, border:`1px solid ${C.border}`, minWidth:150, flex:'1 1 150px' }}>
                        <div style={{ fontSize:12, fontWeight:700, color:C.primary, marginBottom:4 }}>{c.name}</div>
                        <div style={{ fontSize:11, color:C.muted, lineHeight:1.5, marginBottom:4 }}>{c.knownFor}</div>
                        {c.whatTheyDoWell && <div style={{ fontSize:10, color:C.ghost, lineHeight:1.4 }}>↑ {c.whatTheyDoWell}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Win/Lose */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                {assessment.competitiveIntelligence.whyWeWin?.length > 0 && (
                  <div style={{ padding:'12px 14px', borderRadius:8, background:C.greenBg, border:`1px solid ${C.green}22` }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.green}88`, textTransform:'uppercase', marginBottom:8 }}>Why We Win</div>
                    {assessment.competitiveIntelligence.whyWeWin.map((item, i) => (
                      <div key={i} style={{ display:'flex', gap:7, alignItems:'flex-start', marginBottom:5 }}>
                        <span style={{ color:C.green, fontSize:9, marginTop:3, flexShrink:0 }}>✓</span>
                        <span style={{ fontSize:11, color:C.secondary, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {assessment.competitiveIntelligence.whyWeLose?.length > 0 && (
                  <div style={{ padding:'12px 14px', borderRadius:8, background:C.redBg, border:`1px solid ${C.red}22` }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.red}88`, textTransform:'uppercase', marginBottom:8 }}>Why We Lose</div>
                    {assessment.competitiveIntelligence.whyWeLose.map((item, i) => (
                      <div key={i} style={{ display:'flex', gap:7, alignItems:'flex-start', marginBottom:5 }}>
                        <span style={{ color:C.red, fontSize:9, marginTop:3, flexShrink:0 }}>✕</span>
                        <span style={{ fontSize:11, color:'#e08080', lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Must Improve */}
              {assessment.competitiveIntelligence.whatWeMustImprove?.length > 0 && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.dim, textTransform:'uppercase', marginBottom:8 }}>What We Must Improve</div>
                  {assessment.competitiveIntelligence.whatWeMustImprove.map((item, i) => (
                    <div key={i} style={{ fontSize:12, color:C.muted, marginBottom:5, lineHeight:1.5 }}>→ {item}</div>
                  ))}
                </div>
              )}

              {/* Opportunity Gap */}
              {assessment.competitiveIntelligence.opportunityGap && (
                <div style={{ padding:'12px 14px', borderRadius:8, background:`${C.gold}08`, border:`1px solid ${C.goldBorder}` }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:6 }}>Opportunity Gap</div>
                  <div style={{ fontSize:12, color:C.secondary, lineHeight:1.7 }}>{assessment.competitiveIntelligence.opportunityGap}</div>
                </div>
              )}
            </div>
          )}

          {/* My Recommended Campaign */}
          {assessment.myRecommendedCampaign && (
            <div style={{ borderRadius:10, border:`1px solid ${C.gold}55`, background:`linear-gradient(135deg, #0c0900, #050400)`, padding:'20px 20px', marginBottom:22 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:10 }}>My Recommended Campaign</div>
              <div style={{ fontSize:17, fontWeight:800, color:C.gold, marginBottom:12, lineHeight:1.3 }}>
                {assessment.myRecommendedCampaign.headline}
              </div>
              <div style={{ fontSize:13, color:C.secondary, lineHeight:1.75, fontStyle:'italic', marginBottom:12, borderLeft:`2px solid ${C.gold}44`, paddingLeft:14 }}>
                "{assessment.myRecommendedCampaign.argument}"
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { label:'Lead angle', value:assessment.myRecommendedCampaign.angle },
                  { label:'Why this beats the alternatives', value:assessment.myRecommendedCampaign.why },
                ].filter(i => i.value).map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}55`, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setPhase('input')}
              style={{ padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
              Edit Inputs
            </button>
            <button onClick={handleBuildBrief}
              style={{ flex:1, padding:'12px 24px', borderRadius:8, border:'none', background:C.gold, color:'#000', cursor:'pointer', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:1.5 }}>
              Build My Campaign →
            </button>
          </div>
        </div>
      )}

      {/* ── BRIEF ─────────────────────────────────────────────────────────────── */}
      {phase === 'brief' && creativeBrief && (
        <div style={{ maxWidth:740, margin:'0 auto', padding:'32px 20px 80px', animation:'fadeUp .4s ease both' }}>
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:10 }}>✦ What Jarvis Understands</div>
            <div style={{ fontSize:25, fontWeight:800, marginBottom:4 }}>
              {creativeBrief.summary?.product || understanding?.brand?.name || 'Your Brand'}
            </div>
            {creativeBrief.summary?.audience && (
              <div style={{ fontSize:13, color:C.muted }}>For: {creativeBrief.summary.audience}</div>
            )}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
            {[
              { label:'Problem',          value:creativeBrief.summary?.problem },
              { label:'Solution',         value:creativeBrief.summary?.solution },
              { label:'Key Benefit',      value:creativeBrief.summary?.keyBenefit },
              { label:'Production Style', value:creativeBrief.recommendedStyle },
            ].filter(i => i.value).map(({ label, value }) => (
              <div key={label} style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:5 }}>{label}</div>
                <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{value}</div>
              </div>
            ))}
          </div>

          {creativeBrief.hook && (
            <div style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.goldBorder}`, background:C.goldBg, marginBottom:12 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:5 }}>Opening Hook</div>
              <div style={{ fontSize:13, color:C.primary, fontStyle:'italic', lineHeight:1.6 }}>"{creativeBrief.hook}"</div>
            </div>
          )}

          {creativeBrief.keyMessages?.length > 0 && (
            <div style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, marginBottom:12 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>Key Messages</div>
              {creativeBrief.keyMessages.map((msg, i) => (
                <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:5 }}>
                  <span style={{ color:C.gold, fontSize:9, marginTop:3, flexShrink:0 }}>✦</span>
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{msg}</span>
                </div>
              ))}
            </div>
          )}

          {creativeBrief.assetPlan && (() => {
            const entries = Object.entries(creativeBrief.assetPlan).filter(([, v]) => v?.role)
            return entries.length ? (
              <div style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, marginBottom:12 }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>How Each Asset Will Be Used</div>
                {entries.map(([key, plan]) => (
                  <div key={key} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:8 }}>
                    <span style={{ fontSize:9, padding:'2px 7px', borderRadius:4, background:C.raised, color:C.ghost, textTransform:'uppercase', letterSpacing:1, flexShrink:0, marginTop:2, whiteSpace:'nowrap' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div>
                      <div style={{ fontSize:12, color:C.secondary, lineHeight:1.5 }}>{plan.role}</div>
                      {plan.scenes && <div style={{ fontSize:11, color:C.ghost, marginTop:2 }}>{plan.scenes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          })()}

          {creativeBrief.newContentNeeded?.length > 0 && (
            <div style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.teal}22`, background:C.tealBg, marginBottom:20 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.teal}88`, textTransform:'uppercase', marginBottom:8 }}>Jarvis Will Generate</div>
              {creativeBrief.newContentNeeded.map((item, i) => (
                <div key={i} style={{ fontSize:12, color:C.muted, marginBottom:4 }}>→ {item}</div>
              ))}
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setPhase('input')}
              style={{ padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
              Edit Inputs
            </button>
            <button onClick={handleApproveBrief}
              style={{ flex:1, padding:'12px 24px', borderRadius:8, border:'none', background:C.gold, color:'#000', cursor:'pointer', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:1.5 }}>
              Approve & Create Storyboards →
            </button>
          </div>
        </div>
      )}

      {/* ── STORYBOARD ────────────────────────────────────────────────────────── */}
      {phase === 'storyboard' && (
        <div style={{ maxWidth:1060, margin:'0 auto', padding:'24px 20px 80px', animation:'fadeUp .4s ease both' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:18, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:8 }}>✦ Storyboard</div>
              <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>
                {understanding?.brand?.name || creativeBrief?.summary?.product || '5 Ad Concepts'}
              </div>
              <div style={{ fontSize:12, color:C.ghost }}>
                {storyboard
                  ? `${storyboard.concepts.length} concepts · ${storyboard.concepts.reduce((s,c) => s + c.scenes.length, 0)} scenes`
                  : 'Designing concepts...'}
                {storyboard && !previewsDone && (
                  <span style={{ marginLeft:10, color:C.gold }}>
                    <span style={{ display:'inline-block', animation:'pulse 1s infinite' }}>●</span>
                    {' '}Generating previews ({previewCount}/{storyboard.concepts.reduce((s,c) => s + c.scenes.length, 0)})
                  </span>
                )}
                {storyboard && previewsDone && <span style={{ marginLeft:10, color:C.green }}>✓ All previews ready</span>}
              </div>
            </div>
          </div>

          {!storyboard && (
            <div style={{ textAlign:'center', padding:'60px 0', color:C.ghost }}>
              <div style={{ width:32, height:32, border:`2px solid ${C.border}`, borderTopColor:C.gold, borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
              <div style={{ fontSize:13 }}>Designing 5 ad concepts...</div>
            </div>
          )}

          {storyboard && (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {storyboard.concepts.map((concept, ci) => (
                <div key={concept.id} style={{ borderRadius:12, border:`1px solid ${C.border}`, background:C.surface, overflow:'hidden', animation:`fadeUp .4s ease ${ci * .08}s both` }}>
                  <div style={{ padding:'13px 18px 11px', borderBottom:`1px solid ${C.divide}`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:14 }}>
                    <div style={{ minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, flexWrap:'wrap' }}>
                        <span style={{ fontSize:10, color:C.dim, fontWeight:700 }}>0{ci + 1}</span>
                        <span style={{ fontSize:15, fontWeight:700 }}>{concept.title}</span>
                        <span style={{ fontSize:9, padding:'2px 7px', borderRadius:10, background:C.raised, color:C.ghost, textTransform:'uppercase', letterSpacing:1 }}>
                          {(concept.angle || '').replace(/_/g, ' ')}
                        </span>
                        <span style={{ fontSize:10, color:C.dim }}>· {concept.total_duration}s</span>
                      </div>
                      <div style={{ fontSize:12, color:C.muted, fontStyle:'italic' }}>"{concept.logline}"</div>
                    </div>
                    <button className="produce-btn" onClick={() => handleProduce(concept)}
                      style={{ padding:'8px 16px', borderRadius:7, flexShrink:0, border:`1px solid ${C.border}`, background:C.raised, color:C.ghost, cursor:'pointer', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, transition:'all .15s', whiteSpace:'nowrap' }}>
                      Produce →
                    </button>
                  </div>
                  <div style={{ display:'flex', gap:9, padding:'11px 18px 14px', overflowX:'auto' }}>
                    {concept.scenes.map(scene => (
                      <SceneThumb key={scene.id} scene={scene} imageUrl={previews[scene.id]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── PRODUCING ─────────────────────────────────────────────────────────── */}
      {phase === 'producing' && selectedConcept && (
        <div style={{ maxWidth:580, margin:'0 auto', padding:'52px 20px', animation:'fadeUp .35s ease both' }}>
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:10 }}>✦ Producing</div>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>{selectedConcept.title}</div>
            <div style={{ fontSize:12, color:C.ghost }}>{selectedConcept.logline}</div>
          </div>

          {productionJobs?.heygenKey === 'missing' && (
            <div style={{ padding:'11px 14px', borderRadius:8, background:'#120a00', border:`1px solid ${C.gold}33`, marginBottom:14, fontSize:12, color:C.gold }}>
              ⚠ HeyGen not connected — founder clips will be skipped.{' '}
              <a href="/account" style={{ color:C.gold, textDecoration:'underline' }}>Connect in Settings</a>
            </div>
          )}
          {productionJobs?.runwayKey === 'missing' && (
            <div style={{ padding:'11px 14px', borderRadius:8, background:'#050a0a', border:`1px solid ${C.teal}33`, marginBottom:14, fontSize:12, color:C.teal }}>
              ⚠ Runway not connected — visual clips will be skipped.{' '}
              <a href="/account" style={{ color:C.teal, textDecoration:'underline' }}>Connect in Settings</a>
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:22 }}>
            {selectedConcept.scenes.map(scene => {
              const job    = productionJobs?.sceneJobs?.find(j => j.sceneId === scene.id)
              const status = job?.status || 'queued'
              const dotColor = status === 'complete' ? C.green : ['generating', 'awaiting_avatar', 'starting', 'avatar_ready_needs_start'].includes(status) ? C.gold : C.dim
              const statusLabel = {
                queued: 'Queued', generating: 'Generating...', awaiting_avatar: 'Waiting for avatar...',
                complete: 'Done ✓', error: 'Error', skipped: 'Skipped', skipped_no_key: 'No API key',
                avatar_ready_needs_start: 'Starting...', starting: 'Starting...',
              }[status] || status
              return (
                <div key={scene.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:8, background:C.surface, border:`1px solid ${C.border}` }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', flexShrink:0, background:dotColor, animation:['generating','awaiting_avatar'].includes(status) ? 'pulse .9s infinite' : 'none' }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:C.secondary }}>{scene.label}</div>
                    <div style={{ fontSize:10, color:C.ghost, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {scene.script || (scene.visual_direction?.slice(0, 70) + '...') || ''}
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                    <span style={{ fontSize:9, padding:'2px 6px', borderRadius:4, fontWeight:700, background:scene.generator === 'heygen' ? C.goldBg : C.tealBg, color:scene.generator === 'heygen' ? C.gold : C.teal }}>
                      {scene.generator === 'heygen' ? 'HeyGen' : 'Runway'}
                    </span>
                    <span style={{ fontSize:10, color:status === 'complete' ? C.green : C.ghost }}>{statusLabel}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {productionJobs?.assemblyStatus && !['complete', null, undefined].includes(productionJobs.assemblyStatus) && (
            <div style={{ padding:'10px 14px', borderRadius:8, background:C.goldBg, border:`1px solid ${C.goldBorder}`, marginBottom:14, fontSize:12, color:C.gold }}>
              <span style={{ display:'inline-block', animation:'pulse 1s infinite', marginRight:6 }}>●</span>
              Assembling final MP4...
            </div>
          )}

          <div style={{ fontSize:12, color:C.dim, textAlign:'center', lineHeight:1.7 }}>
            This typically takes 4–10 minutes. You can leave and return.
          </div>
        </div>
      )}

      {/* ── COMPLETE ──────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <div style={{ maxWidth:600, margin:'0 auto', padding:'52px 20px', animation:'fadeUp .4s ease both' }}>
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:C.greenBg, border:`1px solid ${C.green}44`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:18 }}>✓</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:C.green, textTransform:'uppercase', marginBottom:8 }}>Ad Ready</div>
            <div style={{ fontSize:22, fontWeight:800 }}>{selectedConcept?.title}</div>
          </div>

          {finalAd?.exportUrl && (
            <div style={{ marginBottom:18, borderRadius:10, overflow:'hidden', border:`1px solid ${C.border}` }}>
              <video src={finalAd.exportUrl} controls playsInline style={{ width:'100%', display:'block', background:'#000', maxHeight:480 }} />
            </div>
          )}

          <div style={{ display:'flex', gap:10, marginBottom:18 }}>
            {finalAd?.exportUrl && (
              <a href={finalAd.exportUrl} download target="_blank" rel="noopener noreferrer"
                style={{ flex:1, padding:'13px 20px', borderRadius:8, background:C.gold, color:'#000', textDecoration:'none', fontSize:13, fontWeight:800, textAlign:'center', textTransform:'uppercase', letterSpacing:1.5 }}>
                Download MP4
              </a>
            )}
            <button onClick={() => setPhase('storyboard')} style={{ padding:'13px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
              Other Concepts
            </button>
            <button onClick={resetAll} style={{ padding:'13px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
              New Project
            </button>
          </div>

          {selectedConcept?.scenes?.some(s => s.script) && (
            <div style={{ padding:'13px 16px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, marginBottom:12 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>Script</div>
              {selectedConcept.scenes.filter(s => s.script).map((s, i) => (
                <div key={i} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:9, color:C.dim, textTransform:'uppercase', letterSpacing:1, marginBottom:3 }}>{s.label}</div>
                  <div style={{ fontSize:12, color:C.secondary, lineHeight:1.65 }}>"{s.script}"</div>
                </div>
              ))}
            </div>
          )}

          {finalAd && (
            <div style={{ padding:'12px 14px', borderRadius:8, border:`1px solid ${C.border}`, background:C.surface }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>Production Summary</div>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <div style={{ fontSize:12, color:C.muted }}>{finalAd.sceneCount} scenes assembled</div>
                {finalAd.musicUsed && <div style={{ fontSize:12, color:C.muted }}>Music: included</div>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Scene thumbnail ───────────────────────────────────────────────────────────
function SceneThumb({ scene, imageUrl }) {
  return (
    <div style={{ flexShrink:0, width:106, display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ width:106, height:188, borderRadius:8, overflow:'hidden', position:'relative', background:'#0a0a0a', border:'1px solid #1a1a1a' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={scene.label} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', animation:'shimmer 1.6s ease-in-out infinite' }}>
            <span style={{ fontSize:16, opacity:.1 }}>◻</span>
          </div>
        )}
        <div style={{ position:'absolute', top:4, right:4, fontSize:8, padding:'2px 5px', borderRadius:3, background:'#000000bb', backdropFilter:'blur(4px)', color:scene.generator === 'heygen' ? '#c8a84b' : '#4aaba0', fontWeight:700 }}>
          {scene.generator === 'heygen' ? 'Avatar' : 'Video'}
        </div>
        <div style={{ position:'absolute', bottom:4, left:4, fontSize:8, padding:'2px 5px', borderRadius:3, background:'#000000bb', backdropFilter:'blur(4px)', color:'#555' }}>
          {scene.duration}s
        </div>
      </div>
      <div style={{ fontSize:9, color:'#3d3d3d', fontWeight:700, textTransform:'uppercase', letterSpacing:.8, textAlign:'center' }}>
        {scene.label}
      </div>
    </div>
  )
}
