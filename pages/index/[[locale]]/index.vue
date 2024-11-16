<template>
  <router-view v-slot="{ Component }">
    <div
class="main__container" :class="`main__container--${route.path.includes('creations') ? 'full' : 'card'
      } ${uiStore.navActive ? 'main__container--active' : ''}
        ${uiStore.activeDialogs.length ? 'main__container--hasActiveDialogs' : ''}
      `">
      <component :is="SkillsPage" v-if="route.name === 'index-locale'" :key="route.name" />
      <component :is="Component" :key="route.name" />
    </div>
  </router-view>
  <div id="dialog"></div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { useI18n } from "vue-i18n";
import SkillsPage from "@/pages/index/[[locale]]/index/skills.vue";

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();
const router = useRouter();

if (typeof window !== "undefined") {
  uiStore.doConsentAction("Check").then(res => {
    if (res?.status !== 200) {
      return;
    }

    res?.text().then(consent => {
      uiStore.consent = consent;
    });
  });
}

watch(
  () => uiStore.consent,
  () => {
    if (uiStore.consent === "all" && typeof window !== "undefined") {
      enableGtag();
    }
  },
);

const enableGtag = () => {
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${config.public.appGtag}`,
        async: true,
      },
    ],
  });

  if (!isClient) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  function gtag(_a: string, _b: string | Date) {
    window.dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", config.public.appGtag);
};

useSeoMeta({
  description: () => t("meta.description"),
});

definePageMeta({
  layout: "portfolio",
});

useHead({
  titleTemplate: `${config.public.appName} | ${config.public.appTitle}`,
  htmlAttrs: {
    lang: `${locale.value}`,
  },
});

dataStore.loadError = false;

const scrollToPos = (pos: number) => {
  if (window.scrollY !== pos) {
    window.scrollTo(0, pos);
    setTimeout(() => scrollToPos(pos), 0);
  }
};

onBeforeRouteUpdate(() => {
  if (typeof window !== "undefined") {
    uiStore.scrollPos = window.scrollY;
  }
});

onMounted(() => {
  if (isClient) {
    scrollToPos(uiStore.scrollPos);
  }

  if (route.name === "index-locale") {
    router.push(`/${locale.value}/skills`);
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/_animations.scss";
@import "@/assets/scss/components/theme";
@import "@/assets/scss/components/main";
@import "@/assets/scss/components/burger";
@import "@/assets/scss/components/tooltip";
@import "@/assets/scss/components/dialog";
</style>
