<template>
  <header
    ref="headerEl"
    class="header header--portfolio"
    :class="`header--${theme}`"
  >
    <section class="header__container header__container--logo">
      <a class="main__anchor"></a>
      <a class="header__logo">
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
import UiControls from "@/components/UiControls.vue";
import { useUiStore } from "@/store/ui";
import { MainElKey } from "@/symbols/symbols";
import scrollTo from "@/composables/scrollTo";

const config = useRuntimeConfig();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);

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
