<template>
  <div
    class="main__content"
    v-if="portfolio && portfolio.content"
    v-html="marked.parse(portfolio.content)"
  ></div>
  <div v-if="portfolio.projects.length" class="gallery">
    <div
      class="gallery__item"
      v-for="(project, index) in portfolio.projects"
      :key="index"
    >
      <div class="gallery__title" @click.self="toggleModal(index + 1, true)">
        {{ project.name }}
      </div>
      <img class="gallery__image" :src="project.logoUrl" :alt="project.name" />

      <Modal
        v-show="openModal(index + 1)"
        @close="toggleModal(index + 1, true)"
        :modalType="'full'"
      >
        <template v-slot:content>
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
          <a
            slot="action"
            class="modal__action"
            :href="project.url"
            target="_blank"
            >Go to site</a
          >
        </template>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import { usePagesStore } from '@/store/pages'
import { marked } from 'marked'

export default {
  async setup() {
    const pagesStore = usePagesStore()
    const portfolio = await pagesStore.getPortfolio()

    return {
      marked,
      portfolio,
      toggleModal,
      openModal,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/_gallery';
@import '@/assets/scss/components/_modal';
</style>
