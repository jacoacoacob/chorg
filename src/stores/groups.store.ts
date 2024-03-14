import { computed, ref } from "vue";
import { defineStore } from "pinia";

import {
    fetchCreateGroup,
    fetchDeleteGroup,
    fetchGroupDetail, 
    fetchGroupList,
    fetchUpdateGroupDisplayName,
    type GroupDetail,
    type GroupList
} from "@/model.old/group";
import { fetchAddGroupMember, fetchRemoveGroupMember } from "@/model.old/group-member";
import { assertAuthenticated } from "@/utils/assert-authenticated";
import { handleError } from "@/utils/handle-error";

type GroupListSortKey = keyof Pick<GroupList[number], "display_name" | "created_at">;

const useGroups = defineStore("groups", () => {
    const detail = ref<Record<string, GroupDetail>>({});

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

            detail.value[groupId] = await fetchGroupDetail(groupId);
        } catch (error) {
            console.error("[refreshGroupDetail]", error);
        }
    }

    async function createGroup(displayName: string) {
        try {
            const user = assertAuthenticated();

            const group = await fetchCreateGroup(displayName);

            await fetchAddGroupMember(group.id, user.id);

            await refreshGroupList();
        } catch (error) {
            throw error;
        }
    }

    async function addGroupMember(groupId: string, userId: string) {
        try {
            await fetchAddGroupMember(groupId, userId);
            await refreshGroupDetail(groupId);
        } catch (error) {
            handleError(error);
        }
    }

    async function removeGroupMember(groupId: string, userId: string) {
        try {
            await fetchAddGroupMember(groupId, userId);
            await refreshGroupDetail(groupId);
        } catch (error) {
            handleError(error);
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

    return {
        createGroup,
        refreshGroupList,
        refreshGroupDetail,
        deleteGroup,
        updateGroupDisplayName,
        addGroupMember,
        removeGroupMember,
        groupList,
        groupListDict,
        detail
    };
});

export { useGroups };
export type { GroupDetail };
