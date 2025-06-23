import { MetadataRoute } from 'next';
import { siteLink } from '@/config';
import { getLyricsURL } from '@/lib/utils';
import { db } from '@/db';
import { lyrics } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const date = new Date().toISOString();
	const mainRoutes = ['', 'contact', 'policy', 'about', 'auth'];
	const routes = mainRoutes.map((route) => ({
		url: `${siteLink}/${route}`,
		lastModified: date,
	}));
	const publishedLyrics = await db
		.select({
			slug: lyrics.slug,
			updatedAt: lyrics.updatedAt,
		})
		.from(lyrics)
		.where(eq(lyrics.status, 'published'))
		.orderBy(desc(lyrics.updatedAt));

	const allLyrics = publishedLyrics.map((item) => ({
		url: `${siteLink}${getLyricsURL(item.slug)}`,
		lastModified: item.updatedAt.toISOString(),
	}));

	return [...routes, ...allLyrics];
}

export default sitemap;
