import { siteName } from '@/config';

import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import Logo from '../Logo';
import { FaceBookIcon, YoutubeIcon, TiktokIcon, XSocialIcon } from '../icons';
import FooterLink from './footer-link';
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';

export default function Footer() {
	const year = new Date().getFullYear();

	const pages = [
		{
			title: 'Contact',
			link: '/contact',
		},
		{
			title: 'Privacy Policy',
			link: '/policy',
		},
		{
			title: 'About Us',
			link: '/about',
		},
	];
	const accounts = [
		{
			title: 'Sign In',
			link: '/auth',
		},
		{
			title: 'My Account',
			link: '/account',
		},
		{
			title: 'My Favorites',
			link: '/favorites',
		},
	];
	const socialLinks = [
		{
			icon: <FaceBookIcon className="size-4" />,
			link: 'https://www.facebook.com/ilhafcom/',
		},
		{
			icon: <GitHubLogoIcon className="size-4" />,
			link: 'https://github.com/sshahaider/ilhaf',
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
			<div className="container bp grid grid-cols-6 gap-6 md:border-x">
				<div className="col-span-6 flex flex-col gap-6 md:col-span-4">
					<Link href="/" className="w-max opacity-20">
						<Logo size="lg" />
					</Link>
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
					<h3 className="mb-1 text-xs">Account</h3>
					<div className="flex flex-col gap-1">
						{accounts.map(({ link, title }, i) => (
							<FooterLink key={i} link={link} label={title} />
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<h3 className="mb-1 text-xs">Pages</h3>
					<div className="flex flex-col gap-1">
						{pages.map(({ link, title }, i) => (
							<FooterLink key={i} link={link} label={title} />
						))}
					</div>
				</div>
			</div>
			<Separator />
			<div className="container bp-x py-4 flex flex-col justify-between gap-2 md:border-x md:flex-row-reverse md:items-center">
				<div className="text-muted-foreground flex items-center justify-center gap-x-1 font-thin">
					Built by
					<Link target="_blank" href="https://x.com/sshahaider" className="text-foreground hover:underline">
						sshahaider
					</Link>
				</div>
				<p className="text-muted-foreground text-center font-thin">
					© <Link href="/">{siteName}</Link>. All rights reserved {year}
				</p>
			</div>
		</footer>
	);
}
