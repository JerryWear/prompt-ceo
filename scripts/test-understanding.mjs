/**
 * Standalone validation test for the Video Understanding Engine (Sprint 1)
 *
 * Tests the core AI intelligence — GPT-4o analyzing a PromptCEO screen recording
 * transcript — without requiring Supabase auth or a video file.
 *
 * Usage:
 *   node scripts/test-understanding.mjs
 *
 * Uses OPENAI_API_KEY from .env.local
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load env from .env.local ────────────────────────────────────────────────
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env.local');
    const lines = readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local not found — rely on pre-set env vars
  }
}

loadEnv();

// ── Transcript from a real PromptCEO screen recording demo ──────────────────
// This represents what a founder walkthrough video of promptceo.io would say.
// Timestamps are approximate for a ~90 second demo video.
const PROMPTCEO_TRANSCRIPT = [
  { start: 0.0,  end: 3.5,  text: "Let me show you PromptCEO — the AI Creative Operating System for marketers and creators." },
  { start: 3.5,  end: 8.0,  text: "This is the Prompt Studio. This is where you generate cinematic, structured prompts for AI image generators." },
  { start: 8.0,  end: 13.5, text: "You choose your story world, subject, camera angles, lighting, and mood. The system layers them into a production-grade prompt." },
  { start: 13.5, end: 18.0, text: "Here I'll select the Cyberpunk world and a dramatic close-up shot. Watch how the prompt builds automatically across all layers." },
  { start: 18.0, end: 23.5, text: "Now let me switch to Ad Studio. This is where you build full ad campaigns from scratch using AI." },
  { start: 23.5, end: 29.0, text: "First you capture your Brand DNA — your brand voice, values, and target audience. The system remembers this across every campaign." },
  { start: 29.0, end: 35.0, text: "The AI Director then generates multiple angles and hooks for your campaign. You can see it's suggesting five different emotional angles here." },
  { start: 35.0, end: 41.0, text: "I'll select the Transformation angle. Now the Campaign Builder sequences this into a full multi-ad campaign." },
  { start: 41.0, end: 47.5, text: "The Campaign Builder connects your hook to your body copy and call to action, and the AI generates variations for A/B testing." },
  { start: 47.5, end: 53.0, text: "Here's the Campaign Evolution panel. This tracks performance signals and tells you what to iterate on next." },
  { start: 53.0, end: 59.0, text: "And this is Campaign Intelligence — it learns from all your past campaigns and applies what worked before." },
  { start: 59.0, end: 65.5, text: "The AI Creative Director gives you director-level notes on why a creative direction will or won't work for your specific audience." },
  { start: 65.5, end: 72.0, text: "Finally, the Music Studio — AI-powered music recommendations matched to your campaign's mood, pacing, and platform." },
  { start: 72.0, end: 78.5, text: "Every track is scored against your brand DNA and campaign context. You get a Soundtrack Intelligence score for each track." },
  { start: 78.5, end: 84.0, text: "PromptCEO is not a prompt generator. It's the operating system for AI-native businesses." },
  { start: 84.0, end: 90.0, text: "Prompt Studio, Ad Studio, Campaign Builder, Music Studio, AI Director — one platform, one brand memory, one operating system." },
];

// ── Prompt construction ─────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a video content analyst specializing in digital advertising.
Analyze the video frames and transcript. Identify what product is shown, what type of business,
notable UI screens or features visible in frames, and the strongest moments for ad creative.
Respond only with valid JSON.`;

function buildTranscriptText(segments) {
  return segments.map(s => `[${s.start.toFixed(1)}s] ${s.text}`).join('\n');
}

function buildUserPrompt(transcriptText) {
  return `Analyze this video. Return JSON with this exact schema:
{
  "detected_products": ["list of products/features visible"],
  "business_type": "saas|ecommerce|service|creator|agency|other",
  "business_description": "one sentence describing the business",
  "screens_detected": [{"label": "screen name", "timestamp_approx": 0, "significance": "high|medium|low"}],
  "key_moments": [{"timestamp_approx": 0, "label": "description", "reason": "why it's strong for ads", "score": 8}],
  "weak_moments": [{"timestamp_approx": 0, "label": "description", "reason": "why it's weak"}],
  "strong_moments": [{"timestamp_approx": 0, "label": "description", "type": "hook|demo|cta|social_proof"}],
  "recommended_positioning": "founder_authority|product_demo|transformation|problem_solution|social_proof",
  "positioning_reason": "one sentence explanation",
  "recommended_ad_types": ["founder|demo|saas|linkedin|tiktok|ugc|launch|retargeting"],
  "key_messages": ["3-5 key messages derived from the content"],
  "estimated_duration": 0
}

Transcript (with timestamps):
${transcriptText}`;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function runTest() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY not found in environment or .env.local');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('PromptCEO Video Understanding Engine — Sprint 1 Validation');
  console.log('='.repeat(60));
  console.log(`\nTranscript: ${PROMPTCEO_TRANSCRIPT.length} segments, ~${PROMPTCEO_TRANSCRIPT.at(-1).end}s duration`);
  console.log('Model: gpt-4o (transcript-only, no frames)');
  console.log('Calling GPT-4o...\n');

  const transcriptText = buildTranscriptText(PROMPTCEO_TRANSCRIPT);
  const userPrompt = buildUserPrompt(transcriptText);

  const start = Date.now();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500,
    }),
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  if (!response.ok) {
    const err = await response.text();
    console.error(`OpenAI API error ${response.status}: ${err}`);
    process.exit(1);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    console.error('No content in GPT-4o response');
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  const understanding = JSON.parse(content);

  // ── Print results ─────────────────────────────────────────────────────────
  console.log(`GPT-4o responded in ${elapsed}s`);
  console.log(`Tokens used: ${data.usage?.total_tokens ?? 'unknown'} (prompt: ${data.usage?.prompt_tokens}, completion: ${data.usage?.completion_tokens})\n`);

  console.log('─'.repeat(60));
  console.log('DETECTED PRODUCTS');
  console.log('─'.repeat(60));
  console.log(understanding.detected_products?.map(p => `  • ${p}`).join('\n') ?? '  (none)');

  console.log('\n' + '─'.repeat(60));
  console.log('BUSINESS TYPE');
  console.log('─'.repeat(60));
  console.log(`  Type:        ${understanding.business_type}`);
  console.log(`  Description: ${understanding.business_description}`);

  console.log('\n' + '─'.repeat(60));
  console.log('SCREENS DETECTED');
  console.log('─'.repeat(60));
  if (understanding.screens_detected?.length) {
    understanding.screens_detected.forEach(s => {
      const ts = s.timestamp_approx != null ? `~${s.timestamp_approx}s` : '';
      console.log(`  [${s.significance?.toUpperCase() ?? '?'}] ${s.label} ${ts}`);
    });
  } else {
    console.log('  (none)');
  }

  console.log('\n' + '─'.repeat(60));
  console.log('KEY MOMENTS');
  console.log('─'.repeat(60));
  if (understanding.key_moments?.length) {
    understanding.key_moments.forEach(m => {
      console.log(`  ~${m.timestamp_approx}s [score: ${m.score}/10] ${m.label}`);
      console.log(`          → ${m.reason}`);
    });
  } else {
    console.log('  (none)');
  }

  console.log('\n' + '─'.repeat(60));
  console.log('STRONG MOMENTS');
  console.log('─'.repeat(60));
  if (understanding.strong_moments?.length) {
    understanding.strong_moments.forEach(m => {
      console.log(`  ~${m.timestamp_approx}s [${m.type}] ${m.label}`);
    });
  } else {
    console.log('  (none)');
  }

  console.log('\n' + '─'.repeat(60));
  console.log('RECOMMENDED POSITIONING');
  console.log('─'.repeat(60));
  console.log(`  ${understanding.recommended_positioning}`);
  console.log(`  "${understanding.positioning_reason}"`);

  console.log('\n' + '─'.repeat(60));
  console.log('RECOMMENDED AD TYPES');
  console.log('─'.repeat(60));
  console.log(understanding.recommended_ad_types?.map(t => `  • ${t}`).join('\n') ?? '  (none)');

  console.log('\n' + '─'.repeat(60));
  console.log('KEY MESSAGES');
  console.log('─'.repeat(60));
  understanding.key_messages?.forEach((m, i) => {
    console.log(`  ${i + 1}. ${m}`);
  });

  console.log('\n' + '─'.repeat(60));
  console.log('FULL JSON OUTPUT');
  console.log('─'.repeat(60));
  console.log(JSON.stringify(understanding, null, 2));

  console.log('\n' + '='.repeat(60));

  // ── Validation check ──────────────────────────────────────────────────────
  const acceptableTerms = [
    'prompt studio', 'ad studio', 'campaign builder', 'ai director',
    'music studio', 'campaign intelligence', 'campaign evolution',
    'brand dna', 'creative director', 'promptceo', 'creative operating system',
    'saas marketing', 'ai creative',
  ];

  const allText = JSON.stringify(understanding).toLowerCase();
  const matched = acceptableTerms.filter(t => allText.includes(t));
  const unacceptableTerms = ['generic application', 'generic software', 'a website', 'a dashboard'];
  const badMatches = unacceptableTerms.filter(t => allText.includes(t));

  console.log('VALIDATION RESULT');
  console.log('='.repeat(60));
  console.log(`PromptCEO-specific terms detected: ${matched.length}/${acceptableTerms.length}`);
  console.log(`  Matched: ${matched.join(', ') || '(none)'}`);
  if (badMatches.length) {
    console.log(`  ⚠ Generic terms found: ${badMatches.join(', ')}`);
  }
  console.log('');
  if (matched.length >= 4) {
    console.log('✅ PASS — System correctly identifies PromptCEO-specific concepts');
  } else if (matched.length >= 2) {
    console.log('⚠ PARTIAL — Some PromptCEO concepts identified but not enough');
  } else {
    console.log('❌ FAIL — System produced generic observations');
  }
  console.log('='.repeat(60));
}

runTest().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
