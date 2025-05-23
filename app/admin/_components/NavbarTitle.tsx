"use client";
import { usePathname } from 'next/navigation';
import React from 'react'
import { getCurrentMenuTitle } from '../menu-list';


const NavbarTitle = () => {
    const pathname = usePathname();
    const title = getCurrentMenuTitle(pathname);

    return (
        <div>
            {title}
        </div>
    )
}

export default NavbarTitle
