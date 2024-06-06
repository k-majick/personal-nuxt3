<template>
  <nav
    v-click-outside:[exclude]="() => $emit('closeNav')"
    class="nav nav--policies"
    :class="[`nav--${theme}`, { activated: isActive }]"
  >
    <ul class="nav__items">
      <li v-for="(link, i) in links" :key="i" class="nav__item">
        <nuxt-link
          :to="`${link.useLocale ? '/' + locale : ''}${link.to}`"
          class="nav__link"
          >{{ $t(link.title) }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useI18n } from "vue-i18n";
import { vClickOutside } from "@/composables/clickOutside";
import links from "@/assets/data/policies-links.json";

const { locale } = useI18n({ useScope: "global" });

defineProps({
  isActive: {
    required: true,
    type: Boolean,
  },
});

defineEmits(["closeNav"]);

const uiStore = useUiStore();
const theme = computed(() => uiStore.currentTheme);
const exclude = "burger";
</script>

<style lang="scss">
@import "@/assets/scss/components/nav";
</style>
