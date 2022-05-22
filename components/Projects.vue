<template>
  <div
    class="main__content"
    v-if="projects && projects.content"
    v-html="marked.parse(projects.content)"
  ></div>
  <div v-if="projects.projects.length" class="projects">
    <div
      class="project"
      v-for="(project, index) in projects.projects"
      :key="index"
    >
      <div class="project__title" @click.self="toggleModal(index + 1, true)">
        {{ project.name }}
      </div>
      <img class="project__image" :src="project.logoUrl" :alt="project.name" />

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
import { Modal } from '@/components/Modal'
import { toggleModal, openModal } from '@/composables/handleModal'
import { marked } from 'marked'

export default {
  async setup() {
    const route = useRoute()
    const pagesStore = usePagesStore()
    const projects = await pagesStore.getPortfolio()

    return {
      marked,
      projects,
      toggleModal,
      openModal,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/_projects';
@import '@/assets/scss/components/_modal';
</style>
