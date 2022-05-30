<template>
  <div
    class="main__content"
    v-if="technology && technology.content"
    v-html="marked.parse(technology.content)"
  ></div>
  <div class="technology__container" v-if="technology && technology.items">
    <span
      class="technology__item"
      v-for="item in technology.items"
      :key="item.name"
      >{{ item.name }}</span
    >
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore()
    const technology: Ref<any> = ref(await pagesStore.getTechnology())

    console.dir(technology)

    return {
      marked,
      technology,
    }
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_technology';
</style>
