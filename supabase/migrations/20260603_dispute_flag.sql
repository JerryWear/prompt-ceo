-- Add dispute_flag to app_users
-- Required by Stripe charge.dispute.created webhook handler
-- Flags accounts under active chargeback for manual review

ALTER TABLE app_users
ADD COLUMN IF NOT EXISTS dispute_flag boolean DEFAULT false;
