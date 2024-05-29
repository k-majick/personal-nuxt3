<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <div
        v-tooltip="
          dataStore.loadError
            ? $t('messages.loadError')
            : $t('messages.loading')
        "
        class="theme__loader"
      >
      </div>
    </div>

    <main v-if="!isLoadError" class="main">
      <div class="main__background"></div>
      <slot />
    </main>

    <span ref="tooltipEl" class="tooltip"></span>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { vTooltip } from "@/composables/tooltip";
import { globalRefs } from '@/plugins/globalRefs';

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = ref(uiStore.currentTheme);
const tooltipEl = ref();
const isLoadError = ref(dataStore.loadError);

onMounted(() => {
  globalRefs.tooltipEl = tooltipEl.value;
});

watch(
  () => dataStore.loadError,
  () => (isLoadError.value = dataStore.loadError),
);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);
</script>
