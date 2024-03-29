import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { handleError } from "@/utils/handle-error";
import { assertAuthenticated } from "@/utils/assert-authenticated";
import {
  fetchChoreSetDetail,
  fetchChoreSetList,
  fetchCreateChoreSet,
  fetchUpdateChoreSet,
  type ChoreSetDetail,
  type ChoreSetList,
} from "@/model.old/chore-set";

const useChoreSets = defineStore("chore-sets", () => {
  const detail = ref<Record<string, ChoreSetDetail>>({});
  const _listDict = ref<Record<string, ChoreSetList[number]>>({});

  const list = computed(() => Object.keys(_listDict.value).map((choreSetId) => _listDict.value[choreSetId]));

  async function refreshChoreSetList() {
    try {
      const choreSetList = await fetchChoreSetList();
      _listDict.value = Object.fromEntries(choreSetList.map((choreSet) => [choreSet.id, choreSet]));
    } catch (error) {
      handleError(error);
    }
  }
  
  async function refreshChoreSetDetail(choreSetId: string) {
    try {
      detail.value[choreSetId] = await fetchChoreSetDetail(choreSetId);
    } catch (error) {
      handleError(error);
    }
  }

  async function createChoreSet(groupId: string, displayName?: string) {
    try {
      const { id } = await fetchCreateChoreSet(groupId, displayName);
      await refreshChoreSetList();
      return id;
    } catch (error) {
      handleError(error);
    }
  }

  async function updateChoreSet(choreSetId: string, displayName: string) {
    try {
      await fetchUpdateChoreSet({ id: choreSetId, display_name: displayName });
      await refreshChoreSetDetail(choreSetId);
    } catch (error) {
      handleError(error);
    }
  }

  return {
    detail,
    list,
    createChoreSet,
    updateChoreSet,
    refreshChoreSetDetail,
    refreshChoreSetList,
  };
});

export { useChoreSets };
