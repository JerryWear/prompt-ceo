import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/affiliate/apply

function generateCode(name) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)
  const rand = Math.random().toString(36).slice(2, 6)
  return `${base}${rand}`
}

export async function POST(req) {
  try {
    const { name, email, platform, audience, message } = await req.json()

    if (!name || !email || !platform) {
      return NextResponse.json({ error: 'Name, email, and platform are required' }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Check if already applied
    const { data: existing } = await admin.from('affiliates').select('id, status').eq('email', email).single()
    if (existing) {
      const isApproved = existing.status === 'approved' || existing.status === 'active'
      return NextResponse.json({
        error: isApproved
          ? 'You are already an approved partner. Log in to view your dashboard.'
          : 'An application with this email already exists. We will be in touch within 48 hours.',
      }, { status: 409 })
    }

    // Generate unique referral code
    let code = generateCode(name)
    let attempts = 0
    while (attempts < 5) {
      const { data: taken } = await admin.from('affiliates').select('id').eq('affiliate_code', code).single()
      if (!taken) break
      code = generateCode(name)
      attempts++
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptceo.io'

    const { error } = await admin.from('affiliates').insert({
      full_name:         name,
      email,
      platform,
      audience_size:     audience || null,
      message:           message || null,
      affiliate_code:    code,
      referral_link:     `${origin}?ref=${code}`,
      commission_percent: 30,
      status:            'pending',
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ status: 'success', message: 'Application received. You will hear back within 48 hours.' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
