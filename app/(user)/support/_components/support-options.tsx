'use client';

import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Make sure you have this utility
import { drive } from '@/config';
import { ORDivider } from '@/components/auth/or-divider';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SupportOptions() {
	const [tab, setTab] = React.useState<'local' | 'international'>('local');

	return (
		<div className="border-b md:border-r md:border-b-0">
			<Tabs value={tab} onValueChange={(val) => setTab(val as 'local' | 'international')}>
				<div className="flex w-full items-center gap-2 border-b px-4 py-2">
					<button
						className={cn(
							'relative rounded-full px-2 py-0.5 text-sm',
							tab === 'local' ? 'text-primary' : 'text-muted-foreground',
						)}
						onClick={() => setTab('local')}
					>
						{tab === 'local' && (
							<motion.div
								layoutId="bubble"
								className="bg-primary absolute inset-x-0 bottom-0 z-10 h-[2px] w-full"
								style={{ borderRadius: 9999 }}
								transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
							/>
						)}
						Local
					</button>
					<button
						className={cn(
							'relative rounded-full px-2 py-0.5 text-sm',
							tab === 'international' ? 'text-primary' : 'text-muted-foreground',
						)}
						onClick={() => setTab('international')}
					>
						{tab === 'international' && (
							<motion.div
								layoutId="bubble"
								className="bg-primary absolute inset-x-0 bottom-0 z-10 h-[2px] w-full"
								style={{ borderRadius: 9999 }}
								transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
							/>
						)}
						International
					</button>
				</div>
				<TabsContent value="local" className="bp space-y-4">
					<span className="text-xl">Raast:</span>
					<p className="text-muted-foreground font-mono text-lg">03207376123</p>
					<ORDivider />
					<img src={`${drive}/mb-qr.png`} className="mx-auto rounded-lg" />
				</TabsContent>
				<TabsContent value="international" className="bp space-y-4">
					<span className="text-xl">TRC20 Wallet:</span>
					<p className="text-muted-foreground font-mono text-lg">TEnEBfhg3K2dohLYs4JK2eu3NSioAW9tyD</p>
					<ORDivider />
					<Link
						target="_blank"
						href="https://www.patreon.com/ilhaf"
						className="text-muted-foreground hover:bg-accent/50 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border p-4"
					>
						<span className="font-mono text-lg font-semibold">Become a Patron</span>
						<ArrowUpRight className="size-5" />
					</Link>
				</TabsContent>
			</Tabs>
		</div>
	);
}
