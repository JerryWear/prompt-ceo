import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

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

const admin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET /api/project-brain/[id] — fetch or create project brain record
export async function GET(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const db = admin()

  // Try to fetch existing brain record
  const { data: brain, error: selectError } = await db
    .from('project_brain')
    .select('*')
    .eq('project_id', id)
    .eq('user_id', user.id)
    .single()

  // If brain record exists, return it
  if (brain) {
    return NextResponse.json({ brain })
  }

  // If error other than not found, return error
  if (selectError && selectError.code !== 'PGRST116') {
    return NextResponse.json({ error: selectError.message }, { status: 500 })
  }

  // Brain doesn't exist, create it with defaults
  const { data: newBrain, error: insertError } = await db
    .from('project_brain')
    .insert({
      project_id: id,
      user_id: user.id,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ brain: newBrain })
}

// PATCH /api/project-brain/[id] — update project brain record (upsert)
export async function PATCH(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  // Whitelist of allowed fields
  const allowedFields = [
    'campaign_stage',
    'fatigue_score',
    'best_hook_types',
    'best_worlds',
    'best_styles',
    'best_platform',
    'active_strategy',
    'audience_temperature',
    'creator_energy',
    'pacing_profile',
    'total_generations',
    'last_recommended_shift',
  ]

  // Build updates object with only whitelisted fields
  const updates = {}
  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field]
    }
  }

  // Always set last_updated_at
  updates.last_updated_at = new Date().toISOString()

  // Upsert with conflict on project_id
  const { data: updatedBrain, error } = await admin()
    .from('project_brain')
    .upsert({
      project_id: id,
      user_id: user.id,
      ...updates,
    }, { onConflict: 'project_id' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ brain: updatedBrain })
}
