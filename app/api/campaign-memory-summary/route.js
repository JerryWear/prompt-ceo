import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

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

function countFreq(items) {
  const map = {}
  items.forEach(v => { if (v) map[v] = (map[v] || 0) + 1 })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, count }))
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = adminClient()

    const [{ data: memories }, { data: worlds }] = await Promise.all([
      admin.from('campaign_memory')
        .select('successful_patterns')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),
      admin.from('world_memory')
        .select('world_id, use_count')
        .eq('user_id', user.id)
        .order('use_count', { ascending: false })
        .limit(10),
    ])

    const patterns = (memories || []).map(m => m.successful_patterns || {})

    const topTypes  = countFreq(patterns.map(p => p.type))
    const topGoals  = countFreq(patterns.map(p => p.goal))
    const topStyles = countFreq(patterns.map(p => p.style))
    const topWorlds = (worlds || []).map(w => ({ id: w.world_id, count: w.use_count }))

    return NextResponse.json({ topTypes, topGoals, topStyles, topWorlds, total: patterns.length })
  } catch (err) {
    console.error('[campaign-memory-summary]', err)
    return NextResponse.json({ error: 'Failed to load memory summary' }, { status: 500 })
  }
}
