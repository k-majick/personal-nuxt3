import { defineStore } from "pinia";

interface IUiState {
  theme: null | string;
  locale: null | string;
}

export const useUiStore = defineStore({
  id: "settings-store",
  state: (): IUiState => ({
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

    sendMessage(fd: any) {
      try {
        const res = fetch("/.netlify/functions/server/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fd),
        })
          .then(res => res.json())
          .then(data => data);

        return res;
      } catch (e) {
        console.error(e);
      }
    },
  },
  getters: {
    currentTheme: state => state.theme,
    currentLocale: state => state.locale,
  },
});
