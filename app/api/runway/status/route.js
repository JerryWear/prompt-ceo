import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

async function getRunwayKey(userId) {
  const { data } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    .from('user_integrations').select('runway_api_key').eq('user_id', userId).single()
  return data?.runway_api_key || null
}

export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const apiKey = await getRunwayKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No Runway API key' }, { status: 400 })

    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('task_id')
    if (!taskId) return NextResponse.json({ status: 'error', message: 'task_id required' }, { status: 400 })

    const res = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
      headers: {
        Authorization:      `Bearer ${apiKey}`,
        'X-Runway-Version': '2024-11-06',
      },
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ status: 'error', message: 'Failed to get task status' }, { status: 500 })

    // Runway task statuses: PENDING | RUNNING | SUCCEEDED | FAILED | CANCELLED
    const videoStatus = data.status === 'SUCCEEDED' ? 'completed'
      : data.status === 'FAILED' || data.status === 'CANCELLED' ? 'failed'
      : 'processing'

    const videoUrl = data.output?.[0] || null

    return NextResponse.json({
      status:      'success',
      videoStatus,
      videoUrl,
      progress:    data.progress || null,
      error:       data.failure  || data.failureCode || null,
    })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
