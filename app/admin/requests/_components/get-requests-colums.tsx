import React from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils/date';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { RequestsInTable } from '../_lib/types';
import { getRequestBadgeVariant } from '@/lib/utils/requests';

export function getRequestsTableColumns(): ColumnDef<RequestsInTable>[] {
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
				const { title } = row.original;
				return (
					<Link href={`/admin/requests/${row.original.id}`} className="hover:underline">
						{title}
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
			accessorKey: 'video',
			header: 'Video',
			cell: ({ row }) => {
				const videoId = row.getValue('video');
				return (
					<Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" className="hover:underline">
						Video
					</Link>
				);
			},
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const status = row.getValue('status');
				return (
					<div className="capitalize">
						<Badge variant={getRequestBadgeVariant(status as string)}>{status as string}</Badge>
					</div>
				);
			},
			meta: {
				label: 'Status',
				variant: 'multiSelect',
				options: [
					{
						label: 'Pending',
						value: 'pending',
					},
					{
						label: 'Accepted',
						value: 'accepted',
					},
					{
						label: 'Rejected',
						value: 'rejected',
					},
				],
			},
			enableColumnFilter: true,
		},
		{
			accessorKey: 'dop',
			header: ({ column }) => <DataTableColumnHeader column={column} title="DOP" />,
			cell: ({ row }) => <div>{timeAgo(row.getValue('dop'), { withAgo: true })}</div>,
		},
		{
			accessorKey: 'createdAt',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
			cell: ({ row }) => <div>{timeAgo(row.getValue('createdAt'), { withAgo: true })}</div>,
		},
		{
			accessorKey: 'updatedAt',
			header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
			cell: ({ row }) => <div>{timeAgo(row.getValue('updatedAt'), { withAgo: true })}</div>,
		},
	];
}
