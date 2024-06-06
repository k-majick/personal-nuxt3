<template>
  <div v-if="techs?.length" class="technology">
    <span v-for="tech in techs" :key="tech.name" class="technology__item">{{
      tech.name
    }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  techs: {
    type: Array as PropType<any>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/technology";
</style>
