import { handleFetch } from "./supabase/handle-fetch";
import type { Supabase, TableRow } from "./supabase/utils.type";

type ChoreSets = Awaited<ReturnType<typeof fetchChoreSets>>;

function fetchChoreSets(client: Supabase, groupId: string) {
  return handleFetch(async () => client
    .from("chore_set")
    .select(`
      *,
      chores:chore(*)
    `)
    .eq("group_id", groupId)
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

export { fetchChoreSets, fetchCreateChoreSet, fetchUpdateChoreSet };
export type { ChoreSets, CreateChoreSetCols, UpdateChoreSetCols };
