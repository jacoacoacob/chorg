import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase-client";
import { makeListFetcher, makeSingleFetcher } from "@/utils/fetcher";
import { assertAuthenticated } from "@/utils/assert-authenticated";

type GroupList = Awaited<ReturnType<typeof fetchGroupList>>;
type GroupDetail = Awaited<ReturnType<typeof fetchGroupDetail>>;
type GroupListSortKey = keyof Pick<GroupList[number], "display_name" | "created_at">;

const fetchGroupList = makeListFetcher(async () => supabase.from("group").select(`
    id,
    display_name,
    created_at,
    owned_by
`));

const fetchGroupDetail = makeSingleFetcher(async (groupId: string) => supabase
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

const fetchCreateGroupMember = makeSingleFetcher(
    async (groupId: string, userId: string) => supabase
        .from("group_member")
        .insert({ group_id: groupId, user_id: userId })
);

const fetchCreateGroup = makeSingleFetcher(
    async (displayName: string) => supabase
        .from("group")
        .insert({ display_name: displayName })
        .select()
        .single()
);

const fetchUpdateGroupDisplayName = makeSingleFetcher(
    async (groupId: string, displayName: string) => supabase
        .from("group")
        .update({ display_name: displayName })
        .eq("id", groupId)
        .select()
);

const fetchDeleteGroup = makeSingleFetcher(
    async (groupId: string) => supabase.from("group").delete().eq("id", groupId)
);

const useGroups = defineStore("groups", () => {
    const groupDetailDict = ref<Record<string, GroupDetail>>({});

    const groupListDict = ref<Record<string, GroupList[number]>>({});
    
    const sortedBy = ref<GroupListSortKey>("display_name");
    const sortDirection = ref<"asc" | "desc">("desc");

    const groupList = computed(() => 
        Object.keys(groupListDict.value)
            .sort((a, b) => {
                if (sortedBy.value === "created_at") {
                    const aCreatedAt = new Date(groupListDict.value[a].created_at).getTime();
                    const bCreatedAt = new Date(groupListDict.value[b].created_at).getTime();
                    if (sortDirection.value === "desc") {
                        return bCreatedAt - aCreatedAt;
                    }
                    return aCreatedAt - bCreatedAt;
                }
                if (sortedBy.value === "display_name") {
                    const aDisplayName = groupListDict.value[a].display_name ?? "";
                    const bDisplayName = groupListDict.value[b].display_name ?? "";
                    if (sortDirection.value === "desc") {
                        return aDisplayName < bDisplayName ? -1 : aDisplayName > bDisplayName ? 1 : 0
                    }
                    return aDisplayName > bDisplayName ? -1 : aDisplayName < bDisplayName ? 1 : 0
                }
                return 0;
            })
            .map((groupId) => groupListDict.value[groupId])
    );

    async function refreshGroupList() {
        try {
            assertAuthenticated();

            const groupList = await fetchGroupList();

            groupListDict.value = Object.fromEntries(groupList.map((group) => [group.id, group]));
        } catch (error) {
            console.error("[refreshGroupList]", error);
        }
    }

    async function refreshGroupDetail(groupId: string) {
        try {
            assertAuthenticated();

            groupDetailDict.value[groupId] = await fetchGroupDetail(groupId);
        } catch (error) {
            console.error("[refreshGroupDetail]", error);
        }
    }

    async function createGroup(displayName: string) {
        try {
            const user = assertAuthenticated();

            const group = await fetchCreateGroup(displayName);

            await fetchCreateGroupMember(group.id, user.id);

            await refreshGroupList();
        } catch (error) {
            throw error;
        }
    }

    async function updateGroupDisplayName(groupId: string, displayName: string) {
        try {
            assertAuthenticated();
            await fetchUpdateGroupDisplayName(groupId, displayName);
            await refreshGroupDetail(groupId);
        } catch (error) {
            throw error;
        }
    }

    async function deleteGroup(groupId: string) {
        try {
            assertAuthenticated();
            await fetchDeleteGroup(groupId);
            await refreshGroupList();
        } catch (error) {
            throw error;
        }
    }

    return { createGroup, refreshGroupList, refreshGroupDetail, deleteGroup, updateGroupDisplayName, groupList, groupListDict, groupDetailDict };
});

export { useGroups };
export type { GroupDetail };
