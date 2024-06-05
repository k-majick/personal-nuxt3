import { defineStore } from "pinia";

interface IUiState {
  theme: string;
  locale: string;
  navActive: boolean,
  consent: string,
}

export const useUiStore = defineStore({
  id: "settings-store",
  state: (): IUiState => ({
    theme: "lite",
    locale: "en",
    navActive: false,
    consent: "",
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

    async doConsentAction(action: string, consent?: string) {
      try {
        const res = await fetch(`/.netlify/functions/server/consent${action}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ consent }),
        });

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
