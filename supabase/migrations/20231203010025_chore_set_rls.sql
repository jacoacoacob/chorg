ALTER TABLE public.chore_set ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for everyone" ON public.chore_set FOR
SELECT
  USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON public.chore_set FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable update for owner" ON public.chore_set FOR
UPDATE USING (auth.uid () = owned_by)
WITH
  CHECK (auth.uid () = owned_by);

CREATE POLICY "Enable delete for owners" ON public.chore_set FOR DELETE USING (auth.uid () = owned_by OR owned_by IS NULL);