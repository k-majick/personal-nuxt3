<template>
  <div class="dialog__mask" :class="`dialog__mask--${dialogType}`">
    <div class="dialog__table">
      <div class="dialog__cell">
        <div
          class="dialog" 
          :class="`dialog--${uiStore.currentTheme}`"
        >
          <button class="dialog__close" type="button" @click="$emit('close')">
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
import { useUiStore } from "@/store/ui";

const uiStore = useUiStore();

defineProps({
  dialogType: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
    required: true,
  },
});

defineEmits(["close"]);
</script>