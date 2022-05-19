<template>
<div class="main__content" v-if="experience && experience.content" v-html="marked.parse(experience.content)"></div>
<div class="main__content">
  <table class="experience__table">
    <tbody>
      <span class="experience__bar">
        <span class="experience__tip"></span>
      </span>
    </tbody>
    <tbody>
      <tr v-if="workplaces.length" v-for="workplace in workplaces" :key="workplace.name" v-bind:class="{ hilite: !workplace.lessVisible }">
        <th scope="col">
          <span>{{ workplace.dateTo}}</span>
          <br>
          <span>{{ workplace.dateFrom}}</span>
        </th>
        <th scope="col">{{ workplace.name }}<br><i>{{ workplace.position }}</i></th>
      </tr>
    </tbody>
  </table>
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
    const experience = ref(await pagesStore.getExperience());
    const sortItems = (pagesArr) => pagesArr.sort((a,b) => b.order < a.order ? -1 : 1);
    const workplaces = ref(experience.value ? sortItems([...experience.value.workplaces]) : []);

    return {
      marked,
      experience,
      workplaces,
    }
  }
}
</script>

<style scoped lang="scss">
@import "./assets/scss/components/_experience";
</style>
