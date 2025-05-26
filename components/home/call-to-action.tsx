import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Headset } from 'lucide-react';

export function CallToAction() {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-y-5 pt-8">
			<h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">Have any Questions?</h2>
			<p className="text-foreground/80 max-w-sm text-center text-base text-balance">
				Feel free to reach out to us with any questions or concerns you may have. we're here to help!
			</p>
			<Button size="lg" asChild>
				<Link href="/contact">
					<Headset />
					Contact Us
				</Link>
			</Button>
		</section>
	);
}
