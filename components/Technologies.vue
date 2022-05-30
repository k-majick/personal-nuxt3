<template>
  <div
    v-if="technology && technology.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(technology.content))"
  ></div>
  <div v-if="technology && technology.items" class="technology__container">
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
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore()
    const technology: Ref<any> = ref(await pagesStore.getTechnology())

    return {
      marked,
      technology,
      DOMPurify,
    }
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_technology';
</style>
