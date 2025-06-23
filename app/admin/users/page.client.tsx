'use client';
import React from 'react';
import { DataTable } from '@/components/data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import useSWR from 'swr';
import { searchParamsCache } from './_lib/validations';
import { getUsers } from './_lib/queries';
import { getUsersReturn } from './_lib/types';
import { generateSearchParams } from '@/lib/parsers';
import { getValidFilters } from '@/lib/data-table';
import { getUsersTableColumns } from './_components/get-users-colums';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { DataTableFilterList } from '@/components/data-table/filter-list';
import { useSearchParams } from 'next/navigation';

export function UsersClientPage() {
	const searchParams = useSearchParams();
	const search = searchParamsCache.parse(generateSearchParams(searchParams));
	const validFilters = getValidFilters(search.filters);

	const {
		data: tableData,
		isLoading,
		mutate,
	} = useSWR<getUsersReturn>(['users', searchParams.toString()], () =>
		getUsers({
			...search,
			filters: validFilters,
		}),
	);

	const columns = React.useMemo(() => getUsersTableColumns(mutate), [mutate]);

	const { table } = useDataTable({
		data: tableData?.data ?? [],
		columns,
		pageCount: tableData?.pageCount ?? 0,
		initialState: {
			sorting: [{ id: 'updatedAt', desc: true }],
			pagination: { pageSize: 10, pageIndex: 0 },
		},
		getRowId: (row) => row.id,
	});

	if (isLoading)
		return (
			<DataTableSkeleton
				withViewOptions
				columnCount={6}
				cellWidths={['18rem', '8rem', '10rem', '8rem', '8rem', '2rem']}
				shrinkZero
			/>
		);

	return (
		<DataTable table={table}>
			<DataTableAdvancedToolbar table={table}>
				<DataTableFilterList table={table} align="start" />
			</DataTableAdvancedToolbar>
		</DataTable>
	);
}
