import { defineNuxtConfig } from 'nuxt';
import { IntlifyModuleOptions } from '@intlify/nuxt3';

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: process.env.APP_TITLE,
      meta: [{
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
      }
      ],
      link: [{
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
      }
      ]
    },
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
  },
  build: {
    transpile: [
      '@apollo/client',
      'ts-invariant/process',
    ],
  },
  buildModules: [
    '@intlify/nuxt3',
    '@pinia/nuxt',
  ],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    }
  },
  intlify: {
    localeDir: "assets/i18n",
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      globalInjection: true
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_global.scss";',
        },
      },
    },
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
};
