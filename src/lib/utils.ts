import { useQueryClient, type QueryKey } from "@tanstack/react-query";

function useInvalidateQueries(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey });
  }
}

export { useInvalidateQueries };