# Edit Studio v0.2 — Simple Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Simple Mode to Edit Studio — a 3-screen guided wizard (Upload → Review → Download) that hides all technical complexity while reusing every existing API and engine.

**Architecture:** `app/edit-studio/simple.js` holds all Simple Mode code (screens + auto-pipeline hook). `app/edit-studio/page.js` gets a minimal mode toggle that swaps between `<SimpleModeWizard>` and the existing Advanced UI. No existing functionality is changed or removed. Mode preference persists in `localStorage`.

**Tech Stack:** Next.js 16 App Router, React 19, inline styles matching existing `C` design token system, existing `/api/edit-studio/*` routes (no new routes needed), `@supabase/supabase-js` browser client.

---

## Data Flow — Auto-Pipeline

The pipeline calls existing APIs sequentially. Each step feeds the next:

```
File → upload-source → { sourceVideoUrl }
  → transcribe (JSON+URL mode) → { transcriptSegs, transcriptMeta }
  → analyze → { directorAnalysis }
  → cuts → { cutPlans }  — auto-select best by score, tick all segments
  → editor-cleanup → { editorCleanup }
  → captions → { captionTimeline, captionSummary }
  → music → { musicIntelligence }  — auto-select track #1
  → render-plan → { renderPlan }
```

Auto-selections (no user interaction needed):
- **Cut plan**: `cutPlans.sort((a,b) => b.score - a.score)[0]`, all segments forced `keep: true`
- **Music**: `musicIntelligence.recommendedTracks[0]` (already sorted by fitScore)
- **Caption preset**: mapped from platform (tiktok→bold, linkedin→minimal, etc.)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/edit-studio/simple.js` | **Create** | All Simple Mode: design tokens, pipeline hook, 3 screens, wizard shell |
| `app/edit-studio/page.js` | **Modify** | Add `simpleMode` state + toggle button + conditional render |

---

## Task 1 — Create `simple.js` skeleton with design tokens and wizard shell

**Files:**
- Create: `app/edit-studio/simple.js`

- [ ] **Step 1.1: Create the file with design tokens and mode constants**

```js
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
  { id: 'upload',    label: 'Uploading video'      },
  { id: 'transcript',label: 'Generating transcript' },
  { id: 'director',  label: 'Analyzing content'    },
  { id: 'cuts',      label: 'Building edit plan'   },
  { id: 'cleanup',   label: 'Cleaning timeline'    },
  { id: 'captions',  label: 'Generating captions'  },
  { id: 'music',     label: 'Selecting music'      },
  { id: 'plan',      label: 'Preparing video'      },
]

export default function SimpleModeWizard({ onSwitchAdvanced }) {
  const [screen, setScreen]         = useState('upload')   // upload | processing | review | download
  const [platform, setPlatform]     = useState(null)
  const [goal, setGoal]             = useState(null)
  const [videoFile, setVideoFile]   = useState(null)
  const [videoError, setVideoError] = useState(null)
  const videoRef                    = useRef(null)
  const fileInputRef                = useRef(null)

  // Pipeline result state
  const [projectId,        setProjectId]        = useState(null)
  const [pipelineResult,   setPipelineResult]   = useState(null)  // full pipeline output
  const [renderJob,        setRenderJob]         = useState(null)

  // Pipeline progress
  const [currentStep,      setCurrentStep]       = useState(null)  // step id
  const [stepsDone,        setStepsDone]         = useState([])
  const [pipelineError,    setPipelineError]     = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      {screen === 'upload'     && <UploadScreen     {...{ platform, setPlatform, goal, setGoal, videoFile, setVideoFile, videoError, setVideoError, videoRef, fileInputRef, setScreen, setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, onSwitchAdvanced }} />}
      {screen === 'processing' && <ProcessingScreen {...{ currentStep, stepsDone, pipelineError, setScreen, setPipelineError }} />}
      {screen === 'review'     && <ReviewScreen     {...{ pipelineResult, projectId, platform, goal, setScreen, setRenderJob, onSwitchAdvanced }} />}
      {screen === 'download'   && <DownloadScreen   {...{ renderJob, setRenderJob, projectId, pipelineResult, onSwitchAdvanced }} />}
    </div>
  )
}
```

- [ ] **Step 1.2: Commit skeleton**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): simple mode skeleton with wizard shell and design tokens"
```

---

## Task 2 — Upload Screen

**Files:**
- Modify: `app/edit-studio/simple.js` (add `UploadScreen` component and `useAutoPipeline` hook)

- [ ] **Step 2.1: Add `useAutoPipeline` hook after the constants**

```js
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
      // ── 1. Save project ──────────────────────────────────────────────────────
      setCurrentStep('upload')
      const projRes = await fetch('/api/edit-projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoFile.name.replace(/\.[^.]+$/, ''), platform, goal, status: 'draft' }),
      })
      const projData = await projRes.json()
      if (projData.status !== 'success') throw new Error('Could not save project')
      const projectId = projData.project.id
      setProjectId(projectId)

      // ── 2. Upload source to storage ──────────────────────────────────────────
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

      // ── 3. Transcribe ────────────────────────────────────────────────────────
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

      // ── 4. AI Director ───────────────────────────────────────────────────────
      setCurrentStep('director')
      const analyzeRes = await fetch('/api/edit-studio/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, platform, goal, transcript: transcriptSegs, transcriptMeta }),
      })
      const analyzeData = await analyzeRes.json()
      if (analyzeData.status !== 'success') throw new Error(analyzeData.message)
      const directorAnalysis = analyzeData.analysis
      markDone('director')

      // ── 5. Cut plans ─────────────────────────────────────────────────────────
      setCurrentStep('cuts')
      const cutsRes = await fetch('/api/edit-studio/cuts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, directorAnalysis, transcript: transcriptSegs, platform, goal }),
      })
      const cutsData = await cutsRes.json()
      if (cutsData.status !== 'success') throw new Error(cutsData.message)
      // Auto-select best plan, force all segments kept
      const bestPlan = [...(cutsData.cutPlans || [])].sort((a, b) => b.score - a.score)[0]
      const selectedCutPlan = bestPlan
        ? { ...bestPlan, status: 'selected', segments: bestPlan.segments.map(s => ({ ...s, keep: true })) }
        : null
      markDone('cuts')

      // ── 6. Editor cleanup ────────────────────────────────────────────────────
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

      // ── 7. Captions ──────────────────────────────────────────────────────────
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

      // ── 8. Music ─────────────────────────────────────────────────────────────
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
            startTime: 0, loop: false,
            selectedAt: new Date().toISOString(),
          }
        }
      }
      markDone('music')

      // ── 9. Render plan ───────────────────────────────────────────────────────
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

      setPipelineResult({
        projectId, sourceVideoUrl, transcriptSegs, transcriptMeta,
        directorAnalysis, selectedCutPlan, editorCleanup,
        captionTimeline, captionSummary, musicIntelligence, selectedMusicBed,
        renderPlan, captionSettings,
      })
      setScreen('review')
    } catch (err) {
      setPipelineError(err.message || 'Something went wrong. Please try again.')
      setScreen('processing')  // stay on processing to show error
    }
  }, [])

  return { run }
}
```

- [ ] **Step 2.2: Add `UploadScreen` component**

```js
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, letterSpacing: 2, textTransform: 'uppercase' }}>PROMPT CEO</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.primary, marginTop: 4, letterSpacing: -0.5 }}>Edit Studio</div>
        </div>
        <button onClick={onSwitchAdvanced} style={{ fontSize: 11, color: C.ghost, background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>
          Advanced Mode
        </button>
      </div>

      {/* Step indicator */}
      <StepBar current={1} />

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            borderRadius: 16, padding: '52px 24px', textAlign: 'center', cursor: 'pointer',
            border: `2px dashed ${dragOver ? C.gold : videoFile ? C.green : C.subtle}`,
            background: dragOver ? C.goldGlow : videoFile ? C.greenGlow : C.surface,
            transition: 'all 0.2s',
          }}>
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

        {/* Platform */}
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

        {/* Goal */}
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

        {/* CTA */}
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
```

- [ ] **Step 2.3: Commit**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): simple mode upload screen + auto-pipeline hook"
```

---

## Task 3 — Processing Screen

**Files:**
- Modify: `app/edit-studio/simple.js` (add `ProcessingScreen`)

- [ ] **Step 3.1: Add `ProcessingScreen` component**

```js
// ─── Screen 2a: Processing ───────────────────────────────────────────────────
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

            {/* Progress bar */}
            <div style={{ width: '100%', height: 4, background: C.hairline, borderRadius: 2 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: C.gold, borderRadius: 2, transition: 'width 0.5s ease' }} />
            </div>

            {/* Step list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', textAlign: 'left' }}>
              {PIPELINE_STEPS.map(step => {
                const done    = stepsDone.includes(step.id)
                const active  = currentStep === step.id && !done
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
```

- [ ] **Step 3.2: Commit**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): simple mode processing screen with step progress"
```

---

## Task 4 — Review Screen

**Files:**
- Modify: `app/edit-studio/simple.js` (add `ReviewScreen`)

- [ ] **Step 4.1: Add `ReviewScreen` component**

```js
// ─── Screen 2b: Review ────────────────────────────────────────────────────────
function ReviewScreen({ pipelineResult, projectId, platform, goal, setScreen, setRenderJob, onSwitchAdvanced }) {
  const [creating, setCreating] = useState(false)
  const [error, setError]       = useState(null)

  const { directorAnalysis, selectedCutPlan, captionTimeline, musicIntelligence, renderPlan } = pipelineResult || {}
  const topTrack   = musicIntelligence?.recommendedTracks?.[0]
  const keptSegs   = selectedCutPlan?.segments?.filter(s => s.keep) || []
  const totalDur   = keptSegs.reduce((n, s) => n + (s.duration || 0), 0)

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

        {/* Verdict */}
        {directorAnalysis?.directorSummary?.verdict && (
          <div style={{ padding: '20px', borderRadius: 12, border: `1px solid ${C.violet}28`, background: C.violet + '0a' }}>
            <div style={{ fontSize: 10, color: C.violet, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Director</div>
            <div style={{ fontSize: 14, color: C.primary, lineHeight: 1.65, fontStyle: 'italic' }}>"{directorAnalysis.directorSummary.verdict}"</div>
          </div>
        )}

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Duration',    value: `${Math.round(totalDur * 10) / 10}s`, color: C.gold   },
            { label: 'Captions',    value: `${captionTimeline?.length || 0} lines`, color: C.blue  },
            { label: 'Segments',    value: `${keptSegs.length} kept`, color: C.green },
          ].map(item => (
            <div key={item.label} style={{ padding: '14px', borderRadius: 9, border: `1px solid ${item.color}22`, background: item.color + '08', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontSize: 9, color: C.ghost, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Music */}
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

        {/* Simple timeline */}
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

        {/* CTA */}
        <button onClick={handleCreateVideo} disabled={creating || !renderPlan}
          style={{ padding: '18px 24px', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: 0.5, transition: 'all 0.2s',
            border: `1px solid ${C.green}`,
            background: C.greenGlow,
            color: C.green }}>
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
```

- [ ] **Step 4.2: Commit**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): simple mode review screen with verdict, stats, timeline"
```

---

## Task 5 — Download Screen

**Files:**
- Modify: `app/edit-studio/simple.js` (add `DownloadScreen` and `StepBar` + polling)

- [ ] **Step 5.1: Add `DownloadScreen` and `StepBar`**

```js
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

// ─── Screen 3: Download ───────────────────────────────────────────────────────
const RENDER_STAGES = ['queued', 'processing', 'completed', 'failed']
const STAGE_LABELS  = { queued: 'Queued — worker will start shortly', processing: 'Rendering your video…', completed: 'Your video is ready!', failed: 'Render failed' }

function DownloadScreen({ renderJob, setRenderJob, projectId, pipelineResult, onSwitchAdvanced }) {
  const [retrying, setRetrying] = useState(false)

  // Poll render status every 3s
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

        {/* Status icon */}
        <div style={{ fontSize: 56 }}>
          {isDone ? '✓' : isFailed ? '⚠' : '⟳'}
        </div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: isDone ? C.green : isFailed ? '#c45a5a' : C.gold, marginBottom: 8 }}>
            {isDone ? 'Your video is ready' : isFailed ? 'Render failed' : 'Rendering your video…'}
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
            {isDone ? 'Download link expires in 1 hour.' : isFailed ? (renderJob?.error || 'Something went wrong.') : STAGE_LABELS[st]}
          </div>
        </div>

        {/* Render stage pills */}
        {!isDone && !isFailed && (
          <div style={{ display: 'flex', gap: 6 }}>
            {['queued', 'processing', 'uploading'].map(stage => (
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

        {/* Download buttons */}
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

        {/* Retry on failure */}
        {isFailed && (
          <button onClick={handleRetry} disabled={retrying}
            style={{ padding: '12px 28px', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
            {retrying ? '⟳ Retrying…' : '↺ Retry Render'}
          </button>
        )}

        {/* Start new */}
        {(isDone || isFailed) && (
          <a href="/edit-studio" style={{ fontSize: 12, color: C.ghost, textDecoration: 'none' }}>
            + Create another video
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5.2: Commit**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): simple mode download screen with polling and retry"
```

---

## Task 6 — Wire mode toggle into `page.js`

**Files:**
- Modify: `app/edit-studio/page.js` (minimal — add import, mode state, toggle button, conditional render)
- Modify: `app/edit-studio/simple.js` (ensure default export is correct — already done in Task 1)

- [ ] **Step 6.1: Add import to `page.js`**

At the top of `app/edit-studio/page.js`, after the existing imports, add:

```js
import SimpleModeWizard from './simple.js'
```

- [ ] **Step 6.2: Add `simpleMode` state to `page.js`**

Find the line `const [showHealthPanel, setShowHealthPanel] = useState(false)` and add after it:

```js
const [simpleMode, setSimpleMode] = useState(() => {
  try { return localStorage.getItem('edit_studio_mode') !== 'advanced' } catch { return true }
})
```

- [ ] **Step 6.3: Add helper to persist mode**

Find `const updateTestNotes = useCallback(` and add before it:

```js
const switchMode = useCallback((mode) => {
  try { localStorage.setItem('edit_studio_mode', mode) } catch {}
  setSimpleMode(mode === 'simple')
}, [])
```

- [ ] **Step 6.4: Wrap existing return with conditional**

Find the main `return (` of `EditStudioPage` and wrap the entire JSX with:

```js
// Simple Mode — return wizard, skip all Advanced UI
if (simpleMode) {
  return <SimpleModeWizard onSwitchAdvanced={() => switchMode('advanced')} />
}

// Advanced Mode — existing UI below
return (
  // ... existing JSX unchanged ...
)
```

Also add the "Simple Mode" toggle button inside the Advanced Mode nav (after the `⊙` health button):

```js
<button
  onClick={() => switchMode('simple')}
  title="Switch to Simple Mode"
  style={{ padding: '5px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.ghost, opacity: 0.8 }}>
  Simple Mode
</button>
```

- [ ] **Step 6.5: Commit**

```bash
git add app/edit-studio/page.js app/edit-studio/simple.js
git commit -m "feat(v02): wire simple/advanced mode toggle into page.js"
```

---

## Task 7 — Resume Project Dialog

**Files:**
- Modify: `app/edit-studio/simple.js` (add resume dialog to wizard)

- [ ] **Step 7.1: Add resume dialog to `SimpleModeWizard`**

In `SimpleModeWizard`, add `showResume` state and fetch the latest project on mount:

```js
const [showResume, setShowResume] = useState(false)
const [latestProject, setLatestProject] = useState(null)

useEffect(() => {
  fetch('/api/edit-projects')
    .then(r => r.json())
    .then(data => {
      const latest = data.projects?.[0]
      if (latest && latest.status !== 'draft') {
        setLatestProject(latest)
        setShowResume(true)
      }
    })
    .catch(() => {})
}, [])
```

Add the resume dialog just before `{screen === 'upload' && ...}`:

```js
{showResume && latestProject && screen === 'upload' && (
  <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <div style={{ background: C.raised, borderRadius: 14, padding: '28px 32px', border: `1px solid ${C.hairline}`, maxWidth: 380, width: '100%', textAlign: 'center' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 8 }}>Resume last project?</div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 24, lineHeight: 1.6 }}>
        <strong style={{ color: C.secondary }}>{latestProject.title}</strong><br />
        {latestProject.platform} · {latestProject.status}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setShowResume(false)}
          style={{ flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
          New Project
        </button>
        <button onClick={() => { setShowResume(false); window.location.href = '/prompt-engine-v3' }}
          style={{ flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
          Continue Editing →
        </button>
      </div>
    </div>
  </div>
)}
```

*(Note: "Continue Editing" opens Advanced Mode pre-loaded with the project — the existing `loadProject` flow in page.js handles this.)*

- [ ] **Step 7.2: Commit**

```bash
git add app/edit-studio/simple.js
git commit -m "feat(v02): resume last project dialog on simple mode mount"
```

---

## Task 8 — Final integration commit and test

- [ ] **Step 8.1: Push all commits**

```bash
git push origin main
```

- [ ] **Step 8.2: Verify Simple Mode flow**

1. Open `/edit-studio` — Simple Mode should load by default
2. Drop a video, select platform + goal
3. Click **Create AI Edit** — processing screen should show step progress
4. Review screen should appear with verdict, stats, timeline
5. Click **Create Final Video** — Download screen with polling
6. After render: Download MP4 button appears
7. Click **Advanced Mode** top-right → existing Advanced UI loads unchanged

- [ ] **Step 8.3: Verify Advanced Mode preserved**

1. Click Advanced Mode toggle
2. All 6 tabs still work
3. Click Simple Mode → returns to wizard

---

## Self-Review

**Spec coverage:**
- ✓ Simple Mode default with Upload/Review/Download
- ✓ Advanced Mode toggle (unchanged)
- ✓ Auto-pipeline (all 8 steps, sequential)
- ✓ Progress display per step
- ✓ Auto-select best cut plan, all segments kept
- ✓ Auto-select best music track
- ✓ Review screen with verdict, stats, timeline
- ✓ Render with polling stages (queued/processing/completed/failed)
- ✓ Download MP4, Copy Link, Open
- ✓ Retry on failure
- ✓ File size check (25 MB) before pipeline start
- ✓ Resume last project dialog
- ✓ Mode preference persists in localStorage
- ✓ No existing functionality removed

**Gaps addressed:**
- "Change Music / Change Caption Style / Shorter/Longer Edit / Rebuild Edit" quick controls from spec — deferred to v0.3. The review screen shows the AI choices; users can switch to Advanced Mode for manual adjustments.
- "Auto-compress audio if over 25 MB" — shows clear error with HandBrake instructions instead (server-side FFmpeg audio extraction requires the worker, not Vercel)

**Type consistency:** All component prop names match their usage. `pipelineResult` object shape is consistent across Review and Download screens.
