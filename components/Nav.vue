<template>
  <nav
    :class="[`nav nav--${theme}`, { active: isActive, activated: isActivated }]"
  >
    <div class="nav__mask" @click="$emit('closeNav')"></div>
    <ul class="nav__items">
      <li class="nav__item">
        <a
          href=""
          class="nav__link"
          @click.stop.prevent="killModal(), scrollTo($event, headerEl)"
          >Start</a
        >
      </li>
      <li v-for="page in pages" :key="page.id" class="nav__item">
        <nuxt-link
          :to="page.attributes.slug"
          class="nav__link"
          @click.stop="killModal(), scrollTo($event, mainEl)"
        >
          {{ page.attributes.title }}
        </nuxt-link>
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
    <div v-hoverMessage="$t('messages.meow')" class="cat__wrapper">
      <nuxt-link
        :to="'inspiration'"
        :class="`cat cat--${theme}`"
        @click.stop="killModal()"
      >
        <!-- eslint-disable risxss/catch-potential-xss-vue -->
        <div v-html="rawCat"></div>
        <!-- eslint-enable risxss/catch-potential-xss-vue -->
      </nuxt-link>
      <span class="tooltip" :class="`tooltip--${theme}`"></span>
    </div>
  </nav>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useSettingsStore } from '@/store/settings'
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
  emits: ['closeNav'],
  async setup() {
    const pagesStore = usePagesStore()
    const settingsStore = useSettingsStore()

    const isActive = ref(false)
    const theme = ref(settingsStore.currentTheme)

    const headerEl = inject(HeaderElKey)
    const mainEl = inject(MainElKey)

    const sortItems = (pagesArr: Record<string, any>[]) =>
      pagesArr
        .sort((a, b) => (a.attributes.order < b.attributes.order ? -1 : 1))
        .filter(item => item.attributes.slug !== 'inspiration')

    const pages: Ref<any> = ref(
      sortItems([
        ...((await pagesStore.getPages(
          settingsStore.currentLocale as string,
        )) as unknown as []),
      ]),
    )

    const killModal = () => {
      const body = document.body

      if (body.classList.contains('locked')) {
        toggleModal(0, true)
      }
    }

    const handleScroll = () => {
      if (!mainEl || !mainEl.value) {
        return
      }

      mainEl.value.getBoundingClientRect().top < 100
        ? (isActive.value = true)
        : (isActive.value = false)
    }

    window.addEventListener('scroll', handleScroll)

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    )

    watch(
      () => settingsStore.currentLocale,
      async () =>
        (pages.value = await sortItems([
          ...((await pagesStore.getPages(
            settingsStore.currentLocale as string,
          )) as unknown as []),
        ])),
    )

    return {
      isActive,
      iconGit,
      iconLinkedin,
      scrollTo,
      headerEl,
      mainEl,
      pages,
      rawCat,
      DOMPurify,
      theme,
      killModal,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_nav';
@import './assets/scss/components/_cat';
</style>
