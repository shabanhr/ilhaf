'use client';

import { type LucideIcon } from 'lucide-react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	const pathname = usePathname();
	const isActive = (url: string) => pathname === url;

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item, i) => (
					<SidebarMenuButton isActive={isActive(item.url)} key={i} tooltip={item.title} asChild>
						<Link href={item.url}>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
