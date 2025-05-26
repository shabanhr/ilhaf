import { siteLink, siteName } from '@/config';
import Script from 'next/script';
import { Hero } from '@/components/home/hero';
import { RecentLyrics } from '@/components/home/recent-lyrics';
import { TopReciters } from '@/components/home/top-reciters';
import { CallToAction } from '@/components/home/call-to-action';
import { BorderSeparator } from '@/components/sheard';

export default function Home() {
	const jsonLd = {
		'@context': 'https://schema.org/',
		'@type': 'WebSite',
		name: siteName,
		url: siteLink,
	};

	return (
		<>
			<Script id="home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<Hero />
			<RecentLyrics />
			<TopReciters />
			<BorderSeparator />
			<CallToAction />
		</>
	);
}
