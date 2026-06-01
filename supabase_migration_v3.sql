-- ============================================================
-- QUINIELA CONTRA - Migration v3: Join Requests
-- Idempotent: safe to run multiple times
-- ============================================================

-- 0. DROP EXISTING (safe if table doesn't exist yet)
-- ============================================================
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tbl_group_join_requests') THEN
        DROP POLICY IF EXISTS "join_requests_select" ON public.tbl_group_join_requests;
        DROP POLICY IF EXISTS "join_requests_insert" ON public.tbl_group_join_requests;
        DROP POLICY IF EXISTS "join_requests_update" ON public.tbl_group_join_requests;
        DROP POLICY IF EXISTS "join_requests_delete" ON public.tbl_group_join_requests;
    END IF;
END $$;

-- 1. NEW TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tbl_group_join_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES tbl_groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (group_id, user_id)
);

-- 2. RLS
-- ============================================================
ALTER TABLE public.tbl_group_join_requests ENABLE ROW LEVEL SECURITY;

-- SELECT: el propio usuario o admins del grupo
CREATE POLICY "join_requests_select" ON public.tbl_group_join_requests
    FOR SELECT TO authenticated USING (
        user_id = auth.uid()
        OR group_id IN (
            SELECT id FROM tbl_groups WHERE created_by = auth.uid()
        )
    );

-- INSERT: cualquier autenticado (con unique constraint evita duplicados)
CREATE POLICY "join_requests_insert" ON public.tbl_group_join_requests
    FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- UPDATE: solo admins del grupo pueden cambiar status
CREATE POLICY "join_requests_update" ON public.tbl_group_join_requests
    FOR UPDATE TO authenticated
    USING (group_id IN (SELECT id FROM tbl_groups WHERE created_by = auth.uid()))
    WITH CHECK (group_id IN (SELECT id FROM tbl_groups WHERE created_by = auth.uid()));

-- DELETE: solo admins del grupo
CREATE POLICY "join_requests_delete" ON public.tbl_group_join_requests
    FOR DELETE TO authenticated
    USING (group_id IN (SELECT id FROM tbl_groups WHERE created_by = auth.uid()));

-- 3. GRANTS
-- ============================================================
GRANT ALL ON TABLE public.tbl_group_join_requests TO anon;
GRANT ALL ON TABLE public.tbl_group_join_requests TO authenticated;
GRANT ALL ON TABLE public.tbl_group_join_requests TO service_role;
