import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitialChar } from '@/lib/utils';
import { timeAgo } from '@/lib/utils/date';
import { toast } from 'sonner';
import { UsersInTable } from '../_lib/types';
import { deleteUserById } from '../_lib/actions';
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontalIcon, Trash } from 'lucide-react';
import { getErrorMessage } from '@/lib/utils/error';

export function getUsersTableColumns(mutate: () => void): ColumnDef<UsersInTable>[] {
	return [
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
							{role === 'admin' ? <div className="font-bold text-green-500">Admin</div> : name}
							<div className="text-xs opacity-75">{email}</div>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'createdAt',
			header: 'Joined On',
			cell: ({ row }) => <div className="">{timeAgo(row.getValue('createdAt'))}</div>,
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
							mutate();
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
									<MoreHorizontalIcon className="h-4 w-4" />
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
}
