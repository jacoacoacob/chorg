import { type Ref } from "vue";
import { useMutation, useQuery, type UseQueryReturnType  } from "@tanstack/vue-query";
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
            charts:chart(*)
          `)
          .eq("id", groupId.value ?? "")
          .single()
        )();
      }
      return null;
    }
  });
}

function useGroupListQuery() {
  return useQuery({
    queryKey: ["group-list"],
    queryFn: makeFetcher(
      async () => supabase.from("group").select("*")
    ),
  });
}

interface MutateGroupDisplayNameOptions {
  groupId: string;
  display_name: string;
}


function useGroupUpdateMutation() {

  const updateDisplayName = ({ groupId, display_name }: MutateGroupDisplayNameOptions) => makeFetcher(
    async () => supabase
      .from("group")
      .update({ display_name })
      .eq("id", groupId)
      .select()
      .single()
  )();

  return useMutation({ mutationFn: updateDisplayName });
}

function useGroupCreateMutation() {

}

function useGroupDeleteMutation() {
  
}

export { useGroupDetailQuery, useGroupListQuery, useGroupUpdateMutation };
