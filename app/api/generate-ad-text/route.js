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

    // ── Credits ─────────────────────────────────────────────
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let { data: userRow } = await admin
      .from('app_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      await admin.from('app_users').insert({ id: user.id, credits: 50, plan: 'trial', daily_limit: 20 })
      const { data: newUser } = await admin.from('app_users').select('*').eq('id', user.id).single()
      userRow = newUser
    }

    const COST = COSTS[type]
    if (!userRow || userRow.credits < COST) {
      return NextResponse.json(
        { status: 'error', message: `Not enough credits — need ${COST}, have ${userRow?.credits ?? 0}` },
        { status: 402 }
      )
    }

    // ── Build prompt ────────────────────────────────────────
    let systemPrompt = 'You are a world-class advertising strategist and direct-response copywriter. CRITICAL RULE: respond with ONLY raw valid JSON — no markdown, no code fences, no preamble, no explanation. Your entire response must start with [ or { and end with ] or }. Never add text before or after the JSON.'
    let userPrompt   = ''

    // Platform instruction appended to all content-generating types
    const platformInstruction = type !== 'quality_score'
      ? `\n\n${buildPlatformInstruction(adConfig?.platform || 'general')}`
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

    // ── Deduct credits ───────────────────────────────────────
    const newCredits = (userRow.credits || 0) - COST
    await admin.from('app_users').update({ credits: newCredits }).eq('id', user.id)

    return NextResponse.json({
      status:           'complete',
      type,
      hookType:         hookType || null,
      inspiredStyle:    inspiredStyle || null,
      data:             parsed,
      creditsUsed:      COST,
      creditsRemaining: newCredits,
    })

  } catch (err) {
    console.error('generate-ad-text error:', err)
    return NextResponse.json(
      { status: 'error', message: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
