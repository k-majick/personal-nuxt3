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
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useThemeStore } from '@/store/theme'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore()
    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)
    const technology: Ref<any> = ref(await pagesStore.getTechnology())

    watch(
      () => themeStore.currentTheme,
      () => (theme.value = themeStore.currentTheme),
    )

    return {
      marked,
      technology,
      DOMPurify,
      theme,
    }
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_technology';
</style>
