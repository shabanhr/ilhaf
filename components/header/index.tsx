
import Logo from "../Logo"
import Link from "next/link"
import SidePenal from "./SidePenal"
import { ThemeToggle } from "../theme-switch";
import LinkItem from "./LinkItem";
import { LyricsIcon } from "../icons";
import UserSession from "./UserSession";
import { SearchCombobox } from "./Search";

export default function Header() {

	return (
		<header className="sticky top-0 z-50 w-full h-14 border-b bg-background">
			<nav className="h-full container flex items-center justify-between">
				<Link href="/" className='flex items-center'>
					<Logo size="sm" />
				</Link>
				<div className='flex items-center justify-center gap-x-1 md:gap-x-2'>
					<div className="hidden md:flex items-center justify-center gap-x-2">
						<LinkItem
							item={{
								title: "Lyrics",
								link: "/lyrics",
								icon: <LyricsIcon className="size-4" />
							}}
						/>
					</div>
					<ThemeToggle />
					<SearchCombobox />
					<UserSession />
					<SidePenal />
				</div>
			</nav>
		</header>
	)
}
