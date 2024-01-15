CREATE TABLE IF NOT EXISTS
  public.chart_chore_set (
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    chore_set_id UUID REFERENCES public.chore_set ON DELETE CASCADE,
    chart_id UUID REFERENCES public.chart ON DELETE CASCADE,
    PRIMARY KEY (chore_set_id, chart_id)
  );

ALTER TABLE public.chart_chore_set OWNER TO postgres;
