import React from 'react';
import { getRequestById } from '../_lib/queries';
import RequestIdClientPage from './page.client';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function RequestIdPage({ params }: Props) {
	const { id } = await params;

	const request = await getRequestById(id);

	if (!request) {
		return <div>Request Not Found</div>;
	}

	return <RequestIdClientPage request={request} />;
}
