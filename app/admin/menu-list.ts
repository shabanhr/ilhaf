import {
  LayoutGrid,
  LucideIcon,
  PlusIcon,
  ListIcon,
  UsersIcon,
  BugIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: LayoutGrid,
          active: pathname === "/admin"
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/admin/lyrics",
          label: "All Lyrics",
          icon: ListIcon,
        },
        {
          href: "/admin/add",
          label: "Add Lyrics",
          icon: PlusIcon,
        },
        {
          href: "/admin/reports",
          label: "Reports",
          icon: BugIcon,
        },
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          icon: UsersIcon
        },
      ]
    }
  ];
}


export function getCurrentMenuTitle(pathname: string): string {
  const menuList = getMenuList(pathname);
  const currentMenu = menuList
    .flatMap((group) => group.menus) // Flatten the group structure
    .find((menu) => menu.href === pathname); // Find the matching menu

  // Return the label or a default title if no match is found
  return currentMenu ? currentMenu.label : "Dashboard";
}