import { NextResponse } from 'next/server'

function clean(value) {
  return String(value || '').trim()
}

export async function POST(req) {
  try {
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
  imageLength: imageDataUrl?.length
}) 

const extractedTraits = body?.extractedTraits || {}

    if (!prompt) {
      return NextResponse.json(
        { status: 'error', message: 'Missing prompt' },
        { status: 400 }
      )
    }

if (!imageDataUrl) {
  console.log('No identity image — running without identity')
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

let finalPrompt = prompt

if (xaiApiKey) {
  try {
const identityTraitsBlock = [
  clean(extractedTraits?.identity) ? `Identity reference: ${clean(extractedTraits.identity)}` : '',
  clean(extractedTraits?.age) ? `Age: ${clean(extractedTraits.age)}` : '',
  clean(extractedTraits?.ethnicity) ? `Ethnicity/features: ${clean(extractedTraits.ethnicity)}` : '',
  clean(extractedTraits?.body_shape) ? `Body: ${clean(extractedTraits.body_shape)}` : '',
  clean(extractedTraits?.eye_color) ? `Eyes: ${clean(extractedTraits.eye_color)}` : '',
  clean(extractedTraits?.hair) ? `Hair: ${clean(extractedTraits.hair)}` : '',
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
    console.log('Grok failed, fallback to original prompt')
  }
}

    const editPrompt = [
  finalPrompt,
      '',
      'Preserve the exact same real person from the input image.',
      'Keep the same face, same identity, same facial structure, same eyes, same nose, same lips, same jawline, same eyebrows, same hairline.',
      'Only change styling, clothing, pose, scene, camera, or environment as requested.',
      'Do not replace the person with a different woman.'
    ].join('\n')

const base64Data = imageDataUrl.includes(',')
  ? imageDataUrl.split(',')[1]
  : imageDataUrl

const imageBuffer = Buffer.from(base64Data, 'base64')

const formData = new FormData()
formData.append('model', 'gpt-image-1')
formData.append('prompt', editPrompt)
formData.append('image', new Blob([imageBuffer], { type: 'image/png' }), 'identity.png')
formData.append('input_fidelity', 'high')
formData.append('size', '1024x1536')

const openaiApiKey = String(process.env.OPENAI_API_KEY || '')
  .replace(/^Bearer\s+/i, '')
  .replace(/^"+|"+$/g, '')
  .trim()

if (!openaiApiKey) {
  return NextResponse.json(
    { status: 'error', message: 'Missing OPENAI_API_KEY on server' },
    { status: 500 }
  )
}

const xaiResponse = await fetch('https://api.openai.com/v1/images/edits', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${openaiApiKey}`,
  },
  body: formData,
})

const data = await xaiResponse.json()

console.log('XAI_IMAGE_STATUS:', xaiResponse.status)
console.log('XAI_IMAGE_RESPONSE:', JSON.stringify(data).slice(0, 1200))

if (!xaiResponse.ok) {
  return NextResponse.json(
    {
      status: 'error',
      message: clean(data?.error?.message) || 'Grok image edit failed',
      raw: data,
    },
    { status: xaiResponse.status }
  )
}

const imageBase64 = data?.data?.[0]?.b64_json || ''
const imageUrl =
  imageBase64
    ? `data:image/png;base64,${imageBase64}`
    : clean(data?.data?.[0]?.url)

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

    return NextResponse.json({
      status: 'complete',
      imageUrl,
    })
  } catch (err) {
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