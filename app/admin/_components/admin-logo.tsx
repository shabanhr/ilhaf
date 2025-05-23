import { cn } from '@/lib/utils'
import React from 'react'

const AdminLogo = ({ isOpen }: { isOpen?: boolean }) => {

    return (
        <div
            className={cn(
                "pl-4 transition-transform ease-in-out duration-300 flex items-center justify-start gap-x-2 mb-1",
                !isOpen ? "translate-x-1" : "translate-x-0")}
        >
            <img
                src="/efferd.png"
                alt="efferd"
                width={34}
                height={34}
                className="mr-1 dark:invert"
            />
            <div
                className={cn(
                    "flex flex-col items-start whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                    !isOpen
                        ? "-translate-x-96 opacity-0 hidden"
                        : "translate-x-0 opacity-100"
                )}
            >
                <span className="font-bold">Efferd</span>
                <span className="text-xs opacity-70 -mt-1">Admin Penal</span>

            </div>
        </div>
    )
}

export default AdminLogo
