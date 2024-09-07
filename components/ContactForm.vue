<template>
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
        <label class="form__label">{{ $t("ui.name") }}</label>
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
        <label class="form__label">{{ $t("ui.email") }}</label>
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
        <label class="form__label">{{ $t("ui.message") }}</label>
      </div>
      <div class="form__group form__group--submit">
        <button
          ref="submitBtn"
          class="main__button"
          type="submit"
          @click="sendForm"
        >
          {{ $t("ui.sendIt") }}
        </button>
      </div>
      <div v-if="sendError.length" class="form__group form__group--errors">
        <span class="form__alert">{{ sendError }}</span>
      </div>
    </form>

    <Transition name="fade">
      <Dialog
        v-if="uiStore.isDialogOpen(uid)"
        :id="1"
        :dialog-type="'message'"
        @close="uiStore.toggleDialog(uid, false), resetForm()"
      >
        <template #header>
          <h3 class="dialog__title">
            {{ $t("messages.sentTitle") }}
          </h3>
        </template>
        <template #content>
          <div class="dialog__text">
            <p>{{ $t("messages.sentMessage") }}</p>
          </div>
        </template>
        <template #action>
          <div class="dialog__actions">
            <button
              class="main__button"
              @click="uiStore.toggleDialog(uid, false), resetForm()"
            >
              Ok
            </button>
          </div>
        </template>
      </Dialog>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import useVuelidate from "@vuelidate/core";
import {
  email,
  minLength,
  maxLength,
  required,
  helpers,
} from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const uiStore = useUiStore();

const uid = Number(Math.random().toString().substring(2, 30))
const alphaDiacritic = helpers.regex(/^[a-zA-ZÀ-ž\s]*$/);

const theme = computed(() => uiStore.theme);
const submitBtn: Ref<any> = ref<HTMLElement | undefined>();
const sendError = ref<string>("");

const state = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: {
    required: helpers.withMessage(t("validation.nameRequired"), required),
    minLength: helpers.withMessage(() => t("validation.nameMin"), minLength(3)),
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
    required: helpers.withMessage(t("validation.messageRequired"), required),
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
  submitBtn.value.innerHTML = t("ui.sending");

  const fd = {
    name: v$.value.name.$model,
    email: v$.value.email.$model,
    message: v$.value.message.$model,
  };

  const res = await uiStore.sendEmail(fd);

  if (res) {
    uiStore.toggleDialog(1, false);
  }
};

const resetForm = () => {
  v$.value.$reset();
  submitBtn.value.innerHTML = t("ui.sendIt");
  state.value = {
    name: "",
    email: "",
    message: "",
  };
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/form";
</style>
