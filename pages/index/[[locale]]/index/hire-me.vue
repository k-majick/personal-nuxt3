<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.title }}</h2>
    <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.content) as string)
      "
    ></div>
    <ContactForm />
  </section>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useDataStore } from "@/store/data";
import ContactForm from "@/components/ContactForm.vue";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const slug = getSlug(route.path as string);
const { data: page } = useAsyncData("page", async () => await dataStore.getPage(uiStore.locale, slug));

watch(
  () => uiStore.locale,
  async () => {
    page.value = ((await dataStore.getPage(uiStore.locale, slug)));

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${page.value?.title}`,
});
</script>
