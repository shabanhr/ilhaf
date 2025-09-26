import { siteDescription, siteName } from '@/config';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import Logo from '../Logo';
import { FaceBookIcon, YoutubeIcon, TiktokIcon, XSocialIcon } from '../icons';
import FooterLink from './footer-link';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';

export default function Footer() {
	const year = new Date().getFullYear();

	const accounts = [
		{
			title: 'Join Us',
			link: '/auth',
		},
		{
			title: 'Account',
			link: '/account',
		},
		{
			title: 'Favorites',
			link: '/favorites',
		},
		{
			title: 'Requests',
			link: '/requests?tab=requests',
		},
	];

	const pages = [
		{
			title: 'About Us',
			link: '/about',
		},
		{
			title: 'Contact',
			link: '/contact',
		},
		{
			title: 'Privacy Policy',
			link: '/policy',
		},
	];

	const socialLinks = [
		{
			icon: <FaceBookIcon className="size-4" />,
			link: 'https://www.facebook.com/ilhafcom/',
		},
		{
			icon: <InstagramLogoIcon className="size-4" />,
			link: 'https://www.instagram.com/ilhaf_com',
		},
		{
			icon: <TiktokIcon className="size-4" />,
			link: 'https://www.tiktok.com/@ilhaf.com',
		},
		{
			icon: <XSocialIcon className="size-4" />,
			link: 'https://x.com/ilhafdotcom',
		},
		{
			icon: <YoutubeIcon className="size-4" />,
			link: 'https://www.youtube.com/@ilhaf',
		},
	];

	return (
		<footer>
			<Separator />
			<div className="bp container grid grid-cols-6 gap-6 md:border-x">
				<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
					<Link href="/" className="w-max opacity-25">
						<Logo size="lg" />
					</Link>
					<p className="text-muted-foreground font-mono text-sm">{siteDescription}</p>
					<div className="flex gap-2">
						{socialLinks.map((item, i) => (
							<Link
								key={i}
								className={buttonVariants({ size: 'icon', variant: 'outline' })}
								target="_blank"
								href={item.link}
							>
								{item.icon}
							</Link>
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground mb-1 text-xs">Account</span>
					<div className="flex flex-col gap-1">
						{accounts.map(({ link, title }, i) => (
							<FooterLink key={i} link={link} label={title} />
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground mb-1 text-xs">Pages</span>
					<div className="flex flex-col gap-1">
						{pages.map(({ link, title }, i) => (
							<FooterLink key={i} link={link} label={title} />
						))}
					</div>
				</div>
			</div>
			<Separator />
			<div className="bp-x container flex items-center justify-center gap-2 py-4 md:border-x">
				<p className="text-muted-foreground text-sm">
					© <Link href="/">{siteName}</Link>. All rights reserved {year}
				</p>
			</div>
		</footer>
	);
}
