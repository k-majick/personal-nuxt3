<template>
  <section class="main__card main__card--gallery">
    <div
      v-if="page?.attributes.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.attributes.content as string) as string)
      "
    ></div>
    <div
      v-if="pics?.pictures.length"
      class="gallery gallery--inspiration"
      :class="`gallery--${theme}`"
    >
      <div
        v-for="(picture, index) in pics.pictures as IItem[]"
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
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";
import type { IResponse, IItem } from "@/types/common";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.currentTheme);
const page: Ref<IResponse | undefined> = ref();
const pics: Ref<IResponse | undefined> = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.currentLocale as string,
    getSlug(route.path as string),
  );
  const picsData = (await dataStore.getInspiration(
    uiStore.currentLocale as string,
  )) as IResponse;

  if (!pageData) {
    return;
  }

  page.value = pageData;
  pics.value = picsData;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
  });
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/gallery";
</style>
   