import { NextResponse }           from 'next/server'
import { createServerClient }     from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }                from 'next/headers'
import { execFile as _execFile }  from 'child_process'
import { promisify }              from 'util'
import fs                         from 'fs'
import path                       from 'path'
import os                         from 'os'
import ffmpegStaticPath           from 'ffmpeg-static'

const execFileAsync = promisify(_execFile)

// On Vercel/Linux the binary exists but may not have execute permission — chmod it
function resolveFfmpegPath() {
  const p = ffmpegStaticPath
  if (!p) throw new Error('ffmpeg-static did not return a path')
  console.log(`[compile-ad] ffmpeg path: ${p}, exists: ${fs.existsSync(p)}`)
  try { fs.chmodSync(p, 0o755) } catch (e) { console.warn('[compile-ad] chmod skipped:', e.message) }
  return p
}

export const maxDuration = 300

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url.slice(0, 80)}`)
  const buf = await res.arrayBuffer()
  fs.writeFileSync(destPath, Buffer.from(buf))
}

// POST /api/jarvis-studio/compile-ad
// Body: { scenes: [{ id, label, videoUrl? | imageUrl? }], conceptTitle, musicUrl? }
// Returns: { status, videoUrl, durationS }
export async function POST(req) {
  const supabase = await makeSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { scenes = [], conceptTitle = 'Ad', musicUrl } = await req.json()

  // Prefer videoUrl (Runway clips), fall back to imageUrl (stills)
  const useVideo  = scenes.some(s => s.videoUrl)
  const activeScenes = scenes.filter(s => s.videoUrl || s.imageUrl)
  if (activeScenes.length < 2) {
    return NextResponse.json({ error: 'At least 2 scenes required' }, { status: 400 })
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jarvis-compile-'))
  console.log(`[compile-ad] "${conceptTitle}" — ${activeScenes.length} scenes — mode: ${useVideo ? 'VIDEO CLIPS' : 'IMAGES'} — tmp: ${tmpDir}`)

  try {
    // ── 1. Download scene files ───────────────────────────────────────────────
    const filePaths = []
    for (let i = 0; i < activeScenes.length; i++) {
      const scene = activeScenes[i]
      const ext   = useVideo && scene.videoUrl ? 'mp4' : 'jpg'
      const url   = scene.videoUrl || scene.imageUrl
      const p     = path.join(tmpDir, `scene${i}.${ext}`)
      await downloadToFile(url, p)
      filePaths.push(p)
      console.log(`[compile-ad] downloaded scene ${i + 1}/${activeScenes.length} (${ext})`)
    }

    // ── 2. Optional music ────────────────────────────────────────────────────
    let musicFilePath = null
    if (musicUrl) {
      try {
        musicFilePath = path.join(tmpDir, 'music.mp3')
        await downloadToFile(musicUrl, musicFilePath)
        console.log('[compile-ad] music downloaded')
      } catch (e) {
        console.warn('[compile-ad] music download failed — continuing without:', e.message)
        musicFilePath = null
      }
    }

    // ── 3. Build FFmpeg command ───────────────────────────────────────────────
    const n        = filePaths.length
    const segDur   = useVideo ? 5.0 : 6.5   // Runway clips are 5s; images shown 6.5s
    const fadeDur  = 0.4
    const totalDur = segDur * n - fadeDur * (n - 1)

    const outPath = path.join(tmpDir, 'ad.mp4')
    const args    = []

    if (useVideo) {
      // Video clip inputs — just reference the file
      for (const p of filePaths) args.push('-i', p)
    } else {
      // Static image inputs — loop each for segDur
      for (const p of filePaths) args.push('-loop', '1', '-t', String(segDur + 0.1), '-i', p)
    }
    if (musicFilePath) args.push('-i', musicFilePath)

    const scaleChain = [
      'scale=1080:1920:force_original_aspect_ratio=decrease',
      'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black',
      'setsar=1',
      'fps=30',
      'format=yuv420p',
    ].join(',')

    const filterParts = []
    for (let i = 0; i < n; i++) {
      filterParts.push(`[${i}:v]${scaleChain}[v${i}]`)
    }

    let prevLabel  = 'v0'
    let finalLabel = 'v0'
    for (let i = 1; i < n; i++) {
      const offset   = parseFloat(((segDur - fadeDur) * i).toFixed(3))
      const outLabel = i === n - 1 ? 'vout' : `x${i}`
      filterParts.push(`[${prevLabel}][v${i}]xfade=transition=fade:duration=${fadeDur}:offset=${offset}[${outLabel}]`)
      prevLabel  = outLabel
      finalLabel = outLabel
    }

    args.push('-filter_complex', filterParts.join(';'))
    args.push('-map', `[${finalLabel}]`)

    const musicInputIdx = n  // index of the music input stream
    if (musicFilePath) {
      args.push('-map', `${musicInputIdx}:a`)
      args.push('-c:a', 'aac', '-b:a', '128k')
      args.push('-af', `afade=t=in:st=0:d=1,afade=t=out:st=${Math.max(0, totalDur - 2).toFixed(1)}:d=2`)
      args.push('-shortest')
    } else {
      args.push('-an')
    }

    args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '26')
    args.push('-r', '30', '-movflags', '+faststart')
    args.push('-y', outPath)

    const ffmpegBin = resolveFfmpegPath()
    console.log(`[compile-ad] running ffmpeg — ${n} scenes, ~${totalDur.toFixed(0)}s`)

    await execFileAsync(ffmpegBin, args, { timeout: 240_000, maxBuffer: 50 * 1024 * 1024 })

    const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1)
    console.log(`[compile-ad] encoded: ${sizeMB}MB`)

    // ── 4. Upload to Supabase ─────────────────────────────────────────────────
    const adminClient  = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const storage      = adminClient.storage.from('identity-images')
    const safeName     = (conceptTitle || 'ad').replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 30)
    const storagePath  = `jarvis-ads/${user.id}/${Date.now()}-${safeName}.mp4`

    const videoBuffer  = fs.readFileSync(outPath)
    const { error: uploadErr } = await storage.upload(storagePath, videoBuffer, { contentType: 'video/mp4', upsert: true })
    if (uploadErr) throw new Error(`Supabase upload failed: ${uploadErr.message}`)

    const { data: { publicUrl } } = storage.getPublicUrl(storagePath)
    console.log(`[compile-ad] ✅ uploaded ${sizeMB}MB → ${publicUrl.slice(0, 80)}`)

    return NextResponse.json({ status: 'success', videoUrl: publicUrl, durationS: Math.round(totalDur), sizeMB: parseFloat(sizeMB) })

  } catch (err) {
    console.error('[compile-ad] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }) } catch {}
  }
}
