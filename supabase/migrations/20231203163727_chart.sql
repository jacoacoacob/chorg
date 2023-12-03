CREATE TABLE IF NOT EXISTS
  public.chart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    owned_by UUID REFERENCES auth.users ON DELETE RESTRICT DEFAULT auth.uid (),
    group_id UUID REFERENCES public.group ON DELETE RESTRICT,
    chore_set_id UUID REFERENCES public.chore_set ON DELETE RESTRICT
  );

ALTER TABLE public.chart OWNER TO postgres;