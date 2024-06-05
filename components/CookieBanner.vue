<template>
  <div
    v-if="!uiStore.consent" 
    :class="`cookie cookie--${theme}`"
  >
    <div class="cookie__container">
      <div class="cookie__info">
        {{ $t('content.cookieBanner') }}
      </div>
      <div class="cookie__actions">
        <button 
          class="main__button main__button--small"
          @click="toggleDialog(10, false)"
        >Customize</button>
        <button
          class="main__button main__button--small"
          @click="choose('essential')"
        >Reject non-essential</button>
        <button
          class="main__button main__button--small"
          @click="choose('all')"
        >Accept all</button>
      </div>
    </div>
  </div>

  <Transition name="fade">
    <Dialog
      v-show="isDialogOpen(10)"
      :id="1"
      :dialog-type="'message'"
      @close="toggleDialog(10, false)"
    >
      <template #header>
        <h3 class="dialog__title">
          {{ $t("content.cookieSettings") }}
        </h3>
      </template>
      <template #content>
        <div class="dialog__text">
          <p></p>
        </div>
      </template>
      <template #action>
        <div class="dialog__actions">
        </div>
      </template>
    </Dialog>
  </Transition>
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
}
</script>

<style lang="scss">
@import "./assets/scss/components/cookie";
</style>
