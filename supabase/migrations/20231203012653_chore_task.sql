CREATE TABLE IF NOT EXISTS public.chore_task (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  owned_by UUID REFERENCES auth.users ON DELETE RESTRICT DEFAULT auth.uid(),
  description TEXT
);

ALTER TABLE public.chore_task OWNER TO postgres;
