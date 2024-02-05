CREATE TABLE IF NOT EXISTS
  public.chore_set (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    group_id UUID NOT NULL REFERENCES public.group ON DELETE CASCADE,
    owned_by UUID REFERENCES auth.users ON DELETE RESTRICT DEFAULT auth.uid (),
    display_name TEXT NOT NULL,
    UNIQUE (id, display_name)
  );

ALTER TABLE public.chore_set OWNER TO postgres;