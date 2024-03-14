import { supabase } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";

type GroupList = Awaited<ReturnType<typeof fetchGroupList>>;
type GroupDetail = Awaited<ReturnType<typeof fetchGroupDetail>>;

const fetchGroupList = makeFetcher(async () => supabase.from("group").select(`
    id,
    display_name,
    created_at,
    owned_by
`));

const fetchGroupDetail = makeFetcher(async (groupId: string) => supabase
    .from("group")
    .select(`
        id,
        display_name,
        created_at,
        owned_by,
        members:user_profile (
            id,
            username
        ),
        charts:chart(*),
        chore_sets:chore_set(*)
    `)
    .eq("id", groupId)
    .single()
);

const fetchCreateGroup = makeFetcher(
    async (displayName: string) => supabase
        .from("group")
        .insert({ display_name: displayName })
        .select()
        .single()
);

const fetchUpdateGroupDisplayName = makeFetcher(
    async (groupId: string, displayName: string) => supabase
        .from("group")
        .update({ display_name: displayName })
        .eq("id", groupId)
        .select()
);

const fetchDeleteGroup = makeFetcher(
    async (groupId: string) => supabase.from("group").delete().eq("id", groupId)
);

export {
    fetchGroupDetail,
    fetchCreateGroup,
    fetchDeleteGroup,
    fetchGroupList,
    fetchUpdateGroupDisplayName,
};
export type { GroupDetail, GroupList };
