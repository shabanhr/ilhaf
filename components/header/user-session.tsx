'use client';
import React from 'react';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LayoutDashboardIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAvatarUrl, getInitialChar } from '@/lib/utils';
import { FavoriteBeforeIcon } from '../icons';
import { authClient } from '@/lib/auth-client';
import { useToggle } from '@/hooks/use-toggle';
import { usePathname } from 'next/navigation';

const UserSession = () => {
	const { data: session, isPending } = authClient.useSession();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAuthOpen] = useToggle('auth-modal');
	const user = session?.user;
	const isAdmin = session?.user.role === 'admin';
	const pathname = usePathname();

	if (isPending) {
		return null;
	}

	const handleSignOut = async () => {
		await authClient.signOut();
		window.location.href = pathname;
	};

	return (
		<div className="animate-in fade-in hidden items-center duration-800 md:flex">
			{user?.email ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={getAvatarUrl(user.image, user.id)} />
							<AvatarFallback>{getInitialChar(user.name)}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-5 max-w-sm">
						<DropdownMenuItem className="flex items-center justify-start gap-2">
							<DropdownMenuLabel>
								<span className="">Signed In as {isAdmin && 'Admin'}</span> <br />
								<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap opacity-70">
									{user.email}
								</div>
							</DropdownMenuLabel>
						</DropdownMenuItem>
						{isAdmin && (
							<DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href={`/admin`} className="w-full cursor-pointer">
										<LayoutDashboardIcon />
										Admin Dashboard
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href={`/account`} className="w-full cursor-pointer">
									<UserIcon />
									My Account
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								<Link href={`/favorites`} className="w-full cursor-pointer">
									<FavoriteBeforeIcon />
									My Favorites
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="w-full cursor-pointer" onClick={handleSignOut}>
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button onClick={() => setAuthOpen(true)} variant="ghost">
					Join Now!
				</Button>
			)}
		</div>
	);
};

export default UserSession;
