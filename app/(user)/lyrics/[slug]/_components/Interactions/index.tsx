'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'motion/react';
import { motion } from 'motion/react';
import { ShareInteraction } from './share';
import { FavoriteInteraction } from './favorite';
import { InteractionFontSize } from './font-size';
import { InteractionPlayPause } from './play-pause';
import { useToggle } from '@/hooks/use-toggle';
import { Lyrics } from '@/db/schema';
import { useLyricsStore } from './../../_lib/use-lyrics-store';

interface InteractionsProps {
	lyricsData: Lyrics;
	children: React.ReactNode;
}

export default function Interactions({ lyricsData, children }: InteractionsProps) {
	const setData = useLyricsStore((state) => state.setData);
	useEffect(() => {
		setData(lyricsData);
	}, [lyricsData, setData]);

	const containerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(containerRef, { margin: '-200px 0px -100px 0px' });

	return (
		<div className="relative w-full md:grid md:grid-cols-12">
			<DesktopInteractions />
			<MobileInteractions isInView={isInView} />
			{/* Main Content Area */}
			<div ref={containerRef} className="pb-5 md:col-span-11 md:border-x">
				{children}
			</div>
		</div>
	);
}

function DesktopInteractions() {
	const [isHovered, setHovered] = useToggle('is-interaction-hovered');
	return (
		<motion.div
			initial={{ width: 50 }}
			animate={{
				width: isHovered ? 220 : 50,
			}}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className={cn(
				'bg-card sticky top-16 z-30 mx-1.5 mt-11 hidden h-max w-full rounded-sm p-2 md:col-span-1 md:block',
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<InteractionsButtons className="flex-col p-0" />
		</motion.div>
	);
}

function MobileInteractions({ isInView }: { isInView: boolean }) {
	return (
		<div className="bg-card fixed right-0 bottom-0 left-0 z-30 md:hidden">
			<motion.div
				variants={{
					hidden: { height: 0, opacity: 0 },
					visible: { height: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 100 } },
				}}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
				className="w-full overflow-hidden border-t"
			>
				<InteractionsButtons />
			</motion.div>
		</div>
	);
}

export function InteractionsButtons({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex w-full items-center justify-between gap-2 px-5 py-2', className)} {...props}>
			<ShareInteraction />
			<FavoriteInteraction />
			<InteractionFontSize />
			<InteractionPlayPause />
		</div>
	);
}
