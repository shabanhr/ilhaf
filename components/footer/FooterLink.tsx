"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const FooterLink = ({ link, label }: { link: string, label: string }) => {
    const pathname = usePathname();
    return (
        <Link className={`w-max py-1 duration-200 opacity-80 hover:underline ${link === pathname && 'underline'}`} href={link}>{label}</Link>
    )
}

export default FooterLink
