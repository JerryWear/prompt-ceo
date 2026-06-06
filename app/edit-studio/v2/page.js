'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './page.module.css'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAdType(type) {
  const labels = {
    founder: 'FOUNDER',
    saas_demo: 'SAAS DEMO',
    problem_solution: 'PROBLEM / SOLUTION',
    linkedin_authority: 'LINKEDIN',
    tiktok_hook: 'TIKTOK',
  }
  return labels[type] || type?.toUpperCase() || '?'
}

const VOICE_OPTIONS = [
  { key: 'founder_male',        label: 'Founder Male',        description: 'Deep, authoritative',   emoji: '🎙' },
  { key: 'professional_male',   label: 'Professional Male',   description: 'Clear, trustworthy',    emoji: '💼' },
  { key: 'professional_female', label: 'Professional Female', description: 'Warm, confident',       emoji: '✨' },
  { key: 'ugc_creator',         label: 'UGC Creator',         description: 'Casual, authentic',     emoji: '📱' },
  { key: 'energetic_creator',   label: 'Energetic Creator',   description: 'High energy, punchy',   emoji: '⚡' },
]

const CAPTION_STYLE_OPTIONS = [
  { key: 'tiktok_ugc',         label: 'TikTok UGC',        description: '1-2 words, punchy',     emoji: '⚡' },
  { key: 'founder',            label: 'Founder',            description: 'Short, personal',       emoji: '🎙' },
  { key: 'high_energy',        label: 'High-Energy',        description: 'Single words, fast',    emoji: '🔥' },
  { key: 'saas_demo',          label: 'SaaS Demo',          description: 'Key terms highlighted', emoji: '💻' },
  { key: 'linkedin_authority', label: 'LinkedIn Authority', description: 'Longer, measured',      emoji: '💼' },
]

function VoicePanel({ concept, projectId }) {
  const [selectedVoice, setSelectedVoice] = useState('professional_female')
  const [selectedDuration, setSelectedDuration] = useState('30s')
  const [loading, setLoading]   = useState(false)
  const [voiceUrl, setVoiceUrl] = useState(null)   // signed URL for playback
  const [voiceLabel, setVoiceLabel] = useState('')
  const [error, setError]       = useState(null)

  const scriptForDuration = concept[`script_${selectedDuration}`] || {}
  const scriptText = [scriptForDuration.hook, scriptForDuration.body, scriptForDuration.cta]
    .filter(Boolean).join(' ')

  const handleGenerate = async (e) => {
    e.stopPropagation()
    if (!scriptText || !concept.id || !projectId) return
    setLoading(true)
    setError(null)
    setVoiceUrl(null)
    try {
      const res = await fetch('/api/edit-studio/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adId:       concept.id,
          projectId,
          scriptText,
          voiceKey:   selectedVoice,
          duration:   selectedDuration,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Voice generation failed')
      setVoiceUrl(data.voiceover_url)
      setVoiceLabel(data.voice_label || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.voicePanel} onClick={e => e.stopPropagation()}>
      <p className={styles.voicePanelTitle}>Voice Studio</p>

      {/* Voice persona selector */}
      <div className={styles.voiceOptions}>
        {VOICE_OPTIONS.map(v => (
          <button
            key={v.key}
            type="button"
            className={`${styles.voiceOption} ${selectedVoice === v.key ? styles.voiceOptionSelected : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedVoice(v.key) }}
          >
            <span className={styles.voiceEmoji}>{v.emoji}</span>
            <span className={styles.voiceOptionLabel}>{v.label}</span>
            <span className={styles.voiceOptionDesc}>{v.description}</span>
          </button>
        ))}
      </div>

      {/* Duration selector */}
      <div className={styles.voiceDurationRow}>
        <span className={styles.voiceDurationLabel}>Script:</span>
        {['15s', '30s', '60s'].map(dur => (
          <button
            key={dur}
            type="button"
            className={`${styles.voiceDurationBtn} ${selectedDuration === dur ? styles.voiceDurationBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedDuration(dur); setVoiceUrl(null) }}
          >
            {dur}
          </button>
        ))}
        <span className={styles.voiceDurationChars}>{scriptText.length} chars</span>
      </div>

      {/* Generate button */}
      {!voiceUrl && !loading && (
        <button
          type="button"
          className={styles.generateVoiceBtn}
          onClick={handleGenerate}
          disabled={!scriptText}
        >
          Generate Voiceover
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.voiceLoading}>
          <span className={styles.voiceLoadingDot} />
          <span>Synthesizing {VOICE_OPTIONS.find(v => v.key === selectedVoice)?.label}...</span>
        </div>
      )}

      {/* Audio player */}
      {voiceUrl && !loading && (
        <div className={styles.audioPlayerWrap}>
          <div className={styles.audioPlayerMeta}>
            <span className={styles.audioVoiceLabel}>{voiceLabel}</span>
            <span className={styles.audioDurationLabel}>{selectedDuration}</span>
            <button
              type="button"
              className={styles.reGenerateBtn}
              onClick={e => { e.stopPropagation(); setVoiceUrl(null) }}
            >
              Re-generate
            </button>
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls src={voiceUrl} className={styles.audioPlayer} />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className={styles.voiceError}>{error}</p>
      )}
    </div>
  )
}

function CaptionPanel({ concept, projectId, selectedDuration }) {
  const [selectedStyle, setSelectedStyle] = useState('tiktok_ugc')
  const [loading, setLoading]             = useState(false)
  const [captions, setCaptions]           = useState(null)  // caption_timeline array
  const [meta, setMeta]                   = useState(null)  // { style_name, chunk_count, total_duration, timing_source }
  const [error, setError]                 = useState(null)
  const [previewIndex, setPreviewIndex]   = useState(0)     // which caption chunk is being previewed

  // Determine which script to use based on selectedDuration prop
  const scriptObj = concept[`script_${selectedDuration || '30s'}`] || {}

  const handleGenerate = async (e) => {
    e.stopPropagation()
    if (!scriptObj.hook) return
    setLoading(true)
    setError(null)
    setCaptions(null)
    try {
      const res = await fetch('/api/edit-studio/caption-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adId:        concept.id,
          projectId,
          scriptObj,
          selectedDuration: selectedDuration || '30s',
          captionStyle: selectedStyle,
          // voiceoverDurationSecs not passed — uses estimated timing
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Caption generation failed')
      setCaptions(data.caption_timeline || [])
      setMeta({ style_name: data.style_name, chunk_count: data.chunk_count, total_duration: data.total_duration, timing_source: data.timing_source })
      setPreviewIndex(0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Cycle through caption chunks in the preview
  const handlePrevChunk = (e) => { e.stopPropagation(); setPreviewIndex(i => Math.max(0, i - 1)) }
  const handleNextChunk = (e) => { e.stopPropagation(); setPreviewIndex(i => Math.min((captions?.length || 1) - 1, i + 1)) }

  const currentCaption = captions?.[previewIndex]

  return (
    <div className={styles.captionPanel} onClick={e => e.stopPropagation()}>
      <p className={styles.captionPanelTitle}>Caption Intelligence</p>

      {/* Style selector */}
      <div className={styles.captionStyleOptions}>
        {CAPTION_STYLE_OPTIONS.map(s => (
          <button
            key={s.key}
            type="button"
            className={`${styles.captionStyleOption} ${selectedStyle === s.key ? styles.captionStyleOptionSelected : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedStyle(s.key); setCaptions(null) }}
          >
            <span className={styles.captionStyleEmoji}>{s.emoji}</span>
            <span className={styles.captionStyleLabel}>{s.label}</span>
            <span className={styles.captionStyleDesc}>{s.description}</span>
          </button>
        ))}
      </div>

      {/* Generate button */}
      {!captions && !loading && (
        <button
          type="button"
          className={styles.generateCaptionsBtn}
          onClick={handleGenerate}
          disabled={!scriptObj.hook}
        >
          Generate Captions
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.captionLoading}>
          <span className={styles.voiceLoadingDot} />
          <span>Generating {CAPTION_STYLE_OPTIONS.find(s => s.key === selectedStyle)?.label} captions...</span>
        </div>
      )}

      {/* Caption preview */}
      {captions && !loading && (
        <div className={styles.captionPreviewWrap}>
          {/* Meta row */}
          <div className={styles.captionMeta}>
            <span className={styles.captionMetaBadge}>{meta?.style_name}</span>
            <span className={styles.captionMetaInfo}>{meta?.chunk_count} chunks · {meta?.total_duration?.toFixed(1)}s</span>
            <span className={styles.captionTimingSource}>{meta?.timing_source === 'voiceover' ? '⏱ Voiceover timed' : '⏱ Estimated'}</span>
            <button type="button" className={styles.reGenerateBtn} onClick={e => { e.stopPropagation(); setCaptions(null) }}>
              Re-generate
            </button>
          </div>

          {/* Phone mockup with caption preview */}
          <div className={styles.phoneMockup}>
            <div className={styles.phoneMockupScreen}>
              <div className={`${styles.captionDisplay} ${styles['caption_' + selectedStyle]}`}>
                {currentCaption?.text || ''}
              </div>
              <div className={styles.captionTimingBar}>
                <span className={styles.captionTimingText}>
                  {currentCaption?.start?.toFixed(1)}s – {currentCaption?.end?.toFixed(1)}s
                </span>
                <span className={`${styles.captionEmphasisDot} ${styles['emphasis_' + (currentCaption?.emphasis || 'normal')]}`} />
              </div>
            </div>
            {/* Nav arrows */}
            <div className={styles.captionNav}>
              <button type="button" className={styles.captionNavBtn} onClick={handlePrevChunk} disabled={previewIndex === 0}>&#8249;</button>
              <span className={styles.captionNavCounter}>{previewIndex + 1} / {captions.length}</span>
              <button type="button" className={styles.captionNavBtn} onClick={handleNextChunk} disabled={previewIndex >= captions.length - 1}>&#8250;</button>
            </div>
          </div>

          {/* Section badges — show section distribution */}
          <div className={styles.captionSectionRow}>
            {['hook', 'body', 'cta'].map(sec => {
              const count = captions.filter(c => c.section === sec).length
              return count > 0 ? (
                <span key={sec} className={`${styles.captionSectionBadge} ${styles['section_' + sec]}`}>
                  {sec.toUpperCase()} × {count}
                </span>
              ) : null
            })}
          </div>

          {/* Scrollable chunk list — all captions in a compact list */}
          <div className={styles.captionList}>
            {captions.map((cap, i) => (
              <div
                key={cap.id}
                className={`${styles.captionListItem} ${i === previewIndex ? styles.captionListItemActive : ''} ${styles['capSection_' + cap.section]}`}
                onClick={e => { e.stopPropagation(); setPreviewIndex(i) }}
              >
                <span className={styles.captionListText}>{cap.text}</span>
                <span className={styles.captionListTime}>{cap.start?.toFixed(1)}s</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className={styles.voiceError}>{error}</p>}
    </div>
  )
}

function ScriptTabs({ concept }) {
  const [activeTab, setActiveTab] = useState('30s')
  const script = concept[`script_${activeTab}`] || {}
  return (
    <div className={styles.scriptTabs}>
      <div className={styles.scriptTabNav}>
        {['15s', '30s', '60s'].map(dur => (
          <button
            key={dur}
            className={`${styles.scriptTabBtn} ${activeTab === dur ? styles.scriptTabBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); setActiveTab(dur) }}
            type="button"
          >
            {dur}
          </button>
        ))}
      </div>
      <div className={styles.scriptBody}>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>Hook</span>
          <p className={styles.scriptSectionText}>{script.hook}</p>
        </div>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>Body</span>
          <p className={styles.scriptSectionText}>{script.body}</p>
        </div>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>CTA</span>
          <p className={styles.scriptSectionText}>{script.cta}</p>
        </div>
      </div>
    </div>
  )
}

function fmtTimestamp(secs) {
  if (secs == null) return '?'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function prettifySnakeCase(str) {
  if (!str) return ''
  return str
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function typePillClass(type) {
  if (!type) return styles.other
  const t = type.toLowerCase()
  if (t === 'hook')         return styles.hook
  if (t === 'demo')         return styles.demo
  if (t === 'cta')          return styles.cta
  if (t === 'social_proof') return styles['social_proof']
  return styles.other
}

// ─── Step definitions ─────────────────────────────────────────────────────────

const PIPELINE_STEPS = ['Uploading', 'Transcribing', 'Analyzing']

// Maps statusMsg prefix to step index (0-based) for the step indicator
function activeStepIndex(statusMsg) {
  if (!statusMsg) return 0
  const m = statusMsg.toLowerCase()
  if (m.startsWith('uploading') || m.startsWith('creating'))   return 0
  if (m.startsWith('transcrib'))                                return 1
  if (m.startsWith('analyz'))                                   return 2
  return 0
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditStudioV2() {
  const fileInputRef = useRef(null)

  const [screen,      setScreen]      = useState('upload')  // 'upload' | 'processing' | 'results' | 'strategy-loading' | 'strategy' | 'concepts-loading' | 'concepts'
  const [project,     setProject]     = useState(null)      // { id, storagePath, bucket, publicUrl }
  const [understanding, setUnderstanding] = useState(null)
  const [strategy,    setStrategy]    = useState(null)      // { strategy, ad_concepts, primary_concept }
  const [adConcepts,  setAdConcepts]  = useState([])        // array of 5 concept objects
  const [activeConcept, setActiveConcept] = useState(null)  // index of expanded concept card
  const [error,       setError]       = useState(null)
  const [statusMsg,   setStatusMsg]   = useState('')
  const [dragActive,  setDragActive]  = useState(false)
  const [renderJobs,    setRenderJobs]    = useState([]) // array of job objects from auto-render response
  const [renderPolling, setRenderPolling] = useState(false)

  // ── Pipeline ─────────────────────────────────────────────────────────────────

  const handleFileSelect = useCallback(async (file) => {
    if (!file) return
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, or WebM).')
      return
    }

    setError(null)
    setStatusMsg('Creating project...')
    setScreen('processing')

    try {
      // ── Step 1: Create project ──────────────────────────────────────────────
      setStatusMsg('Uploading video...')
      const createRes = await fetch('/api/edit-studio/create-project', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title: file.name.replace(/\.[^.]+$/, '') }),
      })
      const createData = await createRes.json()
      if (!createRes.ok || createData.status !== 'success') {
        throw new Error(createData.message || 'Failed to create project')
      }
      const projectId = createData.projectId

      // ── Step 2: Get signed upload URL ───────────────────────────────────────
      const sourceRes = await fetch('/api/edit-studio/upload-source', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }),
      })
      const sourceData = await sourceRes.json()
      if (!sourceRes.ok || sourceData.status !== 'success') {
        throw new Error(sourceData.message || 'Failed to get upload URL')
      }
      const { signedUrl, storagePath, bucket, publicUrl } = sourceData

      // ── Step 3: Upload file directly to storage ─────────────────────────────
      const uploadRes = await fetch(signedUrl, {
        method:  'PUT',
        headers: { 'Content-Type': file.type },
        body:    file,
      })
      if (!uploadRes.ok) {
        throw new Error(`Storage upload failed (HTTP ${uploadRes.status})`)
      }

      // Save project info in state
      setProject({ id: projectId, storagePath, bucket, publicUrl })

      // ── Step 4: Transcribe ──────────────────────────────────────────────────
      setStatusMsg('Transcribing audio...')
      const transcribeRes = await fetch('/api/edit-studio/transcribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          sourceVideoUrl:  publicUrl,
          sourceVideoName: file.name,
          sourceVideoType: file.type,
          storagePath,
          bucket,
        }),
      })
      const transcribeData = await transcribeRes.json()
      if (!transcribeRes.ok || transcribeData.status === 'error') {
        throw new Error(transcribeData.message || 'Transcription failed')
      }
      const segments = transcribeData.transcript?.segments || []

      // ── Step 5: Understand ──────────────────────────────────────────────────
      setStatusMsg('Analyzing video content...')
      const understandRes = await fetch('/api/edit-studio/understand', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          storagePath,
          bucket,
          transcriptSegments: segments,
        }),
      })
      const understandData = await understandRes.json()
      if (!understandRes.ok || understandData.status === 'error') {
        throw new Error(understandData.message || 'Video analysis failed')
      }

      setUnderstanding(understandData.understanding)
      setScreen('results')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setScreen('upload')
    }
  }, [])

  // ── Event handlers ────────────────────────────────────────────────────────

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    // Reset so same file can be re-selected after an error
    e.target.value = ''
  }, [handleFileSelect])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragActive(false)
  }, [])

  const handleDropZoneClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRetry = useCallback(() => {
    setError(null)
    setScreen('upload')
    setProject(null)
    setUnderstanding(null)
    setStrategy(null)
    setAdConcepts([])
    setActiveConcept(null)
    setRenderJobs([])
    setRenderPolling(false)
  }, [])

  const handleCreateStrategy = useCallback(async () => {
    if (!understanding || !project?.id) return
    setScreen('strategy-loading')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/creative-director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          understandingData: understanding,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Creative Director failed')
      setStrategy(data)         // { strategy, ad_concepts, primary_concept }
      setScreen('strategy')
    } catch (err) {
      setError(err.message)
      setStrategy(null)
      setScreen('results')      // return to results on error
    }
  }, [understanding, project])

  const handleBuildConcepts = useCallback(async () => {
    if (!understanding || !strategy || !project?.id) return
    setScreen('concepts-loading')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/ad-concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          understandingData: understanding,
          creativeStrategy: strategy,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Concept generation failed')
      setAdConcepts(data.concepts || [])
      setActiveConcept(0)
      setScreen('concepts')
    } catch (err) {
      setError(err.message)
      setScreen('strategy')
    }
  }, [understanding, strategy, project])

  const handleGenerateAllAds = useCallback(async () => {
    if (!project?.id) return
    setScreen('render-queuing')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/auto-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Failed to queue renders')
      setRenderJobs(data.jobs || [])
      setScreen('rendering')
      setRenderPolling(true)
    } catch (err) {
      setError(err.message)
      setScreen('concepts')
    }
  }, [project])

  useEffect(() => {
    if (!renderPolling || !renderJobs.length) return

    const interval = setInterval(async () => {
      // Poll each job that isn't complete or failed yet
      const activeJobs = renderJobs.filter(j => j.jobId && j.status !== 'completed' && j.status !== 'failed')
      if (!activeJobs.length) {
        setRenderPolling(false)
        return
      }

      const updated = await Promise.allSettled(
        activeJobs.map(async j => {
          const res = await fetch(`/api/edit-studio/render-status?jobId=${j.jobId}`)
          const data = await res.json()
          return { jobId: j.jobId, status: data.status, exportUrl: data.export_url }
        })
      )

      setRenderJobs(prev => prev.map(job => {
        const update = updated.find(r => r.status === 'fulfilled' && r.value.jobId === job.jobId)
        if (!update) return job
        return { ...job, status: update.value.status, exportUrl: update.value.exportUrl }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [renderPolling, renderJobs])

  // ── Step indicator logic ──────────────────────────────────────────────────

  const activeStep = activeStepIndex(statusMsg)

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>

      {/* ── Upload screen ─────────────────────────────────────────────────── */}
      {screen === 'upload' && (
        <div className={styles.uploadScreen}>
          <h1 className={styles.headline}>Turn one video into five ads.</h1>
          <p className={styles.subline}>Upload your raw footage. AI does the rest.</p>

          <div
            className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleDropZoneClick}
            role="button"
            tabIndex={0}
            aria-label="Drop video file or click to browse"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDropZoneClick() }}
          >
            <span className={styles.dropZoneIcon} aria-hidden="true">&#x2B06;</span>
            <span className={styles.dropZoneLabel}>Drop your video here</span>
            <span className={styles.dropZoneHint}>MP4, MOV, WebM</span>
          </div>

          <div className={styles.orRow}>
            <span className={styles.orLine} />
            <span className={styles.orText}>or</span>
            <span className={styles.orLine} />
          </div>

          <button
            className={styles.browseButton}
            onClick={handleDropZoneClick}
            type="button"
          >
            Browse files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className={styles.fileInput}
            onChange={handleInputChange}
            tabIndex={-1}
            aria-hidden="true"
          />

          {error && (
            <div className={styles.errorBox} role="alert">
              <span>{error}</span>
              <button onClick={handleRetry} type="button" aria-label="Dismiss error">
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Processing screen ──────────────────────────────────────────────── */}
      {screen === 'processing' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} aria-label="Loading" role="status" />

          <p className={styles.statusMsg}>{statusMsg || 'Processing...'}</p>

          <div className={styles.stepRow} aria-label="Pipeline steps">
            {PIPELINE_STEPS.map((label, i) => (
              <div key={label} className={styles.stepItem}>
                {i > 0 && (
                  <span className={`${styles.stepConnector} ${i <= activeStep ? styles.done : ''}`} />
                )}
                <span
                  className={`${styles.stepDot} ${
                    i < activeStep
                      ? styles.done
                      : i === activeStep
                      ? styles.active
                      : ''
                  }`}
                />
                <span
                  className={`${styles.stepLabel} ${
                    i < activeStep
                      ? styles.done
                      : i === activeStep
                      ? styles.active
                      : ''
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Results screen ─────────────────────────────────────────────────── */}
      {screen === 'results' && understanding && (
        <div className={styles.resultsScreen}>
          <div className={styles.resultsHeader}>
            <h1 className={styles.resultsTitle}>Here is what we found in your video.</h1>
            {understanding.business_description && (
              <p className={styles.resultsSubline}>{understanding.business_description}</p>
            )}
          </div>

          {/* Detected products */}
          {understanding.detected_products?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Detected Products</p>
              <ul className={styles.pillList}>
                {understanding.detected_products.map((product, i) => (
                  <li key={i} className={styles.pillHighlight}>{product}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key screens */}
          {understanding.screens_detected?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Key Screens</p>
              <div className={styles.screenList}>
                {understanding.screens_detected.map((screenItem, i) => (
                  <div key={i} className={styles.screenRow}>
                    <span className={styles.screenLabel}>{screenItem.label}</span>
                    {screenItem.significance && (
                      <span className={`${styles.pillSignificance} ${styles[screenItem.significance] || styles.low}`}>
                        {screenItem.significance}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strong moments */}
          {understanding.strong_moments?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Strong Moments</p>
              <div className={styles.momentList}>
                {understanding.strong_moments.map((moment, i) => (
                  <div key={i} className={styles.momentRow}>
                    <span className={styles.timestamp}>
                      {fmtTimestamp(moment.timestamp_approx)}
                    </span>
                    <span className={styles.momentLabel}>{moment.label}</span>
                    {moment.type && (
                      <span className={`${styles.typePill} ${typePillClass(moment.type)}`}>
                        {prettifySnakeCase(moment.type)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended positioning */}
          {understanding.recommended_positioning && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Recommended Positioning</p>
              <p className={styles.positioningValue}>
                {prettifySnakeCase(understanding.recommended_positioning)}
              </p>
              {understanding.positioning_reason && (
                <p className={styles.positioningReason}>{understanding.positioning_reason}</p>
              )}
            </div>
          )}

          {/* Key messages */}
          {understanding.key_messages?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Key Messages</p>
              <ol className={styles.messageList}>
                {understanding.key_messages.map((msg, i) => (
                  <li key={i} className={styles.messageItem}>
                    <span className={styles.messageNum}>{i + 1}.</span>
                    <span className={styles.messageText}>{msg}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Recommended ad types */}
          {understanding.recommended_ad_types?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Recommended Ad Types</p>
              <ul className={styles.pillList}>
                {understanding.recommended_ad_types.map((type, i) => (
                  <li key={i} className={styles.pillHighlight}>{prettifySnakeCase(type)}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.ctaRow}>
            <button className={styles.ctaButton} type="button" onClick={handleCreateStrategy}>
              Create Ads &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ── Strategy loading screen ────────────────────────────────────────── */}
      {screen === 'strategy-loading' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Building your creative strategy...</p>
        </div>
      )}

      {/* ── Strategy screen ─────────────────────────────────────────────────── */}
      {screen === 'strategy' && strategy && (
        <div className={styles.strategyScreen}>
          <button className={styles.backButton} onClick={() => setScreen('results')}>
            &#8592; Back to Analysis
          </button>

          <div className={styles.strategyHeader}>
            <h1 className={styles.strategyTitle}>The Creative Brief</h1>
            {understanding?.business_description && (
              <p className={styles.strategySubline}>{understanding.business_description}</p>
            )}
          </div>

          {/* 1. Positioning */}
          {strategy.strategy?.positioning && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Positioning</p>
              <p className={styles.strategyValue}>{prettifySnakeCase(strategy.strategy.positioning)}</p>
              {strategy.strategy.positioning_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.positioning_rationale}</p>
              )}
            </div>
          )}

          {/* 2. Target Audience */}
          {strategy.strategy?.target_audience && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Target Audience</p>
              <p className={styles.strategyValue}>{strategy.strategy.target_audience}</p>
            </div>
          )}

          {/* 3. Platform */}
          {strategy.strategy?.primary_platform && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Platform</p>
              <p className={styles.strategyValue}>
                <span className={styles.platformBadge}>
                  {strategy.strategy.primary_platform.toUpperCase()}
                </span>
              </p>
              {strategy.strategy.platform_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.platform_rationale}</p>
              )}
            </div>
          )}

          {/* 4. Format + Duration */}
          {(strategy.strategy?.ad_format || strategy.strategy?.recommended_duration) && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Format + Duration</p>
              <p className={styles.strategyValue}>
                {strategy.strategy.ad_format && (
                  <span>{prettifySnakeCase(strategy.strategy.ad_format)}</span>
                )}
                {strategy.strategy.recommended_duration && (
                  <span className={styles.durationBadge} style={{ marginLeft: 8 }}>
                    {strategy.strategy.recommended_duration}
                  </span>
                )}
              </p>
              {strategy.strategy.duration_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.duration_rationale}</p>
              )}
            </div>
          )}

          {/* 5. Primary Message */}
          {strategy.strategy?.primary_message && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Primary Message</p>
              <div className={styles.primaryMessageBlock}>{strategy.strategy.primary_message}</div>
            </div>
          )}

          {/* 6. Supporting Messages */}
          {strategy.strategy?.supporting_messages?.length > 0 && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Supporting Messages</p>
              <ul className={styles.bulletList}>
                {strategy.strategy.supporting_messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 7. Hook Strategy */}
          {strategy.strategy?.hook_strategy && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Hook Strategy</p>
              <p className={styles.strategyValue}>{prettifySnakeCase(strategy.strategy.hook_strategy)}</p>
              {strategy.strategy.hook_strategy_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.hook_strategy_rationale}</p>
              )}
            </div>
          )}

          {/* 8. Opening Hook */}
          {strategy.strategy?.opening_hook_example && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Opening Hook</p>
              <blockquote className={styles.hookQuote}>{strategy.strategy.opening_hook_example}</blockquote>
            </div>
          )}

          {/* 9. CTA */}
          {strategy.strategy?.cta && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>CTA</p>
              <p className={styles.strategyValue}><strong>{strategy.strategy.cta}</strong></p>
            </div>
          )}

          {/* 10. Avoid */}
          {strategy.strategy?.avoid?.length > 0 && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Avoid</p>
              <ul className={styles.bulletList}>
                {strategy.strategy.avoid.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ad Concepts */}
          {strategy.ad_concepts?.length > 0 && (
            <div className={styles.conceptsSection}>
              <p className={styles.conceptsSectionTitle}>Ad Concepts</p>
              <div className={styles.conceptGrid}>
                {strategy.ad_concepts.map((concept, i) => {
                  const isRecommended = concept.type === strategy.primary_concept || concept.recommended
                  return (
                    <div
                      key={i}
                      className={`${styles.conceptCard} ${isRecommended ? styles.isRecommended : ''}`}
                    >
                      {isRecommended && (
                        <span className={styles.recommendedBadge}>Recommended</span>
                      )}
                      <span className={styles.conceptTypeBadge}>{concept.type}</span>
                      <p className={styles.conceptTitle}>{concept.title}</p>
                      <p className={styles.conceptLogline}>{concept.logline}</p>
                      {concept.hook && (
                        <p className={styles.conceptHook}>{concept.hook}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className={styles.ctaRow}>
            <button className={styles.ctaButton} onClick={handleBuildConcepts}>
              Build Ad Concepts &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ── Concepts loading screen ───────────────────────────────────────────── */}
      {screen === 'concepts-loading' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Writing your ad concepts...</p>
          <p className={styles.statusSubMsg}>Generating hooks, scripts, and strategy for 5 ad formats</p>
        </div>
      )}

      {/* ── Concepts screen ───────────────────────────────────────────────────── */}
      {screen === 'concepts' && adConcepts.length > 0 && (
        <div className={styles.conceptsScreen}>
          <button className={styles.backButton} onClick={() => setScreen('strategy')}>
            &#8592; Back to Strategy
          </button>
          <div className={styles.conceptsHeader}>
            <h2 className={styles.conceptsTitle}>5 Ad Concepts</h2>
            <p className={styles.conceptsSubline}>{understanding?.business_description}</p>
          </div>
          <div className={styles.conceptsList}>
            {adConcepts.map((concept, index) => {
              const isActive = activeConcept === index
              return (
                <div
                  key={concept.id || index}
                  className={`${styles.conceptItem} ${isActive ? styles.conceptItemActive : ''}`}
                >
                  {/* Collapsed header — always visible */}
                  <div
                    className={styles.conceptItemHeader}
                    onClick={() => setActiveConcept(isActive ? null : index)}
                  >
                    <div className={styles.conceptItemMeta}>
                      <span className={styles.adTypeBadge}>{formatAdType(concept.ad_type)}</span>
                      <span className={styles.platformBadgeSmall}>{concept.platform?.toUpperCase()}</span>
                    </div>
                    <p className={styles.conceptHookLine}>{concept.hook_text}</p>
                    <p className={styles.conceptObjective}>{concept.objective}</p>
                    <span className={styles.expandToggle}>{isActive ? 'Collapse ↑' : 'View Scripts ↓'}</span>
                  </div>

                  {/* Expanded body */}
                  {isActive && (
                    <div className={styles.conceptItemBody}>
                      <p className={styles.hookArchetypeLabel}>
                        {prettifySnakeCase(concept.hook_type)} Hook
                      </p>
                      <p className={styles.whyItWorks}>{concept.why_it_works}</p>
                      <ScriptTabs concept={concept} />
                      <div className={styles.ctaBlock}>
                        <span className={styles.ctaLabel}>CTA</span>
                        <span className={styles.ctaValue}>{concept.cta}</span>
                      </div>
                      <VoicePanel concept={concept} projectId={project?.id} />
                      <CaptionPanel concept={concept} projectId={project?.id} selectedDuration="30s" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className={styles.conceptsActions}>
            <button
              type="button"
              className={styles.generateAllAdsBtn}
              onClick={handleGenerateAllAds}
            >
              ⚡ Generate 5 Finished Ads
            </button>
            <p className={styles.generateAllAdsHint}>
              Voiceover · Captions · Render · Download
            </p>
          </div>
        </div>
      )}

      {/* ── Render queuing screen ─────────────────────────────────────────── */}
      {screen === 'render-queuing' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Queuing your ads...</p>
          <p className={styles.statusSubMsg}>Generating voiceovers, captions, and render jobs</p>
        </div>
      )}

      {/* ── Rendering screen ──────────────────────────────────────────────── */}
      {screen === 'rendering' && renderJobs.length > 0 && (
        <div className={styles.renderingScreen}>
          <div className={styles.renderingHeader}>
            <h2 className={styles.renderingTitle}>Producing Your Ads</h2>
            <p className={styles.renderingSubline}>
              {renderJobs.filter(j => j.status === 'completed').length} of {renderJobs.length} complete
            </p>
          </div>

          <div className={styles.renderJobList}>
            {renderJobs.map((job, i) => {
              const isComplete = job.status === 'completed'
              const isFailed   = job.status === 'failed'
              const isActive   = job.status === 'processing'

              return (
                <div
                  key={job.adId || i}
                  className={`${styles.renderJobCard} ${isComplete ? styles.renderJobComplete : ''} ${isFailed ? styles.renderJobFailed : ''}`}
                >
                  <div className={styles.renderJobLeft}>
                    <span className={styles.renderJobIcon}>
                      {isComplete ? '✓' : isFailed ? '✗' : isActive ? '◌' : '◦'}
                    </span>
                    <div>
                      <p className={styles.renderJobType}>{formatAdType(job.adType)}</p>
                      <p className={styles.renderJobStatus}>
                        {isComplete ? 'Ready to download' :
                         isFailed   ? (job.error || 'Render failed') :
                         isActive   ? 'Rendering...' :
                         job.jobId  ? 'Queued' : 'Preparing...'}
                      </p>
                    </div>
                  </div>
                  <div className={styles.renderJobRight}>
                    <div className={styles.renderJobBadges}>
                      <span className={`${styles.renderMiniDot} ${job.voiceoverGenerated ? styles.dotDone : styles.dotPending}`} title="Voice" />
                      <span className={`${styles.renderMiniDot} ${job.captionsGenerated ? styles.dotDone : styles.dotPending}`} title="Captions" />
                      <span className={`${styles.renderMiniDot} ${isComplete ? styles.dotDone : isFailed ? styles.dotFailed : styles.dotPending}`} title="Render" />
                    </div>
                    {isComplete && job.exportUrl && (
                      <a
                        href={job.exportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadBtn}
                        onClick={e => e.stopPropagation()}
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className={styles.renderingFooter}>
            {renderPolling && (
              <p className={styles.renderingPolling}>Checking render status every 3 seconds...</p>
            )}
            {!renderPolling && renderJobs.some(j => j.status === 'completed') && (
              <p className={styles.renderingComplete}>
                {renderJobs.filter(j => j.status === 'completed').length === renderJobs.length
                  ? 'All ads complete.'
                  : `${renderJobs.filter(j => j.status === 'completed').length} ads complete. Others may still be rendering on the server.`}
              </p>
            )}
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setScreen('concepts')}
              style={{ marginTop: 16 }}
            >
              ← Back to Concepts
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
