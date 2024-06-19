<template>
  <div class="header__control">
    <div class="header__selector header__selector--locale">
      <button class="header__button">{{ locale }}</button>
      <ul class="header__options">
        <li
          v-for="(l, index) in localesAvailable"
          :key="index"
          class="header__option"
          @click="switchLocale(l.code as string)"
        >
          {{ l.code }}
        </li>
      </ul>
    </div>
    <div
      v-tooltip="
        theme === 'dark'
          ? $t('messages.switch2lite')
          : $t('messages.switch2dark')
      "
      class="header__selector header__selector--theme"
    >
      <!-- eslint-disable risxss/catch-potential-xss-vue -->
      <button
        class="header__button"
        @click="theme === 'dark' ? toggleTheme('lite') : toggleTheme('dark')"
        v-html="theme === 'dark' ? iconSun : iconMoon"
      />
      <!-- eslint-enable risxss/catch-potential-xss-vue -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconSun from "@/assets/gfx/icon-sun.svg?raw";
import iconMoon from "@/assets/gfx/icon-moon.svg?raw";
import { vTooltip } from "@/composables/tooltip";
import { useUiStore } from "@/store/ui";
import { useI18n } from "vue-i18n";
import { locales } from "@/assets/data/locales";

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const { locale } = useI18n({ useScope: "global" });
const rootEl = typeof window !== "undefined" ? document.documentElement : null;

const theme = computed(() => uiStore.currentTheme);
const localesAvailable = computed(() =>
  locales.filter(l => l.code !== locale.value),
);

const setRouteParam = (locale: string) => {
  const slugs = route.path.split("/").slice(2);
  const path = `/${locale}/` + slugs.join("/");

  router.replace({
    path,
  });
};

const switchLocale = (l: string) => {
  locale.value = l;
  uiStore.setLocale(l);
  setRouteParam(l);

  if (typeof window !== "undefined") {
    localStorage.setItem("user-locale", l);
  }
};

const toggleTheme = (theme: string) => {
  rootEl?.style.setProperty("--theme", theme);
  rootEl?.setAttribute("data-theme", theme);
  uiStore.setTheme(theme);

  if (typeof window !== "undefined") {
    localStorage.setItem("user-theme", theme);
  }
};

if (typeof window !== "undefined") {
  localStorage.getItem("user-theme")
    ? toggleTheme(localStorage.getItem("user-theme") as string)
    : toggleTheme("lite");
}
</script>
