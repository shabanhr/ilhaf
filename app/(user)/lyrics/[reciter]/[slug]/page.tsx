import React from 'react';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { publisher, siteLink, siteName } from '@/config';
import { capitalize } from '@/lib/utils';
import { arrayToString, convertLyricsArr, getRecitersLinks } from '@/lib/lyrics';
import { getImageURL, getLyricsURL } from '@/lib/utils';
import Link from 'next/link';
import { PromotionCard } from './_components/promotion-card';
import { PatreonIcon } from '@/components/icons';
import ResponsiveAd from '@/components/ad/ResponsiveAd';
import { LyricsContent } from './_components/lyrics-content';
import { GetLyricsData } from './_lib/queries';
import Interactions from './_components/Interactions';
import { currentUser } from '@/config/auth';
import { VideoPlayer } from './_components/video-player';
import { fontUrdu } from '@/lib/fonts';
import { SimilarLyrics } from './_components/similar-lyrics';
import { AnimatedImage } from '@/components/lyrics-card/animated-image';

interface Params {
	params: Promise<{ reciter: string; slug: string }>;
}

export async function generateMetadata(props: Params) {
	const params = await props.params;
	const { slug, reciter } = params;
	const imageUrl = getImageURL(slug);
	const res = await GetLyricsData({ reciter, slug });
	if (!res) return notFound();
	const { data } = res;

	const {
		title,
		reciter: { name: Reciter },
		type,
	} = data;
	const capitalType = capitalize(type);

	const meta = {
		title: `${title} Lyrics - ${Reciter}`,
		description: `Check Out The ${title} ${capitalType} Lyrics, Recited by ${Reciter} in English & Urdu`,
		link: getLyricsURL(reciter, slug),
	};

	return {
		title: meta.title,
		description: meta.description,
		keywords: [`${title} Lyrics`, Reciter, capitalType],
		alternates: {
			canonical: meta.link,
		},
		openGraph: {
			title: meta.title,
			images: [imageUrl],
			description: meta.description,
			url: meta.link,
			locale: 'en-US',
			siteName,
			type: 'website',
		},
	};
}

export default async function Slug(props: Params) {
	const params = await props.params;
	const { reciter, slug } = params;
	const user = await currentUser();
	const userId = user?.id;
	const res = await GetLyricsData({ reciter, slug, userId });
	if (!res) return notFound();
	const { data, favorited } = res;

	const {
		title,
		topics,
		writers,
		reciter: Reciters,
		reciter: { name: Reciter },
		otherReciters,
		type,
		dop,
		updatedAt,
	} = data;
	const image = getImageURL(slug);
	const otherRecitersNames = otherReciters.map((reciter) => reciter.reciter.name);
	const recitersList = arrayToString([Reciter, ...otherRecitersNames]);
	const recitersLinks = getRecitersLinks([Reciters, ...otherReciters.map((item) => item.reciter)]);

	const writersNames = writers.length > 0 ? arrayToString(writers.map((writer) => writer.name)) : 'Unknown';

	const finalSlug = `${siteLink}${getLyricsURL(reciter, slug)}`;

	const year = dop?.getFullYear();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': finalSlug,
		},
		headline: `${title} Lyrics`,
		description: `${title} Lyrics by ${Reciter} in English and Urdu`,
		image: image,
		author: {
			'@type': 'Organization',
			name: siteName,
			url: siteLink,
		},
		publisher: publisher,
		datePublished: dop?.toISOString().split('T')[0],
		dateModified: updatedAt?.toISOString().split('T')[0],
		additionalType: 'https://schema.org/MusicComposition',
		musicComposition: {
			'@type': 'MusicComposition',
			name: title,
			lyricist: writers.map((writer) => ({
				'@type': 'Person',
				name: writer.name,
			})),
			lyricText: data.english,
		},
	};

	const { english, urdu } = convertLyricsArr(data.english, data.urdu);

	const hasContent = english && urdu;

	return (
		<article className="space-y-5">
			<Script id="lyrics" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<h1 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
				{title} Lyrics - {Reciter}
			</h1>
			<p className="text-foreground/80 font-mono text-base">
				Let&#8217;s Check Out The <strong>{title} Lyrics</strong>, Recited by <strong>{recitersList}</strong>. It is a
				New{' '}
				<Link className="a" href={`/lyrics?type=${type}`}>
					{capitalize(type)}
				</Link>{' '}
				of the Year {year}. {writers.length > 0 && `Its Beautiful Lyrics Are Written By ${writersNames}.`}
			</p>

			<ResponsiveAd
				mobile={{
					slot: '3710555110',
					width: 320,
					height: 100,
				}}
				desktop={{
					slot: '4828655113',
					width: 728,
					height: 90,
				}}
			/>
			<div className="mx-auto flex flex-col items-center justify-center gap-4 md:flex-row">
				<div className="h-full w-full md:w-[34%]">
					<AnimatedImage
						slug={slug}
						alt={`${title} Lyrics by ${recitersList}`}
						className="shadow-[--theme(--color-foreground/0.2)_0px_0px_60px]"
					/>
				</div>

				<div className="relative mt-4 w-full px-2 md:mt-0 md:w-[65%]">
					<div className="flex items-center justify-start gap-x-2">
						<div className="mt-6">
							<h2 className="text-foreground/80 mb-1 text-sm">Title</h2>
							<Link href={finalSlug} className="font-mono font-medium hover:underline">
								{title}
							</Link>
						</div>
					</div>

					<div className="mt-5 grid grid-cols-2 gap-x-4">
						<div>
							<h2 className="text-foreground/80 mb-1 text-sm">Recited By</h2>
							<p>{recitersLinks}</p>
						</div>
						<div>
							<h2 className="text-foreground/80 mb-1 text-sm">Written By</h2>
							<p>{writersNames}</p>
						</div>
					</div>
				</div>
			</div>

			<ResponsiveAd
				mobile={{
					slot: '3018789542',
					width: 250,
					height: 250,
				}}
				desktop={{
					slot: '3518983424',
					width: 930,
					height: 120,
				}}
			/>

			<div className="grid grid-cols-1 gap-2 md:grid-cols-7 lg:grid-cols-8">
				<div className="relative my-4 w-full md:col-span-5 lg:col-span-5">
					<Interactions userId={userId} favorited={favorited} lyricsData={data} showTabs={!!hasContent}>
						<div id="lyrics">
							<LyricsContent paragraphs={english} title={title} />
						</div>
						<div id="urdu-lyrics" style={{ ...fontUrdu.style, textAlign: 'center' }}>
							<LyricsContent paragraphs={urdu} title={title} len="Urdu" />
						</div>
					</Interactions>
					{/* <p className='opacity-80'>Found a mistake? Just select the incorrect part and click on the report button to provide the correction. We will replace it.</p> */}
				</div>
				<div className="w-full md:col-span-2 lg:col-span-3">
					<div className="md:sticky md:top-16">
						<VideoPlayer />
						<PromotionCard
							topLabel="Support Us"
							heading="Support Our Work"
							dec="Join us on Patreon and help us continue creating great content."
							buttonLabel="Become a Patron"
							link="https://www.patreon.com/ilhaf"
							Icon={PatreonIcon}
							bottomLabel="Your Support matters!"
						/>
					</div>
				</div>
			</div>
			<SimilarLyrics slug={slug} type={type} topics={topics.map((topic) => topic.id)} />
		</article>
	);
}
