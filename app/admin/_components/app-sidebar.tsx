'use client';

import * as React from 'react';
import { Book, PlusIcon, SquareTerminal, Users } from 'lucide-react';
import { NavMain } from '@/app/admin/_components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { siteName } from '@/config';

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/admin',
			icon: SquareTerminal,
		},
		{
			title: 'Lyrics',
			url: '/admin/lyrics',
			icon: Book,
		},
		{
			title: 'Add Lyrics',
			url: '/admin/add',
			icon: PlusIcon,
		},
		{
			title: 'Users',
			url: '/admin/users',
			icon: Users,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>{siteName} Admin</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
