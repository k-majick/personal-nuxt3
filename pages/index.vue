<template>
  <Header ref="headerComponent" />

  <main ref="mainEl" :class="`main main--${theme}`">
    <div class="main__background"></div>
    <div class="burger" :class="{ active: isNavActivated }" @click="toggleNav">
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </div>

    <Nav :is-activated="isNavActivated" />

    <div class="main__container">
      <router-view v-slot="{ Component, props }">
        <Transition name="fade">
          <component :is="Component" v-bind="props" />
        </Transition>
      </router-view>
    </div>
  </main>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { useThemeStore } from '@/store/theme'
import { MainElKey, HeaderElKey } from '@/symbols/symbols'

export default defineComponent({
  layout: 'default',
  setup() {
    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)
    const headerComponent: Ref<any> = ref()
    const mainEl: Ref<HTMLElement | undefined> = ref<HTMLElement>()
    const headerEl: Ref<HTMLElement | undefined> = ref<HTMLElement>()
    const isNavActivated = ref(false)

    const scrollListen = () => {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        // const docHeight = document.body.offsetHeight;
        // const scrollPercent = Math.round(scrollTop / docHeight * 100);
        // const invertedScrollPercent = 1 - scrollPercent;
        
        document.documentElement.style.setProperty(
          '--scroll-y',
          `${scrollTop}px`,
        )
      })
    }

    onMounted(() => {
      scrollListen()
    })

    watch(
      () => themeStore.currentTheme,
      () => theme.value = themeStore.currentTheme,
    )

    watch(
      () => headerComponent.value,
      () => {
        headerEl.value = headerComponent.value.headerEl
      },
    )

    provide(MainElKey, mainEl)
    provide(HeaderElKey, headerEl)

    const toggleNav = () =>
      isNavActivated.value === false
        ? (isNavActivated.value = true)
        : (isNavActivated.value = false)

    return {
      theme,
      toggleNav,
      mainEl,
      headerComponent,
      isNavActivated,
    }
  },
})

definePageMeta({
  layout: 'default',
})
</script>

<style lang="scss">
@import './assets/scss/components/_theme';
@import './assets/scss/components/_main';
@import './assets/scss/components/_burger';

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
