<template>
  <div
    v-if="showMe" 
    :class="`cookie cookie--${theme}`"
  >
    <div class="cookie__container">
      <div class="cookie__info">
        {{ $t('content.cookieBanner') }}
      </div>
      <div class="cookie__actions">
        <button 
          class="main__button main__button--small"
          @click="toggleModal(10, false)"
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
    <Modal
      v-show="openModal(10)"
      :modal-type="'message'"
      :theme="theme"
      @close="toggleModal(10, false)"
    >
      <template #header>
        <h3 class="modal__title">
          {{ $t("content.cookieSettings") }}
        </h3>
      </template>
      <template #content>
        <div class="modal__text">
          <p></p>
        </div>
      </template>
      <template #action>
        <div class="modal__actions">
        </div>
      </template>
    </Modal>
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
const showMe = ref(false);

const choose = (choice: string) => {
  uiStore.consent("Save", choice).then(res => {
    showMe.value = res?.status === 200 ? false : true;
  });
}

uiStore.consent("Check").then(res => {
  res?.text().then(consent => console.dir(consent));

  showMe.value = res?.status === 200 ? false : true;
});
</script>

<style lang="scss">
@import "./assets/scss/components/cookie";
</style>
