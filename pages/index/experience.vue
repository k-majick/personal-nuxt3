<template>
  <section class="main__card">
    <Workplaces />
    <Counter />
  </section>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages'
import Workplaces from '@/components/Workplaces'
import Counter from '@/components/Counter'

export default {
  components: {
    Workplaces,
    Counter,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const pageData = await pagesStore.getPage(3)

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.attributes.title}`,
    })
  },
}
</script>
