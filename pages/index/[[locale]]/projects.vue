<template>
  <section class="main__card main__card--gallery">
    <h2 class="main__title">{{ pageTitle }}</h2>
    <Projects />
  </section>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import Projects from "@/components/Projects.vue";

export default defineComponent({
  components: {
    Projects,
  },
  async setup() {
    const config = useRuntimeConfig();
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const pageData: Ref<any> = ref(
      await pagesStore.getPage(uiStore.currentLocale as string, 3),
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
