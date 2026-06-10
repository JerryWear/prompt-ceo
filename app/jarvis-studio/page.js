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

// Extracts 5 representative frames from a video file using the Canvas API.
// Works in the browser — no server-side FFmpeg required.
async function extractVideoFrames(videoFile) {
  if (typeof document === 'undefined') return []
  return new Promise((resolve) => {
    const video      = document.createElement('video')
    const canvas     = document.createElement('canvas')
    const ctx        = canvas.getContext('2d')
    const url        = URL.createObjectURL(videoFile)
    const frames     = []
    const PERCENTS   = [0.1, 0.25, 0.5, 0.75, 0.9]
    let   index      = 0
    let   settled    = false

    const finish = (result) => {
      if (settled) return
      settled = true
      URL.revokeObjectURL(url)
      video.src = ''
      resolve(result)
    }

    const timer = setTimeout(() => finish(frames), 25000)

    video.preload   = 'metadata'
    video.muted     = true

    video.onloadedmetadata = () => {
      const MAX_W = 1280
      const ratio = video.videoWidth / (video.videoHeight || 1)
      if (video.videoWidth > MAX_W) {
        canvas.width  = MAX_W
        canvas.height = Math.round(MAX_W / ratio)
      } else {
        canvas.width  = video.videoWidth  || 1280
        canvas.height = video.videoHeight || 720
      }

      const seekNext = () => {
        if (index >= PERCENTS.length) { clearTimeout(timer); finish(frames); return }
        video.currentTime = video.duration * PERCENTS[index]
      }

      video.onseeked = () => {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            if (blob) frames.push({ blob, label: `${Math.round(PERCENTS[index] * 100)}pct` })
            index++
            seekNext()
          }, 'image/jpeg', 0.82)
        } catch { index++; seekNext() }
      }

      video.onerror = () => { clearTimeout(timer); finish(frames) }
      seekNext()
    }

    video.onerror = () => { clearTimeout(timer); finish([]) }
    video.src = url
    video.load()
  })
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
  const [brandScreenshots,    setBrandScreenshots]    = useState([]) // real product screenshots from capture-brand
  const [storyboard,      setStoryboard]      = useState(null)
  const [previews,        setPreviews]        = useState({})
  const [previewsDone,    setPreviewsDone]    = useState(false)
  const [previewError,    setPreviewError]    = useState('')
  const [previewErrors,   setPreviewErrors]   = useState({})
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [productionJobs,  setProductionJobs]  = useState(null)
  const [finalAd,         setFinalAd]         = useState(null)
  const [assembling,      setAssembling]      = useState(false)
  const [assembledUrl,    setAssembledUrl]    = useState(null)
  const [assembleError,   setAssembleError]   = useState(null)
  const [uploadedFrameUrls, setUploadedFrameUrls] = useState([])

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
      body: JSON.stringify({ mood: 'energetic', goal: 'ad' }),
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.recommendedTracks)) setMusicTracks(d.recommendedTracks.slice(0, 8)) })
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
    setAssessment(null); setCreativeBrief(null); setBrandScreenshots([])
    setStoryboard(null); setPreviews({}); setPreviewErrors({}); setPreviewsDone(false); setPreviewError('')
    setSelectedConcept(null); setProductionJobs(null); setFinalAd(null)
    setAssembling(false); setAssembledUrl(null); setAssembleError(null)
    setUploadedFrameUrls([])
    // Also clear founder/product/video inputs
    setFounderFile(null); setFounderBlobUrl(null)
    setProductFiles([]); setVideoFiles([])
    setWebsiteUrl(''); setPrompt('')
  }, [])

  const hasAnyInput = !!(websiteUrl.trim() || founderFile || productFiles.length || videoFiles.length || prompt.trim())

  // ── Main flow ─────────────────────────────────────────────────────────────
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
        websiteUrl:         websiteUrl.trim() || null,
        founderImageUrl:    founderAsset?.publicUrl    || null,
        founderStoragePath: founderAsset?.storagePath  || null,
        founderBucket:      founderAsset?.bucket       || null,
        productImageUrls:   productAssets.map(a => a.publicUrl),
        videoUrls:          videoAssets.map(a => a.publicUrl),
        // video fallback: if upload timed out, trust the file the user added
        videoProvided:      videoFiles.length > 0,
        musicUrl:           musicUploadUrl,
        musicTrackId:       musicMode === 'library' ? musicTrackId : null,
      }
      setUploadedAssets(assets)

      // Extract video frames client-side for visual analysis (no FFmpeg required)
      const videoFrameUrls = []
      if (videoFiles.length > 0) {
        addStatus('frames', 'Extracting video frames for visual analysis', 'active')
        try {
          const frames = await extractVideoFrames(videoFiles[0].file)
          if (frames.length > 0) {
            const frameResults = await Promise.allSettled(
              frames.map(({ blob, label }) =>
                uploadAsset(new File([blob], `frame_${label}.jpg`, { type: 'image/jpeg' }))
              )
            )
            frameResults.forEach(r => {
              if (r.status === 'fulfilled' && r.value?.publicUrl) videoFrameUrls.push(r.value.publicUrl)
            })
          }
          setUploadedFrameUrls([...videoFrameUrls])
          addStatus('frames', videoFrameUrls.length > 0 ? `${videoFrameUrls.length} frames extracted` : 'Frame extraction skipped', 'done')
        } catch {
          addStatus('frames', 'Frame extraction skipped', 'done')
        }
      }

      if (websiteUrl.trim())    addStatus('url',        'Crawling website + capturing screenshots', 'active')
      if (founderAsset)         addStatus('founder',    'Analyzing founder image',  'active')
      if (productAssets.length) addStatus('product',    'Analyzing product images', 'active')
      if (videoAssets.length)   addStatus('video',      'Analyzing video',          'active')
      addStatus('ai', 'Building brand understanding', 'active')

      // Run understand + screenshot capture in parallel to save time.
      // capture-brand is best-effort — failures don't block the pipeline.
      const [uRes, captureResult] = await Promise.all([
        fetch('/api/jarvis-studio/understand', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            websiteUrl:       websiteUrl.trim() || null,
            founderImageUrl:  assets.founderImageUrl,
            productImageUrls: assets.productImageUrls,
            videoUrl:         assets.videoUrls[0] || null,
            videoFrameUrls,
            prompt:           prompt.trim() || null,
            intent:           activeIntent,
          }),
        }),
        websiteUrl.trim()
          ? fetch('/api/jarvis-studio/capture-brand', {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify({ url: websiteUrl.trim() }),
            }).then(r => r.json()).catch(() => null)
          : Promise.resolve(null),
      ])

      const uData = await uRes.json().catch(() => ({}))
      if (!uRes.ok) throw new Error(uData.error || `Brand analysis failed (${uRes.status})`)
      if (!uData.understanding) throw new Error(uData.error || 'Brand analysis failed')

      // Store real product screenshots captured from the URL
      const capturedScreenshots = captureResult?.brandPack?.screenshots || []
      if (capturedScreenshots.length > 0) {
        setBrandScreenshots(capturedScreenshots)
        addStatus('url', `Website analyzed · ${capturedScreenshots.length} screenshot${capturedScreenshots.length > 1 ? 's' : ''} captured`, 'done')
      } else {
        if (websiteUrl.trim()) addStatus('url', 'Website analyzed', 'done')
      }

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
      if (!aRes.ok) throw new Error(`Assessment failed (${aRes.status})`)
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

  const handleStart = useCallback(() => {
    if (!hasAnyInput) { setError('Add at least one input to continue.'); return }
    setError('')
    const hasContext = websiteUrl.trim() || prompt.trim()
    const hasVisual  = founderFile || productFiles.length || videoFiles.length
    if (hasVisual && !hasContext) { setPhase('intent'); return }
    startAnalysis(null)
  }, [hasAnyInput, websiteUrl, prompt, founderFile, productFiles, videoFiles, startAnalysis])

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
      if (!bRes.ok) throw new Error(`Brief generation failed (${bRes.status})`)
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
    setPreviewError('')

    try {
      // Combine auto-captured screenshots + user-uploaded product images as brand ground truth.
      // User-uploaded product images (screenshots of app, UI, etc.) work identically to auto-captured ones.
      const allBrandScreenshots = [
        ...brandScreenshots,
        ...(uploadedAssets?.productImageUrls || []).map((url, i) => ({
          page: `product_${i + 1}`,
          url,
          title: `Product image ${i + 1}`,
          isUserUploaded: true,
        })),
      ]

      const sRes  = await fetch('/api/jarvis-studio/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creativeBrief, assets: uploadedAssets, intent, brandScreenshots: allBrandScreenshots, understanding, videoFrameUrls: uploadedFrameUrls }),
      })
      if (!sRes.ok) throw new Error(`Storyboard failed (${sRes.status})`)
      const sData = await sRes.json()
      if (!sData.storyboard?.concepts?.length) throw new Error(sData.error || 'Storyboard failed')
      setStoryboard(sData.storyboard)

      // Generate previews sequentially — one concept at a time to stay under DALL-E 3 rate limits.
      // Previews stream into the UI as each concept completes (~60s per concept).
      let totalLoaded = 0
      let firstError = ''

      for (const concept of sData.storyboard.concepts) {
        const runwayScenes = concept.scenes
          .filter(s => s.generator === 'runway')
          .map(s => ({
            id:               s.id,
            dalle_prompt:     s.dalle_prompt,
            visual_direction: s.visual_direction,
            label:            s.label,
            brand_anchors:    s.brand_anchors  || [],
            brand_check:      s.brand_check    || '',
            screenshotUrl:    s.screenshotUrl  || null,
          }))
        if (runwayScenes.length === 0) continue
        const brandContext = {
          productName: creativeBrief?.summary?.product?.split(/[—.\n]/)[0]?.trim()?.slice(0, 60) || '',
          keyMessages: creativeBrief?.keyMessages || [],
          style:       creativeBrief?.recommendedStyle || '',
          visualDNA: understanding ? [
            understanding.brand?.visualStyle,
            understanding.products?.designLanguage,
            understanding.products?.keyVisuals,
          ].filter(Boolean).join(' | ') : '',
        }
        try {
          const r    = await fetch('/api/jarvis-studio/preview-scenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenes: runwayScenes, brandContext }),
          })
          const pData = r.ok
            ? await r.json()
            : await r.json().then(d => { throw new Error(d.error || `HTTP ${r.status}`) })
          if (pData.previews) {
            const loaded = pData.previews.filter(p => p.imageUrl)
            const failed = pData.previews.filter(p => !p.imageUrl && p.error)
            totalLoaded += loaded.length
            if (!firstError) {
              firstError = failed[0]?.error || (loaded.length === 0 ? (pData.error || 'Image generation failed') : '')
            }
            if (loaded.length > 0) {
              setPreviews(prev => {
                const next = { ...prev }
                loaded.forEach(p => { next[p.id] = p.imageUrl })
                return next
              })
            }
            if (failed.length > 0) {
              setPreviewErrors(prev => {
                const next = { ...prev }
                failed.forEach(p => { next[p.id] = p.error })
                return next
              })
            }
          } else if (!firstError) {
            firstError = pData.error || 'No previews returned'
          }
        } catch (err) {
          if (!firstError) firstError = err.message || 'Preview fetch failed'
        }
      }

      const totalRunwayScenes = sData.storyboard.concepts.reduce((s, c) => s + c.scenes.filter(sc => sc.generator === 'runway').length, 0)
      if (totalLoaded < totalRunwayScenes) {
        const errSuffix = firstError ? ` — ${firstError.slice(0, 200)}` : ' — some scenes may generate without a preview image.'
        setPreviewError(`${totalLoaded}/${totalRunwayScenes} previews loaded${errSuffix}`)
      }
      setPreviewsDone(true)

    } catch (err) {
      setError(err.message || 'Storyboard generation failed')
      setPhase('brief')
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
      if (!res.ok) throw new Error(`Production request failed (${res.status}) — try again`)
      const data = await res.json()
      if (!data.jobs) throw new Error(data.error || 'Production failed to start')
      setProductionJobs(data.jobs)

      let currentJobs  = data.jobs
      let pollFailures = 0
      if (pollRef.current) clearInterval(pollRef.current)
      pollRef.current = setInterval(async () => {
        try {
          const pRes  = await fetch('/api/jarvis-studio/produce-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobs: currentJobs }),
          })
          if (!pRes.ok) {
            pollFailures++
            if (pollFailures >= 5) {
              clearInterval(pollRef.current)
              setError('Lost connection during production — production may still be running. Refresh to check.')
              setPhase('storyboard')
            }
            return
          }
          pollFailures = 0
          const pData = await pRes.json()
          if (pData.jobs) { currentJobs = pData.jobs; setProductionJobs(pData.jobs) }
          if (pData.overallStatus === 'complete' || pData.overallStatus === 'partial') {
            clearInterval(pollRef.current); setFinalAd(pData.finalAd); setPhase('complete')
          } else if (pData.overallStatus === 'failed') {
            clearInterval(pollRef.current); setPhase('failed')
          }
        } catch {
          pollFailures++
          if (pollFailures >= 5) {
            clearInterval(pollRef.current)
            setError('Network error during production — check your connection and try again.')
            setPhase('storyboard')
          }
        }
      }, 8000)

    } catch (err) {
      setError(err.message || 'Production failed')
      setPhase('storyboard')
    }
  }, [previews, uploadedAssets])

  const handleAssemble = useCallback(async () => {
    if (!finalAd?.clips?.length) return
    setAssembling(true)
    setAssembleError(null)
    setAssembledUrl(null)
    try {
      const res = await fetch('/api/jarvis-studio/assemble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clips:        finalAd.clips,
          musicUrl:     productionJobs?.musicUrl || null,
          conceptId:    selectedConcept?.id,
          conceptTitle: selectedConcept?.title,
        }),
      })
      const data = await res.json()
      if (data.status === 'complete' && data.assembledUrl) {
        setAssembledUrl(data.assembledUrl)
      } else if (data.status === 'no_ffmpeg') {
        setAssembleError('Auto-assembly not available in this environment. Download individual clips above.')
      } else {
        setAssembleError(data.error || 'Assembly failed')
      }
    } catch (err) {
      setAssembleError(err.message)
    } finally {
      setAssembling(false)
    }
  }, [finalAd, productionJobs, selectedConcept])

  const handleCancelProduction = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current)
    setPhase('storyboard')
  }, [])

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
        {[
          { label:'Studio',        href:'/prompt-engine-v3' },
          { label:'Ad Studio',     href:'/prompt-engine-v3?view=ad_studio' },
          { label:'Edit Studio',   href:'/edit-studio/v2' },
          { label:'Jarvis Studio', href:'/jarvis-studio' },
          { label:'Avatar Studio', href:'/avatar-studio' },
          { label:'Brands',        href:'/brands' },
        ].map(({ label, href }) => (
          <a key={label} href={href} style={{
            fontSize:12, fontWeight: href === '/jarvis-studio' ? 600 : 400,
            color: href === '/jarvis-studio' ? C.primary : C.ghost,
            textDecoration:'none', padding:'4px 8px', borderRadius:5,
          }}>{label}</a>
        ))}
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
              {safeStr(assessment.whatIUnderstand?.whatTheyDo)}
            </div>
          </div>

          {/* Asset Manifest — source of truth used by Jarvis, returned from the route */}
          {assetManifest && (() => {
            const rows = [
              { label:'Website URL',        present: assetManifest.website?.present,       detail: assetManifest.website?.scraped ? 'crawled' : null },
              { label:'Founder Image',      present: assetManifest.founderImage?.present,  detail: null },
              { label:'Product Images',     present: assetManifest.productImages?.present, detail: assetManifest.productImages?.count > 0 ? `${assetManifest.productImages.count} image${assetManifest.productImages.count > 1 ? 's' : ''}` : null },
              { label:'Product Video',      present: assetManifest.productVideo?.present,  detail: assetManifest.productVideo?.framesAnalyzed ? 'frames analyzed' : assetManifest.productVideo?.transcriptAvailable ? 'transcribed' : assetManifest.productVideo?.present ? 'no transcript' : null },
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
                    {safeStr(assessment.evidenceUsed.summary)}
                  </div>
                )}
                {entries.map(([key, value]) => (
                  <div key={key} style={{ marginBottom:8, paddingBottom:8, borderBottom:`1px solid ${C.divide}` }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:3 }}>
                      {labels[key] || key}
                    </div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>{safeStr(value)}</div>
                  </div>
                ))}
              </div>
            ) : null
          })()}

          {/* Video Analysis */}
          {assessment.videoAnalysis && (
            <div style={{ borderRadius:10, border:`1px solid ${C.purple}33`, background:C.purpleBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.purple}99`, textTransform:'uppercase', marginBottom:14 }}>Video Analysis</div>

              {/* Frame Evidence strip */}
              {assessment.videoAnalysis.frameEvidence?.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.purple}66`, textTransform:'uppercase', marginBottom:8 }}>Frame Evidence</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:5 }}>
                    {assessment.videoAnalysis.frameEvidence.map((frame, i) => (
                      <div key={i} style={{ padding:'8px 9px', borderRadius:6, background:`${C.purple}0e`, border:`1px solid ${C.purple}22` }}>
                        <div style={{ fontSize:9, color:`${C.purple}55`, marginBottom:3, fontVariantNumeric:'tabular-nums' }}>{frame.position}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:C.secondary, lineHeight:1.3 }}>{frame.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5 Moment Categories */}
              {[
                { key:'strongestProofMoment',      label:'Proof Moment',      color:C.green },
                { key:'strongestConversionMoment', label:'Conversion Moment', color:C.gold },
                { key:'strongestTrustMoment',      label:'Trust Moment',      color:C.teal },
                { key:'strongestSocialAdMoment',   label:'Social Ad Moment',  color:C.purple },
              ].filter(({ key }) => assessment.videoAnalysis[key] && typeof assessment.videoAnalysis[key] === 'object').length > 0 && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
                  {[
                    { key:'strongestProofMoment',      label:'Proof Moment',      color:C.green },
                    { key:'strongestConversionMoment', label:'Conversion Moment', color:C.gold },
                    { key:'strongestTrustMoment',      label:'Trust Moment',      color:C.teal },
                    { key:'strongestSocialAdMoment',   label:'Social Ad Moment',  color:C.purple },
                  ].filter(({ key }) => assessment.videoAnalysis[key] && typeof assessment.videoAnalysis[key] === 'object').map(({ key, label, color }) => {
                    const m = assessment.videoAnalysis[key]
                    return (
                      <div key={key} style={{ padding:'10px 12px', borderRadius:8, background:`${color}09`, border:`1px solid ${color}22` }}>
                        <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${color}77`, textTransform:'uppercase', marginBottom:3 }}>{label}</div>
                        {m.frame && <div style={{ fontSize:9, color:`${color}44`, marginBottom:4 }}>Frame {m.frame}{m.label ? ` — ${m.label}` : ''}</div>}
                        <div style={{ fontSize:11, color:C.secondary, lineHeight:1.5, marginBottom:3 }}>{safeStr(m.observation)}</div>
                        <div style={{ fontSize:10, color:C.muted, fontStyle:'italic', lineHeight:1.4 }}>{safeStr(m.whyItWorks)}</div>
                      </div>
                    )
                  })}
                </div>
              )}
              {assessment.videoAnalysis.strongestLandingPageMoment && typeof assessment.videoAnalysis.strongestLandingPageMoment === 'object' && (
                <div style={{ padding:'10px 12px', borderRadius:8, background:`${C.secondary}07`, border:`1px solid ${C.border}`, marginBottom:8 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:3 }}>Landing Page Moment</div>
                  {assessment.videoAnalysis.strongestLandingPageMoment.frame && <div style={{ fontSize:9, color:C.dim, marginBottom:4 }}>Frame {assessment.videoAnalysis.strongestLandingPageMoment.frame}{assessment.videoAnalysis.strongestLandingPageMoment.label ? ` — ${assessment.videoAnalysis.strongestLandingPageMoment.label}` : ''}</div>}
                  <div style={{ fontSize:11, color:C.secondary, lineHeight:1.5, marginBottom:3 }}>{safeStr(assessment.videoAnalysis.strongestLandingPageMoment.observation)}</div>
                  <div style={{ fontSize:10, color:C.muted, fontStyle:'italic' }}>{safeStr(assessment.videoAnalysis.strongestLandingPageMoment.whyItWorks)}</div>
                </div>
              )}

              {assessment.videoAnalysis.whatConcernsMe?.length > 0 && (
                <div style={{ marginTop:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}66`, textTransform:'uppercase', marginBottom:6 }}>Quality Concerns</div>
                  {assessment.videoAnalysis.whatConcernsMe.map((item, i) => (
                    <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:5 }}>
                      <span style={{ color:C.gold, fontSize:9, marginTop:3, flexShrink:0 }}>⚠</span>
                      <span style={{ fontSize:11, color:C.muted, lineHeight:1.5 }}>{safeStr(item)}</span>
                    </div>
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
                  <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(value)}</div>
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
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(item)}</span>
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
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(item)}</span>
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
                  <span style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(item)}</span>
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
                    <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(value)}</div>
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
                    <div style={{ fontSize:12, color:C.secondary, lineHeight:1.6 }}>{safeStr(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prioritized Opportunities */}
          {assessment.prioritizedOpportunities?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.gold}33`, background:C.goldBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:12 }}>Prioritized Opportunities</div>
              {assessment.prioritizedOpportunities.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom: i < assessment.prioritizedOpportunities.length - 1 ? 12 : 0, paddingBottom: i < assessment.prioritizedOpportunities.length - 1 ? 12 : 0, borderBottom: i < assessment.prioritizedOpportunities.length - 1 ? `1px solid ${C.goldBorder}` : 'none' }}>
                  <div style={{ fontSize:18, fontWeight:900, color:`${C.gold}55`, minWidth:20, flexShrink:0, lineHeight:1 }}>#{item.rank}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.gold, marginBottom:4 }}>{safeStr(item.opportunity)}</div>
                    <div style={{ fontSize:11, color:C.muted, lineHeight:1.6, marginBottom:5 }}>{safeStr(item.evidence)}</div>
                    <div style={{ fontSize:11, color:C.secondary, lineHeight:1.5 }}>→ {safeStr(item.immediateAction)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* What You're Getting Wrong */}
          {assessment.whatYoureGettingWrong?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.red}33`, background:C.redBg, padding:'16px 18px', marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.red}99`, textTransform:'uppercase', marginBottom:10 }}>What You're Getting Wrong</div>
              {assessment.whatYoureGettingWrong.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', marginBottom:7 }}>
                  <span style={{ color:C.red, fontSize:11, marginTop:2, flexShrink:0 }}>✕</span>
                  <span style={{ fontSize:12, color:'#e08080', lineHeight:1.6 }}>{safeStr(item)}</span>
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
                      <div style={{ fontSize:12, fontWeight:700, color: isPick ? C.gold : C.primary, marginBottom:4 }}>{safeStr(test.name)}</div>
                      <div style={{ fontSize:10, color:C.ghost, marginBottom:6 }}>{safeStr(test.format)}</div>
                      <div style={{ fontSize:11, color:C.muted, lineHeight:1.5 }}>{safeStr(test.hypothesis)}</div>
                    </div>
                  )
                })}
              </div>
              {assessment.whatIWouldTestFirst.whyThisWins && (
                <div style={{ padding:'10px 14px', borderRadius:8, background:C.goldBg, border:`1px solid ${C.goldBorder}`, fontSize:12, color:C.secondary, lineHeight:1.6, fontStyle:'italic' }}>
                  <span style={{ color:`${C.gold}88`, fontSize:9, fontWeight:700, letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:4 }}>Why this wins</span>
                  "{safeStr(assessment.whatIWouldTestFirst.whyThisWins)}"
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
                    <div style={{ fontSize:12, fontWeight:600, color:C.secondary, marginBottom:2 }}>{safeStr(item.asset)}</div>
                    <div style={{ fontSize:11, color:C.ghost, lineHeight:1.5 }}>{safeStr(item.impact)}</div>
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
                  {safeStr(assessment.ifThisWereMyCompany.focus)}
                </div>
              )}
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:8 }}>30-Day Actions</div>
              {(assessment.ifThisWereMyCompany.thirtyDayActions || []).map((item, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:C.raised, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:10, fontWeight:700, color:C.gold }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:C.primary, marginBottom:2 }}>{safeStr(item.action)}</div>
                    <div style={{ fontSize:11, color:C.ghost, lineHeight:1.5 }}>{safeStr(item.why)}</div>
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
                        <div style={{ fontSize:12, fontWeight:700, color:C.primary, marginBottom:4 }}>{safeStr(c.name)}</div>
                        <div style={{ fontSize:11, color:C.muted, lineHeight:1.5, marginBottom:4 }}>{safeStr(c.knownFor)}</div>
                        {c.whatTheyDoWell && <div style={{ fontSize:10, color:C.ghost, lineHeight:1.4 }}>↑ {safeStr(c.whatTheyDoWell)}</div>}
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
                        <span style={{ fontSize:11, color:C.secondary, lineHeight:1.5 }}>{safeStr(item)}</span>
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
                        <span style={{ fontSize:11, color:'#e08080', lineHeight:1.5 }}>{safeStr(item)}</span>
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
                    <div key={i} style={{ fontSize:12, color:C.muted, marginBottom:5, lineHeight:1.5 }}>→ {safeStr(item)}</div>
                  ))}
                </div>
              )}

              {/* Opportunity Gap */}
              {assessment.competitiveIntelligence.opportunityGap && (
                <div style={{ padding:'12px 14px', borderRadius:8, background:`${C.gold}08`, border:`1px solid ${C.goldBorder}` }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:6 }}>Opportunity Gap</div>
                  <div style={{ fontSize:12, color:C.secondary, lineHeight:1.7 }}>{safeStr(assessment.competitiveIntelligence.opportunityGap)}</div>
                </div>
              )}
            </div>
          )}

          {/* My Recommended Campaign */}
          {assessment.myRecommendedCampaign && (
            <div style={{ borderRadius:10, border:`1px solid ${C.gold}55`, background:`linear-gradient(135deg, #0c0900, #050400)`, padding:'20px 20px', marginBottom:22 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:`${C.gold}88`, textTransform:'uppercase', marginBottom:10 }}>My Recommended Campaign</div>
              <div style={{ fontSize:17, fontWeight:800, color:C.gold, marginBottom:12, lineHeight:1.3 }}>
                {safeStr(assessment.myRecommendedCampaign.headline)}
              </div>
              <div style={{ fontSize:13, color:C.secondary, lineHeight:1.75, fontStyle:'italic', marginBottom:12, borderLeft:`2px solid ${C.gold}44`, paddingLeft:14 }}>
                "{safeStr(assessment.myRecommendedCampaign.argument)}"
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { label:'Lead angle', value:assessment.myRecommendedCampaign.angle },
                  { label:'Why this beats the alternatives', value:assessment.myRecommendedCampaign.why },
                ].filter(i => i.value).map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:`${C.gold}55`, textTransform:'uppercase', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{safeStr(value)}</div>
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
                <div key={i} style={{ fontSize:12, color:C.muted, marginBottom:4 }}>→ {safeStr(item)}</div>
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
                {storyboard && previewsDone && !previewError && <span style={{ marginLeft:10, color:C.green }}>✓ {Object.keys(previews).length} previews loaded</span>}
                {storyboard && previewsDone && previewError && <span style={{ marginLeft:10, color:C.gold }}>⚠ {previewError}</span>}
              </div>
            </div>
          </div>

          {!storyboard && !error && (
            <div style={{ textAlign:'center', padding:'60px 0', color:C.ghost }}>
              <div style={{ width:32, height:32, border:`2px solid ${C.border}`, borderTopColor:C.gold, borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 14px' }} />
              <div style={{ fontSize:13 }}>Designing ad concepts...</div>
            </div>
          )}
          {!storyboard && error && (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <div style={{ fontSize:13, color:C.red, marginBottom:14 }}>{error}</div>
              <button onClick={() => { setError(''); setPhase('brief') }}
                style={{ padding:'8px 18px', borderRadius:7, border:`1px solid ${C.border}`, background:'transparent', color:C.secondary, cursor:'pointer', fontSize:12 }}>
                ← Back to Brief
              </button>
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
                        {concept.compliance_score != null && (
                          <span style={{
                            fontSize:9, padding:'2px 7px', borderRadius:10, fontWeight:700, letterSpacing:.5,
                            background: concept.compliance_score >= 80 ? `${C.green}22` : concept.compliance_score >= 60 ? `${C.gold}22` : `${C.red}22`,
                            color: concept.compliance_score >= 80 ? C.green : concept.compliance_score >= 60 ? C.gold : C.red,
                          }}>
                            {concept.compliance_score}/100
                          </span>
                        )}
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
                      <SceneThumb key={scene.id} scene={scene}
                        imageUrl={previews[scene.id] || (scene.generator === 'heygen' ? uploadedAssets?.founderImageUrl : null)}
                        errorMsg={!previews[scene.id] && previewsDone && scene.generator === 'runway' ? previewErrors[scene.id] : null} />
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
          <div style={{ marginBottom:22, display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.gold}77`, textTransform:'uppercase', marginBottom:10 }}>✦ Producing</div>
              <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>{selectedConcept.title}</div>
              <div style={{ fontSize:12, color:C.ghost }}>{selectedConcept.logline}</div>
            </div>
            <button onClick={handleCancelProduction}
              style={{ padding:'7px 14px', borderRadius:7, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:11, flexShrink:0, marginTop:22 }}>
              Cancel
            </button>
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
          {productionJobs?.avatarError && (
            <div style={{ padding:'11px 14px', borderRadius:8, background:C.redBg, border:`1px solid ${C.red}33`, marginBottom:14, fontSize:12, color:'#e08080' }}>
              ⚠ {productionJobs.avatarError}
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:22 }}>
            {selectedConcept.scenes.map(scene => {
              const job    = productionJobs?.sceneJobs?.find(j => j.sceneId === scene.id)
              const status = job?.status || 'queued'
              const isActive = ['generating', 'awaiting_avatar', 'starting', 'avatar_ready_needs_start'].includes(status)
              const dotColor = status === 'complete' ? C.green : status === 'error' ? C.red : isActive ? C.gold : C.dim
              const statusLabel = {
                queued:                   'Queued',
                generating:               'Generating...',
                awaiting_avatar:          `Waiting for avatar${productionJobs?.pollCount > 5 ? ` (${productionJobs.pollCount} polls)` : '...'}`,
                complete:                 'Done ✓',
                error:                    job?.error ? `Error: ${job.error.slice(0, 60)}` : 'Error',
                skipped:                  'Skipped',
                skipped_no_key:           'No API key',
                avatar_ready_needs_start: 'Starting...',
                starting:                 'Starting...',
              }[status] || status
              return (
                <div key={scene.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:8, background:C.surface, border:`1px solid ${status === 'error' ? `${C.red}33` : C.border}` }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', flexShrink:0, background:dotColor, animation: isActive ? 'pulse .9s infinite' : 'none' }} />
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
                    <span style={{ fontSize:10, color: status === 'complete' ? C.green : status === 'error' ? C.red : C.ghost, maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {productionJobs?.pollCount > 0 && (
            <div style={{ fontSize:11, color:C.dim, textAlign:'center', marginBottom:14 }}>
              {productionJobs.pollCount < 45
                ? `Checking status... poll ${productionJobs.pollCount} of 45 max`
                : 'Timeout reached — resolving stuck scenes'}
            </div>
          )}

          <div style={{ fontSize:12, color:C.dim, textAlign:'center', lineHeight:1.7 }}>
            HeyGen avatar creation takes 5–15 minutes. System will wait up to 12 minutes. If it still hangs, cancel and try a Runway-only concept.
          </div>
        </div>
      )}

      {/* ── FAILED ────────────────────────────────────────────────────────────── */}
      {phase === 'failed' && selectedConcept && (
        <div style={{ maxWidth:560, margin:'0 auto', padding:'52px 20px', animation:'fadeUp .35s ease both' }}>
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:C.redBg, border:`1px solid ${C.red}44`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:18 }}>✕</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:`${C.red}88`, textTransform:'uppercase', marginBottom:8 }}>Production Failed</div>
            <div style={{ fontSize:18, fontWeight:800, marginBottom:8 }}>{selectedConcept.title}</div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>All scenes either errored or were skipped. No clips were produced.</div>
          </div>

          {/* Show what failed and why */}
          {productionJobs?.sceneJobs?.length > 0 && (
            <div style={{ borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, padding:'14px 16px', marginBottom:18 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>Scene Diagnostics</div>
              {productionJobs.sceneJobs.map((job, i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:8, paddingBottom:8, borderBottom: i < productionJobs.sceneJobs.length - 1 ? `1px solid ${C.divide}` : 'none' }}>
                  <span style={{ fontSize:10, color: job.status === 'error' ? C.red : C.dim, flexShrink:0 }}>{job.status === 'error' ? '✕' : '—'}</span>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:12, color:C.secondary }}>{job.sceneId} · {job.generator}</div>
                    <div style={{ fontSize:11, color:C.ghost }}>{job.error || job.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {productionJobs?.avatarError && (
            <div style={{ padding:'11px 14px', borderRadius:8, background:C.redBg, border:`1px solid ${C.red}33`, marginBottom:18, fontSize:12, color:'#e08080' }}>
              Avatar error: {productionJobs.avatarError}
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setPhase('storyboard')}
              style={{ flex:1, padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.secondary, cursor:'pointer', fontSize:12 }}>
              ← Try Another Concept
            </button>
            <button onClick={resetAll}
              style={{ padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
              New Project
            </button>
          </div>
        </div>
      )}

      {/* ── COMPLETE ──────────────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <div style={{ maxWidth:640, margin:'0 auto', padding:'52px 20px', animation:'fadeUp .4s ease both' }}>
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ width:44, height:44, borderRadius:'50%', background:finalAd?.partial ? '#0a0700' : C.greenBg, border:`1px solid ${finalAd?.partial ? `${C.gold}44` : `${C.green}44`}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:18 }}>
              {finalAd?.partial ? '⚡' : '✓'}
            </div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color: finalAd?.partial ? C.gold : C.green, textTransform:'uppercase', marginBottom:8 }}>
              {finalAd?.partial ? 'Partial Complete' : 'Clips Ready'}
            </div>
            <div style={{ fontSize:22, fontWeight:800 }}>{selectedConcept?.title}</div>
            {finalAd?.partial && (
              <div style={{ fontSize:12, color:C.muted, marginTop:6 }}>
                {finalAd.sceneCount} of {finalAd.totalScenes} scenes produced — download what's ready
              </div>
            )}
          </div>

          {/* Show each completed clip individually */}
          {finalAd?.clips?.length > 0 && (
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:18 }}>
              {finalAd.clips.map((clip, i) => (
                <div key={i} style={{ borderRadius:10, overflow:'hidden', border:`1px solid ${C.border}`, background:C.surface }}>
                  <video src={clip.videoUrl} controls playsInline style={{ width:'100%', display:'block', background:'#000', maxHeight:420 }} />
                  <div style={{ padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:11, color:C.ghost }}>Scene {i + 1}{clip.sceneId ? ` — ${clip.sceneId}` : ''}</span>
                    <a href={clip.videoUrl} download target="_blank" rel="noopener noreferrer"
                      style={{ padding:'6px 14px', borderRadius:6, background:C.gold, color:'#000', textDecoration:'none', fontSize:11, fontWeight:800 }}>
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Assembly — stitch all clips into one video ── */}
          {finalAd?.clips?.length > 1 && (
            <div style={{ marginBottom:18, padding:'16px', borderRadius:10, border:`1px solid ${C.border}`, background:C.surface }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:C.ghost, textTransform:'uppercase', marginBottom:10 }}>Final Ad</div>
              {assembledUrl ? (
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <video src={assembledUrl} controls playsInline style={{ width:'100%', borderRadius:8, background:'#000' }} />
                  <a href={assembledUrl} download={`${selectedConcept?.title || 'ad'}.mp4`} target="_blank" rel="noopener noreferrer"
                    style={{ display:'block', textAlign:'center', padding:'10px 0', borderRadius:7, background:C.gold, color:'#000', textDecoration:'none', fontSize:12, fontWeight:800 }}>
                    ↓ Download Full Ad (.mp4)
                  </a>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>
                    Stitch all {finalAd.clips.length} clips into a single ad video{productionJobs?.musicUrl ? ' with music mixed in' : ''}.
                  </div>
                  {assembleError && <div style={{ fontSize:12, color:'#e08080', padding:'8px 12px', borderRadius:6, background:'rgba(200,60,60,0.08)', border:'1px solid rgba(200,60,60,0.2)' }}>{assembleError}</div>}
                  <button onClick={handleAssemble} disabled={assembling}
                    style={{ width:'100%', padding:'11px 0', borderRadius:7, background: assembling ? C.raised : C.gold, color: assembling ? C.muted : '#000', border:'none', cursor: assembling ? 'not-allowed' : 'pointer', fontSize:12, fontWeight:800, transition:'opacity .15s' }}>
                    {assembling ? '⟳ Assembling clips…' : `Assemble ${finalAd.clips.length} Clips into One Ad →`}
                  </button>
                </div>
              )}
            </div>
          )}

          <div style={{ display:'flex', gap:10, marginBottom:18 }}>
            <button onClick={() => setPhase('storyboard')} style={{ flex:1, padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.secondary, cursor:'pointer', fontSize:12 }}>
              ← Other Concepts
            </button>
            <button onClick={resetAll} style={{ padding:'12px 18px', borderRadius:8, border:`1px solid ${C.border}`, background:'transparent', color:C.ghost, cursor:'pointer', fontSize:12 }}>
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
                <div style={{ fontSize:12, color:C.muted }}>{finalAd.sceneCount} scene{finalAd.sceneCount !== 1 ? 's' : ''} completed</div>
                {finalAd.partial && <div style={{ fontSize:12, color:C.gold }}>{finalAd.totalScenes - finalAd.sceneCount} scenes errored</div>}
                {finalAd.musicUsed && <div style={{ fontSize:12, color:C.muted }}>Music: selected (not mixed)</div>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Safe string renderer — GPT sometimes returns objects where strings are expected.
// React Error #31 ("Objects are not valid as a React child") crashes the page if
// an array like whatConcernsMe contains {position, label, keyObservation} objects.
function safeStr(v) {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object') return v.observation || v.keyObservation || v.label || v.text || JSON.stringify(v)
  return String(v ?? '')
}

// ── Scene thumbnail ───────────────────────────────────────────────────────────
function SceneThumb({ scene, imageUrl, errorMsg }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  useEffect(() => { setImgLoaded(false); setImgError(false) }, [imageUrl])

  return (
    <div style={{ flexShrink:0, width:106, display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ width:106, height:188, borderRadius:8, overflow:'hidden', position:'relative', background:'#0a0a0a', border:`1px solid ${(errorMsg || imgError) ? '#5a1a1a' : '#1a1a1a'}` }}>
        {imageUrl && !imgError ? (
          <>
            <img src={imageUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display: imgLoaded ? 'block' : 'none' }}
              onLoad={() => setImgLoaded(true)} onError={() => setImgError(true)} />
            {!imgLoaded && (
              <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, animation:'shimmer 1.6s ease-in-out infinite' }}>
                <span style={{ fontSize:9, color:'#2a2a2a', textAlign:'center' }}>Generating…</span>
              </div>
            )}
          </>
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:8, gap:6 }}>
            {(errorMsg || imgError)
              ? <span style={{ fontSize:8, color:'#7a2a2a', textAlign:'center', lineHeight:1.4, wordBreak:'break-word' }}>{(errorMsg || 'Image failed').slice(0, 80)}</span>
              : <span style={{ fontSize:16, opacity:.1, animation:'shimmer 1.6s ease-in-out infinite' }}>◻</span>
            }
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
      {scene.capability_anchor && (
        <div style={{ fontSize:8, color:'#2a2a2a', textAlign:'center', lineHeight:1.3, marginTop:2, padding:'0 2px' }}>
          {scene.capability_anchor}
        </div>
      )}
    </div>
  )
}
