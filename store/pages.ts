import { defineStore } from 'pinia';
import {
  useQuery,
} from '@vue/apollo-composable';
import {
  GET_PAGES,
  GET_PAGE,
  GET_SKILLS,
  GET_TECHNOLOGIES,
  GET_EXPERIENCE,
} from '@/api/queries';

export const usePagesStore = defineStore({
  id: 'pages-store',
  state: () => ({
    pages: null,
    page: null,
    skills: null,
    technologies: null,
    experience: null,
  }),
  actions: {
    async getPage(id: number) {
      const { $apolloClient } = useNuxtApp();

      try {
        const res = await $apolloClient.query({
          query: GET_PAGE(id),
        });

        this.page = res.data.page.data;

        return this.page;
      } catch(error) {
        console.error(error);
      }
    },

    async getPages() {
      const { $apolloClient } = useNuxtApp();

      try {
        const res = await $apolloClient.query({
          query: GET_PAGES(),
        });

        this.pages = res.data.pages.data;

        return this.pages;
      } catch(error) {
        console.error(error);
      }
    },

    async getSkills() {
      const { $apolloClient } = useNuxtApp();

      try {
        const res = await $apolloClient.query({
          query: GET_SKILLS(),
        });

        this.skills = res.data.skill.data.attributes;

        return this.skills;
      } catch(error) {
        console.error(error);
      }
    },

    async getTechnologies() {
      const { $apolloClient } = useNuxtApp();

      try {
        const res = await $apolloClient.query({
          query: GET_TECHNOLOGIES(),
        });

        this.technologies = res.data.technology.data.attributes;

        return this.technologies;
      } catch(error) {
        console.error(error);
      }
    },

    async getExperience() {
      const { $apolloClient } = useNuxtApp();

      try {
        const res = await $apolloClient.query({
          query: GET_EXPERIENCE(),
        });

        this.experience = res.data.experience.data.attributes;

        return this.experience;
      } catch(error) {
        console.error(error);
      }
    },
  },
  getters: {
    allPages: state => state.pages,
    currentPage: state => state.page,
    allSkills: state => state.skills,
    allTechnologies: state => state.technologies,
    allWorkplaces: state => state.experience,
  },
});
