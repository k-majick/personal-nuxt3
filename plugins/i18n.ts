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
    warnHtmlMessage: false,
    legacy: false,
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
      if (!to.params.locale?.length) {
        const userLocale = localStorage.getItem("user-locale") as string;
        const locale =  userLocale ? userLocale : "en";

        if (!to.name) {          
          return
        }

        next({
          name: to.name as string,
          params: {
            locale: `${locale}`,
          },
        });
        return;
      }

      next();
    },
  );
});
