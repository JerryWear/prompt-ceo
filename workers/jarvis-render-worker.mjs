#!/usr/bin/env node
/**
 * PromptCEO Jarvis Studio — Render Worker
 *
 * Polls jarvis_render_jobs for queued jobs and renders video ads via FFmpeg.
 * Handles: Ken Burns on stills, xfade transitions, TTS voiceover, music mixing.
 *
 * Self-contained — does NOT import from the Next.js app.
 * Mirrors the FFmpeg logic in app/api/jarvis-studio/compile-ad/route.js.
 *
 * Deploy on Railway as a separate Worker service from the Edit Studio worker.
 * Required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
 */

import { execFile }  from 'child_process'
import { promisify } from 'util'
import fs             from 'fs'
import path           from 'path'
import os             from 'os'
import http           from 'http'
import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

const execFileAsync = promisify(execFile)

// ─── Configuration ────────────────────────────────────────────────────────────

const WORKER_ID          = process.env.JARVIS_WORKER_ID          || `jarvis-${randomUUID().slice(0, 8)}`
const POLL_INTERVAL_MS   = parseInt(process.env.JARVIS_POLL_INTERVAL_MS  || '5000',  10)
const STALE_TIMEOUT_MS   = parseInt(process.env.JARVIS_STALE_TIMEOUT_MS  || '600000', 10) // 10 min
const FFMPEG_TIMEOUT_MS  = parseInt(process.env.JARVIS_FFMPEG_TIMEOUT_MS || '300000', 10) // 5 min
const SUPABASE_URL       = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENAI_API_KEY     = process.env.OPENAI_API_KEY
const EXPORT_BUCKET      = 'identity-images'

// ─── Logging ─────────────────────────────────────────────────────────────────

function log(level, message, jobId = null, extra = {}) {
  const entry = {
    ts:     new Date().toISOString(),
    level,
    worker: WORKER_ID,
    message,
    ...(jobId ? { jobId } : {}),
    ...extra,
  }
  process.stdout.write(JSON.stringify(entry) + '\n')
}

// ─── Supabase ─────────────────────────────────────────────────────────────────

function makeAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth:     { autoRefreshToken: false, persistSession: false },
    global:   { fetch: fetch.bind(globalThis) },
    realtime: { transport: ws },
  })
}

// ─── FFmpeg ───────────────────────────────────────────────────────────────────

async function checkFfmpeg() {
  try { await execFileAsync('ffmpeg', ['-version']); return true } catch { return false }
}

function findSystemFont() {
  const candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf',
    '/System/Library/Fonts/Helvetica.ttc',
  ]
  return candidates.find(p => { try { return fs.existsSync(p) } catch { return false } }) || null
}

// ─── Working directory ────────────────────────────────────────────────────────

function makeWorkDir(jobId) {
  const dir = path.join(os.tmpdir(), 'jarvis-renders', jobId)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function cleanup(workDir) {
  try { fs.rmSync(workDir, { recursive: true, force: true }) } catch {}
}

// ─── Download helper ──────────────────────────────────────────────────────────

async function downloadToFile(url, destPath) {
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url.slice(0, 80)}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buf)
  return buf.length
}

// ─── TTS voiceover ────────────────────────────────────────────────────────────

async function generateTts(voiceScript, workDir) {
  if (!voiceScript || !OPENAI_API_KEY) return null
  try {
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ model: 'tts-1', voice: 'onyx', input: voiceScript, response_format: 'mp3' }),
    })
    if (!res.ok) { log('warn', `TTS API error: ${res.status}`); return null }
    const voicePath = path.join(workDir, 'voice.mp3')
    fs.writeFileSync(voicePath, Buffer.from(await res.arrayBuffer()))
    log('info', 'TTS voiceover generated')
    return voicePath
  } catch (err) {
    log('warn', `TTS failed — continuing without voiceover: ${err.message}`)
    return null
  }
}

// ─── Upload to Supabase ───────────────────────────────────────────────────────

async function uploadToStorage(admin, localPath, storagePath, jobId) {
  log('info', 'Upload started', jobId, { storagePath })
  const buf = fs.readFileSync(localPath)
  const { error } = await admin.storage
    .from(EXPORT_BUCKET)
    .upload(storagePath, buf, { contentType: 'video/mp4', upsert: true })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)
  const { data } = admin.storage.from(EXPORT_BUCKET).getPublicUrl(storagePath)
  if (!data?.publicUrl) throw new Error('Failed to get public URL')
  log('info', 'Upload complete', jobId)
  return data.publicUrl
}

// ─── Job lifecycle ────────────────────────────────────────────────────────────

async function claimJob(admin) {
  // Select one queued job, then atomically update only if still queued.
  // If another worker grabbed it first the update matches 0 rows and we skip.
  const { data: jobs } = await admin
    .from('jarvis_render_jobs')
    .select('id, user_id, render_plan')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(1)

  const job = jobs?.[0]
  if (!job) return null

  const { data: claimed } = await admin
    .from('jarvis_render_jobs')
    .update({ status: 'processing', updated_at: new Date().toISOString() })
    .eq('id', job.id)
    .eq('status', 'queued')
    .select('id')
    .single()

  return claimed?.id ? job : null
}

async function markFailed(admin, jobId, errorMessage) {
  await admin.from('jarvis_render_jobs').update({
    status:        'failed',
    error_message: errorMessage,
    updated_at:    new Date().toISOString(),
  }).eq('id', jobId)
}

async function reclaimStaleJobs(admin) {
  const staleTime = new Date(Date.now() - STALE_TIMEOUT_MS).toISOString()
  const { data } = await admin
    .from('jarvis_render_jobs')
    .select('id')
    .eq('status', 'processing')
    .lt('updated_at', staleTime)

  if (!data?.length) return 0
  for (const { id } of data) {
    await admin.from('jarvis_render_jobs')
      .update({ status: 'queued', updated_at: new Date().toISOString() })
      .eq('id', id)
    log('warn', 'Stale job re-queued', id)
  }
  return data.length
}

// ─── FFmpeg render — mirrors compile-ad/route.js exactly ─────────────────────

async function renderJarvisAd(plan, workDir, jobId) {
  const { scenes = [], musicUrl, voiceScript } = plan
  const activeScenes = scenes.filter(s => s.videoUrl || s.imageUrl)
  if (activeScenes.length < 2) throw new Error('At least 2 scenes required')

  // 1. Download scene files
  const filePaths = []
  for (let i = 0; i < activeScenes.length; i++) {
    const scene = activeScenes[i]
    const ext   = scene.videoUrl ? 'mp4' : 'jpg'
    const url   = scene.videoUrl || scene.imageUrl
    const p     = path.join(workDir, `scene${i}.${ext}`)
    const bytes = await downloadToFile(url, p)
    filePaths.push(p)
    log('info', `Scene ${i + 1}/${activeScenes.length} downloaded (${(bytes / 1024).toFixed(0)}KB)`, jobId)
  }

  // 2. Download music
  let musicFilePath = null
  if (musicUrl) {
    try {
      musicFilePath = path.join(workDir, 'music.mp3')
      await downloadToFile(musicUrl, musicFilePath)
      if (fs.statSync(musicFilePath).size === 0) {
        log('warn', 'Music file empty — skipping', jobId)
        musicFilePath = null
      } else {
        log('info', 'Music downloaded', jobId)
      }
    } catch (err) {
      log('warn', `Music download failed: ${err.message} — continuing without`, jobId)
      musicFilePath = null
    }
  }

  // 3. Generate TTS voiceover
  const voiceFilePath = voiceScript ? await generateTts(voiceScript, workDir) : null

  // 4. Build FFmpeg command
  const n        = filePaths.length
  const hasVideo = activeScenes.some(s => s.videoUrl)
  const segDur   = hasVideo ? 5.0 : 6.5
  const fadeDur  = 0.4
  const totalDur = segDur * n - fadeDur * (n - 1)
  const outPath  = path.join(workDir, 'ad.mp4')
  const args     = []

  // Per-scene inputs: videos get plain -i, stills get -loop 1 -t
  for (let i = 0; i < n; i++) {
    if (activeScenes[i].videoUrl) {
      args.push('-i', filePaths[i])
    } else {
      args.push('-loop', '1', '-t', String(segDur + 0.1), '-i', filePaths[i])
    }
  }
  if (musicFilePath) args.push('-i', musicFilePath)
  if (voiceFilePath) args.push('-i', voiceFilePath)

  // Per-scene video filters: video → scaleChain, still → Ken Burns zoompan
  const scaleChain = [
    'scale=1080:1920:force_original_aspect_ratio=decrease',
    'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black',
    'setsar=1', 'fps=30', 'format=yuv420p',
  ].join(',')
  const filterParts = []

  for (let i = 0; i < n; i++) {
    if (activeScenes[i].videoUrl) {
      filterParts.push(`[${i}:v]${scaleChain}[v${i}]`)
    } else {
      filterParts.push(`[${i}:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,format=yuv420p[v${i}]`)
    }
  }

  // xfade transition chain
  let prevLabel = 'v0', finalLabel = 'v0'
  for (let i = 1; i < n; i++) {
    const offset   = parseFloat(((segDur - fadeDur) * i).toFixed(3))
    const outLabel = i === n - 1 ? 'vout' : `x${i}`
    filterParts.push(`[${prevLabel}][v${i}]xfade=transition=fade:duration=${fadeDur}:offset=${offset}[${outLabel}]`)
    prevLabel  = outLabel
    finalLabel = outLabel
  }

  // Caption drawtext overlays
  const fontFile    = findSystemFont()
  const hasCaptions = fontFile && activeScenes.some(s => s.caption?.trim())
  if (hasCaptions) {
    let captionLabel = finalLabel
    activeScenes.forEach((scene, i) => {
      const text = scene.caption?.trim()
      if (!text) return
      const segStart = parseFloat(((segDur - fadeDur) * i).toFixed(3))
      const showFrom = parseFloat((segStart + 0.35).toFixed(3))
      const showTo   = parseFloat((segStart + segDur - 0.45).toFixed(3))
      const outLabel = `cap${i}`
      const safeTxt  = text.replace(/\\/g, '\\\\').replace(/'/g, "'").replace(/:/g, '\\:').replace(/,/g, '\\,')
      filterParts.push(
        `[${captionLabel}]drawtext=fontfile='${fontFile}':text='${safeTxt}':fontsize=44:fontcolor=white:` +
        `x=(w-text_w)/2:y=h*0.82:box=1:boxcolor=black@0.55:boxborderw=16:` +
        `enable='between(t\\,${showFrom}\\,${showTo})'[${outLabel}]`
      )
      captionLabel = outLabel
    })
    finalLabel = captionLabel
    log('info', `Captions: ${activeScenes.filter(s => s.caption?.trim()).length} overlays`, jobId)
  } else if (!fontFile) {
    log('warn', 'No system font found — captions skipped', jobId)
  }

  // Audio: voice+music → amix in filter_complex; music-only → direct map; voice-only → direct map
  if (voiceFilePath && musicFilePath) {
    const musicIdx = n, voiceIdx = n + 1
    filterParts.push(`[${musicIdx}:a]volume=0.15[quietmusic]`)
    filterParts.push(`[${voiceIdx}:a][quietmusic]amix=inputs=2:duration=first[aout]`)
  }

  args.push('-filter_complex', filterParts.join(';'))
  args.push('-map', `[${finalLabel}]`)

  if (voiceFilePath && musicFilePath) {
    args.push('-map', '[aout]', '-c:a', 'aac', '-b:a', '128k')
  } else if (musicFilePath) {
    args.push('-map', `${n}:a`, '-c:a', 'aac', '-b:a', '128k')
    args.push('-af', `afade=t=in:st=0:d=1,afade=t=out:st=${Math.max(0, totalDur - 2).toFixed(1)}:d=2`)
    args.push('-shortest')
  } else if (voiceFilePath) {
    args.push('-map', `${n}:a`, '-c:a', 'aac', '-b:a', '128k')
  } else {
    args.push('-an')
  }

  args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '26')
  args.push('-r', '30', '-movflags', '+faststart')
  args.push('-y', outPath)

  log('info', `FFmpeg: ${n} scenes, ~${totalDur.toFixed(0)}s, hasVideo=${hasVideo}`, jobId)
  await execFileAsync('ffmpeg', args, { timeout: FFMPEG_TIMEOUT_MS, maxBuffer: 50 * 1024 * 1024 })

  if (!fs.existsSync(outPath)) throw new Error('FFmpeg exited 0 but no output file was created')
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1)
  log('info', `Encoded: ${sizeMB}MB`, jobId)
  return { outPath, sizeMB: parseFloat(sizeMB) }
}

// ─── Process one job ──────────────────────────────────────────────────────────

async function processJob(admin, job) {
  const jobId  = job.id
  const userId = job.user_id
  const plan   = job.render_plan

  log('info', 'Job claimed', jobId, {
    userId,
    conceptTitle: plan?.conceptTitle,
    scenes:       plan?.scenes?.length,
    hasMusic:     !!plan?.musicUrl,
    hasVoice:     !!plan?.voiceScript,
  })

  const workDir = makeWorkDir(jobId)
  try {
    const { outPath, sizeMB } = await renderJarvisAd(plan, workDir, jobId)

    const storagePath = `jarvis-ads/${userId}/${jobId}.mp4`
    const exportUrl   = await uploadToStorage(admin, outPath, storagePath, jobId)

    await admin.from('jarvis_render_jobs').update({
      status:         'completed',
      export_url:     exportUrl,
      render_details: { completedAt: new Date().toISOString(), sizeMB },
      updated_at:     new Date().toISOString(),
    }).eq('id', jobId)

    log('info', 'Job completed', jobId, { exportUrl: exportUrl.slice(0, 80) + '…', sizeMB })
  } catch (err) {
    log('error', 'Job failed', jobId, { error: err.message })
    await markFailed(admin, jobId, err.message)
  } finally {
    cleanup(workDir)
  }
}

// ─── Main loop ────────────────────────────────────────────────────────────────

async function main() {
  log('info', 'Jarvis render worker starting', null, {
    workerId:       WORKER_ID,
    pollIntervalMs: POLL_INTERVAL_MS,
    ffmpegTimeoutMs: FFMPEG_TIMEOUT_MS,
  })

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    log('error', 'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }
  if (!OPENAI_API_KEY) {
    log('warn', 'OPENAI_API_KEY not set — TTS voiceover will be skipped for all jobs')
  }

  const ffmpegOk = await checkFfmpeg()
  if (!ffmpegOk) {
    log('error', 'FFmpeg not found on PATH — install FFmpeg and restart')
    process.exit(1)
  }
  log('info', 'FFmpeg available')

  const admin = makeAdmin()
  try {
    const { error } = await admin.from('jarvis_render_jobs').select('id').limit(1)
    if (error) throw error
    log('info', 'Database connected — jarvis_render_jobs accessible')
  } catch (err) {
    log('error', `Database connection failed: ${err.message}`)
    process.exit(1)
  }

  let running = true
  process.on('SIGTERM', () => { log('info', 'SIGTERM — shutting down after current job'); running = false })
  process.on('SIGINT',  () => { log('info', 'SIGINT — shutting down after current job');  running = false })

  // Health check endpoint for Railway probe
  const PORT = parseInt(process.env.PORT || '8081', 10)
  const healthServer = http.createServer((req, res) => { res.writeHead(200); res.end('ok') })
  healthServer.listen(PORT, () => log('info', `Health check listening on port ${PORT}`))

  log('info', 'Worker ready — polling jarvis_render_jobs')

  while (running) {
    try {
      await reclaimStaleJobs(admin)
      const job = await claimJob(admin)
      if (job) await processJob(admin, job)
    } catch (err) {
      log('error', `Poll cycle error: ${err.message}`)
    }
    if (running) await new Promise(r => setTimeout(r, POLL_INTERVAL_MS))
  }

  healthServer.close()
  log('info', 'Worker stopped cleanly')
  process.exit(0)
}

main().catch(err => {
  console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'fatal', error: err.message }))
  process.exit(1)
})
