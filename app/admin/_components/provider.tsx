"use client";

import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const AdminProvider = ({ children }: { children: React.ReactNode }) => {

    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { getOpenState, settings } = sidebar;


    return (
        <>
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-950 transition-[margin-left] ease-in-out duration-300",
                    !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
                )}
            >
                <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-4 md:mx-8 flex h-14 items-center">
                        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
                            Built by{" "}
                            <Link
                                href="https://efferd.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                efferd.com
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </>


    )
}

export default AdminProvider
