#!/usr/bin/env node
/**
 * PromptCEO Edit Studio — Render Worker
 *
 * Polls edit_render_jobs for queued jobs and renders them using FFmpeg.
 *
 * Requirements:
 *   - FFmpeg installed and on PATH
 *   - NEXT_PUBLIC_SUPABASE_URL env var
 *   - SUPABASE_SERVICE_ROLE_KEY env var
 *
 * Usage:
 *   node scripts/render-worker.mjs
 *   POLL_INTERVAL_MS=10000 MAX_RETRIES=3 node scripts/render-worker.mjs
 *
 * Deploy:
 *   Railway, Fly.io, Render.com, or any Linux server with FFmpeg.
 *   PM2: pm2 start scripts/render-worker.mjs --name edit-studio-worker
 */

import { createClient }  from '@supabase/supabase-js'
import { execFile }      from 'child_process'
import { promisify }     from 'util'
import fs                from 'fs'
import path              from 'path'
import os                from 'os'

const execFileAsync = promisify(execFile)

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY     = process.env.SUPABASE_SERVICE_ROLE_KEY
const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS  || '5000',  10)
const MAX_CONCURRENT   = parseInt(process.env.MAX_CONCURRENT    || '1',     10)
const MAX_RETRIES      = parseInt(process.env.MAX_RETRIES       || '3',     10)
const STALE_MINUTES    = parseInt(process.env.STALE_MINUTES     || '10',    10)

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[worker] Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const db = createClient(SUPABASE_URL, SUPABASE_KEY)
let activeJobs = 0

// ─── Logging ──────────────────────────────────────────────────────────────────

function log(level, jobId, msg, extra = {}) {
  const ts  = new Date().toISOString()
  const id  = jobId ? `[${String(jobId).slice(0, 8)}]` : '[-------]'
  const ext = Object.keys(extra).length ? ' ' + JSON.stringify(extra) : ''
  console.log(`${ts} ${level.padEnd(5)} ${id} ${msg}${ext}`)
}

// ─── DB helpers ───────────────────────────────────────────────────────────────

async function updateJob(jobId, status, extra = {}) {
  const payload = { status, updated_at: new Date().toISOString(), ...extra }
  if (status === 'processing') payload.processing_started_at = new Date().toISOString()
  if (status === 'failed')     payload.failed_at             = new Date().toISOString()
  const { error } = await db.from('edit_render_jobs').update(payload).eq('id', jobId)
  if (error) log('WARN', jobId, `DB update failed: ${error.message}`)
}

async function appendJobToProject(projectId, userId, summary) {
  try {
    const { data } = await db.from('edit_projects')
      .select('render_jobs').eq('id', projectId).eq('user_id', userId).single()
    const jobs   = (data?.render_jobs || []).filter(j => j.id !== summary.id)
    await db.from('edit_projects')
      .update({ render_jobs: [...jobs, summary] })
      .eq('id', projectId).eq('user_id', userId)
  } catch { /* non-fatal */ }
}

// ─── Stale job recovery ───────────────────────────────────────────────────────

async function recoverStaleJobs() {
  const cutoff = new Date(Date.now() - STALE_MINUTES * 60_000).toISOString()
  const { data: stale } = await db.from('edit_render_jobs')
    .select('id, render_details')
    .eq('status', 'processing')
    .lt('processing_started_at', cutoff)

  if (!stale?.length) return

  for (const job of stale) {
    const retries = (job.render_details?.retryCount || 0)
    if (retries >= MAX_RETRIES) {
      await updateJob(job.id, 'failed', { error_message: `Job exceeded ${MAX_RETRIES} retries and stalled in processing.` })
      log('WARN', job.id, `Stale job exceeded max retries — marked failed`)
    } else {
      await updateJob(job.id, 'queued', {
        render_details: { ...job.render_details, retryCount: retries + 1, lastRetryAt: new Date().toISOString() },
      })
      log('INFO', job.id, `Stale job reset to queued (retry ${retries + 1}/${MAX_RETRIES})`)
    }
  }
}

// ─── FFmpeg availability ──────────────────────────────────────────────────────

async function checkFfmpeg() {
  try { await execFileAsync('ffmpeg', ['-version']); return true }
  catch { return false }
}

// ─── File helpers ─────────────────────────────────────────────────────────────

function prepareWorkDir(jobId) {
  const dir = path.join(os.tmpdir(), 'edit-studio-renders', jobId)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function cleanWorkDir(dir) {
  try { fs.rmSync(dir, { recursive: true, force: true }) } catch {}
}

async function downloadFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (HTTP ${res.status}): ${url}`)
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
  return dest
}

// ─── Music URL resolution ─────────────────────────────────────────────────────
// fileUrl may be a relative /api/stream-track/<id> — resolve via Supabase instead.

async function resolveMusicUrl(music) {
  if (!music) return null
  const { fileUrl, trackUrl, trackId } = music

  // If we have an absolute URL, use it directly
  if (fileUrl && !fileUrl.startsWith('/'))   return fileUrl
  if (trackUrl && !trackUrl.startsWith('/')) return trackUrl

  // Relative URL or no URL — look up from music_tracks by trackId
  if (trackId) {
    const { data: track } = await db.from('music_tracks')
      .select('preview_file_url, full_file_url')
      .eq('id', trackId).single()
    if (track?.preview_file_url && !track.preview_file_url.startsWith('/')) return track.preview_file_url
    if (track?.full_file_url    && !track.full_file_url.startsWith('/'))    return track.full_file_url
  }

  return null
}

// ─── Logo path resolution ────────────────────────────────────────────────────

async function resolveLogoPath(plan, workDir) {
  const logoUrl = plan.brandKit?.logoUrl
  if (!logoUrl) return null

  try {
    let resolvedUrl = logoUrl
    // brand-assets bucket is private — resolve signed URL if path contains it
    if (logoUrl.includes('/brand-assets/')) {
      const storagePath = logoUrl.split('/brand-assets/').pop()?.split('?')[0]
      if (storagePath) {
        const { data: signed } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 3600)
        if (signed?.signedUrl) resolvedUrl = signed.signedUrl
      }
    }

    const ext  = resolvedUrl.split('?')[0].split('.').pop()?.toLowerCase() || 'png'
    const dest = path.join(workDir, `logo.${ext}`)
    await downloadFile(resolvedUrl, dest)
    return dest
  } catch (err) {
    log('WARN', null, `Logo skipped: ${err.message}`)
    return null
  }
}

async function resolveClipPath(url, workDir, filename) {
  if (!url) return null
  try {
    let resolvedUrl = url
    if (url.includes('/brand-assets/')) {
      const storagePath = url.split('/brand-assets/').pop()?.split('?')[0]
      if (storagePath) {
        const { data: signed } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 3600)
        if (signed?.signedUrl) resolvedUrl = signed.signedUrl
      }
    }
    const dest = path.join(workDir, filename)
    await downloadFile(resolvedUrl, dest)
    return dest
  } catch (err) {
    log('WARN', null, `${filename} skipped: ${err.message}`)
    return null
  }
}

// ─── Caption file writer ──────────────────────────────────────────────────────

const ASS_PRESETS = {
  clean:    { font: 'Arial',       size: 64, bold: 0,  color: '&H00FFFFFF', outline: 2, shadow: 1, uppercase: false },
  bold:     { font: 'Arial Black', size: 80, bold: -1, color: '&H00FFFFFF', outline: 3, shadow: 2, uppercase: true  },
  cinematic:{ font: 'Georgia',     size: 56, bold: 0,  color: '&H00FFFFFF', outline: 1, shadow: 0, uppercase: false },
  minimal:  { font: 'Arial',       size: 48, bold: 0,  color: '&H00FFFFFF', outline: 1, shadow: 0, uppercase: false },
  pop:      { font: 'Arial Black', size: 96, bold: -1, color: '&H0000FFFF', outline: 4, shadow: 2, uppercase: true  },
}

function writeCaptionAss(captions, settings, workDir) {
  if (!captions?.length) return null
  const p         = ASS_PRESETS[settings?.style] || ASS_PRESETS.clean
  const posMap    = { bottom: 2, center: 5, top: 8 }
  const alignment = posMap[settings?.position] || 2
  const marginV   = alignment === 5 ? 0 : 80
  const [pw, ph]  = (settings?.resolution || '1080x1920').split('x')

  const fmtT = s => {
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60)
    const sc = Math.floor(s%60), cs = Math.round((s%1)*100)
    return `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
  }
  const esc = t => (t||'').replace(/\\/g,'\\\\').replace(/\{/g,'\\{').replace(/\r?\n/g,'\\N')
  const styleLine = ['Default',p.font,p.size,p.color,'&H000000FF','&H00000000','&H80000000',
    p.bold,0,0,0,100,100,0,0,1,p.outline,p.shadow,alignment,60,60,marginV,1].join(',')
  const dialogues = captions.map(c => {
    let t = esc(c.text||''); if (p.uppercase) t = t.toUpperCase()
    return `Dialogue: 0,${fmtT(c.start)},${fmtT(c.end)},Default,,0,0,0,,${t}`
  })
  const content = [
    '[Script Info]','ScriptType: v4.00+',`PlayResX: ${pw}`,`PlayResY: ${ph}`,'Timer: 100.0000','',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: ${styleLine}`,'','[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    ...dialogues,
  ].join('\n')
  const p2 = path.join(workDir, 'captions.ass')
  fs.writeFileSync(p2, content, 'utf8')
  return p2
}

// ─── FFmpeg args builder ──────────────────────────────────────────────────────

function buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null, introPath = null, outroPath = null, watermarkPath = null) {
  const segs = (plan.segments||[]).filter(s => (s.duration ?? (s.end - s.start)) > 0)
  if (!segs.length) throw new Error('No segments with duration > 0')
  const [w,h]  = (plan.resolution||'1080x1920').split('x')
  const crf    = plan.quality==='high' ? '18' : plan.quality==='web' ? '26' : '23'
  const inputs = ['-i', inputPath]
  if (musicPath) inputs.push('-i', musicPath)
  let nextIdx        = musicPath ? 2 : 1
  const hasLogo      = !!logoPath
  const logoIdx      = hasLogo      ? nextIdx++ : null
  if (hasLogo)      inputs.push('-i', logoPath)

  const hasIntro     = !!introPath
  const introIdx     = hasIntro     ? nextIdx++ : null
  if (hasIntro)     inputs.push('-i', introPath)

  const hasOutro     = !!outroPath
  const outroIdx     = hasOutro     ? nextIdx++ : null
  if (hasOutro)     inputs.push('-i', outroPath)

  const hasWatermark = !!watermarkPath
  const watermarkIdx = hasWatermark ? nextIdx++ : null
  if (hasWatermark) inputs.push('-i', watermarkPath)
  const filters=[], vParts=[], aParts=[]
  segs.forEach((seg,i) => {
    filters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    filters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    vParts.push(`[v${i}]`); aParts.push(`[a${i}]`)
  })
  filters.push(`${vParts.join('')}${aParts.join('')}concat=n=${segs.length}:v=1:a=1[catv][cata]`)
  filters.push(`[catv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[scaled]`)
  let finalV = '[scaled]'
  if (captionPath) {
    const safe = captionPath.replace(/\\/g,'/').replace(/^([A-Za-z]):/,'$1\\:').replace(/'/g,"\\'")
    filters.push(`[scaled]subtitles='${safe}'[withsubs]`)
    finalV = '[withsubs]'
  }
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalV}][slogo]overlay=W-w-20:H-h-20[afterlogo]`)
    finalV = '[afterlogo]'
  }

  if (hasWatermark) {
    filters.push(`[${watermarkIdx}:v]scale=100:-1,format=rgba,colorchannelmixer=aa=0.6[swm]`)
    filters.push(`[${finalV}][swm]overlay=20:20[afterwm]`)
    finalV = '[afterwm]'
  }

  let finalA = '[cata]'
  if (musicPath) {
    const m=plan.music||{}, vol=m.volume??0.6, fi=m.fadeIn??1.0, fo=m.fadeOut??2.0
    const dur=plan.totalDuration||segs.reduce((s,g)=>s+g.duration,0)
    filters.push(`[1:a]volume=${vol},afade=t=in:st=0:d=${fi},afade=t=out:st=${Math.max(0,dur-fo)}:d=${fo}[bed]`)
    filters.push('[cata]volume=1.0[voice]')
    filters.push('[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixeda]')
    finalA = '[mixeda]'
  }

  if (hasIntro || hasOutro) {
    const [w, h] = (plan.resolution || '1080x1920').split('x')
    if (hasIntro) {
      filters.push(`[${introIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[introV]`)
    }
    if (hasOutro) {
      filters.push(`[${outroIdx}:v]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[outroV]`)
    }
    const concatV = [], concatA = []
    const nSegs   = (hasIntro ? 1 : 0) + 1 + (hasOutro ? 1 : 0)
    if (hasIntro) { concatV.push('[introV]'); concatA.push(`[${introIdx}:a]`) }
    concatV.push(`[${finalV}]`); concatA.push(`[${finalA}]`)
    if (hasOutro) { concatV.push('[outroV]'); concatA.push(`[${outroIdx}:a]`) }
    filters.push(`${concatV.join('')}${concatA.join('')}concat=n=${nSegs}:v=1:a=1[finalV][finalA]`)
    finalV = '[finalV]'; finalA = '[finalA]'
  }

  return [...inputs,'-filter_complex',filters.join(';'),'-map',finalV,'-map',finalA,
    '-c:v','libx264','-preset','fast','-crf',crf,'-c:a','aac','-b:a','128k',
    '-r',String(plan.fps||30),'-movflags','+faststart','-y',outputPath]
}

// ─── Storage upload ───────────────────────────────────────────────────────────

async function uploadExport(localPath, storagePath) {
  const buf = fs.readFileSync(localPath)
  const { error: upErr } = await db.storage.from('edit-studio-exports')
    .upload(storagePath, buf, { contentType: 'video/mp4', upsert: true })
  if (upErr) throw new Error(`Upload failed: ${upErr.message}`)
  const { data: signed, error: signErr } = await db.storage.from('edit-studio-exports')
    .createSignedUrl(storagePath, 3600)
  if (signErr) throw new Error(`Signed URL failed: ${signErr.message}`)
  return signed.signedUrl
}

// ─── Job execution ────────────────────────────────────────────────────────────

async function executeJob(job) {
  const { id: jobId, user_id: userId, project_id: projectId, render_plan: plan, render_details: existingDetails } = job
  const retryCount = existingDetails?.retryCount || 0
  const workDir    = prepareWorkDir(jobId)
  const inputPath  = path.join(workDir, 'source.mp4')
  const outputPath = path.join(workDir, 'output.mp4')
  const warnings   = []

  try {
    await updateJob(jobId, 'processing', {
      render_details: { ...existingDetails, retryCount, stage: 'starting', startedAt: new Date().toISOString() },
    })
    log('INFO', jobId, 'Job started', { projectId, retry: retryCount })

    // 1. Download source
    if (!plan.sourceVideoUrl) throw new Error('No sourceVideoUrl in render plan.')
    log('INFO', jobId, 'Downloading source video')
    await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'downloading' } })
    await downloadFile(plan.sourceVideoUrl, inputPath)
    log('INFO', jobId, 'Source downloaded', { size: `${(fs.statSync(inputPath).size/1024/1024).toFixed(1)} MB` })

    // 2. Caption file
    let captionPath = null
    if (plan.overlays?.captionsEnabled && plan.captions?.length) {
      log('INFO', jobId, 'Writing captions')
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'captions' } })
      try {
        captionPath = writeCaptionAss(plan.captions, plan.captionSettings || {}, workDir)
        log('INFO', jobId, 'Captions written', { count: plan.captions.length })
      } catch (err) {
        warnings.push(`Captions skipped: ${err.message}`)
        log('WARN', jobId, `Captions skipped: ${err.message}`)
      }
    }

    // 3. Resolve + download music
    let musicPath = null
    if (plan.overlays?.musicEnabled && plan.music?.trackId) {
      log('INFO', jobId, 'Resolving music track')
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'music' } })
      const musicUrl = await resolveMusicUrl(plan.music)
      if (musicUrl) {
        try {
          const ext = musicUrl.split('?')[0].split('.').pop()?.toLowerCase() || 'mp3'
          musicPath  = path.join(workDir, `music.${ext}`)
          await downloadFile(musicUrl, musicPath)
          log('INFO', jobId, 'Music downloaded')
        } catch (err) {
          warnings.push(`Music skipped: ${err.message}`)
          log('WARN', jobId, `Music skipped: ${err.message}`)
        }
      } else {
        warnings.push('Music skipped: could not resolve track URL')
        log('WARN', jobId, 'Music skipped: no resolvable URL')
      }
    }

    // 4b. Resolve logo (brand kit)
    let logoPath = null
    if (plan.brandKit?.logoUrl) {
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'logo' } })
      logoPath = await resolveLogoPath(plan, workDir)
      if (logoPath) log('INFO', jobId, 'Logo resolved')
    }

    let introPath = null, outroPath = null, watermarkPath = null

    if (plan.brandKit?.introClipUrl) {
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'intro' } })
      introPath = await resolveClipPath(plan.brandKit.introClipUrl, workDir, 'intro.mp4')
      if (introPath) log('INFO', jobId, 'Intro clip resolved')
    }
    if (plan.brandKit?.outroClipUrl) {
      await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'outro' } })
      outroPath = await resolveClipPath(plan.brandKit.outroClipUrl, workDir, 'outro.mp4')
      if (outroPath) log('INFO', jobId, 'Outro clip resolved')
    }
    if (plan.brandKit?.watermarkUrl) {
      watermarkPath = await resolveClipPath(plan.brandKit.watermarkUrl, workDir, 'watermark.png')
      if (watermarkPath) log('INFO', jobId, 'Watermark resolved')
    }

    // 4. Run FFmpeg
    log('INFO', jobId, 'Running FFmpeg', { segments: plan.segments?.length, captions: !!captionPath, music: !!musicPath })
    await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'ffmpeg' } })
    const args = buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath, introPath, outroPath, watermarkPath)
    await execFileAsync('ffmpeg', args, { timeout: 300_000, maxBuffer: 10 * 1024 * 1024 })

    if (!fs.existsSync(outputPath)) throw new Error('FFmpeg exited 0 but output file missing.')
    const outSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1)
    log('INFO', jobId, 'FFmpeg complete', { outputMB: outSize })

    // 5. Upload
    log('INFO', jobId, 'Uploading to storage')
    await updateJob(jobId, 'processing', { render_details: { ...existingDetails, retryCount, stage: 'uploading' } })
    const storagePath = `${userId}/${projectId || 'unknown'}/${jobId}.mp4`
    const exportUrl   = await uploadExport(outputPath, storagePath)
    log('INFO', jobId, 'Uploaded', { storagePath })

    // 6. Mark complete
    const renderDetails = { captionsRendered: !!captionPath, musicRendered: !!musicPath, logoRendered: !!logoPath, introRendered: !!introPath, outroRendered: !!outroPath, watermarkRendered: !!watermarkPath, warnings, retryCount, completedAt: new Date().toISOString() }
    await updateJob(jobId, 'completed', { export_url: exportUrl, render_details: renderDetails })
    await appendJobToProject(projectId, userId, { id: jobId, status: 'completed', exportUrl, createdAt: job.created_at })
    await db.from('edit_projects').update({ status: 'exported' }).eq('id', projectId).eq('user_id', userId)

    log('INFO', jobId, 'Job complete', { exportUrl: exportUrl.slice(0, 60) + '…' })
  } catch (err) {
    log('ERROR', jobId, `Job failed: ${err.message}`)

    const retries = (existingDetails?.retryCount || 0) + 1
    if (retries < MAX_RETRIES) {
      // Retry: reset to queued with incremented count
      await updateJob(jobId, 'queued', {
        render_details: { ...existingDetails, retryCount: retries, lastError: err.message, lastRetryAt: new Date().toISOString() },
      })
      log('INFO', jobId, `Queued for retry (${retries}/${MAX_RETRIES})`)
    } else {
      // Final failure
      await updateJob(jobId, 'failed', {
        error_message:  err.message,
        render_details: { ...existingDetails, retryCount: retries, lastError: err.message },
      })
      await appendJobToProject(projectId, userId, { id: jobId, status: 'failed', error: err.message, createdAt: job.created_at })
      log('ERROR', jobId, `Job permanently failed after ${retries} retries`)
    }
  } finally {
    cleanWorkDir(workDir)
    activeJobs--
  }
}

// ─── Poll ─────────────────────────────────────────────────────────────────────

async function poll() {
  if (activeJobs >= MAX_CONCURRENT) return

  const { data: jobs, error } = await db
    .from('edit_render_jobs')
    .select('id, user_id, project_id, render_plan, render_details, created_at')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(MAX_CONCURRENT - activeJobs)

  if (error) { log('ERROR', null, `Poll error: ${error.message}`); return }
  if (!jobs?.length) return

  for (const job of jobs) {
    // Skip if already retried too many times
    const retries = job.render_details?.retryCount || 0
    if (retries >= MAX_RETRIES) {
      await updateJob(job.id, 'failed', { error_message: `Exceeded ${MAX_RETRIES} retries without completing.` })
      log('WARN', job.id, `Skipped — exceeded max retries`)
      continue
    }
    activeJobs++
    executeJob(job) // fire-and-forget; activeJobs tracks concurrency
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

async function main() {
  log('INFO', null, 'Edit Studio render worker starting', { poll: POLL_INTERVAL_MS, maxConcurrent: MAX_CONCURRENT, maxRetries: MAX_RETRIES, staleMinutes: STALE_MINUTES })

  const ok = await checkFfmpeg()
  if (!ok) { log('ERROR', null, 'FFmpeg not found on PATH — install FFmpeg and retry.'); process.exit(1) }
  log('INFO', null, 'FFmpeg found. Worker ready.')

  // Recover any jobs stuck in processing from a previous crash
  await recoverStaleJobs()

  // Initial poll + recurring poll
  await poll()
  setInterval(async () => { await recoverStaleJobs(); await poll() }, POLL_INTERVAL_MS)
}

main().catch(err => { console.error('[worker] Fatal:', err); process.exit(1) })
