import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const imageUrl = searchParams.get('url')
    const fileName = searchParams.get('name') || 'prompt-ceo-image.png'

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Missing image URL' },
        { status: 400 }
      )
    }

    const response = await fetch(imageUrl)

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch image' },
        { status: 502 }
      )
    }

    const arrayBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/png'

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (err) {
    console.error('DOWNLOAD_IMAGE_ERROR:', err)

    return NextResponse.json(
      { message: 'Download failed' },
      { status: 500 }
    )
  }
}