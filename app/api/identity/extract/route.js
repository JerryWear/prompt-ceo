import { NextResponse } from 'next/server'

function clean(value) {
  return String(value || '').trim()
}

function normalizeSingleTraits(raw = {}) {
  return {
    identity: clean(raw.identity),
    age: clean(raw.age),
    ethnicity: clean(raw.ethnicity),
    body_shape: clean(raw.body_shape),
    eye_color: clean(raw.eye_color),
    hair: clean(raw.hair),
    facial_hair: clean(raw.facial_hair),
    build: clean(raw.build),
  }
}

function normalizeTraits(raw = {}) {
  const hasStructuredCouple = raw?.subjectA || raw?.subjectB

  if (hasStructuredCouple) {
    return {
      subjectA: normalizeSingleTraits(raw?.subjectA || {}),
      subjectB: normalizeSingleTraits(raw?.subjectB || {}),
    }
  }

  return {
    subjectA: normalizeSingleTraits(raw || {}),
    subjectB: normalizeSingleTraits({}),
  }
}

function extractOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim()
  }

  const output = Array.isArray(data?.output) ? data.output : []

  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : []

    for (const part of content) {
      if (part?.type === 'output_text' && typeof part?.text === 'string' && part.text.trim()) {
        return part.text.trim()
      }
    }
  }

  return ''
}

export async function POST(req) {
  try {
    const body = await req.json()

    const imageDataUrl = clean(body?.imageDataUrl)

    if (!imageDataUrl) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'No image provided',
        },
        { status: 400 }
      )
    }

    const apiKey = clean(process.env.OPENAI_API_KEY)

    if (!apiKey) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing OPENAI_API_KEY on server',
        },
        { status: 500 }
      )
    }

    // STEP 1 — detect number of people
const detectRes = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-5.4',
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: 'How many people are clearly visible in this image? Answer ONLY with a number (1 or 2).'
          },
          {
            type: 'input_image',
            image_url: imageDataUrl,
            detail: 'high',
          },
        ],
      },
    ],
  }),
})

const detectData = await detectRes.json()
const detectText = extractOutputText(detectData)
const peopleCount = detectText.includes('2') ? 2 : 1

// STEP 2 — extract subject A
const extractARes = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-5.4',
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text:
              'Extract ONLY the PRIMARY person (subjectA) from this image. Return JSON with: identity, age, ethnicity, body_shape, eye_color, hair, facial_hair, build. No extra text.'
          },
          {
            type: 'input_image',
            image_url: imageDataUrl,
            detail: 'high',
          },
        ],
      },
    ],
  }),
})

const dataA = await extractARes.json()
const textA = extractOutputText(dataA)
let subjectA = {}

try {
  subjectA = JSON.parse(textA)
} catch {}

// STEP 3 — extract subject B ONLY if 2 people
let subjectB = {}

if (peopleCount === 2) {
  const extractBRes = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text:
                'Extract ONLY the SECONDARY person (subjectB) from this image. Ignore the main person. Return JSON with: identity, age, ethnicity, body_shape, eye_color, hair, facial_hair, build.'
            },
            {
              type: 'input_image',
              image_url: imageDataUrl,
              detail: 'high',
            },
          ],
        },
      ],
    }),
  })

  const dataB = await extractBRes.json()
  const textB = extractOutputText(dataB)

  try {
    subjectB = JSON.parse(textB)
  } catch {}
}

// FINAL RETURN
return NextResponse.json({
  status: 'complete',
  traits: normalizeTraits({
    subjectA,
    subjectB,
  }),

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.4',
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text:
  'You are performing structured identity extraction from an image. ' +
  'FIRST: determine how many people are visible. ' +
  'If TWO people are present, you MUST extract them separately. ' +
  'You are NOT allowed to merge them into one description. ' +
  'Return ONLY valid JSON in this EXACT structure: ' +
  '{"subjectA":{"identity":"","age":"","ethnicity":"","body_shape":"","eye_color":"","hair":"","facial_hair":"","build":""},"subjectB":{"identity":"","age":"","ethnicity":"","body_shape":"","eye_color":"","hair":"","facial_hair":"","build":""}} ' +
  'Rules: ' +
  '- If the image contains one female-presenting person and one male-presenting person, subjectA MUST be the female-presenting person and subjectB MUST be the male-presenting person. ' +
  '- If both people appear to be the same gender or gender is unclear, subjectA = left person OR most visually dominant, and subjectB = second person. ' +
  '- NEVER describe two people in one sentence. ' +
  '- ALWAYS fill BOTH subjectA and subjectB if two people exist. ' +
  '- If only ONE person exists, fill subjectA and leave subjectB empty strings. ' +
  'All values must be short, visual, and prompt-ready. ' +
  'No explanations. No markdown. Only JSON output.'
              },
              {
                type: 'input_image',
                image_url: imageDataUrl,
                detail: 'high',
              },
            ],
          },
        ],
      }),
    })

    const data = await openaiResponse.json()

    if (!openaiResponse.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message:
            clean(data?.error?.message) || 'OpenAI vision request failed',
        },
        { status: openaiResponse.status }
      )
    }

    const outputText = extractOutputText(data)

    if (!outputText) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Model returned no text output',
        },
        { status: 500 }
      )
    }

    let parsed

    try {
      parsed = JSON.parse(outputText)
    } catch (err) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Model returned invalid JSON',
          raw: outputText,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'complete',
      traits: normalizeTraits(parsed),
    })
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        message: clean(err?.message) || 'Server extraction failed',
      },
      { status: 500 }
    )
  }
}