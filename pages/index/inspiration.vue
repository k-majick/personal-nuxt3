<template>
  <section class="main__card main__card--gallery">

    <div
      class="main__content"
      v-if="inspiration && inspiration.content"
      v-html="marked.parse(inspiration.content)"
    ></div>
    <div v-if="inspiration.pictures.length" class="gallery gallery--inspiration">
      <div
        class="gallery__item"
        v-for="(picture, index) in inspiration.pictures"
        :key="index"
      >
        <div class="gallery__title">
          {{ picture.title }}
        </div>
        <img class="gallery__image" :src="picture.imageUrl" :alt="picture.title" />
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'

export default {
  components: {
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const pageData = await pagesStore.getPage(5)
    const inspiration = await pagesStore.getInspiration()

    console.dir(inspiration)

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.attributes.title}`,
    })

    return {
      marked,
      inspiration,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_gallery';
@import '@/assets/scss/components/_modal';
</style>
