"use client"

import * as React from "react"
import { DataTable } from "../../_components/data-table"
import { LyricsInTable } from "../_lib/types"
import { GetLyricsTableColumns } from "./lyrics-table-columns"
import { DataTableToolbar } from "../../_components/data-table/toolbar"
import { CircleDashed, CircleDotDashed } from "lucide-react"
import { LyricsTypes } from "@/config/data"
import { DataTableFilterField } from "@/types/table"
import { useDataTable } from "@/hooks/use-data-table"

interface TableProps {
  promise: Promise<LyricsInTable>
}

export function LyricsTable({ promise }: TableProps) {

  const { data, pageCount } = React.use(promise)

  const filterFields: DataTableFilterField<LyricsInTable["data"][0]>[] = [
    {
      id: "title",
      label: "Title",
      placeholder: "Filter titles...",
    },
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "Draft",
          value: "draft",
          icon: CircleDotDashed,
        },
        {
          label: "Published",
          value: "published",
          icon: CircleDashed,
        }
      ],
    },
    {
      id: "type",
      label: "Type",
      options: LyricsTypes.map((type) => ({
        label: type.name,
        value: type.id,
      })),
    },
  ];

  const columns = GetLyricsTableColumns();

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: "updatedAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <DataTable
      table={table}
    >
      <DataTableToolbar table={table} filterFields={filterFields}>
        {/* <Button
          icon={<TrashIcon className="w-3 h-3" />}
          variant="ghost"
          className='h-9 w-full justify-start'
        >
          Delete
        </Button> */}
        {/* <TasksTableToolbarActions table={table} /> */}
      </DataTableToolbar>
    </DataTable>
  )
}
