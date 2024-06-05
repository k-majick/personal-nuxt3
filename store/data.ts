import { defineStore } from "pinia";
import {
  GET_PAGES,
  GET_PAGE,
  GET_POSTS,
  GET_SKILLS,
  GET_TECHNOLOGY,
  GET_EXPERIENCE,
  GET_PORTFOLIO,
  GET_CONTACT,
  GET_INSPIRATION,
} from "@/api/queries";

import type { IResponse } from "@/types/common";
import { useNuxtApp, type NuxtApp } from "#app";
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";

interface MyNuxtApp extends NuxtApp {
  $apolloClient: ApolloClient<NormalizedCacheObject>;
}

const nuxtApp = useNuxtApp() as MyNuxtApp;

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
      const apolloClient = nuxtApp.$apolloClient;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGE(locale, slug),
        });

        this.page = data.page.data;
        this.loading = false;

        return this.page;
      } catch (error) {
        this.loadError = true;
      }
    },

    async getPages(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGES(locale),
        });

        this.pages = data.pages.data;
        this.loading = false;

        return this.pages;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPosts() {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_POSTS(),
        });

        this.posts = data.posts.data;
        this.loading = false;

        return this.posts;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getSkills(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_SKILLS(locale),
        });

        this.skills = data.skills.data.attributes;
        this.loading = false;

        return this.skills;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getTechnology(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_TECHNOLOGY(locale),
        });

        this.technology = data.technology.data.attributes;
        this.loading = false;

        return this.technology;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getExperience(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_EXPERIENCE(locale),
        });

        this.experience = data.experience.data.attributes;
        this.loading = false;

        return this.experience;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPortfolio(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PORTFOLIO(locale),
        });

        this.portfolio = data.portfolio.data.attributes;
        this.loading = false;

        return this.portfolio;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getContact(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_CONTACT(locale),
        });

        this.contact = data.contact.data.attributes;
        this.loading = false;

        return this.contact;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getInspiration(locale: string) {
      const apolloClient = nuxtApp.$apolloClient;
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_INSPIRATION(locale),
        });

        this.inspiration = data.inspiration.data.attributes;
        this.loading = false;

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
