<template>
  <div
    v-if="skills && skills.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(skills.content))"
  ></div>
  <div v-if="skills && skills.sets" class="main__content">
    <div v-for="set in skills.sets" :key="set.name" class="skill">
      <div class="skill__title">{{ set.name }}</div>
      <div class="skill__bar" :style="skillBarWidth(set.value)"></div>
      <div class="skill__percent">{{ set.value }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default {
  async setup() {
    const pagesStore = usePagesStore()
    const skills: Ref<unknown> = ref(await pagesStore.getSkills())

    const skillBarWidth = (v: number) => ({
      width: v + '%',
    })

    return {
      marked,
      skills,
      skillBarWidth,
      DOMPurify,
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_skills';
@keyframes skillBar {
  0% {
    width: 0;
  }
  100% {
    width: --max-width;
  }
}
.skill__bar {
  max-width: var(--max-width);
}
</style>
