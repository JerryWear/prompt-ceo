import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { OS_MEMORY_TABLE } from '../../../../lib/promptceo-os/memoryWriter'

// ── PromptCEO OS Memory — Server-Side Write Endpoint ─────────────────────────
// POST /api/os-memory/write
//
// Safe server-side persistence for PromptCEO OS high-value memory events.
// Service role key never leaves the server. Called by memoryWriter.writeMemoryEvent()
// once Step 11 wires the client-side → server round-trip.
//
// Events that reach here have already passed the shouldWriteToMemory() gate
// in lib/promptceo-os/memoryWriter.js (USER_CREATED_AD, USER_CREATED_CAMPAIGN,
// USER_SAVED_PROJECT, USER_REVIEWED_PRODUCT, USER_BUILT_VIDEO, USER_SELECTED_MUSIC).
// ─────────────────────────────────────────────────────────────────────────────

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function POST(req) {
  try {
    // Authentication required — no anonymous writes accepted.
    // user.id from session is the sole identity source; body userId is not read.
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { status: 'error', error: 'Authentication required' },
        { status: 401 }
      )
    }

    const {
      projectId,
      projectName,
      eventType,
      eventSource,
      eventPayload,
      memorySummary,
    } = await req.json()

    if (!eventType?.trim()) {
      return NextResponse.json(
        { status: 'error', error: 'eventType is required' },
        { status: 400 }
      )
    }

    const record = {
      user_id:        user.id,
      project_id:     projectId     || null,
      project_name:   projectName   || null,
      event_type:     eventType.trim(),
      event_source:   eventSource   || null,
      event_payload:  eventPayload  || {},
      memory_summary: memorySummary || null,
    }

    const { data, error } = await adminClient()
      .from(OS_MEMORY_TABLE)
      .insert(record)
      .select()
      .single()

    if (error) {
      console.warn('[PromptCEO OS Memory] Write failed', error)
      return NextResponse.json(
        { status: 'error', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ status: 'success', event: data })
  } catch (err) {
    console.warn('[PromptCEO OS Memory] Write failed', err)
    return NextResponse.json(
      { status: 'error', error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
