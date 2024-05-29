<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <div class="loader__container">
        <div :class="`loader loader--${theme}`">
          <div class="loader__ray loader__ray--1"></div>
          <div class="loader__ray loader__ray--2"></div>
          <div class="loader__ray loader__ray--3"></div>
          <div class="loader__ray loader__ray--4"></div>
          <div class="loader__ray loader__ray--5"></div>
          <div class="loader__ray loader__ray--6"></div>
          <div class="loader__ray loader__ray--7"></div>
          <div class="loader__ray loader__ray--8"></div>
          <div class="loader__ray loader__ray--9"></div>
          <div class="loader__ray loader__ray--10"></div>
        </div>
        <span class="loader__text">{{
          dataStore.loadError
            ? $t("messages.loadError")
            : $t("messages.loading")
        }}</span>
      </div>
      <div
        v-tooltip="
          dataStore.loadError
            ? $t('messages.loadError')
            : $t('messages.loading')
        "
        class="theme__loader"
      >
      </div>
    </div>

    <Header v-if="!isLoadError" ref="headerRef" />

    <main v-if="!isLoadError" ref="mainEl" class="main">
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
import { vTooltip } from "@/composables/tooltip";
import { globalRefs } from '@/plugins/globalRefs';
import { MainElKey, HeaderElKey } from "@/symbols/symbols";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = ref(uiStore.currentTheme);

const tooltipEl = ref();
const headerRef: Ref<any> = ref();
const mainEl: Ref<HTMLElement | undefined> = ref();
const headerEl: Ref<HTMLElement | undefined> = ref();

const isLoadError = ref(dataStore.loadError);
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

watch(
  () => dataStore.loadError,
  () => (isLoadError.value = dataStore.loadError),
);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);

provide(MainElKey, mainEl as Ref<HTMLElement>);
provide(HeaderElKey, headerEl as Ref<HTMLElement>);
</script>
