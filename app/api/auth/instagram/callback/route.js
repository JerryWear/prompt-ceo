import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// GET /api/auth/instagram/callback — Meta redirects here after OAuth
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get('code')
  const error = searchParams.get('error')

  const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL
  const redirectUri = `${siteUrl}/api/auth/instagram/callback`

  if (error || !code) {
    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=instagram_denied`)
  }

  try {
    // Exchange code for short-lived token
    const tokenRes = await fetch('https://graph.facebook.com/v19.0/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        redirect_uri:  redirectUri,
        code,
      }),
    })
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) throw new Error('No access token from Meta')

    // Exchange for long-lived token (60 days)
    const longRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.META_APP_ID}&client_secret=${process.env.META_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`
    )
    const longData = await longRes.json()
    const accessToken = longData.access_token || tokenData.access_token

    // Get connected Instagram Business Account
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    )
    const pagesData = await pagesRes.json()
    const page = pagesData.data?.[0]

    let igUserId   = ''
    let igUsername = ''

    if (page) {
      const igRes = await fetch(
        `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token || accessToken}`
      )
      const igData = await igRes.json()
      igUserId = igData.instagram_business_account?.id || ''

      if (igUserId) {
        const profileRes = await fetch(
          `https://graph.facebook.com/v19.0/${igUserId}?fields=username&access_token=${accessToken}`
        )
        const profileData = await profileRes.json()
        igUsername = profileData.username || ''
      }
    }

    // Get authenticated user
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=not_authenticated`)

    // Save to user_integrations
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    await admin.from('user_integrations').upsert({
      user_id:                  user.id,
      instagram_access_token:   accessToken,
      instagram_user_id:        igUserId,
      instagram_username:       igUsername,
      instagram_connected_at:   new Date().toISOString(),
    }, { onConflict: 'user_id' })

    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_connected=instagram&ig_user=${igUsername || igUserId}`)
  } catch (err) {
    console.error('Instagram OAuth error:', err)
    return NextResponse.redirect(`${siteUrl}/prompt-engine-v3?publish_error=instagram_failed`)
  }
}
