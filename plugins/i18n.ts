import { createI18n } from "vue-i18n";
import de from "@/assets/i18n/de.json";
import en from "@/assets/i18n/en.json";
import pl from "@/assets/i18n/pl.json";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";

type Next = {
  [key: string]:
    | string
    | {
        [key: string]: string;
      };
};

export default defineNuxtPlugin(({ vueApp, $router }) => {
  const i18n = createI18n({
    legacy: false,
    warnHtmlMessage: false,
    globalInjection: true,
    locale: "en",
    messages: {
      de,
      en,
      pl,
    },
  });

  vueApp.use(i18n);

  ($router as Router).beforeEach(
    (
      to: RouteLocationNormalizedLoaded,
      _from: RouteLocationNormalizedLoaded,
      next: (route?: Next) => void,
    ) => {
      if (!isClient) {
        const userLocale = localStorage.getItem("user-locale") === null ? "en" : localStorage.getItem("user-locale");

        console.dir(to)
        console.dir(userLocale)

        if (!to.params.locale && !to.redirectedFrom?.name) {
          next({
            path: `/${userLocale}`,
            query: {}, // clear query param
          });
  
          return;
        }
      }
      
      next();
    },
  );
});
