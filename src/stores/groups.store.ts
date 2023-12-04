import { defineStore } from "pinia";
import { supabase } from "@/supabase-client";
import { useAuth } from "./auth.store";
import { ref } from "vue";

type GroupList = Awaited<ReturnType<typeof fetchGroupList>>;

async function fetchGroupList(userId: string) {
    try {
        const { data, error } = await supabase
            .from("group")
            .select(`
                id,
                display_name,
                owned_by,
                user_profile (
                    id,
                    username
                )
            `);

        if (error) {
            throw error;
        }

        console.log(data)
        return data;
    } catch (error) {
        console.error("[fetchGroupList]", error);
        throw error;
    }
}

async function fetchCreateGroupMember(groupId: string, userId: string) {
    try {
        const { error } = await supabase
            .from("group_member")
            .insert({ group_id: groupId, user_id: userId })

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error("[fetchCreateGroupMember]", error)
        throw error;
    }
}

async function fetchCreateGroup(displayName: string) {
    try {
        const { data, error } = await supabase
            .from("group")
            .insert({ display_name: displayName })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("[fetchCreateGroup]", error)
        throw error;
    }
}

const useGroups = defineStore("groups", () => {

    const groupList = ref<GroupList>([]);

    const auth = useAuth();

    async function getGroupList() {
        try {
            const { user } = auth;

            if (!user) {
                throw new Error("Unauthenticated");
            }

            groupList.value = await fetchGroupList(user.id);
        } catch (error) {
            console.error("[getGroupList]", error);
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

            groupList.value = await fetchGroupList(user.id);
        } catch (error) {
            console.log()
            throw error;
        }
    }

    return { createGroup, getGroupList, groupList };
});

export { useGroups };
