'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ─── Design tokens (same as page.js) ─────────────────────────────────────────
const C = {
  void: '#040404', deep: '#070707', base: '#0a0a0a', raised: '#0d0d0d',
  surface: '#111111', overlay: '#151515', hairline: '#1a1a1a', subtle: '#222222',
  primary: '#e8e4dc', secondary: '#ccc8c2', muted: '#9e9a96', ghost: '#6e6a66',
  gold: '#c8a84b', goldDim: '#7a6428', goldGlow: '#c8a84b22',
  blue: '#4a8ab4', blueGlow: '#4a8ab422',
  green: '#4a9a6a', greenGlow: '#4a9a6a22',
  violet: '#9b6fd4', violetGlow: '#9b6fd422',
}

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok',         captionPreset: 'bold'     },
  { id: 'instagram', label: 'Instagram Reel',  captionPreset: 'bold'     },
  { id: 'youtube',   label: 'YouTube Short',   captionPreset: 'clean'    },
  { id: 'linkedin',  label: 'LinkedIn',        captionPreset: 'minimal'  },
  { id: 'meta',      label: 'Meta Ad',         captionPreset: 'pop'      },
]

const GOALS = [
  { id: 'founder',  label: 'Founder Update',   icon: '👤' },
  { id: 'demo',     label: 'Product Demo',     icon: '🖥' },
  { id: 'tutorial', label: 'App Tutorial',     icon: '📱' },
  { id: 'launch',   label: 'Launch Ad',        icon: '🚀' },
  { id: 'ugc',      label: 'UGC Ad',           icon: '🎥' },
  { id: 'edu',      label: 'Educational Post', icon: '🎓' },
]

const PIPELINE_STEPS = [
  { id: 'upload',     label: 'Uploading video'      },
  { id: 'transcript', label: 'Generating transcript' },
  { id: 'director',   label: 'Analyzing content'    },
  { id: 'cuts',       label: 'Building edit plan'   },
  { id: 'cleanup',    label: 'Cleaning timeline'    },
  { id: 'captions',   label: 'Generating captions'  },
  { id: 'music',      label: 'Selecting music'      },
  { id: 'plan',       label: 'Preparing video'      },
]

// Placeholder components — filled in subsequent tasks
function UploadScreen()     { return <div style={{ padding: 40, color: '#e8e4dc' }}>Upload Screen (Task 2)</div> }
function ProcessingScreen() { return <div style={{ padding: 40, color: '#e8e4dc' }}>Processing Screen (Task 3)</div> }
function ReviewScreen()     { return <div style={{ padding: 40, color: '#e8e4dc' }}>Review Screen (Task 4)</div> }
function DownloadScreen()   { return <div style={{ padding: 40, color: '#e8e4dc' }}>Download Screen (Task 5)</div> }

export default function SimpleModeWizard({ onSwitchAdvanced }) {
  const [screen, setScreen]         = useState('upload')
  const [platform, setPlatform]     = useState(null)
  const [goal, setGoal]             = useState(null)
  const [videoFile, setVideoFile]   = useState(null)
  const [videoError, setVideoError] = useState(null)
  const videoRef                    = useRef(null)
  const fileInputRef                = useRef(null)

  const [projectId,      setProjectId]      = useState(null)
  const [pipelineResult, setPipelineResult] = useState(null)
  const [renderJob,      setRenderJob]      = useState(null)

  const [currentStep,  setCurrentStep]  = useState(null)
  const [stepsDone,    setStepsDone]    = useState([])
  const [pipelineError, setPipelineError] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      {screen === 'upload'     && <UploadScreen     {...{ platform, setPlatform, goal, setGoal, videoFile, setVideoFile, videoError, setVideoError, videoRef, fileInputRef, setScreen, setCurrentStep, setStepsDone, setPipelineError, setPipelineResult, setProjectId, onSwitchAdvanced }} />}
      {screen === 'processing' && <ProcessingScreen {...{ currentStep, stepsDone, pipelineError, setScreen, setPipelineError }} />}
      {screen === 'review'     && <ReviewScreen     {...{ pipelineResult, projectId, platform, goal, setScreen, setRenderJob, onSwitchAdvanced }} />}
      {screen === 'download'   && <DownloadScreen   {...{ renderJob, setRenderJob, projectId, pipelineResult, onSwitchAdvanced }} />}
    </div>
  )
}
