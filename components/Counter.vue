<template>
  <div class="main__content">
    <div class="counter" :class="`counter--${theme}`">
      <span class="counter__value">{{ counter('y') }}</span
      >&nbsp;
      <span>{{
        counter('y') > 1 ? $t('content.years') : $t('content.year')
      }}</span
      >&nbsp;
      <span v-if="counter('c')"
        >{{ $t('content.and') }}&nbsp;
        <span class="counter__value">{{ counter('m') }}</span
        >&nbsp;month
      </span>
      <span v-if="counter('d')"
        >and&nbsp; <span class="counter__value">{{ counter('m') }}</span
        >&nbsp;months
      </span>
    </div>
    <p>of experience as web developer</p>
  </div>
</template>

<script lang="ts">
import { useThemeStore } from '@/store/theme'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)

    const counter = (what: string) => {
      const now = new Date().valueOf()
      const countFrom = new Date('sep,01,2015,00:00:00').valueOf()
      const diff = now - countFrom
      const day = 1000 * 60 * 60 * 24
      const days = Math.floor(diff / day)
      const months = Math.floor(days / 31)
      const years = Math.floor(months / 12)
      const diffMonths = Math.floor(months % 12) + 1

      switch (true) {
        case what == 'y':
          return years
        case diffMonths === 0:
          return false
        case diffMonths === 1 && what == 'c':
          return true
        case diffMonths > 1 && what == 'd':
          return true
        case what == 'm':
          return diffMonths
        default:
          return 0
      }
    }

    return {
      counter,
      theme,
    }
  },
})
</script>

<style scoped lang="scss">
@import './assets/scss/components/_counter';
</style>
