import Link from 'next/link';
import React from 'react';
import { Separator } from '../ui/separator';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
	text: string;
	link?: string;
	className?: string;
}

const SectionTitle = ({ text, link, className }: SectionTitleProps) => {
	return (
		<div>
			<div className={cn('flex w-full items-end justify-between', className)}>
				<h2 className="text-base md:text-lg">{text}</h2>
				{link && (
					<Link href={link} className="group flex h-full items-center justify-center gap-x-2">
						<span className="text-base md:text-lg">View All</span>
						<ArrowRightIcon className="size-4 duration-200 group-hover:translate-x-1" />
					</Link>
				)}
			</div>
			<Separator className="mt-2 mb-4" />
		</div>
	);
};

export default SectionTitle;
