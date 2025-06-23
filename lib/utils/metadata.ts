import { Metadata } from 'next';
import { drive, siteDescription, siteLink, siteName } from '@/config';

const app_icons = [
	{
		rel: 'apple-touch-icon',
		sizes: '32x32',
		url: `${siteLink}/apple-icon.png`,
	},
];

export function getMetadata({
	title,
	fullTitle,
	description = siteDescription,
	image = `${drive}/thumbnail.jpg`,
	video,
	icons = app_icons,
	url,
	keywords,
	canonicalUrl,
	noIndex = false,
	manifest,
}: {
	title?: string;
	fullTitle?: string;
	description?: string;
	image?: string | null;
	video?: string | null;
	icons?: Metadata['icons'];
	url?: string;
	keywords?: string[];
	canonicalUrl?: string;
	noIndex?: boolean;
	manifest?: string | URL | null;
} = {}): Metadata {
	return {
		title: fullTitle || (title ? `${title} - ${siteName}` : `${siteName} - ${siteDescription}`),
		description,
		openGraph: {
			title,
			description,
			...(image && {
				images: image,
			}),
			url,
			...(video && {
				videos: video,
			}),
			locale: 'en-US',
			siteName,
			type: 'website',
		},
		twitter: {
			title,
			description,
			...(image && {
				card: 'summary_large_image',
				images: [image],
			}),
			...(video && {
				player: video,
			}),
			creator: '@ilhafdotcom',
		},
		icons,
		keywords: keywords ? [...keywords, siteName] : [siteName],
		metadataBase: new URL(siteLink),
		...((url || canonicalUrl) && {
			alternates: {
				canonical: url || canonicalUrl,
			},
		}),
		robots: {
			index: !noIndex,
			follow: !noIndex,
			'max-image-preview': 'large',
		},
		...(manifest && {
			manifest,
		}),
	};
}
