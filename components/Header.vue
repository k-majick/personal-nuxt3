<template>
<header class="header" :class="`header--${layout}`">
  <section class="header__container">
    <a class="main__anchor"></a>
    <a class="header__logo">
      <h1 class="header__title" v-html="$t('messages.name')"></h1>
    </a>
    <Avatar />
    <div class="header__arrow" @click="scrollTo($event, scrollTarget); setRoute()"></div>
    <a class="chevron__container" @click="scrollTo($event, scrollTarget); setRoute()">
      <div class="chevron"></div>
    </a>
  </section>
</header>
</template>

<script lang="ts">
import Avatar from "@/components/Avatar";
import scrollTo from "@/composables/scrollTo";

export default {
  components: {
    Avatar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const layout = ref(route.meta.layout);
    const scrollTarget = inject('mainEl');

    const setRoute = () => {
      if (route.path === '/') {
        router.push({
          path: "/skills",
        });
      }
    }

    watch(
      () => route.meta.layout,
      () => layout.value = route.meta.layout,
    );

    return {
      layout,
      setRoute,
      scrollTo,
      scrollTarget,
    };
  },
}
</script>

<style lang="scss">
@import "./assets/scss/components/_header";
@import "./assets/scss/components/_chevron";
</style>
