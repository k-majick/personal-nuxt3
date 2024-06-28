<template>
  <section class="main__card main__card--gallery">
    <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.content as string) as string)
      "
    ></div>
    <div
      v-if="pics?.pictures?.length"
      class="gallery gallery--inspiration"
      :class="`gallery--${uiStore.theme}`"
    >
      <div
        v-for="(picture, index) in pics.pictures"
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
import DOMPurify from "isomorphic-dompurify";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const { data: page } = useAsyncData("page5", async () => await dataStore.getPage(uiStore.locale, "inspiration"));
const { data: pics } = useAsyncData("pics", async () => await dataStore.getPics(uiStore.locale));

watch(
  () => [route.path, uiStore.locale],
  async () => {
    page.value = ((await dataStore.getPage(uiStore.locale, "inspiration")));

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${t('page.inspiration')}`,
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/gallery";
</style>
   