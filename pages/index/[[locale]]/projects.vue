<template>
  <section class="main__card main__card--gallery">
    <h2 class="main__title">{{ $t(`pages.${pageSlug}.title`) }}</h2>
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
    const pageSlug: Ref<string> = ref(pageData.value.attributes.slug);

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    });

    return {
      pageSlug,
    };
  },
});
</script>
