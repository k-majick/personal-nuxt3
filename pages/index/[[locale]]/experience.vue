<template>
  <section class="main__card">
    <h2 class="main__title">{{ page?.attributes.title }}</h2>
    <Workplaces :theme="theme" />
    <Counter />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Workplaces from "@/components/Workplaces.vue";
import Counter from "@/components/Counter.vue";
import type { IResponse } from "@/types/common";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.currentTheme);
const page: Ref<IResponse | undefined> = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(uiStore.currentLocale as string, getSlug(route.path as string));

  if (!pageData) {
    return;
  }

  page.value = pageData;

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
