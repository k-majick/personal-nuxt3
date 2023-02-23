<template>
  <div
    v-if="portfolio && portfolio.content"
    class="main__content"
    v-html="DOMPurify.sanitize(marked.parse(portfolio.content))"
  ></div>
  <div v-if="portfolio.projects.length" :class="`gallery gallery--${theme}`">
    <div
      v-for="(project, index) in portfolio.projects"
      :key="index"
      class="gallery__item"
    >
      <div class="gallery__title" @click.self="toggleModal(index + 1, true)">
        {{ project.name }}
      </div>
      <img class="gallery__image" :src="project.logoUrl" :alt="project.name" />

      <Modal
        v-show="openModal(index + 1)"
        :modal-type="'full'"
        @close="toggleModal(index + 1, true)"
      >
        <template #content>
          <div class="modal__content">
            <div class="modal__details">
              <img
                class="modal__logo"
                :src="project.logoUrl"
                :alt="project.name"
              />
              <div class="modal__details--text">
                <h3 class="modal__title">{{ project.name }}</h3>
                <div class="modal__date">{{ project.date }}</div>
                <div class="modal__txt">
                  <p>{{ project.description }}</p>
                </div>
              </div>
            </div>
            <img
              class="modal__image"
              :src="project.imageUrl"
              :alt="project.name"
            />
          </div>
        </template>
        <template #action>
          <a class="modal__action" :href="project.url" target="_blank">{{
            $t("content.gotoSite")
          }}</a>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
  async setup() {
    const pagesStore = usePagesStore();
    const uiStore = useUiStore();
    const theme = ref(uiStore.currentTheme);
    const portfolio: Ref<any> = ref(
      await pagesStore.getPortfolio(uiStore.currentLocale as string),
    );

    watch(
      () => uiStore.currentTheme,
      () => (theme.value = uiStore.currentTheme),
    );

    watch(
      () => uiStore.currentLocale,
      async () =>
        (portfolio.value = await pagesStore.getPortfolio(
          uiStore.currentLocale as string,
        )),
    );

    return {
      marked,
      portfolio,
      toggleModal,
      openModal,
      DOMPurify,
      theme,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/_gallery";
@import "@/assets/scss/components/_modal";
</style>
