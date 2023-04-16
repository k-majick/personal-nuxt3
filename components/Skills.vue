<template>
  <div
    v-if="skills && skills.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(skills.content))"
  ></div>
  <div v-if="skills && skills.sets" class="main__content skill__container">
    <div
      v-for="set in skills.sets"
      :key="set.name"
      :class="`skill skill--${theme}`"
    >
      <div class="skill__bar" :style="skillBarWidth(set.value)"></div>
      <div class="skill__title">{{ set.name }}</div>
      <div class="skill__percent">{{ set.value }}%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

const pagesStore = usePagesStore();
const uiStore = useUiStore();
const skills: Ref<any> = ref(
  await pagesStore.getSkills(uiStore.currentLocale as string),
);

const skillBarWidth = (v: number) => ({
  width: v + "%",
});

defineProps({
  theme: {
    type: String,
    required: true,
  },
});

watch(
  () => uiStore.currentLocale,
  async () =>
    (skills.value = await pagesStore.getSkills(
      uiStore.currentLocale as string,
    )),
);
</script>

<style lang="scss" scoped>
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
