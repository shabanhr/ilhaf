import React from 'react';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { publisher, siteLink, siteName } from '@/config';
import { arrayToString, convertLyricsArr } from '@/lib/utils/lyrics';
import { capitalize, getImageURL, getLyricsURL } from '@/lib/utils';
import { LyricsContent } from './_components/lyrics-content';
import { getLyricsData } from './_lib/queries';
import Interactions from './_components/Interactions';
import { VideoPlayer } from './_components/video-player';
import { TabTriggers, EnglishTabContent, UrduTabContent } from './_components/tab-contents';
import { BorderSeparator, PageHeading } from '@/components/sheard';
import { SimilarLyrics } from './_components/similar-lyrics';
import { getMetadata } from '@/lib/utils/metadata';
import { AdWrapper, AdUnit, ResponsiveBanner } from '@/components/sheard/ads';

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

	const {
		title,
		reciters,
		writersNames,
		writers,
		dop,
		updatedAt,
		type,
		oldSlug,
		english: engLyrics,
		urdu: urLyrics,
		topics,
	} = data;
	const capitalType = capitalize(type);
	const image = getImageURL({ slug, oldSlug });
	const fullURL = `${siteLink}${getLyricsURL(slug)}`;
	const reciterNames = arrayToString(reciters.map((r) => r.reciter));

	const finalWriterNames = writersNames || writers.map((w) => w.writer.name).join(', ');
	const schemaMarkupWriters = writersNames?.split(',') || writers.map((w) => w.writer.name);

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
			lyricist: schemaMarkupWriters.map((writer) => ({
				'@type': 'Person',
				name: writer,
			})),
			lyricText: engLyrics,
		},
	};

	return (
		<>
			<Script id="lyrics" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<ResponsiveBanner uniqeId={`${slug}-banner`} />

			<BorderSeparator />

			<div className="grid grid-cols-1 md:grid-cols-[.62fr_.38fr]">
				<div className="flex w-full items-center border-b p-3 md:border-r md:border-b-0">
					<PageHeading className="text-4xl font-extrabold">{title}</PageHeading>
				</div>
				<div className="grid w-full grid-cols-2 place-items-center px-1 py-2 text-xs">
					<div className="w-full border-r p-2">
						<h2 className="text-foreground/80 mb-1 font-light tracking-wide">{capitalType} Recited By</h2>
						<p className="font-mono">{reciterNames}</p>
					</div>
					<div className="w-full p-2">
						<h2 className="text-foreground/80 mb-1 font-light tracking-wide">Written By</h2>
						<p className="font-mono">{finalWriterNames}</p>
					</div>
				</div>
			</div>

			<BorderSeparator />

			<AdWrapper uniqeId={`${slug}-before-lyrics`}>
				<AdUnit slotId="3018789542" format="horizontal" style={{ width: '100%', height: '90px' }} responsive />
			</AdWrapper>

			<BorderSeparator className="z-30" />

			<div className="grid grid-cols-1 md:grid-cols-[.62fr_.38fr]">
				<Interactions lyricsData={data}>
					<TabTriggers hasContent={hasContent} />
					<EnglishTabContent>
						<LyricsContent slug={slug} paragraphs={english} title={title} />
					</EnglishTabContent>
					<UrduTabContent>
						<LyricsContent slug={slug} paragraphs={urdu} title={title} len="Urdu" />
					</UrduTabContent>
				</Interactions>

				<div className="w-full">
					<div className="md:sticky md:top-14">
						<VideoPlayer thumbnail={image} />
						<AdWrapper uniqeId={`${slug}-after-video`}>
							<AdUnit slotId="1095333789" format="square" style={{ width: '336px', height: '280px' }} />
						</AdWrapper>
					</div>
				</div>
			</div>

			<SimilarLyrics slug={slug} type={type} topics={topics.map((t) => t.topicId)} />
		</>
	);
}
