import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// GET — fetch performance logs + compute pattern summary
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const contentType = searchParams.get('type') || 'hook'
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    const { data, error } = await admin()
      .from('performance_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('content_type', contentType)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    const logs = data || []

    // Compute pattern summary
    const withCTR = logs.filter(l => l.ctr != null)
    const avgCTR  = withCTR.length > 0
      ? (withCTR.reduce((s, l) => s + (l.ctr || 0), 0) / withCTR.length).toFixed(2)
      : null

    // Group by hook_type
    const byType = {}
    logs.forEach(l => {
      if (!l.hook_type) return
      if (!byType[l.hook_type]) byType[l.hook_type] = { count: 0, totalCTR: 0, withCTR: 0 }
      byType[l.hook_type].count++
      if (l.ctr != null) { byType[l.hook_type].totalCTR += l.ctr; byType[l.hook_type].withCTR++ }
    })

    const typeInsights = Object.entries(byType)
      .map(([type, d]) => ({
        type,
        count: d.count,
        avgCTR: d.withCTR > 0 ? (d.totalCTR / d.withCTR).toFixed(2) : null,
      }))
      .sort((a, b) => (parseFloat(b.avgCTR) || 0) - (parseFloat(a.avgCTR) || 0))

    // Top performers
    const topPerformers = [...logs]
      .filter(l => l.ctr != null)
      .sort((a, b) => b.ctr - a.ctr)
      .slice(0, 5)

    return NextResponse.json({
      status: 'success',
      logs,
      summary: { totalLogs: logs.length, avgCTR, typeInsights, topPerformers },
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST — log a new performance result
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { contentType, contentText, platform, ctr, convRate, hookType, notes } = body

    if (!contentText?.trim()) return NextResponse.json({ status: 'error', message: 'contentText required' }, { status: 400 })

    const { data, error } = await admin()
      .from('performance_logs')
      .insert({
        user_id:      user.id,
        content_type: contentType || 'hook',
        content_text: contentText.trim(),
        platform:     platform    || 'tiktok',
        ctr:          ctr         != null ? parseFloat(ctr)     : null,
        conv_rate:    convRate     != null ? parseFloat(convRate): null,
        hook_type:    hookType     || null,
        notes:        notes        || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', log: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// DELETE — remove a log entry
export async function DELETE(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { id } = await req.json()
    if (!id) return NextResponse.json({ status: 'error', message: 'id required' }, { status: 400 })

    const { error } = await admin()
      .from('performance_logs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
