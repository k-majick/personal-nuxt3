<template>
<Header />
<main class="main">
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

    return {
      toggleLayout,
    };
  },
}

definePageMeta({
  layout: "dark",
});
</script>

<style lang="scss">
@import "./assets/scss/_layout";
@import "./assets/scss/_main";
</style>
