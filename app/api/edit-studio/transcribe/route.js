import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// ─── Config ───────────────────────────────────────────────────────────────────
// Whisper accepts: mp4, m4a, mov, webm, mp3, wav, mpeg — max 25 MB

const WHISPER_URL   = 'https://api.openai.com/v1/audio/transcriptions'
const WHISPER_MODEL = 'whisper-1'
const MAX_BYTES     = 25 * 1024 * 1024 // 25 MB

// ─── Supabase helper ─────────────────────────────────────────────────────────

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

// ─── Whisper normalisation ────────────────────────────────────────────────────
// Converts Whisper verbose_json → canonical Edit Studio transcript shape.
// avg_logprob is typically negative; exp(avg_logprob) gives a rough confidence.

function normaliseWhisper(whisper) {
  const avgConf = (whisper.segments || []).reduce((acc, s) => {
    return acc + Math.min(1, Math.max(0, Math.exp(s.avg_logprob ?? -0.3)))
  }, 0) / Math.max(1, (whisper.segments || []).length)

  return {
    provider:         'openai_whisper',
    language:         whisper.language || 'en',
    duration_seconds: whisper.duration || 0,
    confidence:       Math.round(avgConf * 100) / 100,
    segments: (whisper.segments || []).map((seg, i) => ({
      id:         `s${i}`,
      start:      seg.start,
      end:        seg.end,
      speaker:    'Speaker 1',
      text:       seg.text.trim(),
      confidence: Math.round(Math.min(1, Math.max(0, Math.exp(seg.avg_logprob ?? -0.3))) * 100) / 100,
    })),
    words: (whisper.words || []).map(w => ({
      start:      w.start,
      end:        w.end,
      word:       w.word.trim(),
      confidence: Math.round((w.probability ?? 0.9) * 100) / 100,
    })),
  }
}

// ─── Mock fallback ────────────────────────────────────────────────────────────
// Used when OPENAI_API_KEY is absent or Whisper returns an error.

function buildMockTranscript(durationHint = 29) {
  const segments = [
    { id: 's0', start: 0.0,        end: 3.4,         speaker: 'Speaker 1', text: 'Today I want to show you exactly how we grew from zero to ten thousand users…',          confidence: 0.98 },
    { id: 's1', start: 3.5,        end: 7.2,         speaker: 'Speaker 1', text: '…in just ninety days, using one simple content strategy most founders completely ignore.', confidence: 0.96 },
    { id: 's2', start: 7.6,        end: 12.1,        speaker: 'Speaker 1', text: 'First — stop trying to go viral. Seriously. Here is what actually works.',                confidence: 0.97 },
    { id: 's3', start: 12.3,       end: 17.8,        speaker: 'Speaker 1', text: 'You need to make content so specific to your ideal customer that no one else cares.',      confidence: 0.94 },
    { id: 's4', start: 18.0,       end: 23.5,        speaker: 'Speaker 1', text: 'When we started doing that, our conversion rate went up four hundred percent in three weeks.', confidence: 0.95 },
    { id: 's5', start: 23.8,       end: durationHint, speaker: 'Speaker 1', text: 'I am going to break down exactly how to do this in the next sixty seconds.',              confidence: 0.99 },
  ]
  return {
    provider:         'mock',
    language:         'en',
    duration_seconds: durationHint,
    confidence:       0.97,
    segments,
    words:            [],
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────
// Accepts multipart/form-data:
//   file          — the video/audio Blob (required for Whisper)
//   projectId     — UUID of the edit_projects row (optional)
//   sourceVideoName — filename string
//   sourceVideoType — MIME type string

export async function POST(req) {
  const log = makeRouteLogger('transcribe')
  try {
    // ── Parse multipart ──────────────────────────────────────────────────────
    let formData
    try {
      formData = await req.formData()
    } catch {
      return NextResponse.json({ status: 'error', message: 'Expected multipart/form-data' }, { status: 400 })
    }

    const file            = formData.get('file')            // Blob | null
    const projectId       = formData.get('projectId')       || null
    const sourceVideoName = formData.get('sourceVideoName') || 'video.mp4'
    const sourceVideoType = formData.get('sourceVideoType') || 'video/mp4'

    // ── Auth (optional — route still works for unauthenticated saves) ────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // ── File size guard ──────────────────────────────────────────────────────
    if (file && file.size > MAX_BYTES) {
      return NextResponse.json({
        status:  'error',
        message: `File exceeds the 25 MB Whisper limit (${(file.size / 1024 / 1024).toFixed(1)} MB). Compress the video or extract audio before transcribing.`,
      }, { status: 413 })
    }

    // ── Call Whisper ─────────────────────────────────────────────────────────
    let transcript
    let fallback       = false
    let fallbackReason = ''

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      fallback       = true
      fallbackReason = 'OPENAI_API_KEY not configured'
      transcript     = buildMockTranscript()
    } else if (!file) {
      fallback       = true
      fallbackReason = 'No file provided — using mock transcript for testing'
      transcript     = buildMockTranscript()
    } else {
      try {
        const whisperForm = new FormData()
        whisperForm.append('file', file, sourceVideoName)
        whisperForm.append('model', WHISPER_MODEL)
        whisperForm.append('response_format', 'verbose_json')
        whisperForm.append('timestamp_granularities[]', 'segment')
        whisperForm.append('timestamp_granularities[]', 'word')

        const whisperRes = await fetch(WHISPER_URL, {
          method:  'POST',
          headers: { Authorization: `Bearer ${apiKey}` },
          body:    whisperForm,
        })

        if (!whisperRes.ok) {
          const errText = await whisperRes.text().catch(() => whisperRes.statusText)
          throw new Error(`Whisper ${whisperRes.status}: ${errText}`)
        }

        const whisperData = await whisperRes.json()
        transcript = normaliseWhisper(whisperData)
      } catch (err) {
        fallback       = true
        fallbackReason = `Transcription provider error: ${err.message}`
        transcript     = buildMockTranscript()
      }
    }

    // ── Persist to Supabase (fire-and-forget, non-fatal) ────────────────────
    if (user) {
      try {
        // Upsert into edit_transcripts
        const { data: transcriptRow } = await supabase
          .from('edit_transcripts')
          .upsert(
            {
              project_id:       projectId || null,
              provider:         transcript.provider,
              language:         transcript.language,
              segments:         transcript.segments,
              duration_seconds: transcript.duration_seconds,
              word_count:       transcript.segments.reduce((n, s) => n + s.text.split(/\s+/).length, 0),
            },
            { onConflict: 'project_id', ignoreDuplicates: false }
          )
          .select('id')
          .maybeSingle()

        // Patch edit_projects: status + transcript_data
        if (projectId) {
          await supabase
            .from('edit_projects')
            .update({
              status:          fallback ? 'uploaded' : 'transcribed',
              transcript_data: transcript.segments,
            })
            .eq('id', projectId)
            .eq('user_id', user.id)
        }

        void transcriptRow // suppress unused var
      } catch {
        // Non-fatal — client still gets the transcript
      }
    }

    // ── Respond ──────────────────────────────────────────────────────────────
    log.success({ projectId, fallback, extra: { segments: transcript.segments?.length, provider: transcript.provider } })
    return NextResponse.json({
      status:          'success',
      ok:              true,
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      transcript,
    })
  } catch (err) {
    log.failure({ errorCode: 'TRANSCRIBE_FATAL', message: err.message })
    return NextResponse.json({ status: 'error', ok: false, message: err.message }, { status: 500 })
  }
}
