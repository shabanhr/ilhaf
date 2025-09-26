import { getMetadata } from '@/lib/utils/metadata';
import { BorderSeparator, PageDescription, PageHeading } from '@/components/sheard';
import React from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { drive } from '@/config';

export const metadata = getMetadata({
	title: 'About Us',
	description: 'ilhaf.com was founded on the 1st of May 2024 by Shaban Haider.',
	url: `/about`,
});

// const members = [
// 	{ image: 'shaban.webp', name: 'Shaban Haider', role: 'Founder ' },
// 	{ image: 'abdullah.webp', name: 'Ali Abdullah', role: 'Content Writer' },
// 	{ image: 'aoun.webp', name: 'Ali Aoun', role: 'Content Writer' },
// ];

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
				{/* <div className="space-y-4">
					<h2 className="text-xl font-semibold">Meet Our Team</h2>
					<p className="text-muted-foreground">
						The dedicated individuals behind the creation and curation of our ilhaf.com website.
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
					{members.map((member, index) => (
						<div key={index} className="grid grid-cols-[auto_1fr] items-center gap-3">
							<Avatar className="ring-foreground/10 size-10 rounded-(--radius) border border-transparent shadow ring-1">
								<AvatarImage src={`${drive}/${member.image}`} alt={member.name} />
								<AvatarFallback className="rounded-(--radius)">{member.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<span className="text-foreground font-medium">{member.name}</span>
								<div className="text-muted-foreground text-sm">{member.role}</div>
							</div>
						</div>
					))}
				</div> */}
			</div>
		</React.Fragment>
	);
}
