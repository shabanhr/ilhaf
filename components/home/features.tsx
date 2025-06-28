import React from 'react';
import { FileCheck2, Sparkles, BookOpenCheck, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
	{
		icon: FileCheck2,
		title: 'Clean & Correct',
		description: 'High quality content. No fluff.',
	},
	{
		icon: Moon,
		title: 'Dark Mode',
		description: 'Read comfortably anytime.',
	},
	{
		icon: BookOpenCheck,
		title: 'Clean Reading',
		description: 'Distraction-free experience.',
	},
	{
		icon: Sparkles,
		title: 'Smart Suggestions',
		description: "Find lyrics you'll love.",
	},
];

export function Features() {
	return (
		<div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
			{features.map((feature, index) => (
				<div
					key={index}
					className={cn('flex flex-col items-center justify-center p-2', {
						'md:border-r': index !== features.length - 1,
					})}
				>
					<feature.icon className="size-6" strokeWidth={1} aria-hidden />
					<h3 className="mt-4 text-sm font-semibold lg:text-base">{feature.title}</h3>
					<p className="text-muted-foreground mt-1 text-center text-xs">{feature.description}</p>
				</div>
			))}
		</div>
	);
}
