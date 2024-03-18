
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { assertServerAuthenticated } from "@/lib/assert-server-authenticated";
import { fetchGroups } from "@/lib/group.fetchers";
import { QueryKeyValue } from "@/lib/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { UserDashboardContent } from "./user-dashboard-content";

export default async function DashboardPage() {
  
  await assertServerAuthenticated();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeyValue.GROUPS],
    queryFn: () => fetchGroups(createServerSupabaseClient()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDashboardContent />
    </HydrationBoundary>
  );
}
