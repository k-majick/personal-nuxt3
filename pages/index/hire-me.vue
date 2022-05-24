<template>
  <section class="main__card">
    <ContactForm />
  </section>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages'
import ContactForm from '@/components/ContactForm'

export default {
  components: {
    ContactForm,
  },
  async setup() {
    const config = useRuntimeConfig()
    const pagesStore = usePagesStore()
    const pageData = await pagesStore.getPage(4)

    useHead({
      titleTemplate: `${config.public.appName} | ${pageData.attributes.title}`,
    })
  },
}
</script>
