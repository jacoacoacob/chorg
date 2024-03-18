"use client";

import { useGroups } from "@/lib/group.queries";
import { Link, Listbox, ListboxItem } from "@nextui-org/react";
import { useParams } from "next/navigation";

function UserDashboardContent() {

  const { username } = useParams<{ username: string; }>();
  const { data: groups } = useGroups();

  return (
    <div>
      <Listbox aria-label="Groups">
        {(groups || [])?.map((group) =>
          <ListboxItem key={group.id} href={`/dashboard/group/${group.id}`}>
            {group.display_name}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}

export { UserDashboardContent };
