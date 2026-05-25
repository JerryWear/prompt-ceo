import { NextResponse } from 'next/server'

// GET /api/auth/tiktok — redirect to TikTok OAuth
export async function GET() {
  const clientKey  = process.env.TIKTOK_CLIENT_KEY
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/tiktok/callback`

  if (!clientKey) {
    return NextResponse.json({ error: 'TIKTOK_CLIENT_KEY not configured' }, { status: 500 })
  }

  const url = new URL('https://www.tiktok.com/v2/auth/authorize/')
  url.searchParams.set('client_key',     clientKey)
  url.searchParams.set('redirect_uri',   redirectUri)
  url.searchParams.set('scope',          'user.info.basic,video.upload,video.publish')
  url.searchParams.set('response_type',  'code')
  url.searchParams.set('state',          Math.random().toString(36).slice(2))

  return NextResponse.redirect(url.toString())
}
