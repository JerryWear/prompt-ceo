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
    // Storyboard previews may not have loaded — generate fresh ones in parallel now
    // so Runway always has a valid promptImage (DALL-E URLs are valid for ~1hr after generation)
    if (runwayKey && runwayScenes.length > 0) {
      const missing = runwayScenes.filter(s => !scenePreviews[s.id])
      if (missing.length > 0) {
        await Promise.all(missing.map(async s => {
          try {
            const prompt = s.dalle_prompt || s.visual_direction || `${s.label} cinematic shot, vertical format`
            const r = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
              body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1792', quality: 'standard' }),
            })
            const d = await r.json()
            const url = d?.data?.[0]?.url
            if (url) scenePreviews[s.id] = url
          } catch (e) {
            console.error('[produce] DALL-E fallback failed for scene', s.id, e.message)
          }
        }))
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

          // Runway only accepts exactly 5 or 10 seconds
          const duration = (scene.duration || 5) >= 8 ? 10 : 5

          const promptText = (scene.visual_direction || scene.dalle_prompt || '').trim() || 'Cinematic scene'

          const runwayBody = {
            model: 'gen4_turbo',
            promptText,
            ratio: '720:1280',
            duration,
          }

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

          runwayBody.promptImage = previewUrl

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
