<template>
<Header />
<main class="main" ref="mainEl">
  <button @click="toggleLayout">Toggle layout</button>
  <div class="main__jungle"></div>
</main>
</template>

<script lang="ts">
export default {
  layout: 'dark',
  setup() {
    const route = useRoute();
    const toggleLayout = () => !route.meta.layout || route.meta.layout === "dark" ? route.meta.layout = "lite" : route.meta.layout = "dark";
    const mainEl = ref(null);

    provide('mainEl', mainEl);

    return {
      toggleLayout,
      mainEl,
    };
  },
}

definePageMeta({
  layout: "dark",
});
</script>

<style lang="scss">
@import "./assets/scss/components/_layout";
@import "./assets/scss/components/_main";
</style>
