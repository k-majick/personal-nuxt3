<template>
  <div
    v-if="experience && experience.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(experience.content) as string)"
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

<script lang="ts" setup>
import type { Ref } from "vue";
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

const dataStore = useDataStore();
const uiStore = useUiStore();
const experience: Ref<any> = ref(
  await dataStore.getExperience(uiStore.currentLocale as string),
);

defineProps({
  theme: {
    type: String,
    required: true,
  },
});

const sortItems = (pagesArr: Record<string, any>[]) =>
  pagesArr.sort((a, b) => (b.order < a.order ? -1 : 1));

const workplaces = ref(
  experience.value ? sortItems([...experience.value.workplaces]) : [],
);

watch(
  () => uiStore.currentLocale,
  async () => {
    experience.value = await dataStore.getExperience(
      uiStore.currentLocale as string,
    );
    workplaces.value = experience.value
      ? sortItems([...experience.value.workplaces])
      : [];
  },
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_experience";
</style>
