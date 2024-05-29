<template>
  <div>
    <!-- <NuxtLayout> -->
      <nuxt-link :to="'/creations'">creations</nuxt-link>
      <nuxt-link :to="'/en/policies/terms-of-use'">terms</nuxt-link>
      <nuxt-link to="/policies/privacy-policy">privacy</nuxt-link>

      <NuxtPage />
    <!-- </NuxtLayout> -->

  </div>
</template>

<script setup>
definePageMeta({
  layout: "policies",
});
</script>