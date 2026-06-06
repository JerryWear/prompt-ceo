import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

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

// GET /api/edit-studio/projects
// Returns the user's last 8 edit projects for the "Recent Projects" panel.
// If unauthenticated, returns 401 — the client silently skips the section.

export async function GET() {
  const log = makeRouteLogger('edit-studio-projects')
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const admin = makeAdmin()
    const { data: projects, error } = await admin
      .from('edit_projects')
      .select('id, title, status, created_at, understanding_data')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    // Derive a display label from understanding_data if available
    const enriched = (projects || []).map(p => ({
      id:          p.id,
      title:       p.title || 'Untitled',
      status:      p.status || 'draft',
      created_at:  p.created_at,
      product:     p.understanding_data?.detected_products?.[0] || null,
      positioning: p.understanding_data?.recommended_positioning || null,
    }))

    log.success({ extra: { count: enriched.length } })
    return NextResponse.json({ status: 'success', projects: enriched })
  } catch (err) {
    log.failure({ errorCode: 'PROJECTS_LIST_FATAL', message: err.message })
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
