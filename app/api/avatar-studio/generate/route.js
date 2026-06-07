import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 120

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST { script, avatarId? }
// 1. ElevenLabs TTS with cloned voice → audio binary
// 2. Upload audio to Supabase Storage
// 3. HeyGen video generation with photo avatar + custom audio
// Returns { videoId } — client polls /video-status
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { script, avatarId: bodyAvatarId } = await req.json()
    if (!script?.trim()) return NextResponse.json({ error: 'Script is required' }, { status: 400 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('elevenlabs_api_key, elevenlabs_voice_id, heygen_api_key, heygen_personal_avatar_id')
      .eq('user_id', user.id)
      .single()

    const elKey = integrations?.elevenlabs_api_key
    const voiceId = integrations?.elevenlabs_voice_id
    const heygenKey = integrations?.heygen_api_key
    const avatarId = bodyAvatarId || integrations?.heygen_personal_avatar_id

    if (!elKey) return NextResponse.json({ error: 'ElevenLabs API key missing' }, { status: 400 })
    if (!voiceId) return NextResponse.json({ error: 'No voice clone found. Record your voice first.' }, { status: 400 })
    if (!heygenKey) return NextResponse.json({ error: 'HeyGen API key missing' }, { status: 400 })
    if (!avatarId) return NextResponse.json({ error: 'No avatar found. Upload your photo first.' }, { status: 400 })

    // Step 1: ElevenLabs TTS → audio binary
    console.log('[avatar-studio/generate] Calling ElevenLabs TTS, voiceId:', voiceId)
    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': elKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: script.trim(),
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    })

    if (!ttsRes.ok) {
      const errText = await ttsRes.text()
      return NextResponse.json({ error: `ElevenLabs TTS failed: ${errText.slice(0, 300)}` }, { status: 500 })
    }

    const audioBuffer = Buffer.from(await ttsRes.arrayBuffer())

    // Step 2: Upload audio to Supabase Storage
    const audioPath = `avatar-studio/${user.id}/voice_${Date.now()}.mp3`
    const { error: uploadErr } = await db.storage
      .from('identity-images')
      .upload(audioPath, audioBuffer, { contentType: 'audio/mpeg', upsert: true })

    if (uploadErr) return NextResponse.json({ error: `Audio upload failed: ${uploadErr.message}` }, { status: 500 })

    const { data: signedAudio } = await db.storage
      .from('identity-images')
      .createSignedUrl(audioPath, 7200)

    const audioUrl = signedAudio?.signedUrl
    if (!audioUrl) return NextResponse.json({ error: 'Could not get signed URL for audio' }, { status: 500 })

    // Step 3: HeyGen video generation
    console.log('[avatar-studio/generate] Calling HeyGen, avatarId:', avatarId)
    const heygenRes = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        video_inputs: [{
          character: {
            type: 'avatar',
            avatar_id: avatarId,
            avatar_style: 'normal',
          },
          voice: {
            type: 'audio',
            audio_url: audioUrl,
          },
          background: {
            type: 'color',
            value: '#000000',
          },
        }],
        dimension: { width: 720, height: 1280 },
        aspect_ratio: '9:16',
        test: false,
      }),
    })

    const heygenData = await heygenRes.json()
    console.log('[avatar-studio/generate] HeyGen response:', JSON.stringify(heygenData).slice(0, 300))

    if (!heygenRes.ok) {
      const msg = heygenData?.error?.message || heygenData?.message || JSON.stringify(heygenData).slice(0, 200)
      return NextResponse.json({ error: `HeyGen video generation failed: ${msg}` }, { status: 500 })
    }

    const videoId =
      heygenData?.data?.video_id ||
      heygenData?.video_id ||
      null

    if (!videoId) return NextResponse.json({ error: 'HeyGen returned no video_id' }, { status: 500 })

    return NextResponse.json({ status: 'generating', videoId, audioPath })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
