'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const C = {
  void:     '#040404',
  base:     '#0a0a0a',
  raised:   '#0d0d0d',
  surface:  '#111111',
  hairline: '#1a1a1a',
  subtle:   '#222222',
  primary:  '#e8e4dc',
  secondary:'#8a8680',
  muted:    '#4a4845',
  gold:     '#c8a84b',
  goldDim:  '#7a6428',
  goldGlow: '#c8a84b22',
  green:    '#4a9a6a',
  greenDim: '#1a3a2a',
  blue:     '#4a8ab4',
  red:      '#cf6a6a',
}

const STAGE_COLORS = ['#4a5a8a','#4a7a8a','#6a7a4a','#4a7a6a','#6a5a8a','#7a6a4a','#c8843a','#c8a84b','#8a4a4a','#6a4a7a']

export default function ReviewPage() {
  const params   = useParams()
  const token    = params.token

  const [share,     setShare]     = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [notFound,  setNotFound]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [clientName,    setClientName]    = useState('')
  const [comment,       setComment]       = useState('')
  const [action,        setAction]        = useState(null) // 'approve' | 'request_changes'

  useEffect(() => {
    if (!token) return
    fetch(`/api/get-share?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.status === 'success') setShare(d.share)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [token])

  const submitReview = async () => {
    if (!action) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/get-share?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, comment, clientName }),
      })
      const d = await res.json()
      if (d.status === 'success') setSubmitted(true)
    } catch {}
    finally { setSubmitting(false) }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 12, color: C.gold }}>Loading campaign…</div>
    </div>
  )

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 24 }}>🔍</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>Campaign not found</div>
      <div style={{ fontSize: 12, color: C.secondary }}>This link may have expired or been removed.</div>
    </div>
  )

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 40 }}>{action === 'approve' ? '✅' : '📝'}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>
        {action === 'approve' ? 'Campaign Approved!' : 'Revision Request Sent'}
      </div>
      <div style={{ fontSize: 13, color: C.secondary, maxWidth: 340, lineHeight: 1.6 }}>
        {action === 'approve'
          ? 'Your approval has been recorded. The agency will be notified and proceed to production.'
          : 'Your feedback has been sent. The agency will review and send you an updated version.'}
      </div>
    </div>
  )

  const outputs  = share?.outputs  || {}
  const adconfig = share?.adconfig || {}
  const angles   = outputs.angles   || []
  const hooks    = outputs.hooks_pain?.hooks || outputs.hooks_desire?.hooks || outputs.hooks_luxury?.hooks || []
  const captions = outputs.captions || []
  const campaign = outputs.campaign || []
  const music    = adconfig.lockedMusic || adconfig.adMusicTrack || null
  const selectedAngle = adconfig.selectedAngle || adconfig.lockedAngle || angles[0] || null
  const selectedHook  = adconfig.selectedHook  || adconfig.lockedHook  || hooks[0]  || null

  const isAlreadyActioned = share?.status !== 'pending'

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.hairline}`, background: C.base, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
            PROMPT CEO — Campaign Review
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>{share?.share_name || share?.product_name}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            {adconfig.platform && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{adconfig.platform}</span>}
            {adconfig.platformGoal && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{adconfig.platformGoal}</span>}
            {adconfig.brandVoice && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{adconfig.brandVoice}</span>}
          </div>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700,
          background: share?.status === 'approved' ? C.greenDim : share?.status === 'revision_requested' ? '#2a1010' : '#1a1408',
          border: `1px solid ${share?.status === 'approved' ? '#2a4a2a' : share?.status === 'revision_requested' ? '#3a1a1a' : C.goldDim}`,
          color: share?.status === 'approved' ? C.green : share?.status === 'revision_requested' ? C.red : C.gold,
        }}>
          {share?.status === 'approved' ? '✓ Approved' : share?.status === 'revision_requested' ? '↺ Revision Requested' : '● Awaiting Review'}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Campaign Direction */}
        {selectedAngle && (
          <Section title="Campaign Direction" icon="🎯">
            <div style={{ padding: '14px 16px', borderRadius: 6, background: C.goldGlow, border: `1px solid ${C.goldDim}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, marginBottom: 6 }}>{selectedAngle.title}</div>
              <div style={{ fontSize: 14, color: C.primary, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>"{selectedAngle.hook}"</div>
              {selectedAngle.adPromise && <div style={{ fontSize: 11, color: C.secondary }}>{selectedAngle.adPromise}</div>}
            </div>
          </Section>
        )}

        {/* Selected Hook */}
        {selectedHook && (
          <Section title="Opening Hook" icon="🪝">
            <div style={{ padding: '14px 16px', borderRadius: 6, background: C.raised, border: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 15, color: C.primary, lineHeight: 1.6 }}>{selectedHook}</div>
            </div>
          </Section>
        )}

        {/* Hook options */}
        {hooks.length > 1 && (
          <Section title="Hook Options" icon="📌" subtitle={`${hooks.length} options generated`}>
            {hooks.slice(0, 6).map((hook, i) => (
              <div key={i} style={{ padding: '10px 14px', borderRadius: 5, background: C.raised, border: `1px solid ${selectedHook === hook ? C.goldDim : C.hairline}` }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 9, color: C.muted, fontWeight: 700, minWidth: 16, paddingTop: 2 }}>{i + 1}</span>
                  <div style={{ fontSize: 13, color: C.primary, lineHeight: 1.55 }}>{hook}</div>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Captions */}
        {captions.length > 0 && (
          <Section title="Ad Captions" icon="✍️" subtitle={`${captions.length} caption styles`}>
            {captions.slice(0, 3).map((cap, i) => (
              <div key={i} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.raised, overflow: 'hidden' }}>
                <div style={{ padding: '8px 14px', background: C.surface, borderBottom: `1px solid ${C.hairline}` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>{cap.label || cap.type}</span>
                </div>
                <div style={{ padding: '12px 14px', fontSize: 13, color: C.primary, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
                  {cap.fullCaption || cap.hook}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Campaign Stages */}
        {campaign.length > 0 && (
          <Section title={`Campaign — ${campaign.length} Stages`} icon="📊">
            {campaign.map((stage, i) => {
              const color = STAGE_COLORS[i] || C.muted
              return (
                <div key={i} style={{ borderRadius: 5, border: `1px solid ${color}33`, background: C.raised, overflow: 'hidden' }}>
                  <div style={{ padding: '8px 14px', background: color + '18', borderBottom: `1px solid ${color}22`, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: color, fontFamily: 'monospace' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{stage.label}</span>
                  </div>
                  <div style={{ padding: '10px 14px' }}>
                    <div style={{ fontSize: 13, color: C.primary, fontStyle: 'italic', marginBottom: 6 }}>"{stage.hook}"</div>
                    <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.6 }}>{stage.caption}</div>
                    {stage.cta && <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: color }}>CTA: {stage.cta}</div>}
                  </div>
                </div>
              )
            })}
          </Section>
        )}

        {/* Music */}
        {music && (
          <Section title="Campaign Soundtrack" icon="🎵">
            <div style={{ padding: '14px 16px', borderRadius: 6, background: C.goldGlow, border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1a1408', border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎵</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>{music.title}</div>
                <div style={{ fontSize: 11, color: C.secondary, marginTop: 3 }}>
                  {[music.mood, music.energy && `${music.energy} energy`, music.bpm && `${music.bpm} BPM`].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Brand info */}
        {(adconfig.targetCustomer || adconfig.mainBenefit || adconfig.offer) && (
          <Section title="Campaign Brief" icon="📋">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Target Customer', value: adconfig.targetCustomer },
                { label: 'Main Benefit',    value: adconfig.mainBenefit    },
                { label: 'Offer',           value: adconfig.offer          },
                { label: 'Call to Action',  value: adconfig.callToAction   },
              ].filter(f => f.value).map((field, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRadius: 4, background: C.raised, border: `1px solid ${C.hairline}` }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>{field.label}</div>
                  <div style={{ fontSize: 12, color: C.primary }}>{field.value}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Previous feedback */}
        {share?.client_comment && (
          <Section title="Previous Feedback" icon="💬">
            <div style={{ padding: '12px 14px', borderRadius: 5, background: '#110806', border: '1px solid #2a1010', fontSize: 13, color: C.secondary, lineHeight: 1.6 }}>
              {share.client_comment}
            </div>
          </Section>
        )}

        {/* Approval section */}
        {!isAlreadyActioned ? (
          <div style={{ borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.raised, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', background: C.surface, borderBottom: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>Your Review</div>
              <div style={{ fontSize: 11, color: C.secondary, marginTop: 2 }}>Approve the campaign or request revisions with notes for the team.</div>
            </div>
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Your name (optional)"
                style={{ width: '100%', background: C.base, color: C.primary, border: `1px solid ${C.subtle}`, borderRadius: 4, padding: '9px 12px', fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Leave a comment, note, or revision request… (optional)"
                rows={4}
                style={{ width: '100%', background: C.base, color: C.primary, border: `1px solid ${C.subtle}`, borderRadius: 4, padding: '9px 12px', fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => { setAction('approve'); }}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                    border: `1px solid ${action === 'approve' ? C.green : '#2a4a2a'}`,
                    background: action === 'approve' ? C.greenDim : '#081208',
                    color: C.green, transition: 'all 0.15s',
                  }}
                >
                  ✓ Approve Campaign
                </button>
                <button
                  onClick={() => { setAction('request_changes'); }}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                    border: `1px solid ${action === 'request_changes' ? C.red : '#2a1010'}`,
                    background: action === 'request_changes' ? '#110606' : '#0a0404',
                    color: C.red, transition: 'all 0.15s',
                  }}
                >
                  ↺ Request Revisions
                </button>
              </div>
              {action && (
                <button
                  onClick={submitReview}
                  disabled={submitting}
                  style={{
                    width: '100%', padding: '12px 0', borderRadius: 5, fontSize: 13, fontWeight: 800, cursor: submitting ? 'not-allowed' : 'pointer',
                    border: `1px solid ${C.goldDim}`, background: 'linear-gradient(180deg,#1a1408,#0c0a04)', color: C.gold,
                    opacity: submitting ? 0.6 : 1,
                  }}
                >
                  {submitting ? '⟳ Submitting…' : `Submit ${action === 'approve' ? 'Approval' : 'Revision Request'}`}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: '16px 18px', borderRadius: 6, background: share?.status === 'approved' ? C.greenDim : '#110606', border: `1px solid ${share?.status === 'approved' ? '#2a4a2a' : '#2a1010'}`, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: share?.status === 'approved' ? C.green : C.red, marginBottom: 4 }}>
              {share?.status === 'approved' ? '✓ You approved this campaign' : '↺ You requested revisions'}
            </div>
            {share?.client_comment && <div style={{ fontSize: 11, color: C.secondary }}>{share.client_comment}</div>}
          </div>
        )}

        <div style={{ fontSize: 10, color: C.muted, textAlign: 'center', paddingTop: 8 }}>
          Powered by Prompt CEO · Creative AI Platform
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon, subtitle, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{title}</div>
          {subtitle && <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  )
}
