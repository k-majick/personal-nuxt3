<template>
  <div
    v-if="technology && technology.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(technology.content))"
  ></div>
  <div v-if="technology && technology.items" class="technology">
    <span
      v-for="item in technology.items"
      :key="item.name"
      class="technology__item"
      >{{ item.name }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

const dataStore = useDataStore();
const uiStore = useUiStore();
const technology: Ref<any> = ref(
  await dataStore.getTechnology(uiStore.currentLocale as string),
);

watch(
  () => uiStore.currentLocale,
  async () =>
    (technology.value = await dataStore.getTechnology(
      uiStore.currentLocale as string,
    )),
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_technology";
</style>
