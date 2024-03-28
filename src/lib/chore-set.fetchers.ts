import { handleFetch } from "./supabase/handle-fetch";
import type { Supabase, TableRow } from "./supabase/utils";

type ChoreSets = Awaited<ReturnType<typeof fetchGroupChoreSets>>;

function fetchGroupChoreSets(client: Supabase, groupId: string) {
  return handleFetch(async () => client
    .from("chore_set")
    .select(`
      *,
      chores:chore(*)
    `)
    .eq("group_id", groupId)
  );
}

function fetchChoreSet(client: Supabase, choreSetId: string) {
  return handleFetch(async () => client
    .from("chore_set")
    .select(`
      *,
      chores:chore(*)
    `)
    .eq("id", choreSetId)
    .maybeSingle()
  );
}

type CreateChoreSetCols = Pick<TableRow<"chore_set">, "display_name" | "group_id">;

function fetchCreateChoreSet(client: Supabase, columns: CreateChoreSetCols) {
  return handleFetch(
    async () => client.from("chore_set").insert(columns)
  );
}

type UpdateChoreSetCols = Pick<TableRow<"chore_set">, "display_name" | "owned_by">;

function fetchUpdateChoreSet(client: Supabase, columns: UpdateChoreSetCols) {
  return handleFetch(
    async () => client.from("chore_set").update(columns)
  );
}

function fetchDeleteChoreSet(client: Supabase, choreSetId: string) {
  return handleFetch(async () => client
    .from("chore_set")
    .delete()
    .eq("id", choreSetId)
  );
}

export { fetchChoreSet, fetchGroupChoreSets, fetchCreateChoreSet, fetchUpdateChoreSet, fetchDeleteChoreSet };
export type { ChoreSets, CreateChoreSetCols, UpdateChoreSetCols };
