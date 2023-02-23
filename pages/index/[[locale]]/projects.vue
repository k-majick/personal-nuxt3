<template>
  <section class="main__card main__card--gallery">
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

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    });
  },
});
</script>
