<template>
  <section class="main__card main__card--gallery">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
    <Projects :theme="(theme as string)" />
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import Projects from "@/components/Projects.vue";

const config = useRuntimeConfig();
const pagesStore = usePagesStore();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);
const pageData: Ref<any> = ref(
  await pagesStore.getPage(uiStore.currentLocale as string, 3),
);
const pageSlug: Ref<string> = ref(pageData.value.attributes.slug);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);
</script>
