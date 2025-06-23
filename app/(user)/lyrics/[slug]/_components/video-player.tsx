'use client';

import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player/youtube';
import { PlayIcon } from 'lucide-react';
import { AnimatedImage } from '@/components/lyrics-card/animated-image';
import { useToggle } from '@/hooks/use-toggle';
import { useLyricsStore } from '../_lib/use-lyrics-store';

export function VideoPlayer({ thumbnail }: { thumbnail: string }) {
	const lyricsData = useLyricsStore((state) => state.data);
	const [isPlaying, setIsPlaying] = useToggle('is-playing');
	const [isPlayerVisible, setIsPlayerVisible] = useState(false);

	if (!lyricsData) return <div className="hidden" />;
	const videoId = lyricsData.video;
	if (!videoId || videoId === '') return <div className="hidden" />;

	return (
		<AspectRatio ratio={16 / 9} className="relative size-full border-b px-2 md:px-0">
			{!isPlayerVisible ? (
				<div
					className="relative size-full cursor-pointer overflow-hidden"
					onClick={() => {
						setIsPlayerVisible(true);
						setIsPlaying(true);
					}}
				>
					<AnimatedImage rounded={false} src={thumbnail} alt={lyricsData.title} className="size-full object-cover" />
					<div className="absolute inset-0 flex items-center justify-center bg-black/40">
						<PlayIcon className="size-12 text-white" />
					</div>
				</div>
			) : (
				<ReactPlayer
					controls
					url={`https://www.youtube.com/watch?v=${videoId}`}
					width="100%"
					height="100%"
					playing={isPlaying}
					onReady={() => setIsPlaying(false)}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
				/>
			)}
		</AspectRatio>
	);
}
