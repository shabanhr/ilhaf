'use client';

import React from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { InnerInteractionButton } from './inner-Button';
import { useToggle } from '@/hooks/use-toggle';

export const InteractionPlayPause = () => {
	const [isPlaying, setIsPlaying] = useToggle('is-playing');

	return (
		<InnerInteractionButton
			className="md:hidden"
			onClick={() => setIsPlaying(!isPlaying)}
			disabled={isPlaying === undefined}
			Icon={isPlaying ? PauseIcon : PlayIcon}
		>
			{isPlaying ? 'Pause' : 'Play'}
		</InnerInteractionButton>
	);
};
