import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { CAMPAIGN_PHASES, getPhaseScheduleDays } from '../../ad-system/phases.js'

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

async function ask(apiKey, prompt, maxTokens = 2000) {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'system',
          content: 'You are a world-class advertising strategist and direct-response copywriter. Respond with ONLY raw valid JSON — no markdown, no code fences, no explanation. Your entire response must start with [ or { and end with ] or }.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || '[]'
}

function tryJSON(text, fallback = []) {
  try {
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/[\[{][\s\S]*[\]}]/)
    return match ? JSON.parse(match[0]) : fallback
  } catch { return fallback }
}

function buildCampaignContext({ productName, type, goal, style, platform, world, pricePoint, creatorProfile, brandProfile }) {
  const parts = [
    `Product / Brand: ${productName}`,
    `Type: ${(type || '').replace(/_/g, ' ')}`,
    `Goal: ${(goal || '').replace(/_/g, ' ')}`,
    `Style: ${(style || '').replace(/_/g, ' ')}`,
    `Platform: ${platform}`,
  ]
  if (world) parts.push(`World / Visual Environment: ${world.replace(/_/g, ' ')}`)
  if (pricePoint) parts.push(`Price Point: ${pricePoint.replace(/_/g, ' ')}`)
  if (brandProfile?.voice) parts.push(`Brand Voice: ${brandProfile.voice}`)
  if (brandProfile?.target_audience) parts.push(`Target Audience: ${brandProfile.target_audience}`)
  if (creatorProfile?.name) parts.push(`Creator: ${creatorProfile.name}`)
  if (creatorProfile?.style_signature) parts.push(`Creator Style: ${creatorProfile.style_signature}`)
  return parts.join('\n')
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
    const { canGenerateText } = await import('../../../../lib/subscription.js')
    if (!canGenerateText(userRow)) {
      return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })
    }

    const body = await req.json()
    const {
      productName,
      type = 'product',
      goal = 'sales',
      style = 'cinematic',
      platform = 'instagram',
      world = 'minimal_studio',
      pricePoint = 'mid_range',
      creatorProfile = null,
      brandProfile = null,
      projectId = null,
    } = body

    if (!productName?.trim()) {
      return NextResponse.json({ error: 'productName is required' }, { status: 400 })
    }

    const ctx = buildCampaignContext({ productName: productName.trim(), type, goal, style, platform, world, pricePoint, creatorProfile, brandProfile })

    // ── STEP 1 — Parallel: Attention + Story + Desire image prompts ──────────
    const [
      attentionRaw,
      storyRaw,
      desireImageRaw,
    ] = await Promise.all([
      // Phase 1: Attention — 5 hooks
      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: ATTENTION (Phase 1 of 5)
Goal: Stop the scroll. Create curiosity. Zero selling.
Audience: Cold — they do not know this brand yet.

Write 5 attention hooks, one per archetype:
1. pattern_break — something unexpected, challenges assumption
2. curiosity_gap — creates information gap, they must keep reading
3. bold_claim — confident, specific, no hedging
4. visual_hook — describes what the visual IS, not what it says
5. emotional_open — an emotion the viewer recognizes instantly

Return a JSON array of 5 objects: [{"archetype":"pattern_break","hook":"..."},...]
Each hook under 15 words. No selling. No product pitch.
`, 800),

      // Phase 2: Story — 3 narrative scripts
      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: EMOTIONAL CONNECTION (Phase 2 of 5)
Goal: Build trust. Tell the story. Make them feel something.
Audience: Warming — they have seen the brand, now they need to feel it.

Write 3 story scripts, one per type:
1. transformation_story — before/after life narrative (not body — life, mindset, circumstance)
2. day_in_life — a real day in the creator/brand world, authentic moments
3. origin_story — why this product/brand/person exists, the moment it started

Return a JSON array of 3 objects: [{"type":"transformation_story","script":"...","hook":"opening line under 12 words"},...]
Each script 3–5 sentences. First person. Specific details. No marketing language.
`, 1200),

      // Phase 3: Desire — 5 image prompts
      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: DESIRE ESCALATION (Phase 3 of 5)
Goal: Make them want the life. Aspiration and transformation.
Visual style: elevated, aspirational, luxury or transformation, cinematic quality.

Generate 5 image prompts:
1. luxury lifestyle scene — aspirational environment, elevated living
2. close-up product beauty shot — product as hero, premium framing
3. creator using product naturally — real moment, not posed
4. world-elevated lifestyle scene — product in context of aspiration
5. transformation visual — the before/after state, cinematic

Return a JSON array of 5 objects: [{"type":"luxury_lifestyle","prompt":"..."},...]
Each prompt 2–3 sentences. Vivid, specific, cinematically composed. ${style.replace(/_/g, ' ')} aesthetic.
`, 1000),
    ])

    const attentionHooks = tryJSON(attentionRaw, [])
    const storyScripts = tryJSON(storyRaw, [])
    const desireImagePrompts = tryJSON(desireImageRaw, [])

    // ── STEP 2 — Parallel: Conversion + Retargeting + Captions ──────────────
    const bestHook = attentionHooks[0]?.hook || attentionHooks[0] || ''
    const bestStory = storyScripts[0]?.script || storyScripts[0] || ''

    const [
      conversionRaw,
      retargetingRaw,
      captionsRaw,
      videoScriptsRaw,
    ] = await Promise.all([
      // Phase 4: Conversion — 3 ads
      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: CONVERSION (Phase 4 of 5)
Goal: Convert. Direct offer. Clear CTA. Remove friction.
Audience: Hot — they want it, now remove every reason not to buy.
Best performing hook so far: "${bestHook}"

Write 3 conversion ads:
1. direct_offer — states the offer clearly: price, value, what they get
2. urgency — real scarcity or time-sensitive frame (no fake urgency)
3. social_proof — real results, numbers, outcomes, testimonial format

Return a JSON array of 3 objects: [{"type":"direct_offer","copy":"...","cta":"..."},...]
Each under 30 words. Hard CTA at the end of each. Platform: ${platform}.
`, 800),

      // Phase 5: Retargeting — 3 ads
      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: RETARGETING (Phase 5 of 5)
Goal: Win back the ones who almost bought. Reinforce, remind, reassure.
Audience: Post-click — they were interested, something stopped them.

Write 3 retargeting ads:
1. soft_reminder — gentle, no pressure, here when ready
2. testimonial — specific customer outcome, human and real
3. objection_handle — addresses the most common reason people hesitate to buy this type of product

Return a JSON array of 3 objects: [{"type":"soft_reminder","copy":"..."},...]
Human and honest tone. No aggression.
`, 800),

      // 10 platform-optimized captions
      ask(xaiApiKey, `
Campaign context:
${ctx}

Best hook: "${bestHook}"
Best story opening: "${bestStory.slice(0, 100)}"

Write 10 ${platform} captions for this campaign.
Mix: 2 attention-phase (curiosity, no selling), 2 story-phase (emotional, personal), 3 desire-phase (aspiration, lifestyle), 2 conversion (offer + CTA), 1 retargeting (reminder).
Vary length: 3 short (under 50 words), 4 medium (50–120 words), 3 long (120–200 words).
Each ends with a CTA or engagement prompt appropriate to its phase.

Return a JSON array of 10 objects: [{"phase":"attention","caption":"..."},...]
`, 2500),

      // 5 video scripts (short-form, per phase)
      ask(xaiApiKey, `
Campaign context:
${ctx}

Write 5 short-form video scripts, one per campaign phase:
1. attention (0–15 seconds): hook in first 1–2 seconds, pattern break, no pitch
2. emotional_connection (15–30 seconds): story arc, transformation or day-in-life, emotional peak
3. desire_escalation (15–30 seconds): aspirational lifestyle, product in world, no hard sell
4. conversion (10–15 seconds): offer clear, CTA direct, urgency or proof
5. retargeting (10–20 seconds): familiar and warm, reminder or testimonial, soft close

Return a JSON array of 5 objects: [{"phase":"attention","duration":"0-15s","script":"...","direction":"camera/visual direction note"},...]
Scripts in spoken word form. Natural language not ad copy.
`, 1500),
    ])

    const conversionAds = tryJSON(conversionRaw, [])
    const retargetingAds = tryJSON(retargetingRaw, [])
    const captions = tryJSON(captionsRaw, [])
    const videoScripts = tryJSON(videoScriptsRaw, [])

    // ── STEP 3 — 30-day posting schedule ────────────────────────────────────
    const scheduleMap = getPhaseScheduleDays()
    const schedule = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1
      const phase = scheduleMap[day] || 'conversion'
      const phaseObj = CAMPAIGN_PHASES.find(p => p.id === phase)
      return {
        day,
        phase,
        phaseLabel: phaseObj?.label || phase,
        postTime: day % 7 === 1 ? '09:00' : day % 7 === 3 ? '18:00' : day % 7 === 5 ? '12:00' : '09:00',
        contentType: day % 3 === 0 ? 'video' : day % 3 === 1 ? 'image' : 'carousel',
        platform,
      }
    })

    // ── STEP 4 — Save everything ─────────────────────────────────────────────
    let savedProjectId = projectId
    try {
      if (!savedProjectId) {
        const { data: project } = await admin.from('projects').insert({
          user_id: user.id,
          name: `${productName} — Full Campaign (${style.replace(/_/g, ' ')})`,
          type: 'campaign',
        }).select().single()
        savedProjectId = project?.id || null
      }
    } catch {}

    try {
      await admin.from('generation_logs').insert({
        user_id: user.id,
        project_id: savedProjectId,
        type: 'full_ad_campaign',
        input: { productName, type, goal, style, platform, world },
        output: {
          attentionHooks: attentionHooks.length,
          storyScripts: storyScripts.length,
          desireImagePrompts: desireImagePrompts.length,
          conversionAds: conversionAds.length,
          retargetingAds: retargetingAds.length,
          captions: captions.length,
          videoScripts: videoScripts.length,
        },
      })
    } catch {}

    try {
      await admin.from('campaign_memory').insert({
        user_id: user.id,
        project_id: savedProjectId,
        top_hook_types: attentionHooks.map(h => h.archetype).filter(Boolean),
        top_platforms: [platform],
        top_angles: storyScripts.map(s => s.type).filter(Boolean),
        successful_patterns: { style, goal, type, platform, world },
      })
    } catch {}

    try {
      if (world) {
        const existing = await admin.from('world_memory').select('id, use_count').eq('user_id', user.id).eq('world_id', world).single()
        if (existing.data) {
          await admin.from('world_memory').update({ use_count: existing.data.use_count + 1, last_used_at: new Date().toISOString() }).eq('id', existing.data.id)
        } else {
          await admin.from('world_memory').insert({ user_id: user.id, world_id: world, world_name: world.replace(/_/g, ' '), use_count: 1, last_used_at: new Date().toISOString() })
        }
      }
    } catch {}

    return NextResponse.json({
      phases: {
        attention:            { hooks: attentionHooks },
        emotional_connection: { scripts: storyScripts },
        desire_escalation:    { imagePrompts: desireImagePrompts },
        conversion:           { ads: conversionAds },
        retargeting:          { ads: retargetingAds },
      },
      captions,
      videoScripts,
      schedule,
      projectId: savedProjectId,
      summary: {
        productName,
        type, goal, style, platform, world,
        totalAssets: attentionHooks.length + storyScripts.length + desireImagePrompts.length + conversionAds.length + retargetingAds.length + captions.length + videoScripts.length,
      },
    })
  } catch (err) {
    console.error('full-ad-campaign error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
