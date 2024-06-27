<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.title }}</h2>
    <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(page?.content as string) as string,
        )
      "
    ></div>
    <Jobs 
      v-if="jobs?.length"
      :theme="theme"
      :jobs="jobs"
    />
    <Counter />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Jobs from "@/components/Jobs.vue";
import Counter from "@/components/Counter.vue";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.theme);
const slug = getSlug(route.path as string);

const { data: page } = useAsyncData("page", async () => await dataStore.getPage(uiStore.locale, slug));
const { data: jobs } = useAsyncData("jobs", async () => await dataStore.getJobs(uiStore.locale));

watch(
  () => uiStore.locale,
  async () => {
    page.value = ((await dataStore.getPage(uiStore.locale, slug)));
    jobs.value = ((await dataStore.getJobs(uiStore.locale)));

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${t('page.experience')}`,
});
</script>
