import { reactive } from 'vue';

interface IGlobalRefs {
  [key: string]: HTMLElement | null;
}

export const globalRefs = reactive<IGlobalRefs>({
  tooltip: null,
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('globalRefs', globalRefs);
});