ALTER TABLE public.group_member ENABLE ROW LEVEL SECURITY;

-- See https://github.com/orgs/supabase/discussions/3328
CREATE FUNCTION is_group_member (_user_id UUID, _group_id UUID) RETURNS bool AS $$
SELECT EXISTS (
  SELECT 1
  FROM group_member gm
  WHERE gm.group_id = _group_id
  AND gm.user_id = _user_id
);
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE FUNCTION is_group_owner (_user_id UUID, _group_id UUID) RETURNS bool AS $$
SELECT EXISTS (
  SELECT 1
  FROM public.group g
  WHERE g.id = _group_id AND g.owned_by = _user_id
)
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE POLICY "Enable read access for group members only" ON public.group_member FOR
SELECT
  USING (
    is_group_member (auth.uid (), group_id)
    OR auth.uid () = user_id
  );

CREATE POLICY "Enable insert for group members only" ON public.group_member FOR INSERT
WITH
  CHECK (
    is_group_member (auth.uid (), group_id)
    OR is_group_owner (auth.uid (), group_id)
  );

CREATE POLICY "Enable delete for group owner only" ON public.group_member FOR DELETE USING (is_group_owner (auth.uid (), group_id));