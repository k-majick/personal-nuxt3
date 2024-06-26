import { defineStore } from "pinia";
import {
  GET_PAGES,
  GET_PAGE,
  // GET_POSTS,
  GET_SKILLS,
  GET_TECHNOLOGY,
  GET_EXPERIENCE,
  // GET_PORTFOLIO,
  // GET_INSPIRATION,
} from "@/graphql/queries";
import type { IResponse } from "@/types/common";
import { createApolloClient } from '@/graphql/apollo-client';

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

const apolloClient = createApolloClient(typeof window === 'undefined');

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
    async getPages(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGES(locale),
        });

        this.loading = false;

        return data.pages.data;
      } catch (error) {
        this.loadError = true;
      }
    },

    async getPage(locale: string, slug: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_PAGE(locale, slug),
        });

        this.loading = false;

        return data.page.data.attributes;
      } catch (error) {
        this.loadError = true;
      }
    },

  //   async getPosts() {
  //     this.loading = true;

  //     try {
  //       const { data } = await apolloClient.query({
  //         query: GET_POSTS(),
  //       });

  //       this.posts = data.posts.data;

  //       return this.posts;
  //     } catch (error) {
  //       console.error(error);
  //       this.loadError = true;
  //     }
  //   },

    async getSkills(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_SKILLS(locale),
        });

        this.loading = false;

        return data.skills.data.attributes;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getTechnology(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_TECHNOLOGY(locale),
        });

        this.loading = false;

        return data.technology.data;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getExperience(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_EXPERIENCE(locale),
        });

        return data.experience.data;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

  //   async getPortfolio(locale: string) {
  //     this.loading = true;

  //     try {
  //       const { data } = await apolloClient?.query({
  //         query: GET_PORTFOLIO(locale),
  //       });

  //       this.portfolio = data.portfolio.data.attributes;

  //       return this.portfolio;
  //     } catch (error) {
  //       console.error(error);
  //       this.loadError = true;
  //     }
  //   },

  //   async getInspiration(locale: string) {
  //     this.loading = true;

  //     try {
  //       const { data } = await apolloClient?.query({
  //         query: GET_INSPIRATION(locale),
  //       });

  //       this.inspiration = data.inspiration.data.attributes;

  //       return this.inspiration;
  //     } catch (error) {
  //       console.error(error);
  //       this.loadError = true;
  //     }
  //   },
  // },

  },
});
