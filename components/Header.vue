<template>
  <header ref="headerEl" class="header" :class="`header header--${theme}`">
    <section class="header__container header__container--logo">
      <a class="main__anchor"></a>
      <a class="header__logo">
        <h1 class="header__title">{{ config.public.appTitle }}</h1>
      </a>
      <div class="header__control">
        <div class="header__selector header__selector--locale">
          <button class="header__button">{{ locale }}</button>
          <ul class="header__options">
            <li
              v-for="(l, index) in availableLocales"
              :key="index"
              class="header__option"
              @click="switchLocale(l.code as string)"
            >
              {{ l.code }}
            </li>
          </ul>
        </div>
        <div
          v-Tooltip="
            theme === 'dark'
              ? $t('messages.switch2lite')
              : $t('messages.switch2dark')
          "
          class="header__selector header__selector--theme"
        >
          <!-- eslint-disable risxss/catch-potential-xss-vue -->
          <button
            class="header__button"
            @click="
              theme === 'dark' ? toggleTheme('lite') : toggleTheme('dark')
            "
            v-html="theme === 'dark' ? iconSun : iconMoon"
          />
          <!-- eslint-enable risxss/catch-potential-xss-vue -->
        </div>
      </div>
    </section>
    <section class="header__container header__container--avatar">
      <Avatar v-if="theme" :theme="(theme as string)" />
      <div class="header__arrow" @click="scrollTo($event, mainEl)"></div>
      <a class="chevron__container" @click="scrollTo($event, mainEl)">
        <div :class="`chevron chevron--${theme}`"></div>
      </a>
    </section>
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useUiStore } from "@/store/ui";
import { MainElKey } from "@/symbols/symbols";
import scrollTo from "@/composables/scrollTo";
import iconSun from "@/assets/gfx/icon-sun.svg?raw";
import iconMoon from "@/assets/gfx/icon-moon.svg?raw";
import { type ILocale, locales } from "@/composables/i18n";
import { vTooltip } from "@/composables/tooltip";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const mainEl = inject(MainElKey);
const headerEl = ref<HTMLElement>();

const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);

const { locale } = useI18n({ useScope: "global" });
const setAvailableLocales = () =>
  locales.filter(l => l.code !== locale.value);
const availableLocales = ref<ILocale[]>(setAvailableLocales());

const switchLocale = (l: string) => {
  locale.value = l;
  uiStore.setLocale(l);
  localStorage.setItem("user-locale", l);
  availableLocales.value = setAvailableLocales();
  setRouteParam(l);
};

const setRouteParam = (locale: string) => {
  const pageSlug = route.path.split("/").pop();

  router.replace({
    path: `/${locale}/${pageSlug}`,
  });
};

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);

const rootEl = document.documentElement;

const toggleTheme = (theme: string) => {
  rootEl.style.setProperty("--theme", theme);
  rootEl.setAttribute("data-theme", theme);
  uiStore.setTheme(theme);
  localStorage.setItem("user-theme", theme);
};

switchLocale(route.params.locale as string);

localStorage.getItem("user-theme")
  ? toggleTheme(localStorage.getItem("user-theme") as string)
  : toggleTheme("lite");

</script>

<style lang="scss">
@import "./assets/scss/components/_header";
@import "./assets/scss/components/_chevron";
</style>
