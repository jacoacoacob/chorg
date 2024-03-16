import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleFetch } from "../supabase/handle-fetch";
import { supabase } from "../supabase/client";
import type { TableRow } from "../supabase/utils.types";

type ChoreSets = Awaited<ReturnType<typeof fetchChoreSets>>;

function fetchChoreSets(groupId: string) {
  return handleFetch(async () => supabase
    .from("chore_set")
    .select(`
      *,
      chores:chore(*)
    `)
    .eq("id", groupId)
  );
}

function useChoreSets(groupId: string) {
  return useQuery({
    queryKey: ["chore-sets", groupId],
    queryFn: () => fetchChoreSets(groupId)
  })
}

type CreateChoreSet = Pick<TableRow<"chore_set">, "display_name">

function useCreateChoreSet(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ display_name }: CreateChoreSet) => handleFetch(
      async () => supabase
        .from("chore_set")
        .insert({ display_name, group_id: groupId })
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chore-sets", groupId],
      });
    },
  });
}

type UpdateChoreSet = Partial<Pick<TableRow<"chore_set">, "display_name" | "owned_by">>;

function useUpdateChoreSet(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: UpdateChoreSet) => handleFetch(
      async () => supabase
        .from("chore_set")
        .update(columns)
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chore-sets", groupId],
      });
    },
  });
}

export { useChoreSets, useCreateChoreSet, useUpdateChoreSet };
export type { ChoreSets };
