/**
 * GET /api/auth/tiktok/debug
 * Safe diagnostic — never exposes secrets.
 * Returns masked client_key, redirect URI, scopes, and env var presence.
 * DELETE THIS FILE before production hardening.
 */
import { NextResponse } from 'next/server'

export async function GET() {
  const clientKey   = process.env.TIKTOK_CLIENT_KEY    || ''
  const secret      = process.env.TIKTOK_CLIENT_SECRET || ''
  const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL || ''
  const redirectUri = `${siteUrl}/api/auth/tiktok/callback`

  const scopes = 'user.info.basic,video.upload,video.publish'

  const url = new URL('https://www.tiktok.com/v2/auth/authorize/')
  url.searchParams.set('client_key',    clientKey)
  url.searchParams.set('redirect_uri',  redirectUri)
  url.searchParams.set('scope',         scopes)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('state',         'debug_state_123')

  const mask = (s) => s.length > 10 ? `${s.slice(0, 6)}...${s.slice(-4)}` : s ? `(${s.length} chars — too short)` : '(empty)'

  return NextResponse.json({
    diagnosis: {
      client_key_present:    !!clientKey,
      client_key_masked:     mask(clientKey),
      client_key_length:     clientKey.length,
      secret_present:        !!secret,
      secret_length:         secret.length,
      site_url:              siteUrl,
      redirect_uri:          redirectUri,
      redirect_uri_has_www:  redirectUri.includes('www.'),
      scopes_requested:      scopes.split(','),
      full_oauth_url:        url.toString().replace(clientKey, mask(clientKey)),
    },
    checklist: {
      'TIKTOK_CLIENT_KEY set on Vercel':         !!clientKey,
      'TIKTOK_CLIENT_SECRET set on Vercel':      !!secret,
      'NEXT_PUBLIC_SITE_URL set':                !!siteUrl,
      'redirect_uri matches non-www':            redirectUri === 'https://promptceo.io/api/auth/tiktok/callback',
      'redirect_uri matches www':                redirectUri === 'https://www.promptceo.io/api/auth/tiktok/callback',
      'client_key length looks valid (>10)':     clientKey.length > 10,
    },
    action: 'Check TikTok Developer Portal → your app → Login Kit → redirect URI must EXACTLY match redirect_uri above. Also confirm client_key (not Client ID) is set in Vercel env vars.',
  })
}
