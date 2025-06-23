import React from 'react';
import { BorderSeparator, PageHeading, PageDescription } from '@/components/sheard';
import { getMetadata } from '@/lib/utils/metadata';
import { SupportCTA } from './_components/cta';
import SupportOptions from './_components/support-options';
import { SupportGoal } from './_components/goal';
import { WhatNext } from './_components/what-next';

export const metadata = getMetadata({
	title: 'Support',
	url: `/support`,
});

export default function Support() {
	return (
		<React.Fragment>
			<div className="bp flex flex-col items-center justify-center text-center">
				<PageHeading className="lg:font-bold">Support Our Mission</PageHeading>
				<PageDescription>
					Your donations help us continue to provide valuable resources and content to the Islamic community. Join us in
					our mission!
				</PageDescription>
			</div>
			<BorderSeparator />
			<div className="grid grid-cols-1 md:grid-cols-2">
				<SupportOptions />
				<SupportGoal />
			</div>
			<BorderSeparator />
			<WhatNext />
			<BorderSeparator />
			<SupportCTA />
		</React.Fragment>
	);
}
