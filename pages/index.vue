<template>
<Header @getHeaderEl="provideHeaderRef" />
<main class="main" ref="mainEl">
  <div class="main__background"></div>
  <div class="burger">
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
  </div>
  <Nav />
  <div class="main__container">

    <Transition name="fade">
      <router-view />
    </Transition>

  </div>
</main>
</template>

<script lang="ts">
export default {
  layout: 'dark',
  setup() {
    const route = useRoute();
    const toggleLayout = () => !route.meta.layout || route.meta.layout === "dark" ? route.meta.layout = "lite" : route.meta.layout = "dark";
    const mainEl = ref(null);
    const headerRef = ref(null);
    const provideHeaderRef = (e: Event) => {
      headerRef.value = e;
    }

    provide('mainEl', mainEl);
    provide('headerRef', headerRef);

    return {
      toggleLayout,
      mainEl,
      provideHeaderRef,
    };
  },
}

definePageMeta({
  layout: "lite",
});
</script>

<style lang="scss">
@import "./assets/scss/components/_layout";
@import "./assets/scss/components/_main";
</style>
