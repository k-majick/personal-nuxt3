<template>
<header class="header" :class="`header--${layout}`" ref="headerEl">
  <section class="header__container">
    <a class="main__anchor"></a>
    <a class="header__logo">
      <h1 class="header__title" v-html="$t('messages.name')"></h1>
    </a>
    <Avatar />
    <div class="header__arrow" @click="scrollTo($event, mainEl)"></div>
    <a class="chevron__container" @click="scrollTo($event, mainEl)">
      <div class="chevron"></div>
    </a>
  </section>
</header>
</template>

<script lang="ts">
import scrollTo from "@/composables/scrollTo";

export default {
  emits: ['getHeaderEl'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();

    const mainEl = inject('mainEl');
    const layout = ref(route.meta.layout);
    const headerEl = ref(null);

    emit('getHeaderEl', headerEl);

    watch(
      () => route.meta.layout,
      () => layout.value = route.meta.layout,
    );

    return {
      layout,
      scrollTo,
      headerEl,
      mainEl,
    };
  },
}
</script>

<style lang="scss">
@import "./assets/scss/components/_header";
@import "./assets/scss/components/_chevron";
</style>
