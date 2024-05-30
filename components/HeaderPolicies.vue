<template>
  <header class="header header--policies">
    <div class="header__container">
      <nav class="header__nav">
        <nuxt-link
          class="header__link"
          to="/"
        >About</nuxt-link>
        <nuxt-link
          class="header__link"
          to="/policies/terms-of-use"
        >Terms of use</nuxt-link>
        <nuxt-link
          class="header__link"
          to="/policies/privacy-policy"
        >Privacy policy</nuxt-link>
      </nav>

      <UiControls />
    </div>
  </header>
</template>

<script lang="ts" setup>
import UiControls from "@/components/UiControls.vue";
</script>

<style lang="scss">
@import "./assets/scss/components/_header";
</style>
