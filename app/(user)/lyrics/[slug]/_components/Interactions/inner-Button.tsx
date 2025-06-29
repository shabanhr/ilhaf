'use client';
import { motion } from 'motion/react';
import React from 'react';
import { IconType } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

type InnerInteractionButton = React.ComponentProps<typeof Button> & {
	Icon: IconType;
	children: React.ReactNode;
};

export function InnerInteractionButton({ Icon, children, ...props }: InnerInteractionButton) {
	return (
		<Tooltip delayDuration={1000}>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon" {...props}>
					<motion.span>
						<Icon className="size-5 md:size-4 lg:size-4.5" />
					</motion.span>
					<span className="sr-only">{children}</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent className="hidden lg:block" side="right">
				{children}
			</TooltipContent>
		</Tooltip>
	);
}
