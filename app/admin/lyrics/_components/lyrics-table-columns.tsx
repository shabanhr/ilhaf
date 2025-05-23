import React from 'react'
import { LyricsInTable } from '../_lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getErrorMessage } from "@/lib/handle-error"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "../../_components/data-table/column-header"
import { getTimeAgo } from "@/lib/date"
import { capitalize, truncate } from '@/lib/utils';
import DeleteComp from '@/components/DeleteComp';
import { toast } from 'sonner';
import { deleteLyricsById } from '../_lib/actions';

export const GetLyricsTableColumns: () => ColumnDef<LyricsInTable["data"][0]>[] = () => {

    const columns: ColumnDef<LyricsInTable["data"][0]>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => {
                const { reciterSlug, slug, title } = row.original;
                return (<Link
                    className="hover:underline"
                    href={`/lyrics/${reciterSlug}/${slug}`}
                >
                    {truncate(title, 40)}
                </Link>)
            }
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type");
                return (
                    <Badge
                        variant="outline"
                        className='capitalize'
                    >
                        {capitalize(type as string)}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "Reciter",
            header: "Reciter",
            cell: ({ row }) => {
                const { reciterSlug, reciterName } = row.original;
                return (
                    <Link
                        className="hover:underline"
                        href={`/lyrics/${reciterSlug}`}
                    >
                        {truncate(reciterName, 15)}
                    </Link>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status");
                const p = status === "published";
                return (
                    <div className="capitalize">
                        <Badge variant={p ? "default" : "secondary"}
                        >{status as string}</Badge>
                    </div>
                )
            }
        },
        {
            accessorKey: "updatedAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Updated At" />
            ),
            cell: ({ row }) => <div className="">
                {getTimeAgo(row.getValue("updatedAt"))}
            </div>,
        },
        {
            accessorKey: "dop",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => <div className="pl-2">
                {getTimeAgo(row.getValue("dop"))}
            </div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const { id } = row.original;

                const handleDelete = () => {
                    toast.promise(deleteLyricsById(id), {
                        loading: "Deleting Lyrics...",
                        success: () => {
                            return "Lyrics Deleted"
                        },
                        error: (err) => {
                            return getErrorMessage(err)
                        },
                        // finally: () => {
                        //   fetchData()
                        // }
                    })
                }

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={`/admin/add?id=${id}`}>
                                <DropdownMenuItem icon={<PencilIcon className="size-3" />}>
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <DeleteComp
                                handleDelete={handleDelete}
                                trigger={
                                    <Button
                                        icon={<TrashIcon className="w-3 h-3" />}
                                        variant="ghost"
                                        className='h-9 px-2 w-full justify-start'
                                    >
                                        Delete
                                    </Button>
                                }
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];

    return columns;
}
