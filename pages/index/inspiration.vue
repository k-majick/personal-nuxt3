<template>
  <section class="main__card main__card--gallery">
    <div
      v-if="inspiration"
      class="main__content"
      v-html="DOMPurify.sanitize(marked.parse(inspiration.content))"
    ></div>
    <div
      v-if="inspiration.pictures.length"
      class="gallery gallery--inspiration"
    >
      <div
        v-for="(picture, index) in inspiration.pictures"
        :key="index"
        class="gallery__item"
      >
        <div class="gallery__title">
          {{ picture.title }}
        </div>
        <img
          class="gallery__image"
          :src="picture.imageUrl"
          :alt="picture.title"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  components: {},
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const pageData: Ref<any> = ref(await pagesStore.getPage(5))
    const inspiration: Ref<any> = ref(await pagesStore.getInspiration())

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    })

    return {
      marked,
      inspiration,
      DOMPurify,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_gallery';
@import '@/assets/scss/components/_modal';
</style>
