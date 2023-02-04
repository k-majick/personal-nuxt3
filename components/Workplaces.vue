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
import type { Ref } from 'vue';
import { usePagesStore } from '@/store/pages';
import { useSettingsStore } from '@/store/settings';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default defineComponent({
  async setup() {
    const pagesStore = usePagesStore();
    const settingsStore = useSettingsStore();
    const theme = ref(settingsStore.currentTheme);
    const experience: Ref<any> = ref(
      await pagesStore.getExperience(settingsStore.currentLocale as string),
    );

    const sortItems = (pagesArr: Record<string, any>[]) =>
      pagesArr.sort((a, b) => (b.order < a.order ? -1 : 1));

    const workplaces = ref(
      experience.value ? sortItems([...experience.value.workplaces]) : [],
    );

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    );

    watch(
      () => settingsStore.currentLocale,
      async () => {
        experience.value = await pagesStore.getExperience(
          settingsStore.currentLocale as string,
        );
        workplaces.value = experience.value
          ? sortItems([...experience.value.workplaces])
          : [];
      },
    );

    return {
      marked,
      experience,
      workplaces,
      DOMPurify,
      theme,
    };
  },
});
</script>

<style scoped lang="scss">
@import './assets/scss/components/_experience';
</style>
