import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function clean(value) {
  return String(value || '').trim()
}

// ─── Ad Creative prompt builders ─────────────────────────────────────────────

function buildProductAdPrompt({ productName, productDescription, adStyle, targetMood, platform }) {
  const styleMap = {
    lifestyle: 'aspirational lifestyle photography with the product naturally integrated into a real-world scene',
    minimal: 'clean minimal product photography on a simple elegant background with dramatic lighting',
    editorial: 'high-end editorial fashion-style photography with the product as the hero element',
    ugc: 'authentic user-generated content style, casual real-life setting, handheld feel, natural light',
    cinematic: 'cinematic wide-shot product placement in a dramatic environmental scene',
  }

  const platformMap = {
    instagram: 'vertical 4:5 crop, bold visual hierarchy, Instagram-ready composition',
    tiktok: 'vertical 9:16 composition, dynamic energy, TikTok-native feel',
    facebook: 'square or landscape, clear CTA visual space, Facebook ad format',
    general: 'versatile composition suitable for multiple platforms',
  }

  return `
High-end commercial advertising photograph for: ${productName}
Product details: ${productDescription}

Visual style: ${styleMap[adStyle] || styleMap.lifestyle}
Platform optimisation: ${platformMap[platform] || platformMap.general}
Target mood: ${targetMood || 'aspirational, premium, desirable'}

Requirements:
- Product must be the clear hero or naturally prominent in the scene
- Photorealistic, commercial-grade quality
- Professional studio or location lighting
- No text, logos, or overlays in the image
- Colour grade: clean, punchy, commercially appealing
- Composition leaves natural space for ad copy overlay
- Convey: quality, desirability, lifestyle aspiration
`
}

function buildPersonalBrandAdPrompt({ creatorNiche, adGoal, visualStyle, platform, identity }) {
  const nicheMap = {
    fitness: 'athletic performance, gym or outdoor training environment, strong natural lighting',
    beauty: 'beauty and skincare aesthetic, soft studio light, clean glamorous feel',
    fashion: 'editorial fashion, styled outfit, urban or studio location',
    lifestyle: 'aspirational lifestyle, luxury or everyday elevated setting',
    business: 'professional personal brand, confident polished aesthetic',
    creator: 'content creator vibe, behind-the-scenes or at-desk energy',
  }

  const goalMap = {
    awareness: 'broad reach — bold, eye-catching, instantly communicates brand identity',
    conversion: 'direct response — clear value proposition visible in scene, strong visual hook',
    engagement: 'community feel — authentic, relatable, invites interaction',
    launch: 'product or service launch energy — exciting, premium, announcement feel',
  }

  return `
Personal brand advertising content for a ${creatorNiche} creator.

Niche visual language: ${nicheMap[creatorNiche] || nicheMap.lifestyle}
Ad goal: ${goalMap[adGoal] || goalMap.awareness}
Visual style: ${visualStyle || 'polished, aspirational, authentic'}
Platform: ${platform || 'Instagram / TikTok'}

${identity ? `
CRITICAL: The person in this ad must match the identity reference image exactly.
Preserve: face, facial structure, eyes, nose, lips, jawline, skin tone, body proportions.
Only change: environment, lighting, styling, pose, camera framing.
` : ''}

Requirements:
- Feels like a real paid brand campaign, not generic stock
- Clear personal brand energy — distinctive, memorable
- Commercial-grade lighting and composition
- No text overlays in the image
- Composition allows space for copy placement
- Mood: confident, aspirational, on-brand
`
}

// ─── Main route ───────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    // 🔐 AUTH
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

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()

    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    // 🧠 READ BODY
    const body = await req.json()

    // ── Mode detection ────────────────────────────────────────────────────────
    // mode: 'director' (default) | 'product_ad' | 'personal_brand_ad'
    const mode = clean(body?.mode) || 'director'
    const isAdMode = mode === 'product_ad' || mode === 'personal_brand_ad'

    console.log('GENERATE_IMAGE_MODE:', mode)
    console.log('GENERATE_IMAGE_BODY_KEYS:', Object.keys(body || {}))

    const prompt = clean(body?.prompt)
    const identityImage = body?.identity?.image ? body.identity.image : ''
    const imageDataUrl = clean(identityImage || body?.imageDataUrl)
    const extractedTraits = body?.extractedTraits || {}

    // Ad mode doesn't require identity image — product ads can be productOnly
    const requiresIdentity = isAdMode ? (mode === 'personal_brand_ad') : true

    if (!prompt && !isAdMode) {
      return NextResponse.json({ status: 'error', message: 'Missing prompt' }, { status: 400 })
    }

    if (requiresIdentity && !imageDataUrl) {
      return NextResponse.json(
        { status: 'error', message: 'Please upload an identity image before generating.' },
        { status: 400 }
      )
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^"+|"+$/g, '')
      .trim()

    if (!xaiApiKey) {
      return NextResponse.json({ status: 'error', message: 'Missing XAI_API_KEY on server' }, { status: 500 })
    }

    // 🔑 ADMIN CLIENT + CREDITS
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

    const COST = 5
    if (!userRow || userRow.credits < COST) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits' }, { status: 402 })
    }

    // ── Build final prompt based on mode ──────────────────────────────────────
    let finalPrompt = prompt
    let editPrompt = ''

    if (mode === 'product_ad') {
      // ── PRODUCT AD MODE ───────────────────────────────────────────────────
      const adContext = buildProductAdPrompt({
        productName: clean(body?.adConfig?.productName) || 'the product',
        productDescription: clean(body?.adConfig?.productDescription) || '',
        adStyle: clean(body?.adConfig?.adStyle) || 'lifestyle',
        targetMood: clean(body?.adConfig?.targetMood) || '',
        platform: clean(body?.adConfig?.platform) || 'general',
      })

      // Improve with Grok text model
      try {
        const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
          body: JSON.stringify({
            model: 'grok-4-1-fast-reasoning',
            messages: [
              {
                role: 'system',
                content: 'You are a world-class commercial advertising photographer and creative director. You write precise, vivid image generation prompts for paid ad campaigns. Your prompts produce scroll-stopping, high-conversion ad creative.',
              },
              {
                role: 'user',
                content: `${adContext}\n\nExpand into a precise image generation prompt. Be specific about: lighting setup, camera angle, scene composition, colour palette, product placement, and commercial mood. Max 400 words. No preamble.`,
              },
            ],
          }),
        })
        const grokData = await grokRes.json()
        const improved = grokData?.choices?.[0]?.message?.content
        if (improved) finalPrompt = improved
      } catch {
        finalPrompt = adContext
      }

      editPrompt = [
        finalPrompt,
        '',
        'Generate a photorealistic commercial advertising image.',
        'Professional product photography quality.',
        'No text, watermarks, or overlays in the image.',
        'Clean commercial-grade output suitable for paid advertising.',
      ].join('\n')

    } else if (mode === 'personal_brand_ad') {
      // ── PERSONAL BRAND AD MODE ────────────────────────────────────────────
      const adContext = buildPersonalBrandAdPrompt({
        creatorNiche: clean(body?.adConfig?.creatorNiche) || 'lifestyle',
        adGoal: clean(body?.adConfig?.adGoal) || 'awareness',
        visualStyle: clean(body?.adConfig?.visualStyle) || '',
        platform: clean(body?.adConfig?.platform) || '',
        identity: !!imageDataUrl,
      })

      // Identity preservation block (same as director mode)
      const identityTraitsBlock = [
        extractedTraits?.identity ? `Identity reference: ${clean(extractedTraits.identity)}` : '',
        extractedTraits?.age ? `Age: ${clean(extractedTraits.age)}` : '',
        extractedTraits?.ethnicity ? `Ethnicity/features: ${clean(extractedTraits.ethnicity)}` : '',
        extractedTraits?.body_shape ? `Body: ${clean(extractedTraits.body_shape)}` : '',
        extractedTraits?.eye_color ? `Eyes: ${clean(extractedTraits.eye_color)}` : '',
        extractedTraits?.hair ? `Hair: ${clean(extractedTraits.hair)}` : '',
      ].filter(Boolean).join('\n')

      const identityBlock = imageDataUrl ? `
CRITICAL: The person in this image must exactly match the identity reference image.
Preserve: face, facial structure, eyes, nose, lips, jawline, skin tone, body proportions.
Only change: environment, lighting, styling, pose, camera framing.
${identityTraitsBlock}
` : ''

      try {
        const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
          body: JSON.stringify({
            model: 'grok-4-1-fast-reasoning',
            messages: [
              {
                role: 'system',
                content: 'You are a world-class personal brand photographer and creative director. You create paid ad campaigns for influencers, creators, and personal brands. Your prompts produce high-converting, authentic-feeling brand content.',
              },
              {
                role: 'user',
                content: `${adContext}\n${identityBlock}\nExpand into a precise image generation prompt. Specific about: lighting, camera angle, scene, colour grade, brand energy, and ad composition. Max 400 words. No preamble.`,
              },
            ],
          }),
        })
        const grokData = await grokRes.json()
        const improved = grokData?.choices?.[0]?.message?.content
        if (improved) finalPrompt = improved
      } catch {
        finalPrompt = adContext
      }

      editPrompt = [
        finalPrompt,
        '',
        imageDataUrl ? 'Use the uploaded image as the identity reference. Preserve facial structure, eyes, skin tone, and proportions exactly.' : '',
        'Generate a photorealistic personal brand advertising image.',
        'Professional campaign-grade quality.',
        'Authentic, aspirational, non-generic.',
        'No text, watermarks, or overlays in the image.',
      ].filter(Boolean).join('\n')

    } else {
      // ── DIRECTOR MODE (original logic) ────────────────────────────────────
      try {
        const identityTraitsBlock = [
          extractedTraits?.identity ? `Identity reference: ${clean(extractedTraits.identity)}` : '',
          extractedTraits?.age ? `Age: ${clean(extractedTraits.age)}` : '',
          extractedTraits?.ethnicity ? `Ethnicity/features: ${clean(extractedTraits.ethnicity)}` : '',
          extractedTraits?.body_shape ? `Body: ${clean(extractedTraits.body_shape)}` : '',
          extractedTraits?.eye_color ? `Eyes: ${clean(extractedTraits.eye_color)}` : '',
          extractedTraits?.hair ? `Hair: ${clean(extractedTraits.hair)}` : '',
        ].filter(Boolean).join('\n')

        const identityBlock = `
CRITICAL: The generated person must be the exact same real person as the reference image.
This is the same person in a different scene. Preserve their gender exactly as shown in the reference image.

Preserve:
- same face, facial structure, bone structure
- same eyes, nose, lips, jawline, eyebrows, hairline
- same skin tone and proportions

${identityTraitsBlock}

Only enhance: environment, lighting, styling, pose, camera.
If anything conflicts with identity, preserve identity first.
`
        const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
          body: JSON.stringify({
            model: 'grok-4-1-fast-reasoning',
            messages: [
              {
                role: 'system',
                content: 'You are an elite cinematic prompt engineer for ultra-realistic AI photography. You expand prompts into highly detailed, visually rich, natural, and non-repetitive scenes. Avoid generic phrasing. Always include environment, lighting, mood, camera angle, lens feel, and physical realism.',
              },
              {
                role: 'user',
                content: `${prompt}\n${identityBlock}\nExpand into a high-end cinematic image prompt with: natural human realism, detailed environment, lighting direction, camera framing, mood and atmosphere, subtle body positioning, fabric, texture, and depth. Do NOT repeat phrases. Do NOT sound robotic. Do NOT change identity.`,
              },
            ],
          }),
        })
        const grokData = await grokRes.json()
        const improved = grokData?.choices?.[0]?.message?.content
        if (improved) finalPrompt = improved
      } catch {
        console.log('Grok text improvement failed, using original prompt')
      }

      editPrompt = [
        finalPrompt,
        '',
        'Use the uploaded image as the identity reference for a fictional adult character.',
        'Generate a realistic editorial lifestyle image of the same adult character in a non-explicit scene.',
        'Preserve facial structure, eyes, nose, lips, jawline, eyebrows, hairline, skin tone, age range, and body proportions.',
        'Only change the environment, lighting, pose, wardrobe, camera framing, and atmosphere.',
        'Avoid nudity, lingerie, sexual posing, erotic framing, bedroom sexualization, fetish styling, or adult-content framing.',
        'Keep the result realistic, tasteful, non-explicit, commercial, and editorial.',
      ].join('\n')
    }

    // ── Call Grok image API ───────────────────────────────────────────────────
    const xaiPayload = {
      model: 'grok-imagine-image',
      prompt: editPrompt,
      aspect_ratio: mode === 'product_ad' ? '1:1' : '2:3',
    }

    // Only attach identity image if we have one
    if (imageDataUrl) {
      xaiPayload.image = { type: 'image_url', url: imageDataUrl }
    }

    const xaiImageResponse = await fetch(
      imageDataUrl ? 'https://api.x.ai/v1/images/edits' : 'https://api.x.ai/v1/images/generations',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
        body: JSON.stringify(xaiPayload),
      }
    )

    const data = await xaiImageResponse.json()

    console.log('GROK_IMAGE_STATUS:', xaiImageResponse.status)
    console.log('GROK_IMAGE_RESPONSE:', JSON.stringify(data).slice(0, 1200))

    if (!xaiImageResponse.ok) {
      return NextResponse.json(
        { status: 'error', message: clean(data?.error?.message) || 'Grok image generation failed', raw: data },
        { status: xaiImageResponse.status }
      )
    }

    const imageUrl = clean(data?.data?.[0]?.url)
    if (!imageUrl) {
      return NextResponse.json(
        { status: 'error', message: 'No image returned from Grok', raw: data },
        { status: 500 }
      )
    }

    // 💰 DEDUCT CREDITS
    await admin
      .from('app_users')
      .update({ credits: userRow.credits - COST })
      .eq('id', user.id)

    // 📝 LOG TO generation_logs
    try {
      await admin.from('generation_logs').insert({
        user_id: user.id,
        type: 'image',
        mode,
        prompt: finalPrompt.slice(0, 500),
        image_url: imageUrl,
        credits_used: COST,
        created_at: new Date().toISOString(),
      })
    } catch {
      // Non-fatal — don't block the response
    }

    return NextResponse.json({
      status: 'complete',
      imageUrl,
      creditsRemaining: userRow.credits - COST,
      mode,
    })

  } catch (err) {
    console.error('GENERATE_IMAGE_FATAL:', err)
    return NextResponse.json(
      { status: 'error', message: clean(err?.message) || 'Server generation failed' },
      { status: 500 }
    )
  }
}