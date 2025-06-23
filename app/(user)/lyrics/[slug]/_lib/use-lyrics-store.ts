import { createStore } from 'zustand';
import { useStore } from 'zustand';
import { type Lyrics } from '@/db/schema';

type LyricsWithoutContent = Omit<Lyrics, 'english' | 'urdu'>;

type LyricsState = {
	data: LyricsWithoutContent | null;
	setData: (data: LyricsWithoutContent) => void;
};

const lyricsStore = createStore<LyricsState>((set) => ({
	data: null,
	setData: (data) => set({ data }),
}));

export const useLyricsStore = <T>(selector: (state: LyricsState) => T): T => useStore(lyricsStore, selector);
