'use client';
import React from 'react';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player/lazy';

export function VideoPlayer() {
	const lyricsData = useLyricsInteractions((state) => state.lyricsData);
	const isPlaying = useLyricsInteractions((state) => state.isPlaying);
	const setIsPlaying = (state: boolean) => useLyricsInteractions.setState({ isPlaying: state });

	if (!lyricsData) return <div className="hidden" />;
	const videoId = lyricsData.video;
	if (!videoId || videoId === '') return <div className="hidden" />;

	return (
		<AspectRatio ratio={16 / 9} className="relative h-full w-full rounded-md">
			<div className="size-full overflow-hidden rounded-md shadow-sm">
				<ReactPlayer
					controls
					fallback={<div className="bg-accent size-full rounded-md" />}
					url={`https://www.youtube.com/watch?v=${videoId}`}
					width="100%"
					height="100%"
					playing={isPlaying}
					onReady={() => setIsPlaying(false)}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
				/>
			</div>
		</AspectRatio>
	);
}
