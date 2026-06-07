'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  surface:   '#111111', hairline: '#1a1a1a', subtle:   '#222222',
  primary:   '#e8e4dc', secondary:'#8a8680', muted:    '#4a4845',
  gold:      '#c8a84b', goldDim:  '#7a6428', goldGlow: '#c8a84b18',
  green:     '#4a9a6a', greenDim: '#1a3a2a', greenGlow:'#4a9a6a18',
  violet:    '#9b6fd4', violetDim:'#4a2a7a', violetGlow:'#9b6fd418',
  blue:      '#4a8ab4', blueDim:  '#1a3a5a', blueGlow: '#4a8ab418',
  red:       '#cf6a6a', redGlow:  '#cf6a6a18',
}

const TIER_COLORS = {
  free:       C.muted,
  creator:    C.blue,
  studio_pro: C.green,
  pro:        C.gold,
  agency:     C.violet,
  admin:      C.violet,
}

function AdminPanel() {
  const [stats,      setStats]      = useState(null)
  const [affiliates, setAffiliates] = useState([])
  const [members,    setMembers]    = useState([])
  const [memberTotal,setMemberTotal]= useState(0)
  const [breakdown,  setBreakdown]  = useState({})
  const [loading,    setLoading]    = useState(true)
  const [acting,     setActing]     = useState(null)
  const [tab,        setTab]        = useState('overview')
  const [memberFilter,  setMemberFilter]  = useState('all')
  const [memberSearch,  setMemberSearch]  = useState('')
  const [memberPage,    setMemberPage]    = useState(0)
  const [memberLoading, setMemberLoading] = useState(false)
  const [memberError,   setMemberError]   = useState(null)

  // Music upload state
  const [musicForm,     setMusicForm]     = useState({ title: '', artist: '', genre: 'Electronic', moods: [], energy: 'medium', duration: '', is_premium: false, featured: false, uploadType: 'full' })
  const [musicFile,     setMusicFile]     = useState(null)
  const [musicUploading,setMusicUploading]= useState(false)
  const [musicError,    setMusicError]    = useState(null)
  const [musicSuccess,  setMusicSuccess]  = useState(null)

  const [renderOps,        setRenderOps]        = useState(null)
  const [renderOpsLoading, setRenderOpsLoading] = useState(false)

  const loadData = () => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setStats(d.stats) })
      .finally(() => setLoading(false))
    fetch('/api/admin/affiliates')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setAffiliates(d.affiliates || []) })
  }

  const loadMembers = (filter = memberFilter, page = 0) => {
    setMemberLoading(true)
    setMemberError(null)
    fetch(`/api/admin/members?filter=${filter}&page=${page}`)
      .then(r => r.json())
      .then(d => {
        if (d.status === 'success') {
          setMembers(d.members || [])
          setMemberTotal(d.total || 0)
          setBreakdown(d.breakdown || {})
          setMemberPage(page)
        } else {
          setMemberError(d.error || 'Failed to load members')
        }
      })
      .catch(err => setMemberError(err.message))
      .finally(() => setMemberLoading(false))
  }

  useEffect(() => { loadData() }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (tab === 'members') loadMembers('all', 0) }, [tab])
  useEffect(() => {
    if (tab !== 'renders') return
    setRenderOpsLoading(true)
    Promise.all([
      fetch('/api/admin/render-health').then(r => r.json()),
      fetch('/api/admin/render-ops').then(r => r.json()),
    ])
      .then(([health, ops]) => setRenderOps({ health, ops }))
      .catch(() => {})
      .finally(() => setRenderOpsLoading(false))
  }, [tab])

  const handleAffiliate = async (id, action, extra = {}) => {
    setActing(id + action)
    try {
      const res  = await fetch('/api/admin/affiliates', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, ...extra }),
      })
      const data = await res.json()
      if (data.status === 'success') { loadData(); alert(data.message) }
      else alert(data.error || 'Error')
    } finally {
      setActing(null)
    }
  }

  if (loading) return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px', color: C.muted, fontSize: 12 }}>
      Loading admin stats…
    </div>
  )

  if (!stats) return null

  const TIER_LABELS  = { creator: 'Creator', studio_pro: 'Studio Pro', pro: 'Pro', agency: 'Agency' }
  const TIER_PRICES  = { creator: '$29', studio_pro: '$49', pro: '$79', agency: '$179' }
  const TIER_COLORS2 = { creator: C.blue, studio_pro: C.green, pro: C.gold, agency: C.violet }
  const pendingApps  = affiliates.filter(a => a.status === 'pending')

  const filteredMembers = memberSearch
    ? members.filter(m => m.email?.toLowerCase().includes(memberSearch.toLowerCase()))
    : members

  return (
    <div style={{ borderRadius: 10, border: `1px solid ${C.violetDim}`, background: C.violetGlow, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.violetDim}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: C.violet }}>⚡ Admin</span>
        {pendingApps.length > 0 && (
          <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: '#1a1408', border: `1px solid ${C.goldDim}`, color: C.gold }}>
            {pendingApps.length} application{pendingApps.length !== 1 ? 's' : ''} waiting
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.violetDim}` }}>
        {[
          { id: 'overview',   label: 'Overview' },
          { id: 'members',    label: `Members (${stats.totalUsers})` },
          { id: 'affiliates', label: `Affiliates${pendingApps.length > 0 ? ` ⚠ ${pendingApps.length}` : ` (${affiliates.length})`}` },
          { id: 'music',      label: 'Music Upload' },
          { id: 'renders',    label: 'Render Ops' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '10px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', background: 'none', color: tab === t.id ? C.violet : C.muted, borderBottom: tab === t.id ? `2px solid ${C.violet}` : '2px solid transparent', transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── OVERVIEW TAB ── */}
        {tab === 'overview' && (<>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
            {[
              { label: 'Total Members',  value: stats.totalUsers,   color: C.primary },
              { label: 'Paying',         value: stats.totalActive,  color: C.green   },
              { label: 'Free',           value: stats.totalUsers - stats.totalActive, color: C.muted },
              { label: 'MRR',            value: `$${stats.monthlyRevenue.toLocaleString()}`, color: C.gold },
            ].map(m => (
              <div key={m.label} style={{ padding: '14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: m.color, letterSpacing: -1 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>By Plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {Object.entries(stats.tiers).map(([tier, count]) => (
                <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 7px', borderRadius: 999, background: (TIER_COLORS2[tier] || C.muted) + '22', border: `1px solid ${(TIER_COLORS2[tier] || C.muted)}44`, color: TIER_COLORS2[tier] || C.muted }}>{TIER_LABELS[tier]}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>{TIER_PRICES[tier]}/mo</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: count > 0 ? C.primary : C.muted, marginLeft: 'auto' }}>{count}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>${(count * parseInt(TIER_PRICES[tier]?.replace('$','') || 0)).toLocaleString()}/mo</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Affiliates</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Pending',     value: stats.affiliates.pending, color: C.gold  },
                { label: 'Active',      value: stats.affiliates.active,  color: C.green },
                { label: 'Commissions', value: `$${stats.affiliates.totalCommissions}`, color: C.primary },
                { label: 'Paid Out',    value: `$${stats.affiliates.paidCommissions}`,  color: C.muted   },
              ].map(m => (
                <div key={m.label} style={{ padding: '10px 12px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Recent Signups</div>
            <div style={{ borderRadius: 8, border: `1px solid ${C.hairline}`, overflow: 'hidden' }}>
              {(stats.recentUsers || []).map((u, i) => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', background: i % 2 === 0 ? C.base : C.void }}>
                  <span style={{ fontSize: 12, color: C.secondary }}>{u.email}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {u.subscription_status === 'active'
                      ? <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: C.greenGlow, border: `1px solid ${C.greenDim}`, color: C.green }}>{u.subscription_tier}</span>
                      : <span style={{ fontSize: 9, color: C.muted }}>free</span>
                    }
                    <span style={{ fontSize: 10, color: C.muted }}>{new Date(u.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {/* ── MEMBERS TAB ── */}
        {tab === 'members' && (<>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input value={memberSearch} onChange={e => setMemberSearch(e.target.value)} placeholder="Search email…"
              style={{ flex: 1, minWidth: 180, padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.surface, color: C.primary, fontSize: 12, outline: 'none', fontFamily: 'inherit' }} />
            {['all','free','paying','creator','pro','agency'].map(f => (
              <button key={f} onClick={() => { setMemberFilter(f); loadMembers(f, 0) }}
                style={{ padding: '7px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${memberFilter === f ? C.violet : C.hairline}`, background: memberFilter === f ? C.violetGlow : 'none', color: memberFilter === f ? C.violet : C.muted }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {memberError && (
            <div style={{ padding: '12px 14px', borderRadius: 8, background: C.redGlow, border: `1px solid #7a3030`, color: C.red, fontSize: 12 }}>
              Error: {memberError}
              <button onClick={() => loadMembers(memberFilter, 0)} style={{ marginLeft: 12, background: 'none', border: `1px solid ${C.red}`, color: C.red, padding: '3px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }}>Retry</button>
            </div>
          )}
          {memberLoading ? (
            <div style={{ textAlign: 'center', padding: '24px', color: C.muted, fontSize: 12 }}>Loading members…</div>
          ) : members.length === 0 && !memberError ? (
            <div style={{ textAlign: 'center', padding: '24px', color: C.muted, fontSize: 13 }}>
              <button onClick={() => loadMembers(memberFilter, 0)} style={{ background: C.violetGlow, border: `1px solid ${C.violetDim}`, color: C.violet, padding: '8px 20px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Load Members</button>
            </div>
          ) : (
            <>
              <div style={{ borderRadius: 8, border: `1px solid ${C.hairline}`, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 90px 120px', padding: '8px 14px', background: C.deep, borderBottom: `1px solid ${C.hairline}` }}>
                  {['Email', 'Plan', 'Status', 'Joined', 'Referred By'].map(h => (
                    <div key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.muted }}>{h}</div>
                  ))}
                </div>
                {filteredMembers.map((m, i) => (
                  <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 90px 120px', padding: '10px 14px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', background: i % 2 === 0 ? C.base : C.void, alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: C.secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.email}</div>
                    <div>
                      {m.subscription_status === 'active'
                        ? <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: (TIER_COLORS2[m.subscription_tier] || C.gold) + '22', border: `1px solid ${(TIER_COLORS2[m.subscription_tier] || C.gold)}44`, color: TIER_COLORS2[m.subscription_tier] || C.gold }}>{TIER_LABELS[m.subscription_tier] || m.subscription_tier}</span>
                        : <span style={{ fontSize: 9, color: C.muted }}>Free</span>
                      }
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: m.subscription_status === 'active' ? C.green : C.muted }}>{m.subscription_status === 'active' ? 'Paying' : 'Free'}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{new Date(m.created_at).toLocaleDateString()}</div>
                    <div style={{ fontSize: 10, color: m.referred_by_name ? C.gold : C.muted }}>{m.referred_by_name || '—'}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: C.muted }}>
                <span>Showing {filteredMembers.length} of {memberTotal}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {memberPage > 0 && <button onClick={() => loadMembers(memberFilter, memberPage - 1)} style={{ background: 'none', border: `1px solid ${C.hairline}`, color: C.secondary, padding: '4px 12px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }}>← Prev</button>}
                  {members.length === 50 && <button onClick={() => loadMembers(memberFilter, memberPage + 1)} style={{ background: 'none', border: `1px solid ${C.hairline}`, color: C.secondary, padding: '4px 12px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }}>Next →</button>}
                </div>
              </div>
            </>
          )}
        </>)}

        {/* ── AFFILIATES TAB ── */}
        {tab === 'affiliates' && (<>
          {pendingApps.length > 0 && (
            <div style={{ padding: '12px 14px', borderRadius: 8, background: '#0f0d04', border: `1px solid ${C.goldDim}`, fontSize: 12, color: C.gold, fontWeight: 600 }}>
              ⚠ {pendingApps.length} application{pendingApps.length !== 1 ? 's' : ''} waiting for your approval
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {affiliates.map(a => {
              const isApproved = a.status === 'approved' || a.status === 'active'
              const pendingPay = Number(a.total_earned || 0) - Number(a.total_paid || 0)
              return (
                <div key={a.id} style={{ borderRadius: 8, border: `1px solid ${a.status === 'pending' ? C.goldDim : C.hairline}`, background: a.status === 'pending' ? '#0f0d04' : C.base, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{a.full_name}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                          background: a.status === 'pending' ? '#1a1408' : isApproved ? C.greenGlow : C.surface,
                          border: `1px solid ${a.status === 'pending' ? C.goldDim : isApproved ? C.greenDim : C.hairline}`,
                          color: a.status === 'pending' ? C.gold : isApproved ? C.green : C.muted }}>
                          {a.status}
                        </span>
                        {a.tier && isApproved && <span style={{ fontSize: 9, color: C.violet }}>{a.tier} · {a.commission_percent}%</span>}
                      </div>
                      <div style={{ fontSize: 12, color: C.secondary }}>{a.email}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{a.platform}{a.audience_size ? ` · ${a.audience_size}` : ''}</div>
                      {a.message && <div style={{ fontSize: 11, color: C.muted, marginTop: 5, fontStyle: 'italic', lineHeight: 1.5 }}>"{a.message.slice(0, 120)}{a.message.length > 120 ? '…' : ''}"</div>}
                      {isApproved && (
                        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 11 }}>
                          <span style={{ color: C.muted }}>{a.total_clicks || 0} clicks</span>
                          <span style={{ color: C.muted }}>{a.total_signups || 0} signups</span>
                          <span style={{ color: C.muted }}>{a.total_active || 0} active subs</span>
                          <span style={{ color: C.green, fontWeight: 700 }}>${Number(a.total_earned || 0).toFixed(2)} earned</span>
                          {pendingPay > 0 && <span style={{ color: C.gold, fontWeight: 700 }}>${pendingPay.toFixed(2)} to pay</span>}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                      {a.status === 'pending' && (<>
                        <button onClick={() => handleAffiliate(a.id, 'approve')} disabled={!!acting}
                          style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green, opacity: acting ? 0.6 : 1 }}>
                          {acting === a.id + 'approve' ? '…' : '✓ Approve'}
                        </button>
                        <button onClick={() => handleAffiliate(a.id, 'reject')} disabled={!!acting}
                          style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.muted, opacity: acting ? 0.6 : 1 }}>
                          {acting === a.id + 'reject' ? '…' : 'Reject'}
                        </button>
                      </>)}
                      {isApproved && pendingPay > 0 && (
                        <button onClick={() => { if (window.confirm(`Mark $${pendingPay.toFixed(2)} as paid to ${a.full_name}?`)) handleAffiliate(a.id, 'mark_paid') }} disabled={!!acting}
                          style={{ padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold, opacity: acting ? 0.6 : 1 }}>
                          {acting === a.id + 'mark_paid' ? '…' : `💳 Mark Paid $${pendingPay.toFixed(2)}`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {affiliates.length === 0 && <div style={{ fontSize: 12, color: C.muted, padding: '8px 0', textAlign: 'center' }}>No affiliate applications yet.</div>}
          </div>
        </>)}

        {/* ── MUSIC UPLOAD TAB ── */}
        {tab === 'music' && (() => {
          const GENRES = ['Electronic','Hip-Hop','Cinematic','Pop','R&B','Ambient','Dance','Latin','Trap','House','Soul','Jazz']
          const MOODS  = ['euphoric','sensual','dark','uplifting','mysterious','romantic','energetic','chill','intense','playful','melancholic','powerful']

          const handleMusicSubmit = async (e) => {
            e.preventDefault()
            if (!musicFile) { setMusicError('Please select an audio file'); return }
            if (!musicForm.title || !musicForm.artist) { setMusicError('Title and artist are required'); return }
            setMusicUploading(true)
            setMusicError(null)
            setMusicSuccess(null)
            try {
              // Step 1: get signed upload URL from server
              const presignRes = await fetch('/api/admin/music-presign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: musicFile.name, contentType: musicFile.type, title: musicForm.title, bucket: musicForm.uploadType === 'preview' ? 'music-previews' : 'music-full' }),
              })
              const presign = await presignRes.json()
              if (!presignRes.ok) throw new Error(presign.error || 'Failed to get upload URL')

              // Step 2: upload file directly from browser to Supabase Storage (bypasses Next.js)
              const uploadRes = await fetch(presign.signedUrl, {
                method: 'PUT',
                headers: { 'Content-Type': musicFile.type || 'audio/mpeg' },
                body: musicFile,
              })
              if (!uploadRes.ok) throw new Error(`Storage upload failed: ${uploadRes.status}`)

              // Step 3: save metadata row
              const metaRes = await fetch('/api/admin/upload-music', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title:            musicForm.title,
                  artist:           musicForm.artist,
                  genre:            musicForm.genre,
                  mood:             musicForm.moods.join(','),
                  energy:           musicForm.energy,
                  duration:         musicForm.duration,
                  is_premium:       musicForm.is_premium,
                  featured:         musicForm.featured,
                  upload_type:      musicForm.uploadType,
                  file_url:         presign.publicUrl,
                }),
              })
              const meta = await metaRes.json()
              if (meta.status === 'success') {
                setMusicSuccess(`"${meta.track.title}" uploaded successfully`)
                setMusicForm({ title: '', artist: '', genre: 'Electronic', moods: [], energy: 'medium', duration: '', is_premium: false, featured: false, uploadType: 'full' })
                setMusicFile(null)
                e.target.reset()
              } else {
                throw new Error(meta.error || 'Failed to save track')
              }
            } catch (err) {
              setMusicError(err.message)
            } finally {
              setMusicUploading(false)
            }
          }

          const field = (label, key, type = 'text', extra = {}) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>{label}</label>
              <input type={type} value={musicForm[key]} onChange={e => setMusicForm(f => ({ ...f, [key]: type === 'number' ? e.target.value : e.target.value }))}
                style={{ padding: '8px 10px', borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.surface, color: C.primary, fontSize: 12, outline: 'none' }}
                {...extra} />
            </div>
          )

          const select = (label, key, options) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>{label}</label>
              <select value={musicForm[key]} onChange={e => setMusicForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ padding: '8px 10px', borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.surface, color: C.primary, fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )

          const isPreview = musicForm.uploadType === 'preview'

          return (
            <form onSubmit={handleMusicSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Upload Music Track</div>

              {/* Full / Preview toggle */}
              <div style={{ display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.hairline}`, alignSelf: 'flex-start' }}>
                {[['full', 'Full Track'], ['preview', 'Preview Clip']].map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setMusicForm(f => ({ ...f, uploadType: val }))}
                    style={{ padding: '7px 18px', fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                      background: musicForm.uploadType === val ? C.violet : C.surface,
                      color: musicForm.uploadType === val ? '#fff' : C.muted }}>
                    {label}
                  </button>
                ))}
              </div>
              {isPreview && <div style={{ fontSize: 11, color: C.gold, background: '#1a1408', border: `1px solid ${C.goldDim}`, borderRadius: 5, padding: '8px 12px' }}>
                Preview mode — only Title is needed to match the existing track. File goes to public bucket.
              </div>}

              {/* File picker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>AUDIO FILE (MP3 / WAV)</label>
                <input type="file" accept="audio/*"
                  onChange={e => setMusicFile(e.target.files?.[0] || null)}
                  style={{ padding: '8px 10px', borderRadius: 5, border: `1px solid ${musicFile ? C.greenDim : C.hairline}`, background: C.surface, color: C.primary, fontSize: 12, cursor: 'pointer' }} />
                {musicFile && <span style={{ fontSize: 11, color: C.green }}>{musicFile.name} ({(musicFile.size / 1024 / 1024).toFixed(1)} MB)</span>}
              </div>

              {/* Row: title + artist */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {field('TITLE', 'title', 'text', { placeholder: 'Song title', required: true })}
                {field('ARTIST', 'artist', 'text', { placeholder: 'Artist name', required: true })}
              </div>

              {!isPreview && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {select('GENRE', 'genre', GENRES)}
              </div>}

              {/* Mood tag picker */}
              {!isPreview && <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.secondary }}>MOOD <span style={{ fontWeight: 400, color: C.muted }}>(pick all that apply)</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {MOODS.map(m => {
                    const active = musicForm.moods.includes(m)
                    return (
                      <button key={m} type="button"
                        onClick={() => setMusicForm(f => ({ ...f, moods: active ? f.moods.filter(x => x !== m) : [...f.moods, m] }))}
                        style={{ padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: `1px solid ${active ? C.violet : C.hairline}`, background: active ? C.violetGlow : 'transparent', color: active ? C.violet : C.muted, transition: 'all 0.12s' }}>
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>}

              {!isPreview && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {select('ENERGY', 'energy', ['low', 'medium', 'high'])}
                {field('DURATION (seconds)', 'duration', 'number', { placeholder: '187', min: 0 })}
              </div>}

              {!isPreview && <div style={{ display: 'flex', gap: 20 }}>
                {[['is_premium', 'Premium only'], ['featured', 'Featured']].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: C.secondary, cursor: 'pointer' }}>
                    <input type="checkbox" checked={musicForm[key]} onChange={e => setMusicForm(f => ({ ...f, [key]: e.target.checked }))}
                      style={{ width: 14, height: 14, cursor: 'pointer', accentColor: C.violet }} />
                    {label}
                  </label>
                ))}
              </div>}

              {musicError   && <div style={{ padding: '10px 12px', borderRadius: 6, background: C.redGlow,   border: `1px solid #7a2a2a`, fontSize: 12, color: C.red   }}>{musicError}</div>}
              {musicSuccess && <div style={{ padding: '10px 12px', borderRadius: 6, background: C.greenGlow, border: `1px solid ${C.greenDim}`, fontSize: 12, color: C.green }}>{musicSuccess}</div>}

              <button type="submit" disabled={musicUploading}
                style={{ padding: '10px 24px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: musicUploading ? 'default' : 'pointer', border: 'none', background: musicUploading ? C.muted : C.violet, color: '#fff', opacity: musicUploading ? 0.7 : 1, alignSelf: 'flex-start' }}>
                {musicUploading ? 'Uploading…' : 'Upload Track'}
              </button>
            </form>
          )
        })()}

        {/* ── RENDERS TAB ── */}
        {tab === 'renders' && (() => {
          if (renderOpsLoading) return <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>Loading render ops…</div>
          if (!renderOps) return <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>No data</div>

          const { health, ops } = renderOps
          const statusColor = health?.status === 'healthy' ? C.green : health?.status === 'idle' ? C.muted : health?.status === 'warning' ? C.gold : '#c45a5a'

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Health banner */}
              <div style={{ padding: '14px 18px', borderRadius: 10, border: `1px solid ${statusColor}44`, background: statusColor + '10' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: statusColor, textTransform: 'capitalize' }}>{health?.status || '—'}</div>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{health?.statusMessage}</div>
                {health?.lastSuccess && (
                  <div style={{ fontSize: 11, color: C.ghost, marginTop: 6 }}>
                    Last success: {health.lastSuccess.minutesAgo != null ? `${health.lastSuccess.minutesAgo}m ago` : new Date(health.lastSuccess.at).toLocaleTimeString()}
                  </div>
                )}
                {health?.lastFailure && (
                  <div style={{ fontSize: 11, color: '#c45a5a', marginTop: 4 }}>
                    Last failure: {new Date(health.lastFailure.at).toLocaleTimeString()} — {health.lastFailure.message?.slice(0, 80)}
                  </div>
                )}
              </div>

              {/* Queue metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { label: 'Queued',     value: health?.queueSize      || 0, color: C.gold  },
                  { label: 'Processing', value: health?.activeJobs     || 0, color: C.blue  },
                  { label: 'Completed',  value: ops?.counts?.completed || 0, color: C.green },
                  { label: 'Failed',     value: ops?.counts?.failed    || 0, color: '#c45a5a' },
                ].map(m => (
                  <div key={m.label} style={{ padding: '12px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Avg render time */}
              {ops?.avgRenderSeconds != null && (
                <div style={{ fontSize: 12, color: C.muted }}>
                  Average render duration: <strong style={{ color: C.primary }}>{ops.avgRenderSeconds}s</strong>
                </div>
              )}

              {/* Recent failures */}
              {ops?.recentFailures?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Recent Failures</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {ops.recentFailures.map(f => (
                      <div key={f.id} style={{ padding: '10px 12px', borderRadius: 7, border: `1px solid #c45a5a33`, background: '#c45a5a08' }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>{f.id?.slice(0, 12)}…</span>
                          <span style={{ fontSize: 10, color: C.muted }}>{f.platform || '—'}</span>
                          {f.retries > 0 && <span style={{ fontSize: 10, color: C.gold }}>retry {f.retries}</span>}
                          <span style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto' }}>{new Date(f.failedAt).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#c45a5a' }}>{f.error?.slice(0, 120)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent jobs */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Recent Jobs</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {(ops?.recentJobs || []).map(j => {
                    const statusClr = j.status === 'completed' ? C.green : j.status === 'failed' ? '#c45a5a' : j.status === 'processing' ? C.blue : C.gold
                    return (
                      <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.hairline}`, background: C.base }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusClr, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace', flexShrink: 0 }}>{j.id?.slice(0, 8)}…</span>
                        <span style={{ fontSize: 10, color: C.muted }}>{j.platform || '—'}</span>
                        <span style={{ fontSize: 10, color: statusClr, textTransform: 'uppercase', letterSpacing: 0.5 }}>{j.status}</span>
                        {j.stage && <span style={{ fontSize: 10, color: C.ghost }}>@ {j.stage}</span>}
                        <span style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto' }}>{new Date(j.createdAt).toLocaleTimeString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Refresh button */}
              <button onClick={() => {
                setRenderOpsLoading(true)
                Promise.all([fetch('/api/admin/render-health').then(r=>r.json()), fetch('/api/admin/render-ops').then(r=>r.json())])
                  .then(([h,o])=>setRenderOps({health:h,ops:o}))
                  .catch(()=>{})
                  .finally(()=>setRenderOpsLoading(false))
              }}
                style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.secondary, alignSelf: 'flex-start' }}>
                ↺ Refresh
              </button>
            </div>
          )
        })()}

      </div>
    </div>
  )
}

function AffiliateLink({ router, email }) {
  const [affiliate, setAffiliate] = useState(null)

  useEffect(() => {
    fetch('/api/affiliate/dashboard')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setAffiliate(d.affiliate) })
      .catch(() => {})
  }, [])

  if (!affiliate) return null

  const isApproved = affiliate.affiliateStatus === 'approved' || affiliate.affiliateStatus === 'active'

  return (
    <div style={{
      borderRadius: 10,
      border: `1px solid ${isApproved ? C.goldDim : C.hairline}`,
      background: isApproved ? C.goldGlow : C.surface,
      padding: '20px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: isApproved ? C.gold : C.secondary, marginBottom: 4 }}>
          💰 {isApproved ? 'Partner Program' : 'Application Pending'}
        </div>
        <div style={{ fontSize: 12, color: C.secondary }}>
          {isApproved
            ? `Your referral link is active — ${affiliate.commissionRate}% commission on every subscriber`
            : 'Your application is under review. You will hear back within 48 hours.'}
        </div>
      </div>
      {isApproved && (
        <button
          onClick={() => router.push('/affiliate/dashboard')}
          style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', whiteSpace: 'nowrap' }}
        >
          View Dashboard →
        </button>
      )}
    </div>
  )
}

function ApiKeyRow({ label, logo, endpoint, helpUrl, helpLabel }) {
  const [status,  setStatus]  = useState('loading') // loading | connected | disconnected
  const [masked,  setMasked]  = useState('')
  const [input,   setInput]   = useState('')
  const [saving,  setSaving]  = useState(false)
  const [removing,setRemoving]= useState(false)
  const [error,   setError]   = useState('')
  const [show,    setShow]    = useState(false)

  useEffect(() => {
    fetch(endpoint)
      .then(r => r.json())
      .then(d => {
        if (d.hasKey) { setStatus('connected'); setMasked(d.masked) }
        else setStatus('disconnected')
      })
      .catch(() => setStatus('disconnected'))
  }, [endpoint])

  const handleSave = async () => {
    if (!input.trim()) return
    setSaving(true); setError('')
    try {
      const res  = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: input.trim() }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setStatus('connected'); setMasked(data.masked); setInput(''); setShow(false)
      } else {
        setError(data.message || 'Failed to save key')
      }
    } catch { setError('Network error') }
    finally { setSaving(false) }
  }

  const handleRemove = async () => {
    setRemoving(true); setError('')
    try {
      await fetch(endpoint, { method: 'DELETE' })
      setStatus('disconnected'); setMasked(''); setInput('')
    } catch { setError('Network error') }
    finally { setRemoving(false) }
  }

  const isConnected = status === 'connected'

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'16px 0', borderBottom:`1px solid ${C.hairline}` }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:13, fontWeight:700, color:C.primary }}>{label}</span>
          {status === 'loading' && <span style={{ fontSize:11, color:C.muted }}>Checking…</span>}
          {isConnected && (
            <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:999, background:C.greenGlow, border:`1px solid ${C.greenDim}`, color:C.green }}>
              Connected
            </span>
          )}
          {status === 'disconnected' && (
            <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:999, background:'#180808', border:`1px solid #5a2020`, color:'#c07070' }}>
              Not connected
            </span>
          )}
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {helpUrl && (
            <a href={helpUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:11, color:C.muted, textDecoration:'underline' }}>
              {helpLabel || 'Get API key →'}
            </a>
          )}
          {isConnected ? (
            <button onClick={handleRemove} disabled={removing}
              style={{ padding:'5px 12px', borderRadius:5, fontSize:11, fontWeight:700, cursor:'pointer', border:`1px solid ${C.hairline}`, background:'none', color:C.muted }}>
              {removing ? '…' : 'Remove'}
            </button>
          ) : (
            <button onClick={() => setShow(s => !s)}
              style={{ padding:'5px 12px', borderRadius:5, fontSize:11, fontWeight:700, cursor:'pointer', border:`1px solid ${C.gold}`, background:C.goldGlow, color:C.gold }}>
              {show ? 'Cancel' : 'Connect'}
            </button>
          )}
        </div>
      </div>

      {isConnected && masked && (
        <div style={{ fontSize:11, color:C.muted, fontFamily:'monospace' }}>{masked}</div>
      )}

      {show && !isConnected && (
        <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          <input
            type="password" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            placeholder="Paste your API key here"
            style={{ flex:1, minWidth:220, padding:'8px 12px', borderRadius:6, border:`1px solid ${C.hairline}`, background:C.deep, color:C.primary, fontSize:13, fontFamily:'monospace', outline:'none' }}
          />
          <button onClick={handleSave} disabled={saving || !input.trim()}
            style={{ padding:'8px 16px', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', border:'none', background:saving ? C.muted : C.gold, color:'#000', opacity: !input.trim() ? 0.5 : 1 }}>
            {saving ? 'Validating…' : 'Save'}
          </button>
        </div>
      )}

      {error && <div style={{ fontSize:12, color:'#c07070' }}>{error}</div>}
    </div>
  )
}

function ApiIntegrations() {
  return (
    <div style={{ borderRadius:10, border:`1px solid ${C.hairline}`, background:C.surface, padding:'20px 24px' }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', color:C.muted, marginBottom:4 }}>API Integrations</div>
      <div style={{ fontSize:12, color:C.muted, marginBottom:16, lineHeight:1.6 }}>
        Connect your own API keys to unlock Jarvis Studio production. HeyGen generates founder avatar clips. Runway generates cinematic visual scenes.
      </div>

      <ApiKeyRow
        label="HeyGen"
        endpoint="/api/heygen/settings"
        helpUrl="https://app.heygen.com/settings?nav=API"
        helpLabel="Get HeyGen key →"
      />
      <ApiKeyRow
        label="Runway"
        endpoint="/api/runway/settings"
        helpUrl="https://app.runwayml.com/account/api-keys"
        helpLabel="Get Runway key →"
      />
    </div>
  )
}

export default function AccountPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [user,         setUser]         = useState(null)
  const [sub,          setSub]          = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [portalLoading, setPortalLoad]  = useState(false)
  const [upgradeLoad,  setUpgradeLoad]  = useState(null)
  const [error,        setError]        = useState('')
  const [brandKit,        setBrandKit]        = useState({ logoUrl: '', primaryColor: '#c8a84b', introClipUrl: '', outroClipUrl: '', watermarkUrl: '' })
  const [brandKitSaving,  setBrandKitSaving]  = useState(false)
  const [brandKitMsg,     setBrandKitMsg]      = useState(null)
  const [logoUploading,   setLogoUploading]   = useState(false)
  const brandLogoRef = useRef(null)
  const brandIntroRef     = useRef(null)
  const brandOutroRef     = useRef(null)
  const brandWatermarkRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      setUser(user)
      fetch('/api/subscription')
        .then(r => r.json())
        .then(d => { if (d.status === 'success') setSub(d) })
        .finally(() => setLoading(false))
      fetch('/api/brand-kit')
        .then(r => r.json())
        .then(d => {
        if (d.status === 'success') setBrandKit({
          logoUrl:      d.brandKit?.logoUrl      || '',
          primaryColor: d.brandKit?.primaryColor || '#c8a84b',
          introClipUrl: d.brandKit?.introClipUrl || '',
          outroClipUrl: d.brandKit?.outroClipUrl || '',
          watermarkUrl: d.brandKit?.watermarkUrl || '',
        })
      })
        .catch(() => {})
    })
  }, [])

  const openBillingPortal = async () => {
    setPortalLoad(true)
    setError('')
    try {
      const res  = await fetch('/api/billing-portal', { method: 'POST' })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else setError(data?.error || 'Could not open billing portal')
    } catch {
      setError('Connection error')
    } finally {
      setPortalLoad(false)
    }
  }

  const handleUpgrade = async (tier) => {
    setUpgradeLoad(tier)
    setError('')
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else setError(data?.error || 'Could not start checkout')
    } catch {
      setError('Connection error')
    } finally {
      setUpgradeLoad(null)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleLogoUpload = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setBrandKitMsg({ type: 'error', text: 'Please upload an image file.' }); return }
    if (file.size > 2 * 1024 * 1024) { setBrandKitMsg({ type: 'error', text: 'Logo must be under 2 MB.' }); return }

    setLogoUploading(true)
    setBrandKitMsg(null)
    try {
      const presignRes = await fetch('/api/brand-kit/presign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message)

      const uploadRes = await fetch(presignData.signedUrl, {
        method: 'PUT', body: file,
        headers: { 'Content-Type': file.type, 'x-upsert': 'true' },
      })
      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)

      const saveRes = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl: presignData.publicUrl }),
      })
      const saveData = await saveRes.json()
      if (saveData.status !== 'success') throw new Error(saveData.message)

      setBrandKit(k => ({ ...k, logoUrl: presignData.publicUrl }))
      setBrandKitMsg({ type: 'success', text: 'Logo saved.' })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setLogoUploading(false)
    }
  }

  const handleBrandColorSave = async () => {
    setBrandKitSaving(true)
    setBrandKitMsg(null)
    try {
      const res  = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryColor: brandKit.primaryColor }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setBrandKitMsg({ type: 'success', text: 'Brand color saved.' })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setBrandKitSaving(false)
    }
  }

  const handleClipUpload = async (file, uploadType, fieldName) => {
    if (!file) return
    setBrandKitMsg(null)
    setLogoUploading(true)
    try {
      const presignRes = await fetch('/api/brand-kit/presign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, uploadType }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message)

      const uploadRes = await fetch(presignData.signedUrl, {
        method: 'PUT', body: file, headers: { 'Content-Type': file.type, 'x-upsert': 'true' },
      })
      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)

      const saveRes = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [fieldName]: presignData.publicUrl }),
      })
      const saveData = await saveRes.json()
      if (saveData.status !== 'success') throw new Error(saveData.message)

      setBrandKit(k => ({ ...k, [fieldName]: presignData.publicUrl }))
      setBrandKitMsg({ type: 'success', text: `${uploadType} saved.` })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setLogoUploading(false)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.secondary, fontFamily: 'system-ui, sans-serif' }}>
      Loading…
    </div>
  )

  const tierColor = TIER_COLORS[sub?.tier] || C.muted
  const periodEnd = sub?.periodEnd ? new Date(sub.periodEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.deep }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: C.gold, cursor: 'pointer' }}>
          PROMPT CEO
        </button>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => router.push('/prompt-engine-v3')} style={{ background: 'none', border: 'none', color: C.secondary, fontSize: 13, cursor: 'pointer' }}>Open App</button>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer' }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 6px' }}>My Account</h1>
          <div style={{ fontSize: 13, color: C.secondary }}>{user?.email}</div>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 6, background: C.redGlow, border: `1px solid ${C.red}`, color: C.red, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Current Plan */}
        <div style={{ borderRadius: 10, border: `1px solid ${sub?.active ? tierColor + '44' : C.hairline}`, background: sub?.active ? tierColor + '08' : C.surface, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Current Plan</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: tierColor }}>{sub?.tierLabel || 'Free'}</span>
                <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: sub?.active ? tierColor + '22' : C.subtle, border: `1px solid ${sub?.active ? tierColor + '44' : C.hairline}`, color: sub?.active ? tierColor : C.muted }}>
                  {sub?.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {periodEnd && <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>Renews {periodEnd}</div>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {sub?.active && !sub?.isAdmin && (
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  style={{ padding: '8px 16px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary, opacity: portalLoading ? 0.6 : 1 }}
                >
                  {portalLoading ? '…' : 'Manage Billing'}
                </button>
              )}
              {!sub?.active && (
                <button onClick={() => router.push('/pricing')} style={{ padding: '8px 16px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>

          {/* Usage bars */}
          {!sub?.isAdmin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Images */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 0.5, textTransform: 'uppercase' }}>Image Generations</span>
                  <span style={{ fontSize: 11, color: C.secondary }}>{sub?.imagesUsed || 0} / {sub?.imagesLimit || 0} used</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: C.subtle, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: tierColor, width: `${Math.min(100, ((sub?.imagesUsed || 0) / (sub?.imagesLimit || 1)) * 100)}%`, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub?.imagesRemaining || 0} remaining this period</div>
              </div>

              {/* Music */}
              {(sub?.musicLimit || 0) > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 0.5, textTransform: 'uppercase' }}>Music Licenses</span>
                    <span style={{ fontSize: 11, color: C.secondary }}>{sub?.musicUsed || 0} / {sub?.musicLimit || 0} used</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: C.subtle, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: C.gold, width: `${Math.min(100, ((sub?.musicUsed || 0) / (sub?.musicLimit || 1)) * 100)}%`, transition: 'width 0.3s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub?.musicRemaining || 0} remaining this period</div>
                </div>
              )}
            </div>
          )}

          {sub?.isAdmin && (
            <div style={{ padding: '12px 16px', borderRadius: 6, background: C.violetGlow, border: `1px solid ${C.violetDim}` }}>
              <span style={{ fontSize: 12, color: C.violet, fontWeight: 700 }}>⚡ Admin account — unlimited access to everything</span>
            </div>
          )}
        </div>

        {/* Upgrade options — shown when on a lower tier */}
        {sub?.active && !sub?.isAdmin && sub?.tier !== 'agency' && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Upgrade Your Plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: 'studio_pro', label: 'Studio Pro',  price: '$49/mo', desc: '150 images/month + Photographer Brief + Character DNA',      color: C.green,  show: ['free','creator'] },
                { id: 'pro',        label: 'Pro',          price: '$79/mo', desc: 'Full Ad Studio + 100 images + Client sharing + Brand Voice', color: C.gold,   show: ['free','creator','studio_pro'] },
                { id: 'agency',     label: 'Agency',       price: '$179/mo', desc: '300 images + 10 music licenses + Webhooks + Briefs',        color: C.violet, show: ['free','creator','studio_pro','pro'] },
              ].filter(p => p.show.includes(sub?.tier)).map(plan => (
                <div key={plan.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 8, border: `1px solid ${plan.color}33`, background: plan.color + '08', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: plan.color }}>{plan.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.secondary }}>{plan.price}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{plan.desc}</div>
                  </div>
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={upgradeLoad === plan.id}
                    style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${plan.color}`, background: plan.color + '22', color: plan.color, opacity: upgradeLoad === plan.id ? 0.6 : 1, whiteSpace: 'nowrap' }}
                  >
                    {upgradeLoad === plan.id ? '…' : `Upgrade to ${plan.label}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Music Add-on */}
        {!sub?.musicAddon && sub?.active && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.goldDim}`, background: C.goldGlow, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, marginBottom: 4 }}>🎵 Music Add-on — $9/month</div>
              <div style={{ fontSize: 12, color: C.secondary }}>Unlimited access to 400+ original tracks licensed for commercial use</div>
            </div>
            <button
              onClick={() => handleUpgrade('music_addon')}
              disabled={upgradeLoad === 'music_addon'}
              style={{ padding: '8px 18px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.gold, color: '#000', opacity: upgradeLoad === 'music_addon' ? 0.6 : 1, whiteSpace: 'nowrap' }}
            >
              {upgradeLoad === 'music_addon' ? '…' : 'Add Music'}
            </button>
          </div>
        )}

        {/* Admin panel — only for admins */}
        {sub?.isAdmin && <AdminPanel />}

        {/* Affiliate dashboard link */}
        <AffiliateLink router={router} email={user?.email} />

        {/* Become a Partner banner — only shown if not already an affiliate */}
        {!sub?.isAdmin && (
          <div style={{ borderRadius: 10, border: `1px solid ${C.green}33`, background: C.greenGlow, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.green, marginBottom: 6 }}>💰 Earn with Prompt CEO</div>
              <div style={{ fontSize: 12, color: C.secondary, lineHeight: 1.6, maxWidth: 440 }}>
                Share your referral link. Earn 30–40% recurring commission every month — for life — on every subscriber you refer. Join the Creator Partner program.
              </div>
            </div>
            <button
              onClick={() => router.push('/partner')}
              style={{ padding: '10px 20px', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green, whiteSpace: 'nowrap' }}
            >
              Become a Partner →
            </button>
          </div>
        )}

        {/* API Integrations */}
        <ApiIntegrations />

        {/* Quick links */}
        <div style={{ borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, padding: '20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Quick Links</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { label: '🎬 Open App',        action: () => router.push('/prompt-engine-v3') },
              { label: '📋 View Pricing',     action: () => router.push('/pricing') },
              { label: '❓ Help & Tutorials', action: () => router.push('/tutorials') },
            ].map(link => (
              <button key={link.label} onClick={link.action} style={{ padding: '10px 14px', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, color: C.secondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
            Sign out of {user?.email}
          </button>
        </div>

      </div>

      {/* ── Brand Kit ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ padding: '24px', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Brand Kit</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Your logo and brand color are automatically added to all Edit Studio renders.</div>

          {/* Logo upload */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Logo</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {brandKit.logoUrl ? (
                <div style={{ width: 64, height: 64, borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={brandKit.logoUrl} alt="Brand logo" style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain' }} />
                </div>
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: 8, border: `1px dashed ${C.hairline}`, background: C.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: C.ghost, fontSize: 11 }}>No logo</div>
              )}
              <div>
                <input ref={brandLogoRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" style={{ display: 'none' }} onChange={e => handleLogoUpload(e.target.files?.[0])} />
                <button onClick={() => brandLogoRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: logoUploading ? 'not-allowed' : 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {logoUploading ? 'Uploading…' : brandKit.logoUrl ? '↺ Replace Logo' : '⬆ Upload Logo'}
                </button>
                <div style={{ fontSize: 10, color: C.ghost, marginTop: 5 }}>PNG, JPG, SVG or WebP · max 2 MB</div>
              </div>
            </div>
          </div>

          {/* Primary color */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Brand Color</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="color" value={brandKit.primaryColor || '#c8a84b'}
                onChange={e => setBrandKit(k => ({ ...k, primaryColor: e.target.value }))}
                style={{ width: 44, height: 44, borderRadius: 8, border: `1px solid ${C.hairline}`, cursor: 'pointer', padding: 2, background: 'none' }} />
              <input type="text" value={brandKit.primaryColor || '#c8a84b'}
                onChange={e => setBrandKit(k => ({ ...k, primaryColor: e.target.value }))}
                placeholder="#c8a84b"
                style={{ padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.hairline}`, background: C.raised, color: C.primary, fontSize: 13, fontFamily: 'monospace', width: 100, outline: 'none' }} />
              <button onClick={handleBrandColorSave} disabled={brandKitSaving}
                style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: brandKitSaving ? 'not-allowed' : 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
                {brandKitSaving ? 'Saving…' : 'Save Color'}
              </button>
            </div>
          </div>

            {/* Intro clip */}
            <div style={{ marginBottom: 20, paddingTop: 16, borderTop: `1px solid ${C.hairline}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Intro Clip</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Short branded video (≤10s) prepended to every render. MP4, MOV, or WebM · max 50 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.introClipUrl ? C.green : C.ghost }}>{brandKit.introClipUrl ? '✓ Intro clip set' : 'No intro clip'}</span>
                <input ref={brandIntroRef} type="file" accept="video/mp4,video/quicktime,video/webm" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'intro', 'introClipUrl')} />
                <button onClick={() => brandIntroRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.introClipUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.introClipUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ introClipUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, introClipUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>

            {/* Outro clip */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Outro Clip</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Short branded video (≤10s) appended to every render. MP4, MOV, or WebM · max 50 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.outroClipUrl ? C.green : C.ghost }}>{brandKit.outroClipUrl ? '✓ Outro clip set' : 'No outro clip'}</span>
                <input ref={brandOutroRef} type="file" accept="video/mp4,video/quicktime,video/webm" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'outro', 'outroClipUrl')} />
                <button onClick={() => brandOutroRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.outroClipUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.outroClipUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ outroClipUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, outroClipUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>

            {/* Watermark */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Watermark</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Transparent PNG overlaid top-left on every render. PNG or WebP · max 2 MB</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: brandKit.watermarkUrl ? C.green : C.ghost }}>{brandKit.watermarkUrl ? '✓ Watermark set' : 'No watermark'}</span>
                <input ref={brandWatermarkRef} type="file" accept="image/png,image/webp" style={{ display: 'none' }} onChange={e => handleClipUpload(e.target.files?.[0], 'watermark', 'watermarkUrl')} />
                <button onClick={() => brandWatermarkRef.current?.click()} disabled={logoUploading}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                  {brandKit.watermarkUrl ? '↺ Replace' : '⬆ Upload'}
                </button>
                {brandKit.watermarkUrl && (
                  <button onClick={() => { fetch('/api/brand-kit', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ watermarkUrl: '' }) }).then(() => setBrandKit(k => ({ ...k, watermarkUrl: '' }))) }}
                    style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: 'none', color: C.ghost }}>Remove</button>
                )}
              </div>
            </div>

          {/* Status message */}
          {brandKitMsg && (
            <div style={{ padding: '8px 12px', borderRadius: 7, fontSize: 12, color: brandKitMsg.type === 'success' ? C.green : '#c45a5a', border: `1px solid ${brandKitMsg.type === 'success' ? C.green + '44' : '#c45a5a44'}`, background: brandKitMsg.type === 'success' ? C.greenGlow : '#c45a5a08' }}>
              {brandKitMsg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
