<template>
  <header ref="headerEl" class="header" :class="`header--${theme}`">
    <section class="header__container header__container--logo">
      <a class="main__anchor"></a>
      <a class="header__logo">
        <h1 class="header__title">{{ config.public.appTitle }}</h1>
      </a>
      <!-- eslint-disable risxss/catch-potential-xss-vue -->
      <button
        class="theme__switch"
        :class="`theme__switch--${theme}`"
        @click="theme === 'dark' ? toggleTheme('lite') : toggleTheme('dark')"
        v-html="theme === 'dark' ? iconSun : iconMoon"
      ></button>
      <!-- eslint-enable risxss/catch-potential-xss-vue -->
    </section>
    <section class="header__container header__container--avatar">
      <Avatar />
      <div class="header__arrow" @click="scrollTo($event, mainEl)"></div>
      <a class="chevron__container" @click="scrollTo($event, mainEl)">
        <div class="chevron" :class="`chevron--${theme}`"></div>
      </a>
    </section>
  </header>
</template>

<script lang="ts">
import { useThemeStore } from '@/store/theme'
import { MainElKey } from '@/symbols/symbols'
import scrollTo from '@/composables/scrollTo'
import iconSun from '@/assets/gfx/icon-sun.svg?raw'
import iconMoon from '@/assets/gfx/icon-moon.svg?raw'
import DOMPurify from 'dompurify'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const route = useRoute()
    const mainEl = inject(MainElKey)
    const headerEl = ref<HTMLElement>()
    const config = useRuntimeConfig()
    const theme = ref(themeStore.currentTheme)

    watch(
      () => themeStore.currentTheme,
      () => (theme.value = themeStore.currentTheme),
    )

    const toggleTheme = (theme: string) => {
      themeStore.setTheme(theme)
      localStorage.setItem('user-theme', theme)
    }

    if (localStorage.getItem('user-theme')) {
      toggleTheme(localStorage.getItem('user-theme') as string)
    } else {
      toggleTheme('lite')
    }

    return {
      scrollTo,
      toggleTheme,
      theme,
      route,
      DOMPurify,
      config,
      headerEl,
      mainEl,
      iconSun,
      iconMoon,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_header';
@import './assets/scss/components/_chevron';
</style>
