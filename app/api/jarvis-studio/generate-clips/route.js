import { NextResponse }            from 'next/server'
import { createServerClient }      from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }                 from 'next/headers'
import RunwayML                    from '@runwayml/sdk'

export const maxDuration = 300

// Motion language per scene type
const MOTION = {
  Hook:           { camera: 'Slow cinematic push in. Camera moves forward with deliberate intent.',        mood: 'Tense. Dark. Something important is about to be revealed.' },
  Problem:        { camera: 'Slight handheld drift. Camera searches but finds no escape.',                 mood: 'Heavy. Overwhelming. The weight of the problem fills the frame.' },
  Solution:       { camera: 'Smooth, precise forward motion. Clean and controlled.',                       mood: 'Relief. Clarity. Everything snaps into focus.' },
  Transformation: { camera: 'Camera slowly pulls back to reveal the full picture.',                        mood: 'Triumphant. Light increases. Freedom and control.' },
  CTA:            { camera: 'Static shot with a subtle, slow zoom in.',                                    mood: 'Direct. Confident. No hesitation.' },
}

// If the preview was stored as a base64 data URI, upload it to Supabase
// so Runway receives a real HTTPS URL it can fetch
async function ensureHttpsUrl(imageUrl, sceneId, userId) {
  if (!imageUrl?.startsWith('data:')) return imageUrl

  try {
    const mimeMatch = imageUrl.match(/^data:([^;]+);base64,/)
    const mime      = mimeMatch?.[1] || 'image/jpeg'
    const b64       = imageUrl.split(',')[1]
    const buf       = Buffer.from(b64, 'base64')
    const ext       = mime.includes('png') ? 'png' : 'jpg'
    const storagePath = `jarvis-previews/${userId}/${Date.now()}-${sceneId}.${ext}`

    const admin   = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const storage = admin.storage.from('identity-images')
    const { error } = await storage.upload(storagePath, buf, { contentType: mime, upsert: true })
    if (error) throw new Error(error.message)

    const { data: { publicUrl } } = storage.getPublicUrl(storagePath)
    console.log(`[generate-clips] uploaded base64 → ${publicUrl.slice(0, 80)}`)
    return publicUrl
  } catch (e) {
    console.warn(`[generate-clips] base64 upload failed for ${sceneId}: ${e.message} — using data URI`)
    return imageUrl // fall back: let Runway try; it may reject, but we log it
  }
}

async function generateOneClip(scene, runwayKey, userId) {
  const m         = MOTION[scene.label] || MOTION.Hook
  const visual    = (scene.visual_scene || scene.dalle_prompt || '').slice(0, 250)
  const promptText = `${visual}. ${m.camera} ${m.mood} Cinematic vertical advertisement. Professional commercial quality. 9:16.`

  // Ensure Runway gets an HTTPS URL (base64 data URIs are rejected by the API)
  const imageUrl = await ensureHttpsUrl(scene.imageUrl, scene.id, userId)

  console.log(`[generate-clips] starting ${scene.label} (${scene.id}) — image: ${imageUrl.slice(0, 60)} — prompt: "${promptText.slice(0, 80)}"`)

  const client = new RunwayML({ apiKey: runwayKey })

  // gen3a_turbo: proven stable API format — 5s vertical clips, image-to-video
  const task = await client.imageToVideo.create({
    model:       'gen3a_turbo',
    promptText,
    promptImage: imageUrl,
    ratio:       '768:1280',
    duration:    5,
  })

  const taskId = task.id
  console.log(`[generate-clips] task ${taskId} queued for ${scene.label}`)

  // Poll until SUCCEEDED or FAILED (max 150s)
  const deadline = Date.now() + 150_000
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 5_000))
    const poll = await client.tasks.retrieve(taskId)

    if (poll.status === 'SUCCEEDED') {
      const videoUrl = poll.output?.[0]
      if (!videoUrl) throw new Error(`Runway SUCCEEDED but no output URL for ${scene.id}`)
      console.log(`[generate-clips] ✓ ${scene.label} complete → ${videoUrl.slice(0, 60)}`)
      return { id: scene.id, label: scene.label, videoUrl, taskId }
    }
    if (poll.status === 'FAILED')    throw new Error(`Runway FAILED: ${poll.failure || poll.failureCode || 'unknown'}`)
    if (poll.status === 'CANCELLED') throw new Error(`Runway CANCELLED: task was cancelled (check account limits or content policy)`)
    console.log(`[generate-clips] ${scene.label} — ${poll.status} (${poll.progress ?? '?'})`)
  }

  throw new Error(`Clip timed out after 150s for ${scene.label}`)
}

// POST /api/jarvis-studio/generate-clips
// Body: { scenes: [{ id, label, imageUrl, visual_scene?, dalle_prompt? }] }
// Returns: { clips: [{ id, label, videoUrl }], failed: [{ id, label, error }] }
export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase    = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    // Platform key first, then user's own Runway key from DB
    let runwayKey = process.env.RUNWAYML_API_SECRET
    if (!runwayKey) {
      const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      const { data } = await admin.from('user_integrations').select('runway_api_key').eq('user_id', user.id).single()
      runwayKey = data?.runway_api_key || null
    }
    if (!runwayKey) {
      return NextResponse.json({
        error: 'No Runway API key found. Add RUNWAYML_API_SECRET to Vercel environment variables, or connect your Runway key in Account Settings.',
      }, { status: 500 })
    }
    console.log(`[generate-clips] using ${process.env.RUNWAYML_API_SECRET ? 'platform' : 'user'} Runway key`)

    const { scenes = [] } = await req.json()
    const ready = scenes.filter(s => s.imageUrl)
    if (ready.length < 2) return NextResponse.json({ error: 'At least 2 scenes with images required' }, { status: 400 })

    console.log(`[generate-clips] launching ${ready.length} clips in parallel`)
    const results = await Promise.allSettled(ready.map(s => generateOneClip(s, runwayKey, user.id)))

    const clips  = []
    const failed = []
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        clips.push(r.value)
      } else {
        const s = ready[i]
        console.error(`[generate-clips] ✗ ${s.label}: ${r.reason?.message}`)
        failed.push({ id: s.id, label: s.label, error: r.reason?.message || 'Unknown error' })
      }
    })

    if (clips.length === 0) {
      return NextResponse.json({ error: 'All clips failed', failed }, { status: 500 })
    }

    console.log(`[generate-clips] done — ${clips.length} succeeded, ${failed.length} failed`)
    return NextResponse.json({ status: 'success', clips, failed, total: ready.length })

  } catch (err) {
    console.error('[generate-clips] route error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
