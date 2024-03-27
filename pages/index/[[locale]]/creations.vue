<template>
  <div class="blog__sections">
    <section class="blog">
      <div class="blog__container">
        <h3 class="blog__title">
          {{ $t("content.latestArticles") }} <sup>(English)</sup>
        </h3>
        <article
          v-for="(post, index) in posts"
          :key="index"
          :class="`post ${post.top ? 'post--top' : ''}`"
        >
          <div class="post__image">
            <img alt="" :src="post.attributes.Post.imageUrl" />
          </div>
          <div class="post__container">
            <h2 class="post__title">{{ post.attributes.Post.title }}</h2>
            <div class="main__label">{{ post.attributes.Post.date }}</div>
            <div class="post__content">
              <p>{{ post.attributes.Post.lead }}</p>
            </div>
            <a
              :href="post.attributes.Post.link"
              class="main__button post__action"
              target="_blank"
            >
              {{ $t("content.readMore") }}
            </a>
          </div>
        </article>
      </div>
    </section>
    <section class="blog blog--featured">
      <div class="blog__container">
        <h3 class="blog__title">{{ $t("content.featuredProjects") }}</h3>
        <div
          v-if="portfolio && portfolio.content"
          class="post__content"
          v-html="DOMPurify.sanitize(marked.parse(portfolio.content as string))"
        ></div>
      </div>

      <Projects
        v-if="portfolio.projects && portfolio.projects.length"
        :theme="(theme as string)"
        :projects="(portfolio.projects as Array<IItem>)"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import Projects from "@/components/Projects.vue";
import { useUiStore } from "@/store/ui";
import { useDataStore } from "@/store/data";
import { marked } from "marked";
import DOMPurify from "dompurify";
import type { IResponse, IItem } from "@/types/common";

const config = useRuntimeConfig();
const uiStore = useUiStore();
const theme = ref(uiStore.currentTheme);

const dataStore = useDataStore();
const pageData: Ref<IResponse> = ref(
  (await dataStore.getPage(uiStore.currentLocale as string, 3)) as IResponse,
);
const posts: Ref<Array<IResponse>> = ref(
  (await dataStore.getPosts()) as Array<IResponse>,
);
const portfolio: Ref<IResponse> = ref(
  (await dataStore.getPortfolio(uiStore.currentLocale as string)) as IResponse,
);

watch(
  () => uiStore.currentTheme,
  () => (theme.value = uiStore.currentTheme),
);

watch(
  () => uiStore.currentLocale,
  async () =>
    (portfolio.value = (await dataStore.getPortfolio(
      uiStore.currentLocale as string,
    )) as IResponse),
);

useHead({
  titleTemplate: `${config.public.appName} | ${pageData.value.attributes.title}`,
});
</script>

<style lang="scss">
@import "@/assets/scss/components/_blog";
@import "@/assets/scss/components/_post";
</style>
