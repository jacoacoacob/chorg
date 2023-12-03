CREATE TABLE IF NOT EXISTS
  public.group_member (
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES public.profiles ON DELETE CASCADE,
    group_id UUID REFERENCES public.group ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
  );

ALTER TABLE public.group_member OWNER TO postgres;
