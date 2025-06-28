import React from 'react';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { publisher, siteLink, siteName } from '@/config';
import { arrayToString, convertLyricsArr } from '@/lib/utils/lyrics';
import { capitalize, getImageURL, getLyricsURL } from '@/lib/utils';
import { PromotionCard } from './_components/promotion-card';
import { LyricsContent } from './_components/lyrics-content';
import { getLyricsData } from './_lib/queries';
import Interactions from './_components/Interactions';
import { VideoPlayer } from './_components/video-player';
import { TabTriggers, EnglishTabContent, UrduTabContent } from './_components/tab-contents';
import { BorderSeparator, PageHeading } from '@/components/sheard';
import { SimilarLyrics } from './_components/similar-lyrics';
import { getMetadata } from '@/lib/utils/metadata';
import { TopAds } from './_components/ads';

interface Params {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
	const { slug } = await params;
	const data = await getLyricsData(slug);
	if (!data) return notFound();

	const imageUrl = getImageURL({ slug, oldSlug: data.oldSlug });
	const { title, reciters, type } = data;
	const capitalType = capitalize(type);
	const reciterNames = arrayToString(reciters.map((r) => r.reciter));

	const description = `Check Out The ${title} ${capitalType} Lyrics, Recited by ${reciterNames} in English & Urdu`;
	const url = getLyricsURL(slug);

	return getMetadata({
		fullTitle: `${title} Lyrics - ${reciterNames}`,
		description,
		keywords: [`${title} Lyrics`, reciters.map((r) => r.reciter.name).join(', '), capitalType],
		url,
		image: imageUrl,
	});
}

export default async function SlugPage({ params }: Params) {
	const { slug } = await params;
	const data = await getLyricsData(slug);
	if (!data) return notFound();

	const { title, reciters, writers, dop, updatedAt, type, oldSlug, english: engLyrics, urdu: urLyrics, topics } = data;
	const capitalType = capitalize(type);
	const image = getImageURL({ slug, oldSlug });
	const fullURL = `${siteLink}${getLyricsURL(slug)}`;
	const reciterNames = arrayToString(reciters.map((r) => r.reciter));
	const writerNames = writers.map((w) => w.writer.name).join(', ');
	const { english, urdu } = convertLyricsArr(engLyrics, urLyrics);
	const hasContent = !!english && !!urdu;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': fullURL,
		},
		headline: `${title} Lyrics`,
		description: `${title} Lyrics by ${reciterNames} in English and Urdu`,
		image,
		author: {
			'@type': 'Organization',
			name: siteName,
			url: siteLink,
		},
		publisher,
		datePublished: dop?.toISOString().split('T')[0],
		dateModified: updatedAt?.toISOString().split('T')[0],
		additionalType: 'https://schema.org/MusicComposition',
		musicComposition: {
			'@type': 'MusicComposition',
			name: title,
			lyricist: writers.map((writer) => ({
				'@type': 'Person',
				name: writer.writer.name,
			})),
			lyricText: engLyrics,
		},
	};

	return (
		<>
			<Script id="lyrics" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<TopAds />

			<BorderSeparator />

			<div className="grid grid-cols-1 md:grid-cols-[.60fr_.40fr] lg:grid-cols-[.62fr_.38fr]">
				<div className="flex w-full items-center border-b p-4 md:border-r md:border-b-0">
					<PageHeading className="w-full">{title}</PageHeading>
				</div>
				<div className="grid w-full grid-cols-2 place-items-center gap-2 p-4">
					<div className="w-full">
						<h2 className="text-foreground/80 mb-1 text-xs">{capitalType} Recited By</h2>
						<p className="font-mono text-sm">{reciterNames}</p>
					</div>
					<div className="w-full">
						<h2 className="text-foreground/80 mb-1 text-xs">Written By</h2>
						<p className="font-mono text-sm">{writerNames}</p>
					</div>
				</div>
			</div>

			<BorderSeparator className="z-30" />

			<div className="grid grid-cols-1 md:grid-cols-[.60fr_.40fr] lg:grid-cols-[.62fr_.38fr]">
				<Interactions lyricsData={data}>
					<TabTriggers hasContent={hasContent} />
					<EnglishTabContent>
						<LyricsContent paragraphs={english} title={title} />
					</EnglishTabContent>
					<UrduTabContent>
						<LyricsContent paragraphs={urdu} title={title} len="Urdu" />
					</UrduTabContent>
				</Interactions>

				<div className="w-full">
					<div className="md:sticky md:top-16">
						<VideoPlayer thumbnail={image} />
						<PromotionCard />
					</div>
				</div>
			</div>

			<SimilarLyrics slug={slug} type={type} topics={topics.map((t) => t.topicId)} />
		</>
	);
}
