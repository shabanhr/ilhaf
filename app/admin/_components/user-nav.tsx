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
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { getInitialChar } from "@/lib/utils";
import { currentUser } from "@/config/auth";

// interface Props { user: SessionUser; }

export const UserNav = async () => {

  const user = await currentUser();

  if (!user) return null;

  const { email, image, name } = user;

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
                Signed In as Admin
              </span> <br />
              <div className="opacity-70 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                {email}
              </div>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<UserIcon className="size-4" />}>
            <Link href={`/account`} className="w-full cursor-pointer">
              My Account
            </Link>
          </DropdownMenuItem>

          <SignoutBTN />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
