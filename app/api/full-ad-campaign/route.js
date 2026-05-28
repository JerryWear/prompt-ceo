import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { runFullAdCampaign } from '../../campaign-engine/runFullAdCampaign.js'

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
          content: 'You are a world-class advertising strategist and direct-response copywriter. Respond with ONLY raw valid JSON — no markdown, no code fences, no explanation.',
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
      productName,
      productDescription = '',
      type          = 'product',
      goal          = 'sales',
      style         = 'cinematic',
      platform      = 'instagram',
      worldId       = 'luxury_penthouse',
      world         = null,           // legacy alias
      pricePoint    = 'mid_range',
      creatorProfile = null,
      brandProfile   = null,
      projectId      = null,
      campaignGoal   = goal,
    } = body

    if (!productName?.trim()) {
      return NextResponse.json({ error: 'productName is required' }, { status: 400 })
    }

    const resolvedWorldId = worldId || world || 'luxury_penthouse'

    // ── Life Campaign Engine builds the full scene skeleton ───────────────────
    const engine = runFullAdCampaign({
      worldId:            resolvedWorldId,
      dayType:            'ad_campaign_day',
      style,
      platform,
      creatorProfile,
      brandProfile,
      productName:        productName.trim(),
      productDescription,
      campaignGoal,
    })

    // Extract scene hooks to prime AI with life engine context
    const sceneContext = engine.scenes.slice(0, 5).map(s =>
      `[${s.time}] ${s.label}: "${s.hook}" — ${s.action}`
    ).join('\n')

    const ctx = [
      `Product: ${productName.trim()}`,
      productDescription ? `Description: ${productDescription}` : '',
      brandProfile?.name ? `Brand: ${brandProfile.name}` : '',
      `Type: ${type.replace(/_/g, ' ')}`,
      `Goal: ${goal.replace(/_/g, ' ')}`,
      `Style: ${style.replace(/_/g, ' ')}`,
      `Platform: ${platform}`,
      `World: ${engine.meta.world} — ${engine.meta.worldVibe}`,
      pricePoint ? `Price Point: ${pricePoint.replace(/_/g, ' ')}` : '',
      brandProfile?.voice ? `Brand Voice: ${brandProfile.voice}` : '',
      brandProfile?.style ? `Brand Style: ${brandProfile.style}` : '',
      brandProfile?.target_audience ? `Target Audience: ${brandProfile.target_audience}` : '',
      creatorProfile?.name ? `Creator: ${creatorProfile.name}` : '',
    ].filter(Boolean).join('\n')

    // ── STEP 1 — Parallel: Attention hooks + Story scripts + Desire prompts ──
    const [attentionRaw, storyRaw, desireImageRaw] = await Promise.all([
      ask(xaiApiKey, `
Campaign context:
${ctx}

Life Engine scene hooks for context:
${sceneContext}

Phase: AWARENESS (Phase 1 of 5)
Goal: Stop the scroll. Create curiosity. No selling yet.

Write 5 attention hooks, one per archetype:
1. pattern_break — something unexpected, challenges assumption
2. curiosity_gap — creates information gap, must keep reading
3. bold_claim — confident, specific, no hedging
4. visual_hook — describes the visual, not what it says
5. emotional_open — an emotion the viewer recognizes instantly

Return JSON array: [{"archetype":"pattern_break","hook":"..."},...]
Each hook under 15 words. No selling.
`, 800),

      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: CONNECTION (Phase 2 of 5)
Goal: Build emotional trust. Tell the story. Make them feel something.

Write 3 story scripts:
1. transformation_story — before/after life narrative (mindset, circumstance, not body)
2. day_in_life — a real day in the creator/brand world, authentic moments
3. origin_story — why this product exists, the moment it started

Return JSON array: [{"type":"transformation_story","script":"...","hook":"opening line under 12 words"},...]
Each script 3–5 sentences. First person. Specific details. No marketing language.
`, 1200),

      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: DESIRE (Phase 3 of 5)
Goal: Make them want the life. Aspiration. Transformation.

Generate 5 image prompts:
1. luxury_lifestyle — aspirational environment, elevated living
2. product_beauty — product as hero, premium close-up framing
3. creator_natural — creator using product, real moment, not posed
4. world_elevated — product in context of the aspirational world
5. transformation — before/after state, cinematic

Return JSON array: [{"type":"luxury_lifestyle","prompt":"..."},...]
Each prompt 2–3 sentences. Vivid, specific, cinematic. ${style.replace(/_/g, ' ')} aesthetic.
`, 1000),
    ])

    const attentionHooks    = tryJSON(attentionRaw, [])
    const storyScripts      = tryJSON(storyRaw, [])
    const desireImagePrompts = tryJSON(desireImageRaw, [])

    // ── STEP 2 — Parallel: Conversion + Retargeting + Captions + Video ────────
    const bestHook  = attentionHooks[0]?.hook || ''
    const bestStory = storyScripts[0]?.script || ''

    const [conversionRaw, retargetingRaw, captionsRaw, videoScriptsRaw] = await Promise.all([
      ask(xaiApiKey, `
Campaign context:
${ctx}
Best performing hook: "${bestHook}"

Phase: CONVERSION (Phase 4 of 5)
Goal: Convert. Direct offer. Clear CTA. Remove friction.

Write 3 conversion ads:
1. direct_offer — states the offer clearly: price, value, what they get
2. urgency — real scarcity or time-sensitive frame (no fake urgency)
3. social_proof — results, numbers, outcomes, testimonial format

Return JSON array: [{"type":"direct_offer","copy":"...","cta":"..."},...]
Each under 30 words. Hard CTA at the end. Platform: ${platform}.
`, 800),

      ask(xaiApiKey, `
Campaign context:
${ctx}

Phase: RETARGETING (Phase 5 of 5)
Goal: Win back the ones who almost bought. Reinforce, remind, reassure.

Write 3 retargeting ads:
1. soft_reminder — gentle, no pressure, here when ready
2. testimonial — specific customer outcome, human and real
3. objection_handle — addresses the most common reason people hesitate

Return JSON array: [{"type":"soft_reminder","copy":"..."},...]
Human and honest tone. No aggression.
`, 800),

      ask(xaiApiKey, `
Campaign context:
${ctx}
Best hook: "${bestHook}"
Best story opening: "${bestStory.slice(0, 100)}"

Write 10 ${platform} captions for this campaign.
Mix: 2 awareness (curiosity, no selling), 2 connection (emotional, personal), 3 desire (aspiration, lifestyle), 2 conversion (offer + CTA), 1 retargeting (reminder).
Vary length: 3 short (under 50 words), 4 medium (50–120 words), 3 long (120–200 words).

Return JSON array: [{"phase":"awareness","caption":"..."},...]
`, 2500),

      ask(xaiApiKey, `
Campaign context:
${ctx}

Write 5 short-form video scripts, one per campaign phase:
1. awareness (0–15s): hook in first 2 seconds, pattern break, no pitch
2. connection (15–30s): story arc, transformation or day-in-life, emotional peak
3. desire (15–30s): aspirational lifestyle, product in world, no hard sell
4. conversion (10–15s): offer clear, CTA direct, urgency or proof
5. retargeting (10–20s): familiar and warm, reminder or testimonial, soft close

Return JSON array: [{"phase":"awareness","duration":"0-15s","script":"...","direction":"camera/visual note"},...]
Scripts in spoken word form. Natural language.
`, 1500),
    ])

    const conversionAds  = tryJSON(conversionRaw, [])
    const retargetingAds = tryJSON(retargetingRaw, [])
    const captions       = tryJSON(captionsRaw, [])
    const videoScripts   = tryJSON(videoScriptsRaw, [])

    // ── STEP 3 — Merge AI content into Life Engine schedule ───────────────────
    // Enrich the engine's schedule with AI-generated hooks where available
    const enrichedSchedule = { ...engine.schedule }
    Object.keys(enrichedSchedule).forEach((key, i) => {
      const slot = enrichedSchedule[key]
      if (i < captions.length) {
        slot.scene.aiCaption = captions[i]?.caption || null
      }
    })

    // ── STEP 4 — Persist ──────────────────────────────────────────────────────
    let savedProjectId = projectId
    try {
      if (!savedProjectId) {
        const { data: project } = await admin.from('projects').insert({
          user_id: user.id,
          name:    `${productName.trim()} — Life Campaign (${style.replace(/_/g, ' ')})`,
          type:    'campaign',
        }).select().single()
        savedProjectId = project?.id || null
      }
    } catch {}

    try {
      await admin.from('generation_logs').insert({
        user_id:    user.id,
        project_id: savedProjectId,
        type:       'full_ad_campaign',
        input:      { productName, type, goal, style, platform, worldId: resolvedWorldId },
        output:     {
          attentionHooks:    attentionHooks.length,
          storyScripts:      storyScripts.length,
          desireImagePrompts: desireImagePrompts.length,
          conversionAds:     conversionAds.length,
          retargetingAds:    retargetingAds.length,
          captions:          captions.length,
          videoScripts:      videoScripts.length,
          engineScenes:      engine.scenes.length,
          scheduleDays:      30,
        },
      })
    } catch {}

    try {
      await admin.from('campaign_memory').insert({
        user_id:          user.id,
        project_id:       savedProjectId,
        top_hook_types:   attentionHooks.map(h => h.archetype).filter(Boolean),
        top_platforms:    [platform],
        top_angles:       storyScripts.map(s => s.type).filter(Boolean),
        successful_patterns: { style, goal, type, platform, worldId: resolvedWorldId },
      })
    } catch {}

    try {
      const existing = await admin.from('world_memory').select('id, use_count').eq('user_id', user.id).eq('world_id', resolvedWorldId).single()
      if (existing.data) {
        await admin.from('world_memory').update({ use_count: existing.data.use_count + 1, last_used_at: new Date().toISOString() }).eq('id', existing.data.id)
      } else {
        await admin.from('world_memory').insert({ user_id: user.id, world_id: resolvedWorldId, world_name: engine.meta.world, use_count: 1, last_used_at: new Date().toISOString() })
      }
    } catch {}

    return NextResponse.json({
      // ── Life Campaign Engine output ──
      engine: {
        meta:              engine.meta,
        scenes:            engine.scenes,
        schedule:          enrichedSchedule,
        retargetingAngles: engine.retargetingAngles,
        platformVersions:  engine.platformVersions,
        phases:            engine.phases,
      },
      // ── AI-generated copy layers ──
      phases: {
        awareness:   { hooks:        attentionHooks },
        connection:  { scripts:      storyScripts },
        desire:      { imagePrompts: desireImagePrompts },
        conversion:  { ads:          conversionAds },
        retargeting: { ads:          retargetingAds },
      },
      captions,
      videoScripts,
      projectId: savedProjectId,
      summary: {
        productName:  productName.trim(),
        worldId:      resolvedWorldId,
        world:        engine.meta.world,
        type, goal, style, platform,
        totalDays:    30,
        totalScenes:  engine.scenes.length,
        totalAssets:  attentionHooks.length + storyScripts.length + desireImagePrompts.length + conversionAds.length + retargetingAds.length + captions.length + videoScripts.length,
      },
    })
  } catch (err) {
    console.error('full-ad-campaign error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
