'use client'

/**
 * AdCreativeStudio
 * Drop into prompt-engine-v3 alongside your existing Director mode UI.
 *
 * Usage:
 *   import AdCreativeStudio from '@/app/prompt-engine-v3/core/AdCreativeStudio'
 *
 *   <AdCreativeStudio
 *     onGenerate={handleGenerate}   // same handler as director mode — receives { prompt, mode, adConfig, imageDataUrl? }
 *     identity={identity}           // pass through your existing identity state
 *     isGenerating={isGenerating}
 *     credits={credits}
 *   />
 */

import { useState } from 'react'

// ─── Config maps ──────────────────────────────────────────────────────────────

const AD_STYLES = [
  { value: 'lifestyle',  label: 'Lifestyle',   icon: '🌅', desc: 'Product in real-world aspirational setting' },
  { value: 'minimal',    label: 'Minimal',     icon: '⬜', desc: 'Clean product hero on elegant background' },
  { value: 'editorial',  label: 'Editorial',   icon: '📸', desc: 'High-fashion editorial aesthetic' },
  { value: 'ugc',        label: 'UGC',         icon: '📱', desc: 'Authentic user-generated content feel' },
  { value: 'cinematic',  label: 'Cinematic',   icon: '🎬', desc: 'Wide cinematic environmental scene' },
]

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram', icon: '📷' },
  { value: 'tiktok',    label: 'TikTok',    icon: '🎵' },
  { value: 'facebook',  label: 'Facebook',  icon: '👥' },
  { value: 'general',   label: 'Universal', icon: '🌐' },
]

const CREATOR_NICHES = [
  { value: 'lifestyle', label: 'Lifestyle',  icon: '✨' },
  { value: 'fitness',   label: 'Fitness',    icon: '💪' },
  { value: 'beauty',    label: 'Beauty',     icon: '💄' },
  { value: 'fashion',   label: 'Fashion',    icon: '👗' },
  { value: 'business',  label: 'Business',   icon: '💼' },
  { value: 'creator',   label: 'Creator',    icon: '🎥' },
]

const AD_GOALS = [
  { value: 'awareness',   label: 'Brand Awareness',  desc: 'Bold, memorable, wide reach' },
  { value: 'conversion',  label: 'Drive Sales',       desc: 'Clear hook, direct response' },
  { value: 'engagement',  label: 'Engagement',        desc: 'Authentic, community feel' },
  { value: 'launch',      label: 'Launch',            desc: 'Exciting, announcement energy' },
]

const OUTPUT_TYPES = [
  { value: 'image', label: 'Image', icon: '🖼️', cost: 5 },
  { value: 'video', label: 'Video', icon: '🎬', cost: 60 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModeCard({ active, onClick, icon, title, desc }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border p-4 text-left transition-all duration-200 ${
        active
          ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`font-semibold text-sm ${active ? 'text-violet-300' : 'text-white'}`}>{title}</div>
      <div className="text-xs text-white/50 mt-1 leading-relaxed">{desc}</div>
    </button>
  )
}

function PillSelector({ options, value, onChange, multi = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isActive = multi ? value?.includes(opt.value) : value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => {
              if (multi) {
                onChange(
                  isActive
                    ? (value || []).filter(v => v !== opt.value)
                    : [...(value || []), opt.value]
                )
              } else {
                onChange(opt.value)
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
              isActive
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white/80'
            }`}
          >
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function Label({ children, hint }) {
  return (
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-sm font-semibold text-white/80">{children}</span>
      {hint && <span className="text-xs text-white/35">{hint}</span>}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <Label hint={hint}>{label}</Label>
      {children}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdCreativeStudio({ onGenerate, identity, isGenerating, credits }) {
  // Mode: product_ad | personal_brand_ad
  const [adMode, setAdMode] = useState('product_ad')
  const [outputType, setOutputType] = useState('image')

  // Product ad state
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [adStyle, setAdStyle] = useState('lifestyle')
  const [targetMood, setTargetMood] = useState('')
  const [platform, setPlatform] = useState('instagram')

  // Personal brand state
  const [creatorNiche, setCreatorNiche] = useState('lifestyle')
  const [adGoal, setAdGoal] = useState('awareness')
  const [visualStyle, setVisualStyle] = useState('')
  const [extraContext, setExtraContext] = useState('')

  const cost = outputType === 'video' ? 60 : 5
  const hasEnoughCredits = credits >= cost
  const hasIdentity = !!identity?.image

  function handleGenerate() {
    if (!hasEnoughCredits) return

    const adConfig =
      adMode === 'product_ad'
        ? { productName, productDescription, adStyle, targetMood, platform }
        : { creatorNiche, adGoal, visualStyle, platform, extraContext }

    const promptContext =
      adMode === 'product_ad'
        ? `${adStyle} ad for ${productName || 'the product'}. ${productDescription}`
        : `${creatorNiche} creator ${adGoal} campaign. ${visualStyle}`

    onGenerate({
      prompt: promptContext,
      mode: adMode,
      outputType,
      adConfig,
      // Pass identity through if available — used for personal brand ads
      ...(adMode === 'personal_brand_ad' && identity ? { identity } : {}),
    })
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-white">Ad Creative Studio</h2>
        <p className="text-sm text-white/40 mt-1">
          Generate scroll-stopping ad content — product or personal brand.
        </p>
      </div>

      {/* ── Ad mode selector ─────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <ModeCard
          active={adMode === 'product_ad'}
          onClick={() => setAdMode('product_ad')}
          icon="📦"
          title="Product Ad"
          desc="Ecommerce, dropshipping, or brand product campaigns"
        />
        <ModeCard
          active={adMode === 'personal_brand_ad'}
          onClick={() => setAdMode('personal_brand_ad')}
          icon="⭐"
          title="Personal Brand"
          desc="Influencer, creator, or personal brand campaigns"
        />
      </div>

      {/* ── Output type ──────────────────────────────────────────────────────── */}
      <Field label="Output" hint="Image = 5 credits · Video = 60 credits">
        <div className="flex gap-3">
          {OUTPUT_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => setOutputType(t.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                outputType === t.value
                  ? 'border-violet-500 bg-violet-500/15 text-violet-300'
                  : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
              <span className={`text-xs ${outputType === t.value ? 'text-violet-400' : 'text-white/30'}`}>
                {t.cost}cr
              </span>
            </button>
          ))}
        </div>
      </Field>

      <div className="h-px bg-white/8" />

      {/* ── PRODUCT AD FORM ───────────────────────────────────────────────────── */}
      {adMode === 'product_ad' && (
        <div className="flex flex-col gap-5">

          <Field label="Product name" hint="required">
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. Lumina Face Serum"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors"
            />
          </Field>

          <Field label="Product description" hint="optional but recommended">
            <textarea
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
              placeholder="What does it do, who is it for, what makes it special?"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
            />
          </Field>

          <Field label="Visual style">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {AD_STYLES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setAdStyle(s.value)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    adStyle === s.value
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/8 bg-white/4 hover:border-white/20'
                  }`}
                >
                  <div className="text-lg mb-1">{s.icon}</div>
                  <div className={`text-xs font-semibold ${adStyle === s.value ? 'text-violet-300' : 'text-white/80'}`}>
                    {s.label}
                  </div>
                  <div className="text-xs text-white/35 mt-0.5 leading-tight">{s.desc}</div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Platform">
            <PillSelector options={PLATFORMS} value={platform} onChange={setPlatform} />
          </Field>

          <Field label="Target mood" hint="optional">
            <input
              type="text"
              value={targetMood}
              onChange={e => setTargetMood(e.target.value)}
              placeholder="e.g. premium, clean, aspirational, edgy, warm..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors"
            />
          </Field>
        </div>
      )}

      {/* ── PERSONAL BRAND AD FORM ────────────────────────────────────────────── */}
      {adMode === 'personal_brand_ad' && (
        <div className="flex flex-col gap-5">

          {/* Identity warning */}
          {!hasIdentity && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/8 px-4 py-3">
              <span className="text-amber-400 mt-0.5">⚠️</span>
              <div>
                <div className="text-sm font-semibold text-amber-300">No identity uploaded</div>
                <div className="text-xs text-amber-400/70 mt-0.5">
                  Upload your identity image first to generate ads with your likeness preserved.
                </div>
              </div>
            </div>
          )}

          {hasIdentity && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-3">
              <span className="text-emerald-400">✓</span>
              <div className="text-sm text-emerald-300 font-medium">
                Identity active — your likeness will be preserved in this ad
              </div>
            </div>
          )}

          <Field label="Creator niche">
            <div className="grid grid-cols-3 gap-2">
              {CREATOR_NICHES.map(n => (
                <button
                  key={n.value}
                  onClick={() => setCreatorNiche(n.value)}
                  className={`rounded-lg border p-3 text-center transition-all ${
                    creatorNiche === n.value
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/8 bg-white/4 hover:border-white/20'
                  }`}
                >
                  <div className="text-xl mb-1">{n.icon}</div>
                  <div className={`text-xs font-semibold ${creatorNiche === n.value ? 'text-violet-300' : 'text-white/70'}`}>
                    {n.label}
                  </div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Campaign goal">
            <div className="flex flex-col gap-2">
              {AD_GOALS.map(g => (
                <button
                  key={g.value}
                  onClick={() => setAdGoal(g.value)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                    adGoal === g.value
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/8 bg-white/4 hover:border-white/20'
                  }`}
                >
                  <span className={`text-sm font-semibold ${adGoal === g.value ? 'text-violet-300' : 'text-white/80'}`}>
                    {g.label}
                  </span>
                  <span className="text-xs text-white/35">{g.desc}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Platform">
            <PillSelector options={PLATFORMS} value={platform} onChange={setPlatform} />
          </Field>

          <Field label="Visual style notes" hint="optional">
            <input
              type="text"
              value={visualStyle}
              onChange={e => setVisualStyle(e.target.value)}
              placeholder="e.g. dark moody aesthetic, bright airy, bold colours..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors"
            />
          </Field>

          <Field label="Extra context" hint="optional">
            <textarea
              value={extraContext}
              onChange={e => setExtraContext(e.target.value)}
              placeholder="Anything else? Product being promoted, specific message, brand colours..."
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
            />
          </Field>
        </div>
      )}

      <div className="h-px bg-white/8" />

      {/* ── Generate button ───────────────────────────────────────────────────── */}
      <div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !hasEnoughCredits || (adMode === 'product_ad' && !productName.trim())}
          className={`w-full rounded-xl py-4 px-6 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3 ${
            isGenerating || !hasEnoughCredits || (adMode === 'product_ad' && !productName.trim())
              ? 'bg-white/8 border border-white/10 text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 active:scale-[0.98]'
          }`}
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating ad creative...
            </>
          ) : (
            <>
              <span>{outputType === 'video' ? '🎬' : '🖼️'}</span>
              Generate {outputType === 'video' ? 'Video Ad' : 'Image Ad'}
              <span className="ml-auto text-xs opacity-60">{cost} credits</span>
            </>
          )}
        </button>

        {!hasEnoughCredits && (
          <p className="text-center text-xs text-red-400/80 mt-2">
            Not enough credits — need {cost}, have {credits}
          </p>
        )}
      </div>

    </div>
  )
}