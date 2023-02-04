<template>
  <div :class="`theme theme--${theme}`">
    <div class="theme__background">
      <div class="loader__container">
        <div :class="`loader loader--${theme}`">
          <div class="loader__ray loader__ray--1"></div>
          <div class="loader__ray loader__ray--2"></div>
          <div class="loader__ray loader__ray--3"></div>
          <div class="loader__ray loader__ray--4"></div>
          <div class="loader__ray loader__ray--5"></div>
          <div class="loader__ray loader__ray--6"></div>
          <div class="loader__ray loader__ray--7"></div>
          <div class="loader__ray loader__ray--8"></div>
          <div class="loader__ray loader__ray--9"></div>
          <div class="loader__ray loader__ray--10"></div>
        </div>
        <span class="loader__text">{{
          pagesStore.loadError
            ? $t('messages.loadError')
            : $t('messages.loading')
        }}</span>
      </div>
      <div
        v-hoverMessage="
          pagesStore.loadError
            ? $t('messages.loadError')
            : $t('messages.loading')
        "
        class="theme__loader"
      >
        <span class="tooltip" :class="`tooltip--${theme}`"></span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages';
import { useSettingsStore } from '@/store/settings';
import { hoverMessage } from '@/composables/hoverMessage';

export default defineComponent({
  directives: {
    hoverMessage,
  },
  setup() {
    const pagesStore = usePagesStore();
    const settingsStore = useSettingsStore();
    const theme = ref(settingsStore.currentTheme);

    watch(
      () => settingsStore.currentTheme,
      () => (theme.value = settingsStore.currentTheme),
    );

    return {
      theme,
      pagesStore,
    };
  },
});
</script>
