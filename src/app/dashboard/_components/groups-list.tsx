"use client";

import { useGroups } from "@/lib/group.queries";

function GroupsList() {
  const { data: groups } = useGroups();

  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups?.map((group) =>
          <li key={group.id}>{group.display_name}</li>
        )}
      </ul>
    </div>
  )
}

export { GroupsList };
