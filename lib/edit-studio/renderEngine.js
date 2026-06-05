/**
 * Edit Studio — Render Engine
 *
 * Phase 9: Command preview scaffold (no execution).
 * Phase 10: Real FFmpeg execution when binary is available on the server.
 *           Graceful fallback to "queued" when FFmpeg is not present (Vercel).
 *
 * Execution path:
 *   checkFfmpegAvailability() → downloadSourceVideo() → prepareWorkingDirectory()
 *   → writeCaptionAssFile() → runFfmpegCommand() → uploadExportToStorage()
 *   → cleanupWorkingDirectory()
 */

// ─── Phase 10: Node.js execution imports ────────────────────────────────────
// These are built-in Node modules — safe to import in API routes.
// Guard each function individually so this file can be bundled safely.
import { execFile as _execFile } from 'child_process'
import { promisify }             from 'util'
import { default as fs }         from 'fs'
import { default as path }       from 'path'
import { default as os }         from 'os'

const execFileAsync = promisify(_execFile)

// ─── Constants ────────────────────────────────────────────────────────────────

const QUALITY_PRESETS = {
  high:   { crf: 18, preset: 'slow',   audioBitrate: '192k' },
  medium: { crf: 23, preset: 'fast',   audioBitrate: '128k' },
  web:    { crf: 28, preset: 'faster', audioBitrate: '96k'  },
}

const ASPECT_RATIOS = {
  '9:16':  { width: 1080, height: 1920 },
  '16:9':  { width: 1920, height: 1080 },
  '1:1':   { width: 1080, height: 1080 },
  '4:5':   { width: 1080, height: 1350 },
}

// ─── Validation ────────────────────────────────────────────────────────────────

/**
 * Validates a render plan and returns a list of blocking issues.
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
export function validateRenderPlan(plan) {
  const errors   = []
  const warnings = []

  if (!plan || typeof plan !== 'object') {
    return { valid: false, errors: ['No render plan provided'], warnings: [] }
  }

  // Required fields
  if (!plan.sourceVideoName && !plan.sourceVideoUrl) {
    errors.push('No source video. Upload a video file first.')
  }
  if (!plan.segments?.length) {
    errors.push('No segments defined. Select an AI Edit Plan with at least one kept segment.')
  }
  if (plan.segments?.length && !plan.segments.some(s => s.duration > 0)) {
    errors.push('All segments have zero duration. Check your edit plan.')
  }
  if (!plan.resolution) {
    errors.push('No resolution specified.')
  }
  if (!plan.outputFormat) {
    errors.push('No output format specified.')
  }

  // Optional warnings
  if (!plan.sourceVideoUrl) {
    warnings.push('Source video URL not set — file must be uploaded to storage before rendering can execute.')
  }
  if (plan.captions?.length && !plan.overlays?.captionsEnabled) {
    warnings.push('Captions generated but burn-in is disabled in export settings.')
  }
  if (plan.music?.trackId && !plan.music?.volume) {
    warnings.push('Music bed selected but volume is 0.')
  }
  if (plan.totalDuration > 120) {
    warnings.push('Edit is over 2 minutes — verify this is intentional for short-form video.')
  }

  return { valid: errors.length === 0, errors, warnings }
}

// ─── Segment filter builder ────────────────────────────────────────────────────

/**
 * Builds the FFmpeg filter_complex string for trimming and concatenating segments.
 */
export function buildSegmentFilters(segments) {
  const videoFilters = []
  const audioFilters = []
  let concatV = ''
  let concatA = ''

  segments.forEach((seg, i) => {
    videoFilters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    audioFilters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    concatV += `[v${i}]`
    concatA += `[a${i}]`
  })

  const concatFilter = `${concatV}${concatA}concat=n=${segments.length}:v=1:a=1[outv][outa]`

  return [...videoFilters, ...audioFilters, concatFilter].join(';\n  ')
}

// ─── FFmpeg command builder ────────────────────────────────────────────────────

/**
 * Builds a complete FFmpeg command from a render plan.
 * Returns a formatted string preview — does NOT execute.
 *
 * TODO (Phase 10): Replace with actual child_process.spawn() call or
 *                  cloud render queue submission.
 */
export function buildFfmpegCommand(plan) {
  const { segments = [], resolution, fps = 30, quality = 'medium',
          music, captions, overlays, outputFormat = 'mp4', projectId } = plan

  const qp         = QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium
  const [w, h]     = (resolution || '1080x1920').split('x')
  const outputFile = `edit_${projectId || 'preview'}.${outputFormat}`
  const inputFile  = plan.sourceVideoUrl || '<SOURCE_VIDEO_PATH>'

  // Base inputs
  const inputs = [`-i "${inputFile}"`]
  if (music?.trackId) inputs.push(`-i "<MUSIC_TRACK_PATH>"`) // TODO: resolve actual audio file

  // Filter complex
  const filterParts = []

  // 1. Segment trimming + concatenation
  if (segments.length > 0) {
    filterParts.push(buildSegmentFilters(segments))
  } else {
    filterParts.push('[0:v]copy[outv]', '[0:a]copy[outa]')
  }

  // 2. Scale to target resolution
  filterParts.push(`[outv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2[scaled]`)

  // 3. Caption burn-in (ASS subtitle overlay)
  if (overlays?.captionsEnabled && captions?.length) {
    // TODO (Phase 10): generate .ass file from captionTimeline and reference here
    filterParts.push(`[scaled]subtitles='<CAPTIONS_ASS_FILE>'[withsubs]`)
  }

  // 4. Music bed mix
  const finalVideoStream = overlays?.captionsEnabled && captions?.length ? '[withsubs]' : '[scaled]'
  let finalAudioStream = '[outa]'

  if (music?.trackId) {
    const vol      = music.volume ?? 0.6
    const fadeIn   = music.fadeIn  ?? 1.0
    const fadeOut  = music.fadeOut ?? 2.0
    const duration = plan.totalDuration || 30
    filterParts.push(
      // Voice: keep original at full volume
      `[outa]volume=1.0[voice]`,
      // Music: apply volume, fade in, fade out
      `[1:a]volume=${vol},afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}[bed]`,
      // Mix voice + bed
      `[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixed]`,
    )
    finalAudioStream = '[mixed]'
  }

  const filterComplex = filterParts.join(';\n  ')

  // Assemble command
  const lines = [
    `ffmpeg`,
    ...inputs,
    `-filter_complex "`,
    `  ${filterComplex}`,
    `"`,
    `-map ${finalVideoStream}`,
    `-map ${finalAudioStream}`,
    `-c:v libx264 -preset ${qp.preset} -crf ${qp.crf}`,
    `-c:a aac -b:a ${qp.audioBitrate}`,
    `-r ${fps}`,
    `-movflags +faststart`,   // web-optimised MP4 (moov atom first)
    `-y "${outputFile}"`,     // overwrite output if exists
  ]

  return lines.join(' \\\n  ')
}

// ─── Time estimator ────────────────────────────────────────────────────────────

/**
 * Returns a human-readable render time estimate.
 * Rule of thumb: ~1.5× real-time for medium quality on a standard server.
 */
export function estimateRenderTime(plan) {
  const duration = plan.totalDuration || 30
  const qp       = QUALITY_PRESETS[plan.quality || 'medium']
  const multiplier = qp.preset === 'slow' ? 4 : qp.preset === 'fast' ? 1.5 : qp.preset === 'faster' ? 1 : 2

  const estimatedSeconds = duration * multiplier
  if (estimatedSeconds < 60)  return `~${Math.round(estimatedSeconds)} seconds`
  if (estimatedSeconds < 300) return `~${Math.round(estimatedSeconds / 60)} minute${estimatedSeconds > 90 ? 's' : ''}`
  return `~${Math.round(estimatedSeconds / 60)} minutes`
}

// ─── Render job helpers ────────────────────────────────────────────────────────

/**
 * Builds a render job record (to be inserted into edit_render_jobs).
 * Does NOT touch the database — caller is responsible for the INSERT.
 */
export function buildRenderJobRecord(projectId, userId, renderPlan) {
  return {
    project_id:  projectId,
    user_id:     userId,
    status:      'queued',
    render_plan: renderPlan,
    export_url:  null,
    error_message: null,
  }
}

/**
 * Returns the patch payload for updating a render job row.
 */
export function buildRenderJobUpdate(status, data = {}) {
  return {
    status,
    export_url:    data.exportUrl    || null,
    error_message: data.errorMessage || null,
  }
}

// ─── Phase 10: Execution functions ───────────────────────────────────────────

/**
 * Checks whether an FFmpeg binary is accessible on the server PATH.
 * Returns false on Vercel or any environment without FFmpeg installed.
 */
export async function checkFfmpegAvailability() {
  try {
    await execFileAsync('ffmpeg', ['-version'])
    return true
  } catch {
    return false
  }
}

/**
 * Creates an isolated working directory for a render job.
 * Returns the absolute path to the directory.
 */
export function prepareWorkingDirectory(jobId) {
  const dir = path.join(os.tmpdir(), 'edit-studio-renders', jobId)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

/**
 * Downloads a video from a URL into a local file.
 * Used to fetch the source video from Supabase Storage before rendering.
 */
export async function downloadSourceVideo(sourceUrl, destPath) {
  const res    = await fetch(sourceUrl)
  if (!res.ok) throw new Error(`Failed to download source video: HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buffer)
  return destPath
}

// ─── ASS Caption presets ──────────────────────────────────────────────────────
// Maps captionSettings.style to ASS render parameters.
// Bold/Italic/Underline values: -1 = true, 0 = false (ASS convention).

const ASS_PRESETS = {
  // captionSettings.style → preset
  clean:      { font: 'Arial',       size: 64, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 2, shadow: 1, uppercase: false },
  bold:       { font: 'Arial Black', size: 80, bold: -1, primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 3, shadow: 2, uppercase: true  },
  cinematic:  { font: 'Georgia',     size: 56, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H00000000', outline: 1, shadow: 0, uppercase: false },
  minimal:    { font: 'Arial',       size: 48, bold: 0,  primaryColor: '&H00FFFFFF', outlineColor: '&H00000000', backColor: '&H00000000', outline: 1, shadow: 0, uppercase: false },
  pop:        { font: 'Arial Black', size: 96, bold: -1, primaryColor: '&H0000FFFF', outlineColor: '&H00000000', backColor: '&H80000000', outline: 4, shadow: 2, uppercase: true  },
}

function fmtAssTime(s) {
  // ASS timestamp: H:MM:SS.cc (centiseconds, not milliseconds)
  const h  = Math.floor(s / 3600)
  const m  = Math.floor((s % 3600) / 60)
  const sc = Math.floor(s % 60)
  const cs = Math.round((s % 1) * 100)
  return `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
}

function escapeAssText(text) {
  return (text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\r?\n/g, '\\N')
}

function escapeAssPath(filePath) {
  // FFmpeg subtitles filter path: forward slashes, colon-escape for Windows drives
  let p = filePath.replace(/\\/g, '/')
  p = p.replace(/^([A-Za-z]):/, '$1\\:')  // C: → C\:
  p = p.replace(/'/g, "\\'")              // escape single quotes
  return p
}

/**
 * Phase 12A: Writes an ASS subtitle file from the caption timeline.
 * Supports all five named presets via captionSettings.style.
 *
 * TODO Phase 12B:
 *   - Per-word highlight rendering using {\c&H...&} override tags
 *   - Animated captions: slide-in, word-by-word reveal
 *   - Beat-synced captions using word-level timestamps
 *   - Dynamic emoji/sticker overlays via image sequence filters
 *
 * @returns Absolute path to the written .ass file, or null on failure.
 */
export function writeCaptionAssFile(captionTimeline, captionSettings, workDir) {
  if (!captionTimeline?.length) return null

  const preset    = ASS_PRESETS[captionSettings?.style] || ASS_PRESETS.clean
  const posMap    = { bottom: 2, center: 5, top: 8 }
  const alignment = posMap[captionSettings?.position] || 2
  const marginV   = alignment === 5 ? 0 : 80
  const marginH   = 60

  // Resolve resolution from captionSettings or first caption's style, default 1080×1920
  const [pw, ph] = (captionSettings?.resolution || '1080x1920').split('x')

  // ASS style line fields (order must match Format line exactly)
  const styleLine = [
    'Default',             // Name
    preset.font,           // Fontname
    preset.size,           // Fontsize
    preset.primaryColor,   // PrimaryColour
    '&H000000FF',          // SecondaryColour (unused)
    preset.outlineColor,   // OutlineColour
    preset.backColor,      // BackColour
    preset.bold,           // Bold
    0,                     // Italic
    0,                     // Underline
    0,                     // StrikeOut
    100, 100,              // ScaleX, ScaleY
    0,                     // Spacing
    0,                     // Angle
    1,                     // BorderStyle (1 = outline + shadow)
    preset.outline,        // Outline
    preset.shadow,         // Shadow
    alignment,             // Alignment (numpad)
    marginH, marginH,      // MarginL, MarginR
    marginV,               // MarginV
    1,                     // Encoding
  ].join(',')

  const dialogues = captionTimeline.map(cap => {
    let text = escapeAssText(cap.text || '')
    if (preset.uppercase) text = text.toUpperCase()
    return `Dialogue: 0,${fmtAssTime(cap.start)},${fmtAssTime(cap.end)},Default,,0,0,0,,${text}`
  })

  const assContent = [
    '[Script Info]',
    'ScriptType: v4.00+',
    `PlayResX: ${pw}`,
    `PlayResY: ${ph}`,
    'Timer: 100.0000',
    '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: ${styleLine}`,
    '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    ...dialogues,
  ].join('\n')

  const assPath = path.join(workDir, 'captions.ass')
  fs.writeFileSync(assPath, assContent, 'utf8')
  return assPath
}

/**
 * Phase 12: Downloads the selected music track to the working directory.
 * Uses selectedMusicBed.fileUrl or .trackUrl — skips gracefully if neither exists.
 *
 * TODO Phase 12B: resolve tracks from the app's music library by trackId
 *   when a direct URL is not stored (requires a library lookup endpoint).
 *
 * @returns { available: boolean, path?: string, reason?: string }
 */
export async function resolveMusicSource(selectedMusicBed, workDir) {
  const url = selectedMusicBed?.fileUrl || selectedMusicBed?.trackUrl
  if (!url) {
    return { available: false, reason: 'No music file URL in selected music bed — attach a track URL to enable music rendering.' }
  }

  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
    const buf  = Buffer.from(await res.arrayBuffer())
    const ext  = url.split('?')[0].split('.').pop()?.toLowerCase() || 'mp3'
    const dest = path.join(workDir, `music.${ext}`)
    fs.writeFileSync(dest, buf)
    return { available: true, path: dest }
  } catch (err) {
    return { available: false, reason: `Music download failed: ${err.message}` }
  }
}

/**
 * Phase 12: Full FFmpeg argument builder — video cuts + optional captions + optional music.
 * Replaces buildMinimalFfmpegArgs (kept below for backward-compat reference).
 *
 * @returns { args: string[], captionsRendered: boolean, musicRendered: boolean }
 */
export function buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null) {
  const segs = (plan.segments || []).filter(s => (s.duration ?? (s.end - s.start)) > 0)
  if (!segs.length) throw new Error('Render plan has no segments with duration > 0')

  const [w, h]   = (plan.resolution || '1080x1920').split('x')
  const crf      = plan.quality === 'high' ? '18' : plan.quality === 'web' ? '26' : '23'
  const hasCaps  = !!captionPath
  const hasMusic = !!musicPath

  // ── Inputs ─────────────────────────────────────────────────────────────────
  const inputs = ['-i', inputPath]
  if (hasMusic) inputs.push('-i', musicPath)
  const hasLogo  = !!logoPath
  const logoIdx  = hasMusic ? 2 : 1
  if (hasLogo) inputs.push('-i', logoPath)

  // ── Filter complex ─────────────────────────────────────────────────────────
  const filters = []
  const vParts  = []
  const aParts  = []

  segs.forEach((seg, i) => {
    filters.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`)
    filters.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`)
    vParts.push(`[v${i}]`)
    aParts.push(`[a${i}]`)
  })

  // Concatenate + scale/pad
  filters.push(`${vParts.join('')}${aParts.join('')}concat=n=${segs.length}:v=1:a=1[catv][cata]`)
  filters.push(`[catv]scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black[scaled]`)

  // Captions (Phase 12A): ASS subtitle overlay via subtitles filter
  // Requires libass in the FFmpeg build — included in most standard distributions.
  // TODO Phase 12B: per-word animated highlights via karaoke-style ASS tags.
  let finalVideo = '[scaled]'
  if (hasCaps) {
    const safePath = escapeAssPath(captionPath)
    filters.push(`[scaled]subtitles='${safePath}'[withsubs]`)
    finalVideo = '[withsubs]'
  }

  // Logo overlay (brand kit — bottom-right corner)
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalVideo}][slogo]overlay=W-w-20:H-h-20[withlogo]`)
    finalVideo = '[withlogo]'
  }

  // Music (Phase 12): fade in/out + volume + amix with original audio
  let finalAudio = '[cata]'
  if (hasMusic) {
    const music      = plan.music || {}
    const vol        = music.volume       ?? 0.6
    const fadeIn     = music.fadeIn       ?? 1.0
    const fadeOut    = music.fadeOut      ?? 2.0
    const totalDur   = plan.totalDuration || segs.reduce((s, g) => s + g.duration, 0)
    const fadeOutSt  = Math.max(0, totalDur - fadeOut)
    const loopFilter = music.loop ? `aloop=loop=-1:size=2000000000,` : ''
    const musicIdx   = 1 // music is always the second input

    filters.push(`[${musicIdx}:a]${loopFilter}volume=${vol},afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutSt}:d=${fadeOut}[bed]`)
    filters.push(`[cata]volume=1.0[voice]`)
    filters.push(`[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixeda]`)
    finalAudio = '[mixeda]'
  }

  return {
    args: [
      ...inputs,
      '-filter_complex', filters.join(';'),
      '-map', finalVideo,
      '-map', finalAudio,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
      '-c:a', 'aac', '-b:a', '128k',
      '-r', String(plan.fps || 30),
      '-movflags', '+faststart',
      '-y',
      outputPath,
    ],
    captionsRendered: hasCaps,
    musicRendered:    hasMusic,
    logoRendered:     hasLogo,
  }
}

/**
 * Phase 10A compat — kept so existing code that calls buildMinimalFfmpegArgs still works.
 * Delegates to buildFullFfmpegArgs with no captions or music.
 */
export function buildMinimalFfmpegArgs(plan, inputPath, outputPath) {
  return buildFullFfmpegArgs(plan, inputPath, null, null, outputPath).args
}

/**
 * Runs an FFmpeg command using the provided argument array.
 * Throws on non-zero exit code with stderr included in the message.
 * Set a generous timeout for longer renders (default 5 minutes).
 */
export async function runFfmpegCommand(args, timeoutMs = 300_000) {
  try {
    const result = await execFileAsync('ffmpeg', args, { timeout: timeoutMs, maxBuffer: 10 * 1024 * 1024 })
    return result
  } catch (err) {
    // FFmpeg writes progress to stderr even on success — include it for debugging
    const detail = err.stderr?.slice(-500) || err.message
    throw new Error(`FFmpeg execution failed: ${detail}`)
  }
}

/**
 * Uploads a rendered MP4 to Supabase Storage and returns the signed download URL.
 * Uses the service-role client to write to the private exports bucket.
 * Returns a signed URL valid for 1 hour (3600 seconds).
 */
export async function uploadExportToStorage(supabaseAdmin, localPath, storagePath) {
  const buffer = fs.readFileSync(localPath)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('edit-studio-exports')
    .upload(storagePath, buffer, { contentType: 'video/mp4', upsert: true })

  if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`)

  // Signed URL (1 hour) — use for the download button
  const { data: signedData, error: signedError } = await supabaseAdmin.storage
    .from('edit-studio-exports')
    .createSignedUrl(storagePath, 3600)

  if (signedError) throw new Error(`Failed to create signed URL: ${signedError.message}`)

  return signedData.signedUrl
}

/**
 * Removes the working directory and all temporary files for a render job.
 */
export function cleanupWorkingDirectory(workDir) {
  try {
    fs.rmSync(workDir, { recursive: true, force: true })
  } catch {
    // Non-fatal — tmp cleanup failure doesn't break the render result
  }
}

/**
 * Full render execution pipeline for Phase 10A (trim + concat only).
 * Returns { exportUrl } on success.
 * Throws a descriptive error on failure so the caller can update the job status.
 *
 * @param {object} renderPlan   - From /api/edit-studio/render-plan
 * @param {string} jobId        - UUID of the edit_render_jobs row
 * @param {string} userId       - Authenticated user ID (for storage path)
 * @param {object} supabaseAdmin - Supabase admin client for storage writes
 */
/**
 * Phase 12: Full render execution pipeline — cuts + captions + music.
 * Returns { exportUrl, renderDetails } on success.
 * Captions and music skip gracefully if unavailable; warnings are accumulated.
 *
 * @param {object} renderPlan    - From /api/edit-studio/render-plan
 * @param {string} jobId         - UUID of the edit_render_jobs row
 * @param {string} userId        - Authenticated user ID (for storage path)
 * @param {object} supabaseAdmin - Supabase admin client for storage writes
 */
export async function executeRenderJob(renderPlan, jobId, userId, supabaseAdmin) {
  const workDir    = prepareWorkingDirectory(jobId)
  const inputPath  = path.join(workDir, 'source.mp4')
  const outputPath = path.join(workDir, 'output.mp4')
  const warnings   = []

  try {
    // 1. Validate plan
    const { valid, errors } = validateRenderPlan(renderPlan)
    if (!valid) throw new Error(`Invalid render plan: ${errors.join('; ')}`)

    if (!renderPlan.sourceVideoUrl) {
      throw new Error('No source video URL. Upload the source video to storage first.')
    }

    // 2. Download source video
    await downloadSourceVideo(renderPlan.sourceVideoUrl, inputPath)

    // 3. Generate ASS caption file (Phase 12A)
    let captionPath = null
    if (renderPlan.overlays?.captionsEnabled && renderPlan.captions?.length) {
      try {
        captionPath = writeCaptionAssFile(
          renderPlan.captions,
          renderPlan.captionSettings || {},
          workDir
        )
      } catch (err) {
        warnings.push(`Captions skipped: ${err.message}`)
      }
    }

    // 4. Resolve music track (Phase 12)
    let musicPath = null
    if (renderPlan.overlays?.musicEnabled && renderPlan.music) {
      const result = await resolveMusicSource(renderPlan.music, workDir)
      if (result.available) {
        musicPath = result.path
      } else {
        warnings.push(`Music skipped: ${result.reason}`)
      }
    }

    // 5. Build + run FFmpeg (full pipeline)
    const { args, captionsRendered, musicRendered } = buildFullFfmpegArgs(
      renderPlan, inputPath, captionPath, musicPath, outputPath
    )
    await runFfmpegCommand(args)

    // 6. Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error('FFmpeg completed but output file was not created.')
    }

    // 7. Upload to Supabase Storage
    const storagePath = `${userId}/${renderPlan.projectId || 'unknown'}/${jobId}.mp4`
    const exportUrl   = await uploadExportToStorage(supabaseAdmin, outputPath, storagePath)

    const renderDetails = { captionsRendered, musicRendered, warnings }
    return { exportUrl, renderDetails }
  } finally {
    cleanupWorkingDirectory(workDir)
  }
}
