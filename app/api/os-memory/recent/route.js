import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { OS_MEMORY_TABLE } from '../../../../lib/promptceo-os/memoryWriter'

// ── PromptCEO OS Memory — Recent Events Reader ────────────────────────────────
// GET /api/os-memory/recent
//
// Returns the latest 20 OS memory events for the authenticated user,
// ordered newest-first. Used by memoryReader.getRecentMemoryEvents() to
// load context for the AI Director Memory Insights panel.
//
// Read-only. Service role key used so RLS does not interfere with the query,
// matching the pattern of the write route for consistency.
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

export async function GET() {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data, error } = await adminClient()
      .from(OS_MEMORY_TABLE)
      .select('id, event_type, event_source, event_payload, project_id, project_name, memory_summary, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.warn('[PromptCEO OS Memory] Recent fetch failed', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ events: data || [] })
  } catch (err) {
    console.warn('[PromptCEO OS Memory] Recent fetch failed', err)
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
