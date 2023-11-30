ALTER TABLE public.group ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable read access for group members and owner" ON public.group FOR
SELECT
    USING (
        id IN (
            SELECT
                gm.group_id
            FROM
                public.group_member gm
            WHERE
                gm.user_id = auth.uid ()
                OR auth.uid () = created_by
        )
    );


CREATE POLICY "Enable insert for authenticated users only" ON public.group FOR INSERT TO authenticated
WITH
    CHECK (TRUE);


CREATE POLICY "Enable update for group members" ON public.group FOR
UPDATE USING (
    id IN (
        SELECT
            gm.group_id
        FROM
            public.group_member gm
        WHERE
            gm.user_id = auth.uid ()
    )
)
WITH
    CHECK (
        id IN (
            SELECT
                gm.group_id
            FROM
                public.group_member gm
            WHERE
                gm.user_id = auth.uid ()
        )
    );


CREATE POLICY "Enable delete for group owners" ON public.group FOR DELETE USING (auth.uid () = created_by);