<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background"></div>
    <Loader v-if="isLoading" />
    <Burger :nav-active="navActive" @toggle-nav="toggleNav" />
    <PoliciesHeader :nav-active="navActive" @toggle-nav="toggleNav" />
    <PoliciesNav :is-active="navActive" @close-nav="navActive = false" />
    <main
      class="main main--policies main--active"
      :class="[`main--${theme}`, { 'main--loading': isLoading }]"
    >
      <slot />
    </main>
    <CookieBanner :theme="theme" />
    <span ref="tooltipEl" class="tooltip tooltip--policies"></span>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { globalRefs } from "@/plugins/globalRefs";
import Loader from "@/components/Loader.vue";
import Burger from "@/components/Burger.vue";
import PoliciesHeader from "@/components/PoliciesHeader.vue";
import PoliciesNav from "@/components/PoliciesNav.vue";
import CookieBanner from "@/components/CookieBanner.vue";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.theme);
const isLoading = computed(() => dataStore.loading || dataStore.loadError);

const tooltipEl = ref();
const navActive = ref(false);

const toggleNav = () => (navActive.value = !navActive.value);

onMounted(() => {
  globalRefs.tooltipEl = tooltipEl.value;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/policies";
</style>
