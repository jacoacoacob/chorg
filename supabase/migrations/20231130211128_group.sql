CREATE TABLE IF NOT EXISTS
  public.group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    owned_by UUID REFERENCES auth.users ON DELETE RESTRICT DEFAULT auth.uid(),
    display_name TEXT
  );

ALTER TABLE public.group OWNER TO postgres;