import React from "react";
import { Button, Listbox, ListboxItem, ListboxSection, divider, type Selection } from "@nextui-org/react";
import type { PressEvent } from "@react-types/shared/src/events"
import { IconPencil } from "@/components/icon-pencil";
import { IconTrash } from "@/components/icon-trash";
import { useDeleteChoreSet, useGroupChoreSets } from "@/lib/chore-set.queries";
import { GroupChoreSetChores } from "./group-chore-set-chores";
import { CreateChoreSet } from "./create-chore-set";
import { ChoreSets } from "@/lib/chore-set.fetchers";

interface Props {
  groupId: string;
}

function GroupChoreSets({ groupId }: Props) {
  const { data: choreSets } = useGroupChoreSets(groupId);

  const [selected, setSelected] = React.useState<Selection>(new Set());
  const [editingChoreSet, setEditingChoreSet] = React.useState<string>();

  const deleteChoreSet = useDeleteChoreSet(groupId);

  const selectedChoreSet = React.useMemo(
    () => {
      const selectedId = Array.from((selected as Set<string>).keys() || [])[0];
      return choreSets?.find((choreSet) => choreSet.id === selectedId);
    },
    [choreSets, selected]
  );


  const initiateEdit = React.useCallback(
    (choreSetId: string) => {

    },
    []
  );


  const onDelete = React.useCallback((choreSet: ChoreSets[number]) => {
    const message = `
Are you sure you want to delete the Chore Set "${choreSet.display_name}"?

All data associated with it will be deleted.

THIS ACTION CANNOT BE UNDONE.
    `;
    if (confirm(message)) {
      deleteChoreSet.mutate(choreSet.id); 
    }
  }, [deleteChoreSet]);

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
                hideSelectedIcon
                variant="faded"
                key={choreSet.id}
                className={`voh-parent ${selectedChoreSet?.id === choreSet.id ? "border-zinc-400" : ""}`}
                endContent={
                  <div className="flex voh-child">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="hover:text-emerald-500"
                      onPress={() => setEditingChoreSet(choreSet.id)}
                    >
                      <IconPencil className="h-4 w-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="hover:text-red-500"
                      onPress={() => onDelete(choreSet)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
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
      {editingChoreSet && <div>This the modal {editingChoreSet}</div>}
    </div>
  )
}
export { GroupChoreSets };