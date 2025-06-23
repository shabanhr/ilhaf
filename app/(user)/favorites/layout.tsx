import { BorderSeparator, PageHeading } from '@/components/sheard';
import { confirmUser } from '@/lib/auth';
import { getMetadata } from '@/lib/utils/metadata';
import React from 'react';

export const metadata = getMetadata({
	title: 'My favorites',
	url: '/favorites',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	await confirmUser();

	return (
		<React.Fragment>
			<div className="bp flex items-center justify-center">
				<PageHeading>My Favorites</PageHeading>
			</div>
			<BorderSeparator />
			<div className="bp">{children}</div>
		</React.Fragment>
	);
}
