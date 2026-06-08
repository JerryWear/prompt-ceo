import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { execFile as _execFile } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'

export const maxDuration = 300

const execFileAsync = promisify(_execFile)

// ffmpeg-static bundles a platform-specific binary that works on Vercel (Linux).
// We fall back to system ffmpeg if the static binary is missing.
let FFMPEG_BIN = 'ffmpeg'
try {
  const staticPath = require('ffmpeg-static')
  if (staticPath && fs.existsSync(staticPath)) {
    FFMPEG_BIN = staticPath
    console.log('[assemble] using ffmpeg-static:', staticPath)
  }
} catch { /* ffmpeg-static not installed — use system ffmpeg */ }

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

function makeAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function checkFfmpeg() {
  try {
    await execFileAsync(FFMPEG_BIN, ['-version'], { timeout: 5000 })
    return true
  } catch { return false }
}

async function downloadClip(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download clip: ${res.status} ${url.slice(0, 80)}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buffer)
}

// POST /api/jarvis-studio/assemble
// Body: { clips: [{ sceneId, videoUrl }], musicUrl?, conceptId, conceptTitle? }
// Returns: { status: 'complete'|'no_ffmpeg', assembledUrl? }
export async function POST(req) {
  const workDir = path.join(os.tmpdir(), `jarvis_assemble_${Date.now()}`)
  fs.mkdirSync(workDir, { recursive: true })

  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { clips, musicUrl, conceptId, conceptTitle } = await req.json()
    if (!clips?.length) return NextResponse.json({ error: 'clips array required' }, { status: 400 })

    const ffmpegAvailable = await checkFfmpeg()
    if (!ffmpegAvailable) {
      return NextResponse.json({
        status: 'no_ffmpeg',
        message: 'FFmpeg not available in this environment. Download individual clips instead.',
      })
    }

    // 1. Download all clips
    const clipPaths = []
    for (let i = 0; i < clips.length; i++) {
      const clipPath = path.join(workDir, `clip_${i}.mp4`)
      await downloadClip(clips[i].videoUrl, clipPath)
      clipPaths.push(clipPath)
      console.log('[assemble] Downloaded clip', i, '→', clipPath)
    }

    // 2. Write FFmpeg concat file
    const concatFile = path.join(workDir, 'concat.txt')
    const concatContent = clipPaths.map(p => `file '${p}'`).join('\n')
    fs.writeFileSync(concatFile, concatContent)

    // 3. Assemble clips (with or without music)
    const outputPath = path.join(workDir, 'assembled.mp4')

    if (musicUrl) {
      // Download music
      const musicPath = path.join(workDir, 'music.mp3')
      await downloadClip(musicUrl, musicPath)

      // Concat video clips, then mix in music at -20dB
      const concatPath = path.join(workDir, 'concat_raw.mp4')
      await execFileAsync(FFMPEG_BIN, [
        '-f', 'concat', '-safe', '0', '-i', concatFile,
        '-c', 'copy', concatPath,
      ], { timeout: 180000 })

      await execFileAsync(FFMPEG_BIN, [
        '-i', concatPath,
        '-i', musicPath,
        '-filter_complex', '[0:a][1:a]amix=inputs=2:duration=first:weights=1 0.15[a]',
        '-map', '0:v', '-map', '[a]',
        '-c:v', 'copy', '-c:a', 'aac', '-shortest',
        outputPath,
      ], { timeout: 180000 })
    } else {
      // Concat video only
      await execFileAsync(FFMPEG_BIN, [
        '-f', 'concat', '-safe', '0', '-i', concatFile,
        '-c', 'copy', outputPath,
      ], { timeout: 180000 })
    }

    // 4. Upload assembled video to Supabase
    const admin = makeAdmin()
    const fileName = `${conceptId || 'ad'}_${Date.now()}.mp4`
    const storagePath = `jarvis-studio/${user.id}/${fileName}`
    const fileBuffer = fs.readFileSync(outputPath)

    const { error: uploadErr } = await admin.storage
      .from('edit-studio-exports')
      .upload(storagePath, fileBuffer, { contentType: 'video/mp4', upsert: true })

    if (uploadErr) throw new Error(`Upload failed: ${uploadErr.message}`)

    const { data: signedData } = await admin.storage
      .from('edit-studio-exports')
      .createSignedUrl(storagePath, 86400) // 24h download link

    return NextResponse.json({
      status: 'complete',
      assembledUrl: signedData?.signedUrl,
      fileName: conceptTitle ? `${conceptTitle}.mp4` : fileName,
      clipCount: clips.length,
      hasMusic: !!musicUrl,
    })

  } catch (err) {
    console.error('[assemble] Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  } finally {
    // Always clean up temp files
    try { fs.rmSync(workDir, { recursive: true, force: true }) } catch {}
  }
}
