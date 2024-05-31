<template>
  <div 
    class="burger" 
    :class="{ active: navActive }" 
    @click="$emit('toggleNav')"
  >
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
    <span class="burger__bar"></span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  navActive: {
    required: true,
    type: Boolean,
  },
});

defineEmits(["toggleNav"]);
</script>