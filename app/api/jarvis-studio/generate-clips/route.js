import { NextResponse }       from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }            from 'next/headers'

export const maxDuration = 300

// Motion language per scene type — drives Runway generation
const MOTION = {
  Hook: {
    camera: 'Slow cinematic push in. Camera moves forward with deliberate intent.',
    mood:   'Tense. Dark. Something important is about to be revealed.',
  },
  Problem: {
    camera: 'Slight handheld drift. Camera searches but finds no escape.',
    mood:   'Heavy. Overwhelming. The weight of the problem fills the frame.',
  },
  Solution: {
    camera: 'Smooth, precise forward motion. Clean and controlled.',
    mood:   'Relief. Clarity. Everything snaps into focus.',
  },
  Transformation: {
    camera: 'Camera slowly pulls back to reveal the full picture.',
    mood:   'Triumphant. Light increases. Freedom and control.',
  },
  CTA: {
    camera: 'Static shot with a subtle, slow zoom in.',
    mood:   'Direct. Confident. No hesitation.',
  },
}

async function generateOneClip(scene, runwayKey) {
  const m = MOTION[scene.label] || MOTION.Hook

  // Combine scene visual description + motion direction
  const visual   = (scene.visual_scene || scene.dalle_prompt || scene.visual_direction || '').slice(0, 250)
  const promptText = `${visual}. ${m.camera} ${m.mood} Cinematic vertical advertisement. Professional commercial quality. 9:16.`

  console.log(`[generate-clips] starting ${scene.label} (${scene.id}): "${promptText.slice(0, 100)}"`)

  // ── Start Runway image-to-video task ────────────────────────────────────────
  const startRes = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
    method:  'POST',
    headers: {
      Authorization:      `Bearer ${runwayKey}`,
      'Content-Type':     'application/json',
      'X-Runway-Version': '2024-11-06',
    },
    body: JSON.stringify({
      model:       'gen4_turbo',
      promptText,
      promptImage: scene.imageUrl,
      ratio:       '768:1280', // 9:16 vertical
      duration:    5,
    }),
    signal: AbortSignal.timeout(30_000),
  })

  const startData = await startRes.json()
  if (!startRes.ok) throw new Error(startData.message || startData.error || `Runway ${startRes.status}`)
  const taskId = startData.id
  if (!taskId) throw new Error('No task ID returned from Runway')

  console.log(`[generate-clips] task ${taskId} queued for ${scene.label}`)

  // ── Poll until SUCCEEDED or FAILED (max 150s) ───────────────────────────────
  const deadline = Date.now() + 150_000
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 5_000))

    const pollRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
      headers: {
        Authorization:      `Bearer ${runwayKey}`,
        'X-Runway-Version': '2024-11-06',
      },
      signal: AbortSignal.timeout(15_000),
    })
    const poll = await pollRes.json()

    if (poll.status === 'SUCCEEDED') {
      const videoUrl = poll.output?.[0]
      if (!videoUrl) throw new Error(`Runway SUCCEEDED but no output URL for ${scene.id}`)
      console.log(`[generate-clips] ✓ ${scene.label} complete`)
      return { id: scene.id, label: scene.label, videoUrl, taskId }
    }
    if (poll.status === 'FAILED' || poll.status === 'CANCELLED') {
      throw new Error(`Runway ${poll.status}: ${poll.failure || poll.failureCode || 'unknown reason'}`)
    }
    console.log(`[generate-clips] ${scene.label} — ${poll.status} (progress: ${poll.progress ?? '?'})`)
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

    // Try platform key first, then fall back to user's own Runway key in DB
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

    // All clips generated in parallel — Runway handles concurrency on their end
    const results = await Promise.allSettled(ready.map(s => generateOneClip(s, runwayKey)))

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
