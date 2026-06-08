import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const maxDuration = 120

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

// ─── Prompt Compiler ─────────────────────────────────────────────────────────
// Takes storyboard scene data and compiles a structured Runway payload.
// This is the missing translation layer between the rich storyboard and Runway.

const NEGATIVE_PROMPT =
  'people, faces, hands, fingers, humans, crowd, person, man, woman, ' +
  'text overlay, watermark, logo, blurry, low quality, distorted, ugly, ' +
  'deformed, noisy, pixelated, overexposed, underexposed, cartoonish, ' +
  'anime, illustrated, painting, duplicate, morbid, mutilated'

const MOTION_BY_SCENE_TYPE = {
  hook:           'dynamic push in, handheld energy, fast-cut rhythm',
  pain_point:     'slow zoom, heavy atmosphere, desaturated motion',
  product:        'smooth product reveal, 360-degree orbit, macro focus pull',
  lifestyle:      'cinematic dolly forward, golden hour drift, naturalistic motion',
  transformation: 'fast-cut contrast, bright pull, energetic transition',
  cta:            'slow pull back, confident hold, clean static frame',
  founder:        'subtle push in, steady and authoritative, minimal motion',
}

const SHOT_TO_FRAMING = {
  extreme_close_up: 'extreme macro close-up filling entire frame',
  close_up:         'tight close-up, shallow depth of field, subject fills frame',
  medium_close_up:  'medium close-up, subject fills upper two-thirds of frame',
  medium:           'medium shot, environment visible around subject',
  wide:             'wide establishing shot, full environmental context',
  overhead:         'top-down overhead perspective, flat lay composition',
}

const LIGHTING_BY_STYLE = {
  luxury:      'soft dramatic side lighting, deep shadows, premium contrast',
  minimal:     'clean even lighting, bright whites, studio-quality diffusion',
  cinematic:   'moody directional key light, film-grade color science',
  natural:     'natural window light, warm ambient fill, golden hour tones',
  dark:        'low-key dark environment, controlled rim light, deep blacks',
}

function compileRunwayPayload(scene, previewUrl) {
  // Strip people/face words — Runway content moderation
  const basePrompt = (scene.visual_direction || scene.dalle_prompt || '').slice(0, 500)
  const cleanBase  = basePrompt
    .replace(/\b(person|people|man|woman|human|face|portrait|smil\w*|testimonial|candid|interview|talking head|looking at camera)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Layer: shot framing
  const shotFraming  = SHOT_TO_FRAMING[scene.shot] || ''

  // Layer: motion direction (use scene type if present, else label as fallback)
  const sceneType    = (scene.type || scene.label || '').toLowerCase().replace(/\s+/g, '_')
  const motionGuide  = MOTION_BY_SCENE_TYPE[sceneType] || MOTION_BY_SCENE_TYPE[scene.label?.toLowerCase()] || 'cinematic smooth motion, subtle camera movement'

  // Layer: cinematic quality suffix
  const qualitySuffix = 'vertical 9:16 frame, cinematic color grade, premium ad quality, 4K sharp'

  // Compile final prompt — ordered from most specific to most general
  const parts = [cleanBase, shotFraming, motionGuide, qualitySuffix].filter(Boolean)
  const promptText = parts.join('. ') || `Cinematic ${scene.label || 'scene'} visual`

  return {
    model:          'gen4_turbo',
    promptText,
    negativePrompt: NEGATIVE_PROMPT,
    promptImage:    previewUrl,
    ratio:          '720:1280',
    duration:       (scene.duration || 5) >= 8 ? 10 : 5,
  }
}

// POST /api/jarvis-studio/produce
// Body: { concept, assets, scenePreviews?, musicTrackId?, musicUrl? }
// Returns: { jobs: { avatarId?, avatarStatus, sceneJobs, musicUrl, conceptId } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { concept, assets, scenePreviews = {}, musicTrackId, musicUrl } = await req.json()
    if (!concept?.scenes?.length) return NextResponse.json({ error: 'concept with scenes required' }, { status: 400 })

    const admin = makeAdmin()

    // Get user's API keys
    const { data: integrations } = await admin
      .from('user_integrations')
      .select('heygen_api_key, runway_api_key')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    const runwayKey = integrations?.runway_api_key

    const heygenScenes = concept.scenes.filter(s => s.generator === 'heygen' && s.script)
    const runwayScenes = concept.scenes.filter(s => s.generator === 'runway')

    // ── Pre-generate DALL-E images for Runway scenes missing storyboard previews ──
    // Use safe prompts: strip people/faces/brands so DALL-E 3 content policy passes.
    // Generate sequentially (not Promise.all) to avoid 5 RPM rate limit.
    if (runwayKey && runwayScenes.length > 0) {
      const missing = runwayScenes.filter(s => !scenePreviews[s.id])
      if (missing.length > 0) {
        const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
        for (const s of missing) {
          if (!xaiKey) { console.error('[produce] XAI_API_KEY not configured — skipping fallback'); break }
          try {
            const raw = (s.dalle_prompt || s.visual_direction || '').slice(0, 400)
              .replace(/\b(person|people|man|woman|human|face|portrait|smil\w*|testimonial|candid|interview)\b/gi, '')
              .replace(/\s{2,}/g, ' ').trim()
            const prompt = `${raw || `Cinematic vertical advertisement frame, ${s.label || 'scene'}`}. No people, no faces, no logos, vertical 9:16 format.`
            const r = await fetch('https://api.x.ai/v1/images/generations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
              body: JSON.stringify({ model: 'grok-imagine-image-quality', prompt, aspect_ratio: '9:16' }),
            })
            const d = await r.json()
            if (!r.ok) { console.error('[produce] xAI fallback error:', d?.error?.message); continue }
            const url = d?.data?.[0]?.url || d?.images?.[0]?.url || d?.url
            if (url) { scenePreviews[s.id] = url; console.log('[produce] xAI fallback OK for', s.id) }
          } catch (e) {
            console.error('[produce] xAI fallback failed for scene', s.id, e.message)
          }
        }
      }
    }

    let avatarId     = null
    let avatarStatus = 'not_needed'
    let avatarError  = null

    // ── HeyGen: Create photo avatar ──────────────────────────────────────────
    if (heygenScenes.length > 0) {
      if (!heygenKey) {
        avatarStatus = 'no_key'
      } else if (!assets?.founderStoragePath) {
        avatarStatus = 'no_founder_image'
      } else {
        try {
          const { data: signedData } = await admin.storage
            .from(assets.founderBucket || 'edit-studio-exports')
            .createSignedUrl(assets.founderStoragePath, 7200) // 2-hour window

          const signedUrl = signedData?.signedUrl
          if (!signedUrl) throw new Error('Could not generate signed URL for founder image')

          // Try v3 photo avatar creation
          const avatarRes = await fetch('https://api.heygen.com/v3/avatars', {
            method: 'POST',
            headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'photo',
              name: `jarvis_${concept.id}_${Date.now()}`,
              file: { type: 'url', url: signedUrl },
            }),
          })

          const avatarData = await avatarRes.json()

          // Handle multiple possible response shapes
          avatarId =
            avatarData?.data?.avatar_item?.id ||
            avatarData?.data?.id ||
            avatarData?.data?.avatar_id ||
            null

          if (avatarId) {
            const rawStatus = (
              avatarData?.data?.avatar_item?.status ||
              avatarData?.data?.status ||
              'processing'
            ).toLowerCase()

            if (rawStatus === 'processing' || rawStatus === 'pending' || rawStatus === 'queued' || rawStatus === 'training') {
              avatarStatus = 'processing'
            } else {
              avatarStatus = 'ready'
            }
          } else {
            const errDetail = avatarData?.error?.message || avatarData?.message || JSON.stringify(avatarData).slice(0, 200)
            console.error('HeyGen avatar creation: no ID returned.', errDetail)
            avatarStatus = 'error'
            avatarError = `HeyGen avatar creation failed: ${errDetail}`
          }
        } catch (e) {
          console.error('HeyGen avatar creation error:', e.message)
          avatarStatus = 'error'
          avatarError = e.message
        }
      }
    }

    // ── HeyGen: Get voice ID ─────────────────────────────────────────────────
    let voiceId = null
    if (heygenKey && heygenScenes.length > 0) {
      try {
        const voiceRes = await fetch('https://api.heygen.com/v2/voices', {
          headers: { 'X-Api-Key': heygenKey },
        })
        if (voiceRes.ok) {
          const voiceData = await voiceRes.json()
          const voices = (voiceData?.data?.voices || []).filter(
            v => v.language === 'English' || v.locale?.startsWith('en') || v.language_code?.startsWith('en')
          )
          voiceId = voices[0]?.voice_id || null
        }
      } catch {}
      // voiceId remains null if fetch fails — video generation will still attempt without it
    }

    // ── Build scene jobs ─────────────────────────────────────────────────────
    const sceneJobs = []

    for (const scene of concept.scenes) {
      if (scene.generator === 'heygen') {
        // No key or no founder image → skip gracefully
        if (!heygenKey || avatarStatus === 'no_key' || avatarStatus === 'no_founder_image') {
          sceneJobs.push({
            sceneId: scene.id, generator: 'heygen',
            status: 'skipped_no_key', script: scene.script || '',
            videoId: null, videoUrl: null,
          })
          continue
        }

        // Avatar creation failed → error
        if (avatarStatus === 'error' || !avatarId) {
          sceneJobs.push({
            sceneId: scene.id, generator: 'heygen',
            status: 'error', script: scene.script || '',
            error: avatarError || 'Avatar creation failed',
            videoId: null, videoUrl: null,
          })
          continue
        }

        // Avatar still processing → queue for later
        if (avatarStatus === 'processing') {
          sceneJobs.push({
            sceneId: scene.id, generator: 'heygen',
            status: 'awaiting_avatar', script: scene.script || '',
            videoId: null, videoUrl: null,
          })
          continue
        }

        // Avatar ready → start generation immediately
        try {
          const genBody = {
            video_inputs: [{
              character: { type: 'avatar', avatar_id: avatarId, avatar_style: 'normal' },
              voice: {
                type: 'text',
                input_text: scene.script || 'Hello.',
                speed: 1.0,
              },
              background: { type: 'color', value: '#0a0a0a' },
            }],
            dimension: { width: 1080, height: 1920 },
            test: false,
          }
          if (voiceId) genBody.video_inputs[0].voice.voice_id = voiceId

          const genRes = await fetch('https://api.heygen.com/v2/video/generate', {
            method: 'POST',
            headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
            body: JSON.stringify(genBody),
          })
          const genData = await genRes.json()
          const videoId = genData?.data?.video_id
          if (videoId) {
            sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: 'generating', script: scene.script || '', videoId, videoUrl: null })
          } else {
            const errMsg = genData?.error?.message || genData?.message || JSON.stringify(genData).slice(0, 200)
            sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: 'error', script: scene.script || '', error: `HeyGen generate: ${errMsg}`, videoId: null, videoUrl: null })
          }
        } catch (e) {
          sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: 'error', script: scene.script || '', error: e.message, videoId: null, videoUrl: null })
        }

      } else if (scene.generator === 'runway') {
        if (!runwayKey) {
          sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'skipped_no_key', taskId: null, videoUrl: null })
          continue
        }
        try {
          const previewUrl = scenePreviews[scene.id] || null

          // image_to_video requires promptImage — skip gracefully if no storyboard preview exists
          if (!previewUrl) {
            sceneJobs.push({
              sceneId: scene.id, generator: 'runway',
              status: 'error',
              error: 'No storyboard preview image — generate storyboard first, then produce',
              taskId: null, videoUrl: null,
            })
            continue
          }

          // Compile full structured Runway payload — shot + motion + framing + negative prompts
          const runwayBody = compileRunwayPayload(scene, previewUrl)
          // Debug: brand anchors + validation + full compiled prompt
          if (scene.brand_anchors?.length) console.log('[produce] brand anchors:', scene.brand_anchors.join(' | '))
          if (scene.brand_check)          console.log('[produce] brand check:  ', scene.brand_check.slice(0, 120))
          console.log('[produce] compiled prompt  :', runwayBody.promptText.slice(0, 400))

          const runRes = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${runwayKey}`,
              'Content-Type': 'application/json',
              'X-Runway-Version': '2024-11-06',
            },
            body: JSON.stringify(runwayBody),
          })
          const runData = await runRes.json()
          console.log('[Runway] response:', JSON.stringify(runData).slice(0, 500))
          const taskId = runData?.id
          if (taskId) {
            sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'generating', taskId, videoUrl: null })
          } else {
            const errMsg = (typeof runData?.error === 'string' ? runData.error : runData?.error?.message) || runData?.message || JSON.stringify(runData).slice(0, 300)
            sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'error', error: `Runway: ${errMsg}`, taskId: null, videoUrl: null })
          }
        } catch (e) {
          sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'error', error: e.message, taskId: null, videoUrl: null })
        }
      }
    }

    // ── Resolve music URL ────────────────────────────────────────────────────
    let resolvedMusicUrl = musicUrl || null
    if (musicTrackId && !resolvedMusicUrl) {
      const { data: track } = await admin.from('music_tracks').select('preview_url').eq('id', musicTrackId).single()
      if (track?.preview_url) resolvedMusicUrl = track.preview_url
    }

    const jobs = {
      conceptId:    concept.id,
      conceptTitle: concept.title,
      avatarId,
      avatarStatus,
      avatarError:  avatarError || null,
      voiceId,
      heygenKey:    heygenKey ? 'present' : 'missing',
      runwayKey:    runwayKey ? 'present' : 'missing',
      sceneJobs,
      musicUrl:     resolvedMusicUrl,
      pollCount:    0,
      startedAt:    Date.now(),
    }

    return NextResponse.json({ status: 'success', jobs })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
