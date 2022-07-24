<template>
  <section class="main__card main__card--gallery">
    <Projects />
  </section>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useSettingsStore } from '@/store/settings'
import Projects from '@/components/Projects.vue'

export default defineComponent({
  components: {
    Projects,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const settingsStore = useSettingsStore()
    const pageData: Ref<any> = ref(await pagesStore.getPage(settingsStore.currentLocale as string, 3))

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    })
  },
})
</script>
