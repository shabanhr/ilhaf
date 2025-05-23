import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import SignoutBTN from "./SignoutBTN";
import { LayoutDashboardIcon, MessageCircleWarning, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitialChar } from "@/lib/utils";
import { FavoriteBeforeIcon } from "../icons";
import { SessionUser } from "@/types/auth";

interface Props {
    user: SessionUser;
}

const DropDown = ({ user }: Props) => {

    const { email, image, name, role } = user;
    const isAdmin = role === "ADMIN";

    return (
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>{getInitialChar(name)}</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-sm mr-5">
                    <DropdownMenuItem className="flex items-center justify-start gap-2">
                        <DropdownMenuLabel>
                            <span className="">
                                Signed In as {isAdmin && "Admin"}
                            </span> <br />
                            <div className="opacity-70 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                                {email}
                            </div>
                        </DropdownMenuLabel>
                    </DropdownMenuItem>
                    {isAdmin && <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem icon={<LayoutDashboardIcon className="size-4" />}>
                            <Link href={`/admin`} className="w-full cursor-pointer">
                                Admin Dashboard
                            </Link>
                        </DropdownMenuItem>
                    </>
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon={<UserIcon className="size-4" />}       >
                        <Link href={`/account`} className="w-full cursor-pointer">
                            My Account
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem icon={<FavoriteBeforeIcon className="size-4" />}>
                        <Link href={`/favorites`} className="w-full cursor-pointer">
                            My Favorites
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem icon={<MessageCircleWarning className="size-4" />}>
                        <Link href={`/reports`} className="w-full cursor-pointer">
                            My Reports
                        </Link>
                    </DropdownMenuItem>

                    <SignoutBTN />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
export default DropDown;