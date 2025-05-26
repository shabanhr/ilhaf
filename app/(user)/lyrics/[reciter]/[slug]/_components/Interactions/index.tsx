'use client';

import React, { useEffect, useRef } from 'react';
import TabTriggers from './tab-triggers';
import { cn } from '@/lib/utils';
import { useInView } from 'motion/react';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { LyricsWithData } from '@/types';
import { MotionDiv } from '@/components/motion';
import { InteractionShare } from './share';
import InteractionFavorite from './favorite';
import { InteractionFontSize } from './font-size';
import { InteractionPlayPause } from './play-pause';
// import { SelectionActions } from "./selection-actions";

const InteractionsButtons = ({ className }: { className?: string }) => {
	return (
		<div className={cn('flex w-full items-center justify-between gap-2 px-5 py-2', className)}>
			<InteractionShare />
			<InteractionFavorite />
			<InteractionFontSize />
			<InteractionPlayPause />
		</div>
	);
};

interface InteractionsProps {
	showTabs: boolean;
	lyricsData: LyricsWithData;
	favorited: boolean;
	userId?: string;
	children: React.ReactNode;
}

const Interactions: React.FC<InteractionsProps> = ({ showTabs, lyricsData, favorited, userId, children }) => {
	// Update global state for lyrics interactions
	useEffect(() => {
		useLyricsInteractions.setState({ lyricsData, favorited, userId });
	}, [lyricsData, favorited, userId]);

	// Element and state references
	const containerRef = useRef<HTMLDivElement>(null);
	const isHovered = useLyricsInteractions((state) => state.isHovered);
	const setHovered = (state: boolean) => useLyricsInteractions.setState({ isHovered: state });

	// Detect if the container is in view
	const isInView = useInView(containerRef, { margin: '-200px 0px -100px 0px' });

	return (
		<div className="relative w-full md:grid md:grid-cols-12">
			{/* Desktop Sidebar */}
			<MotionDiv
				initial={{ width: 50 }}
				animate={{
					width: isHovered ? 220 : 50,
					opacity: isHovered ? 1 : 0.8,
				}}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className={cn(
					'bg-card sticky top-16 left-0 z-10 my-5 hidden h-max w-full rounded-md border p-2 md:col-span-1 md:block',
				)}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<InteractionsButtons className="flex-col p-0" />
			</MotionDiv>

			{/* Mobile Bottom Bar */}
			<div className="bg-card fixed right-0 bottom-0 left-0 z-30 md:hidden">
				<MotionDiv
					variants={{
						hidden: { height: 0, opacity: 0 },
						visible: { height: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 100 } },
					}}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
					className="w-full overflow-hidden border-t"
				>
					<InteractionsButtons />
				</MotionDiv>
			</div>

			{/* Main Content Area */}
			<div ref={containerRef} className="relative w-full pr-2 pb-5 pl-3 md:col-span-11">
				<TabTriggers showTabs={showTabs} />
				{children}
			</div>

			{/* Selection Actions */}
			{/* <SelectionActions containerRef={containerRef} /> */}
		</div>
	);
};

export default Interactions;
