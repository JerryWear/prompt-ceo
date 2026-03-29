export const AGE_RANGE_OPTIONS = [
  { value: 'auto', label: 'Auto by pack' },
  { value: '18-24', label: '18–24' },
  { value: '25-29', label: '25–29' },
  { value: '30-39', label: '30–39' },
  { value: '40-49', label: '40–49' },
  { value: '50-60', label: '50–60' },
]

export const AGE_RANGE_LIBRARY = {
  '18-24': [
    '18 years old, youthful, soft feminine energy, fresh and natural presence',
    '20 years old, playful, social, light confident energy',
    '22 years old, athletic, energetic, modern lifestyle confidence',
    '24 years old, confident, expressive, socially magnetic',
  ],

  '25-29': [
    '25 years old, peak feminine aesthetic, confident and visually magnetic',
    '27 years old, balanced, feminine, self-aware confidence',
    '28 years old, refined, composed, high-value feminine presence',
    '29 years old, polished, attractive, socially powerful presence',
  ],

  '30-39': [
    '30 years old, elegant, controlled, emotionally grounded confidence',
    '32 years old, polished, self-assured, sophisticated feminine energy',
    '35 years old, powerful, composed, high-status presence',
    '38 years old, elegant authority, calm and confident identity',
  ],

  '40-49': [
    '40 years old, refined, strong, effortlessly feminine presence',
    '45 years old, confident, graceful, mature feminine power',
    '48 years old, polished, grounded, elegant high-value presence',
  ],

  '50-60': [
    '50 years old, elegant, high-value, composed and respected presence',
    '55 years old, timeless, confident, graceful and powerful feminine identity',
    '60 years old, refined, experienced, calm and deeply confident presence',
  ],
}

export const AGE_FLAT_LIBRARY = Object.values(AGE_RANGE_LIBRARY).flat()

export function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr[Math.floor(Math.random() * arr.length)]
}

export function resolveAgeFromRange(selectedRange, packDefaultRange = '25-29') {
  const finalRange =
    !selectedRange || selectedRange === 'auto'
      ? packDefaultRange || '25-29'
      : selectedRange

  return pickRandom(AGE_RANGE_LIBRARY[finalRange] || AGE_RANGE_LIBRARY['25-29'])
}