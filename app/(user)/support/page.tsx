import { siteName } from '@/config';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BorderSeparator } from '@/components/sheard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PatreonIcon } from '@/components/icons';

const meta = {
	title: `Support - ${siteName}`,
	dec: '',
	link: `/support`,
};

export function generateMetadata() {
	return {
		title: meta.title,
		description: meta.dec,
		keywords: [`Support`, siteName],
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

export default function Support() {
	return (
		<div className="text-foreground/80">
			<div className="space-y-4 pb-8 text-center">
				<h1 className="text-foreground text-3xl font-extrabold sm:text-4xl md:text-5xl">Support Our Mission</h1>
				<p className="mx-auto max-w-2xl text-balance">
					Your donations help us continue to provide valuable resources and content to the Islamic community. Join us in
					our mission!
				</p>
			</div>
			<BorderSeparator />
			<div className="grid gap-8 py-8 md:grid-cols-2">
				<div className="flex flex-col items-start justify-center space-y-4">
					<h2 className="text-foreground text-2xl font-bold sm:text-3xl">Our Mission</h2>
					<p>
						Our website is dedicated to providing a comprehensive platform for Islamic lyrics in both Urdu and English.
						We aim to help the community connect with their faith through the beauty of Islamic poetry and lyrics.
					</p>
					<p>
						Your donations will help us expand our lyrics database, create more engaging content, and invest in
						infrastructure to better serve our community.
					</p>
				</div>
				<div className="flex items-center justify-center">
					<Link
						target="_blank"
						href="https://www.patreon.com/ilhaf"
						className="text-foreground flex min-h-48 w-full items-center justify-center gap-2 rounded-md border p-4"
					>
						<PatreonIcon className="size-5" />
						<span className="font-mono text-lg font-semibold">Become a Patron</span>
					</Link>
				</div>
			</div>
			<BorderSeparator />

			<div className="space-y-6 py-8">
				<h2 className="text-foreground text-2xl font-bold sm:text-3xl">How Your Donations Help</h2>
				<p>
					Your donations help us maintain and expand our website, which serves as a hub for Islamic lyrics in both Urdu
					and English. Your support allows us to:
				</p>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div className="flex items-start gap-3">
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
							<CheckIcon className="h-5 w-5" />
						</div>
						<span>Produce high-quality content</span>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
							<CheckIcon className="h-5 w-5" />
						</div>
						<span>Maintain and improve our website's functionality and accessibility</span>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
							<CheckIcon className="h-5 w-5" />
						</div>
						<span>Expand our collection of lyrics</span>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
							<CheckIcon className="h-5 w-5" />
						</div>
						<span>Invest in better servers for better Speed</span>
					</div>
				</div>
			</div>
		</div>
	);
}
