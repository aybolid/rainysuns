import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

const myMiddlewares = (f: StateCreator<SettingsState>) =>
  devtools(
    persist(f, {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    })
  );

interface SettingsState {
  useMetric: boolean;
  toggleUnits: () => void;
}

const useSettingsStore = create<SettingsState>(
  myMiddlewares((set, get) => ({
    useMetric: true,
    toggleUnits: () => set({ useMetric: !get().useMetric }),
  })) as StateCreator<SettingsState>
);

export default useSettingsStore;
