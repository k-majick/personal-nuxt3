<template>
  <div v-if="skills?.length" class="main__content skill__container">
    <div v-for="skill in skills" :key="skill.name" :class="`skill skill--${theme}`">
      <div class="skill__bar" :style="skillBarWidth(skill.value)"></div>
      <div class="skill__content">
        <div class="skill__title">{{ skill.name }}</div>
        <div class="skill__techs">
          <div v-for="tech in skill.techs" :key="tech" class="skill__tech">
            {{ tech.name }}
          </div>
        </div>
      </div>
      <div class="skill__percent">{{ skill.value }}%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  theme: {
    type: String,
    required: true,
  },
  skills: {
    type: Array as PropType<any>,
    required: false,
    default: () => [],
  },
});

const skillBarWidth = (v: number) => ({
  width: v + "%",
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/skills";

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