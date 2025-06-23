import { redirect, notFound } from 'next/navigation';
import { db } from '@/db'; // or your actual DB import
import { lyrics } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface Props {
	params: Promise<{ slug: string; subSlug: string }>;
}

export default async function SubSlug({ params }: Props) {
	const { slug, subSlug } = await params;
	const fullSlug = `${slug}/${subSlug}`;
	// 1. Fetch the lyric using slug (which is probably subSlug)
	const lyric = await db.query.lyrics.findFirst({
		where: eq(lyrics.oldSlug, fullSlug),
	});

	if (!lyric) {
		notFound();
	}

	return redirect(`/lyrics/${lyric.slug}`);
}
