<template>
  <Header v-if="!isLoadError" ref="headerComponent" />

  <main v-if="!isLoadError" ref="mainEl" :class="`main main--${theme}`">
    <div class="main__background"></div>
    <div
      class="burger"
      :class="[`burger--${theme}`, { active: isNavActivated }]"
      @click="toggleNav"
    >
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </div>

    <Nav :is-activated="isNavActivated" @close-nav="toggleNav" />

    <div class="main__container">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="(route.name as string)" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import { MainElKey, HeaderElKey } from "@/symbols/symbols";

export default defineComponent({
  layout: "default",
  setup() {
    const pagesStore = usePagesStore();
    const isLoadError = ref(pagesStore.loadError);
    const uiStore = useUiStore();
    const theme = ref(uiStore.currentTheme);
    const headerComponent: Ref<any> = ref();
    const mainEl: Ref<HTMLElement | undefined> = ref<HTMLElement>();
    const headerEl: Ref<HTMLElement | undefined> = ref<HTMLElement>();
    const isNavActivated = ref(false);

    const scrollListen = () => {
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;

        document.documentElement.style.setProperty(
          "--scroll-y",
          `${scrollTop}px`,
        );
      });
    };

    onMounted(() => scrollListen());

    watch(
      () => pagesStore.loadError,
      () => (isLoadError.value = pagesStore.loadError),
    );

    watch(
      () => uiStore.currentTheme,
      () => (theme.value = uiStore.currentTheme),
    );

    watch(
      () => headerComponent.value,
      () => (headerEl.value = headerComponent.value.headerEl),
    );

    provide(MainElKey, mainEl);
    provide(HeaderElKey, headerEl);

    const toggleNav = () =>
      isNavActivated.value === false
        ? (isNavActivated.value = true)
        : (isNavActivated.value = false);

    return {
      theme,
      toggleNav,
      mainEl,
      headerComponent,
      isNavActivated,
      isLoadError,
      pagesStore,
    };
  },
});

definePageMeta({
  layout: "default",
});
</script>

<style lang="scss">
@import "@/assets/scss/_animations.scss";
@import "@/assets/scss/components/_theme";
@import "@/assets/scss/components/_loader";
@import "@/assets/scss/components/_main";
@import "@/assets/scss/components/_burger";

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
