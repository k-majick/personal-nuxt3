<template>
  <section class="main__card">
    <ContactForm />
  </section>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { usePagesStore } from '@/store/pages'
import ContactForm from '@/components/ContactForm.vue'

export default defineComponent({
  components: {
    ContactForm,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const settingsStore = useSettingsStore()
    const pageData: Ref<any> = ref(
      await pagesStore.getPage(settingsStore.currentLocale as string, 4),
    )

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
    })
  },
})
</script>
