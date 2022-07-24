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

interface IPagesState {
  page: null | Record<string, unknown>
  pages: null | Record<string, unknown>
  skills: null | Record<string, unknown>
  technology: null | Record<string, unknown>
  experience: null | Record<string, unknown>
  portfolio: null | Record<string, unknown>
  contact: null | Record<string, unknown>
  inspiration: null | Record<string, unknown>
}

export const usePagesStore = defineStore({
  id: 'pages-store',
  state: (): IPagesState => ({
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
    async getPage(locale: string, id: number) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PAGE(locale, id),
        })

        this.page = res.data.page.data

        return this.page
      } catch (error) {
        console.error(error)
      }
    },

    async getPages(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PAGES(locale),
        })

        this.pages = res.data.pages.data

        return this.pages
      } catch (error) {
        console.error(error)
      }
    },

    async getSkills(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_SKILLS(locale),
        })

        this.skills = res.data.skills.data.attributes

        return this.skills
      } catch (error) {
        console.error(error)
      }
    },

    async getTechnology(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_TECHNOLOGY(locale),
        })

        this.technology = res.data.technology.data.attributes

        return this.technology
      } catch (error) {
        console.error(error)
      }
    },

    async getExperience(locale: string) {
      const { $apolloClient } = useNuxtApp()

      console.dir(locale) //eslint-disable-line

      try {
        const res = await $apolloClient.query({
          query: GET_EXPERIENCE(locale),
        })

        this.experience = res.data.experience.data.attributes

        return this.experience
      } catch (error) {
        console.error(error)
      }
    },

    async getPortfolio(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_PORTFOLIO(locale),
        })

        this.portfolio = res.data.portfolio.data.attributes

        return this.portfolio
      } catch (error) {
        console.error(error)
      }
    },

    async getContact(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_CONTACT(locale),
        })

        this.contact = res.data.contact.data.attributes

        return this.contact
      } catch (error) {
        console.error(error)
      }
    },

    async getInspiration(locale: string) {
      const { $apolloClient } = useNuxtApp()

      try {
        const res = await $apolloClient.query({
          query: GET_INSPIRATION(locale),
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
