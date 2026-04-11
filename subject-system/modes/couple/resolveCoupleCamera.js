export function resolveCoupleCamera({
  interactionModel = {},
  worldSceneOutput = {},
}) {
  const baseCamera = String(worldSceneOutput?.camera || '').trim()

  const proximity = String(interactionModel?.proximity || '').trim()
  const orientation = String(interactionModel?.bodyOrientation || '').trim()
  const sceneIntensity = String(interactionModel?.sceneIntensity || '').trim()

  const cameraParts = []

  // 🔥 BASE (from world)
  if (baseCamera) {
    cameraParts.push(baseCamera)
  }

  // 🔥 PROXIMITY-BASED FRAMING
  if (proximity === 'touching') {
    cameraParts.push('intimate close framing focused on both subjects')
  }

  if (proximity === 'near') {
    cameraParts.push('balanced two-subject composition')
  }

  // 🔥 ORIENTATION-BASED
  if (orientation === 'face_to_face') {
    cameraParts.push('tight emotional framing capturing both faces')
  }

  if (orientation === 'side_by_side') {
    cameraParts.push('cinematic side-by-side composition')
  }

  if (orientation === 'one_leading_one_following') {
    cameraParts.push('depth-based composition with natural foreground and background layering')
  }

  // 🔥 INTENSITY CONTROL
  if (sceneIntensity === 'soft') {
    cameraParts.push('soft cinematic lens perspective')
  }

  if (sceneIntensity === 'medium') {
    cameraParts.push('editorial balanced framing')
  }

  if (sceneIntensity === 'high') {
    cameraParts.push('tight cinematic crop with emotional focus')
  }

  const finalCamera = cameraParts
    .map((c) => String(c || '').trim())
    .filter(Boolean)
    .filter((c, i, arr) => arr.indexOf(c) === i)
    .join(', ')

  return finalCamera || 'cinematic two-shot composition'
}