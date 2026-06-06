import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }             from 'next/headers'
import os   from 'os'
import path from 'path'
import fs   from 'fs'
import { promisify }           from 'util'
import { execFile as _execFile } from 'child_process'

const execFileAsync = promisify(_execFile)

// Vercel Pro max — FFmpeg assembly can take 45s for a 60s ad
export const maxDuration = 60

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}
function makeAdmin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function downloadFile(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${url} (${res.status})`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buf)
}

async function checkFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version'], { timeout: 5000 })
    return true
  } catch { return false }
}

// Build the FFmpeg command based on source type
function audioFilters(voiceIdx, musicIdx, hasMusicTrack) {
  if (hasMusicTrack) return [
    `[${voiceIdx}:a]volume=1.0[voice]`,
    `[${musicIdx}:a]volume=0.12[music]`,
    '[voice][music]amix=inputs=2:duration=shortest[a]',
  ]
  return [`[${voiceIdx}:a]volume=1.0[a]`]
}

function scaleFilter(inputIdx, outLabel) {
  return `[${inputIdx}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p[${outLabel}]`
}

function buildAssembleCommand({ sourceType, sourcePath, imagePath, voicePath, musicPath, outputPath, duration = 30 }) {
  const args = []
  const hasMusicTrack = !!musicPath

  // ── COMBINED: image intro (4s Ken Burns) → crossfade → video ──────────────
  if (sourceType === 'combined' && imagePath) {
    const introDuration = 4  // seconds of image shown before video starts

    args.push('-loop', '1', '-t', String(introDuration + 1), '-i', imagePath) // 0: image
    args.push('-i', sourcePath)                                                // 1: video
    args.push('-i', voicePath)                                                 // 2: voice
    if (hasMusicTrack) args.push('-i', musicPath)                              // 3: music

    const musicStartIdx = hasMusicTrack ? 3 : null
    const voiceIdx = 2

    const filters = [
      // Image: scale to 9:16, Ken Burns slow zoom (z goes from 1.0 to 1.15 over introDuration)
      `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,` +
        `zoompan=z='min(zoom+0.003,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
        `d=${introDuration * 25}:s=1080x1920:fps=25,` +
        `trim=duration=${introDuration},setpts=PTS-STARTPTS,format=yuv420p[img_v]`,

      // Video: scale to 9:16, trim to remaining duration
      `[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,` +
        `trim=duration=${duration - introDuration + 2},setpts=PTS-STARTPTS,format=yuv420p[vid_v]`,

      // Crossfade: 0.5s dissolve at the transition point
      `[img_v][vid_v]xfade=transition=fade:duration=0.5:offset=${introDuration - 0.5}[combined_v]`,

      // Audio
      ...audioFilters(voiceIdx, musicStartIdx, hasMusicTrack),
    ]

    args.push('-filter_complex', filters.join(';'))
    args.push('-map', '[combined_v]', '-map', '[a]')
    args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '22')
    args.push('-c:a', 'aac', '-b:a', '128k')
    args.push('-shortest')

  // ── IMAGE ONLY: looped with Ken Burns zoom ─────────────────────────────────
  } else if (sourceType === 'image') {
    args.push('-loop', '1', '-i', sourcePath)
    args.push('-i', voicePath)
    if (hasMusicTrack) args.push('-i', musicPath)

    const filters = [
      `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,` +
        `zoompan=z='min(zoom+0.002,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
        `d=${duration * 25}:s=1080x1920:fps=25,format=yuv420p[v]`,
      ...audioFilters(1, hasMusicTrack ? 2 : null, hasMusicTrack),
    ]

    args.push('-filter_complex', filters.join(';'))
    args.push('-map', '[v]', '-map', '[a]')
    args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '23')
    args.push('-c:a', 'aac', '-b:a', '128k')
    args.push('-t', String(duration + 2))
    args.push('-shortest')

  // ── VIDEO ONLY: replace audio ──────────────────────────────────────────────
  } else {
    args.push('-i', sourcePath)
    args.push('-i', voicePath)
    if (hasMusicTrack) args.push('-i', musicPath)

    const filters = [
      scaleFilter(0, 'v'),
      ...audioFilters(1, hasMusicTrack ? 2 : null, hasMusicTrack),
    ]

    args.push('-filter_complex', filters.join(';'))
    args.push('-map', '[v]', '-map', '[a]')
    args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '23')
    args.push('-c:a', 'aac', '-b:a', '128k')
    args.push('-shortest')
  }

  args.push('-movflags', '+faststart')
  args.push('-y', outputPath)
  return args
}

// POST /api/edit-studio/assemble-ad
// Body: {
//   projectId, adId, adLabel,
//   voiceUrl,                    // Supabase signed URL for the TTS audio
//   musicUrl?,                   // optional music track URL
//   sourceType: 'video'|'image', // what the source content is
//   sourceUrl,                   // public/signed URL for source file
//   duration?,                   // target duration in seconds (default 30)
// }
export async function POST(req) {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'assemble-'))
  try {
    const supabase = await makeSupabase()
    const admin    = makeAdmin()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { projectId, adId, adLabel = 'ad', voiceUrl, musicUrl, sourceType = 'video', sourceUrl, imageUrl, duration = 30 } = await req.json()

    if (!voiceUrl)  return NextResponse.json({ status: 'error', message: 'voiceUrl is required' }, { status: 400 })
    if (!sourceUrl && sourceType !== 'combined') return NextResponse.json({ status: 'error', message: 'sourceUrl is required' }, { status: 400 })

    const hasFfmpeg = await checkFfmpeg()
    if (!hasFfmpeg) {
      // Vercel production: return queued status — render will be attempted asynchronously
      return NextResponse.json({
        status: 'queued',
        message: 'Render queued — FFmpeg not available in this environment. Download the ad script to produce locally.',
        voiceUrl,
      })
    }

    // ── Download source files ────────────────────────────────────────────────
    const isCombined = sourceType === 'combined'
    const sourceExt  = (sourceType === 'image') ? '.jpg' : '.mp4'
    const sourcePath = sourceUrl ? path.join(workDir, `source${sourceExt}`) : null
    const imagePath  = imageUrl  ? path.join(workDir, 'product_image.jpg')  : null
    const voicePath  = path.join(workDir, 'voice.mp3')
    const outputPath = path.join(workDir, 'ad_output.mp4')

    await Promise.all([
      sourcePath ? downloadFile(sourceUrl, sourcePath)                          : Promise.resolve(),
      imagePath  ? downloadFile(imageUrl,  imagePath)                           : Promise.resolve(),
      downloadFile(voiceUrl, voicePath),
      musicUrl   ? downloadFile(musicUrl, path.join(workDir, 'music.mp3'))      : Promise.resolve(),
    ])

    const musicPath = musicUrl ? path.join(workDir, 'music.mp3') : null

    // For combined mode: imagePath is the intro image, sourcePath is the video
    const effectiveSourcePath = isCombined ? sourcePath : sourcePath

    // ── FFmpeg assembly ──────────────────────────────────────────────────────
    const ffmpegArgs = buildAssembleCommand({
      sourceType, sourcePath: effectiveSourcePath, imagePath, voicePath, musicPath, outputPath, duration,
    })
    await execFileAsync('ffmpeg', ffmpegArgs, { timeout: 55_000 })

    if (!fs.existsSync(outputPath)) throw new Error('FFmpeg did not produce output file')

    // ── Upload to Supabase Storage ───────────────────────────────────────────
    const outputBuffer  = fs.readFileSync(outputPath)
    const storagePath   = `${user.id}/${projectId || 'no-project'}/ads/${adId || Date.now()}_assembled.mp4`

    const { error: uploadError } = await admin.storage
      .from('edit-studio')
      .upload(storagePath, outputBuffer, { contentType: 'video/mp4', upsert: true })

    if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`)

    const { data: { publicUrl } } = admin.storage.from('edit-studio').getPublicUrl(storagePath)

    // ── Update project record ────────────────────────────────────────────────
    if (projectId) {
      const { data: proj } = await supabase.from('edit_projects').select('render_jobs').eq('id', projectId).eq('user_id', user.id).single()
      const existing = proj?.render_jobs || []
      const jobEntry = { id: adId || storagePath, label: adLabel, publicUrl, storagePath, assembledAt: new Date().toISOString() }
      await supabase.from('edit_projects')
        .update({ render_jobs: [...existing.filter(j => j.id !== jobEntry.id), jobEntry], status: 'exported' })
        .eq('id', projectId).eq('user_id', user.id)
    }

    return NextResponse.json({ status: 'success', publicUrl, storagePath })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  } finally {
    try { fs.rmSync(workDir, { recursive: true, force: true }) } catch {}
  }
}
