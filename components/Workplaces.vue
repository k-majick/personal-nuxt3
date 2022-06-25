<template>
  <div
    v-if="experience && experience.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(experience.content))"
  ></div>
  <div class="main__content">
    <table class="experience__table" :class="`experience__table--${theme}`">
      <tbody>
        <div class="experience__arrow">
          <div class="experience__bar">
            <div class="experience__tip"></div>
          </div>
        </div>
      </tbody>
      <tbody v-if="workplaces.length">
        <tr
          v-for="workplace in workplaces"
          :key="workplace.name"
          :class="{ hilite: !workplace.lessVisible }"
        >
          <th scope="col">
            <span>{{ workplace.dateTo }}</span>
            <br />
            <span>{{ workplace.dateFrom }}</span>
          </th>
          <th scope="col">
            {{ workplace.name }}<br /><i>{{ workplace.position }}</i>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { useThemeStore } from '@/store/theme'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore()
    const themeStore = useThemeStore()
    const theme = ref(themeStore.currentTheme)
    const experience: Ref<any> = ref(await pagesStore.getExperience())

    const sortItems = (pagesArr: Record<string, any>[]) =>
      pagesArr.sort((a, b) => (b.order < a.order ? -1 : 1))

    const workplaces = ref(
      experience.value ? sortItems([...experience.value.workplaces]) : [],
    )

    watch(
      () => themeStore.currentTheme,
      () => (theme.value = themeStore.currentTheme),
    )

    return {
      marked,
      experience,
      workplaces,
      DOMPurify,
      theme,
    }
  },
})
</script>

<style scoped lang="scss">
@import './assets/scss/components/_experience';
</style>
