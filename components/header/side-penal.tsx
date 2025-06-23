'use client';

import React from 'react';
import LinkItem from './link-item';
import { HomeIcon, LogIn, MessageCircleWarning, UserIcon } from 'lucide-react';
import { FavoriteBeforeIcon, LyricsIcon } from '../icons';
import { MenuIcon } from '../icons';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from '../ui/sheet';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';

const Links = [
	{
		title: 'Home',
		link: '/',
		icon: HomeIcon,
	},
	{
		title: 'Lyrics',
		link: '/lyrics',
		icon: LyricsIcon,
	},
	{
		title: 'My Account',
		link: '/account',
		icon: UserIcon,
	},
	{
		title: 'My Favorites',
		link: '/favorites',
		icon: FavoriteBeforeIcon,
	},
	{
		title: 'My Reports',
		link: '/reports',
		icon: MessageCircleWarning,
	},
];
const SidePenal = () => {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<MenuIcon className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex max-w-[60%] flex-col sm:max-w-sm" side="left">
				<SheetHeader>
					<Logo size="sm" />
				</SheetHeader>
				<div className="flex h-full flex-col items-center justify-between p-2">
					<div className="mt-5 flex h-max w-full flex-col items-center gap-x-2">
						{Links.map((item, i) => (
							<SheetClose key={i} asChild>
								<LinkItem item={item} />
							</SheetClose>
						))}
					</div>

					<div className="flex w-full justify-center">
						{user ? (
							<Button className="w-full" variant="outline" onClick={() => authClient.signOut()}>
								Sign Out
							</Button>
						) : (
							<LinkItem
								item={{
									title: 'Join Now!',
									link: '/auth',
									icon: LogIn,
								}}
							/>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SidePenal;
