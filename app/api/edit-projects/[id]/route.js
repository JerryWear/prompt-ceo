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

// Fields allowed in a PATCH update (whitelist prevents mass-assignment)
const PATCHABLE = [
  'title', 'platform', 'goal', 'status',
  'source_video_name', 'source_video_size', 'source_video_type', 'source_video_url',
  'transcript_data', 'ai_cuts_data', 'caption_settings', 'selected_music', 'export_settings',
  'director_analysis', 'cut_plans', 'selected_cut_plan', 'editor_cleanup', 'caption_timeline',
  'music_intelligence', 'selected_music_bed',
  'render_plan', 'render_jobs',
]

// ─── GET /api/edit-projects/[id] ──────────────────────────────────────────────
// Returns the full project row (including all JSONB workflow fields).

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('edit_projects')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      return NextResponse.json({ status: 'error', message: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ status: 'success', project: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// ─── PATCH /api/edit-projects/[id] ───────────────────────────────────────────
// Partial update — only whitelisted fields are written. updated_at is bumped by trigger.

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const body  = await req.json()
    const patch = {}
    for (const key of PATCHABLE) {
      if (body[key] !== undefined) patch[key] = body[key]
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ status: 'error', message: 'No valid fields to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('edit_projects')
      .update(patch)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', project: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// ─── DELETE /api/edit-projects/[id] ──────────────────────────────────────────
// Hard-deletes the project. Cascades to child tables (assets, transcripts, etc.).

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const { error } = await supabase
      .from('edit_projects')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
