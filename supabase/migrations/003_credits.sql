-- ============================================
-- Migration 003: Credits System
-- For Managed plan: $20/mo Claude API credits
-- ============================================

-- Add credits balance to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS credits_balance       NUMERIC(10,4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS credits_total_added   NUMERIC(10,4) DEFAULT 0;

-- Credits transaction ledger
-- type: 'monthly_grant' | 'top_up' | 'usage'
-- amount: positive = credits added, negative = credits consumed
CREATE TABLE IF NOT EXISTS credits_transactions (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount       NUMERIC(10,4) NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('monthly_grant', 'top_up', 'usage')),
  description  TEXT,
  agent_id     TEXT REFERENCES agents(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE credits_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own credit transactions" ON credits_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_credits_user_id ON credits_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credits_created  ON credits_transactions(created_at DESC);

-- ── Helper function: add credits atomically ──────────────────────────────────
-- Called by Stripe webhook (server-side with admin key, bypasses RLS)
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id    UUID,
  p_amount     NUMERIC,
  p_type       TEXT,
  p_description TEXT DEFAULT NULL,
  p_agent_id   TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insert ledger row
  INSERT INTO credits_transactions(user_id, amount, type, description, agent_id)
  VALUES (p_user_id, p_amount, p_type, p_description, p_agent_id);

  -- Update balance
  UPDATE profiles
  SET
    credits_balance     = credits_balance + p_amount,
    credits_total_added = CASE WHEN p_amount > 0 THEN credits_total_added + p_amount ELSE credits_total_added END
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
