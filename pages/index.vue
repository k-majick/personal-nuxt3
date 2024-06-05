<template>
  <router-view v-slot="{ Component, route }">
    <div
      class="main__container"
      :class="`main__container--${route.path.includes('creations') ?
        'full' : 'card' } ${uiStore.navActive ? 'main__container--active' : ''}
        ${activeDialog ? 'main__container--hasactiveDialog' : ''}
      `"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="(route.name as string)" />
      </transition>
    </div>
  </router-view>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const config = useRuntimeConfig();
const uiStore = useUiStore();

uiStore.doConsentAction("Check").then(res => {
  if (res?.status !== 200) {
    uiStore.consent = "essential";
    return;
  }

  res?.text().then(consent => {
    uiStore.consent = consent;
  });
});

watch(
  () => uiStore.consent,
  () => {
    if (uiStore.consent === "all") {
      console.dir("enableGtag");
      enableGtag();
    }
  },
);

const enableGtag = () => {
  useHead({
    script: [{
      src: `https://www.googletagmanager.com/gtag/js?id=${config.public.appGtag}`,
      async: true,
    }],
  });
  
  window.dataLayer = window.dataLayer || [];

  function gtag(_a: string, _b: string | Date) {
    console.dir(arguments)
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', config.public.appGtag);
}
</script>

<style lang="scss">
@import "@/assets/scss/_animations.scss";
@import "@/assets/scss/components/theme";
@import "@/assets/scss/components/main";
@import "@/assets/scss/components/burger";
@import "@/assets/scss/components/tooltip";
@import "@/assets/scss/components/dialog";

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
