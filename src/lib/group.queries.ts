import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchGroup,
  fetchCreateGroup,
  fetchGroups,
  fetchUpdateGroup,
  type CreateGroupCols,
  type UpdateGroupCols,
} from "./group.fetchers";
import { supabase } from "./supabase/client";
import { useInvalidateQueries, QueryKeyValue } from "./utils";

function useGroup(groupId: string) {
  return useQuery({
    queryKey: [QueryKeyValue.GROUP, groupId],
    queryFn: () => fetchGroup(supabase, groupId)
  })
} 

function useGroups() {
  return useQuery({
    queryKey: [QueryKeyValue.GROUPS],
    queryFn: () => fetchGroups(supabase)
  });
}

function useCreateGroup() {
  const onSuccess = useInvalidateQueries([QueryKeyValue.GROUPS]);

  return useMutation({
    mutationFn: (columns: CreateGroupCols) => fetchCreateGroup(
      supabase,
      columns
    ),
    onSuccess,
  });
}

function useUpdateGroup(groupId: string) {
  const onSuccess = useInvalidateQueries([QueryKeyValue.GROUPS]);

  return useMutation({
    mutationFn: (columns: UpdateGroupCols) => fetchUpdateGroup(
      supabase,
      groupId,
      columns
    ),
    onSuccess,
  });
}

export { useGroup, useGroups, useCreateGroup, useUpdateGroup, QueryKeyValue };
