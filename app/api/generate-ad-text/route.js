import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

import { buildAnglesPrompt }           from '../../prompt-engine-v3/ad-system/adAngles.js'
import { buildHooksPrompt }            from '../../prompt-engine-v3/ad-system/adHooks.js'
import { buildCaptionsPrompt }         from '../../prompt-engine-v3/ad-system/adCaptions.js'
import { buildImageAdPromptPrompt }    from '../../prompt-engine-v3/ad-system/imageAdPrompt.js'
import { buildVideoAdPromptPrompt }    from '../../prompt-engine-v3/ad-system/videoAdPrompt.js'
import { buildUGCScriptsPrompt }       from '../../prompt-engine-v3/ad-system/ugcScripts.js'
import { buildCampaignPrompt }         from '../../prompt-engine-v3/ad-system/campaignBuilder.js'
import { buildQualityScorePrompt }     from '../../prompt-engine-v3/ad-system/adQualityScore.js'
import { buildPlatformInstruction }    from '../../prompt-engine-v3/ad-system/platformRules.js'
import { buildStyledGenerationPrompt } from '../../prompt-engine-v3/ad-system/competitorStyleEngine.js'
import { buildVariationPrompt }        from '../../prompt-engine-v3/ad-system/adVariations.js'
import { buildMusicAwarePromptContext } from '../../prompt-engine-v3/ad-system/musicIntelligence.js'
import { buildVoiceInjectionContext }  from '../../prompt-engine-v3/ad-system/brandVoiceTrainer.js'

function clean(v) { return String(v || '').trim() }

// Credit cost per generation type
const COSTS = {
  angles:        2,
  hooks:         1,
  captions:      2,
  image_prompt:  2,
  video_prompt:  3,
  ugc_scripts:   2,
  campaign:      5,
  quality_score: 1,
  variation:     1,
}

export async function POST(req) {
  try {
    // ── Auth ────────────────────────────────────────────────
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    // ── Body ────────────────────────────────────────────────
    const body            = await req.json()
    const type            = clean(body?.type)
    const hookType        = clean(body?.hookType)
    const adConfig        = body?.adConfig || {}
    const contentToScore  = clean(body?.contentToScore)   // for quality_score
    const inspiredStyle   = clean(body?.inspiredStyle)    // e.g. 'apple', 'nike', 'none'
    const variationContent = clean(body?.variationContent) // for variation
    const variationType   = clean(body?.variationType)    // e.g. 'luxury', 'emotional'
    const variationContentType = clean(body?.variationContentType) // 'hook' | 'caption' | etc.
    const brandProfile         = body?.brandProfile || null
    const projectId            = clean(body?.projectId || body?.adConfig?.projectId)

    // quality_score skips productName requirement
    if (type !== 'quality_score' && !clean(adConfig?.productName)) {
      return NextResponse.json({ status: 'error', message: 'Product name is required' }, { status: 400 })
    }

    if (!type || !COSTS[type]) {
      return NextResponse.json({ status: 'error', message: `Invalid type: ${type}` }, { status: 400 })
    }

    // ── API key ─────────────────────────────────────────────
    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^"+|"+$/g, '')
      .trim()

    if (!xaiApiKey) {
      return NextResponse.json({ status: 'error', message: 'Missing XAI_API_KEY on server' }, { status: 500 })
    }

    // ── Subscription check ───────────────────────────────────
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let { data: userRow } = await admin
      .from('app_users')
      .select('subscription_tier, subscription_status, credits')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      await admin.from('app_users').insert({ id: user.id, credits: 0, plan: 'free' })
      const { data: newUser } = await admin.from('app_users').select('subscription_tier, subscription_status, credits').eq('id', user.id).single()
      userRow = newUser
    }

    const { canGenerateText } = await import('../../../lib/subscription.js')
    if (!canGenerateText(userRow)) {
      return NextResponse.json(
        { status: 'error', message: 'Subscribe to generate ad content.', upgradeRequired: true },
        { status: 402 }
      )
    }

    // ── Performance bias (Upgrade 5) ─────────────────────────
    let performanceBias = ''
    try {
      const { data: perfLogs } = await admin
        .from('performance_logs')
        .select('hook_type, platform, world_id, ctr')
        .eq('user_id', user.id)
        .not('ctr', 'is', null)
        .order('ctr', { ascending: false })
        .limit(50)
      if (perfLogs?.length >= 5) {
        const topHook = perfLogs[0]?.hook_type
        const topPlatform = perfLogs[0]?.platform
        const topWorld = perfLogs.find(l => l.world_id)?.world_id
        const parts = []
        if (topHook) parts.push(`User data shows ${topHook} hooks perform best — bias toward this style`)
        if (topPlatform) parts.push(`Optimise for ${topPlatform}`)
        if (topWorld) parts.push(`${topWorld} visual world drives highest engagement for this user`)
        if (parts.length) performanceBias = `\n\nUSER PERFORMANCE DATA: ${parts.join('. ')}.`
      }
    } catch {}

    // ── Brand Profile injection (Build 2) ───────────────────
    let brandProfileContext = ''
    if (brandProfile && type !== 'quality_score') {
      const parts = []
      if (brandProfile.name) parts.push(`Brand: ${brandProfile.name}`)
      if (brandProfile.voice) parts.push(`Voice: ${brandProfile.voice}`)
      if (brandProfile.style) parts.push(`Style: ${brandProfile.style}`)
      if (brandProfile.target_audience) parts.push(`Target Audience: ${brandProfile.target_audience}`)
      if (brandProfile.hooks_that_work?.length) parts.push(`Hooks that work for this brand: ${brandProfile.hooks_that_work.slice(0, 3).join('; ')}`)
      if (brandProfile.angles_that_work?.length) parts.push(`Angles that work for this brand: ${brandProfile.angles_that_work.slice(0, 3).join('; ')}`)
      if (parts.length) brandProfileContext = `ACTIVE BRAND PROFILE — write specifically for this brand:\n${parts.map(p => `• ${p}`).join('\n')}\n\n`
    }

    // ── Project Brain™ context (Campaign Evolution) ──────────
    const PHASE_DETAIL = {
      attention:            { hook_type: 'pattern-break', cta_type: 'curiosity click',  audience_state: 'cold — no prior relationship',    instruction: 'Stop the scroll. No context assumed. Hit hard in the first frame.' },
      emotional_connection: { hook_type: 'story',         cta_type: 'empathy follow',   audience_state: 'aware — seen you before',          instruction: 'They know you. Make them feel something real. No hard sell.' },
      desire_escalation:    { hook_type: 'desire',        cta_type: 'want this',        audience_state: 'warming — interested',             instruction: 'Paint the life they want. Make the gap between now and that life feel urgent.' },
      conversion:           { hook_type: 'pain',          cta_type: 'buy now',          audience_state: 'hot — ready to act',               instruction: 'Remove every objection. Make buying the obvious next step.' },
      retargeting:          { hook_type: 'social proof',  cta_type: 'last chance',      audience_state: 'fatigued — saw it, didn\'t act',   instruction: "Win them back with proof and urgency. Acknowledge they've seen this before." },
    }

    let brainContext = ''
    let brainCampaignPhase = null
    if (projectId) {
      try {
        const { data: brainRow } = await admin
          .from('project_brain')
          .select('campaign_stage, best_hook_types, best_styles, audience_temperature, fatigue_score')
          .eq('project_id', projectId)
          .eq('user_id', user.id)
          .single()

        if (brainRow) {
          brainCampaignPhase = brainRow.campaign_stage || 'attention'
          const phaseDetail = PHASE_DETAIL[brainCampaignPhase] || PHASE_DETAIL.attention
          const parts = [
            `Campaign phase: ${brainCampaignPhase.replace(/_/g, ' ').toUpperCase()} — ${phaseDetail.instruction}`,
            `Required hook type for this phase: ${phaseDetail.hook_type}.`,
            `CTA style: ${phaseDetail.cta_type}.`,
            `Audience state: ${phaseDetail.audience_state}.`,
          ]
          if (brainRow.best_hook_types?.length) {
            parts.push(`This creator's proven hook types: ${brainRow.best_hook_types.join(', ')}.`)
          }
          if (brainRow.best_styles?.length) {
            parts.push(`Top performing styles: ${brainRow.best_styles.slice(0, 3).join(', ')}.`)
          }
          if ((brainRow.fatigue_score || 0) > 70) {
            parts.push(`Creative fatigue is high (${brainRow.fatigue_score}/100) — maximize novelty and pattern-breaks.`)
          }
          brainContext = '\n\nProject intelligence:\n' + parts.join('\n')
        }
      } catch {}
    }

    // ── Build prompt ────────────────────────────────────────
    let systemPrompt = `You are a world-class advertising strategist and direct-response copywriter. CRITICAL RULE: respond with ONLY raw valid JSON — no markdown, no code fences, no preamble, no explanation. Your entire response must start with [ or { and end with ] or }. Never add text before or after the JSON.${brainContext}`
    let userPrompt   = ''

    // Platform instruction appended to all content-generating types
    const platformInstruction = type !== 'quality_score'
      ? `\n\n${buildPlatformInstruction(adConfig?.platform || 'general')}${performanceBias}`
      : ''

    if (type === 'angles') {
      userPrompt = buildAnglesPrompt(adConfig) + platformInstruction
    } else if (type === 'hooks') {
      userPrompt = buildHooksPrompt(adConfig, hookType || 'pain') + platformInstruction
    } else if (type === 'captions') {
      userPrompt = buildCaptionsPrompt(adConfig) + platformInstruction
    } else if (type === 'image_prompt') {
      userPrompt = buildImageAdPromptPrompt(adConfig) + platformInstruction
    } else if (type === 'video_prompt') {
      userPrompt = buildVideoAdPromptPrompt(adConfig) + platformInstruction
    } else if (type === 'ugc_scripts') {
      userPrompt = buildUGCScriptsPrompt(adConfig) + platformInstruction
    } else if (type === 'campaign') {
      userPrompt = buildCampaignPrompt(adConfig) + platformInstruction
    } else if (type === 'quality_score') {
      if (!contentToScore) {
        return NextResponse.json({ status: 'error', message: 'No content provided to score' }, { status: 400 })
      }
      userPrompt = buildQualityScorePrompt(contentToScore, adConfig)
    } else if (type === 'variation') {
      if (!variationContent || !variationType) {
        return NextResponse.json({ status: 'error', message: 'variationContent and variationType required' }, { status: 400 })
      }
      const vPrompt = buildVariationPrompt(variationContent, variationType, variationContentType || 'hook', adConfig)
      if (!vPrompt) {
        return NextResponse.json({ status: 'error', message: `Unknown variationType: ${variationType}` }, { status: 400 })
      }
      userPrompt = vPrompt
    }

    // ── Inject locked creative context ─────────────────────
    // Locked items are prepended to every prompt so the AI respects them
    if (type !== 'quality_score') {
      const locks = []
      if (adConfig.lockedAngle?.title)  locks.push(`Campaign Direction: "${adConfig.lockedAngle.title}" — ${adConfig.lockedAngle.hook}`)
      if (adConfig.lockedHook)          locks.push(`Opening Hook (LOCKED — do not change): "${adConfig.lockedHook}"`)
      if (adConfig.lockedCaption?.label) locks.push(`Caption Style (LOCKED): ${adConfig.lockedCaption.label} — ${(adConfig.lockedCaption.fullCaption || '').slice(0, 120)}`)
      if (adConfig.lockedBrandVoice)    locks.push(`Brand Voice (LOCKED): ${adConfig.lockedBrandVoice}`)
      if (adConfig.lockedVisualStyle)   locks.push(`Visual Style (LOCKED): ${adConfig.lockedVisualStyle}`)
      if (adConfig.lockedMusic?.title)  locks.push(`Music/Energy (LOCKED): ${adConfig.lockedMusic.title} — ${adConfig.lockedMusic.mood || ''}, ${adConfig.lockedMusic.energy || ''} energy`)

      if (locks.length > 0) {
        userPrompt = `LOCKED CREATIVE DECISIONS — these are already decided. Build your output to align with them, not replace them:\n${locks.map(l => `• ${l}`).join('\n')}\n\n` + userPrompt
      }
    }

    // ── Inject Brand Profile ─────────────────────────────────
    if (brandProfileContext) userPrompt = brandProfileContext + userPrompt

    // ── Inject Brand Voice Fingerprint — trained voice overrides generic labels ──
    if (type !== 'quality_score' && type !== 'variation' && adConfig.voiceFingerprint) {
      const voiceContext = buildVoiceInjectionContext(adConfig.voiceFingerprint)
      if (voiceContext) userPrompt = voiceContext + '\n\n' + userPrompt
    }

    // ── Inject Music Intelligence — when a track is locked, all content aligns ──
    if (type !== 'quality_score' && type !== 'variation') {
      const musicTrack = adConfig.lockedMusic || adConfig.adMusicTrack
      if (musicTrack?.title) {
        const musicContext = buildMusicAwarePromptContext(musicTrack)
        if (musicContext) {
          userPrompt = musicContext + '\n\n' + userPrompt
        }
      }
    }

    // ── Inject Brand Learning + Performance Intelligence ──────
    if (type !== 'quality_score' && type !== 'variation') {
      const winners       = adConfig.winners       || {}
      const topPerformers = adConfig.topPerformers || {}
      const lines = []

      // Starred winners (quality benchmark)
      if (winners.hooks?.length > 0 && ['hooks', 'captions', 'ugc_scripts', 'campaign'].includes(type)) {
        lines.push('STARRED WINNING HOOKS (quality benchmark — match or exceed):')
        winners.hooks.slice(0, 5).forEach((h, i) => lines.push(`  ${i + 1}. "${h}"`))
      }
      if (winners.angles?.length > 0 && ['angles', 'hooks', 'captions', 'campaign'].includes(type)) {
        lines.push('WINNING ANGLES (creative reference — build from these directions):')
        winners.angles.slice(0, 3).forEach(a => lines.push(`  • ${a.title}: "${a.hook}"`))
      }

      // Performance data (actual CTR results)
      if (topPerformers.hooks?.length > 0 && ['hooks', 'captions', 'campaign'].includes(type)) {
        lines.push('HIGHEST CTR HOOKS FROM THIS BRAND (real performance data):')
        topPerformers.hooks.forEach(h => lines.push(`  • ${h.ctr}% CTR: "${h.text}"${h.notes ? ` (${h.notes})` : ''}`))
        lines.push('Generate hooks with the same energy and structure as your top performers.')
      }
      if (topPerformers.angles?.length > 0 && ['angles', 'hooks'].includes(type)) {
        lines.push('HIGHEST CTR ANGLES FROM THIS BRAND:')
        topPerformers.angles.forEach(a => lines.push(`  • ${a.ctr}% CTR: ${a.text}`))
      }

      if (lines.length > 0) {
        userPrompt = `BRAND INTELLIGENCE — your brand's proven creative:\n${lines.join('\n')}\nDo NOT copy these. Use them as proven benchmarks.\n\n` + userPrompt
      }
    }

    // Apply inspired style layer (not for scoring)
    if (inspiredStyle && inspiredStyle !== 'none' && type !== 'quality_score') {
      userPrompt = buildStyledGenerationPrompt(userPrompt, inspiredStyle, adConfig)
    }

    // ── Call xAI (Grok) ─────────────────────────────────────
    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${xaiApiKey}`,
      },
      body: JSON.stringify({
        model:       'grok-3-fast',
        max_tokens:  8000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt   },
        ],
        temperature: (type === 'quality_score') ? 0.3 : (type === 'variation') ? 0.9 : 0.85,
      }),
    })

    const aiData = await aiRes.json()

    if (!aiRes.ok) {
      return NextResponse.json(
        { status: 'error', message: aiData?.error?.message || 'AI generation failed' },
        { status: aiRes.status }
      )
    }

    const rawText = aiData?.choices?.[0]?.message?.content || ''

    // ── Parse JSON ──────────────────────────────────────────
    let parsed = null

    const tryParse = (str) => {
      try { return JSON.parse(str) } catch { return null }
    }

    // 1. Strip markdown fences and try direct parse
    const stripped = rawText
      .replace(/^```(?:json|javascript)?\s*/i, '')
      .replace(/\s*```\s*$/i, '')
      .trim()
    parsed = tryParse(stripped)

    // 2. Find first [ or { and last ] or } — strip surrounding prose
    if (!parsed) {
      const firstBracket = Math.min(
        stripped.indexOf('[') === -1 ? Infinity : stripped.indexOf('['),
        stripped.indexOf('{') === -1 ? Infinity : stripped.indexOf('{')
      )
      const lastClose = Math.max(stripped.lastIndexOf(']'), stripped.lastIndexOf('}'))
      if (firstBracket !== Infinity && lastClose > firstBracket) {
        parsed = tryParse(stripped.slice(firstBracket, lastClose + 1))
      }
    }

    // 3. Regex fallback — grab largest JSON array or object
    if (!parsed) {
      const match = rawText.match(/(\[[\s\S]*\]|\{[\s\S]*\})/)
      if (match) parsed = tryParse(match[1])
    }

    if (!parsed) {
      console.error('Unparseable AI output:', rawText.slice(0, 600))
      return NextResponse.json(
        { status: 'error', message: 'AI returned unparseable output — please try again' },
        { status: 500 }
      )
    }

    // ── Log generation ──────────────────────────────────────
    try {
      await admin.from('generation_logs').insert({
        user_id:        user.id,
        project_id:     projectId || null,
        type,
        input:          { type, hookType: hookType || null, productName: adConfig?.productName || null, platform: adConfig?.platform || null },
        output:         { count: Array.isArray(parsed) ? parsed.length : 1 },
        campaign_phase: brainCampaignPhase,
      })
    } catch {}

    return NextResponse.json({
      status:        'complete',
      type,
      hookType:      hookType || null,
      inspiredStyle: inspiredStyle || null,
      data:          parsed,
    })

  } catch (err) {
    console.error('generate-ad-text error:', err)
    return NextResponse.json(
      { status: 'error', message: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
