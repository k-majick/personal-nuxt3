<template>
  <div
    v-if="technology && technology.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(technology.content))"
  ></div>
  <div
    v-if="technology && technology.items"
    class="technology"
    :class="`technology--${theme}`"
  >
    <span
      v-for="item in technology.items"
      :key="item.name"
      class="technology__item"
      >{{ item.name }}</span
    >
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const theme = ref(uiStore.currentTheme);
    const technology: Ref<any> = ref(
      await pagesStore.getTechnology(uiStore.currentLocale as string),
    );

    watch(
      () => uiStore.currentTheme,
      () => (theme.value = uiStore.currentTheme),
    );

    watch(
      () => uiStore.currentLocale,
      async () =>
        (technology.value = await pagesStore.getTechnology(
          uiStore.currentLocale as string,
        )),
    );

    return {
      marked,
      technology,
      DOMPurify,
      theme,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/_technology";
</style>
