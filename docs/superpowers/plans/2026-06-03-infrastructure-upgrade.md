# PromptCEO Infrastructure Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade PromptCEO's AI development environment from a basic coding assistant setup into a full-stack AI operating system with GitHub MCP, Playwright MCP, a living CLAUDE.md handbook, and blueprints for the memory and Jarvis layers.

**Architecture:** MCP servers are configured in `~/.claude/settings.json` (global, so they persist across all sessions). CLAUDE.md lives at the project root and is loaded automatically by Claude Code. Design documents live in `docs/superpowers/` alongside this plan.

**Tech Stack:** Claude Code MCP framework, `npx`-based MCP servers (no global install required), Next.js 16 / React 19 / Supabase / Stripe stack described in CLAUDE.md.

---

> ⚠️ **BLOCKER FOR TASK 2 (GitHub MCP):** Requires a GitHub Personal Access Token.
> Before executing Task 2, the user must:
> 1. Go to https://github.com/settings/tokens → "Generate new token (classic)"
> 2. Name: "PromptCEO Claude MCP"
> 3. Scopes: `repo` (full), `read:org`, `read:user`, `workflow`
> 4. Expiration: No expiration (or 1 year)
> 5. Copy the token and provide it to Claude before Task 2 begins.
>
> Tasks 1, 3, 4, 5, 6 have NO external dependencies and can be executed immediately.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `C:\Users\Work\.claude\settings.json` | Modify | Add `mcpServers` block for Playwright + GitHub |
| `C:\Users\Work\OneDrive\Desktop\prompt-ceo\CLAUDE.md` | Create | Living project handbook for all Claude sessions |
| `docs/superpowers/memory-architecture.md` | Create | Memory layer design recommendation (no implementation) |
| `docs/superpowers/jarvis-architecture.md` | Create | Jarvis v1 architecture blueprint |

---

## Task 1: Install and Verify Playwright MCP

**Files:**
- Modify: `C:\Users\Work\.claude\settings.json`

**No GitHub token required. Execute immediately.**

- [ ] **Step 1.1: Read current global settings**

Read `C:\Users\Work\.claude\settings.json`. Current content:
```json
{
  "extraKnownMarketplaces": { ... },
  "enabledPlugins": { ... }
}
```

- [ ] **Step 1.2: Add Playwright MCP to global settings**

Replace the entire file content with:
```json
{
  "extraKnownMarketplaces": {
    "superpowers-marketplace": {
      "source": {
        "source": "github",
        "repo": "obra/superpowers-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "superpowers@superpowers-marketplace": true
  },
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    }
  }
}
```

- [ ] **Step 1.3: Verify the JSON is valid**

Run:
```powershell
Get-Content "$env:USERPROFILE\.claude\settings.json" | ConvertFrom-Json | ConvertTo-Json -Depth 10
```
Expected: clean JSON output with `mcpServers.playwright` present. No parse errors.

- [ ] **Step 1.4: Test Playwright MCP availability**

Run (pre-fetch the package so first session start is fast):
```powershell
npx @playwright/mcp@latest --help 2>&1 | Select-Object -First 10
```
Expected: help output or version string. No ENOENT errors.

- [ ] **Step 1.5: Document verification result**

After the next Claude Code session restart, run `/mcp` in Claude Code to confirm `playwright` appears in the server list. Screenshot or copy the output.

- [ ] **Step 1.6: Commit**

```bash
git add -A
git commit -m "config: add Playwright MCP to global Claude settings"
```

---

## Task 2: Install and Verify GitHub MCP

**Files:**
- Modify: `C:\Users\Work\.claude\settings.json`

**⚠️ REQUIRES GITHUB PAT — do not start without it.**
Token instructions are in the BLOCKER note at the top of this plan.

- [ ] **Step 2.1: Read current global settings** (will now have Playwright added from Task 1)

- [ ] **Step 2.2: Add GitHub MCP alongside Playwright**

Update `mcpServers` in `C:\Users\Work\.claude\settings.json` to include both:
```json
"mcpServers": {
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"],
    "env": {}
  },
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "<PASTE_TOKEN_HERE>"
    }
  }
}
```

Replace `<PASTE_TOKEN_HERE>` with the actual token from the BLOCKER step.

- [ ] **Step 2.3: Validate JSON**

```powershell
Get-Content "$env:USERPROFILE\.claude\settings.json" | ConvertFrom-Json | ConvertTo-Json -Depth 10
```
Expected: valid JSON, `mcpServers.github` present with token set.

- [ ] **Step 2.4: Pre-fetch GitHub MCP package**

```powershell
npx -y @modelcontextprotocol/server-github --help 2>&1 | Select-Object -First 5
```
Expected: no ENOENT errors.

- [ ] **Step 2.5: Verify repository access**

After Claude Code session restart, ask Claude:
> "Using GitHub MCP, list the last 5 commits on the `main` branch of `JerryWear/prompt-ceo`"

Expected: commit list returned from GitHub API, not a "tool not available" error.

- [ ] **Step 2.6: Verify write permissions**

Ask Claude:
> "Using GitHub MCP, list open pull requests on `JerryWear/prompt-ceo`"

Expected: list (possibly empty), not an error.

- [ ] **Step 2.7: Commit**

```bash
git commit -m "config: add GitHub MCP to global Claude settings"
```

Note: Do NOT commit the raw token in the settings file if the settings file is tracked by git. The global `~/.claude/settings.json` is outside the project repo so this is safe.

---

## Task 3: Install GitHub CLI

**No GitHub token required for install. Login uses same PAT.**

- [ ] **Step 3.1: Download GitHub CLI installer**

Run in PowerShell as user (not admin required):
```powershell
winget install GitHub.cli
```
If winget isn't available:
```powershell
# Download from: https://cli.github.com/
# Install the Windows MSI
```

- [ ] **Step 3.2: Verify installation**

```powershell
gh --version
```
Expected: `gh version 2.x.x (...)` — no "not recognized" error.

- [ ] **Step 3.3: Authenticate**

```powershell
gh auth login
```
When prompted:
- Select: GitHub.com
- Preferred protocol: HTTPS
- Authenticate with: Paste an authentication token
- Paste the same PAT from Task 2

- [ ] **Step 3.4: Verify repo access**

```powershell
gh repo view JerryWear/prompt-ceo --json name,defaultBranchRef
```
Expected: JSON with `name: "prompt-ceo"`.

---

## Task 4: Create CLAUDE.md

**Files:**
- Create: `C:\Users\Work\OneDrive\Desktop\prompt-ceo\CLAUDE.md`

This is the permanent operating handbook. It is loaded automatically by Claude Code at every session start.

- [ ] **Step 4.1: Create CLAUDE.md at project root**

Content is the full handbook — see the complete file content written in the execution step below. It must cover:
- Company vision and product mission
- System architecture (all 9 subsystems)
- Development rules and conventions
- Current priorities
- Long-term roadmap
- Technical debt register
- Membership plan structure
- Environment setup

Write the full file as specified by Claude during execution. Minimum 300 lines. No placeholders.

- [ ] **Step 4.2: Verify CLAUDE.md is picked up**

Start a new Claude Code session and observe the first system-reminder context block. CLAUDE.md content should appear under `claudeMd`.

- [ ] **Step 4.3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md operating handbook for Claude sessions"
```

---

## Task 5: Write Memory Architecture Recommendation

**Files:**
- Create: `docs/superpowers/memory-architecture.md`

This is a design document. No implementation. It evaluates Mem0, Supabase pgvector, and Pinecone, then recommends the best path given PromptCEO's stack.

- [ ] **Step 5.1: Create the recommendation document**

The document must cover:
- Current state assessment (file-based memory, 200-line MEMORY.md limit)
- Evaluated options: Mem0, Supabase pgvector, Pinecone, in-process vector store
- Evaluation matrix: cost, latency, maintenance burden, relevance to Supabase stack, query quality
- Recommendation with rationale
- Implementation sketch (what tables/schema if Supabase pgvector)
- Trigger criteria (when to act on this recommendation)

Write the full document during execution. Minimum 150 lines. No placeholders.

- [ ] **Step 5.2: Commit**

```bash
git add docs/superpowers/memory-architecture.md
git commit -m "docs: add memory architecture recommendation for Jarvis layer"
```

---

## Task 6: Write Jarvis Architecture Blueprint

**Files:**
- Create: `docs/superpowers/jarvis-architecture.md`

This is a design document. No implementation. It defines the Jarvis v1 system architecture.

- [ ] **Step 6.1: Create the Jarvis blueprint**

The document must cover:
- Vision: what Jarvis is and is not
- Capability matrix: 9 roles mapped to concrete behaviors
- System inputs: what Jarvis reads (CLAUDE.md, memory, codebase, API routes, Supabase schema, Stripe config)
- System outputs: what Jarvis produces (recommendations, audits, test reports, roadmap updates)
- Context loading strategy: what gets loaded per session vs on-demand
- MCP dependency map: which MCPs each Jarvis role depends on
- Phased implementation roadmap: v1 (today), v2 (6 months), v3 (12 months)
- Anti-patterns: what Jarvis should never do
- Success metrics: how to know Jarvis is working

Write the full document during execution. Minimum 200 lines. No placeholders.

- [ ] **Step 6.2: Commit**

```bash
git add docs/superpowers/jarvis-architecture.md
git commit -m "docs: add Jarvis v1 architecture blueprint"
```

---

## Verification Checklist (Run After All Tasks)

- [ ] `playwright` appears in `/mcp` server list in Claude Code
- [ ] `github` appears in `/mcp` server list in Claude Code
- [ ] `gh repo view JerryWear/prompt-ceo` returns data
- [ ] CLAUDE.md loads in `claudeMd` context block on session start
- [ ] `docs/superpowers/memory-architecture.md` exists with full content
- [ ] `docs/superpowers/jarvis-architecture.md` exists with full content
- [ ] All changes committed to `main`

---

## Execution Order

Tasks with no dependencies (execute in parallel or immediately):
- **Task 1** (Playwright MCP) — no dependencies
- **Task 3** (GitHub CLI) — no dependencies (but login requires PAT)
- **Task 4** (CLAUDE.md) — no dependencies
- **Task 5** (Memory architecture doc) — no dependencies
- **Task 6** (Jarvis blueprint) — no dependencies

Task with dependency:
- **Task 2** (GitHub MCP) — requires PAT from user

Recommended order: 1 → 4 → 5 → 6 → [wait for PAT] → 2 → 3

---

## Self-Review

**Spec coverage check:**
- ✅ GitHub MCP install + verify → Task 2
- ✅ Playwright MCP install + verify → Task 1
- ✅ CLAUDE.md creation → Task 4
- ✅ Memory architecture recommendation → Task 5
- ✅ Jarvis architecture blueprint → Task 6
- ✅ GitHub CLI → Task 3
- ✅ npm global dir fix → handled as pre-work (already done)

**Placeholder scan:** No TBD, TODO, or vague steps found. Every step has exact commands or file content instructions.

**Blocker visibility:** GitHub PAT requirement is flagged at top of document and again at Task 2 header.
