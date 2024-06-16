<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background"></div>
    <Loader v-if="isLoading" />
    <Burger :nav-active="isNavActivated" @toggle-nav="toggleNav" />
    <Header ref="headerRef" />
    <Nav
      :is-activated="isNavActivated"
      :is-active="uiStore.navActive"
      @close-nav="isNavActivated = false"
    />
    <main
      ref="mainEl" 
      class="main main--portfolio"
      :class="[`main--${theme}`, { 'main--loading': isLoading, 'main--active': uiStore.navActive }]"
    >
      <slot />
    </main>
    <CookieBanner :theme="theme" />
    <span ref="tooltipEl" class="tooltip tooltip--portfolio"></span>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { globalRefs } from "@/plugins/globalRefs";
import { MainElKey, HeaderElKey } from "@/symbols/symbols";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import CookieBanner from "@/components/CookieBanner.vue";

const dataStore = useDataStore();
const uiStore = useUiStore();
const config = useRuntimeConfig();

const theme = computed(() => uiStore.currentTheme);
const isLoading = computed(() => dataStore.loading || dataStore.loadError);

const tooltipEl = ref();
const headerRef: Ref<any> = ref();
const mainEl: Ref<HTMLElement | undefined> = ref();
const headerEl: Ref<HTMLElement | undefined> = ref();
const isNavActivated = ref(false);

const toggleNav = () =>
  (isNavActivated.value = isNavActivated.value === false ? true : false);

const scrollListen = () => {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    document.documentElement.style.setProperty("--scroll-y", `${scrollTop}px`);

    if (!mainEl || !mainEl.value) {
      return;
    }

    uiStore.navActive =
      mainEl.value.getBoundingClientRect().top < 10 ? true : false;
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