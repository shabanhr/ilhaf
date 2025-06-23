import { Card } from '@/components/ui/card';
import Image from 'next/image';
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
				<PageDescription>
					Discover a vast collection of Islamic lyrics, designed to uplift your soul and deepen your connection with the
					divine
				</PageDescription>
			</div>
			<BorderSeparator />
			<div className="bp mx-auto flex max-w-4xl flex-col items-start justify-center space-y-6">
				<p className="text-muted-foreground">
					ilhaf.com was founded on the 1st of May 2024 by Shaban Haider. We are based in Faisalabad City, Pakistan. Our
					mission is to provide a comprehensive collection of Islamic lyrics that inspire and elevate the soul. Our
					website features an extensive library of Islamic lyrics, carefully curated to ensure quality and authenticity.
				</p>
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Meet Our Team</h2>
					<p className="text-muted-foreground">
						The dedicated individuals behind the creation and curation of our Islamic lyrics website.
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{[
						{ name: 'Shaban Haider', role: 'Founder & CEO', image: '/shaban-haider.webp' },
						{ name: 'Ali Aoun', role: 'Content Writer', image: '/ali-aoun.webp' },
						{ name: 'Ali Abdullah', role: 'Content Writer', image: '/ali-abdullah.webp' },
					].map((member, index) => (
						<Card key={index} className="flex flex-col items-center gap-4 rounded-lg p-6 shadow-lg">
							<Image
								src={member.image}
								width={120}
								height={120}
								className="rounded-full"
								alt={`Team Member ${member.name}`}
							/>
							<div className="text-lg font-semibold">{member.name}</div>
							<div className="text-sm opacity-80">{member.role}</div>
						</Card>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}
