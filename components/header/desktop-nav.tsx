'use client';
import React from 'react';
import { LinkItem } from './link-item';
import { PlusIcon } from 'lucide-react';
import { LyricsIcon } from '../icons';

export function DesktopNav() {
	return (
		<div className="hidden w-max items-center gap-x-2 md:flex">
			<LinkItem
				item={{
					title: 'Lyrics',
					link: '/lyrics',
					icon: LyricsIcon,
				}}
			/>
			<LinkItem
				item={{
					title: 'Request Lyrics',
					link: '/requests?tab=new-request',
					icon: PlusIcon,
				}}
			/>
		</div>
	);
}
