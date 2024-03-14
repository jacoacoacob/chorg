import { unref, type Ref } from "vue";
import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { supabase } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";

function useGroupDetailQuery(groupId: Ref<string | undefined>) {
  return useQuery({
    staleTime: Infinity,
    queryKey: ["group-detail", groupId],
    queryFn: () => {
      if (groupId.value) {
        return makeFetcher(async () => supabase
          .from("group")
          .select(`
            *,
            members:user_profile (
                id,
                username
            ),
            charts:chart(*),
            chore_sets:chore_set(*)
          `)
          .eq("id", groupId.value ?? "")
          .single()
        )();
      }
      return null;
    }
  });
}

export { useGroupDetailQuery };
