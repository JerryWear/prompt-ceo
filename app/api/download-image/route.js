import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

// ─── Watermark config ────────────────────────────────────────────────────────
const WATERMARK_TEXT = 'promptceo.io'
const WATERMARK_FONT_SIZE = 28
const WATERMARK_PADDING = 18
const PURCHASED_CREDIT_THRESHOLD = 50 // credits given FREE on signup — anyone above this has purchased

// ─── Helper: build SVG watermark overlay ─────────────────────────────────────
function buildWatermarkSvg(width, height) {
  // Logo mark + URL in bottom-right corner
  const text = WATERMARK_TEXT
  const estimatedTextWidth = text.length * (WATERMARK_FONT_SIZE * 0.55)
  const boxW = estimatedTextWidth + WATERMARK_PADDING * 2 + 28 // 28px for dot icon
  const boxH = WATERMARK_FONT_SIZE + WATERMARK_PADDING * 1.5
  const x = width - boxW - 16
  const y = height - boxH - 16

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="rgba(0,0,0,0.55)"/>
        </filter>
      </defs>

      <!-- Background pill -->
      <rect
        x="${x}" y="${y}"
        width="${boxW}" height="${boxH}"
        rx="8" ry="8"
        fill="rgba(0,0,0,0.52)"
        filter="url(#shadow)"
      />

      <!-- Dot accent -->
      <circle
        cx="${x + WATERMARK_PADDING + 6}"
        cy="${y + boxH / 2}"
        r="5"
        fill="#a78bfa"
      />

      <!-- Text -->
      <text
        x="${x + WATERMARK_PADDING + 20}"
        y="${y + boxH / 2 + WATERMARK_FONT_SIZE * 0.35}"
        font-family="Inter, -apple-system, Helvetica, sans-serif"
        font-size="${WATERMARK_FONT_SIZE}"
        font-weight="600"
        fill="white"
        letter-spacing="0.3"
      >${text}</text>
    </svg>
  `)
}

// ─── Helper: check if user has ever purchased credits ────────────────────────
async function userHasPurchased(userId) {
  try {
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow, error } = await admin
      .from('app_users')
      .select('credits, plan')
      .eq('id', userId)
      .single()

    if (error || !userRow) return false

    // plan string check (future-proof)
    const paidPlans = ['pro', 'starter', 'premium', 'paid', 'active']
    if (paidPlans.includes(String(userRow.plan || '').toLowerCase())) {
      return true
    }

    // Primary check: anyone with more than 50 credits has purchased
    // trial accounts start with exactly 50 free credits
    if (typeof userRow.credits === 'number' && userRow.credits > PURCHASED_CREDIT_THRESHOLD) {
      return true
    }

    return false
  } catch {
    return false
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const imageUrl = searchParams.get('url')
    const fileName = searchParams.get('name') || 'prompt-ceo-image.png'
    const skipWatermark = searchParams.get('skipWatermark') === 'true'

    if (!imageUrl) {
      return NextResponse.json({ message: 'Missing image URL' }, { status: 400 })
    }

    // ── Auth check ────────────────────────────────────────────────────────────
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) { return cookieStore.get(name)?.value },
          set(name, value, options) { cookieStore.set({ name, value, ...options }) },
          remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
        },
      }
    )

    const { data: { user } } = await supabaseAuth.auth.getUser()

    // ── Fetch source image ────────────────────────────────────────────────────
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch image' }, { status: 502 })
    }

    const arrayBuffer = await response.arrayBuffer()
    const sourceBuffer = Buffer.from(arrayBuffer)
    const contentType = response.headers.get('content-type') || 'image/png'

    // ── Determine if watermark needed ─────────────────────────────────────────
    let applyWatermark = true

    if (!user) {
      // Not logged in — always watermark
      applyWatermark = true
    } else if (skipWatermark) {
      // Explicit skip — verify they've purchased
      const hasPurchased = await userHasPurchased(user.id)
      applyWatermark = !hasPurchased
    } else {
      const hasPurchased = await userHasPurchased(user.id)
      applyWatermark = !hasPurchased
    }

    // ── Apply watermark via Sharp ─────────────────────────────────────────────
    if (applyWatermark) {
      const image = sharp(sourceBuffer)
      const meta = await image.metadata()
      const w = meta.width || 1080
      const h = meta.height || 1350

      const watermarkSvg = buildWatermarkSvg(w, h)

      const watermarkedBuffer = await sharp(sourceBuffer)
        .composite([{ input: watermarkSvg, top: 0, left: 0 }])
        .png()
        .toBuffer()

      return new NextResponse(watermarkedBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'X-Watermarked': 'true',
        },
      })
    }

    // ── Clean download for paid users ─────────────────────────────────────────
    return new NextResponse(sourceBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'X-Watermarked': 'false',
      },
    })

  } catch (err) {
    console.error('DOWNLOAD_IMAGE_ERROR:', err)
    return NextResponse.json({ message: 'Download failed' }, { status: 500 })
  }
}