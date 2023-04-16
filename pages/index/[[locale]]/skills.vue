<template>
  <section class="main__card">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
    <Skills :theme="(theme as string)" />
    <Technologies />
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import Skills from "@/components/Skills.vue";
import Technologies from "@/components/Technologies.vue";

const config = useRuntimeConfig();
const pagesStore = usePagesStore();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);
const pageData: Ref<any> = ref(
  await pagesStore.getPage(uiStore.currentLocale as string, 1),
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
