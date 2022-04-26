<template>
<div class="avatar">
  <h2 class="avatar__title">{{ $t('messages.name') }}</h2>
  <h2 class="avatar__message" v-html="$t('messages.hello')"></h2>
  <div class="avatar__container" v-hoverMessage="$t('messages.hello')">
    <span class="tooltip"></span>
    <div class="avatar__flipper">
      <div class="avatar__front"></div>
      <div class="avatar__back"></div>
    </div>
  </div>
  <div class="avatar__shadow"></div>
</div>
</template>

<script lang="ts">
import { hoverMessage } from '@/composables/hoverMessage.ts';

export default {
  directives: {
    hoverMessage,
  },
}
</script>

<style lang="scss">
@import "./assets/scss/components/_avatar";
@import "./assets/scss/components/_tooltip";
</style>
