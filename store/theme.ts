import { defineStore } from 'pinia'

interface ILThemeState {
  theme: null | string
}

export const useThemeStore = defineStore({
  id: 'theme-store',
  state: (): ILThemeState => ({
    theme: null,
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
  },
  getters: {
    currentTheme: state => state.theme,
  },
})