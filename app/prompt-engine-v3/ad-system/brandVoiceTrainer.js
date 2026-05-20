// ─────────────────────────────────────────────────────────────
// Brand Voice Fingerprinting
// User pastes 3–5 of their best ads.
// AI extracts the exact voice signature — not a category label
// but the specific patterns that make THIS brand sound like itself.
// Fingerprint is injected into every generation prompt.
// ─────────────────────────────────────────────────────────────

export function buildVoiceTrainingPrompt(ads) {
  const adList = (Array.isArray(ads) ? ads : [ads])
    .filter(Boolean)
    .map((ad, i) => `AD ${i + 1}:\n${ad}`)
    .join('\n\n---\n\n')

  return `You are a senior brand strategist and copywriter specialising in voice analysis.

Analyse these ads carefully. Extract the exact brand voice fingerprint — not generic labels, but the specific patterns that make THIS brand sound like itself.

ADS TO ANALYSE:
${adList}

Look for:
1. Sentence length and rhythm (short punchy / medium / long flowing)
2. How they open hooks (question / bold claim / statement / story / pattern interrupt)
3. Emotional triggers used (pain / aspiration / identity / authority / FOMO / transformation)
4. CTA style (command / suggestion / urgency / value / soft close)
5. Vocabulary level (simple / elevated / technical / casual)
6. Tone (confident / warm / aggressive / playful / serious / intimate)
7. Unique structural patterns (do they always use contrast? short final line? specific punctuation rhythm?)
8. What makes this brand's voice DIFFERENT from competitors

Return ONLY valid JSON (no markdown):
{
  "voiceLabel": "3-5 word label for this voice e.g. Confident Feminine Power",
  "sentenceRhythm": "specific description of sentence length and pacing",
  "hookPattern": "how this brand opens — specific structure observed",
  "emotionalCore": "the primary emotional engine of this brand's copy",
  "ctaStyle": "how this brand closes and drives action",
  "vocabulary": "the level and type of language — specific words or patterns observed",
  "toneSignature": "what makes the tone distinctive — specific observation",
  "uniquePatterns": ["pattern 1 specific to this brand", "pattern 2", "pattern 3"],
  "forbiddenPatterns": ["what they never do", "language they avoid"],
  "voiceInstruction": "one paragraph of specific writing instructions — how to write in this exact voice for future ads"
}`
}

export function buildVoiceInjectionContext(fingerprint) {
  if (!fingerprint?.voiceInstruction) return ''

  return `BRAND VOICE FINGERPRINT — this brand has a trained voice. Write in this exact style:
Label: ${fingerprint.voiceLabel || ''}
Rhythm: ${fingerprint.sentenceRhythm || ''}
Hook pattern: ${fingerprint.hookPattern || ''}
Emotional core: ${fingerprint.emotionalCore || ''}
CTA style: ${fingerprint.ctaStyle || ''}
Tone: ${fingerprint.toneSignature || ''}
${fingerprint.uniquePatterns?.length > 0 ? `Unique patterns: ${fingerprint.uniquePatterns.join(', ')}` : ''}
${fingerprint.forbiddenPatterns?.length > 0 ? `Never do: ${fingerprint.forbiddenPatterns.join(', ')}` : ''}

Writing instruction:
${fingerprint.voiceInstruction}`
}
