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

// PATCH /api/projects/[id] — update name or type
export async function PATCH(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const updates = {}
  if (body.name?.trim()) updates.name = body.name.trim()
  if (body.type) updates.type = body.type
  if (body.thumbnail_url !== undefined) updates.thumbnail_url = body.thumbnail_url

  const { data, error } = await admin()
    .from('projects')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ project: data })
}

// DELETE /api/projects/[id] — delete project (assets keep project_id as null via SET NULL)
export async function DELETE(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const { error } = await admin()
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ status: 'deleted' })
}

// GET /api/projects/[id] — get project + asset counts
export async function GET(req, { params }) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id } = await params
  const db = admin()

  const [projectRes, adsRes, logsRes] = await Promise.all([
    db.from('projects').select('*').eq('id', id).eq('user_id', user.id).single(),
    db.from('ad_projects').select('id, campaign_name, created_at', { count: 'exact' }).eq('project_id', id).order('created_at', { ascending: false }).limit(10),
    db.from('generation_logs').select('id, image_url, created_at', { count: 'exact' }).eq('project_id', id).order('created_at', { ascending: false }).limit(20),
  ])

  if (projectRes.error) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

  return NextResponse.json({
    project: projectRes.data,
    adCampaigns: adsRes.data || [],
    adCampaignCount: adsRes.count || 0,
    generatedImages: logsRes.data || [],
    generatedImageCount: logsRes.count || 0,
  })
}
