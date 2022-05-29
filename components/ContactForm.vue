<template>
  <div
    class="main__content"
    v-if="contact && contact.content"
    v-html="marked.parse(contact.content)"
  ></div>
  <div class="main__content">
    <form
      class="form"
      @submit.prevent="processForm"
      ref="form"
      @change="processForm"
      novalidate
    >
      <div
        class="form__group"
        :class="{ 'form__group--error': v$.name.$errors.length }"
      >
        <span
          class="form__alert"
          v-for="error of v$.name.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
        <input
          class="form__input"
          type="text"
          name="name"
          v-model="v$.name.$model"
          @blur="v$.name.$touch()"
        />
        <label class="form__label">Name</label>
      </div>
      <div
        class="form__group"
        :class="{
          'form__group--error': v$.email.$dirty && v$.email.$errors.length,
        }"
      >
        <span
          class="form__alert"
          v-for="error of v$.email.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
        <input
          class="form__input"
          type="email"
          name="email"
          v-model.trim="v$.email.$model"
          @blur="v$.email.$touch()"
        />
        <label class="form__label">E-mail</label>
      </div>
      <div
        class="form__group form__group--textarea"
        :class="{
          'form__group--error': v$.message.$dirty && v$.message.$errors.length,
        }"
      >
        <span
          class="form__alert"
          v-for="error of v$.message.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
        <textarea
          class="form__input"
          name="message"
          rows="5"
          v-model="v$.message.$model"
          @blur="v$.message.$touch()"
        ></textarea>
        <label class="form__label">Message</label>
      </div>
      <div class="form__group form__group--submit">
        <button
          class="form__btn"
          type="submit"
          ref="submitBtn"
          @click="sendForm"
        >
          <p>{{ $t('content.sendIt') }}</p>
        </button>
      </div>
    </form>

    <Transition name="fade">
      <Modal
        v-show="openModal(1)"
        @close="toggleModal(1, false), resetForm()"
        :modalType="'message'"
      >
        <template v-slot:header>
          <h3 class="modal__title">
            {{ $t('messages.sentTitle') }}
          </h3>
        </template>
        <template v-slot:content>
          <div slot="content" class="modal__content">
            <p>{{ $t('messages.sentMessage') }}</p>
          </div>
        </template>
      </Modal>
    </Transition>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'
import useVuelidate from '@vuelidate/core'
import {
  email,
  minLength,
  maxLength,
  required,
  helpers,
} from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  async setup() {
    const { t } = useI18n()
    const pagesStore = usePagesStore()
    const contact: Ref<any> = ref(await pagesStore.getContact())
    const submitBtn: Ref<any> = ref<HTMLElement>()
    const alphaDiacritic = helpers.regex(/^[a-zA-ZÀ-ž\s]*$/)

    const state = ref({
      name: '',
      email: '',
      message: '',
    })

    const rules = {
      name: {
        required: helpers.withMessage('Enter your name', required),
        minLength: helpers.withMessage(
          () => `Name should contain at least 3 letters`,
          minLength(3),
        ),
        maxLength: helpers.withMessage(
          () => `Name can't exceed 30 letters`,
          maxLength(30),
        ),
        alphaDiacritic: helpers.withMessage(
          () => `Name may contain letters only`,
          alphaDiacritic,
        ),
      },
      email: {
        required: helpers.withMessage('Enter your e-mail address', required),
        maxLength: helpers.withMessage(
          () => `E-mail can't exceed 50 letters`,
          maxLength(50),
        ),
        email: helpers.withMessage('Invalid e-mail address', email),
      },
      message: {
        required: helpers.withMessage('Enter your message', required),
        minLength: helpers.withMessage(
          () => `Message is too short`,
          minLength(1),
        ),
        maxLength: helpers.withMessage(
          () => `Message can't exceed 1000 characters`,
          maxLength(1000),
        ),
      },
    }

    const v$ = useVuelidate(rules, state)

    watch(
      () => v$.value.$invalid,
      () =>
        v$.value.$invalid === true
          ? (submitBtn.value.disabled = true)
          : (submitBtn.value.disabled = false),
    )

    const processForm = () => {
      v$.value.$touch()
      v$.value.$invalid === true
        ? (submitBtn.value.disabled = true)
        : (submitBtn.value.disabled = false)
    }

    const sendForm = async () => {
      if (v$.value.$invalid === true) {
        return
      }

      submitBtn.value.disabled = true
      submitBtn.value.innerHTML = `<p>${t('content.sending')}</p>`

      const fd = new FormData()

      fd.append('name', v$.value.name.$model)
      fd.append('email', v$.value.email.$model)
      fd.append('message', v$.value.message.$model)

      // for (let pair of fd.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }

      try {
        const res: Record<string, unknown> = await $fetch(
          '/.netlify/functions/send-email',
          {
            method: 'POST',
            body: fd,
          },
        )

        if (res?.status === 'ok') {
          toggleModal(1, false)
        }
      } catch (e) {
        console.error(e)
      }
    }

    const resetForm = () => {
      v$.value.$reset()
      submitBtn.value.innerHTML = `<p>${t('content.sendIt')}</p>`
      state.value = {
        name: '',
        email: '',
        message: '',
      }
    }

    return {
      marked,
      contact,
      state,
      v$,
      processForm,
      sendForm,
      submitBtn,
      toggleModal,
      openModal,
      resetForm,
    }
  },
})
</script>

<style lang="scss">
@import './assets/scss/components/_form';
</style>
