import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { scenes } = body

    // Generate HTML storyboard
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #040404; color: #e8e4dc; font-family: Georgia, serif; padding: 40px; }
    .header { margin-bottom: 40px; border-bottom: 1px solid #c8a84b; padding-bottom: 20px; }
    .title { font-size: 24px; letter-spacing: 4px; text-transform: uppercase; color: #c8a84b; }
    .subtitle { font-size: 12px; color: #4a4845; margin-top: 6px; letter-spacing: 2px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .scene { border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; border-left: 3px solid #4a7ab4; }
    .scene-img { width: 100%; height: 200px; object-fit: cover; display: block; background: #0a0a0a; }
    .scene-body { padding: 16px; }
    .scene-meta { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
    .badge { padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; }
    .badge-tease { background: #4a7ab422; border: 1px solid #4a7ab444; color: #4a7ab4; }
    .badge-tension { background: #b4944a22; border: 1px solid #b4944a44; color: #b4944a; }
    .badge-payoff { background: #b44a4a22; border: 1px solid #b44a4a44; color: #b44a4a; }
    .badge-default { background: #1a1a1a; border: 1px solid #2a2a2a; color: #4a4845; }
    .scene-num { font-size: 10px; color: #c8a84b; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; }
    .scene-prompt { font-family: 'Courier New', monospace; font-size: 11px; line-height: 1.8; color: #8a8680; }
    .scene-director { font-size: 9px; color: #4a4845; margin-top: 8px; letter-spacing: 1px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">Prompt CEO — Storyboard</div>
    <div class="subtitle">Director's Studio v3 · ${new Date().toLocaleDateString()} · ${scenes.length} scenes</div>
  </div>
  <div class="grid">
    ${scenes.map((s, i) => {
      const level = s.meta?.progressionLevel || 'tease'
      const tod = (s.meta?.timeOfDay || '').replace(/_/g, ' ')
      const world = (s.meta?.primaryWorldId || '').replace(/_/g, ' ')
      return `
    <div class="scene">
      ${s.imageUrl ? `<img class="scene-img" src="${s.imageUrl}" alt="Scene ${i + 1}" crossorigin="anonymous" />` : `<div class="scene-img"></div>`}
      <div class="scene-body">
        <div class="scene-num">SCENE ${i + 1} / ${scenes.length}</div>
        <div class="scene-meta">
          <span class="badge badge-${level}">${level}</span>
          ${tod ? `<span class="badge badge-default">${tod}</span>` : ''}
          ${world ? `<span class="badge badge-default">${world}</span>` : ''}
        </div>
        <div class="scene-prompt">${(s.finalPrompt || '').slice(0, 300)}${(s.finalPrompt || '').length > 300 ? '…' : ''}</div>
        ${s.director && s.director !== 'none' ? `<div class="scene-director">Director: ${s.director}</div>` : ''}
      </div>
    </div>`
    }).join('')}
  </div>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}