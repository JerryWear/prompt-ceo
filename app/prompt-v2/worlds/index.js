import { WORLD_BALI } from './bali'
import { WORLD_ITALY } from './italy'
import { WORLD_AMALFI } from './amalfi'
import { WORLD_VENICE } from './venice'
import { WORLD_PRIVATE_CREATOR } from './privateCreator'
import { WORLD_FITNESS_LIFE } from './fitnessLife'
import { WORLD_LUXURY_LIFE } from './luxuryLife'
import { WORLD_FANVUE_CREATOR } from './fanvueCreator'
import { WORLD_ONLYFANS_CREATOR } from './onlyfansCreator'
import { WORLD_GYM_INFLUENCER } from './gymInfluencer'
import { WORLD_PARIS } from './paris'
import { WORLD_LONDON } from './london'

export const WORLD_LOCATIONS = [
  WORLD_BALI,
  WORLD_ITALY,
  WORLD_AMALFI,
  WORLD_VENICE,
  WORLD_PARIS,
  WORLD_LONDON,
]

export const STORY_STYLE_WORLDS = [
  WORLD_PRIVATE_CREATOR,
  WORLD_FITNESS_LIFE,
  WORLD_LUXURY_LIFE,
  WORLD_FANVUE_CREATOR,
  WORLD_ONLYFANS_CREATOR,
  WORLD_GYM_INFLUENCER,
]

export const WORLD_LOCATION_IDS = WORLD_LOCATIONS.map((w) => w.id)

export const WORLD_LOCATION_OPTIONS = WORLD_LOCATIONS.map((w) => ({
  id: w.id,
  name: w.name,
  country: w.country || '',
  region: w.region || '',
}))

// helper (very important later)
export const getWorldById = (id) =>
  [...WORLD_LOCATIONS, ...STORY_STYLE_WORLDS].find((w) => w.id === id)

export { WORLD_BALI, WORLD_ITALY, WORLD_AMALFI, WORLD_VENICE }