-- Migration 005: notification preferences
-- Adds notification preference columns to profiles table

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS notif_weekly_digest BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS notif_agent_down    BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS notif_billing       BOOLEAN DEFAULT true;
