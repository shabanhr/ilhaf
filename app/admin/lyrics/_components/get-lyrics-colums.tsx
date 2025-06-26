import React from 'react';
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getErrorMessage } from '@/lib/utils/error';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils/date';
import { capitalize, truncate } from '@/lib/utils';
import DeleteComp from '@/components/DeleteComp';
import { toast } from 'sonner';
import { LyricsInTable } from '../_lib/types';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { deleteLyricsById } from '../_lib/actions';
import { ColumnDef } from '@tanstack/react-table';
import { LyricsTypes } from '@/config/data';
import { arrayToString } from '@/lib/utils/lyrics';

export function getLyricsTableColumns(mutate: () => void): ColumnDef<LyricsInTable>[] {
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
			enableHiding: false,
		},
		{
			accessorKey: 'title',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
			cell: ({ row }) => {
				const { slug, title } = row.original;
				return (
					<Link className="hover:underline" href={`/lyrics/${slug}`}>
						{truncate(title, 40)}
					</Link>
				);
			},
			meta: {
				label: 'Title',
				placeholder: 'Search titles...',
				variant: 'text',
			},
			enableColumnFilter: true,
		},
		{
			accessorKey: 'type',
			header: 'Type',
			cell: ({ row }) => {
				const type = row.getValue('type');
				return (
					<Badge variant="outline" className="capitalize">
						{capitalize(type as string)}
					</Badge>
				);
			},
			meta: {
				label: 'Type',
				variant: 'multiSelect',
				options: LyricsTypes.map((type) => ({
					label: type.name,
					value: type.id,
				})),
			},
			enableColumnFilter: true,
		},
		{
			accessorKey: 'reciters',
			header: 'Reciters',
			cell: ({ row }) => {
				const { reciters } = row.original;
				return <div>{arrayToString(reciters.map((reciter) => reciter.reciter))}</div>;
			},
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const status = row.getValue('status');
				const p = status === 'published';
				return (
					<div className="capitalize">
						<Badge variant={p ? 'default' : 'secondary'}>{status as string}</Badge>
					</div>
				);
			},
			meta: {
				label: 'Status',
				variant: 'multiSelect',
				options: [
					{
						label: 'Draft',
						value: 'draft',
					},
					{
						label: 'Published',
						value: 'published',
					},
				],
			},
			enableColumnFilter: true,
		},
		{
			accessorKey: 'updatedAt',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
			cell: ({ row }) => <div className="">{timeAgo(row.getValue('updatedAt'), { withAgo: true })}</div>,
		},
		{
			accessorKey: 'dop',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
			cell: ({ row }) => <div className="pl-2">{timeAgo(row.getValue('dop'), { withAgo: true })}</div>,
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const { id } = row.original;

				const handleDelete = () => {
					toast.promise(deleteLyricsById(id), {
						loading: 'Deleting Lyrics...',
						success: () => {
							return 'Lyrics Deleted';
						},
						error: (err) => {
							return getErrorMessage(err);
						},
						finally: () => {
							mutate();
						},
					});
				};

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
							<DropdownMenuItem asChild>
								<Link href={`/admin/add?id=${id}`}>
									<PencilIcon /> Edit
								</Link>
							</DropdownMenuItem>
							<DeleteComp
								handleDelete={handleDelete}
								trigger={
									<Button variant="ghost" size="sm" className="w-full justify-start px-2">
										<TrashIcon />
										Delete
									</Button>
								}
							/>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
}
