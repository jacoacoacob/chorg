CREATE TABLE
    public.group_member (
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        user_id UUID REFERENCES public.profiles (id),
        group_id UUID REFERENCES public.group (id),
        PRIMARY KEY (user_id, group_id)
    );
