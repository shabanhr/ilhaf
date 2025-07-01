import React from 'react';
import { BorderSeparator, PageHeading } from '@/components/sheard';
import { getCurrentUser } from '@/lib/auth';
import RequestsClientPage from './page.client';
import { getMetadata } from '@/lib/utils/metadata';

export const metadata = getMetadata({
	title: 'Requests',
	url: `/requests`,
});

export default async function RequestsPage() {
	const user = await getCurrentUser();

	return (
		<>
			<div className="bp flex flex-col items-center justify-center">
				<PageHeading>Requests</PageHeading>
			</div>
			<BorderSeparator className="z-30" />
			<RequestsClientPage user={user} />
		</>
	);
}
