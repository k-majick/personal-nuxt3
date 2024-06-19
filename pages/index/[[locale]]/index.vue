<template>
  <router-view v-slot="{ Component, route }">
    <div
      class="main__container"
      :class="`main__container--${
        route.path.includes('creations') ? 'full' : 'card'
      } ${uiStore.navActive ? 'main__container--active' : ''}
        ${activeDialog ? 'main__container--hasactiveDialog' : ''}
      `"
    >
      <component :is="SkillsPage" v-if="route.name === 'index-locale'" :key="route.name" />
      <component :is="Component" :key="route.name" />
    </div>
  </router-view>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { useI18n } from "vue-i18n";
import SkillsPage from "@/pages/index/[[locale]]/index/skills.vue";

const { t } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();

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

  window.dataLayer = window.dataLayer || [];

  function gtag(_a: string, _b: string | Date) {
    window.dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", config.public.appGtag);
};

useSeoMeta({
  description: () => t('meta.description'),
});

definePageMeta({
  layout: "portfolio",
});

dataStore.loadError = false;

onBeforeRouteUpdate(() => {
  uiStore.scrollPos = window.scrollY;
});

onMounted(() => {
  setTimeout(() => window.scrollTo(0, uiStore.scrollPos), 0);
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
