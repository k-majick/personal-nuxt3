<template>
  <router-view v-slot="{ Component, route }">
    <div
      class="main__container"
      :class="`main__container--${route.path.includes('creations') ?
        'full' : 'card' } ${uiStore.navActive ? 'main__container--active' : ''}
        ${activeDialog ? 'main__container--hasactiveDialog' : ''}
      `"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="(route.name as string)" />
      </transition>
    </div>
  </router-view>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const uiStore = useUiStore();
</script>

<style lang="scss">
@import "@/assets/scss/_animations.scss";
@import "@/assets/scss/components/theme";
@import "@/assets/scss/components/main";
@import "@/assets/scss/components/burger";
@import "@/assets/scss/components/tooltip";
@import "@/assets/scss/components/dialog";

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
</style>
