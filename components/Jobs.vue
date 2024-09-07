<template>
  <div class="main__content">
    <div class="experience" :class="`experience--${theme}`">
      <div class="experience__arrow">
        <div class="experience__bar">
          <div class="experience__tip"></div>
        </div>
      </div>

      <table v-if="jobsSorted?.length" class="experience__table">
        <tbody>
          <tr
            v-for="job in jobsSorted"
            :key="job.name"
            :class="{ hilite: !job.lessVisible }"
          >
            <th scope="col">
              <span>{{ job.dateTo }}</span>
              <br />
              <span>{{ job.dateFrom }}</span>
            </th>
            <th scope="col">
              {{ job.name }}<br /><i>{{ job.position }}</i>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  theme: {
    type: String,
    required: true,
  },
  jobs: {
    type: Array as PropType<any>,
    required: true,
  },
});

const sortItems = (arr: Record<string, any>[]) =>
  arr.sort((a, b) => (b.order < a.order ? -1 : 1));

const jobsSorted = computed(() =>
  props.jobs?.length ? sortItems([...props.jobs]) : [],
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/experience";
</style>
