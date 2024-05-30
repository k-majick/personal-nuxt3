<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <Loader />
    </div>

    <Header v-show="!dataStore.loadError" ref="headerRef" />

    <main v-if="!dataStore.loadError" ref="mainEl" class="main main--portfolio">
      <div class="main__background"></div>
      <div class="burger" :class="{ active: isNavActivated }" @click="toggleNav">
        <span class="burger__bar"></span>
        <span class="burger__bar"></span>
        <span class="burger__bar"></span>
        <span class="burger__bar"></span>
      </div>

      <Nav
        :is-activated="isNavActivated"
        :is-active="uiStore.navActive"
        @close-nav="toggleNav"
      />

      <slot />
    </main>

    <span ref="tooltipEl" class="tooltip"></span>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";

import { globalRefs } from '@/plugins/globalRefs';
import { MainElKey, HeaderElKey } from "@/symbols/symbols";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);

const tooltipEl = ref();
const headerRef: Ref<any> = ref();
const mainEl: Ref<HTMLElement | undefined> = ref();
const headerEl: Ref<HTMLElement | undefined> = ref();
const isNavActivated = ref(false);

const toggleNav = () => 
  isNavActivated.value = isNavActivated.value === false ?
    true : false;

const scrollListen = () => {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    document.documentElement.style.setProperty(
      "--scroll-y",
      `${scrollTop}px`,
    );

    if (!mainEl || !mainEl.value) {
      return;
    }

    uiStore.navActive = mainEl.value.getBoundingClientRect().top < 10 ?
      true : false;
  });
};

onMounted(() => {
  globalRefs.tooltipEl = tooltipEl.value;
  headerEl.value = headerRef.value.headerEl;
  scrollListen();
});

provide(MainElKey, mainEl as Ref<HTMLElement>);
provide(HeaderElKey, headerEl as Ref<HTMLElement>);
</script>
