-- CREATE TABLE IF NOT EXISTS
--   public.chore_chore_subtask (
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
--     chore_id UUID REFERENCES public.chore ON DELETE CASCADE,
--     chore_subtask_id UUID REFERENCES public.chore_subtask ON DELETE CASCADE,
--     PRIMARY KEY (chore_id, chore_subtask_id)
--   );

-- ALTER TABLE public.chore_chore_subtask OWNER TO postgres;