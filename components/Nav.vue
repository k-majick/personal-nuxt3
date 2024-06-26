<template>
  <nav
    v-click-outside:[exclude]="() => $emit('closeNav')"
    class="nav"
    :class="[`nav--${uiStore.theme}`, { active: isActive, activated: isActivated }]"
  >
    <ul class="nav__items">
      <li class="nav__item">
        <a
          class="nav__link"
          @click.stop.prevent="killModal(), scrollTo($event, headerEl)"
        >Start</a>
      </li>
      <li v-for="page in pagesSorted" :key="(page.id as string)" class="nav__item">
        <nuxt-link
          :to="{ path: `/${locale}/${page.attributes.slug}`}"
          class="nav__link"
          @click.stop="killModal(), scrollTo($event, mainEl)"
        >
          {{ page.attributes.title }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="nav__social">
      <li class="nav__socialItem">
        <a
          v-tooltip="$t('messages.git')"
          href="https://github.com/k-majick"
          target="_blank"
          class="nav__socialLink"
        >
          <span 
            v-html="DOMPurify.sanitize(iconGit)"
          ></span>
        </a>
      </li>
      <li class="nav__socialItem">
        <a
          v-tooltip="$t('messages.linked')"
          href="https://www.linkedin.com/in/maciej-klimowicz"
          target="_blank"
          class="nav__socialLink"
        >
          <span
            v-html="DOMPurify.sanitize(iconLinkedin)"
          ></span>
        </a>
      </li>
    </ul>
    <div v-tooltip="$t('messages.meow')" class="cat__wrapper">
      <nuxt-link
        :to="{ path: `/${locale}/inspiration`}"
        class="cat"
        :class="`cat--${uiStore.theme}`"
        @click.stop="killModal()"
      >
        <!-- eslint-disable risxss/catch-potential-xss-vue -->
        <div v-html="rawCat"></div>
        <!-- eslint-enable risxss/catch-potential-xss-vue -->
      </nuxt-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import DOMPurify from "isomorphic-dompurify";
import { useDataStore } from "@/store/data";
import { useUiStore } from "@/store/ui";
import scrollTo from "@/composables/scrollTo";
import { vTooltip } from "@/composables/tooltip";
import { vClickOutside } from "@/composables/clickOutside";
import iconLinkedin from "@/assets/gfx/icon-linkedin-min.svg?raw";
import iconGit from "@/assets/gfx/icon-git-min.svg?raw";
import rawCat from "@/assets/gfx/cat_1.svg?raw";
import { MainElKey, HeaderElKey } from "@/symbols/symbols";
import type { IResponse } from "@/types/common";
import { useI18n } from "vue-i18n";

defineProps({
  isActivated: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["closeNav"]);

const { locale } = useI18n();
const dataStore = useDataStore();
const uiStore = useUiStore();

const headerEl = inject(HeaderElKey);
const mainEl = inject(MainElKey);

const exclude = "burger";
const excludedPages = ["inspiration", "privacy-policy", "terms-of-use"];

// const pages = ref();
const { data: pages } = useAsyncData("pages", async () => await dataStore.getPages(uiStore.locale));

const pagesSorted = computed(() => {
  if (!pages.value?.length) {
    return [];
  }
  return sortItems([...pages.value]);
});

const sortItems = (arr: IResponse[]) => arr
  .sort((a, b) => (a.attributes.order < b.attributes.order ? -1 : 1))
  .filter(item => !excludedPages.includes(item.attributes.slug));

const killModal = () => {
  if (document?.body.classList.contains("locked")) {
    toggleDialog(0);
  }
};

watch(
  () => uiStore.locale,
  async () => {
    pages.value = ((await dataStore.getPages(uiStore.locale)) as IResponse[]);
  },
);
</script>

<style lang="scss">
@import "@/assets/scss/components/nav";
@import "@/assets/scss/components/cat";
</style>
