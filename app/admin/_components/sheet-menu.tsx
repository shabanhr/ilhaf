import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import AdminLogo from "./admin-logo";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button> 
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <AdminLogo isOpen />
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
