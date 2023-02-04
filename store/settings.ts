import { defineStore } from 'pinia';

interface ISettingsState {
  theme: null | string;
  locale: null | string;
}

export const useSettingsStore = defineStore({
  id: 'settings-store',
  state: (): ISettingsState => ({
    theme: null,
    locale: null,
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
  getters: {
    currentTheme: state => state.theme,
    currentLocale: state => state.locale,
  },
});
