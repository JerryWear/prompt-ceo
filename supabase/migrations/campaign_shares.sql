-- ─────────────────────────────────────────────────────────────
-- Campaign Shares — Client Approval System
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

create table if not exists public.campaign_shares (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  token          text not null unique default encode(gen_random_bytes(12), 'hex'),
  share_name     text,
  product_name   text,
  platform       text,
  campaign_goal  text,
  outputs        jsonb,
  adconfig       jsonb,
  status         text default 'pending',  -- 'pending' | 'approved' | 'revision_requested'
  client_comment text,
  client_name    text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table public.campaign_shares enable row level security;

-- Users manage their own shares
create policy "Users manage own shares"
  on public.campaign_shares for all
  using (auth.uid() = user_id);

-- Public read by token — no auth needed for client review page
create policy "Public read shares by token"
  on public.campaign_shares for select
  using (true);

-- Public update for client approval (no auth)
create policy "Public update share status"
  on public.campaign_shares for update
  using (true)
  with check (true);
