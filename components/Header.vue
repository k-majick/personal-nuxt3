<template>
  <header ref="headerEl" class="header" :class="`header--${layout}`">
    <section class="header__container">
      <a class="main__anchor"></a>
      <a class="header__logo">
        <h1
          class="header__title"
          v-html="DOMPurify.sanitize($t('messages.name'))"
        ></h1>
      </a>
      <Avatar />
      <div class="header__arrow" @click="scrollTo($event, mainEl)"></div>
      <a class="chevron__container" @click="scrollTo($event, mainEl)">
        <div class="chevron"></div>
      </a>
    </section>
  </header>
</template>

<script lang="ts">
import { MainElKey } from '@/symbols/symbols'
import scrollTo from '@/composables/scrollTo'
import DOMPurify from 'dompurify'

export default defineComponent({
  setup() {
    const route = useRoute()
    const mainEl = inject(MainElKey)
    const layout = ref(route.meta.layout)
    const headerEl = ref<HTMLElement>()

    watch(
      () => route.meta.layout,
      () => (layout.value = route.meta.layout),
    )

    return {
      layout,
      scrollTo,
      headerEl,
      mainEl,
      DOMPurify,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_header';
@import './assets/scss/components/_chevron';
</style>
