import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateGroupCols, UpdateGroupCols, fetchCreateGroup, fetchGroups, fetchUpdateGroup } from "./group.fetchers";
import type { Supabase } from "./supabase/utils.types";
import { supabase } from "./supabase/client";

const GROUPS = "groups";

function useGroups() {
  return useQuery({
    queryKey: [GROUPS],
    queryFn: () => fetchGroups(supabase)
  });
}

function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: CreateGroupCols) => fetchCreateGroup(
      supabase,
      columns
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GROUPS]
      })
    },
  });
}

function useUpdateGroup(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: UpdateGroupCols) => fetchUpdateGroup(
      supabase,
      groupId,
      columns
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GROUPS]
      })
    },
  });
}

export { useGroups, useCreateGroup, useUpdateGroup };
