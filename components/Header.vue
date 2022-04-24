<template>
<header class="header" :class="`header--${layout}`">
  <section class="header__container">
    <a class="main__anchor"></a>
    <a class="header__logo">
      <h1 class="header__title" v-html="$t('messages.name')"></h1>
    </a>
    <Avatar />


  </section>
</header>
</template>

<script lang="ts">
import Avatar from "@/components/Avatar";

export default {
  components: {
    Avatar,
  },
  setup() {
    const route = useRoute();
    const layout = ref(route.meta.layout);

    watch(
      () => route.meta.layout,
      () => layout.value = route.meta.layout,
    );

    return {
      layout,
    };
  },
}
</script>

<style lang="scss">
@import "./assets/scss/_header";
</style>
