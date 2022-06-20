<template>
  <section class="main__card main__card--gallery">
    <div
      v-if="inspiration"
      class="main__content"
      v-html="DOMPurify.sanitize(marked.parse(inspiration.content))"
    ></div>
    <div
      v-if="inspiration.pictures.length" 
      :class="`gallery gallery--inspiration gallery--${theme}`"
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
import { useThemeStore } from '@/store/theme'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  components: {},
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const themeStore = useThemeStore()
    const pageData: Ref<any> = ref(await pagesStore.getPage(5))
    const inspiration: Ref<any> = ref(await pagesStore.getInspiration())
    const theme = ref(themeStore.currentTheme)

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    })

    watch(
      () => themeStore.currentTheme,
      () => theme.value = themeStore.currentTheme,
    )

    return {
      marked,
      inspiration,
      DOMPurify,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_gallery';
@import '@/assets/scss/components/_modal';
</style>
