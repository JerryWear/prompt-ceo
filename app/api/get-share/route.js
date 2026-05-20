import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// GET /api/get-share?token=xxx
// Public endpoint — no auth required. Used by the client review page.

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ status: 'error', message: 'Token required' }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await admin
      .from('campaign_shares')
      .select('id, token, share_name, product_name, platform, campaign_goal, outputs, adconfig, status, client_comment, client_name, created_at')
      .eq('token', token)
      .single()

    if (error || !data) {
      return NextResponse.json({ status: 'error', message: 'Campaign not found' }, { status: 404 })
    }

    return NextResponse.json({ status: 'success', share: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST /api/get-share?token=xxx — client submits approval or revision request
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ status: 'error', message: 'Token required' }, { status: 400 })
    }

    const { action, comment, clientName } = await req.json()
    // action: 'approve' | 'request_changes'

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const status = action === 'approve' ? 'approved' : 'revision_requested'

    const { error } = await admin
      .from('campaign_shares')
      .update({
        status,
        client_comment: comment || null,
        client_name:    clientName || null,
        updated_at:     new Date().toISOString(),
      })
      .eq('token', token)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', newStatus: status })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
