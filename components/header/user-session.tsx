'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useAuthModel } from '@/hooks/use-auth-model';
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
import { LayoutDashboardIcon, MessageCircleWarning, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAvatarUrl, getInitialChar } from '@/lib/utils';
import { FavoriteBeforeIcon } from '../icons';
import { signOut } from 'next-auth/react';

const UserSession = () => {
	const { setAuthOpen } = useAuthModel();

	const { data: session, status } = useSession();
	const user = session?.user;
	const isAdmin = session?.user.role === 'ADMIN';

	if (status === 'loading') {
		return null;
	}

	return (
		<div className="animate-in fade-in hidden items-center duration-800 md:flex">
			{user?.email ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={getAvatarUrl(user.image, user.email)} />
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

							<DropdownMenuItem asChild>
								<Link href={`/reports`} className="w-full cursor-pointer">
									<MessageCircleWarning />
									My Reports
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="w-full cursor-pointer" onClick={() => signOut()}>
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button onClick={() => setAuthOpen({ open: true })} variant="ghost">
					Join Now!
				</Button>
			)}
		</div>
	);
};

export default UserSession;
