<template>
  <header 
    class="header header--policies"
    :class="`header--${theme}`"
  >
    <div class="header__container">
      <a class="main__anchor main__anchor--top"></a>

      <nav class="header__nav">

        <nuxt-link
          v-for="link, i in links"
          :key="i"
          :to="link.to"
          class="header__link"
        >{{ $t(link.title)}}</nuxt-link>
      </nav>

      <UiControls />
    </div>
  </header>
</template>

<script lang="ts" setup>
import UiControls from "@/components/UiControls.vue";
import { useUiStore } from "@/store/ui";
import links from "@/assets/data/policies-links.json";

defineProps({
  navActive: {
    required: true,
    type: Boolean,
  },
})

const uiStore = useUiStore();
const theme = computed(() => uiStore.currentTheme);
</script>

<style lang="scss">
@import "./assets/scss/components/header";
</style>
