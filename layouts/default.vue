<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <p class="theme__loader">loading...</p>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { useSettingsStore } from '@/store/settings'

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore()
    const theme = ref(settingsStore.currentTheme)

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    )

    return {
      theme,
    }
  },
})
</script>
