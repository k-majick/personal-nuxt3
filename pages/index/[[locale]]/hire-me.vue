<template>
  <section class="main__card">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
    <ContactForm />
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useUiStore } from "@/store/ui";
import { usePagesStore } from "@/store/pages";
import ContactForm from "@/components/ContactForm.vue";

const config = useRuntimeConfig();
const pagesStore = usePagesStore();
const uiStore = useUiStore();
const pageData: Ref<any> = ref(
  await pagesStore.getPage(uiStore.currentLocale as string, 4),
);
const pageSlug: Ref<string> = ref(pageData.value.attributes.slug);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});
</script>
