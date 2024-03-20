import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateChoreSetCols, UpdateChoreSetCols, fetchGroupChoreSets, fetchCreateChoreSet, fetchUpdateChoreSet, fetchChoreSet } from "./chore-set.fetchers";
import { supabase } from "./supabase/client";
import { useInvalidateQueries, QueryKeyValue } from "./utils";

function useChoreSet(choreSetId: string) {
  return useQuery({
    queryKey: [QueryKeyValue.CHORE_SET, choreSetId],
    queryFn: () => fetchChoreSet(supabase, choreSetId),   
  });
}

function useGroupChoreSets(groupId: string) {
  return useQuery({
    queryKey: [QueryKeyValue.GROUP_CHORE_SETS, groupId],
    queryFn: () => fetchGroupChoreSets(supabase, groupId),
  });
}

function useCreateChoreSet(group_id: string) {
  const onSuccess = useInvalidateQueries([QueryKeyValue.GROUP_CHORE_SETS, group_id]);

  return useMutation({
    mutationFn: ({ display_name }: Omit<CreateChoreSetCols, "group_id">) => fetchCreateChoreSet(
      supabase,
      { group_id, display_name }
    ),
    onSuccess,
  });
}

function useUpdateChoreSet(groupId: string) {
  const onSuccess = useInvalidateQueries([QueryKeyValue.GROUP_CHORE_SETS, groupId]);

  return useMutation({
    mutationFn: (columns: UpdateChoreSetCols) => fetchUpdateChoreSet(
      supabase,
      columns
    ),
    onSuccess,
  })
}

export { useChoreSet, useGroupChoreSets, useCreateChoreSet, useUpdateChoreSet };
