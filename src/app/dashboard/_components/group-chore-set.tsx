import type { ChoreSets } from "@/lib/chore-set.fetchers";
import { GroupChoreSetChores } from "./group-chore-set-chores";


function GroupChoreSet(props: ChoreSets[number]) {
  const { display_name, group_id, chores } = props;

  return (


    <GroupChoreSetChores chores={chores} />

  )
}

export { GroupChoreSet };
