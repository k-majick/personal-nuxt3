export const isClient = computed(
  () => process.client && typeof window !== "undefined",
);
