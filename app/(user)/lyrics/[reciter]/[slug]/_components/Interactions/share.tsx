'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { siteLink, siteName } from '@/config';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { InnerInteractionButton } from './inner-Button';
import { Share2Icon } from 'lucide-react';
import { getLyricsURL } from '@/lib/utils';

export const InteractionShare = () => {
	const lyricsData = useLyricsInteractions((state) => state.lyricsData);

	if (!lyricsData) return <div className="hidden" />;

	const title = lyricsData.title || 'Unknown Title';

	const shareData = {
		title: siteName,
		text: `${title}, Let's Read All Lyrics here!`,
		url: siteLink + getLyricsURL(lyricsData.reciter.slug, lyricsData.slug),
	};

	const handleShare = async () => {
		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				console.error('Web Share API is not supported in this browser.');
			}
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	return (
		<Button variant="ghost" onClick={handleShare} className="w-full md:h-8 md:justify-start md:p-2">
			<InnerInteractionButton Icon={Share2Icon} text="Share" />
		</Button>
	);
};
