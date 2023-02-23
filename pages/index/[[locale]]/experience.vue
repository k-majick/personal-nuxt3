<template>
  <section class="main__card">
    <Workplaces />
    <Counter />
  </section>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import Workplaces from "@/components/Workplaces.vue";
import Counter from "@/components/Counter.vue";

export default defineComponent({
  components: {
    Workplaces,
    Counter,
  },
  async setup() {
    const config = useRuntimeConfig();
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const pageData: Ref<any> = ref(
      await pagesStore.getPage(uiStore.currentLocale as string, 2),
    );

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    });
  },
});
</script>
