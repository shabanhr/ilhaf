import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToggleState {
	states: { [key: string]: boolean };
	toggle: (key: string, value: boolean) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
	states: {},
	toggle: (key, value) =>
		set((state) => ({
			states: { ...state.states, [key]: value },
		})),
}));

const useToggle = (key: string): [boolean, (value: boolean) => void] => {
	const value = useToggleStore((state) => state.states[key] ?? false);
	const toggle = useToggleStore((state) => state.toggle);
	return [value, (v: boolean) => toggle(key, v)];
};

const usePersistentToggleStore = create<ToggleState>()(
	persist(
		(set) => ({
			states: {},
			toggle: (key, value) =>
				set((state) => ({
					states: { ...state.states, [key]: value },
				})),
		}),
		{
			name: 'toggle-store',
		},
	),
);

const usePersistentToggle = (key: string): [boolean, (value: boolean) => void] => {
	const value = usePersistentToggleStore((state) => state.states[key] ?? false);
	const toggle = usePersistentToggleStore((state) => state.toggle);
	return [value, (v: boolean) => toggle(key, v)];
};

export { useToggle, usePersistentToggle };
