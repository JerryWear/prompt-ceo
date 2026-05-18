// ─────────────────────────────────────────────────────────────
// Brand DNA
// Local storage management for saved brand/product profiles.
// Allows users to save all their ad input fields and reload
// them instantly without re-entering data every session.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'promptceo_ad_brand_dna_v1'

// Fields saved per profile
export const BRAND_DNA_FIELDS = [
  'productName',
  'productDesc',
  'targetMood',
  'targetCustomer',
  'mainProblem',
  'mainDesire',
  'mainBenefit',
  'proofPoint',
  'offer',
  'callToAction',
  'brandVoice',
  'pricePoint',
  'platformGoal',
  'adPlatform',
  'adStyle',
  'inspiredStyle',
]

export function dnaLoad() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function dnaSave(profiles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  } catch {}
}

export function dnaAddProfile(name, fieldValues) {
  const profiles = dnaLoad()
  const existing = profiles.findIndex(p => p.name === name)
  const profile = {
    id:        existing >= 0 ? profiles[existing].id : Date.now(),
    name:      name.trim(),
    savedAt:   new Date().toISOString(),
    fields:    { ...fieldValues },
  }
  if (existing >= 0) {
    profiles[existing] = profile
  } else {
    profiles.unshift(profile)
  }
  // Keep max 10 profiles
  const trimmed = profiles.slice(0, 10)
  dnaSave(trimmed)
  return trimmed
}

export function dnaDeleteProfile(id) {
  const profiles = dnaLoad().filter(p => p.id !== id)
  dnaSave(profiles)
  return profiles
}

export function dnaGetProfile(id) {
  return dnaLoad().find(p => p.id === id) || null
}
