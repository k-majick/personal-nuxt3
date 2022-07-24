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
import { useSettingsStore } from '@/store/settings'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore()
    const settingsStore = useSettingsStore()
    const theme = ref(settingsStore.currentTheme)
    const technology: Ref<any> = ref(await pagesStore.getTechnology(settingsStore.currentLocale as string))

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    )

    watch(
      () => settingsStore.currentLocale,
      async () => technology.value = await pagesStore.getTechnology(settingsStore.currentLocale as string),
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
