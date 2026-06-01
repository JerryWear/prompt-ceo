#!/usr/bin/env node
/**
 * PromptCEO Edit Studio — Production Render Worker
 *
 * Runs as a standalone Node.js process OUTSIDE Vercel.
 * Polls edit_render_jobs for queued jobs and executes real FFmpeg renders.
 *
 * Requirements:
 *   - Node.js 18+
 *   - FFmpeg installed and on PATH
 *   - Environment variables from worker.env.example
 *
 * Usage:
 *   node workers/edit-render-worker.mjs
 *
 * With PM2 (recommended for production):
 *   pm2 start workers/edit-render-worker.mjs --name edit-render-worker
 *
 * Deploy on:
 *   - Render.com (Background Worker service)
 *   - Railway (Worker service)
 *   - Fly.io (Dockerfile CMD)
 *   - VPS / Dedicated server
 *
 * This file is intentionally self-contained — it does NOT import from
 * the Next.js app to avoid module-system conflicts. All render logic
 * is implemented inline using native Node.js APIs.
 */

import { execFile }  from 'child_process'
import { promisify } from 'util'
import fs             from 'fs'
import path           from 'path'
import os             from 'os'
import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'

const execFileAsync = promisify(execFile)

// ─── Configuration ────────────────────────────────────────────────────────────

const WORKER_ID              = process.env.EDIT_RENDER_WORKER_ID     || `worker-${randomUUID().slice(0, 8)}`
const POLL_INTERVAL_MS       = parseInt(process.env.EDIT_RENDER_POLL_INTERVAL_MS   || '5000', 10)
const STALE_TIMEOUT_MS       = parseInt(process.env.EDIT_RENDER_STALE_TIMEOUT_MS   || '600000', 10) // 10 min
const FFMPEG_TIMEOUT_MS      = parseInt(process.env.EDIT_RENDER_FFMPEG_TIMEOUT_MS  || '300000', 10) // 5 min
const SUPABASE_URL           = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY
const EXPORT_BUCKET          = 'edit-studio-exports'

// ─── Logging ─────────────────────────────────────────────────────────────────

function log(level, message, jobId = null, extra = {}) {
  const entry = {
    ts:      new Date().toISOString(),
    level,
    worker:  WORKER_ID,
    message,
    ...(jobId ? { jobId } : {}),
    ...extra,
  }
  // JSON log lines work with Render / Railway / Fly structured log aggregators
  process.stdout.write(JSON.stringify(entry) + '\n')
}

// ─── Supabase admin client ────────────────────────────────────────────────────

function makeAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// ─── FFmpeg availability ──────────────────────────────────────────────────────

async function checkFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version'])
    return true
  } catch {
    return false
  }
}

// ─── Working directory ────────────────────────────────────────────────────────

function makeWorkDir(jobId) {
  const dir = path.join(os.tmpdir(), 'edit-studio-renders', jobId)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function cleanup(workDir) {
  try { fs.rmSync(workDir, { recursive: true, force: true }) } catch { /* non-fatal */ }
}

// ─── Source video download ────────────────────────────────────────────────────

async function downloadVideo(url, destPath) {
  log('info', 'Downloading source video', null, { url: url.slice(0, 60) + '…', dest: destPath })
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`Source video download failed: HTTP ${res.status} ${res.statusText}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buf)
  log('info', `Source video saved (${(buf.length / 1024 / 1024).toFixed(1)} MB)`)
}

// ─── ASS Caption rendering (Phase 12A) ───────────────────────────────────────
// Mirrored from lib/edit-studio/renderEngine.js — worker is self-contained.

const ASS_PRESETS = {
  clean:     { font: 'Arial',       size: 64, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 2, shadow: 1, uppercase: false },
  bold:      { font: 'Arial Black', size: 80, bold: -1, primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 3, shadow: 2, uppercase: true  },
  cinematic: { font: 'Georgia',     size: 56, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H00000000', outline: 1, shadow: 0, uppercase: false },
  minimal:   { font: 'Arial',       size: 48, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H00000000', outline: 1, shadow: 0, uppercase: false },
  pop:       { font: 'Arial Black', size: 96, bold: -1, primaryColor: '&H0000FFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 4, shadow: 2, uppercase: true  },
}

function fmtAssTime(s) {
  const h  = Math.floor(s / 3600)
  const m  = Math.floor((s % 3600) / 60)
  const sc = Math.floor(s % 60)
  const cs = Math.round((s % 1) * 100)
  return `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
}

function escAssText(t) {
  return (t || '').replace(/\\/g,'\\\\').replace(/\{/g,'\\{').replace(/\r?\n/g,'\\N')
}

function escAssPath(p) {
  let q = p.replace(/\\/g,'/').replace(/^([A-Za-z]):/,'$1\\:').replace(/'/g,"\\'")
  return q
}

function writeCaptionAssFile(captions, captionSettings, workDir) {
  if (!captions?.length) return null
  const preset    = ASS_PRESETS[captionSettings?.style] || ASS_PRESETS.clean
  const posMap    = { bottom: 2, center: 5, top: 8 }
  const alignment = posMap[captionSettings?.position] || 2
  const marginV   = alignment === 5 ? 0 : 80
  const marginH   = 60
  const [pw, ph]  = (captionSettings?.resolution || '1080x1920').split('x')
  const styleVals = ['Default', preset.font, preset.size, preset.primaryColor, '&H000000FF',
    preset.outlineColor, preset.backColor, preset.bold, 0, 0, 0, 100, 100, 0, 0, 1,
    preset.outline, preset.shadow, alignment, marginH, marginH, marginV, 1].join(',')
  const dialogues = captions.map(c => {
    let txt = escAssText(c.text || '')
    if (preset.uppercase) txt = txt.toUpperCase()
    return `Dialogue: 0,${fmtAssTime(c.start)},${fmtAssTime(c.end)},Default,,0,0,0,,${txt}`
  })
  const content = [
    '[Script Info]', 'ScriptType: v4.00+', `PlayResX: ${pw}`, `PlayResY: ${ph}`, 'Timer: 100.0000', '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: ${styleVals}`, '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    ...dialogues,
  ].join('\n')
  const assPath = path.join(workDir, 'captions.ass')
  fs.writeFileSync(assPath, content, 'utf8')
  return assPath
}

async function resolveMusicSource(musicBed, workDir) {
  const url = musicBed?.fileUrl || musicBed?.trackUrl
  if (!url) return { available: false, reason: 'No music file URL in selected music bed.' }
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf  = Buffer.from(await res.arrayBuffer())
    const ext  = url.split('?')[0].split('.').pop()?.toLowerCase() || 'mp3'
    const dest = path.join(workDir, `music.${ext}`)
    fs.writeFileSync(dest, buf)
    return { available: true, path: dest }
  } catch (err) {
    return { available: false, reason: `Music download failed: ${err.message}` }
  }
}

// ─── FFmpeg args builder (Phase 12: full pipeline — cuts + captions + music) ──

function buildArgs(plan, inputPath, captionPath, musicPath, outputPath) {
  const segs = (plan.segments || []).filter(s => (s.duration ?? (s.end - s.start)) > 0)
  if (!segs.length) throw new Error('Render plan has no segments with duration > 0')

  const [w, h]   = (plan.resolution || '1080x1920').split('x')
  const crf      = plan.quality === 'high' ? '18' : plan.quality === 'web' ? '26' : '23'
  const hasCaps  = !!captionPath
  const hasMusic = !!musicPath

  const inputs  = ['-i', inputPath]
  if (hasMusic) inputs.push('-i', musicPath)

  const filters = []
  const vParts  = []
  const aParts  = []

  segs.forEach((seg, i) => {
    filters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    filters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    vParts.push(`[v${i}]`)
    aParts.push(`[a${i}]`)
  })

  const n = segs.length
  filters.push(`${vParts.join('')}${aParts.join('')}concat=n=${n}:v=1:a=1[catv][cata]`)
  filters.push(`[catv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[scaled]`)

  let finalVideo = '[scaled]'
  if (hasCaps) {
    filters.push(`[scaled]subtitles='${escAssPath(captionPath)}'[withsubs]`)
    finalVideo = '[withsubs]'
  }

  let finalAudio = '[cata]'
  if (hasMusic) {
    const music     = plan.music || {}
    const vol       = music.volume ?? 0.6
    const fadeIn    = music.fadeIn ?? 1.0
    const fadeOut   = music.fadeOut ?? 2.0
    const total     = plan.totalDuration || segs.reduce((s, g) => s + g.duration, 0)
    const fadeOutSt = Math.max(0, total - fadeOut)
    const loop      = music.loop ? 'aloop=loop=-1:size=2000000000,' : ''
    filters.push(`[1:a]${loop}volume=${vol},afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutSt}:d=${fadeOut}[bed]`)
    filters.push(`[cata]volume=1.0[voice]`)
    filters.push(`[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixeda]`)
    finalAudio = '[mixeda]'
  }

  return {
    args: [
      ...inputs,
      '-filter_complex', filters.join(';'),
      '-map', finalVideo, '-map', finalAudio,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
      '-c:a', 'aac', '-b:a', '128k',
      '-r', String(plan.fps || 30),
      '-movflags', '+faststart', '-y', outputPath,
    ],
    captionsRendered: hasCaps,
    musicRendered:    hasMusic,
  }
}

// ─── FFmpeg execution ─────────────────────────────────────────────────────────

async function runFfmpeg(args, jobId) {
  log('info', 'FFmpeg started', jobId, { args: args.slice(0, 4).join(' ') + ' …' })
  try {
    await execFileAsync('ffmpeg', args, { timeout: FFMPEG_TIMEOUT_MS, maxBuffer: 10 * 1024 * 1024 })
    log('info', 'FFmpeg finished', jobId)
  } catch (err) {
    const detail = (err.stderr || err.message || '').slice(-600)
    throw new Error(`FFmpeg failed: ${detail}`)
  }
}

// ─── Storage upload ───────────────────────────────────────────────────────────

async function uploadToStorage(admin, localPath, storagePath, jobId) {
  log('info', 'Upload started', jobId, { storagePath })
  const buf = fs.readFileSync(localPath)
  const { error } = await admin.storage
    .from(EXPORT_BUCKET)
    .upload(storagePath, buf, { contentType: 'video/mp4', upsert: true })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = await admin.storage
    .from(EXPORT_BUCKET)
    .createSignedUrl(storagePath, 86400) // 24-hour signed URL
  if (!data?.signedUrl) throw new Error('Failed to create signed export URL')

  log('info', 'Upload complete', jobId)
  return data.signedUrl
}

// ─── Job lifecycle ────────────────────────────────────────────────────────────

async function claimJob(admin) {
  const { data, error } = await admin.rpc('claim_render_job', { p_worker_id: WORKER_ID })
  if (error) throw new Error(`Claim RPC error: ${error.message}`)
  return data || null
}

async function markCompleted(admin, jobId, exportUrl, plan) {
  await admin
    .from('edit_render_jobs')
    .update({ status: 'completed', export_url: exportUrl, completed_at: new Date().toISOString() })
    .eq('id', jobId)

  // Update project status
  if (plan?.projectId) {
    await admin
      .from('edit_projects')
      .update({ status: 'exported' })
      .eq('id', plan.projectId)
  }

  // Append completed job summary to project.render_jobs array
  if (plan?.projectId) {
    try {
      const { data } = await admin
        .from('edit_projects')
        .select('render_jobs')
        .eq('id', plan.projectId)
        .single()
      const existing = data?.render_jobs || []
      const updated  = existing.map(j => j.id === jobId
        ? { ...j, status: 'completed', exportUrl }
        : j
      )
      await admin
        .from('edit_projects')
        .update({ render_jobs: updated })
        .eq('id', plan.projectId)
    } catch { /* non-fatal */ }
  }
}

async function markFailed(admin, jobId, errorMessage, plan) {
  await admin
    .from('edit_render_jobs')
    .update({ status: 'failed', error_message: errorMessage, failed_at: new Date().toISOString() })
    .eq('id', jobId)

  if (plan?.projectId) {
    try {
      const { data } = await admin
        .from('edit_projects')
        .select('render_jobs')
        .eq('id', plan.projectId)
        .single()
      const existing = data?.render_jobs || []
      const updated  = existing.map(j => j.id === jobId
        ? { ...j, status: 'failed', error: errorMessage }
        : j
      )
      await admin
        .from('edit_projects')
        .update({ render_jobs: updated })
        .eq('id', plan.projectId)
    } catch { /* non-fatal */ }
  }
}

async function reclaimStaleJobs(admin) {
  const staleTime = new Date(Date.now() - STALE_TIMEOUT_MS).toISOString()
  const { data } = await admin
    .from('edit_render_jobs')
    .select('id')
    .eq('status', 'processing')
    .lt('processing_started_at', staleTime)

  if (!data?.length) return

  for (const { id } of data) {
    await admin
      .from('edit_render_jobs')
      .update({ status: 'queued', worker_id: null, processing_started_at: null })
      .eq('id', id)
    log('warn', 'Stale job re-queued', id)
  }
}

// ─── Process one job ──────────────────────────────────────────────────────────

async function processJob(admin, job) {
  const jobId  = job.id
  const userId = job.user_id
  const plan   = job.render_plan

  log('info', 'Job claimed', jobId, { userId, platform: plan?.platform, goal: plan?.goal, segments: plan?.segments?.length })

  if (!plan?.sourceVideoUrl) {
    const err = 'No source video URL — upload the source video to storage before rendering.'
    log('error', err, jobId)
    await markFailed(admin, jobId, err, plan)
    return
  }

  const workDir = makeWorkDir(jobId)
  const inputPath  = path.join(workDir, 'source.mp4')
  const outputPath = path.join(workDir, 'output.mp4')

  const warnings = []

  try {
    // 1. Download source
    await downloadVideo(plan.sourceVideoUrl, inputPath)

    // 2. Generate ASS captions (Phase 12A)
    let captionPath = null
    if (plan.overlays?.captionsEnabled && plan.captions?.length) {
      try {
        captionPath = writeCaptionAssFile(plan.captions, plan.captionSettings || {}, workDir)
        log('info', 'Caption file generated', jobId, { lines: plan.captions.length })
      } catch (err) {
        warnings.push(`Captions skipped: ${err.message}`)
        log('warn', `Caption generation failed: ${err.message}`, jobId)
      }
    }

    // 3. Resolve music (Phase 12)
    let musicPath = null
    if (plan.overlays?.musicEnabled && plan.music) {
      const result = await resolveMusicSource(plan.music, workDir)
      if (result.available) {
        musicPath = result.path
        log('info', 'Music track downloaded', jobId)
      } else {
        warnings.push(`Music skipped: ${result.reason}`)
        log('warn', `Music unavailable: ${result.reason}`, jobId)
      }
    }

    // 4. Build + run FFmpeg (full pipeline)
    const { args, captionsRendered, musicRendered } = buildArgs(plan, inputPath, captionPath, musicPath, outputPath)
    await runFfmpeg(args, jobId)

    // 5. Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error('FFmpeg exited 0 but no output file was created.')
    }

    // 6. Upload to storage
    const storagePath = `${userId}/${plan.projectId || 'unknown'}/${jobId}.mp4`
    const exportUrl   = await uploadToStorage(admin, outputPath, storagePath, jobId)

    const renderDetails = { captionsRendered, musicRendered, warnings }

    // 7. Mark completed with render details
    await admin
      .from('edit_render_jobs')
      .update({ status: 'completed', export_url: exportUrl, completed_at: new Date().toISOString(), render_details: renderDetails })
      .eq('id', jobId)

    // Update project status
    if (plan.projectId) {
      await admin.from('edit_projects').update({ status: 'exported' }).eq('id', plan.projectId)
    }

    log('info', 'Job completed', jobId, { exportUrl: exportUrl.slice(0, 60) + '…', captionsRendered, musicRendered, warnings })
  } catch (err) {
    log('error', 'Job failed', jobId, { error: err.message })
    await markFailed(admin, jobId, err.message, plan)
  } finally {
    cleanup(workDir)
  }
}

// ─── Main loop ────────────────────────────────────────────────────────────────

async function main() {
  log('info', `Render worker starting`, null, { workerId: WORKER_ID, pollIntervalMs: POLL_INTERVAL_MS })

  // Pre-flight checks
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    log('error', 'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See worker.env.example.')
    process.exit(1)
  }

  const ffmpegOk = await checkFfmpeg()
  if (!ffmpegOk) {
    log('error', 'FFmpeg not found on PATH. Install FFmpeg (https://ffmpeg.org/download.html) and restart.')
    process.exit(1)
  }
  log('info', 'FFmpeg available')

  const admin = makeAdmin()

  // Verify DB connectivity
  try {
    const { error } = await admin.from('edit_render_jobs').select('id').limit(1)
    if (error) throw error
    log('info', 'Database connected')
  } catch (err) {
    log('error', `Database connection failed: ${err.message}`)
    process.exit(1)
  }

  // Graceful shutdown
  let running = true
  const shutdown = (sig) => {
    log('info', `${sig} received — shutting down after current job completes`)
    running = false
  }
  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  log('info', 'Worker ready — polling for jobs')

  // ── Stats accumulator (logged every 10 jobs) ──────────────────────────────
  const stats = { jobsClaimed: 0, jobsCompleted: 0, jobsFailed: 0, staleReclaimed: 0, totalRenderMs: 0 }
  const STATS_INTERVAL = 10 // log summary every N jobs

  while (running) {
    try {
      const reclaimed = await reclaimStaleJobs(admin)
      if (reclaimed) stats.staleReclaimed += reclaimed

      const job = await claimJob(admin)
      if (job) {
        stats.jobsClaimed++
        const jobStart = Date.now()
        try {
          await processJob(admin, job)
          stats.jobsCompleted++
          stats.totalRenderMs += Date.now() - jobStart
        } catch {
          stats.jobsFailed++
        }

        // Log stats summary periodically
        if ((stats.jobsClaimed % STATS_INTERVAL) === 0) {
          const avgMs = stats.jobsCompleted ? Math.round(stats.totalRenderMs / stats.jobsCompleted) : 0
          log('info', 'Worker stats summary', null, {
            ...stats, avgRenderMs: avgMs, uptime: `${Math.round((Date.now() - Date.now()) / 60000)}m`,
          })
        }
      }
    } catch (err) {
      log('error', `Poll cycle error: ${err.message}`)
    }

    if (running) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL_MS))
    }
  }

  // Final stats on shutdown
  log('info', 'Worker final stats', null, stats)

  log('info', 'Worker stopped cleanly')
  process.exit(0)
}

main().catch(err => {
  console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'fatal', error: err.message }))
  process.exit(1)
})
