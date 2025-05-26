import Logo from '../Logo';
import Link from 'next/link';
import SidePenal from './sidepenal';
import { ThemeToggle } from '../theme-switch';
import LinkItem from './link-item';
import UserSession from './user-session';
import { SearchCombobox } from './search-box';
import { cn } from '@/lib/utils';

export default function Header() {
	return (
		<header
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-xl',
				'sticky top-0 z-50',
				'border-b',
			)}
		>
			<nav className={cn('container h-14', 'flex items-center justify-between', 'border-x')}>
				<Link href="/" className="flex items-center">
					<Logo size="sm" />
				</Link>
				<div className="flex items-center gap-x-2">
					<LinkItem className="hidden md:flex" />
					<ThemeToggle />
					<SearchCombobox />
					<UserSession />
					<SidePenal />
				</div>
			</nav>
		</header>
	);
}
