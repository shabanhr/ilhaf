import { Button } from '@/components/ui/button';
import { Headset } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function SupportCTA() {
	return (
		<div className="flex flex-col items-center justify-center space-y-3 bp">
			<h2 className="text-xl font-semibold md:text-2xl lg:text-3xl lg:font-bold">Still have Questions?</h2>
			<p className="text-muted-foreground mx-auto max-w-xl text-center text-sm text-balance md:text-base">
				Feel free to reach out to us with any questions or concerns you may have. we&apos;re here to help!
			</p>
			<div className="flex items-center gap-x-2">
				<Button asChild>
					<Link target="_blank" href="https://cal.com/sshahaider">
						<Headset />
						Book a Call
					</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/contact">Contact Us</Link>
				</Button>
			</div>
		</div>
	);
}
