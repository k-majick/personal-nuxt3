<template>
  <section class="main__card">
    <h2 class="main__title">{{ pageTitle }}</h2>
    <Skills />
    <Technologies />
  </section>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import Skills from "@/components/Skills.vue";
import Technologies from "@/components/Technologies.vue";

export default defineComponent({
  components: {
    Skills,
    Technologies,
  },
  async setup() {
    const config = useRuntimeConfig();
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const pageData: Ref<any> = ref(
      await pagesStore.getPage(uiStore.currentLocale as string, 1),
    );
    const pageTitle: Ref<string> = ref(pageData.value.attributes.title);

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    });

    return {
      pageTitle,
    };
  },
});
</script>
