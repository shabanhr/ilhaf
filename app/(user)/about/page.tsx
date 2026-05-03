import { getMetadata } from '@/lib/utils/metadata';
import { BorderSeparator, PageDescription, PageHeading } from '@/components/sheard';
import React from 'react';

export const metadata = getMetadata({
	title: 'About Us',
	description: 'ilhaf.com was founded on the 1st of May 2024 by Shaban Haider.',
	url: `/about`,
});


export default function AboutPage() {
	return (
		<React.Fragment>
			<div className="bp flex flex-col items-center justify-center text-center">
				<PageHeading>About Us</PageHeading>
				<PageDescription>A modren lyrics platform</PageDescription>
			</div>
			<BorderSeparator />
			<div className="bp mx-auto prose lg:prose-lg  dark:prose-invert">
				<p>Ilhaf.com was founded on the 1st of May 2024.</p>
				<p>
					We are based in Faisalabad City, Pakistan. Our mission is to provide a comprehensive collection of lyrics that
					inspire and elevate the soul. Our website features an extensive library of lyrics, carefully curated to ensure
					quality and authenticity.
				</p>
			</div>
		</React.Fragment>
	);
}
