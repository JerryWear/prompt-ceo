import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

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

function makeAdmin() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/create-project
// Creates a new edit_projects row and returns the projectId so the v2 upload
// flow has an ID before it calls upload-source.
//
// Body: { title? }
// Returns: { status: 'success', projectId }

export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    let title = 'Untitled Ad'
    try {
      const body = await req.json()
      if (body?.title) title = body.title
    } catch {
      // Body is optional — ignore parse errors
    }

    const admin = makeAdmin()
    const { data, error } = await admin
      .from('edit_projects')
      .insert({
        user_id: user.id,
        title,
        is_v2:   true,
        status:  'draft',
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', projectId: data.id })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
