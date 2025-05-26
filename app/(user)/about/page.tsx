import { siteName } from '@/config';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export const dynamic = 'force-static';

const meta = {
	title: `About Us - ${siteName}`,
	dec: 'ilhaf.com was founded on the 1st of May 2024 by Shaban Haider.',
	link: `/about`,
};

export function generateMetadata() {
	return {
		title: meta.title,
		description: meta.dec,
		keywords: [`About`, siteName],
		alternates: {
			canonical: meta.link,
		},
		openGraph: {
			title: meta.title,
			description: meta.dec,
			url: meta.link,
			locale: 'en-US',
			siteName: siteName,
			type: 'website',
		},
	};
}

export default function Component() {
	return (
		<div className="mx-auto flex min-h-screen max-w-5xl flex-col">
			<div className="flex flex-col items-center justify-center space-y-6 text-center">
				<div className="space-y-4">
					<h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">About Us</h1>
					<p className="text-foreground/80 max-w-[900px] text-balance">
						Discover a vast collection of Islamic lyrics, designed to uplift your soul and deepen your connection with
						the divine.
					</p>
				</div>
			</div>
			<div className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-start justify-center space-y-6">
						<div className="space-y-4">
							<p>
								ilhaf.com was founded on the 1st of May 2024 by Shaban Haider. We are based in Faisalabad City,
								Pakistan. Our mission is to provide a comprehensive collection of Islamic lyrics that inspire and
								elevate the soul. Our website features an extensive library of Islamic lyrics, carefully curated to
								ensure quality and authenticity.
							</p>
						</div>
						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Meet Our Team</h2>
							<p>The dedicated individuals behind the creation and curation of our Islamic lyrics website.</p>
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
				</div>
			</div>
		</div>
	);
}
