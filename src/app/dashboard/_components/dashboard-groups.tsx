"use client";

import { useGroups } from "@/lib/group.queries";

function DashboardGroups() {
  const { data: groups } = useGroups();

  return (
    <div>
      <h1>Groups</h1>
      {groups?.map((group) =>
        <pre key={group.id}>{JSON.stringify(group, null, 2)}</pre>
      )}
    </div>
  )
}

export { DashboardGroups };