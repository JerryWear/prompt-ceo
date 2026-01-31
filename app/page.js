"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ceo_prompt_builder_v2";

// ====== REAL DEFAULT DATA (so app is never empty) ======
const DEFAULT_DATA = {
  places: [
    // ITALY
    {
      id: "it_rome_cafe_street",
      country: "Italy",
      city: "Rome",
      setting: "Old stone street outside a luxury café",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Late afternoon", "Golden hour", "Night"],
      lightOptions: ["Soft natural light", "Warm golden sunlight", "Neon city glow"],
    },
    {
      id: "it_milan_penthouse_windows",
      country: "Italy",
      city: "Milan",
      setting: "Luxury penthouse with floor-to-ceiling windows",
      environment: "Indoor",
      timeOfDayOptions: ["Morning", "Afternoon", "Evening", "Night"],
      lightOptions: ["Window light", "Soft warm lamp light", "Moody low light"],
    },
    {
      id: "it_positano_cliff_walk",
      country: "Italy",
      city: "Positano",
      setting: "Cliffside walkway with ocean view and pastel villas",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Late afternoon", "Golden hour"],
      lightOptions: ["Bright coastal light", "Warm sunset glow", "Soft shade light"],
    },

    // FRANCE
    {
      id: "fr_paris_balcony",
      country: "France",
      city: "Paris",
      setting: "Classic Paris balcony with wrought-iron railing and skyline view",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Golden hour", "Evening", "Night"],
      lightOptions: ["Soft morning light", "Warm sunset glow", "City night lights"],
    },
    {
      id: "fr_paris_hotel_bed",
      country: "France",
      city: "Paris",
      setting: "Luxury hotel room with crisp white sheets and soft curtains",
      environment: "Indoor",
      timeOfDayOptions: ["Morning", "Afternoon", "Evening", "Night"],
      lightOptions: ["Window light", "Soft lamp light", "Moody low light"],
    },

    // UAE (nightlife + pool)
    {
      id: "ae_dubai_rooftop_pool",
      country: "UAE",
      city: "Dubai",
      setting: "Rooftop infinity pool with skyline behind",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Late afternoon", "Golden hour", "Night"],
      lightOptions: ["Bright sun", "Warm golden sunlight", "Neon skyline glow"],
    },
    {
      id: "ae_dubai_nightclub_vip",
      country: "UAE",
      city: "Dubai",
      setting: "VIP lounge at a luxury nightclub, neon accents, velvet seating",
      environment: "Indoor",
      timeOfDayOptions: ["Night"],
      lightOptions: ["Neon club lighting", "Moody low light", "Flash + ambient"],
    },

    // BALI / MALDIVES (beach packs)
    {
      id: "id_bali_jungle_pool",
      country: "Indonesia",
      city: "Bali",
      setting: "Jungle villa pool with lush greenery and stone steps",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Late afternoon", "Golden hour", "Night"],
      lightOptions: ["Soft morning light", "Warm golden sunlight", "Lantern glow"],
    },
    {
      id: "mv_maldives_overwater_deck",
      country: "Maldives",
      city: "Overwater Villa",
      setting: "Overwater villa deck above turquoise ocean, glassy calm water",
      environment: "Outdoor",
      timeOfDayOptions: ["Morning", "Golden hour", "Night"],
      lightOptions: ["Bright ocean light", "Warm sunset glow", "Moonlit ocean"],
    },

    // NYC
    {
      id: "us_nyc_rooftop",
      country: "USA",
      city: "New York",
      setting: "Rooftop with skyline and soft bokeh lights",
      environment: "Outdoor",
      timeOfDayOptions: ["Late afternoon", "Golden hour", "Night"],
      lightOptions: ["Warm sunset glow", "City night lights", "Flash + ambient"],
    },
    {
      id: "us_nyc_loft_mirror",
      country: "USA",
      city: "New York",
      setting: "Modern loft with large windows and a mirror corner, minimalist vibe",
      environment: "Indoor",
      timeOfDayOptions: ["Morning", "Afternoon", "Evening", "Night"],
      lightOptions: ["Window light", "Soft warm lamp light", "Moody low light"],
    },

    // Bars & restaurants (important)
    {
      id: "es_ibiza_beach_club",
      country: "Spain",
      city: "Ibiza",
      setting: "Beach club terrace with ocean view, cocktails, modern white décor",
      environment: "Outdoor",
      timeOfDayOptions: ["Late afternoon", "Golden hour", "Night"],
      lightOptions: ["Warm sunset glow", "Soft shade", "Night ambient + candles"],
    },
    {
      id: "gr_mykonos_restaurant",
      country: "Greece",
      city: "Mykonos",
      setting: "Luxury seaside restaurant, whitewashed walls, candlelit tables",
      environment: "Outdoor",
      timeOfDayOptions: ["Golden hour", "Evening", "Night"],
      lightOptions: ["Warm sunset glow", "Candlelit warmth", "Soft night ambience"],
    },
  ],

  posePacks: [
    {
      id: "pose_outdoor_influencer",
      name: "Outdoor Influencer (Standing + Walking + Wall)",
      tags: ["outdoor"],
      poses: [
        "Standing: one hip popped, torso slightly twisted to highlight waist and glutes",
        "Walking: mid-step, looking back over shoulder with confident eye contact",
        "Standing: leaning against a wall/building, one knee relaxed, body angled",
      ],
    },
    {
      id: "pose_indoor_luxury",
      name: "Indoor Luxury (Sitting + Laying + Mirror)",
      tags: ["indoor"],
      poses: [
        "Sitting: upright elegant posture, legs crossed slowly, shoulders relaxed back",
        "Laying: on bed/sofa, one knee bent, body angled to highlight curves",
        "Standing: near mirror, subtle hip twist, one hand adjusting hair/strap",
      ],
    },
    {
      id: "pose_beach_siren",
      name: "Beach & Pool (Walking + Lounge + Towel)",
      tags: ["outdoor"],
      poses: [
        "Walking: slow confident beach walk, playful smile, looking back over shoulder",
        "Sitting: on lounger, spine tall, one leg extended, hips angled to show curves",
        "Laying: on towel, one knee bent, torso slightly twisted, relaxed but intentional",
      ],
    },
    {
      id: "pose_nightlife_vip",
      name: "Nightlife VIP (Entrance + Bar + Booth)",
      tags: ["indoor"],
      poses: [
        "Standing: at club entrance rope, confident stance, subtle hip angle, eye contact",
        "Sitting: in VIP booth, elegant posture, legs crossed slowly, relaxed dominance",
        "Standing: at bar, turning slightly to camera, one hand on glass, playful smirk",
      ],
    },
  ],

  posturePresets: [
    {
      id: "posture_hourglass",
      name: "Hourglass Showcase",
      text:
        "Arched lower back to emphasize rounded glutes, chest open with shoulders gently back, waist slightly twisted for an hourglass silhouette, neck elongated, chin slightly down for seductive presence",
    },
    {
      id: "posture_confident",
      name: "Confident Power",
      text:
        "Tall posture, chest open, shoulders back and relaxed, hips angled to highlight glutes, core braced for a tight waist, calm controlled body language",
    },
    {
      id: "posture_soft_feminine",
      name: "Soft Feminine",
      text:
        "Relaxed shoulders, elegant neckline, gentle hip shift to accent curves, soft hands and controlled movement; inviting posture while staying confident",
    },
  ],

  // ===== CLOTHING LIBRARY (AUTO + MANUAL + SERIES) =====
  clothingLibrary: [
    // OUTDOOR CITY / DATE / NIGHT
    {
      id: "outfit_corset_leather",
      name: "Silk corset + leather mini",
      outfitType: "Corset + Mini Skirt",
      seriesTag: "night_city_power_01",
      environment: "Outdoor",
      timeOfDayTags: ["Late afternoon", "Golden hour", "Evening", "Night"],
      colors: ["White", "Black", "Gold"],
      top: "White silk corset top with a deep neckline, sculpting bust, snug tailored fit",
      bottom: "High-waisted black leather mini skirt hugging hips and glutes",
      footwear: "Strappy black heels",
      accessories: "Gold hoop earrings, delicate necklace, small designer handbag",
      fabricFit: "Sculpted waist, glossy leather texture, luxury influencer styling",
    },
    {
      id: "outfit_blazer_dress",
      name: "Blazer dress (power sexy)",
      outfitType: "Blazer Dress",
      seriesTag: "night_city_power_01",
      environment: "Outdoor",
      timeOfDayTags: ["Late afternoon", "Evening", "Night"],
      colors: ["Charcoal", "Silver"],
      top: "Charcoal tailored blazer dress with a deep V neckline and cinched waist",
      bottom: "Hemline mid-thigh, fitted to emphasize hips and glutes",
      footwear: "Pointed-toe stilettos",
      accessories: "Silver watch, minimalist earrings, sleek clutch",
      fabricFit: "Sharp tailoring, waist-snatching silhouette, classy provocative power look",
    },
    {
      id: "outfit_summer_dress",
      name: "Summer dress (cinched waist)",
      outfitType: "Summer Dress",
      seriesTag: "day_city_soft_01",
      environment: "Outdoor",
      timeOfDayTags: ["Morning", "Late afternoon", "Golden hour"],
      colors: ["Cream", "Tan"],
      top: "Cream fitted summer dress with a deep neckline and cinched waist",
      bottom: "Soft fabric hugging hips, hemline above knee",
      footwear: "Minimalist sandals",
      accessories: "Small gold jewelry, sunglasses, mini handbag",
      fabricFit: "Soft feminine fit highlighting waist and curves",
    },

    // BEACH / POOL
    {
      id: "outfit_bikini_coverup",
      name: "Minimal bikini + sheer cover-up",
      outfitType: "Bikini + Cover-up",
      seriesTag: "beach_minimal_01",
      environment: "Outdoor",
      timeOfDayTags: ["Morning", "Late afternoon", "Golden hour"],
      colors: ["White", "Nude", "Gold"],
      top: "Minimal triangle bikini top with clean straps and flattering cleavage (non-explicit)",
      bottom: "High-cut bikini bottoms enhancing hips and glutes; sheer cover-up worn open",
      footwear: "Barefoot or sandals",
      accessories: "Gold body chain, sunglasses, beach tote",
      fabricFit: "Beach luxury: minimal, classy, confident; curves highlighted intentionally",
    },
    {
      id: "outfit_bikini_sporty",
      name: "Sporty micro bikini (safe)",
      outfitType: "Sporty Bikini",
      seriesTag: "beach_minimal_01",
      environment: "Outdoor",
      timeOfDayTags: ["Morning", "Late afternoon", "Golden hour"],
      colors: ["Black", "Gold"],
      top: "Sporty minimal bikini top, secure fit, cleavage flattering but safe",
      bottom: "High-cut bottoms, glute-enhancing fit (non-explicit)",
      footwear: "Barefoot",
      accessories: "Sleek sunglasses, thin gold anklet",
      fabricFit: "Minimal sporty luxury: clean lines, tight fit, camera-ready",
    },

    // INDOOR LUXURY / LINGERIE (SAFE, NON-EXPLICIT)
    {
      id: "outfit_satin_slip",
      name: "Satin slip dress (thigh slit)",
      outfitType: "Slip Dress",
      seriesTag: "indoor_glam_01",
      environment: "Indoor",
      timeOfDayTags: ["Evening", "Night"],
      colors: ["Emerald", "Gold"],
      top: "Emerald satin slip dress with thin straps and a deep neckline",
      bottom: "High thigh slit, glossy fabric draping over hips",
      footwear: "Barefoot or sleek heels",
      accessories: "Gold bracelet, soft glam makeup",
      fabricFit: "Satin highlights curves; waist, hips, and chest emphasized tastefully",
    },
    {
      id: "outfit_oversized_shirt",
      name: "Morning shirt (off-shoulder)",
      outfitType: "Oversized Shirt Look",
      seriesTag: "morning_soft_01",
      environment: "Indoor",
      timeOfDayTags: ["Morning", "Afternoon"],
      colors: ["Light blue", "White"],
      top: "Oversized crisp button-up shirt slipping off one shoulder, neckline teasing cleavage (safe)",
      bottom: "Bare legs with seamless nude shorts underneath (implied, non-explicit)",
      footwear: "Barefoot",
      accessories: "Messy bun or loose hair, minimal jewelry",
      fabricFit: "Casual intimate luxury, soft flirtatious vibe",
    },
    {
      id: "outfit_lingerie_robe",
      name: "Lingerie + silk robe (classy tease)",
      outfitType: "Lingerie + Robe",
      seriesTag: "lingerie_tease_01",
      environment: "Indoor",
      timeOfDayTags: ["Evening", "Night"],
      colors: ["Black", "Red"],
      top: "Elegant lingerie set with flattering cleavage; silk robe worn open slightly (non-explicit)",
      bottom: "High-cut lingerie bottoms; robe belt loose",
      footwear: "Barefoot",
      accessories: "Small earrings, soft glam makeup",
      fabricFit: "Classy provocative tease: luxury fabrics, confident body language, non-explicit",
    },

    // NIGHTLIFE (INDOOR)
    {
      id: "outfit_vip_mesh_dress",
      name: "Nightclub mesh overlay dress (safe)",
      outfitType: "Nightclub Dress",
      seriesTag: "nightclub_vip_01",
      environment: "Indoor",
      timeOfDayTags: ["Night"],
      colors: ["Black"],
      top: "Bodycon black dress with a subtle sheer overlay in places (tasteful, non-explicit), deep neckline",
      bottom: "Mid-thigh hemline, tight fit highlighting hips and glutes",
      footwear: "Black stilettos",
      accessories: "Diamond stud earrings, sleek clutch",
      fabricFit: "VIP energy: tight, high-class, provocative but safe",
    },
  ],

  moodPresets: [
    {
      id: "mood_confident_flirt",
      name: "Confident + Flirtatious",
      text:
        "Confident, flirtatious, relaxed luxury; soft smile in some moments, seductive eye contact in others; playful warmth without losing dominance",
    },
    {
      id: "mood_seductive_slow",
      name: "Seductive + Slow",
      text:
        "Seductive, slow, intimate energy; lips slightly parted; strong eye contact; calm controlled expression that invites attention",
    },
    {
      id: "mood_happy_radiant",
      name: "Happy + Radiant",
      text:
        "Happy, radiant, approachable; genuine smile, bright eyes, playful teasing energy that feels real and magnetic",
    },
  ],

  interactionPresets: [
    {
      id: "interact_attention",
      name: "Attention Hooks",
      items: [
        "Light wave toward the camera like she just noticed you",
        "Blowing a kiss with a teasing smile",
        "Adjusting a strap or neckline subtly, never rushed",
        "Brushing hair back slowly while holding eye contact",
        "Looking back over shoulder mid-walk, inviting the viewer to follow",
      ],
    },
    {
      id: "interact_luxury",
      name: "Luxury Behaviors",
      items: [
        "Sipping espresso/cocktail slowly with a soft smile",
        "Resting fingertips on her waist/hip as she turns",
        "Leaning into a mirror briefly, then meeting the camera’s gaze",
        "Crossing legs slowly, posture elegant and intentional",
      ],
    },
  ],

  bodyEmphasisPresets: [
    {
      id: "body_hourglass",
      name: "Hourglass (Waist + Glutes + Chest)",
      text:
        "Small tight waist, full rounded glutes, visible cleavage (safe); athletic feminine physique proudly displayed; fabric and posture intentionally highlight hips, waist, and bust",
    },
    {
      id: "body_soft_seductive",
      name: "Soft Seductive (Curves + Confidence)",
      text:
        "Curvy, feminine, confident silhouette; waist defined, hips emphasized, chest showcased tastefully; body language designed to attract attention without hiding her best features",
    },
  ],

  cameraPresets: [
    {
      id: "cam_editorial",
      name: "Ultra-realistic Editorial",
      text:
        "Eye-level or slightly low angle; natural light with soft shadows; ultra-realistic influencer photography; high-fashion editorial look; sharp focus; clean modern color grading",
    },
    {
      id: "cam_cinematic",
      name: "Cinematic Luxury",
      text:
        "Slightly low angle; cinematic lighting; crisp high-end photo; luxury influencer vibe; shallow depth-of-field; realistic skin texture; premium clarity",
    },
  ],

  rules: {
    avoidLastColorsCount: 6,
    avoidLastOutfitTypesCount: 4,
  },
};

// ===== helpers =====
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function matchesScene(outfit, environment, timeOfDay) {
  const envOk = outfit.environment === environment;
  const timeOk = outfit.timeOfDayTags?.includes(timeOfDay);
  return envOk && timeOk;
}

function buildPrompt({
  place,
  timeOfDay,
  light,
  posePack,
  posture,
  outfit,
  mood,
  interactions,
  bodyEmphasis,
  camera,
}) {
  const poseLines = posePack.poses.map((p) => `• ${p}`).join("\n");
  const interactionLines = interactions.map((i) => `• ${i}`).join("\n");

  const seriesLine = outfit.seriesTag ? `\nSeries tag: ${outfit.seriesTag}` : "";

  return `Place:
Country: ${place.country}
City / Area: ${place.city}
Exact setting: ${place.setting}
Indoor or Outdoor: ${place.environment}
Time of day: ${timeOfDay}
Lighting: ${light}

Poses:
${poseLines}

Posture:
${posture.text}

Clothing:
Outfit name: ${outfit.name}
Outfit type: ${outfit.outfitType}${seriesLine}
Top: ${outfit.top}
Bottom: ${outfit.bottom}
Footwear: ${outfit.footwear}
Accessories: ${outfit.accessories}
Fabric & fit details: ${outfit.fabricFit}

Mood:
${mood.text}

Interactions:
${interactionLines}

Body emphasis:
${bodyEmphasis.text}

Camera & style:
${camera.text}`;
}

// ===== component =====
export default function Page() {
  const [data, setData] = useState(DEFAULT_DATA);

  const [placeId, setPlaceId] = useState(DEFAULT_DATA.places[0].id);
  const place = useMemo(() => data.places.find((p) => p.id === placeId), [data.places, placeId]);

  const [timeOfDay, setTimeOfDay] = useState(DEFAULT_DATA.places[0].timeOfDayOptions[0]);
  const [light, setLight] = useState(DEFAULT_DATA.places[0].lightOptions[0]);

  const [posePackId, setPosePackId] = useState(DEFAULT_DATA.posePacks[0].id);
  const posePack = useMemo(() => data.posePacks.find((p) => p.id === posePackId), [data.posePacks, posePackId]);

  const [postureId, setPostureId] = useState(DEFAULT_DATA.posturePresets[0].id);
  const posture = useMemo(() => data.posturePresets.find((p) => p.id === postureId), [data.posturePresets, postureId]);

  const [moodId, setMoodId] = useState(DEFAULT_DATA.moodPresets[0].id);
  const mood = useMemo(() => data.moodPresets.find((m) => m.id === moodId), [data.moodPresets, moodId]);

  const [interactionPackId, setInteractionPackId] = useState(DEFAULT_DATA.interactionPresets[0].id);
  const interactionPack = useMemo(
    () => data.interactionPresets.find((p) => p.id === interactionPackId),
    [data.interactionPresets, interactionPackId]
  );

  const [bodyId, setBodyId] = useState(DEFAULT_DATA.bodyEmphasisPresets[0].id);
  const bodyEmphasis = useMemo(
    () => data.bodyEmphasisPresets.find((b) => b.id === bodyId),
    [data.bodyEmphasisPresets, bodyId]
  );

  const [cameraId, setCameraId] = useState(DEFAULT_DATA.cameraPresets[0].id);
  const camera = useMemo(
    () => data.cameraPresets.find((c) => c.id === cameraId),
    [data.cameraPresets, cameraId]
  );

  // Clothing controls
  const [clothingMode, setClothingMode] = useState("auto"); // auto | manual
  const [manualOutfitId, setManualOutfitId] = useState("");

  // Series controls
  const [seriesMode, setSeriesMode] = useState(false);
  const [seriesTag, setSeriesTag] = useState("");

  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState("");

  // Load saved state (but never leave app empty)
  useEffect(() => {
    const saved = loadState();
    if (saved?.data?.places?.length) setData(saved.data);
    if (saved?.ui) {
      setPlaceId(saved.ui.placeId ?? DEFAULT_DATA.places[0].id);
      setPosePackId(saved.ui.posePackId ?? DEFAULT_DATA.posePacks[0].id);
      setPostureId(saved.ui.postureId ?? DEFAULT_DATA.posturePresets[0].id);
      setMoodId(saved.ui.moodId ?? DEFAULT_DATA.moodPresets[0].id);
      setInteractionPackId(saved.ui.interactionPackId ?? DEFAULT_DATA.interactionPresets[0].id);
      setBodyId(saved.ui.bodyId ?? DEFAULT_DATA.bodyEmphasisPresets[0].id);
      setCameraId(saved.ui.cameraId ?? DEFAULT_DATA.cameraPresets[0].id);

      setClothingMode(saved.ui.clothingMode ?? "auto");
      setManualOutfitId(saved.ui.manualOutfitId ?? "");

      setSeriesMode(saved.ui.seriesMode ?? false);
      setSeriesTag(saved.ui.seriesTag ?? "");

      setHistory(saved.ui.history ?? []);
      setOutput(saved.ui.output ?? "");
    }
  }, []);

  // Update time/light when place changes
  useEffect(() => {
    if (!place) return;
    setTimeOfDay(place.timeOfDayOptions[0]);
    setLight(place.lightOptions[0]);
    setManualOutfitId("");
    setSeriesTag("");
  }, [placeId]); // eslint-disable-line

  // Persist
  useEffect(() => {
    saveState({
      data,
      ui: {
        placeId,
        posePackId,
        postureId,
        moodId,
        interactionPackId,
        bodyId,
        cameraId,
        clothingMode,
        manualOutfitId,
        seriesMode,
        seriesTag,
        history,
        output,
      },
    });
  }, [
    data,
    placeId,
    posePackId,
    postureId,
    moodId,
    interactionPackId,
    bodyId,
    cameraId,
    clothingMode,
    manualOutfitId,
    seriesMode,
    seriesTag,
    history,
    output,
  ]);

  const recentColors = useMemo(() => {
    const colors = [];
    for (const h of history.slice(0, data.rules.avoidLastColorsCount)) {
      if (h?.meta?.colors) colors.push(...h.meta.colors);
    }
    return uniq(colors);
  }, [history, data.rules.avoidLastColorsCount]);

  const recentOutfitTypes = useMemo(() => {
    const types = [];
    for (const h of history.slice(0, data.rules.avoidLastOutfitTypesCount)) {
      if (h?.meta?.outfitType) types.push(h.meta.outfitType);
    }
    return uniq(types);
  }, [history, data.rules.avoidLastOutfitTypesCount]);

  const outfitsForScene = useMemo(() => {
    if (!place) return [];
    return data.clothingLibrary.filter((o) => matchesScene(o, place.environment, timeOfDay));
  }, [data.clothingLibrary, place, timeOfDay]);

  const availableSeriesTags = useMemo(() => {
    const tags = outfitsForScene.map((o) => o.seriesTag).filter(Boolean);
    return uniq(tags);
  }, [outfitsForScene]);

  function chooseOutfitAuto() {
    let candidates = outfitsForScene;

    if (seriesMode && seriesTag) {
      candidates = candidates.filter((o) => o.seriesTag === seriesTag);
    }

    // anti-repeat
    candidates = candidates.filter((o) => !recentOutfitTypes.includes(o.outfitType));
    candidates = candidates.filter((o) => (o.colors || []).every((c) => !recentColors.includes(c)));

    // relax if strict
    if (candidates.length === 0) {
      candidates = outfitsForScene;
      if (seriesMode && seriesTag) candidates = candidates.filter((o) => o.seriesTag === seriesTag);
    }

    return candidates.length ? pickRandom(candidates) : null;
  }

  function chooseOutfit() {
    if (clothingMode === "manual") {
      const found = outfitsForScene.find((o) => o.id === manualOutfitId);
      return found || null;
    }
    return chooseOutfitAuto();
  }

  function generateOne() {
    const outfit = chooseOutfit();
    if (!outfit) {
      setOutput("No outfit matched this scene. Change Time of day / Place, or switch Clothing mode.");
      return;
    }

    const pool = [...interactionPack.items];
    const interactions = [];
    while (interactions.length < 3 && pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      interactions.push(pool.splice(idx, 1)[0]);
    }

    const prompt = buildPrompt({
      place,
      timeOfDay,
      light,
      posePack,
      posture,
      outfit,
      mood,
      interactions,
      bodyEmphasis,
      camera,
    });

    setOutput(prompt);

    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      prompt,
      meta: {
        environment: place.environment,
        timeOfDay,
        outfitType: outfit.outfitType,
        colors: outfit.colors || [],
        seriesTag: outfit.seriesTag || "",
        outfitName: outfit.name,
      },
    };

    setHistory((prev) => [entry, ...prev].slice(0, 200));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output || "");
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <main style={styles.main}>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.h1}>CEO Prompt Builder</h1>
          <div style={styles.sub}>Place → Poses → Posture → Clothing → Mood → Interactions → Body → Camera</div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={generateOne} style={styles.primaryBtn}>Generate Prompt</button>
          <button onClick={copyOutput} style={styles.btn}>Copy</button>
        </div>
      </div>

      <div style={styles.grid}>
        <section style={styles.card}>
          <h2 style={styles.h2}>1) Place</h2>

          <label style={styles.label}>Location preset</label>
          <select style={styles.select} value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
            {data.places.map((p) => (
              <option key={p.id} value={p.id}>{p.country} — {p.city} — {p.environment}</option>
            ))}
          </select>

          <label style={styles.label}>Time of day</label>
          <select style={styles.select} value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
            {place.timeOfDayOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <label style={styles.label}>Lighting</label>
          <select style={styles.select} value={light} onChange={(e) => setLight(e.target.value)}>
            {place.lightOptions.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <div style={styles.note}>
            <b>Anti-repeat (live):</b><br />
            Recent colors avoided: {recentColors.length ? recentColors.join(", ") : "None"}<br />
            Recent outfit types avoided: {recentOutfitTypes.length ? recentOutfitTypes.join(", ") : "None"}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>2) Poses</h2>
          <label style={styles.label}>Pose pack</label>
          <select style={styles.select} value={posePackId} onChange={(e) => setPosePackId(e.target.value)}>
            {data.posePacks.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div style={styles.preview}>
            {posePack.poses.map((p, i) => <div key={i}>• {p}</div>)}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>3) Posture</h2>
          <label style={styles.label}>Posture preset</label>
          <select style={styles.select} value={postureId} onChange={(e) => setPostureId(e.target.value)}>
            {data.posturePresets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div style={styles.preview}>{posture.text}</div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>4) Clothing</h2>

          <label style={styles.label}>Clothing mode</label>
          <select style={styles.select} value={clothingMode} onChange={(e) => setClothingMode(e.target.value)}>
            <option value="auto">Auto (recommended)</option>
            <option value="manual">Manual (choose outfit)</option>
          </select>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <input
              type="checkbox"
              checked={seriesMode}
              onChange={(e) => setSeriesMode(e.target.checked)}
            />
            <div style={{ fontSize: 13 }}>
              <b>Series Mode</b> (keep the same outfit storyline)
            </div>
          </div>

          <label style={styles.label}>Series tag</label>
          <select
            style={styles.select}
            value={seriesTag}
            onChange={(e) => setSeriesTag(e.target.value)}
            disabled={!seriesMode}
          >
            <option value="">(Any series)</option>
            {availableSeriesTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
          </select>

          {clothingMode === "manual" && (
            <>
              <label style={styles.label}>Pick an outfit for this scene</label>
              <select
                style={styles.select}
                value={manualOutfitId}
                onChange={(e) => setManualOutfitId(e.target.value)}
              >
                <option value="">(Choose)</option>
                {outfitsForScene.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — {o.outfitType} — {(o.colors || []).join("/")} {o.seriesTag ? `— ${o.seriesTag}` : ""}
                  </option>
                ))}
              </select>
            </>
          )}

          <div style={styles.note}>
            Scene outfits available: <b>{outfitsForScene.length}</b>
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>5) Mood</h2>
          <label style={styles.label}>Mood preset</label>
          <select style={styles.select} value={moodId} onChange={(e) => setMoodId(e.target.value)}>
            {data.moodPresets.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <div style={styles.preview}>{mood.text}</div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>6) Interactions</h2>
          <label style={styles.label}>Interaction pack</label>
          <select style={styles.select} value={interactionPackId} onChange={(e) => setInteractionPackId(e.target.value)}>
            {data.interactionPresets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div style={styles.preview}>
            {interactionPack.items.map((x, i) => <div key={i}>• {x}</div>)}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>7) Body emphasis</h2>
          <label style={styles.label}>Body preset</label>
          <select style={styles.select} value={bodyId} onChange={(e) => setBodyId(e.target.value)}>
            {data.bodyEmphasisPresets.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <div style={styles.preview}>{bodyEmphasis.text}</div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>8) Camera</h2>
          <label style={styles.label}>Camera preset</label>
          <select style={styles.select} value={cameraId} onChange={(e) => setCameraId(e.target.value)}>
            {data.cameraPresets.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div style={styles.preview}>{camera.text}</div>
        </section>
      </div>

      <section style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <h2 style={styles.h2}>Output</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={copyOutput} style={styles.btn}>Copy</button>
            <button onClick={clearHistory} style={styles.btn}>Clear History</button>
          </div>
        </div>

        <textarea
          style={styles.textarea}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Click “Generate Prompt” to create a locked-structure prompt…"
        />
      </section>

      <section style={styles.card}>
        <h2 style={styles.h2}>History (latest 10)</h2>
        <div style={styles.history}>
          {history.slice(0, 10).map((h) => (
            <button key={h.id} style={styles.historyItem} onClick={() => setOutput(h.prompt)}>
              <div style={{ fontWeight: 800 }}>{new Date(h.createdAt).toLocaleString()}</div>
              <div style={{ opacity: 0.85, fontSize: 13 }}>
                {h.meta.environment} • {h.meta.timeOfDay} • {h.meta.outfitName} • {h.meta.outfitType}
                {h.meta.seriesTag ? ` • ${h.meta.seriesTag}` : ""} • {(h.meta.colors || []).join(", ")}
              </div>
            </button>
          ))}
          {history.length === 0 && <div style={{ opacity: 0.8 }}>No history yet.</div>}
        </div>
      </section>
    </main>
  );
}

const styles = {
  main: {
    padding: 18,
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    color: "#fff",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  h1: { margin: 0, fontSize: 26, fontWeight: 900 },
  sub: { marginTop: 6, opacity: 0.85, fontSize: 13 },
  h2: { margin: "0 0 10px", fontSize: 16, fontWeight: 900, color: "#111" },
  label: { display: "block", fontSize: 12, opacity: 0.75, margin: "8px 0 6px", color: "#111" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 14,
    marginBottom: 14,
  },
  card: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: 14,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  select: {
    width: "100%",
    padding: "10px 10px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    outline: "none",
    background: "#f7f7f7",
    color: "#111",
    fontWeight: 600,
  },
  preview: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    background: "rgba(0,0,0,0.05)",
    color: "#111",
    fontSize: 13,
    lineHeight: 1.45,
  },
  note: {
    marginTop: 12,
    padding: 10,
    borderRadius: 12,
    background: "rgba(0,0,0,0.05)",
    color: "#111",
    fontSize: 12,
    lineHeight: 1.45,
  },
  textarea: {
    width: "100%",
    minHeight: 320,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    padding: 12,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 13,
    lineHeight: 1.4,
    outline: "none",
    background: "#111",
    color: "#fff",
  },
  btn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.20)",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontWeight: 800,
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.20)",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },
  history: { display: "grid", gap: 10, marginTop: 10 },
  historyItem: {
    textAlign: "left",
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    cursor: "pointer",
    color: "#111",
  },
};
