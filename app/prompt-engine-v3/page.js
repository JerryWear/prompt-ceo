'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { buildPromptV3 } from './index.js'
import MusicSelector from './components/MusicSelector.js'

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
  void:     '#040404',
  deep:     '#070707',
  base:     '#0a0a0a',
  raised:   '#0d0d0d',
  surface:  '#111111',
  overlay:  '#151515',
  hairline: '#1a1a1a',
  subtle:   '#222222',
  mid:      '#2a2a2a',
  primary:  '#e8e4dc',
  secondary:'#8a8680',
  muted:    '#4a4845',
  ghost:    '#2a2825',
  gold:     '#c8a84b',
  goldDim:  '#7a6428',
  goldGlow: '#c8a84b22',
  blue:     '#4a8ab4',
  blueDim:  '#2a4a6a',
  blueGlow: '#4a8ab422',
  tease:    '#4a7ab4',
  tension:  '#b4944a',
  payoff:   '#b44a4a',
  green:    '#4a9a6a',
  greenDim: '#1a3a2a',
  violet:   '#9b6fd4',
  violetDim:'#4a2a7a',
  violetGlow:'#9b6fd422',
  mono:     '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  display:  '"Georgia", "Times New Roman", serif',
}

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

const DIRECTOR_PRESETS = [
  { id: 'none',       label: 'None',        icon: '○',  description: 'Engine defaults',                          overrides: {} },
  { id: 'kubrick',    label: 'Kubrick',      icon: '◎',  description: 'Symmetrical. Cold. Unsettling precision.', overrides: {} },
  { id: 'wong',       label: 'Wong Kar-wai', icon: '◈',  description: 'Saturated. Blurred longing.',              overrides: {} },
  { id: 'coppola',    label: 'S. Coppola',   icon: '◇',  description: 'Dreamy. Feminine ennui. Pastel distance.', overrides: {} },
  { id: 'fincher',    label: 'Fincher',       icon: '◆',  description: 'Desaturated. Precise. Tension.',           overrides: {} },
  { id: 'villeneuve', label: 'Villeneuve',    icon: '⬡',  description: 'Epic scale. Silence. Overwhelming.',       overrides: {} },
  { id: 'noe',        label: 'Gaspar Noé',   icon: '◉',  description: 'Neon. Confrontational. Sensory overload.', overrides: {} },
  { id: 'lynch',      label: 'Lynch',         icon: '◌',  description: 'Dreamlike. Surreal. Visual dread.',        overrides: {} },
  { id: 'winding',    label: 'Winding Refn',  icon: '◐',  description: 'Neon night. Drive aesthetic. Minimal.',    overrides: {} },
  { id: 'malick',     label: 'Malick',        icon: '◑',  description: 'Golden hour. Impressionist. Nature.',      overrides: {} },
  { id: 'antonioni',  label: 'Antonioni',     icon: '◒',  description: 'Cold modernism. Alienation. Stillness.',   overrides: {} },
]

// ─────────────────────────────────────────────────────────────
// AD STUDIO — LOADING + RESULT + VIEW
// ─────────────────────────────────────────────────────────────

const LOADING_LINES = [
  'Briefing the creative team…',
  'Scouting the perfect location…',
  'Setting up the shot…',
  'Dialling in the lighting…',
  'Directing the scene…',
  'Colour grading the output…',
  'Finalising your ad creative…',
]

function AdLoadingState({ outputType }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const a = setInterval(() => setLineIndex(i => (i + 1) % LOADING_LINES.length), 2200)
    const b = setInterval(() => setTick(t => t + 1), 500)
    return () => { clearInterval(a); clearInterval(b) }
  }, [])
  const dots = '.'.repeat((tick % 3) + 1)
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '60px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: 40 }}>{outputType === 'video' ? '🎬' : '📣'}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 8, letterSpacing: 0.3 }}>
          Creating your ad creative{dots}
        </div>
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: 0.5 }}>{LOADING_LINES[lineIndex]}</div>
      </div>
      <div style={{ padding: '8px 16px', borderRadius: 4, background: C.raised, border: `1px solid ${C.subtle}`, fontSize: 10, color: C.muted }}>
        {outputType === 'video' ? '🎬 Video takes ~2 minutes' : '🖼 Image takes ~30 seconds'}
      </div>
    </div>
  )
}

function AdStudioView({ s, set, merge, generateAdImage, generateAdVideo, generateAdText }) {
  const [adMode, setAdMode]             = useState('product_ad')
  const [adOutputType, setAdOutputType] = useState('image')
  const [adFormat, setAdFormat]         = useState('feed')
  const [productName, setProductName]   = useState('')
  const [productDesc, setProductDesc]   = useState('')
  const [adStyle, setAdStyle]           = useState('lifestyle')
  const [targetMood, setTargetMood]     = useState('')
  const [adPlatform, setAdPlatform]     = useState('instagram')
  const [creatorNiche, setCreatorNiche] = useState('lifestyle')
  const [adGoal, setAdGoal]             = useState('awareness')
  const [visualStyle, setVisualStyle]   = useState('')
  const [extraContext, setExtraContext]  = useState('')
  // Phase 1 — extended ad strategy fields
  const [targetCustomer, setTargetCustomer] = useState('')
  const [mainProblem, setMainProblem]       = useState('')
  const [mainDesire, setMainDesire]         = useState('')
  const [mainBenefit, setMainBenefit]       = useState('')
  const [proofPoint, setProofPoint]         = useState('')
  const [offer, setOffer]                   = useState('')
  const [callToAction, setCallToAction]     = useState('')
  const [brandVoice, setBrandVoice]         = useState('premium')
  const [pricePoint, setPricePoint]         = useState('mid-ticket')
  const [platformGoal, setPlatformGoal]     = useState('sales')
  // Selection state — shared across all tabs
  const [selectedAngle,    setSelectedAngle]    = useState(null)
  const [selectedHook,     setSelectedHook]     = useState(null)
  const [buildingProject,  setBuildingProject]  = useState(false)
  const [projectSaved,     setProjectSaved]     = useState(false)
  // Lock state — locked items are injected into every generation
  const [lockedAngle,       setLockedAngle]       = useState(null)
  const [lockedHook,        setLockedHook]        = useState(null)
  const [lockedCaption,     setLockedCaption]     = useState(null)
  const [lockedVisualStyle, setLockedVisualStyle] = useState(null)
  const [lockedMusic,       setLockedMusic]       = useState(null)
  const [lockedBrandVoice,  setLockedBrandVoice]  = useState(null)
  // Saved projects
  const [savedProjects,    setSavedProjects]    = useState([])
  const [projectsLoading,  setProjectsLoading]  = useState(false)
  const [projectsLoaded,   setProjectsLoaded]   = useState(false)
  // Creative Director notes — one per generation type
  const [directorNotes,    setDirectorNotes]    = useState({})
  const [directorLoading,  setDirectorLoading]  = useState(false)
  // Campaign Consistency
  const [consistencyResult, setConsistencyResult] = useState(null)
  const [consistencyLoading, setConsistencyLoading] = useState(false)
  // Ad Fatigue Detection
  const [fatigueResult,   setFatigueResult]   = useState(null)
  const [fatigueLoading,  setFatigueLoading]  = useState(false)
  // Project Score (Creative Score Dashboard)
  const [projectScore,    setProjectScore]    = useState(null)
  const [projectScoreLoading, setProjectScoreLoading] = useState(false)
  // Competitor / Inspired Analysis
  const [competitorText,  setCompetitorText]  = useState('')
  const [competitorResult, setCompetitorResult] = useState(null)
  const [competitorLoading, setCompetitorLoading] = useState(false)
  // Campaign Timeline
  const [timeline,        setTimeline]        = useState([])
  // Brand Brain winners
  const [winners,         setWinners]         = useState(() => {
    try { return JSON.parse(localStorage.getItem('promptceo_winners_v1') || '{"angles":[],"hooks":[]}') } catch { return { angles: [], hooks: [] } }
  })
  // Storyboards — keyed by video card index
  const [storyboards,     setStoryboards]     = useState({})
  const [storyboardLoading, setStoryboardLoading] = useState({})
  // Export Briefs
  const [briefs,          setBriefs]          = useState({})
  const [briefLoading,    setBriefLoading]    = useState(false)
  const [briefOpen,       setBriefOpen]       = useState(null) // 'campaign' | 'creator' | 'media_buyer'
  // Brand DNA state
  const [dnaProfiles,   setDnaProfiles]    = useState([])
  const [dnaName,       setDnaName]        = useState('')
  const [dnaSaveOpen,   setDnaSaveOpen]    = useState(false)

  // Load DNA profiles on mount
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('promptceo_ad_brand_dna_v1') || '[]')
      setDnaProfiles(raw)
    } catch {}
  }, [])

  // Auto-fetch Creative Director note + track timeline when a generation completes
  const prevGenerating = useRef(false)
  useEffect(() => {
    const wasGenerating = prevGenerating.current
    prevGenerating.current = s.adTextGenerating
    if (!wasGenerating || s.adTextGenerating) return
    const type = s.adTextType
    if (!type || type === 'variation' || type === 'quality_score') return
    const key = type + (s.adTextHookType ? `_${s.adTextHookType}` : '')
    if (!s.adTextResults?.[key]) return
    // Timeline event
    const count = Array.isArray(s.adTextResults[key]) ? s.adTextResults[key].length : s.adTextResults[key]?.hooks?.length || 1
    addTimelineEvent(`Generated ${type.replace(/_/g, ' ')}`, `${count} outputs`)
    // Director note
    if (!directorNotes[key]) fetchDirectorNote(key, s.adTextResults[key])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.adTextGenerating])

  const dnaPersist = (profiles) => {
    try { localStorage.setItem('promptceo_ad_brand_dna_v1', JSON.stringify(profiles)) } catch {}
    setDnaProfiles(profiles)
  }

  const dnaGetCurrentFields = () => ({
    productName, productDesc, targetMood, targetCustomer, mainProblem,
    mainDesire, mainBenefit, proofPoint, offer, callToAction,
    brandVoice, pricePoint, platformGoal, adPlatform, adStyle, inspiredStyle,
  })

  const dnaSaveProfile = () => {
    const name = dnaName.trim() || productName.trim() || `Brand ${Date.now()}`
    const profiles = dnaProfiles.filter(p => p.name !== name)
    const profile  = { id: Date.now(), name, savedAt: new Date().toISOString(), fields: dnaGetCurrentFields() }
    const updated  = [profile, ...profiles].slice(0, 10)
    dnaPersist(updated)
    setDnaName('')
    setDnaSaveOpen(false)
  }

  const dnaLoadProfile = (profile) => {
    const f = profile.fields || {}
    if (f.productName    !== undefined) setProductName(f.productName)
    if (f.productDesc    !== undefined) setProductDesc(f.productDesc)
    if (f.targetMood     !== undefined) setTargetMood(f.targetMood)
    if (f.targetCustomer !== undefined) setTargetCustomer(f.targetCustomer)
    if (f.mainProblem    !== undefined) setMainProblem(f.mainProblem)
    if (f.mainDesire     !== undefined) setMainDesire(f.mainDesire)
    if (f.mainBenefit    !== undefined) setMainBenefit(f.mainBenefit)
    if (f.proofPoint     !== undefined) setProofPoint(f.proofPoint)
    if (f.offer          !== undefined) setOffer(f.offer)
    if (f.callToAction   !== undefined) setCallToAction(f.callToAction)
    if (f.brandVoice     !== undefined) setBrandVoice(f.brandVoice)
    if (f.pricePoint     !== undefined) setPricePoint(f.pricePoint)
    if (f.platformGoal   !== undefined) setPlatformGoal(f.platformGoal)
    if (f.adPlatform     !== undefined) setAdPlatform(f.adPlatform)
    if (f.adStyle        !== undefined) setAdStyle(f.adStyle)
    if (f.inspiredStyle  !== undefined) setInspiredStyle(f.inspiredStyle)
  }

  const dnaDeleteProfile = (id) => {
    const updated = dnaProfiles.filter(p => p.id !== id)
    dnaPersist(updated)
  }

  // Output tab state
  const [adOutputTab,    setAdOutputTab]    = useState(() => {
    if (typeof window !== 'undefined' && window.__adStudioInitTab) {
      const tab = window.__adStudioInitTab
      delete window.__adStudioInitTab
      return tab
    }
    return 'creative'
  })
  const [activeHookType, setActiveHookType] = useState('pain')
  const [inspiredStyle,  setInspiredStyle]  = useState('none')
  const [scoreInput,     setScoreInput]     = useState('')
  const [copiedText,     setCopiedText]     = useState('')

  const doCopyAdText = async (text, key) => {
    try { await navigator.clipboard.writeText(text) } catch {}
    setCopiedText(key); setTimeout(() => setCopiedText(''), 1600)
  }

  const buildAdConfig = () => ({
    productName, productDescription: productDesc, adStyle, targetMood, platform: adPlatform,
    targetCustomer, mainProblem, mainDesire, mainBenefit, proofPoint,
    offer, callToAction, brandVoice, pricePoint, platformGoal,
    selectedAngle, selectedHook,
    lockedAngle, lockedHook, lockedCaption, lockedVisualStyle, lockedMusic, lockedBrandVoice,
  })

  const handleGenerateText = (type, hookType) => {
    if (!productName.trim()) return
    generateAdText({ type, hookType: hookType || null, adConfig: buildAdConfig(), inspiredStyle: inspiredStyle !== 'none' ? inspiredStyle : null })
  }

  const handleScoreContent = () => {
    if (!scoreInput.trim()) return
    generateAdText({ type: 'quality_score', adConfig: buildAdConfig(), contentToScore: scoreInput })
  }

  // Per-card image generation for image prompts tab
  const [cardImages,       setCardImages]       = useState({})  // { [cardKey]: { url, generating, error } }

  const generateCardImage = async (prompt, cardKey) => {
    setCardImages(prev => ({ ...prev, [cardKey]: { generating: true, url: '', error: '' } }))
    try {
      const res  = await fetch('/api/generate-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          prebuiltPrompt: prompt,  // use the AI-written image prompt directly
          mode: 'product_ad',
          adConfig: buildAdConfig(),
        }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        setCardImages(prev => ({ ...prev, [cardKey]: { generating: false, url: data.imageUrl, error: '' } }))
        if (typeof data.creditsRemaining === 'number') merge({ credits: data.creditsRemaining })
      } else {
        setCardImages(prev => ({ ...prev, [cardKey]: { generating: false, url: '', error: data?.message || 'Generation failed' } }))
      }
    } catch (err) {
      setCardImages(prev => ({ ...prev, [cardKey]: { generating: false, url: '', error: err.message } }))
    }
  }

  const handleVariation = (content, variationType, contentType = 'hook') => {
    if (!content || s.adTextGenerating) return
    generateAdText({
      type: 'variation', adConfig: buildAdConfig(),
      variationContent: content, variationType, variationContentType: contentType,
    })
  }

  // ── Build Full Ad Project ──────────────────────────────────
  // Chains angle → hook → captions + UGC sequentially via direct fetch.
  // Results land in s.adTextResults via merge.
  const handleBuildFullProject = async () => {
    if (!productName.trim() || buildingProject || s.adTextGenerating) return
    setBuildingProject(true)
    setProjectSaved(false)
    const baseConfig = buildAdConfig()
    const accum = {}

    const runStep = async (type, config, hookType) => {
      merge({ adTextGenerating: true, adTextType: type, adTextError: '' })
      const res = await fetch('/api/generate-ad-text', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, hookType: hookType || null, adConfig: config }),
      })
      const data = await res.json()
      merge({ adTextGenerating: false })
      if (data.status !== 'complete') throw new Error(data.message || `${type} generation failed`)
      if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      const key = type + (hookType ? `_${hookType}` : '')
      accum[key] = data.data
      merge({ adTextResults: { ...accum } })
      return data.data
    }

    try {
      // Step 1 — Angles
      const angles = await runStep('angles', baseConfig)
      const bestAngle = angles?.[0] || null
      if (bestAngle) setSelectedAngle(bestAngle)

      // Step 2 — Hooks (using selected angle)
      const configWithAngle = { ...baseConfig, selectedAngle: bestAngle }
      const hooksResult = await runStep('hooks', configWithAngle, 'pain')
      const bestHook = (Array.isArray(hooksResult?.hooks) ? hooksResult.hooks : hooksResult)?.[0] || null
      if (bestHook) setSelectedHook(bestHook)

      // Step 3 — Captions + UGC in parallel
      const configFull = { ...configWithAngle, selectedHook: bestHook }
      await Promise.all([
        runStep('captions', configFull),
        runStep('ugc_scripts', configFull),
      ])

      setAdOutputTab('angles')
    } catch (err) {
      merge({ adTextError: err.message, adTextGenerating: false })
    } finally {
      setBuildingProject(false)
      merge({ adTextGenerating: false })
    }
  }

  const handleSaveProject = async () => {
    if (!productName.trim()) return
    try {
      const res = await fetch('/api/save-ad-project', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          campaignName: productName,
          platform: adPlatform,
          campaignGoal: platformGoal,
          brandVoice,
          visualStyle: adStyle,
          selectedAngle,
          selectedHook,
          fullContext: buildAdConfig(),
          outputs: s.adTextResults || {},
          musicTrackId: s.adMusicTrack?.id || null,
          musicLicenseId: s.adMusicLicenseId || null,
        }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setProjectSaved(true)
        setProjectsLoaded(false) // force reload next open
      }
    } catch {}
  }

  const fetchDirectorNote = async (type, data) => {
    if (!productName.trim() || directorNotes[type]) return
    setDirectorLoading(true)
    try {
      const res  = await fetch('/api/creative-director-note', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, adConfig: buildAdConfig() }),
      })
      const resp = await res.json()
      if (resp.status === 'success') {
        setDirectorNotes(prev => ({ ...prev, [type]: resp.note }))
      }
    } catch {}
    finally { setDirectorLoading(false) }
  }

  const checkConsistency = async () => {
    if (!productName.trim() || consistencyLoading) return
    setConsistencyLoading(true)
    try {
      const res  = await fetch('/api/campaign-consistency', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...buildAdConfig(),
          adMusicTrack: s.adMusicTrack,
          adTextResults: s.adTextResults,
        }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setConsistencyResult(data.report)
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setConsistencyLoading(false) }
  }

  const checkAdFatigue = async () => {
    if (fatigueLoading || !s.adTextResults || Object.keys(s.adTextResults).length < 2) return
    setFatigueLoading(true)
    try {
      const res  = await fetch('/api/ad-fatigue', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outputs: s.adTextResults, adConfig: buildAdConfig() }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setFatigueResult(data.report)
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setFatigueLoading(false) }
  }

  const scoreFullProject = async () => {
    if (projectScoreLoading || !productName.trim()) return
    setProjectScoreLoading(true)
    try {
      const res  = await fetch('/api/project-score', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adConfig: buildAdConfig(),
          outputs: s.adTextResults || {},
          selections: { selectedAngle, selectedHook, lockedAngle, lockedHook, lockedBrandVoice, lockedVisualStyle, lockedMusic, adMusicTrack: s.adMusicTrack },
        }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setProjectScore(data.score)
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setProjectScoreLoading(false) }
  }

  const analyseCompetitor = async () => {
    if (!competitorText.trim() || competitorLoading) return
    setCompetitorLoading(true)
    try {
      const res  = await fetch('/api/competitor-analysis', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitorText, adConfig: buildAdConfig() }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setCompetitorResult(data.analysis)
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setCompetitorLoading(false) }
  }

  const addTimelineEvent = (event, detail = '') => {
    setTimeline(prev => [{ ts: Date.now(), event, detail }, ...prev].slice(0, 30))
  }

  const toggleWinner = (type, item) => {
    setWinners(prev => {
      const key = type === 'angle' ? 'angles' : 'hooks'
      const id  = type === 'angle' ? item.title : item
      const exists = prev[key].some(w => (type === 'angle' ? w.title : w) === id)
      const updated = exists
        ? { ...prev, [key]: prev[key].filter(w => (type === 'angle' ? w.title : w) !== id) }
        : { ...prev, [key]: [item, ...prev[key]].slice(0, 10) }
      try { localStorage.setItem('promptceo_winners_v1', JSON.stringify(updated)) } catch {}
      return updated
    })
  }

  const generateStoryboard = async (videoPrompt, cardKey, adDuration = 30) => {
    setStoryboardLoading(prev => ({ ...prev, [cardKey]: true }))
    try {
      const res  = await fetch('/api/video-storyboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoPrompt, adConfig: { ...buildAdConfig(), adMusicTrack: s.adMusicTrack }, adDuration }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setStoryboards(prev => ({ ...prev, [cardKey]: data.storyboard }))
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setStoryboardLoading(prev => ({ ...prev, [cardKey]: false })) }
  }

  const generateBrief = async (briefType) => {
    if (briefLoading || briefs[briefType]) { setBriefOpen(briefType); return }
    setBriefLoading(true)
    try {
      const res  = await fetch('/api/export-brief', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ briefType, adConfig: { ...buildAdConfig(), adMusicTrack: s.adMusicTrack }, outputs: s.adTextResults || {} }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setBriefs(prev => ({ ...prev, [briefType]: data.brief }))
        setBriefOpen(briefType)
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      }
    } catch {}
    finally { setBriefLoading(false) }
  }

  const exportBriefAsTxt = (brief) => {
    if (!brief) return
    const text = [
      brief.title,
      '='.repeat(brief.title?.length || 40),
      '',
      ...(brief.sections || []).flatMap(sec => [
        sec.heading.toUpperCase(),
        '-'.repeat(sec.heading.length),
        sec.content,
        '',
      ])
    ].join('\n')
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
      download: `${brief.title?.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'brief'}.txt`,
    })
    a.click()
  }

  const loadSavedProjects = async () => {
    if (projectsLoading) return
    setProjectsLoading(true)
    try {
      const res  = await fetch('/api/load-ad-projects')
      const data = await res.json()
      if (data.status === 'success') {
        setSavedProjects(data.projects || [])
        setProjectsLoaded(true)
      }
    } catch {}
    finally { setProjectsLoading(false) }
  }

  const restoreProject = (project) => {
    const ctx = project.full_context || {}
    // Restore all form fields
    if (ctx.productName          !== undefined) setProductName(ctx.productName)
    if (ctx.productDescription   !== undefined) setProductDesc(ctx.productDescription)
    if (ctx.targetMood           !== undefined) setTargetMood(ctx.targetMood)
    if (ctx.platform             !== undefined) setAdPlatform(ctx.platform)
    if (ctx.targetCustomer       !== undefined) setTargetCustomer(ctx.targetCustomer)
    if (ctx.mainProblem          !== undefined) setMainProblem(ctx.mainProblem)
    if (ctx.mainDesire           !== undefined) setMainDesire(ctx.mainDesire)
    if (ctx.mainBenefit          !== undefined) setMainBenefit(ctx.mainBenefit)
    if (ctx.proofPoint           !== undefined) setProofPoint(ctx.proofPoint)
    if (ctx.offer                !== undefined) setOffer(ctx.offer)
    if (ctx.callToAction         !== undefined) setCallToAction(ctx.callToAction)
    if (ctx.brandVoice           !== undefined) setBrandVoice(ctx.brandVoice)
    if (ctx.pricePoint           !== undefined) setPricePoint(ctx.pricePoint)
    if (ctx.platformGoal         !== undefined) setPlatformGoal(ctx.platformGoal)
    if (ctx.adStyle              !== undefined) setAdStyle(ctx.adStyle)
    // Restore selections
    if (project.selected_angle)  setSelectedAngle(project.selected_angle)
    if (project.selected_hook)   setSelectedHook(project.selected_hook)
    // Restore all generated outputs
    if (project.outputs && Object.keys(project.outputs).length > 0) {
      merge({ adTextResults: project.outputs })
    }
    setProjectSaved(true)
    setAdOutputTab('angles')
  }

  // Export helpers — client-side only, no API needed
  const exportTxt = (content, filename) => {
    const text = Array.isArray(content)
      ? content.map((item, i) => `--- ${i + 1} ---\n${extractText(item)}`).join('\n\n')
      : String(content)
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
      download: filename || `promptceo-ad-${Date.now()}.txt`,
    })
    a.click()
  }

  const exportJson = (content, filename) => {
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })),
      download: filename || `promptceo-ad-${Date.now()}.json`,
    })
    a.click()
  }

  const extractText = (item) => {
    if (typeof item === 'string') return item
    return item?.fullCaption || item?.hook || item?.script || item?.prompt || item?.fullPrompt || JSON.stringify(item)
  }

  const copyAll = (items) => {
    const text = (items || []).map((item, i) => `${i + 1}. ${extractText(item)}`).join('\n\n')
    doCopyAdText(text, 'copy_all')
  }

  // Variation bar — rendered below each generate button or inline
  const VARIATION_BUTTONS = [
    { id: 'luxury',    label: '👑 Luxury'    },
    { id: 'emotional', label: '💛 Emotional' },
    { id: 'direct',    label: '⚡ Direct'    },
    { id: 'viral',     label: '🔥 Viral'     },
    { id: 'shorter',   label: '✂ Shorter'    },
    { id: 'premium',   label: '💎 Premium'   },
    { id: 'ugc',       label: '📱 UGC'       },
    { id: 'cinematic', label: '🎬 Cinematic' },
    { id: 'bold',      label: '💥 Bolder'    },
    { id: 'curious',   label: '🔮 Curious'   },
  ]

  // Prominent variation buttons — 6 core actions
  const QUICK_VARIATIONS = [
    { id: 'luxury',    label: '👑 More Luxury',    color: '#c8a84b' },
    { id: 'direct',    label: '⚡ More Direct',    color: '#4a8ab4' },
    { id: 'emotional', label: '💛 More Emotional', color: '#c8843a' },
    { id: 'viral',     label: '🔥 More Viral',     color: '#b44a4a' },
    { id: 'shorter',   label: '✂ Shorter',         color: '#4a9a6a' },
    { id: 'bold',      label: '💥 Bolder',         color: '#9b6fd4' },
  ]
  const MORE_VARIATIONS = [
    { id: 'premium',   label: '💎 Premium'   },
    { id: 'ugc',       label: '📱 UGC'       },
    { id: 'cinematic', label: '🎬 Cinematic' },
    { id: 'curious',   label: '🔮 Curious'   },
  ]

  const VariationBar = ({ content, contentType = 'hook' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
      <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Make it more…</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {QUICK_VARIATIONS.map(v => (
          <button key={v.id}
            onClick={() => handleVariation(content, v.id, contentType)}
            disabled={s.adTextGenerating}
            style={{
              padding: '5px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
              cursor: s.adTextGenerating ? 'not-allowed' : 'pointer',
              border: `1px solid ${v.color}44`, background: v.color + '11',
              color: s.adTextGenerating ? C.muted : v.color,
              whiteSpace: 'nowrap', opacity: s.adTextGenerating ? 0.5 : 1,
              transition: 'all 0.15s',
            }}
          >
            {v.label}
          </button>
        ))}
        {MORE_VARIATIONS.map(v => (
          <button key={v.id}
            onClick={() => handleVariation(content, v.id, contentType)}
            disabled={s.adTextGenerating}
            style={{
              padding: '4px 8px', borderRadius: 999, fontSize: 9, fontWeight: 700,
              cursor: s.adTextGenerating ? 'not-allowed' : 'pointer',
              border: `1px solid ${C.hairline}`, background: C.deep,
              color: C.muted, whiteSpace: 'nowrap', opacity: s.adTextGenerating ? 0.5 : 1,
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )

  const ExportBar = ({ items, filename, type }) => (
    <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
      <button onClick={() => copyAll(items)} style={{ padding: '5px 10px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === 'copy_all' ? C.green : C.secondary }}>
        {copiedText === 'copy_all' ? '✓ Copied All' : '⎘ Copy All'}
      </button>
      <button onClick={() => exportTxt(items, `${filename}.txt`)} style={{ padding: '5px 10px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary }}>
        ↓ TXT
      </button>
      <button onClick={() => exportJson(items, `${filename}.json`)} style={{ padding: '5px 10px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary }}>
        ↓ JSON
      </button>
    </div>
  )

  // Variation result display (inline, appended below the originals)
  const variationResult = s.adTextResults?.variation
  const VariationResult = () => {
    if (!variationResult || s.adTextType !== 'variation' || s.adTextGenerating) return null
    return (
      <div style={{ borderRadius: 6, border: `2px solid ${C.goldDim}`, background: C.goldGlow, overflow: 'hidden' }}>
        <div style={{ padding: '7px 11px', background: '#1a1408', borderBottom: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>✦ Variation — {variationResult.variationLabel}</span>
          <button onClick={() => doCopyAdText(variationResult.content, 'var_result')} style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: C.raised, color: copiedText === 'var_result' ? C.green : C.gold }}>
            {copiedText === 'var_result' ? '✓' : '⎘ Copy'}
          </button>
        </div>
        <div style={{ padding: '10px 11px', fontSize: 12, color: C.primary, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {variationResult.content}
        </div>
      </div>
    )
  }
  const [suggesting, setSuggesting]     = useState(false)
  const [suggested, setSuggested]       = useState(false)
  const [localCopied, setLocalCopied]   = useState('')

  // ── Creative Director Note component ─────────────────────
  const DirectorNote = ({ noteKey }) => {
    const note = directorNotes[noteKey]
    if (!note && !directorLoading) return null
    if (directorLoading && !note) {
      return (
        <div style={{ borderRadius: 6, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, animation: 'pulse 1s infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 10, color: C.gold }}>Creative Director is reviewing…</span>
        </div>
      )
    }
    if (!note) return null
    return (
      <div style={{ borderRadius: 6, border: `1px solid ${C.goldDim}`, background: '#0d0c04', overflow: 'hidden' }}>
        <div style={{ padding: '7px 12px', background: '#1a1408', borderBottom: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 1 }}>✦ CREATIVE DIRECTOR</span>
          <button onClick={() => setDirectorNotes(prev => { const n = { ...prev }; delete n[noteKey]; return n })}
            style={{ fontSize: 8, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}>✕</button>
        </div>
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {note.directorQuote && (
            <div style={{ fontSize: 12, color: C.primary, fontStyle: 'italic', lineHeight: 1.55, borderLeft: `2px solid ${C.gold}`, paddingLeft: 10 }}>
              "{note.directorQuote}"
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <div style={{ padding: '6px 8px', borderRadius: 4, background: '#081208', border: '1px solid #1a3a1a' }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.green, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Why it works</div>
              <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.5 }}>{note.whyThisWorks}</div>
            </div>
            <div style={{ padding: '6px 8px', borderRadius: 4, background: '#110806', border: '1px solid #2a1010' }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: '#cf6a6a', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>What is weak</div>
              <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.5 }}>{note.whatIsWeak}</div>
            </div>
          </div>
          {note.bestNextAction && (
            <div style={{ padding: '6px 10px', borderRadius: 4, background: C.raised, border: `1px solid ${C.subtle}` }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase' }}>Next action: </span>
              <span style={{ fontSize: 10, color: C.primary }}>{note.bestNextAction}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const cost = adOutputType === 'video' ? 60 : 5
  const hasEnoughCredits = (s.credits || 0) >= cost
  const hasIdentity = !!s.imageDataUrl
  const isGenerating = s.adGenerating
  const canGenerate = hasEnoughCredits && !isGenerating && (adMode !== 'product_ad' || productName.trim())

  // AI auto-suggest style from product name
  const handleProductNameBlur = async () => {
    if (!productName.trim() || suggested || suggesting) return
    setSuggesting(true)
    try {
      const n = productName.toLowerCase()
      if (/food|cookie|cake|snack|bread|burger|pizza|coffee|tea|drink/.test(n)) {
        setAdStyle('lifestyle'); setTargetMood('warm, indulgent, craveable')
      } else if (/serum|cream|skin|beauty|glow|moistur|makeup|lip|face/.test(n)) {
        setAdStyle('minimal'); setTargetMood('clean, premium, clinical trust')
      } else if (/gym|protein|fitness|sport|muscle|workout|supplement|whey/.test(n)) {
        setAdStyle('cinematic'); setTargetMood('powerful, energetic, bold')
      } else if (/fashion|wear|dress|shoe|bag|jacket|coat|style|cloth/.test(n)) {
        setAdStyle('editorial'); setTargetMood('aspirational, stylish, confident')
      } else if (/app|tech|software|ai|digital|saas|tool|platform/.test(n)) {
        setAdStyle('minimal'); setTargetMood('modern, clean, innovative')
      } else if (/luxury|premium|gold|elite|vip|exclusive/.test(n)) {
        setAdStyle('editorial'); setTargetMood('luxury, exclusive, high-status')
      }
      setSuggested(true)
    } finally {
      setSuggesting(false)
    }
  }

  function handleGenerate() {
    if (!canGenerate) return
    const adConfig = adMode === 'product_ad'
      ? {
          productName,
          productDescription: productDesc,
          adStyle,
          targetMood,
          platform: adPlatform,
          format: adFormat,
          // Phase 1 strategy fields
          targetCustomer,
          mainProblem,
          mainDesire,
          mainBenefit,
          proofPoint,
          offer,
          callToAction,
          brandVoice,
          pricePoint,
          platformGoal,
        }
      : { creatorNiche, adGoal, visualStyle, platform: adPlatform, extraContext, format: adFormat }

    const strategyContext = adMode === 'product_ad' && (targetCustomer || mainProblem || mainBenefit)
      ? [
          targetCustomer && `Target: ${targetCustomer}`,
          mainProblem    && `Problem: ${mainProblem}`,
          mainDesire     && `Desire: ${mainDesire}`,
          mainBenefit    && `Benefit: ${mainBenefit}`,
          proofPoint     && `Proof: ${proofPoint}`,
          offer          && `Offer: ${offer}`,
          callToAction   && `CTA: ${callToAction}`,
          `Voice: ${brandVoice}`,
          `Price: ${pricePoint}`,
          `Goal: ${platformGoal}`,
        ].filter(Boolean).join('. ')
      : ''

    const promptContext = adMode === 'product_ad'
      ? `${adStyle} ${adFormat} ad for ${productName}. ${productDesc}. Mood: ${targetMood}${strategyContext ? '. ' + strategyContext : ''}`
      : `${creatorNiche} creator ${adGoal} campaign. ${visualStyle}. Platform: ${adPlatform}`

    if (adOutputType === 'video') {
      generateAdVideo({ prompt: promptContext, mode: adMode, adConfig })
    } else {
      generateAdImage({ prompt: promptContext, mode: adMode, adConfig })
    }
  }

  function handleAnimate() {
    const promptContext = adMode === 'product_ad'
      ? `${adStyle} video ad for ${productName}. ${targetMood}`
      : `${creatorNiche} brand video. ${adGoal} campaign.`
    generateAdVideo({
      prompt: promptContext, mode: adMode, imageUrl: s.adGeneratedImage,
      adConfig: adMode === 'product_ad'
        ? { productName, adStyle, platform: adPlatform }
        : { creatorNiche, adGoal, platform: adPlatform },
    })
  }

  async function doCopy(text, key) {
    try { await navigator.clipboard.writeText(text) } catch {}
    setLocalCopied(key); setTimeout(() => setLocalCopied(''), 1600)
  }

  // Shared input style — matches rest of app but slightly larger
  const inp = {
    width: '100%', background: C.deep, color: C.primary,
    border: `1px solid ${C.subtle}`, borderRadius: 4,
    padding: '8px 10px', fontSize: 12, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
  }

  // Reusable section label
  const SLabel = ({ children, hint }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: C.secondary }}>{children}</span>
      {hint && <span style={{ fontSize: 9, color: C.goldDim }}>{hint}</span>}
    </div>
  )

  // Active/inactive card border helper
  const cardBorder = active => active
    ? { border: `1px solid ${C.goldDim}`, background: '#1a1408' }
    : { border: `1px solid ${C.hairline}`, background: C.deep }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>

      {/* ══ LEFT — Config ════════════════════════════════ */}
      <div style={{ borderRight: `1px solid ${C.hairline}`, overflowY: 'auto', padding: '10px 9px', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Brand DNA */}
        <Panel title="Brand DNA" accent={C.violet} defaultOpen={false}>
          {/* Saved profiles */}
          {dnaProfiles.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
              {dnaProfiles.map(profile => (
                <div key={profile.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 8px', borderRadius: 4, background: C.raised, border: `1px solid ${C.hairline}` }}>
                  <button onClick={() => dnaLoadProfile(profile)} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>{profile.name}</div>
                    <div style={{ fontSize: 8, color: C.secondary }}>
                      {profile.fields?.productName || '—'} · {new Date(profile.savedAt).toLocaleDateString()}
                    </div>
                  </button>
                  <button onClick={() => dnaDeleteProfile(profile.id)} style={{ padding: '2px 6px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Save current */}
          {!dnaSaveOpen ? (
            <button onClick={() => setDnaSaveOpen(true)} style={{ width: '100%', padding: '7px 0', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: '#0e0818', color: C.violet }}>
              + Save Current Brand
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 5 }}>
              <input
                value={dnaName}
                onChange={e => setDnaName(e.target.value)}
                placeholder={productName || 'Brand name…'}
                style={{ flex: 1, background: C.deep, color: C.primary, border: `1px solid ${C.violetDim}`, borderRadius: 4, padding: '6px 8px', fontSize: 11, outline: 'none', fontFamily: 'inherit' }}
                onKeyDown={e => e.key === 'Enter' && dnaSaveProfile()}
                autoFocus
              />
              <button onClick={dnaSaveProfile} style={{ padding: '6px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.violetDim}`, background: '#0e0818', color: C.violet }}>Save</button>
              <button onClick={() => setDnaSaveOpen(false)} style={{ padding: '6px 8px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted }}>✕</button>
            </div>
          )}

          {dnaProfiles.length === 0 && !dnaSaveOpen && (
            <div style={{ fontSize: 9, color: C.secondary, textAlign: 'center', marginTop: 4, lineHeight: 1.5 }}>
              Fill in your product details and save a brand profile to reload instantly next time.
            </div>
          )}

          {/* Brand Brain Winners */}
          {(winners.angles.length > 0 || winners.hooks.length > 0) && (
            <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 8, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase' }}>⭐ Brand Brain Winners</div>
              {winners.angles.slice(0, 3).map((a, i) => (
                <div key={i} style={{ padding: '5px 7px', borderRadius: 3, background: C.goldGlow, border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, fontSize: 9, color: C.gold, fontWeight: 700 }}>{a.title}</div>
                  <button onClick={() => toggleWinner('angle', a)} style={{ fontSize: 8, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>✕</button>
                </div>
              ))}
              {winners.hooks.slice(0, 3).map((h, i) => (
                <div key={i} style={{ padding: '5px 7px', borderRadius: 3, background: C.goldGlow, border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, fontSize: 9, color: C.primary, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>"{h.slice(0, 50)}{h.length > 50 ? '…' : ''}"</div>
                  <button onClick={() => toggleWinner('hook', h)} style={{ fontSize: 8, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>✕</button>
                </div>
              ))}
            </div>
          )}

          {(dnaProfiles.length === 0 && !dnaSaveOpen && winners.angles.length === 0 && winners.hooks.length === 0) && (
            <div style={{ fontSize: 9, color: C.secondary, textAlign: 'center', marginTop: 4, lineHeight: 1.5 }}>
              Star your best angles and hooks to build your Brand Brain.
            </div>
          )}
        </Panel>

        {/* My Projects */}
        <Panel title="My Projects" accent={C.blue} defaultOpen={false}>

          {/* Save current project — always visible */}
          <button
            onClick={handleSaveProject}
            disabled={!productName.trim()}
            style={{
              width: '100%', padding: '9px 0', borderRadius: 4,
              fontSize: 11, fontWeight: 700,
              cursor: productName.trim() ? 'pointer' : 'not-allowed',
              border: `1px solid ${projectSaved ? '#2a4a2a' : productName.trim() ? C.blueDim : C.hairline}`,
              background: projectSaved ? '#081208' : productName.trim() ? '#080c10' : C.deep,
              color: projectSaved ? C.green : productName.trim() ? C.blue : C.muted,
              opacity: productName.trim() ? 1 : 0.5,
            }}
          >
            {projectSaved ? '✓ Project Saved' : '↑ Save Current Project'}
          </button>

          {!productName.trim() && (
            <div style={{ fontSize: 9, color: C.secondary, textAlign: 'center', lineHeight: 1.5 }}>
              Enter a product name first, then save.
            </div>
          )}

          <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Saved Projects</span>
              <button
                onClick={loadSavedProjects}
                style={{ padding: '2px 8px', borderRadius: 3, fontSize: 8, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary }}
              >
                {projectsLoading ? '⟳' : '↺ Load'}
              </button>
            </div>
          </div>

          {!projectsLoaded && !projectsLoading && (
            <div style={{ fontSize: 9, color: C.secondary, textAlign: 'center', lineHeight: 1.5 }}>
              Click ↺ Load to see your saved projects.
            </div>
          )}
          {projectsLoading && (
            <div style={{ fontSize: 10, color: C.secondary, textAlign: 'center', padding: '6px 0' }}>Loading projects…</div>
          )}
          {projectsLoaded && savedProjects.length === 0 && (
            <div style={{ fontSize: 10, color: C.secondary, textAlign: 'center', padding: '6px 0', lineHeight: 1.5 }}>
              No saved projects yet.
            </div>
          )}
          {projectsLoaded && savedProjects.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {savedProjects.map(project => (
                <div
                  key={project.id}
                  style={{ borderRadius: 4, border: `1px solid ${C.hairline}`, background: C.raised, overflow: 'hidden' }}
                >
                  <button
                    onClick={() => restoreProject(project)}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 10px' }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 3 }}>
                      {project.product_name || project.campaign_name || 'Untitled'}
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {project.platform && (
                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>
                          {project.platform}
                        </span>
                      )}
                      {project.campaign_goal && (
                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>
                          {project.campaign_goal}
                        </span>
                      )}
                      {project.selected_angle && (
                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: C.goldGlow, border: `1px solid ${C.goldDim}`, color: C.gold }}>
                          ✦ Angle
                        </span>
                      )}
                      {project.outputs && Object.keys(project.outputs).length > 0 && (
                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 999, background: '#081208', border: '1px solid #1a3a1a', color: C.green }}>
                          {Object.keys(project.outputs).length} outputs
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 8, color: C.muted, marginTop: 4 }}>
                      {new Date(project.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* Ad Mode */}
        <Panel title="Ad Mode" accent={C.gold}>
          <div style={{ display: 'flex', gap: 5 }}>
            {[
              { value: 'product_ad',        icon: '📦', title: 'Product Ad',     desc: 'Ecommerce & brand' },
              { value: 'personal_brand_ad', icon: '⭐', title: 'Personal Brand', desc: 'Creator & influencer' },
            ].map(m => (
              <button key={m.value} onClick={() => setAdMode(m.value)} style={{
                flex: 1, borderRadius: 4, padding: '10px 8px', textAlign: 'left',
                cursor: 'pointer', transition: 'all 0.15s', ...cardBorder(adMode === m.value),
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{m.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: adMode === m.value ? C.gold : C.primary, marginBottom: 2 }}>{m.title}</div>
                <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4 }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </Panel>

        {/* Output + Format */}
        <Panel title="Output" accent={C.gold}>
          <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
            {[{ value: 'image', icon: '🖼️', label: 'Image', cost: 5 }, { value: 'video', icon: '🎬', label: 'Video', cost: 60 }].map(t => (
              <button key={t.value} onClick={() => setAdOutputType(t.value)} style={{
                flex: 1, padding: '8px 6px', borderRadius: 4,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                transition: 'all 0.12s', ...cardBorder(adOutputType === t.value),
                color: adOutputType === t.value ? C.gold : C.primary,
              }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span>{t.label}</span>
                <span style={{ fontSize: 9, opacity: 0.7 }}>{t.cost} cr</span>
              </button>
            ))}
          </div>
          <SLabel>Format</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {[
              { value: 'story',    label: 'Story',    icon: '▯' },
              { value: 'feed',     label: 'Feed',     icon: '▪' },
              { value: 'banner',   label: 'Banner',   icon: '▬' },
              { value: 'carousel', label: 'Carousel', icon: '▧' },
            ].map(f => (
              <button key={f.value} onClick={() => setAdFormat(f.value)} style={{
                borderRadius: 4, padding: '6px 4px', textAlign: 'center',
                cursor: 'pointer', fontSize: 9, fontWeight: 700,
                transition: 'all 0.12s', ...cardBorder(adFormat === f.value),
                color: adFormat === f.value ? C.gold : C.primary,
              }}>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{f.icon}</div>
                {f.label}
              </button>
            ))}
          </div>
        </Panel>

        {/* Platform */}
        <Panel title="Platform" accent={C.gold}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {[
              { value: 'instagram', label: 'Instagram' },
              { value: 'tiktok',    label: 'TikTok'    },
              { value: 'facebook',  label: 'Facebook'  },
              { value: 'general',   label: 'Universal' },
            ].map(p => (
              <button key={p.value} onClick={() => setAdPlatform(p.value)} style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.12s', whiteSpace: 'nowrap',
                ...cardBorder(adPlatform === p.value),
                color: adPlatform === p.value ? C.gold : C.primary,
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </Panel>

        {/* ── PRODUCT AD FORM ── */}
        {adMode === 'product_ad' && (
          <>
            <Panel title="Product Details" accent={C.gold}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div>
                  <SLabel hint={suggesting ? '✦ reading…' : suggested ? '✓ style auto-set' : ''}>Product name *</SLabel>
                  <input value={productName} onChange={e => { setProductName(e.target.value); setSuggested(false) }}
                    onBlur={handleProductNameBlur}
                    placeholder="e.g. Lumina Face Serum"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                  />
                </div>
                <div>
                  <SLabel>Description</SLabel>
                  <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)}
                    placeholder="What does it do? Who is it for?"
                    rows={2} style={{ ...inp, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel hint={suggested ? '✦ AI suggested' : ''}>Target mood</SLabel>
                  <input value={targetMood} onChange={e => setTargetMood(e.target.value)}
                    placeholder="e.g. premium, warm, bold, clean…"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
              </div>
            </Panel>

            {/* ── AD STRATEGY ── */}
            <Panel title="Ad Strategy" accent={C.gold} defaultOpen={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div>
                  <SLabel>Target Customer</SLabel>
                  <input value={targetCustomer} onChange={e => setTargetCustomer(e.target.value)}
                    placeholder="e.g. women 25-40 who want glowing skin"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Main Problem</SLabel>
                  <input value={mainProblem} onChange={e => setMainProblem(e.target.value)}
                    placeholder="e.g. dull tired-looking skin"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Main Desire</SLabel>
                  <input value={mainDesire} onChange={e => setMainDesire(e.target.value)}
                    placeholder="e.g. radiant, effortlessly beautiful skin"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Main Benefit</SLabel>
                  <input value={mainBenefit} onChange={e => setMainBenefit(e.target.value)}
                    placeholder="e.g. visibly brighter skin in 7 days"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Proof Point</SLabel>
                  <input value={proofPoint} onChange={e => setProofPoint(e.target.value)}
                    placeholder="e.g. 50,000 women, dermatologist-tested"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Offer</SLabel>
                  <input value={offer} onChange={e => setOffer(e.target.value)}
                    placeholder="e.g. 20% off, free shipping, limited bundle"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Call to Action</SLabel>
                  <input value={callToAction} onChange={e => setCallToAction(e.target.value)}
                    placeholder="e.g. Shop now, Book a call, Download free"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
              </div>
            </Panel>

            {/* ── BRAND VOICE ── */}
            <Panel title="Brand Voice" accent={C.gold} defaultOpen={false}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, marginBottom: 8 }}>
                {[
                  { value: 'luxury',     label: 'Luxury',     desc: 'Premium, exclusive' },
                  { value: 'bold',       label: 'Bold',       desc: 'Direct, high energy' },
                  { value: 'emotional',  label: 'Emotional',  desc: 'Deep, heartfelt' },
                  { value: 'clean',      label: 'Clean',      desc: 'Minimal, modern' },
                  { value: 'aggressive', label: 'Aggressive', desc: 'Urgent, no-nonsense' },
                  { value: 'feminine',   label: 'Feminine',   desc: 'Soft, aspirational' },
                  { value: 'premium',    label: 'Premium',    desc: 'Refined, quality-first' },
                  { value: 'friendly',   label: 'Friendly',   desc: 'Warm, relatable' },
                ].map(v => (
                  <button key={v.value} onClick={() => { if (!lockedBrandVoice) setBrandVoice(v.value) }} style={{
                    borderRadius: 4, padding: '6px 8px', textAlign: 'left',
                    cursor: lockedBrandVoice ? 'default' : 'pointer',
                    transition: 'all 0.12s', ...cardBorder(brandVoice === v.value),
                    opacity: lockedBrandVoice && lockedBrandVoice !== v.value ? 0.4 : 1,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: brandVoice === v.value ? C.gold : C.primary }}>{v.label}</div>
                    <div style={{ fontSize: 8, color: C.secondary, marginTop: 1 }}>{v.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => lockedBrandVoice ? setLockedBrandVoice(null) : setLockedBrandVoice(brandVoice)}
                style={{
                  width: '100%', padding: '5px 0', borderRadius: 4, fontSize: 9, fontWeight: 700,
                  cursor: 'pointer', marginBottom: 4,
                  border: `1px solid ${lockedBrandVoice ? C.gold : C.subtle}`,
                  background: lockedBrandVoice ? '#1a1c08' : C.surface,
                  color: lockedBrandVoice ? C.gold : C.muted,
                }}
              >
                {lockedBrandVoice ? `🔒 Locked: ${lockedBrandVoice} — click to unlock` : '🔓 Lock Brand Voice'}
              </button>

              <SLabel>Price Point</SLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, marginBottom: 8 }}>
                {[
                  { value: 'low-ticket', label: 'Low Ticket', desc: 'Under $50' },
                  { value: 'mid-ticket', label: 'Mid Ticket', desc: '$50–$300' },
                  { value: 'premium',    label: 'Premium',    desc: '$300–$1000' },
                  { value: 'luxury',     label: 'Luxury',     desc: '$1000+' },
                ].map(p => (
                  <button key={p.value} onClick={() => setPricePoint(p.value)} style={{
                    borderRadius: 4, padding: '6px 8px', textAlign: 'left',
                    cursor: 'pointer', transition: 'all 0.12s', ...cardBorder(pricePoint === p.value),
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: pricePoint === p.value ? C.gold : C.primary }}>{p.label}</div>
                    <div style={{ fontSize: 8, color: C.secondary, marginTop: 1 }}>{p.desc}</div>
                  </button>
                ))}
              </div>

              <SLabel>Campaign Goal</SLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {[
                  { value: 'awareness',   label: 'Awareness' },
                  { value: 'traffic',     label: 'Traffic' },
                  { value: 'leads',       label: 'Leads' },
                  { value: 'sales',       label: 'Sales' },
                  { value: 'retargeting', label: 'Retargeting' },
                ].map(g => (
                  <button key={g.value} onClick={() => setPlatformGoal(g.value)} style={{
                    padding: '5px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.12s', whiteSpace: 'nowrap',
                    ...cardBorder(platformGoal === g.value),
                    color: platformGoal === g.value ? C.gold : C.primary,
                  }}>
                    {g.label}
                  </button>
                ))}
              </div>
            </Panel>

            {/* ── INSPIRED STYLE ── */}
            <Panel title="Inspired Style" accent={C.gold} defaultOpen={false}>
              <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.5, marginBottom: 8 }}>
                Apply a brand creative DNA to your output. We translate — not copy.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
                {[
                  { value: 'none',    label: 'None',    desc: 'Engine defaults' },
                  { value: 'apple',   label: 'Apple',   desc: 'Minimal. Pure.' },
                  { value: 'nike',    label: 'Nike',    desc: 'Bold. Action.' },
                  { value: 'dior',    label: 'Dior',    desc: 'Luxury. Fashion.' },
                  { value: 'skims',   label: 'Skims',   desc: 'Body. Inclusive.' },
                  { value: 'alo',     label: 'Alo',     desc: 'Wellness. Soft.' },
                  { value: 'gymshark',label: 'Gymshark',desc: 'Fitness. Real.' },
                  { value: 'redbull', label: 'Red Bull',desc: 'Extreme. Energy.' },
                  { value: 'tesla',   label: 'Tesla',   desc: 'Future. Precise.' },
                ].map(st => (
                  <button key={st.value} onClick={() => setInspiredStyle(st.value)} style={{
                    borderRadius: 4, padding: '6px 8px', textAlign: 'left', cursor: 'pointer',
                    transition: 'all 0.12s', ...cardBorder(inspiredStyle === st.value),
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: inspiredStyle === st.value ? C.gold : C.primary }}>{st.label}</div>
                    <div style={{ fontSize: 8, color: C.secondary, marginTop: 1 }}>{st.desc}</div>
                  </button>
                ))}
              </div>
              {inspiredStyle !== 'none' && (
                <div style={{ marginTop: 6, padding: '6px 8px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 9, color: C.gold }}>
                  ✦ {inspiredStyle.charAt(0).toUpperCase() + inspiredStyle.slice(1)} style will influence all text generation
                </div>
              )}
            </Panel>

            <Panel title="Visual Style" accent={C.gold}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                {[
                  { value: 'lifestyle',  label: 'Lifestyle',  icon: '🌅', desc: 'Real-world scene' },
                  { value: 'minimal',    label: 'Minimal',    icon: '⬜', desc: 'Product hero' },
                  { value: 'editorial',  label: 'Editorial',  icon: '📸', desc: 'Fashion aesthetic' },
                  { value: 'ugc',        label: 'UGC',        icon: '📱', desc: 'Creator feel' },
                  { value: 'cinematic',  label: 'Cinematic',  icon: '🎬', desc: 'Wide scene' },
                ].map(st => (
                  <button key={st.value} onClick={() => { if (!lockedVisualStyle) setAdStyle(st.value) }} style={{
                    borderRadius: 4, padding: '8px 6px', textAlign: 'left',
                    cursor: lockedVisualStyle ? 'default' : 'pointer',
                    transition: 'all 0.12s', ...cardBorder(adStyle === st.value),
                    opacity: lockedVisualStyle && lockedVisualStyle !== st.value ? 0.4 : 1,
                  }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{st.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: adStyle === st.value ? C.gold : C.primary }}>{st.label}</div>
                    <div style={{ fontSize: 8, color: C.secondary, marginTop: 1, lineHeight: 1.3 }}>{st.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => lockedVisualStyle ? setLockedVisualStyle(null) : setLockedVisualStyle(adStyle)}
                style={{
                  width: '100%', padding: '6px 0', borderRadius: 4, fontSize: 9, fontWeight: 700,
                  cursor: 'pointer',
                  border: `1px solid ${lockedVisualStyle ? C.gold : C.subtle}`,
                  background: lockedVisualStyle ? '#1a1c08' : C.surface,
                  color: lockedVisualStyle ? C.gold : C.muted,
                }}
              >
                {lockedVisualStyle ? `🔒 Locked: ${lockedVisualStyle} — click to unlock` : '🔓 Lock Visual Style'}
              </button>
            </Panel>
          </>
        )}

        {/* ── PERSONAL BRAND FORM ── */}
        {adMode === 'personal_brand_ad' && (
          <>
            <div style={{
              padding: '8px 10px', borderRadius: 4,
              border: `1px solid ${hasIdentity ? '#1a4a2a' : '#3a2010'}`,
              background: hasIdentity ? '#081208' : '#100800',
              fontSize: 11, color: hasIdentity ? C.green : '#c8843a',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>{hasIdentity ? '✓' : '⚠'}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{hasIdentity ? 'Identity active' : 'No identity uploaded'}</div>
                <div style={{ fontSize: 10, opacity: 0.8 }}>{hasIdentity ? 'Likeness will be preserved' : 'Upload in Studio tab first'}</div>
              </div>
            </div>

            <Panel title="Creator Niche" accent={C.gold}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                {[
                  { value: 'lifestyle', label: 'Lifestyle', icon: '✨' },
                  { value: 'fitness',   label: 'Fitness',   icon: '💪' },
                  { value: 'beauty',    label: 'Beauty',    icon: '💄' },
                  { value: 'fashion',   label: 'Fashion',   icon: '👗' },
                  { value: 'business',  label: 'Business',  icon: '💼' },
                  { value: 'creator',   label: 'Creator',   icon: '🎥' },
                ].map(n => (
                  <button key={n.value} onClick={() => setCreatorNiche(n.value)} style={{
                    borderRadius: 4, padding: '8px 4px', textAlign: 'center',
                    cursor: 'pointer', fontSize: 10, fontWeight: 700,
                    transition: 'all 0.12s', ...cardBorder(creatorNiche === n.value),
                    color: creatorNiche === n.value ? C.gold : C.primary,
                  }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{n.icon}</div>
                    {n.label}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Campaign Goal" accent={C.gold}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { value: 'awareness',  label: 'Brand Awareness', desc: 'Bold, memorable',      icon: '📢' },
                  { value: 'conversion', label: 'Drive Sales',      desc: 'Clear hook',           icon: '💰' },
                  { value: 'engagement', label: 'Engagement',       desc: 'Community feel',       icon: '❤️' },
                  { value: 'launch',     label: 'Launch',           desc: 'Announcement energy',  icon: '🚀' },
                ].map(g => (
                  <button key={g.value} onClick={() => setAdGoal(g.value)} style={{
                    borderRadius: 4, padding: '8px 10px',
                    display: 'flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.12s', ...cardBorder(adGoal === g.value),
                  }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{g.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: adGoal === g.value ? C.gold : C.primary, marginBottom: 1 }}>{g.label}</div>
                      <div style={{ fontSize: 9, color: C.secondary }}>{g.desc}</div>
                    </div>
                    {adGoal === g.value && <span style={{ fontSize: 9, color: C.gold }}>✓</span>}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Style Notes" accent={C.gold} defaultOpen={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div>
                  <SLabel>Visual style</SLabel>
                  <input value={visualStyle} onChange={e => setVisualStyle(e.target.value)}
                    placeholder="e.g. dark moody, bright airy…"
                    style={inp}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
                <div>
                  <SLabel>Extra context</SLabel>
                  <textarea value={extraContext} onChange={e => setExtraContext(e.target.value)}
                    placeholder="Product, colours, key message…"
                    rows={2} style={{ ...inp, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = C.goldDim}
                    onBlur={e => e.target.style.borderColor = C.subtle}
                  />
                </div>
              </div>
            </Panel>
          </>
        )}
      </div>

      {/* ══ RIGHT — Output ════════════════════════════════ */}
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0, background: '#070707' }}>

        {/* Global generating indicator */}
        {s.adTextGenerating && (
          <div style={{ padding: '6px 12px', background: C.goldGlow, borderBottom: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, animation: 'pulse 1s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>
              {s.adTextType === 'variation'     ? `Generating variation…` :
               s.adTextType === 'quality_score' ? 'Scoring your ad…' :
               s.adTextType === 'campaign'      ? 'Building 7-stage campaign…' :
               `Generating ${s.adTextType?.replace(/_/g, ' ')}…`}
            </span>
          </div>
        )}

        {/* Campaign context bar — shows selections and locks */}
        {(productName || selectedAngle || selectedHook || s.adMusicTrack || lockedAngle || lockedHook || lockedBrandVoice || lockedMusic) && (
          <div style={{ padding: '4px 12px', borderBottom: `1px solid ${C.hairline}`, background: C.raised, display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, flexWrap: 'wrap', minHeight: 26 }}>
            {productName && <span style={{ fontSize: 9, fontWeight: 700, color: C.primary }}>{productName}</span>}
            {adPlatform && <><span style={{ fontSize: 8, color: C.muted }}>·</span><span style={{ fontSize: 9, color: C.secondary }}>{adPlatform}</span></>}
            {platformGoal && <><span style={{ fontSize: 8, color: C.muted }}>·</span><span style={{ fontSize: 9, color: C.secondary }}>{platformGoal}</span></>}

            {/* Active selections */}
            {selectedAngle && !lockedAngle && (
              <><span style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>|</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: C.gold }}>✦ {selectedAngle.title}</span>
              <button onClick={() => setSelectedAngle(null)} style={{ padding: '0 4px', borderRadius: 2, fontSize: 8, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted, lineHeight: 1.6 }}>✕</button></>
            )}
            {selectedHook && !lockedHook && (
              <><span style={{ fontSize: 8, color: C.muted }}>·</span>
              <span style={{ fontSize: 8, color: C.gold }}>🪝 Hook set</span>
              <button onClick={() => setSelectedHook(null)} style={{ padding: '0 4px', borderRadius: 2, fontSize: 8, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted, lineHeight: 1.6 }}>✕</button></>
            )}
            {s.adMusicTrack && !lockedMusic && (
              <><span style={{ fontSize: 8, color: C.muted }}>·</span>
              <span style={{ fontSize: 8, color: C.gold }}>🎵 {s.adMusicTrack.title}</span></>
            )}

            {/* Locked items */}
            {(lockedAngle || lockedHook || lockedBrandVoice || lockedVisualStyle || lockedCaption || lockedMusic) && (
              <span style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>|</span>
            )}
            {lockedAngle && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 {lockedAngle.title}
                <button onClick={() => setLockedAngle(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}
            {lockedHook && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 Hook
                <button onClick={() => setLockedHook(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}
            {lockedBrandVoice && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 {lockedBrandVoice} voice
                <button onClick={() => setLockedBrandVoice(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}
            {lockedVisualStyle && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 {lockedVisualStyle}
                <button onClick={() => setLockedVisualStyle(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}
            {lockedCaption && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 Caption
                <button onClick={() => setLockedCaption(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}
            {lockedMusic && (
              <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 999, background: '#1a1c08', border: `1px solid ${C.gold}44`, color: C.gold }}>
                🔒 {lockedMusic.title}
                <button onClick={() => setLockedMusic(null)} style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 8, padding: 0 }}>✕</button>
              </span>
            )}

            {(selectedAngle || selectedHook || (s.adTextResults && Object.keys(s.adTextResults).length > 0)) && (
              <button onClick={handleSaveProject} style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 3, fontSize: 8, fontWeight: 700, cursor: 'pointer', border: `1px solid ${projectSaved ? '#2a4a2a' : C.subtle}`, background: projectSaved ? '#081208' : C.surface, color: projectSaved ? C.green : C.muted }}>
                {projectSaved ? '✓ Saved' : '↑ Save Project'}
              </button>
            )}
          </div>
        )}

        {/* Output tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.hairline}`, flexShrink: 0, overflowX: 'auto' }}>
          {[
            { id: 'creative',     label: 'Creative',  count: null },
            { id: 'angles',       label: 'Angles',    count: s.adTextResults?.angles?.length || 0 },
            { id: 'hooks',        label: 'Hooks',     count: s.adTextResults?.[`hooks_${activeHookType}`]?.hooks?.length || 0 },
            { id: 'captions',     label: 'Captions',  count: s.adTextResults?.captions?.length || 0 },
            { id: 'image_prompt', label: 'Images',    count: s.adTextResults?.image_prompt?.length || 0 },
            { id: 'video_prompt', label: 'Video',     count: s.adTextResults?.video_prompt?.length || 0 },
            { id: 'ugc_scripts',  label: 'UGC',       count: s.adTextResults?.ugc_scripts?.length || 0 },
            { id: 'campaign',     label: 'Campaign',  count: s.adTextResults?.campaign?.length || 0 },
            { id: 'score',        label: 'Score',     count: (s.adTextResults?.quality_score || projectScore) ? 1 : 0 },
            { id: 'soundtrack',   label: 'Music',     count: s.adMusicTrack ? 1 : 0 },
            { id: 'inspire',      label: 'Inspire',   count: competitorResult ? 1 : 0 },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAdOutputTab(tab.id)} style={{
              flex: 1, padding: '8px 3px', fontSize: 9, fontWeight: 700,
              letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
              background: adOutputTab === tab.id ? C.surface : 'transparent',
              color: adOutputTab === tab.id ? C.gold : C.primary,
              border: 'none', minWidth: 60,
              borderBottom: adOutputTab === tab.id ? `2px solid ${C.gold}` : '2px solid transparent',
              transition: 'all 0.15s', position: 'relative',
            }}>
              {tab.label}
              {tab.count > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 3,
                  fontSize: 7, fontWeight: 800, lineHeight: 1,
                  padding: '1px 4px', borderRadius: 999,
                  background: adOutputTab === tab.id ? C.gold : C.muted,
                  color: C.void,
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content wrapper */}
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>

        {/* ── CREATIVE TAB ── */}
        {adOutputTab === 'creative' && (<>

        {/* Generate button */}
        <button onClick={handleGenerate} disabled={!canGenerate} style={{
          width: '100%', padding: '11px 0', borderRadius: 5,
          fontSize: 13, fontWeight: 800,
          cursor: canGenerate ? 'pointer' : 'not-allowed',
          border: `1px solid ${canGenerate ? C.goldDim : C.hairline}`,
          background: canGenerate ? 'linear-gradient(180deg, #1a1408, #0c0a04)' : C.deep,
          color: canGenerate ? C.gold : C.muted,
          letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.2s',
        }}>
          {isGenerating
            ? '⟳ Generating…'
            : `▶  Generate ${adOutputType === 'video' ? 'Video Ad' : 'Image Ad'}  —  ${cost} credits`
          }
        </button>

        {/* Hints */}
        {!hasEnoughCredits && (
          <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010', textAlign: 'center' }}>
            Not enough credits — need {cost}, have {s.credits || 0}
          </div>
        )}
        {adMode === 'product_ad' && !productName.trim() && !isGenerating && (
          <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: C.secondary, background: C.deep, border: `1px solid ${C.hairline}`, textAlign: 'center' }}>
            ← Enter a product name to generate
          </div>
        )}

        {/* Campaign Consistency Check */}
        {productName.trim() && (selectedAngle || selectedHook || s.adMusicTrack || (s.adTextResults && Object.keys(s.adTextResults).length > 1)) && (
          <div style={{ borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', background: C.raised, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>Campaign Consistency Check</div>
                <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>Checks if your angle, hook, voice, music, and goal are aligned</div>
              </div>
              <button
                onClick={checkConsistency}
                disabled={consistencyLoading}
                style={{
                  padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                  cursor: consistencyLoading ? 'not-allowed' : 'pointer',
                  border: `1px solid ${C.goldDim}`, background: '#1a1408',
                  color: C.gold, opacity: consistencyLoading ? 0.6 : 1,
                }}
              >
                {consistencyLoading ? '⟳ Checking…' : '✦ Check — 1 credit'}
              </button>
            </div>
            {consistencyResult && (
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Score */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: consistencyResult.consistencyScore >= 80 ? C.green : consistencyResult.consistencyScore >= 60 ? C.gold : '#cf6a6a' }}>
                    {consistencyResult.consistencyScore}<span style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/100</span>
                  </div>
                  <div style={{ flex: 1, fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{consistencyResult.summary}</div>
                </div>
                {/* Verdict */}
                {consistencyResult.verdict && (
                  <div style={{ fontSize: 11, color: C.primary, fontStyle: 'italic', borderLeft: `2px solid ${C.gold}`, paddingLeft: 10, lineHeight: 1.5 }}>"{consistencyResult.verdict}"</div>
                )}
                {/* Strong / Weak */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div style={{ padding: '6px 8px', borderRadius: 4, background: '#081208', border: '1px solid #1a3a1a' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: C.green, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>Strong</div>
                    {(consistencyResult.strong || []).map((s, i) => <div key={i} style={{ fontSize: 9, color: C.secondary, marginBottom: 3 }}>✓ {s}</div>)}
                  </div>
                  <div style={{ padding: '6px 8px', borderRadius: 4, background: '#110806', border: '1px solid #2a1010' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: '#cf6a6a', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>Weak</div>
                    {(consistencyResult.weak || []).map((w, i) => <div key={i} style={{ fontSize: 9, color: C.secondary, marginBottom: 3 }}>✗ {w}</div>)}
                  </div>
                </div>
                {/* Fixes */}
                {(consistencyResult.fixes || []).length > 0 && (
                  <div style={{ padding: '7px 10px', borderRadius: 4, background: C.raised, border: `1px solid ${C.subtle}` }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Fixes</div>
                    {consistencyResult.fixes.map((f, i) => (
                      <div key={i} style={{ marginBottom: 5 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.secondary }}>{f.issue}</div>
                        <div style={{ fontSize: 10, color: C.primary }}>{f.fix}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {s.adError && (
          <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
            {s.adError}
          </div>
        )}

        {/* Loading */}
        {isGenerating && <AdLoadingState outputType={adOutputType} />}

        {/* Generated image result */}
        {!isGenerating && s.adGeneratedImage && (
          <Panel title="Generated Ad" accent={C.gold}>
            {/* Image — cropped cleanly, no white border artifacts */}
            <div style={{ borderRadius: 4, overflow: 'hidden', background: C.void }}>
              <img
                src={s.adGeneratedImage}
                alt="Ad creative"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {adMode === 'product_ad' && productName && <Pill color={C.gold}>{productName}</Pill>}
              {adStyle && <Pill color={C.blue}>{adStyle}</Pill>}
              {adPlatform && <Pill color={C.muted}>{adPlatform}</Pill>}
              {adFormat && <Pill color={C.muted}>{adFormat}</Pill>}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 5 }}>
              <a
                href={`/api/download-image?url=${encodeURIComponent(s.adGeneratedImage)}&name=promptceo-ad.jpg`}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 4,
                  fontSize: 12, fontWeight: 700, textDecoration: 'none',
                  textAlign: 'center', color: C.gold,
                  background: '#1a1408', border: `1px solid ${C.goldDim}`,
                  display: 'block',
                }}
              >
                ↓ Download Ad
              </a>
              <button onClick={() => doCopy(s.adGeneratedImage, 'adimg')} style={{
                padding: '8px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', border: `1px solid ${C.subtle}`,
                background: C.surface, color: localCopied === 'adimg' ? C.green : C.secondary,
              }}>
                {localCopied === 'adimg' ? '✓' : '⎘ URL'}
              </button>
              <button onClick={() => window.open(s.adGeneratedImage, '_blank')} style={{
                padding: '8px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', border: `1px solid ${C.subtle}`,
                background: C.surface, color: C.secondary,
              }}>
                ⤢
              </button>
            </div>

            {/* Video result */}
            {s.adVideoUrl && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <video src={s.adVideoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: 4 }} />
                <a
                  href={`/api/download-image?url=${encodeURIComponent(s.adVideoUrl)}&name=promptceo-ad-video.mp4`}
                  style={{
                    display: 'block', padding: '8px 0', borderRadius: 4,
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                    textAlign: 'center', color: C.gold,
                    background: '#1a1408', border: `1px solid ${C.goldDim}`,
                  }}
                >
                  ↓ Download Video Ad
                </a>
              </div>
            )}
            {s.adVideoError && (
              <div style={{ padding: '6px 8px', borderRadius: 4, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                {s.adVideoError}
              </div>
            )}

            {/* Animate button */}
            {!s.adVideoUrl && (
              <Btn variant="gold" disabled={s.adVideoGenerating} onClick={handleAnimate} sx={{ width: '100%', padding: '9px 0', fontSize: 12 }}>
                {s.adVideoGenerating ? '⟳ Generating video… (60 credits)' : '🎬 Animate to Video Ad — 60 credits'}
              </Btn>
            )}
          </Panel>
        )}

        {/* Direct video only */}
        {!isGenerating && s.adVideoUrl && !s.adGeneratedImage && (
          <Panel title="Generated Video Ad" accent={C.gold}>
            <video src={s.adVideoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: 4 }} />
            <a
              href={`/api/download-image?url=${encodeURIComponent(s.adVideoUrl)}&name=promptceo-ad-video.mp4`}
              style={{
                display: 'block', padding: '8px 0', borderRadius: 4,
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
                textAlign: 'center', color: C.gold,
                background: '#1a1408', border: `1px solid ${C.goldDim}`,
              }}
            >
              ↓ Download Video Ad
            </a>
          </Panel>
        )}

        {/* Licensed music display in Creative tab */}
        {!isGenerating && s.adMusicTrack && (
          <Panel title="Licensed Soundtrack" accent={C.gold}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.goldGlow, border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                🎵
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>{s.adMusicTrack.title}</div>
                <div style={{ fontSize: 9, color: C.secondary, marginTop: 2 }}>
                  {[s.adMusicTrack.mood, s.adMusicTrack.bpm && `${s.adMusicTrack.bpm} BPM`, s.adMusicTrack.energy && `${s.adMusicTrack.energy} energy`].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div style={{ padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, background: C.greenDim, border: '1px solid #2a4a2a', color: C.green }}>
                ✓ Licensed
              </div>
            </div>

            {/* Best for */}
            {(s.adMusicTrack.best_for || []).length > 0 && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                {s.adMusicTrack.best_for.map((bf, i) => (
                  <span key={i} style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>
                    {bf}
                  </span>
                ))}
              </div>
            )}

            {/* Timing plan */}
            {s.adMusicTimingPlan && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.hairline}`, background: C.raised, overflow: 'hidden', marginTop: 4 }}>
                <div style={{ padding: '6px 10px', borderBottom: `1px solid ${C.hairline}`, fontSize: 8, fontWeight: 700, color: C.secondary, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  Ad Timing Plan
                </div>
                {s.adMusicTimingPlan.sections.map((sec, i) => (
                  <div key={i} style={{ padding: '6px 10px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 9, color: C.gold, fontWeight: 700, minWidth: 65, fontFamily: 'monospace', flexShrink: 0 }}>
                      {sec.start}s–{sec.end}s
                    </span>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: sec.isDropMoment ? C.gold : C.primary }}>{sec.label}</div>
                      <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4 }}>{sec.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
              <button onClick={() => setAdOutputTab('soundtrack')} style={{ flex: 1, padding: '7px 0', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.primary }}>
                Change Track
              </button>
              <button
                onClick={() => lockedMusic ? setLockedMusic(null) : setLockedMusic(s.adMusicTrack)}
                style={{
                  padding: '7px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${lockedMusic ? C.gold : C.subtle}`,
                  background: lockedMusic ? '#1a1c08' : C.surface,
                  color: lockedMusic ? C.gold : C.muted,
                }}
              >
                {lockedMusic ? '🔒 Locked' : '🔓 Lock Music'}
              </button>
            </div>
          </Panel>
        )}

        {/* Empty state */}
        {!isGenerating && !s.adGeneratedImage && !s.adVideoUrl && !s.adError && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 14, padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>📣</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 0.5 }}>Ad Creative Studio</div>
            <div style={{ fontSize: 11, color: C.secondary, maxWidth: 260, lineHeight: 1.7 }}>
              Configure your ad on the left and press <span style={{ color: C.gold }}>Generate</span> to create professional ad content.
            </div>

            {/* Build Full Ad Project */}
            {productName.trim() && (
              <button
                onClick={handleBuildFullProject}
                disabled={buildingProject || s.adTextGenerating}
                style={{
                  padding: '12px 24px', borderRadius: 5, fontSize: 12, fontWeight: 800,
                  cursor: buildingProject || s.adTextGenerating ? 'not-allowed' : 'pointer',
                  border: `1px solid ${buildingProject ? C.subtle : C.gold}`,
                  background: buildingProject ? C.raised : 'linear-gradient(180deg,#1a1408,#0c0a04)',
                  color: buildingProject ? C.muted : C.gold,
                  letterSpacing: 0.5, opacity: buildingProject || s.adTextGenerating ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                {buildingProject
                  ? `⟳ Building full project… (${s.adTextType || '…'})`
                  : '⚡ Build Full Ad Project — Angles + Hooks + Captions + UGC'}
              </button>
            )}
            {buildingProject && (
              <div style={{ fontSize: 9, color: C.gold, maxWidth: 260, lineHeight: 1.6 }}>
                Generating angles → selecting best → hooks → captions + UGC. Results appear in each tab.
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {[{ icon: '📦', label: 'Products' }, { icon: '⭐', label: 'Brands' }, { icon: '🎬', label: 'Video' }].map(i => (
                <div key={i.label} style={{ padding: '10px 12px', borderRadius: 4, background: C.base, border: `1px solid ${C.hairline}`, textAlign: 'center', minWidth: 64 }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{i.icon}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.5 }}>{i.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: C.ghost, marginTop: 4 }}>✦ AI auto-suggests style from your product name</div>
          </div>
        )}

        {/* Campaign Timeline */}
        {timeline.length > 0 && (
          <div style={{ borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
            <div style={{ padding: '7px 12px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.secondary, letterSpacing: 0.8, textTransform: 'uppercase' }}>Campaign Timeline</span>
              <button onClick={() => setTimeline([])} style={{ fontSize: 8, color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
            </div>
            <div style={{ padding: '6px 0', maxHeight: 180, overflowY: 'auto' }}>
              {timeline.map((evt, i) => (
                <div key={i} style={{ padding: '5px 12px', display: 'flex', alignItems: 'flex-start', gap: 8, borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? C.gold : C.muted, flexShrink: 0, marginTop: 3 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: i === 0 ? C.primary : C.secondary, fontWeight: i === 0 ? 700 : 400 }}>{evt.event}</div>
                    {evt.detail && <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>{evt.detail}</div>}
                  </div>
                  <div style={{ fontSize: 7, color: C.muted, flexShrink: 0 }}>
                    {new Date(evt.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Briefs — show when there's enough campaign data */}
        {productName.trim() && (s.adTextResults && Object.keys(s.adTextResults).length > 0) && (
          <div style={{ borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', background: C.raised, borderBottom: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>Export Professional Briefs</div>
              <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>AI-generated documents ready to send to clients or your team</div>
            </div>
            <div style={{ padding: '8px 12px', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {[
                { key: 'campaign',    label: 'Campaign Brief',    icon: '📋', desc: 'Strategy, direction, KPIs' },
                { key: 'creator',     label: 'Creator Brief',     icon: '🎤', desc: 'UGC brief for talent' },
                { key: 'media_buyer', label: 'Media Buyer Brief', icon: '📊', desc: 'Targeting, bidding, rotation' },
              ].map(b => (
                <button
                  key={b.key}
                  onClick={() => generateBrief(b.key)}
                  disabled={briefLoading}
                  style={{
                    flex: 1, minWidth: 120, padding: '8px 10px', borderRadius: 4, textAlign: 'left',
                    cursor: briefLoading ? 'not-allowed' : 'pointer',
                    border: `1px solid ${briefs[b.key] ? C.green : C.subtle}`,
                    background: briefs[b.key] ? '#081208' : C.raised,
                    opacity: briefLoading && !briefs[b.key] ? 0.6 : 1,
                  }}
                >
                  <div style={{ fontSize: 13, marginBottom: 3 }}>{b.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: briefs[b.key] ? C.green : C.primary }}>{briefs[b.key] ? '✓ ' : ''}{b.label}</div>
                  <div style={{ fontSize: 8, color: C.secondary, marginTop: 1 }}>{briefs[b.key] ? 'Click to view' : `${b.desc} — 2 cr`}</div>
                </button>
              ))}
            </div>
            {/* Brief viewer */}
            {briefOpen && briefs[briefOpen] && (
              <div style={{ borderTop: `1px solid ${C.hairline}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{briefs[briefOpen].title}</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <button
                      onClick={() => exportBriefAsTxt(briefs[briefOpen])}
                      style={{ padding: '4px 10px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary }}
                    >
                      ↓ Download TXT
                    </button>
                    <button onClick={() => setBriefOpen(null)} style={{ padding: '4px 8px', borderRadius: 3, fontSize: 9, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.muted }}>✕</button>
                  </div>
                </div>
                {(briefs[briefOpen].sections || []).map((sec, si) => (
                  <div key={si} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: si < briefs[briefOpen].sections.length - 1 ? `1px solid ${C.hairline}` : 'none' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>{sec.heading}</div>
                    <div style={{ fontSize: 11, color: C.primary, lineHeight: 1.65 }}>{sec.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        </>)}
        {/* ── END CREATIVE TAB ── */}

        {/* ── ANGLES TAB ── */}
        {adOutputTab === 'angles' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('angles')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5,
                fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'angles' ? '⟳ Generating angles…' : '✦ Generate 10 Ad Angles — 2 credits'}
            </button>

            {!productName.trim() && (
              <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: C.secondary, background: C.deep, border: `1px solid ${C.hairline}`, textAlign: 'center' }}>
                ← Enter a product name to generate angles
              </div>
            )}

            {s.adTextError && s.adTextType === 'angles' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                {s.adTextError}
              </div>
            )}

            {/* Angles export + variation */}
            {(s.adTextResults?.angles || []).length > 0 && (
              <ExportBar items={s.adTextResults.angles} filename="promptceo-angles" type="angles" />
            )}
            <VariationResult />

            {/* Angles results */}
            {(s.adTextResults?.angles || []).map((angle, i) => (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 11px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 0.5 }}>{angle.title}</span>
                    <span style={{ fontSize: 9, color: C.muted, marginLeft: 8 }}>{angle.emotionalTrigger}</span>
                  </div>
                  <button
                    onClick={() => doCopyAdText(`${angle.hook}\n\nVisual: ${angle.visualDirection}\nCaption: ${angle.captionDirection}\nScript: ${angle.scriptDirection}`, `angle_${i}`)}
                    style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `angle_${i}` ? C.green : C.muted }}
                  >
                    {copiedText === `angle_${i}` ? '✓' : '⎘'}
                  </button>
                </div>
                <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, lineHeight: 1.5, fontStyle: 'italic' }}>"{angle.hook}"</div>
                  <VariationBar content={angle.hook} contentType="hook" />
                  <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.5 }}>
                    <span style={{ color: C.muted, fontWeight: 700 }}>Promise: </span>{angle.adPromise}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.4 }}>
                      <span style={{ color: C.secondary, fontWeight: 700, display: 'block', marginBottom: 2 }}>Visual</span>
                      {angle.visualDirection}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.4 }}>
                      <span style={{ color: C.secondary, fontWeight: 700, display: 'block', marginBottom: 2 }}>Script</span>
                      {angle.scriptDirection}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
                    <button
                      onClick={() => { setSelectedAngle(angle); setAdOutputTab('hooks'); addTimelineEvent('Angle selected', angle.title) }}
                      style={{
                        flex: 1, padding: '7px 0', borderRadius: 4,
                        fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        border: `1px solid ${selectedAngle?.title === angle.title ? C.gold : C.goldDim}`,
                        background: selectedAngle?.title === angle.title ? '#2a1c08' : '#1a1408',
                        color: selectedAngle?.title === angle.title ? C.gold : '#8a7a5a',
                      }}
                    >
                      {selectedAngle?.title === angle.title ? '✓ Selected → Hooks' : '✓ Use This Angle'}
                    </button>
                    <button
                      onClick={() => { toggleWinner('angle', angle); addTimelineEvent('Starred angle', angle.title) }}
                      style={{ padding: '7px 8px', borderRadius: 4, fontSize: 12, cursor: 'pointer', border: `1px solid ${winners.angles.some(w => w.title === angle.title) ? C.gold : C.hairline}`, background: winners.angles.some(w => w.title === angle.title) ? C.goldGlow : C.deep, flexShrink: 0 }}
                      title="Mark as winner"
                    >
                      {winners.angles.some(w => w.title === angle.title) ? '⭐' : '☆'}
                    </button>
                    <button
                      onClick={() => {
                        if (lockedAngle?.title === angle.title) { setLockedAngle(null) }
                        else { setLockedAngle(angle); setSelectedAngle(angle) }
                      }}
                      style={{
                        padding: '7px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        border: `1px solid ${lockedAngle?.title === angle.title ? C.gold : C.subtle}`,
                        background: lockedAngle?.title === angle.title ? '#1a1c08' : C.surface,
                        color: lockedAngle?.title === angle.title ? C.gold : C.muted,
                        flexShrink: 0,
                      }}
                    >
                      {lockedAngle?.title === angle.title ? '🔒' : '🔓'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Creative Director Note — Angles */}
            {(s.adTextResults?.angles || []).length > 0 && (
              <DirectorNote noteKey="angles" />
            )}

            {/* Continue to Hooks */}
            {(s.adTextResults?.angles || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>
                  {selectedAngle ? `Direction: ${selectedAngle.title}` : 'Select an angle above to continue'}
                </div>
                <button onClick={() => setAdOutputTab('hooks')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Hooks →
                </button>
              </div>
            )}

            {!s.adTextResults?.angles && !s.adTextGenerating && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🎯</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Generate 10 distinct psychological angles for your product. Each angle is a different way to sell the same thing.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── HOOKS TAB ── */}
        {adOutputTab === 'hooks' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

            {/* Generate ALL 5 types at once */}
            <button
              onClick={async () => {
                if (!productName.trim() || s.adTextGenerating) return
                const types = ['pain', 'desire', 'curiosity', 'luxury', 'directOffer']
                const cfg = buildAdConfig()
                const style = inspiredStyle !== 'none' ? inspiredStyle : null
                for (const hookType of types) {
                  setActiveHookType(hookType)
                  await generateAdText({ type: 'hooks', hookType, adConfig: cfg, inspiredStyle: style })
                }
              }}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '10px 0', borderRadius: 5,
                fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? '#4a6a9a' : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#080c18,#04080e)' : C.deep,
                color: productName.trim() ? '#6a9ad4' : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'hooks'
                ? `⟳ Generating ${activeHookType} hooks…`
                : '⚡ Generate All 5 Hook Types — 5 credits'}
            </button>

            {/* Hook type selector with fill indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
              {[
                { id: 'pain',        label: 'Pain'      },
                { id: 'desire',      label: 'Desire'    },
                { id: 'curiosity',   label: 'Curiosity' },
                { id: 'luxury',      label: 'Luxury'    },
                { id: 'directOffer', label: 'Offer'     },
              ].map(h => {
                const hasList = (s.adTextResults?.[`hooks_${h.id}`]?.hooks || []).length > 0
                const count   = s.adTextResults?.[`hooks_${h.id}`]?.hooks?.length || 0
                return (
                  <button key={h.id} onClick={() => setActiveHookType(h.id)} style={{
                    padding: '7px 4px', borderRadius: 4, fontSize: 9, fontWeight: 700,
                    textAlign: 'center', cursor: 'pointer', transition: 'all 0.12s',
                    border: `1px solid ${activeHookType === h.id ? C.goldDim : hasList ? '#2a4a2a' : C.hairline}`,
                    background: activeHookType === h.id ? '#1a1408' : hasList ? '#081208' : C.deep,
                    color: activeHookType === h.id ? C.gold : hasList ? C.green : C.secondary,
                    position: 'relative',
                  }}>
                    {h.label}
                    {hasList && (
                      <span style={{ position: 'absolute', top: 2, right: 3, fontSize: 7, fontWeight: 800, color: C.green }}>{count}</span>
                    )}
                    {!hasList && (
                      <span style={{ display: 'block', fontSize: 7, color: C.muted, marginTop: 2 }}>empty</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Generate current type */}
            <button
              onClick={() => handleGenerateText('hooks', activeHookType)}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '9px 0', borderRadius: 5,
                fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'hooks'
                ? `⟳ Generating ${activeHookType} hooks…`
                : `✦ Generate ${activeHookType.charAt(0).toUpperCase() + activeHookType.slice(1)} Hooks only — 1 credit`}
            </button>

            {s.adTextError && s.adTextType === 'hooks' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                {s.adTextError}
              </div>
            )}

            {/* Hook results */}
            {(s.adTextResults?.[`hooks_${activeHookType}`]?.hooks || []).length > 0 && (
              <ExportBar items={s.adTextResults[`hooks_${activeHookType}`].hooks} filename={`promptceo-hooks-${activeHookType}`} />
            )}
            <VariationResult />

            {/* Selected hook banner */}
            {selectedAngle && !s.adTextResults?.[`hooks_${activeHookType}`] && !s.adTextGenerating && (
              <div style={{ padding: '6px 10px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 10, color: C.gold }}>
                ✦ Angle selected: <strong>{selectedAngle.title}</strong> — Generate hooks that use this angle
              </div>
            )}

            {(s.adTextResults?.[`hooks_${activeHookType}`]?.hooks || []).map((hook, i) => (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${selectedHook === hook ? C.goldDim : C.hairline}`, background: C.base, padding: '10px 11px' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 9, color: C.muted, fontWeight: 700, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                  <div style={{ flex: 1, fontSize: 12, color: C.primary, lineHeight: 1.55 }}>{hook}</div>
                  <button onClick={() => doCopyAdText(hook, `hook_${i}`)} style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `hook_${i}` ? C.green : C.muted, flexShrink: 0 }}>
                    {copiedText === `hook_${i}` ? '✓' : '⎘'}
                  </button>
                </div>
                <VariationBar content={hook} contentType="hook" />
                <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                  <button
                    onClick={() => { setSelectedHook(hook); setAdOutputTab('captions'); addTimelineEvent('Hook selected', hook.slice(0, 60)) }}
                    style={{
                      flex: 1, padding: '6px 0', borderRadius: 4,
                      fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      border: `1px solid ${selectedHook === hook ? C.gold : C.goldDim}`,
                      background: selectedHook === hook ? '#2a1c08' : '#1a1408',
                      color: selectedHook === hook ? C.gold : '#8a7a5a',
                    }}
                  >
                    {selectedHook === hook ? '✓ Selected → Captions' : '✓ Use This Hook'}
                  </button>
                  <button
                    onClick={() => { toggleWinner('hook', hook); addTimelineEvent('Starred hook', hook.slice(0, 60)) }}
                    style={{ padding: '6px 8px', borderRadius: 4, fontSize: 12, cursor: 'pointer', border: `1px solid ${winners.hooks.includes(hook) ? C.gold : C.hairline}`, background: winners.hooks.includes(hook) ? C.goldGlow : C.deep, flexShrink: 0 }}
                    title="Mark as winner"
                  >
                    {winners.hooks.includes(hook) ? '⭐' : '☆'}
                  </button>
                  <button
                    onClick={() => {
                      if (lockedHook === hook) { setLockedHook(null) }
                      else { setLockedHook(hook); setSelectedHook(hook) }
                    }}
                    style={{
                      padding: '6px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      border: `1px solid ${lockedHook === hook ? C.gold : C.subtle}`,
                      background: lockedHook === hook ? '#1a1c08' : C.surface,
                      color: lockedHook === hook ? C.gold : C.muted,
                      flexShrink: 0,
                    }}
                  >
                    {lockedHook === hook ? '🔒' : '🔓'}
                  </button>
                </div>
              </div>
            ))}

            {/* Creative Director Note — Hooks */}
            {(s.adTextResults?.[`hooks_${activeHookType}`]?.hooks || []).length > 0 && (
              <DirectorNote noteKey={`hooks_${activeHookType}`} />
            )}

            {/* Continue to Captions */}
            {(s.adTextResults?.[`hooks_${activeHookType}`]?.hooks || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>
                  {selectedHook ? 'Hook selected — ready for captions' : 'Select a hook above to continue'}
                </div>
                <button onClick={() => setAdOutputTab('captions')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Captions →
                </button>
              </div>
            )}

            {!s.adTextResults?.[`hooks_${activeHookType}`]?.hooks?.length && !s.adTextGenerating && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🪝</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Select a hook type above and generate 10 scroll-stopping opening lines for your ad.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── CAPTIONS TAB ── */}
        {adOutputTab === 'captions' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('captions')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5,
                fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'captions' ? '⟳ Generating captions…' : '✦ Generate 6 Ad Captions — 2 credits'}
            </button>

            {s.adTextError && s.adTextType === 'captions' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                {s.adTextError}
              </div>
            )}

            {(s.adTextResults?.captions || []).length > 0 && (
              <ExportBar items={s.adTextResults.captions} filename="promptceo-captions" />
            )}
            <VariationResult />

            {/* Caption results */}
            {(s.adTextResults?.captions || []).map((cap, i) => {
              const isLockedCap = lockedCaption?.label === cap.label && lockedCaption?.fullCaption === cap.fullCaption
              return (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${isLockedCap ? C.gold : C.hairline}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 11px', background: isLockedCap ? '#1a1c08' : C.raised, borderBottom: `1px solid ${isLockedCap ? C.gold + '44' : C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 0.5 }}>
                    {isLockedCap && '🔒 '}{cap.label || cap.type}
                  </span>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <button
                      onClick={() => { if (isLockedCap) setLockedCaption(null); else setLockedCaption(cap) }}
                      style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${isLockedCap ? C.gold : C.subtle}`, background: isLockedCap ? '#1a1c08' : C.surface, color: isLockedCap ? C.gold : C.muted }}
                    >
                      {isLockedCap ? '🔒 Locked' : '🔓 Lock'}
                    </button>
                    <button
                      onClick={() => doCopyAdText(cap.fullCaption || cap.hook, `cap_${i}`)}
                      style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `cap_${i}` ? C.green : C.muted }}
                    >
                      {copiedText === `cap_${i}` ? '✓' : '⎘'}
                    </button>
                  </div>
                </div>
                <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {cap.fullCaption || `${cap.hook}\n${cap.body}\n${cap.benefit}\n${cap.proof}\n${cap.cta}`}
                  </div>
                  <VariationBar content={cap.fullCaption || cap.hook} contentType="caption" />
                </div>
              </div>
              )
            })}

            {/* Creative Director Note — Captions */}
            {(s.adTextResults?.captions || []).length > 0 && <DirectorNote noteKey="captions" />}

            {/* Continue to Images */}
            {(s.adTextResults?.captions || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>Captions ready — generate image prompts next</div>
                <button onClick={() => setAdOutputTab('image_prompt')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Images →
                </button>
              </div>
            )}

            {!s.adTextResults?.captions && !s.adTextGenerating && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>✍️</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Generate 6 ready-to-post captions — short, story, problem-solution, luxury, direct sales, and retargeting.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── IMAGE PROMPTS TAB ── */}
        {adOutputTab === 'image_prompt' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('image_prompt')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'image_prompt' ? '⟳ Generating prompts…' : '✦ Generate 6 Image Ad Prompts — 2 credits'}
            </button>
            {s.adTextError && s.adTextType === 'image_prompt' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.adTextError}</div>
            )}
            {(s.adTextResults?.image_prompt || []).length > 0 && (
              <ExportBar items={s.adTextResults.image_prompt} filename="promptceo-image-prompts" />
            )}
            {(s.adTextResults?.image_prompt || []).map((img, i) => {
              const cardKey   = `img_card_${i}`
              const cardState = cardImages[cardKey] || {}
              return (
                <div key={i} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                  {/* Card header */}
                  <div style={{ padding: '8px 11px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>{img.label || img.format}</span>
                      <span style={{ fontSize: 9, color: C.muted }}>{img.aspectRatio}</span>
                    </div>
                    <button onClick={() => doCopyAdText(img.prompt, `img_${i}`)} style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `img_${i}` ? C.green : C.muted }}>
                      {copiedText === `img_${i}` ? '✓ Copied' : '⎘ Prompt'}
                    </button>
                  </div>

                  {/* Prompt text */}
                  <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.65 }}>{img.prompt}</div>
                    {img.platformFit && <div style={{ fontSize: 9, color: C.muted }}>Fits: {img.platformFit}</div>}
                    {img.copyNote    && <div style={{ fontSize: 9, color: C.goldDim, fontStyle: 'italic' }}>{img.copyNote}</div>}

                    {/* Generate Image button */}
                    {!cardState.url && (
                      <button
                        onClick={() => generateCardImage(img.prompt, cardKey)}
                        disabled={cardState.generating}
                        style={{
                          width: '100%', padding: '8px 0', borderRadius: 4, marginTop: 4,
                          fontSize: 11, fontWeight: 700, cursor: cardState.generating ? 'not-allowed' : 'pointer',
                          border: `1px solid ${C.goldDim}`, background: '#1a1408',
                          color: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          opacity: cardState.generating ? 0.7 : 1, transition: 'opacity 0.15s',
                        }}
                      >
                        {cardState.generating ? '⟳ Generating image…' : '🖼 Generate This Image — 5 credits'}
                      </button>
                    )}

                    {/* Error */}
                    {cardState.error && (
                      <div style={{ padding: '6px 8px', borderRadius: 3, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
                        {cardState.error}
                      </div>
                    )}

                    {/* Generated image result */}
                    {cardState.url && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                        <div style={{ borderRadius: 4, overflow: 'hidden', background: C.void }}>
                          <img src={cardState.url} alt={img.label} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <a
                            href={`/api/download-image?url=${encodeURIComponent(cardState.url)}&name=promptceo-${img.format || i}.jpg`}
                            style={{ flex: 1, padding: '6px 0', borderRadius: 4, fontSize: 10, fontWeight: 700, textDecoration: 'none', textAlign: 'center', color: C.gold, background: '#1a1408', border: `1px solid ${C.goldDim}`, display: 'block' }}
                          >
                            ↓ Download
                          </a>
                          <button
                            onClick={() => generateCardImage(img.prompt, cardKey)}
                            disabled={cardState.generating}
                            style={{ padding: '6px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.muted }}
                          >
                            ↺ Regenerate
                          </button>
                          <button
                            onClick={() => doCopyAdText(cardState.url, `img_url_${i}`)}
                            style={{ padding: '6px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `img_url_${i}` ? C.green : C.muted }}
                          >
                            {copiedText === `img_url_${i}` ? '✓' : '⎘ URL'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {/* Creative Director Note — Images */}
            {(s.adTextResults?.image_prompt || []).length > 0 && <DirectorNote noteKey="image_prompt" />}

            {/* Continue to Video */}
            {(s.adTextResults?.image_prompt || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>Image prompts ready — generate video prompts next</div>
                <button onClick={() => setAdOutputTab('video_prompt')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Video →
                </button>
              </div>
            )}

            {!s.adTextResults?.image_prompt && !s.adTextGenerating && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🖼</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Generate 6 ready-to-use image prompts — hero, lifestyle, UGC, before/after, minimal, and story format.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── VIDEO PROMPTS TAB ── */}
        {adOutputTab === 'video_prompt' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('video_prompt')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'video_prompt' ? '⟳ Generating prompts…' : '✦ Generate 4 Video Ad Prompts — 3 credits'}
            </button>
            {s.adTextError && s.adTextType === 'video_prompt' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.adTextError}</div>
            )}
            {(s.adTextResults?.video_prompt || []).length > 0 && (
              <ExportBar items={s.adTextResults.video_prompt} filename="promptceo-video-prompts" />
            )}
            {(s.adTextResults?.video_prompt || []).map((vid, i) => (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 11px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>{vid.label || vid.format}</span>
                    <span style={{ fontSize: 9, color: C.muted }}>{vid.duration} · {vid.aspectRatio}</span>
                  </div>
                  <button onClick={() => doCopyAdText(vid.fullPrompt, `vid_${i}`)} style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `vid_${i}` ? C.green : C.muted }}>
                    {copiedText === `vid_${i}` ? '✓ Copied' : '⎘ Copy Prompt'}
                  </button>
                </div>
                <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {vid.openingShot && (
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3 }}>Opening Shot</div>
                      <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.55, fontStyle: 'italic' }}>{vid.openingShot}</div>
                    </div>
                  )}
                  {(vid.scenes || []).map((scene, j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: j > 0 ? `1px solid ${C.hairline}` : 'none' }}>
                      <span style={{ fontSize: 9, color: C.gold, fontWeight: 700, minWidth: 36, flexShrink: 0 }}>{scene.timing}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: C.primary, lineHeight: 1.5 }}>{scene.description}</div>
                        {scene.cameraMotion && <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>Camera: {scene.cameraMotion}</div>}
                      </div>
                    </div>
                  ))}
                  {vid.fullPrompt && (
                    <div style={{ padding: '8px', borderRadius: 4, background: C.raised, border: `1px solid ${C.hairline}` }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Full Prompt</div>
                      <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.6 }}>{vid.fullPrompt}</div>
                    </div>
                  )}

                  {/* Storyboard */}
                  {(() => {
                    const sbKey  = `storyboard_${i}`
                    const sb     = storyboards[sbKey]
                    const loading = storyboardLoading[sbKey]
                    return (
                      <div>
                        {!sb && (
                          <button
                            onClick={() => generateStoryboard(vid.fullPrompt || vid.openingShot || '', sbKey)}
                            disabled={loading}
                            style={{
                              width: '100%', padding: '7px 0', borderRadius: 4, marginTop: 4,
                              fontSize: 10, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                              border: `1px solid ${C.violetDim}`, background: '#0e0818',
                              color: C.violet, opacity: loading ? 0.6 : 1,
                            }}
                          >
                            {loading ? '⟳ Generating storyboard…' : '🎬 Generate Shot-by-Shot Storyboard — 2 credits'}
                          </button>
                        )}
                        {sb && (
                          <div style={{ borderRadius: 5, border: `1px solid ${C.violetDim}`, background: '#080610', overflow: 'hidden', marginTop: 4 }}>
                            <div style={{ padding: '7px 10px', background: '#0e0818', borderBottom: `1px solid ${C.violetDim}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ fontSize: 9, fontWeight: 700, color: C.violet, letterSpacing: 0.8 }}>🎬 STORYBOARD</span>
                                {sb.title && <span style={{ fontSize: 9, color: C.secondary, marginLeft: 8 }}>{sb.title}</span>}
                              </div>
                              <button onClick={() => setStoryboards(prev => { const n = { ...prev }; delete n[sbKey]; return n })}
                                style={{ fontSize: 8, color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                            </div>
                            {sb.directorNote && (
                              <div style={{ padding: '7px 10px', fontSize: 10, color: C.violet, fontStyle: 'italic', borderBottom: `1px solid ${C.violetDim}` }}>
                                "{sb.directorNote}"
                              </div>
                            )}
                            {(sb.shots || []).map((shot, si) => (
                              <div key={si} style={{ padding: '8px 10px', borderTop: si > 0 ? `1px solid ${C.hairline}` : 'none', display: 'grid', gridTemplateColumns: '52px 1fr', gap: 8 }}>
                                <div style={{ textAlign: 'center' }}>
                                  <div style={{ fontSize: 8, fontWeight: 800, color: C.violet, fontFamily: 'monospace' }}>{shot.timeStart}s–{shot.timeEnd}s</div>
                                  <div style={{ fontSize: 7, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{shot.label}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                  <div style={{ fontSize: 10, color: C.primary, lineHeight: 1.4, fontWeight: 600 }}>{shot.scene}</div>
                                  {shot.cameraMove && <div style={{ fontSize: 8, color: C.secondary }}><span style={{ color: C.muted, fontWeight: 700 }}>Cam:</span> {shot.cameraMove}</div>}
                                  {shot.creatorAction && <div style={{ fontSize: 8, color: C.secondary }}><span style={{ color: C.muted, fontWeight: 700 }}>Action:</span> {shot.creatorAction}</div>}
                                  {shot.onScreenText && <div style={{ fontSize: 8, color: C.gold }}><span style={{ color: C.muted, fontWeight: 700 }}>Text:</span> {shot.onScreenText}</div>}
                                  {shot.musicMoment && <div style={{ fontSize: 8, color: C.violet }}><span style={{ color: C.muted, fontWeight: 700 }}>Music:</span> {shot.musicMoment}</div>}
                                  {shot.directorInstruction && <div style={{ fontSize: 8, color: C.gold, fontStyle: 'italic', borderLeft: `2px solid ${C.violetDim}`, paddingLeft: 5 }}>{shot.directorInstruction}</div>}
                                </div>
                              </div>
                            ))}
                            {sb.productionNotes && (
                              <div style={{ padding: '7px 10px', borderTop: `1px solid ${C.violetDim}`, fontSize: 9, color: C.secondary, lineHeight: 1.5, background: '#0e0818' }}>
                                <span style={{ fontWeight: 700, color: C.muted }}>Production: </span>{sb.productionNotes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              </div>
            ))}
            {/* Creative Director Note — Video */}
            {(s.adTextResults?.video_prompt || []).length > 0 && <DirectorNote noteKey="video_prompt" />}

            {/* Continue to UGC */}
            {(s.adTextResults?.video_prompt || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>Video prompts ready — generate UGC scripts next</div>
                <button onClick={() => setAdOutputTab('ugc_scripts')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to UGC →
                </button>
              </div>
            )}

            {!s.adTextResults?.video_prompt && !s.adTextGenerating && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🎬</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Generate 4 video ad prompts — TikTok 15s, Meta 30s, UGC creator, and luxury cinematic.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── UGC SCRIPTS TAB ── */}
        {adOutputTab === 'ugc_scripts' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('ugc_scripts')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'ugc_scripts' ? '⟳ Generating scripts…' : '✦ Generate 4 UGC Scripts — 2 credits'}
            </button>
            {s.adTextError && s.adTextType === 'ugc_scripts' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.adTextError}</div>
            )}
            {(s.adTextResults?.ugc_scripts || []).length > 0 && (
              <ExportBar items={s.adTextResults.ugc_scripts} filename="promptceo-ugc-scripts" />
            )}
            {(s.adTextResults?.ugc_scripts || []).map((scr, i) => (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 11px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>{scr.label || scr.style}</span>
                    <span style={{ fontSize: 9, color: C.muted }}>{scr.duration} · {scr.wordCount}</span>
                  </div>
                  <button onClick={() => doCopyAdText(scr.script, `scr_${i}`)} style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `scr_${i}` ? C.green : C.muted }}>
                    {copiedText === `scr_${i}` ? '✓ Copied' : '⎘ Copy Script'}
                  </button>
                </div>
                <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ padding: '6px 8px', borderRadius: 4, background: C.surface, border: `1px solid ${C.hairline}` }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3 }}>Hook</div>
                    <div style={{ fontSize: 12, color: C.primary, fontStyle: 'italic' }}>"{scr.hook}"</div>
                  </div>
                  <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{scr.script}</div>
                  <VariationBar content={scr.script} contentType="script" />
                  {scr.directorNote && (
                    <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4, padding: '5px 8px', borderRadius: 3, background: C.raised, border: `1px solid ${C.hairline}` }}>
                      <span style={{ fontWeight: 700, color: C.muted }}>Director: </span>{scr.directorNote}
                    </div>
                  )}
                  {scr.visualNote && (
                    <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4, padding: '5px 8px', borderRadius: 3, background: C.raised, border: `1px solid ${C.hairline}` }}>
                      <span style={{ fontWeight: 700, color: C.muted }}>On screen: </span>{scr.visualNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Creative Director Note — UGC */}
            {(s.adTextResults?.ugc_scripts || []).length > 0 && <DirectorNote noteKey="ugc_scripts" />}

            {/* Continue to Campaign */}
            {(s.adTextResults?.ugc_scripts || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>UGC scripts ready — build the full 7-stage campaign</div>
                <button onClick={() => setAdOutputTab('campaign')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Campaign →
                </button>
              </div>
            )}

            {!s.adTextResults?.ugc_scripts && !s.adTextGenerating && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🎤</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 240, lineHeight: 1.6 }}>Generate 4 UGC creator scripts — natural, emotional, direct response, and testimonial styles.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── CAMPAIGN TAB ── */}
        {adOutputTab === 'campaign' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => handleGenerateText('campaign')}
              disabled={!productName.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: productName.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${productName.trim() ? C.goldDim : C.hairline}`,
                background: productName.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: productName.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'campaign' ? '⟳ Building 10-stage campaign…' : '✦ Build Full 10-Stage Campaign — 5 credits'}
            </button>

            {s.adTextError && s.adTextType === 'campaign' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.adTextError}</div>
            )}

            {(s.adTextResults?.campaign || []).length > 0 && (
              <ExportBar items={s.adTextResults.campaign} filename="promptceo-campaign-10stage" />
            )}

            {(s.adTextResults?.campaign || []).map((stage, i) => {
              const STAGE_COLORS = [
                '#4a5a8a', // 1 Cold Awareness — deep blue
                '#4a7a8a', // 2 Problem Aware — teal
                '#6a7a4a', // 3 Desire — olive
                '#4a7a6a', // 4 Product Solution — green
                '#6a5a8a', // 5 UGC Trust — violet
                '#7a6a4a', // 6 Social Proof — amber
                '#c8843a', // 7 Offer — orange
                '#c8a84b', // 8 Final Conv — gold
                '#8a4a4a', // 9 Retargeting — red
                '#6a4a7a', // 10 Winback — purple
              ]
              const color = STAGE_COLORS[i] || C.muted
              const num   = String(i + 1).padStart(2, '0')
              const [expanded, setExpanded] = [true, () => {}] // always expanded

              return (
                <div key={i} style={{ borderRadius: 6, border: `1px solid ${color}44`, background: C.base, overflow: 'hidden' }}>
                  {/* Stage header */}
                  <div style={{ padding: '8px 12px', background: color + '18', borderBottom: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: color, minWidth: 22, fontFamily: 'monospace' }}>{num}</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>{stage.label || stage.stage}</div>
                        {stage.audienceDescription && (
                          <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>{stage.audienceDescription}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {stage.angle && (
                        <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 999, background: color + '22', border: `1px solid ${color}44`, color: color, fontWeight: 700 }}>
                          {stage.angle}
                        </span>
                      )}
                      <button
                        onClick={() => doCopyAdText(
                          `STAGE ${num}: ${stage.label}\n\nHook: ${stage.hook}\n\nCaption:\n${stage.caption}\n\nVisual: ${stage.imagePromptDirection}\nVideo: ${stage.videoPromptDirection || ''}\nUGC: ${stage.ugcDirection || ''}\nMusic: ${stage.musicEnergy || ''}\nCTA: ${stage.cta}\n${stage.platformNote ? `Platform: ${stage.platformNote}` : ''}`,
                          `stage_${i}`
                        )}
                        style={{ padding: '3px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `stage_${i}` ? C.green : C.muted }}
                      >
                        {copiedText === `stage_${i}` ? '✓' : '⎘ Copy All'}
                      </button>
                    </div>
                  </div>

                  {/* Hook */}
                  <div style={{ padding: '10px 12px 0', fontSize: 13, color: C.primary, fontStyle: 'italic', fontWeight: 600, lineHeight: 1.5 }}>
                    "{stage.hook}"
                  </div>

                  {/* Caption */}
                  <div style={{ padding: '8px 12px', fontSize: 11, color: C.secondary, lineHeight: 1.7, whiteSpace: 'pre-wrap', borderBottom: `1px solid ${C.hairline}` }}>
                    {stage.caption}
                  </div>

                  {/* 6-cell grid: Visual · Video · UGC · Music · CTA · Platform */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
                    {[
                      { label: 'IMAGE',    value: stage.imagePromptDirection, color: '#4a6a9a' },
                      { label: 'VIDEO',    value: stage.videoPromptDirection,  color: '#6a4a8a' },
                      { label: 'UGC',      value: stage.ugcDirection,          color: '#4a7a5a' },
                      { label: 'MUSIC',    value: stage.musicEnergy,           color: '#8a6a4a' },
                      { label: 'CTA',      value: stage.cta,                   color: color     },
                      { label: 'PLATFORM', value: stage.platformNote,          color: C.muted   },
                    ].map((cell, ci) => cell.value ? (
                      <div key={ci} style={{ padding: '6px 10px', borderTop: `1px solid ${C.hairline}`, borderRight: ci % 3 !== 2 ? `1px solid ${C.hairline}` : 'none' }}>
                        <div style={{ fontSize: 7, fontWeight: 800, color: cell.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{cell.label}</div>
                        <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4 }}>{cell.value}</div>
                      </div>
                    ) : null)}
                  </div>
                </div>
              )
            })}

            {/* Creative Director Note — Campaign */}
            {(s.adTextResults?.campaign || []).length > 0 && <DirectorNote noteKey="campaign" />}

            {/* Continue to Score */}
            {(s.adTextResults?.campaign || []).length > 0 && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>10-stage campaign built — score your best copy</div>
                <button onClick={() => setAdOutputTab('score')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Score →
                </button>
              </div>
            )}

            {!s.adTextResults?.campaign && !s.adTextGenerating && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>📊</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>10-Stage Campaign Builder</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 280, lineHeight: 1.65 }}>
                  Builds a complete funnel — Cold Awareness → Problem → Desire → Product → UGC Trust → Social Proof → Offer → Final Conversion → Retargeting → Winback.
                </div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>Each stage: hook · caption · image · video · UGC · music · CTA</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── SCORE TAB ── */}
        {adOutputTab === 'score' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.5 }}>
              Paste any hook, caption, or ad copy below and score it across 6 dimensions.
            </div>

            {/* Ad Fatigue Detection */}
            {s.adTextResults && Object.keys(s.adTextResults).length >= 2 && (
              <div style={{ borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: C.raised, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>Ad Fatigue Detection</div>
                    <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>Scans all outputs for repetition, overuse patterns, and missing angles</div>
                  </div>
                  <button
                    onClick={checkAdFatigue}
                    disabled={fatigueLoading}
                    style={{ padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: fatigueLoading ? 'not-allowed' : 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold, opacity: fatigueLoading ? 0.6 : 1 }}
                  >
                    {fatigueLoading ? '⟳ Scanning…' : '✦ Detect Fatigue — 1 credit'}
                  </button>
                </div>
                {fatigueResult && (
                  <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 26, fontWeight: 800, color: fatigueResult.fatigueScore >= 80 ? C.green : fatigueResult.fatigueScore >= 60 ? C.gold : '#cf6a6a' }}>
                        {fatigueResult.fatigueScore}<span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>/100</span>
                      </div>
                      <div style={{ flex: 1, fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{fatigueResult.summary}</div>
                    </div>
                    {(fatigueResult.patterns || []).map((p, i) => (
                      <div key={i} style={{ padding: '8px 10px', borderRadius: 4, background: C.raised, border: `1px solid ${C.subtle}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#cf6a6a' }}>⚠ {p.issue}</span>
                          {p.count && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 999, background: '#2a1010', border: '1px solid #3a1a1a', color: '#cf6a6a' }}>{p.count}×</span>}
                        </div>
                        {(p.examples || []).length > 0 && <div style={{ fontSize: 9, color: C.muted, marginBottom: 4, fontStyle: 'italic' }}>{p.examples.slice(0, 2).map(e => `"${e}"`).join(' · ')}</div>}
                        <div style={{ fontSize: 10, color: C.primary }}><span style={{ color: C.gold, fontWeight: 700 }}>Fix: </span>{p.fix}</div>
                      </div>
                    ))}
                    {(fatigueResult.missingAngles || []).length > 0 && (
                      <div style={{ padding: '7px 10px', borderRadius: 4, background: '#080c10', border: `1px solid ${C.blueDim}` }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: C.blue, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>Missing Angles</div>
                        {fatigueResult.missingAngles.map((a, i) => <div key={i} style={{ fontSize: 9, color: C.secondary, marginBottom: 2 }}>→ {a}</div>)}
                      </div>
                    )}
                    {fatigueResult.recommendation && (
                      <div style={{ padding: '7px 10px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 10, color: C.gold, lineHeight: 1.5 }}>
                        <strong>Director: </strong>{fatigueResult.recommendation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Project Score Dashboard */}
            {productName.trim() && (
              <div style={{ borderRadius: 5, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: C.raised, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>Full Campaign Score</div>
                    <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>8-dimension evaluation of your entire campaign</div>
                  </div>
                  <button
                    onClick={scoreFullProject}
                    disabled={projectScoreLoading}
                    style={{ padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: projectScoreLoading ? 'not-allowed' : 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold, opacity: projectScoreLoading ? 0.6 : 1 }}
                  >
                    {projectScoreLoading ? '⟳ Scoring…' : '✦ Score Full Campaign — 2 credits'}
                  </button>
                </div>
                {projectScore && (
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Overall */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 36, fontWeight: 800, color: projectScore.overallScore >= 85 ? C.green : projectScore.overallScore >= 70 ? C.gold : '#cf6a6a', lineHeight: 1 }}>
                          {projectScore.overallScore}
                        </div>
                        <div style={{ fontSize: 10, color: C.muted }}>/100</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.secondary }}>{projectScore.grade}</div>
                      <div style={{ flex: 1, fontSize: 11, color: C.secondary, lineHeight: 1.5 }}>{projectScore.summary}</div>
                    </div>
                    {/* 8 dimensions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                      {Object.entries(projectScore.dimensions || {}).map(([key, dim]) => {
                        const score = dim.score || 0
                        const barColor = score >= 8 ? C.green : score >= 6 ? C.gold : score >= 4 ? C.tension : '#cf6a6a'
                        const labels = { campaignStrength: 'Campaign Strength', hookStrength: 'Hook Strength', emotionalPull: 'Emotional Pull', visualDirection: 'Visual Direction', musicFit: 'Music Fit', ctaStrength: 'CTA Strength', platformFit: 'Platform Fit', conversionPotential: 'Conversion Potential' }
                        return (
                          <div key={key} style={{ padding: '7px 9px', borderRadius: 4, background: C.raised, border: `1px solid ${C.hairline}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <span style={{ fontSize: 9, fontWeight: 700, color: C.secondary }}>{labels[key] || key}</span>
                              <span style={{ fontSize: 12, fontWeight: 800, color: barColor }}>{score}</span>
                            </div>
                            <div style={{ height: 2, background: C.subtle, borderRadius: 1, overflow: 'hidden', marginBottom: 4 }}>
                              <div style={{ height: '100%', width: `${score * 10}%`, background: barColor, borderRadius: 1 }} />
                            </div>
                            <div style={{ fontSize: 8, color: C.muted, lineHeight: 1.3 }}>{dim.reason}</div>
                          </div>
                        )
                      })}
                    </div>
                    {/* Winner + Fix */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {projectScore.winningElement && (
                        <div style={{ padding: '7px 9px', borderRadius: 4, background: '#081208', border: '1px solid #1a3a1a' }}>
                          <div style={{ fontSize: 8, fontWeight: 700, color: C.green, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Winning Element</div>
                          <div style={{ fontSize: 10, color: C.primary }}>{projectScore.winningElement}</div>
                        </div>
                      )}
                      {projectScore.topFix && (
                        <div style={{ padding: '7px 9px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}` }}>
                          <div style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Top Fix</div>
                          <div style={{ fontSize: 10, color: C.primary }}>{projectScore.topFix}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.5 }}>
              Score individual copy
            </div>

            <textarea
              value={scoreInput}
              onChange={e => setScoreInput(e.target.value)}
              placeholder="Paste your hook, caption, UGC script, or any ad content here…"
              rows={5}
              style={{
                width: '100%', background: C.deep, color: C.primary,
                border: `1px solid ${C.subtle}`, borderRadius: 4,
                padding: '8px 10px', fontSize: 11, outline: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical',
              }}
              onFocus={e => e.target.style.borderColor = C.goldDim}
              onBlur={e => e.target.style.borderColor = C.subtle}
            />

            <button
              onClick={handleScoreContent}
              disabled={!scoreInput.trim() || s.adTextGenerating}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: scoreInput.trim() && !s.adTextGenerating ? 'pointer' : 'not-allowed',
                border: `1px solid ${scoreInput.trim() ? C.goldDim : C.hairline}`,
                background: scoreInput.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: scoreInput.trim() ? C.gold : C.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {s.adTextGenerating && s.adTextType === 'quality_score' ? '⟳ Scoring…' : '✦ Score This Ad — 1 credit'}
            </button>

            {s.adTextError && s.adTextType === 'quality_score' && (
              <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.adTextError}</div>
            )}

            {/* Score results */}
            {s.adTextResults?.quality_score && (() => {
              const sc = s.adTextResults.quality_score
              const gradeColor = sc.overallScore >= 8.5 ? '#4a9a6a' : sc.overallScore >= 7 ? C.gold : sc.overallScore >= 5 ? C.tension : '#cf6a6a'
              const dimKeys = ['hookStrength','emotionalPull','clarity','visualStrength','conversionPotential','platformFit']
              const dimLabels = { hookStrength:'Hook Strength', emotionalPull:'Emotional Pull', clarity:'Clarity', visualStrength:'Visual Strength', conversionPotential:'Conversion Potential', platformFit:'Platform Fit' }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Overall */}
                  <div style={{ borderRadius: 6, border: `1px solid ${gradeColor}44`, background: gradeColor + '10', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Overall Score</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: gradeColor, lineHeight: 1 }}>{sc.overallScore}<span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>/10</span></div>
                      <div style={{ fontSize: 11, color: C.secondary, marginTop: 6, lineHeight: 1.5 }}>{sc.summary}</div>
                    </div>
                    <div style={{ fontSize: 42, fontWeight: 800, color: gradeColor + 'cc' }}>{sc.grade}</div>
                  </div>

                  {/* Dimension scores */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {dimKeys.map(dim => {
                      const d = sc.scores?.[dim]
                      if (!d) return null
                      const score = d.score || 0
                      const barColor = score >= 8 ? '#4a9a6a' : score >= 6 ? C.gold : score >= 4 ? C.tension : '#cf6a6a'
                      return (
                        <div key={dim} style={{ padding: '8px 10px', borderRadius: 4, background: C.base, border: `1px solid ${C.hairline}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: C.secondary }}>{dimLabels[dim]}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: barColor }}>{score}<span style={{ fontSize: 9, color: C.muted }}>/10</span></span>
                          </div>
                          <div style={{ height: 3, background: C.raised, borderRadius: 2, overflow: 'hidden', marginBottom: 5 }}>
                            <div style={{ height: '100%', width: `${score * 10}%`, background: barColor, borderRadius: 2, transition: 'width 0.4s' }} />
                          </div>
                          <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.4 }}>{d.reason}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Strengths + Weaknesses */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div style={{ borderRadius: 4, border: '1px solid #1a3a2a', background: '#081208', padding: '8px 10px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#4a9a6a', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Strong</div>
                      {(sc.strengths || []).map((s, i) => (
                        <div key={i} style={{ fontSize: 9, color: C.secondary, lineHeight: 1.5, marginBottom: 3 }}>✓ {s}</div>
                      ))}
                    </div>
                    <div style={{ borderRadius: 4, border: '1px solid #2a1010', background: '#110606', padding: '8px 10px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#cf6a6a', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Weak</div>
                      {(sc.weaknesses || []).map((w, i) => (
                        <div key={i} style={{ fontSize: 9, color: C.secondary, lineHeight: 1.5, marginBottom: 3 }}>✗ {w}</div>
                      ))}
                    </div>
                  </div>

                  {/* Improvements */}
                  {(sc.improvements || []).length > 0 && (
                    <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.base, padding: '8px 10px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>How to Improve</div>
                      {sc.improvements.map((imp, i) => (
                        <div key={i} style={{ marginBottom: 6 }}>
                          <div style={{ fontSize: 9, fontWeight: 700, color: C.secondary, marginBottom: 2 }}>{dimLabels[imp.dimension] || imp.dimension}</div>
                          <div style={{ fontSize: 10, color: C.primary, lineHeight: 1.5 }}>{imp.suggestion}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Improved hook */}
                  {sc.improvedHook && (
                    <div style={{ borderRadius: 4, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '8px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase' }}>Improved Hook</div>
                        <button onClick={() => doCopyAdText(sc.improvedHook, 'imp_hook')} style={{ padding: '2px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: C.raised, color: copiedText === 'imp_hook' ? C.green : C.gold }}>
                          {copiedText === 'imp_hook' ? '✓' : '⎘'}
                        </button>
                      </div>
                      <div style={{ fontSize: 12, color: C.primary, lineHeight: 1.6, fontStyle: 'italic' }}>"{sc.improvedHook}"</div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Continue to Music */}
            {s.adTextResults?.quality_score && (
              <div style={{ borderRadius: 4, border: `1px solid ${C.subtle}`, background: C.raised, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 10, color: C.secondary }}>Ad scored — add the perfect soundtrack</div>
                <button onClick={() => setAdOutputTab('soundtrack')} style={{ padding: '5px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  Continue to Music →
                </button>
              </div>
            )}

            {!s.adTextResults?.quality_score && !s.adTextGenerating && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 10, padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🏆</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 260, lineHeight: 1.6 }}>Paste any ad copy above to score it across Hook Strength, Emotional Pull, Clarity, Visual Strength, Conversion Potential, and Platform Fit.</div>
              </div>
            )}
          </div>
        </>)}

        {/* ── SOUNDTRACK TAB ── */}
        {adOutputTab === 'soundtrack' && (<>
          <MusicSelector
            adConfig={buildAdConfig()}
            selectedTrack={s.adMusicTrack}
            credits={s.credits}
            onLicense={(track, licenseData) => {
              merge({
                adMusicTrack:       track,
                adMusicLicenseId:   licenseData.licenseId,
                adMusicTimingPlan:  licenseData.timingPlan,
              })
              if (typeof licenseData.creditsRemaining === 'number') {
                set('credits', licenseData.creditsRemaining)
              }
            }}
          />
        </>)}

        {/* ── INSPIRE TAB ── */}
        {adOutputTab === 'inspire' && (<>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.6 }}>
              Paste a competitor ad, brand description, or any creative reference. The AI will analyse what makes it work and generate inspired original direction for your brand — without copying.
            </div>
            <textarea
              value={competitorText}
              onChange={e => setCompetitorText(e.target.value)}
              placeholder={`Paste any competitor ad, hook, caption, landing page copy, or brand description here…\n\nExample: "Stop. If you're still using the same gym clothes from 2019, this is your sign. Our performance hoodie is engineered for women who train hard and want to look like it. Shop now."`}
              rows={6}
              style={{ width: '100%', background: C.deep, color: C.primary, border: `1px solid ${C.subtle}`, borderRadius: 4, padding: '8px 10px', fontSize: 11, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = C.goldDim}
              onBlur={e => e.target.style.borderColor = C.subtle}
            />
            <button
              onClick={analyseCompetitor}
              disabled={!competitorText.trim() || competitorLoading}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
                cursor: competitorText.trim() && !competitorLoading ? 'pointer' : 'not-allowed',
                border: `1px solid ${competitorText.trim() ? C.goldDim : C.hairline}`,
                background: competitorText.trim() ? 'linear-gradient(180deg,#1a1408,#0c0a04)' : C.deep,
                color: competitorText.trim() ? C.gold : C.muted,
              }}
            >
              {competitorLoading ? '⟳ Analysing…' : '✦ Analyse & Get Inspired Direction — 2 credits'}
            </button>

            {competitorResult && (() => {
              const r = competitorResult
              const ra = r.referenceAnalysis || {}
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Reference Analysis */}
                  <div style={{ borderRadius: 6, border: `1px solid ${C.subtle}`, background: C.base, overflow: 'hidden' }}>
                    <div style={{ padding: '8px 12px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: C.secondary, letterSpacing: 0.8, textTransform: 'uppercase' }}>Reference Analysis</span>
                      {ra.strengthScore && <span style={{ fontSize: 10, fontWeight: 800, color: ra.strengthScore >= 8 ? C.green : C.gold }}>{ra.strengthScore}/10</span>}
                    </div>
                    <div style={{ padding: '10px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {[
                        { label: 'Tone',             value: ra.tone            },
                        { label: 'Hook Pattern',     value: ra.hookPattern     },
                        { label: 'Emotional Trigger',value: ra.emotionalTrigger},
                        { label: 'CTA Style',        value: ra.ctaStyle        },
                        { label: 'Audience Signal',  value: ra.audienceSignal  },
                        { label: 'Visual Pacing',    value: ra.visualPacing    },
                      ].filter(i => i.value).map((item, i) => (
                        <div key={i} style={{ padding: '5px 7px', borderRadius: 3, background: C.raised, border: `1px solid ${C.hairline}` }}>
                          <div style={{ fontSize: 7, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                          <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Director Note */}
                  {r.directorNote && (
                    <div style={{ padding: '8px 12px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 11, color: C.gold, fontStyle: 'italic' }}>
                      "{r.directorNote}"
                    </div>
                  )}

                  {/* Inspired Direction */}
                  {r.inspiredDirection && (
                    <div style={{ padding: '10px 12px', borderRadius: 5, border: `1px solid ${C.goldDim}`, background: '#0d0c04' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Inspired Direction for Your Brand</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{r.inspiredDirection.angle}</div>
                      <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.5 }}>{r.inspiredDirection.whyItWorks}</div>
                    </div>
                  )}

                  {/* 5 Inspired Hooks */}
                  {(r.inspiredHooks || []).length > 0 && (
                    <div style={{ borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                      <div style={{ padding: '7px 12px', background: C.raised, borderBottom: `1px solid ${C.hairline}`, fontSize: 9, fontWeight: 700, color: C.secondary, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                        5 Inspired Hooks — Original, Not Copied
                      </div>
                      {r.inspiredHooks.map((hook, i) => (
                        <div key={i} style={{ padding: '8px 12px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span style={{ fontSize: 9, color: C.muted, fontWeight: 700, minWidth: 16, flexShrink: 0 }}>{i + 1}</span>
                          <div style={{ flex: 1, fontSize: 12, color: C.primary, lineHeight: 1.55 }}>{hook}</div>
                          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            <button onClick={() => doCopyAdText(hook, `inspire_${i}`)} style={{ padding: '3px 7px', borderRadius: 3, fontSize: 8, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: copiedText === `inspire_${i}` ? C.green : C.muted }}>
                              {copiedText === `inspire_${i}` ? '✓' : '⎘'}
                            </button>
                            <button onClick={() => { setSelectedHook(hook); setAdOutputTab('hooks') }} style={{ padding: '3px 7px', borderRadius: 3, fontSize: 8, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                              Use
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inspired Caption + Visual */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {r.inspiredCaption && (
                      <div style={{ padding: '8px 10px', borderRadius: 4, background: C.base, border: `1px solid ${C.hairline}` }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>Inspired Caption</div>
                        <div style={{ fontSize: 10, color: C.primary, lineHeight: 1.6 }}>{r.inspiredCaption}</div>
                      </div>
                    )}
                    {r.visualDirection && (
                      <div style={{ padding: '8px 10px', borderRadius: 4, background: C.base, border: `1px solid ${C.hairline}` }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: C.blue, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 5 }}>Visual Direction</div>
                        <div style={{ fontSize: 10, color: C.secondary, lineHeight: 1.5 }}>{r.visualDirection}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {!competitorResult && !competitorLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '30px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>🔍</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>Inspired Analysis</div>
                <div style={{ fontSize: 11, color: C.secondary, maxWidth: 280, lineHeight: 1.65 }}>
                  Paste any competitor ad, hook, or brand copy above. The AI extracts what makes it work — hook pattern, emotional trigger, CTA style — then builds original creative in your brand's voice.
                </div>
              </div>
            )}
          </div>
        </>)}

        </div>
        {/* ── END TAB CONTENT WRAPPER ── */}

      </div>
    </div>
  )
}

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

function buildInput(s, overrides = {}) {
  return {
    worldControlMode:    s.worldControlMode,
    worldId:             s.worldId,
    subLocationId:       s.worldControlMode === 'manual' ? s.subLocationId : '',
    sceneGroupId:        s.worldControlMode === 'manual' ? s.sceneGroupId  : '',
    phaseKey:            s.worldControlMode === 'manual' ? s.phaseKey      : '',
    storyWorldId:        s.storyWorldId,
    chapterId:           s.chapterId,
    progressionIndex:    Number(s.progressionIndex),
    totalCount:          Number(s.totalCount),
    characterMode:       s.characterMode,
    subjectGender:       s.subjectGender,
    identityName:        s.traits?.subjectA?.name || (s.useIdentity ? s.identityName : ''),
    hasReferenceImage:   s.useIdentity ? s.hasImage : false,
    useExtractedTraits:  !!(
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
  worldControlMode:   'auto',
  worldId:            '',
  subLocationId:      '',
  sceneGroupId:       '',
  phaseKey:           '',
  storyWorldId:       'luxury-life',
  chapterId:          '',
  packId:             '',
  progressionIndex:   0,
  totalCount:         30,
  characterMode:      'female',
  subjectGender:      'female',
  useIdentity:        false,
  identityName:       '',
  hasImage:           false,
  imageDataUrl:       '',
  identityStorageUrl: '',
  imageUploading:     false,
  scanState:          'idle',
  scanError:          '',
  useTraits:          false,
  identityStrength:   100,
  ageRange:           'auto',
  continuityLock:     false,
  traits: {
    subjectA: {
      name: '', age: '', ethnicity: '', body: '', breast: '', glutes: '', eyes: '', hair: '',
      locked: { name: false, age: false, ethnicity: false, body: false, breast: false, glutes: false, eyes: false, hair: false },
    },
    subjectB: {
      name: '', age: '', ethnicity: '', body: '', eyes: '', hair: '',
      locked: { name: false, age: false, ethnicity: false, body: false, eyes: false, hair: false },
    },
  },
  prevOutputs:        [],
  directorPreset:     'none',
  view:               'studio',
  credits:            null,
  creditsLoading:     false,
  generatedImage:     '',
  imageGenerating:    false,
  imageError:         '',
  videoGenerating:    false,
  videoUrl:           '',
  videoError:         '',
  batchImages:        [],
  batchImgRunning:    false,
  batchImgProgress:   0,
  batchVideos:        {},
  // Music
  adMusicTrack:       null,
  adMusicLicenseId:   null,
  adMusicTimingPlan:  null,
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
    violet:  { bg: '#0e0818', border: C.violetDim, color: C.violet },
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
// SCENE CARD
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
// DIRECTOR'S CHAIR VIEW
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
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${bg}88 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${C.hairline}`,
        background: 'rgba(4,4,4,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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

      <div style={{
        flex: 1, position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 80px',
        overflow: 'hidden',
      }}>
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
        <div style={{ maxWidth: 820, width: '100%', textAlign: 'center' }}>
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

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        borderTop: `1px solid ${C.hairline}`,
        background: 'rgba(4,4,4,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <Btn variant="default" disabled={currentIndex === 0} onClick={() => onNavigate(currentIndex - 1)} sx={{ minWidth: 100 }}>
          ← Previous
        </Btn>
        <span style={{ fontSize: 11, color: C.muted, minWidth: 80, textAlign: 'center' }}>
          {currentIndex + 1} / {batch.length}
        </span>
        <Btn variant="default" disabled={currentIndex === batch.length - 1} onClick={() => onNavigate(currentIndex + 1)} sx={{ minWidth: 100 }}>
          Next →
        </Btn>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUBJECT TRAITS
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
  ethnicity: ['European','Nordic','Mediterranean','Latina','East Asian','South Asian','Middle Eastern','Black','Mixed ethnicity'],
  body: ['Slim feminine frame','Athletic toned build','Curvy hourglass shape','Soft feminine curves','Lean dancer-like physique','Fit model proportions'],
  body_male: ['Athletic muscular build','Lean athletic physique','Broad shouldered strong frame','Fit toned masculine build','Powerful muscular physique','Tall lean masculine frame'],
  breast: ['Small natural bust','Medium proportional bust','Full natural bust','Full round bust, soft shape'],
  glutes: ['Subtle athletic glutes','Rounded feminine glutes','Full sculpted glutes','Strong curvy glutes'],
  eyes: ['Dark brown eyes','Light brown eyes','Green eyes','Blue eyes','Hazel eyes','Grey eyes','Deep dark eyes','Bright expressive eyes'],
  hair: ['Long dark hair, loose waves','Long blonde hair, soft curls','Medium-length hair, straight and sleek','Short bob haircut, clean lines','High ponytail, sporty and confident','Messy bun, casual and intimate','Long auburn hair, natural waves','Platinum blonde, straight and polished','Dark brown hair, beachy waves','Short pixie cut, editorial edge'],
  hair_male: ['Short dark hair, clean cut','Short blonde hair, textured','Medium length dark hair, swept back','Buzz cut, sharp and clean','Short curly hair, natural texture','Slicked back dark hair, polished'],
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
        const libKey = isMale && DNA_LIBRARIES[`${key}_male`] ? `${key}_male` : key
        const library = DNA_LIBRARIES[libKey] || []

        return (
          <div key={key} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: '4px 0', borderBottom: `1px solid #0a0a0a`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {library.length > 0 && !locked && (
              <select
                value=""
                onChange={e => { if (e.target.value) onChange(key, e.target.value) }}
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
            <input
              style={{
                background: C.deep, color: locked ? C.muted : C.primary,
                border: `1px solid ${C.hairline}`,
                borderRadius: 3, fontSize: 10, outline: 'none',
                fontFamily: 'inherit', padding: '3px 6px',
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

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

export default function PromptCEOPage() {
  const router   = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) router.replace('/prompt-engine-v3/login')
    }
    checkSession()
  }, [])

  // Read ?view= and ?tab= from URL on mount — used by Dashboard links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const view   = params.get('view')
    const tab    = params.get('tab')
    if (view === 'ad_studio') {
      set('view', 'ad_studio')
      if (tab) window.__adStudioInitTab = tab
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [history,      setHistory]      = useState([])
  const [historyOpen,  setHistoryOpen]  = useState(false)
  const stopRef = useRef(false)
  const [helpOpen, setHelpOpen] = useState(false)

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

  useEffect(() => { merge({ subLocationId: '', sceneGroupId: '', phaseKey: '' }) }, [s.worldId])
  useEffect(() => { set('sceneGroupId', '') }, [s.subLocationId])
  useEffect(() => { set('chapterId', '') }, [s.storyWorldId])
  useEffect(() => { setDnaProfiles(dnaLoad()) }, [])

  useEffect(() => {
    const loadPersistedIdentity = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const fileName = `${user.id}/identity.jpg`
      const { data } = supabase.storage.from('identity-images').getPublicUrl(fileName)
      if (!data?.publicUrl) return
      const res = await fetch(data.publicUrl, { method: 'HEAD' }).catch(() => null)
      if (!res?.ok) return
      merge({ imageDataUrl: data.publicUrl, identityStorageUrl: data.publicUrl, hasImage: true })
    }
    loadPersistedIdentity()
  }, [])

  useEffect(() => {
    set('creditsLoading', true)
    fetch('/api/get-credits')
      .then(r => r.json())
      .then(d => { if (d?.status === 'success') set('credits', d.credits) })
      .catch(() => {})
      .finally(() => set('creditsLoading', false))
  }, [])

  const saveToHistory = useCallback(async (prompt, meta, imageUrl = '') => {
    try {
      await fetch('/api/save-prompt', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          world_id:          meta?.primaryWorldId || '',
          progression_level: meta?.progressionLevel || '',
          time_of_day:       meta?.timeOfDay || '',
          director:          s.directorPreset || '',
          image_url:         imageUrl,
        }),
      })
    } catch (err) {
      console.error('History save failed:', err)
    }
  }, [s.directorPreset])

  // ── Generate ──────────────────────────────────────────────
  const generate = useCallback(() => {
    const r = buildPromptV3(buildInput(s))
    setResult(r)
    setOutputTab('output')
    if (s.continuityLock && r.finalPrompt) {
      setS(p => ({ ...p, prevOutputs: [...(p.prevOutputs || []).slice(-5), r.finalPrompt] }))
    }
    if (r.finalPrompt) saveToHistory(r.finalPrompt, r.meta)
  }, [s, saveToHistory])

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

    const looksMale   = /\b(man|male|masculine|beard|mustache|facial hair|broad shoulders|broad|muscular)\b/.test(genderSignals)
    const looksFemale = /\b(woman|female|feminine|long hair|long wavy|long blonde|long dark)\b/.test(genderSignals)

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
          name:      s.identityName             || '',
          age:       extract(resolved).age      || '',
          ethnicity: extract(resolved).ethnicity|| '',
          body:      extract(resolved).body_shape || '',
          eyes:      extract(resolved).eye_color || '',
          hair:      extract(resolved).hair     || '',
          locked:    s.traits?.subjectA?.locked || {},
        },
        subjectB: hasSubjectB ? {
          name:      '',
          age:       extract(subjectB).age      || '',
          ethnicity: extract(subjectB).ethnicity|| '',
          body:      extract(subjectB).body_shape || '',
          eyes:      extract(subjectB).eye_color || '',
          hair:      extract(subjectB).hair     || '',
          locked:    s.traits?.subjectB?.locked || {},
        } : s.traits.subjectB,
      },
    })
    set('characterMode', detectedCharMode)
  }

  // ── Image upload ──────────────────────────────────────────
  const onImg = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result
      merge({ imageDataUrl: dataUrl, hasImage: true, scanState: 'idle', scanError: '', imageUploading: true })
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const base64 = dataUrl.split(',')[1]
          const binary = atob(base64)
          const array  = new Uint8Array(binary.length)
          for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i)
          const blob     = new Blob([array], { type: file.type })
          const fileName = `${user.id}/identity.jpg`
          await supabase.storage.from('identity-images').upload(fileName, blob, {
            upsert: true, contentType: file.type,
          })
          const { data: urlData } = supabase.storage.from('identity-images').getPublicUrl(fileName)
          merge({ identityStorageUrl: urlData?.publicUrl || '', imageUploading: false })
        }
      } catch (err) {
        console.error('Identity upload failed:', err)
        merge({ imageUploading: false })
      }
    }
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

  const exportForTool = (tool) => {
    const formatPrompt = (p) => {
      if (tool === 'midjourney') return `${p} --ar 2:3 --style raw --q 2`
      if (tool === 'runway')     return p.slice(0, 1000)
      if (tool === 'kling')      return `${p} --ratio 9:16 --duration 5`
      return p
    }
    const text = batch.map((r, i) =>
      `=== Scene ${i + 1} [${r.meta?.progressionLevel} / ${(r.meta?.timeOfDay || '').replace(/_/g, ' ')}] ===\n${formatPrompt(r.finalPrompt)}`
    ).join('\n\n')
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
      download: `promptceo-${tool}-${Date.now()}.txt`,
    })
    a.click()
  }

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

  const exportStoryboard = async () => {
    const scenes = batch.map((r, i) => ({
      finalPrompt:    r.finalPrompt,
      meta:           r.meta,
      imageUrl:       s.batchImages?.find(img => img.index === i)?.imageUrl || '',
      director:       s.directorPreset,
    }))
    const res  = await fetch('/api/storyboard-pdf', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenes }),
    })
    const html = await res.text()
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    setTimeout(() => w.print(), 800)
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
          mode: 'director',
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
            mode: 'director',
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

  // ── Ad text generation (angles / hooks / captions) ───────
  const generateAdText = useCallback(async ({ type, hookType, adConfig, inspiredStyle, contentToScore, variationContent, variationType, variationContentType }) => {
    merge({ adTextGenerating: true, adTextError: '', adTextType: type, adTextHookType: hookType || null })
    try {
      const res  = await fetch('/api/generate-ad-text', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type, hookType, adConfig,
          inspiredStyle:       inspiredStyle       || null,
          contentToScore:      contentToScore      || null,
          variationContent:    variationContent    || null,
          variationType:       variationType       || null,
          variationContentType: variationContentType || null,
        }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        merge({
          adTextGenerating: false,
          adTextResults: { ...(s.adTextResults || {}), [type + (hookType ? `_${hookType}` : '')]: data.data },
        })
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      } else {
        merge({ adTextError: data?.message || 'Generation failed', adTextGenerating: false })
      }
    } catch (err) {
      merge({ adTextError: err.message, adTextGenerating: false })
    }
  }, [s, merge, set])

  // ── Ad Studio generation ──────────────────────────────────
  const generateAdImage = useCallback(async ({ prompt, mode, adConfig }) => {
    merge({ adGenerating: true, adError: '', adGeneratedImage: '', adVideoUrl: '' })
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode,
          adConfig,
          // Pass identity for personal brand ads
          ...(mode === 'personal_brand_ad' && s.imageDataUrl ? {
            imageDataUrl: s.imageDataUrl,
            identity: { image: s.imageDataUrl },
            extractedTraits: s.traits?.subjectA || {},
          } : {}),
        }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        merge({ adGeneratedImage: data.imageUrl, adGenerating: false })
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      } else {
        merge({ adError: data?.message || 'Generation failed', adGenerating: false })
      }
    } catch (err) {
      merge({ adError: err.message, adGenerating: false })
    }
  }, [s, merge, set])

  const generateAdVideo = useCallback(async ({ prompt, mode, adConfig, imageUrl }) => {
    merge({ adVideoGenerating: true, adVideoError: '', adVideoUrl: '' })
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode,
          adConfig,
          imageUrl: imageUrl || s.adGeneratedImage || '',
        }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        merge({ adVideoUrl: data.videoUrl, adVideoGenerating: false })
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      } else {
        merge({ adVideoError: data?.error || 'Video generation failed', adVideoGenerating: false })
      }
    } catch (err) {
      merge({ adVideoError: err.message, adVideoGenerating: false })
    }
  }, [s, merge, set])

  // ── Video generation ──────────────────────────────────────
  const generateVideo = useCallback(async (prompt, imageUrl, progressionLevel, batchKey) => {
    if (!prompt) return
    if (batchKey !== undefined) {
      merge({ batchVideos: { ...s.batchVideos, [batchKey]: { generating: true, url: '', error: '' } } })
    } else {
      merge({ videoGenerating: true, videoUrl: '', videoError: '' })
    }
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageUrl, progressionLevel, mode: 'director' }),
      })
      const data = await res.json()
      if (data?.status === 'complete') {
        if (batchKey !== undefined) {
          merge({ batchVideos: { ...s.batchVideos, [batchKey]: { generating: false, url: data.videoUrl, error: '' } } })
        } else {
          merge({ videoGenerating: false, videoUrl: data.videoUrl, videoError: '' })
        }
        if (typeof data.creditsRemaining === 'number') set('credits', data.creditsRemaining)
      } else {
        const errMsg = data?.error || 'Video generation failed'
        if (batchKey !== undefined) {
          merge({ batchVideos: { ...s.batchVideos, [batchKey]: { generating: false, url: '', error: errMsg } } })
        } else {
          merge({ videoGenerating: false, videoUrl: '', videoError: errMsg })
        }
      }
    } catch (err) {
      if (batchKey !== undefined) {
        merge({ batchVideos: { ...s.batchVideos, [batchKey]: { generating: false, url: '', error: err.message } } })
      } else {
        merge({ videoGenerating: false, videoUrl: '', videoError: err.message })
      }
    }
  }, [s, merge, set])

  const loadHistory = useCallback(async () => {
    try {
      const res  = await fetch('/api/get-history')
      const data = await res.json()
      if (data?.status === 'success') setHistory(data.history || [])
    } catch (err) {
      console.error('History load failed:', err)
    }
  }, [])

  const rAll = () => {
    setS(INIT); setResult(null); setBatch([]); setSaved([])
    setActiveScene(0); setOutputTab('output')
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────

  return (
    <>
      {/* HELP DRAWER */}
      {helpOpen && (
        <>
          <div onClick={() => setHelpOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            width: 420, zIndex: 999,
            background: '#0d0d0d',
            borderLeft: `1px solid ${C.subtle}`,
            overflowY: 'auto',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${C.subtle}`,
              background: '#111',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold }}>
                  PROMPT CEO — DIRECTOR'S STUDIO
                </div>
                <div style={{ fontSize: 10, color: '#888', letterSpacing: 1, marginTop: 2 }}>Help & Documentation</div>
              </div>
              <button onClick={() => setHelpOpen(false)} style={{ background: 'transparent', border: 'none', color: '#aaa', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e8e4dc', marginBottom: 6 }}>Director's Studio v3</div>
                <div style={{ fontSize: 12, color: '#9a9690', lineHeight: 1.7 }}>
                  A cinematic AI directing studio for generating high-quality image and video prompts with consistent identity, world-aware scene building, and director-style visual grammar.
                </div>
              </div>
              <div style={{ height: 1, background: C.subtle }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, marginBottom: 12 }}>Credits System</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {[
                    { action: '🎨 Generate Image (Director)', cost: '5 credits' },
                    { action: '📣 Generate Image (Ad Studio)', cost: '5 credits' },
                    { action: '🎬 Generate Video', cost: '60 credits' },
                  ].map(({ action, cost }) => (
                    <div key={action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 5, background: '#111', border: `1px solid ${C.subtle}` }}>
                      <span style={{ fontSize: 12, color: '#e8e4dc' }}>{action}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: C.subtle }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.violet, marginBottom: 12 }}>Ad Creative Studio</div>
                <div style={{ fontSize: 12, color: '#9a9690', lineHeight: 1.7, marginBottom: 10 }}>
                  Generate scroll-stopping ad content — product campaigns or personal brand content — using the same AI pipeline as the Director's Studio.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { title: 'Product Ad', body: 'Configure product name, visual style (lifestyle, minimal, editorial, UGC, cinematic), platform, and mood. No identity image needed.' },
                    { title: 'Personal Brand Ad', body: 'Uses your identity image to preserve your likeness. Pick your niche, campaign goal, and platform. Perfect for creator and influencer ad content.' },
                    { title: 'Animate to Video', body: 'After generating an ad image, hit the Animate button to create a 5-second video ad using Runway Gen4 Turbo.' },
                  ].map(({ title, body }) => (
                    <div key={title} style={{ display: 'flex', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.violet, flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#e8e4dc', marginBottom: 2 }}>{title}</div>
                        <div style={{ fontSize: 11, color: '#9a9690', lineHeight: 1.6 }}>{body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 10, color: '#444', textAlign: 'center', paddingBottom: 8 }}>
                Prompt CEO — Director's Studio v3
              </div>
            </div>
          </div>
        </>
      )}

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
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, fontFamily: C.display }}>
                PROMPT CEO
              </div>
              <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1 }}>DIRECTOR'S STUDIO</div>
            </div>
          </div>

          <div style={{ width: 1, height: 20, background: C.hairline }} />

          {/* ── View tabs — now 3 tabs ── */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[
              { id: 'studio',   label: 'Studio',   icon: '◧' },
              { id: 'timeline', label: 'Timeline',  icon: '▤' },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => set('view', v.id)}
                style={{
                  padding: '5px 14px', borderRadius: 4,
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  letterSpacing: 0.4,
                  border: `1px solid ${s.view === v.id ? C.goldDim : C.subtle}`,
                  background: s.view === v.id ? '#1a1408' : C.surface,
                  color: s.view === v.id ? C.gold : '#9a9690',
                  transition: 'all 0.15s',
                }}
              >
                {v.icon} {v.label}
              </button>
            ))}

            {/* Ad Studio — visually distinct, always visible */}
            <button
              onClick={() => set('view', 'ad_studio')}
              style={{
                padding: '5px 16px', borderRadius: 4,
                fontSize: 11, fontWeight: 800, cursor: 'pointer',
                letterSpacing: 0.5,
                border: `1px solid ${s.view === 'ad_studio' ? '#b44aff' : '#7a3abf'}`,
                background: s.view === 'ad_studio'
                  ? 'linear-gradient(135deg, #2a0a4a, #1a0838)'
                  : 'linear-gradient(135deg, #1a0838, #0e0520)',
                color: s.view === 'ad_studio' ? '#d580ff' : '#a855f7',
                boxShadow: s.view === 'ad_studio'
                  ? '0 0 12px #9b2fff44, inset 0 0 8px #9b2fff18'
                  : '0 0 6px #7a2fff22',
                transition: 'all 0.15s',
              }}
            >
              📣 Ad Studio
            </button>

            {/* Dashboard link */}
            <a
              href="/prompt-engine-v3/dashboard"
              style={{
                padding: '5px 12px', borderRadius: 4,
                fontSize: 10, fontWeight: 700, cursor: 'pointer',
                border: `1px solid ${C.subtle}`, background: C.surface,
                color: C.secondary, textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              📋 Dashboard
            </a>
          </div>

          <div style={{ flex: 1 }} />

          {s.view === 'ad_studio' && (
            <div style={{
              padding: '3px 10px', borderRadius: 3,
              fontSize: 9, fontWeight: 700, letterSpacing: 1,
              background: C.violetGlow, border: `1px solid ${C.violetDim}`,
              color: C.violet, textTransform: 'uppercase',
            }}>
              📣 Ad Creative Mode
            </div>
          )}

          {s.directorPreset !== 'none' && s.view !== 'ad_studio' && (
            <div style={{
              padding: '3px 10px', borderRadius: 3,
              fontSize: 9, fontWeight: 700, letterSpacing: 1,
              background: C.goldGlow, border: `1px solid ${C.goldDim}`,
              color: C.gold, textTransform: 'uppercase',
            }}>
              {activeDirectorPreset.icon} {activeDirectorPreset.label} Mode
            </div>
          )}

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

          <button
            onClick={() => setHelpOpen(true)}
            style={{
              padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700,
              cursor: 'pointer', border: `1px solid ${C.goldDim}`,
              background: C.goldGlow, color: C.gold, letterSpacing: 0.5,
            }}
          >
            ? Help
          </button>
          <Btn variant="danger" onClick={rAll}>↺ Reset</Btn>
        </div>

        {/* ── AD STUDIO VIEW ──────────────────────────────── */}
        {s.view === 'ad_studio' && (
          <AdStudioView
            s={s}
            set={set}
            merge={merge}
            generateAdImage={generateAdImage}
            generateAdVideo={generateAdVideo}
            generateAdText={generateAdText}
          />
        )}

        {/* ── STUDIO VIEW ─────────────────────────────────── */}
        {s.view === 'studio' && (
          <div style={{
            flex: 1, minHeight: 0,
            display: 'grid', gridTemplateColumns: '280px 1fr 300px',
            overflow: 'hidden',
          }}>

            {/* ══ LEFT ══ */}
            <div style={{
              borderRight: `1px solid ${C.hairline}`,
              overflowY: 'auto', padding: '10px 9px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>

              {/* IDENTITY */}
              <Panel title="Identity" accent={C.green}
                badge={s.useIdentity ? <Chip>🔒 locked</Chip> : <Chip>off</Chip>}
                right={
                  <Btn variant="danger" onClick={() => merge({
                    useIdentity: false, identityName: '', hasImage: false,
                    imageDataUrl: '', identityStorageUrl: '', scanState: 'idle', scanError: '',
                    useTraits: false, identityStrength: 100,
                    continuityLock: false, prevOutputs: [],
                    traits: {
                      subjectA: { name: '', age: '', ethnicity: '', body: '', breast: '', glutes: '', eyes: '', hair: '', locked: { name: false, age: false, ethnicity: false, body: false, breast: false, glutes: false, eyes: false, hair: false } },
                      subjectB: { name: '', age: '', ethnicity: '', body: '', eyes: '', hair: '', locked: { name: false, age: false, ethnicity: false, body: false, eyes: false, hair: false } },
                    },
                  })}>
                    reset
                  </Btn>
                }
              >
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
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '3px 6px', fontSize: 9, color: C.muted, textAlign: 'center' }}>
                      {s.imageUploading ? '⟳ Saving…' : s.hasImage ? '✓ reference loaded' : 'loaded'}
                    </div>
                  )}
                  <input id="__imgUp" type="file" accept="image/*" style={{ display: 'none' }} onChange={onImg} />
                </div>

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
                  <Sel value={s.ageRange} onChange={v => set('ageRange', v)} options={AGE_OPTIONS} />
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
                badge={dnaProfiles.length > 0 ? <Chip>{dnaProfiles.length} saved</Chip> : null}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Label>Character Mode</Label>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {['female', 'male', 'couple'].map(m => (
                      <button key={m}
                        onClick={() => merge({ characterMode: m, subjectGender: m === 'male' ? 'male' : 'female' })}
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

                <SubjectTraits
                  label={s.characterMode === 'male' ? 'Subject — Male' : s.characterMode === 'couple' ? 'Subject A — Female' : 'Subject — Female'}
                  traits={s.traits.subjectA}
                  accentColor={C.green}
                  isMale={s.characterMode === 'male'}
                  onChange={(field, value) => set('traits', { ...s.traits, subjectA: { ...s.traits.subjectA, [field]: value } })}
                  onToggleLock={field => set('traits', { ...s.traits, subjectA: { ...s.traits.subjectA, locked: { ...(s.traits.subjectA.locked || {}), [field]: !(s.traits.subjectA.locked?.[field]) } } })}
                />

                {s.characterMode === 'couple' && (
                  <SubjectTraits
                    label="Subject B — Male"
                    traits={s.traits.subjectB}
                    accentColor={C.blue}
                    isMale={true}
                    onChange={(field, value) => set('traits', { ...s.traits, subjectB: { ...s.traits.subjectB, [field]: value } })}
                    onToggleLock={field => set('traits', { ...s.traits, subjectB: { ...s.traits.subjectB, locked: { ...(s.traits.subjectB.locked || {}), [field]: !(s.traits.subjectB.locked?.[field]) } } })}
                  />
                )}

                <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Label>Saved Profiles ({dnaProfiles.length})</Label>
                  <select
                    style={{ width: '100%', background: C.deep, color: C.primary, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '6px 8px', fontSize: 11 }}
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
                    <Btn variant="default" disabled={!dnaSelected} onClick={() => dnaLoadProfile(dnaSelected)} sx={{ flex: 1, fontSize: 10 }}>↑ Load</Btn>
                    <Btn variant="danger" disabled={!dnaSelected} onClick={() => dnaDeleteProfile(dnaSelected)} sx={{ flex: 1, fontSize: 10 }}>✕</Btn>
                  </div>
                </div>

                {dnaSelected && (() => {
                  const p = dnaProfiles.find(x => String(x.id) === dnaSelected)
                  if (!p) return null
                  return (
                    <div style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '7px 8px' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6 }}>
                        <span style={{ color: C.secondary }}>{p.characterMode}</span>
                        {p.traits?.subjectA?.ethnicity ? ` · ${p.traits.subjectA.ethnicity}` : ''}
                        {p.traits?.subjectA?.hair      ? ` · ${p.traits.subjectA.hair}`      : ''}
                      </div>
                      {p.imageDataUrl && (
                        <img src={p.imageDataUrl} alt="dna" style={{ width: '100%', height: 56, objectFit: 'cover', borderRadius: 3, marginTop: 6 }} />
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
                <Seg options={['auto', 'manual'].map(m => ({ value: m, label: m }))} value={s.worldControlMode} onChange={v => set('worldControlMode', v)} />
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
                    <Sel value={s.subLocationId} onChange={v => set('subLocationId', v)} placeholder="Auto from phase" options={subLocOpts} disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}
                {s.subLocationId && sceneGOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Scene group</Label>
                    <Sel value={s.sceneGroupId} onChange={v => set('sceneGroupId', v)} placeholder="Auto" options={sceneGOpts} disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}
                {worldObj && phaseOpts.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Phase</Label>
                    <Sel value={s.phaseKey} onChange={v => set('phaseKey', v)} placeholder="Auto from progression" options={phaseOpts} disabled={s.worldControlMode !== 'manual'} />
                  </div>
                )}
              </Panel>

              {/* DIRECTOR */}
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
                        fontSize: 9, fontWeight: 700, cursor: 'pointer', textAlign: 'center',
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
                  <div style={{ fontSize: 10, color: C.muted, fontStyle: 'italic', padding: '4px 6px', background: C.deep, borderRadius: 3, border: `1px solid ${C.hairline}` }}>
                    {activeDirectorPreset.description}
                  </div>
                )}
              </Panel>
            </div>

            {/* ══ CENTER ══ */}
            <div style={{ overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, background: '#070707' }}>

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
                <div style={{ display: 'flex', gap: 3 }}>
                  {['tease', 'tension', 'payoff'].map(l => {
                    const r   = s.progressionIndex / Math.max(s.totalCount - 1, 1)
                    const inZ = (l==='tease'&&r<0.33)||(l==='tension'&&r>=0.33&&r<0.66)||(l==='payoff'&&r>=0.66)
                    return (
                      <div key={l} style={{ flex: 1 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, textAlign: 'center', letterSpacing: 0.8, textTransform: 'uppercase', color: inZ ? pc(l) : C.ghost, marginBottom: 3 }}>{l}</div>
                        <div style={{ height: 2, borderRadius: 1, background: inZ ? pc(l) : C.hairline }} />
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, color: C.ghost, minWidth: 10 }}>0</span>
                  <input type="range" min={0} max={s.totalCount - 1} value={s.progressionIndex} onChange={e => set('progressionIndex', Number(e.target.value))} style={{ flex: 1, accentColor: pc(progLevel) }} />
                  <span style={{ fontSize: 9, color: C.ghost, minWidth: 16 }}>{s.totalCount - 1}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Index</Label>
                    <Inp type="number" min={0} max={s.totalCount - 1} value={s.progressionIndex} onChange={e => set('progressionIndex', Number(e.target.value))} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Label>Total scenes</Label>
                    <select
                      style={{ width: '100%', background: C.deep, color: C.primary, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '6px 8px', fontSize: 11 }}
                      value={s.totalCount} onChange={e => set('totalCount', Number(e.target.value))}
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
                <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${C.hairline}`, marginBottom: 4 }}>
                  {['output', 'layers', 'meta', 'image', 'warnings'].map(t => {
                    const hasDot = t === 'warnings' && result?.warnings?.length > 0
                    return (
                      <button key={t} onClick={() => setOutputTab(t)} style={{
                        padding: '5px 9px', borderRadius: '3px 3px 0 0',
                        fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        background: outputTab === t ? C.surface : 'transparent',
                        border: `1px solid ${outputTab === t ? C.hairline : 'transparent'}`,
                        borderBottom: `1px solid ${outputTab === t ? C.surface : C.hairline}`,
                        marginBottom: -1, color: outputTab === t ? C.primary : C.muted,
                        position: 'relative',
                      }}>
                        {t}
                        {hasDot && <span style={{ position: 'absolute', top: 2, right: 2, width: 4, height: 4, borderRadius: '50%', background: C.tension }} />}
                      </button>
                    )
                  })}
                </div>

                {outputTab === 'output' && (
                  <>
                    {result?.finalPrompt ? (
                      <div style={{ background: C.void, border: `1px solid #141e12`, borderRadius: 5, padding: '12px 13px', fontFamily: C.mono, fontSize: 11, lineHeight: 1.9, color: '#7ecf7e', whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 80, maxHeight: 280, overflowY: 'auto' }}>
                        {result.finalPrompt}
                      </div>
                    ) : (
                      <div style={{ background: C.void, border: `1px solid ${C.hairline}`, borderRadius: 5, padding: '12px 13px', fontFamily: C.mono, fontSize: 11, color: C.ghost, fontStyle: 'italic', minHeight: 80 }}>
                        Press Generate Scene to build a cinematic prompt.
                      </div>
                    )}
                    {result?.finalPrompt && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                        {[
                          { label: 'MJ',     format: p => `${p} --ar 2:3 --style raw --q 2` },
                          { label: 'Runway', format: p => p.slice(0, 1000) },
                          { label: 'Kling',  format: p => `${p} --ratio 9:16 --duration 5` },
                        ].map(({ label, format }) => (
                          <Btn key={label} variant="ghost" onClick={() => doCopy(format(result.finalPrompt), `export_${label}`)} sx={{ fontSize: 10, border: `1px solid ${C.subtle}`, color: copied === `export_${label}` ? C.green : C.secondary }}>
                            {copied === `export_${label}` ? `✓ ${label}` : `⎘ ${label}`}
                          </Btn>
                        ))}
                      </div>
                    )}
                    {result?.finalPrompt && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {['scene', 'camera', 'wardrobe', 'mood', 'lighting'].map(l => (
                          <Btn key={l} variant="ghost" onClick={() => regenLayer(l)} sx={{ color: regenState[l] ? C.green : C.muted }}>
                            {regenState[l] ? `✓ ${l}` : `↺ ${l}`}
                          </Btn>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {outputTab === 'layers' && (
                  <div>
                    {result?.layers ? Object.entries(result.layers).map(([k, v]) => (
                      <div key={k} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 8, padding: '5px 0', borderBottom: `1px solid ${C.void}`, alignItems: 'start' }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', paddingTop: 1 }}>{k}</div>
                        <div style={{ fontSize: 10, fontFamily: C.mono, lineHeight: 1.5, wordBreak: 'break-word', color: v ? C.secondary : C.ghost, fontStyle: v ? 'normal' : 'italic' }}>{v || '(empty)'}</div>
                      </div>
                    )) : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic' }}>No result yet.</div>}
                  </div>
                )}

                {outputTab === 'meta' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {result?.meta ? Object.entries(result.meta).filter(([k]) => k !== 'layerSources').map(([k, v]) => (
                      <div key={k} style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, padding: '5px 7px' }}>
                        <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                        <div style={{ fontSize: 10, color: C.blue, fontFamily: C.mono, wordBreak: 'break-all' }}>{String(v ?? '—')}</div>
                      </div>
                    )) : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic', gridColumn: 'span 2' }}>No result yet.</div>}
                  </div>
                )}

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
                          <a href={`/api/download-image?url=${encodeURIComponent(s.generatedImage)}&name=promptceo-image.jpg`}
                            style={{ padding: '5px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: 'none', color: C.muted, background: C.surface, border: `1px solid ${C.hairline}` }}>
                            ↓ download
                          </a>
                        </div>
                        {s.videoError && <div style={{ padding: '6px 8px', borderRadius: 4, fontSize: 10, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>{s.videoError}</div>}
                        {s.videoUrl && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <video src={s.videoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: 5 }} />
                            <a href={`/api/download-image?url=${encodeURIComponent(s.videoUrl)}&name=scene-video.mp4`}
                              style={{ padding: '5px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: 'none', color: C.muted, background: C.surface, border: `1px solid ${C.hairline}`, textAlign: 'center' }}>
                              ↓ download video
                            </a>
                          </div>
                        )}
                        <Btn variant="gold" disabled={s.videoGenerating} onClick={() => generateVideo(result?.finalPrompt, s.generatedImage, result?.meta?.progressionLevel)} sx={{ width: '100%', padding: '9px 0', fontSize: 12 }}>
                          {s.videoGenerating ? '⟳ Generating video… (60 credits)' : '🎬 Generate Video (60 credits)'}
                        </Btn>
                      </>
                    )}
                    <Btn variant="green" disabled={s.imageGenerating || !result?.finalPrompt} onClick={generateImage} sx={{ width: '100%', padding: '9px 0', fontSize: 12 }}>
                      {s.imageGenerating ? '⟳ Generating…' : '🎨 Generate Image (5 credits)'}
                    </Btn>
                  </div>
                )}

                {outputTab === 'warnings' && (
                  <div>
                    {result?.warnings?.length ? result.warnings.map((w, i) => (
                      <div key={i} style={{ padding: '4px 7px', borderRadius: 4, fontSize: 9, marginBottom: 3, color: w.includes('EXCEPTION') ? '#cf6a6a' : '#c49a2a', background: w.includes('EXCEPTION') ? '#110606' : '#100e00', border: `1px solid ${w.includes('EXCEPTION') ? '#2a1010' : '#221a00'}`, fontFamily: C.mono, lineHeight: 1.5 }}>
                        {w}
                      </div>
                    )) : <div style={{ fontSize: 11, color: C.ghost, fontStyle: 'italic' }}>No warnings.</div>}
                  </div>
                )}
              </Panel>

              {/* GENERATE ACTIONS */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button onClick={generate} style={{ flex: 1, padding: '10px 0', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: '1px solid #1a4a2a', background: 'linear-gradient(180deg, #14381a, #0c2214)', color: C.green, letterSpacing: 0.5 }}>
                  ▶ Generate Scene
                </button>
                <select value={s.totalCount} onChange={e => set('totalCount', Number(e.target.value))} style={{ background: C.deep, color: C.blue, border: `1px solid ${C.blueDim}`, borderRadius: 5, padding: '0 8px', fontSize: 11, fontWeight: 700, cursor: 'pointer', outline: 'none', minWidth: 64 }}>
                  {TOTAL_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={runBatch} disabled={batchRun} style={{ flex: 1, padding: '10px 0', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: batchRun ? 'not-allowed' : 'pointer', border: '1px solid #1a2a4a', background: 'linear-gradient(180deg, #101c30, #080e1c)', color: C.blue, opacity: batchRun ? 0.7 : 1, letterSpacing: 0.5 }}>
                  {batchRun ? `⟳ ${batchProg} / ${s.totalCount}` : `⚡ Batch ${s.totalCount}`}
                </button>
                {batchRun && (
                  <button onClick={() => { stopRef.current = true }} style={{ width: 56, padding: '10px 0', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1px solid #3a1010', background: '#180808', color: '#cf7e7e' }}>
                    stop
                  </button>
                )}
              </div>

              {/* BATCH IMAGE GENERATE + GRID */}
              {batch.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={generateBatchImages} disabled={s.batchImgRunning || !s.imageDataUrl} style={{ flex: 1, padding: '9px 0', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: (s.batchImgRunning || !s.imageDataUrl) ? 'not-allowed' : 'pointer', border: '1px solid #3a1a6a', background: 'linear-gradient(180deg,#1a0e30,#0e0818)', color: '#c07ef0', opacity: (s.batchImgRunning || !s.imageDataUrl) ? 0.5 : 1 }}>
                      {s.batchImgRunning ? `⟳ Image ${s.batchImgProgress}/${batch.length}` : `🎨 Generate ${batch.length} Images`}
                    </button>
                    {s.batchImgRunning && (
                      <button onClick={() => { stopRef.current = true }} style={{ width: 56, padding: '9px 0', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: '1px solid #3a1010', background: '#180808', color: '#cf7e7e' }}>
                        stop
                      </button>
                    )}
                  </div>

                  {s.batchImages?.length > 0 && (
                    <div style={{ background: C.void, border: `1px solid ${C.hairline}`, borderRadius: 5, padding: '10px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
                        Generated Images ({s.batchImages.filter(i => i.imageUrl).length} / {s.batchImages.length})
                      </div>
                      {s.batchImgRunning && <div style={{ marginBottom: 8 }}><Track value={s.batchImgProgress} max={batch.length} color="#c07ef0" /></div>}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, maxHeight: 600, overflowY: 'auto' }}>
                        {s.batchImages.map((item, i) => (
                          <div key={i} style={{ background: C.deep, border: `1px solid ${C.hairline}`, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                            {item.imageUrl ? (
                              <>
                                <img src={item.imageUrl} alt={`Scene ${item.index + 1}`} style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer', background: '#000' }} onClick={() => window.open(item.imageUrl, '_blank')} />
                                <div style={{ background: 'rgba(0,0,0,0.75)', padding: '3px 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                                  <span style={{ fontSize: 8, color: C.muted }}>#{item.index + 1}</span>
                                  <div style={{ display: 'flex', gap: 3 }}>
                                    <a href={`/api/download-image?url=${encodeURIComponent(item.imageUrl)}&name=scene-${item.index + 1}.jpg`} style={{ background: '#c07ef0', color: '#000', border: 'none', borderRadius: 3, padding: '2px 6px', fontSize: 9, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>↓</a>
                                    <button onClick={() => generateVideo(item.prompt, item.imageUrl, item.meta?.progressionLevel, item.index)} disabled={s.batchVideos?.[item.index]?.generating} style={{ background: s.batchVideos?.[item.index]?.generating ? C.goldDim : C.gold, color: '#000', border: 'none', borderRadius: 3, padding: '2px 6px', fontSize: 9, fontWeight: 700, cursor: s.batchVideos?.[item.index]?.generating ? 'not-allowed' : 'pointer' }}>
                                      {s.batchVideos?.[item.index]?.generating ? '⟳' : '🎬'}
                                    </button>
                                  </div>
                                </div>
                                {s.batchVideos?.[item.index]?.url && (
                                  <div style={{ padding: '4px' }}>
                                    <video src={s.batchVideos[item.index].url} controls loop style={{ width: '100%', borderRadius: 3 }} />
                                    <a href={`/api/download-image?url=${encodeURIComponent(s.batchVideos[item.index].url)}&name=scene-${item.index + 1}.mp4`} style={{ display: 'block', textAlign: 'center', marginTop: 4, fontSize: 9, color: C.gold, textDecoration: 'none' }}>↓ save video</a>
                                  </div>
                                )}
                                {s.batchVideos?.[item.index]?.error && <div style={{ padding: '4px 6px', fontSize: 8, color: '#cf6a6a' }}>{s.batchVideos[item.index].error}</div>}
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
                          <Btn variant="ghost" onClick={() => { s.batchImages.filter(i => i.imageUrl).forEach((item, idx) => { setTimeout(() => { const a = Object.assign(document.createElement('a'), { href: `/api/download-image?url=${encodeURIComponent(item.imageUrl)}&name=scene-${item.index + 1}.jpg`, download: `scene-${item.index + 1}.jpg` }); a.click() }, idx * 600) }) }} sx={{ fontSize: 10 }}>
                            ↓ Download All ({s.batchImages.filter(i => i.imageUrl).length})
                          </Btn>
                          <Btn variant="danger" onClick={() => merge({ batchImages: [], batchVideos: {} })} sx={{ fontSize: 10 }}>clear</Btn>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ══ RIGHT ══ */}
            <div style={{ borderLeft: `1px solid ${C.hairline}`, overflowY: 'auto', padding: '10px 9px', display: 'flex', flexDirection: 'column', gap: 8 }}>

              <Panel title="Prompt History" accent={C.blue} badge={history.length > 0 ? <Chip>{history.length}</Chip> : null} defaultOpen={false}
                right={<Btn variant="ghost" onClick={() => { loadHistory(); setHistoryOpen(true) }} sx={{ fontSize: 10 }}>load</Btn>}
              >
                {history.length === 0 ? (
                  <div style={{ fontSize: 10, color: C.ghost, fontStyle: 'italic' }}>Click load to fetch your prompt history.</div>
                ) : history.map(h => (
                  <div key={h.id} style={{ background: C.surface, border: `1px solid ${C.subtle}`, borderRadius: 5, padding: '8px 9px' }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: C.secondary }}>{h.created_at ? new Date(h.created_at).toLocaleDateString() : ''}</span>
                      {h.progression_level && <Pill color={pc(h.progression_level)}>{h.progression_level}</Pill>}
                      {h.director && h.director !== 'none' && <Pill color={C.gold}>{h.director}</Pill>}
                      {h.world_id && <Pill color={C.blue}>{h.world_id.replace(/_/g, ' ')}</Pill>}
                    </div>
                    {h.image_url && <img src={h.image_url} alt="generated" style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 3, marginBottom: 5 }} />}
                    <div style={{ fontSize: 10, color: C.secondary, fontFamily: C.mono, lineHeight: 1.5, wordBreak: 'break-word', marginBottom: 5 }}>
                      {(h.prompt || '').slice(0, 120)}{(h.prompt || '').length > 120 ? '…' : ''}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Btn variant="ghost" onClick={() => { setResult({ finalPrompt: h.prompt, meta: { progressionLevel: h.progression_level, timeOfDay: h.time_of_day, primaryWorldId: h.world_id }, layers: {}, warnings: [] }); setOutputTab('output'); set('view', 'studio') }} sx={{ fontSize: 10 }}>load</Btn>
                      <Btn variant="ghost" onClick={() => doCopy(h.prompt, `h${h.id}`)} sx={{ fontSize: 10 }}>{copied === `h${h.id}` ? '✓' : 'copy'}</Btn>
                    </div>
                  </div>
                ))}
              </Panel>

              <Panel title="Saved Prompts" accent={C.blue} badge={saved.length > 0 ? <Chip>{saved.length}</Chip> : null} right={saved.length > 0 && <Btn variant="danger" onClick={() => setSaved([])}>clear</Btn>}>
                {saved.length === 0 ? (
                  <div style={{ fontSize: 10, color: C.ghost, fontStyle: 'italic' }}>No saved prompts yet.</div>
                ) : saved.map(e => (
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
                ))}
              </Panel>

              {worldObj && (
                <Panel title="World Info">
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: C.display }}>{worldObj.name}</div>
                  {worldObj.description && <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.6 }}>{worldObj.description.slice(0, 180)}{worldObj.description.length > 180 ? '…' : ''}</div>}
                  {worldObj.identity?.vibe?.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>{worldObj.identity.vibe.slice(0, 5).map((v, i) => <Chip key={i}>{v}</Chip>)}</div>}
                  <div style={{ fontSize: 9, color: C.ghost }}>{Object.keys(worldObj.subLocations || {}).length} sub-locations · {worldObj.phaseOrder?.length || 0} phases</div>
                </Panel>
              )}
            </div>
          </div>
        )}

        {/* ══ TIMELINE VIEW ══ */}
        {s.view === 'timeline' && (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flexShrink: 0, padding: '10px 16px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', gap: 12, background: C.deep }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold }}>Director's Timeline</span>
              {batch.length > 0 && (<><Chip>{batch.length} scenes</Chip><Chip>{activeScene + 1} active</Chip></>)}
              <div style={{ flex: 1 }} />
              {batch.length > 0 && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="gold" onClick={() => setDirectorOpen(true)}>🎬 Director's Chair</Btn>
                  <Btn variant="default" onClick={exportBatch}>⎘ .txt</Btn>
                  <Btn variant="default" onClick={() => exportForTool('midjourney')}>⎘ MJ</Btn>
                  <Btn variant="default" onClick={() => exportForTool('runway')}>⎘ Runway</Btn>
                  <Btn variant="default" onClick={() => exportForTool('kling')}>⎘ Kling</Btn>
                  <Btn variant="default" onClick={exportStoryboard}>storyboard</Btn>
                  <Btn variant="default" onClick={() => doCopy(batch.map(r => r.finalPrompt).join('\n\n'), 'ba')}>{copied === 'ba' ? '✓ copied all' : 'copy all'}</Btn>
                </div>
              )}
              {batchRun && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: C.green }}>Generating {batchProg} / {s.totalCount}…</span>
                  <Track value={batchProg} max={s.totalCount} color={C.green} />
                </div>
              )}
            </div>

            {batch.length > 0 && (
              <div style={{ flexShrink: 0, padding: '8px 16px', borderBottom: `1px solid ${C.hairline}`, background: C.void }}>
                <div style={{ height: 4, borderRadius: 2, marginBottom: 6, background: `linear-gradient(90deg, ${batch.map((r, i) => { const col = TIME_COLORS[r.meta?.timeOfDay] || C.deep; const pct = ((i / batch.length) * 100).toFixed(1); return `${col} ${pct}%` }).join(', ')})` }} />
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 48 }}>
                  {batch.map((r, i) => (
                    <SceneCard key={i} result={r} index={i} total={batch.length} onClick={() => { setActiveScene(i); set('progressionIndex', i) }} isActive={i === activeScene} compact={true} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>EARLY MORNING</span>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>GOLDEN HOUR</span>
                  <span style={{ fontSize: 8, color: C.ghost, letterSpacing: 1 }}>LATE NIGHT</span>
                </div>
              </div>
            )}

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {batch.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.ghost, gap: 12 }}>
                  <div style={{ fontSize: 32 }}>🎬</div>
                  <div style={{ fontSize: 12, letterSpacing: 1 }}>No scenes generated yet.</div>
                  <div style={{ fontSize: 10, color: C.ghost, opacity: 0.6 }}>Switch to Studio view and press Batch Generate.</div>
                  <Btn variant="gold" onClick={() => set('view', 'studio')}>← Back to Studio</Btn>
                </div>
              ) : batch.map((r, i) => (
                <SceneCard key={i} result={r} index={i} total={batch.length} onClick={() => { setActiveScene(i); set('progressionIndex', i) }} isActive={i === activeScene} compact={false} />
              ))}
            </div>

            {batch[activeScene] && (
              <div style={{ flexShrink: 0, borderTop: `1px solid ${C.hairline}`, padding: '10px 16px', background: C.deep, display: 'flex', gap: 16, alignItems: 'flex-start', maxHeight: 180 }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>Scene {activeScene + 1}</span>
                    <Pill color={pc(batch[activeScene].meta?.progressionLevel)}>{batch[activeScene].meta?.progressionLevel}</Pill>
                    <Pill color={TIME_COLORS[batch[activeScene].meta?.timeOfDay] || C.muted}>{(batch[activeScene].meta?.timeOfDay || '').replace(/_/g, ' ')}</Pill>
                    <Pill color={C.blue}>{batch[activeScene].meta?.envFamily}</Pill>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: C.mono, lineHeight: 1.8, color: '#7ecf7e', wordBreak: 'break-word', overflowY: 'auto', maxHeight: 120 }}>
                    {batch[activeScene].finalPrompt}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                  <Btn variant="ghost" onClick={() => doCopy(batch[activeScene].finalPrompt, `t${activeScene}`)}>{copied === `t${activeScene}` ? '✓ copied' : 'copy'}</Btn>
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