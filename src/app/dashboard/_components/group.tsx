
import { useChoreSets } from "@/lib/chore-set.queries";
import type { Groups } from "@/lib/group.fetchers";
import { Listbox } from "@nextui-org/react";
import { GroupChoreSets } from "./group-chore-sets";

function Group(props: Groups[number]) {
  const { id, display_name, owned_by, created_at, members } = props;


  return (
    <GroupChoreSets groupId={id} />
  )
}

export { Group };
