import { unref, type MaybeRef } from "vue";
import { useMutation, useQuery, type UseQueryReturnType  } from "@tanstack/vue-query";
import { supabase } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";
import type { QueryData } from "@supabase/supabase-js";

type ChoreSetList = Awaited<ReturnType<typeof makeChoreSetListFetcher>>;
type ChoreSetListItem = ChoreSetList[number];

function makeChoreSetListFetcher(groupId: string) {
  return makeFetcher(async () => supabase
    .from("chore_set")
    .select(`
      *,
      chores:chore(*)
    `)
    .eq("group_id", groupId)
  )();
}

function useChoreSetList(groupId: MaybeRef<string> | string) {
  return useQuery({
    staleTime: Infinity,
    queryKey: ["chore-set-list", groupId],
    queryFn: () => makeChoreSetListFetcher(unref(groupId))
  });
}

interface CreateChoreSetOptions {
  display_name: string;
}

function useCreateChoreSet(groupId: MaybeRef<string>) {
  return useMutation({
    mutationFn: ({ display_name }: CreateChoreSetOptions) => makeFetcher(
      async () => supabase
        .from("chore_set")
        .insert({ display_name, group_id: unref(groupId) })
    )(),
  });
}

interface UpdatechoreSetOptions {
  display_name?: string;
}

function useUpdateChoreSet(choreSetId: MaybeRef<string>) {
  return useMutation({
    mutationFn: ({ display_name }: UpdatechoreSetOptions) => makeFetcher(
      async () => supabase
        .from("chore_set")
        .update({ display_name })
        .eq("id", choreSetId)
    )(),
  });
}

export { useChoreSetList, useCreateChoreSet, useUpdateChoreSet };
export type { ChoreSetList, ChoreSetListItem };
