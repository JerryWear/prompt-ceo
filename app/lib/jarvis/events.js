import { createClient } from '@supabase/supabase-js'
import { writeMemory } from './memory.js'

function makeAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ── Event type constants ───────────────────────────────────────────────────────
export const JARVIS_EVENTS = {
  // Ad Studio
  AD_CREATED:          'ad_created',
  AD_IMAGE_GENERATED:  'ad_image_generated',
  CAMPAIGN_CREATED:    'campaign_created',
  BRAND_DNA_SAVED:     'brand_dna_saved',
  // Edit Studio
  VIDEO_RENDERED:      'video_rendered',
  FOOTAGE_UPLOADED:    'footage_uploaded',
  // Music Studio
  MUSIC_SELECTED:      'music_selected',
  MUSIC_LICENSED:      'music_licensed',
  // Prompt Studio
  PROMPT_GENERATED:    'prompt_generated',
  IMAGE_GENERATED:     'image_generated',
  // Jarvis
  USER_INSTRUCTION:    'user_instruction',
  FEEDBACK_GIVEN:      'feedback_given',
  CHAT_MESSAGE:        'chat_message',
}

// Fire-and-forget event log. Never throws — cannot break callers.
export async function logEvent(userId, eventType, source, payload = {}) {
  try {
    const admin = makeAdmin()
    await admin.from('jarvis_events').insert({
      user_id:    userId,
      event_type: eventType,
      source,
      payload,
    })
  } catch { /* non-fatal */ }
}

// Log an event AND write a semantic memory from it.
// Use for high-value signals worth recalling later.
export async function logEventWithMemory({
  userId,
  eventType,
  source,
  payload = {},
  memoryContent,
  memoryType   = 'result',
  importance   = 1.0,
  expiresAt    = null,
}) {
  // Log always fires
  await logEvent(userId, eventType, source, payload)

  // Memory write is best-effort
  try {
    await writeMemory({
      userId,
      memoryType,
      content:   memoryContent,
      metadata:  { eventType, source, ...payload },
      importance,
      expiresAt,
    })
  } catch { /* non-fatal */ }
}

// Retrieve recent events for context
export async function getRecentEvents(userId, limit = 30, source = null) {
  try {
    const admin = makeAdmin()
    let q = admin
      .from('jarvis_events')
      .select('event_type, source, payload, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (source) q = q.eq('source', source)

    const { data } = await q
    return data || []
  } catch {
    return []
  }
}
