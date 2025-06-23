'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { InnerInteractionButton } from './inner-Button';
import { useToggle } from '@/hooks/use-toggle';

export const InteractionPlayPause = () => {
	const [isPlaying, setIsPlaying] = useToggle('is-playing');

	return (
		<Button
			variant="ghost"
			onClick={() => setIsPlaying(!isPlaying)}
			className="md:hidden md:h-8 md:justify-start md:p-2"
			disabled={isPlaying === undefined}
		>
			<InnerInteractionButton Icon={isPlaying ? PauseIcon : PlayIcon} text={isPlaying ? 'Pause' : 'Play'} />
		</Button>
	);
};
