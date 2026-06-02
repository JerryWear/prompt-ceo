'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createBrowserSupabase } from '../../lib/supabase/client'

// ─── Design Tokens ───────────────────────────────────────────────────────────

const C = {
  void:       '#040404',
  deep:       '#070707',
  base:       '#0a0a0a',
  raised:     '#0d0d0d',
  surface:    '#111111',
  overlay:    '#151515',
  hairline:   '#1a1a1a',
  subtle:     '#222222',
  mid:        '#2a2a2a',
  primary:    '#e8e4dc',
  secondary:  '#ccc8c2',
  muted:      '#9e9a96',
  ghost:      '#6e6a66',
  gold:       '#c8a84b',
  goldDim:    '#7a6428',
  goldGlow:   '#c8a84b22',
  blue:       '#4a8ab4',
  blueDim:    '#2a4a6a',
  blueGlow:   '#4a8ab422',
  green:      '#4a9a6a',
  greenDim:   '#1a3a2a',
  greenGlow:  '#4a9a6a22',
  violet:     '#9b6fd4',
  violetDim:  '#4a2a7a',
  violetGlow: '#9b6fd422',
}

// ─── Data Models ─────────────────────────────────────────────────────────────
//
// editProject       — top-level project envelope
// transcriptSegment — one timed speech segment from the video
// aiCutSuggestion   — AI-recommended edit point with score
// captionSettings   — caption style/position/animation config
// musicRecommendation — recommended track with licensing flag
// exportSettings    — final render configuration

const EMPTY_PROJECT = {
  id:             null,
  title:          '',
  platform:       null,   // platform id
  goal:           null,   // goal id
  videoFile:      null,   // filename string (file object not stored)
  videoDuration:  null,   // seconds (number)
  videoSize:      null,   // bytes (number)
  videoType:      null,   // MIME type string
  sourceVideoUrl: null,   // Supabase Storage URL (set after upload-source)
  status:         'idle', // 'idle' | 'uploading' | 'analyzing' | 'ready'
  createdAt:      null,
  updatedAt:      null,
}

const DEFAULT_CAPTION_SETTINGS = {
  style:      'bold',             // 'bold' | 'minimal' | 'cinematic' | 'clean' | 'pop'
  font:       'system-ui',
  fontSize:   24,
  color:      '#ffffff',
  background: 'rgba(0,0,0,0.6)',
  position:   'bottom',           // 'top' | 'center' | 'bottom'
  animation:  'fade',             // 'none' | 'fade' | 'slide' | 'pop'
}

const DEFAULT_EXPORT_SETTINGS = {
  platform:          '',
  format:            'mp4',
  resolution:        '1080x1920',
  quality:           'high',   // 'high' | 'medium' | 'web'
  includeCaption:    true,
  includeMusicBed:   false,
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

// start/end is the canonical transcript segment format (matches API response and Whisper output)
const MOCK_TRANSCRIPT = [
  { id: 's0', start: 0.0,  end: 3.4,  text: 'Today I want to show you exactly how we grew from zero to ten thousand users…',          confidence: 0.98, speaker: 'Speaker 1' },
  { id: 's1', start: 3.5,  end: 7.2,  text: '…in just ninety days, using one simple content strategy most founders completely ignore.', confidence: 0.96, speaker: 'Speaker 1' },
  { id: 's2', start: 7.6,  end: 12.1, text: 'First — stop trying to go viral. Seriously. Here is what actually works.',                confidence: 0.97, speaker: 'Speaker 1' },
  { id: 's3', start: 12.3, end: 17.8, text: 'You need to make content so specific to your ideal customer that no one else cares.',      confidence: 0.94, speaker: 'Speaker 1' },
  { id: 's4', start: 18.0, end: 23.5, text: 'When we started doing that, our conversion rate went up four hundred percent in three weeks.', confidence: 0.95, speaker: 'Speaker 1' },
  { id: 's5', start: 23.8, end: 29.0, text: 'I am going to break down exactly how to do this in the next sixty seconds.',               confidence: 0.99, speaker: 'Speaker 1' },
]

const MOCK_AI_CUTS = [
  { id: 'c1', type: 'hook',      startTime: 0.0,  endTime: 7.2,  reason: 'Strong opening — states outcome and timeframe in under 8 seconds.',       score: 94 },
  { id: 'c2', type: 'key_point', startTime: 7.6,  endTime: 17.8, reason: 'Core counterintuitive insight — high watch-through retention potential.',   score: 88 },
  { id: 'c3', type: 'social',    startTime: 18.0, endTime: 23.5, reason: 'Social proof with specific numbers — builds instant credibility.',           score: 91 },
  { id: 'c4', type: 'cta',       startTime: 23.8, endTime: 29.0, reason: 'Clear call-to-action with urgency signal.',                                 score: 85 },
  { id: 'c5', type: 'full',      startTime: 0.0,  endTime: 29.0, reason: 'Full video — strong LinkedIn or YouTube Short at 29 seconds.',               score: 79 },
]

const MOCK_MUSIC = [
  { id: 'm1', title: 'Drive Forward',   artist: 'Studio Collective', mood: 'Motivational', bpm: 128, duration: 180, licensed: true  },
  { id: 'm2', title: 'Quiet Momentum',  artist: 'Ambient Works',     mood: 'Focused',      bpm: 95,  duration: 210, licensed: true  },
  { id: 'm3', title: 'Executive Pulse', artist: 'Signal Audio',      mood: 'Professional', bpm: 112, duration: 165, licensed: true  },
  { id: 'm4', title: 'Clean Energy',    artist: 'Upbeat Labs',       mood: 'Energetic',    bpm: 140, duration: 195, licensed: false },
]

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok',          resolution: '1080x1920', maxDuration: 60  },
  { id: 'instagram', label: 'Instagram Reel',  resolution: '1080x1920', maxDuration: 90  },
  { id: 'youtube',   label: 'YouTube Short',   resolution: '1080x1920', maxDuration: 60  },
  { id: 'linkedin',  label: 'LinkedIn',        resolution: '1920x1080', maxDuration: 600 },
  { id: 'meta',      label: 'Meta Ad',         resolution: '1080x1080', maxDuration: 15  },
]

const GOALS = [
  { id: 'founder',  label: 'Founder Update',   icon: '👤' },
  { id: 'demo',     label: 'Product Demo',     icon: '🖥' },
  { id: 'tutorial', label: 'App Tutorial',     icon: '📱' },
  { id: 'launch',   label: 'Launch Ad',        icon: '🚀' },
  { id: 'ugc',      label: 'UGC Ad',           icon: '🎥' },
  { id: 'edu',      label: 'Educational Post', icon: '🎓' },
]

const STEPS = [
  { id: 'upload',     label: 'Upload',     icon: '⬆' },
  { id: 'transcript', label: 'Transcript', icon: '📝' },
  { id: 'ai_cut',     label: 'AI Cut',     icon: '✂' },
  { id: 'captions',   label: 'Captions',   icon: '💬' },
  { id: 'music',      label: 'Music',      icon: '🎵' },
  { id: 'export',     label: 'Export',     icon: '📤' },
]

const CAPTION_STYLES = [
  { id: 'bold',      label: 'Bold',      style: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1   } },
  { id: 'minimal',   label: 'Minimal',   style: { fontWeight: 400, textTransform: 'none',      letterSpacing: 0   } },
  { id: 'cinematic', label: 'Cinematic', style: { fontWeight: 300, textTransform: 'none',      letterSpacing: 3   } },
  { id: 'clean',     label: 'Clean',     style: { fontWeight: 600, textTransform: 'none',      letterSpacing: 0.5 } },
  { id: 'pop',       label: 'Pop',       style: { fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2   } },
]

// Named caption style presets — connected to the AI Caption Engine
const CAPTION_STYLE_PRESETS = [
  { id: 'founder_clean',    label: 'Founder Clean',      desc: 'Professional · 6 words · fade',   styleId: 'clean',     position: 'bottom', animation: 'fade'  },
  { id: 'bold_tiktok',      label: 'Bold TikTok',        desc: 'Uppercase · 4 words · pop',       styleId: 'bold',      position: 'center', animation: 'pop'   },
  { id: 'cinematic_luxury', label: 'Cinematic Luxury',   desc: 'Light · 5 words · fade',          styleId: 'cinematic', position: 'bottom', animation: 'fade'  },
  { id: 'minimal_linkedin', label: 'Minimal LinkedIn',   desc: 'Subtle · 8 words · no animation', styleId: 'minimal',   position: 'bottom', animation: 'none'  },
  { id: 'high_energy',      label: 'High-Energy Launch', desc: 'Uppercase · 3 words · slide',     styleId: 'pop',       position: 'center', animation: 'slide' },
]

const CUT_COLORS = { hook: C.gold, key_point: C.blue, social: C.green, cta: C.violet, full: C.muted }
const CUT_LABELS = { hook: 'Hook', key_point: 'Key Point', social: 'Social Proof', cta: 'CTA', full: 'Full Video' }

// Cut plan segment types (Phase 5)
const SEG_COLORS = { hook: C.gold, value: C.blue, proof: C.green, cta: C.violet, transition: C.muted }
const SEG_LABELS = { hook: 'Hook', value: 'Value', proof: 'Proof', cta: 'CTA', transition: 'Transition' }

const QUALITY_META = { high: '1080p · ~50 MB', medium: '720p · ~25 MB', web: '480p · ~10 MB' }

const STATUS_COLORS = {
  draft:       '#6e6a66',
  uploaded:    '#4a8ab4',
  transcribed: '#c8a84b',
  analyzed:    '#9b6fd4',
  edited:      '#4a9a6a',
  exported:    '#4a9a6a',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTime(s)  { const m = Math.floor(s / 60); const sec = (s % 60).toFixed(1); return `${m}:${sec.padStart(4, '0')}` }
function fmtDur(s)   { const m = Math.floor(s / 60); const r = Math.floor(s % 60); return m > 0 ? `${m}m ${r}s` : `${r}s` }
function fmtSize(b)  { return `${(b / 1024 / 1024).toFixed(1)} MB` }

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EditStudioPage() {
  const router       = useRouter()
  const fileInputRef  = useRef(null)
  const dropRef       = useRef(null)
  const videoFileRef  = useRef(null) // holds the actual File object for Whisper upload (lost on reload)

  // Core state
  const [project,          setProject]          = useState(EMPTY_PROJECT)
  const [activeStep,       setActiveStep]        = useState(0)
  const [analyzing,        setAnalyzing]         = useState(false)
  const [dragOver,         setDragOver]          = useState(false)

  // Workflow state
  const [transcriptSegs,   setTranscriptSegs]    = useState([])
  const [transcriptMeta,     setTranscriptMeta]      = useState(null)  // { provider, language, duration, confidence, fallback }
  const [transcribing,       setTranscribing]         = useState(false)
  const [transcribeError,    setTranscribeError]      = useState(null)
  const [aiDirectorAnalysis, setAiDirectorAnalysis]   = useState(null)
  const [aiDirectorFallback, setAiDirectorFallback]   = useState(false)
  const [directorRunning,    setDirectorRunning]       = useState(false)
  const [cutPlans,           setCutPlans]              = useState([])
  const [selectedPlanId,     setSelectedPlanId]        = useState(null)
  const [buildingPlans,      setBuildingPlans]         = useState(false)
  const [showTimeline,       setShowTimeline]          = useState(false)
  const [editorCleanup,      setEditorCleanup]         = useState(null)
  const [runningCleanup,     setRunningCleanup]        = useState(false)
  const [captionTimeline,    setCaptionTimeline]        = useState([])
  const [captionSummary,     setCaptionSummary]         = useState(null)
  const [generatingCaptions, setGeneratingCaptions]    = useState(false)
  const [editingCaptionId,   setEditingCaptionId]       = useState(null)
  const [musicIntelligence,  setMusicIntelligence]      = useState(null)
  const [selectedMusicBed,   setSelectedMusicBed]       = useState(null)
  const [recommendingMusic,  setRecommendingMusic]      = useState(false)
  const [renderPlan,         setRenderPlan]             = useState(null)
  const [renderJob,          setRenderJob]              = useState(null)
  const [preparingPlan,      setPreparingPlan]          = useState(false)
  const [creatingJob,        setCreatingJob]            = useState(false)
  const [renderWarnings,     setRenderWarnings]         = useState([])
  const [uploadingSource,    setUploadingSource]        = useState(false)
  const [sourceUploadPct,    setSourceUploadPct]        = useState(0)
  const [sourceUploadError,  setSourceUploadError]      = useState(null)
  const [showHealthPanel,    setShowHealthPanel]         = useState(false)
  const [retryingRender,     setRetryingRender]         = useState(false)
  const [showTestNotes,      setShowTestNotes]           = useState(false)
  const [testNotes,          setTestNotes]              = useState(() => {
    try {
      const saved = localStorage.getItem('edit_studio_test_notes')
      return saved ? JSON.parse(saved) : { testDate: '', videoType: '', result: '', issuesFound: '', nextFix: '' }
    } catch { return { testDate: '', videoType: '', result: '', issuesFound: '', nextFix: '' } }
  })
  const [aiCuts,           setAiCuts]            = useState([])
  const [captionSettings,  setCaptionSettings]   = useState(DEFAULT_CAPTION_SETTINGS)
  const [musicRecs,        setMusicRecs]         = useState(MOCK_MUSIC)
  const [selectedMusic,    setSelectedMusic]      = useState(null)
  const [exportSettings,   setExportSettings]    = useState(DEFAULT_EXPORT_SETTINGS)

  // ── Persistence state (must precede handlers that reference projectId / saveProject) ──

  const [projectId,      setProjectId]      = useState(null)
  const [saveStatus,     setSaveStatus]      = useState('idle')
  const [lastSavedAt,    setLastSavedAt]     = useState(null)   // eslint-disable-line no-unused-vars
  const [recentProjects, setRecentProjects]  = useState([])
  const [sidebarOpen,    setSidebarOpen]     = useState(false)
  const [syncAvailable,  setSyncAvailable]   = useState(true)
  const [loadingRecent,  setLoadingRecent]   = useState(false)

  const isDirty       = useRef(false)
  const savedTimer    = useRef(null)
  const mountedRef    = useRef(false)
  const stateSnapshot = useRef({})

  // Always-fresh snapshot for the auto-save interval (avoids stale closures)
  stateSnapshot.current = { project, transcriptSegs, aiCuts, captionSettings, selectedMusic, exportSettings, aiDirectorAnalysis, cutPlans, selectedPlanId, editorCleanup, captionTimeline, musicIntelligence, selectedMusicBed, renderPlan }

  // ── Project status (derived) ───────────────────────────────────────────────

  const projectStatus = (() => {
    if (selectedMusic && aiCuts.length > 0) return 'edited'
    if (aiCuts.length > 0)                  return 'analyzed'
    if (transcriptSegs.length > 0)          return 'transcribed'
    if (project.videoFile)                  return 'uploaded'
    return 'draft'
  })()

  // ── Local storage fallback ─────────────────────────────────────────────────

  const LS_KEY = 'edit_studio_session'
  const saveToLocal  = (payload) => { try { localStorage.setItem(LS_KEY, JSON.stringify({ ...payload, _ts: Date.now() })) } catch {} }
  const loadFromLocal = () => { try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null } catch { return null } }

  // ── Persistence: save ──────────────────────────────────────────────────────

  const buildPayload = (snap) => {
    const s      = snap.project
    const status = (() => {
      if (snap.selectedMusic && snap.aiCuts.length > 0) return 'edited'
      if (snap.aiCuts.length > 0)                       return 'analyzed'
      if (snap.transcriptSegs.length > 0)               return 'transcribed'
      if (s.videoFile)                                   return 'uploaded'
      return 'draft'
    })()
    return {
      title:             s.title             || 'Untitled Edit',
      platform:          s.platform          ?? null,
      goal:              s.goal              ?? null,
      status,
      source_video_name: s.videoFile         ?? null,
      source_video_size: s.videoSize         ?? null,
      source_video_type: s.videoType         ?? null,
      source_video_url:  s.sourceVideoUrl    ?? null,
      transcript_data:   snap.transcriptSegs,
      ai_cuts_data:      snap.aiCuts,
      caption_settings:  snap.captionSettings,
      selected_music:    snap.selectedMusic  ?? null,
      export_settings:   snap.exportSettings,
      director_analysis: snap.aiDirectorAnalysis ?? null,
      cut_plans:         snap.cutPlans           ?? [],
      selected_cut_plan: snap.cutPlans?.find(p => p.id === snap.selectedPlanId) ?? null,
      editor_cleanup:    snap.editorCleanup      ?? {},
      caption_timeline:  snap.captionTimeline    ?? [],
      music_intelligence: snap.musicIntelligence ?? {},
      selected_music_bed: snap.selectedMusicBed  ?? {},
      render_plan:        snap.renderPlan        ?? {},
    }
  }

  const saveProject = useCallback(async (quiet = false) => {
    const snap    = stateSnapshot.current
    const payload = buildPayload(snap)
    saveToLocal(payload)
    if (!quiet) setSaveStatus('saving')
    try {
      const id  = projectId
      const url = id ? `/api/edit-projects/${id}` : '/api/edit-projects'
      const res = await fetch(url, {
        method:  id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message || 'Save failed')
      if (!id && data.project?.id) setProjectId(data.project.id)
      setSaveStatus('saved')
      setSyncAvailable(true)
      setLastSavedAt(new Date())
      isDirty.current = false
      clearTimeout(savedTimer.current)
      savedTimer.current = setTimeout(() => setSaveStatus('idle'), 4000)
    } catch {
      setSyncAvailable(false)
      setSaveStatus('error')
      isDirty.current = false
    }
  }, [projectId]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────────────

  // isReady: workflow unlocks as soon as upload+platform+goal are set.
  // Mock "Generate AI Edit" and real Whisper both set status='ready', but
  // the workflow no longer requires either — a complete upload is enough.
  const isReady    = project.status === 'ready' ||
                     (!!project.videoFile && !!project.platform && !!project.goal)
  const canAnalyze = !!project.videoFile && !!project.platform && !!project.goal && !analyzing

  // ── File handling ──────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('video/')) return
    videoFileRef.current = file // keep the File object alive for Whisper upload
    setProject(p => ({
      ...p,
      videoFile: file.name,
      videoSize: file.size,
      videoType: file.type,
      status:    'uploading',
      title:     p.title || file.name.replace(/\.[^.]+$/, ''),
    }))
    setTimeout(() => setProject(p => ({ ...p, status: 'idle' })), 600)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files[0])
  }, [handleFileSelect])

  // ── Analyze ────────────────────────────────────────────────────────────────

  const handleAnalyze = useCallback(() => {
    if (!canAnalyze) return
    setAnalyzing(true)
    setProject(p => ({ ...p, status: 'analyzing' }))

    setTimeout(() => {
      const platform = PLATFORMS.find(p => p.id === project.platform)
      // Only inject mock transcript if no real Whisper transcript exists yet
      if (!stateSnapshot.current.transcriptSegs.length) setTranscriptSegs(MOCK_TRANSCRIPT)
      setAiCuts(MOCK_AI_CUTS)
      setExportSettings(s => ({
        ...s,
        platform:   project.platform,
        resolution: platform?.resolution || '1080x1920',
      }))
      setProject(p => ({ ...p, status: 'ready', createdAt: new Date().toISOString() }))
      setAnalyzing(false)
      setActiveStep(1)
    }, 2200)
  }, [canAnalyze, project.platform])

  // ── Transcription ──────────────────────────────────────────────────────────

  const handleTranscribe = useCallback(async () => {
    const file = videoFileRef.current
    if (!project.videoFile) return // nothing uploaded yet
    setTranscribing(true)
    setTranscribeError(null)

    try {
      // Always read sourceVideoUrl from the live snapshot — the useCallback dep array
      // may not include it, so the closure could be stale after an upload.
      const sourceVideoUrl = stateSnapshot.current.project.sourceVideoUrl || project.sourceVideoUrl

      let res
      if (sourceVideoUrl) {
        // ALWAYS prefer the storage URL path — avoids Vercel's 4.5 MB body limit.
        // The server downloads the video from Supabase Storage and sends to Whisper.
        res = await fetch('/api/edit-studio/transcribe', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            projectId,
            sourceVideoUrl,
            sourceVideoName: project.videoFile || 'video.mp4',
            sourceVideoType: project.videoType || 'video/mp4',
          }),
        })
      } else if (file && file.size <= 4 * 1024 * 1024) {
        // File in memory AND under 4 MB — safe to send directly (local dev / small files)
        const fd = new FormData()
        fd.append('file', file, file.name)
        if (projectId) fd.append('projectId', projectId)
        fd.append('sourceVideoName', project.videoFile || '')
        fd.append('sourceVideoType', project.videoType || 'video/mp4')
        res = await fetch('/api/edit-studio/transcribe', { method: 'POST', body: fd })
      } else {
        // No storage URL and file too large for Vercel — tell user to upload first
        setTranscribeError('Video too large to send directly. Go to the Export tab → click "Upload Source Video" first, then come back and try again.')
        setTranscribing(false)
        return
      }
      const data = await res.json()

      if (data.status !== 'success') throw new Error(data.message || 'Transcription failed')

      const t = data.transcript
      setTranscriptSegs(t.segments || [])
      setTranscriptMeta({
        provider:   t.provider,
        language:   t.language,
        duration:   t.duration_seconds,
        confidence: t.confidence,
        fallback:   data.fallback || false,
        reason:     data.fallback_reason || '',
      })
      // Unlock workflow and update project status
      setProject(p => ({
        ...p,
        status:        'ready',
        videoDuration: t.duration_seconds || p.videoDuration,
      }))
      // Auto-save the transcript
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      setTranscribeError(err.message)
    } finally {
      setTranscribing(false)
    }
  }, [project.videoFile, project.videoType, projectId, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── AI Director analysis ──────────────────────────────────────────────────

  const handleRunDirector = useCallback(async () => {
    if (!transcriptSegs.length) return
    setDirectorRunning(true)
    try {
      const res  = await fetch('/api/edit-studio/analyze', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          platform:       project.platform,
          goal:           project.goal,
          transcript:     transcriptSegs,
          transcriptMeta,
          projectContext: { title: project.title, videoDuration: project.videoDuration },
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)

      setAiDirectorAnalysis(data.analysis)
      setAiDirectorFallback(data.fallback || false)
      setProject(p => ({ ...p, status: 'ready' }))
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      console.error('AI Director error:', err)
    } finally {
      setDirectorRunning(false)
    }
  }, [transcriptSegs, project, projectId, transcriptMeta, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── AI Cut Engine ─────────────────────────────────────────────────────────

  const handleBuildPlans = useCallback(async () => {
    if (!aiDirectorAnalysis || !transcriptSegs.length) return
    setBuildingPlans(true)
    try {
      const res  = await fetch('/api/edit-studio/cuts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          directorAnalysis: aiDirectorAnalysis,
          transcript:       transcriptSegs,
          platform:         project.platform,
          goal:             project.goal,
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setCutPlans(data.cutPlans || [])
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      console.error('Build plans error:', err)
    } finally {
      setBuildingPlans(false)
    }
  }, [aiDirectorAnalysis, transcriptSegs, project.platform, project.goal, projectId, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectPlan = useCallback((planId) => {
    setSelectedPlanId(planId)
    setCutPlans(plans => plans.map(p => ({
      ...p,
      status: p.id === planId ? 'selected' : p.status === 'selected' ? 'draft' : p.status,
    })))
    setShowTimeline(true)
    isDirty.current = true
  }, [])

  const handleToggleSegment = useCallback((planId, segId) => {
    setCutPlans(plans => plans.map(p => {
      if (p.id !== planId) return p
      return {
        ...p,
        segments: p.segments.map(s => s.id === segId ? { ...s, keep: !s.keep } : s),
      }
    }))
    isDirty.current = true
  }, [])

  const handleRunCleanup = useCallback(async () => {
    const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
    if (!transcriptSegs.length || !selectedPlan) return
    setRunningCleanup(true)
    try {
      const res  = await fetch('/api/edit-studio/editor-cleanup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          transcript:      transcriptSegs,
          selectedCutPlan: selectedPlan,
          directorAnalysis: aiDirectorAnalysis,
          platform:        project.platform,
          goal:            project.goal,
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setEditorCleanup(data)
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      console.error('Cleanup error:', err)
    } finally {
      setRunningCleanup(false)
    }
  }, [cutPlans, selectedPlanId, transcriptSegs, project, projectId, aiDirectorAnalysis, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleCleanup = useCallback((removalId) => {
    setEditorCleanup(prev => {
      if (!prev) return prev
      return {
        ...prev,
        removals: prev.removals.map(r => r.id === removalId ? { ...r, apply: !r.apply } : r),
      }
    })
    isDirty.current = true
  }, [])

  const handleApplyCleanup = useCallback(() => {
    if (!editorCleanup?.removals || !selectedPlanId) return
    const activeRemovals = editorCleanup.removals.filter(r => r.apply)

    setCutPlans(plans => plans.map(plan => {
      if (plan.id !== selectedPlanId) return plan
      // For each active removal, mark overlapping segments as not kept
      const updatedSegments = plan.segments.map(seg => {
        const overlapsRemoval = activeRemovals.some(r =>
          r.type !== 'filler' && // fillers are sub-segment, don't kill the whole segment
          r.start <= seg.start + (seg.end - seg.start) * 0.5 &&
          r.end   >= seg.end   - (seg.end - seg.start) * 0.5
        )
        return overlapsRemoval ? { ...seg, keep: false } : seg
      })
      return { ...plan, segments: updatedSegments, status: 'approved' }
    }))
    isDirty.current = true
    saveProject(false)
  }, [editorCleanup, selectedPlanId, saveProject])

  // ── Caption Engine ─────────────────────────────────────────────────────────

  const handleGenerateCaptions = useCallback(async () => {
    const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
    if (!transcriptSegs.length || !selectedPlan) return
    setGeneratingCaptions(true)
    try {
      const res  = await fetch('/api/edit-studio/captions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          transcript:      transcriptSegs,
          selectedCutPlan: selectedPlan,
          editorCleanup,
          captionSettings,
          directorAnalysis: aiDirectorAnalysis,
          platform:        project.platform,
          goal:            project.goal,
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setCaptionTimeline(data.captions || [])
      setCaptionSummary(data.captionSummary || null)
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      console.error('Caption generation error:', err)
    } finally {
      setGeneratingCaptions(false)
    }
  }, [cutPlans, selectedPlanId, transcriptSegs, captionSettings, editorCleanup, aiDirectorAnalysis, project, projectId, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditCaption = useCallback((id, newText) => {
    setCaptionTimeline(caps => caps.map(c => c.id === id ? { ...c, text: newText } : c))
    isDirty.current = true
  }, [])

  const handleDeleteCaption = useCallback((id) => {
    setCaptionTimeline(caps => caps.filter(c => c.id !== id))
    isDirty.current = true
  }, [])

  const handleApplyPreset = useCallback((preset) => {
    setCaptionSettings(s => ({
      ...s,
      style:     preset.styleId,
      position:  preset.position,
      animation: preset.animation,
    }))
    isDirty.current = true
  }, [])

  // ── Music Intelligence ─────────────────────────────────────────────────────

  const handleRecommendMusic = useCallback(async () => {
    const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
    if (!selectedPlan && !aiDirectorAnalysis) return
    setRecommendingMusic(true)
    try {
      const res  = await fetch('/api/edit-studio/music', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          platform:        project.platform,
          goal:            project.goal,
          selectedCutPlan: selectedPlan || null,
          directorAnalysis: aiDirectorAnalysis,
          captionSummary,
          captionSettings,
          editorCleanup,
          availableTracks: musicRecs,
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setMusicIntelligence(data)
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      console.error('Music intelligence error:', err)
    } finally {
      setRecommendingMusic(false)
    }
  }, [cutPlans, selectedPlanId, aiDirectorAnalysis, project, projectId, captionSummary, captionSettings, editorCleanup, musicRecs, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectMusicBed = useCallback((track, timingPlan) => {
    const bed = {
      trackId:     track.id,
      title:       track.title,
      mood:        track.mood,
      bpm:         track.bpm,
      selectedAt:  new Date().toISOString(),
      timingPlan:  timingPlan || {},
      volume:      timingPlan?.targetVolume ?? 0.6,
      fadeIn:      timingPlan?.introFade   ?? 1.0,
      fadeOut:     timingPlan?.outroFade   ?? 2.0,
      startTime:   timingPlan?.recommendedStartTime ?? 0,
      loop:        timingPlan?.loop ?? false,
    }
    setSelectedMusicBed(bed)
    setSelectedMusic(track)   // backward compat with existing state
    isDirty.current = true
    saveProject(true)
  }, [saveProject])

  const handleUpdateMusicBed = useCallback((field, value) => {
    setSelectedMusicBed(prev => prev ? { ...prev, [field]: value } : prev)
    isDirty.current = true
  }, [])

  // ── Render pipeline ────────────────────────────────────────────────────────

  const handlePrepareRenderPlan = useCallback(async () => {
    setPreparingPlan(true)
    setRenderWarnings([])
    try {
      const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
      const res  = await fetch('/api/edit-studio/render-plan', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          sourceVideoUrl:  project.sourceVideoUrl  || null,
          sourceVideoName: project.videoFile,
          selectedCutPlan: selectedPlan || null,
          editorCleanup,
          captionTimeline,
          captionSettings,
          selectedMusicBed,
          exportSettings,
          platform: project.platform,
          goal:     project.goal,
        }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      if (data.renderPlan) {
        setRenderPlan(data.renderPlan)
        isDirty.current = true
        saveProject(true)
      }
      setRenderWarnings(data.validationWarnings || [])
      // Return missing requirements so UI can show them
      return { canRender: data.canRender, missing: data.missingRequirements || [] }
    } catch (err) {
      console.error('Render plan error:', err)
      return { canRender: false, missing: [err.message] }
    } finally {
      setPreparingPlan(false)
    }
  }, [cutPlans, selectedPlanId, project, projectId, editorCleanup, captionTimeline, selectedMusicBed, exportSettings, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreateRenderJob = useCallback(async () => {
    if (!renderPlan) return
    setCreatingJob(true)
    try {
      const res  = await fetch('/api/edit-studio/render', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ projectId, renderPlan }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setRenderJob({
        id:         data.jobId,
        status:     data.jobStatus,
        message:    data.message,
        exportUrl:  data.exportUrl  || null,
        queuedAt:   data.queuedAt   || new Date().toISOString(),
        renderMode: data.renderMode || 'queue',
        createdAt:  new Date().toISOString(),
      })
      isDirty.current = true
    } catch (err) {
      console.error('Render job error:', err)
    } finally {
      setCreatingJob(false)
    }
  }, [renderPlan, projectId])

  const handleRetryRender = useCallback(async () => {
    if (!renderPlan || retryingRender) return
    setRetryingRender(true)
    setRenderJob(null)      // clear failed job
    try {
      await handleCreateRenderJob()
    } finally {
      setRetryingRender(false)
    }
  }, [renderPlan, retryingRender, handleCreateRenderJob]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateTestNotes = useCallback((field, value) => {
    setTestNotes(prev => {
      const updated = { ...prev, [field]: value }
      try { localStorage.setItem('edit_studio_test_notes', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  // Ctrl+D → toggle Pipeline Health Panel (dev tool)
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'd') { e.preventDefault(); setShowHealthPanel(p => !p) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Upload source video to Supabase Storage so the render server can access it
  const handleUploadSource = useCallback(async () => {
    const file = videoFileRef.current
    if (!file) {
      setSourceUploadError('Video file not in memory. Go back to Upload tab and re-drop your video first.')
      return
    }
    setUploadingSource(true)
    setSourceUploadPct(0)
    setSourceUploadError(null)
    try {
      // 1. Get signed upload URL from server
      const presignRes = await fetch('/api/edit-studio/upload-source', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ projectId, fileName: file.name, fileSize: file.size, mimeType: file.type }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message || 'Presign failed')

      // 2. Upload directly to Supabase Storage (browser → Supabase, bypasses Vercel)
      setSourceUploadPct(10)
      const uploadRes = await fetch(presignData.signedUrl, {
        method:  'PUT',
        headers: { 'Content-Type': file.type || 'video/mp4' },
        body:    file,
      })
      if (!uploadRes.ok) {
        const errText = await uploadRes.text().catch(() => uploadRes.statusText)
        throw new Error(`Storage upload failed: HTTP ${uploadRes.status} — ${errText}`)
      }
      setSourceUploadPct(100)

      // 3. Store the storage URL on the project and save
      setProject(p => ({ ...p, sourceVideoUrl: presignData.publicUrl }))
      isDirty.current = true
      saveProject(true)
    } catch (err) {
      setSourceUploadError(err.message)
      console.error('Source upload error:', err)
    } finally {
      setUploadingSource(false)
    }
  }, [videoFileRef, projectId, saveProject]) // eslint-disable-line react-hooks/exhaustive-deps

  // Poll render status every 3s while job is queued or processing
  useEffect(() => {
    const isActive = renderJob?.status === 'queued' || renderJob?.status === 'processing'
    if (!renderJob?.id || !isActive) return

    const interval = setInterval(async () => {
      try {
        const res  = await fetch(`/api/edit-studio/render-status?jobId=${renderJob.id}`)
        const data = await res.json()
        if (data.status !== 'success') return
        setRenderJob(prev => ({
          ...prev,
          status:        data.jobStatus,
          exportUrl:     data.exportUrl     || prev?.exportUrl,
          error:         data.errorMessage,
          renderDetails: data.renderDetails || prev?.renderDetails,
          updatedAt:     data.updatedAt,
        }))
        if (data.jobStatus === 'completed' || data.jobStatus === 'failed') {
          clearInterval(interval)
        }
      } catch { /* polling error is non-fatal */ }
    }, 3000)

    return () => clearInterval(interval)
  }, [renderJob?.id, renderJob?.status])

  // ── Nav helpers ────────────────────────────────────────────────────────────

  const canGoNext      = isReady
  const stepAccessible = (i) => {
    if (i === 0) return true
    if (i === 1) return isReady                                                      // Transcript: needs upload+platform+goal
    if (i === 2) return isReady && transcriptSegs.length > 0                         // AI Cut: needs transcript
    if (i === 3) return isReady && transcriptSegs.length > 0                         // Captions: needs transcript
    if (i === 4) return isReady && (!!aiDirectorAnalysis || cutPlans.length > 0)     // Music: needs director or plans
    if (i === 5) return isReady                                                      // Export: needs setup
    return false
  }

  // ── Persistence: load single project ──────────────────────────────────────

  const loadProject = useCallback(async (id) => {
    try {
      const res  = await fetch(`/api/edit-projects/${id}`)
      const data = await res.json()
      if (data.status !== 'success') throw new Error('Not found')
      const p = data.project
      // Derive video duration from the last transcript segment if available
      const derivedDuration = (p.transcript_data || []).at(-1)?.end || null
      setProject({
        ...EMPTY_PROJECT,
        title:           p.title,
        platform:        p.platform,
        goal:            p.goal,
        videoFile:       p.source_video_name,
        videoSize:       p.source_video_size,
        sourceVideoUrl:  p.source_video_url || null,
        videoDuration:   derivedDuration,
        status:          (p.transcript_data?.length || p.ai_cuts_data?.length) ? 'ready' : 'idle',
      })
      setTranscriptSegs(p.transcript_data   || [])
      setAiCuts(p.ai_cuts_data              || [])
      setCaptionSettings(p.caption_settings && Object.keys(p.caption_settings).length
        ? p.caption_settings : DEFAULT_CAPTION_SETTINGS)
      setSelectedMusic(p.selected_music     || null)
      setExportSettings(p.export_settings && Object.keys(p.export_settings).length
        ? p.export_settings : DEFAULT_EXPORT_SETTINGS)
      setAiDirectorAnalysis(p.director_analysis || null)
      setAiDirectorFallback(false)
      setCutPlans(p.cut_plans || [])
      setSelectedPlanId(p.selected_cut_plan?.id || null)
      setShowTimeline(!!p.selected_cut_plan)
      setEditorCleanup(p.editor_cleanup && Object.keys(p.editor_cleanup).length ? p.editor_cleanup : null)
      setCaptionTimeline(p.caption_timeline || [])
      setCaptionSummary(null)
      setMusicIntelligence(p.music_intelligence && Object.keys(p.music_intelligence).length ? p.music_intelligence : null)
      setSelectedMusicBed(p.selected_music_bed && Object.keys(p.selected_music_bed).length ? p.selected_music_bed : null)
      setRenderPlan(p.render_plan && Object.keys(p.render_plan).length ? p.render_plan : null)
      setRenderJob(null)
      setProjectId(id)
      setSaveStatus('idle')
      isDirty.current = false
      // Jump to the furthest meaningful step
      if ((p.ai_cuts_data || []).length > 0)      setActiveStep(2)
      else if ((p.transcript_data || []).length > 0) setActiveStep(1)
      else                                          setActiveStep(0)
      setSidebarOpen(false)
    } catch {
      setSyncAvailable(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persistence: list ──────────────────────────────────────────────────────

  const loadRecentProjects = useCallback(async () => {
    setLoadingRecent(true)
    try {
      const res  = await fetch('/api/edit-projects')
      const data = await res.json()
      if (data.status === 'success') setRecentProjects(data.projects || [])
    } catch {}
    finally { setLoadingRecent(false) }
  }, [])

  // ── Persistence: new / open / duplicate / delete ───────────────────────────

  const handleNewProject = useCallback(() => {
    setProject(EMPTY_PROJECT)
    setTranscriptSegs([])
    setAiCuts([])
    setCaptionSettings(DEFAULT_CAPTION_SETTINGS)
    setSelectedMusic(null)
    setExportSettings(DEFAULT_EXPORT_SETTINGS)
    setProjectId(null)
    setAiDirectorAnalysis(null)
    setAiDirectorFallback(false)
    setCutPlans([])
    setSelectedPlanId(null)
    setShowTimeline(false)
    setEditorCleanup(null)
    setCaptionTimeline([])
    setCaptionSummary(null)
    setMusicIntelligence(null)
    setSelectedMusicBed(null)
    setRenderPlan(null)
    setRenderJob(null)
    setActiveStep(0)
    setSaveStatus('idle')
    isDirty.current = false
    setSidebarOpen(false)
  }, [])

  const handleOpenProject    = useCallback((id) => loadProject(id), [loadProject])

  const handleDuplicateProject = useCallback(async (id) => {
    try {
      const res  = await fetch(`/api/edit-projects/${id}`)
      const data = await res.json()
      if (data.status !== 'success') return
      const p       = data.project
      const payload = {
        title:            `${p.title} (copy)`,
        platform:          p.platform,
        goal:              p.goal,
        status:           'draft',
        source_video_name: p.source_video_name,
        transcript_data:   p.transcript_data,
        ai_cuts_data:      p.ai_cuts_data,
        caption_settings:  p.caption_settings,
        selected_music:    p.selected_music,
        export_settings:   p.export_settings,
      }
      await fetch('/api/edit-projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body:   JSON.stringify(payload),
      })
      loadRecentProjects()
    } catch {}
  }, [loadRecentProjects])

  const handleDeleteProject = useCallback(async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      await fetch(`/api/edit-projects/${id}`, { method: 'DELETE' })
      setRecentProjects(r => r.filter(p => p.id !== id))
      if (id === projectId) handleNewProject()
    } catch {}
  }, [projectId, handleNewProject])

  // ── Effects ────────────────────────────────────────────────────────────────

  // Auto-save every 30 s when dirty
  useEffect(() => {
    const iv = setInterval(() => { if (isDirty.current) saveProject(true) }, 30000)
    return () => clearInterval(iv)
  }, [saveProject])

  // Mark unsaved when meaningful state changes (skip the initial mount)
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return }
    setSaveStatus('unsaved')
    isDirty.current = true
  }, [ // eslint-disable-next-line react-hooks/exhaustive-deps
    project.title, project.platform, project.goal, project.videoFile,
    captionSettings, selectedMusic, exportSettings,
    transcriptSegs.length, aiCuts.length,
  ])

  // On mount: load recent projects + try to restore last local session title/platform/goal
  useEffect(() => {
    loadRecentProjects()
    const local = loadFromLocal()
    if (local && !project.videoFile) {
      setProject(p => ({
        ...p,
        title:    local.title    || p.title,
        platform: local.platform || p.platform,
        goal:     local.goal     || p.goal,
      }))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh sidebar list whenever a save succeeds
  useEffect(() => {
    if (saveStatus === 'saved') loadRecentProjects()
  }, [saveStatus, loadRecentProjects])

  // ─── Section: Upload ───────────────────────────────────────────────────────

  const renderUpload = () => {
    const platformMeta = PLATFORMS.find(p => p.id === project.platform)
    const goalMeta     = GOALS.find(g => g.id === project.goal)
    const showRec      = !!project.platform && !!project.goal

    const durationRec = (() => {
      if (project.platform === 'meta')      return '10–15 seconds'
      if (project.platform === 'tiktok')    return '15–30 seconds'
      if (project.platform === 'instagram') return '30–45 seconds'
      if (project.platform === 'youtube')   return '45–60 seconds'
      if (project.platform === 'linkedin')  return '60–90 seconds'
      return null
    })()

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Drop zone */}
        <div
          ref={dropRef}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border:       `2px dashed ${dragOver ? C.gold : project.videoFile ? C.green : C.subtle}`,
            borderRadius: 14,
            padding:      project.videoFile ? '18px 20px' : '52px 24px',
            textAlign:    'center',
            cursor:       'pointer',
            background:   dragOver ? C.goldGlow : project.videoFile ? C.greenGlow : C.surface,
            transition:   'all 0.2s',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={e => handleFileSelect(e.target.files?.[0])}
          />
          {project.videoFile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>🎬</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 2 }}>{project.videoFile}</div>
                <div style={{ fontSize: 11, color: C.muted }}>
                  {project.status === 'uploading' ? 'Processing…' : 'Ready · click to replace'}
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.6 }}>⬆</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Drop your video here</div>
              <div style={{ fontSize: 12, color: C.muted }}>or click to browse — MP4, MOV, WebM · max 2 GB</div>
            </>
          )}
        </div>

        {/* Video preview card — appears after upload */}
        {project.videoFile && (
          <div style={{ borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface, overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
              {/* Thumbnail placeholder */}
              <div style={{
                width: 128, height: 88, flexShrink: 0,
                background: 'linear-gradient(135deg, #12121e 0%, #080810 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: `1px solid ${C.hairline}`,
              }}>
                <div style={{ fontSize: 26, opacity: 0.35 }}>🎬</div>
              </div>
              {/* Meta grid */}
              <div style={{
                padding: '14px 16px', display: 'grid',
                gridTemplateColumns: '1fr 1fr', gap: '8px 24px',
                flex: 1, alignContent: 'center',
              }}>
                {[
                  { label: 'Duration',   value: project.videoDuration ? `${project.videoDuration}s` : '—' },
                  { label: 'Size',       value: project.videoSize ? fmtSize(project.videoSize) : '—'      },
                  { label: 'Resolution', value: '1920×1080'                                                },
                  { label: 'Format',     value: (project.videoFile.split('.').pop() || 'MP4').toUpperCase() },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 9, color: C.ghost, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Platform */}
        <div>
          <Label>Target Platform</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PLATFORMS.map(p => {
              const on = project.platform === p.id
              return (
                <Pill key={p.id} active={on} color={C.gold} onClick={() => setProject(pr => ({ ...pr, platform: p.id }))}>
                  {p.label}
                </Pill>
              )
            })}
          </div>
          {project.platform && (
            <div style={{ fontSize: 11, color: C.ghost, marginTop: 8 }}>
              {platformMeta?.resolution} · max {fmtDur(platformMeta?.maxDuration ?? 0)}
            </div>
          )}
        </div>

        {/* Goal */}
        <div>
          <Label>Content Goal</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GOALS.map(g => {
              const on = project.goal === g.id
              return (
                <Pill key={g.id} active={on} color={C.blue} onClick={() => setProject(p => ({ ...p, goal: g.id }))}>
                  {g.icon} {g.label}
                </Pill>
              )
            })}
          </div>
        </div>

        {/* AI Director Recommendation — shown once platform + goal are selected */}
        {showRec && (
          <div style={{
            borderRadius: 10, padding: '16px',
            border:     `1px solid ${C.violet}28`,
            background: C.violet + '0a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: C.violet }}>✦</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.violet, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                AI Director Recommendation
              </div>
              <div style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto', fontStyle: 'italic' }}>
                Mock · live analysis in Phase 4
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Best for this upload:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { label: platformMeta?.label, detail: `${platformMeta?.resolution} · vertical` },
                { label: goalMeta?.label,     detail: 'personal + authentic tone'               },
                { label: durationRec,         detail: 'optimal engagement window'               },
              ].filter(r => r.label).map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ fontSize: 12, color: C.green, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</div>
                  <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: C.primary }}>{rec.label}</span>
                    <span style={{ color: C.muted }}> — {rec.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project title */}
        <div>
          <Label>Project Title</Label>
          <input
            type="text"
            value={project.title}
            onChange={e => setProject(p => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Q2 Founder Update — 30s cut"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 8,
              border: `1px solid ${C.hairline}`, background: C.surface,
              color: C.primary, fontSize: 14, fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>

        {/* Primary CTA: go to Transcript tab when ready */}
        <div style={{ paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {isReady && !analyzing ? (
            <>
              <button
                onClick={() => setActiveStep(1)}
                style={{
                  width: '100%', padding: '15px 24px', borderRadius: 10,
                  fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
                  cursor: 'pointer',
                  border: `1px solid ${C.green}`,
                  background: C.greenGlow,
                  color: C.green,
                  transition: 'all 0.2s',
                }}>
                Next: Generate Transcript →
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                style={{
                  width: '100%', padding: '10px 24px', borderRadius: 8,
                  fontSize: 12, fontWeight: 700, letterSpacing: 0.3,
                  cursor: canAnalyze ? 'pointer' : 'not-allowed',
                  border: `1px solid ${C.hairline}`,
                  background: C.surface,
                  color: C.secondary,
                  transition: 'all 0.2s',
                }}>
                ⚡ Fill Demo Data
              </button>
              <div style={{ fontSize: 10, color: C.ghost, textAlign: 'center' }}>
                "Fill Demo Data" loads mock transcript + cuts for testing without real AI.
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || analyzing}
                style={{
                  width: '100%', padding: '15px 24px', borderRadius: 10,
                  fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
                  cursor: canAnalyze && !analyzing ? 'pointer' : 'not-allowed',
                  border: `1px solid ${canAnalyze ? C.gold : C.hairline}`,
                  background: canAnalyze ? C.goldGlow : C.surface,
                  color: canAnalyze ? C.gold : C.ghost,
                  transition: 'all 0.2s',
                }}>
                {analyzing ? '⟳  Filling demo data…' : '⚡  Get Started'}
              </button>
              {analyzing && (
                <div style={{ fontSize: 11, color: C.gold, textAlign: 'center' }}>
                  Loading demo transcript and AI cuts…
                </div>
              )}
              {!analyzing && !canAnalyze && (
                <div style={{ fontSize: 11, color: C.ghost, textAlign: 'center' }}>
                  {!project.videoFile ? 'Upload a video to get started'
                    : !project.platform ? 'Select a target platform'
                    : 'Select a content goal'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // ─── Section: Transcript ───────────────────────────────────────────────────

  const renderTranscript = () => {
    const hasFile       = !!project.videoFile
    const hasTranscript = transcriptSegs.length > 0
    const duration      = transcriptMeta?.duration || transcriptSegs.at(-1)?.end || 0
    const wordCount     = transcriptSegs.reduce((n, s) => n + s.text.split(/\s+/).filter(Boolean).length, 0)
    const avgConfidence = hasTranscript
      ? Math.round(transcriptSegs.reduce((n, s) => n + (s.confidence || 0), 0) / transcriptSegs.length * 100)
      : 0

    const exportTxt = () => {
      const lines = transcriptSegs.map(s => `[${fmtTime(s.start)} → ${fmtTime(s.end)}] ${s.speaker}: ${s.text}`)
      const blob  = new Blob([lines.join('\n\n')], { type: 'text/plain' })
      const url   = URL.createObjectURL(blob)
      Object.assign(document.createElement('a'), { href: url, download: `${project.title || 'transcript'}.txt` }).click()
      URL.revokeObjectURL(url)
    }

    const copyTranscript = () => {
      const text = transcriptSegs.map(s => s.text).join(' ')
      navigator.clipboard?.writeText(text).catch(() => {})
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Generate / Regenerate button */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={handleTranscribe}
            disabled={transcribing || !hasFile}
            style={{
              padding: '11px 22px', borderRadius: 9, fontSize: 13, fontWeight: 800, letterSpacing: 0.3,
              cursor:     (transcribing || !hasFile) ? 'not-allowed' : 'pointer',
              border:     `1px solid ${hasFile && !transcribing ? C.violet : C.hairline}`,
              background: hasFile && !transcribing ? C.violet + '22' : C.surface,
              color:      hasFile && !transcribing ? C.violet : C.ghost,
              transition: 'all 0.2s',
              flex: 1,
            }}
          >
            {transcribing
              ? '⟳  Transcribing…'
              : hasTranscript
                ? '↺  Regenerate Transcript'
                : '📝  Generate Transcript'}
          </button>

          {hasTranscript && (
            <>
              <GhostBtn onClick={copyTranscript}>Copy text</GhostBtn>
              <GhostBtn onClick={exportTxt}>Export .txt</GhostBtn>
            </>
          )}
        </div>

        {/* Transcribing loading state */}
        {transcribing && (
          <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${C.violet}28`, background: C.violet + '0a', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: C.violet, fontWeight: 700, marginBottom: 6 }}>Transcribing…</div>
            <div style={{ fontSize: 11, color: C.muted }}>Sending to Whisper · extracting timestamps · building segments</div>
          </div>
        )}

        {/* Error */}
        {transcribeError && !transcribing && (
          <div style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #c45a5a44', background: '#c45a5a0e' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#c45a5a', marginBottom: 3 }}>Transcription error</div>
            <div style={{ fontSize: 11, color: '#9e6a6a' }}>{transcribeError}</div>
          </div>
        )}

        {/* No file uploaded yet */}
        {!hasFile && !transcribing && (
          <EmptyState icon="📝">Upload a video first, then generate a transcript.</EmptyState>
        )}

        {/* File uploaded, no transcript yet */}
        {hasFile && !hasTranscript && !transcribing && !transcribeError && (
          <div style={{ padding: '32px 24px', textAlign: 'center', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface }}>
            <div style={{ fontSize: 30, marginBottom: 12 }}>📝</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Ready to transcribe</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, maxWidth: 300, margin: '0 auto' }}>
              Click <strong style={{ color: C.violet }}>Generate Transcript</strong> above.<br />
              {videoFileRef.current
                ? 'Your video is loaded and ready.'
                : 'Re-upload your video to enable real transcription. Mock transcript is used otherwise.'}
            </div>
          </div>
        )}

        {/* Fallback warning */}
        {transcriptMeta?.fallback && hasTranscript && (
          <div style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.gold}44`, background: C.goldGlow, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 13, color: C.gold, flexShrink: 0, marginTop: 1 }}>⚠</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 2 }}>Real transcription provider unavailable</div>
              <div style={{ fontSize: 11, color: C.muted }}>Mock transcript loaded for testing. {transcriptMeta.reason || ''}</div>
            </div>
          </div>
        )}

        {/* Transcript stats bar */}
        {hasTranscript && !transcribing && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { label: 'Segments',   value: transcriptSegs.length,                                   color: C.violet },
              { label: 'Duration',   value: fmtDur(duration),                                        color: C.blue   },
              { label: 'Words',      value: wordCount,                                                color: C.green  },
              { label: 'Confidence', value: `${avgConfidence}%`,                                      color: avgConfidence >= 90 ? C.green : C.gold },
            ].map(stat => (
              <div key={stat.label} style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${stat.color}22`, background: stat.color + '0a' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 9, color: C.ghost, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Provider badge */}
        {transcriptMeta && hasTranscript && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: transcriptMeta.fallback ? C.gold : C.green, padding: '2px 8px', borderRadius: 8, border: `1px solid ${transcriptMeta.fallback ? C.gold : C.green}44`, background: (transcriptMeta.fallback ? C.gold : C.green) + '14', textTransform: 'uppercase', letterSpacing: 1 }}>
              {transcriptMeta.provider === 'openai_whisper' ? 'OpenAI Whisper' : transcriptMeta.provider}
            </div>
            <div style={{ fontSize: 10, color: C.ghost }}>{transcriptMeta.language?.toUpperCase()} · {transcriptSegs[0]?.speaker}</div>
          </div>
        )}

        {/* Segment rows */}
        {hasTranscript && !transcribing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {transcriptSegs.map((seg, idx) => (
              <div key={seg.id || idx} style={{ padding: '13px 16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {/* Timestamps */}
                <div style={{ flexShrink: 0, minWidth: 54 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, fontFamily: 'monospace' }}>{fmtTime(seg.start)}</div>
                  <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace', marginTop: 3 }}>→ {fmtTime(seg.end)}</div>
                </div>
                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: C.primary, lineHeight: 1.55 }}>{seg.text}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                    <div style={{ fontSize: 10, color: C.ghost }}>{seg.speaker}</div>
                    <div style={{ fontSize: 10, color: (seg.confidence || 0) >= 0.95 ? C.green : (seg.confidence || 0) >= 0.8 ? C.gold : '#c45a5a' }}>
                      {Math.round((seg.confidence || 0) * 100)}% confidence
                    </div>
                    <div style={{ fontSize: 10, color: C.ghost }}>{fmtDur(seg.end - seg.start)}</div>
                  </div>
                </div>
                <GhostBtn style={{ flexShrink: 0, alignSelf: 'flex-start' }}>Edit</GhostBtn>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── Section: AI Cut ──────────────────────────────────────────────────────

  const renderAICut = () => {
    const hasAnalysis  = !!aiDirectorAnalysis
    const canRunDir    = transcriptSegs.length > 0 && !directorRunning
    const hasMockCuts  = aiCuts.length > 0

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── AI Director panel ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Header + Run button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.violet }}>✦ AI Director</div>
              {aiDirectorFallback && hasAnalysis && (
                <Tag color={C.gold}>Mock</Tag>
              )}
              {hasAnalysis && !aiDirectorFallback && (
                <Tag color={C.green}>claude-opus-4-8</Tag>
              )}
            </div>
            <button
              onClick={handleRunDirector}
              disabled={!canRunDir}
              style={{
                padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                cursor:     canRunDir ? 'pointer' : 'not-allowed',
                border:     `1px solid ${canRunDir ? C.violet : C.hairline}`,
                background: canRunDir ? C.violetGlow : C.surface,
                color:      canRunDir ? C.violet     : C.ghost,
                transition: 'all 0.15s',
              }}>
              {directorRunning ? '⟳  Analyzing…' : hasAnalysis ? '↺  Re-run' : 'Run AI Director Analysis'}
            </button>
          </div>

          {/* No transcript yet */}
          {transcriptSegs.length === 0 && !directorRunning && (
            <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: C.muted }}>Generate a transcript first — the AI Director needs it to analyze your video.</div>
            </div>
          )}

          {/* Loading */}
          {directorRunning && (
            <div style={{ padding: '20px', borderRadius: 10, border: `1px solid ${C.violet}28`, background: C.violet + '0a', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.violet, marginBottom: 6 }}>AI Director is reviewing your transcript…</div>
              <div style={{ fontSize: 11, color: C.muted }}>Analyzing narrative structure · hook quality · edit opportunities</div>
            </div>
          )}

          {/* Fallback warning */}
          {aiDirectorFallback && hasAnalysis && !directorRunning && (
            <div style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.gold}44`, background: C.goldGlow, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 14, color: C.gold, flexShrink: 0 }}>⚠</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 2 }}>AI provider unavailable</div>
                <div style={{ fontSize: 11, color: C.muted }}>Mock director analysis loaded for testing. Connect ANTHROPIC_API_KEY for real analysis.</div>
              </div>
            </div>
          )}

          {/* Analysis results */}
          {hasAnalysis && !directorRunning && (() => {
            const a = aiDirectorAnalysis
            return (
              <>
                {/* Director Verdict */}
                <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.violet}28`, background: C.violet + '0a' }}>
                  <div style={{ fontSize: 10, color: C.violet, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Director Verdict</div>
                  <div style={{ fontSize: 14, color: C.primary, lineHeight: 1.65, fontStyle: 'italic' }}>
                    "{a.directorSummary.verdict}"
                  </div>
                </div>

                {/* Stats: best use case / duration / platform fit */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { label: 'Best Use Case',         value: a.directorSummary.bestUseCase,         color: C.gold   },
                    { label: 'Recommended Duration',  value: a.directorSummary.recommendedDuration, color: C.blue   },
                    { label: 'Platform Fit',          value: a.directorSummary.platformFit,         color: C.green  },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '12px', borderRadius: 8, border: `1px solid ${item.color}22`, background: item.color + '0a' }}>
                      <div style={{ fontSize: 9, color: C.ghost, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.color, lineHeight: 1.4 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Hook Analysis */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: `1px solid ${C.green}28`, background: C.green + '0a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: C.green, fontWeight: 800 }}>✓ STRONGEST HOOK</div>
                      <div style={{ fontSize: 9, color: C.ghost, fontFamily: 'monospace' }}>{fmtTime(a.hookAnalysis.strongestHook.start)} → {fmtTime(a.hookAnalysis.strongestHook.end)}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.4, marginBottom: 6, fontStyle: 'italic' }}>
                      "{a.hookAnalysis.strongestHook.text.slice(0, 90)}{a.hookAnalysis.strongestHook.text.length > 90 ? '…' : ''}"
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{a.hookAnalysis.strongestHook.reason}</div>
                  </div>
                  <div style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #c45a5a28', background: '#c45a5a0a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: '#c45a5a', fontWeight: 800 }}>⚠ WEAK INTRO</div>
                      <div style={{ fontSize: 9, color: C.ghost, fontFamily: 'monospace' }}>{fmtTime(a.hookAnalysis.weakIntro.start)} → {fmtTime(a.hookAnalysis.weakIntro.end)}</div>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{a.hookAnalysis.weakIntro.reason}</div>
                  </div>
                </div>

                {/* Creative Direction */}
                <div style={{ padding: '14px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                  <div style={{ fontSize: 10, color: C.secondary, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Creative Direction</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px 10px' }}>
                    {[
                      { key: 'tone',         label: 'Tone'     },
                      { key: 'pacing',       label: 'Pacing'   },
                      { key: 'captionStyle', label: 'Captions' },
                      { key: 'musicMood',    label: 'Music'    },
                      { key: 'visualEnergy', label: 'Energy'   },
                    ].map(item => (
                      <div key={item.key}>
                        <div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{item.label}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, lineHeight: 1.3 }}>{a.creativeDirection[item.key]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cut Recommendations */}
                {a.cutRecommendations?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Director's Edit Recommendations</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {a.cutRecommendations.map(cut => (
                        <div key={cut.id} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${C.gold}28`, background: C.gold + '08' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{cut.title}</div>
                                <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>{fmtTime(cut.start)} → {fmtTime(cut.end)} · {fmtDur(cut.duration)}</div>
                              </div>
                              <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                                <Tag color={C.violet}>{cut.captionStyle}</Tag>
                                <Tag color={C.blue}>{cut.musicMood}</Tag>
                              </div>
                              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
                                <strong style={{ color: C.secondary }}>CTA:</strong> {cut.cta}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2 }}>
                                  <div style={{ width: `${cut.score}%`, height: '100%', background: C.gold, borderRadius: 2 }} />
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, minWidth: 24 }}>{cut.score}</div>
                              </div>
                            </div>
                            <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: C.goldGlow, color: C.gold, flexShrink: 0 }}>
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Edit Plans ─────────────────────────────────────────────────── */}
                {(() => {
                  const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
                  const canBuild     = !buildingPlans && transcriptSegs.length > 0

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                      {/* Section header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: C.primary, letterSpacing: 0.5 }}>✂ AI Edit Plans</div>
                          {cutPlans.length > 0 && <Tag color={C.green}>{cutPlans.length} plans</Tag>}
                        </div>
                        <button
                          onClick={handleBuildPlans}
                          disabled={!canBuild}
                          style={{
                            padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                            cursor:     canBuild ? 'pointer' : 'not-allowed',
                            border:     `1px solid ${canBuild ? C.green : C.hairline}`,
                            background: canBuild ? C.greenGlow : C.surface,
                            color:      canBuild ? C.green     : C.ghost,
                            transition: 'all 0.15s',
                          }}>
                          {buildingPlans ? '⟳  Building…' : cutPlans.length ? '↺  Rebuild Plans' : '✂  Build AI Edit Plans'}
                        </button>
                      </div>

                      {/* Loading */}
                      {buildingPlans && (
                        <div style={{ padding: '16px', borderRadius: 8, border: `1px solid ${C.green}28`, background: C.green + '0a', textAlign: 'center' }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 4 }}>Building editable cut timeline…</div>
                          <div style={{ fontSize: 11, color: C.muted }}>Mapping director recommendations to transcript timestamps</div>
                        </div>
                      )}

                      {/* Plan cards */}
                      {!buildingPlans && cutPlans.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {cutPlans.map(plan => {
                            const isSelected    = plan.id === selectedPlanId
                            const keptSegCount  = plan.segments.filter(s => s.keep).length
                            const keptDuration  = plan.segments.filter(s => s.keep).reduce((n, s) => n + s.duration, 0)
                            return (
                              <div key={plan.id} style={{
                                borderRadius: 10, overflow: 'hidden',
                                border:     `1px solid ${isSelected ? C.green : C.hairline}`,
                                background: isSelected ? C.greenGlow : C.surface,
                                transition: 'all 0.15s',
                              }}>
                                {/* Card header */}
                                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                                      <div style={{ fontSize: 14, fontWeight: 700, color: isSelected ? C.green : C.primary }}>{plan.title}</div>
                                      {isSelected && <Tag color={C.green}>Selected</Tag>}
                                      <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>
                                        {Math.round(keptDuration * 10) / 10}s · {keptSegCount} segment{keptSegCount !== 1 ? 's' : ''}
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                                      <Tag color={C.gold}>{plan.platform}</Tag>
                                      <Tag color={C.violet}>{plan.captionStyle}</Tag>
                                      <Tag color={C.blue}>{plan.musicMood}</Tag>
                                    </div>
                                    <div style={{ fontSize: 11, color: C.muted }}>
                                      <strong style={{ color: C.secondary }}>CTA: </strong>{plan.cta}
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: C.green }}>{plan.score}</div>
                                    <button
                                      onClick={() => handleSelectPlan(plan.id)}
                                      style={{
                                        padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                        border:     `1px solid ${isSelected ? C.green : C.hairline}`,
                                        background: isSelected ? C.green + '28' : C.surface,
                                        color:      isSelected ? C.green : C.secondary,
                                        transition: 'all 0.15s',
                                      }}>
                                      {isSelected ? 'Editing ↓' : 'Select Plan'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {/* Editable timeline */}
                      {showTimeline && selectedPlan && !transcriptSegs.length && (
                        <div style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center', fontSize: 12, color: C.muted }}>
                          Generate a transcript first to enable timeline editing.
                        </div>
                      )}

                      {showTimeline && selectedPlan && (
                        <div style={{ borderRadius: 10, border: `1px solid ${C.green}44`, background: C.surface, overflow: 'hidden' }}>
                          {/* Timeline header */}
                          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.greenGlow }}>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Selected Edit Timeline — {selectedPlan.title}</div>
                              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                                {selectedPlan.segments.filter(s => s.keep).length} segments kept ·{' '}
                                {Math.round(selectedPlan.segments.filter(s => s.keep).reduce((n, s) => n + s.duration, 0) * 10) / 10}s total
                              </div>
                            </div>
                            <button onClick={() => setShowTimeline(false)}
                              style={{ background: 'none', border: 'none', color: C.muted, fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>✕</button>
                          </div>

                          {/* Segment rows */}
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedPlan.segments.map((seg, idx) => {
                              const sColor = SEG_COLORS[seg.type] || C.muted
                              return (
                                <div key={seg.id} style={{
                                  padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12,
                                  borderBottom: idx < selectedPlan.segments.length - 1 ? `1px solid ${C.hairline}` : 'none',
                                  background: seg.keep ? 'none' : 'rgba(196,90,90,0.04)',
                                  opacity: seg.keep ? 1 : 0.5,
                                  transition: 'all 0.15s',
                                }}>
                                  {/* Keep toggle */}
                                  <button
                                    onClick={() => handleToggleSegment(selectedPlan.id, seg.id)}
                                    style={{
                                      width: 20, height: 20, borderRadius: 4, border: `2px solid ${seg.keep ? sColor : C.ghost}`,
                                      background: seg.keep ? sColor : 'none', flexShrink: 0, cursor: 'pointer',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                    {seg.keep && <div style={{ fontSize: 10, color: C.void, fontWeight: 900, lineHeight: 1 }}>✓</div>}
                                  </button>

                                  {/* Type badge */}
                                  <div style={{ fontSize: 9, fontWeight: 800, color: sColor, padding: '2px 7px', borderRadius: 8, border: `1px solid ${sColor}44`, background: sColor + '18', flexShrink: 0, alignSelf: 'center' }}>
                                    {SEG_LABELS[seg.type] || seg.type.toUpperCase()}
                                  </div>

                                  {/* Timestamps */}
                                  <div style={{ flexShrink: 0, minWidth: 96, alignSelf: 'center' }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: sColor, fontFamily: 'monospace' }}>{fmtTime(seg.start)} → {fmtTime(seg.end)}</div>
                                    <div style={{ fontSize: 9, color: C.ghost }}>{fmtDur(seg.duration)}</div>
                                  </div>

                                  {/* Content */}
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    {seg.transcriptText && (
                                      <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.45, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        "{seg.transcriptText.slice(0, 80)}{seg.transcriptText.length > 80 ? '…' : ''}"
                                      </div>
                                    )}
                                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{seg.reason}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Removed sections */}
                          {selectedPlan.removedSegments?.length > 0 && (
                            <div style={{ padding: '10px 16px', background: 'rgba(196,90,90,0.04)', borderTop: `1px solid ${C.hairline}` }}>
                              <div style={{ fontSize: 10, color: '#c45a5a', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Removed Sections</div>
                              {selectedPlan.removedSegments.map((rem, i) => (
                                <div key={i} style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>
                                  <span style={{ fontFamily: 'monospace', color: '#c45a5a' }}>{fmtTime(rem.start)} → {fmtTime(rem.end)}</span>
                                  <span style={{ marginLeft: 8 }}>{rem.reason}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Save plan button */}
                          <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.hairline}`, display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => { isDirty.current = true; saveProject(false) }}
                              style={{ padding: '7px 18px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
                              Save Edit Plan
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ── AI Editor Cleanup ───────────────────────────────────────────── */}
                      {showTimeline && selectedPlan && (() => {
                        const applyCount   = editorCleanup?.removals?.filter(r => r.apply).length ?? 0
                        const canClean     = !runningCleanup && transcriptSegs.length > 0
                        const summary      = editorCleanup?.cleanupSummary
                        const REMOVAL_COLORS = { filler: C.gold, weak_intro: '#c45a5a', repeat: C.blue, low_value: C.muted, dead_space: C.violet }

                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: C.primary }}>✦ AI Editor Cleanup</div>
                                {editorCleanup && !runningCleanup && <Tag color={summary?.aiEnhanced ? C.violet : C.gold}>{summary?.aiEnhanced ? 'AI' : 'Rule-based'}</Tag>}
                              </div>
                              <button
                                onClick={handleRunCleanup}
                                disabled={!canClean}
                                style={{
                                  padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                                  cursor:     canClean ? 'pointer' : 'not-allowed',
                                  border:     `1px solid ${canClean ? C.violet : C.hairline}`,
                                  background: canClean ? C.violetGlow : C.surface,
                                  color:      canClean ? C.violet : C.ghost,
                                  transition: 'all 0.15s',
                                }}>
                                {runningCleanup ? '⟳  Cleaning…' : editorCleanup ? '↺  Re-run' : 'Run AI Editor Cleanup'}
                              </button>
                            </div>

                            {/* Loading */}
                            {runningCleanup && (
                              <div style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.violet}28`, background: C.violet + '0a', textAlign: 'center' }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: C.violet, marginBottom: 4 }}>AI Editor is cleaning your timeline…</div>
                                <div style={{ fontSize: 11, color: C.muted }}>Detecting fillers · repeated ideas · pacing issues</div>
                              </div>
                            )}

                            {/* Summary */}
                            {summary && !runningCleanup && (
                              <>
                                {/* Verdict */}
                                <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.violet}28`, background: C.violet + '0a' }}>
                                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{summary.verdict}</div>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                                    {[
                                      { label: 'Time Removed', value: `${summary.estimatedTimeRemoved}s`, color: C.green },
                                      { label: 'Original',     value: `${summary.originalDuration}s`,    color: C.muted  },
                                      { label: 'Cleaned',      value: `${summary.cleanedDuration}s`,     color: C.blue   },
                                      { label: 'Pacing Score', value: summary.pacingScore,               color: summary.pacingScore >= 75 ? C.green : summary.pacingScore >= 55 ? C.gold : '#c45a5a' },
                                    ].map(stat => (
                                      <div key={stat.label} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 6, border: `1px solid ${stat.color}22`, background: stat.color + '0a' }}>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                                        <div style={{ fontSize: 9, color: C.ghost, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Removal cards */}
                                {editorCleanup.removals?.length > 0 && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                      {editorCleanup.removals.length} Cleanup Opportunities
                                    </div>
                                    {editorCleanup.removals.map(removal => {
                                      const rColor = REMOVAL_COLORS[removal.type] || C.muted
                                      return (
                                        <div key={removal.id} style={{
                                          padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12,
                                          border:     `1px solid ${removal.apply ? rColor + '44' : C.hairline}`,
                                          background: removal.apply ? rColor + '08' : C.surface,
                                          opacity:    removal.apply ? 1 : 0.6,
                                          transition: 'all 0.15s',
                                        }}>
                                          {/* Toggle */}
                                          <button
                                            onClick={() => handleToggleCleanup(removal.id)}
                                            style={{
                                              width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: 'pointer',
                                              border:     `2px solid ${removal.apply ? rColor : C.ghost}`,
                                              background: removal.apply ? rColor : 'none',
                                              display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                                            }}>
                                            {removal.apply && <div style={{ fontSize: 9, color: C.void, fontWeight: 900 }}>✓</div>}
                                          </button>
                                          {/* Type badge */}
                                          <div style={{ fontSize: 9, fontWeight: 800, color: rColor, padding: '2px 6px', borderRadius: 6, border: `1px solid ${rColor}44`, background: rColor + '18', flexShrink: 0, alignSelf: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                            {removal.type.replace('_', ' ')}
                                          </div>
                                          {/* Content */}
                                          <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                                              <div style={{ fontSize: 11, fontWeight: 700, color: rColor, fontFamily: 'monospace' }}>
                                                {fmtTime(removal.start)} → {fmtTime(removal.end)}
                                              </div>
                                              {removal.text && (
                                                <div style={{ fontSize: 11, color: C.primary, fontStyle: 'italic' }}>{removal.text}</div>
                                              )}
                                            </div>
                                            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{removal.reason}</div>
                                          </div>
                                          {/* Confidence */}
                                          <div style={{ fontSize: 10, color: C.ghost, flexShrink: 0, alignSelf: 'center' }}>
                                            {Math.round((removal.confidence || 0.8) * 100)}%
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}

                                {/* Filler words summary */}
                                {editorCleanup.fillerWords?.length > 0 && (
                                  <div style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.gold}28`, background: C.gold + '08' }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Filler Words Found</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                      {editorCleanup.fillerWords.map(f => (
                                        <div key={f.word} style={{ padding: '3px 10px', borderRadius: 10, border: `1px solid ${C.gold}44`, background: C.goldGlow, fontSize: 11, color: C.gold }}>
                                          "{f.word}" × {f.count}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Apply cleanup button */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                                  <div style={{ fontSize: 11, color: C.muted }}>
                                    {applyCount > 0
                                      ? `Your edit will feel tighter and faster. ${applyCount} item${applyCount !== 1 ? 's' : ''} selected.`
                                      : 'Toggle items to include them in cleanup.'}
                                  </div>
                                  <button
                                    onClick={handleApplyCleanup}
                                    disabled={applyCount === 0}
                                    style={{
                                      padding: '8px 18px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                                      cursor:     applyCount > 0 ? 'pointer' : 'not-allowed',
                                      border:     `1px solid ${applyCount > 0 ? C.violet : C.hairline}`,
                                      background: applyCount > 0 ? C.violetGlow : C.surface,
                                      color:      applyCount > 0 ? C.violet : C.ghost,
                                    }}>
                                    Apply Cleanup to Timeline
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )
                      })()}
                    </div>
                  )
                })()}
              </>
            )
          })()}
        </div>

        {/* ── Divider between AI Director and legacy mock cuts ───────────── */}
        {hasMockCuts && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: C.hairline }} />
              <div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1 }}>Quick Cuts</div>
              <div style={{ flex: 1, height: 1, background: C.hairline }} />
            </div>

            {/* ── Legacy mock cuts ────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
              <SectionMeta>{aiCuts.length} suggested cuts</SectionMeta>
              <button style={{ padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: C.goldGlow, color: C.gold }}>
                Apply All
              </button>
            </div>
            {aiCuts.map(cut => {
              const color = CUT_COLORS[cut.type] || C.muted
              return (
                <div key={cut.id} style={{ padding: '16px', borderRadius: 10, border: `1px solid ${color}28`, background: color + '0a' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color, padding: '2px 8px', borderRadius: 10, border: `1px solid ${color}44`, background: color + '18', textTransform: 'uppercase', letterSpacing: 1 }}>
                          {CUT_LABELS[cut.type]}
                        </div>
                        <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>
                          {fmtTime(cut.startTime)} → {fmtTime(cut.endTime)} · {fmtDur(cut.endTime - cut.startTime)}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.5, marginBottom: 12 }}>{cut.reason}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ width: `${cut.score}%`, height: '100%', background: color, borderRadius: 2 }} />
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color, minWidth: 24 }}>{cut.score}</div>
                      </div>
                    </div>
                    <button style={{ padding: '7px 14px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${color}44`, background: color + '18', color, flexShrink: 0 }}>
                      Apply
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    )
  }

  // ─── Section: Captions ────────────────────────────────────────────────────

  const renderCaptions = () => {
    const activeStyle    = CAPTION_STYLES.find(s => s.id === captionSettings.style)
    const selectedPlan   = cutPlans.find(p => p.id === selectedPlanId)
    const hasTimeline    = captionTimeline.length > 0
    const hasPlan        = !!selectedPlan
    const hasTranscript  = transcriptSegs.length > 0
    const canGenerate    = hasPlan && hasTranscript && !generatingCaptions
    const previewCaption = captionTimeline[0]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── AI Caption Timeline ───────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Header + generate button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.primary }}>💬 AI Caption Timeline</div>
              {hasTimeline && <Tag color={C.blue}>{captionTimeline.length} captions</Tag>}
            </div>
            <button
              onClick={handleGenerateCaptions}
              disabled={!canGenerate}
              style={{
                padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                cursor:     canGenerate ? 'pointer' : 'not-allowed',
                border:     `1px solid ${canGenerate ? C.blue : C.hairline}`,
                background: canGenerate ? C.blueGlow : C.surface,
                color:      canGenerate ? C.blue     : C.ghost,
                transition: 'all 0.15s',
              }}>
              {generatingCaptions ? '⟳  Building…' : hasTimeline ? '↺  Regenerate' : 'Generate Captions'}
            </button>
          </div>

          {/* Gates */}
          {!hasTranscript && (
            <div style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center', fontSize: 12, color: C.muted }}>
              Generate a transcript first.
            </div>
          )}
          {hasTranscript && !hasPlan && (
            <div style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center', fontSize: 12, color: C.muted }}>
              Select an AI Edit Plan first — captions follow the selected segments.
            </div>
          )}

          {/* Loading */}
          {generatingCaptions && (
            <div style={{ padding: '16px', borderRadius: 8, border: `1px solid ${C.blue}28`, background: C.blue + '0a', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 4 }}>Building caption timeline…</div>
              <div style={{ fontSize: 11, color: C.muted }}>Splitting text · generating timestamps · detecting keywords</div>
            </div>
          )}

          {/* Caption summary */}
          {captionSummary && !generatingCaptions && (
            <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.blue}22`, background: C.blue + '08' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{captionSummary.style}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: captionSummary.keywordHighlights?.length ? 10 : 0 }}>
                {[
                  { label: 'Captions',    value: captionSummary.totalCaptions,         color: C.blue  },
                  { label: 'Readability', value: captionSummary.estimatedReadability,   color: captionSummary.estimatedReadability >= 80 ? C.green : C.gold },
                  { label: 'Platform Fit',value: captionSummary.platformFit + '%',      color: captionSummary.platformFit >= 85 ? C.green : C.gold },
                  { label: 'Avg Words',   value: captionSummary.averageWordsPerCaption, color: C.muted },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 6, border: `1px solid ${stat.color}22`, background: stat.color + '0a' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: 9, color: C.ghost, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              {captionSummary.keywordHighlights?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  <div style={{ fontSize: 10, color: C.ghost, marginRight: 2, alignSelf: 'center' }}>Keywords:</div>
                  {captionSummary.keywordHighlights.map(kw => (
                    <div key={kw} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, border: `1px solid ${C.gold}44`, background: C.goldGlow, color: C.gold }}>{kw}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Caption timeline rows */}
          {hasTimeline && !generatingCaptions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 10, border: `1px solid ${C.hairline}`, overflow: 'hidden' }}>
              {captionTimeline.map((cap, idx) => {
                const isEditing  = editingCaptionId === cap.id
                const hasHighlight = cap.words?.some(w => w.highlight)
                return (
                  <div key={cap.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px',
                    borderBottom: idx < captionTimeline.length - 1 ? `1px solid ${C.hairline}` : 'none',
                    background: isEditing ? C.blueGlow : idx % 2 === 0 ? C.surface : C.raised,
                    transition: 'background 0.1s',
                  }}>
                    {/* Timestamp */}
                    <div style={{ flexShrink: 0, minWidth: 80, paddingTop: 2 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.blue, fontFamily: 'monospace' }}>{fmtTime(cap.start)}</div>
                      <div style={{ fontSize: 9, color: C.ghost, fontFamily: 'monospace' }}>→ {fmtTime(cap.end)}</div>
                    </div>
                    {/* Text (editable) */}
                    <div style={{ flex: 1 }}>
                      {isEditing ? (
                        <input
                          autoFocus
                          defaultValue={cap.text}
                          onBlur={e => { handleEditCaption(cap.id, e.target.value); setEditingCaptionId(null) }}
                          onKeyDown={e => { if (e.key === 'Enter') { handleEditCaption(cap.id, e.target.value); setEditingCaptionId(null) } if (e.key === 'Escape') setEditingCaptionId(null) }}
                          style={{ width: '100%', boxSizing: 'border-box', padding: '4px 8px', borderRadius: 5, border: `1px solid ${C.blue}`, background: C.surface, color: C.primary, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                        />
                      ) : (
                        <div
                          onClick={() => setEditingCaptionId(cap.id)}
                          style={{ fontSize: 13, color: C.primary, lineHeight: 1.4, cursor: 'text', padding: '2px 0' }}
                          title="Click to edit">
                          {cap.words ? cap.words.map((w, wi) => (
                            <span key={wi} style={{ color: w.highlight ? C.gold : C.primary, fontWeight: w.highlight ? 700 : 400 }}>
                              {w.word}{wi < cap.words.length - 1 ? ' ' : ''}
                            </span>
                          )) : cap.text}
                        </div>
                      )}
                    </div>
                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      {hasHighlight && <div style={{ fontSize: 9, padding: '2px 5px', borderRadius: 4, border: `1px solid ${C.gold}44`, background: C.goldGlow, color: C.gold, alignSelf: 'center' }}>★</div>}
                      <GhostBtn onClick={() => handleDeleteCaption(cap.id)}>✕</GhostBtn>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty state */}
          {!hasTimeline && !generatingCaptions && hasPlan && hasTranscript && (
            <div style={{ padding: '28px 24px', textAlign: 'center', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>💬</div>
              <div style={{ fontSize: 13, color: C.secondary, fontWeight: 700, marginBottom: 6 }}>Generate captions from your selected edit plan</div>
              <div style={{ fontSize: 11, color: C.muted }}>Captions will follow the kept segments, exclude cleanup removals, and highlight keywords.</div>
            </div>
          )}
        </div>

        <div style={{ height: 1, background: C.hairline }} />

        {/* ── Caption Style Presets ─────────────────────────────────────── */}
        <div>
          <Label>Caption Style Presets</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
            {CAPTION_STYLE_PRESETS.map(preset => {
              const on = captionSettings.style === preset.styleId
              return (
                <button key={preset.id} onClick={() => handleApplyPreset(preset)}
                  style={{
                    padding: '10px 14px', borderRadius: 9, cursor: 'pointer', textAlign: 'left',
                    border:     `1px solid ${on ? C.blue : C.hairline}`,
                    background: on ? C.blueGlow : C.surface,
                    transition: 'all 0.15s',
                  }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: on ? C.blue : C.primary, marginBottom: 3 }}>{preset.label}</div>
                  <div style={{ fontSize: 10, color: C.ghost, lineHeight: 1.3 }}>{preset.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Caption Settings (existing, kept) ────────────────────────── */}
        <div>
          <Label>Fine-tune Style</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {CAPTION_STYLES.map(s => {
              const on = captionSettings.style === s.id
              return (
                <button key={s.id} onClick={() => setCaptionSettings(c => ({ ...c, style: s.id }))}
                  style={{
                    padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
                    border:     `1px solid ${on ? C.gold : C.hairline}`,
                    background: on ? C.goldGlow : C.surface,
                    color:      on ? C.gold     : C.secondary,
                    transition: 'all 0.15s',
                    ...s.style,
                  }}>
                  {s.label}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['top', 'center', 'bottom'].map(pos => {
              const on = captionSettings.position === pos
              return <Pill key={pos} active={on} color={C.blue} onClick={() => setCaptionSettings(c => ({ ...c, position: pos }))}>{pos.charAt(0).toUpperCase() + pos.slice(1)}</Pill>
            })}
            <div style={{ width: 1, background: C.hairline, margin: '0 4px' }} />
            {['none', 'fade', 'slide', 'pop'].map(anim => {
              const on = captionSettings.animation === anim
              return <Pill key={anim} active={on} color={C.violet} onClick={() => setCaptionSettings(c => ({ ...c, animation: anim }))}>{anim.charAt(0).toUpperCase() + anim.slice(1)}</Pill>
            })}
          </div>
        </div>

        {/* ── Preview ──────────────────────────────────────────────────── */}
        <div>
          <Label>Preview Caption Style</Label>
          <div style={{
            height: 190, borderRadius: 12, overflow: 'hidden',
            background: 'linear-gradient(160deg, #12121e 0%, #080810 100%)',
            border: `1px solid ${C.hairline}`,
            display: 'flex',
            alignItems: captionSettings.position === 'top' ? 'flex-start' : captionSettings.position === 'center' ? 'center' : 'flex-end',
            justifyContent: 'center',
            padding: 20,
          }}>
            <div style={{
              background: captionSettings.background,
              color:      captionSettings.color,
              padding:    '8px 16px',
              borderRadius: 4,
              fontSize: Math.round(captionSettings.fontSize * 0.58),
              maxWidth: '90%',
              textAlign: 'center',
              ...activeStyle?.style,
            }}>
              {previewCaption
                ? previewCaption.words
                  ? previewCaption.words.map((w, i) => (
                      <span key={i} style={{ fontWeight: w.highlight ? 900 : undefined, color: w.highlight ? C.gold : undefined }}>
                        {w.word}{i < previewCaption.words.length - 1 ? ' ' : ''}
                      </span>
                    ))
                  : previewCaption.text
                : 'Your caption will appear here'}
            </div>
          </div>
          {previewCaption && (
            <div style={{ fontSize: 10, color: C.ghost, textAlign: 'center', marginTop: 6 }}>
              Showing first caption · {fmtTime(previewCaption.start)} → {fmtTime(previewCaption.end)}
            </div>
          )}
        </div>

      </div>
    )
  }

  // ─── Section: Music ───────────────────────────────────────────────────────

  const renderMusic = () => {
    const hasPlan      = !!cutPlans.find(p => p.id === selectedPlanId)
    const hasDirector  = !!aiDirectorAnalysis
    const summary      = musicIntelligence?.musicSummary
    const tracks       = musicIntelligence?.recommendedTracks || musicRecs
    const timingPlan   = musicIntelligence?.timingPlan        || {}
    const canRecommend = !recommendingMusic && (hasPlan || hasDirector)

    const LICENSE_COLORS = { included: C.green, credit: C.gold, premium: C.violet }
    const LICENSE_LABELS = { included: 'INCLUDED', credit: 'CREDIT', premium: 'PREMIUM' }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* ── AI Music Intelligence header ──────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.primary }}>🎵 AI Music Intelligence</div>
            {musicIntelligence && !recommendingMusic && <Tag color={C.green}>Scored</Tag>}
          </div>
          <button
            onClick={handleRecommendMusic}
            disabled={!canRecommend}
            style={{
              padding: '7px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
              cursor:     canRecommend ? 'pointer' : 'not-allowed',
              border:     `1px solid ${canRecommend ? C.gold : C.hairline}`,
              background: canRecommend ? C.goldGlow : C.surface,
              color:      canRecommend ? C.gold     : C.ghost,
              transition: 'all 0.15s',
            }}>
            {recommendingMusic ? '⟳  Analyzing…' : musicIntelligence ? '↺  Re-score' : 'Recommend Music'}
          </button>
        </div>

        {/* Gates */}
        {!hasPlan && !hasDirector && (
          <div style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center', fontSize: 12, color: C.muted }}>
            Run AI Director Analysis or select an AI Edit Plan to enable music recommendations.
          </div>
        )}

        {/* Loading */}
        {recommendingMusic && (
          <div style={{ padding: '16px', borderRadius: 8, border: `1px solid ${C.gold}28`, background: C.gold + '08', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4 }}>Finding the best music bed…</div>
            <div style={{ fontSize: 11, color: C.muted }}>Scoring tracks against your platform · goal · edit pacing</div>
          </div>
        )}

        {/* Music Intelligence summary */}
        {summary && !recommendingMusic && (
          <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.gold}22`, background: C.gold + '08' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Recommended Mood</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{summary.recommendedMood}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Pacing</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>{summary.pacing}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Confidence</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{Math.round(summary.confidence * 100)}%</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{summary.reason}</div>
          </div>
        )}

        {/* Track cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!musicIntelligence && !recommendingMusic && (
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Available Tracks</div>
          )}
          {musicIntelligence && !recommendingMusic && (
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>
              Recommended for {PLATFORMS.find(p => p.id === project.platform)?.label || 'your platform'}
            </div>
          )}
          {tracks.map(track => {
            const on          = selectedMusic?.id === track.id || selectedMusicBed?.trackId === track.id
            const lColor      = LICENSE_COLORS[track.licenseType] || C.muted
            const fitScore    = track.fitScore
            return (
              <div key={track.id} style={{
                padding: '14px 16px', borderRadius: 10,
                border:     `1px solid ${on ? C.gold + '55' : C.hairline}`,
                background: on ? C.goldGlow : C.surface,
                transition: 'all 0.15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {/* Play placeholder */}
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.subtle, border: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', fontSize: 13, marginTop: 2 }}>▶</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: on ? C.gold : C.primary }}>{track.title}</div>
                      {track.licenseType && (
                        <div style={{ fontSize: 8, fontWeight: 700, color: lColor, padding: '1px 5px', borderRadius: 5, border: `1px solid ${lColor}44`, background: lColor + '18', flexShrink: 0 }}>
                          {LICENSE_LABELS[track.licenseType] || track.licenseType.toUpperCase()}
                        </div>
                      )}
                      {track.licensed && !track.licenseType && (
                        <div style={{ fontSize: 8, fontWeight: 700, color: C.green, padding: '1px 5px', borderRadius: 5, border: `1px solid ${C.green}44`, background: C.greenGlow, flexShrink: 0 }}>LICENSED</div>
                      )}
                    </div>
                    {/* Meta */}
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: fitScore || track.reason ? 6 : 0 }}>
                      {track.artist ? `${track.artist} · ` : ''}{track.mood} · {track.bpm} BPM · {fmtDur(track.duration)}
                      {track.energy ? ` · ${track.energy} energy` : ''}
                    </div>
                    {/* Reason (from intelligence) */}
                    {track.reason && (
                      <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.4, marginBottom: 6, fontStyle: 'italic' }}>"{track.reason}"</div>
                    )}
                    {/* Fit score bar */}
                    {fitScore != null && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2 }}>
                          <div style={{ width: `${fitScore}%`, height: '100%', background: fitScore >= 80 ? C.green : fitScore >= 60 ? C.gold : C.muted, borderRadius: 2 }} />
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: fitScore >= 80 ? C.green : fitScore >= 60 ? C.gold : C.muted, minWidth: 26 }}>
                          {fitScore}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Select button */}
                  <button
                    onClick={() => on ? (setSelectedMusic(null), setSelectedMusicBed(null)) : handleSelectMusicBed(track, timingPlan)}
                    style={{
                      padding: '7px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                      border:     `1px solid ${on ? C.gold : C.hairline}`,
                      background: on ? C.goldGlow : 'none',
                      color:      on ? C.gold     : C.secondary,
                      transition: 'all 0.15s',
                    }}>
                    {on ? 'Selected ✓' : 'Use This Track'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Selected Music Bed controls ───────────────────────────────── */}
        {selectedMusicBed && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.gold}44`, background: C.surface, overflow: 'hidden' }}>
            {/* Bed header */}
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.hairline}`, background: C.goldGlow, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Music Bed — {selectedMusicBed.title}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{selectedMusicBed.mood} · {selectedMusicBed.bpm} BPM</div>
              </div>
              <Tag color={C.gold}>{timingPlan?.beatSyncSuggestion ? 'Timed' : 'Manual'}</Tag>
            </div>

            {/* Beat sync note */}
            {timingPlan?.beatSyncSuggestion && (
              <div style={{ padding: '8px 16px', borderBottom: `1px solid ${C.hairline}`, background: C.gold + '08' }}>
                <div style={{ fontSize: 11, color: C.gold, fontStyle: 'italic' }}>✦ {timingPlan.beatSyncSuggestion}</div>
              </div>
            )}

            {/* Controls */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Volume',     field: 'volume',    min: 0, max: 1,  step: 0.05, display: v => `${Math.round(v * 100)}%` },
                { label: 'Fade In',    field: 'fadeIn',    min: 0, max: 5,  step: 0.5,  display: v => `${v}s`                   },
                { label: 'Fade Out',   field: 'fadeOut',   min: 0, max: 5,  step: 0.5,  display: v => `${v}s`                   },
                { label: 'Start Time', field: 'startTime', min: 0, max: 60, step: 1,    display: v => `${v}s`                   },
              ].map(ctrl => (
                <div key={ctrl.field} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, minWidth: 70 }}>{ctrl.label}</div>
                  <input
                    type="range"
                    min={ctrl.min} max={ctrl.max} step={ctrl.step}
                    value={selectedMusicBed[ctrl.field] ?? ctrl.min}
                    onChange={e => handleUpdateMusicBed(ctrl.field, parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: C.gold, cursor: 'pointer' }}
                  />
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, minWidth: 34, textAlign: 'right' }}>
                    {ctrl.display(selectedMusicBed[ctrl.field] ?? ctrl.min)}
                  </div>
                </div>
              ))}

              {/* Loop toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, minWidth: 70 }}>Loop</div>
                <button
                  onClick={() => handleUpdateMusicBed('loop', !selectedMusicBed.loop)}
                  style={{
                    padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    border:     `1px solid ${selectedMusicBed.loop ? C.gold : C.hairline}`,
                    background: selectedMusicBed.loop ? C.goldGlow : 'none',
                    color:      selectedMusicBed.loop ? C.gold : C.secondary,
                  }}>
                  {selectedMusicBed.loop ? '✓ On' : 'Off'}
                </button>
                <div style={{ fontSize: 10, color: C.ghost }}>if track is shorter than the edit</div>
              </div>
            </div>

            {/* Save */}
            {/* File URL input — required for music to render in final MP4 */}
            <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 10, color: C.ghost, marginBottom: 6 }}>
                Music file URL <span style={{ color: '#c45a5a' }}>*required for render</span>
              </div>
              <input
                type="text"
                value={selectedMusicBed?.fileUrl || ''}
                onChange={e => handleUpdateMusicBed('fileUrl', e.target.value)}
                placeholder="https://… direct MP3/AAC URL for FFmpeg to download"
                style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: `1px solid ${selectedMusicBed?.fileUrl ? C.green : C.gold}`, background: C.raised, color: C.primary, fontSize: 11, fontFamily: 'inherit', outline: 'none' }}
              />
              {!selectedMusicBed?.fileUrl && (
                <div style={{ fontSize: 10, color: C.gold, marginTop: 5 }}>
                  Without a file URL, music will be skipped during rendering. Add a direct link to an MP3 or AAC file.
                </div>
              )}
            </div>

            <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.hairline}`, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => saveProject(false)}
                style={{ padding: '7px 18px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                Save Music Bed
              </button>
            </div>
          </div>
        )}

      </div>
    )
  }

  // ─── Section: Export ──────────────────────────────────────────────────────

  const renderExport = () => {
    const platformMeta   = PLATFORMS.find(p => p.id === project.platform)
    const goalMeta       = GOALS.find(g => g.id === project.goal)
    const captionLabel   = CAPTION_STYLES.find(s => s.id === captionSettings.style)?.label || 'Bold'
    const selectedPlan   = cutPlans.find(p => p.id === selectedPlanId)
    const keptSegs       = (selectedPlan?.segments || []).filter(s => s.keep)
    const keptDuration   = keptSegs.reduce((n, s) => n + (s.duration || (s.end - s.start)), 0)
    const cleanupApplied = (editorCleanup?.removals || []).some(r => r.apply)
    const hasJob         = !!renderJob

    // Readiness checklist
    const CHECKLIST = [
      { label: 'Source video',          ok: !!project.videoFile,                      note: project.videoFile || 'Not uploaded' },
      { label: 'AI Edit Plan selected', ok: !!selectedPlan && keptSegs.length > 0,    note: selectedPlan ? `${keptSegs.length} segments · ${Math.round(keptDuration * 10) / 10}s` : 'None selected',    required: true },
      { label: 'Cleanup applied',       ok: cleanupApplied || !editorCleanup,          note: cleanupApplied ? `${(editorCleanup?.removals || []).filter(r => r.apply).length} items applied` : 'Optional', optional: true },
      { label: 'Caption timeline',      ok: captionTimeline.length > 0 || !exportSettings.includeCaption, note: captionTimeline.length ? `${captionTimeline.length} captions` : 'Disabled', optional: true },
      { label: 'Music bed',             ok: !!selectedMusicBed || !exportSettings.includeMusicBed, note: selectedMusicBed ? selectedMusicBed.title : 'Not selected',  optional: true },
      { label: 'Export format',         ok: !!exportSettings.format,                  note: `${(exportSettings.format || '').toUpperCase()} · ${exportSettings.quality} quality` },
    ]

    const requiredReady = CHECKLIST.filter(c => !c.optional).every(c => c.ok)
    const allReady      = CHECKLIST.every(c => c.ok)
    const canPrepare    = requiredReady && !preparingPlan

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* ── Render Readiness checklist ────────────────────────────────── */}
        <div>
          <Label>Render Readiness</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {CHECKLIST.map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8,
                border:     `1px solid ${item.ok ? C.green + '33' : item.optional ? C.hairline : '#c45a5a33'}`,
                background: item.ok ? C.green + '08'  : item.optional ? C.surface     : '#c45a5a08',
              }}>
                <div style={{ fontSize: 13, color: item.ok ? C.green : item.optional ? C.ghost : '#c45a5a', flexShrink: 0, width: 16, textAlign: 'center', fontWeight: 800 }}>
                  {item.ok ? '✓' : item.optional ? '○' : '✗'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.ok ? C.primary : item.optional ? C.secondary : '#c45a5a' }}>
                    {item.label}
                    {item.optional && !item.ok && <span style={{ fontSize: 10, fontWeight: 400, color: C.ghost, marginLeft: 6 }}>optional</span>}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: item.ok ? C.muted : C.ghost }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Export settings (quality + options) ──────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label>Output Quality</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['high', 'medium', 'web'].map(q => {
              const on = exportSettings.quality === q
              return (
                <button key={q} onClick={() => setExportSettings(s => ({ ...s, quality: q }))}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', border: `1px solid ${on ? C.green : C.hairline}`, background: on ? C.greenGlow : C.surface, color: on ? C.green : C.secondary, transition: 'all 0.15s' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize', marginBottom: 3 }}>{q}</div>
                  <div style={{ fontSize: 10, color: C.ghost }}>{QUALITY_META[q]}</div>
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { key: 'includeCaption',  label: 'Burn-in captions', desc: captionTimeline.length ? `${captionLabel} · ${captionSettings.position} · ${captionTimeline.length} captions` : 'No captions generated' },
              { key: 'includeMusicBed', label: 'Music bed',        desc: selectedMusicBed ? `${selectedMusicBed.title} · Vol ${Math.round((selectedMusicBed.volume ?? 0.6) * 100)}%` : 'No track selected' },
            ].map(opt => {
              const on = exportSettings[opt.key]
              return (
                <div key={opt.key} onClick={() => setExportSettings(s => ({ ...s, [opt.key]: !on }))}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, cursor: 'pointer', border: `1px solid ${on ? C.gold + '33' : C.hairline}`, background: on ? C.goldGlow : C.surface, transition: 'all 0.15s' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${on ? C.gold : C.ghost}`, background: on ? C.gold : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {on && <div style={{ fontSize: 9, color: C.void, fontWeight: 900, lineHeight: 1 }}>✓</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: on ? C.gold : C.primary }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{opt.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Source video upload for rendering ────────────────────────── */}
        {project.videoFile && (
          <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${project.sourceVideoUrl ? C.green + '44' : C.gold + '33'}`, background: project.sourceVideoUrl ? C.greenGlow : C.gold + '08' }}>
            {project.sourceVideoUrl ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 12, color: C.green }}>✓</div>
                  <div style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>Source video uploaded to storage</div>
                </div>
                {videoFileRef.current && (
                  <button onClick={handleUploadSource} disabled={uploadingSource}
                    style={{ fontSize: 10, color: C.muted, background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 5, padding: '3px 8px', cursor: 'pointer' }}>
                    {uploadingSource ? `${sourceUploadPct}%` : '↺ Re-upload'}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 6 }}>Upload video for rendering</div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, lineHeight: 1.5 }}>
                  {videoFileRef.current
                    ? 'Your file is loaded and ready to upload.'
                    : '⚠ File not in memory — go back to the Upload tab, re-drop your video file, then come back here.'}
                </div>
                {uploadingSource ? (
                  <div>
                    <div style={{ height: 4, background: C.hairline, borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                      <div style={{ width: `${sourceUploadPct}%`, height: '100%', background: C.gold, borderRadius: 2, transition: 'width 0.2s' }} />
                    </div>
                    <div style={{ fontSize: 11, color: C.gold }}>Uploading… {sourceUploadPct}%</div>
                  </div>
                ) : (
                  <button onClick={handleUploadSource} disabled={!videoFileRef.current}
                    style={{ padding: '8px 18px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: videoFileRef.current ? 'pointer' : 'not-allowed', border: `1px solid ${videoFileRef.current ? C.gold : C.hairline}`, background: videoFileRef.current ? C.goldGlow : C.surface, color: videoFileRef.current ? C.gold : C.ghost }}>
                    ⬆ Upload Source Video
                  </button>
                )}
                {sourceUploadError && (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#c45a5a', lineHeight: 1.5 }}>
                    ✗ {sourceUploadError}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Preflight warnings ───────────────────────────────────────── */}
        {(() => {
          const warnings = []
          if (project.videoFile && !project.sourceVideoUrl) {
            warnings.push('Source video not uploaded to storage — upload before rendering.')
          }
          if (exportSettings.includeCaption && captionTimeline.length === 0) {
            warnings.push('Captions burn-in is enabled but no caption timeline exists. Generate captions or disable burn-in.')
          }
          if (selectedMusicBed && !selectedMusicBed.fileUrl && !selectedMusicBed.trackUrl) {
            warnings.push('Music selected but has no file URL — music will be skipped in the render.')
          }
          if (project.videoDuration && project.videoDuration > 120) {
            warnings.push(`Source video is ${Math.round(project.videoDuration)}s (>2 min) — render may take several minutes.`)
          }
          const keptSegs = (cutPlans.find(p => p.id === selectedPlanId)?.segments || []).filter(s => s.keep)
          const keptDur  = keptSegs.reduce((n, s) => n + (s.duration || (s.end - s.start)), 0)
          if (keptSegs.length > 0 && keptDur < 3) {
            warnings.push('Selected edit is under 3 seconds — check your kept segments.')
          }
          if (!warnings.length) return null
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {warnings.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.gold}33`, background: C.gold + '08' }}>
                  <div style={{ fontSize: 12, color: C.gold, flexShrink: 0 }}>⚠</div>
                  <div style={{ fontSize: 11, color: C.gold, lineHeight: 1.5 }}>{w}</div>
                </div>
              ))}
            </div>
          )
        })()}

        {/* ── Prepare Render Plan button ────────────────────────────────── */}
        <div>
          <button
            onClick={handlePrepareRenderPlan}
            disabled={!canPrepare}
            style={{
              width: '100%', padding: '14px 24px', borderRadius: 10,
              fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
              cursor:     canPrepare ? 'pointer' : 'not-allowed',
              border:     `1px solid ${canPrepare ? C.blue : C.hairline}`,
              background: canPrepare ? C.blueGlow : C.surface,
              color:      canPrepare ? C.blue     : C.ghost,
              transition: 'all 0.2s',
            }}>
            {preparingPlan ? '⟳  Preparing render instructions…' : renderPlan ? '↺  Rebuild Render Plan' : '📋  Prepare Render Plan'}
          </button>
          {!requiredReady && (
            <div style={{ fontSize: 11, color: '#c45a5a', textAlign: 'center', marginTop: 8 }}>
              Select an AI Edit Plan with at least one kept segment first.
            </div>
          )}
        </div>

        {/* ── Render plan summary ───────────────────────────────────────── */}
        {renderPlan && !preparingPlan && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.blue}44`, background: C.surface, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.hairline}`, background: C.blueGlow, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>Render Plan</div>
              <div style={{ fontSize: 10, color: C.muted }}>{renderPlan.createdAt ? new Date(renderPlan.createdAt).toLocaleTimeString() : ''}</div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 16px', marginBottom: 12 }}>
                {[
                  { label: 'Format',      value: renderPlan.outputFormat?.toUpperCase() || 'MP4' },
                  { label: 'Resolution',  value: renderPlan.resolution || '—' },
                  { label: 'Aspect',      value: renderPlan.aspectRatio || '—' },
                  { label: 'FPS',         value: `${renderPlan.fps || 30} fps` },
                  { label: 'Duration',    value: `${renderPlan.totalDuration || 0}s` },
                  { label: 'Segments',    value: `${renderPlan.segments?.length || 0} kept` },
                  { label: 'Captions',    value: renderPlan.overlays?.captionsEnabled ? `${renderPlan.captions?.length || 0} lines` : 'Off' },
                  { label: 'Music',       value: renderPlan.music?.title || 'None' },
                  { label: 'Est. Render', value: renderPlan.estimatedRenderTime || '—' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Warnings */}
              {renderWarnings?.length > 0 && (
                <div style={{ padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.gold}44`, background: C.goldGlow, marginBottom: 10 }}>
                  {renderWarnings.map((w, i) => (
                    <div key={i} style={{ fontSize: 11, color: C.gold }}>⚠ {w}</div>
                  ))}
                </div>
              )}

              {/* Segment list */}
              {renderPlan.segments?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {renderPlan.segments.map((seg, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: i < renderPlan.segments.length - 1 ? `1px solid ${C.hairline}` : 'none' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: SEG_COLORS[seg.type] || C.muted, padding: '1px 5px', borderRadius: 4, border: `1px solid ${(SEG_COLORS[seg.type] || C.muted)}44`, background: (SEG_COLORS[seg.type] || C.muted) + '14', flexShrink: 0 }}>
                        {SEG_LABELS[seg.type] || seg.type}
                      </div>
                      <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>
                        {fmtTime(seg.start)} → {fmtTime(seg.end)}
                      </div>
                      <div style={{ fontSize: 10, color: C.secondary }}>{seg.duration}s</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Create Render Job button ──────────────────────────────────── */}
        {renderPlan && !preparingPlan && (
          <div>
            <button
              onClick={handleCreateRenderJob}
              disabled={creatingJob || hasJob}
              style={{
                width: '100%', padding: '14px 24px', borderRadius: 10,
                fontSize: 14, fontWeight: 800, letterSpacing: 0.5,
                cursor:     (!creatingJob && !hasJob) ? 'pointer' : 'not-allowed',
                border:     `1px solid ${!hasJob ? C.gold : C.green}`,
                background: !hasJob ? C.goldGlow : C.greenGlow,
                color:      !hasJob ? C.gold     : C.green,
                transition: 'all 0.2s',
              }}>
              {creatingJob ? '⟳  Creating render job…' : hasJob ? '✓  Render Job Created' : '📤  Create Render Job'}
            </button>
          </div>
        )}

        {/* ── Render job status + polling + download ────────────────────── */}
        {renderJob && (() => {
          const st          = renderJob.status
          const isActive    = st === 'queued' || st === 'processing'
          const isDone      = st === 'completed'
          const isFailed    = st === 'failed'
          const statusColor = isDone ? C.green : isFailed ? '#c45a5a' : C.gold
          const exportUrl   = renderJob.exportUrl
          const PULSE_LABEL = { queued: 'Queued — waiting for FFmpeg…', processing: 'Processing…' }

          return (
            <div style={{ borderRadius: 9, border: `1px solid ${statusColor}44`, background: isDone ? C.greenGlow : isFailed ? '#c45a5a08' : C.goldGlow, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${statusColor}22` }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: statusColor }}>
                    {isDone ? '✓ Render complete' : isFailed ? '✗ Render failed' : '⟳ Rendering'}
                  </div>
                  <div style={{ fontSize: 10, color: C.ghost, marginTop: 2, fontFamily: 'monospace' }}>
                    {renderJob.id?.slice(0, 16)}…
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: statusColor, padding: '3px 10px', borderRadius: 8, border: `1px solid ${statusColor}44`, background: statusColor + '14', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {st}
                </div>
              </div>

              {/* Active: pulse indicator */}
              {isActive && (
                <div style={{ padding: '10px 16px', borderBottom: `1px solid ${statusColor}22` }}>
                  <div style={{ height: 3, background: C.hairline, borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{ width: '60%', height: '100%', background: C.gold, borderRadius: 2, animation: 'none' }} />
                  </div>
                  <div style={{ fontSize: 11, color: C.gold }}>{PULSE_LABEL[st] || 'Processing…'}</div>
                  <div style={{ fontSize: 10, color: C.ghost, marginTop: 2 }}>Polling every 3 seconds…</div>
                </div>
              )}

              {/* Failure message + recovery */}
              {isFailed && (
                <div style={{ padding: '12px 16px', borderBottom: `1px solid #c45a5a22`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {renderJob.error && (
                    <div style={{ fontSize: 11, color: '#c45a5a', lineHeight: 1.5 }}>
                      {(() => {
                        const e = renderJob.error
                        if (e?.includes('source video URL') || e?.includes('No source video')) return 'Source video not uploaded to storage. Use "Upload Source Video" in the Export tab before rendering.'
                        if (e?.includes('413') || e?.includes('25 MB') || e?.includes('Whisper limit')) return 'Video file is too large for transcription (max 25 MB). Compress the video or extract audio only.'
                        if (e?.includes('FFmpeg') && e?.includes('not found')) return 'FFmpeg not installed on the server. The render worker handles production rendering.'
                        if (e?.includes('libass') || e?.includes('subtitle')) return 'Caption rendering failed — libass may not be installed. Disable captions in Export Settings and retry.'
                        if (e?.includes('Storage upload')) return 'Could not upload the rendered file. Check your Supabase storage bucket permissions.'
                        return e
                      })()}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: C.ghost }}>Your render plan is intact — fix the issue and retry.</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      onClick={handleRetryRender}
                      disabled={retryingRender || !renderPlan}
                      style={{ padding: '7px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: renderPlan ? 'pointer' : 'not-allowed', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                      {retryingRender ? '⟳ Retrying…' : '↺ Retry Render'}
                    </button>
                    <button
                      onClick={() => setActiveStep(5)} // jump to Export to show render plan
                      style={{ padding: '7px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary }}>
                      View Render Plan
                    </button>
                    {renderJob.error && (
                      <button
                        onClick={() => navigator.clipboard?.writeText(JSON.stringify({ error: renderJob.error, jobId: renderJob.id, plan: renderPlan }, null, 2)).catch(() => {})}
                        style={{ padding: '7px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary }}>
                        Copy Error
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Queued explanation */}
              {st === 'queued' && !renderJob.error && (
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                    {renderJob.message || 'Queued for production render worker — job will be picked up automatically.'}
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: 7, border: `1px solid ${C.violet}28`, background: C.violet + '08' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.violet, marginBottom: 3 }}>You can leave this page and return later.</div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      The render worker runs independently. Polling will resume automatically when you come back.
                      Your project ID: <span style={{ fontFamily: 'monospace', color: C.ghost }}>{projectId?.slice(0, 8)}…</span>
                    </div>
                  </div>
                  {renderJob.queuedAt && (
                    <div style={{ fontSize: 10, color: C.ghost }}>
                      Queued at {new Date(renderJob.queuedAt || renderJob.createdAt).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              )}

              {/* Render details — what was actually rendered */}
              {isDone && renderJob.renderDetails && (
                <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.hairline}` }}>
                  <div style={{ fontSize: 10, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Rendered</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                      { label: 'Video cuts',  ok: true,                                    note: '' },
                      { label: 'Captions',    ok: renderJob.renderDetails.captionsRendered, note: renderJob.renderDetails.captionsRendered ? '' : renderJob.renderDetails.warnings?.find(w => w.startsWith('Caption')) || 'Not included' },
                      { label: 'Music bed',   ok: renderJob.renderDetails.musicRendered,    note: renderJob.renderDetails.musicRendered   ? '' : renderJob.renderDetails.warnings?.find(w => w.startsWith('Music'))   || 'Not included' },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 11, color: item.ok ? C.green : C.gold, fontWeight: 700, width: 14, textAlign: 'center' }}>{item.ok ? '✓' : '⚠'}</div>
                        <div style={{ fontSize: 11, color: item.ok ? C.secondary : C.gold }}>{item.label}</div>
                        {!item.ok && item.note && <div style={{ fontSize: 10, color: C.ghost }}>— {item.note}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download section — only shows when export_url exists */}
              {isDone && exportUrl && (
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Your export is ready. Download link expires in 1 hour.</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <a
                      href={exportUrl}
                      download={`edit_${project.title || 'export'}.mp4`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none',
                        border:     `1px solid ${C.green}`,
                        background: C.greenGlow,
                        color:      C.green,
                      }}>
                      ⬇ Download MP4
                    </a>
                    <button
                      onClick={() => navigator.clipboard?.writeText(exportUrl).catch(() => {})}
                      style={{ padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                      Copy Link
                    </button>
                    <a
                      href={exportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                      Open ↗
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* ── Test Notes (dev panel — persistent in localStorage) ────── */}
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setShowTestNotes(p => !p)}
            style={{ fontSize: 10, color: C.ghost, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
            {showTestNotes ? '▲ Hide' : '▼ Show'} Edit Studio Test Notes
          </button>

          {showTestNotes && (
            <div style={{ marginTop: 10, padding: '16px', borderRadius: 9, border: `1px solid ${C.hairline}`, background: C.surface, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.2, textTransform: 'uppercase' }}>Edit Studio Test Notes</div>

              {[
                { field: 'testDate',    label: 'Last test date',   placeholder: 'e.g. 2026-06-01' },
                { field: 'videoType',   label: 'Test video type',  placeholder: 'e.g. Screen recording, talking head' },
                { field: 'nextFix',     label: 'Next fix needed',  placeholder: 'e.g. Caption font on server' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <div style={{ fontSize: 10, color: C.ghost, marginBottom: 4 }}>{label}</div>
                  <input
                    value={testNotes[field]}
                    onChange={e => updateTestNotes(field, e.target.value)}
                    placeholder={placeholder}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.raised, color: C.primary, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
                  />
                </div>
              ))}

              <div>
                <div style={{ fontSize: 10, color: C.ghost, marginBottom: 6 }}>Result</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['passed', 'partial', 'failed'].map(r => {
                    const on    = testNotes.result === r
                    const color = r === 'passed' ? C.green : r === 'partial' ? C.gold : '#c45a5a'
                    return (
                      <button key={r} onClick={() => updateTestNotes('result', on ? '' : r)}
                        style={{ padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${on ? color : C.hairline}`, background: on ? color + '22' : 'none', color: on ? color : C.secondary, textTransform: 'capitalize' }}>
                        {r}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: C.ghost, marginBottom: 4 }}>Issues found</div>
                <textarea
                  value={testNotes.issuesFound}
                  onChange={e => updateTestNotes('issuesFound', e.target.value)}
                  placeholder="e.g. Caption font missing on server, music skipped (no fileUrl)"
                  rows={4}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.raised, color: C.primary, fontSize: 12, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }

  // ─── Step panels map ──────────────────────────────────────────────────────

  const PANELS = [renderUpload, renderTranscript, renderAICut, renderCaptions, renderMusic, renderExport]

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Recent projects sidebar ── */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.55)' }} />
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, width: 292,
            zIndex: 201, background: C.raised, borderRight: `1px solid ${C.hairline}`,
            display: 'flex', flexDirection: 'column', overflowY: 'auto',
          }}>
            {/* Sidebar header */}
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: C.raised, zIndex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>Recent Projects</div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>

            {/* New project */}
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.hairline}` }}>
              <button onClick={handleNewProject} style={{ width: '100%', padding: '9px 14px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}44`, background: C.greenGlow, color: C.green }}>
                + New Project
              </button>
            </div>

            {/* Project list */}
            <div style={{ flex: 1 }}>
              {loadingRecent && (
                <div style={{ padding: '28px', textAlign: 'center', fontSize: 12, color: C.muted }}>Loading…</div>
              )}
              {!loadingRecent && recentProjects.length === 0 && (
                <div style={{ padding: '28px 18px', textAlign: 'center', fontSize: 12, color: C.muted, lineHeight: 1.6 }}>No saved projects yet.<br />Start editing to create your first.</div>
              )}
              {!loadingRecent && recentProjects.map(p => {
                const isCurrent   = p.id === projectId
                const platformMeta = PLATFORMS.find(pl => pl.id === p.platform)
                const goalMeta     = GOALS.find(g  => g.id  === p.goal)
                const statusColor  = STATUS_COLORS[p.status] || C.ghost
                return (
                  <div key={p.id} style={{ padding: '14px', borderBottom: `1px solid ${C.hairline}`, background: isCurrent ? C.goldGlow : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isCurrent ? C.gold : C.primary, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title}
                    </div>
                    <div style={{ display: 'flex', gap: 5, marginBottom: 6, flexWrap: 'wrap' }}>
                      {platformMeta && <Tag color={C.gold}>{platformMeta.label}</Tag>}
                      {goalMeta     && <Tag color={C.blue}>{goalMeta.label}</Tag>}
                      <Tag color={statusColor}>{p.status}</Tag>
                    </div>
                    <div style={{ fontSize: 10, color: C.ghost, marginBottom: 10 }}>
                      {p.updated_at
                        ? new Date(p.updated_at).toLocaleDateString('en', { month: 'short', day: 'numeric' }) + ' · ' +
                          new Date(p.updated_at).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
                        : '—'}
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button onClick={() => handleOpenProject(p.id)} disabled={isCurrent}
                        style={{ flex: 1, padding: '5px 0', borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: isCurrent ? 'default' : 'pointer', border: `1px solid ${isCurrent ? C.hairline : C.gold}`, background: isCurrent ? 'none' : C.goldGlow, color: isCurrent ? C.ghost : C.gold }}>
                        {isCurrent ? 'Current' : 'Open'}
                      </button>
                      <button onClick={() => handleDuplicateProject(p.id)}
                        style={{ padding: '5px 9px', borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary }}>
                        Copy
                      </button>
                      <button onClick={() => handleDeleteProject(p.id)}
                        style={{ padding: '5px 9px', borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: '1px solid #c45a5a44', background: 'none', color: '#c45a5a' }}>
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* ── Nav ── */}
      <div style={{
        padding: '11px 20px', borderBottom: `1px solid ${C.hairline}`,
        background: C.deep, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100, gap: 12,
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <button
            onClick={() => { setSidebarOpen(o => !o); loadRecentProjects() }}
            style={{ padding: '6px 10px', borderRadius: 5, fontSize: 13, cursor: 'pointer', flexShrink: 0, border: `1px solid ${sidebarOpen ? C.gold : C.hairline}`, background: sidebarOpen ? C.goldGlow : C.surface, color: sidebarOpen ? C.gold : C.secondary }}
          >☰</button>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase', flexShrink: 0 }}>PROMPT CEO</div>
          <div style={{ fontSize: 9, color: C.muted, padding: '2px 7px', borderRadius: 3, border: `1px solid ${C.hairline}`, flexShrink: 0 }}>Edit Studio™</div>
          <div style={{ fontSize: 8, color: C.ghost, padding: '1px 5px', borderRadius: 3, border: `1px solid ${C.hairline}`, flexShrink: 0, opacity: 0.5 }}>v0.1 Render Beta</div>
          {project.title && (
            <>
              <div style={{ width: 1, height: 14, background: C.hairline, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.ghost, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>
                {project.title}
              </div>
            </>
          )}
          {/* Project status badge */}
          <div style={{ fontSize: 9, fontWeight: 700, color: STATUS_COLORS[projectStatus], padding: '2px 7px', borderRadius: 10, border: `1px solid ${STATUS_COLORS[projectStatus]}44`, background: STATUS_COLORS[projectStatus] + '14', textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 }}>
            {projectStatus}
          </div>
          {/* Cloud sync warning */}
          {!syncAvailable && (
            <div style={{ fontSize: 10, color: '#c45a5a', padding: '2px 8px', borderRadius: 8, border: '1px solid #c45a5a44', background: '#c45a5a0e', flexShrink: 0 }}>
              Cloud sync unavailable · stored locally
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Health panel toggle (dev tool — Ctrl+D) */}
          <button
            onClick={() => setShowHealthPanel(p => !p)}
            title="Pipeline health (Ctrl+D)"
            style={{ padding: '5px 8px', borderRadius: 4, fontSize: 11, cursor: 'pointer', border: `1px solid ${showHealthPanel ? C.violet : C.hairline}`, background: showHealthPanel ? C.violetGlow : 'none', color: showHealthPanel ? C.violet : C.ghost, opacity: 0.8 }}>
            ⊙
          </button>

          {/* Save status indicator */}
          {saveStatus === 'saving'  && <div style={{ fontSize: 11, color: C.muted,  width: 100 }}>Saving…</div>}
          {saveStatus === 'saved'   && <div style={{ fontSize: 11, color: C.green,  width: 100 }}>✓ Saved just now</div>}
          {saveStatus === 'unsaved' && <div style={{ fontSize: 11, color: C.gold,   width: 100 }}>● Unsaved changes</div>}
          {saveStatus === 'error'   && <div style={{ fontSize: 11, color: '#c45a5a', width: 100 }}>Saved locally</div>}

          <button
            onClick={() => saveProject(false)}
            disabled={saveStatus === 'saving'}
            style={{ padding: '7px 13px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
            Save Draft
          </button>
          <button
            onClick={() => { saveProject(false); if (isReady) setActiveStep(s => Math.min(STEPS.length - 1, s + 1)) }}
            disabled={saveStatus === 'saving' || !project.title.trim()}
            style={{ padding: '7px 13px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            Save & Continue
          </button>

          <div style={{ width: 1, height: 20, background: C.hairline }} />
          <NavBtn onClick={() => router.push('/prompt-engine-v3/dashboard')}>Dashboard</NavBtn>
          <NavBtn onClick={() => router.push('/prompt-engine-v3')}>Studio</NavBtn>
          <NavBtn onClick={() => router.push('/prompt-engine-v3?view=ad_studio')} gold>Ad Studio →</NavBtn>
        </div>
      </div>

      {/* ── Pipeline Health Panel (Ctrl+D toggle) ── */}
      {showHealthPanel && (() => {
        const selectedPlan    = cutPlans.find(p => p.id === selectedPlanId)
        const CHECKS = [
          { label: 'Project saved',          ok: !!projectId,                                         note: projectId?.slice(0, 8) + '…' || 'Not saved' },
          { label: 'Source video uploaded',   ok: !!project.sourceVideoUrl,                            note: project.videoFile || 'None' },
          { label: 'Transcript exists',       ok: transcriptSegs.length > 0,                           note: transcriptSegs.length ? `${transcriptSegs.length} segments` : 'None' },
          { label: 'AI Director analysis',    ok: !!aiDirectorAnalysis,                                note: aiDirectorFallback ? 'Mock' : aiDirectorAnalysis ? 'Real' : 'None' },
          { label: 'Cut plan selected',       ok: !!selectedPlan && !!selectedPlanId,                  note: selectedPlan?.title || 'None' },
          { label: 'Editor cleanup exists',   ok: !!editorCleanup?.removals?.length,                   note: editorCleanup?.removals?.length ? `${editorCleanup.removals.length} items` : 'None' },
          { label: 'Caption timeline',        ok: captionTimeline.length > 0,                          note: captionTimeline.length ? `${captionTimeline.length} captions` : 'None' },
          { label: 'Music selected',          ok: !!selectedMusicBed,                                  note: selectedMusicBed?.title || 'None' },
          { label: 'Render plan exists',      ok: !!renderPlan,                                        note: renderPlan ? `${renderPlan.segments?.length} segs · ${renderPlan.totalDuration}s` : 'None' },
          { label: 'Render job exists',       ok: !!renderJob,                                         note: renderJob ? renderJob.status : 'None' },
          { label: 'Export URL exists',       ok: !!(renderJob?.exportUrl),                            note: renderJob?.exportUrl ? '✓ Ready' : 'None' },
        ]
        const ok  = CHECKS.filter(c => c.ok).length
        const all = CHECKS.length
        return (
          <div style={{ background: C.base, borderBottom: `1px solid ${C.violet}33`, padding: '10px 24px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.violet }}>⊙ Pipeline Health</div>
                <div style={{ fontSize: 10, color: ok === all ? C.green : ok >= all * 0.7 ? C.gold : '#c45a5a', fontWeight: 700 }}>{ok}/{all} ready</div>
                <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${(ok / all) * 100}%`, height: '100%', background: ok === all ? C.green : ok >= all * 0.7 ? C.gold : '#c45a5a', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 9, color: C.ghost }}>Ctrl+D to close</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '4px 8px' }}>
                {CHECKS.map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, color: c.ok ? C.green : C.ghost, fontWeight: 700, flexShrink: 0, width: 12 }}>{c.ok ? '✓' : '○'}</div>
                    <div style={{ fontSize: 10, color: c.ok ? C.secondary : C.ghost, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 9, color: C.ghost, marginLeft: 'auto', flexShrink: 0 }}>{c.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Workflow step bar ── */}
      <div style={{ background: C.deep, borderBottom: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex' }}>
          {STEPS.map((step, i) => {
            const isActive = activeStep === i
            const isDone   = i === 0 ? isReady : (isReady && activeStep > i)
            const blocked  = !stepAccessible(i)

            const indicatorChar  = isDone ? '✓' : isActive ? '●' : '○'
            const indicatorColor = isDone ? C.green : isActive ? C.gold : blocked ? C.ghost : C.muted

            return (
              <button
                key={step.id}
                onClick={() => !blocked && setActiveStep(i)}
                disabled={blocked}
                style={{
                  flex: 1, padding: '12px 6px', textAlign: 'center',
                  background: 'none', border: 'none',
                  borderBottom: `2px solid ${isActive ? C.gold : isDone ? C.green + '55' : 'transparent'}`,
                  cursor: blocked ? 'not-allowed' : 'pointer',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 4, opacity: blocked ? 0.25 : 1 }}>{step.icon}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                  color: isActive ? C.gold : blocked ? C.ghost : isDone ? C.green : C.secondary,
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: indicatorColor,
                  marginTop: 4, lineHeight: 1,
                }}>
                  {indicatorChar}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '30px 24px 60px' }}>

        {/* Step heading */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: -0.3 }}>
            {STEPS[activeStep].icon} {STEPS[activeStep].label}
          </h2>
          <div style={{ fontSize: 12, color: C.ghost, marginTop: 5 }}>
            Step {activeStep + 1} of {STEPS.length}
          </div>
        </div>

        {/* Active panel */}
        {PANELS[activeStep]?.()}

        {/* Previous / Next */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 36, paddingTop: 22, borderTop: `1px solid ${C.hairline}`,
        }}>
          <button
            onClick={() => setActiveStep(s => Math.max(0, s - 1))}
            disabled={activeStep === 0}
            style={{
              padding: '10px 22px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              border:  `1px solid ${C.hairline}`,
              background: C.surface,
              color: activeStep === 0 ? C.ghost : C.secondary,
            }}>
            ← Previous
          </button>
          <button
            onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))}
            disabled={activeStep === STEPS.length - 1 || (activeStep === 0 && !isReady)}
            style={{
              padding: '10px 22px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              cursor: (activeStep === STEPS.length - 1 || (activeStep === 0 && !isReady)) ? 'not-allowed' : 'pointer',
              border:  `1px solid ${(activeStep < STEPS.length - 1 && (isReady || activeStep > 0)) ? C.gold : C.hairline}`,
              background: (activeStep < STEPS.length - 1 && (isReady || activeStep > 0)) ? C.goldGlow : C.surface,
              color: (activeStep < STEPS.length - 1 && (isReady || activeStep > 0)) ? C.gold : C.ghost,
            }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Micro-components ────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: '#9e9a96', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
      {children}
    </div>
  )
}

function Pill({ children, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
      border:  `1px solid ${active ? color : '#1a1a1a'}`,
      background: active ? color + '22' : '#111111',
      color: active ? color : '#9e9a96',
      transition: 'all 0.15s',
    }}>
      {children}
    </button>
  )
}

function NavBtn({ children, onClick, gold }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 14px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer',
      border:  `1px solid ${gold ? '#c8a84b' : '#1a1a1a'}`,
      background: gold ? '#c8a84b22' : '#111111',
      color: gold ? '#c8a84b' : '#9e9a96',
    }}>
      {children}
    </button>
  )
}

function GhostBtn({ children, style }) {
  return (
    <button style={{
      padding: '4px 10px', borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: 'pointer',
      border: '1px solid #1a1a1a', background: 'none', color: '#6e6a66',
      ...style,
    }}>
      {children}
    </button>
  )
}

function SectionMeta({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: '#9e9a96', letterSpacing: 1.5, textTransform: 'uppercase' }}>
      {children}
    </div>
  )
}

function EmptyState({ icon, children }) {
  return (
    <div style={{ padding: '52px 24px', textAlign: 'center', borderRadius: 12, border: '1px solid #1a1a1a', background: '#111111' }}>
      <div style={{ fontSize: 34, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 14, color: '#9e9a96', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>{children}</div>
    </div>
  )
}

function Tag({ children, color }) {
  return (
    <div style={{ fontSize: 9, fontWeight: 700, color, padding: '1px 6px', borderRadius: 8, border: `1px solid ${color}44`, background: color + '18' }}>
      {children}
    </div>
  )
}
