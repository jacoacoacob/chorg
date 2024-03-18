import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import type { ChoreSets } from "@/lib/chore-set.fetchers";
import { IconPencil } from "@/components/icon-pencil";
import { IconTrash } from "@/components/icon-trash";


function createColumnLabels<Col extends Record<string, string>>(columns: Col) {
  return Object.keys(columns).reduce(
    (accum: { key: keyof Col; label: string }[], key) => accum.concat({
      key,
      label: columns[key],
    }),
    []
  );
}

const columns = createColumnLabels({
  title: "Title",
  description: "Description",
  actions: "Actions"
});

type ColumnKey = typeof columns[number]["key"];

interface Props {
  chores: ChoreSets[number]["chores"]
}

function GroupChoreSetChores({ chores }: Props) {

  const rows = React.useMemo(() => chores.map(({ id, description, title }) => ({
    key: id,
    description,
    title,
  })), [chores]);

  const renderCell = React.useCallback(
    (row: typeof rows[number], columnKey: ColumnKey) => {
      switch (columnKey) {
        case "title":
        case "description": return (
          getKeyValue(row, columnKey)
        );
        case "actions": return (
          <div className="">
            <Button isIconOnly size="sm" variant="light">
              <IconPencil className="h-4 w-4" />
            </Button>
            <Button isIconOnly size="sm" variant="light">
              <IconTrash className="h-4 w-4" />
            </Button>
          </div>
        ) 
      }
    },
    []
  );

  return (
    <div className="">
      <h2 className="font-bold">Chores</h2>
      <Table removeWrapper aria-label="Chores">
        <TableHeader columns={columns}>
          {(column) =>
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          }
        </TableHeader>
        <TableBody items={rows} emptyContent="No chores">
          {(row) =>
            <TableRow key={row.key}>
              {(columnKey) =>
                <TableCell>{renderCell(row, columnKey as ColumnKey)}</TableCell>
              }
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  );
}

export { GroupChoreSetChores };
