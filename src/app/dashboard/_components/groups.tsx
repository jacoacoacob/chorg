"use client";

import React from "react";
import { useGroups } from "@/lib/group.queries";
import { Group } from "./group";
import { Listbox, ListboxItem, type Selection } from "@nextui-org/react";
import { IconChevronRight } from "@/components/icon-chevron-right";

function Groups() {
  const { data: groups } = useGroups();

  const [selected, setSelected] = React.useState<Selection>(new Set());

  const selectedGroup = React.useMemo(
    () => {
      const selectedId = Array.from((selected as Set<string>).keys() || [])[0];
      return groups?.find((group) => group.id === selectedId)
    },
    [groups, selected]
  );
  
  return (
    <div className="flex justify-center">
      <div>
        <h3>Groups</h3>
        <Listbox
          aria-label="Chore Sets"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          {(groups || []).map((group) =>
            <ListboxItem
              variant="faded"
              key={group.id}
              className={selectedGroup?.id === group.id ? "border-zinc-400" : ""}
              selectedIcon={({ isSelected }) =>
                <IconChevronRight
                  className={`w-5 h-5 -translate-y-1 transition duration-75 ${isSelected ? "font-bold" : "rotate-90 text-slate-400"}`}
                /> 
              }
            >
              {group.display_name}
            </ListboxItem>
          )}
        </Listbox>
      </div>
      {selectedGroup && <Group {...selectedGroup} />}
    </div>
  )
}

export { Groups };
