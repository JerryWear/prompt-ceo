import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function getWorldList() {
  return [
    { id: 'luxury_penthouse',   name: 'Luxury Penthouse' },
    { id: 'maldives_villa',     name: 'Maldives Villa' },
    { id: 'coastal_house',      name: 'Coastal House' },
    { id: 'urban_apartment',    name: 'Urban Apartment' },
    { id: 'countryside_estate', name: 'Countryside Estate' },
    { id: 'dubai_highrise',     name: 'Dubai Highrise' },
    { id: 'tokyo_apartment',    name: 'Tokyo Apartment' },
    { id: 'paris_apartment',    name: 'Paris Apartment' },
    { id: 'bali_villa',         name: 'Bali Villa' },
    { id: 'greek_islands',      name: 'Greek Islands' },
    { id: 'ski_chalet',         name: 'Ski Chalet' },
    { id: 'miami_penthouse',    name: 'Miami Penthouse' },
    { id: 'minimal_studio',     name: 'Minimal Studio' },
  ]
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function parseIntent(apiKey, message, worldList) {
  const worldNames = worldList.map(w => `${w.id} (${w.name})`).join(', ')

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: 600,
      messages: [
        {
          role: 'system',
          content: `You are an AI creative strategist parser. Your job is to parse a user's creative request into structured parameters.

Available output types: "perfect_day", "full_ad_campaign", "image_sequence", "video_script"
Available worlds: ${worldNames}
Available styles: luxury, cinematic, ugc, emotional, viral, dark_luxury, high_energy, soft_feminine, corporate_authority, fitness_motivation, high_status, aspirational_lifestyle
Available goals: sales, leads, followers, brand_awareness, app_installs, creator_growth, high_ticket, viral_reach, premium_positioning
Available platforms: tiktok, instagram, meta_ads, youtube, linkedin

Respond with ONLY raw valid JSON — no markdown, no explanation.`,
        },
        {
          role: 'user',
          content: `Parse this creative request: "${message}"

Return a JSON object:
{
  "output_type": "perfect_day" | "full_ad_campaign" | "image_sequence" | "video_script",
  "understood": "short plain-English confirmation of what you understood, under 15 words",
  "productName": "extracted product or brand name, or null",
  "world": "matched world id from the available list, or null",
  "style": "matched style, or null",
  "goal": "matched goal, or null",
  "platform": "matched platform, or null",
  "momentFocus": "for perfect_day: specific moments mentioned, or null",
  "pricePoint": "high_ticket | mid_range | entry | null",
  "type": "product | personal_brand | ecommerce | fitness | coaching | creator | fashion | saas | luxury | agency | null"
}`,
        },
      ],
      temperature: 0.3,
    }),
  })
  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content?.trim() || '{}'
  try {
    const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : {}
  } catch { return {} }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!xaiApiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const admin = adminClient()
    const { data: userRow } = await admin
      .from('app_users')
      .select('subscription_status, subscription_tier')
      .eq('id', user.id)
      .single()
    const { canGenerateText } = await import('../../../lib/subscription.js')
    if (!canGenerateText(userRow)) {
      return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })
    }

    const body = await req.json()
    const {
      message,
      creatorProfile = null,
      brandProfile = null,
      projectId = null,
      parseOnly = false, // if true, just return parsed intent without generating
    } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const worldList = getWorldList()
    const parsed = await parseIntent(xaiApiKey, message.trim(), worldList)

    // Apply defaults and merge with context
    const outputType = parsed.output_type || 'full_ad_campaign'
    const params = {
      productName:    parsed.productName || brandProfile?.name || 'Your Brand',
      world:          parsed.world || null,
      style:          parsed.style || brandProfile?.style || 'cinematic',
      goal:           parsed.goal || 'brand_awareness',
      platform:       parsed.platform || 'instagram',
      type:           parsed.type || 'personal_brand',
      pricePoint:     parsed.pricePoint || 'mid_range',
      creatorProfile,
      brandProfile,
      projectId,
    }

    // parseOnly mode: return parsed intent for UI confirmation step
    if (parseOnly) {
      return NextResponse.json({
        understood:  parsed.understood || 'Creating your campaign',
        output_type: outputType,
        params,
      })
    }

    // Route to the correct generation system
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.get('host')}`

    let result = null
    let routedTo = ''

    if (outputType === 'perfect_day') {
      routedTo = '/api/perfect-day'
      const dayRes = await fetch(`${baseUrl}/api/perfect-day`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: req.headers.get('cookie') || '',
        },
        body: JSON.stringify({
          worldId:       params.world || 'luxury_penthouse',
          creatorProfile: params.creatorProfile,
          brandProfile:   params.brandProfile,
          style:          params.style,
          platform:       params.platform,
          outputMode:     'both',
          projectId:      params.projectId,
        }),
      })
      result = await dayRes.json()

    } else {
      // Default: full_ad_campaign (also handles image_sequence and video_script as campaign)
      routedTo = '/api/full-ad-campaign'
      const campaignRes = await fetch(`${baseUrl}/api/full-ad-campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: req.headers.get('cookie') || '',
        },
        body: JSON.stringify({
          productName:    params.productName,
          type:           params.type,
          goal:           params.goal,
          style:          params.style,
          platform:       params.platform,
          world:          params.world || 'minimal_studio',
          pricePoint:     params.pricePoint,
          creatorProfile: params.creatorProfile,
          brandProfile:   params.brandProfile,
          projectId:      params.projectId,
        }),
      })
      result = await campaignRes.json()
    }

    // Log the conversation turn
    try {
      await admin.from('generation_logs').insert({
        user_id: user.id,
        project_id: result?.projectId || projectId || null,
        type: 'creative_conversation',
        input: { message: message.trim(), parsed, output_type: outputType },
        output: { routedTo, projectId: result?.projectId },
      })
    } catch {}

    return NextResponse.json({
      understood:  parsed.understood || 'Creating your campaign',
      output_type: outputType,
      params,
      routedTo,
      result,
    })
  } catch (err) {
    console.error('creative-conversation error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
