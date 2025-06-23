import React from 'react';
import { CheckIcon } from 'lucide-react';

export function WhatNext() {
	const list = [
		[
			'Publish more lyrics',
			'Improve site speed and accessibility',
			'Expand lyrics library',
			'Upgrade servers for reliability',
		],
		['Add Quran with Tafseer', 'Launch mobile app', 'Add smart search', 'Enable user contributions'],
	];

	return (
		<div className="grid md:grid-cols-2">
			<div className="bp space-y-4 border-b md:border-r md:border-b-0">
				<h3 className="text-lg font-semibold">How Your Support Helps</h3>
				<ul className="space-y-3">
					{list[0].map((item, i) => (
						<ListItem key={i} text={item} />
					))}
				</ul>
			</div>

			<div className="bp space-y-4">
				<h3 className="text-lg font-semibold">What&apos;s Next?</h3>
				<ul className="space-y-3">
					{list[1].map((item, i) => (
						<ListItem key={i} text={item} />
					))}
				</ul>
			</div>
		</div>
	);
}

interface ListItemProps {
	text: string;
}

export function ListItem({ text }: ListItemProps) {
	return (
		<div className="flex items-start gap-3">
			<div className="text-foreground flex size-5 items-center justify-center rounded-full border border-foreground/80 bg-foreground/10">
				<CheckIcon className="size-3.5" />
			</div>
			<span className="text-sm">{text}</span>
		</div>
	);
}
