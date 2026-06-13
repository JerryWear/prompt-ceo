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

// Find a system font for drawtext — tries common Vercel/Linux/macOS paths
function findSystemFont() {
  const candidates = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf',
    '/System/Library/Fonts/Helvetica.ttc',
    'C:\\Windows\\Fonts\\arialbd.ttf',
  ]
  return candidates.find(p => { try { return fs.existsSync(p) } catch { return false } }) || null
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

  const { scenes = [], conceptTitle = 'Ad', musicUrl, voiceScript } = await req.json()

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
        const musicExists = fs.existsSync(musicFilePath) && fs.statSync(musicFilePath).size > 0
        if (!musicExists) {
          console.warn('[compile-ad] music file empty or missing — skipping music')
          musicFilePath = null
        } else {
          console.log('[compile-ad] music downloaded')
        }
      } catch (e) {
        console.warn('[compile-ad] music download failed — continuing without:', e.message)
        musicFilePath = null
      }
    }

    // ── 2b. Optional TTS voiceover ───────────────────────────────────────────
    let voiceFilePath = null
    if (voiceScript && process.env.OPENAI_API_KEY) {
      try {
        const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
          method:  'POST',
          headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
          body:    JSON.stringify({ model: 'tts-1', voice: 'onyx', input: voiceScript, response_format: 'mp3' }),
        })
        if (ttsRes.ok) {
          voiceFilePath = path.join(tmpDir, 'voice.mp3')
          const buffer  = Buffer.from(await ttsRes.arrayBuffer())
          fs.writeFileSync(voiceFilePath, buffer)
          console.log('[compile-ad] TTS voiceover generated ✓')
        } else {
          console.warn('[compile-ad] TTS API error:', ttsRes.status)
        }
      } catch (err) {
        console.warn('[compile-ad] TTS failed — continuing without voiceover:', err.message)
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
    if (voiceFilePath) args.push('-i', voiceFilePath)

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

    // ── Caption drawtext overlays ─────────────────────────────────────────────
    // Each scene can have a caption shown as a text overlay.
    // Captions are the ONLY source of marketing copy — never burned into images.
    const fontFile   = findSystemFont()
    const hasCaptions = fontFile && activeScenes.some(s => s.caption?.trim())

    if (hasCaptions) {
      let captionLabel = finalLabel
      activeScenes.forEach((scene, i) => {
        const text = scene.caption?.trim()
        if (!text) return
        // Segment start time in the output timeline
        const segStart = parseFloat(((segDur - fadeDur) * i).toFixed(3))
        const showFrom = parseFloat((segStart + 0.35).toFixed(3))
        const showTo   = parseFloat((segStart + segDur - 0.45).toFixed(3))
        const outLabel = `cap${i}`
        // Escape special characters for FFmpeg drawtext
        const safeTxt = text.replace(/\\/g, '\\\\').replace(/'/g, "’").replace(/:/g, '\\:').replace(/,/g, '\\,')
        filterParts.push(
          `[${captionLabel}]drawtext=fontfile='${fontFile}':text='${safeTxt}':fontsize=44:fontcolor=white:` +
          `x=(w-text_w)/2:y=h*0.82:box=1:boxcolor=black@0.55:boxborderw=16:` +
          `enable='between(t\\,${showFrom}\\,${showTo})'[${outLabel}]`
        )
        captionLabel = outLabel
      })
      finalLabel = captionLabel
      console.log(`[compile-ad] captions: ${activeScenes.filter(s => s.caption?.trim()).length} overlays using ${fontFile}`)
    } else if (!fontFile) {
      console.warn('[compile-ad] no system font found — captions skipped')
    }

    // Audio mix lives in the same filter_complex as video — FFmpeg only allows one.
    // Input indices: scenes = 0..n-1, music = n (if present), voice = n (voice-only) or n+1 (both).
    if (voiceFilePath && musicFilePath) {
      const musicIdx = n
      const voiceIdx = n + 1
      filterParts.push(`[${musicIdx}:a]volume=0.15[quietmusic]`)
      filterParts.push(`[${voiceIdx}:a][quietmusic]amix=inputs=2:duration=first[aout]`)
    }

    args.push('-filter_complex', filterParts.join(';'))
    args.push('-map', `[${finalLabel}]`)

    if (voiceFilePath && musicFilePath) {
      args.push('-map', '[aout]')
      args.push('-c:a', 'aac', '-b:a', '128k')
    } else if (musicFilePath) {
      args.push('-map', `${n}:a`)
      args.push('-c:a', 'aac', '-b:a', '128k')
      args.push('-af', `afade=t=in:st=0:d=1,afade=t=out:st=${Math.max(0, totalDur - 2).toFixed(1)}:d=2`)
      args.push('-shortest')
    } else if (voiceFilePath) {
      args.push('-map', `${n}:a`)
      args.push('-c:a', 'aac', '-b:a', '128k')
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
