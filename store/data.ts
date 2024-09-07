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

enum RETURN_PATHS {
  PAGES = "pages.data",
  PAGE = "page.data.attributes",
  POSTS = "posts.data",
  SKILLS = "skills.data.attributes.sets",
  TECHNOLOGY = "technology.data.attributes",
  EXPERIENCE = "experience.data.attributes.workplaces",
  PORTFOLIO = "portfolio.data.attributes",
  INSPIRATION = "inspiration.data.attributes",
}

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
    async fetchData(query: any, returnPath: RETURN_PATHS) {
      this.loading = true;

      try {
        const { data } = await apolloClient.query({ query });

        this.loading = false;

        return returnPath.split(".").reduce((o, i) => o[i], data);
      } catch (error) {
        console.error(error);
        this.loadError = true;
      }
    },

    async getPages(locale: string) {
      return this.fetchData(GET_PAGES(locale), RETURN_PATHS.PAGES);
    },

    async getPage(locale: string, slug: string) {
      return this.fetchData(GET_PAGE(locale, slug), RETURN_PATHS.PAGE);
    },

    async getPosts() {
      return this.fetchData(GET_POSTS(), RETURN_PATHS.POSTS);
    },

    async getSkills(locale: string) {
      return this.fetchData(GET_SKILLS(locale), RETURN_PATHS.SKILLS);
    },

    async getTechnology(locale: string) {
      return this.fetchData(GET_TECHNOLOGY(locale), RETURN_PATHS.TECHNOLOGY);
    },

    async getJobs(locale: string) {
      return this.fetchData(GET_EXPERIENCE(locale), RETURN_PATHS.EXPERIENCE);
    },

    async getPortfolio(locale: string) {
      return this.fetchData(GET_PORTFOLIO(locale), RETURN_PATHS.PORTFOLIO);
    },

    async getPics(locale: string) {
      return this.fetchData(GET_INSPIRATION(locale), RETURN_PATHS.INSPIRATION);
    },
  },
});
