<template>
  <section class="main__card main__card--gallery">
    <div
      v-if="inspiration"
      class="main__content"
      v-html="DOMPurify.sanitize(marked.parse(inspiration.content))"
    ></div>
    <div
      v-if="inspiration.pictures.length"
      class="gallery gallery--inspiration"
      :class="`gallery--${theme}`"
    >
      <div
        v-for="(picture, index) in inspiration.pictures"
        :key="index"
        class="gallery__item"
      >
        <div class="gallery__title">
          {{ picture.title }}
        </div>
        <img
          class="gallery__image"
          :src="picture.imageUrl"
          :alt="picture.title"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);
const pageData: Ref<any> = ref(
  await dataStore.getPage(uiStore.currentLocale as string, 5),
);
const inspiration: Ref<any> = ref(
  await dataStore.getInspiration(uiStore.currentLocale as string),
);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});

watch(
  () => uiStore.currentLocale,
  async () =>
    (inspiration.value = await dataStore.getInspiration(
      uiStore.currentLocale as string,
    )),
);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_gallery";
</style>
