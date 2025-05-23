"use client";

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, PencilIcon, RotateCcw, Settings2, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from "@/components/Spinner";
import { UpdateReport, deleteReportById, getAllReports } from "./actions";
import { getTimeAgo } from "@/lib/date";
import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal";

import { toast } from "sonner";
import Image from "next/image";
import { getErrorMessage } from "@/lib/handle-error";
import { ReportStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateReportSchema } from "@/types/zod";
import Link from "next/link";
import ReportStatusFilters from "../_components/ReportStatusFilters";
import { DataTable } from "../_components/data-table";
import { DataTableToolbar } from "../_components/data-table/toolbar";
import DeleteComp from "@/components/DeleteComp";

export type ReportsInTable = {
    id: string;
    user: {
        name: string | null;
        email: string | null;
        image: string | null
    };
    slug: string;
    reciter: string;
    mistaken: string;
    correct: string;
    status: ReportStatus;
    createdAt: Date;
    updatedAt: Date;
}


export default function ReportTable() {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<ReportsInTable[]>([]);

    const fetchData = async () => {
        const data = await getAllReports("PENDING");
        setData(data);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData()
    }, [])

    const columns: ColumnDef<ReportsInTable>[] = [
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
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => {
                const user = row.original.user;
                return (
                    <div className="flex items-center justify-start gap-2">
                        <Image alt="" src={user.image as string} width={35} height={35}
                            className="select-none pointer-events-none rounded-full aspect-square object-cover" />
                        <div className="flex flex-col items-start">
                            {user?.name}
                            <div className="opacity-75 text-xs">{user?.email}</div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const { status } = row.original;
                return (
                    <div className="capitalize">
                        <Badge
                            variant={status === "PENDING" ?
                                "secondary" : (status === "APPROVED" ? "default" : "destructive")
                            }
                        >{status}</Badge>
                    </div>
                )
            }
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => <div className="">
                {getTimeAgo(row.getValue("createdAt"))}
            </div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const { id, status, slug, mistaken, correct } = row.original;

                const handleDelete = async () => {
                    toast.promise(deleteReportById(id), {
                        loading: "Deleting Report...",
                        success: () => {
                            fetchData()
                            return "Report Deleted"
                        },
                        error: (err) => {
                            return getErrorMessage(err)
                        },
                    })
                }
                const form = useForm<z.infer<typeof UpdateReportSchema>>({
                    resolver: zodResolver(UpdateReportSchema), defaultValues: {
                        status: status,
                    }
                })
                const onSubmit = async (data: z.infer<typeof UpdateReportSchema>) => {
                    const res = await UpdateReport(id, data)
                    if (res.success) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                }
                return (
                    <Modal>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={`/admin/add?slug=${slug}&image=true&audio=true&reportId=${id}`}>
                                    <DropdownMenuItem icon={<PencilIcon className="w-3 h-3" />}>
                                        Update
                                    </DropdownMenuItem>
                                </Link>
                                <ModalTrigger asChild>
                                    <DropdownMenuItem icon={<Settings2 className="w-3 h-3" />}>
                                        Edit
                                    </DropdownMenuItem>
                                </ModalTrigger>
                                <DeleteComp
                                    handleDelete={handleDelete}
                                    trigger={<Button
                                        icon={<TrashIcon className="w-3 h-3" />}
                                        variant="ghost"
                                        className='h-8 px-2 w-full justify-start'
                                    >
                                        Delete
                                    </Button>
                                    }
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ModalContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <ModalHeader>
                                        <ModalTitle>Edit User</ModalTitle>
                                        <ModalDescription>Edit User Role and Stutes whatever you want!</ModalDescription>
                                    </ModalHeader>
                                    <ModalBody className="space-y-2 pt-3">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between border rounded-md gap-2 px-2 pt-1 pb-2">
                                                    <FormLabel>Status</FormLabel>
                                                    <FormControl>
                                                        <ReportStatusFilters onChange={field.onChange} value={field.value} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </ModalBody>
                                    <ModalFooter className="flex flex-row items-center justify-end gap-2 pt-3">
                                        <ModalClose asChild>
                                            <Button variant="outline" type="button">
                                                Close
                                            </Button>
                                        </ModalClose>
                                        <Button icon={<Spinner active={form.formState.isSubmitting} />} variant="default" type="submit">
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Form >
                        </ModalContent>
                    </Modal>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })


    const FilterStatus = async (v: string) => {
        setLoading(true)
        const delay = 1000;
        const timeoutId = setTimeout(async () => {
            const data = await getAllReports(v as ReportStatus)
            setData(data)
            setLoading(false)
        }, delay);
        return () => clearTimeout(timeoutId);
    }

    const handelRefersh = () => {
        setLoading(true)
        const delay = 1000;
        const timeoutId = setTimeout(async () => {
            const data = await getAllReports("PENDING")
            setData(data)
            setLoading(false)
        }, delay);
        return () => clearTimeout(timeoutId);
    }


    return (
        <DataTable table={table}>
            <DataTableToolbar table={table}>
                <Button onClick={handelRefersh} size="sm" variant="ghost">
                    <RotateCcw className="ml-auto size-4" />
                </Button>
                <ReportStatusFilters onChange={FilterStatus} value={"PENDING"} />
            </DataTableToolbar>
        </DataTable>
    )
}
