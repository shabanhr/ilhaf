import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarSettings = { disabled: boolean; isHoverOpen: boolean };
type SidebarStore = {
  isOpen: boolean;
  settings: SidebarSettings;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getOpenState: () => boolean;
};

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true,
      settings: { disabled: false, isHoverOpen: false },
      toggleOpen: () => {
        set({ isOpen: !get().isOpen });
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },
      getOpenState: () => {
        const state = get();
        return state.isOpen
      },
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
