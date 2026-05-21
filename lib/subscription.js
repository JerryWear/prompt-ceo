// Subscription tier definitions and helpers

export const TIER_LIMITS = {
  free:       { images: 3,   music: 0,   textUnlimited: false, label: 'Free',       clientSharing: false, adStudio: false },
  creator:    { images: 20,  music: 0,   textUnlimited: false, label: 'Creator',    clientSharing: false, adStudio: false },
  studio_pro: { images: 150, music: 3,   textUnlimited: false, label: 'Studio Pro', clientSharing: false, adStudio: false },
  pro:        { images: 100, music: 3,   textUnlimited: true,  label: 'Pro',        clientSharing: true,  adStudio: true  },
  agency:     { images: 300, music: 10,  textUnlimited: true,  label: 'Agency',     clientSharing: true,  adStudio: true  },
}

export const TIER_PRICES = {
  creator:     process.env.STRIPE_PRICE_CREATOR,
  studio_pro:  process.env.STRIPE_PRICE_STUDIO_PRO,
  pro:         process.env.STRIPE_PRICE_PRO,
  agency:      process.env.STRIPE_PRICE_AGENCY,
  music_addon: process.env.STRIPE_PRICE_MUSIC_ADDON,
}

export const TIER_DISPLAY = {
  creator:     { price: '$29', label: 'Creator'    },
  studio_pro:  { price: '$49', label: 'Studio Pro' },
  pro:         { price: '$79', label: 'Pro'        },
  agency:      { price: '$179', label: 'Agency'    },
  music_addon: { price: '$9',  label: 'Music'      },
}

// Returns true if the user has an active subscription or is admin
export function isActive(user) {
  if (user?.is_admin) return true
  return user?.subscription_status === 'active' || user?.subscription_status === 'trialing'
}

// Returns limits for the user's current tier
export function getTierLimits(user) {
  if (user?.is_admin) return { images: 999999, music: 999999, textUnlimited: true, clientSharing: true, adStudio: true }
  const tier = (isActive(user) ? user?.subscription_tier : 'free') || 'free'
  return TIER_LIMITS[tier] || TIER_LIMITS.free
}

// Returns true if user can generate an image
export function canGenerateImage(user) {
  if (user?.is_admin) return true
  const limits = getTierLimits(user)
  return (user?.images_used_this_period || 0) < limits.images
}

// Returns true if user can generate text (unlimited for subscribers)
export function canGenerateText(user) {
  if (user?.is_admin) return true
  if (!isActive(user)) return (user?.credits || 0) > 0
  return getTierLimits(user).textUnlimited
}

// Returns true if user can license music
export function canLicenseMusic(user) {
  if (user?.is_admin) return true
  if (!isActive(user)) return false
  const limits = getTierLimits(user)
  if (user?.music_addon) return true
  return (user?.music_licenses_used_this_period || 0) < limits.music
}

// Returns images remaining this period
export function imagesRemaining(user) {
  if (user?.is_admin) return 999999
  const limits = getTierLimits(user)
  return Math.max(0, limits.images - (user?.images_used_this_period || 0))
}

// Returns music licenses remaining this period
export function musicRemaining(user) {
  if (user?.is_admin) return 999999
  if (user?.music_addon) return 999999
  const limits = getTierLimits(user)
  return Math.max(0, limits.music - (user?.music_licenses_used_this_period || 0))
}
