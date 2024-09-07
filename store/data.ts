import { defineStore } from "pinia";
import { createApolloClient } from "@/graphql/apollo-client";
import {
  GET_PAGES,
  GET_PAGE,
  GET_POSTS,
  GET_SKILLS,
  GET_TECHNOLOGY,
  GET_EXPERIENCE,
  GET_PORTFOLIO,
  GET_INSPIRATION,
} from "@/graphql/queries";

interface IDataState {
  loading: boolean;
  loadError: boolean;
}

const apolloClient = createApolloClient(typeof window === "undefined");

export const useDataStore = defineStore({
  id: "data-store",
  state: (): IDataState => ({
    loading: typeof window === "undefined" ? false : true,
    loadError: false,
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

    async getPosts() {
      this.loading = true;

      try {
        const { data } = await apolloClient.query({
          query: GET_POSTS(),
        });

        this.loading = false;

        return data.posts.data;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getSkills(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_SKILLS(locale),
        });

        this.loading = false;

        return data.skills.data.attributes.sets;
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

        return data.technology.data.attributes;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getJobs(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_EXPERIENCE(locale),
        });

        this.loading = false;

        return data.experience.data.attributes.workplaces;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPortfolio(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_PORTFOLIO(locale),
        });

        this.loading = false;

        return data.portfolio.data.attributes;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPics(locale: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient?.query({
          query: GET_INSPIRATION(locale),
        });

        this.loading = false;

        return data.inspiration.data.attributes;
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },
  },
});
