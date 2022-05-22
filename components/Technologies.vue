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
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'

export default {
  async setup() {
    const route = useRoute()
    const pagesStore = usePagesStore()
    const technology = await pagesStore.getTechnology()

    return {
      marked,
      technology,
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_technology';
</style>
