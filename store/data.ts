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
    loading: false,
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
    async getPage(locale: string, id: number) {
      try {
        const res = await useAsyncQuery(GET_PAGE(locale, id));

        this.page = (res as any).data.value.page.data;
        this.loading = false;

        return this.page;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPages(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_PAGES(locale));

        this.pages = (res as any).data.value.pages.data;
        this.loading = false;

        return this.pages;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPosts() {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_POSTS());

        this.posts = (res as any).data.value.posts.data;
        this.loading = false;

        return this.posts;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getSkills(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_SKILLS(locale));

        this.skills = (res as any).data.value.skills.data.attributes;
        this.loading = false;

        return this.skills;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getTechnology(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_TECHNOLOGY(locale));

        this.technology = (res as any).data.value.technology.data.attributes;
        this.loading = false;

        return this.technology;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getExperience(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_EXPERIENCE(locale));

        this.experience = (res as any).data.value.experience.data.attributes;
        this.loading = false;

        return this.experience;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPortfolio(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_PORTFOLIO(locale));

        this.portfolio = (res as any).data.value.portfolio.data.attributes;
        this.loading = false;

        return this.portfolio;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getContact(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_CONTACT(locale));

        this.contact = (res as any).data.value.contact.data.attributes;
        this.loading = false;

        return this.contact;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getInspiration(locale: string) {
      this.loading = true;

      try {
        const res = await useAsyncQuery(GET_INSPIRATION(locale));

        this.inspiration = (res as any).data.value.inspiration.data.attributes;
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
