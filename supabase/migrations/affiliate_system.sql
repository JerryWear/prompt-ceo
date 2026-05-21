-- Affiliate system

-- 1. Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name                text NOT NULL,
  email               text NOT NULL UNIQUE,
  platform            text,
  audience_size       text,
  message             text,
  referral_code       text NOT NULL UNIQUE,
  status              text NOT NULL DEFAULT 'pending', -- pending | approved | rejected | suspended
  tier                text NOT NULL DEFAULT 'partner', -- partner | pro_partner | elite_partner
  commission_rate     numeric(4,2) NOT NULL DEFAULT 30.00,
  total_clicks        integer NOT NULL DEFAULT 0,
  total_signups       integer NOT NULL DEFAULT 0,
  total_active        integer NOT NULL DEFAULT 0,
  total_earned        numeric(10,2) NOT NULL DEFAULT 0,
  total_paid          numeric(10,2) NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  approved_at         timestamptz,
  notes               text
);

-- 2. Referral clicks/signups tracking
CREATE TABLE IF NOT EXISTS affiliate_referrals (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id    uuid NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code   text NOT NULL,
  event_type      text NOT NULL, -- click | signup | subscription
  ip_address      text,
  user_agent      text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- 3. Commissions per invoice
CREATE TABLE IF NOT EXISTS affiliate_commissions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id    uuid NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id uuid NOT NULL,
  stripe_invoice_id text UNIQUE,
  amount_charged  numeric(10,2) NOT NULL,
  commission_rate numeric(4,2) NOT NULL,
  commission_amount numeric(10,2) NOT NULL,
  status          text NOT NULL DEFAULT 'pending', -- pending | approved | paid
  period_start    timestamptz,
  period_end      timestamptz,
  paid_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- 4. Add referral_code to app_users so we know who referred them
ALTER TABLE app_users
  ADD COLUMN IF NOT EXISTS referred_by_code text,
  ADD COLUMN IF NOT EXISTS referred_by_affiliate_id uuid;

-- 5. Indexes
CREATE INDEX IF NOT EXISTS affiliates_referral_code_idx ON affiliates (referral_code);
CREATE INDEX IF NOT EXISTS affiliates_email_idx ON affiliates (email);
CREATE INDEX IF NOT EXISTS affiliates_status_idx ON affiliates (status);
CREATE INDEX IF NOT EXISTS affiliate_referrals_affiliate_id_idx ON affiliate_referrals (affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_commissions_affiliate_id_idx ON affiliate_commissions (affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_commissions_status_idx ON affiliate_commissions (status);
