-- ============================================================
-- QUINIELA CONTRA - Migration v2: Groups
-- Idempotent: safe to run multiple times
-- ============================================================

-- 0. DROP EXISTING (safe cleanup)
-- ============================================================
DROP FUNCTION IF EXISTS public.get_group_rankings(UUID) CASCADE;

DROP POLICY IF EXISTS "groups_select" ON public.tbl_groups;
DROP POLICY IF EXISTS "groups_insert" ON public.tbl_groups;
DROP POLICY IF EXISTS "groups_update" ON public.tbl_groups;
DROP POLICY IF EXISTS "groups_delete" ON public.tbl_groups;

DROP POLICY IF EXISTS "group_members_select" ON public.tbl_group_members;
DROP POLICY IF EXISTS "group_members_insert" ON public.tbl_group_members;
DROP POLICY IF EXISTS "group_members_update" ON public.tbl_group_members;
DROP POLICY IF EXISTS "group_members_delete" ON public.tbl_group_members;

-- 1. NEW TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.tbl_groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    invite_code TEXT UNIQUE NOT NULL,
    competition_id INTEGER,
    competition_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tbl_group_members (
    group_id UUID REFERENCES tbl_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (group_id, user_id)
);

-- 2. ALTER EXISTING TABLES
-- ============================================================

ALTER TABLE public.tbl_predictions
ADD COLUMN IF NOT EXISTS competition_id INTEGER,
ADD COLUMN IF NOT EXISTS competition_name TEXT;

-- 3. FUNCTION: get_group_rankings
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_group_rankings(group_id_param UUID)
RETURNS TABLE(id_user UUID, name TEXT, url_image TEXT, total_points BIGINT)
LANGUAGE plpgsql SECURITY INVOKER
AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.name, u.url_image,
           COALESCE(CAST(SUM(p.points) AS BIGINT), 0) AS total_points
    FROM tbl_group_members gm
    JOIN tbl_users u ON u.id = gm.user_id
    LEFT JOIN tbl_predictions p ON p.id_user = gm.user_id
        AND p.created_at >= gm.joined_at
    WHERE gm.group_id = group_id_param
    GROUP BY u.id, u.name, u.url_image
    ORDER BY total_points DESC;
END;
$$;

-- 4. RLS
-- ============================================================

ALTER TABLE public.tbl_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tbl_group_members ENABLE ROW LEVEL SECURITY;

-- tbl_groups policies
CREATE POLICY "groups_select" ON public.tbl_groups
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "groups_insert" ON public.tbl_groups
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

CREATE POLICY "groups_update" ON public.tbl_groups
    FOR UPDATE TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "groups_delete" ON public.tbl_groups
    FOR DELETE TO authenticated
    USING (auth.uid() = created_by);

-- tbl_group_members policies
-- SELECT: cualquier autenticado puede leer (el detail page filtra por membresía aparte)
CREATE POLICY "group_members_select" ON public.tbl_group_members
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "group_members_insert" ON public.tbl_group_members
    FOR INSERT TO authenticated WITH CHECK (true);

-- UPDATE/DELETE: el propio usuario o el creador del grupo (admin vía tbl_groups)
CREATE POLICY "group_members_update" ON public.tbl_group_members
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR group_id IN (
        SELECT id FROM tbl_groups WHERE created_by = auth.uid()
    ))
    WITH CHECK (user_id = auth.uid() OR group_id IN (
        SELECT id FROM tbl_groups WHERE created_by = auth.uid()
    ));

CREATE POLICY "group_members_delete" ON public.tbl_group_members
    FOR DELETE TO authenticated
    USING (user_id = auth.uid() OR group_id IN (
        SELECT id FROM tbl_groups WHERE created_by = auth.uid()
    ));

-- 5. GRANTS
-- ============================================================

GRANT ALL ON TABLE public.tbl_groups TO anon;
GRANT ALL ON TABLE public.tbl_groups TO authenticated;
GRANT ALL ON TABLE public.tbl_groups TO service_role;

GRANT ALL ON TABLE public.tbl_group_members TO anon;
GRANT ALL ON TABLE public.tbl_group_members TO authenticated;
GRANT ALL ON TABLE public.tbl_group_members TO service_role;

GRANT ALL ON FUNCTION public.get_group_rankings(UUID) TO anon;
GRANT ALL ON FUNCTION public.get_group_rankings(UUID) TO authenticated;
GRANT ALL ON FUNCTION public.get_group_rankings(UUID) TO service_role;
