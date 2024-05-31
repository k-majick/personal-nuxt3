<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <Loader />
    </div>

    <PoliciesHeader
      v-show="!dataStore.loadError"
      :nav-active="navActive"
      @toggle-nav="toggleNav"
    />

    <Burger 
      :nav-active="navActive" 
      @toggle-nav="toggleNav"
    />

    <PoliciesNav
      :is-active="navActive"
      @close-nav="navActive = false"
    />

    <main 
      v-if="!dataStore.loadError"
      class="main main--policies"
      :class="`main--${theme}`"
    >
      <div class="main__background"></div>
      <slot />
    </main>

    <span ref="tooltipEl" class="tooltip"></span>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { globalRefs } from '@/plugins/globalRefs';
import Loader from "@/components/Loader.vue";
import Burger from "@/components/Burger.vue";
import PoliciesHeader from "@/components/PoliciesHeader.vue";
import PoliciesNav from "@/components/PoliciesNav.vue";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);
const tooltipEl = ref();
const navActive = ref(false);

const toggleNav = () => navActive.value = !navActive.value;

onMounted(() => {
  globalRefs.tooltipEl = tooltipEl.value;
});
</script>

<style lang="scss">
@import "./assets/scss/components/policies";
</style>
