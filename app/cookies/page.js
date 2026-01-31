"use client";

import React, { useEffect, useMemo, useState } from "react";

/* -----------------------------
   Locked Structure Data (Upgraded V3 + Shopify Grid Mode)
------------------------------ */

const SCENES = [
  "Clean studio food photography environment",
  "Luxury dessert photography studio",
  "Minimal pastel studio background",
  "Dark moody studio with black background",
  "Floating product photography setup",

  "High-end bakery counter scene (studio-controlled, no people)",
  "Marble pastry worktop in a modern kitchen studio",
  "Stainless steel bakery prep station (clean, minimal, no tools visible)",
  "Oven rack cooling scene (studio, clean background, no clutter)",
  "Parchment paper on a baking tray (premium, minimal styling)",
  "Neutral linen backdrop with studio lighting (no extra props)",
  "Editorial tabletop scene with subtle shadows (no objects, no text)",
  "Luxury product pedestal setup (minimal, modern, clean)",
  "Soft creamy studio corner with gentle falloff shadows",
  "High-contrast premium studio corner with controlled reflections",
];

const BACKGROUNDS = [
  "solid pastel pink seamless backdrop",
  "solid pastel beige seamless backdrop",
  "solid cream seamless backdrop",
  "solid matte black seamless backdrop",
  "white seamless backdrop",
];

const ARRANGEMENTS = [
  "Single hero cookie centered in frame",
  "Stack of three cookies",
  "Vertical stack of five floating cookies",
  "Broken cookie revealing gooey interior",
  "Cookies suspended mid-air in a vertical line",

  "Two cookies overlapped with one slightly behind (hero composition)",
  "Three-cookie fan arrangement (slight angle, bakery-display feel)",
  "Cookie cut clean in half (cross-section facing camera, gooey center visible)",
  "Cookie torn open (pull-apart look, soft crumb strands visible)",
  "Single cookie with one bite taken out (clean bite mark, gooey center)",
  "Stack of two with melted chocolate stretching between halves",
  "Top-down flat lay of one cookie (centered, minimalist, studio)",
  "Top-down flat lay of three cookies evenly spaced",
  "Side profile shot emphasizing height and thickness (hero, close-up)",
  "Close-up macro crop showing crumb + chocolate pools (extreme detail)",
  "Diagonal floating stack (dynamic, premium commercial look)",
  "One cookie leaning against another (show thickness, clean composition)",
  "Three cookies in a neat row (Shopify grid consistency)",
  "Cookie centered with clean negative space for future layout (no text added)",
];

const TEXTURES = [
  "cracked golden-brown baked surface",
  "thick soft interior with a gooey center",
  "melted chocolate pockets visible",
  "rustic handmade bakery texture",
  "extra thick edges and tall bakery height",

  "crisp outer shell with a soft break, ultra-thick bakery rise",
  "slightly underbaked center with glossy molten chocolate pools",
  "dense but tender crumb, buttery and rich, never dry",
  "semi-melted chocolate chunks holding shape inside the soft crumb",
  "crisp edges fading into a fudgy middle, deep golden cracks",
  "pillowy interior that compresses when pressed, gooey core visible",
  "visible dough strands when pulled apart, molten chocolate stretching slightly",
  "heavy indulgent bakery texture with glossy pockets throughout",
];

const MOODS = [
  "luxury dessert, premium and indulgent",
  "playful, fun, and indulgent",
  "dark, rich, and decadent",
  "clean, modern, minimalist",

  "warm bakery-fresh comfort, cozy and inviting",
  "high-end boutique bakery, refined and elegant",
  "ultra-premium commercial ad feel, crisp and confident",
  "rich gooey indulgence, mouthwatering and satisfying",
  "clean minimal luxury, soft and expensive",
  "editorial magazine vibe, tasteful and elevated",
  "late-night craving mood, moody and dramatic",
  "bright joyful dessert mood, airy and fresh",
  "premium artisan handmade vibe, rustic but polished",
  "hyper-real product focus, clinical sharpness and perfection",
];

const CAMERA_STYLES = [
  "ultra-realistic professional food photography",
  "high-end commercial product photography",
  "editorial dessert photography",
  "macro food photography with shallow depth of field",

  "luxury ad campaign food photography, ultra-clean and sharp",
  "high-contrast studio product photography with crisp texture detail",
  "soft film-inspired editorial food photography (subtle grain, premium)",
  "tight macro texture capture, extreme detail, shallow depth",
  "wide hero shot with depth and negative space (Shopify-ready)",
  "close-up 85mm-style framing, creamy background bokeh",
  "top-down flat lay product photography, perfectly aligned",
  "angled 3/4 hero shot, premium bakery catalog style",
];

const LIGHTING = [
  "soft diffused studio lighting",
  "even commercial lighting",
  "dramatic side lighting",
  "natural window light (diffused)",

  "softbox key light with gentle fill, premium commercial clarity",
  "cinematic low-key lighting with controlled highlights",
  "high-key bright studio lighting, clean and airy",
  "rim lighting emphasizing edges and glossy chocolate highlights",
  "top light with soft shadows, perfect for texture and cracks",
  "three-point studio lighting, crisp detail and depth",
];

// Props (must have)
const PLATES = [
  "on a clean white ceramic plate",
  "on a matte black ceramic plate",
  "on a warm beige stoneware plate",
  "on a white marble serving plate",
  "on a rustic wooden serving board",
];

const DRINKS = [
  "a hot cup of black coffee in a minimal ceramic cup",
  "a cappuccino in a clean ceramic cup with subtle foam texture",
  "a latte in a minimal ceramic cup (no logo), soft foam top",
  "a cup of tea in a simple ceramic cup (no label), warm steam",
  "a clear glass of cold milk with natural condensation",
  "a small glass bottle of milk (unbranded, no label)",
];

const PROP_STYLING = [
  "minimal premium styling, clean and intentional placement",
  "cozy bakery styling, warm and inviting",
  "high-end editorial styling, tasteful and refined",
  "commercial product styling, clean and balanced composition",
];

// Updated negative (allows plates/cups/milk)
const NEGATIVE_DEFAULT =
  "text, watermark, logo, branding text, captions, hands, people, face, messy crumbs, extra props, background objects, clutter, blur, low-res, cartoon, illustration";

// Default presets
const DEFAULT_PRESETS = {
  BISCOFF: {
    cookieType: "Giant thick New York–style gourmet cookie",
    dough: "vanilla cookie dough",
    mixins: "white chocolate chunks",
    topping: "a rectangular caramelized Biscoff biscuit pressed into the top",
    filling: "glossy thick Biscoff spread",
    drip: "a smooth continuous ribbon of Biscoff spread pouring from above and connecting each cookie as it cascades downward",
  },
  NUTELLA: {
    cookieType: "Extra-thick stuffed bakery cookie",
    dough: "vanilla cookie dough",
    mixins: "milk chocolate chunks",
    topping: "a light milk chocolate drizzle",
    filling: "rich glossy Nutella filling",
    drip: "a slow thick Nutella drip that clings and stretches before falling naturally",
  },
  OREO: {
    cookieType: "Thick gourmet dessert cookie",
    dough: "vanilla cookie dough",
    mixins: "crushed Oreo cookies and white chocolate chunks",
    topping: "Oreo cookie pieces on top",
    filling: "cookies-and-cream filling",
    drip: "a thick cookies-and-cream filling slowly oozing from the center with realistic gravity drips",
  },
  SNICKERS: {
    cookieType: "Giant thick gourmet cookie",
    dough: "vanilla cookie dough",
    mixins: "chopped Snickers pieces and milk chocolate chunks",
    topping: "a caramel drizzle",
    filling: "caramel and peanut butter filling",
    drip: "a glossy caramel ribbon flowing downward, connecting the cookies in a clean vertical line",
  },
  BUENO: {
    cookieType: "Extra-thick stuffed bakery cookie",
    dough: "vanilla cookie dough",
    mixins: "Kinder Bueno pieces and milk chocolate chunks",
    topping: "a thin chocolate drizzle",
    filling: "hazelnut cream filling",
    drip: "a thick hazelnut cream drip, glossy and smooth, cascading down the stack",
  },
  BROWNIE: {
    cookieType: "Thick decadent chocolate cookie",
    dough: "rich chocolate cookie dough",
    mixins: "brownie chunks and dark chocolate shards",
    topping: "dark chocolate shavings",
    filling: "warm melted chocolate core",
    drip: "a thick melted chocolate stream with a glossy reflective surface, flowing downward in one continuous ribbon",
  },
};

const LS_KEY = "az_cookie_presets_v1";

/* -----------------------------
   Utilities
------------------------------ */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(s) {
  return (s || "").trim().replace(/\s+/g, " ");
}

function safeUpperKey(s) {
  return clean(s).toUpperCase().replace(/\s+/g, "_").replace(/[^A-Z0-9_]/g, "");
}

function buildPrompt(state) {
  const lines = [];

  // Scene + background
  lines.push(`${state.scene} set against a ${state.background}.`);

  // Props (plate + drink)
  lines.push(
    `Props: ${state.plate}, with ${state.drink}. Styling: ${state.propStyling}.`
  );
  lines.push(`Props stay secondary; the cookie remains the hero.`);

  // Cookie description
  lines.push(`A ${state.cookieType}, thick and tall, with ${state.texture}.`);
  lines.push(
    `Made from ${state.dough} with ${state.mixins} baked throughout, clearly visible in the dough.`
  );

  if (state.topping) lines.push(`Topped with ${state.topping}.`);

  if (state.filling) {
    lines.push(
      `Featuring ${state.filling} that looks rich, glossy, and freshly melted.`
    );
  }

  if (state.dripEnabled && state.filling) {
    lines.push(
      `${state.dripText}, thick, shiny, and fluid with realistic gravity drips.`
    );
  }

  // Composition
  lines.push(
    `Arrangement: ${state.arrangement}, clean spacing, premium commercial composition.`
  );

  // Lighting + camera
  lines.push(
    `Lighting: ${state.lighting}, highlighting thickness, cracks, and glossy filling with soft realistic shadows.`
  );
  lines.push(
    `Shot in ${state.cameraStyle}, ultra-realistic, sharp focus on cookie texture, high resolution, crisp detail, natural depth of field.`
  );

  // Mood
  lines.push(`Mood: ${state.mood}.`);

  // Clean rules
  lines.push(
    `No text, no logos, no labels, no people, no hands, no clutter. Minimal props only (plate + drink).`
  );

  return lines.map(clean).join("\n");
}

async function copyText(text) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
}

/* -----------------------------
   Preset Manager Modal
------------------------------ */

function PresetManagerModal({
  open,
  onClose,
  presets,
  setPresets,
  onApplyPresetKey,
}) {
  const [selectedKey, setSelectedKey] = useState("");
  const [draftKey, setDraftKey] = useState("");
  const [form, setForm] = useState({
    cookieType: "",
    dough: "",
    mixins: "",
    topping: "",
    filling: "",
    drip: "",
  });

  const [importText, setImportText] = useState("");

  useEffect(() => {
    if (!open) return;
    const keys = Object.keys(presets || {});
    const firstKey = keys[0] || "";
    setSelectedKey(firstKey);
    setDraftKey(firstKey);
    if (firstKey) setForm({ ...presets[firstKey] });
  }, [open, presets]);

  if (!open) return null;

  const keys = Object.keys(presets || {}).sort();

  function loadKey(k) {
    setSelectedKey(k);
    setDraftKey(k);
    setForm({ ...(presets[k] || {}) });
  }

  function saveCurrent() {
    const newKey = safeUpperKey(draftKey || selectedKey);
    if (!newKey) return;

    const payload = {
      cookieType: clean(form.cookieType),
      dough: clean(form.dough),
      mixins: clean(form.mixins),
      topping: clean(form.topping),
      filling: clean(form.filling),
      drip: clean(form.drip),
    };

    setPresets((prev) => {
      const next = { ...(prev || {}) };
      if (selectedKey && selectedKey !== newKey) delete next[selectedKey];
      next[newKey] = payload;
      return next;
    });

    setSelectedKey(newKey);
    setDraftKey(newKey);
  }

  function deleteCurrent() {
    if (!selectedKey) return;
    if (!confirm(`Delete preset "${selectedKey}"?`)) return;

    setPresets((prev) => {
      const next = { ...(prev || {}) };
      delete next[selectedKey];
      return next;
    });

    setSelectedKey("");
    setDraftKey("");
    setForm({
      cookieType: "",
      dough: "",
      mixins: "",
      topping: "",
      filling: "",
      drip: "",
    });
  }

  function createNew() {
    setSelectedKey("");
    setDraftKey("NEW_PRESET");
    setForm({
      cookieType: "Giant thick gourmet cookie",
      dough: "vanilla cookie dough",
      mixins: "milk chocolate chunks",
      topping: "",
      filling: "",
      drip: "a thick glossy filling drip flowing naturally downward",
    });
  }

  function exportJSON() {
    const json = JSON.stringify(presets, null, 2);
    copyText(json);
    alert("Presets copied to clipboard as JSON ✅");
  }

  function importJSON() {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid JSON");

      const normalized = {};
      for (const [k, v] of Object.entries(parsed)) {
        const key = safeUpperKey(k);
        if (!key) continue;
        normalized[key] = {
          cookieType: clean(v.cookieType),
          dough: clean(v.dough),
          mixins: clean(v.mixins),
          topping: clean(v.topping),
          filling: clean(v.filling),
          drip: clean(v.drip),
        };
      }

      setPresets(normalized);
      alert("Imported presets ✅");
      setImportText("");
    } catch {
      alert("Import failed: paste valid JSON of presets.");
    }
  }

  return (
    <div style={modalOverlay} onMouseDown={onClose}>
      <div style={modalCard} onMouseDown={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Preset Manager</div>
            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
              Add / edit / delete presets. Saved automatically.
            </div>
          </div>
          <button style={btn} onClick={onClose}>Close</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginTop: 14 }}>
          <div style={{ ...panel, height: 420, overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>Presets</div>
              <button style={btn} onClick={createNew}>+ New</button>
            </div>

            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {keys.length === 0 && (
                <div style={{ opacity: 0.7, fontSize: 12 }}>No presets yet.</div>
              )}

              {keys.map((k) => (
                <button
                  key={k}
                  style={{
                    ...btn,
                    textAlign: "left",
                    background: k === selectedKey ? "white" : "#1a1a1a",
                    color: k === selectedKey ? "black" : "white",
                    border: k === selectedKey ? "1px solid white" : "1px solid #2a2a2a",
                  }}
                  onClick={() => loadKey(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div style={{ ...panel, height: 420, overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>Edit preset</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={btn}
                  onClick={() => onApplyPresetKey(safeUpperKey(draftKey || selectedKey))}
                >
                  Apply to Builder
                </button>
                <button style={btn} onClick={deleteCurrent} disabled={!selectedKey}>
                  Delete
                </button>
                <button style={btnPrimary} onClick={saveCurrent}>
                  Save
                </button>
              </div>
            </div>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <Label text="Preset name (key)" />
              <input
                value={draftKey}
                onChange={(e) => setDraftKey(e.target.value)}
                style={inputStyle}
                placeholder="E.g. BISCOFF, OREO, KINDER_BUENO"
              />

              <Label text="Cookie type" />
              <input
                value={form.cookieType}
                onChange={(e) => setForm((p) => ({ ...p, cookieType: e.target.value }))}
                style={inputStyle}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <Label text="Dough base" />
                  <input
                    value={form.dough}
                    onChange={(e) => setForm((p) => ({ ...p, dough: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <Label text="Mix-ins" />
                  <input
                    value={form.mixins}
                    onChange={(e) => setForm((p) => ({ ...p, mixins: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <Label text="Topping" />
              <input
                value={form.topping}
                onChange={(e) => setForm((p) => ({ ...p, topping: e.target.value }))}
                style={inputStyle}
              />

              <Label text="Filling" />
              <input
                value={form.filling}
                onChange={(e) => setForm((p) => ({ ...p, filling: e.target.value }))}
                style={inputStyle}
              />

              <Label text="Drip description" />
              <input
                value={form.drip}
                onChange={(e) => setForm((p) => ({ ...p, drip: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
          <div style={panel}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>Export</div>
              <button style={btn} onClick={exportJSON}>Copy JSON</button>
            </div>
            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>
              Copies all presets as JSON to clipboard.
            </div>
          </div>

          <div style={panel}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>Import</div>
              <button style={btn} onClick={importJSON}>Import JSON</button>
            </div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              style={{ ...textareaStyle, height: 120 }}
              placeholder="Paste presets JSON here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Page
------------------------------ */

export default function CookiesPage() {
  const [presets, setPresets] = useState(DEFAULT_PRESETS);
  const [presetKey, setPresetKey] = useState("BISCOFF");

  // Shopify Grid Mode (locks key look controls)
  const [shopifyGridMode, setShopifyGridMode] = useState(true);
  const [gridScene, setGridScene] = useState(SCENES[0]);
  const [gridBackground, setGridBackground] = useState(BACKGROUNDS[0]);
  const [gridLighting, setGridLighting] = useState(LIGHTING[0]);
  const [gridCameraStyle, setGridCameraStyle] = useState(CAMERA_STYLES[0]);
  const [gridPropStyling, setGridPropStyling] = useState(PROP_STYLING[0]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_PRESETS));
        return;
      }
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setPresets(parsed);
        if (!parsed[presetKey]) {
          const first = Object.keys(parsed)[0];
          if (first) setPresetKey(first);
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(presets));
    } catch {
      // ignore
    }
  }, [presets]);

  const currentPreset = presets?.[presetKey] || DEFAULT_PRESETS.BISCOFF;

  // Normal controls
  const [scene, setScene] = useState(SCENES[0]);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [arrangement, setArrangement] = useState(ARRANGEMENTS[0]);
  const [texture, setTexture] = useState(TEXTURES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [lighting, setLighting] = useState(LIGHTING[0]);
  const [cameraStyle, setCameraStyle] = useState(CAMERA_STYLES[0]);

  // Props
  const [plate, setPlate] = useState(PLATES[0]);
  const [drink, setDrink] = useState(DRINKS[0]);
  const [propStyling, setPropStyling] = useState(PROP_STYLING[0]);

  // Cookie preset fields
  const [cookieType, setCookieType] = useState(currentPreset.cookieType);
  const [dough, setDough] = useState(currentPreset.dough);
  const [mixins, setMixins] = useState(currentPreset.mixins);
  const [topping, setTopping] = useState(currentPreset.topping);
  const [filling, setFilling] = useState(currentPreset.filling);

  const [dripEnabled, setDripEnabled] = useState(true);
  const [dripText, setDripText] = useState(currentPreset.drip);

  const [negative, setNegative] = useState(NEGATIVE_DEFAULT);

  const [output, setOutput] = useState("");
  const [variations, setVariations] = useState([]);

  const [presetManagerOpen, setPresetManagerOpen] = useState(false);

  // Keep form synced when preset changes
  useEffect(() => {
    const p = presets?.[presetKey];
    if (!p) return;
    setCookieType(p.cookieType || "");
    setDough(p.dough || "");
    setMixins(p.mixins || "");
    setTopping(p.topping || "");
    setFilling(p.filling || "");
    setDripText(p.drip || "");
  }, [presetKey, presets]);

  function applyPreset(key) {
    const k = safeUpperKey(key);
    if (!presets[k]) return;
    setPresetKey(k);
  }

  // State that buildPrompt uses (grid-mode aware)
  const state = useMemo(
    () => ({
      scene: shopifyGridMode ? gridScene : scene,
      background: shopifyGridMode ? gridBackground : background,
      arrangement,
      texture,
      mood,
      lighting: shopifyGridMode ? gridLighting : lighting,
      cameraStyle: shopifyGridMode ? gridCameraStyle : cameraStyle,

      plate,
      drink,
      propStyling: shopifyGridMode ? gridPropStyling : propStyling,

      cookieType,
      dough,
      mixins,
      topping,
      filling,
      dripEnabled,
      dripText,
    }),
    [
      shopifyGridMode,
      gridScene,
      gridBackground,
      gridLighting,
      gridCameraStyle,
      gridPropStyling,

      scene,
      background,
      arrangement,
      texture,
      mood,
      lighting,
      cameraStyle,

      plate,
      drink,
      propStyling,

      cookieType,
      dough,
      mixins,
      topping,
      filling,
      dripEnabled,
      dripText,
    ]
  );

  function clearAll() {
    setOutput("");
    setVariations([]);
  }

  function onGenerate() {
    setVariations([]);
    setOutput(buildPrompt(state));
  }

  function onGenerate10() {
    setOutput("");
    const v = [];

    for (let i = 0; i < 10; i++) {
      const nextState = {
        ...state,

        // If NOT grid mode, randomize the "look" controls too
        scene: shopifyGridMode ? state.scene : pick(SCENES),
        background: shopifyGridMode ? state.background : pick(BACKGROUNDS),
        lighting: shopifyGridMode ? state.lighting : pick(LIGHTING),
        cameraStyle: shopifyGridMode ? state.cameraStyle : pick(CAMERA_STYLES),
        propStyling: shopifyGridMode ? state.propStyling : pick(PROP_STYLING),

        // Always randomize variety controls
        arrangement: pick(ARRANGEMENTS),
        texture: pick(TEXTURES),
        mood: pick(MOODS),
        plate: pick(PLATES),
        drink: pick(DRINKS),
      };

      v.push(buildPrompt(nextState));
    }

    setVariations(v);
  }

  const presetKeys = Object.keys(presets || {}).sort();

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "white", padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0 }}>
              COOKIE Prompt Builder (Locked Structure V3)
            </h1>
            <p style={{ marginTop: 8, opacity: 0.75 }}>
              Scene → Props → Cookie → Dough → Filling → Arrangement → Texture → Mood → Camera
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={onGenerate} style={btnPrimary}>Generate Prompt</button>
            <button onClick={onGenerate10} style={btn}>Generate 10 Variations</button>
            <button
              onClick={() => copyText(output || variations.join("\n\n---\n\n"))}
              style={btn}
            >
              Copy
            </button>
            <button onClick={clearAll} style={btn}>
              Clear All
            </button>
            <button onClick={() => setPresetManagerOpen(true)} style={btn}>
              Preset Manager
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginTop: 18 }}>
          <Card title="Shopify Grid Mode (Consistency Lock)">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={shopifyGridMode}
                onChange={(e) => setShopifyGridMode(e.target.checked)}
              />
              <span style={{ opacity: 0.9 }}>
                Lock Scene + Background + Lighting + Camera + Prop styling
              </span>
            </div>

            <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
              When enabled, variations keep a consistent Shopify grid look.
            </div>

            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              <Label text="Locked Scene" />
              <Select value={gridScene} onChange={setGridScene} options={SCENES} />

              <Label text="Locked Background" />
              <Select value={gridBackground} onChange={setGridBackground} options={BACKGROUNDS} />

              <Label text="Locked Lighting" />
              <Select value={gridLighting} onChange={setGridLighting} options={LIGHTING} />

              <Label text="Locked Camera Style" />
              <Select value={gridCameraStyle} onChange={setGridCameraStyle} options={CAMERA_STYLES} />

              <Label text="Locked Prop Styling" />
              <Select value={gridPropStyling} onChange={setGridPropStyling} options={PROP_STYLING} />
            </div>
          </Card>

          <Card title="1) Scene">
            <Label text="Scene preset" />
            <Select value={scene} onChange={setScene} options={SCENES} />
            <Label text="Background" />
            <Select value={background} onChange={setBackground} options={BACKGROUNDS} />
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {shopifyGridMode ? "Grid Mode ON: these are overridden by the locked values." : ""}
            </div>
          </Card>

          <Card title="2) Props (Plate + Drink)">
            <Label text="Plate / surface" />
            <Select value={plate} onChange={setPlate} options={PLATES} />

            <Label text="Drink" />
            <Select value={drink} onChange={setDrink} options={DRINKS} />

            <Label text="Prop styling" />
            <Select value={propStyling} onChange={setPropStyling} options={PROP_STYLING} />
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {shopifyGridMode ? "Grid Mode ON: prop styling is overridden by the locked value." : ""}
            </div>
          </Card>

          <Card title="3) Cookie">
            <Label text="Cookie preset" />
            <select
              value={presetKey}
              onChange={(e) => applyPreset(e.target.value)}
              style={selectStyle}
            >
              {presetKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>

            <Label text="Cookie type" />
            <input value={cookieType} onChange={(e) => setCookieType(e.target.value)} style={inputStyle} />
          </Card>

          <Card title="4) Dough & Mix-ins">
            <Label text="Dough base" />
            <input value={dough} onChange={(e) => setDough(e.target.value)} style={inputStyle} />
            <Label text="Mix-ins" />
            <input value={mixins} onChange={(e) => setMixins(e.target.value)} style={inputStyle} />
          </Card>

          <Card title="5) Filling / Drip">
            <Label text="Topping" />
            <input value={topping} onChange={(e) => setTopping(e.target.value)} style={inputStyle} />

            <Label text="Filling" />
            <input value={filling} onChange={(e) => setFilling(e.target.value)} style={inputStyle} />

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <input
                type="checkbox"
                checked={dripEnabled}
                onChange={(e) => setDripEnabled(e.target.checked)}
              />
              <span style={{ opacity: 0.9 }}>Enable drip / flow</span>
            </div>

            <Label text="Drip description" />
            <input value={dripText} onChange={(e) => setDripText(e.target.value)} style={inputStyle} />
          </Card>

          <Card title="6) Arrangement">
            <Label text="Arrangement preset" />
            <Select value={arrangement} onChange={setArrangement} options={ARRANGEMENTS} />
          </Card>

          <Card title="7) Texture emphasis">
            <Label text="Texture preset" />
            <Select value={texture} onChange={setTexture} options={TEXTURES} />
          </Card>

          <Card title="8) Mood">
            <Label text="Mood preset" />
            <Select value={mood} onChange={setMood} options={MOODS} />
          </Card>

          <Card title="9) Camera & style">
            <Label text="Lighting" />
            <Select value={lighting} onChange={setLighting} options={LIGHTING} />
            <Label text="Camera preset" />
            <Select value={cameraStyle} onChange={setCameraStyle} options={CAMERA_STYLES} />
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {shopifyGridMode ? "Grid Mode ON: lighting + camera are overridden by the locked values." : ""}
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div style={panel}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 16 }}>Output</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => copyText(output || variations.join("\n\n---\n\n"))}
                  style={btn}
                >
                  Copy
                </button>
                <button onClick={clearAll} style={btn}>
                  Clear
                </button>
              </div>
            </div>

            {output ? (
              <textarea readOnly value={output} style={textareaStyle} />
            ) : variations.length ? (
              <textarea readOnly value={variations.join("\n\n---\n\n")} style={textareaStyle} />
            ) : (
              <div style={{ opacity: 0.7, marginTop: 10 }}>
                Click “Generate Prompt” or “Generate 10 Variations”.
              </div>
            )}
          </div>

          <div style={panel}>
            <h2 style={{ margin: 0, fontSize: 16 }}>Negative prompt</h2>
            <textarea
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              style={{ ...textareaStyle, height: 220 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => copyText(negative)} style={btn}>Copy</button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, opacity: 0.55, fontSize: 12 }}>
          Tip: Keep Shopify Grid Mode ON for a consistent product image grid. Turn it OFF when you want creative variety.
        </div>
      </div>

      <PresetManagerModal
        open={presetManagerOpen}
        onClose={() => setPresetManagerOpen(false)}
        presets={presets}
        setPresets={setPresets}
        onApplyPresetKey={(k) => {
          if (!k) return;
          if (presets?.[k]) setPresetKey(k);
          setPresetManagerOpen(false);
        }}
      />
    </div>
  );
}

/* -----------------------------
   Tiny UI helpers (no deps)
------------------------------ */

function Card({ title, children }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 14, padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

function Label({ text }) {
  return <div style={{ fontSize: 12, opacity: 0.75 }}>{text}</div>;
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
      {options.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}

/* -----------------------------
   Styles
------------------------------ */

const panel = {
  background: "#141414",
  border: "1px solid #262626",
  borderRadius: 14,
  padding: 14,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #2a2a2a",
  background: "#0f0f0f",
  color: "white",
  outline: "none",
};

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #2a2a2a",
  background: "#0f0f0f",
  color: "white",
  outline: "none",
};

const textareaStyle = {
  width: "100%",
  height: 320,
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #2a2a2a",
  background: "#0f0f0f",
  color: "white",
  outline: "none",
  whiteSpace: "pre-wrap",
};

const btn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #2a2a2a",
  background: "#1a1a1a",
  color: "white",
  cursor: "pointer",
};

const btnPrimary = {
  ...btn,
  background: "white",
  color: "black",
  border: "1px solid white",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 50,
};

const modalCard = {
  width: "min(1100px, 98vw)",
  background: "#0f0f0f",
  border: "1px solid #2a2a2a",
  borderRadius: 16,
  padding: 16,
};
