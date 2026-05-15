'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { buildPromptV3 } from './index.js'

import {
  WORLD_LOCATIONS,
  STORY_STYLE_WORLDS,
  getWorldById,
} from '../prompt-v2/worlds/index.js'

import { STORY_WORLDS }    from '../prompt-v2/story-worlds/index.js'
import { STORY_CHAPTERS }  from '../prompt-v2/story-chapters/index.js'
import { SIGNATURE_PACKS } from '../prompt-v2/signature-packs/index.js'

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — Cinematic Dark Studio
// ─────────────────────────────────────────────────────────────

const C = {
  // Backgrounds
  void:     '#040404',
  deep:     '#070707',
  base:     '#0a0a0a',
  raised:   '#0d0d0d',
  surface:  '#111111',
  overlay:  '#151515',
  // Borders
  hairline: '#1a1a1a',
  subtle:   '#222222',
  mid:      '#2a2a2a',
  // Text
  primary:  '#e8e4dc',
  secondary:'#8a8680',
  muted:    '#4a4845',
  ghost:    '#2a2825',
  // Accent — Cinematic Gold
  gold:     '#c8a84b',
  goldDim:  '#7a6428',
  goldGlow: '#c8a84b22',
  // Accent — Scene Blue
  blue:     '#4a8ab4',
  blueDim:  '#2a4a6a',
  blueGlow: '#4a8ab422',
  // Progression
  tease:    '#4a7ab4',
  tension:  '#b4944a',
  payoff:   '#b44a4a',
  // Status
  green:    '#4a9a6a',
  greenDim: '#1a3a2a',
  // Mono font
  mono:     '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  // Display font
  display:  '"Georgia", "Times New Roman", serif',
}

// Time of day color palette
const TIME_COLORS = {
  early_morning: '#1a2a4a',
  morning:       '#4a6a8a',
  midday:        '#6a8aaa',
  afternoon:     '#8a7a4a',
  golden_hour:   '#c8843a',
  evening:       '#6a3a6a',
  night:         '#1a1a3a',
  late_night:    '#0a0a1a',
}

const PROG_COLOR = { tease: C.tease, tension: C.tension, payoff: C.payoff }
const pc = l => PROG_COLOR[l] || C.muted

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const CHARACTER_MODES = ['female', 'male', 'couple']
const TOTAL_OPTIONS   = [10, 20, 30, 50, 100]

const AGE_OPTIONS = [
  { value: 'auto',  label: 'Auto'  },
  { value: '18-21', label: '18–21' },
  { value: '22-25', label: '22–25' },
  { value: '25-29', label: '25–29' },
  { value: '30-35', label: '30–35' },
  { value: '35-40', label: '35–40' },
  { value: '40-45', label: '40–45' },
  { value: '45-50', label: '45–50' },
]

// Cinematic director presets — each applies a full visual grammar
const DIRECTOR_PRESETS = [
  {
    id: 'none', label: 'None', icon: '○',
    description: 'Engine defaults',
    overrides: {},
  },
  {
    id: 'kubrick', label: 'Kubrick', icon: '◎',
    description: 'Symmetrical. Cold. Unsettling precision.',
    overrides: { cameraStyle: 'ultra-wide symmetrical one-point perspective, slow deliberate push-in, clinical framing' },
  },
  {
    id: 'wong', label: 'Wong Kar-wai', icon: '◈',
    description: 'Saturated. Blurred longing. Step-printed time.',
    overrides: { cameraStyle: 'shallow focus step-printed motion, saturated warm tones, Wong Kar-wai visual grammar, blurred foreground bokeh, melancholic intimacy' },
  },
  {
    id: 'coppola', label: 'S. Coppola', icon: '◇',
    description: 'Dreamy. Feminine ennui. Pastel distance.',
    overrides: { cameraStyle: 'soft overexposed pastels, hazy window light, distant observational framing, Sofia Coppola aesthetic, ethereal stillness' },
  },
  {
    id: 'fincher', label: 'Fincher', icon: '◆',
    description: 'Desaturated. Precise. Tension in stillness.',
    overrides: { cameraStyle: 'desaturated teal-orange grade, ultra-precise composition, slight low angle, Fincher tension framing, controlled shadow depth' },
  },
  {
    id: 'villeneuve', label: 'Villeneuve', icon: '⬡',
    description: 'Epic scale. Silence. Overwhelming beauty.',
    overrides: { cameraStyle: 'epic wide establishing, overwhelming negative space, Villeneuve grand scale, silence implied through composition, IMAX-quality depth' },
  },
  {
    id: 'noe', label: 'Gaspar Noé', icon: '◉',
    description: 'Sensory overload. Neon. Confrontational.',
    overrides: { cameraStyle: 'neon-saturated high contrast, overhead bird-eye rotation, confrontational intimacy, Gaspar Noé aesthetic, strobe-adjacent intensity' },
  },
]

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const DNA_KEY = 'promptceo_dna_v3'

function dnaLoad() {
  try { return JSON.parse(localStorage.getItem(DNA_KEY) || '[]') } catch { return [] }
}
function dnaSave(p) {
  try { localStorage.setItem(DNA_KEY, JSON.stringify(p)) } catch {}
}

async function copyText(t) {
  try { await navigator.clipboard.writeText(t) } catch {}
}

function getSubLocOpts(w) {
  if (!w?.subLocations) return []
  if (Array.isArray(w.subLocations)) {
    return w.subLocations.map(s => ({ id: s.id, name: s.label || s.name || s.id }))
  }
  return Object.entries(w.subLocations).map(([key, s]) => ({
    id:   key,
    name: s.label || s.name || key,
  }))
}
function getSceneGrpOpts(w, subId) {
  if (!w || !subId) return []
  const subLoc = w?.subLocations?.[subId] || (Array.isArray(w?.subLocations) ? w.subLocations.find(s => s.id === subId) : null)
  const raw = subLoc?.sceneGroups || w?.sceneGroups?.[subId]
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(g => ({ id: g.id, name: g.name || g.id }))
  return Object.entries(raw).map(([key, scenes]) => ({ id: key, name: key.replace(/_/g, ' ') }))
}
function getPhaseOpts(w) {
  if (!w?.phases) return []
  return Object.entries(w.phases).map(([k, v]) => ({ id: k, name: v.label || k }))
}
function getChapterOpts(storyWorldId) {
  if (!storyWorldId) return []
  return STORY_CHAPTERS.filter(c => c.worldId === storyWorldId).map(c => ({ id: c.id, name: c.name }))
}

// ─────────────────────────────────────────────────────────────
// buildInput — FIXED version
// worldId always passes through (auto mode fix)
// progressionLevel owned by layer 03 (engine fix baked in)
// ─────────────────────────────────────────────────────────────

function buildInput(s, overrides = {}) {
  return {
    worldControlMode:    s.worldControlMode,
    worldId:             s.worldControlMode === 'manual' ? s.worldId : s.worldId, // always pass through
    subLocationId:       s.worldControlMode === 'manual' ? s.subLocationId : '',
    sceneGroupId:        s.worldControlMode === 'manual' ? s.sceneGroupId  : '',
    phaseKey:            s.worldControlMode === 'manual' ? s.phaseKey      : '',
    storyWorldId:        s.storyWorldId,
    chapterId:           s.chapterId,
    progressionIndex:    Number(s.progressionIndex),
    totalCount:          Number(s.totalCount),
characterMode:       s.characterMode,
    subjectGender:       s.subjectGender,
    // DNA traits feed directly into identity
    identityName:        s.traits?.subjectA?.name || (s.useIdentity ? s.identityName : ''),
    hasReferenceImage:   s.useIdentity ? s.hasImage : false,
    useExtractedTraits:  !!(
      s.traits?.subjectA?.age        ||
      s.traits?.subjectA?.ethnicity  ||
      s.traits?.subjectA?.hair       ||
      s.traits?.subjectA?.body
    ),
identityName: (
      s.characterMode === 'couple'
        ? s.traits?.subjectA?.name || (s.useIdentity ? s.identityName : '')
        : s.traits?.subjectA?.name || (s.useIdentity ? s.identityName : '')
    ),
    hasReferenceImage:  s.useIdentity ? s.hasImage : false,
    useExtractedTraits: !!(
      s.traits?.subjectA?.age       ||
      s.traits?.subjectA?.ethnicity ||
      s.traits?.subjectA?.hair      ||
      s.traits?.subjectA?.body
    ),
extractedTraits: {
      subjectA: {
        identity:   s.traits?.subjectA?.name      || '',
        age:        s.traits?.subjectA?.age        || '',
        ethnicity:  s.traits?.subjectA?.ethnicity  || '',
        body_shape: [
          s.traits?.subjectA?.body,
          s.traits?.subjectA?.breast,
          s.traits?.subjectA?.glutes,
        ].filter(Boolean).join(', ') || '',
        eye_color:  s.traits?.subjectA?.eyes       || '',
        hair:       s.traits?.subjectA?.hair       || '',
      },
      subjectB: {
        identity:   s.traits?.subjectB?.name      || '',
        age:        s.traits?.subjectB?.age        || '',
        ethnicity:  s.traits?.subjectB?.ethnicity  || '',
        body_shape: s.traits?.subjectB?.body       || '',
        eye_color:  s.traits?.subjectB?.eyes       || '',
        hair:       s.traits?.subjectB?.hair       || '',
      },
    },
    plan:                'Unrestricted',
    previousOutputs:     Array.isArray(s.prevOutputs) ? s.prevOutputs : [],
    directorPreset:      s.directorPreset !== 'none' ? s.directorPreset : undefined,
    ...overrides,
  }
}

// ─────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────

const INIT = {
  // World
  worldControlMode: 'auto',
  worldId:          '',
  subLocationId:    '',
  sceneGroupId:     '',
  phaseKey:         '',
  storyWorldId:     'luxury-life',
  chapterId:        '',
  packId:           '',
  // Progression
  progressionIndex: 0,
  totalCount:       30,
  // Character
  characterMode:    'female',
  subjectGender:    'female',
  // Identity
  useIdentity:      false,
  identityName:     '',
  hasImage:         false,
  imageDataUrl:     '',
  scanState:        'idle',
  scanError:        '',
  useTraits:        false,
  identityStrength: 100,
  ageRange:         'auto',
  continuityLock:   false,
characterMode:  'female',
  traits: {
    subjectA: {
      name: '', age: '', ethnicity: '', body: '', eyes: '', hair: '',
      locked: { name: false, age: false, ethnicity: false, body: false, eyes: false, hair: false },
    },
    subjectB: {
      name: '', age: '', ethnicity: '', body: '', eyes: '', hair: '',
      locked: { name: false, age: false, ethnicity: false, body: false, eyes: false, hair: false },
    },
  },
  prevOutputs:      [],
  // Director
  directorPreset:   'none',
  // UI
  view:             'studio',   // 'studio' | 'director' | 'timeline'
  credits:          null,
  creditsLoading:   false,
  generatedImage:   '',
  imageGenerating:  false,
  imageError:       '',
  batchImages:      [],
  batchImgRunning:  false,
  batchImgProgress: 0,
}

// ─────────────────────────────────────────────────────────────
// MICRO COMPONENTS
// ─────────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
      textTransform: 'uppercase', color: C.muted, marginBottom: 4,
    }}>
      {children}
    </div>
  )
}

function Pill({ color, children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '1px 6px', borderRadius: 999,
      fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
      background: (color || C.muted) + '18',
      border: `1px solid ${(color || C.muted)}33`,
      color: color || C.muted,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

function Chip({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '1px 6px', borderRadius: 999,
      fontSize: 9, fontWeight: 700,
      background: C.surface, border: `1px solid ${C.hairline}`,
      color: C.muted, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

function Inp({ value, onChange, placeholder, type = 'text', min, max, disabled }) {
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} min={min} max={max} disabled={disabled}
      style={{
        width: '100%', background: C.deep, color: C.primary,
        border: `1px solid ${C.hairline}`, borderRadius: 4,
        padding: '6px 8px', fontSize: 11, outline: 'none',
        boxSizing: 'border-box', fontFamily: 'inherit',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => { e.target.style.borderColor = C.goldDim }}
      onBlur={e => { e.target.style.borderColor = C.hairline }}
    />
  )
}

function Sel({ value, onChange, options, placeholder, disabled }) {
  return (
    <select
      value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
      style={{
        width: '100%', background: C.deep, color: C.primary,
        border: `1px solid ${C.hairline}`, borderRadius: 4,
        padding: '6px 8px', fontSize: 11, outline: 'none',
        boxSizing: 'border-box', fontFamily: 'inherit',
      }}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o, i) => {
        const key = o?.id ?? o?.value ?? `opt-${i}`
        const val = o?.id ?? o?.value ?? ''
        const label = o?.name || o?.label || o?.id || String(val)
        return (
          <option key={key} value={val}>{label}</option>
        )
      })}
    </select>
  )
}

function Btn({ children, onClick, disabled, variant = 'default', style: sx }) {
  const variants = {
    default: { bg: C.surface, border: C.subtle, color: C.secondary },
    gold:    { bg: '#1a1408', border: C.goldDim, color: C.gold },
    blue:    { bg: '#080e18', border: C.blueDim, color: C.blue },
    danger:  { bg: '#0e0808', border: '#2a1010', color: '#7a3a3a' },
    green:   { bg: C.greenDim, border: '#2a4a2a', color: C.green },
    ghost:   { bg: 'transparent', border: 'transparent', color: C.muted },
  }
  const v = variants[variant] || variants.default
  return (
    <button
      onClick={onClick} disabled={disabled}
      style={{
        padding: '5px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: `1px solid ${v.border}`,
        background: v.bg, color: v.color,
        whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.15s',
        ...sx,
      }}
    >
      {children}
    </button>
  )
}

// Collapsible Panel
function Panel({ title, badge, right, accent, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
<div style={{
      background: C.base,
      borderTop: `1px solid ${C.hairline}`,
      borderRight: `1px solid ${C.hairline}`,
      borderBottom: `1px solid ${C.hairline}`,
      borderLeft: accent ? `2px solid ${accent}` : `1px solid ${C.hairline}`,
      borderRadius: 6, overflow: 'hidden', flexShrink: 0,
    }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '8px 11px', background: C.raised,
          borderBottom: open ? `1px solid ${C.hairline}` : 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 1.1,
            textTransform: 'uppercase',
            color: accent ? accent + 'cc' : C.muted,
          }}>
            {title}
          </span>
          {badge}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {right}
          <span style={{ fontSize: 8, color: C.ghost }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>}
    </div>
  )
}

// Segmented control
function Seg({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {options.map(o => {
        const active = value === (o.value ?? o)
        return (
          <button
            key={o.value ?? o}
            onClick={() => onChange(o.value ?? o)}
            style={{
              flex: 1, padding: '4px 0', borderRadius: 3,
              fontSize: 10, fontWeight: 700, cursor: 'pointer',
              textAlign: 'center',
              border: `1px solid ${active ? C.goldDim : C.hairline}`,
              background: active ? '#1a1408' : C.deep,
              color: active ? C.gold : C.muted,
              transition: 'all 0.15s',
            }}
          >
            {o.label ?? o}
          </button>
        )
      })}
    </div>
  )
}

// Track / progress bar
function Track({ value, max, color }) {
  const pct = Math.min(100, Math.max(0, (value / Math.max(max, 1)) * 100))
  return (
    <div style={{ height: 3, background: C.raised, borderRadius: 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: color || C.gold, borderRadius: 2,
        transition: 'width 0.2s',
      }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SCENE CARD — single prompt result in timeline
// ─────────────────────────────────────────────────────────────

function SceneCard({ result, index, total, onClick, isActive, compact }) {
  const level = result.meta?.progressionLevel || 'tease'
  const tod   = (result.meta?.timeOfDay || '').replace(/_/g, ' ')
  const todColor = TIME_COLORS[result.meta?.timeOfDay] || C.deep

  if (compact) {
    return (
      <div
        onClick={onClick}
        title={`Scene ${index + 1} — ${level} — ${tod}`}
        style={{
          flex: 1, minWidth: 0,
          height: level === 'tease' ? 20 : level === 'tension' ? 32 : 44,
          background: isActive
            ? `linear-gradient(180deg, ${pc(level)}88, ${pc(level)}44)`
            : `linear-gradient(180deg, ${todColor}88, ${todColor}44)`,
          border: `1px solid ${isActive ? pc(level) : C.hairline}`,
          borderRadius: 3, cursor: 'pointer',
          transition: 'all 0.15s',
          position: 'relative',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        {isActive && (
          <div style={{
            position: 'absolute', top: -1, left: 0, right: 0,
            height: 2, background: pc(level), borderRadius: '2px 2px 0 0',
          }} />
        )}
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      style={{
background: isActive ? C.surface : C.base,
        borderTop: `1px solid ${isActive ? pc(level) + '66' : C.hairline}`,
        borderRight: `1px solid ${isActive ? pc(level) + '66' : C.hairline}`,
        borderBottom: `1px solid ${isActive ? pc(level) + '66' : C.hairline}`,
        borderLeft: `3px solid ${pc(level)}`,
        borderRadius: 6, padding: '10px 11px', cursor: 'pointer',
        transition: 'all 0.15s', flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 9, color: C.muted, fontWeight: 700, minWidth: 22 }}>
          #{index + 1}
        </span>
        <Pill color={pc(level)}>{level}</Pill>
        <Pill color={todColor || C.muted}>{tod}</Pill>
        {result.meta?.envFamily && <Pill color={C.blue}>{result.meta.envFamily}</Pill>}
        {result.warnings?.length > 0 && (
          <Pill color={C.tension}>{result.warnings.length}w</Pill>
        )}
        <Track value={index + 1} max={total} color={pc(level)} />
      </div>
      <div style={{
        fontSize: 11, color: C.secondary, fontFamily: C.mono,
        lineHeight: 1.6, wordBreak: 'break-word',
      }}>
        {(result.finalPrompt || '(empty)').slice(0, 120)}
        {(result.finalPrompt || '').length > 120 ? '…' : ''}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DIRECTOR'S CHAIR VIEW — cinematic fullscreen mode
// ─────────────────────────────────────────────────────────────

function DirectorsChair({ batch, currentIndex, onClose, onNavigate }) {
  const current = batch[currentIndex]
  if (!current) return null

  const level  = current.meta?.progressionLevel || 'tease'
  const tod    = (current.meta?.timeOfDay || '').replace(/_/g, ' ')
  const todKey = current.meta?.timeOfDay || 'morning'
  const bg     = TIME_COLORS[todKey] || '#0a0a1a'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: C.void,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${bg}88 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Film slate header */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${C.hairline}`,
        background: 'rgba(4,4,4,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Slate clapper icon */}
          <div style={{
            width: 36, height: 36, background: C.surface,
            border: `1px solid ${C.subtle}`,
            borderRadius: 4, display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 16 }}>🎬</span>
          </div>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: C.gold, marginBottom: 2,
            }}>
              PROMPT CEO — DIRECTOR'S CHAIR
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: C.muted }}>
                Scene {currentIndex + 1} of {batch.length}
              </span>
              <Pill color={pc(level)}>{level}</Pill>
              <Pill color={TIME_COLORS[todKey] || C.muted}>{tod}</Pill>
            </div>
          </div>
        </div>
        <Btn variant="ghost" onClick={onClose} sx={{ fontSize: 13 }}>✕ Exit</Btn>
      </div>

      {/* Main prompt display */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 80px',
        overflow: 'hidden',
      }}>
        {/* Arc indicator */}
        <div style={{
          position: 'absolute', top: 24, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 3,
        }}>
          {batch.map((r, i) => (
            <div
              key={i}
              onClick={() => onNavigate(i)}
              style={{
                width: i === currentIndex ? 24 : 6,
                height: 3, borderRadius: 2,
                background: i === currentIndex
                  ? pc(r.meta?.progressionLevel || 'tease')
                  : C.ghost,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* The prompt */}
        <div style={{
          maxWidth: 820, width: '100%',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: C.goldDim,
            marginBottom: 28, fontFamily: C.display,
          }}>
            {current.meta?.primaryWorldId?.replace(/_/g, ' ').toUpperCase() || 'SCENE'}
          </div>
          <div style={{
            fontSize: 15, lineHeight: 2.1,
            color: C.primary, fontFamily: C.mono,
            wordBreak: 'break-word',
            textShadow: `0 0 60px ${pc(level)}33`,
          }}>
            {current.finalPrompt || '(empty)'}
          </div>
          {current.meta?.envFamily && (
            <div style={{
              marginTop: 28, fontSize: 10, color: C.muted,
              letterSpacing: 2, textTransform: 'uppercase',
              fontFamily: C.display,
            }}>
              {current.meta.envFamily} · {tod} · {level}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        borderTop: `1px solid ${C.hairline}`,
        background: 'rgba(4,4,4,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <Btn
          variant="default"
          disabled={currentIndex === 0}
          onClick={() => onNavigate(currentIndex - 1)}
          sx={{ minWidth: 100 }}
        >
          ← Previous
        </Btn>
        <span style={{ fontSize: 11, color: C.muted, minWidth: 80, textAlign: 'center' }}>
          {currentIndex + 1} / {batch.length}
        </span>
        <Btn
          variant="default"
          disabled={currentIndex === batch.length - 1}
          onClick={() => onNavigate(currentIndex + 1)}
          sx={{ minWidth: 100 }}
        >
          Next →
        </Btn>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

const TRAIT_FIELDS_FEMALE = [
  { key: 'name',      label: 'Name',      placeholder: 'e.g. Sofia'                    },
  { key: 'age',       label: 'Age',       placeholder: 'e.g. 26 years old'             },
  { key: 'ethnicity', label: 'Ethnicity', placeholder: 'e.g. Southern European'        },
  { key: 'body',      label: 'Body',      placeholder: 'e.g. slim athletic build'      },
  { key: 'breast',    label: 'Bust',      placeholder: 'e.g. medium proportional bust' },
  { key: 'glutes',    label: 'Glutes',    placeholder: 'e.g. rounded feminine glutes'  },
  { key: 'eyes',      label: 'Eyes',      placeholder: 'e.g. dark brown eyes'          },
  { key: 'hair',      label: 'Hair',      placeholder: 'e.g. long dark wavy hair'      },
]

const TRAIT_FIELDS_MALE = [
  { key: 'name',      label: 'Name',      placeholder: 'e.g. Marcus'                  },
  { key: 'age',       label: 'Age',       placeholder: 'e.g. 32 years old'             },
  { key: 'ethnicity', label: 'Ethnicity', placeholder: 'e.g. Southern European'        },
  { key: 'body',      label: 'Body',      placeholder: 'e.g. athletic muscular build'  },
  { key: 'eyes',      label: 'Eyes',      placeholder: 'e.g. dark brown eyes'          },
  { key: 'hair',      label: 'Hair',      placeholder: 'e.g. short dark hair'          },
]

// DNA libraries — picked directly from V2
const DNA_LIBRARIES = {
  name: [],
  age: [
    '18 years old, youthful, soft feminine energy, fresh and natural presence',
    '20 years old, playful, social, light confident energy',
    '22 years old, athletic, energetic, modern lifestyle confidence',
    '24 years old, confident, expressive, socially magnetic',
    '25 years old, peak feminine aesthetic, confident and visually magnetic',
    '27 years old, balanced, feminine, self-aware confidence',
    '28 years old, refined, composed, high-value feminine presence',
    '29 years old, polished, attractive, socially powerful presence',
    '30 years old, elegant, controlled, emotionally grounded confidence',
    '32 years old, polished, self-assured, sophisticated feminine energy',
    '35 years old, powerful, composed, high-status presence',
    '38 years old, elegant authority, calm and confident identity',
    '40 years old, refined, strong, effortlessly feminine presence',
    '45 years old, confident, graceful, mature feminine power',
    '48 years old, polished, grounded, elegant high-value presence',
    '50 years old, elegant, high-value, composed and respected presence',
  ],
  age_male: [
    '22 years old, energetic, athletic, modern masculine confidence',
    '25 years old, sharp, composed, quietly magnetic presence',
    '28 years old, refined, self-assured, high-status masculine energy',
    '30 years old, polished, controlled, sophisticated masculine identity',
    '32 years old, powerful, composed, emotionally grounded confidence',
    '35 years old, authoritative, calm, visually commanding presence',
    '38 years old, distinguished, strong, quietly dominant identity',
    '40 years old, refined, powerful, effortlessly high-status presence',
    '45 years old, experienced, composed, deeply confident masculine energy',
  ],
  ethnicity: [
    'European',
    'Nordic',
    'Mediterranean',
    'Latina',
    'East Asian',
    'South Asian',
    'Middle Eastern',
    'Black',
    'Mixed ethnicity',
  ],
  body: [
    'Slim feminine frame',
    'Athletic toned build',
    'Curvy hourglass shape',
    'Soft feminine curves',
    'Lean dancer-like physique',
    'Fit model proportions',
  ],
  body_male: [
    'Athletic muscular build',
    'Lean athletic physique',
    'Broad shouldered strong frame',
    'Fit toned masculine build',
    'Powerful muscular physique',
    'Tall lean masculine frame',
  ],
  breast: [
    'Small natural bust',
    'Medium proportional bust',
    'Full natural bust',
    'Full round bust, soft shape',
  ],
  glutes: [
    'Subtle athletic glutes',
    'Rounded feminine glutes',
    'Full sculpted glutes',
    'Strong curvy glutes',
  ],
  eyes: [
    'Dark brown eyes',
    'Light brown eyes',
    'Green eyes',
    'Blue eyes',
    'Hazel eyes',
    'Grey eyes',
    'Deep dark eyes',
    'Bright expressive eyes',
  ],
  hair: [
    'Long dark hair, loose waves',
    'Long blonde hair, soft curls',
    'Medium-length hair, straight and sleek',
    'Short bob haircut, clean lines',
    'High ponytail, sporty and confident',
    'Messy bun, casual and intimate',
    'Long auburn hair, natural waves',
    'Platinum blonde, straight and polished',
    'Dark brown hair, beachy waves',
    'Short pixie cut, editorial edge',
  ],
  hair_male: [
    'Short dark hair, clean cut',
    'Short blonde hair, textured',
    'Medium length dark hair, swept back',
    'Buzz cut, sharp and clean',
    'Short curly hair, natural texture',
    'Slicked back dark hair, polished',
  ],
}

function SubjectTraits({ label, traits, accentColor, onChange, onToggleLock, isMale }) {
  const fields = isMale ? TRAIT_FIELDS_MALE : TRAIT_FIELDS_FEMALE

  return (
    <div style={{
      background: C.void,
      border: `1px solid ${accentColor}33`,
      borderLeft: `2px solid ${accentColor}`,
      borderRadius: 4,
      padding: '8px 9px',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
        textTransform: 'uppercase', color: accentColor, marginBottom: 4,
      }}>
        {label}
      </div>
      {fields.map(({ key, label: fl, placeholder }) => {
        const locked = traits?.locked?.[key] || false
        const libKey = isMale && DNA_LIBRARIES[`${key}_male`]
          ? `${key}_male`
          : key
        const library = DNA_LIBRARIES[libKey] || []

        return (
          <div key={key} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '4px 0', borderBottom: `1px solid #0a0a0a`,
          }}>
            {/* Field label + lock */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700,
                color: locked ? accentColor : C.muted,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>
                {fl}
              </span>
              <button
                onClick={() => onToggleLock(key)}
                title={locked ? 'Unlock' : 'Lock'}
                style={{
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', fontSize: 9,
                  color: locked ? accentColor : C.ghost,
                  padding: 0, lineHeight: 1,
                }}
              >
                {locked ? '🔒' : '○'}
              </button>
            </div>

            {/* Library dropdown */}
            {library.length > 0 && !locked && (
              <select
                value=""
                onChange={e => {
                  if (e.target.value) onChange(key, e.target.value)
                }}
                style={{
                  width: '100%', background: C.raised, color: C.secondary,
                  border: `1px solid ${C.hairline}`, borderRadius: 3,
                  padding: '3px 5px', fontSize: 9, outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">Pick from library…</option>
                {library.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            )}

            {/* Text input */}
            <input
              style={{
                background: 'transparent', color: locked ? C.muted : C.primary,
                border: `1px solid ${locked ? C.hairline : C.hairline}`,
                borderRadius: 3, fontSize: 10, outline: 'none',
                fontFamily: 'inherit', padding: '3px 6px',
                background: C.deep,
              }}
              value={traits?.[key] || ''}
              onChange={e => !locked && onChange(key, e.target.value)}
              placeholder={locked ? '— locked —' : placeholder}
              readOnly={locked}
            />
          </div>
        )
      })}
    </div>
  )
}

export default function PromptCEOPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace('/prompt-engine-v3/login')
      }
    }
    checkSession()
  }, [])
  const [s, setS]   = useState(INIT)
  const set         = useCallback((k, v) => setS(p => ({ ...p, [k]: v })), [])
  const merge       = useCallback(patch  => setS(p => ({ ...p, ...patch })), [])

  const [result,       setResult]       = useState(null)
  const [batch,        setBatch]        = useState([])
  const [batchRun,     setBatchRun]     = useState(false)
  const [batchProg,    setBatchProg]    = useState(0)
  const [activeScene,  setActiveScene]  = useState(0)
  const [directorOpen, setDirectorOpen] = useState(false)
  const [outputTab,    setOutputTab]    = useState('output')
  const [copied,       setCopied]       = useState('')
  const [saved,        setSaved]        = useState([])
  const [dnaProfiles,  setDnaProfiles]  = useState([])
  const [dnaSelected,  setDnaSelected]  = useState('')
  const [regenState,   setRegenState]   = useState({})
  const stopRef = useRef(false)

  // ── Derived ───────────────────────────────────────────────
  const worldObj    = useMemo(() => s.worldId ? getWorldById(s.worldId) : null, [s.worldId])
  const subLocOpts  = useMemo(() => getSubLocOpts(worldObj), [worldObj])
  const sceneGOpts  = useMemo(() => getSceneGrpOpts(worldObj, s.subLocationId), [worldObj, s.subLocationId])
  const phaseOpts   = useMemo(() => getPhaseOpts(worldObj), [worldObj])
  const chapterOpts = useMemo(() => getChapterOpts(s.storyWorldId), [s.storyWorldId])
  const activePack  = useMemo(() => SIGNATURE_PACKS.find(p => p.id === s.packId) || null, [s.packId])
  const activeCh    = useMemo(() => STORY_CHAPTERS.find(c => c.id === s.chapterId) || null, [s.chapterId])

  const progLevel = useMemo(() => {
    const r = s.progressionIndex / Math.max(s.totalCount - 1, 1)
    return r < 0.33 ? 'tease' : r < 0.66 ? 'tension' : 'payoff'
  }, [s.progressionIndex, s.totalCount])

  const activeDirectorPreset = useMemo(
    () => DIRECTOR_PRESETS.find(d => d.id === s.directorPreset) || DIRECTOR_PRESETS[0],
    [s.directorPreset]
  )

  // Cascades
  useEffect(() => { merge({ subLocationId: '', sceneGroupId: '', phaseKey: '' }) }, [s.worldId])
  useEffect(() => { set('sceneGroupId', '') }, [s.subLocationId])
  useEffect(() => { set('chapterId', '') }, [s.storyWorldId])

  // DNA init
  useEffect(() => { setDnaProfiles(dnaLoad()) }, [])

  // Credits
  useEffect(() => {
    set('creditsLoading', true)
    fetch('/api/get-credits')
      .then(r => r.json())
      .then(d => { if (d?.status === 'success') set('credits', d.credits) })
      .catch(() => {})
      .finally(() => set('creditsLoading', false))
  }, [])

  // ── Generate ──────────────────────────────────────────────
  const generate = useCallback(() => {
    const r = buildPromptV3(buildInput(s))
    setResult(r)
    setOutputTab('output')
    if (s.continuityLock && r.finalPrompt) {
      setS(p => ({ ...p, prevOutputs: [...(p.prevOutputs || []).slice(-5), r.finalPrompt] }))
    }
  }, [s])

  const runBatch = useCallback(async () => {
    setBatchRun(true)
    setBatch([])
    setBatchProg(0)
    setActiveScene(0)
    stopRef.current = false
    const total = Number(s.totalCount) || 30
    const res   = []
for (let i = 0; i < total; i++) {
      if (stopRef.current) break
      let r
      try {
        r = buildPromptV3(buildInput({ ...s, progressionIndex: i, totalCount: total }))
      } catch (err) {
        console.error(`Scene ${i + 1} failed:`, err)
        r = { finalPrompt: `(generation failed: ${err?.message})`, meta: {}, layers: {}, warnings: [String(err)] }
      }
      res.push({ ...r, _i: i })
      setBatch([...res])
      setBatchProg(i + 1)
      await new Promise(resolve => setTimeout(resolve, 0))
    }
setBatchRun(false)
    set('view', 'timeline')
  }, [s])

  const regenLayer = useCallback(layer => {
    setRegenState(p => ({ ...p, [layer]: true }))
    // FIXED: use current progressionIndex, not +1
    const r = buildPromptV3(buildInput({ ...s, progressionIndex: s.progressionIndex }))
    setResult(prev => !prev ? r : {
      ...r,
      layers:      { ...prev.layers, [layer]: r.layers[layer] },
      finalPrompt: r.finalPrompt,
    })
    setTimeout(() => setRegenState(p => ({ ...p, [layer]: false })), 900)
  }, [s])

  // ── Identity scan ─────────────────────────────────────────
  const scanIdentity = async () => {
    if (!s.imageDataUrl) { merge({ scanError: 'Upload an image first.' }); return }
    merge({ scanState: 'scanning', scanError: '' })
    let data
    try {
      const res = await fetch('/api/identity/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageDataUrl: s.imageDataUrl, image: s.imageDataUrl,
          requestFields: ['gender', 'characterMode', 'age', 'ethnicity', 'body_shape', 'eye_color', 'hair', 'identity'],
        }),
      })
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      data = await res.json()
    } catch (err) {
      merge({ scanState: 'idle', scanError: `Scan failed: ${err.message}` })
      return
    }

    const TRAIT_FIELDS = ['age', 'ethnicity', 'body_shape', 'eye_color', 'hair', 'identity']
    const hasUseful = obj => obj && typeof obj === 'object' && TRAIT_FIELDS.some(f => typeof obj[f] === 'string' && obj[f].trim())
    const extract   = obj => ({
      identity:   String(obj?.identity   || '').trim(),
      age:        String(obj?.age        || '').trim(),
      ethnicity:  String(obj?.ethnicity  || '').trim(),
      body_shape: String(obj?.body_shape || '').trim(),
      eye_color:  String(obj?.eye_color  || '').trim(),
      hair:       String(obj?.hair       || '').trim(),
    })

    const subjectB    = data?.traits?.subjectB
    const hasSubjectB = hasUseful(subjectB)
    const resolved    = [data?.traits?.subjectA, data?.extractedTraits?.subjectA, data?.extractedTraits, data?.subjectA, data].find(hasUseful)

    if (!resolved) { merge({ scanState: 'idle', scanError: 'No traits returned. Check API.' }); return }

    const scanText = JSON.stringify(data).toLowerCase()
    const subjectATraits = data?.traits?.subjectA || {}
    const genderSignals = [
      subjectATraits.identity,
      subjectATraits.body_shape,
      subjectATraits.build,
      subjectATraits.facial_hair,
      subjectATraits.hair,
    ].filter(Boolean).join(' ').toLowerCase()

    const looksMale =
      /\b(man|male|masculine|beard|mustache|facial hair|broad shoulders|broad|muscular)\b/.test(genderSignals)

    const looksFemale =
      /\b(woman|female|feminine|long hair|long wavy|long blonde|long dark)\b/.test(genderSignals)

    let detectedGender = 'female', detectedCharMode = 'female'

    if (hasSubjectB || /\bcouple\b|\btwo people\b/.test(scanText)) {
      detectedGender = 'female'; detectedCharMode = 'couple'
    } else if (looksMale && !looksFemale) {
      detectedGender = 'male'; detectedCharMode = 'male'
    } else if (looksFemale && !looksMale) {
      detectedGender = 'female'; detectedCharMode = 'female'
    }

merge({
      scanState: 'done', scanError: '', hasImage: true, useIdentity: true, useTraits: true,
      subjectGender: detectedGender, characterMode: detectedCharMode,
      traits: {
        subjectA: {
          name:      s.identityName                || '',
          age:       extract(resolved).age         || '',
          ethnicity: extract(resolved).ethnicity   || '',
          body:      extract(resolved).body_shape  || '',
          eyes:      extract(resolved).eye_color   || '',
          hair:      extract(resolved).hair        || '',
          locked:    s.traits?.subjectA?.locked    || {},
        },
        subjectB: hasSubjectB ? {
          name:      '',
          age:       extract(subjectB).age         || '',
          ethnicity: extract(subjectB).ethnicity   || '',
          body:      extract(subjectB).body_shape  || '',
          eyes:      extract(subjectB).eye_color   || '',
          hair:      extract(subjectB).hair        || '',
          locked:    s.traits?.subjectB?.locked    || {},
        } : s.traits.subjectB,
      },
    })
    set('characterMode', detectedCharMode)
  }

  const onImg = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => merge({ imageDataUrl: reader.result, hasImage: true, scanState: 'idle', scanError: '' })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ── Copy / Save ───────────────────────────────────────────
  const doCopy = async (text, key) => {
    await copyText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1600)
  }

  const saveResult = () => {
    if (!result?.finalPrompt) return
    setSaved(p => [{
      id: Date.now(), prompt: result.finalPrompt,
      meta: result.meta, ts: new Date().toLocaleTimeString(),
    }, ...p].slice(0, 50))
  }

  // ── Export ────────────────────────────────────────────────
  const exportBatch = () => {
    const text = batch.map((r, i) =>
      `=== Scene ${i + 1} [${r.meta?.progressionLevel} / ${(r.meta?.timeOfDay || '').replace(/_/g, ' ')}] ===\n${r.finalPrompt}`
    ).join('\n\n')
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
      download: `promptceo-${Date.now()}.txt`,
    })
    a.click()
  }

  const exportStoryboard = () => {
    // Plain HTML storyboard — opens in new tab
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prompt CEO — Storyboard</title>
  <style>
    body { background:#040404; color:#e8e4dc; font-family:'Georgia',serif; padding:40px; }
    h1 { font-size:18px; letter-spacing:3px; text-transform:uppercase; color:#c8a84b; margin-bottom:32px; }
    .scene { border:1px solid #1a1a1a; border-radius:8px; padding:20px 24px; margin-bottom:16px; border-left:3px solid #4a7ab4; }
    .meta { font-size:10px; letter-spacing:1px; text-transform:uppercase; color:#4a4845; margin-bottom:10px; }
    .prompt { font-family:'JetBrains Mono',monospace; font-size:12px; line-height:1.9; color:#8a8680; }
    .slate { font-size:11px; color:#c8a84b; font-weight:700; margin-bottom:4px; }
  </style>
</head>
<body>
  <h1>Prompt CEO — Storyboard Export</h1>
  ${batch.map((r, i) => `
  <div class="scene">
    <div class="slate">Scene ${i + 1}</div>
    <div class="meta">${r.meta?.progressionLevel || ''} · ${(r.meta?.timeOfDay || '').replace(/_/g, ' ')} · ${r.meta?.envFamily || ''}</div>
    <div class="prompt">${r.finalPrompt || '(empty)'}</div>
  </div>
  `).join('')}
</body>
</html>`
    const w = window.open()
    w.document.write(html)
    w.document.close()
  }

  // ── DNA ───────────────────────────────────────────────────
  const dnaSaveProfile = useCallback(() => {
    const name    = s.identityName?.trim() || `Profile ${Date.now()}`
    const profile = {
      id: Date.now(), name,
      characterMode: s.characterMode, subjectGender: s.subjectGender,
      imageDataUrl: s.imageDataUrl, hasImage: s.hasImage,
      useIdentity: s.useIdentity, useTraits: s.useTraits,
      identityStrength: s.identityStrength, ageRange: s.ageRange,
      traits: s.traits,
    }
    const updated = [...dnaLoad().filter(p => p.name !== name), profile]
    dnaSave(updated)
    setDnaProfiles(updated)
    setDnaSelected(String(profile.id))
  }, [s])

  const dnaLoadProfile = useCallback(id => {
    const p = dnaLoad().find(x => String(x.id) === String(id))
    if (!p) return
    merge({
      identityName: p.name, characterMode: p.characterMode || 'female',
      subjectGender: p.subjectGender || 'female', imageDataUrl: p.imageDataUrl || '',
      hasImage: p.hasImage || false, useIdentity: p.useIdentity || false,
      useTraits: p.useTraits || false, identityStrength: p.identityStrength ?? 100,
      ageRange: p.ageRange || 'auto', traits: p.traits || INIT.traits,
    })
    setDnaSelected(String(id))
  }, [merge])

  const dnaDeleteProfile = useCallback(id => {
    const updated = dnaLoad().filter(p => String(p.id) !== String(id))
    dnaSave(updated)
    setDnaProfiles(updated)
    if (dnaSelected === String(id)) setDnaSelected('')
  }, [dnaSelected])

  // ── Image generation ──────────────────────────────────────
  const generateImage = useCallback(async () => {
    if (!result?.finalPrompt) return
    if (!s.imageDataUrl) { merge({ imageError: 'Upload an identity image first.' }); return }
    merge({ imageGenerating: true, imageError: '', generatedImage: '' })
    try {
      const res  = await fetch('/api/generate-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: result.finalPrompt, imageDataUrl: s.imageDataUrl,
          identity: { image: s.imageDataUrl }, extractedTraits: s.traits?.subjectA || {},
        }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        merge({ generatedImage: data.imageUrl, imageGenerating: false })
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      } else {
        merge({ imageError: data?.message || 'Generation failed', imageGenerating: false })
      }
    } catch (err) {
      merge({ imageError: err.message, imageGenerating: false })
    }
  }, [result, s, merge, set])

  const generateBatchImages = useCallback(async () => {
    if (!batch.length || !s.imageDataUrl) return
    merge({ batchImgRunning: true, batchImgProgress: 0, batchImages: [] })
    stopRef.current = false
    const images = []
    for (let i = 0; i < batch.length; i++) {
      if (stopRef.current) break
      const r = batch[i]
      if (!r.finalPrompt) { images.push({ index: i, error: 'empty' }); continue }
      try {
        const res  = await fetch('/api/generate-image', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: r.finalPrompt, imageDataUrl: s.imageDataUrl,
            identity: { image: s.imageDataUrl }, extractedTraits: s.traits?.subjectA || {},
          }),
        })
        const data = await res.json()
        if (data?.status === 'complete') {
          images.push({ index: i, imageUrl: data.imageUrl, prompt: r.finalPrompt, meta: r.meta })
          if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
        } else {
          images.push({ index: i, error: data?.message || 'failed', prompt: r.finalPrompt })
        }
      } catch (err) {
        images.push({ index: i, error: err.message })
      }
      merge({ batchImgProgress: i + 1, batchImages: [...images] })
      await new Promise(r => setTimeout(r, 300))
    }
    merge({ batchImgRunning: false })
  }, [batch, s, merge, set])

  // ── Resets ────────────────────────────────────────────────
  const rAll = () => {
    setS(INIT); setResult(null); setBatch([]); setSaved([])
    setActiveScene(0); setOutputTab('output')
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────

  return (
    <>
      {/* Director's Chair overlay */}
      {directorOpen && batch.length > 0 && (
        <DirectorsChair
          batch={batch}
          currentIndex={activeScene}
          onClose={() => setDirectorOpen(false)}
          onNavigate={i => { setActiveScene(i); set('progressionIndex', i) }}
        />
      )}

      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        background: C.void, color: C.primary,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 12, overflow: 'hidden',
      }}>

        {/* ── TOP BAR ─────────────────────────────────────── */}
        <div style={{
          flexShrink: 0, height: 48,
          background: C.deep,
          borderBottom: `1px solid ${C.hairline}`,
          display: 'flex', alignItems: 'center',
          padding: '0 16px', gap: 12, zIndex: 100,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28,
              background: `linear-gradient(135deg, ${C.goldDim}, ${C.gold}44)`,
              border: `1px solid ${C.goldDim}`,
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
            }}>
              🎬
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', color: C.gold,
                fontFamily: C.display,
              }}>
                PROMPT CEO
              </div>
              <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1 }}>
                DIRECTOR'S STUDIO
              </div>
            </div>
          </div>

          <div style={{ width: 1, height: 20, background: C.hairline }} />

          {/* View switcher */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[
              { id: 'studio',   label: '◧ Studio'   },
              { id: 'timeline', label: '▤ Timeline'  },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => set('view', v.id)}
                style={{
                  padding: '3px 10px', borderRadius: 3,
                  fontSize: 10, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${s.view === v.id ? C.goldDim : 'transparent'}`,
                  background: s.view === v.id ? '#1a1408' : 'transparent',
                  color: s.view === v.id ? C.gold : C.muted,
                  letterSpacing: 0.5,
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Director preset badge */}
          {s.directorPreset !== 'none' && (
            <div style={{
              padding: '3px 10px', borderRadius: 3,
              fontSize: 9, fontWeight: 700, letterSpacing: 1,
              background: C.goldGlow, border: `1px solid ${C.goldDim}`,
              color: C.gold, textTransform: 'uppercase',
            }}>
              {activeDirectorPreset.icon} {activeDirectorPreset.label} Mode
            </div>
          )}

          {/* Credits */}
          <div style={{
            padding: '3px 10px', borderRadius: 3, fontSize: 10, fontWeight: 700,
            background: C.blueGlow, border: `1px solid ${C.blueDim}`, color: C.blue,
          }}>
            {s.creditsLoading ? '…' : s.credits === null ? '—' : `⚡ ${s.credits}`}
          </div>

          <select
            onChange={e => {
              if (!e.target.value) return
              fetch('/api/create-checkout', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: e.target.value, returnPath: 'prompt-engine-v3' }),
              }).then(r => r.json()).then(d => { if (d?.url) window.location.href = d.url }).catch(() => {})
            }}
            style={{
              background: '#080e18', color: C.blue,
              border: `1px solid ${C.blueDim}`, borderRadius: 4,
              padding: '4px 8px', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', outline: 'none',
            }}
            value=""
          >
            <option value="" disabled>+ Credits</option>
            <option value="50">50 credits</option>
            <option value="100">100 credits</option>
            <option value="250">250 credits</option>
            <option value="500">500 credits</option>
          </select>

          <Btn variant="danger" onClick={rAll}>↺ Reset</Btn>
        </div>

        {/* ── BODY ─────────────────────────────────────────── */}
        {s.view === 'studio' && (
          <div style={{
            flex: 1, minHeight: 0,
            display: 'grid', gridTemplateColumns: '280px 1fr 300px',
            overflow: 'hidden',
          }}>

            {/* ══ LEFT — Identity + World + Story ══ */}
            <div style={{
              borderRight: `1px solid ${C.hairline}`,
              overflowY: 'auto', padding: '10px 9px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>

              {/* IDENTITY */}
              <Panel title="Identity" accent={C.green}
                badge={s.useIdentity
                  ? <Chip>🔒 locked</Chip>
                  : <Chip>off</Chip>
                }
                right={
                  <Btn variant="danger" onClick={() => merge({
                    useIdentity: false, identityName: '', hasImage: false,
                    imageDataUrl: '', scanState: 'idle', scanError: '',
                    useTraits: false, identityStrength: 100,
                    continuityLock: false, prevOutputs: [], traits: {
  subjectA: {
name: '', age: '', ethnicity: '', body: '', breast: '', glutes: '', eyes: '', hair: '',
    locked: { name: false, age: false, ethnicity: false, body: false, breast: false, glutes: false, eyes: false, hair: false },
  },
  subjectB: {
    name: '', age: '', ethnicity: '', body: '', eyes: '', hair: '',
    locked: { name: false, age: false, ethnicity: false, body: false, eyes: false, hair: false },
  },
},
                  })}>
                    reset
                  </Btn>
                }
              >
                {/* Image upload */}
                <div
                  onClick={() => document.getElementById('__imgUp').click()}
                  style={{
                    width: '100%', height: 120, borderRadius: 5,
                    border: `1px solid ${C.subtle}`, background: C.deep,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', cursor: 'pointer', position: 'relative',
                  }}
                >
                  {s.imageDataUrl
                    ? <img src={s.imageDataUrl} alt="ref" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (
                      <div style={{ textAlign: 'center', color: C.ghost }}>
                        <div style={{ fontSize: 22, marginBottom: 4 }}>＋</div>
                        <div style={{ fontSize: 9, letterSpacing: 1 }}>UPLOAD REFERENCE</div>
                      </div>
                    )
                  }
                  {s.imageDataUrl && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'rgba(0,0,0,0.7)', padding: '3px 6px',
                      fontSize: 9, color: C.muted, textAlign: 'center',
                    }}>
                      {s.hasImage ? '✓ reference loaded' : 'loaded'}
                    </div>
                  )}
                  <input id="__imgUp" type="file" accept="image/*" style={{ display: 'none' }} onChange={onImg} />
                </div>

                {/* Scan */}
                <div style={{ display: 'flex', gap: 5 }}>
                  <button
                    onClick={scanIdentity}
                    disabled={s.scanState === 'scanning'}
                    style={{
                      flex: 1, padding: '6px 8px', borderRadius: 4,
                      fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      border: `1px solid ${s.scanState === 'done' ? '#1a4a1a' : C.subtle}`,
                      background: s.scanState === 'done' ? '#081208' : C.surface,
                      color: s.scanState === 'done' ? C.green : s.scanState === 'scanning' ? C.gold : C.secondary,
                    }}
                  >
                    {s.scanState === 'scanning' ? '⟳ Scanning…' : s.scanState === 'done' ? '✓ Scanned' : '⌕ Scan Identity'}
                  </button>
                  <Btn variant="danger" onClick={() => merge({ imageDataUrl: '', hasImage: false, scanState: 'idle', scanError: '' })}>✕</Btn>
                </div>

                {s.scanError && (
                  <div style={{ padding: '5px 7px', borderRadius: 4, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                    {s.scanError}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Name</Label>
                  <Inp value={s.identityName} onChange={e => set('identityName', e.target.value)} placeholder="e.g. Sofia" />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.secondary, cursor: 'pointer' }}>
                  <input type="checkbox" checked={s.useIdentity} onChange={e => set('useIdentity', e.target.checked)} />
                  Use identity in prompt
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.secondary, cursor: 'pointer' }}>
                  <input type="checkbox" checked={s.useTraits} onChange={e => set('useTraits', e.target.checked)} />
                  Use extracted traits
                </label>

                {s.useTraits && (
                  <div style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '8px 9px' }}>
                    <Label>Traits — Subject A</Label>
                    {['age', 'ethnicity', 'body_shape', 'eye_color', 'hair'].map(f => (
                      <div key={f} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 4, alignItems: 'center', padding: '2px 0', borderBottom: `1px solid ${C.void}` }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          {f.replace('_', ' ')}
                        </span>
                        <input
                          style={{ background: 'transparent', color: C.primary, border: 'none', fontSize: 10, outline: 'none', fontFamily: 'inherit', padding: '2px 4px' }}
                          value={s.traits.subjectA[f] || ''}
                          onChange={e => set('traits', { ...s.traits, subjectA: { ...s.traits.subjectA, [f]: e.target.value } })}
                          placeholder="—"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Character mode</Label>
                  <Seg
                    options={CHARACTER_MODES.map(m => ({ value: m, label: m }))}
                    value={s.characterMode}
                    onChange={v => merge({ characterMode: v, subjectGender: v === 'male' ? 'male' : 'female' })}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Age range</Label>
                  <Sel
                    value={s.ageRange} onChange={v => set('ageRange', v)}
                    options={AGE_OPTIONS}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Label>Identity strength</Label>
                    <span style={{ fontSize: 9, color: C.muted }}>{s.identityStrength}%</span>
                  </div>
                  <input type="range" min={0} max={100} value={s.identityStrength}
                    onChange={e => set('identityStrength', Number(e.target.value))}
                    style={{ width: '100%', accentColor: C.gold }} />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.secondary, cursor: 'pointer' }}>
                  <input type="checkbox" checked={s.continuityLock} onChange={e => set('continuityLock', e.target.checked)} />
                  Continuity persistence
                </label>

                {s.continuityLock && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: C.muted }}>{s.prevOutputs.length} prompts in memory</span>
                    <Btn variant="ghost" onClick={() => set('prevOutputs', [])}>clear</Btn>
                  </div>
                )}
              </Panel>

              {/* CHARACTER DNA */}
<Panel title="Character DNA" accent="#c8a84b" defaultOpen={false}
  badge={
    dnaProfiles.length > 0
      ? <Chip>{dnaProfiles.length} saved</Chip>
      : null
  }
>
  {/* Mode */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Label>Character Mode</Label>
    <div style={{ display: 'flex', gap: 3 }}>
      {['female', 'male', 'couple'].map(m => (
        <button key={m}
          onClick={() => merge({
            characterMode: m,
            subjectGender: m === 'male' ? 'male' : 'female',
          })}
          style={{
            flex: 1, padding: '5px 0', borderRadius: 3,
            fontSize: 10, fontWeight: 700, cursor: 'pointer', textAlign: 'center',
            border: `1px solid ${s.characterMode === m ? C.goldDim : C.hairline}`,
            background: s.characterMode === m ? '#1a1408' : C.deep,
            color: s.characterMode === m ? C.gold : C.muted,
            transition: 'all 0.15s',
          }}
        >
          {m}
        </button>
      ))}
    </div>
  </div>

  {/* Subject A */}
<SubjectTraits
    label={
      s.characterMode === 'male'   ? 'Subject — Male' :
      s.characterMode === 'couple' ? 'Subject A — Female' :
      'Subject — Female'
    }
    traits={s.traits.subjectA}
    accentColor={C.green}
    isMale={s.characterMode === 'male'}
    onChange={(field, value) => set('traits', {
      ...s.traits,
      subjectA: { ...s.traits.subjectA, [field]: value },
    })}
    onToggleLock={field => set('traits', {
      ...s.traits,
      subjectA: {
        ...s.traits.subjectA,
        locked: {
          ...(s.traits.subjectA.locked || {}),
          [field]: !(s.traits.subjectA.locked?.[field]),
        },
      },
    })}
  />

  {/* Subject B — couple only */}
{s.characterMode === 'couple' && (
    <SubjectTraits
      label="Subject B — Male"
      traits={s.traits.subjectB}
      accentColor={C.blue}
      isMale={true}
      onChange={(field, value) => set('traits', {
        ...s.traits,
        subjectB: { ...s.traits.subjectB, [field]: value },
      })}
      onToggleLock={field => set('traits', {
        ...s.traits,
        subjectB: {
          ...s.traits.subjectB,
          locked: {
            ...(s.traits.subjectB.locked || {}),
            [field]: !(s.traits.subjectB.locked?.[field]),
          },
        },
      })}
    />
  )}

  {/* DNA Profiles */}
  <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Label>Saved Profiles ({dnaProfiles.length})</Label>
    <select
      style={{
        width: '100%', background: C.deep, color: C.primary,
        border: `1px solid ${C.hairline}`, borderRadius: 4,
        padding: '6px 8px', fontSize: 11,
      }}
      value={dnaSelected}
      onChange={e => setDnaSelected(e.target.value)}
    >
      <option value="">Select profile…</option>
      {dnaProfiles.map(p => (
        <option key={p.id} value={String(p.id)}>{p.name}</option>
      ))}
    </select>
    <div style={{ display: 'flex', gap: 5 }}>
      <Btn variant="gold" onClick={dnaSaveProfile} sx={{ flex: 1, fontSize: 10 }}>💾 Save</Btn>
      <Btn variant="default" disabled={!dnaSelected}
        onClick={() => dnaLoadProfile(dnaSelected)}
        sx={{ flex: 1, fontSize: 10 }}>
        ↑ Load
      </Btn>
      <Btn variant="danger" disabled={!dnaSelected}
        onClick={() => dnaDeleteProfile(dnaSelected)}
        sx={{ flex: 1, fontSize: 10 }}>
        ✕
      </Btn>
    </div>
  </div>

  {/* Active profile preview */}
  {dnaSelected && (() => {
    const p = dnaProfiles.find(x => String(x.id) === dnaSelected)
    if (!p) return null
    return (
      <div style={{
        background: C.deep, border: `1px solid ${C.hairline}`,
        borderRadius: 4, padding: '7px 8px',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4 }}>
          {p.name}
        </div>
        <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6 }}>
          <span style={{ color: C.secondary }}>{p.characterMode}</span>
          {p.traits?.subjectA?.ethnicity ? ` · ${p.traits.subjectA.ethnicity}` : ''}
          {p.traits?.subjectA?.hair      ? ` · ${p.traits.subjectA.hair}`      : ''}
        </div>
        {p.imageDataUrl && (
          <img src={p.imageDataUrl} alt="dna"
            style={{ width: '100%', height: 56, objectFit: 'cover', borderRadius: 3, marginTop: 6 }} />
        )}
      </div>
    )
  })()}
</Panel>

              {/* WORLD */}
              <Panel title="World System" accent={C.blue}
                badge={s.worldId ? <Chip>{worldObj?.name || s.worldId}</Chip> : <Chip>auto</Chip>}
                right={<Btn variant="danger" onClick={() => merge({ worldControlMode: 'auto', worldId: '', subLocationId: '', sceneGroupId: '', phaseKey: '' })}>reset</Btn>}
              >
                <Seg
                  options={['auto', 'manual'].map(m => ({ value: m, label: m }))}
                  value={s.worldControlMode}
                  onChange={v => set('worldControlMode', v)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Physical world</Label>
                  <select
                    style={{ width: '100%', background: C.deep, color: C.primary, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '6px 8px', fontSize: 11 }}
                    value={s.worldId}
                    onChange={e => { set('worldId', e.target.value); if (e.target.value) set('worldControlMode', 'manual') }}
                  >
                    <option value="">(auto from story world)</option>
                    <optgroup label="Locations">
                      {WORLD_LOCATIONS.map(w => <option key={w.id} value={w.id}>📍 {w.name}</option>)}
                    </optgroup>
                    <optgroup label="Style Worlds">
                      {STORY_STYLE_WORLDS.map(w => <option key={w.id} value={w.id}>🎭 {w.name}</option>)}
                    </optgroup>
                  </select>
                </div>

                {worldObj && subLocOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Sub-location</Label>
                    <Sel value={s.subLocationId} onChange={v => set('subLocationId', v)}
                      placeholder="Auto from phase" options={subLocOpts}
                      disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}

                {s.subLocationId && sceneGOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Scene group</Label>
                    <Sel value={s.sceneGroupId} onChange={v => set('sceneGroupId', v)}
                      placeholder="Auto" options={sceneGOpts}
                      disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}

                {worldObj && phaseOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Phase</Label>
                    <Sel value={s.phaseKey} onChange={v => set('phaseKey', v)}
                      placeholder="Auto from progression" options={phaseOpts}
                      disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}
              </Panel>

              {/* STORY */}
              <Panel title="Story System" accent="#5a3a7a"
                badge={s.storyWorldId ? <Chip>{STORY_WORLDS.find(w => w.id === s.storyWorldId)?.name || s.storyWorldId}</Chip> : null}
                right={<Btn variant="danger" onClick={() => merge({ storyWorldId: '', chapterId: '', packId: '' })}>reset</Btn>}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Story world</Label>
                  <Sel value={s.storyWorldId} onChange={v => set('storyWorldId', v)}
                    placeholder="None" options={STORY_WORLDS.map(w => ({ id: w.id, name: w.name }))} />
                </div>

                {chapterOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Chapter ({chapterOpts.length})</Label>
                    <Sel value={s.chapterId} onChange={v => set('chapterId', v)}
                      placeholder="Auto" options={chapterOpts} />
                    {activeCh && (
                      <div style={{ fontSize: 9, color: C.muted }}>Phase: {activeCh.phase}</div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Signature pack</Label>
                  <Sel value={s.packId} onChange={v => set('packId', v)}
                    placeholder="None" options={SIGNATURE_PACKS.map(p => ({ id: p.id, name: p.name }))} />
                </div>
              </Panel>

            </div>

            {/* ══ CENTER — Director Controls + Output ══ */}
            <div style={{
              overflowY: 'auto', padding: '10px 12px',
              display: 'flex', flexDirection: 'column', gap: 8,
              background: '#070707',
            }}>

              {/* DIRECTOR PRESET */}
              <Panel title="Director" accent={C.gold}
                badge={s.directorPreset !== 'none' ? <Pill color={C.gold}>{activeDirectorPreset.label}</Pill> : null}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                  {DIRECTOR_PRESETS.map(d => (
                    <button
                      key={d.id}
                      onClick={() => set('directorPreset', d.id)}
                      title={d.description}
                      style={{
                        padding: '6px 4px', borderRadius: 4,
                        fontSize: 9, fontWeight: 700, cursor: 'pointer',
                        textAlign: 'center',
                        border: `1px solid ${s.directorPreset === d.id ? C.goldDim : C.hairline}`,
                        background: s.directorPreset === d.id ? '#1a1408' : C.deep,
                        color: s.directorPreset === d.id ? C.gold : C.muted,
                        lineHeight: 1.4,
                      }}
                    >
                      <div style={{ fontSize: 12, marginBottom: 2 }}>{d.icon}</div>
                      {d.label}
                    </button>
                  ))}
                </div>
                {s.directorPreset !== 'none' && (
                  <div style={{
                    fontSize: 10, color: C.muted, fontStyle: 'italic',
                    padding: '4px 6px', background: C.deep, borderRadius: 3,
                    border: `1px solid ${C.hairline}`,
                  }}>
                    {activeDirectorPreset.description}
                  </div>
                )}
              </Panel>

              {/* PROGRESSION */}
              <Panel title="Progression" accent={pc(progLevel)}
                badge={<Pill color={pc(progLevel)}>{progLevel}</Pill>}
                right={
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <Chip>{s.progressionIndex + 1} / {s.totalCount}</Chip>
                    <Btn variant="danger" onClick={() => merge({ progressionIndex: 0, totalCount: 30 })}>reset</Btn>
                  </div>
                }
              >
                {/* Arc zones */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {['tease', 'tension', 'payoff'].map(l => {
                    const r   = s.progressionIndex / Math.max(s.totalCount - 1, 1)
                    const inZ = (l==='tease'&&r<0.33)||(l==='tension'&&r>=0.33&&r<0.66)||(l==='payoff'&&r>=0.66)
                    return (
                      <div key={l} style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 8, fontWeight: 700, textAlign: 'center',
                          letterSpacing: 0.8, textTransform: 'uppercase',
                          color: inZ ? pc(l) : C.ghost, marginBottom: 3,
                        }}>
                          {l}
                        </div>
                        <div style={{ height: 2, borderRadius: 1, background: inZ ? pc(l) : C.hairline }} />
                      </div>
                    )
                  })}
                </div>

                {/* Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, color: C.ghost, minWidth: 10 }}>0</span>
                  <input
                    type="range" min={0} max={s.totalCount - 1} value={s.progressionIndex}
                    onChange={e => set('progressionIndex', Number(e.target.value))}
                    style={{ flex: 1, accentColor: pc(progLevel) }}
                  />
                  <span style={{ fontSize: 9, color: C.ghost, minWidth: 16 }}>{s.totalCount - 1}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Index</Label>
                    <Inp type="number" min={0} max={s.totalCount - 1}
                      value={s.progressionIndex} onChange={e => set('progressionIndex', Number(e.target.value))} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Total scenes</Label>
                    <select
                      style={{ width: '100%', background: C.deep, color: C.primary, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '6px 8px', fontSize: 11 }}
                      value={s.totalCount}
                      onChange={e => set('totalCount', Number(e.target.value))}
                    >
                      {TOTAL_OPTIONS.map(n => <option key={n} value={n}>{n} scenes</option>)}
                      <option value={s.totalCount} hidden>{s.totalCount} scenes</option>
                    </select>
                  </div>
                </div>
              </Panel>

              {/* OUTPUT WORKSPACE */}
              <Panel title="Output Workspace"
                right={
                  <div style={{ display: 'flex', gap: 4 }}>
                    {result?.finalPrompt && (
                      <>
                        <Btn variant="ghost" onClick={() => doCopy(result.finalPrompt, 'p')}>{copied === 'p' ? '✓' : 'copy'}</Btn>
                        <Btn variant="ghost" onClick={saveResult}>save</Btn>
                      </>
                    )}
                    <Btn variant="danger" onClick={() => { setResult(null); setBatch([]); setOutputTab('output') }}>reset</Btn>
                  </div>
                }
              >
                {/* Tabs */}
                <div style={{
                  display: 'flex', gap: 2,
                  borderBottom: `1px solid ${C.hairline}`,
                  marginBottom: 4,
                }}>
                  {['output', 'layers', 'meta', 'image', 'warnings'].map(t => {
                    const hasDot = t === 'warnings' && result?.warnings?.length > 0
                    return (
                      <button key={t}
                        onClick={() => setOutputTab(t)}
                        style={{
                          padding: '5px 9px', borderRadius: '3px 3px 0 0',
                          fontSize: 10, fontWeight: 700, cursor: 'pointer',
                          background: outputTab === t ? C.surface : 'transparent',
                          border: `1px solid ${outputTab === t ? C.hairline : 'transparent'}`,
                          borderBottom: `1px solid ${outputTab === t ? C.surface : C.hairline}`,
                          marginBottom: -1, color: outputTab === t ? C.primary : C.muted,
                          position: 'relative',
                        }}
                      >
                        {t}
                        {hasDot && (
                          <span style={{
                            position: 'absolute', top: 2, right: 2,
                            width: 4, height: 4, borderRadius: '50%',
                            background: C.tension,
                          }} />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Output tab */}
                {outputTab === 'output' && (
                  <>
                    {result?.finalPrompt
                      ? (
                        <div style={{
                          background: C.void, border: `1px solid #141e12`,
                          borderRadius: 5, padding: '12px 13px',
                          fontFamily: C.mono, fontSize: 11, lineHeight: 1.9,
                          color: '#7ecf7e', whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word', minHeight: 80,
                          maxHeight: 280, overflowY: 'auto',
                        }}>
                          {result.finalPrompt}
                        </div>
                      )
                      : (
                        <div style={{
                          background: C.void, border: `1px solid ${C.hairline}`,
                          borderRadius: 5, padding: '12px 13px',
                          fontFamily: C.mono, fontSize: 11,
                          color: C.ghost, fontStyle: 'italic', minHeight: 80,
                        }}>
                          Press Generate Scene to build a cinematic prompt.
                        </div>
                      )
                    }
                    {result?.finalPrompt && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {['scene', 'camera', 'wardrobe', 'mood', 'lighting'].map(l => (
                          <Btn key={l} variant="ghost"
                            onClick={() => regenLayer(l)}
                            sx={{ color: regenState[l] ? C.green : C.muted }}
                          >
                            {regenState[l] ? `✓ ${l}` : `↺ ${l}`}
                          </Btn>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Layers tab */}
                {outputTab === 'layers' && (
                  <div>
                    {result?.layers
                      ? Object.entries(result.layers).map(([k, v]) => (
                          <div key={k} style={{
                            display: 'grid', gridTemplateColumns: '72px 1fr',
                            gap: 8, padding: '5px 0',
                            borderBottom: `1px solid ${C.void}`, alignItems: 'start',
                          }}>
                            <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', paddingTop: 1 }}>{k}</div>
                            <div style={{ fontSize: 10, fontFamily: C.mono, lineHeight: 1.5, wordBreak: 'break-word', color: v ? C.secondary : C.ghost, fontStyle: v ? 'normal' : 'italic' }}>
                              {v || '(empty)'}
                            </div>
                          </div>
                        ))
                      : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic' }}>No result yet.</div>
                    }
                  </div>
                )}

                {/* Meta tab */}
                {outputTab === 'meta' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {result?.meta
                      ? Object.entries(result.meta).filter(([k]) => k !== 'layerSources').map(([k, v]) => (
                          <div key={k} style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '5px 7px' }}>
                            <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                            <div style={{ fontSize: 10, color: C.blue, fontFamily: C.mono, wordBreak: 'break-all' }}>{String(v ?? '—')}</div>
                          </div>
                        ))
                      : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic', gridColumn: 'span 2' }}>No result yet.</div>
                    }
                  </div>
                )}

                {/* Image tab */}
                {outputTab === 'image' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {!s.imageDataUrl && <div style={{ padding: '6px 8px', borderRadius: 4, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>Upload an identity image to enable generation.</div>}
                    {s.imageGenerating && <div style={{ padding: '10px', textAlign: 'center', color: C.green, fontSize: 11 }}>⟳ Generating image… (5 credits)</div>}
                    {s.imageError && <div style={{ padding: '6px 8px', borderRadius: 4, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.imageError}</div>}
                    {s.generatedImage && (
                      <>
                        <img src={s.generatedImage} alt="generated" style={{ width: '100%', borderRadius: 5 }} />
                        <div style={{ display: 'flex', gap: 5 }}>
                          <Btn variant="ghost" onClick={() => doCopy(s.generatedImage, 'imgurl')}>{copied === 'imgurl' ? '✓ copied' : 'copy URL'}</Btn>
                          <a href={s.generatedImage} download="promptceo-image.jpg" target="_blank" rel="noreferrer"
                            style={{ padding: '5px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: 'none', color: C.muted, background: C.surface, border: `1px solid ${C.hairline}` }}>
                            ↓ download
                          </a>
                        </div>
                      </>
                    )}
                    <Btn variant="green" disabled={s.imageGenerating || !result?.finalPrompt} onClick={generateImage}
                      sx={{ width: '100%', padding: '9px 0', fontSize: 12 }}>
                      {s.imageGenerating ? '⟳ Generating…' : '🎨 Generate Image (5 credits)'}
                    </Btn>
                  </div>
                )}

                {/* Warnings tab */}
                {outputTab === 'warnings' && (
                  <div>
                    {result?.warnings?.length
                      ? result.warnings.map((w, i) => (
                          <div key={i} style={{
                            padding: '4px 7px', borderRadius: 4, fontSize: 9, marginBottom: 3,
                            color: w.includes('EXCEPTION') ? '#cf6a6a' : '#c49a2a',
                            background: w.includes('EXCEPTION') ? '#110606' : '#100e00',
                            border: `1px solid ${w.includes('EXCEPTION') ? '#2a1010' : '#221a00'}`,
                            fontFamily: C.mono, lineHeight: 1.5,
                          }}>
                            {w}
                          </div>
                        ))
                      : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic' }}>No warnings.</div>
                    }
                  </div>
                )}

              </Panel>

              {/* GENERATE ACTIONS */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={generate}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 5, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', border: `1px solid #1a4a2a`,
                    background: 'linear-gradient(180deg, #14381a, #0c2214)',
                    color: C.green, letterSpacing: 0.5,
                  }}
                >
                  ▶ Generate Scene
                </button>
                <button
                  onClick={runBatch}
                  disabled={batchRun}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 5, fontSize: 12, fontWeight: 700,
                    cursor: batchRun ? 'not-allowed' : 'pointer',
                    border: `1px solid #1a2a4a`,
                    background: 'linear-gradient(180deg, #101c30, #080e1c)',
                    color: C.blue, opacity: batchRun ? 0.7 : 1, letterSpacing: 0.5,
                  }}
                >
                  {batchRun ? `⟳ ${batchProg} / ${s.totalCount}` : `⚡ Batch ${s.totalCount}`}
                </button>
                {batchRun && (
                  <button
                    onClick={() => { stopRef.current = true }}
                    style={{
                      width: 56, padding: '10px 0', borderRadius: 5, fontSize: 11, fontWeight: 700,
                      cursor: 'pointer', border: '1px solid #3a1010',
                      background: '#180808', color: '#cf7e7e',
                    }}
                  >
                    stop
                  </button>
                )}
              </div>

{/* Batch image generate */}
              {batch.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={generateBatchImages}
                      disabled={s.batchImgRunning || !s.imageDataUrl}
                      style={{
                        flex: 1, padding: '9px 0', borderRadius: 5, fontSize: 11, fontWeight: 700,
                        cursor: (s.batchImgRunning || !s.imageDataUrl) ? 'not-allowed' : 'pointer',
                        border: '1px solid #3a1a6a',
                        background: 'linear-gradient(180deg,#1a0e30,#0e0818)',
                        color: '#c07ef0', opacity: (s.batchImgRunning || !s.imageDataUrl) ? 0.5 : 1,
                      }}
                    >
                      {s.batchImgRunning ? `⟳ Image ${s.batchImgProgress}/${batch.length}` : `🎨 Generate ${batch.length} Images`}
                    </button>
                    {s.batchImgRunning && (
                      <button onClick={() => { stopRef.current = true }}
                        style={{ width: 56, padding: '9px 0', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1px solid #3a1010', background: '#180808', color: '#cf7e7e' }}>
                        stop
                      </button>
                    )}
                  </div>

                  {s.batchImages?.length > 0 && (
                    <div style={{ background: C.void, border: `1px solid ${C.hairline}`, borderRadius: 5, padding: '10px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
                        Generated Images ({s.batchImages.filter(i => i.imageUrl).length} / {s.batchImages.length})
                      </div>
                      {s.batchImgRunning && (
                        <div style={{ marginBottom: 8 }}>
                          <Track value={s.batchImgProgress} max={batch.length} color="#c07ef0" />
                        </div>
                      )}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, maxHeight: 400, overflowY: 'auto' }}>
                        {s.batchImages.map((item, i) => (
                          <div key={i} style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                            {item.imageUrl ? (
                              <>
                                <img
  src={item.imageUrl}
  alt={`Scene ${item.index + 1}`}
  style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer', background: '#000' }}
  onClick={() => window.open(item.imageUrl, '_blank')}
/>
<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.75)', padding: '3px 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <span style={{ fontSize: 8, color: C.muted }}>#{item.index + 1}</span>
<a href={`/api/download-image?url=${encodeURIComponent(item.imageUrl)}&name=scene-${item.index + 1}.jpg`}
  style={{
    background: '#c07ef0', color: '#000', border: 'none',
    borderRadius: 3, padding: '3px 8px', fontSize: 10,
    fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
    display: 'inline-block',
  }}
>
  ↓ save
</a>
</div>
                              </>
                            ) : (
                              <div style={{ minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 6 }}>
                                <span style={{ fontSize: 16 }}>✕</span>
                                <span style={{ fontSize: 8, color: '#cf6a6a', textAlign: 'center', wordBreak: 'break-word' }}>{item.error || 'failed'}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {s.batchImages.filter(i => i.imageUrl).length > 0 && !s.batchImgRunning && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 5 }}>
                         <Btn variant="ghost" onClick={() => {
  s.batchImages.filter(i => i.imageUrl).forEach((item, idx) => {
    setTimeout(() => {
      const a = Object.assign(document.createElement('a'), {
        href: `/api/download-image?url=${encodeURIComponent(item.imageUrl)}&name=scene-${item.index + 1}.jpg`,
        download: `scene-${item.index + 1}.jpg`,
      })
      a.click()
    }, idx * 600)
  })
}} sx={{ fontSize: 10 }}>
  ↓ Download All ({s.batchImages.filter(i => i.imageUrl).length})
</Btn>
                          <Btn variant="danger" onClick={() => merge({ batchImages: [] })} sx={{ fontSize: 10 }}>clear</Btn>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* ══ RIGHT — Saved + World Info ══ */}
            <div style={{
              borderLeft: `1px solid ${C.hairline}`,
              overflowY: 'auto', padding: '10px 9px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>

              {/* SAVED PROMPTS */}
              <Panel title="Saved Prompts"
                badge={saved.length > 0 ? <Chip>{saved.length}</Chip> : null}
                right={saved.length > 0 && <Btn variant="danger" onClick={() => setSaved([])}>clear</Btn>}
              >
                {saved.length === 0
                  ? <div style={{ fontSize: 10, color: C.ghost, fontStyle: 'italic' }}>No saved prompts yet.</div>
                  : saved.map(e => (
                      <div key={e.id} style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 5, padding: '8px 9px' }}>
                        <div style={{ display: 'flex', gap: 4, marginBottom: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: 9, color: C.muted }}>{e.ts}</span>
                          <Pill color={pc(e.meta?.progressionLevel)}>{e.meta?.progressionLevel}</Pill>
                          <Pill color={TIME_COLORS[e.meta?.timeOfDay] || C.muted}>{(e.meta?.timeOfDay || '').replace(/_/g, ' ')}</Pill>
                        </div>
                        <div style={{ fontSize: 10, color: C.muted, fontFamily: C.mono, lineHeight: 1.5, wordBreak: 'break-word', marginBottom: 5 }}>
                          {e.prompt.slice(0, 140)}{e.prompt.length > 140 ? '…' : ''}
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Btn variant="ghost" onClick={() => doCopy(e.prompt, `s${e.id}`)}>{copied === `s${e.id}` ? '✓' : 'copy'}</Btn>
                          <Btn variant="danger" onClick={() => setSaved(p => p.filter(x => x.id !== e.id))}>✕</Btn>
                        </div>
                      </div>
                    ))
                }
              </Panel>

              {/* WORLD INFO */}
              {worldObj && (
                <Panel title="World Info">
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: C.display }}>{worldObj.name}</div>
                  {worldObj.description && (
                    <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6 }}>
                      {worldObj.description.slice(0, 180)}{worldObj.description.length > 180 ? '…' : ''}
                    </div>
                  )}
                  {worldObj.identity?.vibe?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {worldObj.identity.vibe.slice(0, 5).map((v, i) => <Chip key={i}>{v}</Chip>)}
                    </div>
                  )}
                  <div style={{ fontSize: 9, color: C.ghost }}>
                    {Object.keys(worldObj.subLocations || {}).length} sub-locations · {worldObj.phaseOrder?.length || 0} phases
                  </div>
                </Panel>
              )}

            </div>
          </div>
        )}

        {/* ══ TIMELINE VIEW ═══════════════════════════════ */}
        {s.view === 'timeline' && (
          <div style={{
            flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>

            {/* Timeline header */}
            <div style={{
              flexShrink: 0, padding: '10px 16px',
              borderBottom: `1px solid ${C.hairline}`,
              display: 'flex', alignItems: 'center', gap: 12,
              background: C.deep,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>
                Director's Timeline
              </span>
              {batch.length > 0 && (
                <>
                  <Chip>{batch.length} scenes</Chip>
                  <Chip>{activeScene + 1} active</Chip>
                </>
              )}
              <div style={{ flex: 1 }} />
              {batch.length > 0 && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="gold" onClick={() => setDirectorOpen(true)}>🎬 Director's Chair</Btn>
                  <Btn variant="default" onClick={exportBatch}>export .txt</Btn>
                  <Btn variant="default" onClick={exportStoryboard}>storyboard</Btn>
                  <Btn variant="default" onClick={() => doCopy(batch.map(r => r.finalPrompt).join('\n\n'), 'ba')}>
                    {copied === 'ba' ? '✓ copied all' : 'copy all'}
                  </Btn>
                </div>
              )}
              {batchRun && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: C.green }}>Generating {batchProg} / {s.totalCount}…</span>
                  <Track value={batchProg} max={s.totalCount} color={C.green} />
                </div>
              )}
            </div>

            {/* Minimap scrubber */}
            {batch.length > 0 && (
              <div style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderBottom: `1px solid ${C.hairline}`,
                background: C.void,
              }}>
                {/* Time of day gradient bar */}
                <div style={{
                  height: 4, borderRadius: 2, marginBottom: 6,
                  background: `linear-gradient(90deg, ${
                    batch.map((r, i) => {
                      const col = TIME_COLORS[r.meta?.timeOfDay] || C.deep
                      const pct = ((i / batch.length) * 100).toFixed(1)
                      return `${col} ${pct}%`
                    }).join(', ')
                  })`,
                }} />
                {/* Scene bars */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 48 }}>
                  {batch.map((r, i) => (
                    <SceneCard
                      key={i} result={r} index={i} total={batch.length}
                      onClick={() => { setActiveScene(i); set('progressionIndex', i) }}
                      isActive={i === activeScene}
                      compact={true}
                    />
                  ))}
                </div>
                {/* Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>EARLY MORNING</span>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>GOLDEN HOUR</span>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>LATE NIGHT</span>
                </div>
              </div>
            )}

            {/* Scene list */}
            <div style={{
              flex: 1, minHeight: 0, overflowY: 'auto',
              padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              {batch.length === 0 ? (
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  color: C.ghost, gap: 12,
                }}>
                  <div style={{ fontSize: 32 }}>🎬</div>
                  <div style={{ fontSize: 12, letterSpacing: 1 }}>No scenes generated yet.</div>
                  <div style={{ fontSize: 10, color: C.ghost, opacity: 0.6 }}>
                    Switch to Studio view and press Batch Generate.
                  </div>
                  <Btn variant="gold" onClick={() => set('view', 'studio')}>← Back to Studio</Btn>
                </div>
              ) : (
                batch.map((r, i) => (
                  <SceneCard
                    key={i} result={r} index={i} total={batch.length}
                    onClick={() => { setActiveScene(i); set('progressionIndex', i) }}
                    isActive={i === activeScene}
                    compact={false}
                  />
                ))
              )}
            </div>

            {/* Active scene detail */}
            {batch[activeScene] && (
              <div style={{
                flexShrink: 0, borderTop: `1px solid ${C.hairline}`,
                padding: '10px 16px', background: C.deep,
                display: 'flex', gap: 16, alignItems: 'flex-start',
                maxHeight: 180,
              }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>Scene {activeScene + 1}</span>
                    <Pill color={pc(batch[activeScene].meta?.progressionLevel)}>{batch[activeScene].meta?.progressionLevel}</Pill>
                    <Pill color={TIME_COLORS[batch[activeScene].meta?.timeOfDay] || C.muted}>
                      {(batch[activeScene].meta?.timeOfDay || '').replace(/_/g, ' ')}
                    </Pill>
                    <Pill color={C.blue}>{batch[activeScene].meta?.envFamily}</Pill>
                  </div>
                  <div style={{
                    fontSize: 11, fontFamily: C.mono, lineHeight: 1.8,
                    color: '#7ecf7e', wordBreak: 'break-word',
                    overflowY: 'auto', maxHeight: 120,
                  }}>
                    {batch[activeScene].finalPrompt}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                  <Btn variant="ghost" onClick={() => doCopy(batch[activeScene].finalPrompt, `t${activeScene}`)}>
                    {copied === `t${activeScene}` ? '✓ copied' : 'copy'}
                  </Btn>
                  <Btn variant="gold" onClick={() => setDirectorOpen(true)}>🎬 Chair</Btn>
                  <div style={{ display: 'flex', gap: 3 }}>
                    <Btn variant="ghost" disabled={activeScene === 0} onClick={() => { const n = activeScene - 1; setActiveScene(n); set('progressionIndex', n) }}>←</Btn>
                    <Btn variant="ghost" disabled={activeScene >= batch.length - 1} onClick={() => { const n = activeScene + 1; setActiveScene(n); set('progressionIndex', n) }}>→</Btn>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </>
  )
}