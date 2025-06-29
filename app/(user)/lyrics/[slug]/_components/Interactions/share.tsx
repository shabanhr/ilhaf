'use client';
import React from 'react';
import { siteLink, siteName } from '@/config';
import { InnerInteractionButton } from './inner-Button';
import { Share2Icon } from 'lucide-react';
import { getLyricsURL } from '@/lib/utils';
import { useLyricsStore } from '../../_lib/use-lyrics-store';

export function ShareInteraction() {
	const lyricsData = useLyricsStore((state) => state.data);

	if (!lyricsData) return null;

	const title = lyricsData.title || 'Unknown Title';

	const shareData = {
		title: siteName,
		text: `${title}, Let's Read All Lyrics here!`,
		url: siteLink + getLyricsURL(lyricsData.slug),
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
		<InnerInteractionButton Icon={Share2Icon} onClick={handleShare}>
			Share
		</InnerInteractionButton>
	);
}
