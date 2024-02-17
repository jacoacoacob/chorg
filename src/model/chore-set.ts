import { supabase } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";

type ChoreSetDetail = Awaited<ReturnType<typeof fetchChoreSetDetail>>;
type ChoreSetList = Awaited<ReturnType<typeof fetchChoreSetList>>;

type UpdateChoreSetOptions = Pick<ChoreSetDetail, "display_name" | "id">

const fetchChoreSetList = makeFetcher(async () => supabase.from("chore_set").select("*"));

const fetchChoreSetDetail = makeFetcher(async (choreSetId: string) => supabase
  .from("chore_set")
  .select(`
    *,
    group(*),
    chores:chore(*)
  `)
  .eq("id", choreSetId)
  .single()
);

const fetchCreateChoreSet = makeFetcher(
  async (group_id: string, display_name?: string) => supabase
    .from("chore_set")
    .insert({ group_id, display_name: display_name ?? "" })
    .select()
    .single()
);

const fetchUpdateChoreSet = makeFetcher(
  async ({ id, ...options }: UpdateChoreSetOptions) => supabase
    .from("chore_set")
    .update(options)
    .eq("id", id)
    .select()
    .single()
);

export {
  fetchChoreSetDetail,
  fetchChoreSetList,
  fetchCreateChoreSet,
  fetchUpdateChoreSet
};
export type { ChoreSetDetail, ChoreSetList, UpdateChoreSetOptions };
