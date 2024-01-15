CREATE TABLE IF NOT EXISTS
  public.chore (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    owned_by UUID REFERENCES auth.users ON DELETE RESTRICT DEFAULT auth.uid (),
    title TEXT NOT NULL CONSTRAINT chore_title_chk CHECK (
      char_length(title) >= 1
    ),
    description TEXT
  );

ALTER TABLE public.chore OWNER TO postgres;