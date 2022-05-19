<template>
<div class="main__content" v-if="technologies && technologies.content" v-html="marked.parse(technologies.content)"></div>
<div class="technology__container" v-if="technologies && technologies.technologies">
  <span class="technology__item" v-for="technology in technologies.technologies" :key="technology.name">{{ technology.name }}</span>
</div>
</template>

<script lang="ts">
import {
  usePagesStore,
} from '@/store/pages';
import {
  marked,
} from 'marked';

export default {
  async setup() {
    const route = useRoute();
    const pagesStore = usePagesStore();
    const technologies = await pagesStore.getTechnologies();

    return {
      marked,
      technologies,
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/_technology";
</style>
