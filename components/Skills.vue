<template>
<div class="main__content" v-if="skills && skills.content" v-html="marked.parse(skills.content)"></div>
<div class="main__content">
  <div class="skill" v-if="skills && skills.skills" v-for="skill in skills.skills" :key="skill.name">
    <div class="skill__title">{{ skill.name }}</div>
    <div class="skill__bar" :style="skillBarWidth(skill.value)"></div>
    <div class="skill__percent">{{ skill.value }}%</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  usePagesStore,
} from '@/store/pages';
import {
  marked,
} from 'marked';

export default {
  async setup() {
    const route = useRoute();
    const pagesStore = usePagesStore();
    const skills = await pagesStore.getSkills();

    const skillBarWidth = (v: number) => ({
      'width': v + '%',
    });

    return {
      marked,
      skills,
      skillBarWidth,
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/_skills";
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
