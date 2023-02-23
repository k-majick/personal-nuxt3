import { createI18n } from "vue-i18n";
import de from "../assets/i18n/de.json";
import en from "../assets/i18n/en.json";
import pl from "../assets/i18n/pl.json";
import { type RouteLocationNormalizedLoaded } from "vue-router";

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
    globalInjection: true,
    locale: "en",
    messages: {
      de,
      en,
      pl,
    },
  });

  vueApp.use(i18n);

  $router.beforeEach(
    (to: RouteLocationNormalizedLoaded, _: unknown, next: (route?: Next) => void) => {
      if (!to.params.locale) {
        const userLocale = localStorage.getItem("user-locale") as string;

        next({
          path: `/${userLocale ? userLocale : "en"}/skills`,
          params: {
            locale: `${userLocale ? userLocale : "en"}`,
          },
        });

        return;
      }

      next();
    },
  );
});
