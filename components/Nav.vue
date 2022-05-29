<template>
  <nav class="nav" :class="{ active: isActive, activated: isActivated }">
    <ul class="nav__items">
      <li
        class="nav__item"
        @click.stop.prevent="scrollTo($event, headerEl), gotoIntro()"
      >
        <a href="" class="nav__link">Intro</a>
      </li>
      <li
        class="nav__item"
        v-if="pages && pages.length"
        v-for="page in pages"
        :key="page.id"
        @click.stop.prevent="scrollTo($event, mainEl)"
      >
        <nuxt-link :to="page.attributes.slug" class="nav__link">{{
          page.attributes.title
        }}</nuxt-link>
      </li>
    </ul>
    <ul class="nav__social">
      <li class="nav__socialItem">
        <a
          class="nav__socialLink"
          href="https://github.com/k-majick"
          target="_blank"
          v-hoverMessage="$t('messages.git')"
        >
          <span v-html="iconGit"></span>
          <span class="tooltip"></span>
        </a>
      </li>
      <li class="nav__socialItem">
        <a
          class="nav__socialLink"
          href="https://www.linkedin.com/in/maciej-klimowicz"
          target="_blank"
          v-hoverMessage="$t('messages.linked')"
        >
          <span v-html="iconLinkedin"></span>
          <span class="tooltip"></span>
        </a>
      </li>
    </ul>
    <nuxt-link :to="'inspiration'" class="cat" v-html="rawCat" />
  </nav>
</template>

<script lang="ts">
import type { Ref, InjectionKey } from 'vue'
import scrollTo from '@/composables/scrollTo'
import { hoverMessage } from '@/composables/hoverMessage'
import iconLinkedin from '@/assets/gfx/icon-linkedin-min.svg?raw'
import iconGit from '@/assets/gfx/icon-git-min.svg?raw'
import rawCat from '@/assets/gfx/cat_1.svg?raw'
import { usePagesStore } from '@/store/pages'
import { MainElKey, HeaderElKey } from '@/symbols/symbols'

export default defineComponent({
  layout: 'dark',
  directives: {
    hoverMessage,
  },
  props: {
    isActivated: Boolean,
  },
  async setup(props) {
    const route = useRoute()
    const router = useRouter()
    const pagesStore = usePagesStore()
    const isActive = ref(false)
    const isActivated = ref(props.isActivated)

    const headerEl = inject(HeaderElKey)
    const mainEl = inject(MainElKey)

    const pagesData: Ref<any> = ref(await pagesStore.getPages())

    const sortItems = (pagesArr: Record<string, any>[]) =>
      pagesArr
        .sort((a, b) => (a.attributes.order < b.attributes.order ? -1 : 1))
        .filter(item => item.attributes.slug !== 'inspiration')

    const pages = sortItems([...pagesData.value])

    const gotoSkills = () => {
      router.push({
        path: '/skills',
      })
    }

    const gotoIntro = () => {
      router.push({
        path: '/',
      })
    }

    watch(
      () => props.isActivated,
      () => (isActivated.value = props.isActivated),
    )

    const handleScroll = () => {
      if (
        mainEl &&
        mainEl.value.getBoundingClientRect().top < 100 &&
        route.path === '/'
      ) {
        gotoSkills()
        isActive.value = true
      } else if (mainEl && mainEl.value.getBoundingClientRect().top < 100) {
        isActive.value = true
      } else {
        isActive.value = false
      }
    }

    window.addEventListener('scroll', handleScroll)

    return {
      isActive,
      iconGit,
      iconLinkedin,
      scrollTo,
      gotoIntro,
      headerEl,
      mainEl,
      pages,
      isActivated,
      rawCat,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_nav';
@import './assets/scss/components/_cat';
</style>
