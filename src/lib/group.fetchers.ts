import { handleFetch } from "./supabase/handle-fetch";
import type { Supabase, TableRow } from "./supabase/utils.type";

async function fetchIsGroupDisplayNameAvailable(client: Supabase, display_name: string) {
  const data = await handleFetch(
    async () => client
      .from("group")
      .select("display_name")
      .eq("display_name", display_name)
      .maybeSingle()
  );
  return data === null;
}

type Groups = Awaited<ReturnType<typeof fetchGroups>>;

function fetchGroups(client: Supabase) {
  return handleFetch(
    async () => client.from("group").select(`
      *,
      members:user_profile(*)
    `)
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

export { fetchGroups, fetchCreateGroup, fetchUpdateGroup, fetchIsGroupDisplayNameAvailable };
export type { Groups, CreateGroupCols, UpdateGroupCols };
