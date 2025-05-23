import { LyricsWithData } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
    lyricsData?: LyricsWithData | null;
    userId?: string;
    isHovered: boolean;
    favorited: boolean;
    fontSizeId: string;
    isPlaying: boolean | undefined;
};

// Initialize the Zustand store
export const useLyricsInteractions = create<State>(() => ({
    lyricsData: null,
    favorited: false,
    isHovered: false,
    fontSizeId: "md",
    isPlaying: undefined,
}))