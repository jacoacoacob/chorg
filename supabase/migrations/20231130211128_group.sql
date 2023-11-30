CREATE TABLE
    public.group (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        created_by UUID REFERENCES auth.users ON DELETE CASCADE,
        display_name TEXT
    );