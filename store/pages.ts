import { defineStore } from 'pinia'
import {
  GET_PAGES,
  GET_PAGE,
  GET_SKILLS,
  GET_TECHNOLOGY,
  GET_EXPERIENCE,
  GET_PORTFOLIO,
  GET_CONTACT,
  GET_INSPIRATION,
} from '@/api/queries'

export const usePagesStore = defineStore({
  id: 'pages-store',
  state: () => ({
    page: null,
    pages: null,
    skills: null,
    technology: null,
    experience: null,
    portfolio: null,
    contact: null,
    inspiration: null,
  }),
  actions: {
    async getPage(id: number) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PAGE(id),
        })

        this.page = res.data.page.data

        return this.page
      } catch (error) {
        console.error(error)
      }
    },

    async getPages() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PAGES(),
        })

        this.pages = res.data.pages.data

        return this.pages
      } catch (error) {
        console.error(error)
      }
    },

    async getSkills() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_SKILLS(),
        })

        this.skills = res.data.skills.data.attributes

        return this.skills
      } catch (error) {
        console.error(error)
      }
    },

    async getTechnology() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_TECHNOLOGY(),
        })

        this.technology = res.data.technology.data.attributes

        return this.technology
      } catch (error) {
        console.error(error)
      }
    },

    async getExperience() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_EXPERIENCE(),
        })

        this.experience = res.data.experience.data.attributes

        return this.experience
      } catch (error) {
        console.error(error)
      }
    },

    async getPortfolio() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PORTFOLIO(),
        })

        this.portfolio = res.data.portfolio.data.attributes

        return this.portfolio
      } catch (error) {
        console.error(error)
      }
    },

    async getContact() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_CONTACT(),
        })

        this.contact = res.data.contact.data.attributes

        return this.contact
      } catch (error) {
        console.error(error)
      }
    },

    async getInspiration() {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_INSPIRATION(),
        })

        this.inspiration = res.data.inspiration.data.attributes

        return this.inspiration
      } catch (error) {
        console.error(error)
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
})
