import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PlayerState = {
	id: string;
	setFontSize: (id: string) => void;
};

export const useFontSize = create<PlayerState>()(
	persist(
		(set) => ({
			id: 'md',
			setFontSize: (id: string) => set({ id }),
		}),
		{
			name: 'font-size',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
