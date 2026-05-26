import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// GET /api/auth/instagram — redirect to Meta OAuth
export async function GET() {
  const clientId    = process.env.INSTAGRAM_APP_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/instagram/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'INSTAGRAM_APP_ID not configured' }, { status: 500 })
  }

  const scope = [
    'instagram_business_basic',
    'instagram_business_content_publish',
    'instagram_business_manage_comments',
  ].join(',')

  const url = new URL('https://www.instagram.com/oauth/authorize')
  url.searchParams.set('client_id',     clientId)
  url.searchParams.set('redirect_uri',  redirectUri)
  url.searchParams.set('scope',         scope)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('force_reauth',  'true')

  return NextResponse.redirect(url.toString())
}
