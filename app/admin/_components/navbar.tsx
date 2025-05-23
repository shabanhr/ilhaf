
import { ThemeToggle } from "@/components/theme-switch";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";
import NavbarTitle from "./NavbarTitle";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {


  return (
    <header className="sticky top-0 z-20 w-full bg-background shadow">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <NavbarTitle />
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
