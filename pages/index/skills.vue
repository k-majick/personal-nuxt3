<template>
<section class="main__card">
  <div class="main__content" v-if="page.attributes" v-html="marked.parse(page.attributes.content)"></div>
</section>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages';
import { marked } from 'marked';

export default {
  layout: 'dark',
  setup() {
    const route = useRoute();
    const pagesStore = usePagesStore();
    const page = ref(pagesStore.currentPage);

    watch(
      () => pagesStore.currentPage,
      () => {
        page.value = pagesStore.currentPage;
        console.dir(page.value);
      },
    );

    pagesStore.getPage(1);

    return {
      page,
      marked,
    }
  }
}
</script>
