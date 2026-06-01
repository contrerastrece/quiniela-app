-- ============================================================
-- QUINIELA CONTRA - Migration v4: Group Password
-- Idempotent: safe to run multiple times
-- ============================================================

ALTER TABLE public.tbl_groups ADD COLUMN IF NOT EXISTS password TEXT;
