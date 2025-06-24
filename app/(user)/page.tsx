import { Hero } from '@/components/home/hero';
import { CallToAction } from '@/components/home/call-to-action';
import { BorderSeparator } from '@/components/sheard';
import { Features } from '@/components/home/features';
import { RecentLyrics } from '@/components/home/recent-lyrics';
import { getLyricsData } from '@/lib/actions/lyrics';

export default async function Home() {
	const { data: lyricsList } = await getLyricsData({ page: 1, take: 6 });

	return (
		<>
			<Hero />
			<BorderSeparator />
			<Features />
			<RecentLyrics lyricsList={lyricsList} />
			<BorderSeparator />
			<CallToAction />
		</>
	);
}
