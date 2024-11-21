import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set: (fn: ThemeStore | Partial<ThemeStore>) => void) => ({
      theme: 'system',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);