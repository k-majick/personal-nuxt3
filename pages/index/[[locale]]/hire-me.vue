<template>
  <section class="main__card">
    <ContactForm />
  </section>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { useUiStore } from "@/store/ui";
import { usePagesStore } from "@/store/pages";
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
  components: {
    ContactForm,
  },
  async setup() {
    const config = useRuntimeConfig();
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const pageData: Ref<any> = ref(
      await pagesStore.getPage(uiStore.currentLocale as string, 4),
    );

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    });
  },
});
</script>
