import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// GET /api/auth/tiktok/callback
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get('code')
  const error = searchParams.get('error')

  const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL
  const redirectUri = `${siteUrl}/api/auth/tiktok/callback`

  if (error || !code) {
    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=tiktok_denied`)
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key:    process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type:    'authorization_code',
        redirect_uri:  redirectUri,
      }),
    })
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) throw new Error('No access token from TikTok')

    // Get user info
    const userRes = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const userData = await userRes.json()
    const tiktokUser = userData.data?.user || {}

    // Get authenticated user
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=not_authenticated`)

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    await admin.from('user_integrations').upsert({
      user_id:               user.id,
      tiktok_access_token:   tokenData.access_token,
      tiktok_refresh_token:  tokenData.refresh_token || null,
      tiktok_open_id:        tiktokUser.open_id || tokenData.open_id || '',
      tiktok_username:       tiktokUser.display_name || '',
      tiktok_connected_at:   new Date().toISOString(),
    }, { onConflict: 'user_id' })

    const username = tiktokUser.display_name || tiktokUser.open_id || ''
    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_connected=tiktok&tt_user=${username}`)
  } catch (err) {
    console.error('TikTok OAuth error:', err)
    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=tiktok_failed`)
  }
}
