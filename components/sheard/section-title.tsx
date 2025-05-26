import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BorderSeparator } from '.';

type SectionTitleProps = React.ComponentProps<'div'> & {
	text: string;
	link?: string;
};

export function SectionTitle({ text, link, className, ...props }: SectionTitleProps) {
	return (
		<React.Fragment>
			<BorderSeparator />
			<div className={cn('flex w-full items-end justify-between py-1', className)} {...props}>
				<h2 className="font-mono text-lg font-medium md:text-xl">{text}</h2>
				{link && (
					<Link href={link} className="group flex h-full items-center justify-center gap-x-2">
						<span className="text-lg font-medium md:text-xl">View All</span>
						<ArrowRightIcon className="size-4 duration-200 group-hover:translate-x-1 md:size-5" />
					</Link>
				)}
			</div>
			<BorderSeparator />
		</React.Fragment>
	);
}

export default SectionTitle;
