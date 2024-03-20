"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGroup, useGroups } from "@/lib/group.queries";
import { GroupChoreSets } from "./group-chore-sets";

function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();

  const { data: group } = useGroup(groupId);

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-bold text-2xl">{group?.display_name}</h1>
      <GroupChoreSets groupId={groupId} />
    </div>
  )

}

export { GroupDetails };
