import { defineStore } from 'pinia'

interface ILNavState {
  scroll: null | number
}

export const useNavStore = defineStore({
  id: 'nav-store',
  state: (): ILNavState => ({
    scroll: null,
  }),
  actions: {
    setScroll(scroll: number) {
      this.scroll = scroll
    },
  },
  getters: {
    currentScroll: state => state.scroll,
  },
})
