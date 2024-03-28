import { reactive } from 'vue';

interface IGlobalRefs {
  [key: string]: HTMLElement | null;
}

export const globalRefs = reactive<IGlobalRefs>({
  tooltipEl: null,
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('globalRefs', globalRefs);
});