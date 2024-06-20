<template>
  <header
    ref="headerEl"
    class="header header--portfolio"
    :class="[`header--${theme}`, { 'header--loading': isLoading }]"
  >
    <section class="header__container header__container--logo">
      <a class="header__logo" href="/">
        <h1 class="header__title">{{ config.public.appTitle }}</h1>
      </a>

      <UiControls />
    </section>
    <section class="header__container header__container--avatar">
      <Avatar v-if="theme" :theme="theme" />
      <div class="header__arrow" @click="scrollTo($event, mainEl)"></div>
      <a class="chevron__container" @click="scrollTo($event, mainEl)">
        <div :class="`chevron chevron--${theme}`"></div>
      </a>
    </section>
  </header>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { MainElKey } from "@/symbols/symbols";
import UiControls from "@/components/UiControls.vue";
import scrollTo from "@/composables/scrollTo";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);
const isLoading = computed(() => dataStore.loading || dataStore.loadError);

const headerEl: Ref<HTMLElement | undefined> = ref();
const mainEl = inject(MainElKey);

defineExpose({
  headerEl,
});
</script>

<style lang="scss">
@import "@/assets/scss/components/header";
@import "@/assets/scss/components/chevron";
</style>
