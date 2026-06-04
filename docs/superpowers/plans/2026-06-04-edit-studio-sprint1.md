# Edit Studio Sprint 1 — Production Unblocks

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the four real production blockers found during the Sprint 1 audit — music never renders, inline render crashes silently, Advanced Mode accepts files it cannot transcribe, and production renders queue forever with nothing processing them.

**Architecture:** All fixes are surgical — no new architecture, no redesigns. Three existing files get small additions, one new script is created. The render engine (`lib/edit-studio/renderEngine.js`) and captions API are already complete and are not touched.

**Tech Stack:** Next.js 14 App Router, Supabase admin client, Node.js `child_process` + `fs` (already used in renderEngine.js), existing render engine exports.

---

## Pre-Sprint Audit Corrections

The original audit was wrong about three items. Do NOT fix these — they are already working:
- **Simple Mode** — already wired at `app/edit-studio/page.js:3075`
- **Captions API** — fully implemented at `app/api/edit-studio/captions/route.js` (252 lines, real word-split + ASS preset builder)
- **File size validation** — already in Simple Mode's `UploadScreen` at `app/edit-studio/simple.js:200-207`

---

## File Map

| Action | File | Change |
|---|---|---|
| Modify | `app/edit-studio/page.js` | Add `fileUrl` to `selectedMusicBed` in `handleSelectMusicBed`; add 25 MB guard in `handleFileSelect` |
| Modify | `app/edit-studio/simple.js` | Add `fileUrl` to music bed in `useAutoPipeline` |
| Modify | `app/api/edit-studio/render-plan/route.js` | Pass `fileUrl` through to the render plan `music` object |
| Modify | `app/api/edit-studio/render/route.js` | Extract `renderDetails` from `executeRenderJob` result |
| Create | `scripts/render-worker.js` | Standalone Node.js worker that polls `edit_render_jobs` and executes renders |

---

## Task 1: Fix Music URL Propagation

**The bug:** `resolveMusicSource()` in `renderEngine.js` looks for `selectedMusicBed?.fileUrl || selectedMusicBed?.trackUrl`. Neither field is ever set — `handleSelectMusicBed` only stores `trackId`. So every render silently skips music with `"No music file URL in selected music bed"`.

**Files:**
- Modify: `app/edit-studio/page.js` (around line 688 — `handleSelectMusicBed`)
- Modify: `app/edit-studio/simple.js` (around line 156 — music bed build in `useAutoPipeline`)
- Modify: `app/api/edit-studio/render-plan/route.js` (around line 131 — `music` object)

- [ ] **Step 1: Add `fileUrl` to `handleSelectMusicBed` in `page.js`**

Find `handleSelectMusicBed` (line ~688). The current `bed` object ends with `loop: timingPlan?.loop ?? false`. Add `fileUrl` so the render engine can download the track:

```js
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
      fileUrl:     track.preview_file_url || null,
    }
    setSelectedMusicBed(bed)
    setSelectedMusic(track)
    if (projectId) {
      fetch('/api/music-studio/log-usage', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ trackId: track.id, projectId, projectType: 'edit_studio', action: 'selected' }),
      }).catch(() => {})
    }
    isDirty.current = true
    saveProject(true)
  }, [saveProject])
```

- [ ] **Step 2: Add `fileUrl` to the music bed in `simple.js` `useAutoPipeline`**

Find the music bed build inside `useAutoPipeline` (around line 157). Current code:
```js
selectedMusicBed = {
  trackId: topTrack.id, title: topTrack.title, mood: topTrack.mood, bpm: topTrack.bpm,
  volume: musicData.timingPlan?.targetVolume ?? 0.6,
  fadeIn: musicData.timingPlan?.introFade ?? 1.0,
  fadeOut: musicData.timingPlan?.outroFade ?? 2.0,
  startTime: 0, loop: false, selectedAt: new Date().toISOString(),
}
```

Replace with (add `fileUrl`):
```js
selectedMusicBed = {
  trackId:    topTrack.id,
  title:      topTrack.title,
  mood:       topTrack.mood,
  bpm:        topTrack.bpm,
  volume:     musicData.timingPlan?.targetVolume ?? 0.6,
  fadeIn:     musicData.timingPlan?.introFade    ?? 1.0,
  fadeOut:    musicData.timingPlan?.outroFade    ?? 2.0,
  startTime:  0,
  loop:       false,
  selectedAt: new Date().toISOString(),
  fileUrl:    topTrack.preview_file_url || null,
}
```

- [ ] **Step 3: Pass `fileUrl` through in `render-plan/route.js`**

Find the `music` object build (around line 131). Current:
```js
music: selectedMusicBed?.trackId ? {
  trackId:   selectedMusicBed.trackId,
  title:     selectedMusicBed.title,
  volume:    selectedMusicBed.volume    ?? 0.6,
  fadeIn:    selectedMusicBed.fadeIn    ?? 1.0,
  fadeOut:   selectedMusicBed.fadeOut   ?? 2.0,
  startTime: selectedMusicBed.startTime ?? 0,
  loop:      selectedMusicBed.loop      ?? false,
} : null,
```

Replace with (add `fileUrl` and `trackUrl`):
```js
music: selectedMusicBed?.trackId ? {
  trackId:   selectedMusicBed.trackId,
  title:     selectedMusicBed.title,
  volume:    selectedMusicBed.volume    ?? 0.6,
  fadeIn:    selectedMusicBed.fadeIn    ?? 1.0,
  fadeOut:   selectedMusicBed.fadeOut   ?? 2.0,
  startTime: selectedMusicBed.startTime ?? 0,
  loop:      selectedMusicBed.loop      ?? false,
  fileUrl:   selectedMusicBed.fileUrl   || null,
  trackUrl:  selectedMusicBed.trackUrl  || null,
} : null,
```

- [ ] **Step 4: Verify the change by checking the data flow**

Confirm by grepping:
```bash
grep -n "fileUrl" app/edit-studio/page.js app/edit-studio/simple.js app/api/edit-studio/render-plan/route.js
```
Expected output: 3 lines, one per file.

Also grep the render engine to confirm what it looks for:
```bash
grep -n "fileUrl\|trackUrl" lib/edit-studio/renderEngine.js
```
Expected: `const url = selectedMusicBed?.fileUrl || selectedMusicBed?.trackUrl` — confirms our field names match.

- [ ] **Step 5: Commit**

```bash
git add app/edit-studio/page.js app/edit-studio/simple.js app/api/edit-studio/render-plan/route.js
git commit -m "fix: propagate music track fileUrl through render pipeline so music renders"
```

---

## Task 2: Fix renderDetails Undefined Bug

**The bug:** `app/api/edit-studio/render/route.js` line ~174 does `const result = await executeRenderJob(...)` and `exportUrl = result.exportUrl` — but then line ~194 references `renderDetails` which was never extracted from `result`. In JavaScript `{ ...undefined }` is `{}` so it doesn't crash, but the render details (captionsRendered, musicRendered, warnings) are lost from the job record and logs.

**Files:**
- Modify: `app/api/edit-studio/render/route.js` (around line 173)

- [ ] **Step 1: Extract `renderDetails` from the `executeRenderJob` result**

Find this block (around line 173):
```js
    let exportUrl
    try {
      const result = await executeRenderJob(renderPlan, jobId, user.id, admin)
      exportUrl    = result.exportUrl
    } catch (renderErr) {
```

Replace with:
```js
    let exportUrl
    let renderDetails = {}
    try {
      const result = await executeRenderJob(renderPlan, jobId, user.id, admin)
      exportUrl     = result.exportUrl
      renderDetails = result.renderDetails || {}
    } catch (renderErr) {
```

- [ ] **Step 2: Verify the variable is now in scope where it's used**

```bash
grep -n "renderDetails" app/api/edit-studio/render/route.js
```
Expected: 4 lines — the `let renderDetails = {}` declaration, the assignment from result, and the two uses at lines ~194 and ~213.

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/render/route.js
git commit -m "fix: extract renderDetails from executeRenderJob result so render metadata is saved"
```

---

## Task 3: Add 25 MB Guard to Advanced Mode Upload

**The gap:** Simple Mode's `UploadScreen` (`simple.js:200-207`) correctly blocks files over 25 MB with a clear message. Advanced Mode's `handleFileSelect` (`page.js:342`) accepts any size, and users only discover the limit when transcription fails with a cryptic error.

**Files:**
- Modify: `app/edit-studio/page.js` (around line 342 — `handleFileSelect`)

- [ ] **Step 1: Add size check in `handleFileSelect`**

Find `handleFileSelect` (around line 342). Current:
```js
  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('video/')) return
    videoFileRef.current = file
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
```

Replace with:
```js
  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('video/')) return
    const MAX_MB = 25
    if (file.size > MAX_MB * 1024 * 1024) {
      setSourceUploadError(
        `File is ${(file.size / 1024 / 1024).toFixed(1)} MB — over the ${MAX_MB} MB transcription limit. ` +
        `Compress it with HandBrake (free) or extract audio only before uploading.`
      )
      return
    }
    setSourceUploadError(null)
    videoFileRef.current = file
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
```

Note: `setSourceUploadError` already exists in the component (line ~212 in state declarations) and is already rendered in the Upload panel to show source upload errors. This reuses the existing error display with no new UI needed.

- [ ] **Step 2: Verify the error state is rendered in the Upload panel**

```bash
grep -n "sourceUploadError" app/edit-studio/page.js | head -10
```
Expected: at least 3 lines — `useState`, the set call in `handleUploadSource`, and a render location in the upload panel. Confirm the upload panel shows `sourceUploadError` so the message will be visible.

- [ ] **Step 3: Commit**

```bash
git add app/edit-studio/page.js
git commit -m "fix: block files over 25 MB in Advanced Mode upload before transcription fails"
```

---

## Task 4: Write Render Worker Script

**The problem:** All production renders stay `queued` forever because there is no process polling `edit_render_jobs` and executing them. The render engine (`lib/edit-studio/renderEngine.js`) is fully implemented and ready — it just needs a process to invoke it.

**This script does NOT deploy infrastructure.** It is a Node.js script that the user runs on any server with FFmpeg installed. It can be run manually (`node scripts/render-worker.js`) or as a persistent service via PM2/systemd/Railway/Fly.io.

**Files:**
- Create: `scripts/render-worker.js`

- [ ] **Step 1: Create `scripts/render-worker.js`**

```js
#!/usr/bin/env node
/**
 * PromptCEO Edit Studio — Render Worker
 *
 * Polls edit_render_jobs for queued jobs and executes them using the render engine.
 * Requires: FFmpeg on PATH, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY env vars.
 *
 * Usage:
 *   node scripts/render-worker.js           # runs once per 5s indefinitely
 *   POLL_INTERVAL_MS=10000 node scripts/render-worker.js
 *
 * Deploy:
 *   Railway, Fly.io, Render.com, or any Linux server with FFmpeg.
 *   PM2: pm2 start scripts/render-worker.js --name edit-studio-worker
 */

import { createClient } from '@supabase/supabase-js'
import { execFile }      from 'child_process'
import { promisify }     from 'util'
import fs                from 'fs'
import path              from 'path'
import os                from 'os'

// ─── Env + config ─────────────────────────────────────────────────────────────

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY      = process.env.SUPABASE_SERVICE_ROLE_KEY
const POLL_INTERVAL_MS  = parseInt(process.env.POLL_INTERVAL_MS || '5000', 10)
const MAX_CONCURRENT    = parseInt(process.env.MAX_CONCURRENT   || '1',    10)

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[worker] NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
  process.exit(1)
}

const admin          = createClient(SUPABASE_URL, SUPABASE_KEY)
const execFileAsync  = promisify(execFile)
let   activeJobs     = 0

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(level, jobId, msg, data = {}) {
  const ts  = new Date().toISOString()
  const ctx = jobId ? ` [${jobId.slice(0, 8)}]` : ''
  console.log(`${ts} [${level}]${ctx} ${msg}`, Object.keys(data).length ? data : '')
}

async function updateJob(jobId, status, extra = {}) {
  const payload = { status, updated_at: new Date().toISOString(), ...extra }
  if (status === 'processing') payload.processing_started_at = new Date().toISOString()
  if (status === 'failed')     payload.failed_at             = new Date().toISOString()
  await admin.from('edit_render_jobs').update(payload).eq('id', jobId)
}

async function appendJobToProject(projectId, userId, jobSummary) {
  try {
    const { data } = await admin.from('edit_projects').select('render_jobs').eq('id', projectId).eq('user_id', userId).single()
    const existing = data?.render_jobs || []
    const deduped  = existing.filter(j => j.id !== jobSummary.id)
    await admin.from('edit_projects').update({ render_jobs: [...deduped, jobSummary] }).eq('id', projectId).eq('user_id', userId)
  } catch { /* non-fatal */ }
}

// ─── FFmpeg availability check ────────────────────────────────────────────────

async function checkFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version'])
    return true
  } catch {
    return false
  }
}

// ─── Core render functions (duplicated from renderEngine.js for worker isolation) ──

function prepareWorkDir(jobId) {
  const dir = path.join(os.tmpdir(), 'edit-studio-renders', jobId)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

async function downloadFile(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status} from ${url}`)
  fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()))
  return destPath
}

function writeCaptionAss(captionTimeline, captionSettings, workDir) {
  if (!captionTimeline?.length) return null

  const presets = {
    clean:    { font: 'Arial',       size: 64, bold: 0,  color: '&H00FFFFFF', outline: 2, shadow: 1, uppercase: false },
    bold:     { font: 'Arial Black', size: 80, bold: -1, color: '&H00FFFFFF', outline: 3, shadow: 2, uppercase: true  },
    cinematic:{ font: 'Georgia',     size: 56, bold: 0,  color: '&H00FFFFFF', outline: 1, shadow: 0, uppercase: false },
    minimal:  { font: 'Arial',       size: 48, bold: 0,  color: '&H00FFFFFF', outline: 1, shadow: 0, uppercase: false },
    pop:      { font: 'Arial Black', size: 96, bold: -1, color: '&H0000FFFF', outline: 4, shadow: 2, uppercase: true  },
  }
  const p         = presets[captionSettings?.style] || presets.clean
  const posMap    = { bottom: 2, center: 5, top: 8 }
  const alignment = posMap[captionSettings?.position] || 2
  const marginV   = alignment === 5 ? 0 : 80
  const [pw, ph]  = (captionSettings?.resolution || '1080x1920').split('x')

  const fmtTime = s => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60)
    const sc = Math.floor(s % 60),  cs = Math.round((s % 1) * 100)
    return `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
  }
  const escape = t => (t || '').replace(/\\/g,'\\\\').replace(/\{/g,'\\{').replace(/\r?\n/g,'\\N')

  const styleLine = ['Default', p.font, p.size, p.color, '&H000000FF', '&H00000000', '&H80000000',
    p.bold, 0, 0, 0, 100, 100, 0, 0, 1, p.outline, p.shadow, alignment, 60, 60, marginV, 1].join(',')

  const dialogues = captionTimeline.map(cap => {
    let text = escape(cap.text || '')
    if (p.uppercase) text = text.toUpperCase()
    return `Dialogue: 0,${fmtTime(cap.start)},${fmtTime(cap.end)},Default,,0,0,0,,${text}`
  })

  const content = [
    '[Script Info]', 'ScriptType: v4.00+', `PlayResX: ${pw}`, `PlayResY: ${ph}`, 'Timer: 100.0000', '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: ${styleLine}`, '', '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    ...dialogues,
  ].join('\n')

  const assPath = path.join(workDir, 'captions.ass')
  fs.writeFileSync(assPath, content, 'utf8')
  return assPath
}

function buildFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath) {
  const segs   = (plan.segments || []).filter(s => (s.duration ?? (s.end - s.start)) > 0)
  if (!segs.length) throw new Error('No segments with duration > 0')

  const [w, h]  = (plan.resolution || '1080x1920').split('x')
  const crf     = plan.quality === 'high' ? '18' : plan.quality === 'web' ? '26' : '23'
  const inputs  = ['-i', inputPath]
  if (musicPath) inputs.push('-i', musicPath)

  const filters = [], vParts = [], aParts = []
  segs.forEach((seg, i) => {
    filters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    filters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    vParts.push(`[v${i}]`); aParts.push(`[a${i}]`)
  })

  filters.push(`${vParts.join('')}${aParts.join('')}concat=n=${segs.length}:v=1:a=1[catv][cata]`)
  filters.push(`[catv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[scaled]`)

  let finalVideo = '[scaled]'
  if (captionPath) {
    let safePath = captionPath.replace(/\\/g, '/').replace(/^([A-Za-z]):/, '$1\\:').replace(/'/g, "\\'")
    filters.push(`[scaled]subtitles='${safePath}'[withsubs]`)
    finalVideo = '[withsubs]'
  }

  let finalAudio = '[cata]'
  if (musicPath) {
    const music = plan.music || {}
    const vol   = music.volume ?? 0.6, fadeIn = music.fadeIn ?? 1.0, fadeOut = music.fadeOut ?? 2.0
    const dur   = plan.totalDuration || segs.reduce((s, g) => s + g.duration, 0)
    filters.push(`[1:a]volume=${vol},afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${Math.max(0, dur - fadeOut)}:d=${fadeOut}[bed]`)
    filters.push(`[cata]volume=1.0[voice]`)
    filters.push(`[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixeda]`)
    finalAudio = '[mixeda]'
  }

  return [
    ...inputs, '-filter_complex', filters.join(';'),
    '-map', finalVideo, '-map', finalAudio,
    '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
    '-c:a', 'aac', '-b:a', '128k',
    '-r', String(plan.fps || 30),
    '-movflags', '+faststart', '-y', outputPath,
  ]
}

async function uploadToStorage(localPath, storagePath) {
  const buffer = fs.readFileSync(localPath)
  const { error: upErr } = await admin.storage.from('edit-studio-exports').upload(storagePath, buffer, { contentType: 'video/mp4', upsert: true })
  if (upErr) throw new Error(`Storage upload failed: ${upErr.message}`)
  const { data: signed, error: signErr } = await admin.storage.from('edit-studio-exports').createSignedUrl(storagePath, 3600)
  if (signErr) throw new Error(`Signed URL failed: ${signErr.message}`)
  return signed.signedUrl
}

// ─── Job execution ────────────────────────────────────────────────────────────

async function executeJob(job) {
  const { id: jobId, user_id: userId, render_plan: renderPlan, project_id: projectId } = job
  const workDir    = prepareWorkDir(jobId)
  const inputPath  = path.join(workDir, 'source.mp4')
  const outputPath = path.join(workDir, 'output.mp4')

  try {
    await updateJob(jobId, 'processing')
    log('info', jobId, 'Processing started', { projectId })

    // 1. Download source video
    if (!renderPlan.sourceVideoUrl) throw new Error('No sourceVideoUrl in render plan.')
    await downloadFile(renderPlan.sourceVideoUrl, inputPath)
    log('info', jobId, 'Source downloaded')

    // 2. Caption file
    let captionPath = null
    if (renderPlan.overlays?.captionsEnabled && renderPlan.captions?.length) {
      try {
        captionPath = writeCaptionAss(renderPlan.captions, renderPlan.captionSettings || {}, workDir)
        log('info', jobId, 'Captions written')
      } catch (err) {
        log('warn', jobId, `Captions skipped: ${err.message}`)
      }
    }

    // 3. Music file
    let musicPath = null
    if (renderPlan.overlays?.musicEnabled && renderPlan.music) {
      const musicUrl = renderPlan.music.fileUrl || renderPlan.music.trackUrl
      if (musicUrl) {
        try {
          const ext  = musicUrl.split('?')[0].split('.').pop()?.toLowerCase() || 'mp3'
          musicPath  = path.join(workDir, `music.${ext}`)
          await downloadFile(musicUrl, musicPath)
          log('info', jobId, 'Music downloaded')
        } catch (err) {
          log('warn', jobId, `Music skipped: ${err.message}`)
        }
      } else {
        log('warn', jobId, 'Music skipped: no fileUrl or trackUrl in music bed')
      }
    }

    // 4. Build + run FFmpeg
    const args = buildFfmpegArgs(renderPlan, inputPath, captionPath, musicPath, outputPath)
    log('info', jobId, 'Running FFmpeg', { segments: renderPlan.segments?.length })
    await execFileAsync('ffmpeg', args, { timeout: 300_000, maxBuffer: 10 * 1024 * 1024 })

    if (!fs.existsSync(outputPath)) throw new Error('FFmpeg exited cleanly but output file missing.')

    // 5. Upload
    const storagePath = `${userId}/${projectId || 'unknown'}/${jobId}.mp4`
    const exportUrl   = await uploadToStorage(outputPath, storagePath)
    log('info', jobId, 'Uploaded to storage')

    // 6. Mark completed
    await updateJob(jobId, 'completed', { export_url: exportUrl, render_details: { captionsRendered: !!captionPath, musicRendered: !!musicPath } })
    await appendJobToProject(projectId, userId, { id: jobId, status: 'completed', exportUrl, createdAt: job.created_at })

    // 7. Update project status
    await admin.from('edit_projects').update({ status: 'exported' }).eq('id', projectId).eq('user_id', userId)

    log('info', jobId, 'Job complete', { exportUrl: exportUrl.slice(0, 60) + '...' })
  } catch (err) {
    log('error', jobId, `Job failed: ${err.message}`)
    await updateJob(jobId, 'failed', { error_message: err.message })
    await appendJobToProject(projectId, userId, { id: jobId, status: 'failed', error: err.message, createdAt: job.created_at })
  } finally {
    try { fs.rmSync(workDir, { recursive: true, force: true }) } catch {}
    activeJobs--
  }
}

// ─── Poll loop ────────────────────────────────────────────────────────────────

async function poll() {
  if (activeJobs >= MAX_CONCURRENT) return

  const { data: jobs, error } = await admin
    .from('edit_render_jobs')
    .select('id, user_id, project_id, render_plan, created_at')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(MAX_CONCURRENT - activeJobs)

  if (error) { log('error', null, `Poll error: ${error.message}`); return }
  if (!jobs?.length) return

  for (const job of jobs) {
    activeJobs++
    executeJob(job) // intentional fire-and-forget — activeJobs tracks concurrency
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

async function main() {
  log('info', null, 'Edit Studio render worker starting', { pollInterval: POLL_INTERVAL_MS, maxConcurrent: MAX_CONCURRENT })

  const ffmpegOk = await checkFfmpeg()
  if (!ffmpegOk) {
    log('error', null, 'FFmpeg not found on PATH. Install FFmpeg and ensure it is accessible.')
    process.exit(1)
  }
  log('info', null, 'FFmpeg found. Worker ready.')

  // Initial poll
  await poll()

  // Recurring poll
  setInterval(poll, POLL_INTERVAL_MS)
}

main().catch(err => {
  console.error('[worker] Fatal startup error:', err)
  process.exit(1)
})
```

- [ ] **Step 2: Verify the file was created**

```bash
ls scripts/render-worker.js
```

- [ ] **Step 3: Check that the worker imports are valid for Node.js ESM**

The `package.json` must have `"type": "module"` or the file must use `.mjs`. Check:
```bash
grep '"type"' package.json
```
If it shows `"type": "module"`, the `import` syntax works. If not, the worker will need `require()` syntax. If no `"type"` field exists, add `"type": "module"` to package.json OR rename the worker to `render-worker.mjs`.

If `package.json` does NOT have `"type": "module"`, convert all `import` statements to `require()`:
- `import { createClient } from '@supabase/supabase-js'` → `const { createClient } = require('@supabase/supabase-js')`
- `import { execFile } from 'child_process'` → `const { execFile } = require('child_process')`
- `import { promisify } from 'util'` → `const { promisify } = require('util')`
- `import fs from 'fs'` → `const fs = require('fs')`
- `import path from 'path'` → `const path = require('path')`
- `import os from 'os'` → `const os = require('os')`
And add `"use strict"` at the top.

- [ ] **Step 4: Add deployment instructions as a comment block at the top**

The file already has deployment instructions in the header comment. Verify they are accurate by checking the production URL pattern for render exports:
```bash
grep -n "edit-studio-exports\|storagePath" lib/edit-studio/renderEngine.js | head -5
```
Confirm the storage bucket name matches between `renderEngine.js` and the worker script (both should use `edit-studio-exports`).

- [ ] **Step 5: Commit**

```bash
git add scripts/render-worker.js
git commit -m "feat: add render worker script for processing queued edit_render_jobs"
```

---

## Task 5: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npx next build 2>&1 | grep -E "^(✓|error|Error)" | head -20
```
Expected: `✓ Compiled successfully`. Zero errors.

- [ ] **Step 2: Verify all changed files**

```bash
git log --oneline -5
```
Expected: 4 commits — music URL fix, renderDetails fix, 25 MB guard, render worker.

- [ ] **Step 3: Push**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage:**
- Music URL propagation: page.js + simple.js + render-plan route ✓
- renderDetails extraction: render route ✓  
- 25 MB guard Advanced Mode: page.js handleFileSelect ✓
- Render worker: scripts/render-worker.js ✓

**Placeholder scan:** No TBDs. All code blocks complete. Worker has full FFmpeg arg builder, ASS writer, storage uploader inline (no import from renderEngine.js to avoid path issues when running outside Next.js).

**Type consistency:**
- `fileUrl` field name used in: page.js `handleSelectMusicBed`, simple.js music bed, render-plan route music object, and render worker `renderPlan.music.fileUrl` lookup — all consistent ✓
- `renderDetails` declared as `let renderDetails = {}` before the try block, extracted as `result.renderDetails || {}` inside — scoping correct ✓
- Worker `executeJob` uses same field path as renderEngine.js: `renderPlan.overlays?.captionsEnabled`, `renderPlan.captions`, `renderPlan.segments`, `renderPlan.music` — consistent ✓

**Why the worker duplicates renderEngine.js functions:**
The render worker runs as a standalone Node.js script outside the Next.js app. Importing from `lib/edit-studio/renderEngine.js` would require resolving the Next.js module graph and path aliases. Duplicating the 5 core functions (ASS writer, FFmpeg args builder, storage uploader, file downloader, directory manager) keeps the worker self-contained and deployable anywhere with `node scripts/render-worker.js`.
