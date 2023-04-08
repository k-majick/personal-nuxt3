<template>
  <div
    v-if="contact && contact.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(contact.content))"
  ></div>
  <div class="main__content">
    <form
      ref="form"
      novalidate
      class="form"
      :class="`form--${theme}`"
      @submit.prevent="processForm"
      @change="processForm"
    >
      <div
        class="form__group"
        :class="{ 'form__group--error': v$.name.$errors.length }"
      >
        <span
          v-for="error of v$.name.$errors"
          :key="error.$uid"
          class="form__alert"
          >{{ error.$message }}</span
        >
        <input
          v-model="v$.name.$model"
          type="text"
          name="name"
          class="form__input"
          @blur="v$.name.$touch()"
        />
        <label class="form__label">{{ $t("content.name") }}</label>
      </div>
      <div
        class="form__group"
        :class="{
          'form__group--error': v$.email.$dirty && v$.email.$errors.length,
        }"
      >
        <span
          v-for="error of v$.email.$errors"
          :key="error.$uid"
          class="form__alert"
          >{{ error.$message }}</span
        >
        <input
          v-model.trim="v$.email.$model"
          type="email"
          name="email"
          class="form__input"
          @blur="v$.email.$touch()"
        />
        <label class="form__label">{{ $t("content.email") }}</label>
      </div>
      <div
        class="form__group form__group--textarea"
        :class="{
          'form__group--error': v$.message.$dirty && v$.message.$errors.length,
        }"
      >
        <span
          v-for="error of v$.message.$errors"
          :key="error.$uid"
          class="form__alert"
          >{{ error.$message }}</span
        >
        <textarea
          v-model="v$.message.$model"
          name="message"
          rows="5"
          class="form__input"
          @blur="v$.message.$touch()"
        ></textarea>
        <label class="form__label">{{ $t("content.message") }}</label>
      </div>
      <div class="form__group form__group--submit">
        <button
          ref="submitBtn"
          class="main__btn"
          type="submit"
          @click="sendForm"
        >
          {{ $t("content.sendIt") }}
        </button>
      </div>
      <div v-if="sendError.length" class="form__group form__group--errors">
        <span class="form__alert">{{ sendError }}</span>
      </div>
    </form>

    <Transition name="fade">
      <Modal
        v-show="openModal(1)"
        :modal-type="'message'"
        @close="toggleModal(1, false), resetForm()"
      >
        <template #header>
          <h3 class="modal__title">
            {{ $t("messages.sentTitle") }}
          </h3>
        </template>
        <template #content>
          <div class="modal__content">
            <p>{{ $t("messages.sentMessage") }}</p>
          </div>
        </template>
      </Modal>
    </Transition>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { useUiStore } from "@/store/ui";
import { usePagesStore } from "@/store/pages";
import { marked } from "marked";
import useVuelidate from "@vuelidate/core";
import {
  email,
  minLength,
  maxLength,
  required,
  helpers,
} from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import DOMPurify from "dompurify";

export default defineComponent({
  async setup() {
    const { t } = useI18n();
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const theme = ref(uiStore.currentTheme);
    const contact: Ref<any> = ref(
      await pagesStore.getContact(uiStore.currentLocale as string),
    );
    const submitBtn: Ref<any> = ref<HTMLElement | undefined>();
    const alphaDiacritic = helpers.regex(/^[a-zA-ZÀ-ž\s]*$/);
    const sendError = ref<string>("");

    const state = ref({
      name: "",
      email: "",
      message: "",
    });

    const rules = {
      name: {
        required: helpers.withMessage(t("validation.nameRequired"), required),
        minLength: helpers.withMessage(
          () => t("validation.nameMin"),
          minLength(3),
        ),
        maxLength: helpers.withMessage(
          () => t("validation.nameMax"),
          maxLength(30),
        ),
        alphaDiacritic: helpers.withMessage(
          () => t("validation.nameFormat"),
          alphaDiacritic,
        ),
      },
      email: {
        required: helpers.withMessage(t("validation.emailRequired"), required),
        maxLength: helpers.withMessage(
          () => t("validation.emailMax"),
          maxLength(50),
        ),
        email: helpers.withMessage(t("validation.emailInvalid"), email),
      },
      message: {
        required: helpers.withMessage(
          t("validation.messageRequired"),
          required,
        ),
        minLength: helpers.withMessage(
          () => t("validation.messageMin"),
          minLength(10),
        ),
        maxLength: helpers.withMessage(
          () => t("validation.messageMax"),
          maxLength(1000),
        ),
      },
    };

    const v$ = useVuelidate(rules, state);

    watch(
      () => v$.value.$invalid,
      () =>
        v$.value.$invalid === true
          ? (submitBtn.value.disabled = true)
          : (submitBtn.value.disabled = false),
    );

    const processForm = () => {
      v$.value.$touch();
      v$.value.$invalid === true
        ? (submitBtn.value.disabled = true)
        : (submitBtn.value.disabled = false);
    };

    const sendForm = async () => {
      if (v$.value.$invalid === true) {
        return;
      }

      submitBtn.value.disabled = true;
      submitBtn.value.innerHTML = t("content.sending");

      const fd = {
        name: v$.value.name.$model,
        email: v$.value.email.$model,
        message: v$.value.message.$model,
      };

      const res = await uiStore.sendEmail(fd);

      if (res) {
        toggleModal(1, false);
      }
    };

    const resetForm = () => {
      v$.value.$reset();
      submitBtn.value.innerHTML = t("content.sendIt");
      state.value = {
        name: "",
        email: "",
        message: "",
      };
    };

    watch(
      () => uiStore.currentTheme,
      () => (theme.value = uiStore.currentTheme),
    );

    watch(
      () => uiStore.currentLocale,
      async () =>
        (contact.value = await pagesStore.getContact(
          uiStore.currentLocale as string,
        )),
    );

    return {
      theme,
      marked,
      contact,
      state,
      v$,
      processForm,
      sendForm,
      sendError,
      submitBtn,
      toggleModal,
      openModal,
      resetForm,
      DOMPurify,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_form";
</style>
