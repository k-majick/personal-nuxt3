<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <div class="loader__container">
        <div :class="`loader loader--${theme}`">
          <div class="loader__ray loader__ray--1"></div>
          <div class="loader__ray loader__ray--2"></div>
          <div class="loader__ray loader__ray--3"></div>
          <div class="loader__ray loader__ray--4"></div>
          <div class="loader__ray loader__ray--5"></div>
          <div class="loader__ray loader__ray--6"></div>
          <div class="loader__ray loader__ray--7"></div>
          <div class="loader__ray loader__ray--8"></div>
          <div class="loader__ray loader__ray--9"></div>
          <div class="loader__ray loader__ray--10"></div>
        </div>
        <span class="loader__text">{{
          dataStore.loadError
            ? $t("messages.loadError")
            : $t("messages.loading")
        }}</span>
      </div>
      <div
        v-Tooltip="
          dataStore.loadError
            ? $t('messages.loadError')
            : $t('messages.loading')
        "
        class="theme__loader"
      >
      </div>
    </div>
    <slot />
  </div>

  <span ref="tooltipEl" class="tooltip"></span>
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

onMounted(() => globalRefs.tooltipEl = tooltipEl.value);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);
</script>
