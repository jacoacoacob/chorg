CREATE TABLE IF NOT EXISTS
  public.chore_set_chore (
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    chore_set_id UUID REFERENCES public.chore_set ON DELETE CASCADE,
    chore_id UUID REFERENCES public.chore ON DELETE CASCADE,
    PRIMARY KEY (chore_set_id, chore_id)
  );

ALTER TABLE public.chore_set_chore OWNER TO postgres;
