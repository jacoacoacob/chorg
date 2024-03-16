import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { supabase } from "@/supabase-client";
import { handleError } from "@/utils/handle-error";
import { makeFetcher } from "@/utils/fetcher";
import { assertAuthenticated } from "@/utils/assert-authenticated";

const fetchChoreList = makeFetcher(async () => supabase.from("chore").select(`*`));

const fetchChoreDetail = makeFetcher(async (choreId: string) => supabase.from("chore")
  .select(`
    id,
    created_at,
    owned_by,
    title,
    description,
    chore_sets:chore_set(
      *,
      groups:group(*)
    )
  `)
  .eq("id", choreId)
  .single()
);

const fetchCreateChore = makeFetcher(
  async (title: string, description?: string) => supabase
    .from("chore")
    .insert({
      title,
      description,
      chore_set_id: "",
    })
    .select()
    .single()
);

type ChoreList = Awaited<ReturnType<typeof fetchChoreList>>;
type ChoreDetail = Awaited<ReturnType<typeof fetchChoreDetail>>;

type UpdateChoreOptions = Pick<ChoreDetail, "id" | "description" | "title">;

const fetchUpdateChore = makeFetcher(
  async ({ id: choreId, ...options }: UpdateChoreOptions) => supabase
    .from("chore")
    .update(options)
    .eq("id", choreId)
    .select()
    .single()
);

const fetchDeleteChore = makeFetcher(
  async (choreId: string) => supabase.from("chore").delete().eq("id", choreId).select()
);



const useChores = defineStore("chores", () => {
  
  const detail = ref<Record<string, ChoreDetail>>({});
  const listDict = ref<Record<string, ChoreList[number]>>({});

  const list = computed(() => Object.keys(listDict.value).map((choreId) => listDict.value[choreId]));

  async function refreshChoreList() {
    try {
      assertAuthenticated();
      const chores = await fetchChoreList();
      listDict.value = Object.fromEntries(chores.map((chore) => [chore.id, chore]));
    } catch (error) {
      handleError(error);
    }
  }

  async function refreshChoreDetail(choreId: string) {
    try {
      assertAuthenticated();
      detail.value[choreId] = await fetchChoreDetail(choreId);
    } catch (error) {
      handleError(error)
    }
  }

  async function createChore(title: string, description?: string) {
    try {
      assertAuthenticated();
      await fetchCreateChore(title, description);
      await refreshChoreList();
    } catch (error) {
      handleError(error);
    }
  }

  async function updateChore(options: UpdateChoreOptions) {
    try {
      assertAuthenticated();
      await fetchUpdateChore(options);
      await refreshChoreDetail(options.id);
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteChore(choreId: string) {
    try {
      assertAuthenticated();
      await fetchDeleteChore(choreId);
      await refreshChoreList();
    } catch (error) {
      handleError(error);
    }
  }

  return { createChore, updateChore, deleteChore, refreshChoreDetail, refreshChoreList, list, detail };
});

export { useChores };
