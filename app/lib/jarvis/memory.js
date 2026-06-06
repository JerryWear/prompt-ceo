import { createClient } from '@supabase/supabase-js'

const EMBEDDING_MODEL = 'text-embedding-3-small'

function makeAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Generate an embedding vector for a text string.
// Returns null if OpenAI is unavailable — callers degrade gracefully.
export async function embedText(text) {
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: text.slice(0, 8000),
        model: EMBEDDING_MODEL,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.data?.[0]?.embedding ?? null
  } catch {
    return null
  }
}

// Write a memory to jarvis_memory. Embeds the content for semantic retrieval.
export async function writeMemory({ userId, memoryType, content, metadata = {}, importance = 1.0, expiresAt = null }) {
  const admin     = makeAdmin()
  const embedding = await embedText(content)

  const { data, error } = await admin
    .from('jarvis_memory')
    .insert({
      user_id:     userId,
      memory_type: memoryType,
      content,
      embedding,   // null if embedding failed — row still written, recalled by recency
      metadata,
      importance,
      expires_at:  expiresAt,
    })
    .select('id')
    .single()

  if (error) throw new Error(`Memory write failed: ${error.message}`)
  return data.id
}

// Semantic recall: finds most relevant memories for a query.
// Falls back to recency order if pgvector is unavailable.
export async function recallMemory({ userId, query, topK = 10, threshold = 0.60, memoryType = null }) {
  const admin     = makeAdmin()
  const embedding = await embedText(query)

  if (embedding) {
    const { data, error } = await admin.rpc('match_jarvis_memory', {
      p_user_id:     userId,
      p_embedding:   embedding,
      p_match_count: topK,
      p_threshold:   threshold,
      p_memory_type: memoryType ?? null,
    })
    if (!error && data?.length > 0) return data
  }

  // Recency fallback
  let q = admin
    .from('jarvis_memory')
    .select('id, memory_type, content, metadata, importance, created_at')
    .eq('user_id', userId)
    .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
    .order('importance', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(topK)

  if (memoryType) q = q.eq('memory_type', memoryType)

  const { data } = await q
  return data || []
}

// Pull the N highest-importance memories for context injection.
export async function getTopMemories(userId, limit = 20) {
  const admin = makeAdmin()
  const { data } = await admin
    .from('jarvis_memory')
    .select('id, memory_type, content, metadata, importance, created_at')
    .eq('user_id', userId)
    .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
    .order('importance', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  return data || []
}

// Update importance of a memory (Jarvis can promote memories that prove useful).
export async function boostMemory(memoryId, newImportance) {
  const admin = makeAdmin()
  await admin
    .from('jarvis_memory')
    .update({ importance: newImportance })
    .eq('id', memoryId)
}
