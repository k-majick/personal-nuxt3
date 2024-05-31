import { defineStore } from "pinia";

interface IUiState {
  theme: null | string;
  locale: null | string;
  navActive: boolean,
}

export const useUiStore = defineStore({
  id: "settings-store",
  state: (): IUiState => ({
    theme: null,
    locale: null,
    navActive: false,
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },

    setLocale(locale: string) {
      this.locale = locale;
    },

    sendEmail(fd: any) {
      try {
        const res = fetch("/.netlify/functions/server/sendEmail", {
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
