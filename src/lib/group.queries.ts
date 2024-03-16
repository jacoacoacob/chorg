import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateGroupCols, UpdateGroupCols, fetchCreateGroup, fetchGroups, fetchUpdateGroup } from "./group.fetchers";
import { supabase } from "./supabase/client";
import { useInvalidateQueries } from "./utils";

const GROUPS = "groups";

function useGroups() {
  return useQuery({
    queryKey: [GROUPS],
    queryFn: () => fetchGroups(supabase)
  });
}

function useCreateGroup() {
  const onSuccess = useInvalidateQueries([GROUPS]);

  return useMutation({
    mutationFn: (columns: CreateGroupCols) => fetchCreateGroup(
      supabase,
      columns
    ),
    onSuccess,
  });
}

function useUpdateGroup(groupId: string) {
  const onSuccess = useInvalidateQueries([GROUPS]);

  return useMutation({
    mutationFn: (columns: UpdateGroupCols) => fetchUpdateGroup(
      supabase,
      groupId,
      columns
    ),
    onSuccess,
  });
}

export { useGroups, useCreateGroup, useUpdateGroup };
