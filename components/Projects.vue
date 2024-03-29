<template>
  <swiper v-bind="swiperProps" :class="`gallery--slider gallery--${theme}`">
    <swiper-slide
      v-for="(project, index) in projects"
      :key="index"
      class="swiper__slide"
    >
      <div class="gallery__item">
        <div
          class="gallery__title"
          @click.self="
            setActiveProject(project, index);
            toggleModal(activeProject.id, true);
          "
        >
          {{ project.name }}
        </div>
        <img
          class="gallery__image"
          :src="project.logoUrl"
          :alt="project.name"
        />
      </div>
    </swiper-slide>
  </swiper>

  <Modal
    v-if="activeProject"
    v-show="openModal(activeProject.id)"
    :modal-type="'full'"
    :theme="(theme as string)"
    @close="
      toggleModal(activeProject.id, true);
      activeProject = null;
    "
  >
    <template #content>
      <div class="modal__content">
        <div class="project__details">
          <img
            class="project__logo"
            :src="activeProject.logoUrl"
            :alt="activeProject.name"
          />
          <div class="project__details--text">
            <h3 class="project__title">{{ activeProject.name }}</h3>
            <div class="main__label">{{ activeProject.date }}</div>
            <div class="project__description">
              <p>{{ activeProject.description }}</p>
            </div>
          </div>
        </div>
        <img
          class="project__image"
          :src="activeProject.imageUrl"
          :alt="activeProject.name"
        />
      </div>
    </template>
    <template #action>
      <a class="main__button" :href="activeProject.url" target="_blank">{{
        $t("content.gotoSite")
      }}</a>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { IItem } from "@/types/common";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";

SwiperCore.use([Navigation]);

const activeProject = ref();
const setActiveProject = (project: any, index: number) => {
  activeProject.value = project;
  activeProject.value.id = index + 1;
};

const swiperProps = {
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1360: {
      slidesPerView: 5,
    },
    1920: {
      slidesPerView: 7,
    },
    2560: {
      slidesPerView: 7,
    },
  },
  navigation: true,
  spaceBetween: 30,
  loop: false,
  centeredSlides: false,
  roundLengths: true,
};

defineProps({
  theme: {
    type: String,
    required: true,
  },
  projects: {
    type: Array<IItem>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_gallery";
@import "@/assets/scss/components/_project";
</style>

<style lang="scss">
.swiper {
  padding: 25px 25px 90px;

  &-button-prev,
  &-button-next {
    @include button;
    position: absolute;
    bottom: 0;
    width: 50px;
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 27.5px 30px;
    transform: opacity 0.5s;

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      display: block;
      font-size: 2.25em;
      font-weight: normal;
    }
  }

  &-button-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &-button-prev {
    left: calc(50% - 2.5px);
    transform: translateX(-100%);

    &:after {
      content: "\2039";
    }
  }

  &-button-next {
    left: calc(50% + 5px);

    &:after {
      content: "\203A";
    }
  }

  &__slide {
    display: flex;
    justify-content: center;
  }
}
</style>
