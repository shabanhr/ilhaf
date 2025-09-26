import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Headset } from 'lucide-react';

export function CallToAction() {
	return (
		<div className="bp flex flex-col items-center justify-center space-y-2 lg:p-8">
			<h2 className="text-xl font-semibold md:text-2xl lg:font-bold">Have any Questions?</h2>
			<p className="text-muted-foreground text-center max-w-[60ch] text-sm text-balance">
				Feel free to reach out to us with any questions or concerns you may have. we&apos;re here to help!
			</p>
			<Button variant="ghost" asChild>
				<Link href="/contact">
					<Headset />
					Contact Us
				</Link>
			</Button>
		</div>
	);
}
