<template>
  <Header v-if="!isLoadError" ref="headerComponent" />

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
      :is-active="isNavActive"
      @close-nav="toggleNav"
    />

    <router-view v-slot="{ Component, route }">
      <div
        class="main__container"
        :class="`main__container--${
          route.path.includes('creations') ? 'full' : 'card'
        } ${isNavActive ? 'main__container--active' : ''} 
        ${activeModal ? 'main__container--hasActiveModal' : ''}
        `"
      >
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="(route.name as string)" />
        </transition>
      </div>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useDataStore } from "@/store/data";
import { MainElKey, HeaderElKey } from "@/symbols/symbols";

const dataStore = useDataStore();
const isLoadError = ref(dataStore.loadError);
const headerComponent: Ref<any> = ref();
const mainEl: Ref<HTMLElement | undefined> = ref<HTMLElement>();
const headerEl: Ref<HTMLElement | undefined> = ref<HTMLElement>();
const isNavActivated = ref(false);
const isNavActive = ref(false);

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

    mainEl.value.getBoundingClientRect().top < 10
      ? (isNavActive.value = true)
      : (isNavActive.value = false);
  });
};

onMounted(() => scrollListen());

watch(
  () => dataStore.loadError,
  () => (isLoadError.value = dataStore.loadError),
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
@import "@/assets/scss/components/_tooltip";
@import "@/assets/scss/components/_modal";

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
