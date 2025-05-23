import { create } from 'zustand';

type State = {
    open: boolean;
    text?: string;
    setAuthOpen: (params: { open: boolean; text?: string }) => void;
};

// Initialize the Zustand store
export const useAuthModel = create<State>((set) => ({
    open: false,
    text: undefined,
    setAuthOpen: ({ open, text }: { open: boolean; text?: string }) =>
        set({ open, text }),
}));
