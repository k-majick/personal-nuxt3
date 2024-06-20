<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.attributes.title }}</h2>
    <div
      v-if="page?.attributes.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.attributes.content) as string)
      "
    ></div>
    <ContactForm />
  </section>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useDataStore } from "@/store/data";
import ContactForm from "@/components/ContactForm.vue";
import type { IResponse } from "@/types/common";
import DOMPurify from "dompurify";
import { marked } from "marked";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const page: Ref<IResponse | undefined> = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.currentLocale as string,
    getSlug(route.path as string),
  );

  if (!pageData) {
    return;
  }

  page.value = pageData;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
  });
});
</script>
