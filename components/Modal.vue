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

<script lang="ts" setup>
defineProps({
  modalType: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);
</script>
