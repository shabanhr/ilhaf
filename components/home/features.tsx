import React from 'react';
import { ShieldCheck, VolumeX, HeartHandshake, BookOpenCheck } from 'lucide-react';

const features = [
	{
		icon: ShieldCheck,
		title: 'No Premium Content',
		description: 'All content is free',
	},
	{
		icon: VolumeX,
		title: 'No Ads',
		description: 'No ads or interruptions',
	},
	{
		icon: BookOpenCheck,
		title: 'Clean Reading',
		description: 'Distraction-free experience.',
	},  
	{
		icon: HeartHandshake,
		title: 'Just Your Support',
		description: 'Powered by your support.',
	},
];

export function Features() {
	return (
		<div className="py-8">
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				{features.map((feature, index) => (
					<div key={index} className="flex flex-col items-center justify-center gap-2 text-center">
						<feature.icon className="text-primary size-6" />
						<div>
							<h3 className="text-sm font-semibold">{feature.title}</h3>
							<p className="text-muted-foreground text-xs lg:text-sm">{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
