<template>
  <section class="main__card">
    <h2
      class="main__title">{{ page?.title }}
    </h2>
    <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(page?.content as string) as string,
        )
      "
    ></div>
    <Skills :theme="theme" :skills="skills" />
    <div
      v-if="technology?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(technology?.content as string) as string,
        )
      "
    ></div>
    <Technologies v-if="technology?.items.length" :techs="technology?.items" />
  </section>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import Skills from "@/components/Skills.vue";
import Technologies from "@/components/Technologies.vue";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.theme);
const slug = route.name === "index-locale" ? "skills" : getSlug(route.path as string);

const { data: page } = useAsyncData("page", async () => await dataStore.getPage(uiStore.locale, slug));
const { data: skills } = useAsyncData("skills", async () => await dataStore.getSkills(uiStore.locale));
const { data: technology } = useAsyncData("technology", async () => await dataStore.getTechnology(uiStore.locale));

watch(
  () => uiStore.locale,
  async () => {
    page.value = ((await dataStore.getPage(uiStore.locale, slug)));
    skills.value = ((await dataStore.getSkills(uiStore.locale)));
    technology.value = ((await dataStore.getTechnology(uiStore.locale)));
    dataStore.loading = false;

    useHead({
      titleTemplate: `${config.public.appName} | ${page.value?.title}`,
    });
  },
);

useHead({
  titleTemplate: `${config.public.appName} | ${page.value?.title}`,
});
</script>
