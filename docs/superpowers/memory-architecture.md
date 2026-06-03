# PromptCEO Memory Architecture Recommendation

**Date:** 2026-06-03
**Status:** Design only — no implementation
**Author:** Claude Code (Infrastructure Audit Phase)

---

## Current State

PromptCEO's AI memory operates at two levels:

### Level 1 — Claude Code Development Memory (Meta-Layer)
File-based auto-memory at `~/.claude/projects/.../memory/`. Stores product decisions, architecture choices, roadmap state. Indexed by `MEMORY.md` (200-line hard limit before truncation).

**Current size:** 14 memory files, ~40 lines in MEMORY.md index.
**Time to limit:** Estimated 6–9 months at current pace.
**Failure mode:** MEMORY.md truncates silently. Old memories stop loading. Claude loses architectural context without warning.

### Level 2 — PromptCEO Runtime Memory (Product Layer)
User-facing persistent memory stored in Supabase. Powers:
- OS Memory (`os_memory` table) — cross-session user context
- Project Brain — per-project intelligence
- Performance Memory — what worked in past campaigns
- Campaign Brain — in-session state

**Current mechanism:** OpenAI text generation writes structured JSON blobs to Supabase. No semantic retrieval. Retrieval is recency-based (`ORDER BY created_at DESC LIMIT N`).

**Failure mode at scale:** As a user's `os_memory` grows to hundreds of entries, recency-based retrieval returns irrelevant context. The AI's working memory becomes noisy, not helpful.

---

## The Core Problem

Both memory layers use **proximity-based retrieval** (recency, or file index position). This works at small scale. It breaks at medium scale because:

1. A memory from 6 months ago about brand voice is more relevant than a memory from yesterday about image style — but recency puts yesterday first.
2. MEMORY.md can't grow past 200 lines without Claude losing context.
3. There is no way to ask "what do I know about this user's campaign strategy?" — only "give me the last N records."

The solution is **semantic retrieval**: find memories by meaning, not by time.

---

## Evaluated Options

### Option 1: Supabase pgvector

Supabase supports `pgvector` natively. This adds a `vector(1536)` column to existing tables and enables cosine similarity search via SQL.

**How it works:**
```sql
-- When storing a memory:
INSERT INTO os_memory (user_id, content, embedding) 
VALUES ($1, $2, $3::vector);  -- embedding generated via OpenAI text-embedding-3-small

-- When retrieving:
SELECT content, 1 - (embedding <=> $query_embedding) AS similarity
FROM os_memory
WHERE user_id = $user_id
ORDER BY similarity DESC
LIMIT 10;
```

**Pros:**
- Already using Supabase — zero new infrastructure
- Same auth/RLS model as the rest of the app
- Cost: free at current Supabase tier, pay per query at scale
- Supabase has `vecs` Python client and JS client support
- Keeps all data in one system (no sync complexity)

**Cons:**
- Requires `pgvector` extension enabled on the Supabase project
- Need to generate embeddings before writes (adds latency to memory writes)
- Embedding generation costs tokens (OpenAI `text-embedding-3-small`: $0.02/1M tokens — negligible)

**Verdict: Recommended for the product memory layer (Level 2).**

---

### Option 2: Pinecone

Dedicated vector database. Best-in-class similarity search performance.

**How it works:**
```javascript
// Store
await index.upsert([{ id: memoryId, values: embedding, metadata: { userId, content } }]);

// Query
const results = await index.query({ vector: queryEmbedding, topK: 10, filter: { userId } });
```

**Pros:**
- Industry-leading vector search performance
- Scales to billions of vectors
- Rich filtering API
- Managed, no infrastructure

**Cons:**
- **New infrastructure** — adds another vendor, another API key, another billing account
- Data lives outside Supabase — breaks the "one source of truth" model
- Sync complexity: if a user deletes their account, must also clean Pinecone
- Overkill for PromptCEO's current scale (thousands of users, not millions)
- Starter tier is free but has a 2GB limit — paid tier starts at ~$70/month

**Verdict: Skip for now. Revisit if PromptCEO scales to 50K+ active users with dense memory stores.**

---

### Option 3: Mem0

An open-source memory layer specifically designed for AI applications. Provides a managed API that handles embeddings, storage, and retrieval behind a simple interface.

**How it works:**
```javascript
import { Memory } from 'mem0ai';
const memory = new Memory();

// Store
await memory.add("User prefers bold visual styles", { user_id: userId });

// Query
const results = await memory.search("what does this user prefer visually?", { user_id: userId });
```

**Pros:**
- Simplest developer experience
- Handles embedding generation internally
- Has a managed cloud tier
- Designed for exactly this use case

**Cons:**
- **Another vendor** — data leaves your Supabase instance
- Managed cloud tier pricing not fixed (usage-based, unclear at scale)
- Less control over the embedding model, chunking strategy, or retrieval logic
- Open-source self-hosted version requires running a separate service
- No existing Supabase integration — data silos immediately

**Verdict: Promising for prototyping, not for production at PromptCEO's architecture.**

---

### Option 4: In-Process Vector Store (LangChain / custom)

Build a lightweight vector store that lives in Next.js API routes using `@xenova/transformers` for local embeddings.

**How it works:** Embeddings generated server-side, stored in Supabase as JSONB arrays. Query via cosine similarity in application code.

**Pros:** Zero cost, full control.

**Cons:** Slow (JSONB array scan is O(n)), doesn't scale, CPU-intensive on serverless functions (Vercel has 10s timeout), not production-appropriate.

**Verdict: Reject. This is a prototype approach that becomes a production liability.**

---

## Recommendation

### For Level 2 (Product Memory — immediate medium-term need)

**Use Supabase pgvector.**

It is already in the stack. Zero new vendors. The migration is additive (add a column, add an endpoint). The embedding generation is cheap and adds ~100ms to memory writes. The semantic retrieval will immediately improve the quality of context the AI Director and OS Memory inject into prompts.

**Schema change required:**
```sql
-- Enable pgvector (run once in Supabase SQL editor)
create extension if not exists vector;

-- Add embedding column to os_memory
alter table os_memory add column embedding vector(1536);

-- Create HNSW index for fast approximate nearest neighbor search
create index on os_memory using hnsw (embedding vector_cosine_ops);
```

**Application change required:**
- Before writing to `os_memory`, call OpenAI `text-embedding-3-small` on the content
- Store the returned vector in the `embedding` column
- Change retrieval from `ORDER BY created_at DESC` to cosine similarity query with recency as a secondary sort

**Estimated implementation time:** 4–6 hours including testing.

### For Level 1 (Claude Code Development Memory — future need)

The MEMORY.md 200-line limit is not a crisis today (14 entries). When approaching 100 entries, evaluate:
1. Restructuring MEMORY.md by priority (keep the 50 most critical, archive the rest)
2. Moving architecture documentation into `CLAUDE.md` (already done — this reduces memory load)
3. At 150+ entries: implement a separate `MEMORY-ARCHIVE.md` for historical entries

This does not require pgvector or any external service. It is a curation discipline problem, not a technology problem.

---

## Implementation Trigger Criteria

Do not implement pgvector until **any** of these is true:
- Average `os_memory` rows per active user exceeds 100
- Users report that AI recommendations feel "generic" or "like it forgot what I told it"
- Campaign Brain context injection causes prompt length to exceed GPT-4o's effective context window
- Edit Studio or Music Studio recommendations stop being personalized

Estimated trigger: **3–6 months** at current growth rate.

---

## Migration Path (When Ready)

1. Enable `pgvector` extension in Supabase
2. Add `embedding vector(1536)` column to `os_memory`, `brand_profiles`, `performance_logs`
3. Backfill embeddings for existing rows (batch job via Supabase Edge Function)
4. Update `app/api/os-memory/write/route.js` to generate and store embeddings on write
5. Update `app/api/os-memory/recent/route.js` to accept an optional `query` parameter for semantic search
6. Update AI Director context injection to use semantic retrieval when `query` is present
7. A/B test: compare response quality with semantic vs recency retrieval for 2 weeks
8. Roll out fully if quality metrics improve
