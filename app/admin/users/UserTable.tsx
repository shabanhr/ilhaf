'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteUserById, getAllUsers } from './actions';
import { getTimeAgo } from '@/lib/date';

import { toast } from 'sonner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getErrorMessage } from '@/lib/handle-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitialChar } from '@/lib/utils';
import { DataTable } from '../_components/data-table';
import { DataTableToolbar } from '../_components/data-table/toolbar';

export type UserInTable = {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
	date: Date | null;
	role: 'USER' | 'ADMIN';
};

interface Props {
	initData: UserInTable[];
}

export default function UserTable({ initData }: Props) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [loading, setLoading] = React.useState<boolean>(false);
	const [data, setData] = React.useState<UserInTable[]>(initData);

	const fetchData = async () => {
		const data = await getAllUsers();
		setData(data);
		setLoading(false);
	};

	// React.useEffect(() => {
	//     fetchData()
	// }, [])

	const columns: ColumnDef<UserInTable>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
			accessorKey: 'user',
			header: 'User',
			filterFn: (row, columnId, filterValue) => {
				const { name } = row.original;
				if (name?.toLowerCase().includes(filterValue.toLowerCase())) {
					return true;
				}
				return false;
			},
			cell: ({ row }) => {
				const { image, name, email, role } = row.original;
				return (
					<div className="flex items-center justify-start gap-2">
						<Avatar className="relative">
							<AvatarImage src={image || ''} />
							<AvatarFallback>{getInitialChar(name || '')}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							{role === 'ADMIN' ? <div className="font-bold text-green-500">Admin</div> : name}
							<div className="text-xs opacity-75">{email}</div>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'date',
			header: 'Joined On',
			cell: ({ row }) => <div className="">{getTimeAgo(row.getValue('date'))}</div>,
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const { id } = row.original;

				const handleDelete = async () => {
					toast.promise(deleteUserById(id), {
						loading: 'Deleting image...',
						success: () => {
							fetchData();
							return 'Images Deleted';
						},
						error: (err) => {
							return getErrorMessage(err);
						},
					});
				};

				return (
					<AlertDialog>
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
								<AlertDialogTrigger asChild>
									<DropdownMenuItem>
										<Trash />
										Delete
									</DropdownMenuItem>
								</AlertDialogTrigger>
							</DropdownMenuContent>
						</DropdownMenu>

						<AlertDialogContent>
							<AlertDialogHeader>
								<Trash className="h-6 w-6" />
								<AlertDialogTitle>Are you Sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete User and remove User from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleDelete}>Yes, Sure</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				);
			},
		},
	];

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
	});

	const filterFields = [
		{
			id: 'user',
			label: 'Name',
			placeholder: 'Filter by name...',
		},
	];

	return (
		<DataTable table={table}>
			<DataTableToolbar table={table} filterFields={filterFields as any} />
		</DataTable>
	);
}
