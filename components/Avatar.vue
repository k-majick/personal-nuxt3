<template>
  <div :class="`avatar avatar--${theme}`">
    <h2 class="avatar__title">{{ $t("messages.name") }}</h2>
    <h3
      class="avatar__message"
      v-html="DOMPurify.sanitize($t('messages.hello'))"
    ></h3>
    <div v-hoverMessage="$t('messages.hello')" class="avatar__container">
      <span class="tooltip"></span>
      <div class="avatar__flipper">
        <div class="avatar__front"></div>
        <div class="avatar__back"></div>
      </div>
    </div>
    <div class="avatar__shadow"></div>
  </div>
</template>

<script lang="ts" setup>
import { hoverMessage as vHoverMessage } from "@/composables/hoverMessage";
import DOMPurify from "dompurify";

defineProps({
  theme: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_avatar";
@import "./assets/scss/components/_tooltip";
</style>
