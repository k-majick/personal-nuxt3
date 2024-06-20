import { defineStore } from "pinia";
import {
  GET_PAGES,
  GET_PAGE,
  GET_POSTS,
  GET_SKILLS,
  GET_TECHNOLOGY,
  GET_EXPERIENCE,
  GET_PORTFOLIO,
  GET_INSPIRATION,
} from "@/api/queries";

import type { IResponse } from "@/types/common";
import { useNuxtApp, type NuxtApp } from "#app";
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";

interface MyNuxtApp extends NuxtApp {
  $apolloClient: ApolloClient<NormalizedCacheObject>;
}

const nuxtApp = typeof window === "undefined" ? null : useNuxtApp() as MyNuxtApp;

interface IDataState {
  loading: boolean;
  loadError: boolean;
  page: null | IResponse;
  pages: null | Array<IResponse>;
  posts: null | Array<IResponse>;
  skills: null | IResponse;
  technology: null | IResponse;
  experience: null | IResponse;
  portfolio: null | IResponse;
  contact: null | IResponse;
  inspiration: null | IResponse;
}

export const useDataStore = defineStore({
  id: "data-store",
  state: (): IDataState => ({
    loading: true,
    loadError: false,
    page: null,
    pages: null,
    posts: null,
    skills: null,
    technology: null,
    experience: null,
    portfolio: null,
    contact: null,
    inspiration: null,
  }),
  actions: {
    async getPage(locale: string, slug: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGE(locale, slug),
        });

        this.page = data.page.data;

        return this.page;
      } catch (error) {
        this.loadError = true;
      }
    },

    async getPages(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGES(locale),
        });

        this.pages = data.pages.data;

        return this.pages;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPosts() {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_POSTS(),
        });

        this.posts = data.posts.data;

        return this.posts;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getSkills(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_SKILLS(locale),
        });

        this.skills = data.skills.data.attributes;

        return this.skills;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getTechnology(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_TECHNOLOGY(locale),
        });

        this.technology = data.technology.data.attributes;

        return this.technology;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getExperience(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_EXPERIENCE(locale),
        });

        this.experience = data.experience.data.attributes;

        return this.experience;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPortfolio(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_PORTFOLIO(locale),
        });

        this.portfolio = data.portfolio.data.attributes;

        return this.portfolio;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getInspiration(locale: string) {
      if (!nuxtApp) {
        return;
      }

      const apolloClient = (nuxtApp as MyNuxtApp).$apolloClient;   

      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_INSPIRATION(locale),
        });

        this.inspiration = data.inspiration.data.attributes;

        return this.inspiration;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },
  },
  getters: {
    currentPage: state => state.page,
    allPages: state => state.pages,
    mySkills: state => state.skills,
    myTechnology: state => state.technology,
    myExperience: state => state.experience,
    myPortfolio: state => state.portfolio,
    myContact: state => state.contact,
    myInspiration: state => state.inspiration,
  },
});
