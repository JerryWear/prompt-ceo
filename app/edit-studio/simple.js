'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ─── Design tokens (same as page.js) ─────────────────────────────────────────
const C = {
  void: '#040404', deep: '#070707', base: '#0a0a0a', raised: '#0d0d0d',
  surface: '#111111', overlay: '#151515', hairline: '#1a1a1a', subtle: '#222222',
  primary: '#e8e4dc', secondary: '#ccc8c2', muted: '#9e9a96', ghost: '#6e6a66',
  gold: '#c8a84b', goldDim: '#7a6428', goldGlow: '#c8a84b22',
  blue: '#4a8ab4', blueGlow: '#4a8ab422',
  green: '#4a9a6a', greenGlow: '#4a9a6a22',
  violet: '#9b6fd4', violetGlow: '#9b6fd422',
}

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok',         captionPreset: 'bold'     },
  { id: 'instagram', label: 'Instagram Reel',  captionPreset: 'bold'     },
  { id: 'youtube',   label: 'YouTube Short',   captionPreset: 'clean'    },
  { id: 'linkedin',  label: 'LinkedIn',        captionPreset: 'minimal'  },
  { id: 'meta',      label: 'Meta Ad',         captionPreset: 'pop'      },
]

const GOALS = [
  { id: 'founder',  label: 'Founder Update',   icon: '👤' },
  { id: 'demo',     label: 'Product Demo',     icon: '🖥' },
  { id: 'tutorial', label: 'App Tutorial',     icon: '📱' },
  { id: 'launch',   label: 'Launch Ad',        icon: '🚀' },
  { id: 'ugc',      label: 'UGC Ad',           icon: '🎥' },
  { id: 'edu',      label: 'Educational Post', icon: '🎓' },
]

const PIPELINE_STEPS = [
  { id: 'upload',     label: 'Uploading video'      },
  { id: 'transcript', label: 'Generating transcript' },
  { id: 'director',   label: 'Analyzing content'    },
  { id: 'cuts',       label: 'Building edit plan'   },
  { id: 'cleanup',    label: 'Cleaning timeline'    },
  { id: 'captions',   label: 'Generating captions'  },
  { id: 'music',      label: 'Selecting music'      },
  { id: 'plan',       label: 'Preparing video'      },
]

// ─── Auto-pipeline hook ────────────────────────────────────────────────────────
function useAutoPipeline() {
  const run = useCallback(async ({
    videoFile, platform, goal,
    setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, setScreen,
  }) => {
    const done = []
    const markDone = (id) => { done.push(id); setStepsDone([...done]) }
    const CAPTION_PRESET = PLATFORMS.find(p => p.id === platform)?.captionPreset || 'bold'

    try {
      // 1. Save project
      setCurrentStep('upload')
      const projRes = await fetch('/api/edit-projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoFile.name.replace(/\.[^.]+$/, ''), platform, goal, status: 'draft' }),
      })
      const projData = await projRes.json()
      if (projData.status !== 'success') throw new Error('Could not save project')
      const projectId = projData.project.id
      setProjectId(projectId)

      // 2. Upload source to storage
      const presignRes = await fetch('/api/edit-studio/upload-source', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, fileName: videoFile.name, fileSize: videoFile.size, mimeType: videoFile.type }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message)
      await fetch(presignData.signedUrl, {
        method: 'PUT', headers: { 'Content-Type': videoFile.type || 'video/mp4' }, body: videoFile,
      })
      const sourceVideoUrl = presignData.publicUrl
      markDone('upload')

      // 3. Transcribe
      setCurrentStep('transcript')
      const transcribeRes = await fetch('/api/edit-studio/transcribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, sourceVideoUrl, sourceVideoName: videoFile.name, sourceVideoType: videoFile.type }),
      })
      const transcribeData = await transcribeRes.json()
      if (transcribeData.status !== 'success') throw new Error(transcribeData.message)
      const transcriptSegs = transcribeData.transcript.segments || []
      const transcriptMeta = transcribeData.transcript
      markDone('transcript')

      // 4. AI Director
      setCurrentStep('director')
      const analyzeRes = await fetch('/api/edit-studio/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, platform, goal, transcript: transcriptSegs, transcriptMeta }),
      })
      const analyzeData = await analyzeRes.json()
      if (analyzeData.status !== 'success') throw new Error(analyzeData.message)
      const directorAnalysis = analyzeData.analysis
      markDone('director')

      // 5. Cut plans
      setCurrentStep('cuts')
      const cutsRes = await fetch('/api/edit-studio/cuts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, directorAnalysis, transcript: transcriptSegs, platform, goal }),
      })
      const cutsData = await cutsRes.json()
      if (cutsData.status !== 'success') throw new Error(cutsData.message)
      const bestPlan = [...(cutsData.cutPlans || [])].sort((a, b) => b.score - a.score)[0]
      const selectedCutPlan = bestPlan
        ? { ...bestPlan, status: 'selected', segments: bestPlan.segments.map(s => ({ ...s, keep: true })) }
        : null
      markDone('cuts')

      // 6. Editor cleanup
      setCurrentStep('cleanup')
      let editorCleanup = null
      if (selectedCutPlan) {
        const cleanupRes = await fetch('/api/edit-studio/editor-cleanup', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, transcript: transcriptSegs, selectedCutPlan, directorAnalysis, platform, goal }),
        })
        const cleanupData = await cleanupRes.json()
        editorCleanup = cleanupData.status === 'success' ? cleanupData : null
      }
      markDone('cleanup')

      // 7. Captions
      setCurrentStep('captions')
      let captionTimeline = []
      let captionSummary = null
      if (selectedCutPlan && transcriptSegs.length) {
        const captionSettings = { style: CAPTION_PRESET, position: 'bottom', animation: 'fade', fontSize: 24, color: '#ffffff', background: 'rgba(0,0,0,0.6)' }
        const capRes = await fetch('/api/edit-studio/captions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, transcript: transcriptSegs, selectedCutPlan, editorCleanup, captionSettings, platform, goal, directorAnalysis }),
        })
        const capData = await capRes.json()
        if (capData.status === 'success') { captionTimeline = capData.captions; captionSummary = capData.captionSummary }
      }
      markDone('captions')

      // 8. Music
      setCurrentStep('music')
      let musicIntelligence = null
      let selectedMusicBed = null
      const musicRes = await fetch('/api/edit-studio/music', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, platform, goal, selectedCutPlan, directorAnalysis }),
      })
      const musicData = await musicRes.json()
      if (musicData.status === 'success') {
        musicIntelligence = musicData
        const topTrack = musicData.recommendedTracks?.[0]
        if (topTrack) {
          selectedMusicBed = {
            trackId: topTrack.id, title: topTrack.title, mood: topTrack.mood, bpm: topTrack.bpm,
            volume: musicData.timingPlan?.targetVolume ?? 0.6,
            fadeIn: musicData.timingPlan?.introFade ?? 1.0,
            fadeOut: musicData.timingPlan?.outroFade ?? 2.0,
            startTime: 0, loop: false, selectedAt: new Date().toISOString(),
          }
        }
      }
      markDone('music')

      // 9. Render plan
      setCurrentStep('plan')
      const captionSettings = { style: CAPTION_PRESET, position: 'bottom', animation: 'fade', fontSize: 24, color: '#ffffff', background: 'rgba(0,0,0,0.6)' }
      const planRes = await fetch('/api/edit-studio/render-plan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId, sourceVideoUrl, sourceVideoName: videoFile.name,
          selectedCutPlan, editorCleanup, captionTimeline, captionSettings,
          selectedMusicBed, exportSettings: { format: 'mp4', quality: 'medium', includeCaption: captionTimeline.length > 0, includeMusicBed: false },
          platform, goal,
        }),
      })
      const planData = await planRes.json()
      const renderPlan = planData.renderPlan
      markDone('plan')

      setPipelineResult({ projectId, sourceVideoUrl, transcriptSegs, transcriptMeta, directorAnalysis, selectedCutPlan, editorCleanup, captionTimeline, captionSummary, musicIntelligence, selectedMusicBed, renderPlan, captionSettings })
      setScreen('review')
    } catch (err) {
      setPipelineError(err.message || 'Something went wrong. Please try again.')
      setScreen('processing')
    }
  }, [])

  return { run }
}

// ─── Screen 1: Upload ─────────────────────────────────────────────────────────
function UploadScreen({ platform, setPlatform, goal, setGoal, videoFile, setVideoFile, videoError, setVideoError, videoRef, fileInputRef, setScreen, setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, onSwitchAdvanced }) {
  const { run } = useAutoPipeline()
  const [dragOver, setDragOver] = useState(false)

  const MAX_MB = 25
  const handleFile = (file) => {
    if (!file?.type.startsWith('video/') && !file?.type.startsWith('audio/')) {
      setVideoError('Please upload a video or audio file.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setVideoError(`File is ${(file.size/1024/1024).toFixed(1)} MB — over the 25 MB limit. Please compress it with HandBrake (free) or extract the audio track first.`)
      return
    }
    setVideoError(null)
    setVideoFile(file)
    videoRef.current = file
  }

  const canStart = !!videoFile && !!platform && !!goal && !videoError

  const handleStart = async () => {
    setScreen('processing')
    setStepsDone([])
    setPipelineError(null)
    await run({ videoFile, platform, goal, setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, setScreen })
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>PROMPT CEO</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.primary, marginTop: 4, letterSpacing: -0.5 }}>Edit Studio</div>
        </div>
        <button onClick={onSwitchAdvanced} style={{ fontSize: 11, color: C.ghost, background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>
          Advanced Mode
        </button>
      </div>

      <StepBar current={1} />

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          onClick={() => fileInputRef.current?.click()}
          style={{ borderRadius: 16, padding: '52px 24px', textAlign: 'center', cursor: 'pointer',
            border: `2px dashed ${dragOver ? C.gold : videoFile ? C.green : C.subtle}`,
            background: dragOver ? C.goldGlow : videoFile ? C.greenGlow : C.surface, transition: 'all 0.2s' }}>
          <input ref={fileInputRef} type="file" accept="video/*,audio/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
          {videoFile ? (
            <>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎬</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.green, marginBottom: 4 }}>{videoFile.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{(videoFile.size/1024/1024).toFixed(1)} MB · click to replace</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.5 }}>⬆</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Drop your video here</div>
              <div style={{ fontSize: 12, color: C.muted }}>MP4, MOV, WebM or MP3 audio · max 25 MB</div>
            </>
          )}
        </div>

        {videoError && (
          <div style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #c45a5a44', background: '#c45a5a0a', fontSize: 12, color: '#c45a5a', lineHeight: 1.6 }}>
            ⚠ {videoError}
          </div>
        )}

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Platform</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => setPlatform(p.id)}
                style={{ padding: '9px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${platform === p.id ? C.gold : C.hairline}`,
                  background: platform === p.id ? C.goldGlow : C.surface,
                  color: platform === p.id ? C.gold : C.secondary }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Goal</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GOALS.map(g => (
              <button key={g.id} onClick={() => setGoal(g.id)}
                style={{ padding: '9px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${goal === g.id ? C.blue : C.hairline}`,
                  background: goal === g.id ? C.blueGlow : C.surface,
                  color: goal === g.id ? C.blue : C.secondary }}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleStart} disabled={!canStart}
          style={{ padding: '18px 24px', borderRadius: 12, fontSize: 15, fontWeight: 800, letterSpacing: 0.5, cursor: canStart ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
            border: `1px solid ${canStart ? C.gold : C.hairline}`,
            background: canStart ? C.goldGlow : C.surface,
            color: canStart ? C.gold : C.ghost }}>
          ⚡  Create AI Edit
        </button>
        {!canStart && (
          <div style={{ fontSize: 11, color: C.ghost, textAlign: 'center' }}>
            {!videoFile ? 'Upload a video to get started' : !platform ? 'Select a platform' : 'Select a goal'}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Shared: Step progress bar ────────────────────────────────────────────────
function StepBar({ current }) {
  const steps = ['Upload', 'Review', 'Download']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((label, i) => {
        const num    = i + 1
        const done   = num < current
        const active = num === current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                background: done ? C.green : active ? C.gold : C.hairline,
                color: done || active ? C.void : C.ghost }}>
                {done ? '✓' : num}
              </div>
              <div style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? C.gold : done ? C.green : C.ghost, whiteSpace: 'nowrap' }}>{label}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? C.green : C.hairline, margin: '0 8px', marginBottom: 18, borderRadius: 1 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Screen 2a: Processing ────────────────────────────────────────────────────
function ProcessingScreen({ currentStep, stepsDone, pipelineError, setScreen, setPipelineError }) {
  const progress = Math.round((stepsDone.length / PIPELINE_STEPS.length) * 100)
  const currentLabel = PIPELINE_STEPS.find(s => s.id === currentStep)?.label || 'Working…'

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <StepBar current={2} />
      <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {pipelineError ? (
          <>
            <div style={{ fontSize: 40 }}>⚠</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#c45a5a' }}>Something went wrong</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 360 }}>{pipelineError}</div>
            <button onClick={() => { setPipelineError(null); setScreen('upload') }}
              style={{ padding: '12px 28px', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              ← Try Again
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48 }}>✦</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginBottom: 8 }}>Creating your AI edit…</div>
              <div style={{ fontSize: 14, color: C.muted }}>{currentLabel}</div>
            </div>
            <div style={{ width: '100%', height: 4, background: C.hairline, borderRadius: 2 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: C.gold, borderRadius: 2, transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', textAlign: 'left' }}>
              {PIPELINE_STEPS.map(step => {
                const done   = stepsDone.includes(step.id)
                const active = currentStep === step.id && !done
                return (
                  <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: done || active ? 1 : 0.35 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800,
                      background: done ? C.green : active ? C.gold : C.hairline,
                      color: done || active ? C.void : C.ghost }}>
                      {done ? '✓' : active ? '⟳' : '○'}
                    </div>
                    <div style={{ fontSize: 13, color: done ? C.secondary : active ? C.gold : C.ghost, fontWeight: active ? 700 : 400 }}>
                      {step.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Screen 2b: Review ────────────────────────────────────────────────────────
function ReviewScreen({ pipelineResult, projectId, platform, goal, setScreen, setRenderJob, onSwitchAdvanced }) {
  const [creating, setCreating] = useState(false)
  const [error, setError]       = useState(null)

  const { directorAnalysis, selectedCutPlan, captionTimeline, musicIntelligence, renderPlan } = pipelineResult || {}
  const topTrack = musicIntelligence?.recommendedTracks?.[0]
  const keptSegs = selectedCutPlan?.segments?.filter(s => s.keep) || []
  const totalDur = keptSegs.reduce((n, s) => n + (s.duration || 0), 0)

  const handleCreateVideo = async () => {
    if (!renderPlan) return
    setCreating(true)
    setError(null)
    try {
      const res  = await fetch('/api/edit-studio/render', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, renderPlan }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setRenderJob({ id: data.jobId, status: data.jobStatus, message: data.message, queuedAt: data.queuedAt, exportUrl: data.exportUrl || null, createdAt: new Date().toISOString() })
      setScreen('download')
    } catch (err) {
      setError(err.message)
      setCreating(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>PROMPT CEO</div>
        <button onClick={onSwitchAdvanced} style={{ fontSize: 11, color: C.ghost, background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>Advanced Mode</button>
      </div>
      <StepBar current={2} />
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {directorAnalysis?.directorSummary?.verdict && (
          <div style={{ padding: '20px', borderRadius: 12, border: `1px solid ${C.violet}28`, background: C.violet + '0a' }}>
            <div style={{ fontSize: 10, color: C.violet, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Director</div>
            <div style={{ fontSize: 14, color: C.primary, lineHeight: 1.65, fontStyle: 'italic' }}>"{directorAnalysis.directorSummary.verdict}"</div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Duration',  value: `${Math.round(totalDur * 10) / 10}s`,         color: C.gold  },
            { label: 'Captions',  value: `${captionTimeline?.length || 0} lines`,       color: C.blue  },
            { label: 'Segments',  value: `${keptSegs.length} kept`,                     color: C.green },
          ].map(item => (
            <div key={item.label} style={{ padding: '14px', borderRadius: 9, border: `1px solid ${item.color}22`, background: item.color + '08', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontSize: 9, color: C.ghost, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
            </div>
          ))}
        </div>
        {topTrack && (
          <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.gold}22`, background: C.gold + '08', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 20 }}>🎵</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{topTrack.title}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{topTrack.mood} · {topTrack.bpm} BPM — auto-selected</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginLeft: 'auto' }}>Score {topTrack.fitScore}</div>
          </div>
        )}
        {keptSegs.length > 0 && (
          <div style={{ borderRadius: 9, border: `1px solid ${C.hairline}`, background: C.surface, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${C.hairline}`, fontSize: 10, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Edit Timeline
            </div>
            {keptSegs.map((seg, i) => (
              <div key={seg.id || i} style={{ padding: '10px 14px', borderBottom: i < keptSegs.length - 1 ? `1px solid ${C.hairline}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, padding: '1px 6px', borderRadius: 6, border: `1px solid ${C.gold}44`, background: C.goldGlow }}>
                  {seg.type?.toUpperCase() || 'CUT'}
                </div>
                <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>
                  {seg.start?.toFixed(1)}s → {seg.end?.toFixed(1)}s
                </div>
                <div style={{ fontSize: 12, color: C.primary, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {seg.transcriptText?.slice(0, 60) || seg.reason || ''}
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #c45a5a44', background: '#c45a5a0a', fontSize: 12, color: '#c45a5a' }}>
            ⚠ {error}
          </div>
        )}
        <button onClick={handleCreateVideo} disabled={creating || !renderPlan}
          style={{ padding: '18px 24px', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: 0.5, transition: 'all 0.2s',
            border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
          {creating ? '⟳  Creating video…' : '🎬  Create Final Video'}
        </button>
        <button onClick={() => setScreen('upload')}
          style={{ fontSize: 12, color: C.ghost, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          ← Start over
        </button>
      </div>
    </div>
  )
}

// ─── Screen 3: Download ───────────────────────────────────────────────────────
const STAGE_LABELS = { queued: 'Queued — worker will start shortly', processing: 'Rendering your video…', completed: 'Your video is ready!', failed: 'Render failed' }

function DownloadScreen({ renderJob, setRenderJob, projectId, pipelineResult, onSwitchAdvanced }) {
  const [retrying, setRetrying] = useState(false)

  useEffect(() => {
    const active = renderJob?.status === 'queued' || renderJob?.status === 'processing'
    if (!renderJob?.id || !active) return
    const iv = setInterval(async () => {
      try {
        const res  = await fetch(`/api/edit-studio/render-status?jobId=${renderJob.id}`)
        const data = await res.json()
        if (data.status !== 'success') return
        setRenderJob(prev => ({ ...prev, status: data.jobStatus, exportUrl: data.exportUrl || prev?.exportUrl, renderDetails: data.renderDetails, error: data.errorMessage }))
        if (data.jobStatus === 'completed' || data.jobStatus === 'failed') clearInterval(iv)
      } catch {}
    }, 3000)
    return () => clearInterval(iv)
  }, [renderJob?.id, renderJob?.status])

  const handleRetry = async () => {
    const renderPlan = pipelineResult?.renderPlan
    if (!renderPlan || retrying) return
    setRetrying(true)
    try {
      const res  = await fetch('/api/edit-studio/render', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, renderPlan }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setRenderJob({ id: data.jobId, status: data.jobStatus, message: data.message, createdAt: new Date().toISOString() })
    } catch (err) {
      setRenderJob(prev => ({ ...prev, error: err.message }))
    } finally {
      setRetrying(false)
    }
  }

  const st        = renderJob?.status || 'queued'
  const isDone    = st === 'completed'
  const isFailed  = st === 'failed'
  const exportUrl = renderJob?.exportUrl

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>PROMPT CEO</div>
        <button onClick={onSwitchAdvanced} style={{ fontSize: 11, color: C.ghost, background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>Advanced Mode</button>
      </div>
      <StepBar current={3} />
      <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <div style={{ fontSize: 56 }}>{isDone ? '✓' : isFailed ? '⚠' : '⟳'}</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: isDone ? C.green : isFailed ? '#c45a5a' : C.gold, marginBottom: 8 }}>
            {isDone ? 'Your video is ready' : isFailed ? 'Render failed' : 'Rendering your video…'}
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
            {isDone ? 'Download link expires in 1 hour.' : isFailed ? (renderJob?.error || 'Something went wrong.') : STAGE_LABELS[st]}
          </div>
        </div>
        {!isDone && !isFailed && (
          <div style={{ display: 'flex', gap: 6 }}>
            {['queued', 'processing'].map(stage => (
              <div key={stage} style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 10, textTransform: 'capitalize',
                border: `1px solid ${st === stage ? C.gold + '66' : C.hairline}`,
                background: st === stage ? C.goldGlow : 'none',
                color: st === stage ? C.gold : C.ghost }}>
                {stage}
              </div>
            ))}
            <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 10, textTransform: 'capitalize',
              border: `1px solid ${isDone ? C.green + '66' : C.hairline}`,
              background: isDone ? C.greenGlow : 'none',
              color: isDone ? C.green : C.ghost }}>
              complete
            </div>
          </div>
        )}
        {isDone && exportUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <a href={exportUrl} download target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', padding: '16px 24px', borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: 'none', textAlign: 'center', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
              ⬇ Download MP4
            </a>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigator.clipboard?.writeText(exportUrl).catch(() => {})}
                style={{ flex: 1, padding: '10px', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                Copy Link
              </button>
              <a href={exportUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, padding: '10px', borderRadius: 9, fontSize: 12, fontWeight: 700, textDecoration: 'none', textAlign: 'center', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
                Open ↗
              </a>
            </div>
          </div>
        )}
        {isFailed && (
          <button onClick={handleRetry} disabled={retrying}
            style={{ padding: '12px 28px', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            {retrying ? '⟳ Retrying…' : '↺ Retry Render'}
          </button>
        )}
        {(isDone || isFailed) && (
          <a href="/edit-studio" style={{ fontSize: 12, color: C.ghost, textDecoration: 'none' }}>+ Create another video</a>
        )}
      </div>
    </div>
  )
}

export default function SimpleModeWizard({ onSwitchAdvanced }) {
  const [screen, setScreen]         = useState('upload')
  const [platform, setPlatform]     = useState(null)
  const [goal, setGoal]             = useState(null)
  const [videoFile, setVideoFile]   = useState(null)
  const [videoError, setVideoError] = useState(null)
  const videoRef                    = useRef(null)
  const fileInputRef                = useRef(null)

  const [projectId,      setProjectId]      = useState(null)
  const [pipelineResult, setPipelineResult] = useState(null)
  const [renderJob,      setRenderJob]      = useState(null)

  const [currentStep,  setCurrentStep]  = useState(null)
  const [stepsDone,    setStepsDone]    = useState([])
  const [pipelineError, setPipelineError] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      {screen === 'upload'     && <UploadScreen     {...{ platform, setPlatform, goal, setGoal, videoFile, setVideoFile, videoError, setVideoError, videoRef, fileInputRef, setScreen, setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, onSwitchAdvanced }} />}
      {screen === 'processing' && <ProcessingScreen {...{ currentStep, stepsDone, pipelineError, setScreen, setPipelineError }} />}
      {screen === 'review'     && <ReviewScreen     {...{ pipelineResult, projectId, platform, goal, setScreen, setRenderJob, onSwitchAdvanced }} />}
      {screen === 'download'   && <DownloadScreen   {...{ renderJob, setRenderJob, projectId, pipelineResult, onSwitchAdvanced }} />}
    </div>
  )
}
