<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.title }}</h2>
    <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(marked.parse(page?.content as string) as string)
      "
    ></div>
    <Skills :theme="theme" :skills="skills" />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Skills from "@/components/Skills.vue"; 
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.theme);
const title = computed(() =>
  route.name === "index-locale"
    ? `${config.public.appName} | ${config.public.appTitle}`
    : `${config.public.appName} | ${t("page.skills")}`,
);

const { data: page } = useAsyncData(
  "page1",
  async () => await dataStore.getPage(uiStore.locale, "skills"),
);

const { data: skills } = useAsyncData(
  "skills",
  async () => await dataStore.getSkills(),
);

watch(
  () => [route.path, uiStore.locale],
  async () => {
    page.value = await dataStore.getPage(uiStore.locale, "skills");

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: title.value,
});
</script>
