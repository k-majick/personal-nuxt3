<template>
  <Header @getHeaderEl="provideHeaderRef" />
  <main class="main" ref="mainEl">
    <div class="main__background"></div>
    <div class="burger" :class="{ active: isNavActivated }" @click="toggleNav">
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </div>
    <Nav :isActivated="isNavActivated" />
    <div class="main__container">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
export default {
  layout: 'dark',
  setup() {
    const route = useRoute()
    const toggleLayout = () =>
      !route.meta.layout || route.meta.layout === 'dark'
        ? (route.meta.layout = 'lite')
        : (route.meta.layout = 'dark')
    const mainEl = ref(null)
    const headerRef = ref(null)
    const provideHeaderRef = (e: Event) => {
      headerRef.value = e
    }
    const isNavActivated = ref(false)

    const scrollListen = () => {
      window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty(
          '--scroll-y',
          `${window.scrollY}px`,
        )
      })
    }

    onMounted(() => {
      scrollListen()
    })

    provide('mainEl', mainEl)
    provide('headerRef', headerRef)

    const toggleNav = () =>
      isNavActivated.value === false
        ? (isNavActivated.value = true)
        : (isNavActivated.value = false)

    return {
      toggleLayout,
      mainEl,
      provideHeaderRef,
      toggleNav,
      isNavActivated,
    }
  },
}

definePageMeta({
  layout: 'lite',
})
</script>

<style lang="scss">
@import './assets/scss/components/_layout';
@import './assets/scss/components/_main';
@import './assets/scss/components/_burger';
</style>
