CREATE TABLE IF NOT EXISTS
  public.group_chore_set (
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    group_id UUID REFERENCES public.group ON DELETE CASCADE,
    chore_set_id UUID REFERENCES public.chore_set ON DELETE CASCADE,
    PRIMARY KEY (group_id, chore_set_id)
  );

ALTER TABLE public.group_chore_set OWNER TO postgres;