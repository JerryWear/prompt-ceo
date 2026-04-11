export function buildSubjectGenerationPayload({
  subjectState,
  interactionState,
  prompt,
}) {
  const mode = subjectState?.characterMode === 'couple' ? 'couple' : 'single'

  const buildSubject = (subject = {}) => {
    const cleanName = String(subject?.identityName || '').trim()
    const imageDataUrl = String(subject?.imageDataUrl || '').trim()
    const extractedTraits = subject?.extractedTraits || {}

    return {
      gender: String(subject?.gender || '').trim(),
      identityName: cleanName,
      sourceType: imageDataUrl ? 'uploaded_reference_image' : cleanName ? 'name_only' : 'none',
      referenceImageDataUrl: imageDataUrl,
      sourceFileName: String(subject?.sourceFileName || '').trim(),
      useExtractedTraits: !!subject?.useExtractedTraits,
      extractedTraits: {
        identity: String(extractedTraits.identity || '').trim(),
        age: String(extractedTraits.age || '').trim(),
        ethnicity: String(extractedTraits.ethnicity || '').trim(),
        body_shape: String(extractedTraits.body_shape || '').trim(),
        eye_color: String(extractedTraits.eye_color || '').trim(),
        hair: String(extractedTraits.hair || '').trim(),
        facial_hair: String(extractedTraits.facial_hair || '').trim(),
        build: String(extractedTraits.build || '').trim(),
      },
      anchorStrength: imageDataUrl ? 'reference_image' : cleanName ? 'name_only' : 'off',
    }
  }

  return {
    mode,
    prompt: String(prompt || '').trim(),
    subjectA: buildSubject(subjectState?.subjectA || {}),
    subjectB: mode === 'couple' ? buildSubject(subjectState?.subjectB || {}) : null,
    interaction:
      mode === 'couple'
        ? {
            relationshipType: String(interactionState?.relationshipType || '').trim(),
            pairingType: String(interactionState?.pairingType || '').trim(),
            proximity: String(interactionState?.proximity || '').trim(),
            leadDynamic: String(interactionState?.leadDynamic || '').trim(),
            gazeMode: String(interactionState?.gazeMode || '').trim(),
            touchMode: String(interactionState?.touchMode || '').trim(),
            bodyOrientation: String(interactionState?.bodyOrientation || '').trim(),
            emotionalTone: String(interactionState?.emotionalTone || '').trim(),
            sceneIntensity: String(interactionState?.sceneIntensity || '').trim(),
          }
        : null,
  }
}