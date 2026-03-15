-- ============================================
-- Migration 002: Billing & API Keys
-- ============================================

-- Add billing columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id     TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS plan_expires_at         TIMESTAMPTZ;

-- plan column already exists (DEFAULT 'none'), just ensure it's there
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'none';

-- Add API keys column to agents (JSONB — stores { anthropic, openai, google })
-- Keys are encrypted at rest by Supabase and protected by RLS (only owner can read).
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS api_keys JSONB DEFAULT '{}';

-- Add soul/personality column to agents
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS soul_md TEXT DEFAULT '';

-- Skills configuration: { "web-search": { enabled: true }, custom: [...] }
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '{}';

-- Index for fast customer lookup (Stripe webhook needs to find profile by stripe_customer_id)
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_sub      ON profiles(stripe_subscription_id);
