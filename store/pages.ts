import { defineStore } from 'pinia';
import {
  useQuery,
} from '@vue/apollo-composable';
import {
  GET_ALL_PAGES,
  GET_PAGE,
} from '@/api/queries';

export const usePagesStore = defineStore({
  id: 'pages-store',
  state: () => ({
    pages: [],
    page: [],
  }),
  actions: {
    async getPages() {
      const {
        result,
      } = useQuery(GET_ALL_PAGES);

      watch(result, value => {
        this.pages = result.value.pages.data;
      });
    },

    async getPage(id: number) {
      const {
        result,
      } = useQuery(GET_PAGE(id));

      watch(result, value => {
        this.page = result.value.page.data;
      });
    }
  },
  getters: {
    allPages: state => state.pages,
    currentPage: state => state.page,
  },
});
