'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
	const sidebar = useStore(useSidebar, (x) => x);
	if (!sidebar) return null;
	const { getOpenState, settings } = sidebar;

	return (
		<>
			<main
				className={cn(
					'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-950',
					!settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72'),
				)}
			>
				{children}
			</main>
			<footer
				className={cn(
					'transition-[margin-left] duration-300 ease-in-out',
					!settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72'),
				)}
			>
				<div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 z-20 w-full shadow backdrop-blur">
					<div className="mx-4 flex h-14 items-center md:mx-8">
						<p className="text-muted-foreground text-left text-xs leading-loose md:text-sm">
							Built by{' '}
							<Link
								href="https://efferd.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline underline-offset-4"
							>
								efferd.com
							</Link>
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default AdminProvider;
