'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { InnerInteractionButton } from './inner-Button';

export const InteractionPlayPause = () => {
	const isPlaying = useLyricsInteractions((state) => state.isPlaying);

	const handlePlayPause = () => {
		useLyricsInteractions.setState((state) => ({ isPlaying: !state.isPlaying }));
	};
	return (
		<Button
			variant="ghost"
			onClick={handlePlayPause}
			className="md:hidden md:h-8 md:justify-start md:p-2"
			disabled={isPlaying === undefined}
		>
			<InnerInteractionButton Icon={isPlaying ? PauseIcon : PlayIcon} text={isPlaying ? 'Pause' : 'Play'} />
		</Button>
	);
};
