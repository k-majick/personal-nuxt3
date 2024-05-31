<template>
  <section class="main__card">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
    <Workplaces :theme="(theme as string)" />
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

const theme = computed(() => uiStore.currentTheme);

const pageData: Ref<IResponse> = ref(
  (await dataStore.getPage(uiStore.currentLocale as string, 2)) as IResponse,
);
const pageSlug: Ref<string> = ref(pageData.value.attributes.slug);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});

definePageMeta({
  layout: "portfolio",
});
</script>
