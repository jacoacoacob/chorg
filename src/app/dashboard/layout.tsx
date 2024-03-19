import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { assertServerAuthenticated } from "@/lib/assert-server-authenticated";
import { fetchGroups } from "@/lib/group.fetchers";
import { QueryKeyValue } from "@/lib/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { DashboardSideNav } from "./dashboard-side-nav";
import { DashboardNavbar } from "./dashboard-navbar";

async function GroupDetailLayout({ children }: { children: React.ReactNode }) {

  await assertServerAuthenticated();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeyValue.GROUPS],
    queryFn: () => fetchGroups(createServerSupabaseClient()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardNavbar />
      <div className="flex min-h-[calc(100vh-60px)]">
        <DashboardSideNav />
        <div>
          {children}
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default GroupDetailLayout;