<template>
  <div class="avatar" :class="`avatar--${theme}`">
    <h2 class="avatar__title">{{ $t('messages.name') }}</h2>
    <h3
      class="avatar__message"
      v-html="DOMPurify.sanitize($t('messages.hello'))"
    ></h3>
    <div v-hoverMessage="$t('messages.hello')" class="avatar__container">
      <span class="tooltip" :class="`tooltip--${theme}`"></span>
      <div class="avatar__flipper">
        <div class="avatar__front"></div>
        <div class="avatar__back"></div>
      </div>
    </div>
    <div class="avatar__shadow"></div>
  </div>
</template>

<script lang="ts">
import { useSettingsStore } from '@/store/settings';
import { hoverMessage } from '@/composables/hoverMessage';
import DOMPurify from 'dompurify';

export default defineComponent({
  directives: {
    hoverMessage,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const theme = ref(settingsStore.currentTheme);

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    );

    return {
      DOMPurify,
      theme,
    };
  },
});
</script>

<style lang="scss">
@import './assets/scss/components/_avatar';
@import './assets/scss/components/_tooltip';
</style>
