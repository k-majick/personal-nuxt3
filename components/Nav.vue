<template>
  <nav 
    :class="[`nav nav--${theme}`, { active: isActive, activated: isActivated }]"
  >
    <ul class="nav__items">
      <li
        class="nav__item"
        @click.stop.prevent="scrollTo($event, headerEl), gotoIntro()"
      >
        <a href="" class="nav__link">Intro</a>
      </li>
      <li
        v-for="page in pages"
        :key="page.id"
        class="nav__item"
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
          v-hoverMessage="$t('messages.git')"
          href="https://github.com/k-majick"
          target="_blank"
          class="nav__socialLink"
        >
          <span v-html="DOMPurify.sanitize(iconGit)"></span>
          <span class="tooltip" :class="`tooltip--${theme}`"></span>
        </a>
      </li>
      <li class="nav__socialItem">
        <a
          v-hoverMessage="$t('messages.linked')"
          href="https://www.linkedin.com/in/maciej-klimowicz"
          target="_blank"
          class="nav__socialLink"
        >
          <span v-html="DOMPurify.sanitize(iconLinkedin)"></span>
          <span class="tooltip" :class="`tooltip--${theme}`"></span>
        </a>
      </li>
    </ul>
    <!-- eslint-disable-next-line risxss/catch-potential-xss-vue -->
    <nuxt-link :to="'inspiration'" class="cat" :class="`cat--${theme}`" v-html="rawCat" />
  </nav>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useThemeStore } from '@/store/theme'
import { hoverMessage } from '@/composables/hoverMessage'
import scrollTo from '@/composables/scrollTo'
import iconLinkedin from '@/assets/gfx/icon-linkedin-min.svg?raw'
import { MainElKey, HeaderElKey } from '@/symbols/symbols'
import iconGit from '@/assets/gfx/icon-git-min.svg?raw'
import rawCat from '@/assets/gfx/cat_1.svg?raw'
import DOMPurify from 'dompurify'

export default defineComponent({
  directives: {
    hoverMessage,
  },
  props: {
    isActivated: Boolean,
  },
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const pagesStore = usePagesStore()
    const isActive = ref(false)

    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)

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

    const handleScroll = () => {
      if (!mainEl || !mainEl.value) {
        return
      }
      
      if (
        mainEl.value.getBoundingClientRect().top < 100 &&
        route.path === '/'
      ) {
        gotoSkills()
        isActive.value = true
      } else if (mainEl.value.getBoundingClientRect().top < 100) {
        isActive.value = true
      } else {
        isActive.value = false
      }
    }

    window.addEventListener('scroll', handleScroll)

    watch(
      () => themeStore.currentTheme,
      () => theme.value = themeStore.currentTheme,
    )

    return {
      isActive,
      iconGit,
      iconLinkedin,
      scrollTo,
      gotoIntro,
      headerEl,
      mainEl,
      pages,
      rawCat,
      DOMPurify,
      theme,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_nav';
@import './assets/scss/components/_cat';
</style>
