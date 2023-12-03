ALTER TABLE public.chore ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for everyone" ON public.chore FOR
SELECT
  USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON public.chore FOR INSERT TO authenticated
WITH
  CHECK (TRUE);

CREATE POLICY "Enable update for owner" ON public.chore FOR
UPDATE USING (auth.uid () = owned_by)
WITH
  CHECK (auth.uid () = owned_by);

CREATE POLICY "Enable delete for owners" ON public.chore FOR DELETE USING (auth.uid () = owned_by OR owned_by IS NULL);