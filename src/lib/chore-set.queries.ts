import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateChoreSetCols, UpdateChoreSetCols, fetchChoreSets, fetchCreateChoreSet, fetchUpdateChoreSet } from "./chore-set.fetchers";
import { supabase } from "./supabase/client";
import { useInvalidateQueries } from "./utils";

const CHORE_SETS = "chore-sets";

function useChoreSets(groupId: string) {
  return useQuery({
    queryKey: [CHORE_SETS, groupId],
    queryFn: () => fetchChoreSets(supabase, groupId),
  });
}

function useCreateChoreSet(groupId: string) {
  const onSuccess = useInvalidateQueries([CHORE_SETS, groupId]);

  return useMutation({
    mutationFn: (columns: CreateChoreSetCols) => fetchCreateChoreSet(
      supabase,
      columns
    ),
    onSuccess,
  });
}

function useUpdateChoreSet(groupId: string) {
  const onSuccess = useInvalidateQueries([CHORE_SETS, groupId]);

  return useMutation({
    mutationFn: (columns: UpdateChoreSetCols) => fetchUpdateChoreSet(
      supabase,
      columns
    ),
    onSuccess,
  })
}

export { useChoreSets, useCreateChoreSet, useUpdateChoreSet };
