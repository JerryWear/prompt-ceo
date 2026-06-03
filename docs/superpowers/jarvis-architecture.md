# PromptCEO Jarvis v1 — Architecture Blueprint

**Date:** 2026-06-03
**Status:** Design only — no implementation
**Author:** Claude Code (Infrastructure Audit Phase)

---

## What Jarvis Is

Jarvis is the **persistent AI operating intelligence** for PromptCEO. It is not a chatbot. It is not a feature. It is not a prompt template.

Jarvis is the layer that makes PromptCEO feel like it has an opinion, a memory, and a strategy — not just a set of generation tools.

The difference between the current system and Jarvis:

| Current System | With Jarvis |
|---------------|-------------|
| User asks, AI generates | Jarvis observes, advises, then generates |
| Each session starts fresh | Jarvis remembers every session |
| User must know what to ask | Jarvis suggests what to work on next |
| AI is a tool | Jarvis is a collaborator |
| Features are isolated | Jarvis connects everything |

Jarvis v1 is not AGI. It is a **well-designed context system** with the right information loaded at the right time, paired with well-crafted system prompts for each role it plays. The intelligence is real. The magic is in what context gets injected and when.

---

## What Jarvis Is Not

- Not a chatbot that lives in a sidebar and answers questions
- Not a replacement for the user's judgment
- Not a system that runs autonomously without user intent
- Not a single API endpoint or a single LLM call
- Not a version 1 feature — this is a phased architecture

---

## The Nine Roles

Jarvis v1 must be capable of acting in these nine roles. Each role is a distinct context + system prompt + output format combination.

### 1. Product Strategist
**Trigger:** User opens the dashboard or requests a strategy session
**Input:** OS memory, brand profiles, campaign history, roadmap from CLAUDE.md
**Output:** "Based on your last 3 campaigns, your strongest angle is X. Your next move should be Y."
**Jarvis behavior:** Analyzes what's been built, identifies gaps, recommends next product/feature/campaign priority

### 2. Creative Director
**Trigger:** User starts a new ad, campaign, or prompt session
**Input:** Brand DNA, past successful campaigns, audience signals, current product brief
**Output:** Creative direction note — tone, visual style, hook angle, emotional arc
**Jarvis behavior:** Sets the creative frame before generation begins. Not "generate this" but "here's how to think about this."

### 3. Marketing Advisor
**Trigger:** Campaign is ready to publish, or user requests marketing guidance
**Input:** Campaign assets, target audience, platform (TikTok, Meta, Instagram), performance data from past campaigns
**Output:** Platform-specific recommendations, posting strategy, A/B test suggestions
**Jarvis behavior:** Applies performance memory to new campaigns before they launch

### 4. Growth Advisor
**Trigger:** User views analytics or performance data
**Input:** Performance logs, A/B test results, audience data, competitor signals (via Firecrawl MCP when available)
**Output:** What's working, what isn't, specific next actions with predicted impact
**Jarvis behavior:** Turns data into decisions, not just reports

### 5. Product Manager
**Trigger:** New session start, or user asks "what should I work on?"
**Input:** Full project state (all open projects, last activity, roadmap priorities from CLAUDE.md)
**Output:** Prioritized task list with rationale. "Project A is 70% done. Finishing it gives you more ROI than starting Project B."
**Jarvis behavior:** Tracks project momentum across sessions and keeps the user focused

### 6. QA Tester
**Trigger:** After any significant code change, before shipping
**Input:** Playwright MCP tools (live browser), changed files, critical user flows
**Output:** Test report — what passed, what failed, screenshots of breakage
**Jarvis behavior:** Runs the standard QA suite autonomously using Playwright. Reports findings without user needing to ask.

### 7. UX Auditor
**Trigger:** After UI changes, or periodic audit requested
**Input:** Playwright MCP screenshots, user flow definitions, UX principles
**Output:** Specific UX issues with screenshots, severity ratings, fix recommendations
**Jarvis behavior:** Walks through key flows (Prompt Studio → Generate → Save, Ad Studio → Build → Publish) and flags friction

### 8. System Architect
**Trigger:** Before any significant architectural change, or when technical debt review requested
**Input:** CLAUDE.md, current codebase state, technical debt register, GitHub MCP commit history
**Output:** Architectural risk assessment, recommended patterns, anti-patterns to avoid
**Jarvis behavior:** Guards architectural integrity. Flags when a proposed change would create a coupling problem or break the layered system model.

### 9. Code Reviewer
**Trigger:** After implementation, before commit
**Input:** Git diff (GitHub MCP), CLAUDE.md conventions, security checklist
**Output:** Inline findings with severity — correctness bugs (block), simplification opportunities (suggest), security issues (block)
**Jarvis behavior:** Applies `/code-review` skill automatically on significant diffs

---

## System Inputs — What Jarvis Reads

For Jarvis to operate, it needs access to a defined set of inputs. These are the information sources each role draws from.

### Tier 1 — Always Loaded (Every Session)
- `CLAUDE.md` — product vision, architecture, conventions, tech debt, roadmap
- `MEMORY.md` — recent architectural decisions and project state
- Current git branch + last 5 commits (GitHub MCP)
- Active user's OS Memory (recent 10 entries from `os_memory`)

### Tier 2 — Loaded On Role Activation
- **Creative Director:** Brand DNA for the current project, past 3 successful campaigns
- **Product Manager:** All open projects + last activity timestamps
- **QA Tester / UX Auditor:** Playwright MCP — live browser, screenshot capability
- **System Architect:** Full `app/api/` directory structure, `package.json`, current technical debt register
- **Code Reviewer:** Git diff since last commit (GitHub MCP)
- **Growth Advisor:** Performance logs for active campaigns, A/B test results
- **Marketing Advisor:** Campaign assets, platform integrations status (TikTok, Meta auth state)

### Tier 3 — Retrieved Semantically (Future — requires pgvector)
- Past campaigns similar to current brief
- Historical performance patterns matching current audience/platform
- Prior brand decisions relevant to current creative direction

---

## System Outputs — What Jarvis Produces

Jarvis outputs are always **actionable**, never informational-only.

| Role | Output Format | Delivered Where |
|------|--------------|----------------|
| Product Strategist | Prioritized recommendation with rationale | Dashboard widget |
| Creative Director | Director's note (3-5 lines) + creative frame | Ad Studio context bar |
| Marketing Advisor | Platform strategy checklist | Campaign export panel |
| Growth Advisor | Performance summary + next 3 actions | Analytics dashboard |
| Product Manager | Project status table + recommended next task | Dashboard |
| QA Tester | Test report with pass/fail + screenshots | Dev console / Claude Code |
| UX Auditor | Screenshot-annotated issue list | Claude Code session |
| System Architect | Architecture review with risk flags | Claude Code session |
| Code Reviewer | Inline findings with severity | Claude Code session / GitHub PR |

---

## Context Loading Strategy

The most important architectural decision in Jarvis is **what to load and when**. Loading everything always is expensive and reduces focus. Loading nothing until asked makes Jarvis reactive, not proactive.

### The Principle: Role-Triggered Context Windows

Each Jarvis role has a **defined context window** that loads when the role activates:

```
Role Activation Trigger → Load Tier 1 + Role-Specific Tier 2 → Build System Prompt → Generate
```

This is not a new technical component. It is a prompt engineering discipline applied consistently.

**Example — Creative Director activation:**
```
User opens Ad Studio → 
  Load: CLAUDE.md creative philosophy section
  Load: User's brand DNA (from brand_profiles table)
  Load: Last 3 successful campaigns (from ad_projects, sorted by performance_score DESC)
  Load: Current product brief (from session state)
  Build: "You are the Creative Director for [Brand]. The brand voice is [X]. The last campaign that worked best was [Y] because [Z]..."
  Output: Director's note injected into the Ad Studio context bar
```

### Lazy Loading
Tier 3 (semantic retrieval) is loaded only when:
1. The user has an explicit question ("what worked last time I targeted 25-34 women?")
2. Jarvis detects it's in a situation where past patterns are relevant
3. Automatic context enrichment is enabled (future feature)

---

## MCP Dependency Map

| Jarvis Role | Required MCPs | Optional MCPs |
|-------------|---------------|---------------|
| Product Strategist | None (uses Supabase data) | Context7 |
| Creative Director | None | None |
| Marketing Advisor | None | Firecrawl (competitor signals) |
| Growth Advisor | None | Firecrawl (market trends) |
| Product Manager | GitHub MCP (project state) | None |
| QA Tester | Playwright MCP | GitHub MCP |
| UX Auditor | Playwright MCP | None |
| System Architect | GitHub MCP | Context7 |
| Code Reviewer | GitHub MCP | None |

**Minimum viable Jarvis requires:** GitHub MCP + Playwright MCP (both now installed).
**Full Jarvis requires:** All of the above + Firecrawl MCP (future).

---

## Phased Implementation Roadmap

### Jarvis v0 — Today (Already Exists, Not Named)
The current Claude Code session with CLAUDE.md, memory system, Superpowers skills, and GitHub + Playwright MCPs is functionally Jarvis v0. It can:
- Act as System Architect (reads CLAUDE.md + codebase)
- Act as Code Reviewer (`/code-review` skill)
- Act as Creative Director (Ad Studio intelligence already built)
- Act as QA Tester (Playwright MCP now available)

**No code to write. This exists today.**

---

### Jarvis v1 — In-Product AI Director Evolution (3–6 months)
Extend the existing AI Director into the Jarvis model within the product UI.

**New components:**
1. **Jarvis Context Bar** (replaces the current context bar in Ad Studio)
   - Always shows: what Jarvis knows, what it recommends, confidence level
   - Role indicator: which Jarvis mode is active
   
2. **Session Brain** (extends OS Memory)
   - Jarvis writes a session summary to `os_memory` at end of each generation session
   - Summary includes: what was created, what the user approved, what was rejected
   
3. **Jarvis Recommendations API** (`/api/jarvis/recommend`)
   - Input: current page context + user history
   - Output: role-appropriate recommendation object
   - Replaces ad-hoc AI Director calls with a unified endpoint
   
4. **Jarvis Proactive Alerts**
   - "You haven't tested your last campaign's performance yet — here's what the data shows"
   - "Your brand voice in this ad doesn't match your brand DNA — here's the gap"
   - Delivered as non-blocking notification in the dashboard

**Files to create:**
- `app/api/jarvis/recommend/route.js` — unified Jarvis recommendation endpoint
- `app/api/jarvis/session-close/route.js` — writes session summary to OS memory
- `app/lib/jarvis/contextLoader.js` — assembles role-specific context
- `app/lib/jarvis/rolePrompts.js` — system prompt templates for each role

---

### Jarvis v2 — Proactive Intelligence (6–12 months)
Jarvis stops waiting and starts suggesting.

**New capabilities:**
- Cross-campaign pattern recognition (needs pgvector, see memory architecture doc)
- Predictive campaign scoring before launch ("this angle has a 73% success rate for your audience")
- Automated QA runs after every deploy (Playwright MCP triggered by GitHub webhook)
- Weekly strategy brief generated automatically from performance data

---

### Jarvis v3 — Full OS (12+ months)
Jarvis becomes the product's primary interface for power users.

**New capabilities:**
- Conversational Jarvis (persistent chat that remembers everything across sessions)
- Autonomous multi-step campaign execution (user approves each step)
- Third-party platform integration (publishes to Meta/TikTok on schedule)
- Multi-user Jarvis for Agency plan (separate context per client brand)

---

## Anti-Patterns — What Jarvis Must Never Do

1. **Never generate without a brief.** Jarvis always has context before generating. If context is missing, ask — don't guess.

2. **Never overwrite user decisions.** If a user has manually set a creative direction, Jarvis advises but does not override.

3. **Never be verbose.** Jarvis outputs are short, specific, and actionable. A "Director's Note" is 3–5 lines. A "Performance Summary" is a table + 2 bullet points. Never paragraphs of explanation.

4. **Never expose the machinery.** Users don't see "loading context" or "querying database." They see a result. The system complexity is invisible.

5. **Never ignore membership gates.** Jarvis roles are gated by plan. QA Tester and UX Auditor are Pro+ features. Product Strategist is available to all but limited in depth for Creator plan.

6. **Never hallucinate product data.** If Jarvis doesn't have performance data, it says "not enough data yet" — not a fabricated number.

7. **Never block the user.** Jarvis recommendations are always optional. The user can dismiss any Jarvis output and proceed without it.

---

## Success Metrics for Jarvis v1

These are the concrete signals that will confirm Jarvis v1 is working:

| Metric | Target |
|--------|--------|
| AI Director click-through rate (users who use the recommendation) | > 60% |
| Session memory recall accuracy (Jarvis correctly identifies user's brand voice) | > 90% |
| Time from session start to first generation | Reduced by 30% vs. no Jarvis |
| QA issues caught before user-reported bugs | > 80% of regressions caught by Playwright tests |
| User-reported "it remembered me" moments | Qualitative, tracked in feedback |

---

## The Core Insight

Jarvis is not a new product. It is the **connective tissue** that already exists in the system, made explicit and consistent.

The AI Director already acts as Creative Director.
OS Memory already acts as Product Strategist context.
The `/code-review` skill already acts as Code Reviewer.
Playwright MCP already enables QA Tester.
GitHub MCP already enables System Architect.

Jarvis v1 is naming these things, making them consistent, giving them a unified API, and connecting them into a single operating intelligence instead of a collection of isolated features.

The work is mostly architectural discipline and context engineering, not new AI capabilities.
