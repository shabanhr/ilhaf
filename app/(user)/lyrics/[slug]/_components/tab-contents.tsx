'use client';
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useFontSize } from '@/hooks/use-font-size';
import { lyricsFontSizes } from '@/config/data';
import { usePersistentToggle } from '@/hooks/use-toggle';

export function TabTriggers({ hasContent }: { hasContent: boolean }) {
	const [isUrdu, setIsUrdu] = usePersistentToggle('is-urdu');

	React.useEffect(() => {
		if (!hasContent) {
			setIsUrdu(false);
		}
	}, [hasContent, setIsUrdu]);

	if (!hasContent) return null;

	return (
		<div className="bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-14 z-20 flex w-full flex-col items-center justify-center border-b py-1 backdrop-blur-lg drop-shadow-xl drop-shadow-background">
			<div className="flex w-full items-center justify-center gap-2">
				<button
					className={cn(
						'relative rounded-full px-4 py-1 text-xl font-medium',
						!isUrdu ? 'text-primary' : 'text-muted-foreground',
					)}
					onClick={() => setIsUrdu(false)}
				>
					{!isUrdu && (
						<motion.div
							layoutId="bubble"
							className="bg-primary absolute inset-x-0 bottom-0 z-10 h-[2px] w-full"
							style={{ borderRadius: 9999 }}
							transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
						/>
					)}
					English
				</button>
				<button
					className={cn(
						'relative rounded-full px-4 py-1 text-xl font-medium',
						isUrdu ? 'text-primary' : 'text-muted-foreground',
					)}
					onClick={() => setIsUrdu(true)}
				>
					{isUrdu && (
						<motion.div
							layoutId="bubble"
							className="bg-primary absolute inset-x-0 bottom-0 z-10 h-[2px] w-full"
							style={{ borderRadius: 9999 }}
							transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
						/>
					)}
					Urdu
				</button>
			</div>
		</div>
	);
}

export function EnglishTabContent({ children, className, ...props }: React.ComponentProps<'div'>) {
	const fontSizeId = useFontSize((state) => state.id);
	const fontSize = lyricsFontSizes.find((size) => size.id === fontSizeId);
	const [isUrdu] = usePersistentToggle('is-urdu');

	return (
		<div
			className={cn('animate-in fade-in p-2 duration-300', { hidden: isUrdu }, fontSize?.english, className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function UrduTabContent({ children, className, ...props }: React.ComponentProps<'div'>) {
	const fontSizeId = useFontSize((state) => state.id);
	const fontSize = lyricsFontSizes.find((size) => size.id === fontSizeId);
	const [isUrdu] = usePersistentToggle('is-urdu');

	return (
		<div
			className={cn(
				'animate-in fade-in hidden p-2 text-center duration-300',
				{
					block: isUrdu,
				},
				fontSize?.urdu,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
