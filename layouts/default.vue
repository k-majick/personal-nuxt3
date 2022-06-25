<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <p class="theme__loader">loading...</p>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { useThemeStore } from '@/store/theme'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)

    watch(
      () => themeStore.currentTheme,
      () => (theme.value = themeStore.currentTheme),
    )

    return {
      theme,
    }
  },
})
</script>
