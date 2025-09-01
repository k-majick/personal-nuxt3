<template>
  <section id="content" class="main__card main__card--gallery">
    <h2 class="main__title">{{ page?.title }}</h2>
    <div
      v-if="page?.content"
      class="main__content main__content--justify"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.content as string) as string)
      "
    />
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

const { data: page } = useAsyncData(
  "page5",
  async () => await dataStore.getPage(uiStore.locale, "our-story"),
);

watch(
  () => [route.path, uiStore.locale],
  async () => {
    page.value = await dataStore.getPage(uiStore.locale, "our-story");

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${t("page.our-story")}`,
});

definePageMeta({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

onMounted(() => {
  const el = document.getElementById('content')
  if (el) {
    const yOffset = -15
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })

    setTimeout(() => {
      window.scrollTo({ top: y, behavior: 'smooth' })
    }, 1000)
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/gallery";
</style>
