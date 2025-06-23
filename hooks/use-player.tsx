import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PlayerItem = {
	slug: string;
	title: string;
	reciters: string;
} | null;

type PlayerState = {
	item: PlayerItem;
	setItem: (item: PlayerItem) => void;
	clearItem: () => void;
	loop: boolean;
	setLoop: (term: boolean) => void;
	volume: number;
	setVolume: (volume: number) => void;
	isPlaying: boolean;
	setPlaying: (playing: boolean) => void;
};

export const usePlayer = create<PlayerState>()(
	persist(
		(set) => ({
			item: null,
			setItem: (item: PlayerItem) => set({ item }),
			clearItem: () => set({ item: null, loop: false }),
			loop: false,
			setLoop: (loop: boolean) => set({ loop }),
			isPlaying: false,
			setPlaying: (playing: boolean) => set({ isPlaying: playing }),
			volume: 1,
			setVolume: (volume: number) => set({ volume }),
		}),
		{
			name: 'player',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
