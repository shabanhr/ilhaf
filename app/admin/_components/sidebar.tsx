"use client";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import AdminLogo from "./admin-logo";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >

        <AdminLogo isOpen={getOpenState()} />
        <Menu isOpen={getOpenState()} />
      </div>
    </aside >
  );
}
