'use client';

import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactPlayer from 'react-player/youtube';
import { PlayIcon } from 'lucide-react';
import { AnimatedImage } from '@/components/lyrics-card/animated-image';
import { useToggle } from '@/hooks/use-toggle';
import { useLyricsStore } from '../_lib/use-lyrics-store';

export function VideoPlayer({ thumbnail }: { thumbnail: string }) {
	const lyricsData = useLyricsStore((state) => state.data);
	const [isPlaying, setIsPlaying] = useToggle('is-playing');
	const [isPlayerVisible, setIsPlayerVisible] = React.useState(false);

	React.useEffect(() => {
		setIsPlaying(false);
	}, [lyricsData]);

	React.useEffect(() => {
		if (isPlaying) {
			setIsPlayerVisible(true);
		}
	}, [isPlaying]);

	if (!lyricsData) return <div className="hidden" />;
	const videoId = lyricsData.video;
	if (!videoId || videoId === '') return <div className="hidden" />;

	return (
		<div className="relative border-b p-2 md:p-0">
			<AspectRatio ratio={16 / 9}>
				{!isPlayerVisible ? (
					<div className="relative size-full cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
						<AnimatedImage
							rounded={false}
							src={thumbnail}
							alt={`${lyricsData.title} Lyrics Video`}
							className="size-full object-cover"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-black/40 duration-200 hover:bg-black/60 active:bg-black/80">
							<PlayIcon className="size-8 text-white" />
						</div>
					</div>
				) : (
					<ReactPlayer
						controls
						url={`https://www.youtube.com/watch?v=${videoId}`}
						width="100%"
						height="100%"
						playing={isPlaying}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
					/>
				)}
			</AspectRatio>
		</div>
	);
}
