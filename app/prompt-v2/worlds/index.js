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
import { WORLD_MONACO } from './monaco'
import { WORLD_LUXURY_YACHT_RIVIERA } from './luxuryYachtRiviera'
import { WORLD_FITNESS_GLOBAL_ELITE } from './fitness-global-elite'
import { WORLD_HIGH_SOCIETY_LIFE } from './highSocietyLife'

export const WORLD_LOCATIONS = [
  WORLD_BALI,
  WORLD_ITALY,
  WORLD_AMALFI,
  WORLD_VENICE,
  WORLD_PARIS,
  WORLD_LONDON,
  WORLD_MONACO,
  WORLD_LUXURY_YACHT_RIVIERA,
  WORLD_FITNESS_GLOBAL_ELITE,
]

export const STORY_STYLE_WORLDS = [
  WORLD_PRIVATE_CREATOR,
  WORLD_FITNESS_LIFE,
  WORLD_LUXURY_LIFE,
  WORLD_HIGH_SOCIETY_LIFE,
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

const ALL_WORLDS = [
  ...WORLD_LOCATIONS,
  ...STORY_STYLE_WORLDS,
]

// helper (very important later)
export const getWorldById = (id) =>
  ALL_WORLDS.find((w) => w.id === id)

export { WORLD_BALI, WORLD_ITALY, WORLD_AMALFI, WORLD_VENICE, WORLD_MONACO, WORLD_LUXURY_YACHT_RIVIERA, WORLD_FITNESS_GLOBAL_ELITE }