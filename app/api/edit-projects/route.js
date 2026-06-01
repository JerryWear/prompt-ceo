import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─── Supabase client ──────────────────────────────────────────────────────────

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

const LIST_FIELDS = 'id, title, platform, goal, status, source_video_name, created_at, updated_at'

// ─── GET /api/edit-projects ───────────────────────────────────────────────────
// Returns the authenticated user's 20 most-recently-updated edit projects.

export async function GET() {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('edit_projects')
      .select(LIST_FIELDS)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(20)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', projects: data || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// ─── POST /api/edit-projects ──────────────────────────────────────────────────
// Creates a new edit project. Returns the created row.

export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const body = await req.json()

    const { data, error } = await supabase
      .from('edit_projects')
      .insert({
        user_id:           user.id,
        title:             body.title             || 'Untitled Edit',
        platform:          body.platform          ?? null,
        goal:              body.goal              ?? null,
        status:            body.status            || 'draft',
        source_video_name: body.source_video_name ?? null,
        source_video_size: body.source_video_size ?? null,
        source_video_type: body.source_video_type ?? null,
        transcript_data:   body.transcript_data   || [],
        ai_cuts_data:      body.ai_cuts_data      || [],
        caption_settings:  body.caption_settings  || {},
        selected_music:    body.selected_music    ?? null,
        export_settings:   body.export_settings   || {},
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', project: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
