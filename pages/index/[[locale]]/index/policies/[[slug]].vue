<template>
  <section v-if="page?.attributes" class="main__card">
    <h1 class="main__title">{{ page?.attributes.title }}</h1>

    <div v-if="updatedAt" class="main__content">
      <p>
        <b>{{ $t("ui.updatedAt") }}:</b> {{ updatedAt }}
      </p>
    </div>

    <div
      class="main__content main__content--justify"
      v-html="
        DOMPurify.sanitize((pageContent ? marked(pageContent) : '') as string)
      "
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
import { useRoute } from "vue-router";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const page: Ref<IResponse | undefined> = ref();
const pageContent = computed(() => page.value?.attributes?.content);
const updatedAt = computed(() =>
  new Date(page.value?.attributes?.updatedAt).toLocaleDateString(),
);

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.currentLocale as string,
    getSlug(route.path as string),
  );

  if (!pageData) {
    return;
  }

  page.value = pageData;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${page?.value?.attributes?.title} | ${config.public.appTitle}`,
  });
});
</script>
