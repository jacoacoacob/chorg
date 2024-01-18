import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { supabase } from "@/supabase-client";
import { handleError } from "@/utils/handle-error";
import { makeFetcher } from "@/utils/fetcher";
import { assertAuthenticated } from "@/utils/assert-authenticated";

const fetchChoreSetList = makeFetcher(async () => supabase.from("chore_set").select("*"));

const fetchChoreSetDetail = makeFetcher(async (choreSetId: string) => supabase
  .from("chore_set")
  .select(`
    *,
    groups:group(*),
    chores:chore(*)
  `)
  .eq("id", choreSetId)
  .single()
);

type ChoreSetDetail = Awaited<ReturnType<typeof fetchChoreSetDetail>>;
type ChoreSetList = Awaited<ReturnType<typeof fetchChoreSetList>>;

type UpdateChoreSetOptions = Pick<ChoreSetDetail, "display_name" | "id">

const fetchUpdateChoreSet = makeFetcher(
  async ({ id, ...options }: UpdateChoreSetOptions) => supabase
    .from("chore_set")
    .update(options)
    .select()
    .single()
);

const fetchAddChore = makeFetcher(
  async (choreSetId: string, choreId: string) => supabase
    .from("chore_set_chore")
    .upsert({ chore_set_id: choreSetId, chore_id: choreId })
);

const fetchRemoveChore = makeFetcher(
  async (choreSetId: string, choreId: string) => supabase
    .from("chore_set_chore")
    .delete()
    .eq("chore_set_id", choreSetId)
    .eq("chore_id", choreId)
);

const useChoreSets = defineStore("chore-sets", () => {
  const detail = ref<Record<string, ChoreSetDetail>>({});
  const listDict = ref<Record<string, ChoreSetList>>({});

  const list = computed(() => Object.keys(listDict.value).map((choreSetId) => listDict.value[choreSetId]));

  async function refreshChoreSetList() {
    try {
      
    } catch (error) {
      handleError(error);
    }
  }
  
  async function refreshChoreSetDetail(choreSetId: string) {
    try {
      
    } catch (error) {
      handleError(error);
    }
  }

  async function createChoreSet(displayName: string) {
    try {
      
    } catch (error) {
      handleError(error);
    }
  }

  return {};  
});

export { useChoreSets };
