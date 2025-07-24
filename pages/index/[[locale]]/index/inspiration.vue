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
        @click="openImage(picture.imageUrl)"
      >
        <div class="gallery__title">
          {{ picture.title }}
          <span class="material-icons">touch_app</span>
        </div>
        <img
          class="gallery__image"
          :src="picture.imageUrl"
          :alt="picture.title"
        />
      </div>
    </div>
  </section>
  <Dialog
    v-if="uiStore.isDialogOpen(999)"
    :id="999"
    :dialog-type="'image'"
    @close="
      uiStore.toggleDialog(999);
      imageOpenUrl = null;
    "
  >
    <template #content>
      <div class="dialog__content">
        <img
          class="project__logo"
          :src="imageOpenUrl"
          alt="Kitty"
        />
      </div>
    </template>
  </Dialog>
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

const imageOpenUrl = ref();

const openImage = (url: string) => {
  imageOpenUrl.value = url
  uiStore.toggleDialog(999, false);
}

const { data: page } = useAsyncData(
  "page5",
  async () => await dataStore.getPage(uiStore.locale, "inspiration"),
);

const { data: pics } = useAsyncData(
  "pics",
  async () => await dataStore.getPics(uiStore.locale),
);

watch(
  () => [route.path, uiStore.locale],
  async () => {
    page.value = await dataStore.getPage(uiStore.locale, "inspiration");

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${t("page.inspiration")}`,
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/gallery";
</style>
