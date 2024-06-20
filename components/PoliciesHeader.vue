<template>
  <header class="header header--policies" :class="`header--${theme}`">
    <div class="header__container">
      <nav class="header__nav">
        <nuxt-link
          v-for="(link, i) in links"
          :key="i"
          :to="`${link.useLocale ? '/' + locale : ''}${link.to}`"
          class="header__link"
          >{{ $t(link.title) }}</nuxt-link
        >
      </nav>

      <UiControls />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useI18n } from "vue-i18n";
import UiControls from "@/components/UiControls.vue";
import links from "@/assets/data/policies-links.json";

const { locale } = useI18n({ useScope: "global" });

defineProps({
  navActive: {
    required: true,
    type: Boolean,
  },
});

const uiStore = useUiStore();
const theme = computed(() => uiStore.currentTheme);
</script>

<style lang="scss">
@import "@/assets/scss/components/header";
</style>
