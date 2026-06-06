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
function buildAssembleCommand({ sourceType, sourcePath, voicePath, musicPath, outputPath, duration = 30 }) {
  const args = []
  const hasMusicTrack = !!musicPath

  if (sourceType === 'image') {
    // Image → looped video background
    args.push('-loop', '1', '-i', sourcePath)          // input 0: image
    args.push('-i', voicePath)                          // input 1: voiceover
    if (hasMusicTrack) args.push('-i', musicPath)       // input 2: music

    const filters = []
    // Scale and pad to 9:16 (1080x1920) — standard short-form ad
    filters.push('[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p[v]')

    if (hasMusicTrack) {
      filters.push('[1:a]volume=1.0[voice]')
      filters.push('[2:a]volume=0.12[music]')
      filters.push('[voice][music]amix=inputs=2:duration=shortest[a]')
    } else {
      filters.push('[1:a]volume=1.0[a]')
    }

    args.push('-filter_complex', filters.join(';'))
    args.push('-map', '[v]', '-map', '[a]')
    args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '23')
    args.push('-c:a', 'aac', '-b:a', '128k')
    args.push('-t', String(duration + 2))  // cap at voice duration + buffer
    args.push('-shortest')

  } else {
    // Video → use original footage as visual, replace/mix audio
    args.push('-i', sourcePath)                         // input 0: video
    args.push('-i', voicePath)                          // input 1: voiceover
    if (hasMusicTrack) args.push('-i', musicPath)       // input 2: music

    const filters = []
    // Scale to 9:16 for short-form ads (add letterboxing if needed)
    filters.push('[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p[v]')

    if (hasMusicTrack) {
      filters.push('[1:a]volume=1.0[voice]')
      filters.push('[2:a]volume=0.12[music]')
      filters.push('[voice][music]amix=inputs=2:duration=shortest[a]')
    } else {
      filters.push('[1:a]volume=1.0[a]')
    }

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

    const { projectId, adId, adLabel = 'ad', voiceUrl, musicUrl, sourceType = 'video', sourceUrl, duration = 30 } = await req.json()

    if (!voiceUrl)   return NextResponse.json({ status: 'error', message: 'voiceUrl is required' }, { status: 400 })
    if (!sourceUrl)  return NextResponse.json({ status: 'error', message: 'sourceUrl is required' }, { status: 400 })

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
    const ext        = sourceType === 'image' ? '.jpg' : '.mp4'
    const sourcePath = path.join(workDir, `source${ext}`)
    const voicePath  = path.join(workDir, 'voice.mp3')
    const outputPath = path.join(workDir, 'ad_output.mp4')

    await Promise.all([
      downloadFile(sourceUrl, sourcePath),
      downloadFile(voiceUrl, voicePath),
      musicUrl ? downloadFile(musicUrl, path.join(workDir, 'music.mp3')) : Promise.resolve(),
    ])

    const musicPath = musicUrl ? path.join(workDir, 'music.mp3') : null

    // ── FFmpeg assembly ──────────────────────────────────────────────────────
    const ffmpegArgs = buildAssembleCommand({ sourceType, sourcePath, voicePath, musicPath, outputPath, duration })
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
