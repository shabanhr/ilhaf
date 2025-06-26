'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from '@/types';

interface Item {
	title: string;
	link: string;
	icon: IconType;
}

interface Props {
	item: Item;
	className?: string;
	isExternal?: boolean;
}

export function LinkItem({ item, className, isExternal }: Props) {
	const pathname = usePathname();
	const isHome = item.title === 'Home';
	const isActive = isHome ? pathname === '/' : pathname === item.link;

	return (
		<Link
			href={item.link}
			className={cn(
				'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex text-nowrap w-full items-center justify-start gap-x-2 rounded-md p-2 text-sm duration-200 md:justify-center',
				isActive && 'bg-accent',
				className,
			)}
			target={isExternal ? '_blank' : undefined}
		>
			<item.icon className="size-4" /> {item.title}
		</Link>
	);
}
