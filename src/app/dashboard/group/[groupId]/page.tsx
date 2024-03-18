import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { assertServerAuthenticated } from "@/lib/assert-server-authenticated";
import { ChoreSets, fetchChoreSet, fetchGroupChoreSets } from "@/lib/chore-set.fetchers";
import { QueryKeyValue } from "@/lib/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { GroupDetails } from "./_components/group-details";
import { fetchGroup } from "@/lib/group.fetchers";

interface Props {
  params: {
    groupId: string;
  };
}

async function DashboardGroupPage(props: Props) {
  const { params: { groupId } } = props;

  await assertServerAuthenticated();

  const queryClient = new QueryClient();

  try {
    const serverSupabase = createServerSupabaseClient();
    
    await queryClient.prefetchQuery({
      queryKey: [QueryKeyValue.GROUP_CHORE_SETS, groupId],
      queryFn: () => fetchGroupChoreSets(
        serverSupabase,
        groupId
      ),
    });

    const groupChoreSets = queryClient.getQueryData<ChoreSets>(
      [QueryKeyValue.GROUP_CHORE_SETS, groupId]
    );

    if (groupChoreSets) {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: [QueryKeyValue.GROUP, groupId],
          queryFn: () => fetchGroup(serverSupabase, groupId),
        }),
        queryClient.prefetchQuery({
          queryKey: [QueryKeyValue.GROUP_CHORE_SETS, groupId],
          queryFn: () => groupChoreSets,
        }),
        ...groupChoreSets.map((choreSet) =>
          queryClient.prefetchQuery({
            queryKey: [QueryKeyValue.CHORE_SET, choreSet.id],
            queryFn: () => choreSet,
          })
        ),
      ]);
    }

  } catch (error) {
    console.warn("[prefetch DashboardGroupPage]", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetails />
    </HydrationBoundary>
  )
}

export default DashboardGroupPage;