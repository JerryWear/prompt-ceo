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

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = admin()

    const [logsRes, projectsRes] = await Promise.all([
      db.from('generation_logs').select('type, created_at').eq('user_id', user.id),
      db.from('projects').select('id, created_at').eq('user_id', user.id),
    ])

    const logs = logsRes.data || []
    const projects = projectsRes.data || []

    const campaigns = logs.filter(l => ['full_ad_campaign', 'instant_campaign', 'perfect_day'].includes(l.type)).length
    const images    = logs.filter(l => l.type === 'image_generation').length
    const hooks     = logs.filter(l => ['ad_text', 'hooks', 'instant_campaign'].includes(l.type)).length

    // days active = unique days with any log
    const days = new Set(logs.map(l => l.created_at?.slice(0, 10))).size

    return NextResponse.json({ campaigns, images, hooks, daysActive: days, totalProjects: projects.length })
  } catch (err) {
    return NextResponse.json({ campaigns: 0, images: 0, hooks: 0, daysActive: 0 })
  }
}
