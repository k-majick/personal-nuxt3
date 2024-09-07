<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.title }}</h2>
    <div
      v-if="page?.content"
      class="main__content"
      v-html="DOMPurify.sanitize(marked.parse(page?.content) as string)"
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const { data: page } = useAsyncData(
  "page2",
  async () => await dataStore.getPage(uiStore.locale, "hire-me"),
);

watch(
  () => [route.path, uiStore.locale],
  async () => {
    page.value = await dataStore.getPage(uiStore.locale, "hire-me");

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${t("page.hire-me")}`,
});
</script>
