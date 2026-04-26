import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

function clean(value) {
  return String(value || '').trim()
}

export async function POST(req) {
  try {
    // 🔐 REAL SUPABASE AUTH USER
    const cookieStore = await cookies()

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser()

    const access = {
      isAuthenticated: !!user && !authError,
      hasAccess: !!user && !authError,
      userId: user?.id || '',
      email: user?.email || '',
    }

    if (!access.isAuthenticated) {
      return NextResponse.json(
        { status: 'error', message: 'Not authenticated' },
        { status: 401 }
      )
    }

    if (!access.hasAccess) {
      return NextResponse.json(
        { status: 'error', message: 'No active plan' },
        { status: 403 }
      )
    }

    // 🧠 READ BODY
    const body = await req.json()

    console.log('GENERATE_IMAGE_BODY_KEYS:', Object.keys(body || {}))
    console.log('GENERATE_IMAGE_HAS_PROMPT:', !!body?.prompt)
    console.log('GENERATE_IMAGE_HAS_IDENTITY:', !!body?.identity)
    console.log('GENERATE_IMAGE_HAS_XAI_KEY:', !!process.env.XAI_API_KEY)

    const prompt = clean(body?.prompt)

    const identityImage =
      body && body.identity && body.identity.image
        ? body.identity.image
        : ''

    const imageDataUrl = clean(identityImage || body?.imageDataUrl)

    console.log('DEBUG INPUT', {
      hasPrompt: !!prompt,
      promptPreview: prompt?.slice(0, 100),
      hasImage: !!imageDataUrl,
      imageLength: imageDataUrl?.length,
    })

    const extractedTraits = body?.extractedTraits || {}

    if (!prompt) {
      return NextResponse.json(
        { status: 'error', message: 'Missing prompt' },
        { status: 400 }
      )
    }

    if (!imageDataUrl) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Please upload an identity image before generating an image.',
        },
        { status: 400 }
      )
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^"+|"+$/g, '')
      .trim()

    if (!xaiApiKey) {
      return NextResponse.json(
        { status: 'error', message: 'Missing XAI_API_KEY on server' },
        { status: 500 }
      )
    }

    // 🔑 ADMIN SUPABASE CLIENT
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // GET USER CREDITS
    let { data: userRow, error: userFetchError } = await admin
      .from('app_users')
      .select('*')
      .eq('id', access.userId)
      .single()

    // CREATE USER IF NOT EXISTS
    if (!userRow) {
      const { error: insertError } = await admin.from('app_users').insert({
        id: access.userId,
        email: access.email,
        credits: 50,
      })

      if (insertError) {
        console.error('APP_USER_INSERT_ERROR:', insertError)

        return NextResponse.json(
          {
            status: 'error',
            message: insertError.message || 'Could not create credit user',
          },
          { status: 500 }
        )
      }

      const { data: newUser, error: newUserError } = await admin
        .from('app_users')
        .select('*')
        .eq('id', access.userId)
        .single()

      if (newUserError || !newUser) {
        console.error('APP_USER_FETCH_ERROR:', newUserError)

        return NextResponse.json(
          {
            status: 'error',
            message: newUserError?.message || 'Could not load credit user',
          },
          { status: 500 }
        )
      }

      userRow = newUser
    }

    if (userFetchError && userFetchError.code !== 'PGRST116') {
      console.error('APP_USER_FETCH_ERROR:', userFetchError)
    }

    // COST PER IMAGE
    const COST = 5

    if (!userRow || typeof userRow.credits !== 'number') {
      return NextResponse.json(
        { status: 'error', message: 'User credits not initialized' },
        { status: 500 }
      )
    }

    if (userRow.credits < COST) {
      return NextResponse.json(
        { status: 'error', message: 'Not enough credits' },
        { status: 402 }
      )
    }

    // 🧠 IMPROVE PROMPT WITH GROK TEXT MODEL
    let finalPrompt = prompt

    try {
      const identityTraitsBlock = [
        clean(extractedTraits?.identity)
          ? `Identity reference: ${clean(extractedTraits.identity)}`
          : '',
        clean(extractedTraits?.age)
          ? `Age: ${clean(extractedTraits.age)}`
          : '',
        clean(extractedTraits?.ethnicity)
          ? `Ethnicity/features: ${clean(extractedTraits.ethnicity)}`
          : '',
        clean(extractedTraits?.body_shape)
          ? `Body: ${clean(extractedTraits.body_shape)}`
          : '',
        clean(extractedTraits?.eye_color)
          ? `Eyes: ${clean(extractedTraits.eye_color)}`
          : '',
        clean(extractedTraits?.hair)
          ? `Hair: ${clean(extractedTraits.hair)}`
          : '',
      ]
        .filter(Boolean)
        .join('\n')

      const identityBlock = `
CRITICAL: The generated person must be the exact same real person as the reference image.
This is the same woman in a different scene, not a new woman and not a variation.

Preserve:
- same face
- same facial structure
- same bone structure
- same eyes
- same nose
- same lips
- same jawline
- same eyebrows
- same hairline
- same skin tone
- same proportions

${identityTraitsBlock}

Only enhance:
- environment
- lighting
- styling
- pose
- camera

If anything conflicts with identity, preserve identity first.
`

      console.log('GENERATE_IMAGE_BEFORE_GROK_FETCH')

      const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${xaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-4-1-fast-reasoning',
          messages: [
            {
              role: 'system',
              content:
                'You are an elite cinematic prompt engineer for ultra-realistic AI photography. You expand prompts into highly detailed, visually rich, natural, and non-repetitive scenes. Avoid generic phrasing. Always include environment, lighting, mood, camera angle, lens feel, and physical realism.',
            },
            {
              role: 'user',
              content: `
${prompt}

${identityBlock}

Expand this into a high-end cinematic image prompt with:
- natural human realism
- detailed environment
- lighting direction
- camera framing
- mood and atmosphere
- subtle body positioning
- fabric, texture, and depth

Do NOT repeat phrases.
Do NOT sound robotic.
Do NOT change identity.
`,
            },
          ],
        }),
      })

      const grokData = await grokRes.json()
      const improved = grokData?.choices?.[0]?.message?.content

      if (improved) {
        finalPrompt = improved
      }
    } catch (e) {
      console.log('Grok text improvement failed, fallback to original prompt')
    }

    // 🎨 IMAGE EDIT PROMPT
    const editPrompt = [
      finalPrompt,
      '',
      'Use the uploaded image as the identity reference for a fictional adult character.',
      'Generate a realistic editorial lifestyle image of the same adult character in a non-explicit scene.',
      'Preserve facial structure, eyes, nose, lips, jawline, eyebrows, hairline, skin tone, age range, and body proportions.',
      'Only change the environment, lighting, pose, wardrobe, camera framing, and atmosphere.',
      'The character must be fully clothed.',
      'Avoid nudity, lingerie, sexual posing, erotic framing, bedroom sexualization, fetish styling, or adult-content framing.',
      'Keep the result realistic, tasteful, non-explicit, commercial, and editorial.',
    ].join('\n')

    const xaiImageResponse = await fetch('https://api.x.ai/v1/images/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${xaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-imagine-image',
        prompt: editPrompt,
        image: {
          type: 'image_url',
          url: imageDataUrl,
        },
        aspect_ratio: '2:3',
      }),
    })

    const data = await xaiImageResponse.json()

    console.log('GROK_IMAGE_STATUS:', xaiImageResponse.status)
    console.log('GROK_IMAGE_RESPONSE:', JSON.stringify(data).slice(0, 1200))

    if (!xaiImageResponse.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: clean(data?.error?.message) || 'Grok image edit failed',
          raw: data,
        },
        { status: xaiImageResponse.status }
      )
    }

    const imageUrl = clean(data?.data?.[0]?.url)

    if (!imageUrl) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'No image returned from Grok image edit endpoint',
          raw: data,
        },
        { status: 500 }
      )
    }

    // 💰 DEDUCT CREDITS ONLY AFTER SUCCESSFUL IMAGE
    const { error: deductError } = await admin
      .from('app_users')
      .update({ credits: userRow.credits - COST })
      .eq('id', access.userId)

    if (deductError) {
      console.error('CREDIT_DEDUCT_ERROR:', deductError)

      return NextResponse.json(
        { status: 'error', message: 'Image generated but failed to deduct credits' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'complete',
      imageUrl,
      creditsRemaining: userRow.credits - COST,
    })
  } catch (err) {
    console.error('GENERATE_IMAGE_FATAL:', err)

    return NextResponse.json(
      {
        status: 'error',
        message: clean(err?.message) || 'Server generation failed',
        stack: clean(err?.stack),
      },
      { status: 500 }
    )
  }
}