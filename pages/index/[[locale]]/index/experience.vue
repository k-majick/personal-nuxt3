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
    <Jobs v-if="jobs?.length" :theme="theme" :jobs="jobs" />
    <Counter />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Jobs from "@/components/Jobs.vue";
import Counter from "@/components/Counter.vue";
import type { IResponse } from "@/types/common";
import DOMPurify from "dompurify";
import { marked } from "marked";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.currentTheme);
const page: Ref<IResponse | undefined> = ref();
const jobs = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.currentLocale,
    getSlug(route.path),
  );

  const jobsData = await dataStore.getExperience(uiStore.currentLocale);

  if (!pageData || !jobsData) {
    return;
  }

  page.value = pageData;
  jobs.value = jobsData.workplaces;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
  });
});
</script>
