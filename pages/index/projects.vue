<template>
  <section class="main__card main__card--projects">
    <Projects />
  </section>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages'
import Projects from '@/components/Projects'

export default {
  components: {
    Projects,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const pageData = await pagesStore.getPage(2)

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.attributes.title}`,
    })
  },
}
</script>
