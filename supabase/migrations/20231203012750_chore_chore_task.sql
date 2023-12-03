CREATE TABLE IF NOT EXISTS
  public.chore_chore_task (
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    chore_id UUID REFERENCES public.chore ON DELETE CASCADE,
    chore_task_id UUID REFERENCES public.chore_task ON DELETE CASCADE,
    PRIMARY KEY (chore_id, chore_task_id)
  );

ALTER TABLE public.chore_chore_task OWNER TO postgres;