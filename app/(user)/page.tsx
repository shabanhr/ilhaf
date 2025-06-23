import { Hero } from '@/components/home/hero';
import { CallToAction } from '@/components/home/call-to-action';
import { BorderSeparator } from '@/components/sheard';
import { Features } from '@/components/home/features';
import { RecentLyrics } from '@/components/home/recent-lyrics';

export default function Home() {
	return (
		<>
			<Hero />
			<BorderSeparator />
			<Features />
			<RecentLyrics />
			<BorderSeparator />
			<CallToAction />
		</>
	);
}
