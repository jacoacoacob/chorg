"use client";

import { Button } from "@nextui-org/react";
import { useCreateGroup, useGroups } from "@/lib/group.queries";
import { GroupsAdd } from "./groups-add";

function GroupsList() {
  const { data: groups } = useGroups();

  return (
    <div>
      <h1>Groups</h1>
      <GroupsAdd />
      <ul>
        {groups?.map((group) =>
          <li key={group.id}>{group.display_name}</li>
        )}
      </ul>
    </div>
  )
}

export { GroupsList };
