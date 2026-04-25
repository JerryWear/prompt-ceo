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
  return {
    subjectA: normalizeSingleTraits(raw?.subjectA || {}),
    subjectB: normalizeSingleTraits(raw?.subjectB || {}),
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
      if (
        part?.type === 'output_text' &&
        typeof part?.text === 'string' &&
        part.text.trim()
      ) {
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
        { status: 'error', message: 'No image provided' },
        { status: 400 }
      )
    }

    const apiKey = String(process.env.OPENAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^"+|"+$/g, '')
      .trim()

    if (!apiKey) {
      return NextResponse.json(
        { status: 'error', message: 'Missing OPENAI_API_KEY on server' },
        { status: 500 }
      )
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text:
                  'Analyze the uploaded image for prompt identity extraction. Return ONLY valid JSON in this exact structure: {"subjectA":{"identity":"","age":"","ethnicity":"","body_shape":"","eye_color":"","hair":"","facial_hair":"","build":""},"subjectB":{"identity":"","age":"","ethnicity":"","body_shape":"","eye_color":"","hair":"","facial_hair":"","build":""}}. If one person is visible, fill subjectA and leave subjectB empty. If two people are visible, extract both separately. If one female-presenting and one male-presenting person are visible, subjectA must be the female-presenting person and subjectB must be the male-presenting person. Keep values short, visual, and prompt-ready. No markdown. No explanations.',
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

    console.log('IDENTITY_EXTRACT_STATUS:', openaiResponse.status)
    console.log('IDENTITY_EXTRACT_RESPONSE:', JSON.stringify(data).slice(0, 1200))

    if (!openaiResponse.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: clean(data?.error?.message) || 'OpenAI vision request failed',
          raw: data,
        },
        { status: openaiResponse.status }
      )
    }

    const outputText = extractOutputText(data)

    if (!outputText) {
      return NextResponse.json(
        { status: 'error', message: 'Model returned no text output', raw: data },
        { status: 500 }
      )
    }

    let parsed = null

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