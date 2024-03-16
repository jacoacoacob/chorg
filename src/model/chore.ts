import { useMutation  } from "@tanstack/vue-query";
import { supabase, type Table } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";

type Chore = Table<"chore">;
type CreateChore = Pick<Chore, "chore_set_id" | "description" | "title">
type UpdateChore = Partial<Pick<Chore, "chore_set_id" | "description" | "title" | "owned_by">>

function useCreateChore() {
  return useMutation({
    mutationFn: (columns: CreateChore) => makeFetcher(
      async () => supabase.from("chore").insert(columns)
    )(),
  });
}

function useUpdateChore() {
  return useMutation({
    mutationFn: (columns: UpdateChore) => makeFetcher(
      async () => supabase.from("chore").update(columns)
    )(),
  });
}

export { useCreateChore, useUpdateChore };
