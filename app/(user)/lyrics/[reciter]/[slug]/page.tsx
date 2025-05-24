import React from 'react';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { publisher, siteLink, siteName } from '@/config';
import { capitalize, cn } from '@/lib/utils';
import { arrayToString, convertLyricsArr, getRecitersLinks } from '@/lib/lyrics';
import { getImageURL, getLyricsURL } from '@/lib/utils';
import GradientHeading from '@/components/GradientHeading';
import Link from 'next/link';
import Promotion from './_components/Promotion';
import { PatreonIcon } from '@/components/icons';
import ResponsiveAd from '@/components/ad/ResponsiveAd';
import Similar from './_components/Similar';
import { CustomImage } from '@/components/CustomImage';
import { LyricsContent } from './_components/lyrics-content';
import { GetLyricsData } from './_lib/queries';
import Interactions from './_components/Interactions';
import { currentUser } from '@/config/auth';
import VideoPlayer from './_components/VideoPlayer';
import { fontUrdu } from '@/lib/fonts';

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

	const finalSlug = `${siteLink}/${getLyricsURL(reciter, slug)}`;

	// const mp3url = getAudioURL(slug);
	// const audioExists = await checkObjectExistsInR2(`lyrics/${slug}/audio.mp3`);

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
		<article>
			<Script id="lyrics" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<GradientHeading className="my-2 text-2xl font-extrabold md:text-4xl" h={1}>
				{title} Lyrics - {Reciter}
			</GradientHeading>
			<p>
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

			<div className="mx-auto my-10 flex flex-col items-center justify-center gap-4 md:flex-row">
				<div className="h-full w-full md:w-[34%]">
					<CustomImage
						slug={slug}
						alt={`${title} Lyrics by ${recitersList}`}
						className="shadow-[rgba(0,_0,_0,_0.3)_0px_0px_70px] dark:shadow-[rgba(255,_255,_255,_0.3)_0px_0px_70px]"
					/>
				</div>

				<div className="relative mt-4 w-full px-2 md:mt-0 md:w-[65%]">
					<div className="flex items-center justify-start gap-x-2">
						{/* {audioExists && <PlayBtn slug={slug} title={title} reciterName={recitersList} reciterSlug={reciter} />} */}

						<div className="mt-6">
							<h2 className="text-primary my-1 text-sm opacity-90">Title</h2>
							<p className="mt-1 mb-5">{title}</p>
						</div>
					</div>

					<div className="mt-5 grid grid-cols-2 gap-x-4">
						<div>
							<h2 className="text-primary my-1 text-sm opacity-80">Recited By</h2>
							<p className="my-1 text-xs">{recitersLinks}</p>
						</div>
						<div>
							<h2 className="text-primary my-1 text-sm opacity-80">Written By</h2>
							<p className="my-1 text-xs">{writersNames}</p>
						</div>
					</div>
				</div>
			</div>
			{/* <Promotion orientation="horizontal" /> */}
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

			<div className="my-10 grid grid-cols-1 gap-2 md:grid-cols-7 lg:grid-cols-8">
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
						{/* <Promotion /> */}
						<Promotion
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
			<Similar slug={slug} type={type} topics={topics.map((topic) => topic.id)} />
		</article>
	);
}
