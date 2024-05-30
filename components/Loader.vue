<template>
  <div :class="`loader loader--${theme}`">
    <div class="loader__container">
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
      dataStore.loadError ?
        $t("messages.loadError") :
        $t("messages.loading")
    }}</span>
    <div
      v-tooltip="
        dataStore.loadError
        ? $t('messages.loadError')
        : $t('messages.loading')
      "
        class="loader__logo"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { vTooltip } from "@/composables/tooltip";

const dataStore = useDataStore();
const uiStore = useUiStore();

const theme = computed(() => uiStore.currentTheme);
</script>

<style lang="scss">
@import "@/assets/scss/components/_loader";
</style>
