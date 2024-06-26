<template>
  <section class="main__card">
    <!-- <h2
      class="main__title">{{ page?.title }}
    </h2> -->
    <!-- <div
      v-if="page?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(page?.content as string) as string,
        )
      "
    ></div> -->
    <!-- <Skills :theme="theme" :skills="skills" /> -->
    <!-- <div
      v-if="technology?.content"
      class="main__content"
      v-html="
        DOMPurify.sanitize(
          marked.parse(technology?.content as string) as string,
        )
      "
    ></div> -->
    <!-- <Technologies v-if="technology?.items.length" :techs="technology?.items" /> -->
  </section>
</template>

<script lang="ts" setup>
// import { useDataStore } from "@/store/data";
// import { useUiStore } from "@/store/ui";
// import Skills from "@/components/Skills.vue";
// import Technologies from "@/components/Technologies.vue";
// import type { IResponse } from "@/types/common";
// import DOMPurify from "isomorphic-dompurify";
// import { marked } from "marked";

// const config = useRuntimeConfig();
// const dataStore = useDataStore();
// const uiStore = useUiStore();
// const route = useRoute();

// const theme = computed(() => uiStore.theme);

// const pageSlug = route.name === "index-locale" ? "skills" : getSlug(route.path as string);
// const { data: page } = useAsyncData("page", async () => await dataStore.getPage(uiStore.locale, pageSlug));
// const { data: skills } = useAsyncData("skills", async () => await dataStore.getSkills(uiStore.locale, pageSlug));
// const { data: technology } = useAsyncData("technology", async () => await dataStore.getTechnology(uiStore.locale, pageSlug));

// const skills = ref();
// const technology = ref();

// watchEffect(async (): Promise<IResponse | void> => {
//   const pageData = await dataStore.getPage(
//     uiStore.locale as string,
//     pageSlug,
//   );

//   // const skillsData = await dataStore.getSkills(uiStore.locale);
//   // const techData = await dataStore.getTechnology(uiStore.locale);

//   // if (!pageData || !skillsData || !techData) {
//   //   return;
//   // }

//   page.value = pageData;
//   // skills.value = skillsData.sets;
//   // technology.value = techData;
//   // dataStore.loading = false;

//   useHead({
//     titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
//   });
// });
</script>
