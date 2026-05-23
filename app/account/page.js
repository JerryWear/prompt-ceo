'use client'

import { useState, useEffect } from 'react'
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
  const [musicForm,     setMusicForm]     = useState({ title: '', artist: '', genre: 'Electronic', mood: 'euphoric', energy: 'medium', duration: '', is_premium: false, featured: false })
  const [musicFile,     setMusicFile]     = useState(null)
  const [musicUploading,setMusicUploading]= useState(false)
  const [musicError,    setMusicError]    = useState(null)
  const [musicSuccess,  setMusicSuccess]  = useState(null)

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
              const fd = new FormData()
              fd.append('file',       musicFile)
              fd.append('title',      musicForm.title)
              fd.append('artist',     musicForm.artist)
              fd.append('genre',      musicForm.genre)
              fd.append('mood',       musicForm.mood)
              fd.append('energy',     musicForm.energy)
              fd.append('duration',   musicForm.duration)
              fd.append('is_premium', String(musicForm.is_premium))
              fd.append('featured',   String(musicForm.featured))
              const res = await fetch('/api/admin/upload-music', { method: 'POST', body: fd })
              const d   = await res.json()
              if (d.status === 'success') {
                setMusicSuccess(`"${d.track.title}" uploaded successfully`)
                setMusicForm({ title: '', artist: '', genre: 'Electronic', mood: 'euphoric', energy: 'medium', duration: '', is_premium: false, featured: false })
                setMusicFile(null)
                e.target.reset()
              } else {
                setMusicError(d.error || 'Upload failed')
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

          return (
            <form onSubmit={handleMusicSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Upload Music Track</div>

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

              {/* Row: genre + mood */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {select('GENRE', 'genre', GENRES)}
                {select('MOOD', 'mood', MOODS)}
              </div>

              {/* Row: energy + duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {select('ENERGY', 'energy', ['low', 'medium', 'high'])}
                {field('DURATION (seconds)', 'duration', 'number', { placeholder: '187', min: 0 })}
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: 20 }}>
                {[['is_premium', 'Premium only'], ['featured', 'Featured']].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: C.secondary, cursor: 'pointer' }}>
                    <input type="checkbox" checked={musicForm[key]} onChange={e => setMusicForm(f => ({ ...f, [key]: e.target.checked }))}
                      style={{ width: 14, height: 14, cursor: 'pointer', accentColor: C.violet }} />
                    {label}
                  </label>
                ))}
              </div>

              {musicError   && <div style={{ padding: '10px 12px', borderRadius: 6, background: C.redGlow,   border: `1px solid #7a2a2a`, fontSize: 12, color: C.red   }}>{musicError}</div>}
              {musicSuccess && <div style={{ padding: '10px 12px', borderRadius: 6, background: C.greenGlow, border: `1px solid ${C.greenDim}`, fontSize: 12, color: C.green }}>{musicSuccess}</div>}

              <button type="submit" disabled={musicUploading}
                style={{ padding: '10px 24px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: musicUploading ? 'default' : 'pointer', border: 'none', background: musicUploading ? C.muted : C.violet, color: '#fff', opacity: musicUploading ? 0.7 : 1, alignSelf: 'flex-start' }}>
                {musicUploading ? 'Uploading…' : 'Upload Track'}
              </button>
            </form>
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

export default function AccountPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [user,         setUser]         = useState(null)
  const [sub,          setSub]          = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [portalLoading, setPortalLoad]  = useState(false)
  const [upgradeLoad,  setUpgradeLoad]  = useState(null)
  const [error,        setError]        = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      setUser(user)
      fetch('/api/subscription')
        .then(r => r.json())
        .then(d => { if (d.status === 'success') setSub(d) })
        .finally(() => setLoading(false))
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
    </div>
  )
}
