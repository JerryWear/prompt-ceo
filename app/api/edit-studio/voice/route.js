import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// Allow up to 30 seconds — TTS is fast, 30s is enough
export const maxDuration = 30

// ─── Voice personas ───────────────────────────────────────────────────────────

const VOICES = {
  founder_male:        { openaiVoice: 'onyx',    label: 'Founder Male',        description: 'Deep, authoritative'    },
  professional_male:   { openaiVoice: 'echo',    label: 'Professional Male',   description: 'Clear, trustworthy'     },
  professional_female: { openaiVoice: 'nova',    label: 'Professional Female', description: 'Warm, confident'        },
  ugc_creator:         { openaiVoice: 'fable',   label: 'UGC Creator',         description: 'Casual, authentic'      },
  energetic_creator:   { openaiVoice: 'shimmer', label: 'Energetic Creator',   description: 'High energy, punchy'    },
}

// Named export so the UI can import the voice list directly
export const VOICE_OPTIONS = Object.entries(VOICES).map(([key, v]) => ({ key, ...v }))

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

function makeAdminClient() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/voice
// Body: { adId, projectId, scriptText, voiceKey, duration }

export async function POST(req) {
  const log = makeRouteLogger('voice')

  try {
    const body = await req.json()
    const { adId, projectId, scriptText, voiceKey, duration } = body

    // ── Validate inputs ───────────────────────────────────────────────────────
    if (!scriptText) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'scriptText is required.' },
        { status: 400 }
      )
    }
    if (!voiceKey) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'voiceKey is required.' },
        { status: 400 }
      )
    }
    if (!projectId) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'projectId is required.' },
        { status: 400 }
      )
    }
    if (!adId) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'adId is required.' },
        { status: 400 }
      )
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Authentication required.' },
        { status: 401 }
      )
    }

    // ── Validate voiceKey ─────────────────────────────────────────────────────
    if (!VOICES[voiceKey]) {
      return NextResponse.json(
        {
          status: 'error',
          ok:     false,
          message: `Unknown voiceKey "${voiceKey}". Valid keys: ${Object.keys(VOICES).join(', ')}`,
        },
        { status: 400 }
      )
    }

    const voiceConfig = VOICES[voiceKey]
    const charCount   = scriptText.length

    // ── Mock fallback when API key is missing ─────────────────────────────────
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      log.info('OPENAI_API_KEY not configured — returning mock TTS response')
      return NextResponse.json({
        status:          'success',
        ok:              true,
        fallback:        true,
        fallback_reason: 'OPENAI_API_KEY not configured',
        voiceover_url:   null,
        storage_path:    null,
        voice_label:     voiceConfig.label,
        duration:        duration ?? null,
        char_count:      charCount,
      })
    }

    // ── Call OpenAI TTS ───────────────────────────────────────────────────────
    log.info(`Calling TTS (tts-1-hd, voice: ${voiceConfig.openaiVoice}, chars: ${charCount})`)

    const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:  'tts-1-hd',
        voice:  voiceConfig.openaiVoice,
        input:  scriptText,
        speed:  1.0,
      }),
    })

    if (!ttsRes.ok) {
      const errText = await ttsRes.text()
      throw new Error(`TTS API error ${ttsRes.status}: ${errText}`)
    }

    const audioBuffer = Buffer.from(await ttsRes.arrayBuffer())
    log.info(`TTS audio received (${(audioBuffer.length / 1024).toFixed(1)} KB)`)

    // ── Upload MP3 to Supabase Storage ────────────────────────────────────────
    const storagePath   = `voiceovers/${projectId}/${adId}_${voiceKey}_${duration ?? 'unknown'}.mp3`
    const supabaseAdmin = makeAdminClient()

    log.info(`Uploading audio to storage: ${storagePath}`)
    const { error: uploadError } = await supabaseAdmin.storage
      .from('edit-studio-assets')
      .upload(storagePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert:      true,
      })

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`)
    }

    // ── Create signed URL (1 hour) ────────────────────────────────────────────
    const { data: urlData, error: urlError } = await supabaseAdmin.storage
      .from('edit-studio-assets')
      .createSignedUrl(storagePath, 3600)

    if (urlError) {
      throw new Error(`Signed URL creation failed: ${urlError.message}`)
    }

    // ── Update edit_ads row ───────────────────────────────────────────────────
    const { error: updateError } = await supabaseAdmin
      .from('edit_ads')
      .update({
        voiceover_storage_path: storagePath,
        voiceover_voice:        voiceKey,
        status:                 'voiced',
      })
      .eq('id', adId)
      .eq('user_id', user.id)

    if (updateError) {
      log.failure({ adId, errorCode: 'DB_UPDATE_FAILED', message: updateError.message })
      return NextResponse.json(
        { status: 'error', ok: false, message: `Failed to update ad record: ${updateError.message}` },
        { status: 500 }
      )
    }

    log.success({
      projectId,
      extra: {
        adId,
        voiceKey,
        duration,
        char_count:  charCount,
        storage_path: storagePath,
      },
    })

    return NextResponse.json({
      status:        'success',
      ok:            true,
      voiceover_url: urlData.signedUrl,
      storage_path:  storagePath,
      voice_label:   voiceConfig.label,
      duration:      duration ?? null,
      char_count:    charCount,
    })
  } catch (err) {
    log.failure({ errorCode: 'VOICE_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
