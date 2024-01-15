CREATE TABLE IF NOT EXISTS public.chart_completion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  chart_id UUID REFERENCES public.chart ON DELETE CASCADE,
  chore_id UUID REFERENCES public.chore ON DELETE CASCADE,
  owned_by UUID REFERENCES auth.users ON DELETE CASCADE DEFAULT auth.uid()
);

ALTER TABLE public.chart_completion OWNER TO postgres;