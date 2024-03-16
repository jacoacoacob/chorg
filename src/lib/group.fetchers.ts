import { handleFetch } from "./supabase/handle-fetch";
import type { Supabase, TableRow } from "./supabase/utils.types";

function fetchGroups(client: Supabase) {
  return handleFetch(
    async () => client.from("group").select("*")
  );
}

type CreateGroupCols = Pick<TableRow<"group">, "display_name">;

function fetchCreateGroup(client: Supabase, columns: CreateGroupCols) {
  return handleFetch(
    async () => client.from("group").insert(columns)
  );
}

type UpdateGroupCols = Partial<Pick<TableRow<"group">, "display_name" | "owned_by">>;

function fetchUpdateGroup(client: Supabase, groupId: string, columns: UpdateGroupCols) {
  return handleFetch(
    async () => client.from("group").update(columns).eq("id", groupId)
  );
}

export { fetchGroups, fetchCreateGroup, fetchUpdateGroup };
export type { CreateGroupCols, UpdateGroupCols };
