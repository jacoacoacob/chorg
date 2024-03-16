
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { GroupsList } from "./_components/groups-list";
import { assertServerAuthenticated } from "@/lib/assert-server-authenticated";
import { fetchGroups } from "@/lib/group.fetchers";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

export default async function DashboardPage() {
  
  await assertServerAuthenticated();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(createServerSupabaseClient()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <GroupsList />
      </main>
    </HydrationBoundary>
  );
}
