import './globals.css';
import { Metadata } from 'next';
import { RootProviders } from '@/components/providers';
import { domain, siteLink, siteName } from '@/config';
import { fontSans, fontMono } from '@/lib/fonts';
import Scripts from '@/components/Scripts';
import { cn } from '@/lib/utils';

const meta = {
	title: 'Ilhaf - An Online Diary For Reciters',
	dec: 'ilhaf.com is a website for getting and read the lyrics of Manqabats and Nohay, it user friendly website.',
	link: siteLink + '/',
};

export const metadata: Metadata = {
	title: meta.title,
	description: meta.dec,
	metadataBase: new URL(siteLink),
	applicationName: siteName,
	keywords: [siteName, domain],
	publisher: siteName,
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
	},
	alternates: {
		canonical: meta.link,
	},
	openGraph: {
		title: meta.title,
		description: meta.dec,
		url: meta.link,
		locale: 'en-US',
		siteName,
		type: 'website',
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Scripts />
			<head />
			<body
				className={cn(
					'bg-background text-foreground min-h-svh overscroll-none font-sans antialiased',
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<RootProviders themeProps={{ attribute: 'class', defaultTheme: 'light' }}>{children}</RootProviders>
			</body>
		</html>
	);
}
