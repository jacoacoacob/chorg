import { useQueryClient, type QueryKey } from "@tanstack/react-query";

enum QueryKeyValue {
  GROUP = "group",
  GROUPS = "groups",
  GROUP_CHORE_SETS = "group-chore-sets",
  CHORE_SET = "chore-set",
}

function useInvalidateQueries(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey });
  }
}

export { useInvalidateQueries, QueryKeyValue };
