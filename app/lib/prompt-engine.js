export function buildFinalPrompt({
  blocks,
  plan,
  intensity,
  locationCategory,
  contentMode,
}) {
  const parts = []

  for (const [key, value] of Object.entries(blocks)) {
    let val = String(value || '').trim()
    if (!val) continue
    parts.push(`${key}:\n${val}`)
  }

return `${parts.join('\n\n')}`
}