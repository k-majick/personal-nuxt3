<template>
  <section v-if="pageData?.attributes" class="main__card">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>

    <div v-if="updatedAt" class="main__content">
      <p><b>{{ $t('content.updatedAt') }}:</b> {{ updatedAt }}</p>
    </div>

    <div 
      class="main__content main__content--justify" 
      v-html="DOMPurify.sanitize((pageContent ? marked(pageContent) : '') as string)"
    ></div>

    <PoliciesFooter />
  </section>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useDataStore } from "@/store/data";
import PoliciesFooter from "@/components/PoliciesFooter.vue";
import type { IResponse } from "@/types/common";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useRoute } from 'vue-router';

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const slugToIdMap = {
  'privacy-policy': 16,
  'terms-of-use': 17,
};

const id = slugToIdMap[(route.params.slug as string)];

const pageData: Ref<IResponse> = ref(await dataStore.getPage(uiStore.currentLocale as string, id) as IResponse);
const pageSlug = computed(() => pageData.value?.attributes?.slug);
const pageContent = computed(() => pageData.value?.attributes?.content);
const updatedAt = computed(() => new Date(pageData.value?.attributes?.updatedAt).toLocaleDateString());

useHead({
  titleTemplate: `${config.public.appName} | ${pageData?.value?.attributes?.title}`,
});

watch(
  () => [uiStore.currentLocale, route.path],
  async () => {
    const id = slugToIdMap[(route.params.slug as string)];

    (pageData.value = await dataStore.getPage(uiStore.currentLocale as string, id) as IResponse);
  },
);
</script>
