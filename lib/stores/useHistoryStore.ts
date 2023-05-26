import { HistoryLocation } from '@/interfaces/location';
import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const myMiddlewares = (f: StateCreator<HistoryState>) =>
  devtools(
    persist(f, {
      name: 'history-storage',
      storage: createJSONStorage(() => localStorage),
    })
  );

interface HistoryState {
  locations: HistoryLocation[];
  addLocation: (newLocation: HistoryLocation) => void;
  clearLocations: () => void;
}

const useHistoryStore = create<HistoryState>(
  myMiddlewares((set, get) => ({
    locations: [],
    addLocation: (newLocation) => {
      const locations = get().locations;

      if (locations.some((loc) => loc.id === newLocation.id)) {
        return;
      }
      if (locations.length > 2) {
        locations.pop();
      }

      set({ locations: [newLocation, ...locations] });
    },
    clearLocations: () => set({ locations: [] }),
  })) as StateCreator<HistoryState>
);

export default useHistoryStore;
