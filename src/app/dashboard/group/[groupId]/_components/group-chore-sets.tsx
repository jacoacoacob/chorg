import { IconChevronRight } from "@/components/icon-chevron-right";
import { useGroupChoreSets } from "@/lib/chore-set.queries";
import { Button, Listbox, ListboxItem, ListboxSection, type Selection } from "@nextui-org/react";
import React from "react";
import { GroupChoreSetChores } from "./group-chore-set-chores";
import { CreateChoreSet } from "./create-chore-set";

interface Props {
  groupId: string;
}

function GroupChoreSets({ groupId }: Props) {
  const { data: choreSets } = useGroupChoreSets(groupId);

  const [selected, setSelected] = React.useState<Selection>(new Set());

  const selectedChoreSet = React.useMemo(
    () => {
      const selectedId = Array.from((selected as Set<string>).keys() || [])[0];
      return choreSets?.find((choreSet) => choreSet.id === selectedId)
    },
    [choreSets, selected]
  );

  return (
    <div className="flex">
      <div>
        <h2 className="font-bold">Chore Sets</h2>
        <Listbox
          aria-label="Chore Sets"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <ListboxSection>
            {(choreSets || []).map((choreSet) =>
              <ListboxItem
                variant="faded"
                key={choreSet.id}
                className={selectedChoreSet?.id === choreSet.id ? "border-zinc-400" : ""}
                selectedIcon={({ isSelected }) =>
                  <IconChevronRight
                    className={`w-5 h-5 -translate-y-1 transition duration-75 ${isSelected ? "font-bold" : "rotate-90 text-slate-400"}`}
                  />
                }
              >
                {choreSet.display_name} 
              </ListboxItem>
            )}
          </ListboxSection>
        </Listbox>
        <CreateChoreSet />
      </div>
      {selectedChoreSet && <GroupChoreSetChores chores={selectedChoreSet.chores} />}
    </div>
  )
}
export { GroupChoreSets };