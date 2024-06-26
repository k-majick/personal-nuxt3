<template>
  <section v-if="page" class="main__card">
    <h1 class="main__title">{{ page?.title }}</h1>

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
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useRoute } from "vue-router";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const slug = computed(() => getSlug(route.path as string));
const { data: page } = useAsyncData("page", async () => await dataStore.getPage(uiStore.locale, slug.value));

const pageContent = computed(() => page.value?.content);
const updatedAt = computed(() =>
  new Date(page.value?.updatedAt).toLocaleDateString(),
);

watch(
  () => [uiStore.locale, route.name],
  async () => {
    page.value = ((await dataStore.getPage(uiStore.locale, slug.value)));

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${page.value?.title}`,
});
</script>
