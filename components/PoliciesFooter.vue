<template>
  <footer class="footer footer--policies" :class="`footer--${theme}`">
    <nuxt-link class="footer__logo" to="/">
      <h1 class="footer__title">{{ config.public.appTitle }}</h1>
    </nuxt-link>
    <nuxt-link class="footer__copy" to="/">
      &copy; {{ date.getFullYear() }} {{ $t("ui.reserved") }}.
    </nuxt-link>
  </footer>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const config = useRuntimeConfig();
const uiStore = useUiStore();
const theme = computed(() => uiStore.currentTheme);

const date = new Date();
</script>

<style lang="scss">
@import "@/assets/scss/components/footer";
</style>
