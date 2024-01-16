ALTER TABLE public.chore ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access to owners and members of groups where the chore included in a chore_set" ON public.chore FOR
SELECT
  USING (
    id IN (
      SELECT
        csc.chore_id
      FROM
        public.chore_set_chore csc
        JOIN public.chore_set cs ON csc.chore_set_id = cs.id
        JOIN public.group_chore_set gcs ON gcs.chore_set_id = cs.id
        JOIN public.group_member gm ON gm.group_id = gcs.group_id
      WHERE
        gm.user_id = auth.uid ()
    )
    OR auth.uid () = owned_by
  );

CREATE POLICY "Enable insert for authenticated users only" ON public.chore FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable update for owner" ON public.chore FOR
UPDATE USING (auth.uid () = owned_by)
WITH
  CHECK (auth.uid () = owned_by);

CREATE POLICY "Enable delete for owners" ON public.chore FOR DELETE USING (
  auth.uid () = owned_by
  OR owned_by IS NULL
);