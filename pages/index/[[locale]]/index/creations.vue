<template>
  <div class="blog__sections">
    <section class="blog">
      <div class="blog__container">
        <h3 class="blog__title">
          {{ $t("ui.latestArticles") }} <sup>(English)</sup>
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
            <a :href="post.attributes.Post.link" target="_blank">
              <h2 class="post__title">{{ post.attributes.Post.title }}</h2>
            </a>
            <div class="main__label">{{ post.attributes.Post.date }}</div>
            <div class="post__content">
              <p>{{ post.attributes.Post.lead }}</p>
            </div>
            <a
              :href="post.attributes.Post.link"
              class="main__button post__action"
              target="_blank"
            >
              {{ $t("ui.readMore") }}
            </a>
          </div>
        </article>
      </div>
    </section>
    <section class="blog blog--featured">
      <div class="blog__container">
        <h3 class="blog__title">{{ $t("ui.featuredProjects") }}</h3>
        <div
          v-if="page?.attributes.content"
          class="post__content"
          v-html="
            DOMPurify.sanitize(
              marked.parse(page?.attributes.content as string) as string,
            )
          "
        ></div>
      </div>

      <Projects
        v-if="portfolio?.projects && portfolio.projects.length"
        :theme="theme"
        :projects="(portfolio.projects as Array<IItem>)"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import Projects from "@/components/Projects.vue";
import { useUiStore } from "@/store/ui";
import { useDataStore } from "@/store/data";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import type { IResponse, IItem } from "@/types/common";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const uiStore = useUiStore();
const route = useRoute();

const theme = computed(() => uiStore.theme);

const page: Ref<IResponse | undefined> = ref();
const posts: Ref<Array<IResponse> | undefined> = ref();
const portfolio: Ref<IResponse | undefined> = ref();

watchEffect(async (): Promise<IResponse | void> => {
  const pageData = await dataStore.getPage(
    uiStore.locale as string,
    getSlug(route.path as string),
  );
  const postsData = (await dataStore.getPosts()) as Array<IResponse>;
  const portfolioData = (await dataStore.getPortfolio(
    uiStore.locale as string,
  )) as IResponse;

  if (!pageData || !postsData || !portfolioData) {
    return;
  }

  page.value = pageData;
  posts.value = postsData;
  portfolio.value = portfolioData;
  dataStore.loading = false;

  useHead({
    titleTemplate: `${config.public.appName} | ${page.value?.attributes.title}`,
  });
});
</script>

<style lang="scss">
@import "@/assets/scss/components/blog";
@import "@/assets/scss/components/post";
</style>
