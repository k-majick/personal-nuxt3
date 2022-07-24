import { defineNuxtConfig } from 'nuxt'
// import { IntlifyModuleOptions } from '@intlify/nuxt3'
// import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import eslint from 'vite-plugin-eslint'

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  ssr: false,
  app: {
    head: {
      title: `${process.env.APP_NAME} | ${process.env.APP_TITLE}`,
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffffff',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
        {
          property: 'og:image',
          content: '/clf-og-min.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@200;500&display=swap',
        },
      ],
    },
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    appName: process.env.APP_NAME,
    appTitle: process.env.APP_TITLE,
  },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process'],
  },
  buildModules: ['@pinia/nuxt', '@intlify/nuxt3'],
  // modules: ['@nuxtjs/i18n'],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },
  // i18n: {
  //   strategy: 'prefix',
  //   locales: [{
  //     code: 'de',
  //     name: 'Deutsch',
  //     iso: 'de-DE',
  //     file: 'de-DE.js',
  //   },
  //   {
  //     code: 'en',
  //     name: 'English',
  //     iso: 'en-US',
  //     file: 'en-US.js',
  //   },
  //   {
  //     code: 'pl',
  //     name: 'Polski',
  //     iso: 'pl-PL',
  //     file: 'pl-PL.js',
  //   }],
  //   defaultLocale: 'en',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //   }
  // },
  // intlify: {
  //   localeDir: 'assets/i18n',
  //   vueI18n: {
  //     legacy: false,
  //     availableLocales: ['de', 'en', 'pl'],
  //     locale: 'en',
  //     fallbackLocale: 'en',
  //     globalInjection: true,
  //   },
  // },
  vite: {
    plugins: [
      eslint(),
      // VueI18nVitePlugin({
      //   include: [
      //     resolve(
      //       dirname(fileURLToPath(import.meta.url)),
      //       './assets/i18n/*.json',
      //     ),
      //   ],
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_global.scss";',
        },
      },
    },
  },
})

// declare module '@nuxt/schema' {
//   interface NuxtConfig {
//     intlify?: IntlifyModuleOptions
//   }
// }
