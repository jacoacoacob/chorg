
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DashboardGroups } from "./_components/dashboard-groups";
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
        <DashboardGroups />
      </main>
    </HydrationBoundary>
  );
}
