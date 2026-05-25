import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// GET /api/auth/instagram — redirect to Meta OAuth
export async function GET() {
  const clientId    = process.env.META_APP_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/instagram/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'META_APP_ID not configured' }, { status: 500 })
  }

  const scope = [
    'instagram_basic',
    'instagram_content_publish',
    'pages_show_list',
    'pages_read_engagement',
  ].join(',')

  const url = new URL('https://www.facebook.com/v19.0/dialog/oauth')
  url.searchParams.set('client_id',     clientId)
  url.searchParams.set('redirect_uri',  redirectUri)
  url.searchParams.set('scope',         scope)
  url.searchParams.set('response_type', 'code')

  return NextResponse.redirect(url.toString())
}
