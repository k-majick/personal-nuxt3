<template>
  <section class="main__card">
    <Skills />
    <Technologies />
  </section>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useSettingsStore } from '@/store/settings'
import Skills from '@/components/Skills.vue'
import Technologies from '@/components/Technologies.vue'

export default defineComponent({
  components: {
    Skills,
    Technologies,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const settingsStore = useSettingsStore()
    const pageData: Ref<any> = ref(await pagesStore.getPage(settingsStore.currentLocale as string, 1))

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    })
  },
})
</script>
