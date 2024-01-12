import { defineStore } from "pinia";
import { supabase } from "@/supabase-client";
import { useAuth } from "./auth.store";
import { ref } from "vue";
import { makeListFetcher, makeSingleFetcher } from "@/utils/fetcher";
import { assertAuthenticated } from "@/utils/assert-authenticated";

type GroupList = Awaited<ReturnType<typeof fetchGroupList>>;

const fetchGroupList = makeListFetcher(async () => supabase.from("group").select(`
    id,
    display_name,
    owned_by,
    members:user_profile (
        id,
        username
    )  
`));

const fetchGroupDetail = makeSingleFetcher(async (groupId: string) => supabase
    .from("group")
    .select(`
        id,
        display_name,
        owned_by,
        members:user_profile (
            id,
            username
        )
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

const useGroups = defineStore("groups", () => {

    const groupList = ref<GroupList>([]);

    const auth = useAuth();

    async function refreshGroupList() {
        try {
            const { user } = auth;

            if (!user) {
                throw new Error("Unauthenticated");
            }

            groupList.value = await fetchGroupList();
        } catch (error) {
            console.error("[refreshGroupList]", error);
        }
    }

    async function refreshGroupDetail(groupId: string) {
        try {
            assertAuthenticated();

            const indexOfGroup = groupList.value.findIndex((g) => g.id === groupId);

            const group = await fetchGroupDetail(groupId);

            if (indexOfGroup > -1) {
                groupList.value.splice(indexOfGroup, 1, group);
            } else {
                groupList.value.push(group);
            }
        } catch (error) {
            console.error("[refreshGroupDetail]", error);
        }
    }

    async function createGroup(displayName: string) {
        try {
            const { user } = auth;

            if (!user) {
                throw new Error("Unauthenticated");
            }

            const group = await fetchCreateGroup(displayName);

            await fetchCreateGroupMember(group.id, user.id);

            groupList.value = await fetchGroupList();
        } catch (error) {
            console.log()
            throw error;
        }
    }

    return { createGroup, refreshGroupList, refreshGroupDetail, groupList };
});

export { useGroups };
