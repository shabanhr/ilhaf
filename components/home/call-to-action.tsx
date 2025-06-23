import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Headset } from 'lucide-react';
import { Github } from 'lucide-react';
import { BorderSeparator } from '../sheard';

export function CallToAction() {
	return (
		<section className="grid md:grid-cols-2 w-full">
			<div className='flex flex-col items-center justify-center space-y-2 md:border-r bp lg:p-8'>
				<h2 className="text-xl font-semibold md:text-2xl lg:font-bold">Proudly Open Source</h2>
				<p className="text-muted-foreground text-sm text-center text-balance">
					Our source code is available on GitHub - feel free to read, review, or contribute to it however you want!
				</p>
				<Button variant="ghost" asChild>
					<Link
						href="https://github.com/sshahaider/ilhaf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github /> Star on GitHub
					</Link>
				</Button>
			</div>
			<BorderSeparator className="md:hidden"/>
			<div className='flex flex-col items-center justify-center space-y-2 bp lg:p-8'>
				<h2 className="text-xl font-semibold md:text-2xl lg:font-bold">Have any Questions?</h2>
				<p className="text-muted-foreground text-sm text-center text-balance">
					Feel free to reach out to us with any questions or concerns you may have. we&apos;re here to help!
				</p>
				<Button variant="ghost" asChild>
					<Link href="/contact">
						<Headset />
						Contact Us
					</Link>
				</Button>
			</div>
		</section>
	);
}
