<template>
  <div v-if="!uiStore.consent" :class="`cookie cookie--${theme}`">
    <div class="cookie__container">
      <div
        v-if="isClient"
        class="cookie__info"
        v-html="DOMPurify.sanitize($t('messages.cookieBanner', { privacyUrl }))"
      >
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
import { useI18n } from "vue-i18n";
import DOMPurify from "dompurify";

defineProps({
  theme: {
    type: String,
    required: true,
  },
});

const config = useRuntimeConfig();
const uiStore = useUiStore();
const { locale } = useI18n({ useScope: "global" });

const choose = (choice: string) => {
  uiStore.doConsentAction("Save", choice).then(res => {
    uiStore.consent = res?.status === 200 ? choice : "essential";
  });
};

const privacyUrl = computed(() => `${config.public.appUrl}/${locale.value}/policies/privacy-policy`);
</script>

<style lang="scss">
@import "@/assets/scss/components/cookie";
</style>
