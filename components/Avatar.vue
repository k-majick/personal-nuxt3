<template>
  <div :class="`avatar avatar--${theme}`">
    <h2 class="avatar__title">{{ $t("messages.name") }}</h2>
    <h3
      class="avatar__message"
      v-html="DOMPurify.sanitize($t('messages.hello'))"
    ></h3>
    <div v-tooltip="$t('messages.hello')" class="avatar__container">
      <div class="avatar__flipper">
        <div class="avatar__front"></div>
        <div class="avatar__back"></div>
      </div>
    </div>
    <div class="avatar__shadow"></div>
  </div>
</template>

<script lang="ts" setup>
import { vTooltip } from "@/composables/tooltip";
import DOMPurify from "dompurify";

defineProps({
  theme: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/avatar";
@import "@/assets/scss/components/tooltip";
</style>
