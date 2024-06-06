<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.attributes.title }}</h2>
    <div
      v-if="page?.attributes.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(page?.attributes.content as string) as string,
        )
      "
    ></div>
    <Skills :theme="theme" :skills="skills" />
    <div
      v-if="technology?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(technology?.content as string) as string,
        )
      "
    ></div>
    <Technologies v-if="technology?.items.length" :techs="technology?.items" />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Skills from "@/components/Skills.vue";
import Technologies from "@/components/Technologies.vue";
import type { IResponse } from "@/types/common";
import DOMPurify from "dompurify";
import { marked } from "marked";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.currentTheme);
const page: Ref<IResponse | undefined> = ref();
const skills = ref();
const technology = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.currentLocale as string,
    getSlug(route.path as string),
  );

  const skillsData = await dataStore.getSkills(uiStore.currentLocale);
  const techData = await dataStore.getTechnology(uiStore.currentLocale);

  if (!pageData || !skillsData || !techData) {
    return;
  }

  page.value = pageData;
  skills.value = skillsData.sets;
  technology.value = techData;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
  });
});

definePageMeta({
  layout: "portfolio",
});

definePageMeta({
  layout: "portfolio",
});
</script>
