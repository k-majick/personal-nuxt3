<template>
  <section class="main__card">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
    <Workplaces :theme="(theme as string)" />
    <Counter />
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Workplaces from "@/components/Workplaces.vue";
import Counter from "@/components/Counter.vue";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);
const pageData: Ref<any> = ref(
  await dataStore.getPage(uiStore.currentLocale as string, 2),
);
const pageSlug: Ref<string> = ref(pageData.value.attributes.slug);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});
</script>
