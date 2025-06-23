import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconType } from '@/types';

interface Props {
	heading?: string;
	description?: string;
	buttonLabel?: string;
	bottomLabel?: string;
	Icon?: IconType;
	link?: string;
	orientation?: 'horizontal' | 'vertical';
}

export function PromotionCard({
	heading = 'Support Our Work',
	description = 'Your support will help us continue providing free and quality content to the Shia community.',
	buttonLabel = 'Support Us',
	bottomLabel = 'Your support matters!',
	link = '/support',
	Icon = Sparkles,
	orientation = 'vertical',
}: Props) {
	const isHorizontal = orientation === 'horizontal';

	return (
		<div className="group my-5 w-full">
			<div
				className={cn('flex flex-col p-4', {
					'md:flex-row': isHorizontal,
				})}
			>
				<div className="flex w-full flex-col items-start justify-center">
					<p className="text-foreground mb-3 font-mono text-2xl font-bold tracking-tight [text-shadow:_0_-20px_40px_rgba(255,255,255,0.20),_0_20px_40px_rgba(255,255,255,0.20)] sm:text-3xl">
						{heading}
					</p>
					<p className="text-muted-foreground mb-5 text-sm sm:text-base">{description}</p>
				</div>
				<div className="flex items-center justify-center">
					<Link
						target="_blank"
						href={link}
						className={buttonVariants({ className: cn('w-full', { 'md:w-max': isHorizontal }) })}
					>
						{buttonLabel}
						<Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
			<div className="bg-muted/30 flex items-center justify-between border-y p-4">
				<p className="text-muted-foreground text-sm font-medium">{bottomLabel}</p>
				<Badge>Act Now</Badge>
			</div>
		</div>
	);
}
