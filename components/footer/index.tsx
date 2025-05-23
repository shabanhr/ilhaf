import { siteName } from '@/config';

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Logo from "../Logo";
import { FaceBookIcon, WhatsAppIcon, YoutubeIcon, TiktokIcon, PinterestIcon, PatreonIcon } from "../icons";
import Image from 'next/image';
import FooterLink from './FooterLink';
import FooterSpace from './FooterSpace';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
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
        {
            title: 'Support Us',
            link: '/support',
        },
    ];
    const accounts = [
        {
            title: 'Create Account',
            link: '/auth',
        },
        {
            title: 'Edit Account',
            link: '/account',
        },
        {
            title: 'My Favorites',
            link: '/favorites',
        },
        {
            title: 'My Reports',
            link: '/reports',
        },
    ];
    const socialLinks = [
        {
            icon: <YoutubeIcon className="size-4" />,
            link: 'https://www.youtube.com/@ilhaf',
        },
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
            icon: <PinterestIcon className="size-4" />,
            link: 'https://www.pinterest.com/ilhafcom/',
        },
        {
            icon: <WhatsAppIcon className="size-4" />,
            link: 'https://api.whatsapp.com/send?phone=923247685136&text=Assalamu%20Alaikum%2C%0AI%20have%20something%20important%20to%20share%20about%20ilhaf.com.',
        },
        {
            icon: <PatreonIcon className="size-4" />,
            link: 'https://www.patreon.com/ilhaf',
        },
    ];



    return (
        <footer>
            <Separator />
            <div className='container py-8 grid grid-cols-6 gap-6'>
                <div className="col-span-6 md:col-span-4 flex flex-col gap-6">
                    <Link href="/" className='w-max opacity-20		'>
                        <Logo size="lg" />
                    </Link>
                    <div className="flex gap-2">
                        {socialLinks.map((item, i) => (
                            <Link key={i} className={buttonVariants({ size: "icon", variant: 'outline' })}
                                target='_blank' href={item.link}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="col-span-3 md:col-span-1 w-full">
                    <h3 className='text-xs mb-1'>Account</h3>
                    <div className="flex flex-col gap-1">
                        {accounts.map(({ link, title }, i) => (
                            <FooterLink key={i} link={link} label={title} />
                        ))}
                    </div>
                </div>
                <div className="col-span-3 md:col-span-1 w-full">
                    <h3 className='text-xs mb-1'>Pages</h3>
                    <div className="flex flex-col gap-1">
                        {pages.map(({ link, title }, i) => (
                            <FooterLink key={i} link={link} label={title} />
                        ))}
                    </div>
                </div>
            </div>
            <Separator />
            <div className="container flex flex-col md:flex-row-reverse gap-2 justify-between md:items-center py-4">
                <div className='flex items-center justify-center gap-x-1 opacity-80 font-thin '>
                    Developed by
                    <Link target='_blank' href="https://efferd.com/" 
                    className='a'
                    >
                        efferd
                    </Link>
                </div>
                <p className='text-center opacity-80 font-thin'>
                    © <Link href="/"  >{siteName}</Link>
                    . All rights reserved {year}
                </p>
            </div>
            <FooterSpace />
        </footer>
    );
}
