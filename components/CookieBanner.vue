<template>
  <div v-if="!uiStore.consent" :class="`cookie cookie--${theme}`">
    <div class="cookie__container">
      <div class="cookie__info">
        {{ $t("messages.cookieBanner") }}
      </div>
      <div class="cookie__actions">
        <button
          class="main__button main__button--secondary main__button--small"
          @click="choose('essential')"
        >
          {{ $t("ui.rejectNonEssential") }}
        </button>
        <button class="main__button main__button--small" @click="choose('all')">
          {{ $t("ui.acceptAll") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

defineProps({
  theme: {
    type: String,
    required: true,
  },
});

const uiStore = useUiStore();

const choose = (choice: string) => {
  uiStore.doConsentAction("Save", choice).then(res => {
    uiStore.consent = res?.status === 200 ? choice : "essential";
  });
};
</script>

<style lang="scss">
@import "./assets/scss/components/cookie";
</style>
