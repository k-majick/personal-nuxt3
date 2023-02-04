<template>
  <div class="modal__mask" :class="`modal__mask--${modalType}`">
    <div class="modal__table">
      <div class="modal__cell">
        <div class="modal" :class="`modal--${theme}`">
          <button class="modal__close" type="button" @click="$emit('close')">
            &times;
          </button>
          <slot name="header"></slot>
          <slot name="content"></slot>
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSettingsStore } from '@/store/settings';

export default defineComponent({
  props: {
    modalType: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  setup() {
    const settingsStore = useSettingsStore();
    const theme = ref(settingsStore.currentTheme);

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    );

    return {
      theme,
    };
  },
});
</script>
