import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { TextEffect } from '../motion/text-effect';
import { AnimatedGroup } from '../motion/animated-group';
import { LyricPencilIcon, LyricsIcon } from '../icons';

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: 'blur(12px)',
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			y: 0,
			transition: {
				type: 'spring',
				bounce: 0.3,
				duration: 1.5,
			},
		},
	},
} as const;

export function Hero() {
	return (
		<section className="bp-x relative grid grid-cols-1 gap-5 py-8 md:grid-cols-2 md:py-0">
			<div className="flex flex-col items-center justify-center gap-y-4 md:items-start">
				<TextEffect
					preset="fade-in-blur"
					speedSegment={0.3}
					as="h1"
					className="text-center text-3xl font-extrabold tracking-tight md:text-left md:text-4xl lg:text-5xl"
				>
					A Diary For Reciters
				</TextEffect>
				<TextEffect
					per="line"
					preset="fade-in-blur"
					speedSegment={0.3}
					delay={0.5}
					as="p"
					className="text-muted-foreground text-center text-sm md:text-left md:text-base"
				>
					Ilhaf is an online diary for reciters. where reciters can find all the content they need to recite.
				</TextEffect>
				<AnimatedGroup
					variants={{
						container: {
							visible: {
								transition: {
									staggerChildren: 0.05,
									delayChildren: 0.75,
								},
							},
						},
						...transitionVariants,
					}}
					className="flex items-center gap-x-2"
				>
					<Button size="lg" asChild>
						<Link target="_blank" href="/lyrics">
							<LyricsIcon />
							Explore
						</Link>
					</Button>
					<Button key={2} size="lg" variant="outline" asChild>
						<Link href="/requests?tab=new-request">Request Lyrics</Link>
					</Button>
				</AnimatedGroup>
			</div>
			<AnimatedGroup
				variants={{
					container: {
						visible: {
							transition: {
								staggerChildren: 0.05,
								delayChildren: 0.75,
							},
						},
					},
					...transitionVariants,
				}}
			>
				<div className="relative">
					<LyricPencilIcon className="aspect-square size-full" />
					<div
						aria-hidden
						className="to-background absolute inset-0 bg-gradient-to-r from-transparent via-transparent"
					/>
				</div>
			</AnimatedGroup>
		</section>
	);
}
