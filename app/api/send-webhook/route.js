import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// POST /api/send-webhook
// Proxies campaign data to a user-configured webhook URL.
// Used for Zapier, Make.com, Notion, Google Sheets integrations.
// Runs server-side to avoid CORS issues.

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const { webhookUrl, payload } = await req.json()

    if (!webhookUrl?.startsWith('https://')) {
      return NextResponse.json({ status: 'error', message: 'Invalid webhook URL — must start with https://' }, { status: 400 })
    }

    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Source': 'PromptCEO' },
      body:    JSON.stringify({ ...payload, _promptceo_user: user.id, _sent_at: new Date().toISOString() }),
    })

    if (!res.ok) {
      return NextResponse.json({ status: 'error', message: `Webhook returned ${res.status}` }, { status: 502 })
    }

    return NextResponse.json({ status: 'success', webhookStatus: res.status })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
