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
      <div
        class="gallery__title"
        @click.self="
          setActiveProject(project, index);
          toggleModal(activeProject.id, true);
        "
      >
        {{ project.name }}
      </div>
      <img class="gallery__image" :src="project.logoUrl" :alt="project.name" />
    </div>
  </div>

  <Modal
    v-if="activeProject"
    v-show="openModal(activeProject.id)"
    :modal-type="'full'"
    @close="
      toggleModal(activeProject.id, true);
      activeProject = null;
    "
  >
    <template #content>
      <div class="modal__content">
        <div class="modal__details">
          <img
            class="modal__logo"
            :src="activeProject.logoUrl"
            :alt="activeProject.name"
          />
          <div class="modal__details--text">
            <h3 class="modal__title">{{ activeProject.name }}</h3>
            <div class="main__label">{{ activeProject.date }}</div>
            <div class="modal__txt">
              <p>{{ activeProject.description }}</p>
            </div>
          </div>
        </div>
        <img
          class="modal__image"
          :src="activeProject.imageUrl"
          :alt="activeProject.name"
        />
      </div>
    </template>
    <template #action>
      <a class="main__btn" :href="activeProject.url" target="_blank">{{
        $t("content.gotoSite")
      }}</a>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { usePagesStore } from "@/store/pages";
import { useUiStore } from "@/store/ui";
import { marked } from "marked";
import DOMPurify from "dompurify";

const pagesStore = usePagesStore();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);
const portfolio: Ref<any> = ref(
  await pagesStore.getPortfolio(uiStore.currentLocale as string),
);

const activeProject = ref();
const setActiveProject = (project: any, index: number) => {
  activeProject.value = project;
  activeProject.value.id = index + 1;
};

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
</script>

<style lang="scss">
@import "@/assets/scss/components/_gallery";
@import "@/assets/scss/components/_modal";
</style>
