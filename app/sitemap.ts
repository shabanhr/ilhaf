import { MetadataRoute } from 'next'
import { siteLink } from '@/config';
import { prisma } from '@/prisma';
import { getLyricsURL } from '@/lib/utils';

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const date = new Date().toISOString();
    const mainRoutes = ['', 'contact', 'policy', 'about', 'auth']
    const routes = mainRoutes.map((route) => ({
        url: `${siteLink}/${route}`,
        lastModified: date,
    }))
    const publishedLyrics = await prisma.lyrics.findMany({
        where: { p: true },
        select: {
            slug: true,
            updatedAt: true,
            reciter: {
                select: {
                    slug: true,
                }
            }
        },
        orderBy: {
            updatedAt: "desc"
        }
    });
    const publishedReciter = await prisma.reciter.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    });

    const allLyrics = publishedLyrics.map((item) => ({
        url: `${siteLink}${getLyricsURL(item.reciter.slug, item.slug)}`,
        lastModified: item.updatedAt.toISOString(),
    }))
    const allReciters = publishedReciter.map((item) => ({
        url: `${siteLink}/lyrics/${item.slug}`,
        lastModified: item.updatedAt.toISOString(),
    }))

    return [...routes, ...allLyrics, ...allReciters];
}