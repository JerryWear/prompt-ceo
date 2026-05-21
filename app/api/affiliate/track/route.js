import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/affiliate/track

export async function POST(req) {
  try {
    const { code, eventType = 'click' } = await req.json()
    if (!code) return NextResponse.json({ ok: false })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: affiliate } = await admin
      .from('affiliates')
      .select('id, total_clicks, total_signups, status')
      .eq('affiliate_code', code)
      .eq('status', 'approved')
      .single()

    if (!affiliate) return NextResponse.json({ ok: false })

    // Increment counter
    if (eventType === 'click') {
      await admin.from('affiliates')
        .update({ total_clicks: (affiliate.total_clicks || 0) + 1 })
        .eq('id', affiliate.id)
    } else if (eventType === 'signup') {
      await admin.from('affiliates')
        .update({ total_signups: (affiliate.total_signups || 0) + 1 })
        .eq('id', affiliate.id)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
