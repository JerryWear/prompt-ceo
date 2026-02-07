"use client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { useMemo, useState, useEffect } from "react";

/**
 * POSE V2 (SAFE BUILD)
 * - Keeps V1 untouched
 * - One pose only (category -> variant)
 * - No localStorage, no history, no clothing logic yet
 *
 * NEXT: once this works perfectly, we merge back into V1 carefully.
 */

// ✅ STEP: Replace PLACES with your V1 places list (copy-paste the array)
// If you don't replace it now, it will still run using the sample places below.
const PLACES = [
  {
    id: "it_rome_cafe_street",
    country: "Italy",
    city: "Rome",
    setting: "Old stone street outside a luxury café",
    environment: "Outdoor",
    timeOfDayOptions: ["Morning", "Golden hour", "Night"],
    lightOptions: ["Soft natural light", "Warm sunset glow", "Neon city glow"],
  },
  {
    id: "fr_paris_hotel_bed",
    country: "France",
    city: "Paris",
    setting: "Luxury hotel room with crisp white sheets and soft curtains",
    environment: "Indoor",
    timeOfDayOptions: ["Morning", "Evening", "Night"],
    lightOptions: ["Window light", "Soft lamp light", "Moody low light"],
  },
  {
    id: "ae_dubai_rooftop_pool",
    country: "UAE",
    city: "Dubai",
    setting: "Rooftop infinity pool with skyline behind",
    environment: "Outdoor",
    timeOfDayOptions: ["Late afternoon", "Golden hour", "Night"],
    lightOptions: ["Bright sun", "Warm golden sunlight", "Neon skyline glow"],
  },
  // BEACHES & RESORTS
{
  id: "es_ibiza_beach",
  country: "Spain",
  city: "Ibiza",
  setting: "White sand beach with turquoise water and sun loungers",
  environment: "Outdoor",
  timeOfDayOptions: ["Morning", "Late afternoon", "Golden hour"],
  lightOptions: ["Bright sun", "Warm sunset glow"],
},
{
  id: "us_miami_south_beach",
  country: "USA",
  city: "Miami",
  setting: "South Beach shoreline with palm trees and pastel buildings",
  environment: "Outdoor",
  timeOfDayOptions: ["Morning", "Golden hour"],
  lightOptions: ["Bright sun", "Soft sunset light"],
},

// NIGHTLIFE
{
  id: "fr_paris_nightclub",
  country: "France",
  city: "Paris",
  setting: "Luxury underground nightclub with neon lights and velvet seating",
  environment: "Indoor",
  timeOfDayOptions: ["Night"],
  lightOptions: ["Neon glow", "Low moody light"],
},
{
  id: "ae_dubai_rooftop_club",
  country: "UAE",
  city: "Dubai",
  setting: "Rooftop nightclub with skyline views and VIP lounge",
  environment: "Outdoor",
  timeOfDayOptions: ["Night"],
  lightOptions: ["City glow", "Neon highlights"],
},

// HOTELS
{
  id: "it_milan_hotel_suite",
  country: "Italy",
  city: "Milan",
  setting: "Luxury hotel suite with silk curtains and designer furniture",
  environment: "Indoor",
  timeOfDayOptions: ["Morning", "Evening", "Night"],
  lightOptions: ["Window light", "Warm lamp light"],
},

// GYM
{
  id: "us_la_private_gym",
  country: "USA",
  city: "Los Angeles",
  setting: "Private high-end gym with mirrors and soft directional lighting",
  environment: "Indoor",
  timeOfDayOptions: ["Morning", "Afternoon"],
  lightOptions: ["Bright gym light", "Directional shadow light"],
},
];

// ✅ ONE-POSE SYSTEM (Category -> Variant)
const POSE_CATEGORIES = [
  {
    id: "standing",
    name: "Standing (Editorial)",
    allowedEnvironments: ["Indoor", "Outdoor"],
    variants: [
      {
        id: "stand_glutes_left_editorial",
        name: "Glutes angle LEFT (editorial)",
        text:
          "Standing with her back angled left, weight sunk into one hip, glutes pushed back subtly; waist twisted for an hourglass shape, chest open, eyes locked on camera with a teasing half-smile",
      },
      {
        id: "stand_glutes_right_editorial",
        name: "Glutes angle RIGHT (editorial)",
        text:
          "Standing with her back angled right, hips tilted and glutes emphasized; shoulders turned toward the camera, neck long, calm seductive eye contact like she knows she’s being watched",
      },
      {
        id: "stand_back_over_shoulder_soft",
        name: "Back to camera + look back (soft tease)",
        text:
          "Standing with her back fully toward the camera, looking over her shoulder; lower back gently arched to accent glutes and waist, expression soft and playful like a private invitation",
      },
      {
        id: "stand_back_over_shoulder_dominant",
        name: "Back to camera + look back (dominant)",
        text:
          "Standing with her back toward the camera, looking over her shoulder with calm dominance; hips slightly pushed back, glutes emphasized, chin slightly down for a powerful, controlled presence",
      },
      {
        id: "stand_front_seductive",
        name: "Front-facing (seductive)",
        text:
          "Standing facing the camera, legs set with confident balance; waist tight, shoulders relaxed back, chest open; expression slow and seductive with steady eye contact",
      },
      {
        id: "stand_wall_lean",
        name: "Lean on wall (city editorial)",
        text:
          "Standing leaning against a wall, one knee relaxed; body angled to highlight waist and hips; one hand lightly on her thigh, eyes drifting back to the camera with a subtle smile",
      },
      {
        id: "stand_window_lean",
        name: "Lean by window (soft luxury)",
        text:
          "Standing near a window with soft light on her skin; hips angled, waist twisted slightly; one hand resting at her waist, calm intimate expression like a quiet moment in a luxury room",
      },
      {
        id: "stand_shoulder_turn",
        name: "Shoulder turn (high-class tease)",
        text:
          "Standing tall, turning her torso slowly as if she just noticed you; shoulders back, hips angled; a soft smile appears for a second before returning to confident eye contact",
      },
      {
        id: "stand_hand_on_waist",
        name: "Hand on waist (hourglass show)",
        text:
          "Standing with one hand resting at her waist, the other relaxed; hips tilted, glutes subtly pushed back; posture designed to frame her waist and curves in a clean editorial way",
      },
      {
        id: "stand_crossed_legs",
        name: "Crossed legs (elegant + sexy)",
        text:
          "Standing with legs crossed at the ankles, hips angled; shoulders relaxed back, chin slightly down; expression elegant and flirtatious like a high-fashion street shot",
      },
    ],
  },

  {
    id: "walking",
    name: "Walking (Editorial)",
    allowedEnvironments: ["Outdoor"],
    variants: [
      {
        id: "walk_lookback_editorial",
        name: "Mid-walk look back (teasing)",
        text:
          "Walking slowly mid-step, looking back over her shoulder; hips moving naturally, glutes subtly emphasized; playful smile like she’s leading you somewhere",
      },
      {
        id: "walk_confident_forward",
        name: "Walk forward (dominant runway)",
        text:
          "Walking forward with runway confidence, posture tall and controlled; shoulders relaxed back, waist tight; brief eye contact mid-step that feels bold and intentional",
      },
      {
        id: "walk_side_profile",
        name: "Side profile walk (cinematic)",
        text:
          "Walking in side profile, torso tall, hips leading; hair moving slightly; she glances toward the camera with a soft smile like a cinematic street moment",
      },
      {
        id: "walk_pause_turn",
        name: "Pause + turn (attention hook)",
        text:
          "Walking, then pausing and turning her torso back toward the camera; one hip popped, glutes subtly emphasized; expression teasing, like she knows you’re watching",
      },
    ],
  },

  {
    id: "sitting",
    name: "Sitting (Editorial)",
    allowedEnvironments: ["Indoor", "Outdoor"],
    variants: [
      {
        id: "sit_crossed_elegant",
        name: "Legs crossed (elegant)",
        text:
          "Sitting with legs crossed slowly, spine tall; shoulders relaxed back, hips angled to highlight curves; calm eye contact with a soft, high-class smile",
      },
      {
        id: "sit_edge_bed_tease",
        name: "Edge of bed (luxury tease)",
        text:
          "Sitting on the edge of the bed, posture upright but relaxed; hips angled, torso leaning slightly forward; expression intimate and teasing like a private luxury moment",
      },
      {
        id: "sit_lounge_chair_pool",
        name: "Lounge chair (beach/pool siren)",
        text:
          "Sitting on a lounge chair, one leg extended, hips angled; shoulders back, neck long; playful smile, confident presence like a luxury resort editorial",
      },
      {
        id: "sit_knees_together_waist_twist",
        name: "Knees together + waist twist (hourglass)",
        text:
          "Sitting with knees together and hips angled; waist twisted slightly to frame her curves; shoulders relaxed, expression soft and seductive with controlled eye contact",
      },
      {
        id: "sit_one_knee_up",
        name: "One knee up (confident tease)",
        text:
          "Sitting with one knee raised, torso slightly turned; waist tight, hips emphasized; expression confident, lips slightly parted, eye contact slow and magnetic",
      },
    ],
  },

  {
    id: "laying",
    name: "Laying (Editorial)",
    allowedEnvironments: ["Indoor", "Outdoor"],
    variants: [
      {
        id: "lay_side_curve",
        name: "On side (curves emphasized)",
        text:
          "Laying on her side with the top knee bent; waist curved, hips pushed back; soft eye contact and a slow, seductive expression like a luxury editorial",
      },
      {
        id: "lay_back_knee_raised",
        name: "On back (knee raised, calm tease)",
        text:
          "Laying on her back with one knee raised; lower back gently arched; calm controlled expression, eyes meeting the camera like a quiet invitation",
      },
      {
        id: "lay_towel_beach",
        name: "Beach towel (sun-kissed)",
        text:
          "Laying on a beach towel, torso slightly twisted; one arm above her head; hips angled to highlight curves, expression playful and sun-kissed",
      },
      {
        id: "lay_stomach_over_shoulder",
        name: "On stomach + look over shoulder (glutes focus)",
        text:
          "Laying on her stomach, legs extended; hips subtly lifted to emphasize glutes; she looks over her shoulder with teasing eyes and a soft smile",
      },
      {
        id: "lay_sofa_luxury",
        name: "On sofa (high-class lounge)",
        text:
          "Laying on a luxury sofa, one knee bent; waist curved, shoulders relaxed; expression slow and seductive, like a high-end lifestyle shoot",
      },
    ],
  },

  {
    id: "mirror",
    name: "Mirror (Editorial)",
    allowedEnvironments: ["Indoor"],
    variants: [
      {
        id: "mirror_side_twist",
        name: "Mirror side twist (soft luxury)",
        text:
          "Standing near a mirror with a slight hip twist; one hand brushing hair back; eyes meet the camera through the reflection with a calm, intimate smile",
      },
      {
        id: "mirror_back_over_shoulder",
        name: "Mirror back look (glutes emphasis)",
        text:
          "Back angled toward the mirror, looking over her shoulder; glutes emphasized with a subtle arch; expression teasing like she’s letting you in on a secret",
      },
      {
        id: "mirror_adjust_outfit_safe",
        name: "Mirror adjust (safe tease)",
        text:
          "Standing by the mirror, lightly adjusting a strap or the edge of a robe (non-explicit); posture controlled, waist tight, expression confident and playful",
      },
    ],
  },
];

// ===== SCENE SYSTEM (so clothing filters correctly) =====
const SCENES = [
  { id: "street", name: "Street / City" },
  { id: "beach", name: "Beach" },
  { id: "pool", name: "Pool / Resort" },
  { id: "club", name: "Nightclub / VIP" },
  { id: "restaurant", name: "Bar / Restaurant" },
  { id: "hotel", name: "Hotel / Bedroom" },
  { id: "shower", name: "Bathroom / Shower (safe)" },
  { id: "gym", name: "Gym" },
];

function guessScene(place) {
  const s = `${place?.setting ?? ""}`.toLowerCase();
  if (s.includes("beach") || s.includes("ocean") || s.includes("shore")) return "beach";
  if (s.includes("pool") || s.includes("infinity") || s.includes("resort")) return "pool";
  if (s.includes("nightclub") || s.includes("vip") || s.includes("neon") || s.includes("club")) return "club";
  if (s.includes("restaurant") || s.includes("bar") || s.includes("dinner") || s.includes("cocktail")) return "restaurant";
  if (s.includes("hotel") || s.includes("suite") || s.includes("bedroom") || s.includes("penthouse")) return "hotel";
  if (s.includes("shower") || s.includes("bathroom") || s.includes("marble")) return "shower";
  if (s.includes("gym") || s.includes("mirrors") || s.includes("weights")) return "gym";
  return "street";
}

// ===== CLOTHING LIBRARY V2 (SEXY, TINY, SAFE, SERIES-READY) =====
// Safe means: non-explicit, no nudity, no sex acts, no visible nipples/genitals.
const CLOTHING_LIBRARY = [
  // --- BEACH / POOL: micro bikinis + cover-ups (series) ---
  {
    id: "bikini_micro_black_01",
    name: "Micro string bikini (black)",
    outfitType: "Micro Bikini",
    seriesTag: "micro_bikini_black_01",
    environments: ["Outdoor"],
    scenes: ["beach", "pool"],
    timeTags: ["Morning", "Late afternoon", "Golden hour"],
    revealLevel: "high",
    safe: true,
    top: "Micro triangle string bikini top, minimal straps, flattering cleavage (non-explicit)",
    bottom: "High-cut thong bikini bottoms, hips and glutes emphasized (non-explicit)",
    footwear: "Barefoot or minimal sandals",
    accessories: "Sunglasses, gold body chain, beach tote",
    fitNotes: "Minimal, luxe, made-for-camera fit; confident and tasteful",
    layers: ["none"],
  },
  {
    id: "bikini_micro_white_01",
    name: "Micro string bikini (white)",
    outfitType: "Micro Bikini",
    seriesTag: "micro_bikini_white_01",
    environments: ["Outdoor"],
    scenes: ["beach", "pool"],
    timeTags: ["Morning", "Golden hour"],
    revealLevel: "high",
    safe: true,
    top: "Micro white triangle bikini top, clean straps, sculpted bust line (non-explicit)",
    bottom: "High-cut thong bikini bottoms, waist and glutes framed (non-explicit)",
    footwear: "Barefoot",
    accessories: "Gold hoops, anklet, sunglasses",
    fitNotes: "Bright luxury beach look; minimal but safe",
    layers: ["none"],
  },
  {
    id: "coverup_sheer_sarong_01",
    name: "Sheer sarong cover-up (open)",
    outfitType: "Sheer Cover-up",
    seriesTag: "coverup_sheer_01",
    environments: ["Outdoor"],
    scenes: ["beach", "pool"],
    timeTags: ["Late afternoon", "Golden hour"],
    revealLevel: "medium",
    safe: true,
    top: "Matching bikini top underneath (non-explicit)",
    bottom: "Sheer sarong tied low on hips, open slit to show legs and hips",
    footwear: "Barefoot or sandals",
    accessories: "Gold body chain, sunglasses",
    fitNotes: "See-through tease, still tasteful and non-explicit",
    layers: ["coverup_on", "coverup_off"],
  },

  // --- CLUB / VIP: tight mini dresses, cut-outs, latex vibe (safe) ---
  {
    id: "club_cutout_black_01",
    name: "Black cut-out mini dress (VIP)",
    outfitType: "Club Mini Dress",
    seriesTag: "club_vip_black_01",
    environments: ["Indoor", "Outdoor"],
    scenes: ["club"],
    timeTags: ["Night"],
    revealLevel: "high",
    safe: true,
    top: "Skin-tight black mini dress with tasteful cut-outs (non-explicit), deep neckline",
    bottom: "Mid-thigh hemline, ultra fitted hips and glutes",
    footwear: "Black stilettos",
    accessories: "Small designer bag, diamond studs, glossy lips",
    fitNotes: "VIP energy, body-hugging, provocative but safe",
    layers: ["none"],
  },
  {
    id: "club_latex_mini_01",
    name: "Latex-look mini dress (safe)",
    outfitType: "Latex Mini Dress",
    seriesTag: "latex_mini_01",
    environments: ["Indoor"],
    scenes: ["club"],
    timeTags: ["Night"],
    revealLevel: "high",
    safe: true,
    top: "Latex-look mini dress, deep neckline (non-explicit), glossy fitted bust",
    bottom: "Tight mini hemline emphasizing hips and glutes",
    footwear: "Stilettos",
    accessories: "Statement earrings, sleek clutch",
    fitNotes: "Bold, glossy, dominant vibe; non-explicit",
    layers: ["none"],
  },

  // --- RESTAURANT / BAR: elegant but sexy (tight tailoring) ---
  {
    id: "date_satin_emerald_01",
    name: "Emerald satin date dress (slit)",
    outfitType: "Date Dress",
    seriesTag: "date_emerald_01",
    environments: ["Indoor", "Outdoor"],
    scenes: ["restaurant"],
    timeTags: ["Golden hour", "Evening", "Night"],
    revealLevel: "medium",
    safe: true,
    top: "Emerald satin dress with thin straps and deep neckline (non-explicit)",
    bottom: "Mid-thigh hemline with a tasteful slit, hips hugged",
    footwear: "Strappy heels",
    accessories: "Gold bracelet, delicate necklace",
    fitNotes: "High-class seduction; elegant and camera-ready",
    layers: ["none"],
  },
  {
    id: "tailored_blazer_dress_charcoal_01",
    name: "Charcoal blazer dress (power sexy)",
    outfitType: "Blazer Dress",
    seriesTag: "power_blazer_01",
    environments: ["Indoor", "Outdoor"],
    scenes: ["restaurant", "street"],
    timeTags: ["Late afternoon", "Evening", "Night"],
    revealLevel: "medium",
    safe: true,
    top: "Tailored blazer dress, deep V neckline (non-explicit), cinched waist",
    bottom: "Mid-thigh hemline, fitted hips",
    footwear: "Pointed-toe stilettos",
    accessories: "Luxury watch, sleek clutch",
    fitNotes: "CEO energy; sharp tailoring + sexy silhouette",
    layers: ["none"],
  },

  // --- STREET / CITY: tight jeans, mini skirts, bodysuits (series) ---
  {
    id: "street_bodysuit_jeans_01",
    name: "Bodysuit + tight jeans (curve show)",
    outfitType: "Bodysuit + Jeans",
    seriesTag: "street_curve_01",
    environments: ["Outdoor"],
    scenes: ["street"],
    timeTags: ["Morning", "Late afternoon", "Golden hour"],
    revealLevel: "medium",
    safe: true,
    top: "Tight ribbed bodysuit with a deep neckline (non-explicit), sculpted waist fit",
    bottom: "High-waisted skinny jeans, tight fit emphasizing hips and glutes",
    footwear: "Heels or clean sneakers (choose per vibe)",
    accessories: "Sunglasses, small handbag",
    fitNotes: "Everyday influencer look: sexy, wearable, high conversion",
    layers: ["jacket_on", "jacket_off"],
  },
  {
    id: "street_mini_skirt_01",
    name: "Corset + mini skirt (luxury street)",
    outfitType: "Corset + Mini Skirt",
    seriesTag: "corset_mini_01",
    environments: ["Outdoor"],
    scenes: ["street"],
    timeTags: ["Late afternoon", "Golden hour", "Night"],
    revealLevel: "high",
    safe: true,
    top: "Corset-style top, fitted bust, deep neckline (non-explicit), waist-snatching",
    bottom: "High-waisted mini skirt hugging hips and glutes",
    footwear: "Strappy heels",
    accessories: "Gold hoops, delicate necklace",
    fitNotes: "Street siren editorial; provocative but safe",
    layers: ["jacket_on", "jacket_off"],
  },

  // --- HOTEL / BEDROOM: lingerie (tiny, thong) + robe layers (SAFE) ---
  {
    id: "lingerie_tiny_black_01",
    name: "Tiny lingerie set (black, thong)",
    outfitType: "Tiny Lingerie",
    seriesTag: "lingerie_tiny_black_01",
    environments: ["Indoor"],
    scenes: ["hotel"],
    timeTags: ["Evening", "Night"],
    revealLevel: "high",
    safe: true,
    top: "Tiny black lingerie top with supportive shape (non-explicit), fabric coverage maintained",
    bottom: "Thong lingerie bottoms, high-cut hips, glutes emphasized (non-explicit)",
    footwear: "Barefoot",
    accessories: "Small earrings, soft glam makeup",
    fitNotes: "Minimal lingerie, extremely seductive, still non-explicit",
    layers: ["robe_on", "robe_off"],
  },
  {
    id: "lingerie_mesh_red_01",
    name: "Mesh lingerie set (red, safe)",
    outfitType: "Mesh Lingerie",
    seriesTag: "lingerie_mesh_red_01",
    environments: ["Indoor"],
    scenes: ["hotel"],
    timeTags: ["Evening", "Night"],
    revealLevel: "high",
    safe: true,
    top: "Red mesh lingerie top (non-explicit), tasteful coverage with luxury texture",
    bottom: "Matching mesh thong bottoms (non-explicit), hips framed",
    footwear: "Barefoot",
    accessories: "Red lip gloss, minimal jewelry",
    fitNotes: "See-through tease vibe but kept safe/non-explicit",
    layers: ["robe_on", "robe_off"],
  },
  {
    id: "robe_satin_cream_01",
    name: "Satin robe (open, layered)",
    outfitType: "Satin Robe",
    seriesTag: "robe_satin_cream_01",
    environments: ["Indoor"],
    scenes: ["hotel"],
    timeTags: ["Morning", "Evening", "Night"],
    revealLevel: "medium",
    safe: true,
    top: "Satin robe worn open slightly (non-explicit), elegant neckline",
    bottom: "Matching lingerie underneath (non-explicit), silhouette visible through robe opening",
    footwear: "Barefoot",
    accessories: "Messy bun or soft waves, minimal jewelry",
    fitNotes: "Luxury tease layer; perfect for series content",
    layers: ["robe_on", "robe_more_open"],
  },

  // --- BATHROOM / SHOWER: safe tease (no nudity) ---
  {
    id: "shower_sheer_robe_01",
    name: "Sheer robe in bathroom (safe tease)",
    outfitType: "Sheer Robe",
    seriesTag: "bathroom_sheer_01",
    environments: ["Indoor"],
    scenes: ["shower"],
    timeTags: ["Evening", "Night"],
    revealLevel: "high",
    safe: true,
    top: "Sheer robe (non-explicit), coverage maintained; damp hair styling vibe",
    bottom: "Thong lingerie underneath (non-explicit), silhouette teased safely",
    footwear: "Barefoot",
    accessories: "Steam glow, minimal jewelry",
    fitNotes: "Bathroom tease without nudity; safe, high-converting",
    layers: ["robe_on", "robe_off_safe"],
  },

  // --- GYM: tight sets + glute focus ---
  {
    id: "gym_scrunch_black_01",
    name: "Scrunch leggings + sports bra (black)",
    outfitType: "Gym Set",
    seriesTag: "gym_black_01",
    environments: ["Indoor"],
    scenes: ["gym"],
    timeTags: ["Morning", "Afternoon"],
    revealLevel: "medium",
    safe: true,
    top: "High-support sports bra with flattering neckline (non-explicit), tight performance fit",
    bottom: "Scrunch leggings emphasizing glutes, high-waisted tight waistband",
    footwear: "Training shoes",
    accessories: "Fitness watch, sleek ponytail",
    fitNotes: "Gym influencer classic; glute emphasis; safe & strong",
    layers: ["hoodie_on", "hoodie_off"],
  },
  {
    id: "gym_micro_shorts_01",
    name: "Micro shorts + cropped top (pump day)",
    outfitType: "Gym Micro Shorts",
    seriesTag: "gym_micro_01",
    environments: ["Indoor"],
    scenes: ["gym"],
    timeTags: ["Morning", "Afternoon"],
    revealLevel: "high",
    safe: true,
    top: "Cropped top with fitted bust line (non-explicit), tight athletic material",
    bottom: "Micro gym shorts, high-waisted, tight fit emphasizing glutes (non-explicit)",
    footwear: "Training shoes",
    accessories: "Gym bag, headphones",
    fitNotes: "Very sexy gym look, still non-explicit",
    layers: ["jacket_on", "jacket_off"],
  },
];

const MOODS = [
  {
    id: "mood_playful_sun",
    name: "Playful + Radiant",
    text:
      "Playful, radiant, approachable energy; genuine smile with bright eyes; light teasing warmth that feels real and magnetic",
  },
  {
    id: "mood_soft_girlfriend",
    name: "Soft Girlfriend Energy",
    text:
      "Soft, intimate, girlfriend energy; gentle smile, relaxed eyes; calm warmth that feels personal, safe, and addictive",
  },
  {
    id: "mood_confident_flirt",
    name: "Confident + Flirtatious",
    text:
      "Confident, flirtatious, relaxed luxury; subtle smile in some moments, seductive eye contact in others; playful without losing dominance",
  },
  {
    id: "mood_seductive_slow",
    name: "Seductive + Slow",
    text:
      "Seductive, slow, intimate energy; lips slightly parted; heavy eye contact; calm controlled expression that invites attention",
  },
  {
    id: "mood_dominant_ceo",
    name: "Dominant Luxury (CEO)",
    text:
      "Dominant, high-class, unbothered; controlled expression; confident gaze like she owns the room; quiet power with expensive energy",
  },
  {
    id: "mood_cold_luxury",
    name: "Cold Luxury (High Fashion)",
    text:
      "High-fashion cold luxury; minimal expression, intense eyes; elegant distance that makes people want more; editorial and expensive",
  },
  {
    id: "mood_club_vip",
    name: "Club VIP (Tease)",
    text:
      "Nightclub VIP tease; confident smirk, slow eye contact; playful dominance; energy feels exclusive like a private table",
  },
  {
    id: "mood_beach_siren",
    name: "Beach Siren",
    text:
      "Beach siren confidence; sun-kissed smile, relaxed sensual calm; playful teasing energy that feels effortless and irresistible",
  },
  {
    id: "mood_intimate_morning",
    name: "Intimate Morning (Soft Tease)",
    text:
      "Intimate morning softness; sleepy eyes, gentle smile; calm, subtle tease like a private moment in a luxury room",
  },
  {
    id: "mood_mysterious",
    name: "Mysterious + Tempting",
    text:
      "Mysterious, tempting, slow energy; soft half-smile; eyes that hold attention; expression hints at secrets without giving them away",
  },
];

function buildPrompt({ place, timeOfDay, light, poseVariant, mood, outfit }) {
  return `Place:
Country: ${place.country}
City / Area: ${place.city}
Exact setting: ${place.setting}
Indoor or Outdoor: ${place.environment}
Time of day: ${timeOfDay}
Lighting: ${light}

POSE: ${poseVariant.text}

Mood:
${mood.text}

Clothing:
Top: ${outfit?.top}
Bottom: ${outfit?.bottom}
Footwear: ${outfit?.footwear}
Accessories: ${outfit?.accessories}
Fit notes: ${outfit?.fitNotes}
Series tag: ${outfit?.seriesTag ?? "none"}`;
}

export default function PoseV2Page() {
  const [placeId, setPlaceId] = useState(PLACES[0]?.id ?? "");
  const place = useMemo(() => PLACES.find((p) => p.id === placeId) ?? PLACES[0], [placeId]);

  const [timeOfDay, setTimeOfDay] = useState(place?.timeOfDayOptions?.[0] ?? "");
  const [light, setLight] = useState(place?.lightOptions?.[0] ?? "");

  const [moodId, setMoodId] = useState(MOODS[0].id);
const mood = useMemo(() => MOODS.find((m) => m.id === moodId) ?? MOODS[0], [moodId]);


  // Filter categories by environment
  const poseCategoryOptions = useMemo(() => {
    const env = place?.environment ?? "Outdoor";
    return POSE_CATEGORIES.filter((c) => c.allowedEnvironments.includes(env));
  }, [place]);

  const [poseCategoryId, setPoseCategoryId] = useState(poseCategoryOptions[0]?.id ?? "standing");
  const poseCategory = useMemo(
    () => poseCategoryOptions.find((c) => c.id === poseCategoryId) ?? poseCategoryOptions[0],
    [poseCategoryOptions, poseCategoryId]
  );
  
const [poseVariantId, setPoseVariantId] = useState("");
  const poseVariant = useMemo(() => {
    return (
      poseCategory?.variants?.find((v) => v.id === poseVariantId) ??
      poseCategory?.variants?.[0] ??
      null
    );
  }, [poseCategory, poseVariantId]);

  useEffect(() => {
  setSceneId(guessScene(place));
}, [placeId]); // eslint-disable-line

const outfitOptions = useMemo(() => {
  const env = place?.environment ?? "Outdoor";
  const t = timeOfDay;
  return CLOTHING_LIBRARY.filter(
    (o) =>
      o.safe === true &&
      o.environments.includes(env) &&
      o.scenes.includes(sceneId) &&
      (o.timeTags?.includes(t) ?? true)
  );
}, [place, timeOfDay, sceneId]);

const outfit = useMemo(() => {
  return outfitOptions.find((o) => o.id === outfitId) ?? outfitOptions[0] ?? null;
}, [outfitOptions, outfitId]);

useEffect(() => {
  // auto-select first valid outfit when scene/place/time changes
  if (outfitOptions.length) setOutfitId(outfitOptions[0].id);
}, [sceneId, placeId, timeOfDay]); // eslint-disable-line

  const [output, setOutput] = useState("");

  // When place changes, reset time/light
  useEffect(() => {
    setTimeOfDay(place?.timeOfDayOptions?.[0] ?? "");
    setLight(place?.lightOptions?.[0] ?? "");
  }, [placeId]); // eslint-disable-line

  // When pose category options change (due to environment), force a valid category + variant
  useEffect(() => {
    const firstCat = poseCategoryOptions[0];
    if (!firstCat) return;

    // If current category not valid, switch to first valid
    const stillValid = poseCategoryOptions.some((c) => c.id === poseCategoryId);
    const nextCatId = stillValid ? poseCategoryId : firstCat.id;

    setPoseCategoryId(nextCatId);

    const cat = poseCategoryOptions.find((c) => c.id === nextCatId) ?? firstCat;
    setPoseVariantId(cat.variants[0]?.id ?? "");
  }, [poseCategoryOptions]); // eslint-disable-line

  function generate() {
    if (!place || !poseCategory || !poseVariant) return;
    setOutput(buildPrompt({ place, timeOfDay, light, poseVariant, mood, outfit }));
  }

  function copy() {
    navigator.clipboard.writeText(output || "");
  }

  return (
    <main style={S.main}>
      <div style={S.topBar}>
        <div>
          <div style={S.badge}>POSE V2 (SAFE BUILD)</div>
          <h1 style={S.h1}>Single Pose Prompt Builder</h1>
          <p style={S.sub}>
            This page generates prompts with <b>ONE pose only</b> so image apps don’t break.
          </p>
        </div>
        <div style={S.actions}>
          <button style={S.primary} onClick={generate}>Generate</button>
          <button style={S.btn} onClick={copy}>Copy</button>
        </div>
      </div>

      <div style={S.grid}>
        <section style={S.card}>
          <h2 style={S.h2}>1) Place</h2>

          <label style={S.label}>Location</label>
          <select style={S.select} value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
            {PLACES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.country} — {p.city} — {p.environment}
              </option>
            ))}
          </select>

          <label style={S.label}>Time of day</label>
          <select style={S.select} value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
            {(place?.timeOfDayOptions ?? []).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label style={S.label}>Lighting</label>
          <select style={S.select} value={light} onChange={(e) => setLight(e.target.value)}>
            {(place?.lightOptions ?? []).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <section style={S.card}>
  <h2 style={S.h2}>3) Mood (ONE only)</h2>

  <label style={S.label}>Mood preset</label>
  <select style={S.select} value={moodId} onChange={(e) => setMoodId(e.target.value)}>
    {MOODS.map((m) => (
      <option key={m.id} value={m.id}>{m.name}</option>
    ))}
  </select>

  <div style={S.preview}>
    <div style={{ fontWeight: 900, marginBottom: 6 }}>Selected mood</div>
    <div>{mood.text}</div>
  </div>
</section>

<section style={S.card}>
  <h2 style={S.h2}>4) Clothing (Sexy + Safe)</h2>

  <label style={S.label}>Scene</label>
  <select style={S.select} value={sceneId} onChange={(e) => setSceneId(e.target.value)}>
    {SCENES.map((s) => (
      <option key={s.id} value={s.id}>{s.name}</option>
    ))}
  </select>

  <label style={S.label}>Outfit</label>
  <select style={S.select} value={outfitId} onChange={(e) => setOutfitId(e.target.value)}>
    {outfitOptions.map((o) => (
      <option key={o.id} value={o.id}>
        {o.name} — {o.revealLevel}
      </option>
    ))}
  </select>

  <div style={S.preview}>
    <div style={{ fontWeight: 900, marginBottom: 6 }}>
      Selected outfit {outfit?.seriesTag ? `(Series: ${outfit.seriesTag})` : ""}
    </div>
    <div><b>Top:</b> {outfit?.top}</div>
    <div><b>Bottom:</b> {outfit?.bottom}</div>
    <div><b>Footwear:</b> {outfit?.footwear}</div>
    <div><b>Accessories:</b> {outfit?.accessories}</div>
    <div style={{ opacity: 0.85, marginTop: 6 }}>{outfit?.fitNotes}</div>
  </div>

  {!outfitOptions.length && (
    <div style={S.note}>
      No outfits match this Scene + Environment + Time of day. Change Scene or Time.
    </div>
  )}
</section>

          <div style={S.note}>
            Environment filter active: <b>{place?.environment}</b>
          </div>
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>2) Pose (ONE only)</h2>

          <label style={S.label}>Pose category</label>
          <select style={S.select} value={poseCategoryId} onChange={(e) => setPoseCategoryId(e.target.value)}>
            {poseCategoryOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <label style={S.label}>Pose variant</label>
          <select style={S.select} value={poseVariantId} onChange={(e) => setPoseVariantId(e.target.value)}>
            {(poseCategory?.variants ?? []).map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          <div style={S.preview}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Selected instruction</div>
            <div>{poseVariant?.text}</div>
          </div>
        </section>
      </div>

      <section style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <h2 style={S.h2}>Output</h2>
          <button style={S.btn} onClick={copy}>Copy</button>
        </div>
        <textarea
          style={S.textarea}
          value={output}
          readOnly
          placeholder="Click Generate…"
        />
      </section>

      <div style={S.footer}>
        Open this page at: <b>http://localhost:3000/pose-v2</b>
      </div>
    </main>
  );
}

const S = {
  main: {
    minHeight: "100vh",
    padding: 18,
    background: "#0b0f14",
    color: "white",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#151c24",
    border: "1px solid #263241",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.3,
  },
  h1: { margin: "8px 0 0", fontSize: 24, fontWeight: 950 },
  sub: { margin: "6px 0 0", opacity: 0.85, maxWidth: 650, lineHeight: 1.35 },
  actions: { display: "flex", gap: 10 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 14,
    marginBottom: 14,
  },
  card: {
    background: "#0f1620",
    border: "1px solid #223042",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
  },
  h2: { margin: "0 0 10px", fontSize: 16, fontWeight: 900 },
  label: { display: "block", fontSize: 12, opacity: 0.85, margin: "10px 0 6px" },
  select: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    border: "1px solid #2b3b4f",
    background: "#0b0f14",
    color: "white",
    outline: "none",
  },
  preview: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    background: "#0b0f14",
    border: "1px solid #2b3b4f",
    lineHeight: 1.4,
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    opacity: 0.85,
    padding: 10,
    borderRadius: 12,
    background: "#0b0f14",
    border: "1px solid #2b3b4f",
  },
  textarea: {
    width: "100%",
    minHeight: 220,
    borderRadius: 12,
    border: "1px solid #2b3b4f",
    background: "#0b0f14",
    color: "white",
    padding: 12,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 13,
    lineHeight: 1.45,
  },
  btn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #2b3b4f",
    background: "#0f1620",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
  primary: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #2b3b4f",
    background: "white",
    color: "black",
    cursor: "pointer",
    fontWeight: 950,
  },
  footer: { marginTop: 12, opacity: 0.85, fontSize: 12 },
};
