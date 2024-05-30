<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <Loader />
    </div>

    <HeaderPolicies v-show="!dataStore.loadError" />

    <main v-if="!dataStore.loadError" class="main main--policies">
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
import HeaderPolicies from "@/components/HeaderPolicies.vue";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);
const tooltipEl = ref();

onMounted(() => {
  globalRefs.tooltipEl = tooltipEl.value;
});
</script>

<style lang="scss">
@import "./assets/scss/components/policies";
</style>
