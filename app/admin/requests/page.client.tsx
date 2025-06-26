'use client';
import React from 'react';
import { DataTable } from '@/components/data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { searchParamsCache } from './_lib/validations';
import { getRequests } from './_lib/queries';
import { getRequestsReturn } from './_lib/types';
import { generateSearchParams } from '@/lib/parsers';
import { getValidFilters } from '@/lib/data-table';
import { getRequestsTableColumns } from './_components/get-requests-colums';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import { DataTableFilterList } from '@/components/data-table/filter-list';

export function RequestsClientPage() {
	const searchParams = useSearchParams();
	const search = searchParamsCache.parse(generateSearchParams(searchParams));
	const validFilters = getValidFilters(search.filters);

	const {
		data: tableData,
		isLoading,
	} = useSWR<getRequestsReturn>(['requests', searchParams.toString()], () =>
		getRequests({
			...search,
			filters: validFilters,
		}),
	);

	const columns = React.useMemo(() => getRequestsTableColumns(), []);

	const { table } = useDataTable({
		data: tableData?.data ?? [],
		columns,
		pageCount: tableData?.pageCount ?? 0,
		initialState: {
			sorting: [{ id: 'createdAt', desc: true }],
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
